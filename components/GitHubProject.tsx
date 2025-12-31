'use client';

import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';

interface GitHubProjectProps {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  language?: string;
  topics: string[];
}

export default function GitHubProject({
  name,
  description,
  url,
  homepage,
  stars,
  language,
  topics,
}: GitHubProjectProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 hover:border-violet-400 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white flex items-center">
            <FiGithub className="mr-2" />
            {name}
          </h3>
          {language && (
            <span className="inline-block mt-2 text-sm text-gray-400">
              <span className="inline-block w-3 h-3 rounded-full mr-1 bg-violet-400"></span>
              {language}
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-400">
          <FiStar className="mr-1" />
          <span>{stars}</span>
        </div>
      </div>

      <p className="text-gray-400 mb-4">{description}</p>

      <div className="flex flex-wrap mb-4">
        {topics.map((topic) => (
          <span
            key={topic}
            className="text-xs mr-2 mb-2 px-2 py-1 bg-gray-700 text-gray-300 rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="flex space-x-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-violet-400 hover:text-violet-300"
        >
          <FiGithub className="mr-1" />
          <span>Repository</span>
        </a>
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-violet-400 hover:text-violet-300"
          >
            <FiExternalLink className="mr-1" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
}
