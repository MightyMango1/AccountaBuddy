'use client';

import Navbar from '../../components/Navbar';
import ChecklistView from '../../src/views/ChecklistView';
import FriendView from '../../src/views/FriendView';

export default function FriendlistPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col items-center gap-12">
          <FriendView />
          <ChecklistView />
        </div>
      </main>
    </>
  );
}