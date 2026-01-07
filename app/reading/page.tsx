import Link from 'next/link';
import Image from 'next/image';
import { FiBook, FiArrowRight } from 'react-icons/fi';
import { getReadingMetadata, ReadingMetadata } from '../../lib/reading';

const categoryColors: Record<string, string> = {
  book: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  article: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  paper: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  blog: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
};

const statusColors: Record<string, string> = {
  reading: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400',
  queued: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
};

export default async function ReadingPage() {
  const readingList = await getReadingMetadata();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FiBook className="w-8 h-8 text-violet-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Stuff I am Reading</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            A curated list of books, articles, and papers I&apos;m currently reading or have found valuable.
          </p>
        </div>

        {readingList.length === 0 ? (
          <div className="text-center py-12">
            <FiBook className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No reading items yet. Add markdown files to content/reading/</p>
          </div>
        ) : (
          <div className="space-y-3">
            {readingList.map((item: ReadingMetadata) => (
              <Link
                key={item.slug}
                href={`/reading/${item.slug}`}
                className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 hover:border-violet-500/30 transition-all duration-300 group"
              >
                {item.coverImage ? (
                  <div className="relative w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                    <FiBook className="w-5 h-5 text-violet-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-violet-400 transition-colors truncate">
                      {item.title}
                    </h2>
                    <FiArrowRight className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.author && <span>by {item.author}</span>}
                    {item.author && item.notes && <span className="mx-2">·</span>}
                    {item.notes && <span className="text-gray-500 dark:text-gray-500 italic">{item.notes}</span>}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
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
