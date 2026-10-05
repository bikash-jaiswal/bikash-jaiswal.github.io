import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Shared browser Supabase client (anon key only — safe for frontend).
 * Singleton so auth listeners are registered exactly once.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  client = createClient(url, anonKey, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
    },
  });
  if (typeof window !== 'undefined') {
    client.auth.onAuthStateChange(() => {
      // Strip any leftover OAuth fragment (implicit-style callbacks or races
      // where the URL wasn't cleaned before listeners ran).
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.dispatchEvent(new Event('bj-auth-changed'));
      window.dispatchEvent(new Event('bj-bookmarks-changed'));
    });
  }
  return client;
}
