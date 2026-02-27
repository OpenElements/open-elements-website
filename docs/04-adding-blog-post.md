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

The URL slug is derived from the filename:

- `2026-02-27-dependency-health-checks.md` -> `/posts/2026-02-27-dependency-health-checks`
- `2026-02-27-dependency-health-checks.de.md` -> `/de/posts/2026-02-27-dependency-health-checks`

## 2. Add Front Matter (Required Fields)

Posts in this repository are parsed by `src/lib/markdown.ts` and must use this schema:

```yaml
---
outdated: false
showInBlog: true
title: "Dependency Health Checks for Maven Builds"
date: 2026-02-27
author: sebastian
excerpt: "A short teaser shown in article cards and metadata."
categories: [open-source, maven, security]
preview_image: "/posts/preview-images/open-source-green.svg"
---
```

Field notes:

- `title`: display title and SEO title base
- `date`: `YYYY-MM-DD`
- `author`: author id (not free text). Match an id in `src/data/en/team.json` and `src/data/de/team.json`
- `excerpt`: used in listing cards and metadata description
- `categories`: array rendered as tags
- `preview_image`: web path under `public/`
- `showInBlog`: set `false` to hide from listing pages
- `outdated`: set `true` to hide from listing pages

## 3. Write Content and Use Correct Links

Write markdown below the front matter. Keep heading structure consistent between EN/DE versions.

Internal link rules:

- Standard pages:
  - EN: `/about`, `/contact`
  - DE: `/de/about`, `/de/contact`
- Blog posts:
  - EN: `/posts/<YYYY-MM-DD-slug>`
  - DE: `/de/posts/<YYYY-MM-DD-slug>`

Do not use `/blog/...` in new content. The active route is `/posts/...`.

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
   - EN post: `http://localhost:3000/posts/<slug>`
   - DE post: `http://localhost:3000/de/posts/<slug>`
3. Verify preview image, excerpt, categories, author card, and all links

## 6. Common Pitfalls

- Wrong route prefix in links (`/blog/...` instead of `/posts/...`)
- Missing `.de.md` suffix for German files
- `author` not matching a team id
- Using filesystem-like image paths (`public/...`) instead of web paths (`/...`)
- Missing `excerpt` or `preview_image`, causing weak list cards and metadata

## Related Docs

- [02 - Content Folder Guide](./02-content-folder.md)
- [05 - First Contribution Checklist](./05-first-contribution-checklist.md)
- [06 - Testing and Quality Checks](./06-testing-and-quality-checks.md)
