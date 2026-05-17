import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ConsultationPage() {
    const [selectedService, setSelectedService] = useState('wrap');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const services = [
        { id: 'wrap', name: 'Premium Vinyl Wrapping' },
        { id: 'aero', name: 'Carbon Fiber & Body Styling' },
        { id: 'tuning', name: 'Stage Performance Tuning' },
        { id: 'full', name: 'Full Bespoke Transformation' },
    ];

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans overflow-x-hidden relative selection:bg-cyan-500 selection:text-black">

            {/* BACKGROUND GRAPHIC GLOW */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-20 relative z-10">

                {/* PREMIUM HEADER SECTION */}
                <div className="mb-16 border-b border-white/5 pb-10">
                    <span className="text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-2 block animate-pulse">
                        VIP BRIEFING
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                        BOOK A CONSULTATION<span className="text-cyan-500">.</span>
                    </h1>
                    <p className="text-stone-400 text-xs md:text-sm max-w-md leading-relaxed font-medium tracking-wide mt-4">
                        Schedule a private, one-on-one session with our master tuners and 3D visual designers to architect your next automotive build.
                    </p>
                </div>

                {/* INTERACTIVE SPLIT BOOKING LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT SIDE: STUDIO INFO & DIRECTIVES (Takes 5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3">01 / THE PIPELINE</h3>
                            <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-4">
                                During your session, we will import your car model into our virtual engine, test various wrap textures in simulated studio lighting, and plot exact horsepower configurations.
                            </p>
                            <div className="text-stone-500 text-[11px] font-mono font-semibold">
                                [ LOCATION: COLOMBO HQ / VIRTUAL ONLINE ]
                            </div>
                        </div>

                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-3">02 / REQUIREMENTS</h3>
                            <ul className="text-stone-400 text-xs flex flex-col gap-2.5 list-inside list-disc">
                                <li>Current exterior vehicle photographs (high-res preferred).</li>
                                <li>Existing factory performance data sheets if tuned previously.</li>
                                <li>Clear artistic vision or baseline references for wrapping projects.</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT SIDE: LUXURY INTERACTIVE BOOKING FORM (Takes 7 Cols) */}
                    <div className="lg:col-span-7">
                        <div className="bg-gradient-to-br from-stone-900/40 to-black/80 border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative">

                            {submitted ? (
                                <div className="py-20 text-center animate-fade-in">
                                    <div className="w-12 h-12 bg-cyan-950 border border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 text-lg font-black">
                                        ✓
                                    </div>
                                    <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">Session Reserved</h3>
                                    <p className="text-stone-400 text-xs max-w-sm mx-auto leading-relaxed">
                                        Your luxury build briefing sheet has been locked into our database. Our customization secretary will call you shortly to confirm the gateway clearance.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                    {/* Row 1: Vehicle & Model */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">VEHICLE BRAND & MODEL</label>
                                            <input type="text" placeholder="E.G., NISSAN GT-R R35" required className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-wider font-semibold rounded-lg outline-none transition-all duration-300" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">YEAR OF MANUFACTURE</label>
                                            <input type="text" placeholder="E.G., 2022" required className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-wider font-semibold rounded-lg outline-none transition-all duration-300" />
                                        </div>
                                    </div>

                                    {/* Row 2: Service Selector Buttons */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">CHOOSE PRIMARY MODIFICATION TARGET</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {services.map((s) => (
                                                <button
                                                    key={s.id}
                                                    type="button"
                                                    onClick={() => setSelectedService(s.id)}
                                                    className={`p-3.5 text-left text-xs font-bold tracking-wider uppercase border rounded-lg transition-all duration-300 ${selectedService === s.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'bg-white/[0.02] border-white/5 text-stone-400 hover:border-white/20'}`}
                                                >
                                                    {s.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Row 3: Date & Time Selectors */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">PREFERRED BRIEFING DATE</label>
                                            <input type="date" required className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase font-semibold rounded-lg outline-none transition-all duration-300 [color-scheme:dark]" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">PREFERRED TIME SLOT</label>
                                            <select required className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-stone-300 font-semibold rounded-lg outline-none transition-all duration-300">
                                                <option value="morning" className="bg-[#0f0f0f] text-white">MORNING (09:00 AM - 12:00 PM)</option>
                                                <option value="afternoon" className="bg-[#0f0f0f] text-white">AFTERNOON (01:00 PM - 04:00 PM)</option>
                                                <option value="evening" className="bg-[#0f0f0f] text-white">EVENING (05:00 PM - 08:00 PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Client Phone Number */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">CONTACT PHONE NUMBER</label>
                                        <input type="tel" placeholder="YOUR PHONE NUMBER" required className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-widest font-semibold rounded-lg outline-none transition-all duration-300" />
                                    </div>

                                    {/* Submit Action button */}
                                    <button type="submit" className="bg-white hover:bg-cyan-500 text-black hover:text-white font-black text-xs tracking-[0.2em] uppercase py-4 rounded-lg transition-all duration-300 shadow-xl mt-2">
                                        Request Secure Booking Clearance →
                                    </button>

                                </form>
                            )}

                        </div>
                    </div>

                </div>

                {/* BACK TO MAIN OVERVIEW CANVASES */}
                <div className="mt-20 text-center border-t border-white/5 pt-12">
                    <Link to="/" className="border border-white/10 hover:border-cyan-500 bg-white/[0.02] hover:bg-cyan-500 text-stone-300 hover:text-white text-[10px] font-black tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 inline-block">
                        ← BACK TO 3D CUSTOMIZER STUDIO
                    </Link>
                </div>

            </div>
        </div>
    );
}