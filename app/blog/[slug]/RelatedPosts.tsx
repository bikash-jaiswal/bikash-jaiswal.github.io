'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { PostMetadata } from '../../../types/blog';

interface RelatedPostsProps {
  posts: PostMetadata[];
  currentSlug: string;
}

export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const relatedPosts = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />\n        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Continue Reading
        </h3>
        <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group relative block h-full p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 overflow-hidden hover:shadow-lg"
            >
              <div className="relative space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  <FiCalendar size={12} />
                  <time dateTime={post.date}>
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                
                <h4 className="font-bold text-black dark:text-white text-lg leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h4>
                
                {post.subtitle && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {post.subtitle}
                  </p>
                )}
                
                <div className="flex items-center gap-1 text-black dark:text-white text-sm font-semibold pt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Read article</span>
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
