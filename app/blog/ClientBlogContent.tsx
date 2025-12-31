'use client';

import dynamic from 'next/dynamic';
import { usePosts } from '../../lib/hooks';
import { SearchBar } from '../../components/SearchBar';
import { EmptyState } from '../../components/EmptyState';
import { PostMetadata } from '../../types/blog';

const BlogPostPreview = dynamic(
  () => import('../../components/BlogPostPreview').then((mod) => ({ default: mod.BlogPostPreview })),
  { loading: () => <div className="animate-pulse h-32 bg-gray-800 rounded-lg" /> }
);

const Pagination = dynamic(
  () => import('../../components/Pagination').then((mod) => ({ default: mod.Pagination })),
  { loading: () => <div className="h-10" /> }
);

interface ClientBlogContentProps {
  initialPosts: PostMetadata[];
  postsPerPage?: number;
}

function BlogPostList({ posts, searchTerm, selectedTag }: { posts: PostMetadata[]; searchTerm: string; selectedTag: string | null }) {
  if (posts.length === 0) {
    return <EmptyState searchTerm={searchTerm || selectedTag || ''} />;
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <BlogPostPreview key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default function ClientBlogContent({
  initialPosts,
  postsPerPage = 5,
}: ClientBlogContentProps) {
  const {
    currentPosts,
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    allTags,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNextPage,
    hasPrevPage,
  } = usePosts({
    initialPosts,
    postsPerPage,
  });

  return (
    <div className="space-y-6">
      <SearchBar 
        onSearch={setSearchTerm} 
        tags={allTags}
        selectedTag={selectedTag ?? undefined}
        onTagSelect={setSelectedTag}
      />
      <BlogPostList posts={currentPosts} searchTerm={searchTerm} selectedTag={selectedTag} />
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
