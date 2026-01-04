import { readdir, readFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostContent, PostMetadata } from '../types/blog';
import { sortByDate } from '../lib/date';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');
const isDev = process.env.NODE_ENV === 'development';

const cache = {
  metadata: null as PostMetadata[] | null,
  content: new Map<string, string | null>(),
};

function isValidMetadata(data: unknown): data is PostMetadata {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.title === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.slug === 'string' &&
    (obj.subtitle === undefined || typeof obj.subtitle === 'string')
  );
}

function isValidContent(data: unknown): data is PostContent {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  const contentData = obj.data as Record<string, unknown> | undefined;
  return (
    typeof obj.content === 'string' &&
    typeof contentData === 'object' &&
    contentData !== null &&
    typeof contentData.title === 'string' &&
    typeof contentData.date === 'string'
  );
}

function createSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function formatDateString(date: string): string {
  // Parse date string directly to avoid timezone issues
  // Input format: 'YYYY-MM-DD' or similar
  const parsed = new Date(date + 'T00:00:00');
  if (isNaN(parsed.getTime())) {
    return date; // Return original if parsing fails
  }
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function parsePostFile(filePath: string, slug: string): Promise<PostMetadata | null> {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const metadata: PostMetadata = {
      ...data,
      date: formatDateString(data.date),
      slug,
      readingTime: calculateReadingTime(content),
    } as PostMetadata;

    if (!isValidMetadata(metadata)) {
      console.error(`Invalid metadata in ${slug}.md`);
      return null;
    }

    return metadata;
  } catch (error) {
    console.error(`Error parsing ${slug}.md:`, error);
    return null;
  }
}

export async function getPostMetadata(): Promise<PostMetadata[]> {
  if (!isDev && cache.metadata) return cache.metadata;

  if (!existsSync(POSTS_DIRECTORY)) {
    mkdirSync(POSTS_DIRECTORY, { recursive: true });
    return [];
  }

  try {
    const files = await readdir(POSTS_DIRECTORY);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map((file) => {
        const filePath = path.join(POSTS_DIRECTORY, file);
        const slug = createSlug(file);
        return parsePostFile(filePath, slug);
      })
    );

    const validPosts = posts.filter((post): post is PostMetadata => post !== null);
    cache.metadata = sortByDate(validPosts);
    return cache.metadata;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export async function getPostContent(slug: string): Promise<string | null> {
  if (!isDev && cache.content.has(slug)) {
    return cache.content.get(slug) ?? null;
  }

  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!existsSync(filePath)) {
    cache.content.set(slug, null);
    return null;
  }

  try {
    const fileContent = await readFile(filePath, 'utf8');
    const matterResult = matter(fileContent);

    if (!isValidContent(matterResult)) {
      console.error(`Invalid content in ${slug}.md`);
      cache.content.set(slug, null);
      return null;
    }

    cache.content.set(slug, matterResult.content);
    return matterResult.content;
  } catch (error) {
    console.error(`Error reading ${slug}.md:`, error);
    cache.content.set(slug, null);
    return null;
  }
}

export function clearCache(): void {
  cache.metadata = null;
  cache.content.clear();
}
