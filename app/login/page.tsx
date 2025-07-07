'use client';
import { useState } from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { decodeUser } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      Cookies.set('token', token);
      const user = decodeUser(token);
      setUser(user);
      router.push('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Login
        </button>
        <p className="text-sm text-gray-600 text-center">
          Forgot your password? <a href="/reset-password" className="text-blue-600">Reset it</a>
        </p>
        <p className="text-sm text-gray-600 text-center">
          Don&#39;t have an account? <a href="/register" className="text-blue-600">Register</a> 
        </p>
      </form>
    </div>
  );
}
