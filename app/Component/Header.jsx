"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between ">
        <div className="hidden md:flex space-x-4">
          {/* Hide on screens smaller than md */}
          <Link href="/" className="text-white font-bold">
            Bikash Jaiswal
          </Link>
          <Link href="/courses" className="text-white">
            Courses
          </Link>
          <Link href="/work" className="text-white">
            Work with me
          </Link>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
        </div>
        <button className=" hidden md:flex text-white border-solid border-2 border-white hover:bg-violet-600 px-4">
          Sign In
        </button>
        <div className="md:hidden">
          {/* Show on screens smaller than md */}
          {isMenuOpen ? (
            <div>
              <FaTimes
                className="text-white text-2xl cursor-pointer"
                onClick={handleToggleMenu}
              />
            </div>
          ) : (
            <div className="flex">
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={handleToggleMenu}
          />
          {/* Add sign-in button here */}
          {/* <button className="text-white">Sign In</button> */}
        </div>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="bg-white p-4 rounded shadow-md">
          <Link href="/" className="block py-2 text-gray-800">
            Home
          </Link>
          <Link href="/courses" className="block py-2 text-gray-800">
            Courses
          </Link>
          <Link href="/work" className="block py-2 text-gray-800">
            Work with me
          </Link>
          <Link href="/contact" className="block py-2 text-gray-800">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
