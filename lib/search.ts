import { CommandItem } from '../types/command';
import { getPostMetadata } from './posts';
import { getAllTILEntries } from './til';
import { getReadingMetadata } from './reading';

export async function getGlobalSearchItems(): Promise<CommandItem[]> {
  const baseNavigation: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Home',
      description: 'Overview, latest articles, and current focus',
      category: 'navigation',
      url: '/',
      keywords: ['main', 'start', 'index'],
    },
    {
      id: 'nav-projects',
      title: 'Projects',
      description: 'Agentic systems, distributed architecture, and open-source',
      category: 'navigation',
      url: '/projects',
      keywords: ['work', 'portfolio', 'github', 'mwa', 'agentic'],
    },
    {
      id: 'nav-blog',
      title: 'Blog',
      description: 'Technical deep-dives on systems, architecture, and AI',
      category: 'navigation',
      url: '/blog',
      keywords: ['articles', 'writing', 'posts', 'tutorials'],
    },
    {
      id: 'nav-til',
      title: 'Today I Learned (TIL)',
      description: 'Daily engineering discoveries, commands, and notes',
      category: 'navigation',
      url: '/til',
      keywords: ['snippets', 'notes', 'learnings', 'quick'],
    },
    {
      id: 'nav-reading',
      title: 'Reading List',
      description: 'Curated books and papers on distributed systems and AI',
      category: 'navigation',
      url: '/reading',
      keywords: ['books', 'papers', 'literature', 'library'],
    },
    {
      id: 'nav-resources',
      title: 'Developer Resources',
      description: 'Curated developer tools, frameworks, and cheat sheets',
      category: 'navigation',
      url: '/resources',
      keywords: ['tools', 'cheat sheets', 'libraries', 'stack'],
    },
    {
      id: 'nav-bookmarks',
      title: 'Saved Bookmarks & Posts',
      description: 'Saved LinkedIn resources, articles, and bookmarks',
      category: 'navigation',
      url: '/bookmarks',
      keywords: ['bookmarks', 'saved', 'linkedin', 'resources', 'reading list'],
    },
    {
      id: 'nav-about',
      title: 'About Me',
      description: 'Bio, background, career journey, and contact info',
      category: 'navigation',
      url: '/about',
      keywords: ['bio', 'experience', 'career', 'contact'],
    },
  ];

  const actions: CommandItem[] = [
    {
      id: 'action-save-bookmark',
      title: 'Save New Resource / Bookmark',
      description: 'Bookmark a LinkedIn post, article, or resource link',
      category: 'actions',
      actionId: 'save-bookmark',
      keywords: ['save', 'bookmark', 'add', 'linkedin', 'store', 'link', 'post'],
    },
    {
      id: 'action-theme',
      title: 'Toggle Theme',
      description: 'Switch between dark and light appearance',
      category: 'actions',
      actionId: 'toggle-theme',
      keywords: ['dark mode', 'light mode', 'color', 'appearance'],
    },
    {
      id: 'action-copy-url',
      title: 'Copy Current Page URL',
      description: 'Copy this page link to your clipboard',
      category: 'actions',
      actionId: 'copy-url',
      keywords: ['share', 'clipboard', 'link'],
    },
    {
      id: 'action-github',
      title: 'GitHub Profile',
      description: 'Open github.com/bikash-jaiswal in a new tab',
      category: 'actions',
      actionId: 'github',
      url: 'https://github.com/bikash-jaiswal',
      keywords: ['repositories', 'open source', 'git'],
    },
    {
      id: 'action-linkedin',
      title: 'LinkedIn Profile',
      description: 'Connect on LinkedIn',
      category: 'actions',
      actionId: 'linkedin',
      url: 'https://linkedin.com/in/bikash-jaiswal/',
      keywords: ['social', 'connect', 'networking'],
    },
    {
      id: 'action-email',
      title: 'Send Email',
      description: 'contact@bikashjaiswal.com',
      category: 'actions',
      actionId: 'email',
      url: 'mailto:contact@bikashjaiswal.com',
      keywords: ['message', 'reach out', 'mail'],
    },
  ];

  let postItems: CommandItem[] = [];
  try {
    const posts = await getPostMetadata();
    postItems = posts.map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      description: post.subtitle || `${post.readingTime || 1} min read`,
      category: 'posts' as const,
      url: `/blog/${post.slug}`,
      tags: post.tags,
      keywords: ['blog', 'article', ...(post.tags || [])],
    }));
  } catch (err) {
    console.error('Error fetching posts for command palette:', err);
  }

  let tilItems: CommandItem[] = [];
  try {
    const tils = await getAllTILEntries();
    tilItems = tils.map((til) => ({
      id: `til-${til.slug}`,
      title: til.title,
      description: til.date ? `TIL • ${til.date}` : 'Today I Learned',
      category: 'til' as const,
      url: '/til',
      tags: til.tags,
      keywords: ['til', 'today i learned', ...(til.tags || [])],
    }));
  } catch (err) {
    console.error('Error fetching TILs for command palette:', err);
  }

  let readingItems: CommandItem[] = [];
  try {
    const reading = await getReadingMetadata();
    readingItems = reading.map((item) => ({
      id: `reading-${item.slug}`,
      title: item.title,
      description: item.author ? `By ${item.author} • ${item.category}` : item.category,
      category: 'reading' as const,
      url: `/reading/${item.slug}`,
      tags: item.tags,
      keywords: ['reading', 'book', item.category, ...(item.tags || [])],
    }));
  } catch (err) {
    console.error('Error fetching reading items for command palette:', err);
  }

  return [...baseNavigation, ...postItems, ...tilItems, ...readingItems, ...actions];
}
