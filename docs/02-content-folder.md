# 02 - Content Folder Guide

## Purpose and Scope

This document provides comprehensive guidance on structuring, naming, and maintaining markdown content within the `content/` directory. The markdown files in this directory serve as the source of truth for website content and directly impact routing, rendering, and SEO behavior.

### Why This Matters

The `content/` directory is mission-critical for the website because:

1. **Structural Impact**: File names and directory organization directly determine URLs and routing
2. **Rendering Foundation**: Markdown content feeds directly into page rendering through Next.js
3. **SEO Influence**: Front matter metadata (title, description) directly impacts search engine visibility
4. **Localization Source**: Content files are the source for EN/DE localization
5. **Version Control**: Content changes are tracked in Git, enabling synchronized releases with code changes

Incorrect naming, structure, or metadata in this directory typically causes:
- Broken or missing routes (404 errors)
- Missing or incorrect page titles and descriptions (SEO issues)
- Rendering failures (malformed front matter)
- Localization mismatches (EN/DE parity breaks)

## Content Organization Patterns

### Pattern 1: Standard Pages

Standard pages are individual pages accessible at specific URLs with localized versions.

**Directory Structure:**
```
content/<page-slug>/
  ├── index.md          (English version)
  └── index.de.md       (German version)
```

**Routing Result:**
- `/` + `<page-slug>` → English version
- `/de/` + `<page-slug>` → German version

**Examples:**
- `content/about/index.md` → `/about` and `/de/about`
- `content/contact/index.md` → `/contact` and `/de/contact`
- `content/impressum/index.md` → `/impressum` and `/de/impressum`

**Usage**: Static pages like About, Contact, Imprint, etc.

### Pattern 2: Blog Posts and Articles

Blog posts use date-prefixed naming to support chronological organization and provide stable slugs.

**Directory Structure:**
```
content/posts/
  ├── YYYY-MM-DD-post-slug.md       (English post)
  └── YYYY-MM-DD-post-slug.de.md    (German translation)
```

**Naming Convention Breakdown:**
- `YYYY-MM-DD`: Publication date in ISO format (e.g., `2024-02-25`)
- `post-slug`: Descriptive, lowercase, kebab-case identifier (e.g., `new-release-notes`)
- `.md` or `.de.md`: Locale suffix

**Examples:**
- `2024-02-25-new-release-notes.md`
- `2024-02-25-new-release-notes.de.md`
- `2023-12-15-performance-improvements.md`

**Important Notes:**
- Date prefix is mandatory and immutable (archive history depends on it)
- Slug should be descriptive and stable (changing it breaks bookmarks)
- German translation is optional but recommended for user-facing content

**Usage**: Blog articles, release notes, announcements

For a complete, post-specific workflow (including front matter and link conventions), see [07 - Adding Blog Posts](./07-adding-blog-post.md).

### Pattern 3: Version Updates CHANGELOG

Release notes and version updates use semantic versioning for organization.

**Directory Structure:**
```
content/updates/
  ├── vX.Y.Z.en.md    (English release notes)
  └── vX.Y.Z.de.md    (German release notes)
```

**Examples:**
- `v2.5.0.en.md` → English release notes for version 2.5.0
- `v2.5.0.de.md` → German release notes for version 2.5.0

**Usage**: Version-specific release notes, changelog entries, upgrade guides

### Pattern 4: Employee/Team Profiles

Team member and employee profiles follow a simple naming pattern.

**Directory Structure:**
```
content/employees/
  ├── person-name.md       (English profile)
  └── person-name.de.md    (German profile)
```

**Naming Convention:**
- Use lowercase kebab-case with person's name (e.g., `john-smith`)
- Match the display name in your data/profile system

**Examples:**
- `sebastian.md` → Sebastian's English profile
- `sebastian.de.md` → Sebastian's German profile
- `noah.md` → Noah's English profile

**Usage**: Team member bios, employee directories, contributor profiles

## Front Matter (YAML Metadata) Standards

Every markdown file begins with YAML front matter enclosed by `---` delimiters. This metadata controls how the page is rendered, indexed, and displayed.

### Common Front Matter Fields

Different content types use different metadata shapes.

| Field | Type | Primary Use | Example |
|-------|------|-------------|---------|
| `title` | String | Pages and posts | `"Getting Started with Open Elements"` |
| `description` | String | Standard pages (SEO) | `"Learn how to set up and use Open Elements"` |
| `layout` | String | Standard pages | `"article"`, `"single"`, `"contact"` |
| `url` | String | Standard pages only | `"/getting-started"` or `"/de/getting-started"` |
| `keywords` | Array | Standard pages (optional SEO) | `["open-elements", "tutorial", "setup"]` |
| `aliases` | Array | Standard pages redirects | `["/old-path", "/another-path"]` |
| `newsletterPopup` | Boolean | Standard pages where needed | `true` or `false` |
| `date` | String | Blog posts (publication date) | `"2024-02-25"` |
| `author` | String | Blog posts (team id) | `"hendrik"` |
| `excerpt` | String | Blog posts (listing/meta summary) | `"Short preview for cards"` |
| `categories` | Array | Blog posts (tags) | `["open-source", "maven"]` |
| `preview_image` | String | Blog posts card/OG image | `"/posts/preview-images/open-source-green.svg"` |
| `showInBlog` | Boolean | Blog posts visibility filter | `true` or `false` |
| `outdated` | Boolean | Blog posts visibility filter | `false` |

### Minimum Required Front Matter for Standard Pages

```yaml
---
title: "Your Page Title"
description: "A concise SEO-optimized description (150-160 chars)"
layout: "article"
url: "/page-slug"
---
```

### Minimum Required Front Matter for Blog Posts

```yaml
---
outdated: false
showInBlog: true
title: "How to Build Scalable Java Applications"
date: 2024-02-25
author: hendrik
excerpt: "Discover best practices and patterns for scalable Java applications."
categories: [java, scalability, performance, architecture]
preview_image: "/posts/preview-images/software-development-green.svg"
---
```

### Front Matter Best Practices

- **Title**: Keep it concise (50-60 characters), clear, and descriptive
- **Description**: Use on standard pages for SEO metadata (150-160 characters)
- **URL**: Use on standard pages only; must match route and locale prefix for German (`/de/...`)
- **Dates**: Use ISO 8601 format (`YYYY-MM-DD`) for posts
- **Author IDs**: Use team ids that exist in `src/data/en/team.json` and `src/data/de/team.json`
- **Post Images**: Use web paths (for example `/posts/...`), never filesystem paths

### Example Front Matter

**Standard Page (EN):**
```yaml
---
title: "Frequently Asked Questions"
description: "Find answers to common questions about Open Elements."
layout: "article"
url: "/faq"
keywords: ["faq", "help", "support"]
---
```

**Blog Post (EN):**
```yaml
---
outdated: false
showInBlog: true
title: "How to Build Scalable Java Applications"
date: 2024-02-25
author: hendrik
excerpt: "Discover best practices and patterns for scalable Java applications."
categories: [java, scalability, performance, architecture]
preview_image: "/posts/preview-images/software-development-green.svg"
---
```

## Localization Standards

The Open Elements website operates in two languages: English (primary) and German (secondary). Proper localization requires coordinated updates across language-specific content files.

### Localization Patterns

**English (EN) Files:**
- Use `index.md` for standard pages under `content/<slug>/`
- Use `<name>.md` or `YYYY-MM-DD-<slug>.md` for other content types
- Omit language suffix (default/primary language)

**German (DE) Files:**
- Use `index.de.md` for standard pages under `content/<slug>/`
- Use `<name>.de.md` or `YYYY-MM-DD-<slug>.de.md` for other content types
- Always include `.de` suffix before file extension

**Example Structure:**
```
content/about/
  ├── index.md      (English)
  └── index.de.md   (German)

content/posts/
  ├── 2024-02-25-announcement.md        (English)
  └── 2024-02-25-announcement.de.md     (German)
```

### Parity Requirements

**User-Facing Pages**
- Pages visible to end users must maintain structural parity between English and German
- Both language versions must exist before merging the PR
- Update simultaneous in the same PR rather than separate PRs

**Content Structure Parity**
- Headings and section organization should match between EN and DE versions
- Same media (images, etc.) should generally be referenced in both versions
- For standard pages: front matter structure is identical except localized `title`/`description` and `url` with `/de/` prefix
- For blog posts: front matter fields should stay aligned across locales while keeping translated text in `title` and `excerpt`

**When Single-Language Content is Acceptable**
- Technical documentation or release notes specifically for developers
- Content about region-specific programs (explicitly allowed in issue)
- Must be explicitly approved by maintainers before submission

### Translation Guidelines

When translating content from English to German:

1. **Maintain Meaning**: Preserve semantic meaning even if literal translation doesn't fit
2. **Preserve Formatting**: Keep heading levels, lists, code blocks identical
3. **Terminology**: Use consistent terminology across all German content
4. **Links**: Update internal links to use German routing (`/de/...` for standard pages, `/de/posts/...` for blog posts)
5. **Date Format**: Adapt date formatting if appropriate for German audience

## URL and SEO Configuration

### URL Structure and Convention

**English URLs:**
- Start with `/` immediately (no locale prefix)
- Examples: `/about`, `/posts/2024-02-25-post-title`, `/contact`

**German URLs:**
- Include `/de/` at the beginning
- Examples: `/de/about`, `/de/posts/2024-02-25-post-title`, `/de/kontakt`

### URL Naming Rules

1. **Stability First**: Never change existing URLs without explicit redirect strategy
   - Changing URLs breaks bookmarks, search engine rankings, and external links
   - If a URL change is necessary, implement 301 redirects or use `aliases` in front matter

2. **Consistency**: Use lowercase letters and hyphens (kebab-case)
   - ✅ `/posts/2024-02-25-new-release`
   - ❌ `/posts/2024-02-25-New_Release`
   - ❌ `/posts/2024-02-25-NewRelease`

3. **Descriptiveness**: URLs should indicate content topic
   - ✅ `/posts/2024-02-25-performance-optimization-tips`
   - ❌ `/posts/2024-02-25-post-123`
   - ❌ `/posts/2024-02-25-article-1`

4. **Front Matter URL Field (Standard Pages Only)**: Must exactly match the route structure
   - English page: `"url": "/about"`
   - German page: `"url": "/de/about"`

5. **Blog Post URL Source**: URL is derived from filename
   - English file: `content/posts/2024-02-25-my-post.md` -> `/posts/2024-02-25-my-post`
   - German file: `content/posts/2024-02-25-my-post.de.md` -> `/de/posts/2024-02-25-my-post`

### SEO Best Practices

**Page Title (`title` field)**
- 50-60 characters ideal
- Include primary keyword
- Avoid keyword stuffing
- Be descriptive and unique per page

**Meta Description (`description` field)**
- 150-160 characters (Google truncates longer descriptions)
- Summarize page content in one sentence
- Include primary keyword naturally
- Include call-to-action if appropriate

**Keywords (`keywords` field)**
- 3-7 relevant terms
- Include both broad and specific keywords
- Avoid overstuffing
- Separate terms with commas: `["keyword1", "keyword2", "keyword3"]`

### URL Aliases and Redirects

Use the `aliases` field to maintain SEO and prevent broken links when migrating content:

```yaml
---
title: "New Page Title"
url: "/new-path"
aliases: ["/old-path", "/deprecated-path", "/also-used-this-path"]
---
```

This automatically creates 301 redirects from old URLs to the new URL, preserving search rankings and user navigation.

## Asset Management and Referencing

### Asset Storage Location

All static assets (images, videos, documents, etc.) are stored in the `public/` directory:

```
public/
  ├── images/          (general images)
  ├── icons/           (SVG icons)
  ├── <page-slug>/     (page-specific assets)
  └── documents/       (downloadable files)
```

### Asset Referencing in Markdown

When referencing assets in markdown or JSX, use **web paths only** (not filesystem paths):

**✅ Correct Usage:**
```markdown
![Image Description](/images/logo.svg)
[Download Guide](/documents/guide.pdf)
<img src="/icons/check.svg" alt="Success" />
```

**❌ Incorrect Usage:**
```markdown
![Image Description](./public/images/logo.svg)
![Image Description](public/images/logo.svg)
![Image Description](../public/images/logo.svg)
```

### Asset Naming and Organization

1. **Filename Convention**: Use lowercase, kebab-case, descriptive names
2. **Page-Specific Assets**: Store in `public/<page-slug>/`
3. **Shared Assets**: Store in `public/images/` or appropriate shared folder

## Markdown Quality Standards

### Document Structure

**Proper Heading Hierarchy:**
```markdown
# Page Title (H1 - use only once per document)

## Main Section (H2)

### Subsection (H3)

#### Minor Section (H4)
```

**Important:**
- use clear heading hierarchy (`#`, `##`, `###`)
- keep paragraphs readable and concise (3-5 sentences per paragraph)
- use descriptive link text (not "click here")
- provide alt text for all non-decorative images
- avoid broken internal links and dead asset paths

## Common Mistakes and How to Avoid Them

| Mistake | ❌ Wrong | ✅ Right | Impact |
|---------|---------|---------|--------|
| Asset path with `public/` | `![](/public/img.png)` | `![](/img.png)` | Assets won't load |
| Wrong localized page URL in front matter | `url: "/about"` in `index.de.md` | `url: "/de/about"` in `index.de.md` | Broken routing for German version |
| Inconsistent heading hierarchy | Skip from H2 to H4 | H2 → H3 → H4 | SEO and accessibility issues |
| Inconsistent filename patterns | Mix `.md` and `.en.md` | Use `.md` and `.de.md` consistently | Localization breaks |
| Removing old aliases | Delete `aliases` field | Keep for backward compatibility | Broken external links and SEO loss |

## Pre-PR Validation Checklist for Content Changes

Before submitting a pull request with content changes, systematically verify each item:

- [ ] **Rendering**: Page renders correctly locally
  - Load English version: `http://localhost:3000/<page-slug>`
  - Load German version: `http://localhost:3000/de/<page-slug>`
  - Both load without errors or blank content

- [ ] **Links & Navigation**:
  - All internal links follow correct structure and resolve
  - Navigation between EN and DE versions works
  - External links are current and valid

- [ ] **Assets**:
  - All images load correctly with proper alt text
  - Asset paths use web paths (no `public/` prefix)
  - Image sizes are optimized

- [ ] **Front Matter**: 
  - YAML is syntactically valid (no indentation errors)
  - Standard pages include required fields: `title`, `description`, `layout`, `url`
  - Blog posts include required fields: `title`, `date`, `author`, `excerpt`, `categories`, `preview_image`
  - If blog post visibility is intentional, `showInBlog` and `outdated` are set correctly

- [ ] **Localization Parity**:
  - Standard pages: both English and German versions exist
  - Blog posts: German translation is added when user-facing and intended for DE listing
  - Content is structurally similar between language versions
  - Standard page `url` fields differ only in `/de/` prefix
  - Localized text fields are translated (`title`, `description` for pages; `title`, `excerpt` for posts)

- [ ] **SEO Optimization**:
  - `title`: 50-60 characters, descriptive, includes keyword
  - `description`: 150-160 characters, summarizes content, includes keyword
  - `keywords`: 3-7 relevant terms separated by commas

- [ ] **Content Quality**:
  - Proper heading hierarchy (one H1, logical level progression)
  - Readable paragraphs (3-5 sentences each)
  - Links have descriptive text
  - No typos or grammatical errors
  - Consistent terminology throughout

- [ ] **Build & Validation**:
  - Run `pnpm run lint` - passes without errors
  - Run `pnpm run build` - completes successfully
  - No console errors when viewing locally

- [ ] **Git Status**:
  - Only intended files modified
  - No accidental changes to generated files in `public/build`
  - No modified lockfile (unless dependencies changed)
