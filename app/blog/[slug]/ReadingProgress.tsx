'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

interface ReadingProgressProps {
  readingTime?: number;
}

function CircularProgress({ 
  progress, 
  springProgress,
  timeRemaining 
}: { 
  progress: number; 
  springProgress: ReturnType<typeof useSpring>;
  timeRemaining: string;
}) {
  const [showTime, setShowTime] = useState(false);
  const circleStrokeDashoffset = useTransform(springProgress, [0, 100], [126, 0]);
  
  if (progress <= 5) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
    >
      {/* Time remaining tooltip */}
      <AnimatePresence>
        {showTime && timeRemaining && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="px-3 py-1.5 rounded-lg bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl"
          >
            <div className="flex items-center gap-2 text-sm">
              <FiClock size={14} className="text-violet-400" />
              <span className="text-gray-300 font-medium">{timeRemaining}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Circular progress */}
      <motion.button
        onMouseEnter={() => setShowTime(true)}
        onMouseLeave={() => setShowTime(false)}
        onClick={() => setShowTime(!showTime)}
        className="w-14 h-14 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center shadow-xl cursor-pointer hover:border-violet-500/50 transition-colors"
      >
        <svg className="w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={126}
            style={{ strokeDashoffset: circleStrokeDashoffset }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-xs font-bold text-white">
          {Math.round(progress)}%
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function ReadingProgress({ readingTime = 5 }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const width = useTransform(springProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const newProgress = Math.min(100, Math.max(0, scrollPercent));
      setProgress(newProgress);
      springProgress.set(newProgress);
      
      // Calculate time remaining
      const remainingPercent = 100 - newProgress;
      const minutesLeft = Math.ceil((remainingPercent / 100) * readingTime);
      
      if (minutesLeft <= 0) {
        setTimeRemaining('Done!');
      } else if (minutesLeft === 1) {
        setTimeRemaining('~1 min left');
      } else {
        setTimeRemaining(`~${minutesLeft} min left`);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [springProgress, readingTime]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gray-900/50 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 shadow-lg shadow-violet-500/50"
          style={{ width }}
        />
        <div 
          className="absolute top-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ 
            width: '50px',
            left: `calc(${progress}% - 50px)`,
            opacity: progress > 5 ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        />
      </div>
      
      <CircularProgress progress={progress} springProgress={springProgress} timeRemaining={timeRemaining} />
    </>
  );
}
