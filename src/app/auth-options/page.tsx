'use client';

import Link from 'next/link';

const AuthOptionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-sky-800 p-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8 md:p-12 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Join Us</h1>
        <p className="text-sky-200 mb-10 text-lg">
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
            className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3.5 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </Link>
        </div>
        <p className="mt-10 text-sky-300 text-sm">
          Already have an account? <Link href="/login" className="font-semibold hover:text-white underline">Login here</Link>.
        </p>
         <p className="mt-2 text-sky-300 text-sm">
          New here? <Link href="/signup" className="font-semibold hover:text-white underline">Create an account</Link>.
        </p>
      </div>
    </div>
  );
};

export default AuthOptionsPage;