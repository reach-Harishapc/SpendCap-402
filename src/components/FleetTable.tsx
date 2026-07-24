import React from 'react';
import { Agent } from '../lib/types';
import { Sliders, Shield, Play, Pause, AlertCircle, ExternalLink, Key } from 'lucide-react';

interface FleetTableProps {
  agents: Agent[];
  onOpenPolicy: (agent: Agent) => void;
  onToggleStatus: (agentId: string) => void;
}

export const FleetTable: React.FC<FleetTableProps> = ({ agents, onOpenPolicy, onToggleStatus }) => {
  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            AI Agent Fleet & Spend Quotas
          </h3>
          <p className="text-xs text-slate-400">Configure spend ceilings, whitelists, and auto-signing permissions</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900/80 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4">Agent Name & Role</th>
              <th className="py-3.5 px-4">Wallet Address</th>
              <th className="py-3.5 px-4">Today's Spend / Budget</th>
              <th className="py-3.5 px-4">Max Call Cap</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {agents.map((agent) => {
              const pctSpent = Math.min(100, Math.round((agent.spentTodayUsd / agent.dailyLimitUsd) * 100));
              const isOverLimit = agent.spentTodayUsd >= agent.dailyLimitUsd;

              return (
                <tr key={agent.id} className="hover:bg-slate-800/30 transition-colors">
                  {/* Agent Details */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      {agent.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">{agent.role}</div>
                  </td>

                  {/* Wallet Address */}
                  <td className="py-4 px-4 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 w-fit">
                      <Key className="w-3 h-3 text-indigo-400" />
                      <span>{agent.walletAddress.substring(0, 6)}...{agent.walletAddress.substring(38)}</span>
                    </div>
                  </td>

                  {/* Spend Progress */}
                  <td className="py-4 px-4 min-w-[180px]">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-white">${agent.spentTodayUsd.toFixed(2)}</span>
                      <span className="text-slate-400">${agent.dailyLimitUsd.toFixed(2)} limit</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOverLimit
                            ? 'bg-rose-500 shadow-sm shadow-rose-500'
                            : pctSpent > 75
                            ? 'bg-amber-500'
                            : 'bg-indigo-500'
                        }`}
                        style={{ width: `${pctSpent}%` }}
                      ></div>
                    </div>
                  </td>

                  {/* Max Call Cap */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-mono text-xs border border-slate-700">
                      ${agent.maxCostPerCallUsd.toFixed(2)} / call
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    {agent.status === 'ACTIVE' && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        ACTIVE
                      </span>
                    )}
                    {agent.status === 'PAUSED' && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full inline-flex items-center gap-1.5">
                        <Pause className="w-3 h-3" />
                        PAUSED
                      </span>
                    )}
                    {agent.status === 'LIMIT_EXCEEDED' && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full inline-flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" />
                        CAP EXCEEDED
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleStatus(agent.id)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title={agent.status === 'ACTIVE' ? 'Pause Agent' : 'Activate Agent'}
                      >
                        {agent.status === 'ACTIVE' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                      </button>

                      <button
                        onClick={() => onOpenPolicy(agent)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 font-medium text-xs transition-all"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Edit Rules
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
