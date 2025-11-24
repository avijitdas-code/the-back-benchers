// components/HomePage.jsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 text-white"> {/* Adjusted min-height for Navbar */}
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
               style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}> {/* Placeholder for a background image */}
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for better text readability */}
        <div className="z-10 p-8 max-w-4xl mx-auto">
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

      {/* Feature Sections (to be added later) */}
      <section className="py-16 px-8 container mx-auto">
        <h2 className="text-4xl font-bold text-center text-yellow-300 mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for feature cards */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">Comprehensive Notes</h3>
            <p className="text-gray-300">Detailed notes for all subjects, curated by top students.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">Previous Year Questions</h3>
            <p className="text-gray-300">Practice with PYQs to ace your exams.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">Lab Manuals & Resources</h3>
            <p className="text-gray-300">Essential resources for practicals and projects.</p>
          </div>
        </div>
      </section>

      {/* About Section (to be added later) */}
      <section className="py-16 px-8 bg-gray-800 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-yellow-300 mb-6">About The Back Benchers</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We are a community-driven platform dedicated to empowering MAKAUT students with easy access to study materials.
            Our goal is to make learning efficient and effective, helping you excel in your academic journey.
          </p>
        </div>
      </section>

      {/* Call to Action / Footer (to be added later) */}
      <section className="py-12 text-center bg-gray-900">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} The Back Benchers. All rights reserved.</p>
      </section>
    </div>
  );
}