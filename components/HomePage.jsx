'use client';
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Galaxy from "./Galaxy";
import SplitText from "./SplitText";
import ScrollFloat from "./ScrollFloat";

import {
  FaLinkedin,
  FaBell,
  FaRocket,
  FaInfoCircle,
  FaEnvelope,
  FaUserTie
} from 'react-icons/fa';

export default function HomePage() {
  const userName = "Future Engineer";

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <div className="relative min-h-screen overflow-hidden">

        {/* Galaxy Background */}
        <div className="fixed inset-0 -z-10">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.2}
            glowIntensity={0.4}
            saturation={0.2}
            hueShift={40}
          />
        </div>

        {/* Main Content */}
        <div className="min-h-screen text-white flex flex-col items-center font-sans scroll-smooth relative z-10">

          {/* SECTION 1: HERO */}
          <section
            id="home"
            className="min-h-screen w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center justify-center pt-16 sm:pt-20 pb-10"
          >
            <p className="text-[9px] sm:text-[10px] md:text-sm font-medium text-gray-400 mb-2 tracking-[0.25em] sm:tracking-[0.3em] uppercase text-center w-full">
              NICE TO MEET YOU, <span className="text-yellow-500">{userName}</span>
            </p>

            <div className="text-center mb-6">
              <SplitText
                text="THE BACK"
                className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase"
                delay={30}
                duration={0.8}
                splitType="chars"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
              />
              <SplitText
                text="BENCHERS"
                className="text-yellow-500 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase"
                delay={50}
                duration={0.8}
                splitType="chars"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>

            <div className="max-w-3xl mb-6 sm:mb-8 text-center px-2">
              <p className="text-xs sm:text-sm md:text-lg text-gray-300 italic mb-4 font-light leading-snug">
                "Your seat in the back doesn't define your future, but your hustle does."
              </p>
              <div className="h-[1px] w-12 bg-yellow-500 mx-auto mb-4 sm:mb-5 opacity-40"></div>
              <p className="text-[10px] sm:text-[11px] md:text-[14px] text-gray-400 leading-relaxed tracking-wide">
                We empower MAKAUT students with a premium repository of
                <span className="text-white font-bold"> Semester Notes</span>,
                <span className="text-white font-bold"> Previous Year Questions (PYQs)</span>,
                <span className="text-white font-bold"> MAKAUT Organizers</span>, and
                <span className="text-white font-bold"> Exam Guides</span>.
                Everything you need to turn back-bench potential into top-tier results.
              </p>
            </div>

            {/* LinkedIn Connection Card */}
            <div className="bg-black/40 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-yellow-500/20 w-full max-w-[240px] sm:max-w-[260px] text-center">
              <FaLinkedin className="text-3xl text-[#0077B5] mx-auto mb-2" />
              <h3 className="text-sm font-bold mb-1">Connect with the Creator</h3>
              <p className="text-gray-500 text-[8px] mb-4 uppercase tracking-widest leading-tight">
                Building a network for the next generation.
              </p>
              <a
                href="https://www.linkedin.com/in/avijit-das-320200284/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#0077B5] py-2 rounded-lg font-bold text-[10px] uppercase hover:bg-[#005a87] transition shadow-lg"
              >
                Visit My Profile
              </a>
            </div>
          </section>

          {/* SECTION 2: DEPARTMENTS */}
          <section
            id="departments"
            className="min-h-screen w-full max-w-6xl py-16 sm:py-20 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center"
          >
            <div className="text-center mb-8 sm:mb-12">
  <div className="flex justify-center items-center flex-wrap gap-2">
    <ScrollFloat
      animationDuration={1}
      ease="back.inOut(2)"
      className="inline-block text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white"
    >
      SELECT YOUR
    </ScrollFloat>

    <ScrollFloat
      animationDuration={1.2}
      ease="back.inOut(2)"
      className="inline-block text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-yellow-500"
    >
      DEPARTMENT
    </ScrollFloat>
  </div>
</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 w-full">
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
                  className="bg-black/40 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-yellow-500/20 flex flex-col items-center justify-center hover:border-yellow-500/60 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <span className="text-3xl sm:text-4xl mb-3 sm:mb-4">{dept.icon}</span>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-widest text-center">{dept.name}</h3>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 3: NOTICE BOARD */}
          <section
            id="notice"
            className="min-h-screen w-full max-w-4xl py-16 sm:py-20 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <FaBell className="text-yellow-500 text-2xl sm:text-3xl animate-pulse shrink-0" />
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter"
              >
                NOTICE BOARD
              </ScrollFloat>
            </div>
            <NoticeBoard />
          </section>

          {/* SECTION 4: UPCOMING PROJECTS */}
          <section
            id="upcoming"
            className="min-h-screen w-full max-w-6xl py-16 sm:py-20 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <FaRocket className="text-yellow-500 text-2xl sm:text-3xl animate-bounce shrink-0" />
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter"
              >
                UPCOMING PROJECTS
              </ScrollFloat>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
              {[
                { title: 'AI Assistant', desc: 'Personalized study schedules based on your MAKAUT syllabus.' },
                { title: 'Live Mentorship', desc: 'Connect with seniors who already cleared the backlogs.' },
                { title: 'Job Portal', desc: 'Direct placement opportunities for technical streams.' }
              ].map((item, index) => (
                <div key={index} className="relative group cursor-default">
                  <div className="bg-gray-800/20 border border-gray-700/50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex items-center justify-center h-36 sm:h-48 group-hover:border-yellow-500/50 transition-all duration-500 shadow-2xl">
                    <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter opacity-20">{item.title}</span>
                  </div>
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                    <h4 className="text-yellow-500 font-bold text-xs sm:text-sm uppercase mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: ABOUT US */}
          <section
            id="about"
            className="min-h-screen w-full max-w-5xl py-16 sm:py-20 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center"
          >
            <div className="mb-6 sm:mb-8">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-center"
              >
                ABOUT US
              </ScrollFloat>
            </div>
            <div className="bg-gray-800/10 backdrop-blur-lg border border-gray-700/30 p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] text-center shadow-inner w-full max-w-4xl">
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-light">
                We are a dedicated team of engineering students from{' '}
                <span className="text-white font-bold">IMPS College of Engineering and Technology</span>.
                Driven by the challenges of the academic landscape, we built{' '}
                <span className="text-yellow-500 font-bold italic">The Back Benchers</span>{' '}
                as a centralized hub to bridge the gap between complex MAKAUT syllabi and student success.
                Our mission is to provide high-quality, accessible resources that empower every student to excel.
              </p>
            </div>
          </section>

          {/* SECTION 6: CONTACT US & THE TEAM */}
          <section
            id="contact"
            className="min-h-screen w-full max-w-6xl py-16 sm:py-20 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <FaEnvelope className="text-yellow-500 text-2xl sm:text-3xl shrink-0" />
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter"
              >
                CONTACT US
              </ScrollFloat>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 w-full">
              {[
                { name: 'Avijit Das', role: 'Project Lead', icon: <FaUserTie className="text-yellow-500" /> },
                { name: 'MD Asikul Hoque', role: 'Technical Contributor', icon: <FaUserTie className="text-white/40" /> },
                { name: 'Tanmoy Das', role: 'Technical Contributor', icon: <FaUserTie className="text-white/40" /> }
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-800/20 backdrop-blur-xl border border-gray-700/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center hover:border-yellow-500/50 transition-all duration-500 shadow-2xl group"
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {member.icon}
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tighter mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <div className="py-8 sm:py-10 opacity-20 text-[8px] sm:text-[9px] tracking-widest uppercase text-center w-full px-4">
            © 2025 THE BACK BENCHERS
          </div>

        </div>
      </div>
    </>
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
    <div className="w-full space-y-3 sm:space-y-4 text-left">
      {notices.map((item) => (
        <div
          key={item._id}
          className="bg-gray-800/20 backdrop-blur-md p-4 sm:p-6 rounded-2xl border-l-4 border-yellow-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 hover:bg-gray-800/40 transition-all"
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest">{item.type}</span>
              {item.pinned && (
                <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">PINNED</span>
              )}
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mt-1">{item.title}</h3>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 text-xs underline mt-1 inline-block"
              >
                View Details →
              </a>
            )}
          </div>
          <span className="text-gray-500 font-mono text-xs sm:text-sm shrink-0">{item.date}</span>
        </div>
      ))}
    </div>
  );
}
