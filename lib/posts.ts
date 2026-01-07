/**
 * Blog Posts Data Layer
 * 
 * This module handles all data operations for the blog feature.
 * It reads markdown files from content/posts/ directory and provides functions
 * to fetch metadata and content for blog posts.
 * 
 * Used by:
 * - app/blog/page.tsx (list all blog posts)
 * - app/blog/[slug]/page.tsx (individual blog post)
 * - app/reading/[slug]/page.tsx (to fetch related posts)
 */

import { readdir, readFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostContent, PostMetadata } from '../types/blog';
import { sortByDate } from '../lib/date';

/** Absolute path to the blog posts content directory */
const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

/** Flag to determine if caching should be bypassed (disabled in development for hot reload) */
const isDev = process.env.NODE_ENV === 'development';

/**
 * In-memory cache for blog post data.
 * Improves build performance by avoiding repeated file system reads.
 * Cache is bypassed in development mode for hot reload support.
 */
const cache = {
  metadata: null as PostMetadata[] | null,
  content: new Map<string, string | null>(),
};

/**
 * Type guard to validate that parsed frontmatter contains required PostMetadata fields.
 * Ensures title, date, and slug are present and are strings.
 * 
 * @param data - Parsed frontmatter data from gray-matter
 * @returns True if data conforms to PostMetadata interface
 */
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

/**
 * Type guard to validate that parsed markdown file contains valid PostContent structure.
 * Ensures content string and required metadata fields exist.
 * 
 * @param data - Parsed result from gray-matter
 * @returns True if data conforms to PostContent interface
 */
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

/**
 * Converts a markdown filename to a URL-friendly slug.
 * Example: "why-system-design.md" -> "why-system-design"
 * 
 * @param filename - The markdown filename with .md extension
 * @returns The slug without the .md extension
 */
function createSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

/**
 * Calculates estimated reading time for a blog post.
 * Uses average reading speed of 200 words per minute.
 * 
 * @param text - The full text content of the blog post
 * @returns Estimated reading time in minutes (minimum 1)
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Normalizes date strings to consistent YYYY-MM-DD format.
 * Handles timezone issues by parsing with explicit time component.
 * 
 * @param date - Date string in various formats (e.g., 'YYYY-MM-DD', '2024-01-15')
 * @returns Normalized date string in YYYY-MM-DD format, or original if parsing fails
 */
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

/**
 * Parses a single blog post markdown file and extracts its metadata.
 * Uses gray-matter to parse YAML frontmatter and calculates reading time.
 * 
 * @param filePath - Absolute path to the markdown file
 * @param slug - URL-friendly identifier for the post
 * @returns PostMetadata object if valid, null if parsing fails or metadata is invalid
 */
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

/**
 * Fetches metadata for all blog posts.
 * 
 * Called by:
 * - app/blog/page.tsx to display the blog post list
 * - app/blog/[slug]/page.tsx generateStaticParams() for static site generation
 * - app/reading/[slug]/page.tsx to find related posts
 * 
 * How it works:
 * 1. Returns cached data if available (production only)
 * 2. Reads all .md files from content/posts/ directory
 * 3. Parses frontmatter from each file
 * 4. Sorts by date (newest first)
 * 5. Caches and returns the result
 * 
 * @returns Array of PostMetadata sorted by date descending
 */
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

/**
 * Fetches the markdown content (body) for a specific blog post.
 * 
 * Called by: app/blog/[slug]/page.tsx to render the blog post content
 * 
 * @param slug - URL-friendly identifier (e.g., "why-system-design")
 * @returns Markdown content string (without frontmatter), or null if not found
 */
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

/**
 * Fetches a single blog post by its slug.
 * More efficient than getPostMetadata() when you only need one post.
 * 
 * Called by:
 * - app/blog/[slug]/page.tsx to get post metadata for display
 * - generateMetadata() for SEO metadata
 * 
 * @param slug - URL-friendly identifier (e.g., "why-system-design")
 * @returns PostMetadata object if found, null otherwise
 */
export async function getPostItem(slug: string): Promise<PostMetadata | null> {
  const posts = await getPostMetadata();
  return posts.find((post) => post.slug === slug) ?? null;
}

/**
 * Clears the in-memory cache for blog posts.
 * Useful for testing or forcing a refresh of data.
 * 
 * Called by: Test utilities or manual cache invalidation
 */
export function clearCache(): void {
  cache.metadata = null;
  cache.content.clear();
}
