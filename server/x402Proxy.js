import { keccak256, toBytes, encodePacked } from 'viem';

/**
 * SpendCap 402 - x402 Protocol Header Utilities & Signature Generator
 */

export function parse402Header(resHeaders) {
  return {
    priceUsd: parseFloat(resHeaders['x-payment-price'] || '0.15'),
    recipient: resHeaders['x-payment-recipient'] || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    nonce: resHeaders['x-payment-nonce'] || `nonce_${Date.now()}`,
    chainId: parseInt(resHeaders['x-payment-chain-id'] || '8453', 10), // Base Mainnet
    token: resHeaders['x-payment-token'] || 'USDC',
  };
}

export function generateX402AuthSignature({ agentAddress, recipient, priceUsd, nonce, chainId }) {
  // Generate deterministic EIP-712 mockup signature for x402 header authorization
  const payload = `${agentAddress.toLowerCase()}:${recipient.toLowerCase()}:${priceUsd}:${nonce}:${chainId}`;
  const hash = keccak256(toBytes(payload));
  return `x402_sig_${hash.substring(0, 32)}`;
}

export function generateReceipt({ agentId, agentName, amountUsd, recipient, endpoint, nonce }) {
  const txHash = `0x${keccak256(toBytes(`tx_${Date.now()}_${nonce}`)).substring(2, 42)}`;
  return {
    id: `rcpt_${Math.random().toString(36).substr(2, 9)}`,
    txHash,
    agentId,
    agentName,
    amountUsd,
    recipient,
    endpoint,
    timestamp: new Date().toISOString(),
    nonce,
    signature: `0x${keccak256(toBytes(txHash)).substring(2, 66)}`,
    blockNumber: 18940212 + Math.floor(Math.random() * 100),
    status: 'SETTLED'
  };
}
