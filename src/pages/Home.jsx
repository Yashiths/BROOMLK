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

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

  const titleRef = useRef();
  const configCardRef = useRef();
  const brandSliderRef = useRef();
  const connectHubRef = useRef();
  const specsBarRef = useRef();

  useLayoutEffect(() => {
    // 1. Hero Title Entry Animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.6, ease: 'power4.out' }
    );

    // 2. ULTRA-CLEAN SPECS BAR HIDING SYSTEM
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

    // 3. Section 2: Premium Wraps Card Scroll Reveal
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

    // 4. BRAND SLIDER REVEAL (Middle Section)
    gsap.fromTo(brandSliderRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: brandSliderRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 5. Section 3: Wide Connect HQ Hub Scroll Reveal
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

  // >>> 🚀 EXTRA LUXURY: HIGH-END MODIFICATION SVG ICON VECTOR VAULT
  // Hand-architected clean vector matrices matching tyrala styling cues
  const brandIcons = [
    { name: "BBS", svg: <svg className="w-16 h-8 fill-current" viewBox="0 0 100 35"><path d="M5 5h20v6H5zm0 10h25v6H5zm0 10h15v6H5z" /><text x="32" y="24" className="font-sans font-black tracking-tight text-xl">BBS</text></svg> },
    { name: "BREMBO", svg: <svg className="w-24 h-8 fill-current" viewBox="0 0 120 30"><circle cx="12" cy="15" r="8" stroke="currentColor" strokeWidth="3" fill="none" /><path d="M10 15h4v4h-4z" /><text x="28" y="22" className="font-sans font-black tracking-wider text-lg italic">brembo</text></svg> },
    { name: "BC RACING", svg: <svg className="w-28 h-8 fill-current" viewBox="0 0 140 30"><rect x="2" y="6" width="30" height="18" fill="none" stroke="currentColor" strokeWidth="2" /><text x="8" y="19" className="font-mono font-bold text-xs">BC</text><text x="38" y="21" className="font-sans font-black tracking-widest text-base">RACING</text></svg> },
    { name: "RECARO", svg: <svg className="w-24 h-8 fill-current" viewBox="0 0 110 30"><text x="5" y="22" className="font-sans font-black tracking-[0.15em] text-xl italic">RECARO</text></svg> },
    { name: "LIBERTY WALK", svg: <svg className="w-14 h-8 fill-current" viewBox="0 0 60 35"><text x="10" y="20" className="font-serif font-black text-2xl tracking-tighter">LB</text><text x="5" y="32" className="text-[7px] font-bold tracking-widest">PERFORMANCE</text></svg> },
    { name: "REMUS", svg: <svg className="w-24 h-8 fill-current" viewBox="0 0 100 30"><polygon points="5,5 20,5 15,25 0,25" /><text x="26" y="22" className="font-sans font-black tracking-widest text-lg">REMUS</text></svg> },
    { name: "EBC BRAKES", svg: <svg className="w-20 h-8 fill-current" viewBox="0 0 90 30"><text x="5" y="20" className="font-sans font-black text-2xl tracking-tight">EBC</text><text x="6" y="28" className="text-[8px] font-bold tracking-[0.2em]">BRAKES</text></svg> },
    { name: "MILLTEK", svg: <svg className="w-24 h-8 fill-current" viewBox="0 0 110 30"><text x="2" y="20" className="font-sans font-black tracking-tight text-lg italic">MILLTEK</text><text x="4" y="28" className="text-[7px] font-mono font-bold tracking-widest">SPORT</text></svg> },
    { name: "FORGE", svg: <svg className="w-20 h-8 fill-current" viewBox="0 0 90 30"><text x="2" y="22" className="font-sans font-black text-2xl tracking-tight text-cyan-500/80">Forge</text></svg> }
  ];

  return (
    <div className="scroll-container bg-[#050505] text-white relative select-none font-sans overflow-x-hidden" style={{ height: '320vh' }}>

      {/* INFINITE MARQUEE ANIMATION KEYFRAMES */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}} />

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

            <div className="flex flex-col gap-2 border-t border-white/5 pt-4 mb-6 font-mono text-[10px] font-bold text-stone-400 tracking-wide">
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">//</span> 01. MULTI-LAYER PAINT PROTECTION (PPF)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">//</span> 02. ULTRA-GLOSS & SATIN CHROME TEXTURES
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">//</span> 03. 100% NON-DAMAGING VINYL ADHESIVES
              </div>
            </div>

            <p className="text-stone-400 text-xs italic border-l-2 border-cyan-500 pl-3">
              "Every curve is a canvas. Visualize your dream build before the first cut is made."
            </p>
          </div>
        </section>

        {/* >>> 🚀 NEW BRAND ICON SLIDER (Clean Vectors Line setup inside space gap) */}
        <section className="h-[40vh] flex flex-col justify-center items-center">
          <div ref={brandSliderRef} className="w-full pointer-events-auto py-8 border-y border-white/5 bg-black/10 backdrop-blur-sm overflow-hidden relative">

            {/* Ambient edge blur shadows */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Loop for Custom SVG Icons */}
            <div className="w-full overflow-hidden flex">
              <div className="animate-marquee flex items-center gap-24 select-none">
                {brandIcons.concat(brandIcons).map((brand, i) => (
                  <div key={i} className="text-stone-500/50 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                    {brand.svg}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: CONNECT HQ HUB ZONE */}
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