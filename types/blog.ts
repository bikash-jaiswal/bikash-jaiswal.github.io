import { GrayMatterFile } from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  subtitle?: string;
  content?: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
  coverImage?: string;
}

export type PostContent = GrayMatterFile<string>;
