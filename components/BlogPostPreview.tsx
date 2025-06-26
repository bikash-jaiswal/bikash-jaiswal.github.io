"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { PostMetadata } from "../types/blog";
import { formatDate } from "../lib/date";

interface BlogPostPreviewProps {
  post: PostMetadata;
  isLoading?: boolean;
}

// Calculate estimated reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text?.trim().split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return readingTime;
}

// Skeleton loader for blog posts
const BlogPostSkeleton = () => (
  <article className="skeleton-card card !p-4 border-gray-800 overflow-hidden">
    <div className="flex flex-col h-full space-y-2">
      <header>
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 bg-gray-700 rounded w-3/5 skeleton"></div>
          <div className="h-4 bg-gray-700 rounded-full w-16 skeleton"></div>
        </div>
        
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-700 rounded w-full skeleton"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6 skeleton"></div>
        </div>
      </header>
      
      <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-800">
        <div className="flex space-x-3">
          <div className="h-3 w-14 bg-gray-700 rounded-full skeleton"></div>
          <div className="h-3 w-14 bg-gray-700 rounded-full skeleton"></div>
        </div>
        <div className="h-3 w-12 bg-gray-700 rounded skeleton"></div>
      </div>
    </div>
  </article>
);

export function BlogPostPreview({ post, isLoading = false }: BlogPostPreviewProps) {
  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  const formattedDate = formatDate(post.date);
  // Calculate reading time based on content or provide a default estimate
  const readingTime = post.content ? calculateReadingTime(post.content) : 3;
  // Get first tag or use a default
  const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : 'blog';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card !p-4 border-gray-800 hover:border-violet-500/30 overflow-hidden group"
      whileHover={{ y: -4 }}
    >
      <Link 
        href={`/blog/${post.slug}`}
        className="block h-full"
        aria-labelledby={`post-title-${post.slug}`}
      >
        {/* Compact layout with tag and title inline */}
        <div className="flex flex-col h-full space-y-2">
          <header>
            <div className="flex justify-between items-center mb-2">
              <h2 
                id={`post-title-${post.slug}`}
                className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors"
              >
                {post.title}
              </h2>
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-violet-900/20 text-violet-400 rounded-full">
                {primaryTag}
              </span>
            </div>
            
            {/* Subtitle with fewer lines */}
            <p className="text-gray-300 text-sm line-clamp-2">{post.subtitle || ''}</p>
          </header>
          
          {/* Footer with metadata - more compact */}
          <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" size={12} aria-hidden="true" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              
              <div className="flex items-center">
                <FaClock className="mr-1" size={12} aria-hidden="true" />
                <span>{readingTime} min</span>
              </div>
            </div>
            
            <div className="text-violet-400 text-xs font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200">
              Read
              <span className="ml-1 text-sm transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
