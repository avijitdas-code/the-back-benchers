'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaLinkedin, 
  FaBell, 
  FaRocket, 
  FaInfoCircle, 
  FaEnvelope, 
  FaUserTie 
} from 'react-icons/fa'; 

export default function HomePage() {
  const userName = "AJ";

  return (
    <div className="min-h-screen text-white bg-transparent flex flex-col items-center font-sans scroll-smooth">
      
      {/* SECTION 1: HERO */}
      <section id="home" className="h-screen w-full max-w-5xl px-6 flex flex-col items-center justify-center pt-20">
        <p className="text-[10px] md:text-sm font-medium text-gray-400 mb-1 tracking-[0.3em] uppercase text-center w-full">
          NICE TO MEET YOU, <span className="text-yellow-500">{userName}</span>
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-4 whitespace-nowrap text-center w-full">
          THE BACK <span className="text-yellow-500">BENCHERS</span>
        </h1>

        <div className="max-w-3xl mb-8 text-center">
          <p className="text-sm md:text-lg text-gray-300 italic mb-4 font-light leading-tight">
            "Your seat in the back doesn't define your future, but your hustle does."
          </p>
          <div className="h-[1px] w-12 bg-yellow-500 mx-auto mb-5 opacity-40"></div>
          <p className="text-[11px] md:text-[14px] text-gray-400 leading-relaxed tracking-wide">
            We empower MAKAUT students with a premium repository of 
            <span className="text-white font-bold"> Semester Notes</span>, 
            <span className="text-white font-bold"> Previous Year Questions (PYQs)</span>, 
            <span className="text-white font-bold"> MAKAUT Organizers</span>, and 
            <span className="text-white font-bold"> Exam Guides</span>.
            Everything you need to turn back-bench potential into top-tier results.
          </p>
        </div>

        {/* LinkedIn Connection Card */}
        <div className="bg-gray-800/30 backdrop-blur-xl p-4 rounded-2xl border border-gray-700/50 max-w-[260px] w-full hover:border-yellow-500/40 transition-all duration-500 group shadow-2xl text-center">
          <FaLinkedin className="text-3xl text-[#0077B5] mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-bold mb-1">Connect with the Creator</h3>
          <p className="text-gray-500 text-[8px] mb-4 uppercase tracking-widest leading-tight">
            Building a network for the next generation.
          </p>
          <a href="https://www.linkedin.com/in/avijit-das-320200284/" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#0077B5] py-2 rounded-lg font-bold text-[10px] uppercase hover:bg-[#005a87] transition shadow-lg">
            Visit My Profile
          </a>
        </div>
      </section>

      {/* SECTION 2: DEPARTMENTS */}
      <section id="departments" className="min-h-screen w-full max-w-6xl py-20 px-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12">
          SELECT YOUR <span className="text-yellow-500">DEPARTMENT</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {[
            { name: 'CSE/IT', icon: '💻' },
            { name: 'EE', icon: '⚡' },
            { name: 'CE', icon: '🏗️' },
            { name: 'ECE', icon: '📡' },
            { name: 'ME', icon: '⚙️' }
          ].map((dept) => (
            <Link 
              key={dept.name} 
              href={`/departments/${dept.name.toLowerCase().replace('/', '-')}`} 
              className="bg-gray-800/20 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 flex flex-col items-center justify-center hover:scale-105 transition-all shadow-2xl"
            >
              <span className="text-4xl mb-4">{dept.icon}</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-widest">{dept.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: NOTICE BOARD - Dynamic from DB */}
      <section id="notice" className="min-h-screen w-full max-w-4xl py-20 px-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-10">
          <FaBell className="text-yellow-500 text-3xl animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            NOTICE <span className="text-yellow-500">BOARD</span>
          </h2>
        </div>
        <NoticeBoard />
      </section>

      {/* SECTION 4: UPCOMING PROJECTS */}
      <section id="upcoming" className="min-h-screen w-full max-w-6xl py-20 px-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-10">
          <FaRocket className="text-yellow-500 text-3xl animate-bounce" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            UPCOMING <span className="text-yellow-500">PROJECTS</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {[
            { title: 'AI Assistant', desc: 'Personalized study schedules based on your MAKAUT syllabus.' },
            { title: 'Live Mentorship', desc: 'Connect with seniors who already cleared the backlogs.' },
            { title: 'Job Portal', desc: 'Direct placement opportunities for technical streams.' }
          ].map((item, index) => (
            <div key={index} className="relative group cursor-default">
              <div className="bg-gray-800/20 border border-gray-700/50 rounded-3xl p-12 flex items-center justify-center h-48 group-hover:border-yellow-500/50 transition-all duration-500 shadow-2xl">
                <span className="text-2xl font-black uppercase tracking-tighter opacity-20">{item.title}</span>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                <h4 className="text-yellow-500 font-bold text-sm uppercase mb-2">{item.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed italic">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: ABOUT US */}
      <section id="about" className="min-h-screen w-full max-w-5xl py-20 px-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-6">
          <FaInfoCircle className="text-yellow-500 text-3xl" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            ABOUT <span className="text-yellow-500">US</span>
          </h2>
        </div>
        <div className="bg-gray-800/10 backdrop-blur-lg border border-gray-700/30 p-10 rounded-[40px] text-center shadow-inner max-w-4xl">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
            We are a dedicated team of engineering students from <span className="text-white font-bold">IMPS College of Engineering and Technology</span>. 
            Driven by the challenges of the academic landscape, we built <span className="text-yellow-500 font-bold italic">The Back Benchers</span> 
            as a centralized hub to bridge the gap between complex MAKAUT syllabi and student success. 
            Our mission is to provide high-quality, accessible resources that empower every student to excel.
          </p>
        </div>
      </section>

      {/* SECTION 6: CONTACT US & THE TEAM */}
      <section id="contact" className="min-h-screen w-full max-w-6xl py-20 px-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-12">
          <FaEnvelope className="text-yellow-500 text-3xl" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            CONTACT <span className="text-yellow-500">US</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { name: 'Avijit Das', role: 'Project Lead', icon: <FaUserTie className="text-yellow-500" /> },
            { name: 'MD Asikul Hoque', role: 'Technical Contributor', icon: <FaUserTie className="text-white/40" /> },
            { name: 'Tanmoy Das', role: 'Technical Contributor', icon: <FaUserTie className="text-white/40" /> }
          ].map((member, index) => (
            <div key={index} className="bg-gray-800/20 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl text-center hover:border-yellow-500/50 transition-all duration-500 shadow-2xl group">
              <div className="text-4xl mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {member.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">{member.name}</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <div className="py-10 opacity-20 text-[9px] tracking-widest uppercase text-center w-full">
        © 2025 THE BACK BENCHERS
      </div>
    </div>
  );
}

// ── Notice Board Component ──
function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notices")
      .then(res => res.json())
      .then(data => { setNotices(data); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="text-gray-400 text-sm animate-pulse">Loading notices...</div>
  );

  if (notices.length === 0) return (
    <div className="text-gray-500 text-sm">No notices yet. Check back soon!</div>
  );

  return (
    <div className="w-full space-y-4 text-left">
      {notices.map((item) => (
        <div key={item._id}
          className="bg-gray-800/20 backdrop-blur-md p-6 rounded-2xl border-l-4 border-yellow-500 flex items-center justify-between hover:bg-gray-800/40 transition-all">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest">{item.type}</span>
              {item.pinned && (
                <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">PINNED</span>
              )}
            </div>
            <h3 className="text-white font-bold text-lg mt-1">{item.title}</h3>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="text-yellow-400 text-xs underline mt-1 inline-block">
                View Details →
              </a>
            )}
          </div>
          <span className="text-gray-500 font-mono text-sm shrink-0 ml-4">{item.date}</span>
        </div>
      ))}
    </div>
  );
}