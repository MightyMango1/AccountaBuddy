import Leaderboard from '../../components/Leaderboard';
import Navbar from '../../components/Navbar';

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4">
        <p className="text-5xl text-black">Strive to be the most <b>accountable</b> buddy out of them all!</p>
        <Leaderboard />
      </main>
    </>
  );
}