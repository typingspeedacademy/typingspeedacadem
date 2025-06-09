// src/app/reset-password/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  // This effect will run when the component mounts to check for the access_token
  // Supabase automatically handles the session if the user clicks the link from the email
  // and is redirected here with a #access_token=... in the URL fragment.
  useEffect(() => {
    const handlePasswordRecovery = async () => {
      const hash = window.location.hash;
      if (hash.includes('access_token=')) {
        // Supabase client handles this automatically by setting the session.
        // We just need to verify that a session is active.
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Error getting session during password recovery:', sessionError);
          setError('Failed to verify password reset token. It might be invalid or expired.');
          setIsTokenValid(false);
        } else if (session && session.access_token) {
          setIsTokenValid(true);
          setMessage('You can now set a new password.');
        } else {
          setError('Password reset token not found or invalid. Please request a new reset link if needed.');
          setIsTokenValid(false);
        }
      } else {
         // Check if there's an error from Supabase in URL params (e.g. error_description)
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        if (errorParam) {
            setError(errorDescription || 'An error occurred during password reset.');
            setIsTokenValid(false);
        } else {
            // No token in hash, no error in params, likely direct navigation
            setError('No password reset token provided. Please use the link from your email.');
            setIsTokenValid(false);
        }
      }
      setCheckingToken(false);
    };

    handlePasswordRecovery();
  }, [supabase, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        console.error('Supabase password update error:', updateError);
        setError(updateError.message || 'Failed to update password. Please try again.');
      } else {
        setMessage('Password updated successfully! You can now log in with your new password.');
        // Optionally, redirect to login after a delay
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err: any) {
      console.error('Password update submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900">
        <p className="text-slate-700 dark:text-slate-300 text-lg">Verifying reset token...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Reset Your Password
          </h2>
        </div>

        {isTokenValid ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="new-password" className="sr-only">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {message && !error && (
              <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success: </strong>
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || !isTokenValid}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Updating Password...' : 'Set New Password'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <p className="text-slate-600 dark:text-slate-400">
              If you need to reset your password, please request a new link from the{' '}
              <a href="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300">
                forgot password page
              </a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap with Suspense because useSearchParams() needs it
const ResetPasswordPage = () => (
  <Suspense fallback={<div>Loading page...</div>}>
    <ResetPasswordForm />
  </Suspense>
);

export default ResetPasswordPage;