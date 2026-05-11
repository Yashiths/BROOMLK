import React, { useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Imported Navbar Component
import Navbar from '../components/Navbar';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 3D Porsche Model Component
function PorscheModel() {
  const { scene } = useGLTF('/assets/porsche_model/scene.gltf');
  const carRef = useRef();

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to(carRef.current.rotation, { y: Math.PI * 1.5 })
      .to(carRef.current.position, { x: -1.5, z: 1 }, 0);

  }, []);

  return <primitive ref={carRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

// Main Page Showcase Component
export default function PorscheShowcase() {
  return (
    <div className="scroll-container bg-[#050505] text-white relative select-none font-sans" style={{ height: '250vh' }}>

      {/* 1. MOUNTED NAVBAR HERE (මෙතන පාවිච්චි කරපු නිසා warning එක අයින් වෙනවා) */}
      <Navbar />

      {/* FIXED 3D CANVAS LAYER */}
      <div className="fixed inset-0 w-screen h-screen z-10">
        <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} />

          <Suspense fallback={null}>
            <PorscheModel />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>

        {/* ULTRA-PREMIUM GRADIENT OVERLAYS */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/90 via-black/40 to-black/60" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* SCROLLABLE HTML CONTENT OVERLAY */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 z-30 pointer-events-none">

        {/* Section 1: Hero Intro Title */}
        <section className="h-screen flex flex-col justify-center items-start">
          <div className="pointer-events-auto select-none drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-2">
              GT3 RS
            </h1>
            <p className="text-lg md:text-xl font-medium text-stone-400 tracking-wide">
              Built for the Track.
            </p>
          </div>
        </section>

        {/* Section 2: Performance Tech Specs */}
        <section className="h-screen flex flex-col justify-center items-end text-right">
          <div className="pointer-events-auto select-none drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-2">
              518 Horsepower
            </h1>
            <p className="text-lg md:text-xl font-medium text-stone-400 tracking-wide">
              Pure atmospheric performance.
            </p>
          </div>
        </section>

      </div>

    </div>
  );
}