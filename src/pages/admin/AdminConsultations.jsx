import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Check, MoreVertical } from 'lucide-react';

const INITIAL_BOOKINGS = [
  { id: 'BK-1042', client: 'Ryan D.', car: 'Porsche 911 GT3 RS', service: 'Stage 2 Remap & Exhaust', date: 'Oct 24, 2026', status: 'Pending' },
  { id: 'BK-1041', client: 'Sarah M.', car: 'BMW M4 Competition', service: 'Full Carbon Fiber Kit', date: 'Oct 22, 2026', status: 'Approved' },
  { id: 'BK-1040', client: 'David L.', car: 'Nissan GT-R R35', service: 'Liberty Walk Widebody', date: 'Oct 18, 2026', status: 'Completed' },
  { id: 'BK-1039', client: 'Jason K.', car: 'Audi R8 V10', service: 'Air Suspension Setup', date: 'Oct 15, 2026', status: 'Approved' },
  { id: 'BK-1038', client: 'Elena R.', car: 'Mercedes AMG GT', service: 'Custom Wrap & Detailing', date: 'Oct 12, 2026', status: 'Completed' },
];

export default function AdminConsultations() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Approved': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Completed': return 'text-[#00C2FF] bg-[#00C2FF]/10 border-[#00C2FF]/20';
      default: return 'text-stone-400 bg-white/10 border-white/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={12} />;
      case 'Approved': return <CheckCircle2 size={12} />;
      case 'Completed': return <Check size={12} />;
      default: return null;
    }
  };

  const cycleStatus = (id) => {
    setBookings(bookings.map(booking => {
      if (booking.id === id) {
        const nextStatus = booking.status === 'Pending' ? 'Approved' : booking.status === 'Approved' ? 'Completed' : 'Pending';
        return { ...booking, status: nextStatus };
      }
      return booking;
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-1">Consultation HQ</h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">Manage client bookings and project scheduling.</p>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                <th className="p-5 pl-6">Booking ID</th>
                <th className="p-5">Client & Vehicle</th>
                <th className="p-5">Requested Service</th>
                <th className="p-5">Date</th>
                <th className="p-5">Status</th>
                <th className="p-5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-stone-200 font-medium">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-5 pl-6 font-mono font-bold text-stone-300">
                    {booking.id}
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-white tracking-wide">{booking.client}</div>
                    <div className="text-xs text-stone-500 mt-1">{booking.car}</div>
                  </td>
                  <td className="p-5 text-stone-300">{booking.service}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-wider">
                      <Calendar size={14} />
                      {booking.date}
                    </div>
                  </td>
                  <td className="p-5">
                    <button 
                      onClick={() => cycleStatus(booking.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 hover:scale-105 ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </button>
                  </td>
                  <td className="p-5 pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
