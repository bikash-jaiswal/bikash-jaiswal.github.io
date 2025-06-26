"use client";

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
    tags: []
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
      .flatMap(resource => resource.tags)
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
        setResources(prevResources => 
          prevResources.map(resource => 
            resource.id === id 
              ? { ...resource, favorite: !resource.favorite } 
              : resource
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
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Toggle a tag in the filters
  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
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
      tags: []
    });
  };

  // Apply filters to resources
  const filteredResources = resources.filter(resource => {
    // Filter by category
    if (filters.category !== 'all' && resource.category !== filters.category) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm && !resource.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
        !resource.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by favorites
    if (filters.showFavoritesOnly && !resource.favorite) {
      return false;
    }
    
    // Filter by tags
    if (filters.tags.length > 0 && !filters.tags.some(tag => resource.tags.includes(tag))) {
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
    { value: 'cheatsheet', label: 'Cheatsheets' }
  ];

  // Display loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600">
            Developer Resources
          </h1>
          <p className="text-xl text-gray-300">Loading resources...</p>
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600">
            Developer Resources
          </h1>
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600">
          Developer Resources
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A curated collection of tools, libraries, tutorials and resources I frequently use for software development.
        </p>
      </motion.div>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Search Box */}
          <div className="relative flex-grow max-w-lg">
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Search resources..."
              className="w-full py-3 pl-10 pr-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-violet-500 focus:outline-none text-white"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {filters.searchTerm && (
              <button 
                onClick={() => handleFilterChange('searchTerm', '')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none focus-ring rounded-full p-1"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-violet-500 focus:outline-none focus-ring transition-colors duration-200"
            >
              <FiFilter className="mr-2" />
              <span>{isFilterExpanded ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <button
              onClick={() => handleFilterChange('showFavoritesOnly', !filters.showFavoritesOnly)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus-ring ${
                filters.showFavoritesOnly 
                  ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' 
                  : 'bg-gray-800 border border-gray-700 hover:border-yellow-500/30'
              }`}
            >
              <FiStar className={`mr-2 ${filters.showFavoritesOnly ? 'fill-yellow-400' : ''}`} />
              <span>Favorites</span>
            </button>
          </div>
        </div>

        {/* Expanded Filter Panel */}
        {isFilterExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4"
          >
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="font-medium mb-2">Categories</h3>
              
              <button
                onClick={handleResetFilters}
                className="text-xs text-violet-400 hover:underline focus:outline-none focus-ring px-1 rounded"
              >
                Reset All Filters
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleFilterChange('category', category.value)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filters.category === category.value
                      ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                      : 'bg-gray-700 text-gray-300 border border-gray-600 hover:border-violet-500/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Tag Filters */}
            <h3 className="font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-teal-600/20 text-teal-400 border border-teal-500/30'
                      : 'bg-gray-700 text-gray-300 border border-gray-600 hover:border-teal-500/30'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6 text-gray-400">
        Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            <p className="text-lg mb-2">No resources match your filters</p>
            <button
              onClick={handleResetFilters}
              className="text-violet-400 hover:underline focus:outline-none focus-ring px-1 rounded"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
