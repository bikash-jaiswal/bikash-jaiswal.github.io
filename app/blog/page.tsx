import Link from "next/link";
import { Suspense } from "react";
import { BlogPostPreview } from "../Component/BlogPostPreview";
import { getPostMetadata } from "../services/posts";
import { PostMetadata } from "../types/blog";
import ClientBlogContent from "./ClientBlogContent";

interface PageProps {
  params: Record<string, never>;
  searchParams: { blogNum?: string };
}

function LoadingPosts() {
  return (
    <div className="grid gap-6">
      {[...Array(3)].map((_, i) => (
        <BlogPostPreview key={i} post={{ title: "", date: "", subtitle: "", slug: "" }} isLoading={true} />
      ))}
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm?: string }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-white text-xl mb-4">
        {searchTerm ? `No posts found for "${searchTerm}"` : 'No Posts Found'}
      </h2>
      <p className="text-gray-400 mb-8">
        {searchTerm 
          ? 'Try adjusting your search terms or browse all posts.'
          : 'There are no blog posts available at the moment.'}
      </p>
      <Link 
        href="/" 
        className="inline-block text-white px-6 py-3 border-2 border-white hover:bg-violet-600 transition-colors duration-200 rounded-md"
        aria-label="Return to homepage"
      >
        Return Home
      </Link>
    </div>
  );
}

function ErrorState({ error }: { error: Error }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-white text-xl mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-8">
        {error.message || 'Failed to load blog posts. Please try again later.'}
      </p>
      <div>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

function BlogPosts({ posts, searchTerm }: { posts: PostMetadata[]; searchTerm: string }) {
  if (posts.length === 0) {
    return <EmptyState searchTerm={searchTerm} />;
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <BlogPostPreview key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default async function BlogPage({ searchParams }: PageProps) {
  let allPosts: PostMetadata[] = [];
  let error: Error | null = null;

  try {
    allPosts = await getPostMetadata();
  } catch (e) {
    error = e instanceof Error ? e : new Error('Failed to load posts');
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ErrorState error={error} />
      </div>
    );
  }
  
  // Parse blogNum safely - convert to number or use default (all posts)
  const blogNumParam = searchParams?.blogNum;
  const displayCount = blogNumParam ? Number(blogNumParam) : allPosts.length;
  const postsToShow = allPosts.slice(0, displayCount);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-bold text-white text-2xl mb-8 text-center">Blog Posts</h1>
      <Suspense fallback={<LoadingPosts />}>
        <ClientBlogContent initialPosts={postsToShow} />
      </Suspense>
    </div>
  );
}
