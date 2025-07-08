'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password, role });
      alert('Registration successful! You can now login.');
      router.push('/login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className=' absolute inset-0 bg-[url(/bg2.jpg)] bg-no-repeat bg-center bg-fit bg-cover'>
        <div className="max-w-md mx-auto bg-transparent  my-auto mt-50 p-8 rounded-lg shadow-xl bg-opacity-40 backdrop-blur-lg">

      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border bg-transparent outline-none text-white"
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
          <option value="mentor">Admin</option>
        </select>
        <button type="submit" className="w-full bg-teal-600 text-white p-2">
          Register
        </button>
        <p className="text-sm text-center text-white">
          Already have an account? <a href="/login" className="text-teal-500 ml-3">Login</a>
        </p>
      </form>
        </div>
      </div>
    </div>
  );
}
