
'use client';

import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';

type Slot = {
  _id: string;
  dateTime: string;
  booked: boolean;
};

export default function MentorAvailabilityPage() {
  const params = useParams();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Move fetchSlots outside useEffect
  const fetchSlots = useCallback(async () => {
  const res = await api.get(`/availability/mentor/${params.id}`);
  setSlots(res.data);
}, [params.id]); // ✅ dependency moved here


  useEffect(() => {
  fetchSlots();
}, [fetchSlots]); // ✅ now safe


  const handleBook = async (slotId: string) => {
    setLoading(true);
    try {
      await api.post(`/sessions/book/${slotId}`);
      alert('✅ Session booked!');
      await fetchSlots(); // ✅ Now accessible here
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'error' in err.response.data
      ) {
        alert((err as { response: { data: { error: string } } }).response.data.error);
      } else {
        alert('Booking failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-transparent shadow-xl bg-opacity-40 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-4">Available Slots</h2>

      <ul className="space-y-4">
        {slots.map((slot) => (
          <li key={slot._id} className="border p-4 rounded flex justify-between items-center">
            <span>{new Date(slot.dateTime).toLocaleString()}</span>
            <button
              disabled={slot.booked || loading}
              onClick={() => handleBook(slot._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              {slot.booked ? 'Booked' : 'Book'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
