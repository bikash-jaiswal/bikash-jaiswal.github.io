"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiBook, FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';

const SystemDesignStudyPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced' | 'courses'>('beginner');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">System Design Study Plan</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A structured learning path from beginner to advanced, based on the{" "}
            <a 
              href="https://github.com/donnemartin/system-design-primer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              System Design Primer
            </a>
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('beginner')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'beginner' 
                ? 'text-violet-400 border-b-2 border-violet-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setActiveTab('intermediate')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'intermediate' 
                ? 'text-violet-400 border-b-2 border-violet-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'advanced' 
                ? 'text-violet-400 border-b-2 border-violet-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Advanced
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'courses' 
                ? 'text-violet-400 border-b-2 border-violet-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Courses
          </button>
        </div>

        {/* Content for each tab */}
        <div className="mt-8">
          {activeTab === 'beginner' && <BeginnerContent onNavigate={setActiveTab} />}
          {activeTab === 'intermediate' && <IntermediateContent onNavigate={setActiveTab} />}
          {activeTab === 'advanced' && <AdvancedContent onNavigate={setActiveTab} />}
          {activeTab === 'courses' && <CoursesContent onNavigate={setActiveTab} />}
        </div>
      </motion.div>
    </div>
  );
};

// Topic card component with time estimate
interface TopicProps {
  title: string;
  description: string;
  link: string;
  timeEstimate: string;
  completed?: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const TopicCard: React.FC<TopicProps> = ({ 
  title, 
  description, 
  link, 
  timeEstimate,
  completed = false,
  level
}) => {
  const levelColors = {
    beginner: 'from-green-500/20 to-green-500/5 border-green-500/30',
    intermediate: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    advanced: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`border rounded-lg p-6 bg-gradient-to-b ${levelColors[level]} shadow-lg`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {completed && <FiCheckCircle className="text-green-500 flex-shrink-0 mt-1" />}
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-400">
          <FiClock className="mr-2" />
          <span>{timeEstimate}</span>
        </div>
        <a 
          href={link} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:text-violet-300 flex items-center"
        >
          Learn More <FiArrowRight className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

const BeginnerContent: React.FC<{onNavigate: (tab: 'beginner' | 'intermediate' | 'advanced' | 'courses') => void}> = ({ onNavigate }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started with System Design</h2>
        <p className="text-gray-400 mb-6">
          Begin your system design journey with these foundational topics. This section covers the basic concepts
          and terminology you&apos;ll need before tackling more complex design problems.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <TopicCard
          title="System Design Basics"
          description="Introduction to system design concepts, including the scalability video lecture and article."
          link="https://github.com/donnemartin/system-design-primer#system-design-topics-start-here"
          timeEstimate="2-3 hours"
          level="beginner"
        />
        <TopicCard
          title="How To Approach System Design"
          description="Learn a structured approach for tackling system design interview questions."
          link="https://github.com/donnemartin/system-design-primer#how-to-approach-a-system-design-interview-question"
          timeEstimate="1-2 hours"
          level="beginner"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Core Concepts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <TopicCard
          title="Performance vs Scalability"
          description="Understanding the difference between performance and scalability in system design."
          link="https://github.com/donnemartin/system-design-primer#performance-vs-scalability"
          timeEstimate="1 hour"
          level="beginner"
        />
        <TopicCard
          title="Latency vs Throughput"
          description="Learn how latency and throughput affect system performance and design decisions."
          link="https://github.com/donnemartin/system-design-primer#latency-vs-throughput"
          timeEstimate="1 hour"
          level="beginner"
        />
        <TopicCard
          title="CAP Theorem"
          description="Understand the fundamental trade-offs in distributed systems with the CAP theorem."
          link="https://github.com/donnemartin/system-design-primer#availability-vs-consistency"
          timeEstimate="2 hours"
          level="beginner"
        />
        <TopicCard
          title="Domain Name System (DNS)"
          description="Learn how DNS works and its role in system architecture."
          link="https://github.com/donnemartin/system-design-primer#domain-name-system"
          timeEstimate="1 hour"
          level="beginner"
        />
        <TopicCard
          title="Content Delivery Network (CDN)"
          description="Understand how CDNs improve performance and availability of web content."
          link="https://github.com/donnemartin/system-design-primer#content-delivery-network"
          timeEstimate="1-2 hours"
          level="beginner"
        />
        <TopicCard
          title="Load Balancer Basics"
          description="Learn how load balancers distribute traffic and improve system reliability."
          link="https://github.com/donnemartin/system-design-primer#load-balancer"
          timeEstimate="2 hours"
          level="beginner"
        />
      </div>
      
      <div className="flex justify-center mt-8 mb-6">
        <button
          onClick={() => onNavigate('intermediate')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
        >
          Continue to Intermediate <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const IntermediateContent: React.FC<{onNavigate: (tab: 'beginner' | 'intermediate' | 'advanced' | 'courses') => void}> = ({ onNavigate }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Intermediate System Design Topics</h2>
        <p className="text-gray-400 mb-6">
          Now that you understand the basics, dive deeper into more complex system design concepts. 
          These topics build on the foundational knowledge and introduce component-specific optimizations.
        </p>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Database Systems</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <TopicCard
          title="SQL Databases"
          description="Learn about relational databases, their use cases, and optimization strategies."
          link="https://github.com/donnemartin/system-design-primer#relational-database-management-system-rdbms"
          timeEstimate="3-4 hours"
          level="intermediate"
        />
        <TopicCard
          title="NoSQL Databases"
          description="Explore non-relational databases and when to use them in your system design."
          link="https://github.com/donnemartin/system-design-primer#nosql"
          timeEstimate="3-4 hours"
          level="intermediate"
        />
        <TopicCard
          title="SQL vs NoSQL"
          description="Understand the trade-offs between SQL and NoSQL databases for different workloads."
          link="https://github.com/donnemartin/system-design-primer#sql-or-nosql"
          timeEstimate="2 hours"
          level="intermediate"
        />
        <TopicCard
          title="Database Replication"
          description="Learn about master-slave and master-master replication patterns."
          link="https://github.com/donnemartin/system-design-primer#master-slave-replication"
          timeEstimate="2-3 hours"
          level="intermediate"
        />
        <TopicCard
          title="Database Sharding"
          description="Understand how to horizontally partition your database for scalability."
          link="https://github.com/donnemartin/system-design-primer#sharding"
          timeEstimate="2-3 hours"
          level="intermediate"
        />
        <TopicCard
          title="Denormalization"
          description="Learn when and how to use denormalization to improve read performance."
          link="https://github.com/donnemartin/system-design-primer#denormalization"
          timeEstimate="1-2 hours"
          level="intermediate"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Caching & Performance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <TopicCard
          title="Cache Strategies"
          description="Learn different caching approaches and their implementation details."
          link="https://github.com/donnemartin/system-design-primer#cache"
          timeEstimate="3-4 hours"
          level="intermediate"
        />
        <TopicCard
          title="Cache Update Patterns"
          description="Explore different strategies for maintaining cache consistency."
          link="https://github.com/donnemartin/system-design-primer#when-to-update-the-cache"
          timeEstimate="2 hours"
          level="intermediate"
        />
        <TopicCard
          title="Consistency Patterns"
          description="Understand different consistency models in distributed systems."
          link="https://github.com/donnemartin/system-design-primer#consistency-patterns"
          timeEstimate="2-3 hours"
          level="intermediate"
        />
        <TopicCard
          title="Availability Patterns"
          description="Learn about fail-over strategies and replication for high availability."
          link="https://github.com/donnemartin/system-design-primer#availability-patterns"
          timeEstimate="2-3 hours"
          level="intermediate"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Application Architecture</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <TopicCard
          title="Microservices"
          description="Understand the microservices architecture pattern and its trade-offs."
          link="https://github.com/donnemartin/system-design-primer#microservices"
          timeEstimate="3-4 hours"
          level="intermediate"
        />
        <TopicCard
          title="Service Discovery"
          description="Learn how services can discover and communicate with each other."
          link="https://github.com/donnemartin/system-design-primer#service-discovery"
          timeEstimate="1-2 hours"
          level="intermediate"
        />
      </div>
      
      <div className="flex justify-center mt-8 mb-6">
        <button
          onClick={() => onNavigate('advanced')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
        >
          Continue to Advanced <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const AdvancedContent: React.FC<{onNavigate: (tab: 'beginner' | 'intermediate' | 'advanced' | 'courses') => void}> = ({ onNavigate }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Advanced System Design Topics</h2>
        <p className="text-gray-400 mb-6">
          These advanced topics will help you master complex system design scenarios and prepare you 
          for tackling real-world system design problems at scale.
        </p>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Scalability & Communication</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <TopicCard
          title="Asynchronism"
          description="Learn about message queues, task queues, and back pressure for scalable systems."
          link="https://github.com/donnemartin/system-design-primer#asynchronism"
          timeEstimate="3-4 hours"
          level="advanced"
        />
        <TopicCard
          title="Communication Protocols"
          description="Advanced understanding of TCP, UDP, RPC, and REST for system communication."
          link="https://github.com/donnemartin/system-design-primer#communication"
          timeEstimate="4-5 hours"
          level="advanced"
        />
        <TopicCard
          title="System Security"
          description="Learn best practices for securing distributed systems and services."
          link="https://github.com/donnemartin/system-design-primer#security"
          timeEstimate="3-4 hours"
          level="advanced"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Real-world System Design Practice</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <TopicCard
          title="Design URL Shortener"
          description="Learn how to design a URL shortening service like Bit.ly or TinyURL."
          link="https://github.com/donnemartin/system-design-primer#design-pastebin.com"
          timeEstimate="3-4 hours"
          level="advanced"
        />
        <TopicCard
          title="Design Social Media Timeline"
          description="Design a system for managing Twitter/Facebook timelines and search functionality."
          link="https://github.com/donnemartin/system-design-primer#design-the-twitter-timeline-and-search"
          timeEstimate="4-6 hours"
          level="advanced"
        />
        <TopicCard
          title="Design a Web Crawler"
          description="Learn how to design a scalable web crawler like those used by search engines."
          link="https://github.com/donnemartin/system-design-primer#design-a-web-crawler"
          timeEstimate="4-5 hours"
          level="advanced"
        />
        <TopicCard
          title="Design a Key-Value Store"
          description="Build understanding of how distributed key-value stores work and scale."
          link="https://github.com/donnemartin/system-design-primer#design-a-key-value-store"
          timeEstimate="5-6 hours"
          level="advanced"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Scaling to Millions of Users</h3>
      <div className="grid grid-cols-1 gap-6 mb-12">
        <TopicCard
          title="Scaling on AWS"
          description="Learn practical techniques for designing systems that scale to millions of users on AWS."
          link="https://github.com/donnemartin/system-design-primer#design-a-system-that-scales-to-millions-of-users-on-aws"
          timeEstimate="8-10 hours"
          level="advanced"
        />
        <TopicCard
          title="Real-world Architectures"
          description="Study real-world system architectures from tech companies like Instagram, Uber, etc."
          link="https://github.com/donnemartin/system-design-primer#real-world-architectures"
          timeEstimate="6-8 hours"
          level="advanced"
        />
      </div>
      
      <div className="mt-12 p-6 border border-yellow-500/30 bg-gradient-to-b from-yellow-500/10 to-yellow-500/5 rounded-lg">
        <h4 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center">
          <FiStar className="mr-2" /> Advanced Study Strategy
        </h4>
        <p className="text-gray-300">
          At this level, consider setting up mock interviews with peers to practice explaining your system design solutions.
          Try to solve one system design problem per week, write up your solution, and compare with the reference solution.
          Create diagrams using tools like draw.io or Excalidraw to visualize your architectures.
        </p>
      </div>
      
      <div className="flex justify-center mt-8 mb-6">
        <button
          onClick={() => onNavigate('courses')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
        >
          View Courses <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

interface CourseProps {
  title: string;
  provider: string;
  description: string;
  link: string;
  duration: string;
  isPaid: boolean;
}

const CourseCard: React.FC<CourseProps> = ({ 
  title, 
  provider, 
  description, 
  link, 
  duration,
  isPaid 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="border border-violet-500/20 rounded-lg p-6 bg-gradient-to-b from-violet-500/10 to-violet-500/5 shadow-lg"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${isPaid ? 'bg-amber-800/50 text-amber-300' : 'bg-green-800/50 text-green-300'}`}>
          {isPaid ? 'Paid' : 'Free'}
        </span>
      </div>
      <p className="text-violet-200 text-sm mb-3">{provider}</p>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-400">
          <FiClock className="mr-2" />
          <span>{duration}</span>
        </div>
        <a 
          href={link} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:text-violet-300 flex items-center"
        >
          View Course <FiArrowRight className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

const CoursesContent: React.FC<{onNavigate: (tab: 'beginner' | 'intermediate' | 'advanced' | 'courses') => void}> = ({ onNavigate }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Recommended System Design Courses</h2>
        <p className="text-gray-400 mb-6">
          Supplement your learning with these curated courses that cover system design concepts from beginner to advanced levels.
        </p>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Online Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CourseCard
          title="Grokking the System Design Interview"
          provider="Educative.io"
          description="Learn how to design scalable systems and ace system design interviews with practical examples and interactive diagrams."
          link="https://www.educative.io/courses/grokking-the-system-design-interview"
          duration="15-20 hours"
          isPaid={true}
        />
        <CourseCard
          title="System Design Fundamentals"
          provider="ByteByteGo"
          description="Alex Xu's course covering all the fundamentals of large-scale system design with real-world examples."
          link="https://bytebytego.com/"
          duration="10-15 hours"
          isPaid={true}
        />
        <CourseCard
          title="Web Application & Software Architecture 101"
          provider="Educative.io"
          description="Learn about different architectural patterns and when to use them in your system designs."
          link="https://www.educative.io/courses/web-application-software-architecture-101"
          duration="10-12 hours"
          isPaid={true}
        />
        <CourseCard
          title="Distributed Systems Course"
          provider="MIT OpenCourseWare"
          description="Academic course exploring the principles of distributed systems with lectures by Professor Robert Morris."
          link="https://pdos.csail.mit.edu/6.824/"
          duration="40-50 hours"
          isPaid={false}
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Video Series & Tutorials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CourseCard
          title="System Design Interview Series"
          provider="Gaurav Sen (YouTube)"
          description="Popular series of videos covering various system design topics and interview questions with clear explanations."
          link="https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX"
          duration="10+ hours"
          isPaid={false}
        />
        <CourseCard
          title="System Design Interview - ByteByteGo"
          provider="ByteByteGo (YouTube)"
          description="Alex Xu's channel with concise explanations of complex system design concepts and real-world architectures."
          link="https://www.youtube.com/@ByteByteGo"
          duration="10+ hours"
          isPaid={false}
        />
        <CourseCard
          title="System Design for Beginners"
          provider="codeKarle (YouTube)"
          description="Series focused on helping beginners understand system design concepts through practical examples."
          link="https://www.youtube.com/c/codeKarle"
          duration="8+ hours"
          isPaid={false}
        />
        <CourseCard
          title="Scalability & System Design for Developers"
          provider="Hussein Nasser (YouTube)"
          description="Practical system design tutorials from a developer's perspective with code examples."
          link="https://www.youtube.com/c/HusseinNasser-software-engineering"
          duration="20+ hours"
          isPaid={false}
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-4">Books & Reading Materials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CourseCard
          title="Designing Data-Intensive Applications"
          provider="Martin Kleppmann (O'Reilly)"
          description="The definitive guide to building reliable, scalable, and maintainable systems with in-depth analysis of data systems."
          link="https://dataintensive.net/"
          duration="Reading time: 25-30 hours"
          isPaid={true}
        />
        <CourseCard
          title="System Design Interview – An Insider's Guide"
          provider="Alex Xu"
          description="Practical guide with step-by-step frameworks for answering system design questions with real examples."
          link="https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF/"
          duration="Reading time: 15-20 hours"
          isPaid={true}
        />
      </div>
      
      <div className="p-6 border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-blue-500/5 rounded-lg mb-8">
        <h4 className="text-lg font-semibold text-blue-400 mb-2">Study Plan Timeline</h4>
        <p className="text-gray-300 mb-4">
          To complete this entire system design curriculum, expect to invest approximately:
        </p>
        <ul className="list-disc pl-5 text-gray-400 space-y-2">
          <li><span className="text-green-400 font-medium">Beginner level:</span> 1-2 weeks (studying 1-2 hours daily)</li>
          <li><span className="text-blue-400 font-medium">Intermediate level:</span> 3-4 weeks (studying 1-2 hours daily)</li>
          <li><span className="text-purple-400 font-medium">Advanced level:</span> 4-6 weeks (studying 1-2 hours daily)</li>
          <li><span className="text-violet-400 font-medium">Total estimated time:</span> 8-12 weeks to complete entire curriculum</li>
        </ul>
      </div>
      
      <div className="flex justify-center mt-8 mb-6">
        <button
          onClick={() => onNavigate('beginner')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
        >
          Back to Beginner <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SystemDesignStudyPlan;
