'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiArrowLeft, FiBookOpen } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Animated 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative mb-8"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-full" />
        
        <h1 className="relative text-[150px] md:text-[200px] font-black leading-none">
          <span className="bg-gradient-to-br from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            4
          </span>
          <motion.span
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="inline-block bg-gradient-to-br from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            0
          </motion.span>
          <span className="bg-gradient-to-br from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            4
          </span>
        </h1>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-lg mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-400 text-lg">
          The page you&apos;re looking for seems to have wandered off into the void. 
          Let&apos;s get you back on track.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
        >
          <FiHome size={18} />
          <span>Go Home</span>
        </Link>
        
        <Link
          href="/blog"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white font-medium rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300"
        >
          <FiBookOpen size={18} />
          <span>Read Blog</span>
        </Link>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-500 text-sm mb-4">Or try one of these:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: '/projects', label: 'Projects' },
            { href: '/resources', label: 'Resources' },
            { href: '/contacts', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-gray-400 hover:text-violet-400 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg border border-gray-800/50 hover:border-violet-500/30 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-violet-500 rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-40" />
    </div>
  );
}
