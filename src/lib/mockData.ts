import { Agent, InterceptLog, TransactionReceipt } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-01',
    name: 'AutoCode-Reviewer-v2',
    role: 'CI/CD Code Auditor',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    spentTodayUsd: 1.45,
    dailyLimitUsd: 5.00,
    maxCostPerCallUsd: 0.25,
    totalCalls: 42,
    status: 'ACTIVE',
    lastActive: '2 mins ago',
    policy: {
      maxCostPerCallUsd: 0.25,
      dailyLimitUsd: 5.00,
      allowedDomains: ['api.codeaudit.ai', 'x402.dev', 'api.github.com'],
      requireSignedReceipt: true,
      rateLimitPerMin: 30
    }
  },
  {
    id: 'agent-02',
    name: 'DataScraper-Crawler',
    role: 'Market Data Aggregator',
    walletAddress: '0x3C44CdD459693451D7813a43731a5c0778424651',
    spentTodayUsd: 4.90,
    dailyLimitUsd: 5.00,
    maxCostPerCallUsd: 0.10,
    totalCalls: 128,
    status: 'LIMIT_EXCEEDED',
    lastActive: 'Just now',
    policy: {
      maxCostPerCallUsd: 0.10,
      dailyLimitUsd: 5.00,
      allowedDomains: ['oracle.coingecko.com', 'api.dexscreener.com'],
      requireSignedReceipt: true,
      rateLimitPerMin: 60
    }
  },
  {
    id: 'agent-03',
    name: 'LegalRisk-Analyzer-Agent',
    role: 'Contract Vulnerability Scanner',
    walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    spentTodayUsd: 0.80,
    dailyLimitUsd: 10.00,
    maxCostPerCallUsd: 0.50,
    totalCalls: 12,
    status: 'ACTIVE',
    lastActive: '18 mins ago',
    policy: {
      maxCostPerCallUsd: 0.50,
      dailyLimitUsd: 10.00,
      allowedDomains: ['api.legalrisk.io', 'solidity-audit.org'],
      requireSignedReceipt: true,
      rateLimitPerMin: 15
    }
  },
  {
    id: 'agent-04',
    name: 'LangChain-Summarizer-Bot',
    role: 'Meeting & Doc Processor',
    walletAddress: '0x15d34AA5453488E559619bBF15Ce70A64324f46A',
    spentTodayUsd: 0.00,
    dailyLimitUsd: 2.00,
    maxCostPerCallUsd: 0.05,
    totalCalls: 0,
    status: 'PAUSED',
    lastActive: '2 days ago',
    policy: {
      maxCostPerCallUsd: 0.05,
      dailyLimitUsd: 2.00,
      allowedDomains: ['api.openai.com', 'api.anthropic.com'],
      requireSignedReceipt: true,
      rateLimitPerMin: 10
    }
  }
];

export const INITIAL_LOGS: InterceptLog[] = [
  {
    id: 'log-101',
    timestamp: '15:34:12',
    agentId: 'agent-01',
    agentName: 'AutoCode-Reviewer-v2',
    endpoint: '/api/v1/ai-summarize',
    costUsd: 0.15,
    status: 'ALLOWED',
    message: 'x402 challenge verified & EIP-712 auto-signed',
    txReceipt: '0x8f2a9...c41e'
  },
  {
    id: 'log-102',
    timestamp: '15:33:55',
    agentId: 'agent-02',
    agentName: 'DataScraper-Crawler',
    endpoint: 'https://oracle.coingecko.com/v3/simple/price',
    costUsd: 0.20,
    status: 'BLOCKED_CAP',
    message: 'Policy Violation: Cost ($0.20) exceeds max per call ($0.10)',
  },
  {
    id: 'log-103',
    timestamp: '15:30:20',
    agentId: 'agent-03',
    agentName: 'LegalRisk-Analyzer-Agent',
    endpoint: 'https://api.legalrisk.io/scan',
    costUsd: 0.40,
    status: 'ALLOWED',
    message: 'x402 challenge verified & EIP-712 auto-signed',
    txReceipt: '0x3b11e...90aa'
  },
  {
    id: 'log-104',
    timestamp: '15:28:02',
    agentId: 'agent-02',
    agentName: 'DataScraper-Crawler',
    endpoint: 'https://unauthorized-api.xyz/fetch',
    costUsd: 0.05,
    status: 'BLOCKED_DOMAIN',
    message: 'Policy Violation: Host unauthorized-api.xyz not in domain whitelist',
  }
];

export const CHART_SPEND_DATA = [
  { time: '09:00', spentUsd: 0.40, blockedRequests: 1 },
  { time: '10:00', spentUsd: 0.85, blockedRequests: 0 },
  { time: '11:00', spentUsd: 1.60, blockedRequests: 2 },
  { time: '12:00', spentUsd: 2.20, blockedRequests: 0 },
  { time: '13:00', spentUsd: 3.10, blockedRequests: 4 },
  { time: '14:00', spentUsd: 4.80, blockedRequests: 3 },
  { time: '15:00', spentUsd: 7.15, blockedRequests: 5 },
];
