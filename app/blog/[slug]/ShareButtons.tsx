'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTwitter, FiLinkedin, FiLink, FiCheck, FiShare2 } from 'react-icons/fi';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttons = [
    {
      href: shareLinks.twitter,
      icon: FiTwitter,
      label: 'Twitter',
      hoverClass: 'hover:bg-sky-500 hover:border-sky-500',
    },
    {
      href: shareLinks.linkedin,
      icon: FiLinkedin,
      label: 'LinkedIn',
      hoverClass: 'hover:bg-blue-600 hover:border-blue-600',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-violet-500/50 transition-all text-sm"
      >
        <FiShare2 size={14} />
        <span>Share</span>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            {buttons.map((button, index) => (
              <motion.a
                key={button.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white transition-all ${button.hoverClass}`}
                aria-label={`Share on ${button.label}`}
              >
                <button.icon size={16} />
              </motion.a>
            ))}
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={handleCopyLink}
              className={`p-2.5 rounded-full border transition-all ${
                copied
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:text-white hover:bg-violet-600 hover:border-violet-600'
              }`}
              aria-label={copied ? 'Link copied!' : 'Copy link'}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FiCheck size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="link"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FiLink size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
