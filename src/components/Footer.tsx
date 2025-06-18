'use client';

import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

// SVG Icon Components
const InstagramIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6">
    <title>Instagram</title>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314 1.65 20.644 1.237 19.854.93c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.074-4.85c.056-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057.36 2.227.413 1.266.057 1.646.07 4.85.07zm0 3.83c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.99 12 5.99zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4c2.21 0 4 1.79 4 4s-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6">
    <title>Facebook</title>
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 17.945 4.388 22.895 10.125 23.85v-8.373H7.078v-3.468h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.468h-2.796v8.373C19.612 22.895 24 17.945 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6">
    <title>Twitter</title>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16"> {/* Increased padding for more space */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h5 className="font-bold text-md mb-4 text-sky-500 uppercase tracking-wider">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-sky-400 transition-colors duration-300">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-sky-400 transition-colors duration-300">About Us</Link></li>
              {/* Add other relevant quick links if needed */}
              <li><Link href="/typing-test" className="hover:text-sky-400 transition-colors duration-300">Typing Test</Link></li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h5 className="font-bold text-md mb-4 text-sky-500 uppercase tracking-wider">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policies#privacy-policy" className="hover:text-sky-400 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/policies#terms-of-service" className="hover:text-sky-400 transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/policies#cookie-policy" className="hover:text-sky-400 transition-colors duration-300">Cookie Policy</Link></li>
              <li><Link href="/policies#refund-policy" className="hover:text-sky-400 transition-colors duration-300">Refund Policy</Link></li>
              <li><Link href="/policies#acceptable-use-policy" className="hover:text-sky-400 transition-colors duration-300">Acceptable Use Policy</Link></li>
            </ul>
          </div>

          {/* Contact and Social Media */}
          <div>
            <h5 className="font-bold text-md mb-4 text-sky-500 uppercase tracking-wider">Connect With Us</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:typingspeedacademy@hotmail.com" className="hover:text-sky-400 transition-colors duration-300 flex items-center group">
                  <EnvelopeIcon className="h-5 w-5 mr-2 group-hover:text-sky-400 transition-colors duration-300" />
                  typingspeedacademy@hotmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/typingspeedacademy/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors duration-300 flex items-center group">
                  <InstagramIcon /> <span className="ml-2 group-hover:text-sky-400 transition-colors duration-300">Instagram</span>
                </a>
              </li>
              {/* Social media links */}
              {/* Add other social media links here */}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-slate-500 pt-10 mt-12 border-t border-slate-700">
          &copy; {new Date().getFullYear()} TypingSpeedAcademy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;