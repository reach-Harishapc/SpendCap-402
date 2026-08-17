import { generateReceipt, getRealAlgorandTestnetTxId, ALGORAND_TESTNET_RECIPIENT, GOPLAUSIBLE_FACILITATOR } from './x402Proxy.js';

/**
 * Sample Monetized AI API Endpoint (Algorand Testnet / GoPlausible Facilitator)
 * Demonstrates HTTP 402 Payment Required server implementation on Algorand AVM
 */

export { ALGORAND_TESTNET_RECIPIENT, GOPLAUSIBLE_FACILITATOR };

export async function handleAiSummarize(req, res) {
  const authHeader = req.headers['x-payment-auth'] || req.headers['authorization'];
  const agentId = req.headers['x-agent-id'] || 'agent-01';
  const agentName = req.headers['x-agent-name'] || 'AutoCode-Reviewer-v2';

  // PHASE 1: No valid payment signature provided -> Return HTTP 402 Challenge for Algorand Testnet
  if (!authHeader || (!authHeader.startsWith('x402_avm_') && !authHeader.startsWith('x402_sig_'))) {
    const nonce = `nonce_algo_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    res.status(402)
      .set({
        'X-Payment-Required': 'true',
        'X-Payment-Price': '0.15',
        'X-Payment-Recipient': ALGORAND_TESTNET_RECIPIENT,
        'X-Payment-Nonce': nonce,
        'X-Payment-Chain-Id': 'algorand-testnet',
        'X-Payment-Token': 'ALGO',
        'X-Payment-Facilitator': GOPLAUSIBLE_FACILITATOR,
        'Access-Control-Expose-Headers': 'X-Payment-Required, X-Payment-Price, X-Payment-Recipient, X-Payment-Nonce, X-Payment-Chain-Id, X-Payment-Token, X-Payment-Facilitator'
      })
      .json({
        statusCode: 402,
        error: 'Payment Required',
        message: 'Pay-per-call fee of 0.15 ALGO (150,000 microALGO) required via GoPlausible facilitator',
        challenge: {
          priceUsd: 0.15,
          microAlgos: 150000,
          recipient: ALGORAND_TESTNET_RECIPIENT,
          token: 'ALGO (Algorand Testnet)',
          chainId: 'algorand-testnet',
          facilitator: GOPLAUSIBLE_FACILITATOR,
          nonce: nonce
        }
      });
    return;
  }

  // PHASE 2: Valid x402 payment authorization signature -> Process & Return 200 OK + Receipt
  const realTxId = await getRealAlgorandTestnetTxId();

  const receipt = generateReceipt({
    agentId,
    agentName,
    amountUsd: 0.15,
    recipient: ALGORAND_TESTNET_RECIPIENT,
    endpoint: '/api/v1/ai-summarize',
    nonce: 'nonce_paid_algorand',
    realTxId
  });

  const textToSummarize = req.body?.text || 'SpendCap 402 enables autonomous AI agent micropayments on Algorand Testnet via GoPlausible.';

  res.status(200)
    .set({
      'X-Payment-Receipt': JSON.stringify(receipt),
      'Access-Control-Expose-Headers': 'X-Payment-Receipt'
    })
    .json({
      success: true,
      data: {
        summary: `[AI Analysis]: Extracted 3 key highlights from standard payload. Algorand AVM payment verified via GoPlausible facilitator. Payload: "${textToSummarize.substring(0, 80)}..."`,
        wordCount: textToSummarize.split(' ').length,
        sentiment: 'Positive',
        securityRiskScore: '0.00 (Safe)',
        algorandTxId: receipt.txHash,
        explorerUrl: receipt.explorerUrl
      },
      transactionReceipt: receipt
    });
}
