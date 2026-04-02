# 01 - Repository Overview

## Introduction

The Open Elements repository is a modern, full-stack web application that powers the Open Elements website. This guide provides a comprehensive overview of the project architecture, technology decisions, and development model to help you navigate the codebase efficiently and contribute effectively.

## Project Purpose

This repository consolidates multiple critical components into a unified system:

- **Frontend Application**: A Next.js-based application using the modern App Router for server-side rendering and client-side interactivity
- **Content Management**: Markdown-based content stored in version control, enabling content to evolve alongside code
- **Internationalization (i18n)**: Multi-language support with English and German as primary locales, with centralized translation resources
- **Automation & CI/CD**: GitHub Actions workflows that enforce quality standards, manage contributor lifecycle, and automate routine tasks

## Core Technology Stack

Understanding the technology stack is essential for making informed contributions:

| Technology | Purpose | Version Notes |
|-----------|---------|---------------|
| **Node.js** | JavaScript runtime for development and build processes | Use version from `.nvmrc` or lockfile |
| **pnpm** | Efficient package manager with workspace support | Preferred over npm for this project |
| **Next.js** | React metaframework with App Router for modern web development | Latest stable version |
| **React** | UI library for component-based frontend development | Integrated with Next.js |
| **TypeScript** | Typed JavaScript for improved code quality and developer experience | Strict mode enabled |
| **Tailwind CSS** | Utility-first CSS framework for responsive design | Configured with custom extensions |
| **Playwright** | End-to-end testing framework for critical user flows | Browser automation testing |
| **GitHub Actions** | CI/CD and automation platform for workflow enforcement | Native GitHub integration |

## Directory Structure and Key Paths

Understanding the repository layout is critical for locating code, content, and assets:

| Path | Purpose | Audience |
|------|---------|----------|
| `src/app` | Next.js App Router application structure with locale-based routing (`[locale]/...`), page components, and route handlers | Frontend developers |
| `src/components` | Reusable React components used across multiple pages; well-typed with TypeScript interfaces | Frontend developers |
| `src/lib` | Utility functions including markdown parsing, content loading, and helper functions | All developers |
| `src/data` | Structured data files (JSON, TypeScript) that feed content to components | Frontend developers, content editors |
| `src/data-temp` | Temporary or transitional data files; avoid relying on these for permanent features | Temporary use only |
| `src/i18n` | Internationalization configuration, locale detection, and routing helpers for EN/DE support | Frontend developers |
| `src/middleware.ts` | Next.js middleware for request-level logic (locale detection, redirects, etc.) | Advanced developers |
| `content` | **Markdown source files** for pages, blog posts, updates, and team members; source of truth for content | Content editors, page developers |
| `locales` | Translation dictionaries in JSON format (`en.json`, `de.json`); UI strings and labels | Translators, content editors |
| `public` | Static assets including images, icons, stylesheets, and generated artifacts; served as-is by the web server | Asset management |
| `tests/e2e` | End-to-end test suites using Playwright; validates critical user flows and routes | QA, developers |
| `.github/workflows` | GitHub Actions automation for CI/CD, issue management, PR automation, and status synchronization | Maintainers, DevOps |
| `.github/reviewers.json` | Configuration mapping code ownership to reviewers; used by PR automation | Maintainers |
| `docs/` | **Developer documentation** (this folder); authoritative reference for contribution processes | All contributors |

## Content and Runtime Architecture

### The Hybrid Model

The Open Elements project employs a hybrid content management approach that combines static content files with dynamic runtime behavior:

**Static Layer (Content)**
- Markdown files in `content/` directory serve as version-controlled content source
- Front matter (YAML metadata) provides page configuration and SEO information
- Content changes are tracked in Git alongside code changes, enabling synchronized releases

**Runtime Layer (Application)**
- Next.js parses markdown at build time and runtime
- React components consume parsed content and render it into web pages
- Route structure in `src/app/[locale]/` defines how content is exposed to users
- TypeScript ensures type safety across content and component layers

### Typical Contribution Pattern

Most changes to the website involve coordinating between content files and application code:

1. **Content Update**: Modify markdown in `content/<page-slug>/index.md` or `index.de.md`
   - Update title, description, or body content
   - Ensure front matter is complete and valid

2. **Route/Component Update**: Update or create components in `src/app/[locale]/<page-slug>/page.tsx`
   - Implement rendering logic for the page
   - Handle locale-specific behavior
   - Ensure proper metadata handling

3. **Asset Management**: Add images or resources to `public/<page-slug>/`
   - Reference via web paths: `/my-page/image.png`
   - Never use relative paths or `public/` prefix in references

### Localization Requirements

- **English (EN)**: Primary locale, stored as `index.md` or `*.en.md`
- **German (DE)**: Secondary locale, stored as `index.de.md` or `*.de.md`
- **Parity Rule**: User-facing pages must maintain content parity between EN and DE
- **Single-Language Content**: Some content (e.g., technical updates) may be EN-only when approved

## Local Development Setup

### Prerequisites

Ensure you have the following installed and properly configured:

1. **Node.js and pnpm**
   ```bash
   # Verify Node.js installation
   node --version
   
   # Install pnpm globally (if not already installed)
   npm install -g pnpm
   
   # Verify pnpm installation
   pnpm --version
   ```

2. **Git**
   - Fork the repository on GitHub
   - Clone your fork locally

### Getting Started

```bash
# Navigate to project directory
cd open-elements-website

# Install all dependencies (uses lockfile for reproducibility)
pnpm install

# Start development server with hot-reload
pnpm run dev
```

### Accessing the Application

Once the development server is running:

- **English (Default)**: `http://localhost:3000`
- **German**: `http://localhost:3000/de` (or manually visit localized routes)
- **Hot Reload**: Changes to components, styles, and content are reflected immediately in the browser

### Development Server Features

- **TypeScript Compilation**: Real-time type checking during development
- **Fast Refresh**: Individual component updates without full page reload
- **Source Maps**: Enables debugging with mapped source code
- **API Routes**: Full Next.js capabilities available

## Build and Pre-Submission Verification

Before submitting any changes, ensure all quality checks pass:

### Linting (Code Style & Static Analysis)

```bash
pnpm run lint
```

Validates TypeScript, enforces code style conventions, and detects potential issues using ESLint. This check is automatic and catches common errors early.

### Build Verification

```bash
pnpm run build
```

Performs a full production build including:
- TypeScript compilation with strict type checking
- Bundle optimization and chunking
- Next.js route generation
- Asset processing through Tailwind CSS

**Important**: The build must succeed before opening a PR, as CI/CD will also run this check.

### End-to-End Testing (When Required)

```bash
pnpm run test:e2e
```

Launches Playwright automated browser tests that validate:
- Critical user workflows
- Route navigation and switching
- Content rendering across locales
- Page metadata and SEO elements

**When to run E2E tests**: Always run when your changes affect routing, locale switching, markdown rendering, or interactive components.

### Complete Pre-PR Validation

Run the full suite to ensure readiness:

```bash
pnpm run lint && pnpm run build && pnpm run test:e2e
```

## Contribution Principles and Best Practices

Following these principles ensures your contributions are high-quality, maintainable, and aligned with project standards:

### Scope and Focus

- **Single Concern per PR**: Keep pull requests focused on one feature, fix, or improvement
- **Atomic Changes**: Each commit should represent one logical unit of work
- **Minimal Changes**: Only modify files necessary for your specific change; avoid unrelated refactors

### Localization Requirements

- **Maintain EN/DE Parity**: For user-facing content, always update both English and German versions
- **Consistent Structure**: Keep directory structure and file naming consistent between `content/en` and `content/de` concepts
- **Translation Guidelines**: When translating, maintain meaning and formatting from the source language

### Preservation of Existing Behavior

- **URL Stability**: Avoid changing existing URLs unless accompanied by redirect/alias strategy
- **Naming Conventions**: Follow existing naming patterns for routes, components, and files (kebab-case for paths, PascalCase for React component files)
- **Directory Structure**: Don't reorganize existing directories without team consensus and migration plan

### Code and Content Quality

- **No Manual Generation**: Avoid manually editing generated files in `public/` or build outputs
- **Documentation**: Explain non-obvious implementation decisions in PR descriptions and code comments
- **Code Review Focus**: Be responsive to reviewer feedback and make targeted follow-up commits
- **Testing Coverage**: Ensure your changes are covered by existing tests or add new tests as appropriate

### Example Scenarios

| Scenario | Principle | Action |
|----------|-----------|--------|
| Adding a new page | Single concern | Create content + route in one PR, not separate PRs |
| Fixing a bug | Minimal changes | Only modify the affected component/file |
| Updating content | Parity | Update both `index.md` and `index.de.md` |
| Changing a URL | Preservation | Add redirect strategy or link the team before submitting PR |
| Improving performance | Documentation | Explain the performance benefit in PR description |
