'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Session } from '../../types';




export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api.get('/admin/sessions')
      .then((res) => setSessions(res.data))
      .catch(() => alert('Failed to load sessions'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Sessions</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Mentor</th>
            <th className="p-2 border">Mentee</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s._id}>
              <td className="p-2 border">{s.mentor?.name}</td>
              <td className="p-2 border">{s.mentee?.name}</td>
              <td className="p-2 border">{new Date(s.dateTime).toLocaleString()}</td>
              <td className="p-2 border">{s.feedback?.rating || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
