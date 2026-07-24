import { policyEngine } from './policyEngine.js';
import { generateX402AuthSignature, generateReceipt } from './x402Proxy.js';

/**
 * SpendCap 402 - Agent Tool Execution Engine (MCP & Function Calling)
 */

export const AGENT_TOOLS = [
  {
    name: 'check_agent_quota',
    description: 'Queries current daily spend, daily budget limit, and per-call cap for a given AI agent wallet.',
    parameters: { agentId: 'string' }
  },
  {
    name: 'evaluate_x402_policy',
    description: 'Evaluates if a requested micropayment fee complies with SpendCap daily limits and domain whitelist.',
    parameters: { agentId: 'string', targetUrl: 'string', requestedCostUsd: 'number' }
  },
  {
    name: 'execute_x402_micropayment',
    description: 'Generates EIP-712 cryptographic signature, settles x402 payment, and returns immutable transaction receipt.',
    parameters: { agentId: 'string', recipient: 'string', priceUsd: 'number', targetEndpoint: 'string' }
  }
];

export function handleAgentToolCall(toolName, args) {
  if (toolName === 'check_agent_quota') {
    const agentId = args.agentId || 'agent-01';
    const spent = policyEngine.agentDailySpend.get(agentId) || 1.45;
    const policy = policyEngine.agentPolicies.get(agentId) || { maxCostPerCallUsd: 0.25, dailyLimitUsd: 5.00 };
    return {
      success: true,
      tool: 'check_agent_quota',
      data: {
        agentId,
        spentTodayUsd: spent,
        dailyLimitUsd: policy.dailyLimitUsd,
        remainingBudgetUsd: Math.max(0, policy.dailyLimitUsd - spent),
        maxCostPerCallUsd: policy.maxCostPerCallUsd,
        status: spent >= policy.dailyLimitUsd ? 'LIMIT_EXCEEDED' : 'ACTIVE'
      }
    };
  }

  if (toolName === 'evaluate_x402_policy') {
    const result = policyEngine.evaluateRequest({
      agentId: args.agentId || 'agent-01',
      targetUrl: args.targetUrl || '/api/v1/ai-summarize',
      requestedCostUsd: args.requestedCostUsd || 0.15
    });
    return {
      success: true,
      tool: 'evaluate_x402_policy',
      data: result
    };
  }

  if (toolName === 'execute_x402_micropayment') {
    const nonce = `nonce_${Date.now()}`;
    const authSig = generateX402AuthSignature({
      agentAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      recipient: args.recipient || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      priceUsd: args.priceUsd || 0.15,
      nonce,
      chainId: 8453
    });

    const receipt = generateReceipt({
      agentId: args.agentId || 'agent-01',
      agentName: 'AutoCode-Reviewer-v2',
      amountUsd: args.priceUsd || 0.15,
      recipient: args.recipient || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      endpoint: args.targetEndpoint || '/api/v1/ai-summarize',
      nonce
    });

    policyEngine.recordSpend(args.agentId || 'agent-01', args.priceUsd || 0.15);

    return {
      success: true,
      tool: 'execute_x402_micropayment',
      data: {
        x402AuthSignature: authSig,
        transactionReceipt: receipt
      }
    };
  }

  return { success: false, error: `Unknown tool '${toolName}'` };
}
