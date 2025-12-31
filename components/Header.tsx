'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive }) => {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 group"
    >
      <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-violet-400' : 'text-gray-400 group-hover:text-white'
      }`}>
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 bg-violet-500/10 rounded-lg border border-violet-500/20"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
  );
};

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

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Resources' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2' 
          : 'py-4'
      }`}
    >
      <nav className={`mx-4 md:mx-auto max-w-6xl transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/20 px-6' 
          : 'bg-transparent px-4'
      }`}>
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="Bikash Jaiswal home page"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
              <span className="relative text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                B
              </span>
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
              Jaiswal
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-gray-800/30 rounded-xl p-1">
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

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/resources"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              <span>Get Started</span>
              <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" size={16} />
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              className="relative p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
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
                    <FiX size={20} className="text-violet-400" />
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
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                        pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                          ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
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
                    href="/resources"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-medium rounded-xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>Get Started</span>
                    <FiArrowRight size={16} />
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
