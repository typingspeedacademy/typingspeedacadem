'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

const Header = () => {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user session:', error);
        setUser(null);
      } else {
        setUser(data.user);
      }
    };

    getUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="py-4 sticky top-0 z-50 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-sky-100">
      <nav 
        className="container mx-auto flex justify-between items-center bg-white/70 backdrop-blur-lg text-slate-700 shadow-lg rounded-xl p-3 md:p-4"
      > 
        <Link href="/" className="text-3xl font-bold text-sky-600 hover:text-indigo-500 transition-colors duration-300 flex items-center">
          {/* SVG logo removed as per request */}
          TypingSpeedAcademy
        </Link>
        <div className="hidden md:flex flex-grow justify-center items-center space-x-5 text-lg font-medium text-slate-600">
          <Link href="/typing-test" className="hover:text-sky-500 transition-colors duration-300">
            Exercise
          </Link>
          <Link href="/paid-courses" className="hover:text-sky-500 transition-colors duration-300">
            Course
          </Link>
          <Link href="/about-us" className="hover:text-sky-500 transition-colors duration-300">
            About Us
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <Link 
                href="/dashboard" 
                className="text-sky-700 hover:text-white bg-sky-100 hover:bg-sky-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 border border-sky-300 hover:border-sky-500 shadow-sm hover:shadow-md"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-5 py-2.5 rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign Up
            </Link>
          )}
          <div className="md:hidden">
            <button className="text-slate-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu - hidden by default, shown when mobile button is clicked */}
      {/* You would need state to manage the visibility of this mobile menu */}
      {/* <div className="md:hidden bg-slate-800/95 backdrop-blur-md rounded-b-lg mx-4 p-4 space-y-2">
        <Link href="/typing-test" className="block hover:text-cyan-400 transition-colors duration-300">Exercise</Link>
        <Link href="/paid-courses" className="block hover:text-cyan-400 transition-colors duration-300">Course</Link> 
        <Link href="/about-us" className="block hover:text-cyan-400 transition-colors duration-300">About Us</Link>
      </div> */}
    </header>
  );
};

export default Header;