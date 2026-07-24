# 🛡️ SpendCap 402 — Agentic Spend Gateway & x402 Micropayment Protocol

[![Brainwave 2026](https://img.shields.io/badge/Hackathon-Brainwave_2026-indigo.svg)](https://devpost.com)
[![Track](https://img.shields.io/badge/Track-Track_2_&_Track_1-emerald.svg)]()
[![Standard](https://img.shields.io/badge/Standard-x402_HTTP_Payment_Required-blue.svg)]()
[![Network](https://img.shields.io/badge/Network-Base_Mainnet_8453-purple.svg)]()

> **Stripe for Autonomous AI Agent Fleets**: An Enterprise Egress Proxy Firewall, Rule-Based Spend Policy Engine, Real-Time Timeseries Telemetry Dashboard, and Multi-Agent Copilot enforcing the **HTTP 402 Payment Required standard** for autonomous AI agent fleets.

---

## 🏆 Hackathon Project Information

* **Hackathon**: Brainwave 2026 – X402 Blockchain Track
* **Organizer**: ACTS EDC
* **Tracks Submitted**: 
  * **Track 2**: Agentic Commerce & Payment Infrastructure *(Core Gateway, Spend Engine, & Receipt Vault)*
  * **Track 1**: x402-Powered AI Applications *(Pay-per-call AI Code Auditor & Summarizer)*
* **Ecosystem / Chain**: Base Mainnet (Chain ID: 8453) / EVM

---

## 💡 Inspiration & Problem Statement

As autonomous AI agents (e.g. built on LangChain, AutoGPT, or CrewAI) gain Web3 wallet signing capabilities, they interact with pay-per-call APIs via micropayments.

However, if an AI agent enters an infinite execution loop or gets compromised, it can **drain an entire corporate Web3 wallet in minutes**.

**SpendCap 402** acts as an **egress firewall & policy proxy** between AI agents and x402 monetized APIs:
1. **Rule-Based Spend Caps**: Enforces max cost per request (e.g., $0.10/call) and 24-hour daily budget ceilings per agent.
2. **x402 Auto-Signing Proxy**: Intercepts `HTTP 402 Payment Required` challenges, verifies agent budget policies, generates cryptographically signed EIP-712 auth payloads, and retries requests automatically.
3. **Receipt Ledger & Audit Trail**: Captures immutable transaction receipts and exposes real-time telemetry graphs for company administrators.
4. **Docked Copilot & MCP Tools Engine**: A right-hand side panel supporting multi-agent collaboration and real-time MCP function calling (`check_agent_quota`, `evaluate_x402_policy`, `execute_x402_micropayment`).

---

## 🔄 x402 Protocol Architecture

```
+-----------------------------------------------------------------------------------+
|                                  SPENDCAP 402                                     |
|                                                                                   |
|  +--------------------+        1. POST /api/v1/summarize   +--------------------+ |
|  |  Autonomous AI     | ---------------------------------> | SpendCap 402       | |
|  |  Agent / Client    |                                    | Egress Proxy       | |
|  +--------------------+                                    +--------------------+ |
|            ^                                                         |            |
|            |                                              2. Check   |            |
|            | 4. Return Data                               Spend Caps |            |
|            |    & Receipt                                 & Rules    v            |
|  +--------------------+        3. x402 Challenge           +--------------------+ |
|  | Monetized AI API   | <--------------------------------- | Auto-Signer        | |
|  | (HTTP 402 Server)  | (Challenge -> Sign -> Settle)      | Wallet Vault       | |
|  +--------------------+                                    +--------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## ⚙️ How It Works (The 4-Step x402 Protocol Lifecycle)

1. **Phase 1 (Request)**: AI Agent sends an unauthenticated HTTP request to a monetized API (`POST /api/v1/ai-summarize`).
2. **Phase 2 (Challenge)**: Target server rejects request with `HTTP 402 Payment Required` containing `X-Payment-Price: 0.15`, `X-Payment-Recipient`, `X-Payment-Nonce`, and `X-Payment-Chain-Id`.
3. **Phase 3 (Proxy & Policy)**: SpendCap Egress Proxy evaluates agent daily quota and per-call cap. If compliant, generates EIP-712 cryptographic signature `X-PAYMENT-AUTH`.
4. **Phase 4 (Settle & Receipt)**: Request retries with authorization header. Server verifies signature, returns `200 OK`, and issues verifiable `X-Payment-Receipt`.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Backend / Proxy Engine**: Express.js, Viem (EIP-712 cryptographic hashes & keccak256)
- **Protocol Standard**: x402 Standard (RFC-7231 HTTP 402)
- **Target Network**: Base Mainnet (Chain ID 8453) / EVM Testnet

---

## ⚡ Quickstart & Setup Guide

### 1. Install Dependencies
```bash
git clone https://github.com/harishapc/SpendCap-402.git
cd SpendCap-402
npm install
```

### 2. Run Application
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
  -d '{"text": "Audit smart contract for vulnerabilities"}'
```

**Expected Response**:
```http
HTTP/1.1 402 Payment Required
X-Payment-Required: true
X-Payment-Price: 0.15
X-Payment-Recipient: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
X-Payment-Nonce: nonce_1721832000
X-Payment-Chain-Id: 8453
```

### 2. Request via SpendCap Proxy (Expect `HTTP 200 OK` + Receipt)
```bash
curl -X POST http://localhost:5001/api/v1/proxy \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "agent-01",
    "agentName": "AutoCode-Reviewer-v2",
    "targetEndpoint": "/api/v1/ai-summarize",
    "payload": {"text": "Audit contract code"}
  }'
```

---

## 📜 License
MIT License — Built for **Brainwave 2026 Hackathon**.
