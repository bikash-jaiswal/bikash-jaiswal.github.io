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
  description: "Developer, Investor and Entreprenuer"
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col md:flex-row bg-neutral-800">
        <aside className="flex-none w-2/12" aria-label="Left sidebar">
          {/* Sidebar content */}
        </aside>
        <main className="flex-grow" role="main">
          <Navbar />
          {children}
          <Footer />
        </main>
        <aside className="flex-none w-2/12" aria-label="Right sidebar">
          {/* Another sidebar content */}
        </aside>
      </body>
    </html>
  );
}
