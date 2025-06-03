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
    console.log('Supabase signup data:', data);
    console.log('Supabase signup error object:', signUpError);

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
      // User object exists. As per user request, if Supabase returns a user object
      // without an explicit signUpError, we treat it as if the email is already registered.
      console.log('User object present and signUpError is null. Setting "Email already registered" message as requested:', data.user);
      setError('Email already registered. Please log in or reset your password.');
      setMessage(null); // Clear any success message
      // Resetting fields is good practice
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      // Do not set user or redirect if we're showing this as an error for an existing email
    } else if (data.session === null && !data.user) {
      // No user object, and session is null. This strongly suggests email confirmation is required.
      console.log('Signup pending confirmation (no user object, null session):', data);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-navy p-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 glass-panel border border-violet/30 p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl shadow-violet/20 w-full max-w-md">
        <h1 className="header-main text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-violet">
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
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-glow mt-1 block w-full"
              placeholder="your_username"
            />
          </div>
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
                minLength={8} // Enforce a minimum password length
                className="input-glow mt-1 block w-full pr-10"
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
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-glow mt-1 block w-full pr-10"
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
              className="w-full btn-primary py-3 text-base group"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-navy text-slate-400">Or sign up with</span>
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
            Sign Up with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" legacyBehavior>
            <a className="font-medium text-electric-blue hover:text-violet">
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
//   return null; // Or a loading spinner, or a message like "Redirecting..."
// }