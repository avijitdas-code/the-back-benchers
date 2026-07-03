'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaFilePdf, FaArrowLeft, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

export default function MaterialsList() {
  const { deptName, semester, subject, resourceType } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading]     = useState(true);

  const semNumber        = semester?.replace('semester-', '');
const formattedSubject = decodeURIComponent(subject || '').toLowerCase();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const dept = deptName.toUpperCase();
        const res  = await fetch(
          `/api/materials?department=${dept}&semester=${semNumber}&type=${resourceType}&subject=${encodeURIComponent(formattedSubject)}`
        );
        const data = await res.json();
        setMaterials(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [deptName, semester, subject, resourceType]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white pt-32 pb-20 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full mb-12">
        <Link href={`/departments/${deptName}/${semester}/${subject}`}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition mb-6 group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back</span>
        </Link>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          {resourceType.toUpperCase()} <span className="text-yellow-500">— {formattedSubject}</span>
        </h1>
        <p className="text-gray-400 mt-2 text-xs uppercase">
          {deptName.toUpperCase()} • Semester {semNumber}
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        {loading && (
          <div className="text-center text-gray-400 animate-pulse py-20">
            Loading materials...
          </div>
        )}

        {!loading && materials.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No materials found yet.</p>
            <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">
              Check back soon!
            </p>
          </div>
        )}

        {!loading && materials.map((material, index) => (
          <div key={index}
            className="bg-gray-800/20 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl flex items-center justify-between group hover:bg-gray-800/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                <FaFilePdf size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{material.title}</h3>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                  {material.subject} • Sem {material.semester} • {material.year}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={material.driveViewLink} target="_blank"
                className="flex items-center gap-2 bg-yellow-500 text-black px-5 py-2 rounded-full font-black text-[10px] uppercase hover:bg-yellow-400 transition shadow-lg">
                View <FaExternalLinkAlt />
              </a>
              <a href={material.driveDownloadLink} target="_blank"
                className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase hover:bg-gray-600 transition shadow-lg">
                <FaDownload />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}