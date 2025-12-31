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
    <div className="w-full max-w-2xl mx-auto mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative group">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 blur transition-opacity duration-300 ${isFocused ? 'opacity-30' : 'group-hover:opacity-20'}`} />
        
        <div className="relative flex items-center">
          <FiSearch 
            className={`absolute left-4 transition-colors duration-200 ${isFocused ? 'text-violet-400' : 'text-gray-500'}`} 
            size={20} 
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
            className="w-full pl-12 pr-24 py-3.5 text-white bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl 
                     focus:outline-none focus:border-violet-500/50 focus:bg-gray-900 transition-all duration-200
                     placeholder:text-gray-500"
            aria-label="Search posts"
            autoComplete="off"
          />
          
          <div className="absolute right-3 flex items-center gap-2">
            <AnimatePresence>
              {value && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                  aria-label="Clear search"
                >
                  <FiX size={16} />
                </motion.button>
              )}
            </AnimatePresence>
            
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-gray-800/50 rounded-md border border-gray-700/50">
              <FiCommand size={12} />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      {tags.length > 0 && onTagSelect && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagSelect(null)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              !selectedTag
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
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
