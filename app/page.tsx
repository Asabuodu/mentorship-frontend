// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/lib/store';


// export default function HomePage() {
//   const router = useRouter();
//   const user = useAuthStore((s) => s.user);

//   useEffect(() => {
//     if (user) {
//       router.push('/dashboard'); // redirect based on role if needed
//     } else {
//       router.push('/start');
//     }
//   }, [router, user]);

//   return null; // optional loading spinner
// }


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      router.push('/dashboard'); // redirect if logged in
    } else {
      router.push('/start');     // otherwise go to start
    }
  }, [router, user]);

  return (
    <div className="h-screen p-5">
      <div className="p-8 h-full bg-[url(/bg2.jpg)] bg-no-repeat bg-center bg-cover">
        <p className="text-white text-xl">Redirecting...</p>
      </div>
    </div>
  );
}
