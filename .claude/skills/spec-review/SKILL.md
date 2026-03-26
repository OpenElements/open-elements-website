---
name: spec-review
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Review an implementation for completeness against its specification. Checks whether the design document and behavioral scenarios from a spec are fully covered by the actual code and tests. Use this skill after implementing a feature that was planned with spec-create.
---

# Review Implementation Against Specification

Verify that an implementation fully satisfies its specification by checking the code against the design document and behavioral scenarios.

Before starting, read `../../conventions/spec-driven-development.md` for the full spec folder structure and file formats.

## Instructions

### 1. Identify the spec

Ask the user which spec to review, or detect it from context. Locate the spec folder under `specs/` and read both `design.md` and `behaviors.md` completely.

### 2. Review against `design.md`

Check the codebase for each element defined in the design:

- **API design** — Are all endpoints/interfaces implemented with the correct signatures, status codes, and response shapes?
- **Data model** — Are all entities, fields, relationships, and migrations present?
- **Key flows** — Does the code implement the described execution paths?
- **Dependencies** — Are the specified libraries/services integrated correctly?
- **Security considerations** — Are the described security measures in place?

For each item, classify it as:
- **Covered** — Fully implemented as designed
- **Partially covered** — Implemented but deviates from the design or is incomplete
- **Missing** — Not implemented at all
- **Intentionally skipped** — Not applicable (explain why)

### 3. Review against `behaviors.md`

For each given-when-then scenario:

- Check if a corresponding **test exists** (unit test, integration test, or e2e test)
- Check if the **code behavior matches** the scenario even without a dedicated test
- Flag scenarios that are **not covered by any test**

Classify each scenario as:
- **Tested** — A test directly covers this scenario
- **Implemented but untested** — The code handles this case but no test verifies it
- **Not implemented** — The behavior described in the scenario is missing from the code

### 4. Report

Present a structured report:

```markdown
## Design Coverage

| Design Element | Status | Notes |
|----------------|--------|-------|
| ...            | ...    | ...   |

## Behavior Coverage

| Scenario | Status | Test Location |
|----------|--------|---------------|
| ...      | ...    | ...           |

## Summary

- X of Y design elements covered
- X of Y behavioral scenarios tested
- X scenarios implemented but untested
- X scenarios not implemented

## Recommended Actions

1. ...
```

### 5. Review documentation freshness

Check that documentation artifacts are up to date with the implementation:

- **Code comments and Javadoc/JSDoc** — Do they reflect the current behavior? Flag comments that describe old logic, removed parameters, or outdated examples.
- **README and user-facing docs** — If the feature changes behavior visible to users or developers, are the relevant docs updated?
- **API documentation** — If endpoints or interfaces changed, are OpenAPI specs, Swagger annotations, or similar kept in sync?
- **Inline TODOs** — Flag any `TODO`, `FIXME`, or `HACK` comments left in the new code that should be resolved before merging.
- **Changelog / release notes** — If the project maintains a changelog, is there an entry for this change?

Add a section to the report:

```markdown
## Documentation

| Item | Status | Notes |
|------|--------|-------|
| ...  | ...    | ...   |
```

Classify each as:
- **Up to date** — Documentation matches the implementation
- **Outdated** — Documentation describes old behavior or is missing updates
- **Missing** — No documentation exists where it should

### 6. Discuss with the user

Walk through the findings. For missing or partially covered items, discuss whether they are:
- Oversights that need to be fixed
- Intentional deviations that should be reflected back in the spec
- Out of scope for the current iteration

If the spec needs to be updated to reflect implementation decisions, offer to update `design.md` or `behaviors.md` accordingly.
