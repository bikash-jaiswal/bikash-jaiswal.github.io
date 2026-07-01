'use client';

import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeader from './ui/SectionHeader';
import ProjectCard from './ui/ProjectCard';

const ProofSection: React.FC = () => {
  const featuredWork = [
    {
      title: 'Agentic System (MWA)',
      description:
        'Architected an agentic system using Google ADK and Azure AI Foundry with custom SSE streaming and multi-turn tool-calling.',
      technologies: ['Google ADK', 'Azure AI', 'SSE', 'LangChain4j'],
      status: 'Production',
    },
    {
      title: 'LLM Enterprise Wrappers',
      description:
        'Custom wrappers adapting LangChain4j to Mistral endpoints with deep JSON-Schema and protocol stabilization.',
      technologies: ['Java', 'LangChain4j', 'Mistral', 'JSON-Schema'],
      status: 'Completed',
    },
    {
      title: 'Real-Time Communication',
      description:
        'Built a production-grade communication backend handling messaging and real-time interactions using gRPC',
      technologies: ['Python', 'gRPC'],
      status: 'Production',
    },
  ];

  return (
    <section className="py-24">
      <div className="container-narrow">
        <SectionHeader
          kicker="Featured Work"
          title="Scalable systems built for production."
          link={{
            href: '/projects',
            label: 'All projects',
          }}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featuredWork.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
