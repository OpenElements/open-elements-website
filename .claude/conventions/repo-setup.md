# Repository Setup Conventions for Claude Code

## Overview

Every Open Elements repository must contain a set of standard files that provide project information, legal clarity, and community guidelines. Most of our work is open source, and these files ensure a consistent and professional appearance across all repositories.

## Required Root Files

### `README.md`

Every repository must have a `README.md` at the root. Its content depends on the type of project:

**All projects must include:**

- What the repository contains and what the project does.
- The current status of the project (e.g., stable, beta, experimental).
- **Prerequisites** — List all required tools with minimum versions (e.g., Java 21, Node.js 20, pnpm 9). Also list recommended tools for managing versions (e.g., [SDKMAN!](https://sdkman.io/) for Java, [nvm](https://github.com/nvm-sh/nvm) for Node.js). Reference `.sdkmanrc` or `.nvmrc` files if the project provides them.
- How to build the project from source.

**Libraries must additionally include:**

- How to add the library as a dependency (Maven coordinates, npm package name, etc.) for the latest version.
- A basic usage example or link to API documentation.

**Applications (backend, frontend, or fullstack) must additionally include:**

- How to install, deploy, and start the application.
- Required services (e.g., PostgreSQL, Redis) and how to set them up locally.
- How to run with Docker / Docker Compose if applicable, including the `--build` flag for rebuilding after code changes.

### `LICENSE`

Every repository must contain a `LICENSE` file. The preferred license for Open Elements projects is **Apache License 2.0**.

A reference file is available at [hiero-enterprise-java/LICENSE](https://github.com/OpenElements/hiero-enterprise-java/blob/main/LICENSE).

### `CODE_OF_CONDUCT.md`

Every repository must include the Open Elements Code of Conduct, based on the [Contributor Covenant 2.0](https://www.contributor-covenant.org/). The file is available at [OpenElements/.github/CODE_OF_CONDUCT.md](https://github.com/OpenElements/.github/blob/main/CODE_OF_CONDUCT.md).

The Code of Conduct is released under the **CC BY 4.0** license.

### `CONTRIBUTING.md` (planned)

A contributing guide will be added as a standard file in every repository. This is not yet finalized.

### `.gitignore`

Every repository must have a `.gitignore` that excludes at minimum:

- `.env` — local environment configuration with secrets
- `.idea/` — IntelliJ IDEA project files
- `target/` — Maven build output
- `node_modules/` — npm/pnpm/yarn downloaded dependencies
- `.next/` — Next.js build output
- `*.log` — log files

Add further entries as needed for the project's tooling. Do not commit IDE settings, build artifacts, or downloaded dependencies.

### `.editorconfig`

Every repository must include an `.editorconfig` file at the root to enforce consistent formatting (indentation, charset, line endings) across all editors. See [editorconfig.md](editorconfig.md) for the standard configuration.

## Organization-Level Defaults via `.github` Repository

GitHub supports a special `.github` repository within an organization. Community health files placed there (e.g., `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`) automatically apply to all repositories in the organization that do not have their own version of that file. Open Elements uses this mechanism at [OpenElements/.github](https://github.com/OpenElements/.github).

If a file is already provided by the `.github` repository, it does not need to be duplicated in individual repositories. Only add a repo-level override if the project needs to deviate from the organization default.

## Summary

```
project-root/
├── .editorconfig          # Formatting rules (indentation, charset, line endings)
├── .gitignore             # Excludes .env, .idea/, target/, node_modules/, etc.
├── CODE_OF_CONDUCT.md    # Open Elements CoC (Contributor Covenant 2.0, CC BY 4.0)
├── CONTRIBUTING.md        # Contributing guide (planned)
├── LICENSE                # Apache License 2.0
└── README.md              # Project description, status, build & usage instructions
```
