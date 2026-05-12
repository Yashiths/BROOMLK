import React from 'react';

export default function SpecsBar({ activeColor, setActiveColor }) {
  const colors = [
    { id: 'white', hex: '#FFFFFF', name: 'Carrara White' },
    { id: 'black', hex: '#1A1A1A', name: 'Jet Black' },
    { id: 'red', hex: '#D6222A', name: 'Guards Red' },
    { id: 'blue', hex: '#0084B6', name: 'Miami Blue' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-[999] bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] pointer-events-auto select-none">

      {/* PERFORMANCE SPECS GROUP */}
      <div className="flex items-center justify-center sm:justify-start gap-6 md:gap-10 flex-wrap">
        <div>
          <p className="text-[9px] text-stone-500 font-bold tracking-[0.2em] uppercase mb-0.5">0 - 100 KM/H</p>
          <p className="text-lg md:text-xl font-black tracking-tight text-white">3.2 <span className="text-xs font-normal text-stone-500">SEC</span></p>
        </div>
        <div className="w-[1px] h-6 bg-white/10" />
        <div>
          <p className="text-[9px] text-stone-500 font-bold tracking-[0.2em] uppercase mb-0.5">TOP SPEED</p>
          <p className="text-lg md:text-xl font-black tracking-tight text-white">296 <span className="text-xs font-normal text-stone-500">KM/H</span></p>
        </div>
        <div className="w-[1px] h-6 bg-white/10" />
        <div>
          <p className="text-[9px] text-stone-500 font-bold tracking-[0.2em] uppercase mb-0.5">POWER</p>
          <p className="text-lg md:text-xl font-black tracking-tight text-white">518 <span className="text-xs font-normal text-stone-500">HP</span></p>
        </div>
      </div>

      {/* EXTERIOR COLOR SELECTION */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-white/5 sm:border-none pt-3 sm:pt-0">
        <div className="text-left sm:text-right">
          <p className="text-[9px] text-stone-500 font-bold tracking-[0.15em] uppercase mb-0.5">EXTERIOR PAINT</p>
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider transition-all duration-300">
            {colors.find(c => c.id === activeColor)?.name}
          </p>
        </div>

        {/* COLOR DOTS */}
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setActiveColor(color.id)}
              className="w-7 h-7 rounded-full border-2 transition-all duration-300 hover:scale-110 relative"
              style={{
                backgroundColor: color.hex,
                borderColor: activeColor === color.id ? '#FFFFFF' : 'rgba(255,255,255,0.2)'
              }}
              title={color.name}
            >
              {activeColor === color.id && (
                <span className="w-1 h-1 rounded-full bg-cyan-400 absolute -bottom-2 left-1/2 -translate-x-1/2" />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}