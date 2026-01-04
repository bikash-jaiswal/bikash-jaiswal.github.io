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
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
        <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider">
          Continue Reading
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-violet-500/50 to-transparent" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
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
              className="group relative block h-full p-5 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiCalendar size={12} />
                  <time dateTime={post.date}>
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                
                <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-blue-400 transition-all duration-300 line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                
                {post.subtitle && (
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {post.subtitle}
                  </p>
                )}
                
                <div className="flex items-center gap-1 text-violet-400 text-sm font-medium pt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
