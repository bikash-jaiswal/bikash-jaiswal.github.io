'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { PostMetadata } from '../types/blog';
import { sortByDate } from './date';

// ============ useDebounce ============
type AnyFunction = (...args: never[]) => unknown;

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export function useDebounce<T extends AnyFunction>(fn: T, delay: number): DebouncedFunction<T> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fn(...(args as Parameters<T>));
      }, delay);
    },
    [fn, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  (debouncedFn as DebouncedFunction<T>).cancel = cancel;
  return debouncedFn as DebouncedFunction<T>;
}

// ============ usePosts ============
interface UsePostsOptions {
  initialPosts: PostMetadata[];
  postsPerPage?: number;
}

interface UsePostsReturn {
  filteredPosts: PostMetadata[];
  currentPosts: PostMetadata[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function usePosts({ initialPosts, postsPerPage = 10 }: UsePostsOptions): UsePostsReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const sorted = sortByDate(initialPosts);
    if (!searchTerm) return sorted;

    const searchLower = searchTerm.toLowerCase();
    return sorted.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        (post.subtitle?.toLowerCase().includes(searchLower) ?? false)
    );
  }, [initialPosts, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (hasPrevPage) setCurrentPage((prev) => prev - 1);
  };

  return {
    filteredPosts,
    currentPosts,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
  };
}
