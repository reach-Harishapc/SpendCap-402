export interface PolicyRule {
  maxCostPerCallUsd: number;
  dailyLimitUsd: number;
  allowedDomains: string[];
  requireSignedReceipt: boolean;
  rateLimitPerMin: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  walletAddress: string;
  spentTodayUsd: number;
  dailyLimitUsd: number;
  maxCostPerCallUsd: number;
  totalCalls: number;
  status: 'ACTIVE' | 'PAUSED' | 'LIMIT_EXCEEDED';
  lastActive: string;
  policy: PolicyRule;
}

export interface TransactionReceipt {
  id: string;
  txHash: string;
  agentId: string;
  agentName: string;
  amountUsd: number;
  recipient: string;
  endpoint: string;
  timestamp: string;
  nonce: string;
  signature: string;
  blockNumber: number;
  status: 'SETTLED' | 'BLOCKED' | 'FAILED';
  chain?: string;
  facilitator?: string;
  explorerUrl?: string;
}

export interface InterceptLog {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  endpoint: string;
  costUsd: number;
  status: 'ALLOWED' | 'BLOCKED_CAP' | 'BLOCKED_DOMAIN' | 'CHALLENGED';
  message: string;
  txReceipt?: string;
  explorerUrl?: string;
}

export interface ProtocolStep {
  step: 1 | 2 | 3 | 4;
  name: string;
  description: string;
  httpStatus: string;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  body?: any;
  timestamp: string;
}
