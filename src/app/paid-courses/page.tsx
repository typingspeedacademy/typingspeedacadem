'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PaidCoursesPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email to your backend/Supabase
    console.log('Email submitted for notification:', email);
    setSubmitted(true);
    // setEmail(''); // Keep email for the thank you message
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-dark-navy text-subtle-white overflow-hidden">
      {/* Enhanced Full Page Background Blur Effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-electric-blue via-violet to-dark-navy opacity-50 filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-30"></div> {/* Dark overlay for better text contrast on box */}

      {/* Content Box - More prominent and clearer */}
      <div className="relative z-10 bg-slate-900 bg-opacity-70 backdrop-blur-lg p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl shadow-electric-blue/30 text-center max-w-2xl w-full border border-violet/50">
        <h1 className="text-4xl sm:text-5xl font-bold text-electric-blue mb-6">
          Premium Courses Coming Soon!
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-4">
          Unlock your full typing potential with our expertly crafted paid courses.
        </p>
        <p className="text-2xl font-semibold text-glow-accent mb-8">
          Get unlimited access for just <span className="text-3xl sm:text-4xl font-bold">$1.99</span>!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-md sm:text-lg text-slate-200">
              Be the first to know when we launch! Enter your email below:
            </p>
            <div>
              <label htmlFor="email-notify" className="sr-only">Email address</label>
              <input
                id="email-notify"
                name="email-notify"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-violet/50 bg-slate-800 placeholder-slate-400 text-subtle-white rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue sm:text-base"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-dark-navy bg-electric-blue hover:bg-violet hover:text-subtle-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-violet transition-all duration-300 transform hover:scale-105"
            >
              Notify Me!
            </button>
          </form>
        ) : (
          <div className="p-6 bg-green-500 bg-opacity-30 rounded-lg border border-green-400">
            <p className="text-xl sm:text-2xl font-semibold text-green-300">
              Thanks! We'll notify you at <span className='font-bold text-subtle-white'>{email}</span> when courses are live.
            </p>
          </div>
        )}

        <div className="mt-12">
          <Link href="/"
            className="text-electric-blue hover:text-violet transition-colors duration-300 text-lg font-medium">
            &larr; Go Back to Homepage
          </Link>
        </div>
      </div>

      {/* Removed style jsx as Tailwind handles animations if defined in tailwind.config.ts */}
    </div>
  );
}