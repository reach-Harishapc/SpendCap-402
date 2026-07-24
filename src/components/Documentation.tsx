import React from 'react';
import { BookOpen, Terminal, Code, Server, ShieldCheck, Check } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-extrabold text-white">Documentation & Setup Guide</h2>
        </div>
        <p className="text-xs text-slate-400">
          Complete guide to running SpendCap 402 locally, integrating agent SDKs, and issuing x402 API requests
        </p>
      </div>

      {/* Quickstart Setup Commands */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-300 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          1. Local Setup & Quickstart Commands
        </h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto space-y-2">
          <p className="text-slate-500"># Clone repository and install dependencies</p>
          <p>git clone https://github.com/harishapc/SpendCap-402.git</p>
          <p>cd SpendCap-402</p>
          <p>npm install</p>
          <br />
          <p className="text-slate-500"># Start both Express Egress Proxy Server (Port 5001) & Vite Dashboard (Port 3000)</p>
          <p>npm start</p>
        </div>
      </div>

      {/* Sample cURL Commands */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <Code className="w-4 h-4" />
          2. Example HTTP 402 cURL Request
        </h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto space-y-2">
          <p className="text-slate-500"># 1. Trigger unauthenticated request to receive HTTP 402 challenge header</p>
          <p className="text-sky-300">curl -i -X POST http://localhost:5001/api/v1/ai-summarize \</p>
          <p className="text-sky-300">  -H "Content-Type: application/json" \</p>
          <p className="text-sky-300">{"  -d '{\"text\": \"Audit smart contract for vulnerabilities\"}'"}</p>
          <br />
          <p className="text-slate-500"># Expected HTTP Response: 402 Payment Required</p>
          <p className="text-amber-400">HTTP/1.1 402 Payment Required</p>
          <p className="text-amber-400">X-Payment-Required: true</p>
          <p className="text-amber-400">X-Payment-Price: 0.15</p>
          <p className="text-amber-400">X-Payment-Recipient: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
          <p className="text-amber-400">X-Payment-Nonce: nonce_1721832000</p>
        </div>
      </div>
    </div>
  );
};
