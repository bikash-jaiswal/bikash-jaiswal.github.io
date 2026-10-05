'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiMail, FiCheck, FiAlertCircle, FiLock } from 'react-icons/fi';
import { bookmarkService, isSupabaseConfigured } from '../lib/bookmarks';
import { SupabaseBookmarkService } from '../lib/bookmarks/supabaseService';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setMagicLinkSent(false);
      setErrorMessage('');
    };

    window.addEventListener('bj-open-auth-modal', handleOpen);
    return () => window.removeEventListener('bj-open-auth-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setEmail('');
    setIsSubmitting(false);
    setMagicLinkSent(false);
    setErrorMessage('');
  };

  const handleGitHubLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await bookmarkService.login();
    } catch (err: any) {
      console.error('GitHub login error:', err);
      setErrorMessage(
        err.message?.includes('provider_disabled')
          ? 'GitHub auth is not enabled in your Supabase dashboard yet. Use email magic link below or enable GitHub in Supabase Providers.'
          : err.message || 'Failed to sign in with GitHub.'
      );
      setIsSubmitting(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (isSupabaseConfigured() && bookmarkService instanceof SupabaseBookmarkService) {
        await bookmarkService.signInWithEmail(email.trim());
        setMagicLinkSent(true);
      } else {
        await bookmarkService.login();
        handleClose();
      }
    } catch (err: any) {
      console.error('Email login error:', err);
      setErrorMessage(err.message || 'Failed to send login link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#121214] dark:text-white"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <FiLock size={16} />
                </div>
                <div>
                  <h2 className="text-base font-semibold">Sign In</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {hasSupabase ? 'Connect to your Supabase account' : 'Access your bookmarks'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-white"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 flex items-start gap-2">
                <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {magicLinkSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-500 text-white">
                  <FiCheck size={22} />
                </div>
                <h3 className="text-sm font-semibold">Magic Link Sent!</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Check your inbox at <strong>{email}</strong> and click the link to log in.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-semibold text-black dark:text-white transition-colors disabled:opacity-50"
                >
                  <FiGithub size={16} />
                  <span>Continue with GitHub</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-gray-200 dark:border-white/10 w-full"></div>
                  <span className="bg-white dark:bg-[#121214] px-2 text-[11px] text-gray-400 uppercase tracking-wider font-medium shrink-0">
                    or with email
                  </span>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-3">
                  <div>
                    <label
                      htmlFor="auth-email"
                      className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiMail size={14} />
                      </span>
                      <input
                        id="auth-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-xs focus:border-black focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {isSubmitting ? 'Sending Link...' : 'Send Magic Link'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
