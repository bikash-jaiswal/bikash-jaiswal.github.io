'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Resource } from '../types/resource';
import {
  FiExternalLink,
  FiStar,
  FiCode,
  FiBook,
  FiBox,
  FiDatabase,
  FiLayout,
  FiMap,
  FiTool,
  FiActivity,
} from 'react-icons/fi';
import { fadeInUp, springSoft } from '../lib/motion';

interface ResourceCardProps {
  resource: Resource;
  onToggleFavorite?: (id: string) => void;
}

// Map of resource icons based on icon string in resource data
const iconMap: Record<string, React.ReactNode> = {
  FiCode: <FiCode />,
  FiBook: <FiBook />,
  FiBox: <FiBox />,
  FiDatabase: <FiDatabase />,
  FiLayout: <FiLayout />,
  FiMap: <FiMap />,
  FiTool: <FiTool />,
  FiActivity: <FiActivity />,
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onToggleFavorite }) => {
  const { id, title, description, url, category, tags, favorite, dateAdded, icon } = resource;

  const categoryColors: Record<string, string> = {
    tool: 'border-accent-blue/40 text-accent-blue',
    reference: 'border-neutral-500/40 text-neutral-300',
    library: 'border-accent-teal/40 text-accent-teal',
    framework: 'border-accent-amber/40 text-accent-amber',
    tutorial: 'border-primary-400/40 text-primary-200',
    course: 'border-primary-500/40 text-primary-200',
    book: 'border-accent-blue/40 text-accent-blue',
    article: 'border-accent-teal/40 text-accent-teal',
    documentation: 'border-primary-400/40 text-primary-200',
    cheatsheet: 'border-primary-500/40 text-primary-200',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      variants={fadeInUp(0.05)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="group h-full"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800/60 bg-neutral-900/60 p-6 shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-glow">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-teal/10" />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-800/70 bg-neutral-900 text-primary-200">
                {icon && iconMap[icon] ? iconMap[icon] : <FiCode />}
              </span>
              <span
                className={`inline-flex items-center rounded-full border bg-neutral-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${categoryColors[category] || 'border-neutral-700/50 text-neutral-300'}`}
              >
                {category}
              </span>
            </div>
            <motion.button
              onClick={() => onToggleFavorite?.(id)}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full border border-neutral-700/60 p-2 transition-colors duration-300 ${favorite ? 'text-primary-200' : 'text-neutral-400 hover:text-primary-200'}`}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FiStar className={favorite ? 'fill-current' : ''} />
            </motion.button>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-primary-100">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-300 line-clamp-3">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-800/70 bg-neutral-900/80 px-2.5 py-1 transition-colors duration-300 group-hover:border-primary-400/40 group-hover:text-primary-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-neutral-800/60 pt-4 text-xs text-neutral-400">
            <span>Added {formatDate(dateAdded)}</span>
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={springSoft}
              className="inline-flex items-center gap-2 font-semibold text-primary-200"
              aria-label={`Visit ${title}`}
            >
              Visit
              <FiExternalLink size={12} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
