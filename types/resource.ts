export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  tags: string[];
  favorite?: boolean;
  dateAdded: string;
  icon?: string; // Icon identifier (e.g., 'FiCode', 'FiBook')
}

export type ResourceCategory = 
  | 'tool' 
  | 'reference' 
  | 'library' 
  | 'framework' 
  | 'tutorial' 
  | 'course' 
  | 'book' 
  | 'article' 
  | 'documentation'
  | 'cheatsheet'
  | 'video'
  | 'podcast'
  | 'template'
  | 'online-tool'
  | 'newsletter'
  | 'blog'
  | 'community'
  | 'forum'
  | 'news-source'
  | 'job-board'
  | 'ai-tool'
  | 'software-tool'
  | 'machine-learning'
  | 'deep-learning'
  | 'natural-language-processing'
  | 'computer-vision'
  | 'system-design';

export interface ResourceFilters {
  category?: ResourceCategory | 'all';
  searchTerm: string;
  showFavoritesOnly: boolean;
  tags: string[];
}

// Sample data for resources
export const sampleResources: Resource[] = [
  {
    id: '1', // Free Certifications resource
    title: 'Free Certifications',
    description: 'A curated collection of free professional certifications across various industries including cloud, cybersecurity, programming, and more.',
    url: 'https://free-certifications.com/',
    category: 'reference',
    tags: ['certifications', 'learning', 'career', 'education', 'free'],
    dateAdded: '2025-06-06',
    icon: 'FiAward',
    favorite: true
  },
  {
    id: '2', // Nim Days resource
    title: 'Nim Days',
    description: 'A practical book about using the Nim programming language to build useful applications like parsers, testing frameworks, build systems, clients, and more.',
    url: 'https://xmonader.github.io/nimdays/book_intro.html',
    category: 'book',
    tags: ['programming', 'nim', 'tutorial', 'practical'],
    dateAdded: '2025-06-05',
    icon: 'FiBook',
    favorite: true
  },
  {
    id: '3',
    title: 'React Documentation',
    description: 'Official documentation for React library',
    url: 'https://reactjs.org/docs',
    category: 'documentation',
    tags: ['react', 'javascript', 'frontend'],
    favorite: true,
    dateAdded: '2025-01-15',
    icon: 'FiCode'
  },
  {
    id: '4',
    title: 'Next.js Documentation',
    description: 'Learn how to use Next.js for production React applications',
    url: 'https://nextjs.org/docs',
    category: 'documentation',
    tags: ['react', 'nextjs', 'ssr'],
    favorite: true,
    dateAdded: '2025-01-20',
    icon: 'FiCode'
  },
  {
    id: '5',
    title: 'Free for Dev',
    description: 'A comprehensive list of services with free tiers for developers, including education resources and career development tools',
    url: 'https://free-for.dev/#/?id=education-and-career-development',
    category: 'reference',
    tags: ['free', 'developer-tools', 'education', 'resources', 'career'],
    favorite: true,
    dateAdded: '2025-06-05',
    icon: 'FiBookOpen'
  },
  {
    id: '6',
    title: 'Build Your Own X - AI',
    description: 'Collection of tutorials on how to build your own AI systems and tools from scratch',
    url: 'https://build-your-own-x.vercel.app/#build-your-own-ai',
    category: 'tutorial',
    tags: ['ai', 'machine-learning', 'tutorial', 'learning', 'projects'],
    favorite: true,
    dateAdded: '2025-06-05',
    icon: 'FiCpu'
  },
  {
    id: '7',
    title: 'Refactoring Guru - Design Patterns',
    description: 'Clear explanations and examples of design patterns and refactoring techniques with visual illustrations',
    url: 'https://refactoring.guru/design-patterns/',
    category: 'reference',
    tags: ['design-patterns', 'architecture', 'software-design', 'refactoring', 'best-practices'],
    favorite: true,
    dateAdded: '2025-06-05',
    icon: 'FiLayers'
  },
  {
    id: '8',
    title: 'TypeScript Handbook',
    description: 'Comprehensive guide to TypeScript',
    url: 'https://www.typescriptlang.org/docs/',
    category: 'documentation',
    tags: ['typescript', 'javascript'],
    dateAdded: '2025-02-05',
    icon: 'FiBook'
  },
  {
    id: '9',
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development',
    url: 'https://tailwindcss.com/docs',
    category: 'framework',
    tags: ['css', 'frontend', 'design'],
    favorite: true,
    dateAdded: '2025-01-10',
    icon: 'FiLayout'
  },
  {
    id: '10',
    title: 'GitHub Copilot Documentation',
    description: 'Learn how to use GitHub Copilot for AI-assisted coding',
    url: 'https://github.com/features/copilot',
    category: 'tool',
    tags: ['ai', 'productivity', 'coding'],
    dateAdded: '2025-03-01',
    icon: 'FiTool'
  },
  {
    id: '11',
    title: 'System Design Primer',
    description: 'Learn how to design large-scale systems',
    url: 'https://github.com/donnemartin/system-design-primer',
    category: 'reference',
    tags: ['system design', 'architecture', 'interviews'],
    favorite: true,
    dateAdded: '2025-02-15',
    icon: 'FiDatabase'
  },
  {
    id: '12',
    title: 'JavaScript Algorithms and Data Structures',
    description: 'Comprehensive collection of algorithms and data structures implemented in JavaScript',
    url: 'https://github.com/trekhleb/javascript-algorithms',
    category: 'reference',
    tags: ['algorithms', 'data structures', 'javascript'],
    dateAdded: '2025-01-25',
    icon: 'FiCode'
  },
  {
    id: '13',
    title: 'Web Development Roadmap',
    description: 'Step by step guide to becoming a modern frontend or backend developer',
    url: 'https://roadmap.sh/',
    category: 'tutorial',
    tags: ['career', 'learning path', 'web development'],
    favorite: true,
    dateAdded: '2025-02-10',
    icon: 'FiMap'
  },
  {
    id: '14',
    title: 'Framer Motion',
    description: 'Production-ready motion library for React',
    url: 'https://www.framer.com/motion/',
    category: 'library',
    tags: ['react', 'animation', 'frontend'],
    dateAdded: '2025-03-05',
    icon: 'FiActivity'
  },
  {
    id: '15',
    title: 'Docker Documentation',
    description: 'Learn how to containerize your applications',
    url: 'https://docs.docker.com/',
    category: 'documentation',
    tags: ['devops', 'containers', 'deployment'],
    dateAdded: '2025-01-30',
    icon: 'FiBox'
  },
  {
    id: '16',
    title: 'OODesign.com',
    description: 'Object Oriented Design Principles',
    url: 'https://www.oodesign.com/',
    favorite: true,
    category: 'reference',
    tags: ['design patterns', 'object-oriented', 'principles'],
    dateAdded: '2025-03-01',
    icon: 'FiCode'
  }
];
