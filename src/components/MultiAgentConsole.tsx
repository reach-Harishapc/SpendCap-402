import React, { useState } from 'react';
import { AgentChatMessage, SAMPLE_DISCUSSIONS } from '../lib/agentDiscussionEngine';
import { Bot, Send, ShieldCheck, Zap, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

export const MultiAgentConsole: React.FC = () => {
  const [promptInput, setPromptInput] = useState<string>('Audit Solidity smart contract for reentrancy risks');
  const [selectedScenario, setSelectedScenario] = useState<string>('smart-contract');
  const [messages, setMessages] = useState<AgentChatMessage[]>(SAMPLE_DISCUSSIONS['smart-contract']);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulateSwarm = (scenarioKey: string) => {
    setSelectedScenario(scenarioKey);
    setIsSimulating(true);
    setMessages([]);

    const discussion = SAMPLE_DISCUSSIONS[scenarioKey] || SAMPLE_DISCUSSIONS['smart-contract'];

    discussion.forEach((msg, idx) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
        if (idx === discussion.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 800);
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    if (promptInput.toLowerCase().includes('data') || promptInput.toLowerCase().includes('market')) {
      handleSimulateSwarm('market-data');
    } else {
      handleSimulateSwarm('smart-contract');
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-slate-950/80 space-y-4">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              Multi-Agent Collaboration Swarm
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />
                x402 Agentic Consensus
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Agents converse to analyze prompts, negotiate service fees, evaluate SpendCap guardrails, and settle x402 micropayments.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulateSwarm('smart-contract')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedScenario === 'smart-contract'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Audit Contract Swarm
          </button>
          <button
            onClick={() => handleSimulateSwarm('market-data')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedScenario === 'market-data'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Market Scraper Swarm
          </button>
        </div>
      </div>

      {/* Live Agent Chat Stream */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 h-64 overflow-y-auto space-y-3 font-sans">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3 text-xs animate-fade-in">
            <div className={`w-8 h-8 rounded-lg ${msg.avatarColor} flex items-center justify-center font-bold text-white shadow-md shrink-0`}>
              {msg.senderAgentName.charAt(0)}
            </div>
            <div className="flex-1 space-y-1 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{msg.senderAgentName} <span className="text-slate-500 font-mono font-normal">({msg.senderRole})</span></span>
                <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{msg.message}</p>

              {/* Status Badges */}
              {msg.x402Status && (
                <div className="pt-2 flex items-center gap-2">
                  {msg.x402Status === 'REQUESTED' && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-semibold">
                      HTTP 402 Challenge: Fee ${msg.feeUsd?.toFixed(2)} USDC
                    </span>
                  )}
                  {msg.x402Status === 'POLICY_CHECK' && (
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-mono font-semibold">
                      SpendCap Check: EIP-712 Signature Generated
                    </span>
                  )}
                  {msg.x402Status === 'SETTLED' && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Settled Receipt: {msg.receiptTxHash?.substring(0, 10)}...
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isSimulating && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono italic p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            Agents discussing prompt and evaluating x402 payment policy...
          </div>
        )}
      </div>

      {/* User Prompt Input Form */}
      <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Ask AI agent swarm to execute a task (e.g. Audit smart contract, fetch market data)..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          Send to Swarm
        </button>
      </form>
    </div>
  );
};
