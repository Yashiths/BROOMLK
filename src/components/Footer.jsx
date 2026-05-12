import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Footer({ activeColor }) {
  const footerRef = useRef(null);
  
  const colorMap = {
    white: '#FFFFFF',
    black: '#777777', // Slightly lighter than black to stand out as an accent
    red: '#D6222A',
    blue: '#0084B6',
  };

  const accentColor = colorMap[activeColor] || '#0084B6';

  useLayoutEffect(() => {
    // Fade in animation for the footer
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          }
        }
      );
    });
    
    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, []);

  return (
    <section id="contact" className="min-h-[80vh] flex flex-col justify-center items-center pointer-events-auto py-20 relative">
      <div 
        ref={footerRef}
        className="w-full max-w-5xl bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-10 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
      >
        {/* Dynamic Glow Effect matching the car color */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 opacity-30 blur-[120px] rounded-full transition-colors duration-1000 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          
          {/* Text Info */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-4 block">
              02 / Start Your Build
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-6">
              Ready to <br/> <span style={{ color: accentColor }} className="transition-colors duration-1000">Transform?</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-10 max-w-sm">
              Consult with our master technicians and designers to bring your vision to reality. Book a 1-on-1 virtual or in-studio session.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                  <span className="text-white text-sm">📍</span>
                </div>
                <span className="text-stone-300 text-sm font-medium tracking-wide">BROOMLK Studio, Colombo</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                  <span className="text-white text-sm">✉️</span>
                </div>
                <span className="text-stone-300 text-sm font-medium tracking-wide">design@broomlk.com</span>
              </div>
            </div>
          </div>

          {/* Glassmorphic Contact Form */}
          <div className="flex flex-col justify-center space-y-5 bg-white/5 p-8 rounded-3xl border border-white/5">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder-stone-500 shadow-inner"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder-stone-500 shadow-inner"
            />
            <textarea 
              placeholder="Tell us about your dream build..." 
              rows="4"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder-stone-500 resize-none shadow-inner"
            ></textarea>
            <button 
              className="w-full py-4 mt-2 rounded-xl text-black font-bold uppercase tracking-[0.1em] text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              style={{ backgroundColor: accentColor === '#151515' || accentColor === '#777777' ? '#FFFFFF' : accentColor }}
            >
              Request Consultation
            </button>
          </div>

        </div>
      </div>
      
      {/* Small Footer Copyright */}
      <div className="mt-16 text-center z-10">
        <p className="text-[10px] text-stone-500 font-medium tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} BROOMLK Customs. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}
