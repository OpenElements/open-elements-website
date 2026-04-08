---
name: hiero-info
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Background information about the Hiero project — an open-source distributed ledger technology (DLT) under Linux Foundation Decentralized Trust (LFDT). Use when generating content that references Hiero, Hedera, hashgraph consensus, DLT/blockchain technology, or when working on code within the Hiero ecosystem. Also use when the user mentions LFDT, distributed ledger, or decentralized trust.
---

# Hiero Project Information

## Overview

Hiero is an open-source, vendor-neutral distributed ledger technology (DLT) project under Linux Foundation Decentralized Trust (LFDT). It is the foundational technology for the Hedera public ledger — one of the largest public DLTs in operation.

Hedera donated its entire codebase to LFDT, creating Hiero. The Hedera Mainnet is now built from Hiero code. This same code can be used by anyone to operate their own public or private DLT — a first in the industry.

In August 2025, Hiero graduated as the first project under the LFDT umbrella and its new Project Lifecycle Framework.

- **Website:** https://hiero.org
- **Blog:** https://hiero.org/blog/
- **GitHub:** https://github.com/hiero-ledger/
- **License:** Apache License 2.0

## LF Decentralized Trust (LFDT)

LFDT is a sub-foundation of the Linux Foundation focused on collaborative development of decentralized technologies and standards. It covers decentralized identity, ledger technologies, interoperability, cryptographic tools, smart contracts, and implementation tooling.

Notable members include Accenture, American Express, Citi, ConsenSys, DTCC, Fujitsu, Hedera, IBM, Polygon, and Walmart.

- **Website:** https://www.lfdecentralizedtrust.org

## Technical Foundation

### Hashgraph Consensus

Hiero uses the hashgraph consensus algorithm, invented by Dr. Leemon Baird. Key properties:

- **ABFT (Asynchronous Byzantine Fault Tolerant):** The highest security category for distributed consensus — tolerates malicious nodes and network partitions without assumptions about message timing.
- **Leaderless:** Every node participates equally. No node has a special role, making the protocol resistant to targeted denial-of-service attacks.
- **Fair ordering:** Transactions are processed in a fair, consensus-determined order — no single participant can manipulate sequencing.
- **High throughput:** Achieves high performance without sacrificing security or fairness.

### Architecture Components

| Component | Purpose |
|-----------|---------|
| **Consensus Node** | Core — processes transactions and executes consensus (Java) |
| **Block Node** | Block processing service (Java) |
| **Mirror Node** | Archives data from consensus nodes, provides query APIs (Java) |
| **JSON-RPC Relay** | Ethereum JSON-RPC API bridge for EVM compatibility (TypeScript) |
| **Local Node** | Local development and test network (TypeScript) |

### Ethereum Compatibility

The JSON-RPC Relay implements Ethereum JSON-RPC APIs, allowing Ethereum developers and tools to interact with Hiero/Hedera networks. The project maintains Ethereum execution spec tests for EVM regression validation.

### Hiero Improvement Proposals (HIPs)

HIPs are the formal process for proposing changes to the protocol (similar to BIPs for Bitcoin or EIPs for Ethereum). Repository: https://github.com/hiero-ledger/hiero-improvement-proposals

## SDKs

Hiero provides SDKs in seven languages:

| SDK | Language | Repository |
|-----|----------|------------|
| hiero-sdk-java | Java | https://github.com/hiero-ledger/hiero-sdk-java |
| hiero-sdk-js | JavaScript/TypeScript | https://github.com/hiero-ledger/hiero-sdk-js |
| hiero-sdk-go | Go | https://github.com/hiero-ledger/hiero-sdk-go |
| hiero-sdk-python | Python | https://github.com/hiero-ledger/hiero-sdk-python |
| hiero-sdk-rust | Rust | https://github.com/hiero-ledger/hiero-sdk-rust |
| hiero-sdk-cpp | C++ | https://github.com/hiero-ledger/hiero-sdk-cpp |
| hiero-sdk-swift | Swift | https://github.com/hiero-ledger/hiero-sdk-swift |

A Technology Compatibility Kit (TCK) ensures consistent behavior across SDK implementations: https://github.com/hiero-ledger/hiero-sdk-tck

## Developer Tools

| Tool | Purpose | Repository |
|------|---------|------------|
| **hiero-cli** | Command-line tools for developers | https://github.com/hiero-ledger/hiero-cli |
| **solo** | CLI for deploying and managing standalone test networks (preferred over hiero-local-node) | https://github.com/hiero-ledger/solo |
| **hiero-solo-action** | GitHub Action for setting up a Hiero network in CI/CD | https://github.com/hiero-ledger/hiero-solo-action |
| **hiero-local-node** | Local dev network (deprecated — use solo instead) | https://github.com/hiero-ledger/hiero-local-node |
| **hiero-mirror-node-explorer** | Mirror Node Explorer UI | https://github.com/hiero-ledger/hiero-mirror-node-explorer |
| **hiero-enterprise-java** | Java modules for enterprise apps (Spring Boot, MicroProfile) | https://github.com/hiero-ledger/hiero-enterprise-java |

## Identity / Decentralized Identity (DID)

Hiero has a growing identity workstream with dedicated SDKs and an identity platform:

- **hiero-did-sdk-js** — TypeScript/JavaScript SDK for decentralized identity
- **hiero-did-sdk-python** — Python SDK for decentralized identity
- **heka-identity-platform** — Identity platform solution
- **identity-collaboration-hub** — Central repo for identity architecture docs and standards

## Governance

### Technical Steering Committee (TSC)

The TSC is the primary governance body, responsible for technical decisions, HIP approvals, and project oversight.

**Current members (9):**

| Name | Organisation / Role |
|------|---------------------|
| Hendrik Ebbers (Chair) | Open Elements / Hashgraph — Director of Open Source |
| Richard Bair | Hashgraph — VP Engineering |
| Dr. Leemon Baird (permanent) | Hashgraph — Co-founder & Chief Scientist, inventor of the hashgraph algorithm |
| Stoyan Panayotov | LimeChain — Software Architect |
| Alexander Popowycz | Hedera — CIO |
| Michael Kantor | Hashgraph Online — President |
| Milan Wiercx van Rhijn | The HBAR Foundry — End User Representative |
| Brandon Davenport | Hgraph — Director of Communications |
| Georgi Lazarov | LimeChain — Technical Lead |

**How the TSC operates:**
- Weekly meetings, Tuesdays 10:00 AM ET
- Quorum: 6 members required for votes
- Votes recorded per member (yes/no/abstain), asynchronous voting when no quorum
- Meeting minutes: https://github.com/hiero-ledger/tsc/tree/main/minutes (pre-2025), governance wiki (2026+)
- TSC mailing list via groups.io
- Elections for Contributor Seats and End-User Seats
- Calendar: https://zoom-lfx.platform.linuxfoundation.org/meetings/hiero

### Governance Repository

Central hub for governance documentation, managed via Clowarden.io:
https://github.com/hiero-ledger/governance

Contains election procedures, role definitions, rules and guidelines, and PR templates for governance actions (new repos, new teams, membership changes, vote-required changes).

## Community

### Regular Meetings

All meetings are public and accessible via the LFX Calendar.

| Meeting | Frequency |
|---------|-----------|
| TSC Meetings | Weekly |
| Community Calls | Monthly |
| Python SDK Working Group | Monthly |
| Documentation Working Group | Monthly |
| Solo / Solo Action | Biweekly |
| SDK Cross-Implementation | Monthly |
| Website & Marketing | Monthly |
| Maintainers Coordination | Monthly |
| Identity Working Group | Monthly |
| Mirror Node Working Group | Monthly |

### Ecosystem Partners

HashPack (leading wallet), Hgraph (infrastructure provider), HBAR Foundry (developer community), SentX.io, ioBuilders, Calaxy, Diamond Standard, Hedera

### Community Communication

- Discord: via lfdecentralizedtrust.org
- GitHub Discussions: https://github.com/orgs/hiero-ledger/discussions
- Mailing lists via groups.io

## Open Elements' Role in Hiero

Hendrik Ebbers, founder of Open Elements and Director of Open Source at Hashgraph, chairs the Hiero TSC. He is also Vice Chair of the LFDT Technical Advisory Board and a member of AAIF working groups at the Linux Foundation. See the `open-elements-info` skill for full details on Hendrik's roles.

**Code contributions donated to Hiero:**
- **hiero-enterprise-java** — Java APIs for integrating Hiero networks into enterprise frameworks like Spring Boot and MicroProfile. Developed by Open Elements and donated to the Hiero Ledger organization (March 2026).
- **hiero-solo-action** — GitHub Action for setting up a Hiero network in CI/CD pipelines. Developed by Open Elements and donated to Hiero.

Beyond these donated projects, several Open Elements team members are active committers or maintainers on other Hiero repositories.

## Key Links

| Resource | URL |
|----------|-----|
| Hiero Website | https://hiero.org |
| Hiero Blog | https://hiero.org/blog/ |
| GitHub Organization | https://github.com/hiero-ledger/ |
| Governance Wiki | https://github.com/hiero-ledger/governance/wiki |
| TSC Repo | https://github.com/hiero-ledger/tsc |
| HIPs | https://github.com/hiero-ledger/hiero-improvement-proposals |
| LFDT Website | https://www.lfdecentralizedtrust.org |
| Meeting Calendar | https://zoom-lfx.platform.linuxfoundation.org/meetings/hiero |
