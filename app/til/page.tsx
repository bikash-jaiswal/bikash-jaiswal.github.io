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
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Today I{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Learned
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of bite-sized learnings from my daily coding journey. 
            Small steps, big progress. 🚀
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12 p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{entries.length}</div>
            <div className="text-sm text-gray-400">Learnings</div>
          </div>
          <div className="w-px bg-gray-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{Object.keys(groupedEntries).length}</div>
            <div className="text-sm text-gray-400">Months</div>
          </div>
          <div className="w-px bg-gray-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {[...new Set(entries.flatMap(e => e.tags))].length}
            </div>
            <div className="text-sm text-gray-400">Topics</div>
          </div>
        </div>

        {/* Timeline */}
        {entries.length > 0 ? (
          <TILTimeline entries={entries} groupedEntries={groupedEntries} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No learnings yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
