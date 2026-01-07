/**
 * Reading List Data Layer
 * 
 * This module handles all data operations for the "Stuff I am Reading" feature.
 * It reads markdown files from content/reading/ directory and provides functions
 * to fetch metadata and content for reading items (books, articles, papers, blogs).
 * 
 * Used by:
 * - app/reading/page.tsx (list all reading items)
 * - app/reading/[slug]/page.tsx (individual reading item details)
 */

import { readdir, readFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';

/** Absolute path to the reading content directory */
const READING_DIRECTORY = path.join(process.cwd(), 'content/reading');

/** Flag to determine if caching should be bypassed (disabled in development for hot reload) */
const isDev = process.env.NODE_ENV === 'development';

/**
 * Metadata structure for a reading item.
 * Parsed from the YAML frontmatter of each markdown file in content/reading/.
 * 
 * @property title - Display title of the book/article
 * @property author - Author name (optional)
 * @property slug - URL-friendly identifier derived from filename
 * @property category - Type of reading material
 * @property status - Current reading progress
 * @property coverImage - Path to cover image in public/ directory
 * @property url - Link to official website or source
 * @property amazonUrl - Amazon affiliate/purchase link
 * @property date - Date started reading (YYYY-MM-DD format)
 * @property notes - Brief description or notes about the item
 * @property rating - Personal rating out of 5
 * @property tags - Categorization tags for filtering
 * @property relatedPosts - Array of blog post slugs that relate to this reading
 */
export interface ReadingMetadata {
  title: string;
  author?: string;
  slug: string;
  category: 'book' | 'article' | 'paper' | 'blog';
  status: 'reading' | 'completed' | 'queued';
  coverImage?: string;
  url?: string;
  amazonUrl?: string;
  date: string;
  notes?: string;
  rating?: number;
  tags?: string[];
  relatedPosts?: string[];
}

/**
 * In-memory cache for reading data.
 * Improves build performance by avoiding repeated file system reads.
 * Cache is bypassed in development mode for hot reload support.
 */
const cache = {
  metadata: null as ReadingMetadata[] | null,
  content: new Map<string, string | null>(),
};

/**
 * Converts a markdown filename to a URL-friendly slug.
 * Example: "understanding-distributed-systems.md" -> "understanding-distributed-systems"
 * 
 * @param filename - The markdown filename with .md extension
 * @returns The slug without the .md extension
 */
function createSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

/**
 * Parses a single reading markdown file and extracts its metadata.
 * Uses gray-matter to parse YAML frontmatter from the markdown file.
 * 
 * @param filePath - Absolute path to the markdown file
 * @param slug - URL-friendly identifier for the reading item
 * @returns ReadingMetadata object if valid, null if parsing fails or metadata is invalid
 */
async function parseReadingFile(filePath: string, slug: string): Promise<ReadingMetadata | null> {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    const { data } = matter(fileContent);

    const metadata: ReadingMetadata = {
      ...data,
      slug,
    } as ReadingMetadata;

    if (!metadata.title || !metadata.category || !metadata.status) {
      console.error(`Invalid metadata in reading/${slug}.md`);
      return null;
    }

    return metadata;
  } catch (error) {
    console.error(`Error parsing reading/${slug}.md:`, error);
    return null;
  }
}

/**
 * Fetches metadata for all reading items.
 * 
 * Called by:
 * - app/reading/page.tsx to display the reading list
 * - app/reading/[slug]/page.tsx generateStaticParams() for static site generation
 * - getReadingItem() to find a specific reading item
 * 
 * How it works:
 * 1. Returns cached data if available (production only)
 * 2. Reads all .md files from content/reading/ directory
 * 3. Parses frontmatter from each file
 * 4. Sorts by status (reading -> queued -> completed)
 * 5. Caches and returns the result
 * 
 * @returns Array of ReadingMetadata sorted by reading status
 */
export async function getReadingMetadata(): Promise<ReadingMetadata[]> {
  if (!isDev && cache.metadata) return cache.metadata;

  if (!existsSync(READING_DIRECTORY)) {
    mkdirSync(READING_DIRECTORY, { recursive: true });
    return [];
  }

  try {
    const files = await readdir(READING_DIRECTORY);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const items = await Promise.all(
      mdFiles.map((file) => {
        const filePath = path.join(READING_DIRECTORY, file);
        const slug = createSlug(file);
        return parseReadingFile(filePath, slug);
      })
    );

    const validItems = items.filter((item): item is ReadingMetadata => item !== null);
    cache.metadata = validItems.sort((a, b) => {
      const statusOrder = { reading: 0, queued: 1, completed: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
    return cache.metadata;
  } catch (error) {
    console.error('Error reading reading directory:', error);
    return [];
  }
}

/**
 * Fetches the markdown content (body) for a specific reading item.
 * 
 * Called by: app/reading/[slug]/page.tsx to render the reading notes/content
 * 
 * @param slug - URL-friendly identifier (e.g., "understanding-distributed-systems")
 * @returns Markdown content string (without frontmatter), or null if not found
 */
export async function getReadingContent(slug: string): Promise<string | null> {
  if (!isDev && cache.content.has(slug)) {
    return cache.content.get(slug) ?? null;
  }

  const filePath = path.join(READING_DIRECTORY, `${slug}.md`);

  if (!existsSync(filePath)) {
    cache.content.set(slug, null);
    return null;
  }

  try {
    const fileContent = await readFile(filePath, 'utf8');
    const matterResult = matter(fileContent);
    cache.content.set(slug, matterResult.content);
    return matterResult.content;
  } catch (error) {
    console.error(`Error reading reading/${slug}.md:`, error);
    cache.content.set(slug, null);
    return null;
  }
}

/**
 * Fetches metadata for a single reading item by its slug.
 * 
 * Called by:
 * - app/reading/[slug]/page.tsx generateMetadata() for SEO
 * - app/reading/[slug]/page.tsx ReadingDetails() component
 * 
 * @param slug - URL-friendly identifier (e.g., "understanding-distributed-systems")
 * @returns ReadingMetadata object if found, null otherwise
 */
export async function getReadingItem(slug: string): Promise<ReadingMetadata | null> {
  const items = await getReadingMetadata();
  return items.find((item) => item.slug === slug) ?? null;
}
