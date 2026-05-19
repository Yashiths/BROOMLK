import React, { useState, useMemo } from 'react';
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
  Gauge 
} from 'lucide-react';

const INITIAL_BOOKINGS = [
  { 
    id: 'BK-9110', 
    client: 'Amila Perera', 
    car: 'Porsche 911 GT3 RS (992)', 
    service: 'Stage 2 Performance Remap & Custom Titanium IPE Exhaust', 
    date: 'May 24, 2026', 
    time: '10:00 AM', 
    status: 'PENDING',
    notes: 'Client requests custom dyno graphs and decat validation. Ensure active aero calibration remains intact.',
    estHpGains: '+65 WHP',
    fuelType: 'Octane 98 + Octane Booster',
    technician: 'Kamal Silva (Lead Tuner)'
  },
  { 
    id: 'BK-3501', 
    client: 'Hirun Wijesinghe', 
    car: 'Nissan GT-R R35', 
    service: 'Liberty Walk Widebody Kit & AirRex Suspension Integration', 
    date: 'May 26, 2026', 
    time: '02:30 PM', 
    status: 'APPROVED',
    notes: 'Needs custom offsets for forged LD97 wheels. Calibrate fender clearance for extreme low setting.',
    estHpGains: 'N/A (Aero Focus)',
    fuelType: 'N/A',
    technician: 'Roshan Ranasinghe (Master Fabricator)'
  },
  { 
    id: 'BK-8108', 
    client: 'Dilshan Senanayake', 
    car: 'Audi R8 V10 Plus', 
    service: 'Custom Full Adhesives Satin PPF & Vorsteiner Carbon Aero', 
    date: 'May 28, 2026', 
    time: '09:00 AM', 
    status: 'APPROVED',
    notes: 'Self-healing PPF film. 10-year warranty certificate required. Disassemble taillights for seamless wrap tucking.',
    estHpGains: 'N/A (Cosmetic Focus)',
    fuelType: 'N/A',
    technician: 'Nishan Perera (Detailing Specialist)'
  },
  { 
    id: 'BK-4582', 
    client: 'Suresh Rajapakse', 
    car: 'Ferrari 458 Spider', 
    service: 'Novitec Exhaust System Upgrade & H&R Lowering Springs', 
    date: 'June 01, 2026', 
    time: '11:30 AM', 
    status: 'PENDING',
    notes: 'Signature exhaust sound tuning. Preserve factory nose-lift system functionality. Alignment to Novitec specs.',
    estHpGains: '+22 WHP',
    fuelType: 'Octane 98',
    technician: 'Kamal Silva (Lead Tuner)'
  },
  { 
    id: 'BK-7203', 
    client: 'Menaka Jayasinghe', 
    car: 'McLaren 720S', 
    service: 'Stage 3 Methanol Injection & Pure Turbos Upgrade', 
    date: 'June 04, 2026', 
    time: '04:00 PM', 
    status: 'APPROVED',
    notes: 'Aiming for 950+ WHP on pump gas. Install custom safety harness. Conduct multiple high-boost dyno runs.',
    estHpGains: '+240 WHP',
    fuelType: 'Octane 98 + Water/Meth',
    technician: 'Kamal Silva (Lead Tuner)'
  },
  { 
    id: 'BK-6304', 
    client: 'Ruwan Pathirana', 
    car: 'Lamborghini Huracán STO', 
    service: 'Full Body PPF Wrap & Bespoke Alcantara Interior Stitching', 
    date: 'May 15, 2026', 
    time: '01:00 PM', 
    status: 'COMPLETED',
    notes: 'Delivered to VIP residence via closed trailer. Complete detailing inspection passed by owner.',
    estHpGains: 'N/A',
    fuelType: 'N/A',
    technician: 'Nishan Perera (Detailing Specialist)'
  }
];

export default function AdminConsultations() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
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

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleOutsideClick = () => setActiveDropdownId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const getStatusConfig = (status) => {
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

  // Handler to update status directly
  const updateStatus = (id, nextStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: nextStatus } : b));
    setActiveDropdownId(null);
  };

  // Dynamic cycle function
  const cycleStatus = (id) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        let next = 'PENDING';
        if (b.status === 'PENDING') next = 'APPROVED';
        else if (b.status === 'APPROVED') next = 'COMPLETED';
        return { ...b, status: next };
      }
      return b;
    }));
  };

  // Delete booking handler
  const deleteBooking = (id) => {
    if (window.confirm(`Are you sure you want to remove booking ${id}?`)) {
      setBookings(prev => prev.filter(b => b.id !== id));
      if (expandedBookingId === id) setExpandedBookingId(null);
    }
  };

  // Add new booking submission handler
  const handleAddBookingSubmit = (e) => {
    e.preventDefault();
    if (!newClient || !newCar || !newService || !newDate || !newTime) {
      alert('Please fill out all core fields.');
      return;
    }

    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: `BK-${randomIdSuffix}`,
      client: newClient,
      car: newCar,
      service: newService,
      date: newDate,
      time: newTime,
      status: newStatus,
      notes: newNotes || 'No custom technician notes submitted.',
      estHpGains: newHpGains || 'N/A',
      fuelType: newFuelType || 'N/A',
      technician: newTechnician || 'TBD (Unassigned)'
    };

    setBookings(prev => [newBooking, ...prev]);
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
  };

  // Filtered and searched list
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = 
        b.client.toLowerCase().includes(search.toLowerCase()) ||
        b.car.toLowerCase().includes(search.toLowerCase()) ||
        b.service.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase());
      
      const matchStatus = statusFilter === 'ALL' || b.status.toUpperCase() === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  // Statistics calculation based on live state
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'PENDING').length;
    const approved = bookings.filter(b => b.status === 'APPROVED').length;
    const completed = bookings.filter(b => b.status === 'COMPLETED').length;
    return { total, pending, approved, completed };
  }, [bookings]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20 shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              TELEMETRY V1.4
            </span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">
            Consultation HQ
          </h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">
            Elite high-density tracking system for supercar bespoke performance, wrap, and fabrication bookings.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={3} />
          Create VIP Booking
        </button>
      </div>

      {/* TELEMETRY STATS PANEL */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TOTAL BOOKINGS */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-10 bg-white group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Bookings</span>
            <Activity size={16} className="text-stone-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{stats.total}</span>
            <span className="text-[10px] text-stone-500 uppercase font-mono">records</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-white h-full transition-all duration-500" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* PENDING APPROVAL */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-10 bg-yellow-500 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Pending Review</span>
            <Clock size={16} className="text-yellow-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-yellow-400 font-mono">{stats.pending}</span>
            <span className="text-[10px] text-yellow-400/50 uppercase font-mono">awaiting</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className="bg-yellow-400 h-full transition-all duration-500 shadow-[0_0_8px_rgba(250,204,21,0.5)]" 
              style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* APPROVED & ACTIVE */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-10 bg-cyan-400 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Approved Queue</span>
            <Sparkles size={16} className="text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-400 font-mono">{stats.approved}</span>
            <span className="text-[10px] text-cyan-400/50 uppercase font-mono">active</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className="bg-[#00C2FF] h-full transition-all duration-500 shadow-[0_0_8px_rgba(0,194,255,0.5)]" 
              style={{ width: `${stats.total > 0 ? (stats.approved / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* ARCHIVED / COMPLETED */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-10 bg-emerald-500 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Archived Projects</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-500/80 font-mono">{stats.completed}</span>
            <span className="text-[10px] text-emerald-500/50 uppercase font-mono">completed</span>
          </div>
          <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500/60 h-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
              style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* SEARCH INPUT */}
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
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* STATUS FILTER PILLS */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter size={12} />
            Status:
          </span>
          {['ALL', 'PENDING', 'APPROVED', 'COMPLETED'].map((filter) => {
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-extrabold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30 shadow-[0_0_12px_rgba(0,194,255,0.1)]'
                    : 'bg-white/5 text-stone-400 border border-transparent hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

      </div>

      {/* DYNAMIC TELEMETRY TABULAR VIEW */}
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
                  const statusConf = getStatusConfig(booking.status);
                  const isExpanded = expandedBookingId === booking.id;
                  
                  return (
                    <React.Fragment key={booking.id}>
                      <tr 
                        className={`hover:bg-white/5 border-l-2 transition-all duration-300 group cursor-pointer ${
                          isExpanded 
                            ? 'bg-white/5 border-[#00C2FF]' 
                            : 'border-transparent hover:border-white/20'
                        }`}
                        onClick={() => setExpandedBookingId(isExpanded ? null : booking.id)}
                      >
                        {/* BOOKING ID */}
                        <td className="p-5 pl-6 font-mono text-xs font-black text-stone-400 group-hover:text-[#00C2FF] transition-colors">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              booking.status === 'PENDING' ? 'bg-yellow-400 shadow-[0_0_6px_#facc15]' :
                              booking.status === 'APPROVED' ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' :
                              'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                            }`}></span>
                            {booking.id}
                          </div>
                        </td>

                        {/* CLIENT & SUPERCAR */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center font-bold text-xs text-white uppercase shadow-inner select-none">
                              {booking.client.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-extrabold text-white tracking-wide text-sm flex items-center gap-1.5">
                                {booking.client}
                                <span className="text-[10px] text-stone-500 font-mono font-normal">VIP</span>
                              </div>
                              <div className="text-xs text-[#00C2FF] font-semibold flex items-center gap-1 mt-1 font-mono uppercase tracking-wide">
                                <Car size={12} className="opacity-70" />
                                {booking.car}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* REQUESTED SERVICE */}
                        <td className="p-5">
                          <div className="text-stone-300 font-semibold leading-relaxed max-w-[280px] line-clamp-2 text-xs">
                            {booking.service}
                          </div>
                        </td>

                        {/* SCHEDULED DATE & TIME */}
                        <td className="p-5">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-stone-300 text-xs font-bold font-mono">
                              <Calendar size={13} className="text-stone-500" />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1.5 text-stone-500 text-[10px] font-mono font-semibold">
                              <Clock size={11} />
                              {booking.time}
                            </div>
                          </div>
                        </td>

                        {/* STATUS BADGE BUTTON */}
                        <td className="p-5" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => cycleStatus(booking.id)}
                            title="Click to cycle status: Pending ➜ Approved ➜ Completed"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 hover:scale-105 ${statusConf.badgeClass}`}
                          >
                            {statusConf.icon}
                            {statusConf.label}
                          </button>
                        </td>

                        {/* ACTIONS COLUMN */}
                        <td className="p-5 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-flex items-center justify-end gap-2">
                            
                            {/* Expand row trigger */}
                            <button
                              onClick={() => setExpandedBookingId(isExpanded ? null : booking.id)}
                              title={isExpanded ? "Collapse Details" : "Expand Details"}
                              className={`p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all ${
                                isExpanded ? 'text-[#00C2FF] border-[#00C2FF]/30' : 'text-stone-400 hover:text-white'
                              }`}
                            >
                              <SlidersHorizontal size={14} />
                            </button>

                            {/* Dropdown Menu Trigger */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownId(activeDropdownId === booking.id ? null : booking.id);
                              }}
                              className={`p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-stone-400 hover:text-white ${
                                activeDropdownId === booking.id ? 'bg-[#00C2FF]/10 border-[#00C2FF]/30 text-white' : ''
                              }`}
                            >
                              <MoreVertical size={14} />
                            </button>

                            {/* DROPDOWN MENU */}
                            {activeDropdownId === booking.id && (
                              <div className="absolute right-0 top-9 w-44 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 py-1 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-3 py-1.5 border-b border-white/5 text-[9px] uppercase tracking-wider font-bold text-stone-500 font-mono">
                                  Alter Milestone
                                </div>
                                <button 
                                  onClick={() => updateStatus(booking.id, 'PENDING')}
                                  className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-yellow-400 hover:bg-yellow-500/10 flex items-center gap-2 transition-colors"
                                >
                                  <Clock size={12} className="text-yellow-400" />
                                  Pending Review
                                </button>
                                <button 
                                  onClick={() => updateStatus(booking.id, 'APPROVED')}
                                  className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-cyan-400 hover:bg-[#00C2FF]/10 flex items-center gap-2 transition-colors"
                                >
                                  <CheckCircle2 size={12} className="text-cyan-400" />
                                  Approve Request
                                </button>
                                <button 
                                  onClick={() => updateStatus(booking.id, 'COMPLETED')}
                                  className="w-full px-3 py-2 text-xs font-semibold text-stone-300 hover:text-emerald-500 hover:bg-emerald-500/10 flex items-center gap-2 transition-colors"
                                >
                                  <Check size={12} className="text-emerald-500" />
                                  Complete & Archive
                                </button>
                                <div className="border-t border-white/5 my-1"></div>
                                <button 
                                  onClick={() => deleteBooking(booking.id)}
                                  className="w-full px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                                >
                                  <Trash2 size={12} />
                                  Delete Record
                                </button>
                              </div>
                            )}

                          </div>
                        </td>
                      </tr>

                      {/* HIGH-DENSITY DETAIL DRAWER */}
                      {isExpanded && (
                        <tr className="bg-black/30 border-l-2 border-[#00C2FF]/80 animate-in fade-in slide-in-from-top-2 duration-300">
                          <td colSpan="6" className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              
                              {/* TELEMETRY SPECS */}
                              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 bg-[#00C2FF]/5 border-b border-l border-white/10 text-[9px] font-mono text-[#00C2FF] font-bold">
                                  TUNING METRICS
                                </div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                  <Gauge size={14} className="text-[#00C2FF]" />
                                  Vehicle Parameters
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                  <div className="bg-black/30 border border-white/5 p-2 rounded">
                                    <span className="text-[10px] text-stone-500 block mb-1 uppercase tracking-wider font-mono">Est Power Gain</span>
                                    <span className="font-mono font-bold text-white text-xs">{booking.estHpGains}</span>
                                  </div>
                                  <div className="bg-black/30 border border-white/5 p-2 rounded">
                                    <span className="text-[10px] text-stone-500 block mb-1 uppercase tracking-wider font-mono">Fuel Subsystem</span>
                                    <span className="font-mono font-bold text-[#00C2FF] text-xs">{booking.fuelType}</span>
                                  </div>
                                  <div className="bg-black/30 border border-white/5 p-2 rounded col-span-2">
                                    <span className="text-[10px] text-stone-500 block mb-1 uppercase tracking-wider font-mono">Assigned Master Tech</span>
                                    <span className="font-semibold text-stone-200 text-xs flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]"></span>
                                      {booking.technician}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* DIAGNOSTIC COMMENTS */}
                              <div className="bg-white/5 border border-white/10 rounded-xl p-4 lg:col-span-2 flex flex-col justify-between">
                                <div>
                                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <FileText size={14} className="text-stone-400" />
                                    Technician Dispatch & Setup Notes
                                  </h4>
                                  <p className="text-xs text-stone-400 font-semibold leading-relaxed bg-black/20 p-3 border border-white/5 rounded-lg italic">
                                    "{booking.notes}"
                                  </p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4 text-[10px] text-stone-500 font-mono">
                                  <span>ID REFERENCE: {booking.id}</span>
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
                  <td colSpan="6" className="p-12 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-600">
                        <Search size={20} />
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">No matching bookings</h3>
                      <p className="text-xs text-stone-500 leading-normal font-medium">
                        Your filter parameters did not yield any telemetry results. Try adjusting the search query or status filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE BOOKING MODAL (GLASSMORPHIC DIALOG) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-black/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,194,255,0.15)] z-10 max-h-[90vh] flex flex-col animate-in scale-in duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-[#00C2FF]" />
                  Initiate VIP Supercar Booking
                </h3>
                <p className="text-stone-400 text-[11px] font-medium tracking-wide">Enter telemetry specs and custom garage mod request parameters.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-500 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddBookingSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Client & Car Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <User size={12} className="text-stone-500" />
                    Client Full Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Amila Perera"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <Car size={12} className="text-stone-500" />
                    Supercar Model *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Porsche 911 GT3 RS"
                    value={newCar}
                    onChange={(e) => setNewCar(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

              </div>

              {/* Service Package */}
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                  <Wrench size={12} className="text-stone-500" />
                  Service Package & Modification Scale *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Stage 2 Performance Remap & Custom Titanium Exhaust"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                />
              </div>

              {/* Slot Schedule & Initial Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <Calendar size={12} className="text-stone-500" />
                    Scheduled Date *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. May 24, 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <Clock size={12} className="text-stone-500" />
                    Scheduled Time *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10:00 AM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1">
                    <Activity size={12} className="text-stone-500" />
                    Initial Stage Status
                  </label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  >
                    <option value="PENDING" className="bg-[#050505] text-yellow-400">PENDING REVIEW</option>
                    <option value="APPROVED" className="bg-[#050505] text-cyan-400">APPROVED QUEUE</option>
                    <option value="COMPLETED" className="bg-[#050505] text-emerald-500">COMPLETED & ARCHIVED</option>
                  </select>
                </div>

              </div>

              {/* Advanced Diagnostic specs */}
              <div className="border-t border-white/10 pt-4">
                <span className="block text-[10px] font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
                  Telemetry Spec & Diagnostic Matrix (Optional)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Est HP Gains</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +65 WHP"
                      value={newHpGains}
                      onChange={(e) => setNewHpGains(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Fuel Subsystem</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Octane 98 + Meth"
                      value={newFuelType}
                      onChange={(e) => setNewFuelType(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Lead Technician</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Kamal Silva"
                      value={newTechnician}
                      onChange={(e) => setNewTechnician(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Bespoke Workshop Notes</label>
                  <textarea 
                    placeholder="Enter special technical details, client requests, dyno settings, or safety requirements..."
                    rows="3"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-lg bg-[#00C2FF] hover:bg-[#00a3d6] text-black text-xs font-extrabold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                >
                  Initiate Booking
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
