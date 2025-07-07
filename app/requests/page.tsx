// 'use client';

// import { useEffect, useState } from 'react';
// import api from '@/lib/api';
// import { Request } from '../types';



// export default function MentorRequestsPage() {
//   const [requests, setRequests] = useState<Request[]>([]);

//   const fetchRequests = async () => {
//     try {
//       const res = await api.get('/requests/received');
//       setRequests(res.data);
//     } catch {
//       alert('Failed to fetch requests');
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

 

//   const handleAction = async (id: string, action: 'ACCEPTED' | 'REJECTED') => {
//   console.log(`🚀 Attempting to ${action} request ${id}`);
//   try {
//     await api.put(`/requests/${id}`, { status: action });
//     console.log('✅ Request updated!');
//     fetchRequests();
//   } catch (err: unknown) {
//     if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response) {
//       console.error('❌ Failed to update status:', err.response.data);
//     } else if (err instanceof Error) {
//       console.error('❌ Failed to update status:', err.message);
//     } else {
//       console.error('❌ Failed to update status:', err);
//     }
//     alert('Failed to update status');
//   }
// };


//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Incoming Mentorship Requests</h2>
//       {requests.length === 0 ? (
//         <p>No requests yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {requests.map((req) => (
//             <li key={req._id} className="border p-4 rounded">
//               <p><strong>Mentee:</strong> {req.mentee?.name}</p>
//               <p><strong>Goals:</strong> {req.mentee?.goals}</p>
//               <p className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</p>
//               <div className="mt-2 space-x-2">
//                 <button
//                   onClick={() => handleAction(req._id, 'ACCEPTED')}
//                   className="bg-green-600 text-white px-3 py-1"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleAction(req._id, 'REJECTED')}
//                   className="bg-red-600 text-white px-3 py-1"
//                 >
//                   Reject
//                 </button>
//                 {/* <button
//                   onClick={() => alert('Zoom link placeholder')}
//                   className="bg-blue-600 text-white px-3 py-1"
//                 >
//                   Join Zoom
//                 </button> */}

//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Request } from '../types';

export default function MentorRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests/received');
      setRequests(res.data);
    } catch {
      alert('Failed to fetch requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: 'ACCEPTED' | 'REJECTED') => {
    setUpdatingId(id);
    console.log(`🚀 Attempting to ${action} request ${id}`);
    try {
      await api.put(`/requests/${id}`, { status: action });
      console.log('✅ Request updated!');

      // update the request locally
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: action } : r
        )
      );
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        console.error('❌ Failed to update status:', err.response.data);
      } else if (err instanceof Error) {
        console.error('❌ Failed to update status:', err.message);
      } else {
        console.error('❌ Failed to update status:', err);
      }
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Incoming Mentorship Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id + req.status} className="border p-4 rounded">
              <p><strong>Mentee:</strong> {req.mentee?.name}</p>
              <p><strong>Goals:</strong> {req.mentee?.goals}</p>
              <p className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</p>
              <p className="mt-1">
                <strong>Status:</strong>{' '}
                <span
                  className={
                    req.status === 'ACCEPTED'
                      ? 'text-green-600'
                      : req.status === 'REJECTED'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }
                >
                  {req.status}
                </span>
              </p>

              {/* {req.status === 'PENDING' && (
                <div className="mt-2 space-x-2">
                  <button
                    disabled={updatingId === req._id}
                    onClick={() => handleAction(req._id, 'ACCEPTED')}
                    className="bg-green-600 text-white px-3 py-1 disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    disabled={updatingId === req._id}
                    onClick={() => handleAction(req._id, 'REJECTED')}
                    className="bg-red-600 text-white px-3 py-1 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )} */}
              {req.status === 'PENDING' && (
  <div className="mt-2 space-x-2">
    <button
      disabled={updatingId === req._id}
      onClick={() => handleAction(req._id, 'ACCEPTED')}
      className="bg-green-600 text-white px-3 py-1 disabled:opacity-50"
    >
      Accept
    </button>
    <button
      disabled={updatingId === req._id}
      onClick={() => handleAction(req._id, 'REJECTED')}
      className="bg-red-600 text-white px-3 py-1 disabled:opacity-50"
    >
      Reject
    </button>
  </div>
)}

{/* ✅ Show Join Zoom only if accepted */}
{req.status === 'ACCEPTED' && req.zoomLink && (
  <a
    href={req.zoomLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
  >
    Join Zoom
  </a>
)}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
