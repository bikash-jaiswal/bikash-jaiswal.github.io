'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  FiArrowRight,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiNavigation,
  FiTarget,
  FiZap,
} from 'react-icons/fi';
import Button from './Button';

interface ProfessionalHighlightProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  delay?: number;
}

const ProfessionalHighlight: React.FC<ProfessionalHighlightProps> = ({
  icon,
  eyebrow,
  title,
  description,
  tags,
  delay = 0,
}) => (
  <motion.li
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    className="group relative overflow-hidden rounded-3xl border border-neutral-800/70 bg-neutral-900/60 p-6 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-glow dark:bg-surface-900"
  >
    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-teal/10" />
    </div>
    <div className="relative z-10 flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-400 shadow-inner shadow-primary-500/30">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.li>
);

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  delay?: number;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ icon, title, bullets, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    className="relative overflow-hidden rounded-3xl border border-neutral-800/70 bg-neutral-900/60 p-8 shadow-lg shadow-black/10 transition-transform duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-glow"
  >
    <div className="absolute inset-0 aurora-sheen opacity-20" />
    <div className="relative z-10 flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-300">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-400" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const WhoAmI: React.FC = () => {
  const heroStats = [
    { value: '12+', label: 'Production ML systems deployed' },
    { value: '45ms', label: 'p99 latency achieved for realtime APIs' },
    { value: '100K+', label: 'Daily requests orchestrated' },
  ];

  const heroHighlights: ProfessionalHighlightProps[] = [
    {
      icon: <FiCpu size={22} />,
      eyebrow: 'LLM Delivery',
      title: 'Production AI pipelines with guardrails',
      description:
        'Architecting retrieval-augmented workflows with evaluation playbooks, human feedback loops, and observability baked in.',
      tags: ['RAG', 'LangSmith', 'PromptOps'],
    },
    {
      icon: <FiGlobe size={22} />,
      eyebrow: 'Realtime Platforms',
      title: 'Resilient communication fabrics',
      description:
        'Designing streaming and messaging infrastructure that stays deterministic even under global scale and network partitions.',
      tags: ['gRPC', 'WebRTC', 'Kafka'],
    },
    {
      icon: <FiTarget size={22} />,
      eyebrow: 'Product Strategy',
      title: 'Outcome-driven experimentation',
      description:
        'Aligning research, design, and engineering to ship measurable value—from prototypes to revenue-ready systems.',
      tags: ['Roadmapping', 'Experiment Design', 'Metrics'],
    },
  ];

  const featuredWork = [
    {
      title: 'Realtime Communication Fabric',
      description:
        'Rust-based messaging mesh with adaptive QoS, multi-region replication, and self-healing node orchestration.',
      meta: ['Rust', 'gRPC', 'Redis Streams'],
      status: 'Launched',
      accent: 'from-primary-500/15 to-primary-500/5',
    },
    {
      title: 'LLM-powered Contact Intelligence',
      description:
        'Semantic enrichment platform blending vector search, graph features, and agentic workflows to surface revenue signals.',
      meta: ['Python', 'LangChain', 'Weaviate'],
      status: 'In Progress',
      accent: 'from-accent-teal/15 to-accent-teal/5',
    },
  ];

  // const capabilityItems: CapabilityCardProps[] = [
  //   {
  //     icon: <FiLayers size={20} />,
  //     title: 'Systems Architecture',
  //     bullets: [
  //       'Event-driven and streaming topologies with observability baked in.',
  //       'Global traffic management, failover playbooks, and SLO governance.',
  //       'Security, privacy, and compliance considerations from day zero.',
  //     ],
  //   },
  //   {
  //     icon: <FiZap size={20} />,
  //     title: 'ML Platform & Ops',
  //     bullets: [
  //       'Feature stores, evaluation harnesses, and post-deployment monitoring.',
  //       'Model orchestration with rollbacks, A/B testing, and multi-tenant guardrails.',
  //       'GPU cost optimization and auto-scaling strategies.',
  //     ],
  //   },
  //   {
  //     icon: <FiNavigation size={20} />,
  //     title: 'Product Leadership',
  //     bullets: [
  //       'Translate business bets into roadmaps that engineering can ship.',
  //       'Run design sprints, hypothesis testing, and insight synthesis.',
  //       'Coach teams through experimentation, retros, and learning rituals.',
  //     ],
  //   },
  // ];

  const socialLinks = [
    {
      icon: <FaGithub size={18} />,
      href: 'https://github.com/bikash-jaiswal',
      label: 'GitHub Profile',
    },
    {
      icon: <FaLinkedin size={18} />,
      href: 'https://linkedin.com/in/bikashjaiswal',
      label: 'LinkedIn Profile',
    },
    {
      icon: <FaTwitter size={18} />,
      href: 'https://twitter.com/bikash_jaiswal',
      label: 'Twitter Profile',
    },
  ];

  return (
    <div className="relative isolate overflow-hidden">
      <section className="relative isolate overflow-hidden py-[var(--space-section-y)]">
        <div className="absolute -top-[35%] right-[-20%] h-[32rem] w-[32rem] rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-[45%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent-teal/15 blur-3xl" />
        <div className="container-custom relative z-10 grid items-start gap-[var(--space-3xl)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <span className="heading-kicker">Machine Learning Engineer · Product Builder</span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="mt-6 text-balance font-display text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl"
            >
              Designing purposeful AI systems that balance velocity, resilience, and trust.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300"
            >
              I help teams ship ML-powered platforms and realtime infrastructure—from greenfield strategy to
              production launch—while keeping a relentless focus on measurable outcomes, craft, and system health.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                href="#contact"
                size="lg"
                icon={<FiArrowRight size={18} />}
                iconPosition="right"
              >
                Start a project
              </Button>
              <Button href="/projects" size="lg" variant="secondary">
                Explore work
              </Button>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition-colors duration-300 hover:text-primary-200"
              >
                Read latest insights
                <FiArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-700/60 bg-neutral-900/70 text-gray-300 shadow-soft-lg transition-all duration-300 hover:border-primary-400/50 hover:text-primary-200"
                  aria-label={social.label}
                >
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="mt-12 grid gap-4 sm:grid-cols-3"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5 text-center shadow-inner shadow-black/40"
                >
                  <dt className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 font-display text-2xl font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <ul className="grid gap-6">
            {heroHighlights.map((highlight, index) => (
              <ProfessionalHighlight
                key={highlight.title}
                {...highlight}
                delay={0.2 + index * 0.1}
              />
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="featured-heading"
        className="container-custom py-[var(--space-section-y)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="heading-kicker">Featured Work</span>
            <h2 id="featured-heading" className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Systems that make complex decisions feel effortless.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 transition-colors duration-300 hover:text-primary-100"
          >
            View full portfolio
            <FiArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredWork.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-neutral-800/70 bg-neutral-900/60 p-8 shadow-lg shadow-black/20 transition-transform duration-500 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-glow`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-primary-400" />
                  {project.status}
                </div>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.meta.map((meta) => (
                    <span
                      key={meta}
                      className="rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-200"
                    >
                      {meta}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="capabilities-heading"
        className="border-y border-neutral-800/60 bg-neutral-950/40 py-[var(--space-section-y)]"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-4 text-center"
          >
            <span className="heading-kicker">Technical Capabilities</span>
            <h2 id="capabilities-heading" className="text-3xl font-semibold text-white md:text-4xl">
              Full-stack leadership across data, systems, and product.
            </h2>
          </motion.div>
          {/* <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {capabilityItems.map((capability, index) => (
              <CapabilityCard
                key={capability.title}
                {...capability}
                delay={0.15 + index * 0.1}
              />
            ))}
          </div> */}
        </div>
      </section>

      <section className="container-custom py-[var(--space-section-y)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-neutral-800/70 bg-neutral-900/60 p-12 shadow-lg shadow-black/20"
        >
          <div className="absolute inset-0 aurora-sheen opacity-25" />
          <div className="relative z-10 flex flex-col gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <span className="heading-kicker">Let&apos;s collaborate</span>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Ready to build the next product milestone or platform evolution?
              </h2>
              <p className="mt-4 text-base text-gray-300">
                Whether you&apos;re validating a new AI initiative or scaling an established platform, I partner with teams to
                ship measurable outcomes—fast, safely, and with craft.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 lg:items-end">
              <Button
                href="#contact"
                size="lg"
                icon={<FiArrowRight size={18} />}
                iconPosition="right"
              >
                Start the conversation
              </Button>
              <Link
                href="mailto:contact@bikashjaiswal.com"
                className="text-sm font-semibold text-primary-200 transition-colors duration-300 hover:text-primary-100"
              >
                contact@bikashjaiswal.com
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default WhoAmI;
