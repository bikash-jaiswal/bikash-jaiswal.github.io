'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FiChevronDown, FiChevronUp, FiCalendar, FiTag } from 'react-icons/fi';
import { TILEntry } from '../../lib/til';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);

interface TILTimelineProps {
  entries: TILEntry[];
  groupedEntries: Record<string, TILEntry[]>;
}

function TILCard({ entry, index }: { entry: TILEntry; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-6 w-4 h-4 rounded-full border-2 border-cyan-500 z-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`} />
      
      <div 
        className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
          isDark 
            ? `bg-gray-900/50 ${isExpanded ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-gray-800/50 hover:border-gray-700/50'}`
            : `bg-white ${isExpanded ? 'border-cyan-500 shadow-lg shadow-cyan-500/10' : 'border-gray-200 hover:border-gray-300'}`
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${isDark ? 'text-cyan-400 bg-cyan-500/10' : 'text-cyan-600 bg-cyan-50'}`}>
                <FiCalendar size={12} />
                {formatDate(entry.date)}
              </span>
              {entry.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag} 
                  className={`text-xs px-2 py-0.5 rounded ${isDark ? 'text-gray-500 bg-gray-800/50' : 'text-gray-600 bg-gray-100'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {entry.title}
            </h3>
          </div>
          
          <button 
            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-gray-500 hover:text-white hover:bg-gray-800/50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`pt-4 mt-4 border-t ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
                <div className={`prose prose-sm max-w-none
                  ${isDark ? 'prose-invert' : ''}
                  prose-headings:font-semibold
                  ${isDark ? 'prose-headings:text-white' : 'prose-headings:text-gray-900'}
                  prose-h2:text-base prose-h2:mt-4 prose-h2:mb-2
                  prose-h3:text-sm prose-h3:mt-3 prose-h3:mb-1
                  ${isDark ? 'prose-p:text-gray-400' : 'prose-p:text-gray-600'} prose-p:leading-relaxed prose-p:my-2
                  ${isDark ? 'prose-strong:text-white' : 'prose-strong:text-gray-900'}
                  ${isDark ? 'prose-code:text-cyan-300 prose-code:bg-gray-800/50' : 'prose-code:text-cyan-700 prose-code:bg-cyan-50'} prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-3
                  ${isDark ? 'prose-ul:text-gray-400' : 'prose-ul:text-gray-600'} prose-ul:my-2
                  prose-li:my-0.5
                `}>
                  <ReactMarkdown
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match;
                        
                        return isInline ? (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        ) : (
                          <SyntaxHighlighter
                            style={isDark ? oneDark : oneLight}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.75rem',
                              fontSize: '0.8rem',
                              padding: '1rem',
                              background: isDark ? '#282c34' : '#fafafa',
                            }}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        );
                      },
                    }}
                  >
                    {entry.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TILTimeline({ entries, groupedEntries }: TILTimelineProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = [...new Set(entries.flatMap(e => e.tags))].sort();

  // Filter entries by tag
  const filteredEntries = selectedTag
    ? entries.filter(e => e.tags.includes(selectedTag))
    : entries;

  return (
    <div className="space-y-8">
      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
            !selectedTag
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      {selectedTag && (
        <p className="text-gray-400 text-sm">
          Showing {filteredEntries.length} entries tagged with{' '}
          <span className="text-cyan-400">{selectedTag}</span>
        </p>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500 via-violet-500 to-blue-500 rounded-full" />
        
        <div className="space-y-4">
          {filteredEntries.map((entry, index) => (
            <TILCard key={entry.slug} entry={entry} index={index} />
          ))}
        </div>
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No entries found for this tag.</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-8">
        <p className="text-gray-500 text-sm italic">
          &quot;Every day is a school day&quot; 📚
        </p>
      </div>
    </div>
  );
}
