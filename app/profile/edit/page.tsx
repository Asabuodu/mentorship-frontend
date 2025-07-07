'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    skills: '',
    goals: '',
    industry: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me');
        const user = res.data;
        setProfile({
          name: user.name || '',
          bio: user.bio || '',
          skills: (user.skills || []).join(', '),
          goals: user.goals || '',
          industry: user.industry || '',
        });
      } catch {
        router.push('/login');
      }
    };
    fetchProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/me/profile', {
        ...profile,
        skills: profile.skills.split(',').map((s) => s.trim()),
      });
      alert('Profile updated!');
      router.push('/dashboard');
    } catch {
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Industry (optional)"
          value={profile.industry}
          onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
          className="w-full p-2 border"
        />
        <textarea
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          className="w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Goals"
          value={profile.goals}
          onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
          className="w-full p-2 border"
        />
        <button className="w-full bg-blue-600 text-white p-2">Save Profile</button>
      </form>
    </div>
  );
}
