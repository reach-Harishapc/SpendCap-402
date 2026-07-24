import React from 'react';
import { ShieldCheck, ArrowRight, Cpu, Activity, Terminal, Layers, Lock, CheckCircle2, Zap, Sparkles, Bot } from 'lucide-react';

interface LandingHomeProps {
  onLaunchConsole: () => void;
  setActiveTab: (tab: string) => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({ onLaunchConsole, setActiveTab }) => {
  return (
    <div className="space-y-16 py-6 animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Hero Section */}
      <section className="relative text-center space-y-6 max-w-4xl mx-auto py-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Brainwave 2026 — X402 Blockchain Track</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Prevent Autonomous AI Agent <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Wallet Over-Spend
          </span> with x402
        </h1>

        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          SpendCap 402 is an Enterprise Egress Proxy Firewall & Rule-Based Policy Engine enforcing the HTTP 402 Payment Required standard for autonomous AI agent fleets.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onLaunchConsole}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Cpu className="w-5 h-5" />
            Launch Dashboard Console
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-all"
          >
            <Activity className="w-5 h-5 text-indigo-400" />
            Explore Live x402 Inspector
          </button>
        </div>
      </section>

      {/* Capabilities Feature Showcase */}
      <section className="space-y-6 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Platform Core Capabilities</h2>
          <p className="text-xs text-slate-400">Everything needed to secure and monetize autonomous agent payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Capability 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Egress Policy Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enforces strict per-call caps ($/call), daily budget ceilings ($/24h), and authorized domain whitelists.
            </p>
          </div>

          {/* Capability 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">EIP-712 Receipt Vault</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates cryptographic typed signatures & immutable transaction receipts on Base Mainnet (8453).
            </p>
          </div>

          {/* Capability 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-sky-500/50 transition-all">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Multi-Agent Swarm</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous AI agent chat copilot executing tool functions (`check_quota`, `x402_pay`) in real time.
            </p>
          </div>

          {/* Capability 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-purple-500/50 transition-all">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Live Timeseries Stream</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time IndexedDB-style timeseries graph monitoring micropayments and firewall blocks every 4 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Card */}
      <section className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-extrabold text-white">How the HTTP 402 Lifecycle Works</h2>
          <p className="text-xs text-slate-400">The 4-step challenge-sign-settle loop managed by SpendCap Proxy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-indigo-400 font-bold">1. AI Agent Call</div>
            <p className="text-slate-400 font-sans text-xs">Agent requests monetized API endpoint.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-amber-400 font-bold">2. HTTP 402 Challenge</div>
            <p className="text-slate-400 font-sans text-xs">Server returns HTTP 402 with price & nonce.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-sky-400 font-bold">3. Policy Check</div>
            <p className="text-slate-400 font-sans text-xs">Proxy checks budget & signs EIP-712 payload.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-emerald-400 font-bold">4. Settle & Receipt</div>
            <p className="text-slate-400 font-sans text-xs">Server settles fee & issues 200 OK + Receipt.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
