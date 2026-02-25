# 03 - Adding Pages

## Overview and Objective

This comprehensive guide walks you through the entire process of adding a new page to the Open Elements website while maintaining consistency with existing patterns, ensuring proper localization, and meeting quality standards. By following this workflow, you'll ensure your new page integrates seamlessly with the existing codebase.

## Knowledge Prerequisites

Before starting, ensure you're familiar with:
- [01 - Repository Overview](./01-repo-overview.md): Project structure and technology stack
- [02 - Content Folder Guide](./02-content-folder.md): Content organization, front matter standards, and localization
- Basic Next.js App Router concepts (routes, layouts, page components)

## Step-by-Step Implementation Workflow

### Step 1: Create Markdown Content Files

Your page needs markdown content in both English and German.

**Create the content directory:**
```bash
mkdir content/<page-slug>
```

**Create content files:**
```
content/<page-slug>/
  ├── index.md       (English version)
  └── index.de.md    (German version)
```

**Example - Creating an "FAQ" page:**
```bash
mkdir content/faq
# Creates: content/faq/index.md and content/faq/index.de.md
```

**Populate index.md (English):**
```yaml
---
title: "Frequently Asked Questions"
description: "Find answers to common questions about Open Elements"
layout: "article"
url: "/faq"
keywords: ["faq", "help", "support", "questions"]
---

## General Questions

### What is Open Elements?

Open Elements is a...

### How do I get started?

To get started with Open Elements...
```

**Populate index.de.md (German) - MUST exist and be translated:**
```yaml
---
title: "Häufig gestellte Fragen"
description: "Finden Sie Antworten auf häufig gestellte Fragen zu Open Elements"
layout: "article"
url: "/de/faq"
keywords: ["faq", "hilfe", "unterstützung", "fragen"]
---

## Allgemeine Fragen

### Was ist Open Elements?

Open Elements ist ein...

### Wie fange ich an?

Um mit Open Elements zu beginnen...
```

**Important Requirements for Step 1:**
- ✅ Both `index.md` and `index.de.md` must exist
- ✅ Front matter must be valid YAML
- ✅ URLs must match the route structure (`/faq` for EN, `/de/faq` for DE)
- ✅ Titles and descriptions should be properly translated, not just EN duplicated
- ✅ Use proper heading hierarchy starting with H2 (not H1, since title is H1)

### Step 2: Create and Configure the Next.js Route

Next.js pages are defined in the `src/app/` directory using the App Router pattern.

**Create the route entry point:**
```bash
mkdir -p src/app/\[locale\]/faq
```

**Create the page component: `src/app/[locale]/faq/page.tsx`**

```typescript
import { ReactNode } from 'react';
import { Metadata } from 'next';

// 1. Import markdown/content utilities
import { getPageContent } from '@/lib/content';
import { Page } from '@/types';

// 2. Define TypeScript types for this route
interface PageProps {
  params: {
    locale: string;
  };
}

// 3. Generate metadata (title, description for SEO and browser tab)
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const locale = params.locale;
  
  // Load content to extract metadata
  const content: Page | null = await getPageContent('faq', locale);
  
  if (!content) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url: `https://open-elements.com${content.metadata.url}`,
      type: 'website',
      siteName: 'Open Elements',
    },
  };
}

// 4. Page component rendering
export default async function Page({ params }: PageProps): Promise<ReactNode> {
  const locale = params.locale;
  
  // Load page content
  const content = await getPageContent('faq', locale);

  if (!content) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1>Page Not Found</h1>
        <p>The FAQ page could not be found.</p>
      </div>
    );
  }

  return (
    <article className="container mx-auto py-10 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{content.metadata.title}</h1>
        <p className="text-lg text-gray-600">{content.metadata.description}</p>
      </header>
      
      <div className="prose prose-lg max-w-3xl">
        {/* Render the parsed markdown content */}
        {content.html}
      </div>
    </article>
  );
}
```

**Optional: Create a route-specific layout if needed: `src/app/[locale]/faq/layout.tsx`**

Use a layout when you need page-specific styling, structure, or configuration that differs from the site-wide layout.

**Important Requirements for Step 2:**
- ✅ Route file must be in `src/app/[locale]/<page-slug>/page.tsx` (follows file-based routing)
- ✅ Component must be async and server-rendered
- ✅ `generateMetadata` function must extract and return proper title/description
- ✅ Handle missing content gracefully (return 404 or error state)
- ✅ Locale parameter must be extracted from `params.locale`

### Step 3: Add Page Assets (Images, etc.)

Store all page-specific assets in an appropriately named directory.

**Create asset directory:**
```bash
mkdir -p public/faq
```

**Store assets:**
```
public/faq/
  ├── hero-image.png       (page hero image)
  ├── icon-question.svg    (icon for questions)
  └── comparison.chart.svg (comparison chart)
```

**Reference in markdown using web paths:**
```markdown
![FAQ Hero](/faq/hero-image.png)

### Comparing Solutions

![Solution Comparison](/faq/comparison-chart.svg)
```

**Important Requirements for Step 3:**
- ✅ Use `public/<page-slug>/` folder for assets
- ✅ Reference assets via web paths (e.g., `/faq/image.png`)
- ✅ Never include `public/` prefix in the path
- ✅ Use descriptive filenames in lowercase kebab-case
- ✅ Optimize images before committing (compress PNG/JPEG, minify SVG)

### Step 4: Verify Routes Locally

Before proceeding, test that both language versions work correctly.

**Start the development server:**
```bash
pnpm run dev
```

**Test English version:**
- Navigate to `http://localhost:3000/faq`
- Verify page loads without errors
- Confirm title, description, and content render correctly
- Check that all images and assets load

**Test German version:**
- Navigate to `http://localhost:3000/de/faq`
- Verify German translation renders
- Confirm metadata is in German
- Check links and navigation work

**Test locale switching (if implemented):**
- Practice switching between `/faq` and `/de/faq`
- Verify language selection persists if applicable

### Step 5: Run Quality Validation

Before opening a PR, run the full quality suite to ensure everything passes.

**Code linting and style validation:**
```bash
pnpm run lint
# Checks TypeScript, ESLint rules, code style
# Fix auto-correctable issues with: pnpm run lint --fix
```

**Production build verification:**
```bash
pnpm run build
# Compiles TypeScript, bundles assets, generates routes
# Must complete without errors before PR can be merged
```

**End-to-end testing (when applicable):**
```bash
pnpm run test:e2e
# Runs Playwright browser tests
# Only required if your page changes routing, navigation, or rendering
```

**Complete validation sequence:**
```bash
pnpm run lint && pnpm run build && pnpm run test:e2e
```

## Content and Front Matter Template

Use this template as a starting point for your page's markdown:

**English (index.md):**
```yaml
---
title: "Page Title Here"
description: "A concise 150-160 character description for search engines"
layout: "article"
url: "/page-slug"
keywords: ["keyword1", "keyword2", "keyword3"]
---

## Introduction

Your page content starts here. The H1 title comes from front matter, so start with H2.

## Main Section

Content organized by sections...

### Subsection

More detailed content...
```

**German (index.de.md):**
```yaml
---
title: "Seitentitel hier"
description: "Eine prägnante 150-160 Zeichen lange Beschreibung für Suchmaschinen"
layout: "article"
url: "/de/page-slug"
keywords: ["schlüsselwort1", "schlüsselwort2", "schlüsselwort3"]
---

## Einleitung

Ihr Seiteninhalt beginnt hier...

## Hauptabschnitt

Inhalt organisiert nach Abschnitten...
```

## File Naming and Naming Conventions

Consistent naming prevents errors and makes the codebase predictable:

| Item | Convention | Example | Why |
|------|-----------|---------|-----|
| Page slug | lowercase kebab-case | `getting-started` | Readable URLs, consistent with web standards |
| Asset filenames | lowercase kebab-case | `hero-section.svg` | Clear, descriptive, consistent |
| Component files | PascalCase | `FaqPage.tsx` | JavaScript/React convention |
| Content files | `index.md`, `index.de.md` | — | Hugo/Next.js convention |
| Directory names | lowercase kebab-case | `getting-started/` | Matches URL structure |

**Examples:**
- Page: `src/app/[locale]/getting-started/page.tsx`
- Content: `content/getting-started/index.md`
- Assets: `public/getting-started/hero.png`

## PR Submission Expectations

When you're ready to submit your pull request, ensure it meets these professional standards:

### PR Description Should Include:

1. **Purpose & Motivation**
   - What new page are you adding?
   - Why is this page needed?
   - Link to related issue: `Fixes #123`

2. **Changes Made**
   - List files created/modified
   - Explain routing structure
   - Describe localization approach

3. **Testing Evidence**
   - Validation commands run: `pnpm run lint && pnpm run build && pnpm run test:e2e`
   - Local manual testing results (EN and DE versions work)
   - Screenshots for UI/content changes

4. **Localization Status**
   - Both EN and DE versions complete
   - Translations verified for accuracy
   - URL structure matches routing

### Example PR Description:

```markdown
## ADD: New "Getting Started" page

### Purpose
Add a comprehensive getting started guide to help new users onboard quickly
with the Open Elements platform. Resolves #456.

### Changes
- Created `content/getting-started/index.md` and `index.de.md`
- Added `src/app/[locale]/getting-started/page.tsx` route component
- Added hero image and icons to `public/getting-started/`

### Testing
✅ `pnpm run lint` - passed
✅ `pnpm run build` - completed successfully
✅ `pnpm run test:e2e` - all tests pass
✅ Manual testing:
- English version loads: `/getting-started`
- German version loads: `/de/getting-started`
- All images render correctly
- Navigation works

### Localization
✅ Both English and German versions complete
✅ German translation reviewed and verified
✅ URLs align with locale structure
```

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Page returns 404 | Route path doesn't match content slug | Ensure `src/app/[locale]/<slug>/page.tsx` matches `content/<slug>/index.md` |
| Blank page after build | Content loading fails | Check that content file exists and front matter is valid YAML |
| Images don't load | Incorrect asset path | Use web paths like `/page-slug/image.png`, not relative paths |
| Build fails with TypeScript errors | Type mismatch in page component | Verify content loader returns expected types, use proper async/await |
| German version missing | `/de/index.de.md` not created | Create German version with identical structure and translated content |
| SEO metadata incorrect | Title/description not in front matter | Ensure `generateMetadata` extracts from content and attributes are passed correctly |
