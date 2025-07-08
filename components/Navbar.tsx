
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
      <Link href="/dashboard" className='text-white hover:text-teal-700' onClick={() => setMenuOpen(false)}>Dashboard</Link>
      <Link href="/profile/edit" className='text-white hover:text-teal-700' onClick={() => setMenuOpen(false)}>Profile</Link>

      {user?.role === 'mentee' && (
        <>
          <Link href="/mentors" className='text-white hover:text-teal-700'  onClick={() => setMenuOpen(false)}>Mentors</Link>
          <Link href="/my-sessions" className='text-white hover:text-teal-700'  onClick={() => setMenuOpen(false)}>Sessions</Link>
        </>
      )}

      {user?.role === 'mentor' && (
        <>
          <Link href="/requests" className='text-white hover:text-teal-700'  onClick={() => setMenuOpen(false)}>Requests</Link>
          <Link href="/availability" className='text-white hover:text-teal-700'  onClick={() => setMenuOpen(false)}>Availability</Link>
        </>
      )}

      {user?.role === 'admin' && (
        <Link href="/admin/users" className='text-white hover:text-teal-700'  onClick={() => setMenuOpen(false)}>Admin Panel</Link>
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
    <nav className="bg-teal-600 shadow-md p-4  top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">MentorMatch</Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          {!user ? (
            <>
            <button className="text-white p-3 hover:text-indigo-300  text-xl">

              <Link href="/login">Login</Link>
            </button>
            <button className="text-white p-3 hover:text-indigo-300 text-xl">

              <Link href="/register">Register</Link>
            </button>
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
