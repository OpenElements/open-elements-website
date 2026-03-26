---
name: spec-implement
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Generate a concrete step-by-step implementation plan from a specification. Creates an ordered list of tasks that can be executed one by one, either manually by a developer or by Claude Code. Use this skill when you have a completed spec (design.md + behaviors.md) and want a clear roadmap for implementation.
---

# Create Implementation Plan

Turn a completed specification into an ordered, actionable list of implementation steps.

Before starting, read `../../conventions/spec-driven-development.md` for the full spec folder structure and file formats.

## Instructions

### 1. Load the spec

Ask the user which spec to use, or detect it from context. Read both `design.md` and `behaviors.md` from the spec folder.

Also read any relevant existing code that the implementation will modify or extend. Understand the current state of the codebase before planning changes.

If the spec involves **frontend or UI work**, also read the **Open Elements Brand Guidelines** skill (`../open-elements-brand-guidelines/SKILL.md`) and the **Frontend Design** skill (`../frontend-design/SKILL.md`). All frontend implementation steps must reference and apply the brand colors, typography, and design quality standards.

### 2. Break down into steps

Create an ordered list of implementation steps. Each step should be:

- **Atomic** — One focused change (a single file or a small group of closely related files)
- **Independently verifiable** — After completing the step, you can confirm it works (compiles, tests pass, behavior is observable)
- **Sequenced by dependency** — Earlier steps provide the foundation for later ones

A typical ordering is:
1. Data model / entities / migrations
2. Core business logic / service layer
3. API endpoints / controllers
4. Integration with external services
5. Frontend / UI components (apply Open Elements Brand Guidelines and Frontend Design skill)
6. Unit tests for core logic
7. **Backend tests for all backend behavioral scenarios** — Every scenario in `behaviors.md` that describes backend behavior (API responses, data persistence, business logic, validation) must have a corresponding test (unit or integration). Map each given-when-then scenario to at least one test case.
8. **Frontend tests for all frontend behavioral scenarios** — Every scenario in `behaviors.md` that describes UI behavior (user interactions, form submissions, dialog flows, navigation, error displays, loading states) must have a corresponding frontend test (component test, integration test, or e2e test). This includes CRUD dialogs, form validation visible to the user, conditional UI elements, and any behavior the user can see or trigger. Frontend behaviors are not covered by backend tests — they require their own dedicated tests.
9. Edge case and error handling tests (both backend and frontend)
10. Documentation updates (if applicable)

Adapt the ordering to the project and technology stack.

**Important:** The implementation is not complete until every scenario in `behaviors.md` is covered by a passing test. This is a hard requirement, not a nice-to-have. When writing `steps.md`, explicitly assign each behavior scenario to a step so that none are missed.

**Important:** Behavioral scenarios that describe what the user sees or does in the UI (e.g., "the user clicks save and sees a success message", "the dialog shows a validation error") are frontend scenarios. They must be tested with frontend tests — a passing backend API test does not verify that the UI actually works. If the project has no frontend test setup yet, the plan must include a step to set it up before the frontend test steps.

### 3. Write the plan

Write `steps.md` in the spec folder following the format from the spec-driven development doc. Use GitHub-flavored Markdown checkboxes (`- [ ]` / `- [x]`) for all changes and acceptance criteria so developers can track progress.

For each step, include:
- **Step number and title**
- **Changes** — Concrete list of what to create or modify
- **Acceptance criteria** — How to verify the step is done. Every step must include acceptance criteria that the project builds successfully and that unit tests for any new code exist and pass.
- **Related behaviors** — Which scenarios from `behaviors.md` this step covers. Use the exact scenario names/IDs from `behaviors.md`.

### 4. Verify full behavior coverage

Before presenting the plan, cross-check: create a mapping of every scenario in `behaviors.md` to the step that tests it. Classify each scenario by layer (Backend, Frontend, or Both). If any scenario is not assigned to a step, add a step or extend an existing one. Present the coverage mapping to the user:

```markdown
## Behavior Coverage

| Scenario | Layer | Covered in Step |
|----------|-------|-----------------|
| ...      | ...   | ...             |
```

Every row must have a step assigned. No gaps allowed. Scenarios classified as "Frontend" or "Both" must have a frontend test step — a backend-only test step is insufficient. Scenarios classified as "Both" need tests in both layers.

### 5. Review with the user

Present the plan and ask:
- Does the ordering make sense?
- Are any steps too large and should be split further?
- Are there steps missing?

Adjust based on feedback.

### 6. Execution options

After the plan is finalized, explain the options to the user:

- **Manual implementation** — The developer works through the steps on their own, using the plan as a guide. Ideal for learning and skill development.
- **Guided implementation** — The developer works through the steps and asks Claude Code for help on individual steps as needed.
- **Automated implementation** — Ask Claude Code to execute the steps one by one. The user reviews after each step before proceeding to the next.

For automated execution: work through the steps sequentially. After completing each step, **update `steps.md`** by checking off the completed items (`- [ ]` → `- [x]`). Then briefly report what was done and confirm with the user before moving to the next step. Do not batch multiple steps without review.
