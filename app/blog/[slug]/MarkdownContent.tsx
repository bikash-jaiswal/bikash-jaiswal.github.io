'use client';

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
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useState, useEffect, type HTMLAttributes, type ReactNode } from 'react';

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

interface MarkdownContentProps {
  content: string;
}

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={() => handleCopy()}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-200/50 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-[10px] font-bold text-gray-600 dark:text-white/50 hover:text-black dark:hover:text-white transition-all border border-gray-300 dark:border-white/10 shadow-sm"
    >
      {copied ? <FiCheck size={12} className="text-emerald-500" /> : <FiCopy size={12} />}
      <span className="uppercase tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

function CodeBlock({ children, language }: { children: string; language: string }) {
  const isDark = useTheme();
  
  return (
    <div className="relative group my-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d1117] shadow-xl dark:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-[#161b22]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
          </div>
          <span className="ml-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">{language}</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <CopyButton content={children} />
        </div>
      </div>
      <div className="overflow-x-auto p-6 sm:p-8">
        <SyntaxHighlighter
          language={language || 'text'}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.9rem',
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

const CustomLink = ({ href, children }: any) => {
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  const isExternal = !isInternal;

  if (isInternal) {
    return (
      <Link href={href} className="link-elegant">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-elegant inline-flex items-center gap-1">
      {children}
      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-elegant animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ReactMarkdown
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ children }) => {
            const text = String(children);
            const id = generateHeadingId(text);
            return (
              <h2 id={id} className="scroll-mt-24 group relative">
                <a href={`#${id}`} className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-black dark:hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </a>
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = generateHeadingId(text);
            return (
              <h3 id={id} className="scroll-mt-24 group relative">
                <a href={`#${id}`} className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-black dark:hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </a>
                {children}
              </h3>
            );
          },
          table: ({ children }) => (
            <div className="my-12 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-lg">
              <table className="w-full text-sm text-left border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 uppercase text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400">{children}</thead>,
          th: ({ children }) => <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{children}</th>,
          td: ({ children }) => <td className="px-6 py-4 border-b border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 last:border-0">{children}</td>,
          a: CustomLink,
          img: ({ src, alt }) => (
            <figure className="my-16 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={alt} 
                className="rounded-3xl border border-gray-200 dark:border-white/10 w-full shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]" 
              />
              {alt && <figcaption className="mt-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">{alt}</figcaption>}
            </figure>
          ),
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (isInline) {
              return (
                <code 
                  className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-black dark:text-white text-[0.85em] font-semibold border border-gray-200 dark:border-white/10"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <CodeBlock language={match[1]}>
                {String(children).replace(/\n$/, '')}
              </CodeBlock>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
