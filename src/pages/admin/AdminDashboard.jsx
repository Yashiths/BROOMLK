import React from 'react';
import { 
  Activity, 
  Box, 
  Calendar, 
  TrendingUp, 
  Clock, 
  User, 
  Car, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Layers, 
  Sparkles, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { 
      label: 'Total Products', 
      value: '142', 
      icon: <Box size={20} />, 
      trend: '+12% growth', 
      color: 'text-blue-400', 
      bg: 'bg-blue-400/10',
      border: 'border-white/10'
    },
    { 
      label: 'Pending Consultations', 
      value: '28', 
      icon: <Calendar size={20} />, 
      trend: '+4 this week', 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-400/10',
      border: 'border-white/10'
    },
    { 
      label: 'Active Projects', 
      value: '14', 
      icon: <Activity size={20} />, 
      trend: '3 near delivery', 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10',
      border: 'border-white/10'
    },
    { 
      label: "Today's Consultations", 
      value: '3 Active', 
      icon: <Clock size={20} />, 
      trend: 'Timeline running', 
      color: 'text-[#00C2FF]', 
      bg: 'bg-[#00C2FF]/10',
      border: 'border-[#00C2FF]/30 shadow-[0_0_15px_rgba(0,194,255,0.15)] bg-gradient-to-br from-[#00C2FF]/5 to-transparent'
    },
    { 
      label: 'Low Stock Alerts', 
      value: '5', 
      icon: <TrendingUp size={20} />, 
      trend: 'Critical action', 
      color: 'text-red-400', 
      bg: 'bg-red-400/10',
      border: 'border-white/10'
    },
  ];

  const todaySchedule = [
    {
      time: '09:30 AM',
      title: 'Nissan GTR ECU Tuning',
      client: 'Hirun Wijesinghe',
      car: 'Nissan GT-R R35',
      tech: 'Kamal Silva (Lead Tuner)',
      status: 'COMPLETED',
      statusClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      time: '02:00 PM',
      title: 'Porsche 911 PPF Inspection',
      client: 'Amila Perera',
      car: 'Porsche 911 GT3 RS (992)',
      tech: 'Nishan Perera (Detailing Specialist)',
      status: 'IN PROGRESS',
      statusClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30 animate-pulse'
    },
    {
      time: '04:30 PM',
      title: 'Audi R8 Carbon Lip Fitting',
      client: 'Dilshan Senanayake',
      car: 'Audi R8 V10 Plus',
      tech: 'Roshan Ranasinghe (Master Fabricator)',
      status: 'UPCOMING',
      statusClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20 shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              MISSION CONTROL
            </span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">Overview Hub</h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">
            Real-time telemetry and schedule metrics for BROOMLK Customs.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg backdrop-blur-md flex items-center gap-3 hidden sm:flex">
          <span className="text-[9px] uppercase font-mono tracking-widest text-stone-500">Telemetry Sync:</span>
          <span className="text-xs font-bold text-[#00C2FF] font-mono tracking-wider animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]"></span>
            Online
          </span>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`bg-white/5 border ${stat.border} rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300`}
          >
            {/* Subtle Gradient Glow in background */}
            <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity ${stat.bg}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
              <p className="text-[9px] text-stone-500 font-semibold mt-3 border-t border-white/5 pt-2 flex items-center gap-1">
                <span className={stat.color}>{stat.trend}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* OPERATIONS SCHEDULE & SYSTEM METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TODAY'S OPERATIONS SCHEDULE */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-[#00C2FF]" />
                  Today's Operations Schedule
                </h3>
                <p className="text-xs text-stone-400 font-medium tracking-wide">Daily modifications timeline and diagnostics status.</p>
              </div>
              <Link 
                to="/admin/bookings"
                className="text-[10px] font-black uppercase text-[#00C2FF] hover:text-white transition-colors tracking-widest flex items-center gap-1"
              >
                Go to Bookings <ExternalLink size={12} />
              </Link>
            </div>

            {/* Vertical timeline layout */}
            <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-6 py-2">
              {todaySchedule.map((slot, index) => (
                <div key={index} className="relative group">
                  
                  {/* Timeline Glowing Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-cyan-500 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]"></span>
                  </span>

                  {/* Booking timeline card */}
                  <div className="bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 p-4 rounded-xl backdrop-blur-md transition-all duration-300">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-black text-[#00C2FF] bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">
                          {slot.time}
                        </span>
                        <h4 className="font-bold text-white text-sm tracking-wide group-hover:text-[#00C2FF] transition-colors">
                          {slot.title}
                        </h4>
                      </div>
                      <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border rounded-full self-start sm:self-auto ${slot.statusClass}`}>
                        {slot.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 mt-2 border-t border-white/5 text-xs text-stone-400">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-stone-500" />
                        <span>Client: <strong className="text-stone-200 font-semibold">{slot.client}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car size={13} className="text-stone-500" />
                        <span className="truncate">{slot.car}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Wrench size={13} className="text-stone-500" />
                        <span className="truncate">{slot.tech.split(' ')[0]} (Tech)</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between text-[10px] text-stone-500 font-mono">
            <span>DOCK OPERATION STATUS // ACTIVE</span>
            <span className="text-[#00C2FF] font-bold">READY FOR DISPATCH SCHEDULES</span>
          </div>
        </div>

        {/* SYSTEM STATUS & LOGS */}
        <div className="space-y-6">
          
          {/* DIAGNOSTICS */}
          <div className="bg-black/40 border border-[#00C2FF]/20 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/5 to-transparent pointer-events-none"></div>
            <h3 className="text-lg font-black text-[#00C2FF] uppercase tracking-tight mb-1 flex items-center gap-2">
              <Cpu size={18} />
              System Diagnostics
            </h3>
            <p className="text-[10px] text-stone-400 font-medium tracking-wide mb-6">Garage telemetry modules operational.</p>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-stone-400">Tuning Server Load</span>
                  <span className="text-[#00C2FF] font-mono">24%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00C2FF] w-[24%] rounded-full shadow-[0_0_10px_#00C2FF]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-stone-400">Database Allocation</span>
                  <span className="text-white font-mono">68%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[68%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-stone-400">Bandwidth (SSL)</span>
                  <span className="text-[#00C2FF] font-mono">99.8%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00C2FF] w-[99.8%] rounded-full shadow-[0_0_10px_#00C2FF]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* STREAM */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4">Activity Stream</h3>
            <div className="space-y-4">
              {[
                { time: '10:42 AM', event: 'New Consultation booked by Ryan D.', status: 'Pending' },
                { time: '09:15 AM', event: 'Stock added: BBS FI-R Forged Wheels (x4)', status: 'System' },
                { time: 'Yesterday', event: 'Project "Porsche 911 GT3" marked Completed.', status: 'Success' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF] shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-stone-200 leading-normal">{log.event}</p>
                    <p className="text-[8px] font-mono text-stone-500 uppercase tracking-widest mt-0.5">{log.time} // {log.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
