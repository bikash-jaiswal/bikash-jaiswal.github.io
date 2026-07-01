'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiSearch, 
  FiCopy, 
  FiCheck, 
  FiHash,
  FiArrowRight
} from 'react-icons/fi';
import { TILEntry } from '../../lib/til';

// Custom hook to detect theme
function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

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

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[10px] font-medium text-gray-500 hover:text-black dark:hover:text-white transition-all"
    >
      {copied ? <><FiCheck size={10} /> Copied</> : <><FiCopy size={10} /> Copy</>}
    </button>
  );
}

const CustomLink = ({ href, children }: any) => {
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  if (isInternal) return <Link href={href}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
};

function TILCodeBlock({ children, language }: { children: string; language: string }) {
  return (
    <div className="relative group my-10 rounded-2xl overflow-hidden border border-gray-800 bg-[#0d1117] shadow-xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-[#161b22]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
          </div>
          <span className="ml-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{language}</span>
        </div>
        <CopyButton content={children} />
      </div>
      <div className="overflow-x-auto p-6 sm:p-8">
        <SyntaxHighlighter
          language={language || 'text'}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.85rem',
            lineHeight: '1.7',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function generateHeadingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function TILCard({ entry, index }: { entry: TILEntry; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = useTheme();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline Connector */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-100 dark:bg-white/5" />
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-black dark:bg-white border-4 border-white dark:border-black ring-1 ring-gray-100 dark:ring-white/5" />

      <div 
        className="group cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-white/[0.02] border border-transparent hover:border-gray-100 dark:hover:border-white/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <time className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {formatDate(entry.date)}
            </time>
            <div className="flex gap-2">
              {entry.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] font-medium text-gray-400 dark:text-gray-500">#{tag.toLowerCase()}</span>
              ))}
            </div>
          </div>
          
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
              <span className="link-elegant">{entry.title}</span>
            </h3>
            <div className={`mt-1.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <FiChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </header>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <div className="prose prose-elegant max-w-none prose-sm">
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-none space-y-2 mb-6 ml-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal space-y-2 mb-6 ml-6">{children}</ol>,
                      li: ({ children, ...props }) => (
                        <li className="flex gap-2" {...props}>
                          {!props.className?.includes('list-decimal') && (
                            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-black/20 dark:bg-white/20" />
                          )}
                          <span>{children}</span>
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-6 pl-6 border-l-2 border-black/10 dark:border-white/10 italic text-black/70 dark:text-white/70">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="my-6 overflow-x-auto border border-gray-100 dark:border-white/5 rounded-xl">
                          <table className="w-full text-xs text-left border-collapse">{children}</table>
                        </div>
                      ),
                      th: ({ children }) => <th className="px-4 py-2 bg-gray-50 dark:bg-white/5 font-bold border-b border-gray-100 dark:border-white/5">{children}</th>,
                      td: ({ children }) => <td className="px-4 py-2 border-b border-gray-100 dark:border-white/5">{children}</td>,
                      a: CustomLink,
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match;
                        const codeContent = String(children).replace(/\n$/, '');
                        
                        if (isInline) {
                          return (
                            <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[0.85em] font-bold" {...props}>
                              {children}
                            </code>
                          );
                        }
                        
                        return <TILCodeBlock language={match[1]}>{codeContent}</TILCodeBlock>;
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
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = [...new Set(entries.flatMap(e => e.tags))].sort();

  const filteredEntries = entries.filter(e => {
    const matchesTag = !selectedTag || e.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  // Re-group filtered entries
  const filteredGrouped = filteredEntries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(entry);
    return acc;
  }, {} as Record<string, TILEntry[]>);

  return (
    <div className="max-w-3xl mx-auto space-y-16">
      {/* Search & Filter */}
      <div className="space-y-8">
        <div className="relative group">
          <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search learnings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-4 py-3 bg-transparent border-b border-gray-100 dark:border-white/5 focus:border-black dark:focus:border-white text-sm focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border ${
              !selectedTag
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                selectedTag === tag
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                  : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-20">
        {Object.entries(filteredGrouped).map(([monthYear, monthEntries]) => (
          <section key={monthYear} className="space-y-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 sticky top-24 z-10 bg-background/80 backdrop-blur-sm py-2">
              {monthYear}
            </h2>
            <div className="space-y-0">
              {monthEntries.map((entry, index) => (
                <TILCard key={entry.slug} entry={entry} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-32 text-gray-500">
          <p className="text-sm font-medium tracking-tight">No matching learnings found.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedTag(null);}}
            className="mt-4 text-xs underline underline-offset-4 hover:text-black dark:hover:text-white"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
