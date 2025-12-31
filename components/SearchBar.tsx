'use client';

import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from '../lib/hooks';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search posts...',
  debounceMs = 300,
}: SearchBarProps) {
  const [value, setValue] = useState('');
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

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-white bg-gray-900 border-2 border-gray-700 rounded-lg 
                 focus:outline-none focus:border-blue-500 transition-colors
                 placeholder:text-gray-500"
        aria-label="Search posts"
        autoComplete="off"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-full"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <svg
            className="w-5 h-5 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
