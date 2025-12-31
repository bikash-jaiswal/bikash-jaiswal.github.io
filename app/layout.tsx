import '../styles/globals.css';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const SITE_URL = 'https://www.bikashjaiswal.com';

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

interface RootLayoutProps {
  children: React.ReactNode;
}

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
