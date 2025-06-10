'use client';

import Link from 'next/link';
import { EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline'; // Assuming GlobeAltIcon for Instagram, or find a more specific one if available

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12"> {/* Increased padding for more space */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h5 className="font-semibold text-lg mb-3 text-blue-400">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-300 transition-colors duration-300">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-blue-300 transition-colors duration-300">About Us</Link></li>
              {/* Add other relevant quick links if needed */}
              <li><Link href="/typing-test" className="hover:text-blue-300 transition-colors duration-300">Typing Test</Link></li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h5 className="font-semibold text-lg mb-3 text-blue-400">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policies#privacy-policy" className="hover:text-blue-300 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/policies#terms-of-service" className="hover:text-blue-300 transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/policies#cookie-policy" className="hover:text-blue-300 transition-colors duration-300">Cookie Policy</Link></li>
              <li><Link href="/policies#refund-policy" className="hover:text-blue-300 transition-colors duration-300">Refund Policy</Link></li>
              <li><Link href="/policies#acceptable-use-policy" className="hover:text-blue-300 transition-colors duration-300">Acceptable Use Policy</Link></li>
            </ul>
          </div>

          {/* Contact and Social Media */}
          <div>
            <h5 className="font-semibold text-lg mb-3 text-blue-400">Connect With Us</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:typingspeedacademy@hotmail.com" className="hover:text-blue-300 transition-colors duration-300 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  typingspeedacademy@hotmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/typingspeedacademy/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300 flex items-center">
                  {/* Using a generic GlobeAltIcon for Instagram, replace if a specific Instagram icon is available in heroicons */}
                  <GlobeAltIcon className="h-6 w-6" /> {/* Increased icon size slightly */}
                </a>
              </li>
              {/* Add other social media links here */}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 pt-8 border-t border-gray-700">
          &copy; {new Date().getFullYear()} TypingSpeedAcademy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;