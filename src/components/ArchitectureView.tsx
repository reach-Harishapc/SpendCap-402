import React from 'react';
import { Layers, ShieldCheck, Cpu, Key, FileCheck, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-extrabold text-white">System Architecture & Protocol Specifications</h2>
        </div>
        <p className="text-xs text-slate-400">
          Enterprise technical specification of the SpendCap 402 Egress Proxy, Policy Engine, and HTTP 402 Protocol Implementation
        </p>
      </div>

      {/* Visual System Architecture Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-300">
          End-to-End Egress Proxy Flow Diagram
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative">
            <div className="text-indigo-400 font-bold">1. AI Agent Call</div>
            <p className="text-slate-400 font-sans text-xs">
              Autonomous Agent (e.g. LangChain / CrewAI) calls target API endpoint.
            </p>
            <div className="p-2 rounded bg-slate-900 text-emerald-400 text-[11px]">
              POST /api/v1/ai-summarize
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold">2. HTTP 402 Challenge</div>
            <p className="text-slate-400 font-sans text-xs">
              Target server returns HTTP 402 Payment Required with price, recipient, & nonce.
            </p>
            <div className="p-2 rounded bg-slate-900 text-amber-300 text-[11px]">
              HTTP 402 (Price: $0.15)
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-sky-400 font-bold">3. Policy Evaluation</div>
            <p className="text-slate-400 font-sans text-xs">
              SpendCap Egress Proxy evaluates daily cap, per-call max, and domain whitelist.
            </p>
            <div className="p-2 rounded bg-slate-900 text-sky-300 text-[11px]">
              PASSED: $0.15 &lt; $0.25 Cap
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold">4. Auto-Sign & Settle</div>
            <p className="text-slate-400 font-sans text-xs">
              Proxy generates EIP-712 auth header, retries request, & logs immutable receipt.
            </p>
            <div className="p-2 rounded bg-slate-900 text-emerald-300 text-[11px]">
              Receipt: 0x8f2a...c41e
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Capabilities & Security Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Infrastructure */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Core Infrastructure Capabilities
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span>
              <span><strong>x402 Payment Gateway</strong>: Intercepts & processes HTTP 402 Payment Required challenges natively across Web3 APIs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span>
              <span><strong>Spend Policy Engine</strong>: Enforces custom per-call caps and 24-hour daily budget ceilings for autonomous AI agent fleets.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span>
              <span><strong>Receipt Verification Vault</strong>: Generates cryptographic EIP-712 transaction receipts and maintains immutable audit ledgers.</span>
            </li>
          </ul>
        </div>

        {/* Security & Protocol Standards */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security & Protocol Standards
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></span>
              <span><strong>EIP-712 Typed Signatures</strong>: Secure off-chain payment authorization matching Base Mainnet (Chain ID 8453) smart contract standards.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></span>
              <span><strong>Zero-Trust Domain Whitelisting</strong>: Restricts autonomous agent outbound requests strictly to authorized API hostnames.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></span>
              <span><strong>Replay & Nonce Protection</strong>: Uses single-use nonces to prevent double-spending and transaction replay exploits.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
