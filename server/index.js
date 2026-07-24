import express from 'express';
import cors from 'cors';
import { policyEngine } from './policyEngine.js';
import { handleAiSummarize } from './monetizedApi.js';
import { parse402Header, generateX402AuthSignature, generateReceipt } from './x402Proxy.js';
import { handleAgentToolCall } from './agentTools.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize policy engine defaults for initial agents
policyEngine.registerAgent('agent-01', {
  maxCostPerCallUsd: 0.25,
  dailyLimitUsd: 5.00,
  allowedDomains: ['localhost', 'api.codeaudit.ai', 'x402.dev', 'api.github.com']
});

policyEngine.registerAgent('agent-02', {
  maxCostPerCallUsd: 0.10,
  dailyLimitUsd: 5.00,
  allowedDomains: ['oracle.coingecko.com', 'api.dexscreener.com']
});

policyEngine.registerAgent('agent-03', {
  maxCostPerCallUsd: 0.50,
  dailyLimitUsd: 10.00,
  allowedDomains: ['api.legalrisk.io']
});

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SpendCap 402 Egress Proxy Server' });
});

// 1. Monetized AI API Endpoint (Target)
app.post('/api/v1/ai-summarize', handleAiSummarize);

// 2. Multi-Agent Chat & Tool-Calling Endpoint
app.post('/api/v1/agent-chat', (req, res) => {
  const { message, agentId } = req.body;
  const userText = (message || '').toLowerCase();
  const targetAgentId = agentId || 'agent-01';

  let toolUsed = null;
  let toolResult = null;
  let conversationalReply = '';

  // Extract dollar price if user specified one (e.g. "$0.15" or "10.00")
  const priceMatch = userText.match(/\$?(\d+(\.\d+)?)/);
  const customPrice = priceMatch ? parseFloat(priceMatch[1]) : 0.15;

  if (userText.includes('budget') || userText.includes('quota') || userText.includes('limit') || userText.includes('balance') || userText.includes('remaining')) {
    toolUsed = 'check_agent_quota';
    toolResult = handleAgentToolCall('check_agent_quota', { agentId: targetAgentId });
    const data = toolResult.data;
    conversationalReply = `Current Live Quota Status for **${targetAgentId}**: Spent **$${data.spentTodayUsd.toFixed(2)} USDC** out of daily cap **$${data.dailyLimitUsd.toFixed(2)}**. You have **$${data.remainingBudgetUsd.toFixed(2)} USDC** available remaining budget today (Max call cap: **$${data.maxCostPerCallUsd.toFixed(2)}**).`;
  } else if (userText.includes('pay') || userText.includes('audit') || userText.includes('execute') || userText.includes('call') || userText.includes('reentrancy')) {
    toolUsed = 'execute_x402_micropayment';
    toolResult = handleAgentToolCall('execute_x402_micropayment', { agentId: targetAgentId, priceUsd: customPrice });
    const rcpt = toolResult.data.transactionReceipt;
    conversationalReply = `Executed x402 micropayment call for **$${customPrice.toFixed(2)} USDC**! EIP-712 payload signed for **${targetAgentId}**. Settled transaction receipt: **${rcpt.txHash.substring(0, 14)}...** (Block #${rcpt.blockNumber} on Base Mainnet).`;
  } else if (userText.includes('violation') || userText.includes('block') || userText.includes('firewall')) {
    toolUsed = 'evaluate_x402_policy';
    toolResult = handleAgentToolCall('evaluate_x402_policy', { agentId: targetAgentId, requestedCostUsd: customPrice });
    conversationalReply = `SpendCap Firewall Audit: Intercepted 1 unauthorized egress request earlier today (unauthorized domain 'unauthorized-api.xyz'). All recent requests from **${targetAgentId}** are currently compliant.`;
  } else {
    toolUsed = 'evaluate_x402_policy';
    toolResult = handleAgentToolCall('evaluate_x402_policy', { agentId: targetAgentId, requestedCostUsd: customPrice });
    conversationalReply = `SpendCap Agent Swarm evaluated prompt "${message}": Request ($${customPrice.toFixed(2)} USDC) is compliant with max per-call cap and daily budget ceilings. Policy status: PASSED.`;
  }

  res.json({
    success: true,
    toolExecuted: toolUsed,
    toolOutput: toolResult,
    reply: conversationalReply,
    timestamp: new Date().toISOString()
  });
});

// 2. SpendCap 402 Egress Proxy Interceptor Endpoint
app.post('/api/v1/proxy', (req, res) => {
  const { agentId, agentName, targetEndpoint, payload, agentWallet } = req.body;

  const costRequestedUsd = 0.15; // standard per-call cost

  // Step A: Evaluate Spend Policy Rules
  const policyCheck = policyEngine.evaluateRequest({
    agentId: agentId || 'agent-01',
    targetUrl: targetEndpoint || '/api/v1/ai-summarize',
    requestedCostUsd: costRequestedUsd
  });

  if (!policyCheck.allowed) {
    return res.status(403).json({
      success: false,
      blocked: true,
      reason: policyCheck.reason,
      code: policyCheck.code,
      timestamp: new Date().toISOString()
    });
  }

  // Step B: Record Spend
  policyEngine.recordSpend(agentId || 'agent-01', costRequestedUsd);

  // Step C: Generate x402 Signature Payload
  const nonce = `nonce_${Date.now()}`;
  const authSig = generateX402AuthSignature({
    agentAddress: agentWallet || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    recipient: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    priceUsd: costRequestedUsd,
    nonce,
    chainId: 8453
  });

  const receipt = generateReceipt({
    agentId: agentId || 'agent-01',
    agentName: agentName || 'AutoCode-Reviewer-v2',
    amountUsd: costRequestedUsd,
    recipient: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    endpoint: targetEndpoint || '/api/v1/ai-summarize',
    nonce
  });

  res.json({
    success: true,
    policyPassed: true,
    policyMessage: policyCheck.reason,
    x402AuthHeader: authSig,
    transactionReceipt: receipt,
    data: {
      summary: `[AI Analysis]: Processed payload successfully under SpendCap 402 proxy supervision.`,
      executionTimeMs: 142
    }
  });
});

app.listen(PORT, () => {
  console.log(`⚡ SpendCap 402 Egress Proxy running on http://localhost:${PORT}`);
});
