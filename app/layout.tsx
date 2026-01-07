/**
 * Root Layout Component
 * 
 * The root layout wraps all pages in the application.
 * Provides consistent structure including:
 * - Global CSS styles
 * - Inter font from Google Fonts
 * - Navigation header
 * - Footer
 * - SEO metadata defaults
 * 
 * This layout is applied to every page in the app directory.
 */

import '../styles/globals.css';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

/** Inter font configuration from Google Fonts with Latin subset */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Viewport configuration for responsive design */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

/** Base URL for the site, used in metadata and structured data */
const SITE_URL = 'https://www.bikashjaiswal.com';

/** JSON-LD structured data for SEO - helps search engines understand the site owner */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bikash Jaiswal',
  url: SITE_URL,
  jobTitle: 'Software Developer',
  sameAs: [
    'https://github.com/bikash-jaiswal',
  ],
};

/** Default metadata for SEO - can be overridden by individual pages */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bikash Jaiswal | Developer, Investor and Entrepreneur',
    template: '%s | Bikash Jaiswal',
  },
  description:
    'Portfolio and blog of Bikash Jaiswal - Software Developer, Investor and Tech Entrepreneur sharing insights on technology, programming, and business',
  keywords: [
    'Bikash Jaiswal',
    'developer',
    'software engineer',
    'portfolio',
    'blog',
    'technology',
    'programming',
    'web development',
    'system design',
    'software architecture',
  ],
  authors: [{ name: 'Bikash Jaiswal' }],
  creator: 'Bikash Jaiswal',
  publisher: 'Bikash Jaiswal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Bikash Jaiswal | Developer, Investor and Entrepreneur',
    description:
      'Portfolio and blog of Bikash Jaiswal - Software Developer, Investor and Tech Entrepreneur',
    siteName: 'Bikash Jaiswal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bikash Jaiswal | Developer, Investor and Entrepreneur',
    description:
      'Portfolio and blog of Bikash Jaiswal - Software Developer, Investor and Tech Entrepreneur',
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

/** Props for the root layout component */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component that wraps all pages.
 * 
 * Called by: Next.js App Router for every page render
 * Purpose: Provides consistent page structure with header, footer, and global styles
 * 
 * @param children - The page content to render within the layout
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-neutral-900 font-sans">
        <main className="flex-grow max-w-7xl mx-auto px-4 w-full" role="main">
          <Navbar />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
