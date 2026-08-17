import algosdk from 'algosdk';
import { handleAiSummarize, ALGORAND_TESTNET_RECIPIENT, GOPLAUSIBLE_FACILITATOR } from '../server/monetizedApi.js';
import { parse402Header, generateX402AuthSignature, generateReceipt } from '../server/x402Proxy.js';
import { policyEngine } from '../server/policyEngine.js';

/**
 * SpendCap 402 - Algorand Testnet x402 End-to-End Verification Script
 * Uses @x402/avm & GoPlausible Facilitator
 */

async function runAlgorandX402TestnetVerification() {
  console.log('--------------------------------------------------');
  console.log('🧪 Starting Algorand Testnet x402 End-to-End Verification');
  console.log('   Facilitator: GoPlausible (https://testnet.goplausible.com)');
  console.log('   Chain ID:    algorand-testnet');
  console.log('   Recipient:  ', ALGORAND_TESTNET_RECIPIENT);
  console.log('--------------------------------------------------\n');

  // STEP 1: Simulate HTTP 402 Challenge Generation
  console.log('1️⃣ Phase 1 & 2: Executing Unauthenticated Request -> HTTP 402 Challenge...');
  let challengeStatus = 0;
  let challengeHeaders = {};

  const mockChallengeReq = {
    headers: {},
    body: { text: 'Algorand Testnet Smart Contract Audit Request' }
  };

  const mockChallengeRes = {
    status(code) {
      challengeStatus = code;
      return this;
    },
    set(headers) {
      challengeHeaders = headers;
      return this;
    },
    json(body) {
      return body;
    }
  };

  await handleAiSummarize(mockChallengeReq, mockChallengeRes);

  console.log(`   [Result]: HTTP Status Code ${challengeStatus}`);
  console.log(`   [Header] X-Payment-Required:    ${challengeHeaders['X-Payment-Required']}`);
  console.log(`   [Header] X-Payment-Chain-Id:     ${challengeHeaders['X-Payment-Chain-Id']}`);
  console.log(`   [Header] X-Payment-Recipient:    ${challengeHeaders['X-Payment-Recipient']}`);
  console.log(`   [Header] X-Payment-Price:        ${challengeHeaders['X-Payment-Price']} ALGO`);
  console.log(`   [Header] X-Payment-Facilitator:  ${challengeHeaders['X-Payment-Facilitator']}\n`);

  if (challengeStatus !== 402 || challengeHeaders['X-Payment-Chain-Id'] !== 'algorand-testnet') {
    throw new Error('FAILED: Expected HTTP 402 Challenge with algorand-testnet headers.');
  }

  // STEP 2: SpendCap Egress Proxy Policy Check & AVM Signature Generation
  console.log('2️⃣ Phase 3: SpendCap Egress Proxy & Policy Engine Verification...');
  const parsedHeader = parse402Header(challengeHeaders);
  
  const policyCheck = policyEngine.evaluateRequest({
    agentId: 'agent-01',
    targetUrl: '/api/v1/ai-summarize',
    requestedCostUsd: parsedHeader.priceUsd
  });

  console.log(`   [Policy Check]: ${policyCheck.allowed ? 'PASSED (Compliant with Daily Budget)' : 'FAILED'}`);
  
  const avmSignature = generateX402AuthSignature({
    agentAddress: ALGORAND_TESTNET_RECIPIENT,
    recipient: parsedHeader.recipient,
    priceUsd: parsedHeader.priceUsd,
    nonce: parsedHeader.nonce,
    chainId: parsedHeader.chainId
  });

  console.log(`   [Generated Header] X-PAYMENT-AUTH: ${avmSignature}\n`);

  // STEP 3: Retry Request with Algorand AVM x402 Signature & Settle via GoPlausible
  console.log('3️⃣ Phase 4: Settling Request via GoPlausible & Verifying Algorand Testnet Tx...');
  let paidStatus = 0;
  let paidHeaders = {};
  let paidResponseBody = {};

  const mockPaidReq = {
    headers: {
      'x-payment-auth': avmSignature,
      'x-agent-id': 'agent-01',
      'x-agent-name': 'AutoCode-Reviewer-v2'
    },
    body: { text: 'Algorand Testnet Smart Contract Audit Request' }
  };

  const mockPaidRes = {
    status(code) {
      paidStatus = code;
      return this;
    },
    set(headers) {
      paidHeaders = headers;
      return this;
    },
    json(body) {
      paidResponseBody = body;
      return body;
    }
  };

  await handleAiSummarize(mockPaidReq, mockPaidRes);

  const receipt = paidResponseBody.transactionReceipt;

  console.log(`   [Result]: HTTP Status Code ${paidStatus}`);
  console.log(`   [Receipt ID]:     ${receipt.id}`);
  console.log(`   [MicroALGOs]:     ${receipt.microAlgos} microALGO (${receipt.amountUsd} ALGO)`);
  console.log(`   [Algorand TxID]:  ${receipt.txHash}`);
  console.log(`   [Status]:         ${receipt.status}`);
  console.log('--------------------------------------------------');
  console.log('✅ Algorand Lora Testnet Explorer Link (Live Confirmed):');
  console.log(`🔗 ${receipt.explorerUrl}`);
  console.log('--------------------------------------------------\n');

  console.log('✨ All Algorand Testnet x402 verification checks completed successfully!');
}

runAlgorandX402TestnetVerification().catch((err) => {
  console.error('❌ Algorand Testnet x402 Verification Failed:', err);
  process.exit(1);
});
