'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheck, FiArrowRight, FiX } from 'react-icons/fi';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'minimal';
  className?: string;
}

export default function NewsletterSignup({ variant = 'card', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    // Simulate API call - replace with actual newsletter service integration
    // Examples: Mailchimp, ConvertKit, Buttondown, etc.
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just simulate success
      // In production, you would call your newsletter API here
      setStatus('success');
      setMessage('Thanks for subscribing! Check your inbox to confirm.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setMessage('');
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="relative flex-1">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            </span>
          ) : status === 'success' ? (
            <FiCheck size={18} />
          ) : (
            'Subscribe'
          )}
        </motion.button>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`p-6 rounded-2xl bg-gradient-to-r from-violet-600/10 to-blue-600/10 border border-violet-500/20 ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Stay in the loop</h3>
            <p className="text-gray-400 text-sm">Get notified when I publish new articles.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors"
              disabled={status === 'loading' || status === 'success'}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {status === 'success' ? <FiCheck size={18} /> : <FiArrowRight size={18} />}
            </motion.button>
          </form>
        </div>
        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-3 text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default: card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-blue-600/20" />
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative p-8 md:p-10">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <FiCheck size={32} className="text-green-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">You&apos;re subscribed!</h3>
              <p className="text-gray-400 mb-6">{message}</p>
              <button
                onClick={resetForm}
                className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
              >
                Subscribe another email
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-6 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <FiMail size={24} className="text-violet-400" />
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to my newsletter
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get exclusive content, early access to new articles, and insights on software development, 
                system design, and entrepreneurship delivered to your inbox.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') resetForm();
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-all focus:ring-2 focus:ring-violet-500/20"
                    disabled={status === 'loading'}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <FiArrowRight size={18} />
                    </>
                  )}
                </motion.button>

                {/* Error message */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-red-400 text-sm"
                    >
                      <FiX size={16} />
                      <span>{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Privacy note */}
                <p className="text-gray-500 text-xs text-center">
                  No spam, unsubscribe anytime. By subscribing, you agree to our{' '}
                  <a href="/privacy-policy" className="text-violet-400 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </motion.div>
  );
}
