/**
 * Resource domain models
 * 
 * These types define the core domain entities for the resources feature.
 */

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  tags: string[];
  favorite?: boolean;
  dateAdded: string;
  icon?: string;
}

export type ResourceCategory = 
  | 'tool' 
  | 'reference' 
  | 'library' 
  | 'framework' 
  | 'tutorial' 
  | 'course' 
  | 'book' 
  | 'article' 
  | 'documentation'
  | 'cheatsheet'
  | 'video'
  | 'podcast'
  | 'template'
  | 'online-tool'
  | 'newsletter'
  | 'blog'
  | 'community'
  | 'forum'
  | 'news-source'
  | 'job-board'
  | 'ai-tool'
  | 'software-tool'
  | 'machine-learning'
  | 'deep-learning'
  | 'natural-language-processing'
  | 'computer-vision'
  | 'system-design';

export interface ResourceFilters {
  category?: ResourceCategory | 'all';
  searchTerm: string;
  showFavoritesOnly: boolean;
  tags: string[];
}
