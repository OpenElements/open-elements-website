# 04 - Adding Blog Posts

## Purpose

This guide documents the exact workflow for adding posts to the Open Elements article section.

Use this guide for anything under `content/posts/`.  
For standard pages (for example `content/about/index.md`), use [03 - Adding Pages](./03-adding-pages.md).

## 1. Create Post Files

Blog posts are flat files in `content/posts/`:

```text
content/posts/
  YYYY-MM-DD-post-slug.md
  YYYY-MM-DD-post-slug.de.md
```

- English file: `YYYY-MM-DD-post-slug.md`
- German translation: `YYYY-MM-DD-post-slug.de.md` (recommended for user-facing content)

Example:

```text
content/posts/2026-02-27-dependency-health-checks.md
content/posts/2026-02-27-dependency-health-checks.de.md
```

Filenames follow a `YYYY-MM-DD-something.md` pattern for readability and sort order. The **public URL** is built from the `date:` field and the `slug:` field in the frontmatter — not from the filename. See section 2 for the `slug:` convention.

There is also a legacy filename-based alias route: every post is also reachable at `/posts/<filename-without-extension>` (e.g. `/posts/2026-02-27-dependency-health-checks`). This exists for backward compatibility with old links and should not be used in new content.

## 2. Add Front Matter (Required Fields)

Posts in this repository are parsed by `src/lib/markdown.ts` and must use this schema:

```yaml
---
outdated: false
showInBlog: true
title: 'Dependency Health Checks for Maven Builds'
slug: dependency-health-checks
date: 2026-02-27
author: sebastian
excerpt: 'A short teaser shown in article cards and metadata.'
categories: [open-source, maven, security]
preview_image: '/posts/preview-images/open-source-green.svg'
---
```

Field notes:

- `title`: display title and SEO title base
- `slug`: short, kebab-case URL segment (see "Slug convention" below)
- `date`: `YYYY-MM-DD`
- `author`: author id (not free text). Match an id in `src/data/en/team.json` and `src/data/de/team.json`
- `excerpt`: used in listing cards and metadata description
- `categories`: array rendered as tags
- `preview_image`: web path under `public/`
- `showInBlog`: set `false` to hide from listing pages
- `outdated`: set `true` to hide from listing pages

### Slug convention

The final URL of a post is:

```text
/posts/YYYY/MM/DD/<slug>
/de/posts/YYYY/MM/DD/<slug>
```

Rules for `slug`:

- **Always set it explicitly** on new posts. Do not rely on the title-based fallback.
- Keep it **short and human-readable** — 1 to 4 words, kebab-case, ASCII only.
- Do **not** repeat the date. The date is added automatically from the `date:` field.
- Use the **same slug** in the EN and DE files so both locales have symmetric URLs.
- Once a post is published, do **not** change its slug. Existing URLs and backlinks will break.

Examples:

| Title                                                         | Good `slug:`        | Resulting URL                         |
| ------------------------------------------------------------- | ------------------- | ------------------------------------- |
| Dependency Health Checks for Maven Builds                     | `dependency-health` | `/posts/2026/02/27/dependency-health` |
| Open Elements liefert gehärtete Software für container.gov.de | `container-gov`     | `/de/posts/2026/03/19/container-gov`  |
| Year in Review 2025                                           | `review-2025`       | `/posts/2026/02/10/review-2025`       |

If `slug:` is omitted, the URL is auto-derived from the title. That fallback exists only to keep old posts working; it produces long, hard-to-read URLs (especially with umlauts) and should not be used for new content.

## 3. Write Content and Use Correct Links

Write markdown below the front matter. Keep heading structure consistent between EN/DE versions.

Internal link rules:

- Standard pages:
  - EN: `/about`, `/contact`
  - DE: `/de/about`, `/de/contact`
- Blog posts:
  - EN: `/posts/YYYY/MM/DD/<slug>`
  - DE: `/de/posts/YYYY/MM/DD/<slug>`

Do not use `/blog/...` in new content. The active route is `/posts/...`.
Do not link to the legacy `/posts/<filename>` alias in new content either — use the canonical `/posts/YYYY/MM/DD/<slug>` form.

## 4. Add Images

Store post-specific assets in a folder matching the post slug:

```text
public/posts/2026-02-27-dependency-health-checks/
  architecture.png
  pipeline-diff.png
```

Reference them with web paths:

```markdown
![Pipeline comparison](/posts/2026-02-27-dependency-health-checks/pipeline-diff.png)
```

## 5. Validate Locally

1. Run `pnpm run dev`
2. Open:
   - EN listing: `http://localhost:3000/posts`
   - DE listing: `http://localhost:3000/de/posts`
   - EN post: `http://localhost:3000/posts/YYYY/MM/DD/<slug>`
   - DE post: `http://localhost:3000/de/posts/YYYY/MM/DD/<slug>`
3. Verify preview image, excerpt, categories, author card, and all links

## 6. Common Pitfalls

- Wrong route prefix in links (`/blog/...` instead of `/posts/...`)
- Missing `.de.md` suffix for German files
- `author` not matching a team id
- Using filesystem-like image paths (`public/...`) instead of web paths (`/...`)
- Missing `excerpt` or `preview_image`, causing weak list cards and metadata
- Missing `slug:` in frontmatter — the post still works via the title-based fallback, but the URL will be long and hard to read. Always set an explicit `slug:` on new posts.
- Renaming `slug:` on an already-published post — this breaks existing URLs and backlinks. Don't do it.

## Related Docs

- [02 - Content Folder Guide](./02-content-folder.md)
- [05 - First Contribution Checklist](./05-first-contribution-checklist.md)
- [06 - Testing and Quality Checks](./06-testing-and-quality-checks.md)
