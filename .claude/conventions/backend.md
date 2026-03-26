# Backend Conventions for Claude Code

## Overview

Our backends are written in Java. This document covers conventions specific to backend applications. For general Java conventions, see [java.md](java.md).

## Frameworks

We use two frameworks for building backend applications:

- **[Spring Boot](https://spring.io/projects/spring-boot)** — The full-featured option. Use Spring Boot when the application needs a broad ecosystem (security, data access, messaging, etc.) and development speed matters more than minimal footprint.
- **[Helidon SE](https://helidon.io/)** — The lightweight option. Use Helidon SE for performant, lean backends where a small footprint and low startup time are important.

Both are valid choices depending on the project requirements. We aim to provide Open Elements base libraries (as dependencies) for both frameworks in the future.

### Libraries for Backend Frameworks

When building libraries that target backend applications, provide support for Spring Boot and Helidon SE as primary targets. Additionally, offer support for [Eclipse MicroProfile](https://microprofile.io/) and [Eclipse Jakarta EE](https://jakarta.ee/) where feasible, to broaden compatibility. For concrete backend applications, we typically do not use MicroProfile or Jakarta EE directly.

## REST APIs and OpenAPI

- Every backend that exposes REST endpoints must include a Swagger UI for interactive API exploration.
- Use [SpringDoc OpenAPI](https://springdoc.org/) (for Spring Boot) or an equivalent library to generate the OpenAPI specification automatically from code.
- Document every endpoint completely with OpenAPI annotations: summary, description, request/response schemas, status codes, and error responses.
- Use meaningful operation IDs and group endpoints with tags.
- Configure authentication information in the OpenAPI specification so that users can authorize directly in the Swagger UI to test protected endpoints. Include the supported security schemes (e.g., Bearer token, OAuth2) and their configuration.
- Ensure the OpenAPI spec stays in sync with the actual implementation — generate it from code rather than maintaining a separate spec file.
- **IMPORTANT**: Never expose JPA entities directly in REST endpoints (neither as request nor as response objects). Always use dedicated **DTOs** (Data Transfer Objects) for the API layer. Map between entities and DTOs explicitly in the service or controller layer. This avoids leaking internal data model details, prevents lazy-loading and serialization issues, and decouples the API contract from the database schema.

## Data Access and Database

- **IMPORTANT**: Use **JPA** (Jakarta Persistence API) for data access. Do not use implementation-specific APIs (e.g., Hibernate session or criteria API directly) — always program against the JPA interfaces.
- Use **[Flyway](https://flywaydb.org/)** for database schema management and migrations in all projects with a database.
- **PostgreSQL** is the preferred database for test environments and production.
- **H2** (in-memory) is the preferred database for fast, automated unit/integration tests. In the future, we plan to replace H2 with [Testcontainers](https://www.testcontainers.org/)-based PostgreSQL to test against the same database in all environments.
- **IMPORTANT**: Database connection URLs, credentials, and other settings must be configurable via environment variables (see [fullstack-architecture.md](fullstack-architecture.md#configuration)).

## Data Privacy and GDPR

- **IMPORTANT**: All backend applications must be designed with GDPR (DSGVO) compliance in mind.
- Collect only personal data that is strictly necessary for the application's purpose (data minimization).
- Every piece of personal data must have a clear, documented legal basis for processing (e.g., consent, contract fulfillment, legitimate interest).
- Provide API endpoints for data subject rights: access (Art. 15), rectification (Art. 16), erasure (Art. 17), and data portability (Art. 20) where applicable.
- Personal data must be deletable — design database schemas so that user data can be fully removed without breaking referential integrity.
- Log access to personal data for audit purposes, but do not log the personal data itself.
- Do not store personal data in log files, error messages, or stack traces.
- Use encryption at rest and in transit for personal data.
- When integrating third-party services, verify that they are GDPR-compliant and document data processing agreements.

## Observability

- Every backend should expose **metrics** in Prometheus format for monitoring and alerting.
- Every backend should stream **logs** to Loki for centralized log aggregation and querying.
- Concrete implementation details for Spring Boot and Helidon SE are still being defined.
