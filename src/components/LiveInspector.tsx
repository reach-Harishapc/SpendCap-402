import React, { useState } from 'react';
import { ProtocolStep } from '../lib/types';
import { Activity, CheckCircle2, ArrowRight, ShieldCheck, Key, Lock, Copy, RefreshCw } from 'lucide-react';

export const LiveInspector: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps: ProtocolStep[] = [
    {
      step: 1,
      name: '1. Initial Unauthenticated Request',
      description: 'AI Agent sends HTTP request without payment authorization header to monetized endpoint.',
      httpStatus: 'POST /api/v1/ai-summarize',
      requestHeaders: {
        'Host': 'api.codeaudit.ai',
        'Content-Type': 'application/json',
        'User-Agent': 'AutoCode-Reviewer-Agent/2.0'
      },
      body: { text: 'Audit PR #142 for smart contract vulnerabilities and reentrancy bugs.' },
      timestamp: '15:34:10.012'
    },
    {
      step: 2,
      name: '2. HTTP 402 Payment Required Challenge',
      description: 'Server rejects request with 402 challenge, specifying cost, recipient wallet, and nonce.',
      httpStatus: 'HTTP/1.1 402 Payment Required',
      responseHeaders: {
        'X-Payment-Required': 'true',
        'X-Payment-Price': '0.15',
        'X-Payment-Recipient': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        'X-Payment-Token': 'USDC (Base Mainnet)',
        'X-Payment-Nonce': 'nonce_981a4f02',
        'X-Payment-Chain-Id': '8453'
      },
      body: {
        error: 'Payment Required',
        message: 'Pay-per-call fee of $0.15 USDC required to process AI request',
        x402Standard: true
      },
      timestamp: '15:34:10.045'
    },
    {
      step: 3,
      name: '3. SpendCap Egress Proxy & EIP-712 Signer',
      description: 'SpendCap proxy evaluates agent daily quota & max call cap. Auto-signs authorization signature if compliant.',
      httpStatus: 'PROXY EVALUATION: PASSED (200 OK)',
      requestHeaders: {
        'Policy-Status': 'COMPLIANT ($0.15 <= $0.25 Cap)',
        'Agent-Daily-Spend': '$1.45 / $5.00 Limit',
        'Domain-Whitelist': 'PASSED (api.codeaudit.ai)'
      },
      body: {
        x402AuthSignature: 'x402_sig_demo_auth_sample_981a4f',
        signerWallet: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        timestamp: '15:34:10.080'
      },
      timestamp: '15:34:10.080'
    },
    {
      step: 4,
      name: '4. Settled Request & Transaction Receipt',
      description: 'Client retries request with X-PAYMENT-AUTH header. Server settles fee & returns response + receipt.',
      httpStatus: 'HTTP/1.1 200 OK',
      responseHeaders: {
        'Content-Type': 'application/json',
        'X-Payment-Receipt': '{"txHash":"0x8f2a...c41e","status":"SETTLED"}'
      },
      body: {
        success: true,
        data: {
          summary: 'Audit Complete: No reentrancy risks found in contract. Security score 10/10.',
          auditedLines: 412
        },
        transactionReceipt: {
          id: 'rcpt_9402a18',
          txHash: '0x8f2a99104c82b12e4f019a823cc119420ab8184f02a',
          amountUsd: 0.15,
          token: 'USDC',
          blockNumber: 18940288,
          status: 'SETTLED'
        }
      },
      timestamp: '15:34:10.142'
    }
  ];

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">x402 Protocol Flow Inspector</h2>
          </div>
          <p className="text-xs text-slate-400">
            Interactive step-by-step visualization of HTTP 402 challenge, SpendCap policy verification, and transaction receipt settlement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono">
            Standard: RFC-7231 / x402 HTTP
          </span>
        </div>
      </div>

      {/* Steps Pipeline Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((s) => {
          const isActive = activeStep === s.step;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                  PHASE {s.step}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{s.timestamp}</span>
              </div>
              <div className="text-xs font-bold truncate mb-1 text-white">{s.name}</div>
              <div className="text-[11px] text-slate-400 line-clamp-2">{s.httpStatus}</div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Detail */}
      {steps
        .filter((s) => s.step === activeStep)
        .map((currStep) => (
          <div key={currStep.step} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  {currStep.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{currStep.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-semibold text-indigo-400">
                  {currStep.httpStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request / Response Headers */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-indigo-400" />
                  HTTP Headers
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto space-y-1.5">
                  {Object.entries(currStep.requestHeaders || currStep.responseHeaders || {}).map(
                    ([k, v]) => (
                      <div key={k} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-semibold">{k}:</span>
                        <span className="text-slate-200 break-all">{v}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Payload / Body */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    JSON Payload & Receipts
                  </h4>
                  <button
                    onClick={() => handleCopyCode(JSON.stringify(currStep.body, null, 2), currStep.step)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedIndex === currStep.step ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto max-h-56 leading-relaxed">
                  {JSON.stringify(currStep.body, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
