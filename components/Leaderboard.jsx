'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Leaderboard() {
  
    //Temporary players to show leaderboard functionality 
    const [players] = useState([
    { name: 'Charlie', score: 420, avatar: '/avatar_1.png' },
    { name: 'Pim', score: 23, avatar: '/avatar_2.png' },
    { name: 'Alan', score: 69, avatar: '/avatar_3.png' },
    { name: 'Glep', score: 49382, avatar: '/avatar_4.png' },
    { name: 'Mr. Boss', score: 1023, avatar: '/avatar_5.png' },
  ]);


  //sort players by descending order from highest to lowest and store it in an array
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-4xl shadow-xl p-6 max-w-5xl w-full mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">
        Current Leaderboard
      </h1>
      <ul className="space-y-2.5">
        
        {sortedPlayers.map((player, index) => (
          <li
            //will need to be changed once data is not static, setting key to index is fine for now
            key={index}
            //player is colored yellow if they're first, otherwise they're green
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
          {/* player avatar and name (left side of leaderboard) */}
            <div className="flex items-center gap-4.5"> 
              <Image
                src={player.avatar}
                alt={`${player.name} avatar`}
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-black font-medium">{player.name}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {player.score} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}