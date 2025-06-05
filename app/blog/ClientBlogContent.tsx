'use client';

import { usePosts } from "../hooks";
import { BlogPostPreview } from "../Component/BlogPostPreview";
import { Pagination } from "../Component/Pagination";
import { SearchBar } from "../Component/SearchBar";
import { PostMetadata } from "../types/blog";

export interface ClientBlogContentProps {
  initialPosts: PostMetadata[];
  blogNumParam?: string;
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

export default function ClientBlogContent({ initialPosts, blogNumParam }: ClientBlogContentProps) {
  // If blogNumParam is provided, use it to limit the number of posts shown
  const limitPosts = blogNumParam ? Number(blogNumParam) : undefined;
  
  // If we have a limit from URL, filter posts before passing to the hook
  const postsToUse = limitPosts ? initialPosts.slice(0, limitPosts) : initialPosts;
  
  const {
    currentPosts,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNextPage,
    hasPrevPage,
  } = usePosts({
    initialPosts: postsToUse,
    postsPerPage: 5,
  });

  return (
    <div className="space-y-6">
      <SearchBar onSearch={setSearchTerm} />
      <BlogPosts posts={currentPosts} searchTerm={searchTerm} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </div>
  );
}
