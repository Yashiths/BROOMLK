import React from 'react';
import { Plus, Image as ImageIcon, ExternalLink, Trash2 } from 'lucide-react';

const DUMMY_PROJECTS = [
  { id: 1, name: 'Porsche 911 GT3 RS', level: 'Stage 2 Custom', client: 'Ryan D.', color: 'Guards Red' },
  { id: 2, name: 'BMW M4 G82', level: 'Liberty Walk Widebody', client: 'David L.', color: 'Isle of Man Green' },
  { id: 3, name: 'Nissan GT-R R35', level: '1000HP Build', client: 'Jason K.', color: 'Bayside Blue' },
  { id: 4, name: 'Audi R8 V10 Plus', level: 'Twin Turbo System', client: 'Alex P.', color: 'Nardo Grey' },
  { id: 5, name: 'Mercedes AMG GT Black Series', level: 'Track Setup', client: 'Sarah M.', color: 'Magma Beam' },
  { id: 6, name: 'Lamborghini Huracan EVO', level: 'Aero Kit & Exhaust', client: 'Michael T.', color: 'Verde Mantis' },
];

export default function AdminProjects() {
  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-1">Project Showcase</h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">Curate your elite portfolio of completed builds.</p>
        </div>
        <button 
          className="bg-[#00C2FF] text-black hover:bg-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* GRID VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_PROJECTS.map((project) => (
          <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* IMAGE PLACEHOLDER */}
            <div className="h-48 bg-stone-900 border-b border-white/10 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
              
              <ImageIcon size={40} className="text-stone-700 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="h-8 w-8 bg-black/60 backdrop-blur-md rounded border border-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors">
                  <ExternalLink size={14} />
                </button>
                <button className="h-8 w-8 bg-black/60 backdrop-blur-md rounded border border-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="absolute bottom-3 left-4 z-20">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                  {project.level}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 truncate">{project.name}</h3>
              <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-0.5">Client</p>
                  <p className="text-sm font-medium text-stone-300">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-0.5">Color</p>
                  <p className="text-sm font-medium text-stone-300">{project.color}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
