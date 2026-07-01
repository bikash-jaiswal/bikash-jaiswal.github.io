'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { PostMetadata } from '../types/blog';
import { formatDate } from '../lib/date';
import Card from './ui/Card';

interface BlogPostPreviewProps {
  post: PostMetadata;
  isLoading?: boolean;
}

export function BlogPostPreview({ post, isLoading = false }: BlogPostPreviewProps) {
  const formattedDate = formatDate(post.date);
  const tags = post.tags?.slice(0, 2) ?? ['blog'];

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <Card className="h-full flex flex-col gap-5 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-white/20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <time className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {formattedDate}
            </time>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {post.readingTime || 1} min read
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white leading-tight">
            <span className="link-elegant">{post.title}</span>
          </h2>
          {post.subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {post.subtitle}
            </p>
          )}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-200 dark:border-white/10">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
          <FiArrowRight size={16} className="text-gray-400 dark:text-gray-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-white" />
        </div>
      </Card>
    </Link>
  );
}
