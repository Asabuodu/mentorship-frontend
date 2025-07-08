'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Session } from '../../../types';

export default function FeedbackPage() {
  const { sessionId } = useParams();
  const router = useRouter();
const [session, setSession] = useState<Session | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');


    useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/sessions/mentee');
        const found = res.data.find((s: Session) => s._id === sessionId);
        if (found) setSession(found);
        else router.push('/my-sessions');
      } catch {
        router.push('/my-sessions');
      }
    };

    load();
  }, [sessionId, router]);


  const submitFeedback = async () => {
    try {
      await api.put(`/sessions/${sessionId}/feedback`, { rating, comment });
      alert('Feedback submitted!');
      router.push('/my-sessions');
    } catch {
      alert('Failed to submit feedback');
    }
  };

  if (!session) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Session Feedback</h2>
      <p><strong>Mentor:</strong> {session.mentor?.name}</p>
      <p><strong>Date:</strong> {new Date(session.dateTime).toLocaleString()}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Rating (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Comment</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          onClick={submitFeedback}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
