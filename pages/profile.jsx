'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  FaUserEdit,
  FaGraduationCap,
  FaEnvelope,
  FaAward
} from 'react-icons/fa';

export default function ProfilePage() {
  const [userData] = useState({
    name: 'Avijit Das',
    email: 'avijit.das@makaut.in',
    phone: '+91 98765 43210',
    college: 'ABC Institute of Technology',
    department: 'B.Tech - CSE/IT',
    currentSemester: 'Semester 5',
    badges: [
      'Top Note Contributor',
      'PYQ Master',
      'Founding Member'
    ],
    profilePicture: '/images/default-avatar.png'
  });

  const handleChangePicture = () => {
    alert('Profile Picture upload coming soon!');
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 text-white py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">

          <h1 className="text-4xl font-extrabold text-yellow-400 mb-10 text-center">
            My Back Bencher Profile
          </h1>

          {/* Profile Header */}
          <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-yellow-500/20 shadow-2xl mb-10 flex flex-col items-center">

            <div className="relative w-32 h-32 mb-6">
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-yellow-500"
              />

              <button
                onClick={handleChangePicture}
                className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full hover:bg-yellow-400 transition"
              >
                <FaUserEdit className="text-black" />
              </button>
            </div>

            <h2 className="text-3xl font-bold">
              {userData.name}
            </h2>

            <p className="text-yellow-400 mt-2">
              {userData.department}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Contact */}
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaEnvelope className="text-yellow-400" />
                Contact Details
              </h3>

              <p>Email: {userData.email}</p>
              <p className="mt-2">Phone: {userData.phone}</p>
            </div>

            {/* Academic */}
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-yellow-400" />
                Academic Status
              </h3>

              <p>College: {userData.college}</p>
              <p className="mt-2">Semester: {userData.currentSemester}</p>
              <p className="mt-2">
                Department: {userData.department}
              </p>
            </div>

            {/* Badges */}
            <div className="md:col-span-2 bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaAward className="text-yellow-400" />
                Back Bencher Badges
              </h3>

              <div className="flex flex-wrap gap-3">
                {userData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}