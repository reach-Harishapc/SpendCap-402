import React from 'react';
import { ShieldCheck, Cpu, Activity, Terminal, Layers, Home, LogOut, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isLoggedIn, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Cpu },
    { id: 'inspector', label: 'Live Inspector', icon: Activity },
    { id: 'playground', label: 'API Playground', icon: Terminal },
    { id: 'architecture', label: 'Architecture', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 h-16 flex items-center justify-between">
      <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between gap-6">
        
        {/* Left: Brand Identity & Network Badge */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-300/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black tracking-tight text-white">
                SpendCap<span className="text-indigo-400">402</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                Egress Proxy
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-slate-300 font-mono font-medium">Base Mainnet (8453)</span>
          </div>
        </div>

        {/* Center: Standard Navigation Tabs */}
        {isLoggedIn && (
          <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/90 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Judge Credentials & Sign Out */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              Judge Demo Mode
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
