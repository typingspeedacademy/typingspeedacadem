import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the Header component
import Footer from '@/components/Footer'; // Import the Footer component
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypingSpeedAcademy - Master Fast Typing", // Updated title
  description: "Learn to type faster with our futuristic and elegant Typing Speed Academy platform.", // Updated description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-sky-100 text-gray-700 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer /> {/* Add the Footer component here */} 
      </body>
    </html>
  );
}