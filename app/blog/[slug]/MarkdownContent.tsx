'use client';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { useState } from 'react';
import { FiCopy, FiCheck, FiTerminal } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownContentProps {
  content: string;
}

const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'transparent',
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
  },
};

function CodeBlock({ children, language }: { children: string; language: string }) {
  const [copied, setCopied] = useState(false);

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
    <div className="relative group my-6 rounded-xl overflow-hidden border border-gray-700/50 bg-[#1e1e1e] shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <FiTerminal size={14} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {displayLanguage}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white'
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
          style={customTheme}
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
            color: '#4a5568',
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
                className="px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400 text-sm font-medium"
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
