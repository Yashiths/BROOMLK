import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Trash2, 
  Search, 
  Sparkles, 
  X, 
  Image as ImageIcon,
  Layers,
  FileText,
  UploadCloud,
  Loader2,
  Gauge,
  Timer,
  Volume2,
  ShieldCheck
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/projects'; 

// === CLOUDINARY CONFIGURATION MATRIX ===
const CLOUDINARY_CLOUD_NAME = 'dg4pvadcb'; 
const CLOUDINARY_UPLOAD_PRESET = 'broomlk_preset'; // Place your unsigned upload preset name here

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- Core Mechanical Specification Form States ---
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newHorsepower, setNewHorsepower] = useState('');
  const [newZeroToHundred, setNewZeroToHundred] = useState('');
  const [newExhaustDb, setNewExhaustDb] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_BASE_URL);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects from engine:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (CLOUDINARY_UPLOAD_PRESET === 'YOUR_UNSIGNED_PRESET_NAME') {
      alert("Configuration Missing: Please update the CLOUDINARY_UPLOAD_PRESET constant with your actual unsigned preset name.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setSelectedImage(response.data.secure_url);
    } catch (error) {
      console.error("Cloudinary Cloud Sync Failure:", error);
      alert("Failed to sync image payload to Cloudinary. Verify that your Upload Preset is set to 'Unsigned' in Cloudinary Settings.");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to purge this build matrix from the database?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setProjects(prev => prev.filter(p => p._id !== id));
      } catch (error) {
        console.error("Error deleting project configuration:", error);
      }
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    
    if (!newName || !newBrand || !newHorsepower || !newZeroToHundred || !newExhaustDb || !newDescription) {
      alert('Please fill out all required fields to register this supercar build.');
      return;
    }

    // Comprehensive practical payload structure passing directly to backend API
    const projectData = {
      name: newName,
      brand: newBrand,
      hp: newHorsepower,
      Launch: newZeroToHundred,
      sound: newExhaustDb,
      description: newDescription,
      image: selectedImage || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600'
    };

    try {
      const response = await axios.post(API_BASE_URL, projectData);
      setProjects(prev => [response.data, ...prev]);
      setIsModalOpen(false);

      // Complete State Reset
      setNewName('');
      setNewBrand('');
      setNewHorsepower('');
      setNewZeroToHundred('');
      setNewExhaustDb('');
      setNewDescription('');
      setSelectedImage('');
    } catch (error) {
      console.error("Error saving validation parameters to DB:", error.response?.data || error);
      alert(`Failed to publish project: ${error.response?.data?.message || 'Check database validation fields inside terminal'}`);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const searchLower = searchQuery.toLowerCase();
      
      const nameMatch = p.name?.toLowerCase().includes(searchLower) || false;
      const brandMatch = p.brand?.toLowerCase().includes(searchLower) || false;
      const descMatch = p.description?.toLowerCase().includes(searchLower) || false;
      
      return nameMatch || brandMatch || descMatch;
    });
  }, [projects, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 select-none text-white">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20">
              SHOWCASE MATRIX
            </span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight">
            PROJECT SHOWCASE
          </h1>
          <p className="text-stone-400 text-sm font-medium">
            Curate and manage our elite showcase portfolio of customized, track-tuned supercars.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 transform hover:scale-[1.02]"
        >
          <Plus size={16} strokeWidth={3} />
          Add New Project
        </button>
      </div>

      {/* Global Search Controller */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex items-center justify-between">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search projects by title, brand/manufacturer, specifications or parts configurations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-black/40 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-[#00C2FF]"
          />
        </div>
      </div>

      {/* Grid Showcase Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-stone-400 text-xs font-mono tracking-widest uppercase">
            Loading showcase matrix...
          </div>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const displayImg = project.image || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600';

            return (
              <div 
                key={project._id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,194,255,0.25)] transition-all duration-500 flex flex-col relative"
              >
                {/* Delete Trigger */}
                <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project._id);
                    }}
                    className="p-2.5 rounded-lg bg-black/80 border border-red-500/30 hover:border-red-500 text-red-500 hover:bg-red-500/20 transition-all duration-300"
                  >
                    <Trash2 size={15} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Performance Showcase Thumbnail */}
                <div className="h-44 border-b border-white/10 relative overflow-hidden flex items-center justify-center bg-zinc-950">
                  <img 
                    src={displayImg} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 z-10">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border backdrop-blur-md bg-cyan-500/10 text-cyan-400 border-cyan-400/30">
                      {project.brand}
                    </span>
                  </div>
                </div>

                {/* Specifications Metadata Card */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#00C2FF] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-semibold leading-relaxed mt-2 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Mechanical Layout Parameters Dashboard */}
                  <div className="grid grid-cols-3 gap-1 bg-black/40 p-2 rounded-xl border border-white/5 text-center text-mono">
                    <div className="flex flex-col justify-center py-1 border-r border-white/5">
                      <span className="text-[7px] font-black text-stone-500 uppercase tracking-wider flex items-center justify-center gap-0.5">
                        <Gauge size={8} /> HP
                      </span>
                      <span className="text-[9px] font-bold text-amber-400 mt-0.5 truncate px-0.5">{project.horsepower}</span>
                    </div>
                    <div className="flex flex-col justify-center py-1 border-r border-white/5">
                      <span className="text-[7px] font-black text-stone-500 uppercase tracking-wider flex items-center justify-center gap-0.5">
                        <Timer size={8} /> 0-100
                      </span>
                      <span className="text-[9px] font-bold text-cyan-400 mt-0.5 truncate px-0.5">{project.zeroToHundred}</span>
                    </div>
                    <div className="flex flex-col justify-center py-1">
                      <span className="text-[7px] font-black text-stone-500 uppercase tracking-wider flex items-center justify-center gap-0.5">
                        <Volume2 size={8} /> EXHAUST
                      </span>
                      <span className="text-[9px] font-bold text-red-400 mt-0.5 truncate px-0.5">{project.exhaustDb}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-500/80"><ShieldCheck size={10} /> ENGINE_SYNCED</span>
                    <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'LIVE'}</span>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-stone-500 text-xs font-semibold uppercase tracking-wider">
            No Supercar Builds Synced.
          </div>
        )}
      </div>

      {/* --- Pop-up Modal Form Component --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>

          <div className="relative w-full max-w-2xl bg-black/95 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,194,255,0.15)] z-10 max-h-[90vh] flex flex-col animate-in scale-in duration-300">
            
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-[#00C2FF]" />
                  Curate New Supercar Build
                </h3>
                <p className="text-stone-400 text-[10px] uppercase tracking-wider mt-0.5">Enter vehicle parameters directly into the BROOMLK showcase engine.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-stone-500 hover:text-white rounded-lg bg-white/5">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="flex-1 overflow-y-auto p-6 space-y-5 bg-black">
              
              {/* Image Cloud Upload Block */}
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest">
                  Project Supercar Image
                </label>
                <div className="h-44 border border-white/10 rounded-xl overflow-hidden relative bg-zinc-900 flex items-center justify-center">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Uploaded Matrix" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center space-y-2 p-4">
                      <div className="mx-auto w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-stone-400">
                        {isUploading ? <Loader2 size={18} className="animate-spin text-[#00C2FF]" /> : <UploadCloud size={18} />}
                      </div>
                      <p className="text-[11px] text-stone-400 font-medium">
                        {isUploading ? "Uploading matrix to cloud..." : "No image uploaded yet"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    id="cloudinary-file-picker"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <label 
                    htmlFor="cloudinary-file-picker"
                    className={`w-full flex items-center justify-center gap-2 border border-dashed rounded-lg py-3 text-xs uppercase tracking-widest font-bold cursor-pointer transition-all duration-300 ${
                      isUploading 
                        ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400 cursor-not-allowed' 
                        : 'border-white/20 bg-zinc-900/40 hover:border-[#00C2FF] hover:text-[#00C2FF] text-stone-400'
                    }`}
                  >
                    <ImageIcon size={14} />
                    {isUploading ? "Processing Cloud Sync..." : "Choose Local Image File"}
                  </label>
                </div>
              </div>

              {/* Title & Brand Side-by-Side Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest">
                    Build / Project Title *
                  </label>
                  <input 
                    type="text" required placeholder="e.g. Porsche 911 GT3 RS" value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest">
                    Brand / Manufacturer *
                  </label>
                  <input 
                    type="text" required placeholder="e.g. Porsche" value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              {/* Mechanical Performance Sub-Matrix */}
              <div className="border border-white/5 bg-zinc-950/50 rounded-xl p-4 space-y-4">
                <span className="text-[10px] font-black text-[#00C2FF] tracking-wider uppercase block">
                  // Mechanical Performance Matrix
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black uppercase text-stone-500 tracking-wider">Horsepower *</label>
                    <input 
                      type="text" required placeholder="e.g. 520 WHP" value={newHorsepower}
                      onChange={(e) => setNewHorsepower(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black uppercase text-stone-500 tracking-wider">0-100 KM/H *</label>
                    <input 
                      type="text" required placeholder="e.g. 3.2s" value={newZeroToHundred}
                      onChange={(e) => setNewZeroToHundred(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black uppercase text-stone-500 tracking-wider">Exhaust dB *</label>
                    <input 
                      type="text" required placeholder="e.g. 118 dB Decat" value={newExhaustDb}
                      onChange={(e) => setNewExhaustDb(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Build Overview Text Box */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest flex items-center gap-1">
                  <FileText size={12} className="text-stone-500" /> Build Overview & Custom Parts Log *
                </label>
                <textarea 
                  required
                  placeholder="Describe full modifications history, custom rims, exhaust upgrade profile context..." 
                  rows="4" 
                  value={newDescription} 
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00C2FF] resize-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-stone-400 text-xs font-bold uppercase tracking-widest"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className={`px-5 py-2.5 rounded-lg text-black text-xs font-extrabold uppercase tracking-widest transition-all ${
                    isUploading 
                      ? 'bg-stone-600 cursor-not-allowed text-stone-400' 
                      : 'bg-[#00C2FF] hover:bg-[#00a3d6] shadow-[0_0_15_rgba(0,194,255,0.3)]'
                  }`}
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