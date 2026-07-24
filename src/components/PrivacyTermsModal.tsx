import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface PrivacyTermsModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 relative max-h-[85vh] overflow-y-auto space-y-4 font-sans text-slate-300 text-xs">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <>
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                <p className="text-xs text-slate-400">Last updated: July 2026 — SpendCap 402 Open Source Standard</p>
              </div>
            </div>

            <div className="space-y-3 leading-relaxed">
              <h4 className="font-bold text-white text-sm">1. Cryptographic Key Privacy</h4>
              <p>SpendCap 402 processes EIP-712 typed signature authorizations locally within the proxy layer. Private wallet keys are never transmitted to external third-party servers.</p>

              <h4 className="font-bold text-white text-sm">2. Telemetry & Log Collection</h4>
              <p>Intercept logs (timestamps, agent IDs, requested endpoints, cost figures) are stored locally in in-memory state or local storage for real-time telemetry rendering. We do not sell or track personal user data.</p>

              <h4 className="font-bold text-white text-sm">3. x402 Protocol Compliance</h4>
              <p>All HTTP 402 headers (`X-Payment-Required`, `X-Payment-Price`, `X-Payment-Receipt`) are handled in accordance with open x402 Foundation guidelines and RFC 7231 specifications.</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                <p className="text-xs text-slate-400">Last updated: July 2026 — Production Enterprise Standards</p>
              </div>
            </div>

            <div className="space-y-3 leading-relaxed">
              <h4 className="font-bold text-white text-sm">1. Open Source MIT License</h4>
              <p>SpendCap 402 is provided as an open-source software project under the MIT License.</p>

              <h4 className="font-bold text-white text-sm">2. Policy Engine Disclaimer</h4>
              <p>While SpendCap 402 enforces strict per-call caps and daily budget limits, developers deploying autonomous AI agents in production environments remain responsible for allocating wallet testnet/mainnet funds.</p>

              <h4 className="font-bold text-white text-sm">3. Protocol Usage</h4>
              <p>By using this platform, you agree to comply with open Web3 protocol standards and maintain a respectful, collaborative environment.</p>
            </div>
          </>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
