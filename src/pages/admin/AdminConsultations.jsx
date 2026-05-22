import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Check, 
  MoreVertical, 
  Search, 
  Plus, 
  Filter, 
  Trash2, 
  User, 
  Car, 
  Wrench, 
  ChevronDown, 
  SlidersHorizontal, 
  X, 
  Activity, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  Gauge,
  MessageSquare 
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/bookings';

export default function AdminConsultations() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newCar, setNewCar] = useState('');
  const [newService, setNewService] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newStatus, setNewStatus] = useState('PENDING');
  const [newNotes, setNewNotes] = useState('');
  const [newHpGains, setNewHpGains] = useState('');
  const [newFuelType, setNewFuelType] = useState('');
  const [newTechnician, setNewTechnician] = useState('');
  const [newPhone, setNewPhone] = useState(''); 
  const [newEmail, setNewEmail] = useState(''); 

  // Fetch all bookings from database
  const fetchLiveBookings = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.data && Array.isArray(response.data)) {
        setBookings(response.data);
      } else if (response.data && response.data.data) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("❌ Live database connectivity failure:", error);
    }
  };

  useEffect(() => {
    fetchLiveBookings();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdownId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // WhatsApp Smart Router
  const triggerWhatsAppPing = (booking, targetStatus) => {
    let rawPhone = booking.phone ? booking.phone.trim() : '';
    if (rawPhone.startsWith('0')) {
        rawPhone = '94' + rawPhone.substring(1);
    }

    if (!rawPhone || rawPhone === 'N/A') {
        alert("No communication terminal grid registered for this VIP client.");
        return;
    }

    let msgTemplate = '';
    if (targetStatus === 'APPROVED') {
        msgTemplate = `⚡ *APEX DESIGN STUDIO - BRIEFING APPROVED* ⚡\n\n` +
                      `Dear ${booking.client},\n` +
                      `Your custom build session request has been *APPROVED*.\n\n` +
                      `📦 *ID:* ${booking._id || booking.id}\n` +
                      `🏎️ *Vehicle:* ${booking.car}\n` +
                      `📅 *Date:* ${booking.date} at ${booking.time}\n\n` +
                      `Our team has initiated garage staging protocols. See you soon!`;
    } else if (targetStatus === 'COMPLETED') {
        msgTemplate = `🏁 *APEX DESIGN STUDIO - MISSION ACCOMPLISHED* 🏁\n\n` +
                      `Dear ${booking.client},\n` +
                      `The bespoke engineering pipeline for your *${booking.car}* is officially *COMPLETED*.\n\n` +
                      `Your performance dyno metrics and diagnostics logs have been archived. Thank you for choosing Apex!`;
    } else {
        msgTemplate = `🔔 *APEX DESIGN STUDIO - STATUS UPDATE* 🔔\n\n` +
                      `Dear ${booking.client}, your booking status for ${booking.car} is now marked as *${targetStatus}*.`;
    }

    const secureUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msgTemplate)}`;
    window.open(secureUrl, '_blank');
  };

  const getStatusConfig = (status) => {
    if (!status) return { label: 'PENDING', badgeClass: 'text-stone-400 bg-white/5 border border-white/10', icon: null };
    switch (status.toUpperCase()) {
      case 'PENDING':
        return {
          label: 'PENDING',
          badgeClass: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/30',
          icon: <Clock size={12} className="text-yellow-400 animate-pulse" />
        };
      case 'APPROVED':
        return {
          label: 'APPROVED',
          badgeClass: 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]',
          icon: <CheckCircle2 size={12} className="text-cyan-400" />
        };
      case 'COMPLETED':
        return {
          label: 'COMPLETED',
          badgeClass: 'text-emerald-500/80 bg-emerald-500/5 border border-emerald-500/20',
          icon: <Check size={12} className="text-emerald-500/80" />
        };
      default:
        return {
          label: status,
          badgeClass: 'text-stone-400 bg-white/5 border border-white/10',
          icon: null
        };
    }
  };

  // Update booking status
  const updateStatus = async (id, nextStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { status: nextStatus });
      
      if (response.data) {
        setBookings(prev => prev.map(b => (b._id === id || b.id === id) ? { ...b, status: nextStatus } : b));
        setActiveDropdownId(null);
        alert(`Success: Status synchronized to ${nextStatus} & Clearance Dispatch executed.`);
      }
    } catch (err) {
      console.error("❌ Transmission breakdown during automated mail routing:", err);
      alert("Database mapping failed. Check backend telemetry server connection.");
    }
  };

  // Cycle status using updateStatus handler
  const cycleStatus = async (id) => {
    const target = bookings.find(b => b._id === id || b.id === id);
    if (!target) return;

    let next = 'PENDING';
    if (target.status === 'PENDING') next = 'APPROVED';
    else if (target.status === 'APPROVED') next = 'COMPLETED';

    await updateStatus(id, next);
  };

  // Delete booking from database
  const handleDeleteBooking = async (id) => {
    if (window.confirm(`Are you sure you want to permanently delete booking reference [${id}] from live cluster?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setBookings(prev => prev.filter(b => b._id !== id && b.id !== id));
        if (expandedBookingId === id) setExpandedBookingId(null);
        alert("Record purged successfully.");
      } catch (err) {
        console.error("❌ Purge failure:", err);
        alert("Failed to delete record from database.");
      }
    }
  };

  // Create new booking submission
  const handleAddBookingSubmit = async (e) => {
    e.preventDefault();
    if (!newClient || !newCar || !newService || !newDate || !newTime) {
      alert('Please fill out all core fields.');
      return;
    }

    const bookingPayload = {
      client: newClient,
      car: newCar,
      service: newService,
      date: newDate,
      time: newTime,
      status: newStatus,
      phone: newPhone || 'N/A',
      email: newEmail || 'N/A',
      notes: newNotes || 'No custom technician notes submitted.',
      estHpGains: newHpGains || 'N/A',
      fuelType: newFuelType || 'N/A',
      technician: newTechnician || 'TBD (Unassigned)'
    };

    try {
      const response = await axios.post(API_BASE_URL, bookingPayload);
      if (response.data) {
        fetchLiveBookings();
        setIsModalOpen(false);

        // Reset Form fields
        setNewClient('');
        setNewCar('');
        setNewService('');
        setNewDate('');
        setNewTime('');
        setNewStatus('PENDING');
        setNewNotes('');
        setNewHpGains('');
        setNewFuelType('');
        setNewTechnician('');
        setNewPhone('');
        setNewEmail('');
        alert("VIP Profile successfully instantiated inside live DB.");
      }
    } catch (error) {
      console.error("❌ Staging crash during create:", error);
      alert("Failed to save new booking to live database.");
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const bId = b._id || b.id || '';
      const matchSearch = 
        (b.client && b.client.toLowerCase().includes(search.toLowerCase())) ||
        (b.car && b.car.toLowerCase().includes(search.toLowerCase())) ||
        (b.service && b.service.toLowerCase().includes(search.toLowerCase())) ||
        bId.toLowerCase().includes(search.toLowerCase());
      
      const bStatus = b.status ? b.status.toUpperCase() : 'PENDING';
      const matchStatus = statusFilter === 'ALL' || bStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'PENDING').length;
    const approved = bookings.filter(b => b.status === 'APPROVED').length;
    const completed = bookings.filter(b => b.status === 'COMPLETED').length;
    return { total, pending, approved, completed };
  }, [bookings]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none p-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20 shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              TELEMETRY V1.4
            </span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">Consultation HQ</h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">Elite high-density tracking system for supercar bespoke performance, wrap, and fabrication bookings.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={3} /> Create VIP Booking
        </button>
      </div>

      {/* STATS PANEL */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Bookings</span>
            <Activity size={16} className="text-stone-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{stats.total}</span>
            <span className="text-[10px] text-stone-500 uppercase font-mono">records</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-white h-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        {/* Pending */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Pending Review</span>
            <Clock size={16} className="text-yellow-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-yellow-400 font-mono">{stats.pending}</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-yellow-400 h-full" style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}></div>
          </div>
        </div>
        {/* Approved */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Approved Queue</span>
            <Sparkles size={16} className="text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-400 font-mono">{stats.approved}</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-[#00C2FF] h-full" style={{ width: `${stats.total > 0 ? (stats.approved / stats.total) * 100 : 0}%` }}></div>
          </div>
        </div>
        {/* Completed */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Archived Projects</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-500/80 font-mono">{stats.completed}</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500/60 h-full" style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search by client, supercar or pack..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-black/40 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all duration-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'PENDING', 'APPROVED', 'COMPLETED'].map((filter) => {
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-extrabold tracking-wider transition-all duration-300 ${isActive ? 'bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30' : 'bg-white/5 text-stone-400 hover:text-white'}`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* TABULAR VIEW */}
      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-stone-400 font-black">
                <th className="p-5 pl-6 w-[120px]">Booking ID</th>
                <th className="p-5">Client & Supercar</th>
                <th className="p-5">Requested Modification</th>
                <th className="p-5">Scheduled Slot</th>
                <th className="p-5 w-[150px]">Status Badge</th>
                <th className="p-5 pr-6 w-[130px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-stone-200 font-medium">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const currentId = booking._id || booking.id;
                  const statusConf = getStatusConfig(booking.status);
                  const isExpanded = expandedBookingId === currentId;
                  
                  return (
                    <React.Fragment key={currentId}>
                      <tr 
                        className={`hover:bg-white/5 border-l-2 transition-all duration-300 group cursor-pointer ${isExpanded ? 'bg-white/5 border-[#00C2FF]' : 'border-transparent'}`}
                        onClick={() => setExpandedBookingId(isExpanded ? null : currentId)}
                      >
                        <td className="p-5 pl-6 font-mono text-xs font-black text-stone-400 group-hover:text-[#00C2FF] transition-colors">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${booking.status === 'PENDING' ? 'bg-yellow-400' : booking.status === 'APPROVED' ? 'bg-cyan-400' : 'bg-emerald-500'}`}></span>
                            {currentId ? currentId.substring(currentId.length - 7) : 'TBD'}
                          </div>
                        </td>

                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center font-bold text-xs text-white uppercase">
                              {booking.client ? booking.client.split(' ').map(n => n[0]).join('') : 'VIP'}
                            </div>
                            <div>
                              <div className="font-extrabold text-white tracking-wide text-sm">{booking.client}</div>
                              <div className="text-xs text-[#00C2FF] font-semibold flex items-center gap-1 mt-1 font-mono">
                                <Car size={12} /> {booking.car}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-5">
                          <div className="text-stone-300 font-semibold line-clamp-2 text-xs max-w-[280px]">{booking.service}</div>
                        </td>

                        <td className="p-5">
                          <div className="flex flex-col gap-1 font-mono text-xs">
                            <div className="flex items-center gap-1.5 text-stone-300 font-bold"><Calendar size={13} /> {booking.date}</div>
                            <div className="text-stone-500 text-[10px]"><Clock size={11} /> {booking.time}</div>
                          </div>
                        </td>

                        <td className="p-5" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => cycleStatus(currentId)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${statusConf.badgeClass}`}>
                            {statusConf.icon} {statusConf.label}
                          </button>
                        </td>

                        <td className="p-5 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-flex items-center justify-end gap-2">
                            <button onClick={() => setExpandedBookingId(isExpanded ? null : currentId)} className="p-2 rounded bg-white/5 border border-white/10 text-stone-400 hover:text-white"><SlidersHorizontal size={14} /></button>
                            <button onClick={(e) => { e.stopPropagation(); setActiveDropdownId(activeDropdownId === currentId ? null : currentId); }} className="p-2 rounded bg-white/5 border border-white/10 text-stone-400 hover:text-white"><MoreVertical size={14} /></button>

                            {/* ACTIONS DROPDOWN */}
                            {activeDropdownId === currentId && (
                              <div className="absolute right-0 top-9 w-52 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl z-50 py-1 text-left animate-in fade-in slide-in-from-top-2">
                                <div className="px-3 py-1.5 border-b border-white/5 text-[9px] uppercase tracking-wider font-bold text-stone-500 font-mono">Alter Milestone</div>
                                <button onClick={() => updateStatus(currentId, 'PENDING')} className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-yellow-400 hover:bg-yellow-500/10 flex items-center gap-2"><Clock size={12} className="text-yellow-400" /> Move to Pending</button>
                                <button onClick={() => updateStatus(currentId, 'APPROVED')} className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-cyan-400 hover:bg-[#00C2FF]/10 flex items-center gap-2"><CheckCircle2 size={12} className="text-cyan-400" /> Approve Request</button>
                                <button onClick={() => updateStatus(currentId, 'COMPLETED')} className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-emerald-500 hover:bg-emerald-500/10 flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Complete & Archive</button>
                                
                                <div className="border-t border-white/5 my-1"></div>
                                
                                {/* WHATSAPP MANUAL DISPATCH */}
                                <div className="px-3 py-1 border-b border-white/5 text-[9px] uppercase tracking-wider font-bold text-[#00C2FF] font-mono">Manual Dispatch</div>
                                <button onClick={() => triggerWhatsAppPing(booking, booking.status)} className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-green-400 hover:bg-green-500/10 flex items-center gap-2"><MessageSquare size={12} className="text-green-400" /> Send WhatsApp Ping</button>
                                
                                <div className="border-t border-white/5 my-1"></div>
                                <button onClick={() => handleDeleteBooking(currentId)} className="w-full px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={12} /> Delete Record</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* DETAIL DRAWER */}
                      {isExpanded && (
                        <tr className="bg-black/30 border-l-2 border-[#00C2FF]/80">
                          <td colSpan="6" className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 bg-[#00C2FF]/5 border-b border-l border-white/10 text-[9px] font-mono text-[#00C2FF] font-bold">TUNING METRICS</div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5"><Gauge size={14} className="text-[#00C2FF]" /> Vehicle Parameters</h4>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                  <div className="bg-black/30 border border-white/5 p-2 rounded">
                                    <span className="text-[10px] text-stone-500 block mb-1 uppercase font-mono">Est Power Gain</span>
                                    <span className="font-mono font-bold text-white text-xs">{booking.estHpGains}</span>
                                  </div>
                                  <div className="bg-black/30 border border-white/5 p-2 rounded">
                                    <span className="text-[10px] text-stone-500 block mb-1 uppercase font-mono">Fuel Subsystem</span>
                                    <span className="font-mono font-bold text-[#00C2FF] text-xs">{booking.fuelType}</span>
                                  </div>
                                  <div className="bg-black/30 border border-white/5 p-2 rounded col-span-2">
                                    <span className="text-[10px] text-stone-500 block mb-1 uppercase font-mono">Assigned Master Tech</span>
                                    <span className="font-semibold text-stone-200 text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]"></span>{booking.technician}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white/5 border border-white/10 rounded-xl p-4 lg:col-span-2 flex flex-col justify-between">
                                <div>
                                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5"><FileText size={14} className="text-stone-400" /> Technician Dispatch & Setup Notes</h4>
                                  <p className="text-xs text-stone-400 font-semibold leading-relaxed bg-black/20 p-3 border border-white/5 rounded-lg italic">"{booking.notes}"</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4 text-[10px] text-stone-500 font-mono">
                                  <span>ID REFERENCE: {currentId} | CLIENT EMAIL: {booking.email}</span>
                                  <span className="text-[#00C2FF] font-bold">READY FOR DISPATCH // STAGE ACTIVE</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-stone-500">No matching live bookings found inside current cluster.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE VIP BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-black/90 border border-white/10 rounded-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2"><Sparkles size={18} className="text-[#00C2FF]" /> Initiate VIP Supercar Booking</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-stone-500 hover:text-white rounded-lg bg-white/5"><X size={16} /></button>
            </div>
            
            <form onSubmit={handleAddBookingSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Client Full Name *</label>
                  <input type="text" required value={newClient} onChange={(e) => setNewClient(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Supercar Model *</label>
                  <input type="text" required value={newCar} onChange={(e) => setNewCar(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
                </div>
              </div>

              {/* COMM TERM INPUTS (PHONE & EMAIL) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Client Phone (WhatsApp Grid) *</label>
                  <input type="tel" placeholder="e.g. 0771234567" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Client Email Address *</label>
                  <input type="email" placeholder="e.g. client@gmail.com" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Service Package *</label>
                <input type="text" required value={newService} onChange={(e) => setNewService(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Scheduled Date *</label>
                  <input type="text" required value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Scheduled Time *</label>
                  <input type="text" required value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Initial Status</label>
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:border-[#00C2FF] outline-none">
                    <option value="PENDING">PENDING REVIEW</option>
                    <option value="APPROVED">APPROVED QUEUE</option>
                    <option value="COMPLETED">COMPLETED & ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border border-white/10 text-stone-400 text-xs font-bold uppercase tracking-widest">Discard</button>
                <button type="submit" className="px-5 py-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black text-xs font-extrabold uppercase tracking-widest rounded-lg shadow-md">Initiate Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}