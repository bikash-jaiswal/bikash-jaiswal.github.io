import { GrayMatterFile } from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  subtitle?: string;
  slug: string;
}

export interface BlogPageProps {
  blogNum?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Removed PostDetailsProps - using Next.js native types instead

export type PostContent = GrayMatterFile<string>;
