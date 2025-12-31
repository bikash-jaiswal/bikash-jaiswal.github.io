import GitHubProjects from '../../components/GitHubProjects';
import { Metadata } from 'next';
import { FiGithub, FiCode, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my GitHub repositories and personal projects in web development, machine learning, and more.',
  openGraph: {
    title: 'Projects | Bikash Jaiswal',
    description:
      'Explore my GitHub repositories and personal projects in web development, machine learning, and more.',
    url: 'https://bikash-jaiswal.github.io/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Bikash Jaiswal',
    description:
      'Explore my GitHub repositories and personal projects in web development, machine learning, and more.',
  },
  alternates: {
    canonical: '/projects',
  },
  keywords: [
    'GitHub',
    'projects',
    'repositories',
    'code',
    'portfolio',
    'developer',
    'software engineer',
  ],
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-400 mb-6">
            <FiCode size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A collection of my open-source projects and experiments. 
            From web applications to machine learning, here&apos;s what I&apos;ve been building.
          </p>
          <a
            href="https://github.com/bikash-jaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300"
          >
            <FiGithub size={20} />
            <span>View GitHub Profile</span>
            <FiExternalLink size={16} className="opacity-50" />
          </a>
        </div>

        {/* Projects Grid */}
        <GitHubProjects />
      </div>
    </div>
  );
}
