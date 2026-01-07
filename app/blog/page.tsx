/**
 * Blog List Page
 * 
 * Displays a list of all blog posts with search and filtering capabilities.
 * Uses Server Component for initial data fetch and Client Component for interactivity.
 * 
 * Route: /blog
 * Data Source: content/posts/*.md files via lib/posts.ts
 */

import { Suspense } from 'react';
import { getPostMetadata } from '../../lib/posts';
import { PostMetadata } from '../../types/blog';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import ClientBlogContent from './ClientBlogContent';
import { Metadata } from 'next';

/** Static metadata for SEO - applies to the /blog listing page */
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and insights on software development, technology, and personal projects.',
  openGraph: {
    title: 'Blog | Bikash Jaiswal',
    description:
      'Articles and insights on software development, technology, and personal projects.',
    url: 'https://bikash-jaiswal.github.io/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Bikash Jaiswal',
    description:
      'Articles and insights on software development, technology, and personal projects.',
  },
  alternates: {
    canonical: '/blog',
  },
};

/**
 * Main blog listing page component.
 * 
 * Called by: Next.js when user navigates to /blog
 * Purpose: Fetches all blog posts and passes them to ClientBlogContent for rendering.
 * 
 * This is a Server Component that:
 * 1. Fetches post metadata on the server
 * 2. Handles errors gracefully with ErrorState component
 * 3. Uses Suspense for loading state
 * 4. Delegates interactive features (search, filtering) to ClientBlogContent
 */
export default async function BlogPage(): Promise<React.ReactElement> {
  let posts: PostMetadata[] = [];
  let error: Error | null = null;

  try {
    posts = await getPostMetadata();
  } catch (e) {
    error = e instanceof Error ? e : new Error('Failed to load posts');
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ErrorState error={error} showHomeLink />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-bold text-white text-2xl mb-8 text-center">Blog Posts</h1>
      <Suspense fallback={<LoadingState count={3} />}>
        <ClientBlogContent initialPosts={posts} />
      </Suspense>
    </div>
  );
}
