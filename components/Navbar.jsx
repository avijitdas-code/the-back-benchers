// components/Navbar.jsx
'use client'; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-5 bg-white/10 dark:bg-[#0B0F1A]/80 backdrop-blur-md text-black dark:text-white border-b border-gray-200 dark:border-gray-800 transition-all duration-500">
      
      {/* Brand */}
      <div className="text-xl font-black tracking-tighter text-yellow-600 dark:text-yellow-500 uppercase">
        <Link href="/">The Back Benchers</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 font-bold text-[10px] uppercase tracking-widest">
        
        {/* THEME TOGGLE */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:text-yellow-500 transition-colors"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-lg text-yellow-500" /> : <FaMoon className="text-lg text-blue-600" />}
        </button>

        <Link href="#departments" className="hover:text-yellow-500 transition">Departments</Link>
        <Link href="#notice" className="hover:text-yellow-500 transition">Notice</Link>
        <Link href="#about" className="hover:text-yellow-500 transition">About Us</Link>
        {/* Login/Signup removed */}
      </div>
    </nav>
  );
}