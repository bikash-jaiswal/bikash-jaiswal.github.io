'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar, FiGitBranch, FiEye } from 'react-icons/fi';

// Language color mapping
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
};

interface GitHubProjectProps {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  forks?: number;
  watchers?: number;
  language?: string;
  topics: string[];
  updatedAt?: string;
  index?: number;
}

export default function GitHubProject({
  name,
  description,
  url,
  homepage,
  stars,
  forks = 0,
  watchers = 0,
  language,
  topics,
  updatedAt,
  index = 0,
}: GitHubProjectProps) {
  const langColor = language ? languageColors[language] || '#8b5cf6' : '#8b5cf6';
  
  // Format the update date
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Gradient border glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
      
      <div className="relative h-full flex flex-col bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gray-800/80 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
              <FiGithub size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                {name}
              </h3>
              {updatedAt && (
                <span className="text-xs text-gray-500">
                  Updated {formatDate(updatedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {description || 'No description available'}
        </p>

        {/* Tech Stack / Topics */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-xs px-2.5 py-1 bg-gray-800/80 text-gray-300 rounded-lg border border-gray-700/50 hover:border-violet-500/50 hover:text-violet-300 transition-colors"
              >
                {topic}
              </span>
            ))}
            {topics.length > 4 && (
              <span className="text-xs px-2.5 py-1 text-gray-500">
                +{topics.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-5 text-sm">
          {language && (
            <div className="flex items-center gap-1.5">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: langColor }}
              />
              <span className="text-gray-400">{language}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition-colors">
            <FiStar size={14} />
            <span>{stars}</span>
          </div>
          
          {forks > 0 && (
            <div className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
              <FiGitBranch size={14} />
              <span>{forks}</span>
            </div>
          )}
          
          {watchers > 0 && (
            <div className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
              <FiEye size={14} />
              <span>{watchers}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 text-sm font-medium"
          >
            <FiGithub size={16} />
            <span>Code</span>
          </a>
          
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 text-sm font-medium"
            >
              <FiExternalLink size={16} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
