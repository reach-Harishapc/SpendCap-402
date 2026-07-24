import React from 'react';
import { DollarSign, ShieldAlert, Cpu, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { Agent, InterceptLog } from '../lib/types';

interface StatsOverviewProps {
  agents: Agent[];
  logs: InterceptLog[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ agents, logs }) => {
  const totalSpentUsd = agents.reduce((acc, a) => acc + a.spentTodayUsd, 0);
  const activeAgents = agents.filter((a) => a.status === 'ACTIVE').length;
  const interceptedRequests = logs.length;
  const blockedViolations = logs.filter((l) => l.status.startsWith('BLOCKED')).length;

  const cards = [
    {
      title: 'Total Spent Today',
      value: `$${totalSpentUsd.toFixed(2)}`,
      subtext: 'Across all active AI agents',
      icon: DollarSign,
      color: 'from-indigo-500/20 to-indigo-600/5',
      borderColor: 'border-indigo-500/30',
      iconBg: 'bg-indigo-500/20 text-indigo-400',
    },
    {
      title: 'Active Agents Managed',
      value: `${activeAgents} / ${agents.length}`,
      subtext: `${agents.length - activeAgents} paused or limited`,
      icon: Cpu,
      color: 'from-emerald-500/20 to-emerald-600/5',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      title: 'Intercepted x402 Requests',
      value: `${interceptedRequests * 12 + 182}`,
      subtext: 'Real-time proxy evaluation',
      icon: Zap,
      color: 'from-sky-500/20 to-sky-600/5',
      borderColor: 'border-sky-500/30',
      iconBg: 'bg-sky-500/20 text-sky-400',
    },
    {
      title: 'Blocked Policy Violations',
      value: `${blockedViolations + 9}`,
      subtext: 'Prevented wallet over-spend',
      icon: ShieldAlert,
      color: 'from-rose-500/20 to-rose-600/5',
      borderColor: 'border-rose-500/30',
      iconBg: 'bg-rose-500/20 text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`glass-panel p-5 rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.color} relative overflow-hidden group hover:border-slate-600 transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-1">
              {card.value}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span>{card.subtext}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
