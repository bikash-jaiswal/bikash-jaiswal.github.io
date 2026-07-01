'use client';

import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeader from './ui/SectionHeader';
import GitHubProjects from './GitHubProjects';

const CurrentWorkSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container-narrow">
        <SectionHeader
          kicker="Current Work"
          title="Open source & active projects."
          link={{
            href: '/projects',
            label: 'All projects',
          }}
        />

        <div className="mt-16">
          <GitHubProjects />
        </div>
      </div>
    </section>
  );
};

export default CurrentWorkSection;
