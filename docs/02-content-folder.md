# 02 - Content Folder Guide

This is the most important guide for contributors adding or updating pages.

## Why `content/` matters

The `content/` folder stores markdown source files used by the site.
It contains pages, blog posts, updates, and profile content.

## Common structure patterns

### Standard page pattern

```text
content/<page-slug>/
  index.md
  index.de.md
```

Examples:

- `content/about/index.md`
- `content/about/index.de.md`
- `content/contact/index.md`
- `content/contact/index.de.md`

### Blog posts pattern

```text
content/posts/
  YYYY-MM-DD-post-slug.md
  YYYY-MM-DD-post-slug.de.md   (optional if translated)
```

### Updates pattern

```text
content/updates/
  vX.Y.Z.en.md
  vX.Y.Z.de.md
```

### Team/member content pattern

```text
content/employees/
  person.md
  person.de.md
```

## Front matter fields you will see

Typical fields:

- `title`
- `description`
- `layout`
- `url`
- `keywords`
- `aliases`
- `newsletterPopup`

Not every page uses every field, but `title`, `description`, `layout`, and `url` are typically expected for pages.

## Localization rules

- English file: `index.md`
- German file: `index.de.md`
- Keep page structure aligned across both languages.
- If adding a new section to one locale, add the matching section to the other locale.

## URL conventions

- English URL usually starts with `/...`
- German URL usually starts with `/de/...`
- Keep URL values stable; changing them can break links and SEO unless aliases are added.

## Images and assets referenced by content

- Store assets under `public/...`
- Reference them by web path (for example `/images/example.png`)
- Do not include `public` in markdown image URLs

## Content quality checklist

- Clear, descriptive title and description
- Correct language and grammar for EN/DE pair
- Valid markdown headings hierarchy
- Working internal/external links
- Alt text for meaningful images
- No broken asset paths

