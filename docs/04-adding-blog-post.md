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

Filenames follow a `YYYY-MM-DD-<name>.md` pattern. The **public URL** is built from the `date:` field and the slug — where the slug defaults to `<name>` (i.e. the filename stem without the date prefix and extension) unless overridden by a `slug:` field in the frontmatter. See section 2 for the full slug convention.

There is also a legacy filename-based alias route: every post is also reachable at `/posts/<filename-without-extension>` (e.g. `/posts/2026-02-27-dependency-health-checks`). This exists for backward compatibility with old links and should not be used in new content.

## 2. Add Front Matter (Required Fields)

Posts in this repository are parsed by `src/lib/markdown.ts` and must use this schema:

```yaml
---
outdated: false
showInBlog: true
title: 'Dependency Health Checks for Maven Builds'
date: 2026-02-27
author: sebastian
excerpt: 'A short teaser shown in article cards and metadata.'
categories: [open-source, maven, security]
preview_image: '/posts/preview-images/open-source-green.svg'
---
```

Field notes:

- `title`: display title and SEO title base
- `slug` _(optional)_: override the URL segment (see "Slug convention" below); if omitted, the filename stem is used
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

Resolution order in `generatePostSlug()` (see [src/lib/markdown.ts](../src/lib/markdown.ts)):

1. Explicit `slug:` field in the post's frontmatter (highest priority — kept so legacy posts whose URLs are already indexed do not move).
2. Filename stem with the `YYYY-MM-DD-` prefix and `.md` / `.de.md` extension stripped. This is the canonical default for **new** posts.

Rules for `slug`:

- **New posts should NOT set `slug:`** unless there is a reason to override the filename. Just pick a good, short filename — `content/posts/2026-02-27-dependency-health.md` is enough to give you `/posts/2026/02/27/dependency-health`.
- If you do set `slug:`, keep it **short and human-readable** — 1 to 4 words, kebab-case, ASCII only.
- Do **not** repeat the date. The date is added automatically from the `date:` field.
- If EN and DE files should share a URL segment, either use the same filename base for both (`foo.md` + `foo.de.md`) or set the same `slug:` on both.
- Once a post is published, do **not** rename its file or change its `slug:` — either will move the URL and break existing links.

Examples:

| Filename                                          | Frontmatter         | Resulting URL                         |
| ------------------------------------------------- | ------------------- | ------------------------------------- |
| `content/posts/2026-02-27-dependency-health.md`   | (no `slug:`)        | `/posts/2026/02/27/dependency-health` |
| `content/posts/2026-03-19-container-gov.de.md`    | (no `slug:`)        | `/de/posts/2026/03/19/container-gov`  |
| `content/posts/2026-02-10-year-in-review-2025.md` | `slug: review-2025` | `/posts/2026/02/10/review-2025`       |

Legacy posts (everything predating this convention) carry an explicit `slug:` that pins them to their historical URL — including long, title-derived slugs with umlauts. Do **not** "clean these up" — those slug values are load-bearing for existing links and search-engine indexing.

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
- Choosing a long or awkward filename for a new post — remember the URL slug comes from the filename by default, so `2026-03-19-a-really-long-title-that-explains-everything.md` becomes an equally long URL. Prefer short filenames.
- Renaming a post file (or changing its `slug:`) after it has been published — either move will change the URL and break existing links.

## Related Docs

- [02 - Content Folder Guide](./02-content-folder.md)
- [05 - First Contribution Checklist](./05-first-contribution-checklist.md)
- [06 - Testing and Quality Checks](./06-testing-and-quality-checks.md)
