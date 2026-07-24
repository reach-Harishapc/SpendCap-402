import React, { useState } from 'react';
import { Agent, InterceptLog } from '../lib/types';
import { Play, Terminal, CheckCircle2, AlertTriangle, ShieldX, Copy, RefreshCw, Send } from 'lucide-react';

interface ApiPlaygroundProps {
  agents: Agent[];
  onAddLog: (log: InterceptLog) => void;
}

export const ApiPlayground: React.FC<ApiPlaygroundProps> = ({ agents, onAddLog }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'agent-01');
  const [targetEndpoint, setTargetEndpoint] = useState<string>('/api/v1/ai-summarize');
  const [inputText, setInputText] = useState<string>('Audit smart contract for reentrancy and integer overflow vulnerabilities.');
  const [simulatedCost, setSimulatedCost] = useState<number>(0.15);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleRunTest = async () => {
    setLoading(true);
    setResponseResult(null);

    try {
      // Send real fetch call to local express server endpoint /api/v1/proxy
      const res = await fetch('/api/v1/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          agentName: selectedAgent.name,
          targetEndpoint: targetEndpoint,
          payload: { text: inputText },
          agentWallet: selectedAgent.walletAddress,
        }),
      });

      const data = await res.json();
      setResponseResult({
        status: res.status,
        headers: {
          'content-type': 'application/json',
          'x-payment-price': '$0.15 USDC',
          'x-payment-receipt': data.transactionReceipt?.txHash || 'N/A'
        },
        data
      });

      // Append log to dashboard telemetry
      if (res.ok && data.success) {
        onAddLog({
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          agentId: selectedAgent.id,
          agentName: selectedAgent.name,
          endpoint: targetEndpoint,
          costUsd: 0.15,
          status: 'ALLOWED',
          message: 'x402 challenge verified & EIP-712 auto-signed',
          txReceipt: data.transactionReceipt?.txHash?.substring(0, 10) + '...'
        });
      } else {
        onAddLog({
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          agentId: selectedAgent.id,
          agentName: selectedAgent.name,
          endpoint: targetEndpoint,
          costUsd: simulatedCost,
          status: 'BLOCKED_CAP',
          message: data.reason || 'Blocked by SpendCap policy engine',
        });
      }
    } catch (err: any) {
      setResponseResult({
        status: 500,
        data: { error: 'Failed to connect to SpendCap proxy backend', details: err.message }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">x402 Interactive API Playground</h2>
          </div>
          <p className="text-xs text-slate-400">
            Test live HTTP 402 pay-per-call requests through SpendCap 402 Egress Proxy in real time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">Request Simulator Configuration</h3>

          {/* Select Agent */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Select AI Agent Client</label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
            >
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} (Cap: ${a.maxCostPerCallUsd}/call, Daily: ${a.dailyLimitUsd})
                </option>
              ))}
            </select>
          </div>

          {/* Target Endpoint */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Endpoint</label>
            <input
              type="text"
              value={targetEndpoint}
              onChange={(e) => setTargetEndpoint(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
            />
          </div>

          {/* Input Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sample Request Data Payload</label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            ></textarea>
          </div>

          {/* Execute Button */}
          <button
            onClick={handleRunTest}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Execute x402 Request via Proxy
          </button>
        </div>

        {/* Console Output Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Live Proxy Response Output
              </h3>
              {responseResult && (
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                    responseResult.status === 200
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : responseResult.status === 403
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  STATUS {responseResult.status}
                </span>
              )}
            </div>

            {responseResult ? (
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto max-h-80 leading-relaxed">
                {JSON.stringify(responseResult.data, null, 2)}
              </pre>
            ) : (
              <div className="bg-slate-950/60 p-12 rounded-xl border border-slate-800/80 text-center flex flex-col items-center justify-center text-slate-500">
                <Terminal className="w-8 h-8 mb-2 text-slate-600" />
                <p className="text-xs font-mono">Click "Execute x402 Request" to send a live request through SpendCap 402 Proxy</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
