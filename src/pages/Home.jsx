import React, { useRef, useLayoutEffect, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Component imports
import Navbar from '../components/Navbar';
import SpecsBar from '../components/SpecsBar';

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

    // Clean tracking shot that moves from front to the perfect side profile and stops there
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

          // Smoothly updates the primary car paint color on state change
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

    // Rotates smoothly to the best studio profile angle and locks
    tl.to(carRef.current.rotation, { y: Math.PI * 0.4 });
    tl.to(carRef.current.position, { x: -0.6, z: 0.2 }, 0);

  }, []);

  return <primitive ref={carRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

// Main Page Showcase Component
export default function PorscheShowcase() {
  const [activeColor, setActiveColor] = useState('white');
  const titleRef = useRef();
  const specCardRef1 = useRef();

  useLayoutEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    );

    gsap.fromTo(specCardRef1.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: specCardRef1.current,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        }
      }
    );

  }, []);

  return (
    <div className="scroll-container bg-[#050505] text-white relative select-none font-sans overflow-x-hidden" style={{ height: '180vh' }}>

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

        {/* CINEMATIC SYMMETRICAL VIGNETTE OVERLAYS */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/90" />
      </div>

      {/* CONFIGURATOR SPECS BAR DASHBOARD */}
      <SpecsBar activeColor={activeColor} setActiveColor={setActiveColor} />

      {/* SCROLLABLE HTML CONTENT OVERLAY */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 z-30 pointer-events-none">

        {/* Section 1: Hero Intro Typography */}
        <section className="h-screen flex flex-col justify-center items-start">
          <div ref={titleRef} className="pointer-events-auto select-none drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none mb-2">
              GT3 RS
            </h1>
            <p className="text-lg md:text-2xl font-medium text-stone-400 tracking-wide">
              Motorsport DNA. Precision Engineered.
            </p>
          </div>
        </section>

        {/* Section 2: Final Interactive Configurator Zone */}
        <section className="h-screen flex flex-col justify-center items-end">
          <div ref={specCardRef1} className="pointer-events-auto w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] -translate-y-8">
            <span className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">01 / CONFIGURATOR STUDIO</span>
            <h2 className="text-3xl font-black text-white uppercase mt-1 mb-4">Tailor-Made Performance</h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Use the live interface below to completely personalize your GT3 RS. Experiment with premium historical exterior paints and experience motorsport engineering in real-time.
            </p>
          </div>
        </section>

      </div>

    </div>
  );
}