'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  hover = true 
}) => {
  const hoverClasses = hover 
    ? 'hover:border-black/20 dark:hover:border-white/20 hover:shadow-sm' 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={`relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] transition-all duration-300 dark:border-white/5 dark:bg-white/5 dark:shadow-none ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
