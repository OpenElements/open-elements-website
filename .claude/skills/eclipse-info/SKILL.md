---
name: eclipse-info
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Background information about the Eclipse Foundation and its key projects relevant to Open Elements — including Eclipse Adoptium/Temurin, Jakarta EE, the ORC WG (CRA compliance for open source), and the Eclipse IDE. Use when generating content that references the Eclipse Foundation, Adoptium, Temurin, Jakarta EE, ORC WG, CRA attestation, or when describing Open Elements' involvement in the Eclipse ecosystem.
---

# Eclipse Foundation Information

## Overview

The Eclipse Foundation is an international non-profit association (AISBL, based in Brussels) providing a vendor-neutral environment for open-source software collaboration and innovation. It is Europe's largest open-source foundation.

- Founded: Eclipse Project created by IBM in November 2001, Eclipse Foundation established as independent entity in January 2004
- Hosts 400+ open-source projects
- Supported by 300+ member organizations globally
- Domains: enterprise, cloud, edge computing, automotive, AI, IoT, embedded systems

**Website:** https://www.eclipse.org

### Core Services

- IP Management
- Ecosystem Development & Marketing
- Development Process support
- IT Infrastructure (repositories, build systems, websites)

## Membership Levels

| Level | Governance | Annual Fee |
|-------|-----------|------------|
| **Strategic Member** | Seat on Board of Directors, Architecture Council, General Assembly voting, can lead Working Groups | 30,000-300,000 EUR (by revenue) |
| **Contributing Member** | Board representation through elected delegate, General Assembly voting, Working Group participation | 1,500-25,000 EUR (by revenue) |
| **Associate Member** | General Assembly attendance, guest Working Group membership | 0-25,000 EUR (free for government, NGOs, academia) |
| **Committer Member** | Board representation via elected committer delegate, no fees | Free |

## Board of Directors (current)

| Name | Organisation |
|------|-------------|
| Florian Bankoley | Robert Bosch GmbH |
| Bryan Che | Huawei Technologies |
| Angelo Corsaro | ZettaScale Technology |
| Tim Deboer | Red Hat |
| **Hendrik Ebbers** | **Open Elements** |
| James Eggleston | European Space Agency |
| John Ellis | Codethink Ltd. |
| Wolfgang Gehring | Mercedes-Benz Tech Innovation |
| Robert Hilbrich | DLR (German Aerospace Center) |
| Emily Jiang | IBM |
| Etienne Juliot | OBEO |
| Kenji Kazumura | Fujitsu |
| Matthew Khouzam | Ericsson |
| Rao Lakkakula | Microsoft |
| Shelley Lambert | Red Hat |
| Johannes Matheis | Vector Informatik |
| Ed Merks | Eclipse Modeling Framework |
| Chokri Mraidha | CEA LIST |
| Tom Ritter | Fraunhofer FOKUS |
| Matthias Sohn | SAP |
| Jim Wright | Oracle |

## Eclipse Adoptium

Eclipse Adoptium is a Working Group under the Eclipse Foundation that produces high-quality, enterprise-ready Java runtime binaries from a fully open-source build and test infrastructure.

**Website:** https://adoptium.net

### History

- The AdoptOpenJDK project was established in 2017 to address the lack of an open and reproducible build and test system for OpenJDK across multiple platforms.
- Eclipse Adoptium is the continuation of this mission under the Eclipse Foundation. Hendrik Ebbers was a member of the AdoptOpenJDK Technical Steering Committee and is a founding member of Eclipse Adoptium. He also served on the Adoptium Steering Committee and PMC before stepping back due to time constraints when founding Open Elements.

### Key Projects

| Project | Purpose |
|---------|---------|
| **Eclipse Temurin** | Flagship OpenJDK distribution — high-performance, cross-platform, open-source Java runtimes. Java SE TCK certified and AQAvit verified. |
| **Eclipse AQAvit** | Quality assurance testing framework ensuring performance, reliability, and security in every build. |
| **Eclipse Mission Control** | JDK profiling and diagnostics tools. |

### Eclipse Temurin Details

- Supported LTS versions: JDK 8, 11, 17, 21, 25
- **Platforms:** Windows (x64, aarch64), macOS (x64, aarch64), Linux (x64, aarch64, ppc64le, s390x), Docker container images
- Free of charge without usage restrictions
- 880+ million total downloads/Docker pulls
- 300+ open-source contributors
- Solaris and Windows 32-bit builds discontinued as of 2026

### Adoptium Working Group Members

Strategic members include Microsoft, Red Hat, IBM, Arm, Atlassian, MongoDB, and others.

## Jakarta EE

Jakarta EE is the open-source platform for enterprise Java development under the Eclipse Foundation — the evolution of Java EE. It is described as "the new home of cloud native Java."

### History

Jakarta EE originated from Java EE, which was developed under the Java Community Process (JCP). When Java EE moved to the Eclipse Foundation, it was renamed to Jakarta EE, which included a namespace change from `javax.*` to `jakarta.*`. Hendrik Ebbers was already involved in the Java EE era as a member of JCP Expert Groups, contributing to specifications such as Java Bean Validation. He also supported the `javax` to `jakarta` namespace transition when the project moved to Eclipse.

**Website:** https://jakarta.ee

### Mission

Enable developers to develop, run, and scale enterprise Java applications anywhere with the flexibility of open-source technology. Key principles:
- **Write once, run anywhere** — applications run consistently across certified runtimes
- **Cloud native** — designed for containers and orchestration
- **Security by design** — built-in security APIs
- **Vendor-neutral** — all Working Group members have equal voting power regardless of size

### Profiles (Jakarta EE 11)

| Profile | Scope |
|---------|-------|
| **Platform Profile** | Full specification set — Authorization, Batch, Messaging, Enterprise Beans, and more |
| **Web Profile** | Servlet, Faces, CDI, Persistence, Security, and related specs |
| **Core Profile** | Lightweight — RESTful Web Services, JSON Processing/Binding, CDI Lite |

### Governance

- Managed by the Jakarta EE Working Group under the Eclipse Foundation
- Specification process: Jakarta EE Specification Process (JESP)
- Strategic members: Fujitsu, IBM, Oracle, Payara, Tomitribe
- Formal committees oversee different aspects
- Compatible implementations available through certification program

### Key Resources

- Developer portal with learning hub and starter templates
- JakartaOne conference and Tech Talks
- Community contribution guidelines and mentorship programs

## Open Regulatory Compliance Working Group (ORC WG)

The ORC WG is a Working Group under the Eclipse Foundation focused on developing practical implementations of the Cyber Resilience Act (CRA) rules for open-source software and industry.

**Website:** https://orcwg.org

### Purpose

The CRA introduces new regulatory requirements for software products in the EU, with significant implications for open-source software. The ORC WG works on concrete, implementable approaches to comply with these rules — bridging the gap between regulation and the realities of open-source development.

### Key Workstreams

- **CRA Attestation Working Group** — Develops attestation standards and processes for CRA compliance. Repository: https://github.com/orcwg/cra-attestations

### Open Elements' Involvement

Open Elements is a Founding Member and Participant Member of the ORC WG. Initially Hendrik Ebbers was a regular participant in the WG meetings. Sebastian Tiemann has since taken over and is especially active in the CRA Attestation Working Group.

## Open Elements' Role in the Eclipse Foundation

Open Elements is a Contributing Member of the Eclipse Foundation. Hendrik Ebbers, founder of Open Elements, serves on the Board of Directors.

**Involvement in Working Groups:**
- **Eclipse Adoptium** — Participant Member. Hendrik Ebbers was on the AdoptOpenJDK TSC, is a founding member of Eclipse Adoptium, and served on the Adoptium Steering Committee and PMC before stepping back when founding Open Elements.
- **Jakarta EE** — Participant Member.
- **ORC WG** — Founding Member and Participant Member. Sebastian Tiemann is active in the CRA Attestation WG.

See the `open-elements-info` skill for the full overview of Open Elements' foundation memberships and roles.

## Key Links

| Resource | URL |
|----------|-----|
| Eclipse Foundation | https://www.eclipse.org |
| Eclipse Adoptium | https://adoptium.net |
| Jakarta EE | https://jakarta.ee |
| ORC WG | https://orcwg.org |
| Board of Directors | https://www.eclipse.org/org/foundation/directors/ |
| Membership | https://www.eclipse.org/membership/ |
| Eclipse Projects | https://projects.eclipse.org |
