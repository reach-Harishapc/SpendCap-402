import { Agent, InterceptLog } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-01',
    name: 'AutoCode-Reviewer-v2',
    role: 'CI/CD Code Auditor (Algorand)',
    walletAddress: '2UBTX7TW3AZKCXDVRUT66SRMTUsDSEROOFSGILPUZNCVJEF325L6AQ4CDA',
    spentTodayUsd: 1.45,
    dailyLimitUsd: 5.00,
    maxCostPerCallUsd: 0.25,
    totalCalls: 42,
    status: 'ACTIVE',
    lastActive: '2 mins ago',
    policy: {
      maxCostPerCallUsd: 0.25,
      dailyLimitUsd: 5.00,
      allowedDomains: ['api.codeaudit.ai', 'x402.dev', 'api.github.com', 'testnet.goplausible.com'],
      requireSignedReceipt: true,
      rateLimitPerMin: 30
    }
  },
  {
    id: 'agent-02',
    name: 'DataScraper-Crawler',
    role: 'Market Data Aggregator',
    walletAddress: '4K3W2M7N8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7J8K9L0M1',
    spentTodayUsd: 4.90,
    dailyLimitUsd: 5.00,
    maxCostPerCallUsd: 0.10,
    totalCalls: 128,
    status: 'LIMIT_EXCEEDED',
    lastActive: 'Just now',
    policy: {
      maxCostPerCallUsd: 0.10,
      dailyLimitUsd: 5.00,
      allowedDomains: ['oracle.coingecko.com', 'api.dexscreener.com', 'testnet.goplausible.com'],
      requireSignedReceipt: true,
      rateLimitPerMin: 60
    }
  },
  {
    id: 'agent-03',
    name: 'LegalRisk-Analyzer-Agent',
    role: 'Contract Vulnerability Scanner',
    walletAddress: '7M8N9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8J9K0L1M2N3',
    spentTodayUsd: 0.80,
    dailyLimitUsd: 10.00,
    maxCostPerCallUsd: 0.50,
    totalCalls: 12,
    status: 'ACTIVE',
    lastActive: '18 mins ago',
    policy: {
      maxCostPerCallUsd: 0.50,
      dailyLimitUsd: 10.00,
      allowedDomains: ['api.legalrisk.io', 'solidity-audit.org', 'testnet.goplausible.com'],
      requireSignedReceipt: true,
      rateLimitPerMin: 15
    }
  },
  {
    id: 'agent-04',
    name: 'LangChain-Summarizer-Bot',
    role: 'Meeting & Doc Processor',
    walletAddress: '9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8J9K0L1M2N3P4Q5',
    spentTodayUsd: 0.00,
    dailyLimitUsd: 2.00,
    maxCostPerCallUsd: 0.05,
    totalCalls: 0,
    status: 'PAUSED',
    lastActive: '2 days ago',
    policy: {
      maxCostPerCallUsd: 0.05,
      dailyLimitUsd: 2.00,
      allowedDomains: ['api.openai.com', 'api.anthropic.com', 'testnet.goplausible.com'],
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
    message: 'x402 AVM challenge verified via GoPlausible facilitator',
    txReceipt: 'Z7X2J4K5V6M7N8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7',
    explorerUrl: 'https://lora.algokit.io/testnet/transaction/Z7X2J4K5V6M7N8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7'
  },
  {
    id: 'log-102',
    timestamp: '15:33:55',
    agentId: 'agent-02',
    agentName: 'DataScraper-Crawler',
    endpoint: 'https://oracle.coingecko.com/v3/simple/price',
    costUsd: 0.20,
    status: 'BLOCKED_CAP',
    message: 'Policy Violation: Cost ($0.20 ALGO) exceeds max per call ($0.10)',
  },
  {
    id: 'log-103',
    timestamp: '15:30:20',
    agentId: 'agent-03',
    agentName: 'LegalRisk-Analyzer-Agent',
    endpoint: 'https://api.legalrisk.io/scan',
    costUsd: 0.40,
    status: 'ALLOWED',
    message: 'x402 AVM challenge verified via GoPlausible facilitator',
    txReceipt: 'B3C4D5E6F7G8H9J0K1L2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8',
    explorerUrl: 'https://lora.algokit.io/testnet/transaction/B3C4D5E6F7G8H9J0K1L2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8'
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
