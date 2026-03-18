'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { PostMetadata } from '../types/blog';
import { formatDate } from '../lib/date';
import { fadeInUp, springSoft } from '../lib/motion';

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
    <article className="relative overflow-hidden rounded-3xl border border-neutral-800/60 bg-neutral-900/60 p-7 shadow-lg shadow-black/10 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 rounded-full bg-neutral-800" />
          <div className="h-6 w-24 rounded-full bg-neutral-800" />
        </div>
        <div className="h-8 w-4/5 rounded-lg bg-neutral-800" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-neutral-800" />
          <div className="h-4 w-3/4 rounded bg-neutral-800" />
        </div>
        <div className="flex justify-between border-t border-neutral-800 pt-4">
          <div className="h-4 w-24 rounded bg-neutral-800" />
          <div className="h-4 w-16 rounded bg-neutral-800" />
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
      variants={fadeInUp(0.05)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="group h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block h-full overflow-hidden rounded-3xl border border-neutral-800/60 bg-neutral-900/60 p-7 shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-glow"
        aria-labelledby={`post-title-${post.slug}`}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/12 via-transparent to-accent-blue/12" />
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary-200">
            <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 uppercase tracking-[0.3em] text-[0.6rem] text-primary-200">
              {formattedDate}
            </span>
            <span className="rounded-full border border-neutral-700/60 bg-neutral-800/80 px-3 py-1 text-[0.65rem] text-neutral-300">
              {readingTime} min read
            </span>
          </div>

          <div className="space-y-3">
            <h2
              id={`post-title-${post.slug}`}
              className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-primary-100"
            >
              {post.title}
            </h2>
            {post.subtitle && (
              <p className="text-sm leading-relaxed text-neutral-300">
                {post.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-700/60 bg-neutral-800/70 px-3 py-1 text-xs font-medium text-neutral-300 transition-all duration-300 group-hover:border-primary-400/40 group-hover:text-primary-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-neutral-800/70 pt-4 text-xs text-neutral-400">
            <span className="font-medium">By Bikash Jaiswal</span>
            <motion.span
              whileHover={{ x: 4 }}
              transition={springSoft}
              className="inline-flex items-center gap-2 text-primary-200"
            >
              Read story
              <FiArrowRight size={14} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
