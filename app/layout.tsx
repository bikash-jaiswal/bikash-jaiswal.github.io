import localFont from 'next/font/local';
import "./globals.css";
import Navbar from "./Component/Header";
import Footer from "./Component/Footer";
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
  title: "Bikash Jaiswal",
  description: "Developer, Investor and Entrepreneur"
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
