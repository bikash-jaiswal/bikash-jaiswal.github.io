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

export interface PostDetailsProps {
  params: {
    slug: string;
  };
}

export type PostContent = GrayMatterFile<string>;
