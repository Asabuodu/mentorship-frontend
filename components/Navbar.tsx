// 'use client';

// import Link from 'next/link';
// import { useAuthStore } from '@/lib/store';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// export default function Navbar() {
//   const { user, setUser } = useAuthStore();
//   const router = useRouter();

//   const logout = () => {
//     Cookies.remove('token');
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <nav className="bg-white shadow p-4 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold text-indigo-600">MentorMatch</Link>

//         <div className="space-x-4">
//           {!user && (
//             <>
//               <Link href="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
//               <Link href="/register" className="text-gray-700 hover:text-indigo-600">Register</Link>
//             </>
//           )}

//           {user && (
//             <>
//               <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
//               <Link href="/profile/edit" className="text-gray-700 hover:text-indigo-600">Profile</Link>

//               {user.role === 'mentee' && (
//                 <>
//                   <Link href="/mentors" className="text-gray-700 hover:text-indigo-600">Mentors</Link>
//                   <Link href="/my-sessions" className="text-gray-700 hover:text-indigo-600">Sessions</Link>
//                 </>
//               )}

//               {user.role === 'mentor' && (
//                 <>
//                   <Link href="/requests" className="text-gray-700 hover:text-indigo-600">Requests</Link>
//                   <Link href="/availability" className="text-gray-700 hover:text-indigo-600">Availability</Link>
//                 </>
//               )}

//               {user.role === 'admin' && (
//                 <Link href="/admin/users" className="text-gray-700 hover:text-indigo-600">Admin Panel</Link>
//               )}

//               <button onClick={logout} className="ml-2 text-red-600 hover:underline">Logout</button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const renderLinks = () => (
    <>
      <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
      <Link href="/profile/edit" onClick={() => setMenuOpen(false)}>Profile</Link>

      {user?.role === 'mentee' && (
        <>
          <Link href="/mentors" onClick={() => setMenuOpen(false)}>Mentors</Link>
          <Link href="/my-sessions" onClick={() => setMenuOpen(false)}>Sessions</Link>
        </>
      )}

      {user?.role === 'mentor' && (
        <>
          <Link href="/requests" onClick={() => setMenuOpen(false)}>Requests</Link>
          <Link href="/availability" onClick={() => setMenuOpen(false)}>Availability</Link>
        </>
      )}

      {user?.role === 'admin' && (
        <Link href="/admin/users" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
      )}

      {/* {user?.role === 'admin' && (
        <Link href="/admin/users" className="text-gray-700 hover:text-indigo-600">
            Admin Panel
        </Link>
        )} */}


      <button onClick={logout} className="text-red-600">Logout</button>
    </>
  );

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">MentorMatch</Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : renderLinks()}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-gray-700 px-4">
          {!user ? (
            <>
              <Link href="/login" onClick={toggleMenu}>Login</Link>
              <Link href="/register" onClick={toggleMenu}>Register</Link>
            </>
          ) : renderLinks()}
        </div>
      )}
    </nav>
  );
}
