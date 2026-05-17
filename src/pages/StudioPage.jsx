import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function StudioPage() {
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    // State to track the currently active image index inside the modal slider
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            setCurrentImgIndex(0); // Reset image slider to first image when opening a new build
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    // Premium Project Array with Multi-Angle Local Images
    const projects = [
        {
            id: 1,
            title: "Nissan GT-R R35",
            edition: "Godzilla Black Edition",
            category: "Full Carbon Aerodynamics & Stage 3 Performance",
            specs: ["720 HP / 850 NM", "Liberty Walk V2 Widebody", "Custom Satin Carbon Wrap", "Fi EXHAUST System"],
            image: "/assets/images/gtr.jpg", // Main cover image used in the archive page

            // Multi-angle slider image gallery for the dynamic left-side popup gallery
            images: [
                "/assets/images/gtr.jpg",
                "https://images.unsplash.com/photo-1707011689255-006f1d244919?q=80&w=800&auto=format&fit=crop", // Angle 2
                "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop"  // Angle 3
            ],
            fullDetails: {
                engine: "VR38DETT 3.8L Twin-Turbo V6, Stage 3 Custom Map, Upgraded Intercoolers & Fuel Pumps.",
                exhaust: "Frequency Intelligent (Fi EXHAUST) Full Titanium Valvetronic System with Carbon Tips.",
                suspension: "KW Automotive V3 Clubsport Coilovers with Hydraulic Lift System (HLS).",
                wheels: "20\" Forged Rohana Wheels wrapped in Michelin Pilot Sport 4S tires."
            }
        },
        {
            id: 2,
            title: "Toyota Supra MK5",
            edition: "Hyperwides Tuning",
            category: "Track-Ready Spec & Custom Exhaust Alignment",
            specs: ["550 HP / 680 NM", "Akrapovič Titanium Slip-On", "Forged Carbon Fiber Hood", "HRE Performance Rims"],
            image: "/assets/images/supra.jpg",
            images: [
                "/assets/images/supra.jpg",
                "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop"
            ],
            fullDetails: {
                engine: "B58 3.0L Inline-6, Pure750 Upgraded Turbo, Stage 2 ECU & TCU Tune.",
                exhaust: "Akrapovič Evolution Line Titanium Exhaust System with Evolution Link Pipe.",
                suspension: "H&R Adjustable Lowering Springs with recalibrated adaptive damper control.",
                wheels: "19\" HRE Performance Forged Monoblok Wheels in Satin Black."
            }
        },
        {
            id: 3,
            title: "Defender 110",
            edition: "Urban Rogue Edition",
            category: "V8 Bespoke Stealth Customization",
            specs: ["Urban Automotive Widebody", "Satin Matte Black Wrap", "22\" Forged Gloss Wheels", "Brembo High-Performance Brakes"],
            image: "/assets/images/defender.jpg",
            images: [
                "/assets/images/defender.jpg",
                "https://images.unsplash.com/photo-1649257694931-1e2b8109bf55?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop"
            ],
            fullDetails: {
                engine: "5.0L Supercharged V8, Bespoke Performance Exhaust, Custom Air Intake.",
                exhaust: "Millbank Sport High-Flow Exhaust System with Quad Matte Black Tips.",
                suspension: "Electronic Air Suspension recalibrated with 2-inch sport lowering profile.",
                wheels: "22\" Urban Automotive Forged Gloss Black Alloy Wheels."
            }
        }
    ];

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans overflow-x-hidden relative selection:bg-cyan-500 selection:text-black">

            {/* BACKGROUND GRAPHIC GLOW */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-20 relative z-10">

                {/* PREMIUM HEADER SECTION */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                    <div>
                        <span className="text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-2 block">
                            BROOMLK ARCHIVE
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            THE MASTERPIECES<span className="text-cyan-500">.</span>
                        </h1>
                    </div>
                    <p className="text-stone-400 text-xs md:text-sm max-w-sm leading-relaxed font-medium tracking-wide">
                        A selective showcase of high-end builds fully modified, wrapped, and engineered within our elite virtual garage pipeline.
                    </p>
                </div>

                {/* ARCHIVE GRID ROWS */}
                <div className="flex flex-col gap-12">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setSelectedProject(project)}
                            className="w-full h-auto lg:h-[450px] bg-gradient-to-r from-black/80 to-stone-900/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_30px_70px_rgba(0,0,0,0.9)] transition-all duration-500 relative group cursor-pointer"
                            style={{
                                borderColor: hoveredId === project.id ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.05)',
                                boxShadow: hoveredId === project.id ? '0 25px 60px -15px rgba(6,182,212,0.15)' : '0 30px 70px rgba(0,0,0,0.9)'
                            }}
                        >
                            {/* >>> 🚀 MAIN CARD IMAGE: NOW UPDATED TO object-contain FOR FULL INTEGRAL DISPLAY */}
                            <div className="w-full lg:w-[55%] h-64 lg:h-full relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-contain transition-transform duration-1000 ease-out group-hover:scale-102 filter grayscale-[15%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>

                            <div className="w-full lg:w-[45%] p-8 md:p-12 flex flex-col justify-between bg-black/30 backdrop-blur-3xl relative">
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <span className="text-[10px] text-cyan-400 font-extrabold tracking-[0.25em] uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-md">
                                            {project.edition}
                                        </span>
                                        <span className="text-stone-600 text-xs font-mono font-bold tracking-widest">
                                            [ 0{project.id} // BUILD ]
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                        {project.title}
                                    </h2>
                                    <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-6">
                                        {project.category}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.specs.map((spec, index) => (
                                            <span key={index} className="text-[10px] font-bold text-stone-300 border border-white/10 bg-white/[0.02] px-3 py-2 rounded-lg">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 lg:mt-0 border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-stone-500">
                                    <span>SPECIFICATION VERIFIED</span>
                                    <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                                        VIEW PROJECT →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🚀 FLOATING OVERLAY GRID BOX POPUP (DOUBLE-SIDED SCREEN INTERACTIVE CENTER BOX) */}
                {selectedProject && (
                    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 pointer-events-auto">

                        {/* FLOATING CENTRAL SPEC CONTAINER SHEET (BEAUTIFULLY SPACED INTRODUCED ROUNDED CONTAINER) */}
                        <div className="w-full max-w-5xl h-auto md:h-[580px] bg-[#090909]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.95)] flex flex-col md:flex-row relative">

                            {/* LEFT SIDE: DYNAMIC CAR IMAGE SLIDER (UPDATED TO object-contain FOR FULL NO-CROP VIEW) */}
                            <div className="w-full md:w-[50%] h-64 md:h-full relative bg-[#0c0c0c] flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 p-4 select-none">
                                <img
                                    src={selectedProject.images[currentImgIndex]}
                                    alt=""
                                    className="w-full h-full object-contain transition-all duration-500 filter contrast-[105%]"
                                />

                                {/* Soft cinematic ambient studio shading overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

                                {/* DYNAMIC CAROUSEL DOT INTERACTIVE NAVIGATION TABS */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                                    {selectedProject.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImgIndex(idx)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${currentImgIndex === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                                            title={`View Angle ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Swipe Direction Hint indicators on image box */}
                                <div className="absolute top-4 left-4 text-[9px] font-bold font-mono text-cyan-400 tracking-wider uppercase bg-black/50 border border-cyan-500/20 px-2 py-0.5 rounded">
                                    ANGLE {currentImgIndex + 1} / 03
                                </div>
                            </div>

                            {/* RIGHT SIDE: PREMIUM VERTICAL SPECIFICATION BLUEPRINT PACKS */}
                            <div className="w-full md:w-[50%] p-6 md:p-10 flex flex-col justify-between overflow-y-auto bg-black/40 relative">

                                {/* Top content wrap */}
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <span className="text-[9px] text-cyan-400 font-extrabold tracking-[0.2em] uppercase">
                                            {selectedProject.edition}
                                        </span>

                                        {/* CRITICAL OVERLAP FIX: CLOSE BUTTON MOVED INSIDE CONTENT FLOW RATHER THAN SCREEN EDGES */}
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="border border-white/10 hover:border-red-500 bg-white/5 hover:bg-red-500/10 text-stone-400 hover:text-red-400 font-bold text-[9px] tracking-widest uppercase px-3 py-1.5 transition-all duration-300"
                                        >
                                            ✕ CLOSE
                                        </button>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight mb-6 border-b border-white/5 pb-4">
                                        {selectedProject.title} Blueprint
                                    </h3>

                                    {/* Internal Scroller list for tech sheet details */}
                                    <div className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[300px] scrollbar-thin">
                                        <div>
                                            <h4 className="font-extrabold text-cyan-500 uppercase tracking-widest text-[9px] mb-0.5">01 / POWERHOUSE SPEC</h4>
                                            <p className="text-stone-300 text-xs leading-relaxed font-medium">{selectedProject.fullDetails.engine}</p>
                                        </div>
                                        <div className="w-full h-[1px] bg-white/5" />
                                        <div>
                                            <h4 className="font-extrabold text-cyan-500 uppercase tracking-widest text-[9px] mb-0.5">02 / EXHAUST FLUIDITY</h4>
                                            <p className="text-stone-300 text-xs leading-relaxed font-medium">{selectedProject.fullDetails.exhaust}</p>
                                        </div>
                                        <div className="w-full h-[1px] bg-white/5" />
                                        <div>
                                            <h4 className="font-extrabold text-cyan-500 uppercase tracking-widest text-[9px] mb-0.5">03 / TRACK STABILITY</h4>
                                            <p className="text-stone-300 text-xs leading-relaxed font-medium">{selectedProject.fullDetails.suspension}</p>
                                        </div>
                                        <div className="w-full h-[1px] bg-white/5" />
                                        <div>
                                            <h4 className="font-extrabold text-cyan-500 uppercase tracking-widest text-[9px] mb-0.5">04 / FORGED ASSEMBLY</h4>
                                            <p className="text-stone-300 text-xs leading-relaxed font-medium">{selectedProject.fullDetails.wheels}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footnotes label inside modal box */}
                                <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-bold tracking-widest text-stone-500 uppercase flex justify-between items-center">
                                    <span>BROOMLK CUSTOMS DATA VERIFIED</span>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

                {/* BACK TO OVERVIEW CANVASES */}
                <div className="mt-20 text-center border-t border-white/5 pt-12">
                    <Link
                        to="/"
                        className="border border-white/10 hover:border-cyan-500 bg-white/[0.02] hover:bg-cyan-500 text-stone-300 hover:text-white text-[10px] font-black tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 inline-block"
                    >
                        ← BACK TO 3D CUSTOMIZER STUDIO
                    </Link>
                </div>
            </div>
        </div>
    );
}