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

The URL slug for a post is resolved in this order (see `generatePostSlug()` in [src/lib/markdown.ts](./src/lib/markdown.ts)):

1. Explicit `slug:` in the post's frontmatter (highest priority — protects legacy URLs).
2. Filename stem with the `YYYY-MM-DD-` date prefix and `.md` / `.de.md` extension stripped. This is the canonical default for new posts.

```text
content/posts/2026-02-27-dependency-health.md    -> /posts/2026/02/27/dependency-health
content/posts/2026-03-19-container-gov.de.md     -> /de/posts/2026/03/19/container-gov
```

Rules:

- **New posts should not set `slug:`.** Pick a short, kebab-case, ASCII filename (`YYYY-MM-DD-<short-slug>.md`) and the filename becomes the URL.
- Only set `slug:` explicitly when you need to override the filename (e.g. keeping backward compatibility with a legacy URL).
- If you do set `slug:`, keep it short (1–4 words), kebab-case, ASCII.
- Never change the filename or `slug:` of an already-published post — either moves the URL and breaks backlinks.
- Legacy posts carry an explicit `slug:` (often long, sometimes with umlauts) that pins them to their historical URL. Do not "clean these up" — those values are load-bearing for existing links.

Full rules and rationale: [docs/04-adding-blog-post.md § Slug convention](./docs/04-adding-blog-post.md#slug-convention).

### Legacy filename alias

Every post is also reachable via `/posts/<filename-without-extension>` (the legacy Hugo-style alias, produced by `getAllPostSlugs()`). This alias is intentional backward-compat plumbing — do not remove it, and do not use it in new links.

## Do

- Read the referenced `docs/*.md` before making structural changes to content or routing.
- When touching slug logic in `src/lib/markdown.ts`, dump every URL that `getAllPostSlugs()` emits before and after your change and diff — the diff must be empty unless the change is _intended_ to move URLs.
- Preserve line-ending style when editing legacy markdown files (some are CRLF).

## Don't

- Don't remove or rewrite the legacy filename-based alias in `getAllPostSlugs()` without explicit sign-off — it protects old inbound links.
- Don't run `matter.stringify()` (gray-matter) to rewrite existing post frontmatter. It reorders keys, changes quoting, and reformats dates. Do targeted line-level edits on the raw text instead.
- Don't strip the explicit `slug:` from legacy posts as a "cleanup" — those slugs are pinned to already-indexed URLs and must not change.
