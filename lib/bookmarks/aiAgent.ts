import { callGroqChat, ChatMessage } from '../groq';
import { BookmarkSource } from '../../types/bookmark';
import { detectBookmarkSource } from './index';
import { getSupabaseClient } from './supabaseClient';

export interface EnrichedBookmarkDetails {
  url: string;
  title: string;
  author?: string;
  summary?: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  source: BookmarkSource;
  modelUsed?: string;
}

interface LiveMetadata {
  url?: string;
  title?: string;
  author?: string;
  description?: string;
  image?: string;
}

/**
 * Browser-side unfurl fallback via Microlink (free, supports CORS).
 * NOTE: this shares the target URL with a third party. The Supabase Edge
 * Function path (enrich-link) scrapes OG tags directly and is preferred
 * whenever a Supabase project is configured.
 */
async function fetchLiveMetadata(targetUrl: string): Promise<LiveMetadata | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);
  try {
    const endpoint = `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
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
  } catch (err) {
    console.warn('Live metadata fetcher skipped:', err);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Heuristic URL parser for extracting slug tokens when live metadata is limited
 */
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

/**
 * Autonomous AI Agent that analyzes a link (including short links like lnkd.in),
 * fetches live post content, and synthesizes title, author, summary, category, and tags
 * using Llama-3.3-70b or Grok.
 */
export async function enrichLinkWithAIAgent(
  inputUrl: string,
  rawText?: string
): Promise<EnrichedBookmarkDetails> {
  // Primary path: call the Supabase Edge Function so the Groq key stays
  // server-side and is never bundled into the client bundle.
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('enrich-link', {
        body: { url: inputUrl, rawText },
      });
      if (!error && data && typeof data === 'object' && 'title' in data) {
        return data as EnrichedBookmarkDetails;
      }
    } catch {
      // Edge function unavailable — fall through to local enrichment.
    }
  }

  return enrichLinkLocally(inputUrl, rawText);
}

/**
 * Local enrichment path — used in mock mode or when the Edge Function is not
 * deployed. Requires a Groq key (GROQ_API_KEY server-side, or an explicit
 * user-provided key in localStorage as 'bj_groq_api_key'). Degrades to
 * heuristic metadata if no key is available.
 */
async function enrichLinkLocally(
  inputUrl: string,
  rawText?: string
): Promise<EnrichedBookmarkDetails> {
  // 1. Unfurl live metadata (resolves redirects like lnkd.in and gets full post body)
  const liveData = await fetchLiveMetadata(inputUrl);

  const resolvedUrl = liveData?.url || inputUrl;
  const source = detectBookmarkSource(resolvedUrl);
  const { authorHint, topicHint, slug } = parseUrlContext(resolvedUrl);

  const author = liveData?.author || authorHint;
  const contentToAnalyze = liveData?.description || rawText || topicHint || slug;

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
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const response = await callGroqChat(messages, {
      temperature: 0.2,
      maxTokens: 500,
    });

    const cleanContent = response.content
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanContent);

    const validCategories = [
      'machine-learning',
      'system-design',
      'cloud',
      'tool',
      'career',
      'other',
    ];

    // Normalize category
    let category = 'other';
    const parsedCat = (parsed.category || '').toLowerCase();
    for (const valid of validCategories) {
      if (parsedCat.includes(valid)) {
        category = valid;
        break;
      }
    }
    if (category === 'other' && (parsedCat.includes('ai') || parsedCat.includes('ml'))) {
      category = 'machine-learning';
    }

    const tags = Array.isArray(parsed.tags)
      ? parsed.tags.map((t: string) => String(t).toLowerCase().replace(/[^a-z0-9-]/g, '')).filter(Boolean)
      : ['tech'];

    return {
      url: resolvedUrl,
      title: parsed.title || liveData?.title || topicHint || 'Saved Resource',
      author: parsed.author || author,
      summary: parsed.summary || liveData?.description?.slice(0, 200) || 'Technical bookmark saved for reference.',
      imageUrl: liveData?.image,
      category,
      tags: tags.length > 0 ? tags : ['reading'],
      source,
      modelUsed: response.model,
    };
  } catch (error) {
    console.warn('AI Agent LLM enrichment encountered an error, falling back to parsed metadata:', error);

    return {
      url: resolvedUrl,
      title: liveData?.title || topicHint || 'Saved Resource',
      author: author,
      summary: liveData?.description?.slice(0, 250) || rawText || `Saved ${source} post for reference and review.`,
      imageUrl: liveData?.image,
      category: 'other',
      tags: [source, 'bookmarks'],
      source,
      modelUsed: 'metadata-fallback',
    };
  }
}
