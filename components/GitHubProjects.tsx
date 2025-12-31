'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import GitHubProject from './GitHubProject';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  updated_at: string;
}

export default function GitHubProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/users/bikash-jaiswal/repos?sort=updated&direction=desc&per_page=100'
        );

        if (!response.ok) {
          throw new Error(`GitHub API responded with status: ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();
        const filteredData = data.filter((repo) => !repo.fork);
        setProjects(filteredData);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError('Failed to load GitHub projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Extract unique languages
  const languages = useMemo(() => {
    const langSet = new Set<string>();
    projects.forEach((p) => {
      if (p.language) langSet.add(p.language);
    });
    return Array.from(langSet).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
  }, [projects, searchTerm, selectedLanguage]);

  // Stats
  const totalStars = useMemo(() => 
    projects.reduce((sum, p) => sum + p.stargazers_count, 0), 
    [projects]
  );

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-xl" />
              <div className="flex-1">
                <div className="h-5 bg-gray-800 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/3" />
              </div>
            </div>
            <div className="h-4 bg-gray-800 rounded w-full mb-2" />
            <div className="h-4 bg-gray-800 rounded w-4/5 mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-800 rounded-lg w-16" />
              <div className="h-6 bg-gray-800 rounded-lg w-20" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-800 rounded-xl flex-1" />
              <div className="h-10 bg-gray-800 rounded-xl flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-400 mb-4">
          <FiX size={32} />
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-center gap-6 p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50"
      >
        <div className="text-center px-6">
          <div className="text-2xl font-bold text-white">{projects.length}</div>
          <div className="text-sm text-gray-400">Repositories</div>
        </div>
        <div className="w-px h-10 bg-gray-800 hidden sm:block" />
        <div className="text-center px-6">
          <div className="text-2xl font-bold text-yellow-400">{totalStars}</div>
          <div className="text-sm text-gray-400">Total Stars</div>
        </div>
        <div className="w-px h-10 bg-gray-800 hidden sm:block" />
        <div className="text-center px-6">
          <div className="text-2xl font-bold text-blue-400">{languages.length}</div>
          <div className="text-sm text-gray-400">Languages</div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-900/80 border border-gray-800/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Language Filter */}
        <div className="relative">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <select
            value={selectedLanguage || ''}
            onChange={(e) => setSelectedLanguage(e.target.value || null)}
            className="appearance-none pl-11 pr-10 py-3 bg-gray-900/80 border border-gray-800/50 rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-colors cursor-pointer min-w-[160px]"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      {(searchTerm || selectedLanguage) && (
        <p className="text-gray-400 text-sm">
          Showing {filteredProjects.length} of {projects.length} projects
          {selectedLanguage && <span className="text-violet-400"> in {selectedLanguage}</span>}
        </p>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <GitHubProject
              key={project.id}
              name={project.name}
              description={project.description || 'No description available'}
              url={project.html_url}
              homepage={project.homepage || undefined}
              stars={project.stargazers_count}
              forks={project.forks_count}
              watchers={project.watchers_count}
              language={project.language || undefined}
              topics={project.topics || []}
              updatedAt={project.updated_at}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-2">No projects found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
