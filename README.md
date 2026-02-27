# Open Elements Website

This repository contains the Open Elements website built with Next.js and Tailwind CSS, with legacy Hugo content kept for migration and historical content.

## Architecture (2026)

The project is a Next.js application using App Router, Tailwind CSS, and `next-intl` for i18n. Legacy Hugo content and templates are kept in the repo for migration and historical content.

### Runtime layers

- **Next.js App (primary)**
  - App Router pages and layouts in `src/app`.
  - UI components in `src/components`.
  - Shared utilities in `src/lib`, data in `src/data`, types in `src/types`.
  - Styling via Tailwind CSS and `src/app/globals.css`.

- **Internationalization**
  - `next-intl` routing and helpers in `src/i18n`.
  - Translation messages in `locales`.

- **Markdown content**
  - Markdown content in `content/`.
  - Built static artifacts live in `public` (do not edit manually).

- **Web components**
  - Custom elements live in `react-src` and are bundled via `react-src/build.mjs` into `public/js`.

- **E2E tests**
  - Playwright specs in `tests/e2e`.

## Development

### Requirements

- Node.js 22
- pnpm 10

### Install dependencies

```
pnpm install
```

### Run locally

```
pnpm run dev
```

The app is available at http://localhost:3000.

### Build & start

```
pnpm run build
pnpm run start
```

### Lint

```
pnpm run lint
```

### E2E tests

```
pnpm run test:e2e
```

## Repo structure

```
src/app            Next.js App Router pages & layouts
src/components     UI components
src/i18n           next-intl routing/messages helpers
locales            Translation JSON files
content            Markdown content
public             Static assets and generated artifacts
react-src          Web components source (bundled to public/js)
tests/e2e          Playwright specs
```

## Web components build

Custom elements in `react-src` are bundled with esbuild via `react-src/build.mjs` into `public/js`. This output is treated as generated code.

## Deployment

Netlify builds run `pnpm install` and `pnpm run build` (see `netlify.toml`).

## Documentation

- **[Docs Hub](docs/README.md)** - First stop for contributors (repository architecture, content workflows, quality checks)
- **[Adding Blog Posts](docs/07-adding-blog-post.md)** - Post-specific workflow for `content/posts/`, front matter, and `/posts/...` linking conventions
- **[Adding New Pages Guide](ADDING_PAGES.md)** - Legacy page-creation guide with EN/DE examples and image/layout notes

