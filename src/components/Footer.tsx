'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaDiscord
} from 'react-icons/fa'; // Using react-icons for social media icons
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const socialLinks = [
  { name: 'GitHub', href: '#', icon: FaGithub },
  { name: 'Twitter', href: '#', icon: FaTwitter },
  { name: 'LinkedIn', href: '#', icon: FaLinkedin },
  { name: 'Discord', href: '#', icon: FaDiscord },
];

const footerLinks = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Newsletter subscription for:', email);
    alert(`Thank you for subscribing, ${email}!`); // Placeholder
    setEmail('');
  };

  return (
    <footer className="bg-dark-navy/70 backdrop-blur-md border-t border-violet/30 text-subtle-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-electric-blue mb-3">TypingSpeedAcademy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Master the art of fast typing with our futuristic platform. Elevate your skills, track progress, and compete globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-violet mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} legacyBehavior>
                    <a className="text-slate-400 hover:text-electric-blue transition-colors duration-300 text-sm">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-violet mb-3">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-3">Get the latest news, tips, and course updates directly to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-glow flex-grow !py-2.5 !rounded-r-none"
              />
              <button
                type="submit"
                className="bg-electric-blue hover:bg-violet text-white px-4 py-2.5 rounded-r-md transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-dark-navy"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TypingSpeedAcademy. All rights reserved.
          </p>
          <div className="flex space-x-5 mt-4 sm:mt-0">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-electric-blue transition-colors duration-300 transform hover:scale-110 hover:glow-accent"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}