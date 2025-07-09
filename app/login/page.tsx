'use client';
import { useState } from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { decodeUser } from '@/lib/auth';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await api.post('/auth/login', { email, password });
  //     const token = res.data.token;
  //     Cookies.set('token', token);
  //     const user = decodeUser(token);
  //     setUser(user);
  //     router.push('/dashboard');
  //     // router.push('/profile/edit')
  //   } catch {
  //     alert('Login failed');
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data.token;
    Cookies.set('token', token);
    const user = decodeUser(token);
    setUser(user);
    router.push('/dashboard');
  } catch (err: unknown) {
  const axiosErr = err as AxiosError<{ error: string }>;
  const message = axiosErr?.response?.data?.error || 'Login failed';
  alert(message);
}
};


  return (
    <div className=" h-screen p-5 absolute inset-0 bg-black/40  z-0">
      <div className=' absolute inset-0 bg-[url(/bg2.jpg)] bg-no-repeat bg-center bg-fit bg-cover'>
      
      <div className="max-w-md mx-auto bg-transparent  my-auto mt-50 p-8 rounded-lg shadow-xl bg-opacity-40 backdrop-blur-lg">

      <h2 className="text-xl font-semibold mb-4 text-white ">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border bg-transparent outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border bg-transparent outline-none text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-teal-600 text-white p-2">
          Login
        </button>
        <p className="text-sm text-white text-center">
          Forgot your password? <a href="/reset-request" className="text-teal-500 ml-3">Reset it</a>
        </p>
        <p className="text-sm text-white text-center">
          Don&#39;t have an account? <a href="/register" className="text-teal-500 ml-3">Register</a> 
        </p>
      </form>
      </div>
      </div>
    </div>
  );
}
