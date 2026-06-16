'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [active, setActive] = useState('home');

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'departments', label: 'Departments' },
    { id: 'notice', label: 'Notices' },
    { id: 'upcoming', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
    setActive(id);
  };

  return (
    <nav
      className="
      fixed top-5 left-1/2
      -translate-x-1/2
      z-50
      backdrop-blur-xl
      bg-black/20
      border border-white/10
      shadow-2xl
      rounded-full
      px-3 py-2
      "
    >
      <div className="flex items-center gap-1">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`
              px-4 py-2 rounded-full
              text-sm font-medium
              transition-all duration-300
              ${
                active === link.id
                  ? 'bg-yellow-500 text-black'
                  : 'text-white hover:bg-white/10'
              }
            `}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}