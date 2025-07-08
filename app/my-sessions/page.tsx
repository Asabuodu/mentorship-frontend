
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

type Session = {
  _id: string;
  mentor: { name: string };
  dateTime: string;
  feedback?: { rating: number; comment?: string };
};

export default function MySessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api
      .get('/sessions/mentee')
      .then((res) => setSessions(res.data))
      .catch(() => alert('Error fetching sessions'));
  }, []);

  const now = new Date();

  const upcoming = sessions.filter((s) => new Date(s.dateTime) >= now);
  const past = sessions.filter((s) => new Date(s.dateTime) < now);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Sessions</h2>

      {/* UPCOMING */}
      <h3 className="text-xl font-semibold mb-2">Upcoming</h3>
      {upcoming.length === 0 ? (
        <p className="mb-4">No upcoming sessions.</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {upcoming.map((s) => (
            <li key={s._id} className="border p-4 rounded shadow-sm">
              <p><strong>Mentor:</strong> {s.mentor?.name}</p>
              <p><strong>Date:</strong> {new Date(s.dateTime).toLocaleString()}</p>
              <button
                className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded"
                onClick={() => alert('Zoom link placeholder')}
              >
                Join Zoom
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* PAST */}
      <h3 className="text-xl font-semibold mb-2">Past Sessions</h3>
      {past.length === 0 ? (
        <p>No past sessions yet.</p>
      ) : (
        <ul className="space-y-4">
          {past.map((s) => (
            <li key={s._id} className="border p-4 rounded shadow-sm">
              <p><strong>Mentor:</strong> {s.mentor?.name}</p>
              <p><strong>Date:</strong> {new Date(s.dateTime).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{' '}
                {s.feedback ? 'Completed & Rated' : 'Pending Feedback'}
              </p>
              {!s.feedback && (
                <Link
                  href={`/my-sessions/feedback/${s._id}`}
                  className="text-blue-600 underline mt-2 block"
                >
                  Give Feedback
                </Link>
              )}
              {s.feedback && (
                <p className="text-sm text-gray-600 mt-1">
                  ⭐ Rating: {s.feedback.rating}
                  {s.feedback.comment && ` — "${s.feedback.comment}"`}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
