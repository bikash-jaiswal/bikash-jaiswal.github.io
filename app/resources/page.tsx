'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiStar, FiX } from 'react-icons/fi';
import ResourceCard from '../../components/ResourceCard';
import { Resource, ResourceCategory, ResourceFilters } from '../../types/resource';
import { ResourceApi } from '../../lib/api';

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ResourceFilters>({
    category: 'all',
    searchTerm: '',
    showFavoritesOnly: false,
    tags: [],
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Fetch resources from API
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await ResourceApi.getResources();
        setResources(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch resources:', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Extract all unique tags from resources
  useEffect(() => {
    const allTags = resources
      .flatMap((resource) => resource.tags)
      .filter((tag, index, self) => self.indexOf(tag) === index)
      .sort();
    setAvailableTags(allTags);
  }, [resources]);

  // Toggle favorite status of a resource
  const handleToggleFavorite = async (id: string) => {
    try {
      const success = await ResourceApi.toggleFavorite(id);

      if (success) {
        // Update local state optimistically
        setResources((prevResources) =>
          prevResources.map((resource) =>
            resource.id === id ? { ...resource, favorite: !resource.favorite } : resource
          )
        );
      }
    } catch (err) {
      console.error('Failed to update favorite status:', err);
    }
  };

  // Update filters when user changes input
  const handleFilterChange = (
    key: keyof ResourceFilters,
    value: string | boolean | ResourceCategory | string[]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Toggle a tag in the filters
  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter((t) => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      searchTerm: '',
      showFavoritesOnly: false,
      tags: [],
    });
  };

  // Apply filters to resources
  const filteredResources = resources.filter((resource) => {
    // Filter by category
    if (filters.category !== 'all' && resource.category !== filters.category) {
      return false;
    }

    // Filter by search term
    if (
      filters.searchTerm &&
      !resource.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !resource.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by favorites
    if (filters.showFavoritesOnly && !resource.favorite) {
      return false;
    }

    // Filter by tags
    if (filters.tags.length > 0 && !filters.tags.some((tag) => resource.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  // Available categories
  const categories: { value: ResourceCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'tool', label: 'Tools' },
    { value: 'reference', label: 'References' },
    { value: 'library', label: 'Libraries' },
    { value: 'framework', label: 'Frameworks' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'course', label: 'Courses' },
    { value: 'book', label: 'Books' },
    { value: 'article', label: 'Articles' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'cheatsheet', label: 'Cheatsheets' },
  ];

  // Display loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
            Developer Resources
          </h1>
          <p className="text-xl text-gray-300">Loading resources...</p>
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
            Developer Resources
          </h1>
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
            Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A curated collection of tools, libraries, and references I use for high-performance backend systems and machine learning.
          </p>
        </motion.div>

        {/* Search and Quick Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Search resources..."
              className="w-full py-3 pl-12 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-full text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
            {filters.searchTerm && (
              <button
                onClick={() => handleFilterChange('searchTerm', '')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterChange('category', category.value)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                  filters.category === category.value
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-50 text-gray-500 hover:text-black dark:bg-white/5 dark:text-gray-400 dark:hover:text-white border border-gray-100 dark:border-white/5'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <div className="text-center py-24 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No resources match your search.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 text-xs font-medium text-black dark:text-white hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;
