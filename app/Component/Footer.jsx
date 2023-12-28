import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      <div className=" p-4 py-6 lg:py-8">
        <hr className="my-6 dark:border-black-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear}{" "}
            <a href="/" className="hover:underline">
              Datenium
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <div className="flex justify-center space-x-4">
              <Link href="https://www.facebook.com" passHref>
                <FaFacebook className="text-2xl text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
              <Link href="https://www.linkedin.com" passHref>
                <FaLinkedin className="text-2xl text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
              <Link href="https://twitter.com" passHref>
                <FaTwitter className="text-2xl  text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
              <Link href="https://www.instagram.com" passHref>
                <FaInstagram className="text-2xl  text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;