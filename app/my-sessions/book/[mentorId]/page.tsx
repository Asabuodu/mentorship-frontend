'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Mentor, AvailabilityBlock } from '../../../types';



export default function BookSessionPage() {
  const router = useRouter();
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [availability, setAvailability] = useState<AvailabilityBlock[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get(`/users/${mentorId}`);
        setMentor(userRes.data);

        const availRes = await api.get('/availability');
        const blocks = availRes.data.filter((a: AvailabilityBlock) => a.mentor === mentorId);
        setAvailability(blocks);
      } catch {
        alert('Failed to load data');
      }
    };

    fetchData();
  }, [mentorId]);

  const handleDateChange = (dateStr: string) => {
    const date = new Date(dateStr);
    setSelectedDate(dateStr);
    setDayOfWeek(date.toLocaleDateString('en-US', { weekday: 'long' }));
  };

  const filteredTimes = availability.filter((a) => a.dayOfWeek === dayOfWeek);

  const handleBook = async () => {
    const dateTime = `${selectedDate}T${selectedTime}:00`;
    try {
      await api.post('/sessions', { mentorId, dateTime });
      alert('Session booked!');
      router.push('/my-sessions');
    } catch {
      alert('Booking failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book Session with {mentor?.name}</h2>

      <div className="space-y-4">
        <input
          type="date"
          className="border p-2 w-full"
          onChange={(e) => handleDateChange(e.target.value)}
        />

        {filteredTimes.length > 0 && (
          <>
            <select
              className="border p-2 w-full"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">-- Select Time --</option>
              {filteredTimes.map((block) => (
                <option key={block._id} value={block.startTime}>
                  {block.startTime} - {block.endTime}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-600 text-white px-4 py-2"
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
            >
              Book Session
            </button>
          </>
        )}

        {dayOfWeek && filteredTimes.length === 0 && (
          <p>No availability for this day.</p>
        )}
      </div>
    </div>
  );
}
