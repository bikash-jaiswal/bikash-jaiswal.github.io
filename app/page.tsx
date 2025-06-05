import ProfessionalIntro from './Component/whoAmI';
import { Suspense } from 'react';
import Link from 'next/link';
import { getPostMetadata } from './services/posts';
import { BlogPostPreview } from './Component/BlogPostPreview';

export default async function Home(): Promise<React.ReactElement> {
  // Fetch the latest posts for the homepage
  const allPosts = await getPostMetadata();
  const recentPosts = allPosts.slice(0, 3);
  
  return (
    <main className="flex flex-col">
      <ProfessionalIntro />
      
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
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
