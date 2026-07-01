/**
 * Reading List Page
 * 
 * Displays a list of all books, articles, papers, and blogs the author is reading or has read.
 * Each item links to its dedicated detail page at /reading/[slug].
 * 
 * Route: /reading
 * Data Source: content/reading/*.md files via lib/reading.ts
 */

import Link from 'next/link';
import Image from 'next/image';
import { FiBook, FiArrowRight } from 'react-icons/fi';
import { getReadingMetadata, ReadingMetadata } from '../../lib/reading';

/** Tailwind CSS classes for category badge styling based on reading item type */
const categoryColors: Record<string, string> = {
  book: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  article: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  paper: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  blog: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
};

/** Tailwind CSS classes for status badge styling based on reading progress */
const statusColors: Record<string, string> = {
  reading: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400',
  queued: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
};

/**
 * Main reading list page component.
 * 
 * Called by: Next.js when user navigates to /reading
 * Purpose: Fetches all reading items and renders them as a compact list with:
 * - Cover image thumbnail (or placeholder icon)
 * - Title and author
 * - Category and status badges
 * - Link to detail page
 * 
 * This is a Server Component - data fetching happens on the server.
 */
export default async function ReadingPage() {
  const readingList = await getReadingMetadata();

  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
            Reading
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            A curated list of books and articles that have shaped my perspective on systems and engineering.
          </p>
        </header>

        {readingList.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-sm text-gray-500 dark:text-gray-400">No items yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {readingList.map((item: ReadingMetadata) => (
              <Link
                key={item.slug}
                href={`/reading/${item.slug}`}
                className="group flex flex-col gap-3 p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white leading-tight">
                    <span className="link-elegant">{item.title}</span>
                  </h2>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {item.author && <span>{item.author}</span>}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    {item.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
