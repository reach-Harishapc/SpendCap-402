import { Agent } from './types';

export interface AgentChatMessage {
  id: string;
  senderAgentId: string;
  senderAgentName: string;
  senderRole: string;
  avatarColor: string;
  message: string;
  x402Status?: 'REQUESTED' | 'POLICY_CHECK' | 'SIGNED' | 'SETTLED';
  feeUsd?: number;
  receiptTxHash?: string;
  timestamp: string;
}

export const SAMPLE_DISCUSSIONS: Record<string, AgentChatMessage[]> = {
  'smart-contract': [
    {
      id: 'm1',
      senderAgentId: 'agent-router',
      senderAgentName: 'Agentic-Router-v1',
      senderRole: 'Orchestrator',
      avatarColor: 'bg-indigo-500',
      message: 'Received user prompt: "Audit Solidity contract for reentrancy risks and calculate audit cost". Routing to AutoCode-Reviewer.',
      timestamp: '15:52:01'
    },
    {
      id: 'm2',
      senderAgentId: 'agent-01',
      senderAgentName: 'AutoCode-Reviewer-v2',
      senderRole: 'Security Auditor',
      avatarColor: 'bg-emerald-500',
      message: 'I can execute the reentrancy scan. Triggering x402 Payment Challenge for $0.15 USDC.',
      x402Status: 'REQUESTED',
      feeUsd: 0.15,
      timestamp: '15:52:02'
    },
    {
      id: 'm3',
      senderAgentId: 'agent-guard',
      senderAgentName: 'SpendCap-PolicyGuard',
      senderRole: 'Egress Firewall',
      avatarColor: 'bg-sky-500',
      message: 'Evaluating spend rules: Fee ($0.15) <= Max Cap ($0.25). Daily spend ($1.45 + $0.15) <= Daily Limit ($5.00). Generating EIP-712 authorization signature...',
      x402Status: 'POLICY_CHECK',
      timestamp: '15:52:03'
    },
    {
      id: 'm4',
      senderAgentId: 'agent-01',
      senderAgentName: 'AutoCode-Reviewer-v2',
      senderRole: 'Security Auditor',
      avatarColor: 'bg-emerald-500',
      message: 'Signature verified! x402 Micropayment settled on Base Mainnet. Result: No reentrancy risks detected in functions transfer() or withdraw().',
      x402Status: 'SETTLED',
      receiptTxHash: '0x8f2a99104c82b12e4f019a823cc119420ab8184f02a',
      timestamp: '15:52:04'
    }
  ],
  'market-data': [
    {
      id: 'm10',
      senderAgentId: 'agent-router',
      senderAgentName: 'Agentic-Router-v1',
      senderRole: 'Orchestrator',
      avatarColor: 'bg-indigo-500',
      message: 'Received prompt: "Fetch live liquidity depth for ETH/USDC pair across DEX pools."',
      timestamp: '15:53:10'
    },
    {
      id: 'm11',
      senderAgentId: 'agent-02',
      senderAgentName: 'DataScraper-Crawler',
      senderRole: 'Data Aggregator',
      avatarColor: 'bg-rose-500',
      message: 'Requesting coingecko oracle feed. x402 micropayment fee: $0.20 USDC.',
      x402Status: 'REQUESTED',
      feeUsd: 0.20,
      timestamp: '15:53:11'
    },
    {
      id: 'm12',
      senderAgentId: 'agent-guard',
      senderAgentName: 'SpendCap-PolicyGuard',
      senderRole: 'Egress Firewall',
      avatarColor: 'bg-sky-500',
      message: 'POLICY VIOLATION BLOCKED: Requested fee ($0.20) exceeds agent max call cap ($0.10). Transaction rejected by firewall.',
      x402Status: 'POLICY_CHECK',
      timestamp: '15:53:12'
    }
  ]
};
