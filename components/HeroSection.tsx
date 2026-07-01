'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  FiArrowRight,
  FiCpu,
  FiGlobe,
  FiTarget,
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
    className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 shadow-sm transition-all duration-300 hover:border-black/20 dark:hover:border-white/20"
  >
    <div className="relative z-10 flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 text-black dark:text-white">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-black dark:text-white md:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.li>
);

const HeroSection: React.FC = () => {
  const socialLinks = [
    {
      icon: <FaGithub size={20} />,
      href: 'https://github.com/bikash-jaiswal',
      label: 'GitHub',
    },
    {
      icon: <FaLinkedin size={20} />,
      href: 'https://linkedin.com/in/bikashjaiswal',
      label: 'LinkedIn',
    },
    {
      icon: <FaTwitter size={20} />,
      href: 'https://twitter.com/bikash_jaiswal',
      label: 'Twitter',
    },
  ];

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_100%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl px-4"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400"
        >
          Senior AI Engineer
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="mt-8 text-4xl font-bold tracking-tight text-black dark:text-white md:text-6xl lg:text-7xl"
        >
          Building scalable systems for the future.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="mt-8 text-lg text-gray-600 dark:text-gray-400 md:text-xl lg:text-2xl"
        >
          Architecting enterprise-grade agentic systems that go far beyond simple wrappers. 
          Building scalable, multi-agent orchestrations designed for production reliability and complex tool-calling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            View My Work
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-gray-200 px-8 py-3 text-sm font-medium text-black transition-all hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
          >
            Read Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-black dark:hover:text-white"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
