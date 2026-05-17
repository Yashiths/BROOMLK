import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handles smooth scrolling inside Home page or redirects from other sub-pages
  const handleNavClick = (e, distance) => {
    e.preventDefault();

    if (location.pathname === '/') {
      const vh = window.innerHeight;
      window.scrollTo({
        top: distance * vh,
        behavior: 'smooth'
      });
    } else {
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

        {/* BROOMLK BRAND LOGO */}
        <Link to="/" className="text-white text-xl md:text-2xl font-black tracking-[0.25em] uppercase select-none cursor-pointer">
          BROOMLK<span className="text-cyan-500 font-medium">.</span>
        </Link>

        {/* ULTRA-CLEAN LUXURY ROUTING NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest uppercase text-stone-400">

          {/* 01 / OVERVIEW */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 0)}
            className={`hover:text-white transition-colors duration-200 ${location.pathname === '/' ? 'text-stone-200' : ''}`}
          >
            Overview
          </a>

          {/* 02 / STUDIO (CLIENT BUILDS) */}
          <Link
            to="/studio"
            className={`hover:text-white transition-colors duration-200 ${location.pathname === '/studio' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Studio
          </Link>

          {/* 03 / PERFORMANCE STORE (NEW DEPOT GATEWAY) */}
          <Link
            to="/shop"
            className={`hover:text-white transition-colors duration-200 ${location.pathname === '/shop' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Store
          </Link>

          {/* 04 / VIP CONSULTATION */}
          <Link
            to="/consultation"
            className={`hover:text-white transition-colors duration-200 ${location.pathname === '/consultation' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}