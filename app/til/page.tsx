import { Metadata } from 'next';
import { getAllTILEntries, groupEntriesByMonth } from '../../lib/til';
import TILTimeline from './TILTimeline';

export const metadata: Metadata = {
  title: 'Today I Learned',
  description: 'A collection of small learnings and discoveries from my daily coding journey.',
  openGraph: {
    title: 'Today I Learned | Bikash Jaiswal',
    description: 'A collection of small learnings and discoveries from my daily coding journey.',
    url: 'https://www.bikashjaiswal.com/til',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Today I Learned | Bikash Jaiswal',
    description: 'A collection of small learnings and discoveries from my daily coding journey.',
  },
  alternates: {
    canonical: '/til',
  },
};

export default async function TILPage() {
  const entries = await getAllTILEntries();
  const groupedEntries = groupEntriesByMonth(entries);

  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
            Today I Learned
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Small learnings and discoveries from my daily coding journey.
          </p>
        </div>

        {/* Timeline */}
        {entries.length > 0 ? (
          <TILTimeline entries={entries} groupedEntries={groupedEntries} />
        ) : (
          <div className="text-center py-24">
            <p className="text-sm text-gray-500 dark:text-gray-400">No entries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
