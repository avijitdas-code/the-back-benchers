'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function SubjectSelection() {
  const { deptName, semester } = useParams();
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  const formattedDept = deptName?.toUpperCase().replace('-', '/');
  const semNumber     = semester?.replace('semester-', '');

  useEffect(() => {
    const fetchSubjects = async () => {
      const res  = await fetch(
        `/api/subjects?department=${deptName.toUpperCase()}&semester=${semNumber}`
      );
      const data = await res.json();
      setSubjects(data);
      setLoading(false);
    };
    fetchSubjects();
  }, [deptName, semester]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center mb-16">
        <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4">
          {formattedDept} — Semester {semNumber}
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          SELECT <span className="text-yellow-500">SUBJECT</span>
        </h1>
        <p className="mt-4 text-gray-400 font-light tracking-widest uppercase text-xs">
          Choose your subject to access materials
        </p>
      </div>

      {loading && (
        <p className="text-gray-400 animate-pulse">Loading subjects...</p>
      )}

      {!loading && subjects.length === 0 && (
        <div className="text-center">
          <p className="text-gray-500 text-lg">No subjects added yet.</p>
          <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">
            Add subjects from the admin panel!
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {subjects.map((sub) => (
          <button key={sub._id}
            onClick={() => router.push(
              `/departments/${deptName}/${semester}/${sub.name}`
            )}
            className="bg-[#111827] border border-gray-700/50 hover:border-yellow-500 hover:bg-gray-800/60 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 group cursor-pointer">
            <span className="text-white font-black uppercase tracking-widest text-sm group-hover:text-yellow-500 transition-colors text-center">
              {sub.name}
            </span>
            {sub.code && (
              <span className="text-gray-500 text-xs font-mono">{sub.code}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}