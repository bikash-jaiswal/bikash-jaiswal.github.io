-- Public read access for bookmarks.
-- Anonymous visitors may SELECT only non-sensitive columns of rows flagged
-- is_public. raw_content and user_id stay private; writes remain owner-only
-- via the existing "Users can manage their own bookmarks" policy.

alter table public.bookmarks
  add column if not exists is_public boolean not null default true;

create index if not exists idx_bookmarks_public on public.bookmarks(is_public)
  where is_public;

-- Permissive read policy: OR-ed with the owner policy, so the owner still
-- sees every own row while anon sees only public ones.
create policy "Public read access"
  on public.bookmarks for select
  using (is_public = true);

-- Column-level grant: PostgREST runs as `anon`, so anon never touches
-- raw_content / user_id / is_public even if it crafts a request for them.
revoke select on public.bookmarks from anon;
grant select (id, url, title, author, summary, image_url, category, tags, source, created_at)
  on public.bookmarks to anon;
