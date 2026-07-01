'use client';

import { useState, useEffect } from 'react';
import { FiGithub, FiStar, FiExternalLink } from 'react-icons/fi';
import Card from './ui/Card';
import TechTag from './ui/TechTag';

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

interface GitHubProjectProps {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  language?: string;
  topics: string[];
  index?: number;
}

export function GitHubProject({
  name,
  description,
  url,
  homepage,
  stars,
  language,
  topics,
  index = 0,
}: GitHubProjectProps) {
  return (
    <Card delay={index * 0.05} className="group flex flex-col h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-[10px] font-medium text-gray-500 dark:text-gray-400">
            <FiStar size={12} />
            <span>{stars}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {description || 'No description available'}
        </p>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {language && <TechTag>{language}</TechTag>}
          {topics.slice(0, 2).map((topic) => (
            <TechTag key={topic}>{topic}</TechTag>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex gap-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-black dark:text-white hover:underline"
          >
            Code
            <FiGithub size={12} />
          </a>
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-black dark:text-white hover:underline"
            >
              Demo
              <FiExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function GitHubProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/users/bikash-jaiswal/repos?sort=updated&direction=desc&per_page=12'
        );
        if (!response.ok) throw new Error();
        const data: GitHubRepo[] = await response.json();
        setProjects(data.filter((repo) => !repo.fork));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-48 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <GitHubProject
          key={project.id}
          name={project.name}
          description={project.description}
          url={project.html_url}
          homepage={project.homepage || undefined}
          stars={project.stargazers_count}
          language={project.language || undefined}
          topics={project.topics || []}
          index={index}
        />
      ))}
    </div>
  );
}
