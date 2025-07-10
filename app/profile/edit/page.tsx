'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();
  // const [profile, setProfile] = useState({
  //   name: '',
  //   bio: '',
  //   skills: '',
  //   goals: '',
  //   industry: '',
  // });


  const [profile, setProfile] = useState({
  name: '',
  bio: '',
  skills: [] as string[],
  goals: '',
  industry: '',
});
const [skillInput, setSkillInput] = useState('');


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me');
        const user = res.data;
        // setProfile({
        //   name: user.name || '',
        //   bio: user.bio || '',
        //   skills: (user.skills || []).join(', '),
        //   goals: user.goals || '',
        //   industry: user.industry || '',
        // });
        setProfile({
        name: user.name || '',
        bio: user.bio || '',
        skills: user.skills || [],
        goals: user.goals || '',
        industry: user.industry || '',
      });
      } catch {
        router.push('/login');
      }
    };
    fetchProfile();
  }, [router]);

  const handleAddSkill = () => {
  const trimmed = skillInput.trim();
  if (trimmed && !profile.skills.includes(trimmed)) {
    setProfile({ ...profile, skills: [...profile.skills, trimmed] });
    setSkillInput('');
  }
};

const handleRemoveSkill = (skillToRemove: string) => {
  setProfile({
    ...profile,
    skills: profile.skills.filter((s) => s !== skillToRemove),
  });
};


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/me/profile', {
        ...profile,
        skills: profile.skills.map((s: string) => s.trim()),

      });
      alert('Profile updated!');
      router.push('/dashboard');
    } catch {
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-transparent border-transparent p-8 rounded-lg shadow-xl  bg-opacity-40 backdrop-blur-xl">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border outline-none text-white"
        />
        <input
          type="text"
          placeholder="Industry (optional)"
          value={profile.industry}
          onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
          className="w-full p-2 border outline-none text-white"
        />
        <textarea
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full p-2 border outline-none text-white"
        />
        {/* <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          className="w-full p-2 border outline-none text-white"
        /> */}


  {/* <label className="text-white block mb-1">Skills</label> */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            className="w-full p-2 border outline-none text-white"
          />
          <button type="button" onClick={handleAddSkill} className="bg-teal-600 text-white px-3">
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="bg-teal-700 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 text-white hover:text-red-300"
              >
                &times;
              </button>
            </span>
          ))}
        
      </div>


        <input
          type="text"
          placeholder="Goals"
          value={profile.goals}
          onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
          className="w-full p-2 border outline-none text-white"
        />
        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white p-2">Save Profile</button>
      </form>
    </div>
  );
}
