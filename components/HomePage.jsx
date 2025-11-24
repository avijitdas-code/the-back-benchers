// components/HomePage.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// components/HomePage.jsx - Hero Section modification

// ... (rest of your imports)

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
        <div className="z-20 p-8 max-w-4xl mx-auto"> {/* Changed z-index to bring text forward */}
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

      {/* ... Rest of your HomePage.jsx content (Feature Sections, About, Footer) ... */}

    </div>
  );
}