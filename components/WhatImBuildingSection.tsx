'use client';

import React from 'react';
import { FiTrendingUp, FiZap, FiDatabase, FiCode } from 'react-icons/fi';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';

interface BuildingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const BuildingItem: React.FC<BuildingItemProps> = ({ icon, title, description, delay = 0 }) => (
  <Card delay={delay}>
    <div className="flex flex-col gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-black dark:bg-white/5 dark:text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </Card>
);

const WhatImBuildingSection: React.FC = () => {
  const buildingItems: BuildingItemProps[] = [
    {
      icon: <FiZap size={18} />,
      title: 'Enterprise AI Systems',
      description: 'Building robust LLM gateways and custom wrappers for enterprise-grade Mistral and Azure endpoints.',
    },
    {
      icon: <FiDatabase size={18} />,
      title: 'Agentic Orchestration',
      description: 'Developing multi-agent systems using Google ADK with complex tool-calling and memory management.',
    },
    {
      icon: <FiTrendingUp size={18} />,
      title: 'SSE Streaming Engines',
      description: 'Optimizing real-time token streaming for smooth UI interactions in high-concurrency environments.',
    },
  ];

  return (
    <section className="py-24">
      <div className="container-narrow">
        <SectionHeader
          kicker="Currently Building"
          title="Focused on scalable agentic systems."
          align="center"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {buildingItems.map((item, index) => (
            <BuildingItem
              key={item.title}
              {...item}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatImBuildingSection;
