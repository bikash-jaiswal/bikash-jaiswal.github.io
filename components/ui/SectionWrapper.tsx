'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'bordered';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = '',
  id,
  variant = 'default',
}) => {
  const baseClasses = 'py-24';
  const variantClasses = {
    default: '',
    bordered: 'border-y border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5',
  };

  return (
    <section
      id={id}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <div className="container-narrow">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
