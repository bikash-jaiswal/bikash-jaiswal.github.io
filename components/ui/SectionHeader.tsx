'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  link,
  align = 'left',
}) => {
  const alignmentClasses = align === 'center' ? 'text-center items-center' : 'items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col gap-3 ${alignmentClasses}`}
    >
      {kicker && (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          {kicker}
        </span>
      )}
      <div className={`flex flex-col gap-4 w-full ${link ? 'md:flex-row md:items-end md:justify-between' : ''}`}>
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {link && (
          <Link
            href={link.href}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            {link.label}
            <FiArrowRight size={14} />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default SectionHeader;
