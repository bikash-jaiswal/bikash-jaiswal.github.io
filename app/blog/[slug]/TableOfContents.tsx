'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiList } from 'react-icons/fi';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const regex = /^(#{2,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      items.push({ id, text, level });
    }

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const activeIndex = headings.findIndex((h) => h.id === activeId);

  return (
    <nav className="hidden lg:block sticky top-28 w-64 max-h-[calc(100vh-8rem)] shrink-0">
      <div className="relative rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-700/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FiList size={16} className="text-violet-400" />
            <span className="text-sm font-semibold text-white">On this page</span>
          </div>
          <span className="text-xs text-gray-500">{headings.length} sections</span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative px-5 pb-5">
                <div className="absolute left-5 top-0 bottom-5 w-px bg-gray-700/50" />
                
                <motion.div
                  className="absolute left-5 w-px bg-gradient-to-b from-violet-500 to-blue-500"
                  initial={false}
                  animate={{
                    top: `${(activeIndex / headings.length) * 100}%`,
                    height: `${100 / headings.length}%`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ display: activeIndex >= 0 ? 'block' : 'none' }}
                />

                <ul className="space-y-1 text-sm relative">
                  {headings.map((heading, index) => (
                    <li
                      key={heading.id}
                      style={{ paddingLeft: `${(heading.level - 2) * 12 + 16}px` }}
                    >
                      <a
                        href={`#${heading.id}`}
                        className={`block py-2 transition-all duration-200 ${
                          activeId === heading.id
                            ? 'text-white font-medium translate-x-1'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span className="line-clamp-1">{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
