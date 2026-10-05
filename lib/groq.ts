/**
 * GroqCloud LLM API Service
 *
 * Default model: llama-3.3-70b-versatile (with graceful fallback to available Groq models).
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface GroqChatResponse {
  id: string;
  model: string;
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export const DEFAULT_GROQ_MODEL = 'llama-3.3-70b-versatile';
export const FALLBACK_GROQ_MODELS = ['openai/gpt-oss-120b', 'llama-3.1-8b-instant'];
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// NOTE: never read NEXT_PUBLIC_* keys here — they are inlined into the public
// client bundle. The Groq key should stay server-side (see the enrich-link
// Edge Function). The localStorage key is an explicit per-browser opt-in
// escape hatch for local/mock-mode development only.
export function getGroqApiKey(): string | undefined {
  return (
    process.env.GROQ_API_KEY ||
    (typeof window !== 'undefined' ? localStorage.getItem('bj_groq_api_key') || undefined : undefined)
  );
}

/**
 * Execute chat completion via Groq.
 */
export async function callGroqChat(
  messages: ChatMessage[],
  options: GroqChatOptions = {}
): Promise<GroqChatResponse> {
  const apiKey = getGroqApiKey();
  if (!apiKey || apiKey.includes('placeholder')) {
    throw new Error('Groq API Key is not configured.');
  }

  const primaryModel = options.model || process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;
  const modelsToTry = [primaryModel, ...FALLBACK_GROQ_MODELS.filter((m) => m !== primaryModel)];

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options.temperature ?? 0.3,
          max_tokens: options.maxTokens ?? 1024,
          top_p: options.topP ?? 1,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        if (response.status === 404 && errorBody.includes('model_not_found')) {
          // Model not found in this Groq tier, try next fallback
          lastError = new Error(`Groq model ${model} not available: ${errorBody}`);
          continue;
        }
        throw new Error(`Groq API error (${response.status}): ${errorBody}`);
      }

      const data = await response.json();
      const choice = data.choices?.[0];

      return {
        id: data.id,
        model: data.model,
        content: choice?.message?.content || '',
        usage: data.usage
          ? {
              promptTokens: data.usage.prompt_tokens,
              completionTokens: data.usage.completion_tokens,
              totalTokens: data.usage.total_tokens,
            }
          : undefined,
      };
    } catch (err: any) {
      lastError = err;
      if (err.message?.includes('model_not_found') || err.message?.includes('404')) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Failed to complete Groq API request across all models.');
}
