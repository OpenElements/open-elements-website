# Project Documentation Conventions for Claude Code

## Overview

We use [MkDocs](https://www.mkdocs.org/) with the [Material for MkDocs](https://squidfunnel.github.io/mkdocs-material/) theme to create and host technical documentation for projects. Documentation is stored in the repository alongside the code and published as GitHub Pages.

A reference implementation is the [maven-initializer docs](https://github.com/support-and-care/maven-initializer/tree/main/docs).

## Repository Structure

```
project-root/
├── docs/
│   ├── index.md              # Landing page
│   ├── architecture.md       # Architecture overview
│   ├── contributing.md       # How to contribute to the docs
│   └── stylesheets/          # Custom CSS (optional)
└── mkdocs.yml                # MkDocs configuration at repository root
```

## MkDocs Configuration

The `mkdocs.yml` lives at the repository root and configures:

- **Theme**: Material for MkDocs with light/dark mode toggle.
- **Navigation**: Explicit `nav` section defining the page hierarchy.
- **Extensions**: Markdown extensions for features like Mermaid diagrams (`pymdownx.superfences`).
- **Plugins**: At minimum the `search` plugin.

## Markdown

- Use GitHub Flavored Markdown (GFM) as the default syntax for all documentation — `README.md`, docs, ADRs, and any other prose in the repository.

## Content Guidelines

- Write documentation in plain Markdown inside the `docs/` folder.
- The `index.md` serves as the landing page with links to the main sections.
- Keep documentation close to the code — update docs when the related code changes.
- Use Mermaid diagrams for architecture and flow visualizations instead of external image files where possible.

## Local Development

To preview documentation locally:

```bash
pip install mkdocs-material "pymdown-extensions"
mkdocs serve
```

The site is then available at `http://127.0.0.1:8000`.

## GitHub Pages Deployment

Documentation is deployed automatically via a GitHub Actions workflow (`.github/workflows/docs.yml`):

- **Pushes to main**: Deploy to the production site root using `mkdocs gh-deploy --force`.
- **Pull requests**: Build a preview and deploy it to a `/pr/<number>/` subdirectory. The workflow comments on the PR with a link to the preview.

### Requirements

- GitHub Pages must be enabled on the repository with the source set to the `gh-pages` branch.
- The workflow needs `contents: write` and `pull-requests: write` permissions.

## What to Document

- Architecture overview (components, their responsibilities, how they interact).
- Architecture Decision Records for significant technical choices.
- Setup and contribution instructions.
- API documentation if the project exposes a public API.

## What NOT to Document in MkDocs

- User-facing README content — that stays in `README.md` at the repository root.
- Auto-generated API docs (Javadoc, TypeDoc) — those have their own tooling.
- Temporary notes or work-in-progress — use issues or discussions instead.
