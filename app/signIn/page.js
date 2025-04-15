// app/signin/page.js
'use client';
import Navbar from '../../components/Navbar'; // adjust path if needed
import Image from 'next/image';

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo.png"
              alt="Accountabuddy Logo"
              width={64}
              height={64}
              className="mb-3 rounded-md"
            />
            <h1 className="text-2xl font-bold text-center">Sign In</h1>
          </div>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md hover:bg-neutral-800 transition"
            >
              Sign In
            </button>
            
            <h2> 
              Forgot Password?
            </h2>

          </form>
        </div>
      </main>
    </>
  );
}