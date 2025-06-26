'use client';

import { useState, useEffect } from 'react';
import GitHubProject from './GitHubProject';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
}

export default function GitHubProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // You can replace 'bikash-jaiswal' with your actual GitHub username
        const response = await fetch('https://api.github.com/users/bikash-jaiswal/repos?sort=updated&direction=desc');
        
        if (!response.ok) {
          throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        
        const data: GitHubRepo[] = await response.json();
        // Filter out forked repositories if desired
        const filteredData = data.filter(repo => !repo.fork);
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-6 bg-gray-800">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-white text-xl mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-8">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <GitHubProject
            key={project.id}
            name={project.name}
            description={project.description || 'No description available'}
            url={project.html_url}
            homepage={project.homepage || undefined}
            stars={project.stargazers_count}
            language={project.language || undefined}
            topics={project.topics || []}
          />
        ))}
      </div>
    </div>
  );
}
