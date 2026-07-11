# CLAUDE.md

Guidance for AI coding agents (Claude, Copilot, etc.) working in this repository. Human contributors should read [docs/README.md](./docs/README.md) instead.

## Repository at a glance

- Next.js + TypeScript app under `src/`
- Markdown content under `content/` (posts, pages, employees, …)
- Two locales: `en` (default, no prefix) and `de` (`/de/` prefix)
- Blog posts live in `content/posts/*.md` (EN) and `content/posts/*.de.md` (DE)
- Post URLs are canonically `/posts/YYYY/MM/DD/<slug>` (+ `/de/…` for German)

## Common tasks

- Add a page → [docs/03-adding-pages.md](./docs/03-adding-pages.md)
- Add a blog post → [docs/04-adding-blog-post.md](./docs/04-adding-blog-post.md)
- Testing / QA → [docs/06-testing-and-quality-checks.md](./docs/06-testing-and-quality-checks.md)

## Conventions

### Blog post slugs

Every new post **must** declare an explicit `slug:` field in its frontmatter. Do not rely on the title-based fallback.

```yaml
---
title: 'Dependency Health Checks for Maven Builds'
slug: dependency-health
date: 2026-02-27
# ...
---
```

Rules:

- Short, kebab-case, ASCII (1–4 words).
- Do not repeat the date — the date comes from the `date:` field.
- Use the **same slug** in the EN and DE files of a post.
- Never change the slug of an already-published post — that breaks existing URLs and backlinks.
- Legacy posts have long, title-derived slugs (including umlauts) for backward compatibility. Do not "clean them up" — those slugs are load-bearing for existing links.

Full rules and rationale: [docs/04-adding-blog-post.md § Slug convention](./docs/04-adding-blog-post.md#slug-convention).

Reference implementation: `generatePostSlug()` / `generatePostPath()` in [src/lib/markdown.ts](./src/lib/markdown.ts).

### Legacy filename alias

Every post is also reachable via `/posts/<filename-without-extension>` (the legacy Hugo-style alias, produced by `getAllPostSlugs()`). This alias is intentional backward-compat plumbing — do not remove it, and do not use it in new links.

## Scripts

Helper scripts live in `scripts/` and run with plain `node`:

- `scripts/backfill-post-slugs.mjs` — inserts an explicit `slug:` into every post that lacks one, computed from the current title so URLs stay unchanged. Idempotent. Pass `--dry-run` to preview. Should only be needed once; kept for reproducibility.
- `scripts/dump-post-slugs.mjs` — prints the full sorted list of URL slugs `getAllPostSlugs()` would emit. Useful as a before/after diff when changing anything in the slug generation path.

## Do

- Read the referenced `docs/*.md` before making structural changes to content or routing.
- When touching slug logic in `src/lib/markdown.ts`, run `scripts/dump-post-slugs.mjs` before and after and diff — the diff must be empty unless the change is _intended_ to move URLs.
- Preserve line-ending style when editing legacy markdown files (some are CRLF).

## Don't

- Don't remove or rewrite the legacy filename-based alias in `getAllPostSlugs()` without explicit sign-off — it protects old inbound links.
- Don't run `matter.stringify()` (gray-matter) to rewrite existing post frontmatter. It reorders keys, changes quoting, and reformats dates. Do targeted line-level edits on the raw text instead (see `scripts/backfill-post-slugs.mjs` for the pattern).
- Don't add `slug:` to old posts by hand as a "cleanup" — the backfill has already done that, and the values must exactly match the title-derived slug.
