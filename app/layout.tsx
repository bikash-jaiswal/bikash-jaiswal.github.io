import localFont from 'next/font/local';
import "../styles/globals.css";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { Metadata } from "next";

// Use system fonts instead of Google Fonts due to SSL issues
const inter = localFont({
  src: '../public/fonts/inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
});

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bikash-jaiswal.github.io'),
  title: {
    default: "Bikash Jaiswal | Developer, Investor and Entrepreneur",
    template: "%s | Bikash Jaiswal"
  },
  description: "Portfolio and blog of Bikash Jaiswal - Software Developer, Investor and Tech Entrepreneur sharing insights on technology, programming, and business",
  keywords: ["Bikash Jaiswal", "developer", "software engineer", "portfolio", "blog", "technology", "programming", "web development"],
  authors: [{ name: "Bikash Jaiswal" }],
  creator: "Bikash Jaiswal",
  publisher: "Bikash Jaiswal",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bikash-jaiswal.github.io",
    title: "Bikash Jaiswal | Developer, Investor and Entrepreneur",
    description: "Portfolio and blog of Bikash Jaiswal - Software Developer, Investor and Tech Entrepreneur",
    siteName: "Bikash Jaiswal"
  },
  twitter: {
    card: "summary_large_image",
    title: "Bikash Jaiswal | Developer, Investor and Entrepreneur",
    description: "Portfolio and blog of Bikash Jaiswal - Software Developer, Investor and Tech Entrepreneur",
    creator: "@bikash_jaiswal"  // Replace with your actual Twitter handle
  },
  alternates: {
    canonical: "/"
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-neutral-900">
        {/* Full-width main content area */}
        <main className="flex-grow max-w-7xl mx-auto px-4 w-full" role="main">
          <Navbar />
          <div className="transition-all duration-300 ease-in-out">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
