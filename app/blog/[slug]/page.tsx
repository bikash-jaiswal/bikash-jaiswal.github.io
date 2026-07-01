/**
 * Blog Post Detail Page
 * 
 * Displays a single blog post with full content, metadata, and related features.
 * Uses dynamic imports for performance optimization of non-critical components.
 * 
 * Route: /blog/[slug]
 * Data Source: content/posts/*.md files via lib/posts.ts
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPostContent, getPostMetadata, getPostItem } from '../../../lib/posts';
import { PostMetadata } from '../../../types/blog';
import ReadingProgress from './ReadingProgress';
import { Metadata } from 'next';

/**
 * Dynamically imported RelatedPosts component.
 * Loaded lazily to improve initial page load performance.
 * Shows skeleton loading state while component loads.
 */
const RelatedPosts = dynamic(() => import('./RelatedPosts'), {
  loading: () => (
    <div className="grid md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse h-40 bg-gray-800/50 rounded-2xl" />
      ))}
    </div>
  ),
});

/**
 * Dynamically imported MarkdownContent component.
 * Renders the blog post markdown content with syntax highlighting.
 * Shows skeleton loading state while component and content loads.
 */
const MarkdownContent = dynamic(() => import('./MarkdownContent'), {
  loading: () => (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 bg-gray-800/50 rounded w-full" />
          <div className="h-4 bg-gray-800/50 rounded w-5/6" />
          <div className="h-4 bg-gray-800/50 rounded w-4/6" />
        </div>
      ))}
    </div>
  ),
});

/** Dynamically imported TableOfContents - generates navigation from headings */
const TableOfContents = dynamic(() => import('./TableOfContents'));

/** Dynamically imported ShareButtons - social media sharing functionality */
const ShareButtons = dynamic(() => import('./ShareButtons'));

/** Dynamically imported NewsletterSignup - email subscription form */
const NewsletterSignup = dynamic(() => import('../../../components/NewsletterSignup'));

/**
 * Props for the dynamic blog post page.
 * Next.js App Router passes params as a Promise for dynamic routes.
 */
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/** Base URL for the site, used for generating canonical URLs and OpenGraph metadata */
const SITE_URL = 'https://www.bikashjaiswal.com';


/**
 * Generates dynamic metadata for SEO and social sharing.
 * 
 * Called by: Next.js at build time for each static page.
 * Purpose: Provides page-specific title, description, OpenGraph data, and Twitter cards
 * for search engines and social media previews.
 * 
 * @param params - Contains the slug from the URL (e.g., /blog/why-system-design)
 * @returns Metadata object with title, description, openGraph, twitter, and canonical URL
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const allPosts = await getPostMetadata();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.subtitle || `Read ${post.title} on Bikash Jaiswal's blog`;

  return {
    title: post.title,
    description,
    authors: [{ name: post.author || 'Bikash Jaiswal' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Bikash Jaiswal'],
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'Bikash Jaiswal',
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

/**
 * Pre-generates all possible URL paths for static site generation (SSG).
 * 
 * Called by: Next.js at build time when using `output: 'export'` in next.config.js.
 * Purpose: Tells Next.js which dynamic routes to pre-render as static HTML files.
 * Without this function, dynamic routes like /blog/[slug] cannot be statically exported.
 * 
 * How it works:
 * 1. Fetches all blog posts from content/posts/*.md files
 * 2. Returns an array of { slug } objects for each post
 * 3. Next.js generates a static HTML page for each slug
 * 
 * @returns Array of slug parameters for all blog posts
 */
export async function generateStaticParams() {
  const posts = await getPostMetadata();
  return posts.map((post: PostMetadata) => ({
    slug: post.slug,
  }));
}

/**
 * Main page component for displaying a single blog post.
 * 
 * Called by: Next.js when a user navigates to /blog/[slug]
 * Purpose: Renders the full blog post page including:
 * - Reading progress indicator
 * - Hero section with cover image, title, and metadata
 * - Markdown content with syntax highlighting
 * - Table of contents for navigation
 * - Social share buttons
 * - Newsletter signup form
 * - Related posts section
 * 
 * This is a Server Component - data fetching happens on the server.
 * 
 * @param params - Contains the slug from the URL to identify which post to display
 */
export default async function PostDetails({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [content, post, allPosts] = await Promise.all([
    getPostContent(slug),
    getPostItem(slug),
    getPostMetadata(),
  ]);

  if (!content || !post) {
    notFound();
  }

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <ReadingProgress readingTime={post.readingTime || 1} />
      
      <article className="min-h-screen py-24">
        <div className="container-narrow">
          <nav className="mb-12 animate-in fade-in slide-in-from-left-2 duration-500">
            <Link
              href="/blog"
              className="link-elegant inline-flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              <FiArrowLeft size={14} />
              <span>Back to blog</span>
            </Link>
          </nav>

          <header className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="flex items-center gap-4 mb-8">
              <time dateTime={post.date} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                {formattedDate}
              </time>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                {post.readingTime || 1} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-8 leading-[1.1]">
              {post.title}
            </h1>
            
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                {post.subtitle}
              </p>
            )}

            <div className="mt-12 flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 flex items-center justify-center text-sm font-bold text-black dark:text-white border border-gray-200 dark:border-white/10">
                  B
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-black dark:text-white">Bikash Jaiswal</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Senior AI Engineer</span>
                </div>
              </div>
              <ShareButtons title={post.title} url={`${SITE_URL}/blog/${slug}`} />
            </div>
          </header>

          <div className="prose prose-elegant">
            <MarkdownContent content={content} />
          </div>

          <footer className="mt-32 pt-16 border-t border-gray-200 dark:border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-20">
              <RelatedPosts posts={allPosts} currentSlug={slug} />
              
              <div className="flex flex-col items-center gap-8 py-16">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Thanks for reading.</p>
                <Link
                  href="/blog"
                  className="link-elegant inline-flex items-center gap-1 text-sm font-semibold text-black dark:text-white"
                >
                  <FiArrowLeft size={14} />
                  <span>View all articles</span>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
