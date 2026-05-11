
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[999] bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">

        {/* LOGO BRANDING */}
        <div className="text-white text-xl md:text-2xl font-black tracking-[0.25em] uppercase select-none cursor-pointer">
          BROOM<span className="text-stone-400 font-medium">LK</span>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-widest uppercase text-stone-300">
          <a href="#" className="hover:text-white transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            Overview
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            Performance
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            Design
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            Specifications
          </a>
        </div>

        {/* CTA BUTTON */}
        <div>
          <button className="pointer-events-auto border border-white/20 hover:border-white/80 bg-white/5 hover:bg-white text-white hover:text-black text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-none transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            Test Drive
          </button>
        </div>

      </div>
    </nav>
  );
}