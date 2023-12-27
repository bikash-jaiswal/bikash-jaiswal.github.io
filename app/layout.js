import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bikash Jaiswal",
  description: "Developer, Investor and Entreprenuer ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="flex flex-col md:flex-row bg-neutral-800">
        <side className="flex-none w-2/12">
          {/* Sidebar content */}
        </side>
        <main className="flex-grow ">
          <Navbar />
          {children}
          {/* <Footer /> */}
        </main>
        <side className="flex-none w-2/12">
          {/* Another sidebar content */}
        </side>
      </body>
    </html>
  );
}
