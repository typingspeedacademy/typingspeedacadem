// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // TODO: Implement actual login logic here
    console.log('Login attempt with:', { email, password });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // setError('Login failed. Please check your credentials.'); // Example error
    // On success, redirect or update UI
  };

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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg"
            >
              Sign in
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