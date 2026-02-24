# 06 - GitHub Automation Guide

This repository uses GitHub Actions for issue and PR automation.

## Issue-side automation

- `/assign` - assign issue based on repo rules
- `/working` - marks active work and updates working marker
- `/unassign` - removes assignee and reopens availability when none remain
- Reminder workflow pings stale assigned issues with no recent `/working`
- First-timer guidance is posted for qualifying assignees

## PR-side automation

- Auto labels based on changed files
- Auto assignee set to PR author
- Reviewer requests driven by `.github/reviewers.json`
- Reviewer enforcement rules apply based on maintainer allowlist
- Status labels are synced from PR state/review state

## Labels and status lifecycle

- Issues use status labels such as triage/in-progress/blocked/closed
- PRs use draft/in-review/approved/changes-requested/merged/closed

## Maintainer-controlled config

- Reviewer config: `.github/reviewers.json`
- Workflow files: `.github/workflows/*.yml`

If you are not a maintainer, avoid changing reviewer policy files unless asked in an issue.

