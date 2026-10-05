-- ==============================================================================
-- Supabase Migration: Bookmarks and Tags for bikashjaiswal.com
-- ==============================================================================
-- 1. Create Bookmarks Table
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  url text not null,
  title text not null,
  author text,
  summary text,
  raw_content text,
  image_url text,
  category text default 'machine-learning',
  tags text[] default '{}',
  source text default 'linkedin',
  is_favorite boolean default false,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS) on Bookmarks
alter table public.bookmarks enable row level security;

-- Drop existing policy if re-running
drop policy if exists "Users can manage their own bookmarks" on public.bookmarks;

create policy "Users can manage their own bookmarks"
  on public.bookmarks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create Index for high performance queries
create index if not exists idx_bookmarks_user_id on public.bookmarks(user_id);
create index if not exists idx_bookmarks_created_at on public.bookmarks(created_at desc);

-- ------------------------------------------------------------------------------
-- 2. Create Dynamic Tags Table
-- ------------------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default now(),
  unique (user_id, name)
);

-- Enable Row Level Security (RLS) on Tags
alter table public.tags enable row level security;

-- Drop existing policy if re-running
drop policy if exists "Users can manage their own tags" on public.tags;

create policy "Users can manage their own tags"
  on public.tags for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists idx_tags_user_id on public.tags(user_id);
