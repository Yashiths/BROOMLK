import React from 'react';
import { Activity, Box, Calendar, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '142', icon: <Box size={24} />, trend: '+12%', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Pending Consultations', value: '28', icon: <Calendar size={24} />, trend: '+4 this week', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Active Projects', value: '14', icon: <Activity size={24} />, trend: '3 near completion', color: 'text-[#00C2FF]', bg: 'bg-[#00C2FF]/10' },
    { label: 'Low Stock Alerts', value: '5', icon: <TrendingUp size={24} />, trend: 'Immediate action', color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Overview Hub</h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">
            Real-time telemetry and metrics for BROOMLK Customs.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md flex items-center gap-3 hidden sm:flex">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500">Last Sync:</span>
          <span className="text-xs font-bold text-[#00C2FF] font-mono tracking-wider">Just Now</span>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 hover:bg-white/10 transition-all duration-300">
            {/* Subtle Gradient Glow in background */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${stat.bg}`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
              <p className="text-xs text-stone-500 font-medium mt-3 border-t border-white/10 pt-3 flex items-center gap-2">
                <span className={stat.color}>{stat.trend}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS & SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-6">Recent Activity Stream</h3>
          <div className="space-y-6">
            {[
              { time: '10:42 AM', event: 'New Consultation booked by Ryan D.', status: 'Pending' },
              { time: '09:15 AM', event: 'Stock added: BBS FI-R Forged Wheels (x4)', status: 'System' },
              { time: 'Yesterday', event: 'Project "Porsche 911 GT3" marked as Completed.', status: 'Success' },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-200">{log.event}</p>
                  <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">{log.time} // {log.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/40 border border-[#00C2FF]/20 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/5 to-transparent pointer-events-none"></div>
          <h3 className="text-xl font-bold text-[#00C2FF] uppercase tracking-tight mb-2">System Diagnostics</h3>
          <p className="text-xs text-stone-400 font-medium tracking-wide mb-8">All garage modules operational.</p>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                <span className="text-stone-400">Server Load</span>
                <span className="text-[#00C2FF]">24%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#00C2FF] w-[24%] rounded-full shadow-[0_0_10px_#00C2FF]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                <span className="text-stone-400">Database Capacity</span>
                <span className="text-white">68%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[68%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
