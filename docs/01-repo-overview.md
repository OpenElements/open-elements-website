# 01 - Repository Overview

## What this repository contains

This repository powers the Open Elements website.

- Next.js App Router application (primary runtime)
- Markdown content (legacy Hugo format, still actively used for content)
- i18n routing and locale files for English and German
- GitHub Actions automation for issue/PR workflows

## Main folders

- `src/app` - Next.js routes, layouts, and page entry points
- `src/components` - React UI components
- `src/lib` - Markdown and utility logic
- `src/i18n` - locale routing and translation setup
- `locales` - translation dictionaries (`en.json`, `de.json`)
- `content` - markdown source content (pages, posts, updates, people)
- `public` - static assets and generated output
- `react-src` - web components source bundled to `public/js`
- `tests/e2e` - Playwright end-to-end tests
- `.github/workflows` - automation for CI, issue commands, labels, reviewers, reminders

## Development commands

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run start
pnpm run lint
pnpm run test:e2e
```

## Key architecture note

The project is hybrid: Next.js handles route rendering, while many pages still source markdown from `content/`.
When adding or editing content pages, you usually work in both:

- `content/...` for markdown and front matter
- `src/app/[locale]/...` for route behavior and metadata

