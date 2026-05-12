import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, distance) => {
    e.preventDefault();

    // If we are already on the home page, just scroll smoothly
    if (location.pathname === '/') {
      const vh = window.innerHeight;
      window.scrollTo({
        top: distance * vh,
        behavior: 'smooth'
      });
    } else {
      // If we are on another page, navigate back to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const vh = window.innerHeight;
        window.scrollTo({
          top: distance * vh,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-white text-xl md:text-2xl font-black tracking-[0.25em] uppercase select-none cursor-pointer">
          BROOMLK<span className="text-cyan-500 font-medium">.</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest uppercase text-stone-400">
          <a href="#" onClick={(e) => handleNavClick(e, 0)} className={`hover:text-white transition-colors duration-200 ${location.pathname === '/' ? 'text-stone-300' : ''}`}>
            Overview
          </a>

          {/* >>> 🚀 STUDIO CLICK ROUTING CHANGE */}
          <Link to="/studio" className={`hover:text-white transition-colors duration-200 ${location.pathname === '/studio' ? 'text-cyan-400 font-bold' : ''}`}>
            Studio
          </Link>

          <a href="#" onClick={(e) => handleNavClick(e, 1.8)} className="hover:text-white transition-colors duration-200">
            Consultation
          </a>
        </div>

      </div>
    </nav>
  );
}