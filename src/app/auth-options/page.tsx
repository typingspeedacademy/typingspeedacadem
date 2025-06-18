'use client';

import Link from 'next/link';

const AuthOptionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 p-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8 md:p-12 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Get Started</h1>
        <p className="text-sky-200 mb-10 text-lg">
          Choose how you'd like to proceed:
        </p>
        <div className="space-y-6">
          <Link
            href="/signup"
            className="block w-full bg-gradient-to-r from-electric-blue to-violet text-dark-navy px-6 py-3.5 rounded-lg hover:from-glow-accent hover:to-electric-blue transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="block w-full bg-gradient-to-r from-violet to-electric-blue text-dark-navy px-6 py-3.5 rounded-lg hover:from-electric-blue hover:to-glow-accent transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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