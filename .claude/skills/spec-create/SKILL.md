---
name: spec-create
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Plan a feature or bug fix by creating a structured specification. Starts from a GitHub issue or a description, produces a design document and behavioral scenarios (given-when-then) through interactive discussion. Use this skill when the user wants to plan a new feature, fix a complex bug, or define the technical approach for a ticket before implementation.
---

# Create Specification

Plan a feature or bug fix collaboratively. Produces a `design.md` (technical design) and a `behaviors.md` (behavioral scenarios in given-when-then format) in a dedicated spec folder.

Before starting, read `../../conventions/spec-driven-development.md` for the full spec folder structure, file formats, and conventions.

## Instructions

### 1. Gather the input

Accept one of the following as starting point:
- A **GitHub issue URL** — fetch the issue details using `gh issue view`.
  If `gh` is not available, use `WebFetch` to retrieve the issue content from the URL instead.
- A **free-text description** from the user

**If no GitHub issue exists yet:** Every feature or bug fix should be tracked by a GitHub issue — there should be no PR without a corresponding issue. Before proceeding with the spec, offer to help the user draft a GitHub issue first. Write a suggested issue title and body (with description, context, and acceptance criteria) that the user can review, adjust, and create on GitHub themselves. **Do not create the issue on GitHub** — the user does that. Once the issue exists, continue with the spec using the issue as the starting point.

**Important:** A GitHub issue is a starting point, not a complete specification. Issues are often vague, incomplete, or written from a user perspective without technical detail. Always discuss the requirement with the user — ask clarifying questions about intended behavior, affected components, constraints, and acceptance criteria before moving on. Do not assume the issue text is sufficient.

Summarize the requirement back to the user in 2–3 sentences to confirm understanding.

Then ask the user: **"Do you want to get grilled on this before we continue? This will stress-test your understanding of the problem — surfacing hidden assumptions, missing requirements, and blind spots — before we commit to a design."**

If the user says yes, invoke `/grill-me` with the gathered requirement as input. The grill session will systematically challenge the user's thinking. Once the grill session concludes, incorporate the resolved decisions and clarifications into the spec work and continue with step 2.

### 2. Evaluate scope

Assess whether the task is realistically completable in a few hours of focused work. Consider:
- Number of components/files affected
- New APIs, database changes, or infrastructure needed
- Cross-cutting concerns (auth, migrations, etc.)

If the scope is too large, **propose splitting** it into smaller, independently deliverable tasks. Each sub-task should be viable on its own.

For each proposed sub-task, draft a GitHub issue title and description (in Markdown) that the user can copy into GitHub. Include:
- A clear title
- A short description of the sub-task
- Acceptance criteria
- A reference to the original issue (if one exists)

Present the drafted issues to the user for review and adjustment. **Do not create issues on GitHub** — the user will do that themselves. Once the issues are created, the user can start a new `/spec-create` for any of them.

### 3. Create the spec folder

Create the spec folder under `specs/` following the naming convention from the spec-driven development doc.

### 4. Write `design.md` — Interactive planning

Enter plan mode to discuss the technical design with the user. The goal is to produce a `design.md` following the structure defined in the spec-driven development doc.

Not every section is needed for every task — adapt the content to the type of change:

**For all designs**, consider **GDPR (DSGVO) compliance**: If the feature involves personal data (user input, profiles, tracking, analytics, etc.), the design must address data minimization, legal basis for processing, data subject rights (access, rectification, erasure, portability), and retention/deletion strategy. Add a dedicated section in the design doc when personal data is affected.

**For features with UI components**, the design must reference the Open Elements Brand Guidelines (colors, typography, logo) and the Frontend Design skill for design quality. Note in the design doc which brand colors, fonts, and assets will be used.

**For features**, the full design structure applies: Summary, Goals, Non-goals, Technical approach, API design, Data model, Key flows, etc.

**For bug fixes**, the design focuses on different priorities:
- **Summary** — What is broken and what is the user-visible impact
- **Reproduction** — Steps to reproduce the bug, including preconditions and environment details
- **Root cause analysis** — Why the bug occurs, which component is responsible, and what the underlying issue is (not just the symptom)
- **Fix approach** — How the bug will be fixed, which files/components are affected, and why this approach is correct
- **Regression risk** — What could break as a side effect of the fix

Keep bug fix designs lean — the goal is to understand the problem deeply before writing code, not to produce extensive documentation.

For key design decisions (e.g., choice of technology, data model structure, API style, fix strategy), include a brief rationale explaining **why** this approach was chosen over alternatives.

Where it helps clarity, use **Mermaid diagrams** — e.g., sequence diagrams for key flows, ER diagrams for data models, or component diagrams for architecture. Only add diagrams when they communicate better than text alone.

Iterate with the user until both sides are confident the design is solid. Then write the file.

### 5. Write `behaviors.md` — Behavioral scenarios

Based on the finalized design, create `behaviors.md` with given-when-then scenarios following the format from the spec-driven development doc.

Aim for comprehensive coverage:
- **Happy paths** — The main success scenarios
- **Edge cases** — Boundary values, empty inputs, concurrent access
- **Error cases** — Invalid input, missing permissions, downstream failures
- **State transitions** — Before/after states where relevant

Each scenario should be specific enough that a developer can directly translate it into a test case.

Review the scenarios with the user. Ask explicitly: "Are there edge cases or error scenarios we are missing?"

### 6. Summary

After both files are written, provide a short summary:
- Link to the created spec folder
- Count of behavioral scenarios
- Any open questions from the design
- Suggest next steps: implement manually, use `/spec-implement` for a step-by-step plan, or use `/spec-review` after implementation to verify completeness
