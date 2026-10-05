'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiLink,
  FiBookmark,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiStar,
  FiCheck,
  FiCpu,
  FiArrowRight,
  FiZap,
} from 'react-icons/fi';
import { bookmarkService, detectBookmarkSource } from '../lib/bookmarks';
import { enrichLinkWithAIAgent, EnrichedBookmarkDetails } from '../lib/bookmarks/aiAgent';

export default function QuickAddBookmarkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'saved' | 'error'>('idle');
  const [enrichedResult, setEnrichedResult] = useState<EnrichedBookmarkDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = (e?: Event) => {
      const customEvent = e as CustomEvent<{ url?: string }>;
      setUrl(customEvent?.detail?.url || '');
      setIsFavorite(false);
      setIsOpen(true);
      setStatus('idle');
      setEnrichedResult(null);
      setErrorMessage('');
    };

    window.addEventListener('bj-open-quick-add', handleOpen);
    return () => window.removeEventListener('bj-open-quick-add', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setUrl('');
    setIsFavorite(false);
    setStatus('idle');
    setEnrichedResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus('analyzing');
    setErrorMessage('');

    try {
      // 1. Invoke AI Agent to synthesize metadata
      const enriched = await enrichLinkWithAIAgent(url.trim());
      setEnrichedResult(enriched);

      // 2. Persist to active bookmark service
      await bookmarkService.addBookmark({
        url: enriched.url,
        title: enriched.title,
        author: enriched.author,
        summary: enriched.summary,
        category: enriched.category,
        tags: enriched.tags,
        isFavorite,
        source: enriched.source,
      });

      setStatus('saved');
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      console.error('Failed to analyze and save bookmark:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to process link.');
    }
  };

  const source = url ? detectBookmarkSource(url) : null;

  const renderSourceIcon = () => {
    switch (source) {
      case 'linkedin':
        return <FiLinkedin className="text-[#0a66c2]" size={16} />;
      case 'twitter':
        return <FiTwitter className="text-[#1da1f2]" size={16} />;
      case 'github':
        return <FiGithub className="text-gray-700 dark:text-gray-300" size={16} />;
      default:
        return <FiLink className="text-gray-400" size={16} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={status === 'analyzing' ? undefined : handleClose}
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#121214] dark:text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <FiZap size={18} />
                </div>
                <div>
                  <h2 className="text-base font-semibold">Save Resource Link</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    AI Agent automatically analyzes & synthesizes post details
                  </p>
                </div>
              </div>
              {status !== 'analyzing' && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-white"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            {/* Content states */}
            {status === 'analyzing' && (
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 animate-pulse">
                    <FiCpu size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white font-bold animate-ping">
                    •
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    AI Agent Analyzing Link...
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                    Running Llama-3.3-70b to infer title, author, summary notes, category, and technical tags.
                  </p>
                </div>
              </div>
            )}

            {status === 'saved' && enrichedResult && (
              <div className="py-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <FiCheck size={18} />
                  <span>Enriched & Saved to Knowledge Base!</span>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/70 dark:bg-white/[0.02] space-y-2">
                  <h4 className="text-sm font-bold text-black dark:text-white line-clamp-1">
                    {enrichedResult.title}
                  </h4>
                  {enrichedResult.author && (
                    <p className="text-xs text-gray-500">By {enrichedResult.author}</p>
                  )}
                  {enrichedResult.summary && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {enrichedResult.summary}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {enrichedResult.category}
                    </span>
                    {enrichedResult.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-500 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {status !== 'analyzing' && status !== 'saved' && (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="quick-add-url"
                    className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Paste LinkedIn Post / Article Link *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      {renderSourceIcon()}
                    </span>
                    <input
                      id="quick-add-url"
                      ref={inputRef}
                      type="url"
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/posts/..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm focus:border-black focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isFavorite
                        ? 'border-amber-400 bg-amber-400/10 text-amber-500'
                        : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <FiStar className={isFavorite ? 'fill-current' : ''} size={14} />
                    <span>{isFavorite ? 'Favorited' : 'Mark Favorite'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!url.trim()}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
                    >
                      <FiZap size={14} />
                      <span>Save & Auto-Enrich</span>
                      <FiArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
