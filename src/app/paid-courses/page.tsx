'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function PaidCoursesPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase
        .from('course_notifications')
        .insert([{ email }])
        .select();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation code
          setError('This email is already registered for notifications.');
        } else {
          setError(`Failed to subscribe: ${error.message}`);
        }
      } else {
        setSuccess('Thanks! We\'ll notify you when courses are live.');
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Enhanced Full Page Background Blur Effect - REMOVED */}
      {/* <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-electric-blue via-violet to-dark-navy opacity-50 filter blur-3xl animate-pulse-slow"></div> */}
      {/* <div className="absolute inset-0 w-full h-full bg-black opacity-30"></div> */}

      {/* Content Box - Updated to gentle theme */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg p-8 sm:p-12 md:p-16 rounded-2xl shadow-xl text-center max-w-2xl w-full border border-slate-300">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6">
          Premium Courses Coming Soon!
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 mb-4">
          Unlock your full typing potential with our expertly crafted paid courses.
        </p>
        <p className="text-2xl font-semibold text-sky-600 mb-8">
          Get unlimited access for just <span className="text-3xl sm:text-4xl font-bold">$1.99</span>!
        </p>

        {!submitted && !success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-md sm:text-lg text-slate-600">
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
                className="w-full px-5 py-3 border border-slate-300 bg-white placeholder-slate-400 text-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-base"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Notify Me!'}
            </button>
          </form>
        ) : null}

        {success && (
          <div className="p-6 bg-green-100 rounded-lg border border-green-300">
            <p className="text-xl sm:text-2xl font-semibold text-green-700">
              {success} <span className='font-bold text-slate-800'>{email}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-100 rounded-lg border border-red-300">
            <p className="text-xl sm:text-2xl font-semibold text-red-700">
              {error}
            </p>
          </div>
        )}

        {submitted && !error && !success && (
          <div className="p-6 bg-green-100 rounded-lg border border-green-300">
            <p className="text-xl sm:text-2xl font-semibold text-green-700">
              Thanks! We'll notify you at <span className='font-bold text-slate-800'>{email}</span> when courses are live.
            </p>
          </div>
        )}

        <div className="mt-12">
          <Link href="/"
            className="text-sky-600 hover:text-sky-700 transition-colors duration-300 text-lg font-medium">
            &larr; Go Back to Homepage
          </Link>
        </div>
      </div>

      {/* Removed style jsx as Tailwind handles animations if defined in tailwind.config.ts */}
    </div>
  );
}