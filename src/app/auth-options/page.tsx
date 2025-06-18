'use client';

import Link from 'next/link';

const AuthOptionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 p-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8 md:p-12 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-slate-700 mb-8">Get Started</h1>
        <p className="text-slate-600 mb-10 text-lg">
          Choose how you'd like to proceed:
        </p>
        <div className="space-y-6">
          <Link
            href="/signup"
            className="block w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3.5 rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="block w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3.5 rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </Link>
        </div>
        <p className="mt-10 text-slate-600 text-sm">
          Already have an account? <Link href="/login" className="font-semibold text-sky-600 hover:text-sky-700 underline">Login here</Link>.
        </p>
         <p className="mt-2 text-slate-600 text-sm">
          New here? <Link href="/signup" className="font-semibold text-sky-600 hover:text-sky-700 underline">Create an account</Link>.
        </p>
      </div>
    </div>
  );
};

export default AuthOptionsPage;