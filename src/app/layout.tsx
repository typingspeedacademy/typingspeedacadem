import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the Header component
import Footer from '@/components/Footer'; // Import the Footer component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypingSpeedAcademy - Master Fast Typing", // Updated title
  description: "Learn to type faster with our futuristic and elegant Typing Speed Academy platform.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-dark-navy text-subtle-white flex flex-col min-h-screen`}>
        <Header /> {/* Add the Header component here */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}