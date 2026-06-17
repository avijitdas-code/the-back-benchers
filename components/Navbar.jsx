'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [active, setActive] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'departments', label: 'Departments' },
    { id: 'notice', label: 'Notices' },
    { id: 'upcoming', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    if (pathname === '/') {
      // Already on the homepage — just scroll to the section
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
    } else {
      // On a different route (e.g. a department/semester page) —
      // navigate back to the homepage with a hash, the effect below
      // will pick it up and scroll once the page has mounted.
      router.push(`/#${id}`);
    }
  };

  // Runs whenever we land on "/" — including right after the router.push
  // above — and scrolls to whatever section the hash points to.
  useEffect(() => {
    if (pathname !== '/') return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    // Small delay so the homepage's sections are actually in the DOM
    // before we try to scroll to them.
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      setActive(hash);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

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
