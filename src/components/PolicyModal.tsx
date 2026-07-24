import React, { useState, useEffect } from 'react';
import { Agent, PolicyRule } from '../lib/types';
import { X, ShieldCheck, DollarSign, Globe, Save } from 'lucide-react';

interface PolicyModalProps {
  agent: Agent | null;
  onClose: () => void;
  onSave: (agentId: string, updatedPolicy: PolicyRule) => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ agent, onClose, onSave }) => {
  const [maxCallUsd, setMaxCallUsd] = useState<number>(0.25);
  const [dailyLimitUsd, setDailyLimitUsd] = useState<number>(5.00);
  const [domainsText, setDomainsText] = useState<string>('');

  useEffect(() => {
    if (agent) {
      setMaxCallUsd(agent.policy.maxCostPerCallUsd);
      setDailyLimitUsd(agent.policy.dailyLimitUsd);
      setDomainsText(agent.policy.allowedDomains.join(', '));
    }
  }, [agent]);

  if (!agent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const domains = domainsText
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    onSave(agent.id, {
      maxCostPerCallUsd: Number(maxCallUsd),
      dailyLimitUsd: Number(dailyLimitUsd),
      allowedDomains: domains,
      requireSignedReceipt: true,
      rateLimitPerMin: 30,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Spend Policy Rules</h3>
            <p className="text-xs text-slate-400">Editing guardrails for <span className="text-indigo-300 font-semibold">{agent.name}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Max Cost per Call */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
              Max Cost Per Call (USD)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={maxCallUsd}
              onChange={(e) => setMaxCallUsd(parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">Requests exceeding this cost will be immediately blocked with 403 Policy Violation.</p>
          </div>

          {/* Daily Limit */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Daily Spend Ceiling (USD)
            </label>
            <input
              type="number"
              step="0.10"
              min="0.50"
              value={dailyLimitUsd}
              onChange={(e) => setDailyLimitUsd(parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">Total combined micropayment budget per 24-hour window.</p>
          </div>

          {/* Allowed Domains */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              Allowed API Domain Whitelist
            </label>
            <input
              type="text"
              value={domainsText}
              onChange={(e) => setDomainsText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              placeholder="api.codeaudit.ai, x402.dev"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">Comma-separated list of hostnames the agent is authorized to pay via x402.</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Policy Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
