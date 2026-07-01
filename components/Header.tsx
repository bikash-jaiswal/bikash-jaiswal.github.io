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
      className="relative px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out group link-elegant"
    >
      <span
        className={`relative z-10 transition-colors duration-300 ease-in-out ${
          isActive ? 'text-black dark:text-white' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
        }`}
      >
        {label}
      </span>
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-black dark:bg-white transition-all duration-300 ease-in-out ${
          isActive ? 'w-full' : 'w-0'
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
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/til', label: 'TIL' },
    { href: '/about', label: 'About' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 pt-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-gray-200 bg-white/80 px-6 py-3 backdrop-blur-md transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-black/50 ${
          scrolled ? 'shadow-md border-gray-300/50' : 'shadow-sm'
        }`}
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-black dark:text-white"
          aria-label="Bikash Jaiswal"
        >
          Bikash Jaiswal
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="md:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-4 mx-4 origin-top rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-black md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-4 py-2 text-base font-medium ${
                      pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                        ? 'bg-gray-100 text-black dark:bg-white/10 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
