# Project-Specific Documentation

This directory contains project-specific documentation that gives Claude Code persistent context about the project. The files here are maintained per project and are not overwritten by `update-claude-base`.

## Standard Project Files

These files describe the project so that Claude Code understands the context when working on any change. Use `/project-analyze` to generate or update them automatically.

- [Project Features](project-features.md) — What the product does, its core features and user-facing capabilities
- [Project Tech Stack](project-tech.md) — Languages, frameworks, libraries, databases, and external services used
- [Project Structure](project-structure.md) — Repository layout, directory structure, and where to find what
- [Project Architecture](project-architecture.md) — Technical architecture, component interactions, and data flow

## Additional Project Docs

Add further project-specific documentation here as needed, for example:

- Authentication and authorization setup
- Deployment process and environments
- Third-party integrations
- Domain-specific conventions
