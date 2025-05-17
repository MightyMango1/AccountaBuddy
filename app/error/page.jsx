import Image from "next/image";
import Navbar from '../../components/Navbar';
import Link from "next/link";

export default function Error() {
    return (
      <>
      <Navbar/>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1rem',
        padding: '2rem'
      }}>
        <Image
          src="/sadRobot.png" 
          alt="Descriptive alt text"
          width={400} 
          height={300} 
          style={{
            borderRadius: '8px', 
            objectFit: 'cover' 
          }}
        />
        <h2 className="text-5xl font-bold">Oops! We ran into a problem..</h2>
        <p>Invalid credentials or user does not exist. Please try signing in again</p>
        <Link 
              href="/signIn" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
      </div>
      </>
    );
  }