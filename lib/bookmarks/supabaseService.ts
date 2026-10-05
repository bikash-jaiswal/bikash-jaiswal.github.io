import { SupabaseClient } from '@supabase/supabase-js';
import { Bookmark, BookmarkServiceInterface, UserProfile } from '../../types/bookmark';
import { getSupabaseClient } from './supabaseClient';

/** Row shape of public.bookmarks (snake_case) — mirrors supabase/schema.sql. */
interface BookmarkRow {
  id: string;
  user_id: string;
  url: string;
  title: string;
  author: string | null;
  summary: string | null;
  raw_content: string | null;
  image_url: string | null;
  category: string;
  tags: string[] | null;
  source: string;
  is_favorite: boolean;
  is_read: boolean;
  created_at: string;
}

function rowToBookmark(row: BookmarkRow): Bookmark {
  return {
    id: row.id,
    userId: row.user_id,
    url: row.url,
    title: row.title,
    author: row.author ?? undefined,
    summary: row.summary ?? undefined,
    rawContent: row.raw_content ?? undefined,
    imageUrl: row.image_url ?? undefined,
    category: row.category,
    tags: row.tags || [],
    isFavorite: !!row.is_favorite,
    isRead: !!row.is_read,
    source: (row.source as Bookmark['source']) || 'linkedin',
    createdAt: row.created_at,
  };
}

/**
 * Supabase Bookmark Service implementation
 * 
 * To activate real Supabase:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Run the SQL schema found below in your Supabase SQL editor:
 * 
 * ```sql
 * create table public.bookmarks (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references auth.users(id) on delete cascade not null,
 *   url text not null,
 *   title text not null,
 *   author text,
 *   summary text,
 *   raw_content text,
 *   image_url text,
 *   category text default 'system-design',
 *   tags text[] default '{}',
 *   source text default 'linkedin',
 *   is_favorite boolean default false,
 *   is_read boolean default false,
 *   created_at timestamp with time zone default now()
 * );
 * 
 * alter table public.bookmarks enable row level security;
 * 
 * create policy "User access" on public.bookmarks
 *   for all using (auth.uid() = user_id);
 * 
 * create table public.tags (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references auth.users(id) on delete cascade not null,
 *   name text not null,
 *   created_at timestamp with time zone default now(),
 *   unique (user_id, name)
 * );
 * 
 * alter table public.tags enable row level security;
 * 
 * create policy "User tags access" on public.tags
 *   for all using (auth.uid() = user_id);
 * ```
 * 
 * 3. Set the following in `.env.local`:
 *    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 */
export class SupabaseBookmarkService implements BookmarkServiceInterface {
  private client: SupabaseClient | null = null;

  constructor() {
    this.client = getSupabaseClient();
  }

  private getClient(): SupabaseClient {
    if (!this.client) {
      throw new Error(
        'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      );
    }
    return this.client;
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    if (!this.client) return null;
    const { data: { user }, error } = await this.client.auth.getUser();
    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      avatarUrl: user.user_metadata?.avatar_url,
      isMock: false,
    };
  }

  async login(): Promise<UserProfile> {
    const client = this.getClient();
    // Default OAuth provider GitHub (can be configured to Google, Magic Link, etc.)
    // Redirect back to the current path (incl. query) so share-target params
    // like /save?url=... survive the OAuth round trip.
    const { error } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}${window.location.pathname}${window.location.search}`
            : undefined,
      },
    });

    if (error) {
      throw error;
    }

    // signInWithOAuth is navigating the browser to GitHub — there is no
    // session to return yet. Keep the promise pending so callers don't
    // surface a fake error while the redirect is in flight.
    return new Promise<UserProfile>(() => {});
  }

  async signInWithEmail(email: string): Promise<void> {
    const client = this.getClient();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/bookmarks` : undefined,
      },
    });

    if (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signOut();
  }

  private notifyChanged(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('bj-bookmarks-changed'));
    }
  }

  async getBookmarks(): Promise<Bookmark[]> {
    const client = this.getClient();
    const { data, error } = await client
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch bookmarks from Supabase:', error);
      return [];
    }

    return ((data || []) as BookmarkRow[]).map(rowToBookmark);
  }

  async getTags(): Promise<string[]> {
    const client = this.getClient();
    const { data, error } = await client
      .from('tags')
      .select('name')
      .order('name', { ascending: true });

    if (error || !data) {
      // Fallback: extract tags from bookmarks
      const bookmarks = await this.getBookmarks();
      return Array.from(new Set(bookmarks.flatMap((b) => b.tags || []))).sort();
    }

    return data.map((t: any) => t.name).filter(Boolean);
  }

  async addBookmark(data: Omit<Bookmark, 'id' | 'userId' | 'createdAt'>): Promise<Bookmark> {
    const client = this.getClient();
    const user = await this.getCurrentUser();
    if (!user) throw new Error('You must be logged in to save a bookmark');

    const normalizedTags = (data.tags || [])
      .map((t) => t.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
      .filter(Boolean);

    const payload = {
      user_id: user.id,
      url: data.url,
      title: data.title,
      author: data.author,
      summary: data.summary,
      raw_content: data.rawContent,
      image_url: data.imageUrl,
      category: data.category,
      tags: normalizedTags,
      is_favorite: data.isFavorite,
      is_read: data.isRead ?? false,
      source: data.source,
    };

    const { data: inserted, error } = await client
      .from('bookmarks')
      .insert(payload)
      .select()
      .single();

    if (error || !inserted) {
      throw error || new Error('Failed to insert bookmark');
    }

    // Dynamically insert tags into the tags table
    if (normalizedTags.length > 0) {
      try {
        const tagRows = normalizedTags.map((name) => ({
          user_id: user.id,
          name,
        }));
        await client.from('tags').upsert(tagRows, { onConflict: 'user_id,name' });
      } catch (e) {
        console.warn('Tag upsert skipped:', e);
      }
    }

    this.notifyChanged();
    return rowToBookmark(inserted as BookmarkRow);
  }

  async deleteBookmark(id: string): Promise<boolean> {
    const client = this.getClient();
    const { error } = await client.from('bookmarks').delete().eq('id', id);
    if (!error) this.notifyChanged();
    return !error;
  }

  async toggleFavorite(id: string): Promise<boolean> {
    const client = this.getClient();
    const { data, error } = await client.from('bookmarks').select('is_favorite').eq('id', id).single();
    if (error || !data) return false;

    const { error: updateError } = await client
      .from('bookmarks')
      .update({ is_favorite: !data.is_favorite })
      .eq('id', id);

    if (!updateError) this.notifyChanged();
    return !updateError;
  }

  async toggleRead(id: string): Promise<boolean> {
    const client = this.getClient();
    const { data, error } = await client.from('bookmarks').select('is_read').eq('id', id).single();
    if (error || !data) return false;

    const { error: updateError } = await client
      .from('bookmarks')
      .update({ is_read: !data.is_read })
      .eq('id', id);

    if (!updateError) this.notifyChanged();
    return !updateError;
  }
}
