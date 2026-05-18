import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PorscheShowcase from './pages/Home';
import StudioPage from './pages/StudioPage';
import ConsultationPage from './pages/ConsultationPage';
import ProductsPage from './pages/ProductsPage';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStore from './pages/admin/AdminStore';
import AdminConsultations from './pages/admin/AdminConsultations';
import AdminProjects from './pages/admin/AdminProjects';

function App() {
  return (
    <div className="App bg-[#050505] min-h-screen text-white">
      <Routes>
        <Route path="/" element={<PorscheShowcase />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/shop" element={<ProductsPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="store" element={<AdminStore />} />
          <Route path="bookings" element={<AdminConsultations />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="settings" element={<div className="p-8 text-stone-400 font-mono text-sm uppercase tracking-widest">Settings Module (Under Construction)</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;