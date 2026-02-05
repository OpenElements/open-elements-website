# Open Elements Website

This repository contains the Open Elements website.

## Architecture (2026)

The project is now a Next.js application with App Router, Tailwind CSS, and `next-intl` for i18n. Legacy Hugo content and templates are still kept in the repo for migration and historical content.

### Runtime layers

- **Next.js App (primary)**
  - App Router pages and layouts in `src/app`.
  - UI components in `src/components`.
  - Shared utilities in `src/lib`, data in `src/data`, types in `src/types`.
  - Styling via Tailwind CSS and `src/app/globals.css`.

- **Internationalization**
  - `next-intl` routing and helpers in `src/i18n`.
  - Translation messages in `locales`.

- **Legacy Hugo content (migrating)**
  - Markdown content in `content`.
  - Hugo templates in `src/layouts`.
  - Hugo configuration in `config.toml`.
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

### E2E tests

```
pnpm run test:e2e
```
