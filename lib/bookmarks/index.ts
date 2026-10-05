import { BookmarkServiceInterface, BookmarkSource } from '../../types/bookmark';
import { MockBookmarkService } from './mockService';
import { SupabaseBookmarkService } from './supabaseService';

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Singleton instances
const mockInstance = new MockBookmarkService();
let supabaseInstance: SupabaseBookmarkService | null = null;

export function getBookmarkService(): BookmarkServiceInterface {
  if (isSupabaseConfigured()) {
    if (!supabaseInstance) {
      supabaseInstance = new SupabaseBookmarkService();
    }
    return supabaseInstance;
  }
  return mockInstance;
}

export const bookmarkService = getBookmarkService();

export function detectBookmarkSource(url: string): BookmarkSource {
  try {
    const host = new URL(url).hostname.toLowerCase();
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
