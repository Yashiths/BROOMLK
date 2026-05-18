import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Store, CalendarCheck, CarFront, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: <LayoutDashboard size={20} /> },
    { name: 'Store', path: '/admin/store', icon: <Store size={20} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <CarFront size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-[#00C2FF] selection:text-black">
      {/* SIDEBAR */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-white/5 backdrop-blur-3xl border-r border-white/10 z-50 flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <span className="text-xl font-black tracking-[0.2em] uppercase text-white">
            BROOM<span className="text-[#00C2FF] drop-shadow-[0_0_8px_rgba(0,194,255,0.8)]">LK</span>
          </span>
          <span className="ml-2 text-[10px] font-black text-[#00C2FF] drop-shadow-[0_0_8px_rgba(0,194,255,0.8)] uppercase tracking-[0.2em]">
            CUSTOMS.
          </span>
        </div>

        <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
          <span className="px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
            System Modules
          </span>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm tracking-wide ${
                  isActive
                    ? 'bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20 shadow-[0_0_20px_rgba(0,194,255,0.15)]'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-stone-400 hover:text-white hover:bg-red-500/10 transition-colors font-medium text-sm tracking-wide group">
            <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* TOPBAR */}
        <header className="h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-[#00C2FF] shadow-[0_0_10px_#00C2FF] animate-pulse"></div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-400">
              System Online / Encrypted Connection
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right mr-2 hidden sm:block">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Admin User</p>
              <p className="text-[10px] text-[#00C2FF] uppercase font-mono tracking-widest">Level 5 Access</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
              <span className="text-sm font-black text-white">AU</span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE OUTLET */}
        <div className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
