---
name: project-analyze
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Analyze the current project and generate or update the project-specific documentation files (features, tech stack, structure, architecture). Use this skill when setting up claude-project-base in a new project, or when the project has changed significantly and the documentation needs to be refreshed.
---

# Analyze Project

Scan the current project and generate or update the four project-specific documentation files that give Claude Code persistent context about the project.

## Target Files

All files live in `conventions/project-specific/` relative to this skill (at `../../conventions/project-specific/`):

- `project-features.md` — Core features and user-facing capabilities
- `project-tech.md` — Languages, frameworks, libraries, databases, external services
- `project-structure.md` — Repository layout and directory structure
- `project-architecture.md` — Technical architecture, component interactions, data flow

## Instructions

### 1. Scan the project

Explore the project systematically to gather information:

- **Root files** — Read `README.md`, `package.json`, `pom.xml`, `build.gradle`, `docker-compose.yml`, `Dockerfile`s, `.sdkmanrc`, `.nvmrc`, and similar configuration files
- **Directory structure** — List top-level directories and key sub-directories to understand the layout
- **Source code** — Scan key entry points (main classes, app routers, index files) to understand what the application does
- **Dependencies** — Read dependency files (pom.xml, package.json, requirements.txt) to identify the tech stack
- **Existing documentation** — Read any existing docs, ADRs, or architecture notes
- **CI/CD** — Check `.github/workflows/` to understand the build and deployment pipeline

### 2. Read existing project-specific files

If the four target files already contain content (not just placeholder comments), read them first. The goal is to **update** them, not to start from scratch. Preserve any manually added details that are still accurate.

### 3. Generate or update each file

Write each file with concrete, factual content based on what was found. Follow these guidelines:

**`project-features.md`:**
- Start with a 2–3 sentence overview of what the project is and who it is for
- List core features as bullet points with brief descriptions
- Focus on what the project *does*, not how it is built

**`project-tech.md`:**
- List languages with versions (from .sdkmanrc, .nvmrc, pom.xml, package.json)
- List frameworks and their versions
- List build tools and package managers
- List databases, caches, message brokers, and external services
- List key libraries (logging, testing, ORM, etc.)

**`project-structure.md`:**
- Show the repository layout as a tree diagram (top-level + one or two levels deep for important directories)
- Describe what each key directory contains
- Note where to find entry points, configuration, tests, and documentation

**`project-architecture.md`:**
- Describe the main components and their responsibilities
- Explain how components communicate (REST, gRPC, message queues, JDBC, etc.)
- Include a Mermaid diagram showing the high-level architecture
- Note any important architectural decisions or patterns (e.g., event sourcing, CQRS, microservices)

### 4. Present changes to the user

Show a summary of what was found and what will be written. If the files already had content, highlight what changed. Ask the user to review before writing the files.

### 5. Write the files

After user confirmation, write all four files. Do not include HTML comments or placeholder text — only real content.
