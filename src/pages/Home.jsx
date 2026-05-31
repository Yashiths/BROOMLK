import React, { useRef, useLayoutEffect, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Component imports
import Navbar from '../components/Navbar';
import SpecsBar from '../components/SpecsBar';
import Footer from '../components/Footer';

// Lucide Icons for the Dashboard Matrix Grid
import { Gauge, Timer, Volume2, Paintbrush, Disc, Zap, Flame } from 'lucide-react';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Configuration matrix items with descriptions explaining automotive terms
const MATRIX_ITEMS = [
  {
    id: 'hp',
    label: 'HP (Horsepower)',
    value: '520 WHP',
    color: 'text-amber-400',
    borderColor: 'border-amber-400/30',
    bgColor: 'bg-amber-500/5',
    icon: <Gauge size={12} className="text-amber-400" />,
    desc: "The maximum power delivered from the engine to the wheels. Higher horsepower directly results in faster overall speed and rapid acceleration."
  },
  {
    id: 'speed',
    label: '0-100 KM/H',
    value: '3.2s',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-400/30',
    bgColor: 'bg-cyan-500/5',
    icon: <Timer size={12} className="text-cyan-400" />,
    desc: "The time taken to accelerate from a complete standstill to 100 KM/H. Delivers a lightning-fast response similar to high-end racing supercars."
  },
  {
    id: 'exhaust',
    label: 'EXHAUST SYSTEM',
    value: '118 dB',
    color: 'text-red-400',
    borderColor: 'border-red-400/30',
    bgColor: 'bg-red-500/5',
    icon: <Volume2 size={12} className="text-red-400" />,
    desc: "A premium high-flow exhaust system optimizes engine backpressure to increase raw performance while delivering an aggressive acoustic note."
  },
  {
    id: 'top_speed',
    label: 'TOP SPEED',
    value: '325 KM/H',
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-400/30',
    bgColor: 'bg-fuchsia-500/5',
    icon: <Zap size={12} className="text-fuchsia-400" />,
    desc: "The maximum absolute velocity the vehicle can achieve. Fully configured and structurally tuned to maintain stability during track operations."
  },
  {
    id: 'wrap',
    label: 'WRAP VINYL',
    value: 'Satin Chrome',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/30',
    bgColor: 'bg-emerald-500/5',
    icon: <Paintbrush size={12} className="text-emerald-400" />,
    desc: "Premium vinyl coating that changes the car's exterior color and finish to a distinct premium look while protecting the original factory paint."
  },
  {
    id: 'wheels',
    label: 'WHEELS & RIMS',
    value: '21" Forged',
    color: 'text-purple-400',
    borderColor: 'border-purple-400/30',
    bgColor: 'bg-purple-500/5',
    icon: <Disc size={12} className="text-purple-400" />,
    desc: "Ultra-lightweight forged rims significantly reduce unsprung weight, providing sharper handling, superior braking control, and a high-end stance."
  }
];

// Custom helper component to handle dynamic camera movements via GSAP ScrollTrigger
function CameraController() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    tl.to(camera.position, { x: 0, y: 1, z: 5 })
      .to(camera.position, { x: 2.2, y: 0.4, z: 4.0 });

  }, [camera]);

  return null;
}

// 3D Porsche Model Component
function PorscheModel({ activeColor }) {
  const { scene } = useGLTF('/assets/porsche_model/scene.gltf');
  const carRef = useRef();

  const colorMap = {
    white: '#FFFFFF',
    black: '#151515',
    red: '#D6222A',
    blue: '#0084B6',
  };

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const matName = child.material.name.toLowerCase();

          if (matName.includes('paint') || matName.includes('body') || matName.includes('car_paint') || matName.includes('exterior')) {
            child.material.color.set(colorMap[activeColor]);
          }
        }
      });
    }
  }, [activeColor, scene]);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    tl.to(carRef.current.rotation, { y: Math.PI * 0.4 });
    tl.to(carRef.current.position, { x: -0.6, z: 0.2 }, 0);

  }, []);

  return <primitive ref={carRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

// Main Page Showcase Component
export default function PorscheShowcase() {
  const [activeColor, setActiveColor] = useState('white');
  const [slotsRemaining, setSlotsRemaining] = useState(3);
  
  // Matrix interaction states
  const [activeMatrixIndex, setActiveMatrixIndex] = useState(0);
  const [isMatrixHovered, setIsMatrixHovered] = useState(false);

  const titleRef = useRef();
  const configCardRef = useRef();
  const connectHubRef = useRef();
  const specsBarRef = useRef();

  // Auto-rotate dynamic info box loop
  useEffect(() => {
    if (isMatrixHovered) return;

    const interval = setInterval(() => {
      setActiveMatrixIndex((prev) => (prev + 1) % MATRIX_ITEMS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isMatrixHovered]);

  // Booking Counter Dynamic Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSlotsRemaining((prev) => {
        if (prev <= 1) return 3;
        return prev - 1;
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    // Hero Title Entry Animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.6, ease: 'power4.out' }
    );

    // Specs Bar Hiding System
    gsap.to(specsBarRef.current, {
      opacity: 0,
      y: 40,
      pointerEvents: 'none',
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "top -10%",
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    });

    // Section 2: Premium Wraps Card Scroll Reveal
    gsap.fromTo(configCardRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        scrollTrigger: {
          trigger: configCardRef.current,
          start: "top 90%",
          end: "top 45%",
          scrub: 1.2,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Section 3: Wide Connect HQ Hub Scroll Reveal
    gsap.fromTo(connectHubRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1,
        scrollTrigger: {
          trigger: connectHubRef.current,
          start: "top 95%",
          end: "top 65%",
          scrub: 1.2,
          toggleActions: "play reverse play reverse"
        }
      }
    );

  }, []);

  return (
    <div className="scroll-container bg-[#050505] text-white relative select-none font-sans overflow-x-hidden" style={{ height: '300vh' }}>

      <Navbar />

      {/* FIXED 3D CANVAS BACKGROUND LAYER */}
      <div className="fixed inset-0 w-screen h-screen z-10">
        <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} />

          <Suspense fallback={null}>
            <PorscheModel activeColor={activeColor} />
            <Environment preset="studio" />
          </Suspense>

          <CameraController />
        </Canvas>

        {/* CINEMATIC OVERLAYS */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/90" />
      </div>

      <div ref={specsBarRef} className="fixed bottom-0 left-0 w-full z-40 transition-all duration-300 will-change-transform">
        <SpecsBar activeColor={activeColor} setActiveColor={setActiveColor} />
      </div>

      {/* SCROLLABLE HTML CONTENT OVERLAY */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 z-30 pointer-events-none">

        {/* Section 1: Hero Branding */}
        <section className="h-screen flex flex-col justify-center items-start">
          <div ref={titleRef} className="pointer-events-auto select-none drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
            <span className="text-xs md:text-sm text-cyan-400 font-bold tracking-[0.3em] uppercase mb-3 block">
              BROOMLK CUSTOMS
            </span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none mb-3">
              REDEFINE <br />YOUR RIDE.
            </h1>
            <p className="text-base md:text-xl font-medium text-stone-400 tracking-wide max-w-md mb-8">
              Sri Lanka's premier 3D virtual garage. Tailor-made aesthetics and track-ready performance modifications for high-end supercars.
            </p>

            <div className="border-t border-white/10 pt-4 max-w-md">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-stone-500 uppercase block mb-1">
                OFFICIAL INTERFACE PIPELINE FOR
              </span>
              <p className="text-[11px] font-black tracking-widest text-cyan-400/80 uppercase">
                AKRAPOVIČ // LIBERTY WALK // VOSSEN FORGED // KW SUSPENSIONS
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: CONFIGURATOR ZONE */}
        <section className="h-screen flex flex-col justify-center items-end">
          <div ref={configCardRef} className="pointer-events-auto w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <span className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">01 / VIRTUAL CONFIGURATOR</span>
            <h2 className="text-3xl font-black text-white uppercase mt-1 mb-4">Premium Wraps & Styling</h2>
            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              Experiment with our ultra-premium exterior vinyl wraps, custom carbon fiber accents, and high-end automotive styling packages.
            </p>

            {/* INTERACTIVE MATRIX GRID */}
            <div 
              className="grid grid-cols-2 gap-2 bg-black/60 p-3 rounded-xl border border-white/5 text-center font-mono mb-5"
              onMouseEnter={() => setIsMatrixHovered(true)}
              onMouseLeave={() => setIsMatrixHovered(false)}
            >
              {MATRIX_ITEMS.map((item, index) => {
                const isActive = index === activeMatrixIndex;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setActiveMatrixIndex(index)}
                    className={`flex flex-col justify-center py-2.5 cursor-pointer rounded-lg transition-all duration-300 border ${
                      isActive 
                        ? `${item.borderColor} ${item.bgColor} shadow-[inset_0_0_12px_rgba(250,250,250,0.02)] scale-[1.02]` 
                        : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                  >
                    <span className="text-[7px] font-black text-stone-400 uppercase tracking-wider flex items-center justify-center gap-1">
                      {item.icon} {item.label.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] font-bold ${item.color} mt-0.5 truncate px-0.5`}>
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* DYNAMIC EXPLAINER BOX FOR GLOSSARY DETAILS */}
            <div className="min-h-[90px] border-l-2 border-cyan-500 bg-cyan-950/10 p-3.5 rounded-r-lg transition-all duration-500 mb-6">
              <h4 className={`text-[9px] font-mono font-black ${MATRIX_ITEMS[activeMatrixIndex].color} uppercase tracking-widest flex items-center gap-1.5`}>
                💡 WHAT IS {MATRIX_ITEMS[activeMatrixIndex].label}?
              </h4>
              <p className="text-stone-300 text-[11px] leading-relaxed font-medium mt-1">
                {MATRIX_ITEMS[activeMatrixIndex].desc}
              </p>
            </div>

            <p className="text-stone-400 text-xs italic border-l border-white/10 pl-3">
              "Every curve is a canvas. Visualize your dream build before the first cut is made."
            </p>
          </div>
        </section>

        {/* Section 3: CONNECT HQ HUB ZONE (WITH LIVE SLOTS COUNTER) */}
        <section className="h-screen flex flex-col justify-center items-center">
          <div ref={connectHubRef} className="pointer-events-auto w-full max-w-5xl bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-[45%] h-64 md:h-auto min-h-[250px] bg-stone-950 relative filter grayscale-[80%] contrast-[110%] invert-[5%] hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://maps.google.com/maps?q=Colombo,%20Sri%20Lanka&t=&z=13&ie=UTF-8&iwloc=&output=embed"
                className="w-full h-full border-none opacity-50 hover:opacity-80 transition-opacity duration-500"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BROOMLK HQ Map"
              />
              <div className="absolute top-4 left-4 bg-black/70 border border-cyan-500/30 px-3 py-1 text-[9px] font-bold font-mono tracking-widest text-cyan-400 uppercase rounded">
                STUDIO HQ // COLOMBO
              </div>
            </div>

            <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-between bg-black/20">
              <div>
                <span className="text-[9px] text-cyan-400 font-bold tracking-[0.25em] uppercase mb-1 block">02 / STYLING HEADQUARTERS</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-3">READY TO TRANSFORM?</h2>
                <p className="text-stone-400 text-xs leading-relaxed mb-6 font-medium">
                  Locate our elite physical tuning garage in Colombo or synchronize with us across our digital handles.
                </p>

                {/* LIVE SLOTS REMAINING NOTIFIER URGENCY CARD */}
                <div className="mb-6 flex items-center gap-3 bg-red-950/30 border border-red-500/20 p-3 rounded-xl animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                  <div className="flex-1">
                    <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block flex items-center gap-1">
                      <Flame size={10} /> CRITICAL AVAILABILITY ALERT
                    </span>
                    <p className="text-[11px] text-stone-200 font-bold mt-0.5">
                      Only <span className="text-red-400 text-xs font-black font-mono">{slotsRemaining}</span> Custom Build Slots Left For This Month!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-4 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[9px] font-extrabold text-stone-500 tracking-widest uppercase">HQ CONNECTIONS</h4>
                    <p className="text-xs font-semibold text-stone-200 tracking-wide leading-relaxed">📞 +94 76 419 5746 <br /> broomlk@gmail.com</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[9px] font-extrabold text-stone-500 tracking-widest uppercase">DIGITAL PIPELINES</h4>
                    <div className="flex flex-col gap-0.5 text-xs font-bold text-cyan-400 tracking-wider">
                      <a href="#" className="hover:text-white transition-colors">TIKTOK // @BROOMLK</a>
                      <a href="#" className="hover:text-white transition-colors">INSTAGRAM // @BROOMLK</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 max-w-sm">
                  <p className="text-[9px] font-mono font-bold text-stone-500 uppercase tracking-wide leading-normal">
                    <span className="text-red-500">NOTICE:</span> BUILD SLOTS MUST BE RESERVED 48H IN ADVANCE.
                  </p>
                </div>
                <Link to="/consultation" className="w-full sm:w-auto bg-white hover:bg-cyan-500 text-black hover:text-white font-black text-[10px] tracking-widest uppercase px-6 py-3 transition-all duration-300 text-center rounded-lg shadow-xl">
                  Book Private Session →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}