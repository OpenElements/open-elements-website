---
name: quality-review
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Review code changes for quality, conventions, and potential issues. Checks against the project's convention documents (code quality, security, language-specific rules, testing). Use this skill after implementing a feature or bug fix, or when reviewing someone else's code changes.
---

# Quality Review

Review code changes for quality and convention compliance. Unlike `spec-review` (which checks completeness against a spec), this skill checks whether the code is well-written, secure, and follows project conventions.

## Instructions

### 1. Determine the scope

Ask the user what to review. Options:

- **Uncommitted changes** — run `git diff` and `git diff --staged` to see what changed
- **A branch or PR** — run `git diff main...HEAD` (or the appropriate base branch) to see all changes
- **Specific files** — the user points to files or directories to review

Read all changed files completely — diffs alone are not enough to judge quality, since context matters.

### 2. Load the relevant conventions

Read the convention documents that apply to the project. Determine which are relevant based on the languages and files in the changeset:

- Always read `../../conventions/software-quality.md` — applies to all projects
- For Java files: read `../../conventions/java.md`
- For TypeScript files: read `../../conventions/typescript.md`
- For backend code: read `../../conventions/backend.md`
- For security-sensitive changes: read `../../conventions/security.md`

Also read the project's `CLAUDE.md` for any project-specific rules.

### 3. Review the code

Check each changed file against the applicable conventions. Focus on these areas:

**Code quality:**
- DRY — Is there duplicated logic that should be extracted?
- KISS — Are there overly complex solutions where simpler ones would work?
- Dead code — Unused imports, unreachable branches, commented-out code?
- Naming — Are variables, functions, and classes named meaningfully?
- Focus — Does each function/method do one thing well?
- Unnecessary code — Is there code added "for future use" that is not needed yet?

**Security:**
- Are secrets, keys, or tokens hardcoded?
- Is user input validated and sanitized?
- Are database queries parameterized?
- Are there new dependencies with known vulnerabilities?

**Testing:**
- Do new features and bug fixes have corresponding tests?
- Are tests deterministic and clearly named?
- Do tests cover edge cases and error scenarios?
- Are assertions specific with clear failure messages?

**Language-specific conventions:**
- Apply the rules from the relevant language doc (java.md, typescript.md)
- Check for language-specific anti-patterns (e.g., wildcard imports in Java, `any` type in TypeScript)

**Architecture:**
- Does the change respect existing patterns in the codebase?
- Are public APIs well-designed and encapsulated?
- Are there unintended breaking changes?

### 4. Report

Present the findings grouped by severity:

```markdown
## Critical

Issues that must be fixed before merging (security vulnerabilities, data loss risks, broken functionality).

## Improvements

Issues that should be fixed (convention violations, code quality concerns, missing tests).

## Suggestions

Optional improvements (simplification opportunities, better naming, minor refactors).

## Positive

Things done well (good test coverage, clean abstractions, thoughtful error handling).
```

For each finding:
- Reference the specific file and line
- Explain **what** the issue is and **why** it matters
- Suggest a concrete fix where possible

Always include the "Positive" section — a review that only lists problems is demoralizing and incomplete.

### 5. Discuss with the user

Walk through the findings. For each issue, the user may:
- Agree and want it fixed — offer to make the change
- Disagree — discuss the reasoning, update conventions if the rule is wrong
- Defer — acknowledge it as known technical debt

Do not make changes without the user's agreement.
