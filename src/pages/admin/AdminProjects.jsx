import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Search, 
  Car, 
  Wrench, 
  User, 
  Sparkles, 
  Flame, 
  Gauge, 
  Clock, 
  X, 
  Layers, 
  Filter, 
  TrendingUp, 
  Eye 
} from 'lucide-react';

const INITIAL_PROJECTS = [
  { 
    id: 1, 
    name: 'Midnight Stealth GT-R', 
    level: 'Stage 3 Twin Turbo (1200 WHP)', 
    client: 'Hirun Wijesinghe', 
    color: 'Matte Satin Black', 
    power: '1200 WHP',
    acceleration: '2.1s (0-100 km/h)',
    exhaust: '122 dB Decat',
    specs: 'Custom ETS Turbo kit, Syvecs ECU, forged engine internals, carbon ceramic brake upgrades.',
    theme: 'cyan'
  },
  { 
    id: 2, 
    name: 'Porsche 911 GT3 Carbon Edition', 
    level: 'Full Carbon Aero & Titanium Exhaust', 
    client: 'Amila Perera', 
    color: 'Carbon Fiber / Acid Green', 
    power: '535 BHP',
    acceleration: '3.2s (0-100 km/h)',
    exhaust: '118 dB Valved',
    specs: 'Dundon Motorsports headers, full body dry-carbon replacement panel kit, BBS FI-R forged wheels.',
    theme: 'green'
  },
  { 
    id: 3, 
    name: 'Audi R8 V10 Decennium Supercharged', 
    level: 'VF Engineering Supercharger System', 
    client: 'Dilshan Senanayake', 
    color: 'Kemora Grey / Bronze Alloys', 
    power: '830 BHP',
    acceleration: '2.6s (0-100 km/h)',
    exhaust: '115 dB Screamer',
    specs: 'VF800 supercharger kit, custom chargecooler system, KW V4 coilovers, titanium X-pipe exhaust system.',
    theme: 'gold'
  },
  { 
    id: 4, 
    name: 'Liberty Walk Huracán STO', 
    level: 'Bespoke Widebody & AirRex Suspension', 
    client: 'Suresh Rajapakse', 
    color: 'Blu Cepheus (Electric Cyan)', 
    power: '640 BHP',
    acceleration: '2.9s (0-100 km/h)',
    exhaust: '120 dB Capristo',
    specs: 'Liberty Walk Silhouette GT widebody kit, AirRex digital air suspension setup, custom wrap, ultra-wide LD97 forged wheels.',
    theme: 'cyan'
  },
  { 
    id: 5, 
    name: 'AMG GT Black Series Track Spec', 
    level: 'Full Aero Calibration & Roll Cage', 
    client: 'Menaka Jayasinghe', 
    color: 'Magma Beam Orange', 
    power: '730 BHP',
    acceleration: '2.8s (0-100 km/h)',
    exhaust: '112 dB Race Spec',
    specs: 'Weistec downpipes, custom telemetry logger, upgraded carbon bucket seats, carbon fiber safety cell.',
    theme: 'red'
  }
];

export default function AdminProjects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [themeFilter, setThemeFilter] = useState('ALL');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectLevel, setNewProjectLevel] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newPower, setNewPower] = useState('');
  const [newAcceleration, setNewAcceleration] = useState('');
  const [newExhaust, setNewExhaust] = useState('');
  const [newSpecs, setNewSpecs] = useState('');
  const [newTheme, setNewTheme] = useState('cyan');

  // SVG Geometric Wireframe backgrounds based on project color theme
  const getThemeBackground = (theme) => {
    switch (theme) {
      case 'green':
        return {
          gradient: 'from-emerald-950 via-zinc-900 to-black',
          lineColor: '#10b981',
          accentBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        };
      case 'red':
        return {
          gradient: 'from-red-950 via-zinc-900 to-black',
          lineColor: '#ef4444',
          accentBg: 'bg-red-500/10 text-red-400 border-red-500/30'
        };
      case 'gold':
        return {
          gradient: 'from-yellow-950 via-zinc-900 to-black',
          lineColor: '#eab308',
          accentBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
        };
      case 'cyan':
      default:
        return {
          gradient: 'from-cyan-950 via-zinc-900 to-black',
          lineColor: '#00C2FF',
          accentBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30'
        };
    }
  };

  // Delete project
  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to remove this project from the public showcase portfolio?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // Add project submission
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectName || !newProjectLevel || !newClient || !newColor) {
      alert('Please fill out all key project fields.');
      return;
    }

    const newProj = {
      id: Date.now(),
      name: newProjectName,
      level: newProjectLevel,
      client: newClient,
      color: newColor,
      power: newPower || 'Stock',
      acceleration: newAcceleration || 'TBD',
      exhaust: newExhaust || 'TBD',
      specs: newSpecs || 'Bespoke custom work completed at BROOMLK Customs.',
      theme: newTheme
    };

    setProjects(prev => [newProj, ...prev]);
    setIsModalOpen(false);

    // Reset Form
    setNewProjectName('');
    setNewProjectLevel('');
    setNewClient('');
    setNewColor('');
    setNewPower('');
    setNewAcceleration('');
    setNewExhaust('');
    setNewSpecs('');
    setNewTheme('cyan');
  };

  // Searching and filtering
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = themeFilter === 'ALL' || p.theme.toUpperCase() === themeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, themeFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20 shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              SHOWCASE MATRIX
            </span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">
            PROJECT SHOWCASE
          </h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">
            Curate and manage our elite showcase portfolio of customized, track-tuned supercars.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={3} />
          Add New Project
        </button>
      </div>

      {/* FILTER & STATS CONTROL BAR */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search projects, levels or clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-black/40 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all duration-300"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter size={12} />
            Theme Accent:
          </span>
          {['ALL', 'CYAN', 'GREEN', 'GOLD', 'RED'].map((filter) => {
            const isActive = themeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setThemeFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-extrabold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30 shadow-[0_0_12px_rgba(0,194,255,0.1)]'
                    : 'bg-white/5 text-stone-400 border border-transparent hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

      </div>

      {/* PORTFOLIO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const config = getThemeBackground(project.theme);
            
            return (
              <div 
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,194,255,0.25)] transition-all duration-500 flex flex-col relative"
              >
                
                {/* DYNAMIC HOVER ACTION OVERLAY (NEON RED DELETE) */}
                <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    title="Remove Project from Showcase"
                    className="p-2.5 rounded-lg bg-black/80 border border-red-500/30 hover:border-red-500 text-red-500 hover:bg-red-500/20 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 flex items-center justify-center"
                  >
                    <Trash2 size={15} strokeWidth={2.5} />
                  </button>
                </div>

                {/* VISUAL SILHOUETTE CARD HEADER */}
                <div className={`h-44 bg-gradient-to-br ${config.gradient} border-b border-white/10 relative overflow-hidden flex items-center justify-center p-6`}>
                  
                  {/* Cyber Grid SVG Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,194,255,0.12),rgba(0,0,0,0))]"></div>
                  
                  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${project.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
                  </svg>

                  {/* Geometric Wireframe Silhouette */}
                  <svg 
                    className="w-40 h-20 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(0,194,255,0.15)]" 
                    viewBox="0 0 100 50" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M 5 35 Q 8 20 20 18 Q 30 18 35 12 Q 40 8 55 8 Q 72 8 80 18 Q 92 20 95 35 Z" 
                      stroke={config.lineColor} 
                      strokeWidth="1" 
                      strokeDasharray="2,2" 
                    />
                    <path 
                      d="M 2 35 L 98 35" 
                      stroke={config.lineColor} 
                      strokeWidth="1.5" 
                    />
                    <circle cx="25" cy="35" r="7" stroke={config.lineColor} strokeWidth="1" fill="black" />
                    <circle cx="25" cy="35" r="3" fill={config.lineColor} />
                    <circle cx="75" cy="35" r="7" stroke={config.lineColor} strokeWidth="1" fill="black" />
                    <circle cx="75" cy="35" r="3" fill={config.lineColor} />
                    
                    {/* Futuristic HUD lines */}
                    <line x1="10" y1="12" x2="30" y2="12" stroke={config.lineColor} strokeWidth="0.5" opacity="0.5" />
                    <line x1="70" y1="12" x2="90" y2="12" stroke={config.lineColor} strokeWidth="0.5" opacity="0.5" />
                  </svg>

                  {/* Level Tag Overlay */}
                  <div className="absolute bottom-3 left-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md ${config.accentBg}`}>
                      {project.level}
                    </span>
                  </div>

                  {/* Diagnostics Overlay Indicator */}
                  <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[9px] font-mono text-stone-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse"></span>
                    SYS OK // ID-{project.id}
                  </div>

                </div>

                {/* PROJECT SPECS & DETAILS */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#00C2FF] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-semibold leading-relaxed mt-2 line-clamp-2">
                      {project.specs}
                    </p>
                  </div>

                  {/* Dynamic Tuning Telemetry Specs */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    <div className="bg-black/30 border border-white/5 p-2 rounded text-center">
                      <span className="text-[8px] text-stone-500 block uppercase tracking-wider font-mono font-bold mb-0.5">Horsepower</span>
                      <span className="font-mono font-black text-white text-xs flex items-center justify-center gap-0.5">
                        <Flame size={10} className="text-red-400" />
                        {project.power}
                      </span>
                    </div>
                    <div className="bg-black/30 border border-white/5 p-2 rounded text-center">
                      <span className="text-[8px] text-stone-500 block uppercase tracking-wider font-mono font-bold mb-0.5">0-100 KM/H</span>
                      <span className="font-mono font-black text-[#00C2FF] text-xs flex items-center justify-center gap-0.5">
                        <Clock size={10} className="text-[#00C2FF]" />
                        {project.acceleration}
                      </span>
                    </div>
                    <div className="bg-black/30 border border-white/5 p-2 rounded text-center">
                      <span className="text-[8px] text-stone-500 block uppercase tracking-wider font-mono font-bold mb-0.5">Exhaust dB</span>
                      <span className="font-mono font-black text-white text-xs flex items-center justify-center gap-0.5">
                        <Gauge size={10} className="text-yellow-400" />
                        {project.exhaust}
                      </span>
                    </div>
                  </div>

                  {/* Meta Details Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <div>
                      <p className="text-[8px] font-bold text-stone-500 uppercase tracking-widest">Client</p>
                      <p className="font-bold text-stone-300 flex items-center gap-1 mt-0.5">
                        <User size={12} className="text-stone-500" />
                        {project.client}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-bold text-stone-500 uppercase tracking-widest">Exterior Hue</p>
                      <p className="font-bold text-stone-300 flex items-center gap-1 justify-end mt-0.5">
                        <span className={`w-2.5 h-2.5 rounded-full border border-white/10 ${
                          project.theme === 'green' ? 'bg-emerald-500' :
                          project.theme === 'red' ? 'bg-red-500' :
                          project.theme === 'gold' ? 'bg-yellow-500' : 'bg-cyan-500'
                        }`}></span>
                        {project.color}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-600">
                <Car size={20} />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">No Projects Found</h3>
              <p className="text-xs text-stone-500 leading-normal font-medium">
                Try modifying your query or theme filter settings to locate matching supercar builds.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CREATE NEW PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Dialog Container */}
          <div className="relative w-full max-w-2xl bg-black/95 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,194,255,0.15)] z-10 max-h-[90vh] flex flex-col animate-in scale-in duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-[#00C2FF]" />
                  Curate New Supercar Build
                </h3>
                <p className="text-stone-400 text-[11px] font-medium tracking-wide">Publish a customized supercar project parameters into the BROOMLK showcase.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-500 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleAddProject} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Build details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <Car size={12} className="text-stone-500" />
                    Build / Project Title *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Midnight Stealth GT-R"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <Wrench size={12} className="text-stone-500" />
                    Modification Level *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Stage 3 Twin Turbo (1200 WHP)"
                    value={newProjectLevel}
                    onChange={(e) => setNewProjectLevel(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>
              </div>

              {/* Client & Hue */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <User size={12} className="text-stone-500" />
                    Client VIP Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Hirun Wijesinghe"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                    Exterior Paint/Wrap *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Matte Satin Black"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>
              </div>

              {/* Specifications telemetry */}
              <div>
                <span className="block text-[10px] font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
                  Vehicle Performance Telemetry Specs
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Max Power Output</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 1200 WHP"
                      value={newPower}
                      onChange={(e) => setNewPower(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">0-100 km/h Launch</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2.1s"
                      value={newAcceleration}
                      onChange={(e) => setNewAcceleration(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Exhaust Loudness</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 122 dB Decat"
                      value={newExhaust}
                      onChange={(e) => setNewExhaust(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Theme and description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                    Visual Accent Theme
                  </label>
                  <select 
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  >
                    <option value="cyan" className="bg-[#050505] text-[#00C2FF]">CYAN TELEMETRY</option>
                    <option value="green" className="bg-[#050505] text-emerald-400">TOXIC GREEN</option>
                    <option value="gold" className="bg-[#050505] text-yellow-400">GOLD CARBON</option>
                    <option value="red" className="bg-[#050505] text-red-400">INFERNO RED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                    Bespoke Parts & Build Log
                  </label>
                  <textarea 
                    placeholder="Provide details about the custom engine mods, wrap specs, tuning chips, and suspension elements..."
                    rows="3"
                    value={newSpecs}
                    onChange={(e) => setNewSpecs(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-lg bg-[#00C2FF] hover:bg-[#00a3d6] text-black text-xs font-extrabold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                >
                  Publish Build
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
