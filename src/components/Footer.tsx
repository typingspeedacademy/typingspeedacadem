'use client';

import Link from 'next/link';

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
              <li><Link href="/leaderboard" className="hover:text-blue-300 transition-colors duration-300">Leaderboard</Link></li>
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
                  {/* Email Icon (Optional - requires an icon library like heroicons) */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg> */}
                  typingspeedacademy@hotmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/typingspeedacademy/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300 flex items-center">
                  {/* Instagram Icon (Optional) */}
                  {/* <svg ...> Instagram icon SVG </svg> */}
                  Instagram
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