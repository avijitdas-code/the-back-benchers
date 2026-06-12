'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

const semesters = [
  { label: 'Semester 1', value: 'semester-1' },
  { label: 'Semester 2', value: 'semester-2' },
  { label: 'Semester 3', value: 'semester-3' },
  { label: 'Semester 4', value: 'semester-4' },
  { label: 'Semester 5', value: 'semester-5' },
  { label: 'Semester 6', value: 'semester-6' },
  { label: 'Semester 7', value: 'semester-7' },
  { label: 'Semester 8', value: 'semester-8' },
];

export default function SemesterSelection() {
  const { deptName } = useParams();
  const router = useRouter();

  const formattedDept = deptName?.toUpperCase().replace('-', '/');

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center px-6 py-20">
      
      <div className="text-center mb-16">
        <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4">
          {formattedDept} Department
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          SELECT YOUR <span className="text-yellow-500">SEMESTER</span>
        </h1>
        <p className="mt-4 text-gray-400 font-light tracking-widest uppercase text-xs">
          Choose your semester to access materials
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {semesters.map((sem) => (
          <button
            key={sem.value}
            onClick={() => router.push(`/departments/${deptName}/${sem.value}`)}
            className="bg-[#111827] border border-gray-700/50 hover:border-yellow-500 hover:bg-gray-800/60 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group cursor-pointer"
          >
            <span className="text-white font-black uppercase tracking-widest text-sm group-hover:text-yellow-500 transition-colors">
              {sem.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}