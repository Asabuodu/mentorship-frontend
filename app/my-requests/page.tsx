'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Request {
  _id: string;
  mentor?: {
    name?: string;
  };
  status: string;
  createdAt: string;
}

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    api.get('/requests/sent')
      .then((res) => setRequests(res.data))
      .catch(() => alert('Failed to load requests'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Mentorship Requests</h2>
      {requests.length === 0 ? (
        <p>No requests sent yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="border p-4 rounded">
              <p><strong>Mentor:</strong> {req.mentor?.name}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
