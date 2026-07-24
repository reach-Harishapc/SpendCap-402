/**
 * SpendCap 402 - Policy & Rules Engine
 */

class PolicyEngine {
  constructor() {
    this.agentPolicies = new Map();
    this.agentDailySpend = new Map();
  }

  registerAgent(agentId, policy) {
    this.agentPolicies.set(agentId, policy);
    if (!this.agentDailySpend.has(agentId)) {
      this.agentDailySpend.set(agentId, 0);
    }
  }

  evaluateRequest({ agentId, targetUrl, requestedCostUsd }) {
    const policy = this.agentPolicies.get(agentId) || {
      maxCostPerCallUsd: 0.25,
      dailyLimitUsd: 5.00,
      allowedDomains: ['localhost', 'api.codeaudit.ai', 'x402.dev'],
    };

    const currentDailySpend = this.agentDailySpend.get(agentId) || 0;

    // 1. Check max cost per call
    if (requestedCostUsd > policy.maxCostPerCallUsd) {
      return {
        allowed: false,
        reason: `Policy Violation: Request cost ($${requestedCostUsd.toFixed(2)}) exceeds max per-call limit ($${policy.maxCostPerCallUsd.toFixed(2)})`,
        code: 'PER_CALL_CAP_EXCEEDED'
      };
    }

    // 2. Check daily budget ceiling
    if (currentDailySpend + requestedCostUsd > policy.dailyLimitUsd) {
      return {
        allowed: false,
        reason: `Policy Violation: Daily budget limit ($${policy.dailyLimitUsd.toFixed(2)}) reached. Currently spent $${currentDailySpend.toFixed(2)}.`,
        code: 'DAILY_BUDGET_EXCEEDED'
      };
    }

    // 3. Check Domain Whitelist
    try {
      if (targetUrl.startsWith('/')) {
        // Relative internal endpoint is allowed by default
      } else {
        const urlObj = new URL(targetUrl.startsWith('http') ? targetUrl : `http://${targetUrl}`);
        const hostname = urlObj.hostname;
        const isAllowedDomain = policy.allowedDomains.some(d => hostname.includes(d) || d === '*');
        
        if (!isAllowedDomain) {
          return {
            allowed: false,
            reason: `Policy Violation: Hostname '${hostname}' is not in allowed domain whitelist`,
            code: 'UNAUTHORIZED_DOMAIN'
          };
        }
      }
    } catch (e) {
      // Ignore URL parsing errors for relative paths
    }

    return {
      allowed: true,
      reason: 'Compliant with agent spend rules & whitelist',
      code: 'PASSED'
    };
  }

  recordSpend(agentId, amountUsd) {
    const prev = this.agentDailySpend.get(agentId) || 0;
    this.agentDailySpend.set(agentId, prev + amountUsd);
  }
}

export const policyEngine = new PolicyEngine();
