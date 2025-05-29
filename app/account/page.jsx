'use client'
import { createClient } from '../../src/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: '',
    display_name: '',
    email: ''
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        
        // 1. Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        // 2. Ensure user exists in your users table
        const { error: syncError } = await supabase
          .from('users')
          .upsert({
            user_id: user.id,  
            email: user.email,
            // created_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'  //prevent duplicates
          })
        if (syncError) {
          console.error('Sync error details:', {
            message: syncError.message,
            details: syncError.details,
            hint: syncError.hint,
          });
          throw syncError;
        }

        // 3. Fetch user profile data
        const { data, error } = await supabase
          .from('users')
          .select('display_name, real_name, email, profile_pic_src')
          .eq('user_id', user.id) //choose the current user from the users table
          .single()

        if (error) throw error
        if (data) {
          setUserData({
            name: data.real_name || '',
            display_name: data.display_name || '',
            email: data.email || user.email  // Fallback to auth email
          })
        }
      } catch (error) {
        console.error('Error:', error)
        router.push('/signIn')  // Redirect if not authenticated (?)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      // 1. Get current user ID
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // 2. Update user data
      const { error } = await supabase
        .from('users')
        .update({
          display_name: userData.display_name,
          real_name: userData.real_name,
          // updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (error) throw error
      alert('Profile updated successfully! Welcome to Accountabuddy')
      router.push('/signIn')  // Redirect after updating
      
    } catch (error) {
      alert('Error updating profile: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={userData.real_name}
            onChange={(e) => setUserData({...userData, real_name: e.target.value})}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Display Name</label>
          <input
            type="text"
            value={userData.display_name}
            onChange={(e) => setUserData({...userData, display_name: e.target.value})}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email (read-only)</label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}