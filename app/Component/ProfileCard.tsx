"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileCard: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-lg"
    >
      {/* Profile Header with gradient background */}
      <div className="relative h-32 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="rounded-full border-4 border-gray-800 overflow-hidden h-24 w-24 flex items-center justify-center bg-gray-700">
            {imageError ? (
              <div className="flex items-center justify-center h-full w-full text-gray-500 bg-gray-800">
                <FaUser size={40} />
              </div>
            ) : (
              <Image 
                src="/images/profile-placeholder.jpg" 
                alt="Bikash Jaiswal"
                width={96}
                height={96}
                className="object-cover h-full w-full"
                priority
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="pt-14 pb-6 px-4 text-center">
        <h3 className="text-xl font-semibold text-white mb-1">Bikash Jaiswal</h3>
        <p className="text-violet-400 text-sm mb-4">Software Developer & Entrepreneur</p>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-6">
          <motion.a 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/bikash-jaiswal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors focus-ring"
            aria-label="GitHub Profile"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/bikash-jaiswal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors focus-ring"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={20} />
          </motion.a>
          <motion.a 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="https://twitter.com/bikash_jaiswal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors focus-ring"
            aria-label="Twitter Profile"
          >
            <FaTwitter size={20} />
          </motion.a>
        </div>
        
        {/* Bio */}
        <p className="text-gray-300 text-sm mb-5 leading-relaxed">
          Building software solutions, sharing knowledge, and exploring new technologies.
        </p>
        
        {/* Location */}
        <div className="text-sm text-gray-400 flex items-center justify-center">
          <span className="inline-flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Based in Canada
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
