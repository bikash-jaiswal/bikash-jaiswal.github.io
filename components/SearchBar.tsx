'use client';

import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiCommand } from 'react-icons/fi';
import { useDebounce } from '../lib/hooks';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  debounceMs?: number;
  tags?: string[];
  selectedTag?: string;
  onTagSelect?: (tag: string | null) => void;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search posts by title, content, or tags...',
  debounceMs = 300,
  tags = [],
  selectedTag,
  onTagSelect,
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(onSearch, debounceMs);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      debouncedSearch(newValue);
    },
    [debouncedSearch]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setValue('');
        debouncedSearch('');
      }
    },
    [debouncedSearch]
  );

  const handleClear = useCallback(() => {
    setValue('');
    debouncedSearch('');
  }, [debouncedSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('[data-search-input]');
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <FiSearch 
            className={`absolute left-4 transition-colors duration-200 ${isFocused ? 'text-black dark:text-white' : 'text-gray-400'}`} 
            size={18} 
          />
          
          <input
            type="search"
            data-search-input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 text-sm text-black dark:text-white bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-full 
                     focus:outline-none focus:border-black dark:focus:border-white transition-all duration-200
                     placeholder:text-gray-400 dark:placeholder:text-gray-500"
            aria-label="Search posts"
            autoComplete="off"
          />
          
          <div className="absolute right-4 flex items-center gap-2">
            <AnimatePresence>
              {value && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <FiX size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      {tags.length > 0 && onTagSelect && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onTagSelect(null)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              !selectedTag
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-50 text-gray-500 hover:text-black dark:bg-white/5 dark:text-gray-400 dark:hover:text-white border border-gray-100 dark:border-white/5'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-50 text-gray-500 hover:text-black dark:bg-white/5 dark:text-gray-400 dark:hover:text-white border border-gray-100 dark:border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
