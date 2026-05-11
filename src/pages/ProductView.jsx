import { useState } from "react";
import { carData } from "../data/carData";
import Navbar from "../components/Navbar";
import ColorPicker from "../components/ColorPicker";
import SpecsBar from "../components/SpecsBar";

import { motion, AnimatePresence } from "motion/react"; 

function App() {
  const [activeColor, setActiveColor] = useState(carData.colors[0]);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-hidden font-sans">
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] transition-all duration-700 ease-in-out"
          style={{ backgroundColor: activeColor.hex }}
        />
      </div>

      <Navbar />

      <ColorPicker 
        colors={carData.colors} 
        activeColor={activeColor} 
        setActiveColor={setActiveColor} 
      />

      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-20 pb-32">
        
        {/* 1. Background Watermark Text එක Smooth මාරු වෙන්න */}
        <div className="absolute inset-x-0 top-1/3 -translate-y-1/2 pointer-events-none select-none z-0 text-center">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={activeColor.id} // key එක වෙනස් වෙද්දී animation එක trigger වෙනවා
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-[7vw] md:text-[10vw] font-black tracking-tighter text-white/[0.03] uppercase"
            >
              {activeColor.bgText}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-6xl flex flex-col items-center justify-center relative z-10">
          
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              {carData.name}
            </h1>
            <p className="text-sm md:text-base text-blue-400 tracking-widest uppercase font-medium mt-2">
              {carData.tagline}
            </p>
          </div>

          {/* 2. Main Car Image එක Slide වෙලා Fade-in වෙන්න */}
          <div className="w-full max-w-4xl relative min-h-[250px] md:min-h-[400px] flex items-center justify-center mt-6">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeColor.id} // වැදගත්ම දේ: color එක මාරු වෙද්දී අලුත් image එකක් කියලා react අඳුරගන්නවා
                src={activeColor.image}
                alt={`${carData.name} - ${activeColor.bgText}`}
                
                // Animation Properties 🏎️
                initial={{ opacity: 0, x: 100, scale: 0.95 }} // පටන් ගද්දී දකුණු පැත්තේ පෙනෙන්නේ නැතුව තියෙන්නේ
                animate={{ opacity: 1, x: 0, scale: 1 }}       // Screen එක මැදට එද්දී තියෙන්න ඕන විදිය
                exit={{ opacity: 0, x: -100, scale: 0.95 }}    // මැකීලා යද්දී වම් පැත්තට slide වෙලා යනවා
                transition={{ type: "spring", stiffness: 100, damping: 15 }} // Smooth වෙන්න spring physics දානවා
                
                className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] select-none"
              />
            </AnimatePresence>
          </div>

        </div>
      </main>

      <SpecsBar specs={carData.specs} />

    </div>
  );
}

export default App;