// app/signup/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { signUp } from '../../lib/authService'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('') //will hold email username and password
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true) //just shows spinny thing
    try {
      await signUp({ email, username, password })
      router.push('/welcome')
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
          {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
               <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-2 rounded-md hover:bg-neutral-800 transition disabled:opacity-50"
            >
              {loading ? 'Creating…' : 'Sign Up'}
            </button>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/signIn"  legacyBehavior>
              <a className="text-blue-600 hover:underline">Sign In</a>
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  )
}