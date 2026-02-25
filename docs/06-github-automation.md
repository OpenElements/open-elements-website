# 06 - GitHub Automation Guide

## Purpose and Scope

This comprehensive guide documents the GitHub Actions automation that powers the Open Elements repository. These workflows automate routine tasks, enforce quality standards, manage contributor workflows, and maintain issue/PR lifecycle consistency.

**Target Audience**: Maintainers, repository administrators, developers debugging automation behavior

**Key Concepts**: GitHub Actions workflows, environment variables, repository rules, automation triggers

## Core Design Philosophy

The automation system is designed according to these principles:

### Single Source of Truth: GitHub Actions

- All automation runs through GitHub Actions (not external CI/CD platforms)
- Workflows are version-controlled in `.github/workflows/`
- Configuration is transparent and auditable
- No external dependencies or specialized tools required

### Minimal Permissions Model

- Uses only `GITHUB_TOKEN` (automatically provided by GitHub)
- Requires repository-level environment variables (no secrets needed)
- No third-party API integrations unless absolutely necessary
- No CODEOWNERS file dependency

### No Branch Protection Enforcement

- Branch protection rules aren't used for requirement enforcement
- Automation works through labeling, comments, and PR status checks
- Maintainers have clear override capability
- Contributor experience remains flexible

## Issue Management Automation

### Issue Commands

Contributors can interact with issues through special comment commands. These commands are processed by automated workflows:

#### `/assign` Command

**Purpose**: Assign the issue to yourself

**Syntax**:
```
/assign
```

**Behavior**:
- Assigns the issue to the comment author
- Subject to `ASSIGN_ALLOWLIST` rules (if configured)
- Updates issue status label to `status: in-progress`
- Triggers first-timer guidance if applicable

**Example**:
```
This looks interesting! /assign
```

**Result**: You are now assigned, issue shows "assigned to @yourname"

#### `/working` Command

**Purpose**: Mark that you are actively working on the issue

**Syntax**:
```
/working
```

**Behavior**:
- Updates issue to show `status: in-progress`
- Persists a timestamped marker comment
- Prevents stale assignment reminders (resets timer)
- Signals to other contributors that work is active

**When to use**:
- After being assigned but before starting work
- When you've been idle and are resuming work
- To communicate continuous progress to maintainers

**Example**:
```
Starting implementation now. /working
```

#### `/unassign` Command

**Purpose**: Remove yourself from the issue

**Syntax**:
```
/unassign
```

**Behavior**:
- Removes your assignment
- Updates status to `status: triage` (ready for new assignment)
- Frees the issue for other contributors
- Clears the "active work" marker

**When to use**:
- If you cannot complete the work
- If you need to pause for an extended period
- When passing work to another team member

**Example**:
```
Hitting a blocker here. /unassign

(and create a follow-up issue for the blocker)
```

### Reminder Workflow

The system automatically sends reminders to assignees when certain conditions are met, helping keep issues moving forward.

**Trigger**: Runs daily via scheduled workflow

**Conditions for sending a reminder** (ALL must be true):
1. Issue is assigned to someone
2. Issue has been open longer than `REMIND_AFTER_DAYS` (typically 7 days)
3. No `/working` comment in the last `WORKING_GRACE_DAYS` (typically 3 days)
4. Issue doesn't have a "blocked" label
5. Issue isn't already in recent reminder spam window
6. No open PR is linked to the issue

**Reminder content**: Polite nudge asking for status update

**What happens after reminder**:
- If you respond with `/working` → Reminder timer resets
- If PR is linked → Reminder stops
- If issue is closed → Reminder stops
- If labeled as blocked → Reminder stops

### First-Timer Guidance

When a new contributor (or someone working on their first issue) is assigned an issue, they automatically receive helpful guidance.

**Trigger**: When issue is assigned to first-time contributor

**Guidance source** (in priority order):
1. `.github/FIRST_TIMER_GUIDE.md` - if file exists in repo
2. Embedded default guidance in workflow YAML

**Content typically includes**:
- Welcome message
- Link to contributor documentation
- Link to relevant guides
- How to ask questions
- Expected timeline for first contribution

**Example guidance comment**:
```
Welcome to your first contribution! Here's what you need to know:

1. Start with: docs/README.md → "Getting Started"
2. Next, read: docs/01-repo-overview.md
3. For implementation help: see docs/03-adding-pages.md
4. Before submitting PR: review docs/04-first-contribution-checklist.md

Questions? Ask here in the issue - maintainers are happy to help!
```

## Pull Request Automation

### Automatic Labels and Assignment

When a PR is created, the system automatically:

1. **Applies labels** based on which files changed
   - `label: content` - if markdown files modified
   - `label: frontend` - if React/TypeScript components changed
   - `label: i18n` - if translation files changed
   - `label: automation` - if GitHub workflows changed

2. **Auto-assigns** the PR to its author
   - Helps track ownership
   - Makes author's PRs easily discoverable

**Implementation**: Reads changed files from PR diff, applies configured labels

### Reviewer Assignment

The system automatically requests reviews from appropriate team members based on code ownership and expertise.

**Configuration**: `.github/reviewers.json`

**Example reviewers.json structure**:
```json
{
  "defaultReviewers": ["@maintainer1", "@maintainer2"],
  "pathReviewers": {
    "src/i18n/*": ["@i18n-specialist"],
    "src/app/[locale]/*": ["@frontend-lead"],
    "content/*": ["@content-editor"],
    ".github/workflows/*": ["@devops-lead"]
  }
}
```

**Assignment logic**:
1. Collect default reviewers (apply to all PRs)
2. Identify changed file paths
3. Match paths against `pathReviewers` configuration
4. Combine both sets (default + path-specific)
5. Remove PR author from reviewer list (don't self-request review)
6. Avoid duplicate requests (don't re-request already-requested reviewers)
7. Send GitHub pull request review request

**Example scenario**:
```
PR changes:
- src/app/[locale]/about/page.tsx
- content/about/index.md
- docs/README.md

Result:
- Default reviewers: @maintainer1, @maintainer2
- Path-based: @frontend-lead (matched src/app), @content-editor (matched content)
- Final list: @maintainer1, @maintainer2, @frontend-lead, @content-editor
```

### Reviewer Protection

The system prevents contributors from removing required reviewers, ensuring quality gates remain in place.

**Maintainer privileges**:
- Defined via `MAINTAINER_ALLOWLIST` environment variable
- Maintainers can remove/modify reviewers if needed
- Maintainers can approve their own code

**Non-maintainer restrictions**:
- Cannot remove already-requested reviewers
- Cannot modify reviewer configuration files
- If they try to modify `.github/reviewers.json`, workflow fails with clear error

**Purpose**: Ensures quality standards aren't bypassed accidentally

## Status Label Synchronization

The system maintains consistent status labels on both issues and PRs, providing visibility into work progress.

### Issue Status Labels

Status labels on issues indicate their current state in the workflow:

| Label | Meaning | When Applied | Cleared When |
|-------|---------|--------------|--------------|
| `status: triage` | Issue is new, needs initial review | Automatically on creation | Assigned or labeled `blocked` |
| `status: in-progress` | Someone is actively working | `/assign` command or PR linked | Issue closed |
| `status: blocked` | Cannot proceed (external blocker) | Manual label by maintainer | Blockage removed |
| `status: blocked-reviewer` | Waiting for reviewer feedback | Auto-applied if PR in review stage | Reviewer provides feedback |
| `status: closed` | Issue resolved | Issue closed | N/A (terminal state) |

### Pull Request Status Labels

Status labels on PRs indicate their current stage:

| Label | Meaning | When Applied | Advanced To |
|-------|---------|--------------|-------------|
| `status: draft` | Early work, not ready for review | Auto on PR creation if marked draft | Converted to ready for review |
| `status: in-review` | Ready for review, awaiting feedback | Auto when review requested | Changes requested or approved |
| `status: changes-requested` | Reviewer wants modifications | Auto when review shows changes-requested | Resolved and re-reviewed |
| `status: approved` | Reviewer approved changes | Auto on approval | Merged (if all approvals met) |
| `status: merged` | PR successfully merged | Auto on merge | N/A (terminal state) |
| `status: closed` | PR closed without merging | Auto on close | N/A (terminal state) |

### Status Update Workflow

**How it works:**
1. Workflow monitors all issue and PR events
2. Evaluates current state
3. Compares against expected status labels
4. Adds/removes labels as needed
5. Maintains single source of truth

**Example scenario**:
```
Timeline:
1. Issue created → Gets `status: triage` label
2. Issue assigned → Label changes to `status: in-progress`
3. PR created and linked → Keeps `status: in-progress`
4. PR review requested → PR gets `status: in-review`
5. Reviewer requests changes → PR gets `status: changes-requested`
6. PR updated → Label changes back to `status: in-review`
7. Review approved → PR gets `status: approved`
8. PR merged → PR gets `status: merged`, issue gets `status: closed`
```

## Configuration Files and Repository Variables

### Workflow Configuration Files

| File | Purpose | Modifiable By | When to Edit |
|------|---------|---------------|--------------|
| `.github/workflows/issue-commands.yml` | Handles `/assign`, `/working`, `/unassign` commands | Maintainers | Adding new commands or changing command behavior |
| `.github/workflows/issue-reminders.yml` | Sends daily reminders to stale assignees | Maintainers | Adjusting reminder timing or conditions |
| `.github/workflows/first-timer-guidance.yml` | Sends welcome message to new contributors | Maintainers | Updating onboarding message or conditions |
| `.github/workflows/pr-automation.yml` | Auto-labels and assigns reviewers to PRs | Maintainers | Adding new labels/paths or changing reviewer logic |
| `.github/workflows/status-labels.yml` | Maintains status labels on issues/PRs | Maintainers | Changing status conditions or labels |
| `.github/reviewers.json` | Maps file paths to responsible reviewers | Maintainers | Adding expertise areas or reorganizing teams |

### Environment Variables and Configuration

Repository variables control automation behavior:

**Key Variables:**

| Variable | Purpose | Example Value | Usage |
|----------|---------|---------------|-------|
| `MAINTAINER_ALLOWLIST` | Users with override permissions | `maintainer1,maintainer2,maintainer3` | Determines who can adjust reviewer requirements |
| `WORKING_LABEL` | Label applied when work is active | `status: in-progress` | Applied by `/working` command |
| `REMIND_AFTER_DAYS` | Days before stale reminder sent | `7` | Issue must be open this long before reminder |
| `WORKING_GRACE_DAYS` | Days since `/working` before reminder | `3` | If no `/working` in this many days, send reminder |
| `SKIP_REMINDER_LABELS` | Labels that prevent reminders | `blocked,blocked-blocker,no-reminder` | Any issue with these labels skips reminders |
| `ASSIGN_ALLOWLIST` | Who can use `/assign` command | (Optional) Restrict to team | Controls who can self-assign issues |
| `DEFAULT_MAINTAINER` | Fallback reviewer if none matched | `@default-maintainer` | Ensures all PRs get reviewed |

**Viewing Variables**:
```
GitHub → Repo Settings → Environments → Production/Development
```

**Modifying Variables**:
Only repository admins can change these settings.

## Troubleshooting Automation

### Issue: Assignment Isn't Working

**Issue**: `/assign` command doesn't assign issue

**Possible Causes**:
1. User isn't in `ASSIGN_ALLOWLIST` (if configured)
2. Issue already assigned to someone else
3. Workflow is disabled or has errors

**Fix**:
1. Check if `ASSIGN_ALLOWLIST` restricts access
2. Unassign first if needed
3. Try command again
4. If persists, check `.github/workflows/issue-commands.yml` for errors

### Issue: Reminders Not Sending

**Issue**: Expected reminder didn't arrive after 7 days

**Possible Causes**:
1. Someone commented `/working` recently (resets timer)
2. Issue has `status: blocked` or similar label
3. PR is linked to issue
4. Issue is closed already

**Check**:
- Scroll through issue comments for recent `/working`
- Check issue labels
- Look for linked PRs in issue sidebar

### Issue: Reviewers Not Requested

**Issue**: Expected reviewer not added to PR

**Possible Causes**:
1. Reviewer not in `pathReviewers` or `defaultReviewers`
2. Reviewer is PR author (author excluded)
3. Reviewer already requested (duplicate prevention)
4. File path doesn't match any rules

**Fix**:
1. Check `.github/reviewers.json` configuration
2. Verify file paths match expected patterns
3. Manually request if needed

### Issue: Status Label Incorrect

**Issue**: PR has wrong status label

**Possible Causes**:
1. Workflow didn't evaluate state correctly
2. Label was manually removed
3. Timing issue (workflow hadn't run yet)

** Fix**:
1. Wait 1-2 minutes, refresh page
2. Check workflow run history in Actions tab
3. Manually correct label if needed

## Making Changes to Automation

If you need to modify workflow behavior:

### Before Making Changes

1. **Document the reason**: Why is this change needed?
2. **Plan the impact**: What PRs/issues will be affected?
3. **Test if possible**: GitHub supports `workflow_dispatch` for manual testing
4. **Notify team**: Let maintainers know about planned changes

### Making the Change

1. **Update `.github/workflows/*.yml` file(s)**:
   - Modify conditions, labels, or behavior
   - Test logic carefully (YAML syntax is strict)

2. **Update `.github/reviewers.json` (if applicable)**:
   - Add/modify path-to-reviewer mappings
   - Ensure JSON is valid

3. **Update this documentation**:
   - In the same PR, update this file (06-github-automation.md)
   - Explain what changed and why
   - Give examples if behavior is user-visible

4. **Include in same PR**:
   - Workflow changes
   - Configuration changes
   - Documentation updates
   - All together in one PR

### PR Requirements for Automation Changes

Your PR description must include:

```markdown
## Automation Change

### What's changing
[Description of workflow/configuration changes]

### Why
[Business reason or problem being solved]

### Impact on contributors
[How will this affect day-to-day contributor experience]

### Testing
[How was this tested/validated]

### Rollback plan (if needed)
[How to revert if issues arise]
```

## Example Workflows

### Contributor Workflow

From a contributor's perspective, here's the automated journey:

```
Day 1:
1. Open issue #123 about typo fix
2. Read instructions (automated guidance as first-timer)
3. Comment "/assign" → Issue assigned, becomes status: in-progress
4. Fork repo, fix typo, submit PR

Day 2:
* GitHub automation automatically:
  - Labels PR as `label: content`
  - Assigns PR to contributor (you)
  - Requests review from @content-editor and @maintainer1
  - Sets PR status to `status: in-review`

Day 3:
* Reviewer @content-editor approves PR
* Status changes to `status: approved`
* Maintainer merges PR
* Issue #123 closes automatically
* Status changes to `status: merged`

Result: PR is merged, issue closed, contributor gets credit!
```

### Maintainer Workflow

From a maintainer's perspective, here's what they see:

```
Daily:
* Run check: Are there stale issues?
* Workflow sends reminder comments to assignees
  (after 7 days with no /working comment)

During Code Review:
* Automation already assigned reviewers
* Maintainer focuses on code quality (automation handles logistics)
* Can override reviewer requirements if needed (in MAINTAINER_ALLOWLIST)

On Merge:
* Automation updates all related labels
* Issue closes automatically
* PR status set to merged
* Everything synced with no manual steps
```

## Best Practices for Maintainers

1. **Keep configuration DRY**: Don't repeat logic in multiple workflows
2. **Document changes**: Always update this guide when modifying automation
3. **Monitor workflow runs**: Check Actions tab for failures
4. **Respond to issues**: Automation enables tracking, but humans drive resolution
5. **Test changes**: Use `workflow_dispatch` when available before deploying
6. **Keep GitHub Actions up to date**: Periodically check for deprecated features
