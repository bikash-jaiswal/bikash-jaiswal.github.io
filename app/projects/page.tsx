import GitHubProjects from '../../components/GitHubProjects';
import { Metadata } from 'next';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../../components/ui/SectionHeader';
import ProjectCard from '../../components/ui/ProjectCard';

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
};

const featuredProjects = [
  {
    title: 'Agentic System (MWA)',
    description:
      'Architected a complex agentic system using Google ADK and Azure AI Foundry. Features custom SSE token-streaming and multi-turn tool-calling orchestration.',
    technologies: ['Google ADK', 'Azure AI', 'SSE Streaming', 'LangChain4j'],
    status: 'Production',
  },
  {
    title: 'Real-Time Communication',
    description:
      'High-performance backend for real-time messaging handling gRPC orchestration and Redis-backed state management.',
    technologies: ['Python', 'gRPC', 'Redis', 'Kafka'],
    status: 'Production',
  },
  {
    title: 'LLM Enterprise Wrappers',
    description:
      'Custom LLM wrappers adapting LangChain4j to enterprise-grade Mistral endpoints with deep JSON-Schema and protocol stabilization.',
    technologies: ['Java', 'LangChain4j', 'Mistral', 'JSON-Schema'],
    status: 'Completed',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            A collection of production systems and open-source experiments.
          </p>
          <a
            href="https://github.com/bikash-jaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <FiGithub size={18} />
            <span>GitHub Profile</span>
            <FiExternalLink size={14} className="opacity-50" />
          </a>
        </div>

        {/* Featured Projects */}
        <div className="mb-24">
          <SectionHeader kicker="Selected Work" title="Featured Projects" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* GitHub Projects */}
        <div>
          <SectionHeader kicker="Open Source" title="GitHub Repositories" />
          <div className="mt-12">
            <GitHubProjects />
          </div>
        </div>
      </div>
    </div>
  );
}
