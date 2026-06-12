'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

const resourceTypes = [
  { label: 'Notes',     value: 'notes',     icon: '📝', desc: 'Class & teacher notes' },
  { label: 'Organizer', value: 'organizer', icon: '📋', desc: 'MAKAUT organizers' },
  { label: 'PYQ',       value: 'pyq',       icon: '📄', desc: 'Previous year questions' },
  { label: 'Syllabus',  value: 'syllabus',  icon: '📚', desc: 'Official syllabus' },
  { label: 'Other',     value: 'other',     icon: '📁', desc: 'Other materials' },
];

export default function ResourceTypeSelection() {
  const { deptName, semester, subject } = useParams();
  const router = useRouter();

  const formattedDept    = deptName?.toUpperCase().replace('-', '/');
  const semNumber        = semester?.replace('semester-', '');
  const formattedSubject = decodeURIComponent(subject || '');

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center px-6 py-20">

      <div className="text-center mb-16">
        <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4">
          {formattedDept} — Semester {semNumber}
        </p>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          {formattedSubject}
        </h1>
        <p className="mt-4 text-gray-400 font-light tracking-widest uppercase text-xs">
          What type of material do you need?
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {resourceTypes.map((res) => (
          <button
            key={res.value}
            onClick={() => router.push(
              `/departments/${deptName}/${semester}/${subject}/${res.value}`
            )}
            className="bg-[#111827] border border-gray-700/50 hover:border-yellow-500 hover:bg-gray-800/60 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group cursor-pointer">
            <span className="text-4xl">{res.icon}</span>
            <span className="text-white font-black uppercase tracking-widest text-sm group-hover:text-yellow-500 transition-colors">
              {res.label}
            </span>
            <span className="text-gray-500 text-xs text-center">{res.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}