import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiBook, FiExternalLink, FiUser, FiCalendar, FiFileText, FiShoppingCart } from 'react-icons/fi';
import { getReadingMetadata, getReadingContent, getReadingItem } from '../../../lib/reading';
import { getPostMetadata } from '../../../lib/posts';
import { Metadata } from 'next';
import MarkdownContent from '../../blog/[slug]/MarkdownContent';

/**
 * Props for the dynamic reading detail page.
 * Next.js App Router passes params as a Promise for dynamic routes.
 */
type Props = {
  params: Promise<{ slug: string }>;
};

/** Base URL for the site, used for generating canonical URLs and OpenGraph metadata */
const SITE_URL = 'https://www.bikashjaiswal.com';

/** Tailwind CSS classes for category badge styling based on reading item type */
const categoryColors = {
  book: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  article: 'bg-green-500/20 text-green-400 border-green-500/30',
  paper: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  blog: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

/** Tailwind CSS classes for status badge styling based on reading progress */
const statusColors = {
  reading: 'bg-yellow-500/20 text-yellow-400',
  completed: 'bg-green-500/20 text-green-400',
  queued: 'bg-gray-500/20 text-gray-400',
};

/**
 * Generates dynamic metadata for SEO and social sharing.
 * 
 * Called by: Next.js at build time for each static page, and at request time for dynamic pages.
 * Purpose: Provides page-specific title, description, and OpenGraph data for search engines
 * and social media previews (Twitter cards, Facebook shares, etc.).
 * 
 * @param params - Contains the slug from the URL (e.g., /reading/understanding-distributed-systems)
 * @returns Metadata object with title, description, openGraph, and canonical URL
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const item = await getReadingItem(slug);

  if (!item) {
    return {
      title: 'Reading Not Found',
    };
  }

  const description = item.notes || `My learnings and notes from ${item.title}`;

  return {
    title: `${item.title} - Reading Notes`,
    description,
    openGraph: {
      title: `${item.title} - Reading Notes`,
      description,
      type: 'article',
      url: `${SITE_URL}/reading/${slug}`,
      siteName: 'Bikash Jaiswal',
    },
    alternates: {
      canonical: `${SITE_URL}/reading/${slug}`,
    },
  };
}

/**
 * Pre-generates all possible URL paths for static site generation (SSG).
 * 
 * Called by: Next.js at build time when using `output: 'export'` in next.config.js.
 * Purpose: Tells Next.js which dynamic routes to pre-render as static HTML files.
 * Without this function, dynamic routes like /reading/[slug] cannot be statically exported.
 * 
 * How it works:
 * 1. Fetches all reading items from content/reading/*.md files
 * 2. Returns an array of { slug } objects for each reading item
 * 3. Next.js generates a static HTML page for each slug (e.g., /reading/understanding-distributed-systems/index.html)
 * 
 * @returns Array of slug parameters for all reading items
 */
export async function generateStaticParams() {
  const items = await getReadingMetadata();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * Main page component for displaying a single reading item's details.
 * 
 * Called by: Next.js when a user navigates to /reading/[slug]
 * Purpose: Renders the full reading item page including:
 * - Book/article metadata (title, author, cover image, rating)
 * - External links (official website, Amazon purchase link)
 * - Markdown content with notes and learnings
 * - Related blog posts that reference this reading item
 * 
 * @param params - Contains the slug from the URL to identify which reading item to display
 */
export default async function ReadingDetails({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [content, item, allPosts] = await Promise.all([
    getReadingContent(slug),
    getReadingItem(slug),
    getPostMetadata(),
  ]);

  if (!item || !content) {
    notFound();
  }

  const relatedPosts = item.relatedPosts
    ? allPosts.filter((post) => item.relatedPosts?.includes(post.slug))
    : [];

  return (
    <article className="min-h-screen py-24">
      <div className="container-narrow">
        <nav className="mb-12">
          <Link
            href="/reading"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} />
            <span>Back to reading list</span>
          </Link>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5 px-2 py-0.5 rounded">
              {item.category}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {item.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
            {item.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6">
            {item.author && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiUser size={14} />
                <span>{item.author}</span>
              </div>
            )}
            {item.date && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <FiCalendar size={14} />
                <span>{new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <FiExternalLink size={14} />
                <span>Official site</span>
              </a>
            )}
            {item.amazonUrl && (
              <a
                href={item.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <FiShoppingCart size={14} />
                <span>View on Amazon</span>
              </a>
            )}
          </div>
        </header>

        <div className="prose prose-elegant">
          <MarkdownContent content={content} />
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-24 pt-12 border-t border-gray-100 dark:border-white/5">
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-8">Related writing</h2>
            <div className="grid gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <h3 className="text-lg font-bold tracking-tight text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{post.subtitle}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-24 pt-12 border-t border-gray-100 dark:border-white/5 flex justify-center">
          <Link
            href="/reading"
            className="text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Back to reading list
          </Link>
        </footer>
      </div>
    </article>
  );
}
