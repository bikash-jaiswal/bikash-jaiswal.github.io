"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaTwitter, FaMedium, FaGithub, FaRss } from "react-icons/fa";
import { motion } from "framer-motion";

const FooterLink: React.FC<{ href: string; label: string; isExternal?: boolean }> = ({ 
  href, 
  label, 
  isExternal = false 
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`text-sm transition-colors hover:text-violet-400 focus-ring ${isActive ? 'text-violet-400' : 'text-gray-400'}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {label}
      </Link>
    </li>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ 
  href, 
  icon,
  label 
}) => (
  <motion.a
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-violet-400 transition-colors p-2"
    aria-label={label}
  >
    {icon}
  </motion.a>
);

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First column - About */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white mr-2">B</span>
              <span className="text-xl font-semibold text-gray-200">Jaiswal</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm max-w-md">
              Software developer, entrepreneur, and investor focused on building innovative solutions 
              and sharing knowledge with the community.
            </p>
            <div className="flex space-x-2">
              <SocialLink 
                href="https://github.com/bikash-jaiswal" 
                icon={<FaGithub size={18} />}
                label="GitHub Profile"
              />
              <SocialLink 
                href="https://www.linkedin.com/in/bikashjaiswal/" 
                icon={<FaLinkedin size={18} />}
                label="LinkedIn Profile"
              />
              <SocialLink 
                href="https://twitter.com" 
                icon={<FaTwitter size={18} />}
                label="Twitter Profile"
              />
              <SocialLink 
                href="https://medium.com/@bikash_jaiswal" 
                icon={<FaMedium size={18} />}
                label="Medium Blog"
              />
              <SocialLink 
                href="/rss.xml" 
                icon={<FaRss size={16} />}
                label="RSS Feed"
              />
            </div>
          </div>

          {/* Second column - Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/projects" label="Projects" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/contacts" label="Contact" />
            </ul>
          </div>

          {/* Third column - Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/blog/tag/development" label="Development" />
              <FooterLink href="/blog/tag/investing" label="Investing" />
              <FooterLink href="/blog/tag/entrepreneurship" label="Entrepreneurship" />
              <FooterLink href="/privacy-policy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Use" />
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Bikash Jaiswal. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm text-center">
            Built with <span className="text-violet-400">♥</span> using{" "}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-violet-400 focus-ring"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
