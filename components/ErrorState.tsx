'use client';

import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error;
  showHomeLink?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  error,
  showHomeLink = true,
}: ErrorStateProps) {
  const displayMessage =
    message || error?.message || 'An unexpected error occurred. Please try again later.';

  return (
    <div className="text-center py-12">
      <h2 className="text-white text-xl mb-4">{title}</h2>
      <p className="text-gray-400 mb-8">{displayMessage}</p>
      {showHomeLink && (
        <Link
          href="/"
          className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Return Home
        </Link>
      )}
    </div>
  );
}
