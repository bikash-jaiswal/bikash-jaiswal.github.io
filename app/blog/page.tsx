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
import { ErrorState } from '../../components/ui/State';
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
      <div className="container-narrow py-24">
        <ErrorState error={error} showHomeLink />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Articles and insights on software development, technology, and personal projects.
          </p>
        </header>
        <Suspense fallback={<LoadingState count={3} />}>
          <ClientBlogContent initialPosts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
