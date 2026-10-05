'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiCompass,
  FiFileText,
  FiTerminal,
  FiBookOpen,
  FiSun,
  FiMoon,
  FiCopy,
  FiCheck,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowRight,
  FiCornerDownLeft,
  FiX,
  FiBookmark,
} from 'react-icons/fi';
import { CommandItem, CommandCategory } from '../types/command';

interface CommandPaletteProps {
  items: CommandItem[];
}

const CATEGORY_LABELS: Record<CommandCategory, string> = {
  navigation: 'Navigation',
  posts: 'Articles & Posts',
  til: 'Today I Learned',
  reading: 'Reading List',
  actions: 'Quick Actions',
};

export default function CommandPalette({ items }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut: Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input and lock body scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return items;
    }

    return items.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchDesc = item.description?.toLowerCase().includes(trimmed);
      const matchCategory = item.category.toLowerCase().includes(trimmed);
      const matchTags = item.tags?.some((tag) => tag.toLowerCase().includes(trimmed));
      const matchKeywords = item.keywords?.some((kw) => kw.toLowerCase().includes(trimmed));

      return matchTitle || matchDesc || matchCategory || matchTags || matchKeywords;
    });
  }, [items, query]);

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const groups: Partial<Record<CommandCategory, CommandItem[]>> = {};
    const categoryOrder: CommandCategory[] = [
      'navigation',
      'posts',
      'til',
      'reading',
      'actions',
    ];

    categoryOrder.forEach((cat) => {
      const catItems = filteredItems.filter((i) => i.category === cat);
      if (catItems.length > 0) {
        groups[cat] = catItems;
      }
    });

    return groups;
  }, [filteredItems]);

  // Action executor
  const executeItem = useCallback(
    (item: CommandItem) => {
      if (!item) return;

      if (item.actionId === 'save-bookmark') {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('bj-open-quick-add'));
        return;
      }

      if (item.actionId === 'toggle-theme') {
        const isDark = document.documentElement.classList.contains('dark');
        const nextTheme = isDark ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        localStorage.setItem('theme', nextTheme);
        setIsOpen(false);
        return;
      }

      if (item.actionId === 'copy-url') {
        if (typeof window !== 'undefined') {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            setIsOpen(false);
          }, 800);
        }
        return;
      }

      if (item.url?.startsWith('http') || item.url?.startsWith('mailto:')) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
        return;
      }

      if (item.url) {
        setIsOpen(false);
        router.push(item.url);
      }
    },
    [router]
  );

  // Key navigation (up/down/enter)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    }
  };

  // Ensure active element is scrolled into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const getItemIcon = (item: CommandItem) => {
    switch (item.category) {
      case 'navigation':
        return <FiCompass size={16} className="text-gray-500 dark:text-gray-400" />;
      case 'posts':
        return <FiFileText size={16} className="text-blue-500 dark:text-blue-400" />;
      case 'til':
        return <FiTerminal size={16} className="text-emerald-500 dark:text-emerald-400" />;
      case 'reading':
        return <FiBookOpen size={16} className="text-purple-500 dark:text-purple-400" />;
      case 'actions':
        if (item.actionId === 'save-bookmark') {
          return <FiBookmark size={16} className="text-emerald-500" />;
        }
        if (item.actionId === 'toggle-theme') {
          return <FiMoon size={16} className="text-amber-500" />;
        }
        if (item.actionId === 'copy-url') {
          return copied ? (
            <FiCheck size={16} className="text-emerald-500" />
          ) : (
            <FiCopy size={16} className="text-gray-500" />
          );
        }
        if (item.actionId === 'github') {
          return <FiGithub size={16} className="text-gray-500 dark:text-gray-300" />;
        }
        if (item.actionId === 'linkedin') {
          return <FiLinkedin size={16} className="text-blue-600 dark:text-blue-400" />;
        }
        if (item.actionId === 'email') {
          return <FiMail size={16} className="text-red-500 dark:text-red-400" />;
        }
        return <FiArrowRight size={16} className="text-gray-400" />;
      default:
        return <FiArrowRight size={16} className="text-gray-400" />;
    }
  };

  let globalCounter = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0f1012] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[80vh]"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-gray-100 dark:border-white/5 gap-3">
              <FiSearch className="text-gray-400 shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command or search articles, notes, projects..."
                className="w-full bg-transparent text-black dark:text-white placeholder-gray-400 text-sm focus:outline-none"
                aria-label="Command search input"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Clear query"
                >
                  <FiX size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 divide-y-0"
              style={{ maxHeight: 'calc(80vh - 110px)' }}
            >
              {filteredItems.length === 0 ? (
                <div className="py-16 text-center text-gray-400 dark:text-gray-500">
                  <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs mt-1 text-gray-400/80">
                    Try searching for titles, topics (e.g., &ldquo;distributed&rdquo;, &ldquo;agent&rdquo;), or pages.
                  </p>
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, catItems]) => {
                  if (!catItems || catItems.length === 0) return null;

                  return (
                    <div key={category} className="mb-3 last:mb-0">
                      <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                        {CATEGORY_LABELS[category as CommandCategory]}
                      </div>
                      <div className="space-y-0.5">
                        {catItems.map((item) => {
                          const itemIndex = globalCounter++;
                          const isSelected = itemIndex === selectedIndex;

                          return (
                            <button
                              key={item.id}
                              data-index={itemIndex}
                              onClick={() => executeItem(item)}
                              onMouseEnter={() => setSelectedIndex(itemIndex)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                                isSelected
                                  ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <span className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 shrink-0">
                                  {getItemIcon(item)}
                                </span>
                                <div className="truncate">
                                  <div className="text-sm font-medium tracking-tight truncate">
                                    {item.title}
                                  </div>
                                  {item.description && (
                                    <div className="text-xs text-gray-400 dark:text-gray-400 truncate">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {item.tags && item.tags.length > 0 && (
                                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-medium">
                                    #{item.tags[0]}
                                  </span>
                                )}
                                {isSelected && (
                                  <span className="text-gray-400 dark:text-gray-400">
                                    <FiCornerDownLeft size={13} />
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0c] border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-white/10 font-mono text-[9px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-white/10 font-mono text-[9px]">
                    ↓
                  </kbd>
                  <span className="ml-0.5">to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-white/10 font-mono text-[9px]">
                    ↵
                  </kbd>
                  <span className="ml-0.5">to select</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Quick search</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
