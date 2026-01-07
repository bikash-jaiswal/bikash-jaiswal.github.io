/**
 * Blog Type Definitions
 * 
 * TypeScript interfaces for blog post data structures.
 * Used throughout the application for type safety when handling blog content.
 */

import { GrayMatterFile } from 'gray-matter';

/**
 * Metadata for a blog post.
 * Parsed from the YAML frontmatter of each markdown file in content/posts/.
 * 
 * @property title - Display title of the blog post (required)
 * @property date - Publication date in YYYY-MM-DD format (required)
 * @property slug - URL-friendly identifier derived from filename (required)
 * @property subtitle - Optional subtitle/description for the post
 * @property content - Optional raw markdown content (usually fetched separately)
 * @property tags - Optional array of categorization tags
 * @property author - Optional author name (defaults to site owner)
 * @property readingTime - Calculated reading time in minutes
 * @property coverImage - Optional path to cover/hero image
 */
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

/**
 * Full blog post content as returned by gray-matter.
 * Includes both the parsed frontmatter (data) and the markdown body (content).
 */
export type PostContent = GrayMatterFile<string>;
