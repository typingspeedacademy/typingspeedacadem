// src/app/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Import Supabase client
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect } from 'react'; // Import useEffect
import type { User } from '@supabase/supabase-js'; // Import User type

// A simple component for the subtle 3D animated background (same as login)
// const AnimatedBackground = () => (
//   <div className="absolute inset-0 overflow-hidden z-0">
//     {[...Array(3)].map((_, i) => (
//       <div
//         key={i}
//         className={`absolute bg-gradient-to-br from-electric-blue/30 to-violet/30 rounded-full filter blur-3xl animate-pulse-slow`}
//         style={{
//           width: `${Math.random() * 300 + 200}px`,
//           height: `${Math.random() * 300 + 200}px`,
//           top: `${Math.random() * 100}%`,
//           left: `${Math.random() * 100}%`,
//           animationDelay: `${i * 1.5}s`,
//           animationDuration: `${Math.random() * 5 + 8}s`,
//         }}
//       />
//     ))}
//   </div>
// );

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState(''); // State for username
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // State for user session

  const supabase = createClient(); // Initialize Supabase client
  const router = useRouter(); // Initialize useRouter

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

  const handleSubmit = async (e: React.FormEvent) => { // Make handleSubmit async
    e.preventDefault();
    if (password !== confirmPassword) {
      // Replace alert with a more modern notification system in a real app
      alert("Passwords don't match!");
      return;
    }
    setError(null); // Clear previous errors
    setMessage(null); // Clear previous messages

    // Handle signup logic here
    console.log('Signup attempt with:', { email, password, username });

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username, // Add username to user_metadata
        },
        // You can add emailRedirectTo here if you want to redirect after email confirmation
        // emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    // Log the full response for debugging
    console.log('Supabase signup data:', JSON.stringify(data, null, 2));
    console.log('Supabase signup error object:', JSON.stringify(signUpError, null, 2));

    if (signUpError) {
      console.error('Supabase signup error:', signUpError);
      // Check for specific error messages indicating the user already exists.
      // Supabase might return different messages, so checking for common ones.
      // The toLowerCase() ensures case-insensitive matching.
      const errorMessage = signUpError.message.toLowerCase();
      if (errorMessage.includes('user already registered') || 
          errorMessage.includes('already exists') || 
          errorMessage.includes('email rate limit exceeded') || // This can sometimes mask the 'already registered' error
          (signUpError.status === 400 && errorMessage.includes('unable to validate email address')) || // Another possible Supabase message for existing unconfirmed user
          (signUpError.status === 422 && errorMessage.includes('user already exists')) // More specific check
          ) {
        setError('Email already registered. Please log in or reset your password.');
      } else {
        setError(signUpError.message); // Display other Supabase errors
      }
      return; // Important: Stop further processing if there's an error
    }

    // If signUpError is null, the API call itself was successful.
    // Now, check the 'data' object from Supabase.
    // 'data.user' existing usually means success (or confirmation pending if enabled).
    // 'data.session' being null when 'data.user' is also null might indicate confirmation is required.

    if (data.user) {
      // User object exists and no signUpError. Treat as signup pending confirmation.
      // This reverts to the behavior where this scenario means "check your email".
      console.log('User object present and signUpError is null. Setting "Signup initiated" message. Returned user data:', JSON.stringify(data.user, null, 2));
      console.log('Full Supabase data object when user is present and no signUpError:', JSON.stringify(data, null, 2));
      setMessage('Signup initiated! Please check your email to confirm your account.');
      setError(null); // Clear any potential error
      // Resetting fields is good practice
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      // Do not set user or redirect yet, wait for confirmation.
    } else if (data.session === null && !data.user) {
      // No user object, and session is null. This strongly suggests email confirmation is required.
      console.log('Signup pending confirmation (no user object, null session). Full Supabase data object:', JSON.stringify(data, null, 2));
      setMessage('Signup initiated! Please check your email to confirm your account.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
    } else {
      // Fallback for any other unexpected scenario where signUpError is null, but data is not as expected.
      console.warn('Unexpected Supabase signup response (no error, but data is unusual):', data);
      setError('An unexpected issue occurred during signup. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* <AnimatedBackground /> */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg border border-slate-300 p-8 sm:p-10 md:p-12 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-700 text-center mb-8">
          Create Your Account
        </h1>
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-500/20 text-red-400 border border-red-500/50">
            <p>{error}</p>
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 rounded-md bg-green-500/20 text-green-400 border border-green-500/50">
            <p>{message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="your_username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                minLength={8} // Enforce a minimum password length
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pr-10"
                placeholder="•••••••• (min. 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-electric-blue"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-electric-blue"
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            // onClick={() => signIn('google')} // Example for NextAuth.js Google provider
            className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out group"
          >
            <svg className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign Up with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" legacyBehavior>
            <a className="font-medium text-sky-600 hover:text-sky-500">
              Log in
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

// If user is already identified, prevent rendering the signup form (optional, as redirect handles it)
// if (user) {
// return null; // Or a loading spinner, or a message like "Redirecting..."
// }