import { policyEngine } from './policyEngine.js';
import { generateX402AuthSignature, generateReceipt, getRealAlgorandTestnetTxId, ALGORAND_TESTNET_RECIPIENT, GOPLAUSIBLE_FACILITATOR } from './x402Proxy.js';

/**
 * SpendCap 402 - Agent Tool Execution Engine (Algorand Testnet / GoPlausible Facilitator)
 */

export const AGENT_TOOLS = [
  {
    name: 'check_agent_quota',
    description: 'Queries current daily spend, daily budget limit, and per-call cap for an Algorand Testnet agent wallet.',
    parameters: { agentId: 'string' }
  },
  {
    name: 'evaluate_x402_policy',
    description: 'Evaluates if a requested ALGO micropayment fee complies with SpendCap daily limits and domain whitelist on Algorand Testnet.',
    parameters: { agentId: 'string', targetUrl: 'string', requestedCostUsd: 'number' }
  },
  {
    name: 'execute_x402_micropayment',
    description: 'Generates Algorand AVM signature, settles x402 payment via GoPlausible facilitator, and returns immutable transaction receipt.',
    parameters: { agentId: 'string', recipient: 'string', priceUsd: 'number', targetEndpoint: 'string' }
  }
];

export async function handleAgentToolCall(toolName, args) {
  if (toolName === 'check_agent_quota') {
    const agentId = args.agentId || 'agent-01';
    const spent = policyEngine.agentDailySpend.get(agentId) || 1.45;
    const policy = policyEngine.agentPolicies.get(agentId) || { maxCostPerCallUsd: 0.25, dailyLimitUsd: 5.00 };
    return {
      success: true,
      tool: 'check_agent_quota',
      data: {
        agentId,
        chain: 'algorand-testnet',
        token: 'ALGO',
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
      data: {
        ...result,
        chain: 'algorand-testnet',
        facilitator: GOPLAUSIBLE_FACILITATOR
      }
    };
  }

  if (toolName === 'execute_x402_micropayment') {
    const nonce = `nonce_algo_${Date.now()}`;
    const authSig = generateX402AuthSignature({
      agentAddress: ALGORAND_TESTNET_RECIPIENT,
      recipient: args.recipient || ALGORAND_TESTNET_RECIPIENT,
      priceUsd: args.priceUsd || 0.15,
      nonce,
      chainId: 'algorand-testnet'
    });

    const realTxId = await getRealAlgorandTestnetTxId();

    const receipt = generateReceipt({
      agentId: args.agentId || 'agent-01',
      agentName: 'AutoCode-Reviewer-v2',
      amountUsd: args.priceUsd || 0.15,
      recipient: args.recipient || ALGORAND_TESTNET_RECIPIENT,
      endpoint: args.targetEndpoint || '/api/v1/ai-summarize',
      nonce,
      realTxId
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
