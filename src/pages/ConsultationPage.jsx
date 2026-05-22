import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function ConsultationPage() {
    const [selectedService, setSelectedService] = useState('wrap');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form inputs state
    const [clientName, setClientName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [manufactureYear, setManufactureYear] = useState('');
    const [briefingDate, setBriefingDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('morning');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [customServiceText, setCustomServiceText] = useState('');

    // Dynamic date restriction (Get today's date in YYYY-MM-DD format)
    const todayDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        { id: 'wrap', name: 'Premium Vinyl Wrapping' },
        { id: 'aero', name: 'Carbon Fiber & Body Styling' },
        { id: 'tuning', name: 'Stage Performance Tuning' },
        { id: 'full', name: 'Full Bespoke Transformation' },
        { id: 'custom', name: 'Custom Build (Specify Below)' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Determine final service name based on user choice
        let serviceDisplayName = 'Custom Setup';
        if (selectedService === 'custom') {
            serviceDisplayName = customServiceText ? `CUSTOM: ${customServiceText}` : 'Bespoke Custom Build';
        } else {
            const activeServiceObj = services.find(s => s.id === selectedService);
            if (activeServiceObj) serviceDisplayName = activeServiceObj.name;
        }

        const fullVehicleSpecs = `${carModel.toUpperCase()} (${manufactureYear})`;
        const formattedTimeValue = timeSlot.toUpperCase();

        const bookingPayload = {
            client: clientName,
            car: fullVehicleSpecs,
            date: briefingDate,
            time: formattedTimeValue,
            phone: phoneNumber,
            email: emailAddress,
            status: 'PENDING',
            services: [serviceDisplayName],
            specs: {
                hpGain: selectedService === 'tuning' || selectedService === 'full' ? 'TBD' : 'N/A',
                fuelSystem: 'Standard Petrol',
                assignedTech: 'Unassigned',
                notes: `Year: ${manufactureYear}. Chosen path: ${serviceDisplayName}. Registered via customer portal.`
            }
        };

        try {
            await axios.post('http://localhost:5000/api/bookings', bookingPayload);
            setSubmitted(true);
            setLoading(false);

            // Clear form inputs
            setClientName('');
            setCarModel('');
            setManufactureYear('');
            setBriefingDate('');
            setTimeSlot('morning');
            setPhoneNumber('');
            setEmailAddress('');
            setCustomServiceText('');

            setTimeout(() => setSubmitted(false), 8000);
        } catch (error) {
            console.error("Transmission breakdown during validation staging:", error);
            alert(error.response?.data?.error || "Connection failure. Secure database queue could not be registered.");
            setLoading(false);
        }
    };

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

                    {/* LEFT SIDE: STUDIO INFO & DIRECTIVES */}
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

                    {/* RIGHT SIDE: LUXURY INTERACTIVE BOOKING FORM */}
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

                                    {/* Personal Identity Coordinates */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">FULL NAME</label>
                                            <input 
                                                type="text" 
                                                placeholder="YOUR FULL NAME" 
                                                required 
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}
                                                className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-wider font-semibold rounded-lg outline-none transition-all duration-300" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">EMAIL ADDRESS</label>
                                            <input 
                                                type="email" 
                                                placeholder="YOUR EMAIL COORDINATES" 
                                                required 
                                                value={emailAddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white tracking-wider font-semibold rounded-lg outline-none transition-all duration-300" 
                                            />
                                        </div>
                                    </div>

                                    {/* Vehicle Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">VEHICLE BRAND & MODEL</label>
                                            <input 
                                                type="text" 
                                                placeholder="E.G., NISSAN GT-R R35" 
                                                required 
                                                value={carModel}
                                                onChange={(e) => setCarModel(e.target.value)}
                                                className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-wider font-semibold rounded-lg outline-none transition-all duration-300" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">YEAR OF MANUFACTURE</label>
                                            <input 
                                                type="text" 
                                                placeholder="E.G., 2022" 
                                                required 
                                                value={manufactureYear}
                                                onChange={(e) => setManufactureYear(e.target.value)}
                                                className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-wider font-semibold rounded-lg outline-none transition-all duration-300" 
                                            />
                                        </div>
                                    </div>

                                    {/* Service Selector Buttons */}
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

                                    {/* Dynamic Custom Service Text Area */}
                                    {selectedService === 'custom' && (
                                        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="text-[9px] font-bold text-[#00C2FF] tracking-widest uppercase">SPECIFY YOUR CUSTOM CONCEPT MODIFICATION</label>
                                            <textarea 
                                                rows="3"
                                                required
                                                placeholder="E.G., Custom widebody kit fabrication with center-exit exhaust configuration and air-suspension integration..."
                                                value={customServiceText}
                                                onChange={(e) => setCustomServiceText(e.target.value)}
                                                className="bg-black/40 border border-[#00C2FF]/30 focus:border-[#00C2FF] p-3.5 text-xs text-white font-medium rounded-lg outline-none transition-all duration-300 placeholder-stone-600 resize-none"
                                            />
                                        </div>
                                    )}

                                    {/* Date & Time Selectors */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">PREFERRED BRIEFING DATE</label>
                                            <input 
                                                type="date" 
                                                required 
                                                min={todayDate}
                                                value={briefingDate}
                                                onChange={(e) => setBriefingDate(e.target.value)}
                                                className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase font-semibold rounded-lg outline-none transition-all duration-300 [color-scheme:dark]" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">PREFERRED TIME SLOT</label>
                                            <select 
                                                required 
                                                value={timeSlot}
                                                onChange={(e) => setTimeSlot(e.target.value)}
                                                className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-stone-300 font-semibold rounded-lg outline-none transition-all duration-300"
                                            >
                                                <option value="morning" className="bg-[#0f0f0f] text-white">MORNING (09:00 AM - 12:00 PM)</option>
                                                <option value="afternoon" className="bg-[#0f0f0f] text-white">AFTERNOON (01:00 PM - 04:00 PM)</option>
                                                <option value="evening" className="bg-[#0f0f0f] text-white">EVENING (05:00 PM - 08:00 PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Contact Phone Number */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[9px] font-bold text-stone-500 tracking-widest uppercase">CONTACT PHONE NUMBER</label>
                                        <input 
                                            type="tel" 
                                        placeholder="E.G., 077**" 
                                            required 
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="bg-white/5 border border-white/10 focus:border-cyan-500 p-3.5 text-xs text-white uppercase tracking-widest font-semibold rounded-lg outline-none transition-all duration-300" 
                                        />
                                    </div>

                                    {/* Submit Action button */}
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="bg-white hover:bg-cyan-500 text-black hover:text-white font-black text-xs tracking-[0.2em] uppercase py-4 rounded-lg transition-all duration-300 shadow-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Processing Transmission...' : 'Request Secure Booking Clearance →'}
                                    </button>

                                </form>
                            )}

                        </div>
                    </div>

                </div>

                

            </div>
        </div>
    );
}