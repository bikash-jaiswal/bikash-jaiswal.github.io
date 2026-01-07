import { readdir, readFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';

const READING_DIRECTORY = path.join(process.cwd(), 'content/reading');
const isDev = process.env.NODE_ENV === 'development';

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

const cache = {
  metadata: null as ReadingMetadata[] | null,
  content: new Map<string, string | null>(),
};

function createSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

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

export async function getReadingItem(slug: string): Promise<ReadingMetadata | null> {
  const items = await getReadingMetadata();
  return items.find((item) => item.slug === slug) ?? null;
}
