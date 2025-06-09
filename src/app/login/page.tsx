// src/app/login/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'; // Import Supabase client
import { useRouter } from 'next/navigation'; // Import useRouter
import type { User } from '@supabase/supabase-js'; // Import User type

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null); // State for user session

  const supabase = createClient(); // Initialize Supabase client
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Error fetching user session:', sessionError);
        // Potentially handle this error, e.g., by setting an error state
        // For now, we'll allow the page to render for login attempt
      } else if (data.session) {
        setUser(data.session.user);
        router.push('/dashboard'); // Redirect to dashboard if user is already logged in
      } else {
        // No active session, user needs to log in
        setUser(null);
      }
    };
    getUserSession();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Supabase sign-in error:', signInError);
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before logging in.');
        } else {
          setError('Login failed. Please check your credentials or try again later.');
        }
      } else {
        // On successful login, Supabase handles session. Redirect to dashboard.
        // The useEffect hook might also catch this, but an explicit push is good.
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login submission error:', err);
      setError('An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If user is already identified by useEffect and redirecting, optionally show loading or null
  if (user) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading dashboard...</p></div>; 
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl border border-sky-200">
        <div>
          <h2 className="mt-6 text-center text-3xl sm:text-4xl font-semibold text-slate-800">
            Sign in to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">account</span>
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm bg-white/80"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm bg-white/80"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" legacyBehavior>
                <a className="font-medium text-sky-600 hover:text-sky-500">
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-center text-slate-700">
            Don't have an account?{' '}
            <Link href="/signup" legacyBehavior>
              <a className="font-medium text-sky-600 hover:text-sky-500">
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;