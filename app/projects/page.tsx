import GitHubProjects from '../../components/GitHubProjects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my GitHub repositories and personal projects in web development, machine learning, and more.',
  openGraph: {
    title: 'Projects | Bikash Jaiswal',
    description: 'Explore my GitHub repositories and personal projects in web development, machine learning, and more.',
    url: 'https://bikash-jaiswal.github.io/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Bikash Jaiswal',
    description: 'Explore my GitHub repositories and personal projects in web development, machine learning, and more.',
  },
  alternates: {
    canonical: '/projects',
  },
  keywords: ['GitHub', 'projects', 'repositories', 'code', 'portfolio', 'developer', 'software engineer']
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-bold text-white text-3xl mb-2 text-center">My GitHub Projects</h1>
        <p className="text-gray-400 text-center mb-12">Some of the projects I&apos;ve been working on</p>
        <GitHubProjects />
      </div>
    </div>
  );
}
