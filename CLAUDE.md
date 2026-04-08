The merged content is ready. Here it is:

---

# Claude Code Base Configuration

This file provides base rules and conventions for Claude Code in Open Elements projects.
Projects that use this as a base can override or extend these rules in their own `CLAUDE.md`.

## Core Philosophy

- **Quality over speed.** Getting it right matters more than getting it done fast. Take the time needed for clean APIs, proper tests, correct architecture, and polished design.
- **Iterative improvement is expected.** Code and design will evolve through iterations. It is normal and encouraged that things change and improve as new features are added or understanding deepens. Do not over-optimize for a "final" state on the first pass.

## Code Quality

- Follow the DRY principle — avoid duplicating logic. Extract shared code into reusable functions or modules.
- Follow the KISS principle — prefer simple, readable solutions over clever or complex ones.
- Remove dead code. Do not leave commented-out code, unused imports, or unreachable branches.
- Keep functions and methods focused — each should do one thing well.
- Prefer meaningful names for variables, functions, and classes. Avoid abbreviations unless they are widely understood (e.g., `id`, `url`).
- Do not add code "for future use." Only implement what is currently needed.

## Security

- **IMPORTANT**: Never read or write files outside the project directory unless the user explicitly asks for it.
- **IMPORTANT**: Never modify system-level configuration files (shell profiles, system packages, etc.).
- **IMPORTANT**: Never commit, log, or echo secrets, API keys, passwords, or tokens. Use environment variables or secret management tools.
- **IMPORTANT**: Always include `.env` in `.gitignore` to prevent accidental commits of local configuration with secrets.
- Validate and sanitize all external input (user input, API responses, file contents).
- **IMPORTANT**: Use parameterized queries for database access — never build SQL from string concatenation.
- Keep dependencies up to date to avoid known vulnerabilities.
- See [Security Configuration](.claude/conventions/security.md) for concrete `.claude/settings.json` deny rules, sandbox setup, and hook examples.

## Testing

- Write tests for new features and bug fixes.
- Tests should be deterministic — no flaky tests that depend on timing, network, or random state.
- Each test should test one behavior and have a clear name that describes what it verifies.
- Prefer assertion libraries that produce clear failure messages.

## Documentation

- Use GitHub Flavored Markdown (GFM) as the default syntax for all documentation (`README.md`, docs, ADRs, etc.).

## Pull Requests and Reviews

- Keep PRs focused on a single change. Avoid mixing unrelated changes in one PR.
- Write a clear PR description that explains what changed and why.
- Ensure all tests pass before requesting review.
- Address review comments before merging.

## Additional Conventions

**IMPORTANT**: Only include the documents that are relevant to your project. Do not reference all docs — each referenced file is loaded into Claude's context and excessive context causes rules to be ignored.

Typical combinations:

- **Java library**: `software-quality.md`, `java.md`, `repo-setup.md`
- **Java backend**: `software-quality.md`, `java.md`, `backend.md`, `repo-setup.md`
- **TypeScript frontend**: `software-quality.md`, `typescript.md`, `repo-setup.md`
- **Fullstack application**: `software-quality.md`, `java.md`, `typescript.md`, `backend.md`, `fullstack-architecture.md`, `repo-setup.md`

Available documents:

### Language-Specific

- [Java Conventions](.claude/conventions/java.md)
- [TypeScript Conventions](.claude/conventions/typescript.md)

### Security

- [Security Configuration](.claude/conventions/security.md)

### Architecture and Infrastructure

- [Software Quality and Architecture](.claude/conventions/software-quality.md)
- [Fullstack Architecture](.claude/conventions/fullstack-architecture.md)
- [Backend Conventions](.claude/conventions/backend.md)

### Development Workflow

- [Spec-Driven Development](.claude/conventions/spec-driven-development.md)

### CI/CD

- [GitHub Actions](.claude/conventions/github-actions.md)

### Documentation and Repository Setup

- [Repository Setup](.claude/conventions/repo-setup.md)
- [EditorConfig](.claude/conventions/editorconfig.md)
- [Project Documentation](.claude/conventions/documentation.md)

### Project-Specific

- [Project-Specific Docs](.claude/conventions/project-specific/README.md)

---

# Open Elements Website — Project Rules

This repository contains the corporate website for Open Elements GmbH (https://open-elements.com / https://open-elements.de).

## Tech Stack

- **Static Site Generator:** Hugo (v0.118.2)
- **CSS Framework:** Tailwind CSS 3.4
- **Interactive Components:** React 19 (bundled via esbuild)
- **Deployment:** Netlify (two sites: EN + DE)
- **Linting:** htmlhint, enforced via Husky pre-commit hook
- **Font:** Montserrat (Google Fonts)

## Repository Structure

- `content/` — Markdown content (blog posts, pages, articles, team profiles)
- `layouts/` — Hugo templates (`_default/`, `page/`, `partials/`, `shortcodes/`)
- `data/` — Structured JSON/YAML data (`team.json`, `mainMenu.json`, `social.json`, etc.)
- `i18n/` — Translation strings (`en.toml`, `de.toml`)
- `assets/` — CSS, icons, SVG illustrations
- `static/` — Static files copied to output (images, JS bundles, service worker)
- `react-src/` — React component source (Maven PR dashboard), built with esbuild
- `config.toml` — Hugo site configuration (languages, permalinks, markdown settings)
- `tailwind.config.js` — Tailwind theme (custom colors, shadows, plugins)
- `input.css` — Tailwind base styles with custom utility classes

## Content Conventions

- Blog posts live in `content/posts/` as Markdown with YAML front matter.
- The site is bilingual (English + German). Language-specific data is in `data/en/` and `data/de/`.
- Navigation is defined in `data/mainMenu.json`. Landing page section visibility is controlled by `data/landingpage.json`.
- Custom Hugo shortcodes exist for YouTube embeds, centered buttons, and support-care packages.

## Build & Development

- `npm run dev` — Start development server (Hugo + Tailwind + React in parallel)
- `npm run build` — Full production build
- `npm run netlify:build:production` — Netlify production build (sets base URL)
- `npm run lint:html` — HTML linting (runs automatically on pre-commit)

## Working with Templates

- Base template: `layouts/_default/baseof.html`
- Page-specific layouts: `layouts/page/` (about-us, contact, support-care, etc.)
- Reusable partials: `layouts/partials/` (navbar, footer, head, pagination, etc.)
- Custom markdown renderers: `layouts/_default/_markup/` (headings, links, images)

## Styling Rules

- Use Tailwind utility classes. Custom utilities are defined in `input.css` (`.h1`–`.h4`, `.badge-*`, `.link-*`, `.nav-*`).
- Brand colors are defined in `tailwind.config.js`: green (#5CBA9E), rose, sky, yellow, purple, blue.
- SVG illustrations are in `assets/illustrations/` and referenced via Hugo's `resources.Get`.

## What NOT to do

- Do not commit secrets, credentials, or environment-specific values.
- Do not bypass the pre-commit HTML lint hook.
- Do not edit files in `public/` — this directory is generated by Hugo.
- Do not hardcode URLs; use Hugo's `relref`/`absURL` functions in templates.

---

The write to `CLAUDE.md` was blocked by permissions. Please approve the write if you'd like me to save this merged content to the file.
