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
    <header className="py-4 sticky top-0 z-50 px-4 md:px-8"> {/* Added padding for spacing from screen edges */}
      <nav 
        className="container mx-auto flex justify-between items-center bg-slate-800/80 backdrop-blur-md text-white shadow-xl rounded-xl p-3 md:p-4"
      > {/* Modern, rounded, semi-transparent background */}
        <Link href="/" className="text-2xl font-bold hover:text-cyan-400 transition-colors duration-300 flex items-center">
          {/* You can replace this with an SVG logo if you have one */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2 text-cyan-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          Taskk {/* Updated Name as per the second image example */}
        </Link>
        <div className="hidden md:flex items-center space-x-5 text-sm font-medium">
          <Link href="/" className="hover:text-cyan-400 transition-colors duration-300">
            Home
          </Link>
          {/* Example of a dropdown menu item - you'll need a dropdown component for this */}
          <div className="relative group">
            <button className="hover:text-cyan-400 transition-colors duration-300 flex items-center">
              Products
              <svg className="w-4 h-4 ml-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </button>
            {/* Dropdown content - hidden by default */}
            <div className="absolute left-0 mt-2 w-48 bg-slate-700/90 backdrop-blur-md rounded-md shadow-lg py-1 hidden group-hover:block z-20">
              <Link href="/products/feature-a" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500 hover:text-white transition-colors duration-200">Feature A</Link>
              <Link href="/products/feature-b" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500 hover:text-white transition-colors duration-200">Feature B</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:text-cyan-400 transition-colors duration-300 flex items-center">
              Resources
              <svg className="w-4 h-4 ml-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-slate-700/90 backdrop-blur-md rounded-md shadow-lg py-1 hidden group-hover:block z-20">
              <Link href="/resources/blog" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500 hover:text-white transition-colors duration-200">Blog</Link>
              <Link href="/resources/docs" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500 hover:text-white transition-colors duration-200">Documentation</Link>
            </div>
          </div>
          <Link href="/pricing" className="hover:text-cyan-400 transition-colors duration-300">
            Pricing
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <Link 
                href="/dashboard" 
                className="text-gray-200 hover:text-white bg-cyan-600/50 hover:bg-cyan-500/80 px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-300 border border-cyan-700 hover:border-cyan-500"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold text-xs shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2.5 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign Up
            </Link>
          )}
          {/* Mobile menu button (hamburger icon) - you would need to implement the toggle logic */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu - hidden by default, shown when mobile button is clicked */}
      {/* You would need state to manage the visibility of this mobile menu */}
      {/* <div className="md:hidden bg-slate-800/95 backdrop-blur-md rounded-b-lg mx-4 p-4 space-y-2">
        <Link href="/" className="block hover:text-cyan-400 transition-colors duration-300">Home</Link>
        <Link href="/products" className="block hover:text-cyan-400 transition-colors duration-300">Products</Link> 
        <Link href="/resources" className="block hover:text-cyan-400 transition-colors duration-300">Resources</Link>
        <Link href="/pricing" className="block hover:text-cyan-400 transition-colors duration-300">Pricing</Link>
      </div> */}
    </header>
  );
};

export default Header;