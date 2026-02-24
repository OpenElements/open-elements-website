# 05 - Testing and Quality Checks

## Required local checks

Run these before creating or updating a PR:

```bash
pnpm run lint
pnpm run build
```

For route/content behavior, also run:

```bash
pnpm run test:e2e
```

## What to verify manually

- EN and DE page rendering
- Navigation links
- Page metadata (title/description)
- Image loading and alt text
- No console errors in browser

## Typical failure classes

- Wrong markdown front matter keys
- Incorrect markdown file naming (`index.md` / `index.de.md`)
- Broken asset paths in markdown or components
- Route folder mismatch between `content/` and `src/app/[locale]/...`
- Missing locale handling in page metadata

