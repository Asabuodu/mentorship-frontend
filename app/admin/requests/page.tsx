'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { AdminRequest } from '../../types';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);

  useEffect(() => {
    api.get('/admin/requests')
      .then((res) => setRequests(res.data))
      .catch(() => alert('Failed to load requests'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Mentorship Requests</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Mentor</th>
            <th className="p-2 border">Mentee</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td className="p-2 border">{r.mentor?.name}</td>
              <td className="p-2 border">{r.mentee?.name}</td>
              <td className="p-2 border">{r.status}</td>
              <td className="p-2 border">{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
