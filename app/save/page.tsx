'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiBookmark,
  FiCheck,
  FiArrowRight,
  FiLink,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiAlertCircle,
  FiZap,
  FiCpu,
} from 'react-icons/fi';
import { bookmarkService, detectBookmarkSource } from '../../lib/bookmarks';
import { enrichLinkWithAIAgent, EnrichedBookmarkDetails } from '../../lib/bookmarks/aiAgent';
import { UserProfile } from '../../types/bookmark';
import Link from 'next/link';

function SaveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [rawUrl, setRawUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'saved' | 'error'>('idle');
  const [enriched, setEnriched] = useState<EnrichedBookmarkDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Extract shared parameters
  useEffect(() => {
    const pUrl = searchParams.get('url') || '';
    const pText = searchParams.get('text') || '';

    // Mobile share often bundles the URL in 'text'
    let targetUrl = pUrl;
    let targetText = pText;

    if (!targetUrl && pText) {
      const match = pText.match(/https?:\/\/[^\s]+/);
      if (match) {
        targetUrl = match[0];
        targetText = pText.replace(match[0], '').trim();
      }
    }

    setRawUrl(targetUrl);
    setRawText(targetText);

    // Fetch user
    bookmarkService.getCurrentUser().then((u) => {
      setUser(u);
      setLoadingUser(false);
    });
  }, [searchParams]);

  const handleLogin = () => {
    window.dispatchEvent(new CustomEvent('bj-open-auth-modal'));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!rawUrl.trim()) {
      setErrorMsg('No valid URL detected to save.');
      return;
    }
    try {
      new URL(rawUrl.trim());
    } catch {
      setStatus('error');
      setErrorMsg('That does not look like a valid URL.');
      return;
    }

    setStatus('analyzing');
    setErrorMsg('');

    try {
      // 1. Run AI Agent to synthesize metadata
      const result = await enrichLinkWithAIAgent(rawUrl.trim(), rawText);
      setEnriched(result);

      // 2. Persist
      await bookmarkService.addBookmark({
        url: result.url,
        title: result.title,
        author: result.author,
        summary: result.summary,
        category: result.category,
        tags: result.tags,
        isFavorite: false,
        source: result.source,
      });

      setStatus('saved');
      setTimeout(() => {
        router.push('/bookmarks');
      }, 1500);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to analyze and save bookmark.');
    }
  };

  const source = rawUrl ? detectBookmarkSource(rawUrl) : null;

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
    <div className="min-h-screen py-24 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#121214] dark:text-white"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <FiZap size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold">Web Share Receiver</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI Agent auto-generates title, summary, category & tags
            </p>
          </div>
        </div>

        {status === 'analyzing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 animate-pulse">
              <FiCpu size={28} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">AI Agent Analyzing Post...</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                Generating rich summary and extracting concepts using Llama-3.3-70b
              </p>
            </div>
          </div>
        )}

        {status === 'saved' && enriched && (
          <div className="py-8 space-y-4 text-center">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-500 text-white animate-bounce">
              <FiCheck size={24} />
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white">Bookmark Saved!</h2>
              <p className="text-xs text-gray-500">Redirecting to your saved resources...</p>
            </div>

            <div className="text-left p-3.5 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/70 dark:bg-white/[0.02] space-y-1.5">
              <h4 className="text-xs font-bold text-black dark:text-white line-clamp-1">
                {enriched.title}
              </h4>
              {enriched.summary && (
                <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2">
                  {enriched.summary}
                </p>
              )}
            </div>
          </div>
        )}

        {status !== 'analyzing' && status !== 'saved' && (
          <div className="mt-6 space-y-4">
            {/* User Auth Status Banner */}
            {!loadingUser && !user && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-center justify-between">
                <span>You are not logged in.</span>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="px-3 py-1 font-semibold rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 flex items-center gap-2">
                <FiAlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label
                  htmlFor="save-url"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Shared URL
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    {renderSourceIcon()}
                  </span>
                  <input
                    id="save-url"
                    type="url"
                    required
                    value={rawUrl}
                    onChange={(e) => setRawUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/posts/..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-xs focus:border-black focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white transition-all"
                  />
                </div>
              </div>

              {rawText && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Shared Snippet Context
                  </label>
                  <p className="text-xs text-gray-500 bg-gray-50 dark:bg-white/5 p-2.5 rounded-xl border border-gray-100 dark:border-white/5 line-clamp-3">
                    {rawText}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/bookmarks"
                  className="text-xs text-gray-500 hover:text-black dark:hover:text-white"
                >
                  View all saved
                </Link>

                <button
                  type="submit"
                  disabled={!rawUrl.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
                >
                  <FiZap size={14} />
                  <span>Auto-Enrich & Save</span>
                  <FiArrowRight size={13} />
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function SavePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      }
    >
      <SaveContent />
    </Suspense>
  );
}
