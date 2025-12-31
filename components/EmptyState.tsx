'use client';

import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  message?: string;
  searchTerm?: string;
  showHomeLink?: boolean;
}

export function EmptyState({ title, message, searchTerm, showHomeLink = false }: EmptyStateProps) {
  const displayTitle =
    title || (searchTerm ? `No posts found for "${searchTerm}"` : 'No Posts Found');
  const displayMessage =
    message ||
    (searchTerm
      ? 'Try adjusting your search terms or browse all posts.'
      : 'There are no blog posts available at the moment.');

  return (
    <div className="text-center py-12">
      <h2 className="text-white text-xl mb-4">{displayTitle}</h2>
      <p className="text-gray-400 mb-8">{displayMessage}</p>
      {showHomeLink && (
        <Link
          href="/"
          className="inline-block text-white px-6 py-3 border-2 border-white hover:bg-violet-600 transition-colors duration-200 rounded-md"
        >
          Return Home
        </Link>
      )}
    </div>
  );
}
