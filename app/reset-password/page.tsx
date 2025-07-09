'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword: password,
      });
      setMessage('✅ Password reset successfully');
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setMessage('❌ Reset failed. Invalid or expired token.');
    }
  };

  useEffect(() => {
    if (!token) setMessage('Invalid reset link');
  }, [token]);

  return (
    <div className=" h-screen p-5 absolute inset-0 bg-black/40  z-0">
        <div className=' absolute inset-0 bg-[url(/bg2.jpg)] bg-no-repeat bg-center bg-fit bg-cover'>
        
    <div className="max-w-md mx-auto bg-transparent  my-auto mt-50 p-8 rounded-lg shadow-xl bg-opacity-40 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-white">Reset Your Password</h2>

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 border bg-transparent text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-2 border bg-transparent text-white"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit" className="w-full bg-teal-600 text-white p-2">
          Reset Password
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-white">{message}</p>}
    </div>
        </div>
</div>
  );
  
}

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}