---
name: update-claude-base
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Update the claude-project-base directory with the latest shared conventions and skills from the upstream repository, without overwriting project-specific customizations.
---

# Update Claude Base

Updates the `claude-project-base/` directory in the current project with the latest version from the upstream repository, preserving all project-specific content.

## Instructions

1. Locate the `claude-project-base/` directory in the project root. If it does not exist, inform the user and stop.

2. Clone the latest version of the upstream repository into a temporary directory:
   ```bash
   tmp_dir=$(mktemp -d)
   git clone --depth 1 https://github.com/OpenElementsLabs/claude-base.git "$tmp_dir"
   ```

3. Before updating, show the user a summary of what will be updated by comparing the current `claude-project-base/` with the upstream `claude-project-base/`:
   - List files that will be added (new upstream files)
   - List files that will be updated (changed upstream files)
   - List files that will be removed (deleted upstream files)
   - Explicitly note that `conventions/project-specific/` will NOT be touched

4. Ask the user for confirmation before proceeding.

5. Update all shared files by syncing from the temporary clone's `claude-project-base/` to the project's `claude-project-base/`, with these exclusions:
   - **Do NOT overwrite or delete** anything inside `conventions/project-specific/` — this directory contains project-specific content
   - **Do NOT overwrite or delete** any skills that do not exist in the upstream repository — these are project-specific skills

6. Clean up the temporary directory:
   ```bash
   rm -rf "$tmp_dir"
   ```

7. Show the user a summary of what was updated and remind them to review the changes with `git diff`.
