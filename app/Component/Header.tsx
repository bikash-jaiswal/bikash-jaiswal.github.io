"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive }) => {
  return (
    <Link 
      href={href}
      className={`relative px-3 py-2 rounded-md transition-all duration-300 focus-ring ${isActive 
        ? 'text-violet-400 font-medium' 
        : 'text-gray-300 hover:text-white'}`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-400 rounded-full" />
      )}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/system-design", label: "System Design" }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover-lift flex items-center space-x-2"
            aria-label="Bikash Jaiswal home page"
          >
            <span className="text-violet-400">B</span>
            <span>Jaiswal</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map(item => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))}
              />
            ))}
          </div>

          {/* Theme toggle and resources button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/resources" 
              className="btn btn-primary py-2 text-sm"
              aria-label="View Developer Resources"
            >
              Developer Tools
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md focus-ring transition-colors ${isMenuOpen ? 'bg-gray-700' : ''}`}
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <FaTimes className="text-violet-400" /> : <FaBars className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu - with animation */}
        <div 
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-2 space-y-2 bg-gray-800 rounded-lg px-4">
            {navItems.map(item => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`block py-2 px-3 rounded-md ${pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                  ? 'bg-violet-600/20 text-violet-400 font-medium'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-700">
              <Link 
                href="/resources" 
                className="block w-full py-2 px-3 text-center rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Developer Tools
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
