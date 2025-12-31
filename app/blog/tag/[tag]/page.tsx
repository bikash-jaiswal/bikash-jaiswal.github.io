import { Suspense } from 'react';
import { getPostMetadata } from '../../../../lib/posts';
import { PostMetadata } from '../../../../types/blog';
import { LoadingState } from '../../../../components/LoadingState';
import { BlogPostPreview } from '../../../../components/BlogPostPreview';
import { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowLeft, FiTag } from 'react-icons/fi';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  
  return {
    title: `Posts tagged "${tag}"`,
    description: `Browse all blog posts tagged with "${tag}"`,
    openGraph: {
      title: `Posts tagged "${tag}" | Bikash Jaiswal`,
      description: `Browse all blog posts tagged with "${tag}"`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPostMetadata();
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  const allPosts = await getPostMetadata();
  
  const filteredPosts = allPosts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  // Get all unique tags for the sidebar
  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags || []))
  ).sort();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
          <span>Back to all posts</span>
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400">
            <FiTag size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {tag}
            </h1>
            <p className="text-gray-400 mt-1">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Suspense fallback={<LoadingState count={3} />}>
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6">
                {filteredPosts.map((post: PostMetadata) => (
                  <BlogPostPreview key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No posts found with this tag.</p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 mt-4 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <FiArrowLeft size={16} />
                  <span>View all posts</span>
                </Link>
              </div>
            )}
          </Suspense>
        </div>

        {/* Sidebar - All Tags */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50">
            <h2 className="text-lg font-semibold text-white mb-4">All Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${encodeURIComponent(t)}`}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    t.toLowerCase() === tag.toLowerCase()
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
