import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { LandingHome } from './components/LandingHome';
import { StatsOverview } from './components/StatsOverview';
import { SpendChart } from './components/SpendChart';
import { FleetTable } from './components/FleetTable';
import { PolicyModal } from './components/PolicyModal';
import { LiveInspector } from './components/LiveInspector';
import { ApiPlayground } from './components/ApiPlayground';
import { ArchitectureView } from './components/ArchitectureView';
import { Documentation } from './components/Documentation';
import { RightSidebarChatbot } from './components/RightSidebarChatbot';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';
import { Footer } from './components/Footer';
import { INITIAL_AGENTS, INITIAL_LOGS } from './lib/mockData';
import { Agent, InterceptLog, PolicyRule } from './lib/types';
import { Activity } from 'lucide-react';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Public entry point first
  const [activeTab, setActiveTab] = useState<string>('home');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [logs, setLogs] = useState<InterceptLog[]>(INITIAL_LOGS);
  const [selectedAgentForPolicy, setSelectedAgentForPolicy] = useState<Agent | null>(null);

  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleToggleStatus = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === agentId) {
          const nextStatus = a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleSavePolicy = (agentId: string, updatedPolicy: PolicyRule) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === agentId) {
          return {
            ...a,
            maxCostPerCallUsd: updatedPolicy.maxCostPerCallUsd,
            dailyLimitUsd: updatedPolicy.dailyLimitUsd,
            policy: updatedPolicy,
          };
        }
        return a;
      })
    );
  };

  const handleAddLog = (newLog: InterceptLog) => {
    setLogs((prev) => [newLog, ...prev]);
    if (newLog.status === 'ALLOWED') {
      setAgents((prev) =>
        prev.map((a) => {
          if (a.id === newLog.agentId) {
            const nextSpent = a.spentTodayUsd + newLog.costUsd;
            return {
              ...a,
              spentTodayUsd: nextSpent,
              totalCalls: a.totalCalls + 1,
              status: nextSpent >= a.dailyLimitUsd ? 'LIMIT_EXCEEDED' : a.status,
            };
          }
          return a;
        })
      );
    }
  };

  // 1. Unauthenticated Login Screen
  if (!isLoggedIn && activeTab === 'login') {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={() => setActiveTab('login')}
          onLogout={() => { setIsLoggedIn(false); setActiveTab('home'); }}
        />
        <div className="flex-1 flex items-center justify-center">
          <LoginPage
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setActiveTab('dashboard');
            }}
          />
        </div>
        <Footer
          setActiveTab={setActiveTab}
          onOpenPrivacy={() => setModalType('privacy')}
          onOpenTerms={() => setModalType('terms')}
        />
        <PrivacyTermsModal type={modalType} onClose={() => setModalType(null)} />
      </div>
    );
  }

  // 2. Main Layout Container
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        onNavigateToLogin={() => setActiveTab('login')}
        onLogout={() => { setIsLoggedIn(false); setActiveTab('home'); }}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        {/* Left Side: Main View Area (~75% width) */}
        <main className="flex-1 px-4 lg:px-8 py-8 space-y-8 min-w-0">
          {/* Public Home Landing Page (Unauthenticated Entry OR Home Tab) */}
          {activeTab === 'home' && (
            <LandingHome
              onLaunchConsole={() => {
                if (isLoggedIn) {
                  setActiveTab('dashboard');
                } else {
                  setActiveTab('login');
                }
              }}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Authenticated Application Views */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Top Stat Cards */}
              <StatsOverview agents={agents} logs={logs} />

              {/* Spend Chart & Telemetry */}
              <SpendChart />

              {/* AI Agent Fleet Table */}
              <FleetTable
                agents={agents}
                onOpenPolicy={(agent) => setSelectedAgentForPolicy(agent)}
                onToggleStatus={handleToggleStatus}
              />

              {/* Live Interception Log Stream */}
              <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    Live Egress Interception Stream
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Auto-refreshing</span>
                </div>

                <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto pr-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                        <span className="text-white font-bold">{log.agentName}</span>
                        <span className="text-slate-400 text-[11px] font-sans">➔ {log.endpoint}</span>
                      </div>

                      <div className="flex items-center gap-3 justify-between sm:justify-end">
                        <span className="text-emerald-300 font-bold">{log.costUsd.toFixed(2)} ALGO</span>
                        {log.explorerUrl && (
                          <a
                            href={log.explorerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-[10px] flex items-center gap-1 font-mono transition-colors"
                          >
                            Lora Explorer ↗
                          </a>
                        )}
                        {log.status === 'ALLOWED' ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            ALLOWED & SIGNED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px]">
                            BLOCKED (POLICY)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Live Protocol Inspector */}
          {activeTab === 'inspector' && <LiveInspector />}

          {/* Tab 3: API Playground */}
          {activeTab === 'playground' && <ApiPlayground agents={agents} onAddLog={handleAddLog} />}

          {/* Tab 4: Architecture & Rules Compliance */}
          {activeTab === 'architecture' && <ArchitectureView />}

          {/* Tab 5: Documentation */}
          {activeTab === 'docs' && <Documentation />}
        </main>

        {/* Right Side: Docked Right-Hand Side AI Agent Copilot Drawer (~25% width) */}
        <RightSidebarChatbot isLoggedIn={isLoggedIn} onAddLog={handleAddLog} />
      </div>

      {/* Policy Edit Modal */}
      {selectedAgentForPolicy && (
        <PolicyModal
          agent={selectedAgentForPolicy}
          onClose={() => setSelectedAgentForPolicy(null)}
          onSave={handleSavePolicy}
        />
      )}

      {/* Privacy Policy & Terms Modal */}
      <PrivacyTermsModal type={modalType} onClose={() => setModalType(null)} />

      {/* Enterprise Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPrivacy={() => setModalType('privacy')}
        onOpenTerms={() => setModalType('terms')}
      />
    </div>
  );
}

export default App;
