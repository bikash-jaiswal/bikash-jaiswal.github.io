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
import PageTransition from '../components/PageTransition';
import { Metadata } from 'next';
import { Inter, Bricolage_Grotesque } from 'next/font/google';

/** Inter font configuration from Google Fonts with Latin subset */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
});

/** Viewport configuration for responsive design */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

/** Base URL for the site, used in metadata and structured data */
const SITE_URL = 'https://www.bikashjaiswal.com';

/** JSON-LD structured data for SEO - comprehensive Person schema */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bikash Jaiswal',
  alternateName: 'Bikash Jaiswal',
  description: 'Software Developer, Investor and Tech Entrepreneur sharing insights on technology, programming, and business',
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  jobTitle: 'Software Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Self-employed'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Canada'
  },
  sameAs: [
    'https://github.com/bikash-jaiswal',
    'https://linkedin.com/in/bikashjaiswal',
    'https://twitter.com/bikash_jaiswal'
  ],
  knowsAbout: [
    'Software Development',
    'Web Development',
    'System Design',
    'Software Architecture',
    'Business Strategy',
    'Technology Investment',
    'Entrepreneurship',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js'
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: {
        '@type': 'City',
        name: 'Canada'
      }
    },
    {
      '@type': 'Occupation',
      name: 'Entrepreneur'
    },
    {
      '@type': 'Occupation',
      name: 'Investor'
    }
  ]
};

/** Default metadata for SEO - can be overridden by individual pages */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bikash Jaiswal | Developer, Investor and Entrepreneur',
    template: '%s | Bikash Jaiswal',
  },
  description: 'Senior AI Engineer sharing insights on agentic systems, distributed architectures, and large language models.',
  keywords: [
    'Bikash Jaiswal',
    'Senior AI Engineer',
    'Agentic Systems',
    'AI Orchestration',
    'Google ADK',
    'Azure AI Foundry',
    'Distributed Systems',
    'Large Language Models',
    'Software Architecture',
    'System Design',
  ],
  authors: [{ name: 'Bikash Jaiswal' }],
  creator: 'Bikash Jaiswal',
  publisher: 'Bikash Jaiswal',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${display.variable} min-h-screen bg-background text-foreground antialiased font-sans selection:bg-muted selection:text-foreground`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col" role="main">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
