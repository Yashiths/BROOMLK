import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // Unified state definition

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProduct]);

    // Real Ultra-Premium Modification Products Data Array
    const products = [
        {
            id: 1,
            name: "Akrapovič Evolution Exhaust",
            category: "exhaust",
            price: "LKR 2,450,000",
            tag: "PERFORMANCE",
            shortDesc: "Full Titanium Evolution Line Valvetronic Exhaust System.",
            image: "https://images.unsplash.com/photo-1615887110697-0819ec23465f?q=80&w=600&auto=format&fit=crop",
            compat: "Porsche 911 GT3 (992) / Turbo S",
            details: "Crafted entirely from proprietary high-grade titanium. Reduces overall vehicle weight by 11.5 kg while pumping an additional +18 HP and generating a deep, crisp race acoustics signature."
        },
        {
            id: 2,
            name: "Vossen HF-2 Forged Rims",
            category: "rims",
            price: "LKR 1,850,000 / Set",
            tag: "STANCE",
            shortDesc: "21\" Custom Forged Hybrid Series Luxury Wheels.",
            image: "https://images.unsplash.com/photo-1611245800160-2441a1ef722f?q=80&w=600&auto=format&fit=crop",
            compat: "Nissan GT-R R35 / Supra MK5 / Audi R8",
            details: "Custom tinted gloss black forged assembly designed for maximum concavity and elite brake caliper clearance. Engineered to handle extreme directional torque at high track speeds."
        },
        {
            id: 3,
            name: "Liberty Walk V2 Carbon Wing",
            category: "carbon",
            price: "LKR 1,200,000",
            tag: "AERO",
            shortDesc: "Bespoke Forged Carbon Fiber Aggressive Rear Spoiler.",
            image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
            compat: "Nissan GT-R R35 / Toyota Supra MK5",
            details: "Genuine 3K twill forged carbon weave coated with high-gloss anti-UV clear coat. Increases downforce by 22% at high velocities while giving that pure aggressive Godzilla styling posture."
        },
        {
            id: 4,
            name: "Eventuri Matte Carbon Intake",
            category: "performance",
            price: "LKR 680,000",
            tag: "POWER",
            shortDesc: "Patented High-Flow Cold Air Aerodynamic Intake System.",
            image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop",
            compat: "BMW M3 (G80) / Toyota Supra MK5",
            details: "Features a unique inverted cone filter system housed within a clean carbon housing. Lowers engine inlet temperatures smoothly by 8°C, optimizing throttle response with an additional +15 HP gain."
        },
        {
            id: 5,
            name: "Urban Automotive Carbon Kit",
            category: "carbon",
            price: "LKR 3,950,000",
            tag: "ELITE SPEC",
            shortDesc: "Full Exterior Stealth Carbon Pack for New Defender.",
            image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=600&auto=format&fit=crop",
            compat: "Land Rover Defender 90 / 110",
            details: "Bespoke package includes aggressive front bumper splitters, integrated roof light pods, wider wheel arches, and full rear deflector extensions made from premium autoclaved carbon fiber."
        },
        {
            id: 6,
            name: "BROOMLK Oversized Gym Hoodie",
            category: "merch",
            price: "LKR 12,500",
            tag: "GARAGE WEAR",
            shortDesc: "Premium 450GSM Ultra-Heavyweight Boxy Fit Hoodie.",
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
            compat: "Unisex Exclusive",
            details: "Custom heavy loopback luxury cotton fleece with silicon embossed high-definition BROOMLK block logo across the chest. Built for elite lifters and automotive tuners."
        }
    ];

    const categories = [
        { id: 'all', name: 'ALL VAULT ITEMS' },
        { id: 'carbon', name: 'CARBON AERO' },
        { id: 'exhaust', name: 'EXHAUST SYSTEMS' },
        { id: 'rims', name: 'FORGED RIMS' },
        { id: 'performance', name: 'PERFORMANCE HARDWARE' },
        { id: 'merch', name: 'OFFICIAL MERCH' }
    ];

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans overflow-x-hidden relative selection:bg-cyan-500 selection:text-black">

            {/* BACKGROUND DECORATIVE GLOW */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-20 relative z-10">

                {/* PREMIUM STORE HEADER */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                    <div>
                        <span className="text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-2 block">
                            BROOMLK PARTS DEPOT
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            PERFORMANCE VAULT<span className="text-cyan-500">.</span>
                        </h1>
                    </div>
                    <p className="text-stone-400 text-xs md:text-sm max-w-sm leading-relaxed font-medium tracking-wide">
                        Acquire elite components and bespoke modifications verified by our engineering studio. Pure aesthetics paired with high-end track dynamics.
                    </p>
                </div>

                {/* GLASSMORPHIC CATEGORY TABS SELECTOR */}
                <div className="flex flex-wrap gap-2 mb-16 border-b border-white/5 pb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`text-[10px] font-black tracking-widest uppercase px-5 py-3 border transition-all duration-300 rounded-none ${activeCategory === cat.id ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.25)]' : 'bg-white/[0.01] border-white/5 text-stone-400 hover:border-white/20 hover:text-white'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* 3-COLUMN LUXURY PRODUCT DISPLAY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setSelectedProduct(product)} // Fixed: Pointing to selectedProduct state
                            className="bg-gradient-to-b from-white/[0.02] to-black border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 relative group cursor-pointer"
                            style={{
                                borderColor: hoveredId === product.id ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.05)',
                                boxShadow: hoveredId === product.id ? '0 20px 50px -10px rgba(6,182,212,0.1)' : '0 30px 60px rgba(0,0,0,0.5)'
                            }}
                        >
                            {/* Product Image Area */}
                            <div className="w-full h-64 relative bg-[#0a0a0a] flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                                {/* Category Spec Badge */}
                                <div className="absolute top-4 left-4 bg-black/60 border border-white/10 text-[8px] font-black tracking-widest font-mono uppercase px-2.5 py-1 text-stone-300">
                                    {product.tag}
                                </div>
                            </div>

                            {/* Product Meta Info Bottom */}
                            <div className="p-6 flex flex-col justify-between h-40">
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-2">
                                        {product.shortDesc}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                                    <span className="text-sm font-extrabold font-mono text-white tracking-wide">
                                        {product.price}
                                    </span>
                                    <span className="text-[9px] font-black tracking-widest uppercase text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
                                        VIEW SPECS →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🚀 DOUBLE-SIDED FLOATING OVERLAY QUICK VIEW PANEL */}
                {selectedProduct && ( // Fixed: Checked against the right state
                    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 pointer-events-auto animate-fade-in">

                        <div className="w-full max-w-5xl h-auto md:h-[540px] bg-[#090909]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.95)] flex flex-col md:flex-row relative">

                            {/* LEFT SIDE: PRODUCT HIGHLIGHT VISUAL BOX */}
                            <div className="w-full md:w-[50%] h-64 md:h-full relative bg-[#0c0c0c] flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10">
                                <img
                                    src={selectedProduct.image} // Fixed reference
                                    alt=""
                                    className="w-full h-full object-contain filter contrast-[105%]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                                <div className="absolute top-4 left-4 text-[9px] font-bold font-mono text-cyan-400 tracking-wider uppercase bg-black/50 border border-cyan-500/20 px-2 py-0.5 rounded">
                                    AUTHENTIC PARTS DEPOT
                                </div>
                            </div>

                            {/* RIGHT SIDE: SPECIFICATIONS & CONVERSION GATEWAY */}
                            <div className="w-full md:w-[50%] p-6 md:p-10 flex flex-col justify-between overflow-y-auto bg-black/40">

                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <span className="text-[9px] text-cyan-400 font-extrabold tracking-[0.2em] uppercase bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                                            {selectedProduct.tag} {/* Fixed reference */}
                                        </span>
                                        <button
                                            onClick={() => setSelectedProduct(null)} // Fixed reference
                                            className="border border-white/10 hover:border-red-500 bg-white/5 hover:bg-red-500/10 text-stone-400 hover:text-red-400 font-bold text-[9px] tracking-widest uppercase px-3 py-1.5 transition-all duration-300"
                                        >
                                            ✕ CLOSE
                                        </button>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight mt-1 mb-2">
                                        {selectedProduct.name} {/* Fixed reference */}
                                    </h3>
                                    <span className="text-lg font-mono font-bold text-cyan-400 block mb-6">
                                        {selectedProduct.price} {/* Fixed reference */}
                                    </span>

                                    {/* Bullet Tech Specs Sheets */}
                                    <div className="flex flex-col gap-4 text-xs">
                                        <div>
                                            <h4 className="font-extrabold text-stone-500 uppercase tracking-widest text-[9px] mb-0.5">COMPATIBLE VEHICLES</h4>
                                            <p className="text-white font-bold uppercase tracking-wide text-xs">{selectedProduct.compat}</p> {/* Fixed reference */}
                                        </div>
                                        <div className="w-full h-[1px] bg-white/5" />
                                        <div>
                                            <h4 className="font-extrabold text-stone-500 uppercase tracking-widest text-[9px] mb-0.5">TECHNICAL OVERVIEW</h4>
                                            <p className="text-stone-300 leading-relaxed font-medium">{selectedProduct.details}</p> {/* Fixed reference */}
                                        </div>
                                    </div>
                                </div>

                                {/* Conversion Button Actions */}
                                <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <span className="text-[9px] font-bold tracking-widest text-stone-500 uppercase">INQUIRE THROUGH BROOMLK EXECUTIVE</span>
                                    <Link
                                        to="/consultation"
                                        className="w-full sm:w-auto bg-white hover:bg-cyan-500 text-black hover:text-white font-black text-[10px] tracking-widest uppercase px-6 py-3.5 transition-all duration-300 rounded-none shadow-xl text-center"
                                    >
                                        INQUIRE PARTS VIA VIP LINE →
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                )}



            </div>
        </div>
    );
}