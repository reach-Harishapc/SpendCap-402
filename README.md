# 🛡️ SpendCap 402 — Agentic Spend Gateway & Algorand x402 Protocol (@x402/avm)

[![Algorand Testnet](https://img.shields.io/badge/Network-Algorand_Testnet-emerald.svg)](https://lora.algokit.io/testnet)
[![Standard](https://img.shields.io/badge/Standard-x402_HTTP_Payment_Required-blue.svg)]()
[![SDK](https://img.shields.io/badge/SDK-%40x402%2Favm-indigo.svg)]()
[![Facilitator](https://img.shields.io/badge/Facilitator-GoPlausible-purple.svg)](https://testnet.goplausible.com)

> **Stripe for Autonomous AI Agent Fleets**: An Enterprise Egress Proxy Firewall, Rule-Based Spend Policy Engine, Real-Time Telemetry Dashboard, and Multi-Agent Copilot enforcing the **HTTP 402 Payment Required standard** on **Algorand Testnet** using `@x402/avm` and the **GoPlausible** facilitator.

---

## 🏆 Algorand x402 Integration Overview

* **Ecosystem / Chain**: Algorand Testnet (`algorand-testnet`) / AVM
* **x402 Protocol SDK**: `@x402/avm`, `@x402/core`, and `algosdk`
* **Payment Facilitator**: GoPlausible (`https://testnet.goplausible.com`)
* **Explorer Verification**: Algorand Lora Testnet Explorer (`https://lora.algokit.io/testnet`)

---

## 💡 Inspiration & Problem Statement

As autonomous AI agents (e.g. built on LangChain, AutoGPT, or CrewAI) gain Web3 wallet signing capabilities, they interact with pay-per-call APIs via micropayments.

However, if an AI agent enters an infinite execution loop or gets compromised, it can **drain an entire corporate wallet in minutes**.

**SpendCap 402** acts as an **egress firewall & policy proxy** between AI agents and x402 monetized APIs:
1. **Rule-Based Spend Caps**: Enforces max cost per request (e.g., 0.15 ALGO/call) and daily budget ceilings per agent.
2. **x402 AVM Auto-Signing Proxy**: Intercepts `HTTP 402 Payment Required` challenges, verifies agent budget policies, generates cryptographically signed AVM auth payloads (`x402_avm_...`), and retries requests automatically.
3. **GoPlausible Facilitator & Lora Explorer**: Routes micropayments through GoPlausible and generates instant verification links on Algorand Lora Testnet Explorer.
4. **Docked Copilot & MCP Tools Engine**: A right-hand side panel supporting multi-agent collaboration and real-time MCP function execution (`check_agent_quota`, `evaluate_x402_policy`, `execute_x402_micropayment`).

---

## 🔄 x402 Protocol Architecture (Algorand AVM)

```
+-----------------------------------------------------------------------------------+
|                                  SPENDCAP 402                                     |
|                                                                                   |
|  +--------------------+        1. POST /api/v1/ai-summarize  +--------------------+ |
|  |  Autonomous AI     | -----------------------------------> | SpendCap 402       | |
|  |  Agent / Client    |                                      | Egress Proxy       | |
|  +--------------------+                                      +--------------------+ |
|            ^                                                           |            |
|            |                                                2. Check   |            |
|            | 4. Return Data                                 Spend Caps |            |
|            |    & Lora Explorer Receipt                     & Rules    v            |
|  +--------------------+        3. x402 AVM Challenge         +--------------------+ |
|  | Monetized AI API   | <----------------------------------- | Auto-Signer        | |
|  | (HTTP 402 Server)  | (Challenge -> Sign -> GoPlausible)   | (@x402/avm)        | |
|  +--------------------+                                      +--------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## ⚙️ How It Works (The 4-Step x402 Protocol Lifecycle)

1. **Phase 1 (Request)**: AI Agent sends an unauthenticated HTTP request to a monetized API (`POST /api/v1/ai-summarize`).
2. **Phase 2 (Challenge)**: Target server rejects request with `HTTP 402 Payment Required` containing `X-Payment-Price: 0.15`, `X-Payment-Chain-Id: algorand-testnet`, `X-Payment-Recipient: GD64YIY3...`, and `X-Payment-Facilitator: https://testnet.goplausible.com`.
3. **Phase 3 (Proxy & Policy)**: SpendCap Egress Proxy evaluates agent daily quota and per-call cap. If compliant, generates `@x402/avm` cryptographic signature `X-PAYMENT-AUTH`.
4. **Phase 4 (Settle & Receipt)**: Request retries with authorization header. Server verifies signature via GoPlausible, returns `200 OK`, and issues verifiable transaction receipt on **Algorand Lora Testnet Explorer**.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Backend / Proxy Engine**: Express.js, `@x402/avm`, `algosdk`, GoPlausible Facilitator
- **Protocol Standard**: x402 Standard (RFC-7231 HTTP 402)
- **Target Network**: Algorand Testnet (`algorand-testnet`) / AVM
- **Explorer**: Algorand Lora Testnet Explorer (`https://lora.algokit.io/testnet`)

---

## ⚡ Quickstart & Setup Guide

### 1. Install Dependencies
```bash
git clone https://github.com/reach-Harishapc/SpendCap-402.git
cd SpendCap-402
npm install
```

### 2. Run Testnet Transaction Verification Script
Executes full HTTP 402 challenge-response flow and outputs live confirmed Algorand Testnet transaction link:
```bash
node scripts/verify-algorand-x402.js
```

### 3. Run Development Web Server
Starts Express Proxy Server (`http://localhost:5001`) and Vite Web UI (`http://localhost:3000`) concurrently:
```bash
npm start
```

---

## 🧪 cURL Testing Commands

### 1. Unauthenticated Request (Expect `HTTP 402 Payment Required`)
```bash
curl -i -X POST http://localhost:5001/api/v1/ai-summarize \
  -H "Content-Type: application/json" \
  -d '{"text": "Audit smart contract for vulnerabilities on Algorand Testnet"}'
```

**Expected Response**:
```http
HTTP/1.1 402 Payment Required
X-Payment-Required: true
X-Payment-Price: 0.15
X-Payment-Recipient: GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A
X-Payment-Nonce: nonce_algo_1721832000
X-Payment-Chain-Id: algorand-testnet
X-Payment-Facilitator: https://testnet.goplausible.com
```

### 2. Request via SpendCap Proxy (Expect `HTTP 200 OK` + Receipt)
```bash
curl -X POST http://localhost:5001/api/v1/proxy \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "agent-01",
    "agentName": "AutoCode-Reviewer-v2",
    "targetEndpoint": "/api/v1/ai-summarize",
    "payload": {"text": "Audit smart contract on Algorand Testnet"}
  }'
```

---

## 📜 License
MIT License.
