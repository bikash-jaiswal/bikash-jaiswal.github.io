'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiCode, FiBookOpen, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

interface ProfessionalHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ProfessionalHighlight: React.FC<ProfessionalHighlightProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="card card-hover relative z-10 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent z-0" />
    <div className="relative z-10">
      <div className="text-violet-400 mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const WhoAmI: React.FC = () => {
  // Staggered animation variants for child elements
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          Hey, I&apos;m{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600">
            Bikash
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Software developer, Entrepreneur, Investor, Author, and Content Creator based in Canada
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex justify-center space-x-6"
        >
          {[
            {
              icon: <FaGithub size={24} />,
              href: 'https://github.com/bikash-jaiswal',
              label: 'GitHub Profile',
            },
            {
              icon: <FaLinkedin size={24} />,
              href: 'https://linkedin.com/in/bikashjaiswal',
              label: 'LinkedIn Profile',
            },
            {
              icon: <FaTwitter size={24} />,
              href: 'https://twitter.com/bikash_jaiswal',
              label: 'Twitter Profile',
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              variants={item}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-gray-400 hover:text-violet-400 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300 focus-ring"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Professional Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <ProfessionalHighlight
          icon={<FiCode />}
          title="Software Development"
          description="Building robust applications with modern technologies and best practices."
          delay={0.2}
        />
        <ProfessionalHighlight
          icon={<FiTrendingUp />}
          title="Business & Investment"
          description="Applying strategic thinking to entrepreneurial and investment ventures."
          delay={0.4}
        />
        <ProfessionalHighlight
          icon={<FiBookOpen />}
          title="Content Creation"
          description="Sharing knowledge and insights through articles, courses, and tutorials."
          delay={0.6}
        />
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mb-8"
      >
        <p className="text-xl text-gray-300 mb-8">
          Explore my projects and articles to see what I&apos;ve been working on and what I&apos;ve
          learned along the way.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/projects" className="btn btn-primary">
            <span>View Projects</span>
            <FiArrowRight className="ml-2" />
          </Link>
          <Link href="/blog" className="btn btn-secondary">
            <span>Read Blog</span>
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default WhoAmI;
