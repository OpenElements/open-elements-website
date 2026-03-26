---
name: hedera-info
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Background information about the Hedera network — the public distributed ledger built on Hiero, governed by a council of global organizations. Covers the Hedera Mainnet, Testnet, HBAR cryptocurrency, Hedera Council, and the ecosystem organizations (Hashgraph, Hashgraph Association, HBAR Foundation). Use when generating content about Hedera as a product/network, its use cases, governance, HBAR token, or the organizations around it. Also use when the user mentions Hedera Mainnet, HBAR, HashScan, or Hedera Council.
---

# Hedera Network Information

## Overview

Hedera is a public, open-source, proof-of-stake distributed ledger network (DLT). It is built on the Hiero open-source codebase (see the `hiero-info` skill for technical details on the underlying technology) and governed by the Hedera Council — a decentralized body of leading global organizations.

Hedera positions itself as "the trusted platform for building fast, secure, and compliant decentralized applications."

- **Website:** https://hedera.com
- **Documentation:** https://docs.hedera.com
- **Block Explorer:** https://hashscan.io

## HBAR

HBAR (symbol: ℏ) is the native cryptocurrency of the Hedera network. It powers all network operations.

### Denomination

- **1 ℏ (HBAR)** = 100,000,000 tℏ (tinybars)
- Tinybars are the smallest unit — the network reports all balances and fees in tinybars

### Uses

- **Transaction fees** — All transactions and queries on the network cost fees paid in HBAR
- **Staking** — HBAR can be staked to network nodes as part of the proof-of-stake consensus
- **Application payments** — Used as a medium of exchange within Hedera-based applications
- **Network security** — Staked HBAR contributes to the network's security model

### Fee Model

Hedera avoids gas-based pricing (unlike Ethereum). Fees are:
- **Set in USD** — predictable and stable regardless of HBAR price
- **Converted to HBAR** at the time of transaction
- **Low and fixed** — e.g., consensus messages cost approximately $0.0001 per message

## Network Services

Hedera provides four core network services:

### Hedera Token Service (HTS)

Create and manage fungible and non-fungible tokens natively on the network.

- Compatible with ERC-20 (fungible) and ERC-721 (NFT) standards
- 10,000+ TPS
- Native token operations (mint, burn, transfer, freeze, KYC) without smart contracts

### Hedera Consensus Service (HCS)

A decentralized message bus for writing immutable, verifiable, and consensus-timestamped data.

- ~$0.0001 per message
- 10,000+ TPS
- Use cases: supply chain tracking, audit logs, IoT data streams, application event ordering

### Smart Contract Service

EVM-compatible smart contracts written in Solidity.

- 10,000+ TPS
- Instant transaction finality
- Compatible with Ethereum development tools via JSON-RPC Relay: Web3.js, Ethers.js, Hardhat, Foundry, Truffle

### File Service

Decentralized file storage using hash-based file identification for secure storage and retrieval across the network.

## Performance

| Metric | Value |
|--------|-------|
| Throughput | 10,000+ TPS |
| Finality | Instant (seconds) |
| Consensus | Hashgraph (ABFT — Asynchronous Byzantine Fault Tolerant) |
| Node model | Permissioned (Council members operate nodes) |
| Fee model | USD-denominated, converted to HBAR at transaction time |

## Networks

### Mainnet

The production network. All real HBAR transactions and live applications operate here.

- Council members operate the consensus nodes
- Mirror nodes archive data and provide APIs for querying historical data
- Explorer: https://hashscan.io (select Mainnet)

### Testnet

A free test environment for developers. Mirrors mainnet functionality but uses test HBAR with no real value.

- Free test HBAR available via the Hedera Developer Portal faucet or HashPack wallet
- Same services and APIs as mainnet
- Explorer: https://hashscan.io (select Testnet)

### Previewnet

An early-access network for testing upcoming features before they reach testnet and mainnet.

### Local Development

For local development, use **solo** — an opinionated CLI for deploying and managing standalone test networks. See the `hiero-info` skill for details on solo and the solo GitHub Action. (The older hiero-local-node tool is being deprecated in favor of solo.)

## HashScan

HashScan (https://hashscan.io) is the primary block explorer and analytics tool for the Hedera network. Built by Hashgraph.

**Features:**
- View transactions, accounts, tokens, smart contracts, and topics
- Supports Mainnet, Testnet, and Previewnet
- Real-time transaction monitoring
- Token and NFT exploration
- Account balance and history lookup
- Smart contract verification

## Hedera Council

The Hedera Council is a decentralized governing body of leading global organizations that validate transactions on the Hedera network and steer its strategic direction.

**Key principles:**
- Equal voting rights for all Council members
- Term limits to prevent concentration of power
- Members strategically spread across different regions and industries for collusion-proof governance
- Governed by the Hedera Council LLC Agreement

**Website:** https://hederacouncil.org

### Council Members (selection)

The Council consists of 30+ organizations across industries:

**Technology:** Dell, Google, LG, Hitachi, ServiceNow, Wipro
**Finance:** Shinhan Bank, Standard Bank, Nomura, LSE (London Stock Exchange)
**Telecommunications:** Deutsche Telekom, Tata Communications, Zain
**Enterprise:** FedEx, Mondelēz, Avery Dennison, Arrow Electronics
**Energy:** EDF, Repsol
**Blockchain/Crypto:** BitGo, Chainlink Labs, Swirlds
**Other:** Ubisoft, Australian Payments Plus

### Participation Levels

Beyond full Council membership:
- **Strategic Partners** — e.g., GBBC, Halborn
- **Community Partners** — e.g., HashPack, Hashgraph Online, Genfinity

## Ecosystem Organizations

### Hashgraph

Hashgraph (formerly Swirlds Labs) is the primary software company providing technical development, product engineering, and marketing support for the Hedera network.

- **Website:** https://hashgraph.com
- **Role:** Core engineering and ecosystem development for Hedera
- **CEO:** Eric Piscini
- **Co-founder of Hedera:** Mance Harmon
- **Inventor of hashgraph:** Dr. Leemon Baird (Co-founder & Chief Scientist)
- **Director of Open Source:** Hendrik Ebbers (founder of Open Elements, Hiero TSC Chair)

**Products:**
- **HashSphere** — Private network powered by Hedera/Hiero technology
- **HashScan** — Block explorer and analytics tool (https://hashscan.io)
- **NFT Studio** — NFT development platform
- **HashioDAO** — Decentralized autonomous organization tooling
- **Hashio** — Network service offering

**Note:** Hashgraph is a separate company from the Hedera Council. Hedera is an independent, council-governed public network; Hashgraph operates as a developer and service provider within that ecosystem.

### HBAR Foundation

The HBAR Foundation is dedicated to supporting the growth and development of the Hedera ecosystem through grants, investments, and ecosystem development programs.

- Provides funding for projects building on Hedera
- Supports developer education and adoption programs
- Invests in ecosystem infrastructure and tooling

### Hashgraph Association

The Hashgraph Association is a Swiss-based organization focused on advancing the adoption of Hedera/Hiero technology, particularly in enterprise and institutional contexts.

- Ecosystem development and adoption programs
- Enterprise partnerships and use case development
- Regional market development

## Use Cases and Industries

Hedera targets high-volume, cost-sensitive enterprise applications across several industries:

### Finance & Payments

- Tokenization of real-world assets (RWA)
- Cross-border payments with low, predictable fees
- Digital securities and compliance-ready financial products
- Islamic finance innovation (QFC Digital Asset Lab collaboration via Hashgraph)

### Supply Chain & Logistics

- Immutable tracking via Hedera Consensus Service
- Provenance verification for goods
- FedEx (Council member) — logistics and shipping applications

### Sustainability & Carbon Markets

- Carbon credit tokenization and tracking
- ESG reporting with verifiable, immutable data
- Environmental asset management

### AI & Data Integrity

- Verifiable data provenance for AI training data
- Consensus-timestamped audit trails
- Decentralized data marketplaces

### Identity & Credentials

- Decentralized identity (DID) solutions
- Verifiable credentials
- See the `hiero-info` skill for the Hiero DID SDKs

### Notable Deployments

- **Project Acacia (Australia)** — HashSphere selected as infrastructure provider
- **Standard Bank** — Financial services on Hedera (Council member)
- **ServiceNow** — Enterprise workflow integration (Council member)
- **Chainlink Labs** — Oracle services integration (Council member)

## Relationship: Hedera, Hiero, and the Ecosystem

Understanding the relationship between these entities is important:

| Entity | What it is |
|--------|-----------|
| **Hiero** | The open-source codebase (under LF Decentralized Trust) from which Hedera is built. Anyone can use Hiero to run their own DLT. See `hiero-info` skill. |
| **Hedera Mainnet** | The production public network running Hiero code, governed by the Hedera Council |
| **Hedera Council** | The governing body of 30+ organizations that operate nodes and steer strategy |
| **Hashgraph** | The software company providing engineering and products for the Hedera ecosystem |
| **HBAR Foundation** | Grant and investment organization supporting Hedera ecosystem growth |
| **Hashgraph Association** | Swiss organization advancing enterprise adoption of Hedera/Hiero technology |
| **HBAR** | The native cryptocurrency powering the Hedera network |

## Developer Resources

| Resource | URL |
|----------|-----|
| Hedera Documentation | https://docs.hedera.com |
| Developer Portal | https://portal.hedera.com |
| HashScan Explorer | https://hashscan.io |
| Hedera SDKs | See `hiero-info` skill (SDKs are now under the Hiero project) |
| JSON-RPC Relay | See `hiero-info` skill |
| Hedera GitHub (legacy) | https://github.com/hashgraph |
| Hiero GitHub (current) | https://github.com/hiero-ledger |

## Key Links

| Resource | URL |
|----------|-----|
| Hedera Website | https://hedera.com |
| Hedera Council | https://hederacouncil.org |
| Hedera Documentation | https://docs.hedera.com |
| HashScan | https://hashscan.io |
| Hashgraph (company) | https://hashgraph.com |
| HBAR Foundation | https://www.hbarfoundation.org |
| Hiero (open-source base) | https://hiero.org |
