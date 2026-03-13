---
outdated: false
showInBlog: true
title: "Agentic Wallets - When AI Agents Need to Pay"
date: 2026-03-12
author: hendrik
excerpt: "AI agents are becoming autonomous actors — but they cannot pay for things. I explore the challenges behind agentic wallets, the emerging specifications that make them possible, and propose a concrete architecture that works across decentralized and centralized payment providers."
categories: [ai, web3]
preview_image: "/posts/preview-images/community-purple.svg"
---

AI agents are no longer just answering questions.
They are booking flights, managing infrastructure, negotiating with APIs, and completing tasks that used to require a human at every step.
But as agents become more autonomous, a fundamental question arises: **how does an AI agent pay for things?**

## The Problem: Agents Cannot Use Credit Cards

Today's payment infrastructure is built for humans.
Credit cards require identity verification, bank transfers need account holders, and payment providers enforce KYC (Know Your Customer) regulations.
None of this works well when the "customer" is an autonomous software agent acting on behalf of a user or organization.

{{< centered-image src="/posts/2026-03-12-agentic-wallets/problem.svg" width="90%" alt="AI agents are blocked by traditional payment infrastructure that requires human identity verification">}}

Imagine an AI agent that manages your cloud infrastructure.
It detects a traffic spike and needs to spin up additional compute resources from a different provider.
Or consider an agent that monitors prices across suppliers and should autonomously purchase materials when the price drops below a threshold.
In both cases, the agent needs a way to **transact value** — quickly, programmatically, and without a human approving every single payment.

This is where the concept of **agentic wallets** comes in: digital wallets that an AI agent can control — within defined boundaries — to send and receive payments.
The idea is not to give agents unlimited financial freedom.
Instead, agentic wallets operate under **policy-based constraints**: maximum transaction amounts, whitelisted recipients, time-based budgets, and human override mechanisms.
Think of it like giving an employee a corporate credit card with a spending limit — except the employee is an AI agent.

## The Building Blocks: Specifications That Make This Possible

Before diving into wallet architecture, we need to understand the emerging specifications that provide the foundation.
Three protocols are particularly relevant.

### MCP — How Agents Talk to Tools

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/specification/2025-11-25) is an open specification — originally created by Anthropic, now under the [Agentic AI Foundation (AAIF)](https://aaif.io) at the Linux Foundation — that defines how AI agents connect to external tools and data sources.

{{< centered-image src="/posts/2026-03-12-agentic-wallets/mcp.svg" width="90%" alt="MCP architecture: an LLM application connects to multiple MCP servers that provide tools and resources">}}

MCP uses JSON-RPC 2.0 and follows a client-server model: the AI application (host) connects to MCP servers that expose **tools** (executable functions) and **resources** (contextual data).
When an agent needs to interact with a blockchain, it does not build raw transactions itself — it calls tools on an MCP server that handles the blockchain-specific logic.

For agentic wallets, MCP is the communication channel between the agent and the payment infrastructure.
A "Hedera MCP Server" or "Coinbase MCP Server" would expose tools like `pay(amount, recipient)` that the agent can call without knowing the details of the underlying ledger or payment system.

### x402 — How Services Signal "You Need to Pay"

[x402](https://www.x402.org/) is an open payment specification — co-founded by [Coinbase and Cloudflare](https://blog.cloudflare.com/x402/) — that embeds payments directly into HTTP.
It revives the long-dormant HTTP 402 "Payment Required" status code and turns it into a fully functional payment protocol.

{{< centered-image src="/posts/2026-03-12-agentic-wallets/x402.png" width="100%" alt="x402 flow: agent calls service, gets HTTP 402 with payment instructions, pays, and retries the request">}}

The flow is simple and elegant:

1. An agent calls a service via HTTP
2. The service responds with **HTTP 402** and payment instructions
3. The agent signs a payment payload
4. The agent retries the request with the payment proof
5. A facilitator verifies the payment and settles it on-chain
6. The service delivers the response

No accounts, no API keys, no checkout flows.
The agent learns it needs to pay through a standard HTTP response and handles payment programmatically.
x402 currently supports stablecoin payments across multiple networks, with over 35 million transactions processed.

For agentic wallets, x402 is the **discovery mechanism**: the way an agent learns that a service costs money and how much.

## My Proposal: A Wallet Architecture for Agentic Payments

As a member of the AAIF working groups — specifically "Agentic Commerce" and "Agentic Identity & Trust" — I am actively working on exactly these topics.
By studying the current specifications and approaches in this space, I have developed an idea for how agentic wallets could be implemented in a provider-agnostic way.
I want to be transparent: I am still learning in this area and do not claim to have all the answers.
I would be grateful for any feedback on this proposal — it is meant as a starting point for discussion, not a final design.

### The Key Insight: The Payment Backend Must Be Always Available

The first challenge is **where the wallet lives**.
If it runs on your local machine, it must be reachable 24/7 — unrealistic for most users.
If it runs as a hosted service (e.g., Coinbase), you hand over control to an intermediary — they manage the keys, they set the rules, and they can restrict your access at any time.

The core requirement is that the component handling **fund management, authorization, and policy enforcement** must be always available and reachable by the agent.
How this is realized depends on the approach:

In a **decentralized setup**, this means splitting the wallet into two components: a **wallet app** on your phone or computer for configuration and monitoring, and a **smart contract** on a distributed ledger that is always on-chain, always available, and enforces spending rules autonomously.

In a **centralized setup** (e.g., Coinbase), no such split is necessary — the wallet interface and payment backend are part of the same service.
Coinbase could offer agentic wallet configuration directly in their web UI, with their servers handling both the user interaction and the agent communication.

Both approaches serve the same goal: giving the agent a **reliable, always-available payment endpoint** with policy enforcement — while the human only needs to be involved for setup and oversight.

This represents a fundamental shift from how traditional Web3 wallets work.
In a classical wallet like MetaMask, the user's device holds the private key and signs every transaction.
But for agentic wallets, we **do not want a personal device to be always online and reachable** — that would be a significant security risk.
A permanently exposed wallet becomes an attack vector: the device and the private key it holds are targets for remote exploitation, key extraction, or side-channel attacks.

Instead, the transaction signing and authorization logic moves to the server side — either into a smart contract (which is always on-chain and has no private key to steal) or into a hosted service (which manages keys in a hardened environment).
The client side of an agentic wallet is reduced to what it should be: a **configuration and monitoring interface** where the human sets policies, approves budgets, and reviews activity.
It does not need to be online when the agent transacts, and it does not hold the keys that authorize payments.

Crucially, the human **always retains full control**.
Through the wallet interface, the user can at any time revoke an agent's access, withdraw remaining funds, or reduce the spending limit — regardless of whether the backend is a smart contract or a centralized service.
In the smart contract scenario, these are explicit on-chain operations: revoking an agent's registered public key or withdrawing the deposited budget are straightforward contract calls that take effect immediately.
The agent has no way to prevent or circumvent this — the policy enforcement lives on-chain, outside the agent's control.

### The Flow

Here is the complete flow for setting up and using an agentic wallet:

{{< centered-image src="/posts/2026-03-12-agentic-wallets/wallet-flow.svg" width="100%" alt="Complete agentic wallet flow: human configures wallet, agent generates key, wallet registers key on-chain, agent pays via MCP server">}}

**Setup phase:**

1. The human tells the wallet app: *"Allow Agent X to spend 100 USDC on my behalf."*
2. The wallet app contacts the agent and requests its public key.
3. **The agent generates its own key pair** (private + public) and sends back the public key.
4. The wallet app transfers 100 USDC to the payment backend (smart contract or custodial service).
5. The wallet app registers the agent's public key with a 100 USDC spending limit.

**Payment phase (autonomous):**

6. The agent calls a service and receives an **HTTP 402** response (x402).
7. The agent calls the MCP server: *"Pay 35 USDC to address Y"* — signed with its private key.
8. The payment backend verifies the signature and budget, then executes the transfer.
9. The wallet app receives an event notification and informs the human.

A critical design decision: **the agent generates its own key pair** for each wallet relationship.
The private key never leaves the agent.
Only the public key is shared with the wallet interface and registered on the payment backend.
This eliminates the entire class of key-transport security problems — no secret is ever transmitted.
Generating a fresh key pair per wallet also limits the blast radius if a key is compromised: only one allowance is affected, not all of the agent's payment relationships.

*Note: For agents managing many wallet relationships, [Hierarchical Deterministic (HD) keys](https://en.wikipedia.org/wiki/Cryptocurrency_wallet#Deterministic_wallet) could offer a practical way to derive per-wallet key pairs from a single master seed — but this is an implementation detail that does not need to be prescribed by the protocol.*

### Provider-Agnostic by Design

A key property of this architecture: **the agent does not need to know what is behind the MCP server**.
The payment backend can be a smart contract on Hedera, Ethereum, Base, or any other DLT — or it can be a centralized service like Coinbase.

{{< centered-image src="/posts/2026-03-12-agentic-wallets/provider-agnostic.svg" width="90%" alt="The same agent interface works with any payment backend: DLT smart contracts, Coinbase, or other providers">}}

From the agent's perspective, the interface is identical:
- It generates a key pair and publishes its public key
- It receives a payment endpoint
- It signs payment requests and sends them to the MCP server
- The MCP server handles the backend-specific logic

This means the protocol for wallet-agent communication can — and should — be specified **independently** of the payment backend.
Whether the MCP server talks to a Hedera smart contract, a Coinbase API, or a Stripe integration is an implementation detail, not a protocol concern.

| | Decentralized (DLT) | Centralized (Coinbase) |
|---|---|---|
| Payment backend | Smart contract on-chain | Coinbase server |
| Fund custody | User-controlled (on-chain) | Provider-custodial |
| Verification | On-chain signature check | Server-side verification |
| Settlement | Atomic, on-chain | Internal transfer |
| MCP server | DLT-specific MCP server | Coinbase MCP server |
| Agent interface | **Identical** | **Identical** |

## What Is Still Missing

This architecture relies on existing specifications (MCP, x402, A2A) and established technology (EVM smart contracts, stablecoins).
But two critical pieces are not yet defined.

### 1. Mutual Identity Verification

In the current flow, the wallet app contacts the agent and trusts the response.
But **how does the wallet know it is talking to the real agent** and not an impersonator?
If an attacker intercepts the communication and sends their own public key, they receive the spending allowance.

Conversely, how does the agent know the wallet request is legitimate?
While sharing a public key with a fake wallet is not dangerous by itself, an attacker could potentially direct the agent to work against a malicious payment backend.

The solution is a **mutual identity layer**: both the wallet and the agent verify each other's identity before exchanging credentials.
Specifications for this exist in adjacent domains:

- **[HCS-14](https://github.com/hiero-ledger/hiero-consensus-specifications)** (Hiero/Hedera) provides W3C DID-based agent identifiers that work across web2 and web3
- **[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)** provides on-chain identity registries with reputation and validation — already live with 45,000+ registered agents
- **[A2A Agent Cards](https://a2a-protocol.org/latest/specification/)** provide signed identity and capability declarations

But none of these specifications define the **specific flow** of mutual verification between a wallet and an agent in the context of payment authorization.
This needs to be specified.

### 2. Wallet-Agent Credential Provisioning

The communication between wallet and agent — steps 2 through 5 in the flow above — has **no specification today**.

There is no defined protocol for:
- How a wallet discovers an agent's endpoint and requests its public key
- How an agent responds with credentials in a verifiable way
- How a wallet communicates the payment endpoint and budget constraints back to the agent

Existing approaches address parts of this problem.
[Coinbase's AgentKit](https://github.com/coinbase/agentkit), for example, provisions wallet access to agents via API keys and environment variables — pragmatic, but tied to Coinbase and not portable.
[AP2](https://ap2-protocol.org/) defines a Credential Provider role that manages tokenized payment credentials, but only for card networks.
Academic work on [authenticated delegation](https://arxiv.org/html/2501.09674v1) proposes a delegation token model built on OAuth 2.0 and OpenID Connect that comes closest to what is needed.
And specifications like [OpenID4VCI](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) define how verifiable credentials can be issued to wallets — a mechanism that could be adapted for issuing payment authorization credentials to agents.

But none of these provide an **open, provider-agnostic specification** for the complete wallet-to-agent credential provisioning flow.
MCP defines agent-to-tool communication. A2A defines agent-to-agent communication. Neither defines **wallet-to-agent credential setup**.
This is a gap that needs to be filled with a dedicated specification.

## Call to Action

The architecture I have described works today — the individual specifications exist, the technology is mature, and the pattern is provider-agnostic.
But it relies on two pieces that are not yet specified:

**1. Define the identity layer for wallet-agent interaction.**
How do a wallet and an agent mutually verify each other before exchanging payment credentials?
This should build on existing identity specifications (W3C DIDs, A2A Agent Cards, ERC-8004) but define the concrete verification flow for payment authorization.

**2. Draft the wallet-agent credential provisioning interface.**
What does the protocol look like when a wallet configures an agent with payment capabilities?
This needs to be backend-agnostic — the same spec must work whether the payment backend is a smart contract or Coinbase.

Both of these are natural tasks for the **[Agentic AI Foundation (AAIF)](https://aaif.io)** and its Agentic AI Working Group.
The AAIF already hosts MCP and brings together the right players — Anthropic, Google, Microsoft, Coinbase, Cloudflare, and others.
Defining how agents handle payments is a logical next step for this foundation.

The building blocks are here.
The specifications are converging.
What we need now is the connective tissue that ties them together.

AI agents will need wallets — and those wallets will need a standard way to talk to agents.
