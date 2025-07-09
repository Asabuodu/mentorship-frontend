'use client';
import { useState } from 'react';
import api from '@/lib/api';

export default function ResetRequestPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await api.post('/auth/reset-request', { email });
  //     setMessage(res.data.resetLink); // 🧪 For now show link (you can email it later)
  //   } catch {
  //     setMessage('Failed to generate reset link');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await api.post('/auth/reset-request', { email });
    setMessage('✅ Reset link sent to your email');
  } catch {
    setMessage('❌ Failed to generate reset link');
  }
};


  return (
    <div className=" h-screen p-5 absolute inset-0 bg-black/40  z-0">
      <div className=' absolute inset-0 bg-[url(/bg2.jpg)] bg-no-repeat bg-center bg-fit bg-cover'>

    <div className="max-w-md mx-auto  bg-transparent  my-auto mt-50 p-8 rounded-lg shadow-xl bg-opacity-40 backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Request Password Reset</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border bg-transparent text-white"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white p-2">
          Request Reset
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-white break-all">
          {message.startsWith('http') ? (
            <a href={message} className="underline text-blue-400">
              Reset Link (click to continue)
            </a>
          ) : (
            message
          )}
        </p>
      )}
    </div>
      </div>
    </div>
  );
}
