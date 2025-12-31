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
        className={`group inline-flex items-center gap-1 text-sm transition-all duration-200 hover:translate-x-1 ${
          isActive 
            ? 'text-violet-500 font-medium' 
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
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800/50 dark:bg-gray-800/50 text-gray-400 hover:text-white hover:bg-violet-600 border border-gray-700/50 hover:border-violet-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-violet-500/20"
    aria-label={label}
  >
    {icon}
  </motion.a>
);

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative mt-20">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="bg-gray-900/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-800/50">
        <motion.div 
          className="container-custom py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Column */}
            <motion.div className="md:col-span-5" variants={itemVariants}>
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
                  <span className="relative text-3xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Bikash Jaiswal
                  </span>
                </div>
              </Link>
              
              <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
                Software developer, entrepreneur, and investor focused on building innovative
                solutions and sharing knowledge with the community.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://github.com/bikash-jaiswal"
                  icon={<FiGithub size={18} />}
                  label="GitHub Profile"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/bikash-jaiswal/"
                  icon={<FiLinkedin size={18} />}
                  label="LinkedIn Profile"
                />
                <SocialLink
                  href="https://twitter.com/bikash_jaiswal"
                  icon={<FiTwitter size={18} />}
                  label="Twitter Profile"
                />
                <SocialLink
                  href="mailto:contact@bikashjaiswal.com"
                  icon={<FiMail size={18} />}
                  label="Email"
                />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
                Navigate
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/" label="Home" />
                <FooterLink href="/projects" label="Projects" />
                <FooterLink href="/blog" label="Blog" />
                <FooterLink href="/resources" label="Resources" />
                <FooterLink href="/contacts" label="Contact" />
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
                Topics
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/blog" label="Development" />
                <FooterLink href="/blog" label="System Design" />
                <FooterLink href="/blog" label="Investing" />
                <FooterLink href="/blog" label="Entrepreneurship" />
              </ul>
            </motion.div>

            {/* Newsletter / CTA */}
            <motion.div className="md:col-span-3" variants={itemVariants}>
              <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Get notified about new articles and projects.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 group"
              >
                <span>Read the Blog</span>
                <FiArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="mt-16 pt-8 border-t border-gray-800/50"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {currentYear} Bikash Jaiswal. All rights reserved.
              </p>
              
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  Terms
                </Link>
                <span className="text-gray-600">•</span>
                <p className="text-gray-500 text-sm flex items-center gap-1.5">
                  Built with <FiHeart size={14} className="text-violet-400" /> using{' '}
                  <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-violet-400 transition-colors font-medium"
                  >
                    Next.js
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
