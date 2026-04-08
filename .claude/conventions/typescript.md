# TypeScript Conventions for Claude Code

## Technology Stack

- **Language**: TypeScript is the default for all frontends. Only use plain JavaScript where enabling TypeScript would be disproportionate overhead.
- **Framework**: [React](https://react.dev) is the base UI framework. **IMPORTANT**: Do not use alternatives like Vue or Angular.
- **Application Framework**: [Next.js](https://nextjs.org) on top of React for concrete frontend applications.
- **IMPORTANT**: Configure `output: 'standalone'` in `next.config.js` / `next.config.ts` for all Next.js applications. This is required for Docker deployments and produces a self-contained build output.
- **IMPORTANT**: Pages that fetch data from a backend API must not be statically pre-rendered at build time. Use `export const dynamic = 'force-dynamic'` or other appropriate mechanisms to ensure they are rendered at request time. Static pre-rendering will cache stale or error states because the backend is not available during `next build`.
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for all styling. Do not introduce other CSS frameworks.
- **Component Library**: [shadcn/ui](https://ui.shadcn.com) as the component library.
- **shadcn/ui MCP Server**: Projects using shadcn/ui should configure the [shadcn MCP server](https://ui.shadcn.com/docs/mcp) so that Claude Code can browse, search, and install components directly. Add the following to the project's `.mcp.json`:
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

## Project Structure

- Every Next.js project must have a `public/` directory with at minimum a `favicon.ico`. This directory is required for the Docker build to succeed and for serving static assets.

## UI Layout and Design Quality

- **IMPORTANT**: Every page and component must have a polished, professional appearance — even for early-stage or PoC projects. Unstyled or minimally styled UIs are not acceptable.
- Use a consistent page layout with a clear structure: header/navigation, main content area, and footer where appropriate. Prefer [shadcn/ui Blocks](https://ui.shadcn.com/blocks) as a starting point for app layouts (e.g., sidebar or dashboard shells) instead of building layout structures from scratch.
- Apply generous and consistent spacing (padding and margin) throughout. Use Tailwind's spacing scale consistently (e.g., `p-4`, `p-6`, `p-8` for content areas, `gap-4`, `gap-6` for flex/grid layouts). Never leave elements without spacing.
- Constrain content width for readability (e.g., `max-w-screen-xl mx-auto`) — do not let content stretch edge-to-edge on wide screens.
- Use shadcn/ui components (Card, Table, Button, Input, Dialog, etc.) instead of bare HTML elements. Bare `<table>`, `<button>`, or `<input>` elements without component library styling are not acceptable.
- Ensure responsive design: layouts must work on mobile, tablet, and desktop. Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).
- Apply the Open Elements brand colors and typography as defined in the Brand Guidelines skill. Configure them in `tailwind.config` so they are available as utility classes.

## Common Commands

These are the typical commands for TypeScript/Next.js projects. Adjust the package manager prefix (`pnpm`, `npm run`, `yarn`) to match the project.

- **Install dependencies**: `pnpm install`
- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Run tests**: `pnpm test`
- **Run a single test file**: `pnpm test -- path/to/test.ts`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`
- **Type check**: `pnpm tsc --noEmit`

## Code Style

Formatting rules (indentation, charset, line endings) are defined in `.editorconfig` — see [editorconfig.md](editorconfig.md).

- **IMPORTANT**: Enable `strict` mode in `tsconfig.json`. Do not weaken strict checks without explicit justification.
- Use explicit type annotations for function parameters and return types. Rely on inference for local variables.
- Prefer `interface` over `type` for object shapes unless you need union types or mapped types.
- Use `const` by default. Use `let` only when reassignment is needed. **IMPORTANT**: Never use `var`.
- Prefer `readonly` for properties that should not be reassigned after initialization.
- Follow standard naming: `PascalCase` for types/interfaces/classes, `camelCase` for variables/functions, `UPPER_SNAKE_CASE` for constants.

## Package Manager

- Respect the existing package manager in the project (`npm`, `yarn`, or `pnpm`) — do not switch without explicit instruction.
- We prefer `pnpm`.
- Use the lockfile that matches the package manager (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`).
- Do not add dependencies that duplicate functionality already available in the project.

## Testing

- Use the testing framework already present in the project (e.g., Jest, Vitest, or Node test runner).
- Name test cases descriptively: `it('should return empty array when no items exist')`.
- Group related tests with `describe` blocks.
- Prefer `toEqual` for deep equality and `toBe` for reference/primitive equality.
- **IMPORTANT**: Avoid excessive mocking. Prefer simple stub/dummy implementations for test dependencies if possible and not too complexe. Excessive mocking often indicates poorly designed APIs with too many dependencies. Only mock when the dependency cannot be substituted otherwise (e.g., browser APIs, third-party services) or complexity will become too big.

## Linting and Formatting

- Respect existing ESLint and Prettier configurations. Do not change rules without explicit instruction.
- Fix linting errors in code you write or modify. Do not add `eslint-disable` comments unless there is a clear justification.
- Run formatting before committing to keep diffs clean.

## Internationalization (I18n)

- **IMPORTANT**: All user-facing text must be i18n-ready from the start. Never hardcode display strings directly in components.
- Extract all user-facing strings (labels, messages, errors, placeholders, tooltips) into a central location (e.g., a constants file or translation file) so that adding translations later requires no component changes.
- Use a consistent key-naming convention for text keys (e.g., `page.section.element` like `dashboard.header.title`).
- Full multi-language support does not need to be implemented immediately, but the architecture must make it straightforward to add later (e.g., by swapping in a library like [next-intl](https://next-intl-docs.vercel.app/) or [react-i18next](https://react.i18next.com/)).
- Do not concatenate translated strings to build sentences — use parameterized messages with placeholders instead (e.g., `"Welcome, {name}"` not `"Welcome, " + name`).
- Keep date, number, and currency formatting locale-aware from the start (use `Intl.DateTimeFormat`, `Intl.NumberFormat`).

## Logging

- Use `console.error` for errors, `console.warn` for warnings, and `console.info` for informational messages. Do not use `console.log` in production code.
- Log meaningful context: what operation failed, which endpoint was called, and the HTTP status code or error message received.
- **IMPORTANT**: Never log sensitive data (tokens, passwords, personal data) to the browser console.

## Error Handling

- Use typed errors or custom error classes where appropriate.
- Avoid catching errors without handling them. At minimum, log the error.
- Prefer `unknown` over `any` in catch blocks: `catch (error: unknown)`.

### Backend Communication Errors

- Log detailed error information to the browser console (HTTP status, endpoint URL, error body) for debugging purposes.
- **IMPORTANT**: Never show raw backend error messages, stack traces, or technical details to the user. Display a simplified, user-friendly error message instead (e.g., "The data could not be loaded. Please try again later.").
- Distinguish between error types for the user where helpful: network errors ("No connection to the server"), authorization errors ("Please log in again"), and general server errors ("An unexpected error occurred").
- Centralize backend error handling in a shared utility or API client layer to ensure consistent logging and user-facing messages across the application.
