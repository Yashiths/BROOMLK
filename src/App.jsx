import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PorscheShowcase from './pages/Home';
import StudioPage from './pages/StudioPage';
import ConsultationPage from './pages/ConsultationPage';
import ProductsPage from './pages/ProductsPage'; // We will create this next

function App() {
  return (
    <div className="App bg-[#050505] min-h-screen text-white">
      <Routes>
        <Route path="/" element={<PorscheShowcase />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/shop" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;