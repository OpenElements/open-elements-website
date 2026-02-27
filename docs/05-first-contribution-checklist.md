# 05 - First Contribution Checklist

## Purpose and Scope

This comprehensive checklist guides first-time contributors through the entire contribution workflow, from environment setup through PR submission and review collaboration. Following each step systematically ensures your contribution meets quality standards and minimizes back-and-forth with reviewers.

**Target Audience**: Developers making their first or second contribution to the Open Elements repository

**Expected Time**: 30-60 minutes from start to PR submission (varies by change complexity)

## Phase 1: Environment Setup & Preparation

### 1.1 Repository Access

- [ ] **Fork the repository** on GitHub to your personal account
- [ ] **Clone your fork locally**:
  ```bash
  git clone https://github.com/<your-username>/open-elements-website.git
  cd open-elements-website
  ```
- [ ] **Add upstream remote** to stay synced with main repository:
  ```bash
  git remote add upstream https://github.com/open-elements/open-elements-website.git
  ```
- [ ] **Verify remotes are configured**:
  ```bash
  git remote -v
  # Should show: origin (your fork) and upstream (main repo)
  ```

### 1.2 Dependency Installation

- [ ] **Check Node.js version** (use version specified in `.nvmrc`):
  ```bash
  node --version  # Should match .nvmrc
  ```
- [ ] **Install pnpm** (if not already installed):
  ```bash
  npm install -g pnpm
  pnpm --version
  ```
- [ ] **Install project dependencies**:
  ```bash
  pnpm install
  # Installs all packages from pnpm-lock.yaml for reproducibility
  ```

### 1.3 Development Environment Verification

- [ ] **Start the development server**:
  ```bash
  pnpm run dev
  ```
- [ ] **Access application locally**:
  - Open `http://localhost:3000` in your browser
  - Verify English homepage loads without errors
  - Check that `/de/` locale version loads
  - Confirm no console errors (F12 → Console tab)

- [ ] **Stop the server when ready**:
  ```
  Press Ctrl+C in terminal
  ```

## Phase 2: Issue Selection and Work Tracking

### 2.1 Select an Issue

- [ ] **Choose from available issues** (filter by `good first issue` label or `help wanted` tags)
- [ ] **Read the issue completely**:
  - Understand the problem statement
  - Review acceptance criteria
  - Check for linked documentation or resources
  - Look for implementation hints in comments

- [ ] **Verify assignment eligibility**:
  - Is the issue still open (not already assigned)?
  - Are you qualified to work on it?
  - Do you have questions or need clarification? Ask in issue comments before starting

### 2.2 Mark as Working (If Repository Uses This)

- [ ] **Comment `/working` on the issue** to signal to team and other contributors that you're actively working
  - This updates issue status and sets an activity marker
  - Prevents duplicate work by multiple contributors

- [ ] **If you get stuck or need to pause**:
  - Comment `/unassign` to free the issue for other contributors
  - Or communicate timeline in a comment

## Phase 3: Code Organization and Branching

### 3.1 Create a Focused Branch

- [ ] **Fetch latest changes**:
  ```bash
  git fetch upstream
  ```

- [ ] **Create a feature/fix branch** (requires: issue-id and clear description):

  **For bug fixes:**
  ```bash
  git checkout -b fix/issue-<id>-short-description
  # Example: fix/issue-123-missing-image-alt-text
  ```

  **For features/additions:**
  ```bash
  git checkout -b feat/issue-<id>-short-description
  # Example: feat/issue-456-newsletter-signup-page
  ```

  **For documentation:**
  ```bash
  git checkout -b docs/issue-<id>-short-description
  # Example: docs/issue-789-api-documentation
  ```

- [ ] **Branch naming conventions**:
  - ✅ `fix/issue-123-clear-description` - Good
  - ✅ `feat/issue-456-new-feature` - Good
  - ❌ `my-branch` - Unclear, no issue reference
  - ❌ `fix/stuff` - Too vague
  - ❌ `ISSUE-123-fix` - Wrong prefix format

### 3.2 Make Your Changes

- [ ] **Code discipline**:
  - Only modify files necessary for the specific change
  - Don't refactor existing code unless it's directly related to your issue
  - Don't update unrelated dependencies or configuration

- [ ] **Preserve project structure**:
  - Follow existing file naming conventions
  - Keep directory organization consistent
  - Reference [01 - Repository Overview](./01-repo-overview.md) for structure questions

- [ ] **Save your progress**:
  ```bash
  git add <modified-files>
  git add <new-files>
  ```

### 3.3 Commit Best Practices

- [ ] **Keep commits atomic** - one logical unit of work per commit

- [ ] **Use descriptive commit messages** in imperative mood:
  ```
  # ✅ Good commit messages:
  "Add newsletter signup form to homepage"
  "Fix typo in blog post URL slug"
  "Update German translation for team page"
  "Refactor markdown parser for better error handling"
  
  # ❌ Bad commit messages:
  "stuff"
  "wip"
  "fix bug"
  "changes"
  ```

- [ ] **Format with optional scope**:
  ```bash
  # Format: type(scope): message
  git commit -m "feat(about-page): add team member profiles"
  git commit -m "fix(i18n): correct German locale detection"
  git commit -m "docs(api): update endpoint examples"
  ```

- [ ] **Commit frequently** (not one giant commit with all changes):
  ```bash
  git commit -m "feat: create about page structure"
  git commit -m "feat: add team member components"
  git commit -m "docs: write German translations"
  # Better than one commit with all changes at once
  ```

## Phase 4: Implementation Discipline

### 4.1 Scope and Focus

- [ ] **Stick to the issue scope**:
  - Don't fix other bugs you notice unless explicitly asked
  - Don't refactor unrelated code
  - Don't update multiple unrelated features in one PR

- [ ] **Avoid scope creep**:
  - Focus on one concern per PR
  - If you discover additional work needed, document it in a comment and link as a follow-up issue

### 4.2 Localization Requirements

- [ ] **For content changes**:
  - Update BOTH English and German versions if they exist
  - Keep translations structurally parallel
  - Translate titles and descriptions properly (don't just duplicate EN)

- [ ] **For UI changes affecting users**:
  - Check if strings need translation in `locales/en.json` and `locales/de.json`
  - Update both locale files together

- [ ] **When unsure about localization**:
  - Add a note in your PR description
  - Ask reviewers for guidance

### 4.3 File and Naming Conventions

- [ ] **Preserve existing conventions**:
  - Keep kebab-case for file/folder names: `getting-started`, not `gettingStarted`
  - Keep PascalCase for React components: `MyComponent.tsx`, not `my-component.tsx`
  - Don't introduce new naming schemes

- [ ] **Content file alignment**:
  - Ensure `content/<slug>/` matches `src/app/[locale]/<slug>/`
  - Ensure front matter URLs match route structure

## Phase 5: Quality Validation

### 5.1 Pre-Push Validation (Mandatory)

Before pushing your branch, run these quality checks locally:

- [ ] **Linting and code style**:
  ```bash
  pnpm run lint
  # Fixes issues automatically where possible
  pnpm run lint --fix
  ```
  - ❌ **Do not commit** if lint fails
  - ✅ Fix issues and re-run until it passes

- [ ] **Production build verification**:
  ```bash
  pnpm run build
  # Takes 1-5 minutes
  # Should complete with "✓ Build complete"
  ```
  - ❌ **Do not commit** if build fails
  - ✅ Check TypeScript errors and fix before pushing

### 5.2 End-to-End Testing (Conditional)

Run E2E tests when your changes affect:
- Routes or navigation
- Locale/language switching
- Markdown-to-page rendering
- Page metadata or SEO
- Interactive components or forms

**Run E2E tests:**
```bash
pnpm run test:e2e
# Launches Playwright browser automation tests
# Takes 2-5 minutes
```

**When NOT required:**  
- Simple typo fixes in blog posts
- Dependency updates without API changes
- Documentation-only updates
- CSS-only styling changes

### 5.3 Manual Testing Checklist

- [ ] **Manually verify your changes**:
  - Navigate to pages affected by your changes
  - Test in both English (`/path`) and German (`/de/path`)
  - Check on mobile viewport (F12 → Device mode)
  - Verify no console errors (F12 → Console)
  - Check links are clickable and navigate correctly

- [ ] **Spot-check edge cases**:
  - Missing images or assets display with fallbacks
  - Very long text doesn't break layouts
  - Responsive design works at different screen sizes

## Phase 6: Pull Request Creation

### 6.1 Push Your Branch

- [ ] **Verify local commits are ready**:
  ```bash
  git log --oneline -5  # Review your recent commits
  ```

- [ ] **Push your branch**:
  ```bash
  git push origin <your-branch-name>
  # Example: git push origin fix/issue-123-missing-alt-text
  ```

- [ ] **If pushing for the first time**, Git provides a URL to create a PR - use it, or create manually on GitHub

### 6.2 Write Comprehensive PR Description

Use this template for your PR description:

```markdown
## Description
Brief explanation of what this PR does and why.

**Fixes** #<issue-number>

## Changes Made
- Change 1 (specifically what was changed)
- Change 2 (specifically what was changed)
- File structure: `src/...`, `content/...`, etc.

## Testing
- [ ] `pnpm run lint` - passed without errors
- [ ] `pnpm run build` - completed successfully
- [ ] `pnpm run test:e2e` - all tests pass (if applicable)
- [ ] Manual testing: [describe what you tested locally]

## Screenshots (if applicable)
[Add screenshots for UI/visual changes]

## Localization
- [ ] English version complete
- [ ] German translation complete (if needed)
- [ ] Both language versions verified
- [ ] URLs match locale structure

## Checklist
- [ ] Code follows project conventions
- [ ] No unrelated changes included
- [ ] Changes are minimal and focused
- [ ] All quality checks pass
```

### 6.3 Choose Initial PR State

- [ ] **For straightforward changes**: Open as a regular PR
  - Mark as "Ready for review" if everything looks good
  - Reviewers will be assigned automatically

- [ ] **For complex changes needing feedback**:
  - Open as "Draft PR" first
  - Add comment requesting preliminary feedback
  - Maintainers can review and suggest improvements before formal review
  - Convert to "Ready for review" when ready

### 6.4 Link Issue Properly

- [ ] **Use proper linking syntax** in PR description:
  ```markdown
  Fixes #123
  # or
  Closes #456
  # or
  Resolves #789
  ```
  - This automatically closes the issue when PR is merged
  - Reviewers can easily navigate to issue context

## Phase 7: Reviewer Collaboration

### 7.1 Responding to Review Comments

- [ ] **Read all comments** completely before responding

- [ ] **When feedback requires code changes**:
  - Make focused, minimal changes addressing the specific feedback
  - Commit with descriptive message: `refactor: address review feedback on X`
  - Push the commit - PR updates automatically
  - Reply to the comment explaining what was changed

- [ ] **When you disagree with feedback**:
  - Respond professionally with your reasoning
  - Link to relevant code or documentation
  - Suggest alternative solutions
  - If unresolved, ask maintainers for decision

- [ ] **When you need clarification**:
  - Ask specific questions in comment replies
  - Provide code examples or context
  - Don't make assumptions

### 7.2 Approval and Merging

- [ ] **Maintainers approves your PR**
  - GitHub notifies you of approval
  - CI/CD checks must pass

- [ ] **Don't merge manually** - maintainers handle merging to ensure:
  - Proper branch configuration
  - CI/CD green status
  - Linear commit history

- [ ] **After merge**:
  - PR is closed automatically
  - Linked issue closes automatically
  - Your branch can be safely deleted
  - Your contribution is now live! 🎉

## Common Mistakes to Avoid

| Mistake | Impact | Prevention |
|---------|--------|-----------|
| Editing generated files in `public/` as source | Changes are overwritten on rebuild | Edit source files only (`content/`, `src/`) |
| Updating only English when German needed | Localization breaks, site becomes EN-only | Check if file has `.de.md` version, update both |
| Route/content path mismatch | 404 errors, page doesn't load | Ensure `src/app/[locale]/<slug>/` matches `content/<slug>/` |
| Opening PR without running validation | CI/CD fails, delays merge | Always run `pnpm run lint && pnpm run build` before pushing |
| Vague commit messages | Confusing history, hard to debug | Use descriptive, imperative commit messages |
| Scope creeping (fixing unrelated issues) | PR becomes complex, delays review | Stay focused on one issue per PR |
| Ignoring lint errors | Code style inconsistent, CI fails | Run `pnpm run lint --fix` before committing |
| No branch protection checks | Broken main branch | Wait for CI/CD to pass before merge |

## Quick Reference

**Complete workflow at a glance:**
```bash
# 1. Setup
git clone <fork> && cd project
pnpm install && pnpm run dev

# 2. Work
git checkout -b fix/issue-123-description
# ... make changes ...
pnpm run lint && pnpm run build && pnpm run test:e2e

# 3. Commit
git add .
git commit -m "fix: description of change"
git push origin fix/issue-123-description

# 4. PR
# Create PR on GitHub with detailed description
# Respond to review feedback
# Maintainers merge when ready
```

## Getting Help

- **Questions about the process?** → Comment on your PR
- **Stuck on implementation?** → Check [01 - Repository Overview](./01-repo-overview.md)
- **Content structure unclear?** → See [02 - Content Folder Guide](./02-content-folder.md)
- **Adding a new page?** → Follow [03 - Adding Pages](./03-adding-pages.md)
- **Build or test failures?** → Check [06 - Testing and Quality Checks](./06-testing-and-quality-checks.md)
