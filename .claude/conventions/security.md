# Security Configuration for Claude Code

This document defines security rules and configurations for using Claude Code in Open Elements projects. The goal is to ensure Claude Code operates safely within the project boundary and never accesses or modifies sensitive data without explicit developer consent.

## Core Principles

- **Project boundary is sacred** — Claude Code must never modify files outside the project directory without explicit user confirmation.
- **No silent reads outside the project** — Files outside the project directory must not be read unless the developer explicitly asks for it or grants access.
- **Deny by default for sensitive paths** — Access to credentials, keys, and personal configuration is blocked by deny rules.
- **Layered defense** — Combine permission rules, sandbox mode, and hooks for defense in depth.

## Permission Configuration

Add these rules to `.claude/settings.json` (shared, committed to the repository) or `.claude/settings.local.json` (personal, gitignored).

### Recommended Deny Rules

Block access to credentials and sensitive configuration. These rules apply to all developers on the project:

```json
{
  "permissions": {
    "deny": [
      "Read(~/.ssh/**)",
      "Read(~/.gnupg/**)",
      "Read(~/.aws/**)",
      "Read(~/.azure/**)",
      "Read(~/.kube/**)",
      "Read(~/.docker/config.json)",
      "Read(~/.npmrc)",
      "Read(~/.pypirc)",
      "Read(~/.gem/credentials)",
      "Read(~/.git-credentials)",
      "Read(~/.config/gh/**)",
      "Read(~/.bashrc)",
      "Read(~/.zshrc)",
      "Read(~/.bash_profile)",
      "Read(~/.zprofile)",
      "Read(./.env)",
      "Read(./.env.local)",
      "Edit(~/.ssh/**)",
      "Edit(~/.gnupg/**)",
      "Edit(~/.aws/**)",
      "Edit(~/.azure/**)",
      "Edit(~/.kube/**)",
      "Edit(~/.docker/config.json)",
      "Edit(~/.npmrc)",
      "Edit(~/.bashrc)",
      "Edit(~/.zshrc)",
      "Edit(~/.bash_profile)",
      "Edit(~/.zprofile)",
      "Edit(./.env)",
      "Edit(./.env.local)",
      "Bash(rm -rf *)"
    ]
  }
}
```

What this blocks:
- **SSH/GPG keys** — `~/.ssh`, `~/.gnupg`
- **Cloud credentials** — `~/.aws`, `~/.azure`, `~/.kube`, `~/.docker/config.json`
- **Package registry tokens** — `~/.npmrc`, `~/.pypirc`, `~/.gem/credentials`
- **Git credentials** — `~/.git-credentials`, `~/.config/gh`
- **Shell configuration** — Prevents backdoor injection into `.bashrc`, `.zshrc`, etc.
- **Environment files** — `.env` and `.env.local` which may contain secrets. Note: `.env.example` is intentionally not blocked because it contains only placeholder values and is committed to the repository.
- **Destructive commands** — `rm -rf` requires manual alternatives

### What is NOT blocked

- Reading project files within the working directory — this is normal operation
- Reading files the developer explicitly asks Claude to look at (e.g., "read my ~/.gitconfig")
- Git operations within the project

## Sandbox Mode

For additional OS-level isolation, enable sandbox mode. This restricts file system access and network at the operating system level, not just at the tool level.

Add to `.claude/settings.json`:

```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "denyRead": [
        "~/.aws/credentials",
        "~/.ssh/**"
      ],
      "denyWrite": [
        "//etc",
        "//usr/local/bin"
      ]
    }
  }
}
```

Sandbox uses Seatbelt on macOS and bubblewrap on Linux for enforcement at the OS level. This catches cases where Bash commands might bypass tool-level permission rules.

## Hooks for Safety

Hooks can block dangerous operations before they execute and log actions for audit trails.

**Important**: Hook commands receive JSON input via **stdin**, not via environment variables. Use `jq` to extract fields like `tool_name` and `tool_input` from the JSON payload. For complex hooks, use separate script files in `.claude/hooks/` instead of inline commands to avoid shell escaping issues.

### Hook Scripts

The hook scripts are provided as ready-to-use files in the `hooks/` directory of this template:

- **`hooks/block-destructive-git.sh`** — Blocks force-pushes and `git reset --hard` (PreToolUse)
- **`hooks/log-activity.sh`** — Logs all tool calls with timestamp, tool name, and input to `claude.log` (PostToolUse)

When setting up a project, copy the `hooks/` directory to `.claude/hooks/` and add the following to `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/block-destructive-git.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/log-activity.sh"
          }
        ]
      }
    ]
  }
}
```

The log file `claude.log` is temporary and must be added to `.gitignore`. Requires `jq` to be installed.

**Important considerations for hook scripts:**
- Hook scripts must **never write to stdout** — stdout output is sent back to the API and can trigger content filters. Write only to files, and redirect errors to `/dev/null`.
- Truncate `tool_input` before logging — it can contain full file contents which are large and may contain patterns that trigger content filters.
- Always `exit 0` — a failing hook blocks Claude Code.

## Setup Checklist

When adding `claude-project-base` to a new project:

- [ ] Copy the deny rules into `.claude/settings.json`
- [ ] Copy `hooks/` directory from the template to `.claude/hooks/` (scripts are already executable)
- [ ] Add `.claude/settings.local.json` and `claude.log` to `.gitignore`
- [ ] Ensure `jq` is installed (required by hook scripts)
- [ ] Consider enabling sandbox mode for stricter isolation
- [ ] Review whether additional project-specific paths need to be denied (e.g., `./secrets/`, `./certs/`)
