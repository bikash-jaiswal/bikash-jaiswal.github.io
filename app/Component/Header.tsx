"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleToggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-white font-bold w-full">
          Bikash Jaiswal
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:justify-center md:space-x-8 w-full">
          <Link href="/projects" className="text-white hover:text-violet-400 transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="text-white hover:text-violet-400 transition-colors">
            Blogs
          </Link>
          {/* <Link href="/courses" className="text-white">
            Courses
          </Link>
          <Link href="/services" className="text-white">
            Services
          </Link> */}
          <Link href="/contacts" className="text-white">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={handleToggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link href="/projects" className="block text-white hover:text-violet-400 transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="block text-white hover:text-violet-400 transition-colors">
            Blogs
          </Link>
          {/* <Link href="/courses" className="block text-white">
            Courses
          </Link>
          <Link href="/services" className="block text-white">
            Services
          </Link> */}
          <Link href="/contacts" className="block text-white">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
