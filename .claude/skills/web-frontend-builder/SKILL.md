---
name: web-frontend-builder
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Build and develop web frontend applications using the Open Elements tech stack (Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, pnpm). Use when the user asks to create a new frontend project, add pages or components, set up routing, or develop features in a web application. Not for simple HTML snippets — use for real application development.
---

# Web Frontend Builder

Build production-grade web frontend applications using the Open Elements tech stack. Follow these steps to create or extend a frontend project.

**Stack**: Next.js + React 18 + TypeScript (strict) + Tailwind CSS + shadcn/ui + pnpm

**IMPORTANT**: All conventions from `../../conventions/typescript.md` apply. When in doubt, defer to that document.

## Design Guidelines

For design direction and visual quality, apply the `frontend-design` skill. Key principles:

- Every page and component must have a polished, professional appearance — even for early-stage projects.
- Use shadcn/ui components instead of bare HTML elements.
- Apply Open Elements brand colors and typography via the `open-elements-brand-guidelines` skill.
- Avoid generic AI aesthetics: no excessive centered layouts, purple gradients, uniform rounded corners, or default Inter font.

## Creating a New Project

### Step 1: Scaffold with Next.js

```bash
pnpm create next-app <project-name> --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd <project-name>
```

### Step 2: Configure Next.js

Edit `next.config.ts` to set standalone output (required for Docker deployments):

```typescript
const nextConfig = {
  output: 'standalone',
};
```

### Step 3: Enable Strict TypeScript

Verify `tsconfig.json` has `"strict": true`. This is non-negotiable.

### Step 4: Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

When prompted, select the defaults that match the project's design direction. Then install the components needed:

```bash
pnpm dlx shadcn@latest add button card input table dialog
```

Add more components as needed during development.

### Step 5: Configure shadcn MCP Server

Add to the project's `.mcp.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### Step 6: Set Up Brand Colors

Configure Open Elements brand colors in `tailwind.config.ts` so they are available as utility classes. Use the `open-elements-brand-guidelines` skill to get the exact color values.

### Step 7: Verify Setup

```bash
pnpm dev
```

Confirm the dev server starts without errors.

## Developing Features

### Adding Pages

Create pages in `src/app/` following Next.js App Router conventions:

- `src/app/page.tsx` — home page
- `src/app/<route>/page.tsx` — additional pages
- `src/app/layout.tsx` — root layout with consistent header/navigation and footer

**IMPORTANT**: Pages that fetch data from a backend API must not be statically pre-rendered. Use `export const dynamic = 'force-dynamic'` to ensure request-time rendering.

### Adding Components

Place reusable components in `src/components/`. Follow these conventions:

- One component per file, named in PascalCase matching the export
- Use shadcn/ui components as building blocks — do not create bare HTML equivalents
- Use shadcn/ui Blocks as starting points for layout structures (sidebar shells, dashboard layouts)
- Apply consistent spacing using Tailwind's spacing scale (`p-4`, `p-6`, `gap-4`, `gap-6`)
- Constrain content width for readability (`max-w-screen-xl mx-auto`)
- Ensure responsive design with Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)

### Internationalization

All user-facing text must be i18n-ready from the start:

- Extract all display strings into a central location (constants file or translation file)
- Use consistent key naming (`page.section.element`)
- Use parameterized messages with placeholders (`"Welcome, {name}"` not `"Welcome, " + name`)
- Keep date, number, and currency formatting locale-aware (`Intl.DateTimeFormat`, `Intl.NumberFormat`)

### Error Handling

- Log detailed errors to the browser console (HTTP status, endpoint URL, error body)
- Never show raw backend error messages to the user — display simplified, user-friendly messages
- Centralize backend error handling in a shared API client layer

### Testing

Use the testing framework present in the project (Jest, Vitest, or Node test runner):

```bash
pnpm test
```

- Name tests descriptively: `it('should return empty array when no items exist')`
- Group related tests with `describe` blocks
- Avoid excessive mocking — prefer simple stub/dummy implementations

## Common Commands

- **Install dependencies**: `pnpm install`
- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Run tests**: `pnpm test`
- **Lint**: `pnpm lint`
- **Type check**: `pnpm tsc --noEmit`

## Quality Checklist

Before considering a feature complete, verify:

- [ ] `pnpm build` succeeds without errors
- [ ] `pnpm lint` passes
- [ ] `pnpm tsc --noEmit` reports no type errors
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] No bare HTML elements where shadcn/ui components exist
- [ ] No hardcoded user-facing strings — all are i18n-ready
- [ ] No `console.log` in production code — use `console.error`, `console.warn`, `console.info`
- [ ] No sensitive data logged to the browser console
- [ ] Standalone output configured in `next.config.ts`
- [ ] Brand colors applied via Tailwind config

## Reference

- **Next.js docs**: https://nextjs.org/docs
- **shadcn/ui components**: https://ui.shadcn.com/docs/components
- **shadcn/ui Blocks**: https://ui.shadcn.com/blocks
- **Tailwind CSS**: https://tailwindcss.com/docs
