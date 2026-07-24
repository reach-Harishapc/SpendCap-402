import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Key, CheckCircle2, Sparkles, Cpu } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('admin@spendcap402.io');
  const [password, setPassword] = useState<string>('x402-demo-2026');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-700/80 bg-slate-900/90 shadow-2xl space-y-6 relative z-10">
        
        {/* Brand Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 mx-auto border border-indigo-300/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            SpendCap<span className="text-indigo-400">402</span>
          </h1>
          <p className="text-xs text-slate-400">
            Enterprise x402 Micropayment Proxy & AI Agent Egress Firewall
          </p>
        </div>

        {/* Demo Administrator Credentials Banner */}
        <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-xs space-y-1.5">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Demo Administrator Credentials
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-300">
            <span>Email: <strong className="text-white">admin@spendcap402.io</strong></span>
            <span>Pass: <strong className="text-white">x402-demo-2026</strong></span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                1-Click Demo Admin Login
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Feature Highlights Footer */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 grid grid-cols-2 gap-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>HTTP 402 Standard</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Base Mainnet (8453)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
