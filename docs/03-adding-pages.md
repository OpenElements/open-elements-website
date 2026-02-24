# 03 - Adding Pages

Use this process for adding a new page end-to-end.

## Step 1: Create content files

Create:

```text
content/<your-page>/index.md
content/<your-page>/index.de.md
```

Add front matter and markdown body in both files.

## Step 2: Add or update route file

Create or update:

```text
src/app/[locale]/<your-page>/page.tsx
```

Use locale-aware metadata and page rendering.

## Step 3: Add assets (if needed)

Put page assets under:

```text
public/<your-page>/
```

Reference as `/your-page/<file>`.

## Step 4: Verify EN and DE pages

Run locally and test both:

- `/your-page`
- `/de/your-page`

## Step 5: Run checks

```bash
pnpm run lint
pnpm run test:e2e
```

## Detailed guide

For a full walkthrough with examples and templates, see:

- [Adding New Pages Guide](../ADDING_PAGES.md)

