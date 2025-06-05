import Link from "next/link";
import { PostMetadata } from "../types/blog";
import { formatDate, isValidDate } from "../utils/date";

interface BlogPostPreviewProps {
  post: PostMetadata;
  isLoading?: boolean;
}

export function BlogPostPreview({ post, isLoading = false }: BlogPostPreviewProps) {
  if (isLoading) {
    return (
      <article className="animate-pulse bg-gray-900 rounded-lg overflow-hidden p-6">
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between gap-4 md:gap-8 mb-3">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </header>
          <div className="h-4 bg-gray-700 rounded w-full mt-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mt-4"></div>
        </div>
      </article>
    );
  }

  const formattedDate = formatDate(post.date);
  const isValidPostDate = isValidDate(post.date);

  return (
    <article className="group relative bg-gray-900 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
      <Link 
        href={`/blog/${post.slug}`}
        className="block p-6 h-full"
        aria-labelledby={`post-title-${post.slug}`}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between gap-4 md:gap-8 mb-3">
            <h2 
              id={`post-title-${post.slug}`}
              className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors"
            >
              {post.title}
            </h2>
            <time 
              dateTime={post.date}
              className="text-sm text-gray-400 whitespace-nowrap"
            >
              {formattedDate}
            </time>
          </header>
          <p className="text-sm text-gray-400 flex-grow">{post.subtitle || ''}</p>
          <div className="mt-4 text-blue-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
            Read more →
          </div>
        </div>
      </Link>
    </article>
  );
}
