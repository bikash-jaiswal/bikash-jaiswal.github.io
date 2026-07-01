'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiArrowLeft, FiBookOpen } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[120px] md:text-[160px] font-black leading-none text-black dark:text-white opacity-5">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md -mt-12 md:-mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white mb-4">
          Page not found.
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
