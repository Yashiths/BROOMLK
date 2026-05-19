import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Mail, 
  DollarSign, 
  Bell, 
  ShieldAlert, 
  Cpu, 
  Save, 
  Sparkles, 
  CheckCircle2, 
  Database, 
  Lock,
  X 
} from 'lucide-react';

export default function AdminSettings() {
  // General Info
  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@broomlk.com');
  
  // Financial specs
  const [currency, setCurrency] = useState('USD ($)');
  const [consultationFee, setConsultationFee] = useState('150');

  // Cyber Toggles
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);

  // Success indicator
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20 shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              SYSTEM CONTROL
            </span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">
            SYSTEM SETTINGS
          </h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">
            Adjust global variables, security configurations, base fees, and email telemetry switches.
          </p>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {showSavedToast && (
        <div className="bg-[#00C2FF]/10 border border-[#00C2FF]/40 rounded-xl p-4 flex items-center justify-between backdrop-blur-xl shadow-[0_0_20px_rgba(0,194,255,0.15)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#00C2FF]/20 border border-[#00C2FF]/30 flex items-center justify-center text-[#00C2FF] shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-wider">Telemetry Variables Synchronized</p>
              <p className="text-[10px] text-stone-400 font-medium mt-0.5">All global modifications saved successfully to garage persistent memory database.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setShowSavedToast(false)}
            className="text-stone-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* FORM BODY CONTAINER */}
      <form onSubmit={handleSaveChanges} className="space-y-6">
        
        {/* ROW 1: PROFILE & FINANCIALS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* PROFILE SETTINGS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="border-b border-white/5 pb-4 flex items-center gap-2">
              <Settings className="text-[#00C2FF]" size={18} />
              <h2 className="text-lg font-black text-white uppercase tracking-tight">Admin Profile Credentials</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1.5">
                  <User size={12} className="text-stone-500" />
                  Admin Name / Identity Key
                </label>
                <input 
                  type="text" 
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1.5">
                  <Mail size={12} className="text-stone-500" />
                  Contact Dispatch Email
                </label>
                <input 
                  type="email" 
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold"
                />
              </div>
            </div>
          </div>

          {/* FINANCIAL SETTINGS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="border-b border-white/5 pb-4 flex items-center gap-2">
              <DollarSign className="text-[#00C2FF]" size={18} />
              <h2 className="text-lg font-black text-white uppercase tracking-tight">Store Valuation Params</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                  System Standard Currency
                </label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold"
                >
                  <option value="USD ($)">USD - US Dollar ($)</option>
                  <option value="LKR (Rs.)">LKR - Sri Lankan Rupee (Rs.)</option>
                  <option value="EUR (€)">EUR - Euro (€)</option>
                  <option value="GBP (£)">GBP - British Pound (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 flex items-center gap-1.5">
                  <DollarSign size={12} className="text-stone-500" />
                  Base Consultation Booking Fee
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 font-mono text-xs">
                    $
                  </span>
                  <input 
                    type="number" 
                    required
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-stone-900/80 border border-white/10 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-bold font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 2: SYSTEM TOGGLES */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="border-b border-white/5 pb-4 flex items-center gap-2">
            <Cpu className="text-[#00C2FF]" size={18} />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">Telemetry & Infrastructure Switches</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* MAINTENANCE MODE */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert size={12} className="text-yellow-400" />
                  Maintenance Mode
                </p>
                <p className="text-[10px] text-stone-500 font-medium leading-relaxed">Limit public client modifications page load.</p>
              </div>

              {/* CYBER TOGGLE */}
              <button 
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 shrink-0 ${
                  maintenanceMode 
                    ? 'bg-cyan-500 shadow-[0_0_12px_#00C2FF]' 
                    : 'bg-stone-800'
                }`}
              >
                <div className={`bg-black w-4 h-4 rounded-full transition-transform duration-300 ${
                  maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {/* EMAIL TELEMETRY */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                  <Bell size={12} className="text-[#00C2FF]" />
                  Live Dispatch Alerts
                </p>
                <p className="text-[10px] text-stone-500 font-medium leading-relaxed">Deliver booking emails directly to technician box.</p>
              </div>

              {/* CYBER TOGGLE */}
              <button 
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 shrink-0 ${
                  emailNotifications 
                    ? 'bg-cyan-500 shadow-[0_0_12px_#00C2FF]' 
                    : 'bg-stone-800'
                }`}
              >
                <div className={`bg-black w-4 h-4 rounded-full transition-transform duration-300 ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {/* SECURE DATABASE TUNNEL */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                  <Lock size={12} className="text-emerald-400" />
                  MFA Access Lockout
                </p>
                <p className="text-[10px] text-stone-500 font-medium leading-relaxed">Enforce strict biometric token checks on auth.</p>
              </div>

              {/* CYBER TOGGLE */}
              <button 
                type="button"
                onClick={() => setMfaEnabled(!mfaEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 shrink-0 ${
                  mfaEnabled 
                    ? 'bg-cyan-500 shadow-[0_0_12px_#00C2FF]' 
                    : 'bg-stone-800'
                }`}
              >
                <div className={`bg-black w-4 h-4 rounded-full transition-transform duration-300 ${
                  mfaEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

          </div>
        </div>

        {/* SAVE SUBMIT ACTION */}
        <div className="flex items-center justify-end">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Save size={16} strokeWidth={2.5} />
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
}
