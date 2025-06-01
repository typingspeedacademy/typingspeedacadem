// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client'; // Import Supabase client
import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect } from 'react'; // Import useEffect
import type { User } from '@supabase/supabase-js'; // Import User type

// A simple component for the subtle 3D animated background
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className={`absolute bg-gradient-to-br from-electric-blue/30 to-violet/30 rounded-full filter blur-3xl animate-pulse-slow`}
        style={{
          width: `${Math.random() * 300 + 200}px`,
          height: `${Math.random() * 300 + 200}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 1.5}s`,
          animationDuration: `${Math.random() * 5 + 8}s`,
        }}
      />
    ))}
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [message, setMessage] = useState<string | null>(null); // State for success messages
  const supabase = createClient(); // Initialize Supabase client
  const router = useRouter(); // Initialize useRouter
  const [user, setUser] = useState<User | null>(null); // State for user session

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        router.push('/dashboard'); // Redirect to dashboard if user is already logged in
      }
    };
    getUser();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setMessage(null); // Clear previous messages
    console.log('Login attempt with:', { email, password });

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Supabase login data:', data);
    console.log('Supabase login error object:', signInError);

    if (signInError) {
      console.error('Supabase login error:', signInError);
      setError(signInError.message || 'Failed to login. Please check your credentials.');
      return;
    }

    if (data.user) {
      console.log('Login successful, user:', data.user);
      setUser(data.user); // Set user state
      setMessage('Login successful! Redirecting...');
      // Redirect to dashboard or another page upon successful login
      router.push('/dashboard'); // Example redirect
    } else {
      // This case should ideally not be reached if signInError is null and data.user is null
      // but as a fallback:
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-navy p-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 glass-panel border border-violet/30 p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl shadow-violet/20 w-full max-w-md">
        <h1 className="header-main text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-violet">
          Welcome Back
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-700 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-700 text-green-300 rounded-md text-sm">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-glow mt-1 block w-full"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-glow mt-1 block w-full pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-electric-blue"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-electric-blue focus:ring-violet border-slate-600 rounded bg-slate-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" legacyBehavior>
                <a className="font-medium text-electric-blue hover:text-violet">
                  Forgot password?
                </a>
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full btn-primary py-3 text-base group"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-navy text-slate-400">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            // onClick={() => signIn('google')} // Example for NextAuth.js Google provider
            className="w-full btn-secondary py-3 text-base flex items-center justify-center group"
          >
            <svg className="h-5 w-5 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" legacyBehavior>
            <a className="font-medium text-electric-blue hover:text-violet">
              Sign up
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

// If user is already identified, prevent rendering the login form (optional, as redirect handles it)
// if (user) {
//   return null; // Or a loading spinner, or a message like "Redirecting..."
// }