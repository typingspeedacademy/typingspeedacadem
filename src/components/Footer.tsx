'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8"> {/* Matches header background */} 
      <nav className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center">
        <div className="flex items-center space-x-6 text-sm">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-blue-400 transition-colors duration-300">
            About
          </Link>
          <Link href="#features" className="hover:text-blue-400 transition-colors duration-300">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-blue-400 transition-colors duration-300">
            Pricing
          </Link>
          <Link href="#contact" className="hover:text-blue-400 transition-colors duration-300">
            Contact
          </Link>
        </div>
        {/* You can add copyright text or other footer elements here */}
        {/* For example: */}
        {/* <p className="text-xs text-gray-500 mt-4 md:mt-0 md:ml-auto">&copy; {new Date().getFullYear()} Vetra. All rights reserved.</p> */}
      </nav>
    </footer>
  );
};

export default Footer;