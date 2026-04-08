---
name: project-setup
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Set up, review, or update Open Elements projects (Java libraries, TypeScript libraries, Java backends, web frontends, or fullstack applications). Use this skill when the user wants to create a new project, review an existing project's structure against Open Elements conventions, or update a project to match current best practices.
---

# Open Elements Project Setup and Review

This skill is designed to help with the setup and review of projects at Open Elements.
A project in that case is most often a GitHub repository that contains code for a library, backend, frontend or full application.
It provides guidance on project structure, best practices, and helps ensure that projects align with our standards and guidelines.
Whether you're setting up a new project or reviewing an existing one, this skill can provide valuable insights and recommendations.

## Project types

A project can be a Java library, a TypeScript library, a Java Backend (Spring Boot or Helidon SE based), a Web Frontend or a full application (containing 1-N back-ends and 1-N front-ends).
Depending on the project type, the skill will provide specific guidance on how to set up the project structure, what files and folders to include, and how to organize the code.

## Instructions

Before performing any review or setup task, **read all convention documents first** to have full knowledge of Open Elements standards. The docs are located relative to this skill at `../../conventions/`:

1. Read all of the following files:
   - `../../conventions/software-quality.md` — API design, technical integrity, namespace, SBOM, CI
   - `../../conventions/repo-setup.md` — required root files (README, LICENSE, CoC, .gitignore)
   - `../../conventions/documentation.md` — Markdown, MkDocs, GitHub Pages, ADRs
   - `../../conventions/java.md` — Java conventions
   - `../../conventions/typescript.md` — TypeScript conventions
   - `../../conventions/backend.md` — Backend frameworks, REST/OpenAPI, database, observability
   - `../../conventions/fullstack-architecture.md` — Frontend/backend separation, Docker, configuration, pinned tool versions
   - `../../conventions/project-specific/README.md` — Project-specific docs (if any exist)

2. Determine the project type (Java library, TypeScript library, Java backend, web frontend, or fullstack application). If the project type is not obvious from the existing codebase, **ask the user** which type they want.

3. If the project includes a backend (Java backend or fullstack application), **ask the user** which backend framework to use: **Spring Boot** or **Helidon SE**. Do not assume a default — the user must make this choice explicitly.

4. Based on the project type, apply only the relevant conventions:
   - **All projects**: `software-quality.md`, `repo-setup.md`, `documentation.md`
   - **Java projects**: additionally `java.md`
   - **TypeScript projects**: additionally `typescript.md`
   - **Backend projects**: additionally `backend.md`, `java.md`
   - **Frontend projects**: additionally `typescript.md`
   - **Fullstack projects**: additionally `fullstack-architecture.md`, `backend.md`, `java.md`, `typescript.md`

5. When **reviewing** an existing project: compare the project structure, files, and conventions against the applicable docs. List what matches, what is missing, and what should be changed.

6. When **setting up a new project**, create only a **minimal runnable skeleton** — no business logic, no entities, no feature code. The goal is a project that builds, starts, and can be verified with `docker-compose up --build`. Business logic and features are added later via `/spec-create` and `/spec-implement`.

   The skeleton includes:
   - **Root**: `.editorconfig`, `.gitignore`, `LICENSE`, `.env.example`, `docker-compose.yml`, `README.md`
   - **Backend**: `pom.xml` (with all required plugins and dependencies), Maven Wrapper, `Dockerfile`, `.dockerignore`, `.sdkmanrc`, application config, and a single main application class with one health/ping endpoint to verify the backend starts correctly
   - **Frontend**: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.nvmrc`, `Dockerfile`, `.dockerignore`, `public/favicon.ico`, and a single landing page that shows the project name and confirms the frontend is running. Apply the Open Elements Brand Guidelines (`../open-elements-brand-guidelines/SKILL.md`) and Frontend Design skill (`../frontend-design/SKILL.md`) for the landing page styling.

   **Do not create**: entities, DTOs, repositories, services, controllers (beyond the health endpoint), database migrations, multiple pages, or any business-logic code.

   **IMPORTANT — Avoid output limits and content filter issues**: Do not create all files in a single response. Split the file creation into sequential batches with **at most 2–3 files per batch**. Create each file individually if it is large (e.g., `pom.xml`). Additionally, **never combine credential-related files** (`.env.example`, `docker-compose.yml`, database config) with other files in the same batch — create them one at a time in separate responses to avoid triggering API content filters. After each batch, verify the files were created successfully before proceeding to the next batch.

7. After creating all project files: If a `.env.example` exists and no `.env` file is present, **copy `.env.example` to `.env`** so the project is immediately runnable without manual configuration.

8. After the skeleton is complete, verify it works by running `docker-compose up --build`. If errors occur, fix them before considering the setup done.
