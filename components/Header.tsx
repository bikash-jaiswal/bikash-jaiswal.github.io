/**
 * Header/Navbar Component
 * 
 * Main navigation component for the site. Features:
 * - Responsive design with mobile hamburger menu
 * - Animated transitions using Framer Motion
 * - Scroll-aware styling (compact on scroll)
 * - Theme toggle integration
 * - Active route highlighting
 * 
 * Used by: app/layout.tsx (rendered on every page)
 */

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

/**
 * Props for individual navigation item component.
 * @property href - The URL path for the navigation link
 * @property label - Display text for the navigation item
 * @property isActive - Whether this item represents the current route
 */
interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

/**
 * Individual navigation item with animated active indicator.
 * Uses Framer Motion's layoutId for smooth indicator transitions between items.
 */
const NavItem: React.FC<NavItemProps> = ({ href, label, isActive }) => {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className="relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out group"
    >
      <span
        className={`relative z-10 transition-colors duration-300 ease-in-out ${
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
        }`}
      >
        {label}
      </span>
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ease-in-out ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
};

/**
 * Main navbar component with responsive design.
 * 
 * Features:
 * - Desktop: Horizontal nav items with animated active indicator
 * - Mobile: Hamburger menu with slide-down animation
 * - Scroll detection: Compact styling when user scrolls down
 * - Theme toggle button
 * - "Today I Learned" call-to-action button
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Navigation items configuration - defines all main site routes */
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Resources' },
    { href: '/reading', label: 'Stuff I am Reading' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50"
    >
      <nav
        className={`mx-4 md:mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-gray-800 bg-dark-900/70 px-4 py-3 backdrop-blur-lg transition-all duration-300 ease-in-out md:px-6 md:py-4 ${
          scrolled ? 'border-gray-700/80 bg-dark-900/80 shadow-lg shadow-black/20' : ''
        }`}
      >
        <div className="flex h-12 w-full items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-all duration-300 ease-in-out"
            aria-label="Bikash Jaiswal home page"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-400 opacity-0 blur transition-opacity duration-300 ease-in-out group-hover:opacity-30" />
              <span className="relative text-2xl font-black text-white">
                Bikash Jaiswal
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                }
              />
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href="/til"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-gray-500/70 px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-gray-700 dark:bg-gray-400/60 dark:hover:bg-gray-300 dark:hover:text-gray-900"
            >
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Today I Learned</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className="relative rounded-xl bg-gray-800/50 p-2 transition-all duration-300 ease-in-out hover:bg-gray-700/60"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={20} className="text-gray-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={20} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ease-in-out ${
                        pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                          ? 'border border-white/20 bg-white/5 text-white'
                          : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="font-medium">{item.label}</span>
                      <FiArrowRight size={16} className="opacity-50" />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-3 mt-3 border-t border-gray-800"
                >
                  <Link
                    href="/til"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-700 px-4 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:bg-gray-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Today I Learned</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
