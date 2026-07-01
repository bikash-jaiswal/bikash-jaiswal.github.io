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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-black dark:text-white placeholder-gray-500 focus:border-black dark:focus:border-gray-500 focus:outline-none transition-colors"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-5 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50"
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
      <div className={`p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-1">Stay in the loop</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Get notified when I publish new articles.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-black dark:text-white placeholder-gray-500 focus:border-black dark:focus:border-gray-500 focus:outline-none transition-colors"
              disabled={status === 'loading' || status === 'success'}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-5 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-8 md:p-12 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 ${className}`}
    >
      <div className="max-w-md mx-auto text-center">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4"
            >
              <h3 className="text-xl font-bold tracking-tight text-black dark:text-white mb-2">Subscribed.</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              <button
                onClick={resetForm}
                className="text-xs font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white underline"
              >
                Use another email
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-3">
                Newsletter
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Insights on systems and engineering, delivered occasionally.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') resetForm();
                  }}
                  placeholder="Email address"
                  className="w-full px-6 py-3 rounded-full bg-white dark:bg-black border border-gray-100 dark:border-white/10 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all"
                  disabled={status === 'loading'}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium transition-all hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>

                {status === 'error' && (
                  <p className="mt-2 text-xs text-red-500">{message}</p>
                )}
                
                <p className="mt-6 text-[10px] text-gray-400 dark:text-gray-500">
                  Unsubscribe at any time.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
