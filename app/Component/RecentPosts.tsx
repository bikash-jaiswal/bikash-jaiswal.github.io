"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Post {
  slug: string;
  title: string;
  date: string;
}

const RecentPosts: React.FC = () => {
  // This would typically be fetched from your data source
  // For now, we'll use placeholder data
  const recentPosts: Post[] = [
    {
      slug: 'example-post-1',
      title: 'Getting Started with Next.js',
      date: '2025-05-30'
    },
    {
      slug: 'example-post-2',
      title: 'UI/UX Best Practices for Developers',
      date: '2025-05-25'
    },
    {
      slug: 'example-post-3',
      title: 'Investing in Tech Startups: A Guide',
      date: '2025-05-20'
    }
  ];

  const pathname = usePathname();

  return (
    <div className="rounded-xl bg-gray-800 border border-gray-700 p-5 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="inline-block w-2 h-6 bg-violet-500 mr-3 rounded-sm"></span>
        Recent Articles
      </h3>
      
      <div className="space-y-4">
        {recentPosts.map((post) => {
          const isActive = pathname === `/blog/${post.slug}`;
          
          return (
            <Link 
              href={`/blog/${post.slug}`}
              key={post.slug}
              className={`block p-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-violet-900/30 border-l-4 border-violet-500' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <h4 className="text-white font-medium mb-1 line-clamp-2">{post.title}</h4>
              <p className="text-xs text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-700">
        <Link 
          href="/blog"
          className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center justify-between"
        >
          <span>View all articles</span>
          <span>→</span>
        </Link>
      </div>
      
      {/* Tags Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="inline-block w-2 h-6 bg-violet-500 mr-3 rounded-sm"></span>
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {['NextJS', 'React', 'UI/UX', 'Investing', 'TypeScript', 'Development'].map((tag) => (
            <Link 
              href={`/blog/tag/${tag.toLowerCase()}`} 
              key={tag}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs text-gray-300 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
