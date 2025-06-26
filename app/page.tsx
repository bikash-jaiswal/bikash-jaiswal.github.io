import ProfessionalIntro from '../components/whoAmI';
import { Suspense } from 'react';
import Link from 'next/link';
import { getPostMetadata } from '../lib/posts';
import { BlogPostPreview } from '../components/BlogPostPreview';
import { PostMetadata } from '../types/blog';

export default async function Home(): Promise<React.ReactElement> {
  // Fetch the latest posts for the homepage
  const allPosts = await getPostMetadata();
  const recentPosts = allPosts.slice(0, 3);
  
  return (
    <main className="flex flex-col">
      <ProfessionalIntro />
      
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        {/* <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Resource</h2>
          <Link 
            href="/system-design" 
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            View Study Plan →
          </Link>
        </div> */}
{/*         
        <div className="p-6 mb-12 border border-violet-500/30 rounded-lg bg-gradient-to-b from-violet-500/20 to-violet-500/5 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">System Design Study Plan</h3>
          <p className="text-gray-300 mb-4">
            A comprehensive learning path from beginner to advanced concepts in system design.
            Includes time estimates, courses, and structured resources based on the System Design Primer.  
          </p>
          <Link 
            href="/system-design" 
            className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Start Learning
          </Link>
        </div> */}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
          <Link 
            href="/blog" 
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            View all articles →
          </Link>
        </div>
        
        <div className="grid gap-8">
          <Suspense fallback={<div>Loading recent articles...</div>}>
            {recentPosts.length > 0 ? (
              recentPosts.map((post: PostMetadata) => (
                <BlogPostPreview key={post.slug} post={post} />
              ))
            ) : (
              <div className="text-center py-6 text-gray-400">
                No articles available yet. Check back soon!
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
