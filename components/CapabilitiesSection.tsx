'use client';

import React from 'react';
import { FiCpu, FiSmartphone, FiShield, FiHexagon } from 'react-icons/fi';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';
import TechTag from './ui/TechTag';

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  delay?: number;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ icon, title, bullets, delay = 0 }) => (
  <Card delay={delay} className="p-8">
    <div className="flex flex-col gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-black dark:bg-white/5 dark:text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);

const CapabilitiesSection: React.FC = () => {
  const capabilityItems: CapabilityCardProps[] = [
    {
      icon: <FiCpu size={18} />,
      title: 'AI Orchestration & Agentic Design',
      bullets: [
        'Multi-agent systems with complex task loops and tool-calling.',
        'Custom SSE token-streaming and hybrid execution models.',
        'Prompt & tool engineering for ambiguous enterprise environments.',
      ],
    },
    {
      icon: <FiShield size={18} />,
      title: 'LLM Engineering & Integration',
      bullets: [
        'Custom LLM wrappers (Azure/Mistral) for production reliability.',
        'Token optimization and response stabilization strategies.',
        'Observability through translation of AI events to structured logs.',
      ],
    },
    {
      icon: <FiHexagon size={18} />,
      title: 'Architectural Maturity',
      bullets: [
        'Clean Architecture: decoupling orchestrators from implementation.',
        'Defensive design anticipating non-deterministic model failures.',
        'Complex multi-module Gradle/Kotlin ecosystems management.',
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container-narrow">
        <SectionHeader
          kicker="Capabilities"
          title="Scalable agentic systems & deep engineering."
          align="center"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {capabilityItems.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              {...capability}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
