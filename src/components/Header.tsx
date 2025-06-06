'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Assuming this is your Supabase client
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
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50"> {/* Updated background to a darker gray, similar to image */} 
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center"> {/* Adjusted padding */} 
        <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors duration-300"> {/* Vetra logo */} 
          Vetra
        </Link>
        <div className="hidden md:flex items-center space-x-5 text-sm"> {/* Navigation Links - hidden on small screens by default */} 
          <Link href="/" className="hover:text-blue-400 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-blue-400 transition-colors duration-300"> {/* Assuming you have an about-us page */} 
            About
          </Link>
          <Link href="#features" className="hover:text-blue-400 transition-colors duration-300"> {/* Placeholder for Features */} 
            Features
          </Link>
          <Link href="#pricing" className="hover:text-blue-400 transition-colors duration-300"> {/* Placeholder for Pricing */} 
            Pricing
          </Link>
          <Link href="#contact" className="hover:text-blue-400 transition-colors duration-300"> {/* Placeholder for Contact */} 
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <Link 
                href="/dashboard" 
                className="text-gray-300 hover:text-white bg-gray-700/50 hover:bg-blue-500/80 px-4 py-2 rounded-md text-xs font-medium transition-colors duration-300 border border-gray-600 hover:border-blue-500"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 font-semibold text-xs shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/signup" 
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Get started
            </Link>
          )}
          {/* Mobile menu button - can be added here if needed */}
        </div>
      </nav>
    </header>
  );
};

export default Header;