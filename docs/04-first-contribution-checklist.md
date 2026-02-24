# 04 - First Contribution Checklist

This checklist is designed for first-time contributors.

## Before you start

1. Fork and clone the repository.
2. Install dependencies with `pnpm install`.
3. Start local server with `pnpm run dev`.
4. Confirm the site opens at `http://localhost:3000`.

## Pick a task safely

1. Start from an issue assigned to you.
2. If actively working, comment `/working` on the issue.
3. If you cannot continue, comment `/unassign`.

## Branch and commit practices

1. Branch name format: `fix/issue-<id>-short-summary` or `feat/issue-<id>-short-summary`.
2. Keep commits focused and descriptive.
3. Link PR to issue using `fixes #<issue-number>` when applicable.

## Content/page contribution flow

1. Update markdown in `content/` as needed.
2. Update Next.js route/component in `src/app/[locale]/...` when needed.
3. Keep EN/DE versions aligned.
4. Verify asset paths in `public/`.

## Validation before push

1. Run `pnpm run lint`.
2. Run `pnpm run test:e2e` for behavioral coverage when your change affects pages/flows.
3. Review changed files for accidental edits.

## Pull request expectations

1. Open PR early (draft is encouraged).
2. Add a clear description of what changed and why.
3. Include screenshots when UI is changed.
4. Keep PR scope focused and reviewable.

