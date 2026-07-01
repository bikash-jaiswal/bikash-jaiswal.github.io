'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FooterLink: React.FC<{ href: string; label: string; isExternal?: boolean }> = ({
  href,
  label,
  isExternal = false,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`group inline-flex items-center gap-1 text-base transition-all duration-200 hover:translate-x-1 ${
          isActive 
            ? 'text-white font-medium' 
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {label}
        {isExternal && <FiArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
      </Link>
    </li>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({
  href,
  icon,
  label,
}) => (
  <motion.a
    whileHover={{ y: -3, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800/50 dark:bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700/50 hover:border-gray-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-black/20"
    aria-label={label}
  >
    {icon}
  </motion.a>
);

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="py-12 mt-20 border-t border-gray-100 dark:border-white/5">
      <div className="container-narrow">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/bikash-jaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-black dark:hover:text-white"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/bikash-jaiswal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-black dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com/bikash_jaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-black dark:hover:text-white"
              aria-label="Twitter"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="mailto:contact@bikashjaiswal.com"
              className="text-gray-400 transition-colors hover:text-black dark:hover:text-white"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm font-medium text-black dark:text-white">
              Bikash Jaiswal
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {currentYear} — Built with simplicity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
