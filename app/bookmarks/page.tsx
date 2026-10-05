'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBookmark,
  FiSearch,
  FiPlus,
  FiStar,
  FiX,
  FiUser,
  FiLogOut,
  FiLogIn,
  FiDatabase,
  FiHelpCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import BookmarkCard from '../../components/BookmarkCard';
import { Bookmark, BookmarkFilters, UserProfile } from '../../types/bookmark';
import { bookmarkService, isSupabaseConfigured } from '../../lib/bookmarks';

export default function BookmarksPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  const [filters, setFilters] = useState<BookmarkFilters>({
    category: 'all',
    searchTerm: '',
    showFavoritesOnly: false,
    readStatus: 'all',
    tags: [],
  });

  const loadData = useCallback(async () => {
    try {
      const [currentUser, list, tags] = await Promise.all([
        bookmarkService.getCurrentUser(),
        bookmarkService.getBookmarks(),
        bookmarkService.getTags(),
      ]);
      setUser(currentUser);
      setBookmarks(list);
      setAvailableTags(tags);
    } catch (err) {
      console.error('Failed to load bookmarks or user:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    const handleDataChanged = () => {
      loadData();
    };

    window.addEventListener('bj-bookmarks-changed', handleDataChanged);
    window.addEventListener('bj-auth-changed', handleDataChanged);

    return () => {
      window.removeEventListener('bj-bookmarks-changed', handleDataChanged);
      window.removeEventListener('bj-auth-changed', handleDataChanged);
    };
  }, [loadData]);

  const handleLogin = () => {
    window.dispatchEvent(new CustomEvent('bj-open-auth-modal'));
  };

  const handleLogout = async () => {
    try {
      await bookmarkService.logout();
      setUser(null);
      loadData();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    await bookmarkService.toggleFavorite(id);
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  const handleToggleRead = async (id: string) => {
    await bookmarkService.toggleRead(id);
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isRead: !b.isRead } : b))
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this bookmark?')) {
      await bookmarkService.deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    window.dispatchEvent(new CustomEvent('bj-open-quick-add'));
  };

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  const unreadCount = bookmarks.filter((b) => !b.isRead).length;
  const readCount = bookmarks.filter((b) => !!b.isRead).length;

  const filteredBookmarks = bookmarks.filter((item) => {
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }

    if (filters.showFavoritesOnly && !item.isFavorite) {
      return false;
    }

    if (filters.readStatus === 'unread' && item.isRead) {
      return false;
    }

    if (filters.readStatus === 'read' && !item.isRead) {
      return false;
    }

    if (filters.tags.length > 0) {
      const hasTag = filters.tags.every((t) => item.tags?.includes(t));
      if (!hasTag) return false;
    }

    if (filters.searchTerm) {
      const q = filters.searchTerm.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchSummary = item.summary?.toLowerCase().includes(q);
      const matchAuthor = item.author?.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchAuthor && !matchTags) {
        return false;
      }
    }

    return true;
  });

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'machine-learning', label: 'AI & ML' },
    { value: 'system-design', label: 'System Design' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'tool', label: 'Tools' },
    { value: 'career', label: 'Career' },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium mb-4">
            <FiBookmark size={14} />
            <span>Resource Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">
            Saved Bookmarks & Posts
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Bookmarked LinkedIn updates, technical deep-dives, and trend summaries saved for reference.
          </p>
        </motion.div>

        {/* Auth & Storage Status Bar */}
        <div className="mb-8 p-4 rounded-2xl border border-gray-200/80 bg-gray-50/50 dark:border-white/10 dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs">
              {user ? user.name.slice(0, 1) : <FiUser size={16} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-black dark:text-white">
                  {user ? user.name : 'Guest (Not Signed In)'}
                </span>
                {user && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {user.isMock ? 'Demo Mode (LocalStorage)' : 'Supabase Connected'}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user
                  ? `Logged in as ${user.email}`
                  : 'Sign in to access your saved resources and bookmarks'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isSupabaseConfigured() && (
              <button
                type="button"
                onClick={() => setShowConfigHelp(!showConfigHelp)}
                className="p-2 text-xs font-medium text-gray-500 hover:text-black dark:hover:text-white rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-1.5 transition-colors"
                title="View Supabase configuration instructions"
              >
                <FiHelpCircle size={14} />
                <span className="hidden sm:inline">Supabase Setup</span>
              </button>
            )}

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <FiLogOut size={13} />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="px-4 py-1.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-xl flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <FiLogIn size={13} />
                <span>{isSupabaseConfigured() ? 'Sign In' : 'Sign In (Demo Account)'}</span>
              </button>
            )}

            {user && (
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-4 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <FiPlus size={14} />
                <span>+ Add Bookmark</span>
              </button>
            )}
          </div>
        </div>

        {/* Supabase Configuration Drawer / Accordion */}
        <AnimatePresence>
          {showConfigHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-50/30 p-5 dark:bg-emerald-950/10 text-xs text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                <FiDatabase size={16} />
                <span>How to switch from Mock to Real Supabase</span>
              </div>
              <p className="mb-2">
                Currently running in <strong>Mock Mode</strong> (LocalStorage), which stores bookmarks right in your browser.
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Create a free database at <code>https://supabase.com</code>.</li>
                <li>Create the <code>bookmarks</code> table using the SQL schema in <code>lib/bookmarks/supabaseService.ts</code>.</li>
                <li>
                  Add to your <code>.env.local</code>:
                  <div className="mt-1 p-2 font-mono bg-black/5 dark:bg-white/5 rounded-lg select-all">
                    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
                  </div>
                </li>
                <li>Restart development server. The app auto-detects credentials and switches providers seamlessly.</li>
              </ol>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
                }
                placeholder="Search by title, author, keyword, or #tag..."
                className="w-full py-2.5 pl-11 pr-10 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl text-xs focus:outline-none focus:border-black dark:focus:border-white transition-all"
              />
              {filters.searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, searchTerm: '' }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Read-status and favorites are owner metadata — meaningless to guests */}
            {user && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Read / Unread Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, readStatus: 'all' }))}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    filters.readStatus === 'all'
                      ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                      : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  All ({bookmarks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, readStatus: 'unread' }))}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    filters.readStatus === 'unread'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm'
                      : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <span>Unread ({unreadCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, readStatus: 'read' }))}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    filters.readStatus === 'read'
                      ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                      : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  Read ({readCount})
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    showFavoritesOnly: !prev.showFavoritesOnly,
                  }))
                }
                className={`px-3.5 py-2 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                  filters.showFavoritesOnly
                    ? 'border-amber-400 bg-amber-400/10 text-amber-500'
                    : 'border-gray-200 dark:border-white/10 text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                <FiStar size={14} className={filters.showFavoritesOnly ? 'fill-current' : ''} />
                <span>Favorites</span>
              </button>
            </div>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, category: cat.value }))
                }
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                  filters.category === cat.value
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dynamic Tags from Database */}
          {availableTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mr-1">
                Tags:
              </span>
              {availableTags.map((tag) => {
                const isSelected = filters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`text-[11px] px-2.5 py-0.5 rounded-md font-mono transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-500 text-white font-semibold'
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <span>#{tag}</span>
                    {isSelected && <FiX size={11} />}
                  </button>
                );
              })}
              {filters.tags.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, tags: [] }))}
                  className="text-[10px] text-gray-400 hover:text-black dark:hover:text-white underline ml-1"
                >
                  Clear tags
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bookmarks Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mb-3"></div>
            <p className="text-xs text-gray-400">Loading saved bookmarks...</p>
          </div>
        ) : filteredBookmarks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onToggleFavorite={handleToggleFavorite}
                onToggleRead={handleToggleRead}
                onTagClick={handleTagToggle}
                onDelete={handleDelete}
                readOnly={!user}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl border border-dashed border-gray-200 dark:border-white/10 p-8">
            <FiBookmark size={32} className="mx-auto text-gray-400 mb-3 opacity-60" />
            <h3 className="text-sm font-semibold text-black dark:text-white mb-1">
              No bookmarks found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
              {filters.searchTerm || filters.category !== 'all' || filters.showFavoritesOnly
                ? 'No saved items match your active filters.'
                : user
                  ? 'You have not saved any LinkedIn resources or links yet.'
                  : 'No public bookmarks have been shared yet.'}
            </p>
            {user && (
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-4 py-2 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-90 transition-opacity"
              >
                + Save Your First Link
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
