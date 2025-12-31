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
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    const sorted = sortByDate(initialPosts);
    
    let filtered = sorted;
    
    // Filter by tag first
    if (selectedTag) {
      filtered = filtered.filter((post) => 
        post.tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    // Then filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          (post.subtitle?.toLowerCase().includes(searchLower) ?? false) ||
          (post.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ?? false)
      );
    }
    
    return filtered;
  }, [initialPosts, searchTerm, selectedTag]);

  // Reset to page 1 when filters change
  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleSetSelectedTag = useCallback((tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  }, []);

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
    setSearchTerm: handleSetSearchTerm,
    selectedTag,
    setSelectedTag: handleSetSelectedTag,
    allTags,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
  };
}
