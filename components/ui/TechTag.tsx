'use client';

import React from 'react';

interface TechTagProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'blue';
}

export const TechTag: React.FC<TechTagProps> = ({ 
  children, 
}) => {
  return (
    <span
      className="inline-block rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:border-white/5 dark:bg-white/5 dark:text-gray-400"
    >
      {children}
    </span>
  );
};

export default TechTag;
