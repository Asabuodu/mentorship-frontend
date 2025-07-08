'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Mentor, SentRequest } from '../types';

export default function MentorListPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  // const [requestedMentors, setRequestedMentors] = useState<string[]>([]);
  const [sentRequests, setSentRequests] = useState<Record<string, string>>({});

  const [skillFilter, setSkillFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const fetchMentors = async () => {
    try {
      const res = await api.get('/mentors', {
        params: {
          skill: skillFilter || undefined,
          industry: industryFilter || undefined,
        },
      });
      setMentors(res.data);
    } catch {
      alert('Failed to fetch mentors');
    }
  };



  // const fetchSentRequests = async () => {
  //   try {
  //     const res = await api.get('/requests/sent');
  //     const mentorIds = res.data.map((r: SentRequest) => r.mentor?._id);
  //     setRequestedMentors(mentorIds);
  //   } catch {
  //     console.warn('Could not fetch sent requests');
  //   }
  // };

  const fetchSentRequests = async () => {
  try {
    const res = await api.get('/requests/sent');
    const statusMap: Record<string, string> = {};
    res.data.forEach((r: SentRequest) => {
      if (r.mentor?._id) {
        statusMap[r.mentor._id] = r.status; // 'PENDING' | 'ACCEPTED' | 'REJECTED'
      }
    });
    setSentRequests(statusMap);
  } catch {
    console.warn('Could not fetch sent requests');
  }
};


  useEffect(() => {
    const fetchAll = async () => {
      await fetchMentors();
      await fetchSentRequests();
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type ApiError = {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

  const handleRequest = async (mentorId: string) => {
    try {
      await api.post('/requests', { mentorId });
      alert('Request sent!');
     // setRequestedMentors((prev) => [...prev, mentorId]); // ✅ Prevent duplicate UI
     setSentRequests((prev) => ({ ...prev, [mentorId]: 'PENDING' }));
    } catch (err: unknown) {
      const apiError = err as ApiError;
      if (apiError?.response?.data?.error) {
        alert(apiError.response.data.error);
        if (apiError.response.data.error.includes('already')) {
          // setRequestedMentors((prev) => [...prev, mentorId]);
        }
      } else {
        alert('Request failed');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent">
      <h2 className="text-2xl font-bold mb-4">Find a Mentor</h2>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Filter by skill"
          className="border p-2 flex-1 outline-none text-white"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <input
          placeholder="Filter by industry"
          className="border p-2 flex-1 outline-none text-white"
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
        />
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4" onClick={fetchMentors}>
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{mentor.industry}</p>
            <p>{mentor.bio}</p>
            <p className="text-sm mt-2">
              <strong>Skills:</strong> {mentor.skills?.join(', ')}
            </p>

            {/* {requestedMentors.includes(mentor._id) ? (
              <button
                className="mt-4 bg-gray-400 text-white px-3 py-1 cursor-not-allowed"
                disabled
              >
                Request Sent
              </button> */}
              {sentRequests[mentor._id] === 'ACCEPTED' ? (
  <button className="mt-4 bg-green-600 text-white px-3 py-1 cursor-default" disabled>
    Request Accepted
  </button>
) : sentRequests[mentor._id] === 'PENDING' ? (
  <button className="mt-4 bg-gray-400 text-white px-3 py-1 cursor-not-allowed" disabled>
    Request Sent
  </button>
            ) : (
              // <button
              //   className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1"
              //   onClick={() => handleRequest(mentor._id)}
              // >
              //   Request Mentorship
              // </button>
              <button
    className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1"
    onClick={() => handleRequest(mentor._id)}
  >
    Request Mentorship
  </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
