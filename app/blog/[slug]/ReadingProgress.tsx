'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

interface ReadingProgressProps {
  readingTime?: number;
}

export default function ReadingProgress({ readingTime = 5 }: ReadingProgressProps) {
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const width = useTransform(springProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const newProgress = Math.min(100, Math.max(0, scrollPercent));
      springProgress.set(newProgress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [springProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-black dark:bg-white"
        style={{ width }}
      />
    </div>
  );
}
