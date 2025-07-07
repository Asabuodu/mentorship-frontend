'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

type Block = {
  _id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

export default function AvailabilityPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [newBlock, setNewBlock] = useState({
    dayOfWeek: 'Monday',
    startTime: '',
    endTime: '',
  });

  const fetchAvailability = async () => {
    const res = await api.get('/availability');
    setBlocks(res.data);
  };

  const addBlock = async () => {
    try {
      await api.post('/availability', newBlock);
      setNewBlock({ dayOfWeek: 'Monday', startTime: '', endTime: '' });
      fetchAvailability();
    } catch {
      alert('Add failed');
    }
  };

  const deleteBlock = async (id: string) => {
    try {
      await api.delete(`/availability/${id}`);
      fetchAvailability();
    } catch {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Availability</h2>

      <div className="flex gap-2 mb-4">
        <select
          className="border p-2"
          value={newBlock.dayOfWeek}
          onChange={(e) =>
            setNewBlock({ ...newBlock, dayOfWeek: e.target.value })
          }
        >
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input
          type="time"
          className="border p-2"
          value={newBlock.startTime}
          onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
        />
        <input
          type="time"
          className="border p-2"
          value={newBlock.endTime}
          onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
        />
        <button onClick={addBlock} className="bg-blue-600 text-white px-4">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {blocks.map((b) => (
          <li key={b._id} className="border p-3 flex justify-between items-center">
            <span>
              {b.dayOfWeek}: {b.startTime} - {b.endTime}
            </span>
            <button
              className="bg-red-600 text-white px-2 py-1"
              onClick={() => deleteBlock(b._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
