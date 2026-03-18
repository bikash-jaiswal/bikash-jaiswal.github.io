'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar, FiGitBranch, FiEye } from 'react-icons/fi';
import { fadeInUp, springSoft } from '../lib/motion';

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
  const langColor = language ? languageColors[language] || '#10b981' : '#10b981';
  
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
      variants={fadeInUp(index * 0.06)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/12 via-transparent to-accent-blue/12 blur-lg" />
      </div>

      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800/60 bg-neutral-900/70 p-7 shadow-lg shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-glow">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-800/70 bg-neutral-900 text-primary-200">
              <FiGithub size={20} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-primary-100 line-clamp-1">
                {name}
              </h3>
              {updatedAt && (
                <span className="text-xs text-neutral-400">Updated {formatDate(updatedAt)}</span>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-300 line-clamp-3 flex-grow">
          {description || 'No description available'}
        </p>

        {topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-300">
            {topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-neutral-800/70 bg-neutral-900/80 px-2.5 py-1 transition-colors duration-300 group-hover:border-primary-400/40 group-hover:text-primary-200"
              >
                {topic}
              </span>
            ))}
            {topics.length > 4 && (
              <span className="rounded-full border border-neutral-800/70 bg-neutral-900/80 px-2.5 py-1 text-neutral-500">
                +{topics.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center gap-4 text-sm text-neutral-300">
          {language && (
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: langColor }} />
              <span>{language}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-neutral-400">
            <FiStar size={14} />
            <span>{stars}</span>
          </div>
          {forks > 0 && (
            <div className="flex items-center gap-1 text-neutral-400">
              <FiGitBranch size={14} />
              <span>{forks}</span>
            </div>
          )}
          {watchers > 0 && (
            <div className="flex items-center gap-1 text-neutral-400">
              <FiEye size={14} />
              <span>{watchers}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            transition={springSoft}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-neutral-800/70 bg-neutral-900/60 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors duration-300 hover:border-primary-400/40 hover:text-primary-200"
          >
            <FiGithub size={16} />
            Code
          </motion.a>
          {homepage && (
            <motion.a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={springSoft}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-primary-500/40 bg-primary-500/20 px-4 py-2.5 text-sm font-semibold text-primary-100 transition-colors duration-300 hover:border-primary-400/60 hover:text-white"
            >
              <FiExternalLink size={16} />
              Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
