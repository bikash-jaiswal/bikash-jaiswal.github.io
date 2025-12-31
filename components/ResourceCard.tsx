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
    tool: 'bg-blue-600/20 text-blue-400',
    reference: 'bg-violet-600/20 text-violet-400',
    library: 'bg-green-600/20 text-green-400',
    framework: 'bg-yellow-600/20 text-yellow-400',
    tutorial: 'bg-orange-600/20 text-orange-400',
    course: 'bg-pink-600/20 text-pink-400',
    book: 'bg-sky-600/20 text-sky-400',
    article: 'bg-teal-600/20 text-teal-400',
    documentation: 'bg-indigo-600/20 text-indigo-400',
    cheatsheet: 'bg-red-600/20 text-red-400',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card !p-4 border-gray-800 overflow-hidden group"
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col h-full">
        {/* Card header with icon and category */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="text-violet-400 text-xl">
              {icon && iconMap[icon] ? iconMap[icon] : <FiCode />}
            </div>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[category] || 'bg-gray-600/20 text-gray-400'}`}
            >
              {category}
            </span>
          </div>
          <motion.button
            onClick={() => onToggleFavorite?.(id)}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-yellow-400 focus:outline-none focus-ring rounded-full p-1"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiStar className={favorite ? 'fill-yellow-400 text-yellow-400' : ''} />
          </motion.button>
        </div>

        {/* Resource title and description */}
        <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer with date and link */}
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-800">
          <div className="text-gray-500">Added {formatDate(dateAdded)}</div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 font-medium flex items-center hover:underline focus-ring rounded px-1"
            aria-label={`Visit ${title}`}
          >
            Visit <FiExternalLink className="ml-1" size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
