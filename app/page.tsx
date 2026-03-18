import ProfessionalIntro from '../components/whoAmI';
import { Suspense } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getPostMetadata } from '../lib/posts';
import { BlogPostPreview } from '../components/BlogPostPreview';
import { PostMetadata } from '../types/blog';

export default async function Home(): Promise<React.ReactElement> {
  const allPosts = await getPostMetadata();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <main className="flex flex-col">
      <ProfessionalIntro />

      <section className="w-full px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-semibold text-white">Recent Articles</h2>
            <Link
              href="/blog"
              className="group relative inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-all duration-300 ease-in-out"
            >
              <span>View all articles</span>
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gray-400 transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Suspense fallback={<div>Loading recent articles...</div>}>
              {recentPosts.length > 0 ? (
                recentPosts.map((post: PostMetadata) => (
                  <BlogPostPreview key={post.slug} post={post} />
                ))
              ) : (
                <div className="py-6 text-center text-gray-400">
                  No articles available yet. Check back soon!
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
