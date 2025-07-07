'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      router.push('/dashboard'); // redirect based on role if needed
    } else {
      router.push('/login');
    }
  }, [router, user]);

  return null; // optional loading spinner
}
