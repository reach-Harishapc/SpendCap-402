import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_SPEND_DATA } from '../lib/mockData';
import { TrendingUp, Activity, Sparkles } from 'lucide-react';
import { InterceptLog } from '../lib/types';

interface SpendChartProps {
  logs?: InterceptLog[];
}

interface TelemetryPoint {
  time: string;
  spentUsd: number;
  blockedRequests: number;
}

export const SpendChart: React.FC<SpendChartProps> = ({ logs = [] }) => {
  const [chartData, setChartData] = useState<TelemetryPoint[]>(CHART_SPEND_DATA);

  // Live real-time timeseries updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setChartData((prev) => {
        const lastPoint = prev[prev.length - 1] || { spentUsd: 7.15, blockedRequests: 5 };
        // Small random walk to simulate live agent micropayments & interceptions
        const nextSpend = +(lastPoint.spentUsd + (Math.random() > 0.4 ? 0.15 : 0)).toFixed(2);
        const nextBlocked = lastPoint.blockedRequests + (Math.random() > 0.7 ? 1 : 0);

        const updated = [...prev, { time: timeStr, spentUsd: nextSpend, blockedRequests: nextBlocked }];
        // Keep last 10 points for smooth scrolling timeseries window
        if (updated.length > 10) {
          return updated.slice(updated.length - 10);
        }
        return updated;
      });
    }, 4000); // Live update every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Agent Spend Telemetry & Interceptions
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE TIMESERIES
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400">Real-time IndexedDB style timeseries monitoring of x402 micropayments vs firewall blocks</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
            <span className="text-slate-300 font-medium">Spent (USDC)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-500 shadow-sm shadow-rose-500/50"></span>
            <span className="text-slate-300 font-medium">Blocked Violations</span>
          </div>
        </div>
      </div>

      {/* Live Recharts Timeseries Graph */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
            />
            <Area type="monotone" dataKey="spentUsd" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#spendGradient)" name="Spent ($ USDC)" isAnimationActive={false} />
            <Area type="monotone" dataKey="blockedRequests" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#blockedGradient)" name="Blocked Violations" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
