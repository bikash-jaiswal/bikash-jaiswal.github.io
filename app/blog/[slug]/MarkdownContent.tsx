'use client';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { FiCopy, FiCheck, FiTerminal } from 'react-icons/fi';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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

const createCustomTheme = (baseTheme: typeof oneDark) => ({
  ...baseTheme,
  'pre[class*="language-"]': {
    ...baseTheme['pre[class*="language-"]'],
    background: 'transparent',
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    ...baseTheme['code[class*="language-"]'],
    background: 'transparent',
  },
});

const darkTheme = createCustomTheme(oneDark);
const lightTheme = createCustomTheme(oneLight);

function CodeBlock({ children, language }: { children: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    // Watch for theme changes
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const displayLanguage = language || 'text';

  return (
    <div className={`relative group my-6 rounded-xl overflow-hidden border shadow-lg transition-colors ${
      isDark 
        ? 'border-gray-700/50 bg-[#1e1e1e]' 
        : 'border-gray-300 bg-[#fafafa]'
    }`}>
      {/* Header bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-gray-100 border-gray-300'
      }`}>
        <div className="flex items-center gap-2">
          <FiTerminal size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          <span className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {displayLanguage}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
            copied
              ? 'bg-green-500/20 text-green-600'
              : isDark 
                ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
          }`}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <FiCheck size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <div className="overflow-x-auto p-4">
        <SyntaxHighlighter
          language={language || 'text'}
          style={isDark ? darkTheme : lightTheme}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.7',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
            },
          }}
          showLineNumbers={children.split('\n').length > 3}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: isDark ? '#4a5568' : '#9ca3af',
            userSelect: 'none',
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

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={{
        h2: ({ children }) => {
          const text = String(children);
          const id = generateHeadingId(text);
          return <h2 id={id}>{children}</h2>;
        },
        h3: ({ children }) => {
          const text = String(children);
          const id = generateHeadingId(text);
          return <h3 id={id}>{children}</h3>;
        },
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;
          
          if (isInline) {
            return (
              <code 
                className="px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium"
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
  );
}
