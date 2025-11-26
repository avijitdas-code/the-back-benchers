// components/HomePage.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBookOpen, FaClipboardList, FaBook } from 'react-icons/fa'; // Updated FaFlask to FaBook

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        {/* Background Image using Next.js Image component */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Tech background"
          layout="fill" // This makes the image fill its parent
          objectFit="cover" // This ensures the image covers the area without distorting
          quality={90} // Adjust quality for better performance
          priority // Load this image with high priority
          className="absolute z-0" // Ensure it's behind the content
        />
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div> {/* Overlay for better text readability */}

        {/* Content layered on top */}
        <div className="z-20 p-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 leading-tight mb-4 animate-fadeIn">
            Your Ultimate Study Companion
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeIn delay-200">
            Access Notes, PYQs, Labs, and Exam Updates for MAKAUT Students. Study Smart, Not Hard!
          </p>
          <div className="space-x-4 animate-fadeIn delay-400">
            <Link href="/semesters" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                Explore Semesters
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Sections - What We Offer */}
      <section className="py-16 px-8 container mx-auto">
        <h2 className="text-4xl font-bold text-center text-yellow-300 mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Comprehensive Notes Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <FaBookOpen className="mx-auto text-5xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-3">Comprehensive Notes</h3>
            <p className="text-gray-300">Detailed, organized notes for all subjects, designed to simplify complex topics and boost understanding.</p>
          </div>

          {/* Previous Year Questions Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <FaClipboardList className="mx-auto text-5xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-3">Previous Year Questions (PYQs)</h3>
            <p className="text-gray-300">Practice with a vast collection of PYQs to master exam patterns and improve your scores.</p>
          </div>

          {/* MAKAUT Organizers Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <FaBook className="mx-auto text-5xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-3">MAKAUT Organizers</h3>
            <p className="text-gray-300">Access comprehensive MAKAUT Organizers for previous year questions, solutions, and exam tips.</p>
          </div>
        </div>
      </section>

      {/* Browse Materials Section - NEW INTERACTIVE SECTION */}
      <section className="py-20 px-8 bg-gray-800 text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-yellow-300 mb-10">Access Study Materials</h2>
          <p className="text-lg text-gray-300 mb-12">Select your stream, semester, and content type to quickly find what you need.</p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Stream Selector (Placeholder) */}
            <select className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg w-full md:w-auto">
              <option value="">Select Stream</option>
              <option value="btech">B.Tech</option>
              <option value="bca">BCA</option>
              <option value="bba">BBA</option>
              <option value="other">Other</option>
            </select>

            {/* Semester Selector (Placeholder) */}
            <select className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg w-full md:w-auto">
              <option value="">Select Semester</option>
              <option value="sem1">Semester 1</option>
              <option value="sem2">Semester 2</option>
              <option value="sem3">Semester 3</option>
              <option value="sem4">Semester 4</option>
              <option value="sem5">Semester 5</option>
              <option value="sem6">Semester 6</option>
              <option value="sem7">Semester 7</option>
              <option value="sem8">Semester 8</option>
            </select>

            {/* Content Type Selector (Placeholder) */}
            <select className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg w-full md:w-auto">
              <option value="">Select Content Type</option>
              <option value="notes">Notes</option>
              <option value="pyqs">PYQs</option>
              <option value="organizers">MAKAUT Organizers</option>
              <option value="books">Books</option>
              <option value="suggestions">Suggestions</option>
            </select>

            {/* Go Button (Placeholder) */}
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 w-full md:w-auto">
              Go!
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            (Note: Functionality to filter and display content will be added in future steps.)
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-gray-800 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-yellow-300 mb-6">About The Back Benchers</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We are a community-driven platform dedicated to empowering MAKAUT students with easy access to study materials.
            Our goal is to make learning efficient and effective, helping you excel in your academic journey.
          </p>
        </div>
      </section>

      {/* Call to Action / Footer */}
      <section className="py-12 text-center bg-gray-900">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} The Back Benchers. All rights reserved.</p>
      </section>

    </div>
  );
}