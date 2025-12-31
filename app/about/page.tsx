'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiUser, 
  FiMapPin, 
  FiCode, 
  FiTrendingUp, 
  FiBookOpen, 
  FiCoffee,
  FiMusic,
  FiGlobe,
  FiHeart,
  FiZap,
  FiTarget,
  FiAward,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowRight
} from 'react-icons/fi';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Skills data
const skills = [
  { name: 'TypeScript', level: 90 },
  { name: 'React/Next.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'Machine Learning', level: 70 },
  { name: 'Cloud (AWS/GCP)', level: 65 },
];

// Interests
const interests = [
  { icon: FiCode, label: 'Software Development', color: 'text-blue-400' },
  { icon: FiTrendingUp, label: 'Investing', color: 'text-green-400' },
  { icon: FiBookOpen, label: 'Reading', color: 'text-yellow-400' },
  { icon: FiCoffee, label: 'Coffee', color: 'text-orange-400' },
  { icon: FiMusic, label: 'Music', color: 'text-pink-400' },
  { icon: FiGlobe, label: 'Travel', color: 'text-cyan-400' },
];

// Fun facts
const funFacts = [
  { emoji: '☕', fact: 'Powered by approximately 3 cups of coffee daily' },
  { emoji: '📚', fact: 'Goal: Read 24 books per year' },
  { emoji: '🌍', fact: 'Dream: Visit every continent' },
  { emoji: '🎯', fact: 'Believer in continuous learning' },
  { emoji: '🌙', fact: 'Night owl who codes best after midnight' },
  { emoji: '🎮', fact: 'Occasional gamer for stress relief' },
];

// Timeline/Journey
const journey = [
  {
    year: '2025',
    title: 'Building in Public',
    description: 'Focusing on open-source projects and sharing knowledge through blogging.',
  },
  {
    year: '2021',
    title: 'Entrepreneurship Journey',
    description: 'Started exploring startup ideas and building side projects.',
  },
  {
    year: '2022',
    title: 'Deep Dive into ML',
    description: 'Expanded skills into machine learning and data science.',
  },
  {
    year: '2020',
    title: 'Full-Stack Development',
    description: 'Mastered modern web technologies and frameworks.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="relative inline-block">
              {/* Avatar placeholder - replace with actual image */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-5xl md:text-6xl font-bold text-white mx-auto shadow-2xl shadow-violet-500/25">
                B
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                <span className="text-lg">👋</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Hey, I&apos;m{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Bikash Jaiswal
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto"
          >
            Developer, Investor & Entrepreneur building things that matter.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 text-gray-500 mb-8"
          >
            <FiMapPin size={16} />
            <span>Based in the Digital World 🌐</span>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <a
              href="https://github.com/bikash-jaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50 hover:border-violet-500/50 transition-all"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/bikash-jaiswal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50 hover:border-violet-500/50 transition-all"
            >
              <FiLinkedin size={20} />
            </a>
            <Link
              href="/contacts"
              className="p-3 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50 hover:border-violet-500/50 transition-all"
            >
              <FiMail size={20} />
            </Link>
          </motion.div>
        </motion.section>

        {/* Story Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <FiUser size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">My Story</h2>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 space-y-4 text-gray-300 leading-relaxed">
              <p>
                I&apos;m a passionate software developer with a deep curiosity for technology and its potential 
                to solve real-world problems. My journey in tech started with a simple &quot;Hello World&quot; program, 
                and since then, I&apos;ve been hooked on the magic of turning ideas into reality through code.
              </p>
              <p>
                Beyond coding, I&apos;m fascinated by the world of investing and entrepreneurship. I believe in 
                building wealth through smart investments and creating value through innovative products. 
                This blog is my way of sharing what I learn along the way.
              </p>
              <p>
                When I&apos;m not coding or reading about markets, you&apos;ll find me exploring new technologies, 
                contributing to open-source projects, or enjoying a good cup of coffee while brainstorming 
                the next big idea.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <FiZap size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Skills & Expertise</h2>
          </div>

          <div className="grid gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interests Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
              <FiHeart size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Interests</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all group"
              >
                <interest.icon className={`${interest.color} mb-3 group-hover:scale-110 transition-transform`} size={24} />
                <span className="text-gray-300">{interest.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Journey Timeline */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
              <FiTarget size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">My Journey</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800" />
            
            <div className="space-y-8">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                    <span className="text-sm text-violet-400 font-medium">{item.year}</span>
                    <h3 className="text-lg font-semibold text-white mt-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Fun Facts */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
              <FiAward size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Fun Facts</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {funFacts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-gray-300">{item.fact}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Let&apos;s Connect!</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              I&apos;m always open to interesting conversations, collaboration opportunities, 
              or just a friendly chat about tech and life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
              >
                <span>Get in Touch</span>
                <FiArrowRight size={18} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-all"
              >
                <FiBookOpen size={18} />
                <span>Read My Blog</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
