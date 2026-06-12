// pages/profile.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout'; // Layout component for Navbar and global styles
import { FaUserEdit, FaGraduationCap, FaEnvelope, FaPhone, FaBuilding, FaAward, FaUniversity } from 'react-icons/fa';

export default function ProfilePage() {
  // Placeholder Data (This will be replaced by API data after login integration)
  const [userData] = useState({
    name: 'Avijit Das',
    email: 'avijit.das@makaut.in',
    phone: '+91 98765 43210',
    college: 'ABC Institute of Technology',
    department: 'B.Tech - CSE/IT',
    currentSemester: 'Semester 5',
    badges: ['Top Note Contributor', 'PYQ Master', 'Founding Member'],
    profilePicture: '/images/default-avatar.png' // Ensure this placeholder image exists in public/images
  });

  // Placeholder function for handling profile picture change
  const handleChangePicture = () => {
    alert("Profile Picture Change functionality requires Firebase Storage integration!");
  };

  return (
    <Layout> 
      <div className="bg-gray-900 text-white py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          
          <h1 className="text-4xl font-extrabold text-yellow-300 mb-10 text-center">
            My Back Bencher Profile
          </h1>

          {/* Profile Header Card */}
          <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl mb-12 flex flex-col items-center">
            
            {/* Profile Picture Section */}
            <div className="relative w-32 h-32 mb-6">
              <img 
                src={userData.profilePicture} 
                alt={`${userData.name}'s profile picture`} 
                className="w-full h-full rounded-full object-cover border-4 border-yellow-500"
              />
              <button 
                onClick={handleChangePicture}
                className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition duration-200"
                title="Change Profile Picture"
              >
                <FaUserEdit className="w-4 h-4 text-gray-900" />
              </button>
            </div>

            {/* Name and Basic Info */}
            <h2 className="text-3xl font-bold text-white mb-1">{userData.name}</h2>
            <p className="text-lg text-yellow-400 mb-4">{userData.department}</p>
            
            {/* Main Actions Button (Edit Profile - for future integration) */}
            <button className="bg-transparent border border-yellow-500 text-yellow-500 py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition">
              Edit Profile Details
            </button>
          </div>

          {/* Detailed Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Contact Info Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaEnvelope className="mr-3 text-yellow-500" /> Contact Details
              </h3>
              <p className="flex items-center text-gray-300 mb-2">
                <span className="font-bold w-24">Email:</span> {userData.email}
              </p>
              <p className="flex items-center text-gray-300">
                <span className="font-bold w-24">Phone:</span> {userData.phone}
              </p>
            </div>

            {/* Academic Info Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaGraduationCap className="mr-3 text-yellow-500" /> Academic Status
              </h3>
              <p className="flex items-center text-gray-300 mb-2">
                <span className="font-bold w-24">College:</span> {userData.college}
              </p>
              <p className="flex items-center text-gray-300 mb-2">
                <span className="font-bold w-24">Semester:</span> {userData.currentSemester}
              </p>
              <p className="flex items-center text-gray-300">
                <span className="font-bold w-24">Dept:</span> {userData.department.split(' - ')[1]}
              </p>
            </div>
            
            {/* Badges/Achievements Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 md:col-span-2">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaAward className="mr-3 text-yellow-500" /> Back Bencher Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                {userData.badges.map((badge, index) => (
                  <span key={index} className="bg-yellow-500 text-gray-900 text-sm font-medium px-4 py-1 rounded-full shadow-md">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout> 
  ); // <--- Correct closing structure
}