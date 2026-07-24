import { generateReceipt } from './x402Proxy.js';

/**
 * Sample Monetized AI API Endpoint
 * Demonstrates HTTP 402 Payment Required server implementation
 */

export function handleAiSummarize(req, res) {
  const authHeader = req.headers['x-payment-auth'] || req.headers['authorization'];
  const agentId = req.headers['x-agent-id'] || 'agent-01';
  const agentName = req.headers['x-agent-name'] || 'AutoCode-Reviewer-v2';

  // PHASE 1: No valid payment signature provided -> Return HTTP 402 Challenge
  if (!authHeader || !authHeader.startsWith('x402_sig_')) {
    const nonce = `nonce_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    res.status(402)
      .set({
        'X-Payment-Required': 'true',
        'X-Payment-Price': '0.15',
        'X-Payment-Recipient': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        'X-Payment-Nonce': nonce,
        'X-Payment-Chain-Id': '8453',
        'X-Payment-Token': 'USDC',
        'Access-Control-Expose-Headers': 'X-Payment-Required, X-Payment-Price, X-Payment-Recipient, X-Payment-Nonce, X-Payment-Chain-Id, X-Payment-Token'
      })
      .json({
        statusCode: 402,
        error: 'Payment Required',
        message: 'Pay-per-call fee of $0.15 USDC required for AI document analysis',
        challenge: {
          priceUsd: 0.15,
          recipient: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          token: 'USDC (Base Mainnet)',
          nonce: nonce
        }
      });
    return;
  }

  // PHASE 2: Valid x402 payment authorization signature -> Process & Return 200 OK + Receipt
  const receipt = generateReceipt({
    agentId,
    agentName,
    amountUsd: 0.15,
    recipient: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    endpoint: '/api/v1/ai-summarize',
    nonce: 'nonce_paid_8453'
  });

  const textToSummarize = req.body?.text || 'SpendCap 402 enables autonomous AI agent micropayments via HTTP 402.';

  res.status(200)
    .set({
      'X-Payment-Receipt': JSON.stringify(receipt),
      'Access-Control-Expose-Headers': 'X-Payment-Receipt'
    })
    .json({
      success: true,
      data: {
        summary: `[AI Analysis]: Extracted 3 key highlights from standard payload. All smart contract calls are validated and within budget thresholds. Payload: "${textToSummarize.substring(0, 80)}..."`,
        wordCount: textToSummarize.split(' ').length,
        sentiment: 'Positive',
        securityRiskScore: '0.00 (Safe)',
      },
      transactionReceipt: receipt
    });
}
