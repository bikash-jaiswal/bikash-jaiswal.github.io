import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiCode, FiBookOpen, FiTrendingUp } from "react-icons/fi";

const ProfessionalHighlight = ({ icon, title, description }) => (
  <div className="p-6 border border-gray-700 rounded-lg bg-gray-800 hover:border-violet-400 transition-all duration-300">
    <div className="text-violet-400 mb-4 text-2xl">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const IntroWithImage = () => {
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Hey, I&apos;m <span className="text-violet-400">Bikash</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Software developer, Entrepreneur, Investor, Author, and Content Creator based in Canada
        </p>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/bikash-jaiswal" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-violet-400 transition-colors">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/bikash-jaiswal" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-violet-400 transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/bikash-jaiswal" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-violet-400 transition-colors">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Professional Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <ProfessionalHighlight 
          icon={<FiCode />} 
          title="Software Development" 
          description="Building robust applications with modern technologies and best practices." 
        />
        <ProfessionalHighlight 
          icon={<FiTrendingUp />} 
          title="Business & Investment" 
          description="Applying strategic thinking to entrepreneurial and investment ventures." 
        />
        <ProfessionalHighlight 
          icon={<FiBookOpen />} 
          title="Content Creation" 
          description="Sharing knowledge and insights through articles, courses, and tutorials." 
        />
      </div>

      {/* CTA Section */}
      <div className="text-center mb-8">
        <p className="text-xl text-gray-300 mb-6">
          Explore my projects and articles to see what I&apos;ve been working on and what I&apos;ve learned along the way.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/projects" className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors">
            View Projects
          </Link>
          <Link href="/blog" className="px-8 py-3 border border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white font-semibold rounded-lg transition-colors">
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroWithImage;
