'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Resource } from '../types/resource';
import {
  FiExternalLink,
  FiCode,
  FiBook,
  FiBox,
  FiDatabase,
  FiLayout,
  FiMap,
  FiTool,
  FiActivity,
} from 'react-icons/fi';
import Card from './ui/Card';
import TechTag from './ui/TechTag';

interface ResourceCardProps {
  resource: Resource;
  onToggleFavorite?: (id: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  FiCode: <FiCode size={16} />,
  FiBook: <FiBook size={16} />,
  FiBox: <FiBox size={16} />,
  FiDatabase: <FiDatabase size={16} />,
  FiLayout: <FiLayout size={16} />,
  FiMap: <FiMap size={16} />,
  FiTool: <FiTool size={16} />,
  FiActivity: <FiActivity size={16} />,
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { title, description, url, category, tags, icon } = resource;

  return (
    <Card className="group h-full flex flex-col gap-4">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-black dark:bg-white/5 dark:text-white">
              {icon && iconMap[icon] ? iconMap[icon] : <FiCode size={16} />}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {category}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-black dark:text-white hover:underline"
          >
            Visit Resource
            <FiExternalLink size={14} />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;
