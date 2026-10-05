'use client';

import React from 'react';
import {
  FiExternalLink,
  FiStar,
  FiTrash2,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiFileText,
  FiCheckCircle,
} from 'react-icons/fi';
import { Bookmark } from '../types/bookmark';
import Card from './ui/Card';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onToggleFavorite: (id: string) => void;
  onToggleRead: (id: string) => void;
  onTagClick?: (tag: string) => void;
  onDelete: (id: string) => void;
}

export default function BookmarkCard({
  bookmark,
  onToggleFavorite,
  onToggleRead,
  onTagClick,
  onDelete,
}: BookmarkCardProps) {
  const { id, title, url, author, summary, category, tags, isFavorite, isRead, source, createdAt } = bookmark;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getSourceIcon = () => {
    switch (source) {
      case 'linkedin':
        return <FiLinkedin size={15} className="text-[#0a66c2]" />;
      case 'twitter':
        return <FiTwitter size={15} className="text-[#1da1f2]" />;
      case 'github':
        return <FiGithub size={15} className="text-gray-600 dark:text-gray-300" />;
      default:
        return <FiFileText size={15} className="text-gray-500" />;
    }
  };

  return (
    <Card
      className={`group h-full flex flex-col justify-between transition-all hover:border-gray-400 dark:hover:border-white/20 ${
        isRead ? 'opacity-80 hover:opacity-100' : ''
      }`}
    >
      <div className="space-y-3">
        {/* Header: Source, Category & Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"
              title={`Source: ${source}`}
            >
              {getSourceIcon()}
              <span className="capitalize text-[11px] text-gray-700 dark:text-gray-300">
                {source}
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
              {category.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Read / Unread toggle */}
            <button
              type="button"
              onClick={() => onToggleRead(id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                isRead
                  ? 'border-gray-200 dark:border-white/10 text-gray-400 hover:text-black dark:hover:text-white bg-gray-50/50 dark:bg-white/[0.02]'
                  : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
              }`}
              title={isRead ? 'Mark as unread' : 'Mark as read'}
            >
              <FiCheckCircle size={13} className={isRead ? 'text-gray-400' : 'text-emerald-500'} />
              <span>{isRead ? 'Read' : 'Unread'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleFavorite(id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-gray-400 hover:text-amber-500'
              }`}
              title={isFavorite ? 'Remove favorite' : 'Add to favorites'}
            >
              <FiStar size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
              title="Delete bookmark"
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        </div>

        {/* Title */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link block space-y-1"
        >
          <h3 className="text-base font-semibold text-black dark:text-white group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors flex items-start justify-between gap-2">
            <span className="line-clamp-2">{title}</span>
            <FiExternalLink
              size={15}
              className="shrink-0 text-gray-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
            />
          </h3>
        </a>

        {/* Author & Date metadata */}
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          {author && <span>By <strong className="font-medium text-gray-700 dark:text-gray-300">{author}</strong></span>}
          {author && <span>•</span>}
          <span>{formattedDate}</span>
        </div>

        {/* Core Gist */}
        {summary && (
          <div className="bg-gray-50/80 dark:bg-white/[0.03] p-3 rounded-xl border border-gray-100 dark:border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
              Gist
            </span>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {summary}
            </p>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="pt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick?.(tag)}
              className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 hover:bg-emerald-500/10 hover:text-emerald-600 dark:bg-white/5 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-400 text-gray-600 dark:text-gray-400 font-mono transition-colors"
              title={`Filter by #${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
