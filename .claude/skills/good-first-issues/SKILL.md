---
name: good-first-issues
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Create well-structured Good First Issues for open-source projects on GitHub. Produces beginner-friendly issues with clear descriptions, solution ideas, and welcoming formatting. Use when the user wants to create issues for newcomers, onboard new contributors, write good first issues, or improve contributor experience on GitHub repositories.
---

# Good First Issue Creator

Create welcoming, well-structured GitHub issues that help newcomers make their first open-source contribution successfully. A good first issue is not just a task description — it is an invitation and a guided path into the project.

## What Makes a Good First Issue

A qualifying issue should be:

- **Well-defined** — Clear goal, clear scope, no ambiguity about what "done" looks like
- **Manageable** — Completable in 30-90 minutes of focused work (after setup)
- **Educational** — The contributor learns something about the codebase
- **Non-critical** — No complex dependencies, no risk of breaking production
- **Self-contained** — Ideally touches 1-2 files, not a cross-cutting concern
- **Welcoming** — Tone matters. The issue should feel like an invitation, not a task assignment

### Suitable Tasks

- Spelling, grammar, or formatting fixes in docs or code comments
- Adding or improving docstrings / JSDoc / Javadoc
- Small refactors (rename for clarity, extract a constant, remove dead code)
- Adding a missing test case for existing functionality
- Fixing a simple, well-understood bug with an obvious fix location
- Adding a missing validation or error message
- Updating outdated examples or config values

### NOT Suitable

- Anything requiring deep architectural knowledge
- Tasks that touch multiple modules or have non-obvious side effects
- Performance optimizations requiring benchmarking
- Security-sensitive changes
- Features that require design decisions

## Instructions

### 1. Understand the context

Ask the user (or determine from context):
- Which repository is this for?
- What is the task? (bug fix, docs improvement, test addition, refactor, etc.)
- What files are involved?
- What does the current behavior look like? What should it look like?
- Are there similar patterns in the codebase the contributor can follow?

### 2. Determine the difficulty level

Classify the issue into one of these levels:

| Level | Time | Description |
|-------|------|-------------|
| **Good First Issue** | 30-90 min | Can be completed by following clear instructions. Minimal decision-making required. |
| **Beginner** | 2-4 hours | Requires reading some code and making small decisions, but not designing from scratch. |
| **Intermediate** | 4-8 hours | Requires navigating the codebase and understanding how components interact. |

This skill focuses on **Good First Issues**. For beginner and intermediate issues, adapt the template by reducing the hand-holding and increasing the research expectations.

### 3. Write the issue

Use the template structure below. Every section uses an emoji heading for visual friendliness. The tone should be warm and encouraging throughout — remember that the person reading this may never have contributed to open source before.

**Important writing principles:**

- Never assume the contributor knows the codebase. Explain where files are and what they do.
- Use concrete examples: show actual code snippets, actual file paths, actual expected output.
- The "Solution Idea" section should give a clear direction without being a copy-paste recipe — the contributor should still learn by doing.
- Link to relevant files, docs, and similar examples in the codebase.
- If there is a pattern to follow (e.g., "look at how ClassX does it"), point to it explicitly.

### 4. Review with the user

Present the drafted issue and ask the user to review before creating it on GitHub. Check:
- Is the scope realistic for a newcomer?
- Are all file paths and links correct?
- Is the solution idea accurate?
- Is anything missing that a newcomer would need to know?

## Issue Template

Use this structure when writing Good First Issues. Adapt sections as needed — not every issue needs every section, but always include the core sections (marked as required).

```markdown
## 🐣 Good First Issue

Welcome! This is a beginner-friendly issue designed for first-time contributors.
No prior experience with this project is needed — just [language] basics and Git.

⏱️ **Estimated time:** 30–90 minutes
🧩 **Difficulty:** Beginner-friendly
📁 **Files involved:** `path/to/file.ext`

---

## 👾 Description                                        ← REQUIRED

[Clear explanation of what needs to change and why.
Show the current state and the desired state.
Use code blocks to illustrate.]

**Current behavior:**
```[language]
// What it looks like now
```

**Desired behavior:**
```[language]
// What it should look like
```

---

## 💡 Solution Idea                                      ← REQUIRED

[High-level approach. Point to similar patterns in the codebase.
Give enough direction that the contributor knows where to start,
but not so much that there is nothing left to figure out.]

1. Open `path/to/file.ext`
2. Look at how `SimilarClass` handles this — use the same pattern
3. [Specific guidance for this task]

---

## 🔍 Helpful References

[Links to relevant files, documentation, or examples that will
help the contributor understand the context.]

- [`path/to/similar_file.ext`](link) — Example of the pattern to follow
- [Relevant documentation](link)
- [Language docs for the concept involved](link)

---

## ✅ Done Checklist                                     ← REQUIRED

Before opening your PR, confirm:

- [ ] My changes address what the issue asked for — nothing more, nothing less
- [ ] I tested my changes locally
- [ ] All CI checks pass
- [ ] [Any project-specific requirements, e.g., changelog entry, signed commits]

---

## 🆘 Stuck?

No worries — getting stuck is completely normal, especially on your first contribution!

- **Comment on this issue** and describe what you have tried — a maintainer will help.
- **Check the project's contributing guide** for setup and workflow instructions.
- [Add project-specific support channels here, e.g., Discord, Slack, office hours]

Do not spend more than 30 minutes blocked without asking for help.
Asking good questions is a skill too! 🙂
```

## Formatting Guidelines

### Emoji Usage

Use emojis in section headings to make the issue visually scannable and welcoming. Stick to these conventions:

| Emoji | Use for |
|-------|---------|
| 🐣 | Issue type header (Good First Issue) |
| 👾 | Description |
| 💡 | Solution idea |
| 🔍 | References / research pointers |
| 🛠️ | Implementation details (if needed) |
| 🧪 | Testing instructions (if needed) |
| ✅ | Done checklist |
| 🆘 | Stuck / help section |
| 📋 | Workflow reference |
| 🤖 | AI tips (if relevant) |
| 📚 | Additional resources |

### Tone

- Use "you" and "your" — address the contributor directly
- Say "Welcome!" at the start
- Use encouraging language: "No worries", "completely normal", "feel free to ask"
- Avoid jargon without explanation
- Never write "this should be easy" or "this is trivial" — what is trivial to a maintainer may be intimidating to a newcomer

### GitHub Callouts

Use GitHub's callout syntax for important information:

```markdown
> [!TIP]
> Helpful advice for the contributor.

> [!IMPORTANT]
> Critical information they must not miss.

> [!NOTE]
> Additional context that is good to know.
```

## Difficulty Variants

### Beginner Issues (next step after Good First Issues)

For beginner issues, adjust the template:

- Change header emoji to 🐥 and title to "Beginner Friendly"
- Increase estimated time to 2-4 hours
- Replace step-by-step instructions with research pointers ("look at how X does it")
- Add a "Background Research" section before the solution
- Expect the contributor to write tests
- Add a note: "We recommend completing at least 2-3 good first issues before attempting this"

### Intermediate Issues

For intermediate issues:

- Change header emoji to 🔧 and title to "Intermediate"
- Increase estimated time to 4-8 hours
- Focus on the problem description and expected outcome, not the implementation path
- Expect the contributor to navigate the codebase independently
- Remove the "Stuck?" section — replace with "Questions? Comment below"

## Labels

Recommend the user apply these labels to the created issue:

| Label | When to use |
|-------|------------|
| `good first issue` | GitHub's standard label — enables discoverability in GitHub's "Good First Issues" tab |
| `help wanted` | Signals the issue is open for external contributors |
| `documentation` / `tests` / `bug` | Describe the type of work |
