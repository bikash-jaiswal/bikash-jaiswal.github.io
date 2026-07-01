import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiGithub, 
  FiLinkedin, 
  FiMail,
} from 'react-icons/fi';
import SectionHeader from '../../components/ui/SectionHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-4xl font-bold text-black dark:text-white">
              B
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
            Bikash Jaiswal
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Senior AI Engineer building scalable agentic systems for enterprise-grade AI.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-10">
            <FiMapPin size={16} />
            <span>Digital Nomad</span>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/bikash-jaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors link-elegant"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/bikash-jaiswal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors link-elegant"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="mailto:contact@bikashjaiswal.com"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors link-elegant"
            >
              <FiMail size={20} />
            </a>
          </div>
        </motion.section>

        <section className="space-y-24">
          <div>
            <SectionHeader title="My Story" kicker="About Me" />
            <div className="mt-8 prose prose-elegant">
              <p>
                I&apos;m a Senior AI Engineer with a deep curiosity for high-performance agentic systems. 
                My focus is on building scalable solutions that handle real-time data processing and 
                complex service orchestration.
              </p>
              <p>
                I believe in clean architecture, type safety, and the power of modular design. 
                Whether it&apos;s refactoring gRPC services into robust OOP systems or designing low-latency 
                data pipelines, I strive for simplicity and maintainability in every codebase I touch.
              </p>
            </div>
          </div>

          <div>
            <SectionHeader title="Expertise" kicker="Technical Focus" />
            <div className="mt-8 grid gap-12 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-4">AI & Systems</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li><strong>Agentic Design:</strong> Multi-agent orchestration, complex tool-calling, and SSE streaming.</li>
                  <li><strong>LLM Engineering:</strong> Custom model wrappers, token optimization, and output stabilization.</li>
                  <li><strong>Distributed Systems:</strong> gRPC, Kafka, Redis, and high-concurrency architectures.</li>
                  <li><strong>Cloud Systems:</strong> Azure AI Foundry, AWS, and GCP enterprise integrations.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-4">Engineering Depth</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li><strong>Architecture:</strong> Clean Architecture, modular design, and defensive programming.</li>
                  <li><strong>Build Systems:</strong> Multi-module Gradle, Kotlin 2.2+, and build stabilization.</li>
                  <li><strong>Production Reliability:</strong> Error handling, structured logging, and observability.</li>
                  <li><strong>API Design:</strong> High-performance gRPC and event-driven communication.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader title="Experience" kicker="Career" />
            <div className="mt-8 space-y-12">
              <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-gray-100 dark:before:bg-white/5">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-black dark:bg-white" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-black dark:text-white">Senior AI Engineer</h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MWA</p>
                  </div>
                  <time className="text-[10px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">2024 — Present</time>
                </div>
                <div className="prose prose-elegant text-sm">
                  <p>
                    Architecting advanced agentic systems and enterprise-grade AI solutions.
                  </p>
                  <ul>
                    <li>Architected an agentic system using Google ADK and Azure AI Foundry, supporting complex multi-turn tool-calling with a custom SSE token-streaming engine.</li>
                    <li>Developed custom LLM wrappers to adapt standard LangChain4j implementations to enterprise-grade Mistral endpoints, involving deep-level JSON-Schema and protocol stabilization.</li>
                    <li>Designed and implemented high-concurrency orchestrators for multi-agent task execution.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="py-12 border-t border-gray-100 dark:border-white/5 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Interested in working together or just want to chat?
            </p>
            <a
              href="mailto:contact@bikashjaiswal.com"
              className="inline-flex px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
