---
name: support-and-care-info
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Background information about Open Elements' Support & Care offering — professional maintenance and support for critical open-source Java components (JUnit, Apache Maven, Log4j, Commons, Eclipse Temurin). Use when generating content about Support & Care, Java OSS maintenance, CRA compliance for open-source dependencies, or when the user mentions open-source support services, Java supply chain security, or OSS stewardship.
---

# Support & Care

## Logo

The Support & Care logo is available in this skill's folder in three formats:

- **Support & Care-01.svg** — SVG vector format (preferred)
- **Support & Care-01.png** — PNG with transparent background
- **Support & Care-01-w.png** — PNG white version for dark backgrounds

## Overview

Support & Care is Open Elements' core business offering: professional maintenance and support for critical open-source components in the Java ecosystem. Modern software consists of over 70% open-source components. Starting in 2027, the Cyber Resilience Act (CRA) makes manufacturers responsible for 100% of their software — including all OSS dependencies.

Support & Care addresses this by providing continuous maintenance, monitoring, and proactive care for the foundational Java components that enterprises depend on.

**Motto:** Open Source — aber richtig. / Open Source made right.

## Supported Components

### JUnit

- Over 1 billion downloads per month
- Used by approximately 85% of all Java projects
- Foundation of modern quality assurance — enables automated, repeatable, continuous testing

### Apache Log4j

- Approximately 76% of all Java applications use Log4j for logging — more than any other logging tool
- Critical component for logging, monitoring, and error analysis
- The Log4Shell vulnerability (December 2021) demonstrated the risks of unmanaged base dependencies — a critical security flaw that was latently present in millions of software stacks worldwide. More information: https://www.bsi.bund.de/dok/log4j

### Apache Maven

- Over 75% of all Java projects use Maven for build and project management
- Approximately 2 billion downloads per year
- Fundamental part of modern software development

### Apache Commons

- One of the central utility library collections in the Java ecosystem
- Approximately 49% of Java developers actively use Apache Commons
- Modular collection (Commons Lang, IO, Collections, etc.) providing proven, reusable standard functions

### Eclipse Temurin

- One of the leading OpenJDK distributions worldwide
- Over 500,000 downloads per day
- TCK-certified, AQAvit-verified, community-supported Java runtime
- Runtime foundation for countless enterprise Java applications

### What These Components Cover

Together, these components form the foundation of the entire technical trust chain of Java applications:

- **Build pipeline** — Apache Maven
- **Test strategy** — JUnit
- **Logging infrastructure** — Apache Log4j
- **Standard libraries** — Apache Commons
- **Java runtime** — Eclipse Temurin

## Where Support & Care Fits

Java applications can be structured into three vertical layers:

1. **Application code** — Business logic, developed in-house
2. **Frameworks** — Spring Boot, Quarkus, Jakarta EE, etc.
3. **Base components** — Runtime, build tools, logging, testing, utilities

The base components provide reusable infrastructure functionality but also carry the majority of technical risks: security vulnerabilities, transitive dependencies, and compliance responsibility. Support & Care targets this lowest layer directly — ensuring security, stability, and regulatory compliance at the foundation of the application.

Framework support alone is not sufficient. The Log4Shell vulnerability showed that a critical flaw in a widely-used base library can have enormous global impact, even when framework updates and vendor advisories exist — because they often reach affected applications too late or not at all.

## Services

### Long Term Support (LTS)

Continued support for the most important versions to better organize updates.

### Security Updates & Bugfixes

Timely information and notifications to ensure smooth and fast vulnerability remediation.

### Documentation & Transparency

Support with SBOM strategies and technical documentation — optionally provided in German or English.

### Workshops & Consulting

Direct exchange with maintainers and committers — available in German or English.

### Regular Webinars & Status Updates

Information on current security risks, important version changes, best-practice recommendations, and concrete impacts on the OSS supply chain.

### Custom Builds & Tooling

Tailored implementations directly from the maintainers.

## Business Model

Support & Care uses a transparent **cost-share model with strategic sponsorship**. This means:

- Customers share the ongoing maintenance and improvement costs for the supported open-source components — openly, transparently, and measurably
- **Funds flow directly to the maintainers** of the projects. Instead of adding superficial support layers, the investment goes into the vitality of each project's core
- Customer requirements and priorities are actively integrated into the project roadmaps, so development directly reflects real enterprise needs

### Proactive Communication

Customers are proactively kept informed about:

- Security warnings and new patches
- Planned API or major version changes
- Recommendations for version updates or dependency cleanups
- Trends and risks in the OSS ecosystem

## CRA Compliance

Open Elements acts as an **Open-Source Steward** with direct participation in developing best practices for regulatory compliance.

Through the founding membership in the **Open Regulatory Compliance Working Group (ORC WG)** of the Eclipse Foundation, Open Elements works together with leading open-source foundations, major technology companies, and EU representatives on concrete specifications, recommendations, and practical guidelines for implementing CRA requirements.

Support & Care helps with:

- Significantly reducing patch times
- Systematic vulnerability monitoring
- Making updates predictably available
- Ensuring documentation and transparency
- Guaranteeing long-term maintainability
- Prospective support for CRA-compliant attestations for supported projects — based on best practices developed in the ORC WG

See the `eclipse-info` skill (ORC WG section) for more details on the regulatory compliance work.

## Subscription Models

Support & Care offers three subscription tiers with varying levels of availability, compliance support, and SLA commitments. Contact Open Elements for details.

## Why Open Elements

Open Elements combines:

- **Community proximity** — Board seat at Eclipse Foundation, Technical Advisory Board at Linux Foundation
- **Enterprise experience** — Working with organizations on critical Java infrastructure
- **Regulatory know-how** — Active involvement in CRA compliance (ORC WG)
- **Sustainable OSS funding** — Revenue from Support & Care flows directly into the supported open-source projects
- **Transparency** — Open, traceable, and measurable contributions

Active contributions to critical OSS projects including Eclipse Adoptium, Jakarta EE, Apache Maven, and other key projects. See the `open-elements-info` skill for the full list of foundation memberships and roles.

## Key Links

| Resource | URL |
|----------|-----|
| Support & Care GitHub | https://github.com/support-and-care |
| Open Elements Website | https://open-elements.com |
| ORC WG | https://orcwg.org |
| BSI Log4Shell Info | https://www.bsi.bund.de/dok/log4j |

## Sources for Statistics

- JetBrains Developer Ecosystem Survey: https://www.jetbrains.com/lp/devecosystem-2021/java/
- New Relic State of the Java Ecosystem 2024: https://newrelic.com/de/resources/report/2024-state-of-the-java-ecosystem
