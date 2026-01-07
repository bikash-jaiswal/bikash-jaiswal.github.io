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
  paper: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
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
    <article className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="mb-8">
          <Link
            href="/reading"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:border-violet-500/50 transition-all text-sm group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
            <span>Back to Reading List</span>
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[item.category]}`}>
              {item.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
              {item.status}
            </span>
          </div>

          <div className="flex items-start gap-6 mb-6">
            {item.coverImage ? (
              <div className="relative w-32 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            ) : (
              <div className="p-4 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-xl border border-violet-500/20">
                <FiBook className="w-8 h-8 text-violet-400" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {item.title}
              </h1>
              {item.author && (
                <p className="text-lg text-gray-400 flex items-center gap-2">
                  <FiUser size={16} />
                  by {item.author}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-violet-400 hover:text-violet-300 hover:border-violet-500/50 transition-all text-sm"
              >
                <FiExternalLink size={14} />
                Official Website
              </a>
            )}
            {item.amazonUrl && (
              <a
                href={item.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 hover:text-orange-300 hover:border-orange-500/50 transition-all text-sm"
              >
                <FiShoppingCart size={14} />
                Buy on Amazon
              </a>
            )}
          </div>

          {item.date && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <FiCalendar size={14} />
              <span>Started: {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
          )}

          {item.rating && (
            <div className="mt-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < item.rating! ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-6
          prose-a:text-violet-400 prose-a:no-underline prose-a:border-b prose-a:border-violet-400/30 hover:prose-a:border-violet-400 prose-a:transition-colors
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-violet-300 prose-code:bg-gray-800/80 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm
          prose-pre:bg-gray-900/80 prose-pre:backdrop-blur-sm prose-pre:border prose-pre:border-gray-700/50 prose-pre:rounded-xl
          prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-violet-500/10 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-300
          prose-ul:text-gray-300 prose-ol:text-gray-300
          prose-li:marker:text-violet-400 prose-li:my-2
          prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-10
          prose-hr:border-gray-800 prose-hr:my-12
        ">
          <MarkdownContent content={content} />
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-gray-800/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FiFileText className="text-violet-400" />
              Related Blog Posts
            </h2>
            <div className="grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-5 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-violet-500/30 transition-all group"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors mb-2">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-gray-400 text-sm line-clamp-2">{post.subtitle}</p>
                  )}
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span>{new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}</span>
                    {post.readingTime && <span>{post.readingTime} min read</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 pt-8 border-t border-gray-800/50">
          <Link
            href="/reading"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-violet-500/50 transition-all group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
            <span>Back to Reading List</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
