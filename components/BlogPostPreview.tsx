'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { PostMetadata } from '../types/blog';
import { formatDate } from '../lib/date';

interface BlogPostPreviewProps {
  post: PostMetadata;
  isLoading?: boolean;
}

const WORDS_PER_MINUTE = 200;
const DEFAULT_READING_TIME = 3;

function calculateReadingTime(text?: string): number {
  if (!text) return DEFAULT_READING_TIME;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function BlogPostSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-700/50 rounded-full" />
          <div className="h-6 w-20 bg-gray-700/50 rounded-full" />
        </div>
        <div className="h-7 bg-gray-700/50 rounded-lg w-4/5" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded w-full" />
          <div className="h-4 bg-gray-700/50 rounded w-3/4" />
        </div>
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-24 bg-gray-700/50 rounded" />
          <div className="h-4 w-20 bg-gray-700/50 rounded" />
        </div>
      </div>
    </article>
  );
}

export function BlogPostPreview({ post, isLoading = false }: BlogPostPreviewProps) {
  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  const formattedDate = formatDate(post.date);
  const readingTime = post.readingTime ?? calculateReadingTime(post.content);
  const tags = post.tags?.slice(0, 2) ?? ['blog'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-600/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <Link
        href={`/blog/${post.slug}`}
        className="relative block overflow-hidden rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-gray-800/60"
        aria-labelledby={`post-title-${post.slug}`}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 text-xs font-medium bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            id={`post-title-${post.slug}`}
            className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-blue-400 transition-all duration-300 leading-tight"
          >
            {post.title}
          </h2>

          {post.subtitle && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <FiCalendar size={14} className="text-gray-600" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <FiClock size={14} className="text-gray-600" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <span>Read more</span>
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
