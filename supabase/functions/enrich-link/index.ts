// @ts-nocheck
// Supabase Edge Function: enrich-link
//
// Resolves a bookmark URL (including short links like lnkd.in), unfurls its
// metadata, and synthesizes title/author/summary/category/tags via Groq.
//
// Security:
// - Requires an authenticated Supabase user JWT (verify_jwt = true in config.toml),
//   so anonymous callers cannot burn your Groq quota.
// - GROQ_API_KEY lives server-side as an Edge Function secret and is never
//   bundled into the client.
//
// Deploy:
//   supabase link --project-ref <your-project-ref>
//   supabase secrets set GROQ_API_KEY=gsk_...
//   supabase functions deploy enrich-link

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MICROLINK_URL = 'https://api.microlink.io';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_MODELS = ['openai/gpt-oss-120b', 'llama-3.1-8b-instant'];
const VALID_CATEGORIES = ['machine-learning', 'system-design', 'cloud', 'tool', 'career', 'other'];
const FETCH_TIMEOUT_MS = 8000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface LiveMetadata {
  url?: string;
  title?: string;
  author?: string;
  description?: string;
  image?: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractMeta(html: string, key: string): string | undefined {
  const keyPattern = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${keyPattern}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${keyPattern}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return decodeEntities(m[1].trim());
  }
  return undefined;
}

function extractTitle(html: string): string | undefined {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1] ? decodeEntities(m[1].trim()) : undefined;
}

// Primary unfurl: fetch the page directly and parse OG/Twitter meta tags.
// No third-party proxy — the URL never leaves your infrastructure.
async function fetchDirectMetadata(targetUrl: string): Promise<LiveMetadata | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookmarkBot/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) return null;
    const resolvedUrl = res.url || targetUrl;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('html')) return { url: resolvedUrl };
    const html = (await res.text()).slice(0, 400_000);
    return {
      url: resolvedUrl,
      title:
        extractMeta(html, 'og:title') || extractMeta(html, 'twitter:title') || extractTitle(html),
      author: extractMeta(html, 'author') || extractMeta(html, 'twitter:creator')?.replace(/^@/, ''),
      description:
        extractMeta(html, 'og:description') ||
        extractMeta(html, 'twitter:description') ||
        extractMeta(html, 'description'),
      image: extractMeta(html, 'og:image') || extractMeta(html, 'twitter:image'),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Fallback unfurl via Microlink. Note: this shares the URL with a third party,
// so it only runs if the direct scrape produced nothing useful.
async function fetchMicrolinkMetadata(targetUrl: string): Promise<LiveMetadata | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${MICROLINK_URL}?url=${encodeURIComponent(targetUrl)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const d = json.data;
    if (!d) return null;
    return {
      url: d.url || targetUrl,
      title: d.title,
      author: d.author,
      description: d.description,
      image: d.image?.url,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchLiveMetadata(targetUrl: string): Promise<LiveMetadata | null> {
  const direct = await fetchDirectMetadata(targetUrl);
  if (direct?.description || direct?.title) return direct;
  const micro = await fetchMicrolinkMetadata(targetUrl);
  if (micro) return { ...direct, ...micro, url: micro.url || direct?.url || targetUrl };
  return direct;
}

function detectSource(rawUrl: string): string {
  try {
    const host = new URL(rawUrl).hostname.toLowerCase();
    if (
      host === 'linkedin.com' ||
      host.endsWith('.linkedin.com') ||
      host === 'lnkd.in' ||
      host.endsWith('.lnkd.in')
    ) {
      return 'linkedin';
    }
    if (
      host === 'twitter.com' ||
      host.endsWith('.twitter.com') ||
      host === 'x.com' ||
      host.endsWith('.x.com') ||
      host === 't.co' ||
      host.endsWith('.t.co')
    ) {
      return 'twitter';
    }
    if (host === 'github.com' || host.endsWith('.github.com')) return 'github';
    return 'article';
  } catch {
    return 'other';
  }
}

function parseUrlContext(rawUrl: string): {
  slug: string;
  authorHint?: string;
  topicHint?: string;
} {
  try {
    const url = new URL(rawUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const postSlug = pathParts[pathParts.length - 1] || '';
    const sep = postSlug.indexOf('_');
    const authorPart = sep > 0 ? postSlug.slice(0, sep) : '';
    const topicPart = (sep > 0 ? postSlug.slice(sep + 1) : postSlug).replace(
      /-activity-\d+.*$/,
      '',
    );
    const titleCase = (s: string) =>
      s
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
    return {
      slug: postSlug,
      authorHint: authorPart ? titleCase(authorPart) : undefined,
      topicHint: topicPart ? titleCase(topicPart) : undefined,
    };
  } catch {
    return { slug: rawUrl };
  }
}

async function callGroq(
  apiKey: string,
  messages: { role: string; content: string }[],
): Promise<{ content: string; model: string }> {
  const primaryModel = Deno.env.get('GROQ_MODEL') || DEFAULT_MODEL;
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter((m) => m !== primaryModel)];
  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 500 }),
      });

      if (!res.ok) {
        const body = await res.text();
        if (res.status === 404 && body.includes('model_not_found')) {
          lastError = new Error(`Model ${model} not available: ${body}`);
          continue;
        }
        throw new Error(`Groq API error (${res.status}): ${body}`);
      }

      const data = await res.json();
      return { content: data.choices?.[0]?.message?.content || '', model };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (lastError.message.includes('model_not_found') || lastError.message.includes('404')) {
        continue;
      }
      throw lastError;
    }
  }

  throw lastError || new Error('Failed to complete Groq request across all models.');
}

function normalizeCategory(raw: unknown): string {
  const parsed = String(raw || '').toLowerCase();
  for (const valid of VALID_CATEGORIES) {
    if (parsed.includes(valid)) return valid;
  }
  if (parsed.includes('ai') || parsed.includes('ml')) return 'machine-learning';
  return 'other';
}

function normalizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return ['tech'];
  const tags = raw
    .map((t) => String(t).toLowerCase().replace(/[^a-z0-9-]/g, ''))
    .filter(Boolean);
  return tags.length > 0 ? tags : ['reading'];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // Require an authenticated Supabase user.
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return jsonResponse({ error: 'Missing authorization header' }, 401);
  }
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } },
  );
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  // Optional allowlist: if ALLOWED_EMAIL is set, only that account may use
  // the function (personal-site guard so strangers can't burn Groq quota).
  const allowedEmail = Deno.env.get('ALLOWED_EMAIL');
  if (allowedEmail && user.email?.toLowerCase() !== allowedEmail.toLowerCase()) {
    return jsonResponse({ error: 'Forbidden' }, 403);
  }

  const groqKey = Deno.env.get('GROQ_API_KEY');
  if (!groqKey) {
    return jsonResponse({ error: 'GROQ_API_KEY edge function secret is not configured' }, 500);
  }

  let body: { url?: string; rawText?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const inputUrl = body.url?.trim();
  if (!inputUrl) return jsonResponse({ error: 'Missing url' }, 400);
  try {
    new URL(inputUrl);
  } catch {
    return jsonResponse({ error: 'Invalid url' }, 400);
  }

  const liveData = await fetchLiveMetadata(inputUrl);
  const resolvedUrl = liveData?.url || inputUrl;
  const source = detectSource(resolvedUrl);
  const { authorHint, topicHint, slug } = parseUrlContext(resolvedUrl);
  const author = liveData?.author || authorHint;
  const contentToAnalyze = liveData?.description || body.rawText || topicHint || slug;

  const systemPrompt = `You are an elite AI technical research curator.
Your task is to analyze links (especially LinkedIn posts, GitHub repos, and engineering articles) and extract STRICTLY the core technical gist of the post in a short, high-density format.

GUIDELINES:
1. ZERO FLUFF: Strip away all personal announcements, engagement bait, excitement words ("HUGEEEE", "Can you imagine", "Excited to share"), star counts, and repost requests.
2. TECHNICAL FOCUS: Identify the exact engineering substance: what is being built, taught, or introduced (architectures, tools, libraries, benchmarks, patterns).
3. SHORT FORMAT: The summary must be 1 to 2 crisp, high-signal sentences maximum. Be punchy and direct.

Return ONLY a valid JSON object matching this schema without any markdown formatting or backticks:
{
  "title": "Concise, descriptive technical title (e.g. 'Production Agentic RAG Course with LangGraph & OpenSearch')",
  "author": "Name of the author or creator if available",
  "summary": "1-2 sentence core technical gist describing the exact architecture, curriculum, or tool.",
  "category": "Must be exactly one of: 'machine-learning', 'system-design', 'cloud', 'tool', 'career', 'other'",
  "tags": ["3 to 5 lowercase relevant technical tags"]
}`;

  const userPrompt = `Extract the core technical gist for this resource:
URL: ${resolvedUrl}
Platform: ${source}
${author ? `Author: ${author}` : ''}
${liveData?.title ? `Headline: ${liveData.title}` : ''}
Raw Post Content:
"""
${contentToAnalyze}
"""

Return only the clean JSON.`;

  try {
    const { content, model } = await callGroq(groqKey, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    const clean = content
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
    const parsed = JSON.parse(clean);

    return jsonResponse({
      url: resolvedUrl,
      title: parsed.title || liveData?.title || topicHint || 'Saved Resource',
      author: parsed.author || author,
      summary:
        parsed.summary || liveData?.description?.slice(0, 200) || 'Technical bookmark saved for reference.',
      imageUrl: liveData?.image,
      category: normalizeCategory(parsed.category),
      tags: normalizeTags(parsed.tags),
      source,
      modelUsed: model,
    });
  } catch (err) {
    return jsonResponse({
      url: resolvedUrl,
      title: liveData?.title || topicHint || 'Saved Resource',
      author,
      summary:
        liveData?.description?.slice(0, 250) ||
        body.rawText ||
        `Saved ${source} post for reference and review.`,
      imageUrl: liveData?.image,
      category: 'machine-learning',
      tags: [source, 'bookmarks'],
      source,
      modelUsed: 'metadata-fallback',
      warning: String(err),
    });
  }
});
