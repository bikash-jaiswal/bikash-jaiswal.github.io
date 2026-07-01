'use client';

import React from 'react';
import Link from 'next/link';

interface StateProps {
  variant: 'empty' | 'error';
  title?: string;
  message?: string;
  description?: string;
  searchTerm?: string;
  showHomeLink?: boolean;
  error?: Error;
}

export const State: React.FC<StateProps> = ({
  variant,
  title,
  message,
  description,
  searchTerm,
  showHomeLink = false,
  error,
}) => {
  // Empty state logic
  if (variant === 'empty') {
    const displayTitle =
      title || (searchTerm ? `No posts found for "${searchTerm}"` : 'No Posts Found');
    const displayMessage =
      message ||
      (searchTerm
        ? 'Try adjusting your search terms or browse all posts.'
        : 'There are no blog posts available at the moment.');

    return (
      <div className="text-center py-24">
        <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">{displayTitle}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">{displayMessage}</p>
        {showHomeLink && (
          <Link
            href="/"
            className="inline-flex px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Back Home
          </Link>
        )}
      </div>
    );
  }

  // Error state logic
  const displayTitle = title || 'Something went wrong';
  const displayMessage = message || error?.message || 'An unexpected error occurred.';

  return (
    <div className="text-center py-24">
      <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mb-4">{displayTitle}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">{displayMessage}</p>
      {showHomeLink && (
        <Link
          href="/"
          className="inline-flex px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Back Home
        </Link>
      )}
    </div>
  );
};

// Backward compatibility exports
export function EmptyState(props: Omit<StateProps, 'variant'>) {
  return <State variant="empty" {...props} />;
}

export function ErrorState(props: Omit<StateProps, 'variant'>) {
  return <State variant="error" {...props} />;
}

export default State;
