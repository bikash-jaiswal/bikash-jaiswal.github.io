'use client';

import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';
import Card from './Card';
import TechTag from './TechTag';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  status?: string;
  href?: string;
  delay?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  status,
  href,
  delay = 0,
}) => {
  return (
    <Card delay={delay} className="group flex flex-col h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {title}
          </h3>
          {status && (
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-600 dark:bg-white/10 dark:text-gray-400">
              {status}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {href && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm font-medium text-black dark:text-white hover:underline"
            >
              View Project
              <FiArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
