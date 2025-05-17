'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Initialize Supabase client
  const supabase = createClientComponentClient();

  // Fetch friends from Supabase
  const fetchFriends = async () => {
    try {
      setLoading(true);
      const { data: friends, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      
      if (friends) {
        // Transform Supabase data to map to player structure on the leaderboard page
        const formattedPlayers = friends.map(friend => ({
          name: friend.real_name  || 'Anonymous',
          username: friend.display_name || 'NULL',
          score: friend.score || 0,
          avatar: friend.profile_pic_src || '/avatar_1.png' // default avatar
        }));
        
        setPlayers(formattedPlayers);
      }
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError(err.message);
      // Fallback to default players if API fails (??) not sure if we should keep
      // setPlayers([
      //   { name: 'Charlie', score: 420, avatar: '/avatar_1.png' },
      //   { name: 'Pim', score: 23, avatar: '/avatar_2.png' },
      //   { name: 'Alan', score: 69, avatar: '/avatar_3.png' },
      //   { name: 'Glep', score: 49382, avatar: '/avatar_4.png' },
      //   { name: 'Mr. Boss', score: 1023, avatar: '/avatar_5.png' },
      // ]);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchFriends when component mounts
  useEffect(() => {
    fetchFriends();
  }, []);

  // Sort players by descending order from highest to lowest
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading buddies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-4xl shadow-xl p-6 max-w-5xl w-full mx-auto mt-20 mb-10">
        <p className="text-red-500">Error: {error}</p>
        <p>Showing fallback data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-4xl shadow-xl p-6 max-w-5xl w-full mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">
        Current Leaderboard
      </h1>
      <ul className="space-y-2.5">
        {sortedPlayers.map((player, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 rounded-xl shadow-sm border ${
              index === 0
                ? 'bg-yellow-50 border-yellow-300 border-2'
                : index === 1
                ? 'bg-gray-50 border-zinc-400 border-2'
                : index === 2
                ? 'bg-orange-50 border-yellow-700 border-2'
                : 'bg-purple-50 border-green-200'
            }`}
          >

            <div className="flex items-center gap-4.5">
              <Image
                src={player.avatar}
                alt={`${player.name} avatar`}
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-black font-medium">{player.username}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {player.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}