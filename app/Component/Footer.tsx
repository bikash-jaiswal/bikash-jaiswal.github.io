import Link from "next/link";
import { FaLinkedin, FaTwitter, FaInstagram, FaMedium, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer>
      <div className="p-4 py-6 lg:py-8">
        <hr className="my-6 dark:border-black-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear}{" "}
            <a href="/" className="hover:underline">
              Bikash Jaiswal
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <div className="flex justify-center space-x-4">
              <Link
                href="https://medium.com/@bikash_jaiswal"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMedium className="text-2xl text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
              <Link
                href="https://github.com/bikash-jaiswal"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/bikashjaiswal/"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
              <Link href="https://twitter.com" passHref target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl text-violet-500 cursor-pointer hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
