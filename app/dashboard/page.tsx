'use client';
import { useAuthStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className='h-screen p-5 '>
      <div className="p-8 ">

      <h1 className="text-2xl font-bold mb-2 ">Welcome, {user.role}</h1>
      <p>This is your dashboard.</p>
    </div>
    </div>
  );
}
