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
    <header className="bg-dark-navy text-subtle-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold hover:text-electric-blue transition-colors duration-300">
          TypingSpeedAcademy
        </Link>
        <div className="space-x-4 text-lg flex items-center">
          <Link href="/paid-courses" className="hover:text-electric-blue transition-colors duration-300 px-2 py-1 rounded-md border border-transparent hover:border-electric-blue/50">
            Courses
          </Link>
          <Link href="/typing-test" className="bg-violet text-subtle-white px-3 py-2 rounded-md hover:bg-electric-blue hover:text-dark-navy transition-colors duration-300 font-semibold text-sm">
            Start Typing Test
          </Link>
          {user ? (
            <>
              {user.user_metadata?.username && (
                <span className="text-subtle-white mr-4">
                  Welcome, {user.user_metadata.username}
                </span>
              )}
              <Link href="/dashboard" className="text-subtle-white px-4 py-2 rounded-md hover:bg-electric-blue hover:text-dark-navy transition-colors duration-300 font-semibold border border-electric-blue">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-electric-blue text-dark-navy px-4 py-2 rounded-md hover:bg-violet hover:text-subtle-white transition-colors duration-300 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-subtle-white px-4 py-2 rounded-md hover:bg-electric-blue hover:text-dark-navy transition-colors duration-300 font-semibold border border-electric-blue">
                Login
              </Link>
              <Link href="/signup" className="bg-electric-blue text-dark-navy px-4 py-2 rounded-md hover:bg-violet hover:text-subtle-white transition-colors duration-300 font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;