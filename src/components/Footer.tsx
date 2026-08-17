import React from 'react';
import { ShieldCheck, Github, ExternalLink, Globe, Layers, BookOpen, FileCode } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4 lg:px-8 mt-12 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand & Tagline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              SpendCap<span className="text-indigo-400">402</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enterprise Egress Proxy Firewall & Rule-Based Policy Engine enforcing the HTTP 402 Payment Required standard for autonomous AI agent fleets.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            Open Source under MIT License
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Application Modules</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-indigo-400 transition-colors">
                Platform Capabilities Home
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-indigo-400 transition-colors">
                Dashboard & Fleet Quotas
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('inspector')} className="hover:text-indigo-400 transition-colors">
                Live x402 Protocol Inspector
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('playground')} className="hover:text-indigo-400 transition-colors">
                Interactive API Playground
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Standards */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Compliance</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenPrivacy} className="hover:text-indigo-400 transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={onOpenTerms} className="hover:text-indigo-400 transition-colors">
                Terms of Service
              </button>
            </li>
            <li className="flex items-center gap-1.5 text-slate-400 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>HTTP 402 (RFC 7231)</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Algorand Testnet (@x402/avm)</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Network & Protocol Specs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Protocol Standards</h4>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
            <div className="font-semibold text-white">GoPlausible Facilitator Rail</div>
            <div className="text-slate-400 text-[11px]">@x402/avm Cryptographic Signatures</div>
            <div className="text-emerald-400 font-mono text-[10px] font-bold">Algorand Testnet / Lora Explorer</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 SpendCap 402. All rights reserved. Production Enterprise Standard.</div>
        <div className="flex items-center gap-4">
          <button onClick={onOpenPrivacy} className="hover:text-slate-300">Privacy Policy</button>
          <span>•</span>
          <button onClick={onOpenTerms} className="hover:text-slate-300">Terms of Service</button>
          <span>•</span>
          <a href="https://github.com/reach-Harishapc/SpendCap-402" target="_blank" rel="noreferrer" className="hover:text-slate-300 flex items-center gap-1">
            <Github className="w-4 h-4" /> GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
};
