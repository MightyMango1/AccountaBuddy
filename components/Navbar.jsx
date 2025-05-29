'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '../src/utils/supabase/client';
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

// Check auth state on load and when it changes
  useEffect(() => {
    // Initial check
    const getInitialUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      setUser(user || null); // ✅ Handles both cases
    };

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null); // ✅ Updates on login/logout
      }
    );

    getInitialUser();

    return () => subscription.unsubscribe(); // ✅ Cleanup
  }, []); // Empty dependency array = runs once on mount

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-sm bg-white">
      <div className="flex items-center space-x-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Accountabuddy logo"
            width={40}
            height={40}
            className="rounded-md"
          />
        </Link>
        <span className="text-xl font-bold text-black">Accountabuddy</span>
      </div>
      
      {/* Right side: nav links */}
      <div className="flex items-center space-x-6 text-sm text-black font-medium">
        <a href="/about" className="hover:underline">About</a>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link 
                href="/account" 
                className="px-4 py-2 text-blue-600 hover:underline"
              >
                My Account
              </Link>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut()
                  setUser(null)
                }}
                className="px-4 py-2 text-red-600 hover:underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              href="/signIn" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
