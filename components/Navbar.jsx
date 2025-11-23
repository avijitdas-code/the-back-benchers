// components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-2xl font-bold text-yellow-300 hover:text-yellow-400 transition-colors">
            The Back Benchers
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex"> {/* Hidden on small screens, shown on medium and up */}
          <Link href="/semesters" className="text-lg hover:text-yellow-300 transition-colors">
              Semesters
          </Link>
          <Link href="/pyqs" className="text-lg hover:text-yellow-300 transition-colors">
              PYQs
          </Link>
          <Link href="/labs" className="text-lg hover:text-yellow-300 transition-colors">
              Labs
          </Link>
          <Link href="/exams" className="text-lg hover:text-yellow-300 transition-colors">
              Exam Updates
          </Link>
          <Link href="/contact" className="text-lg hover:text-yellow-300 transition-colors">
              Contact
          </Link>
        </div>

        {/* Mobile Menu Button (for future implementation) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            {/* You can add an icon here, e.g., a hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}