# Open Elements Documentation

## Overview

This `docs/` directory contains the authoritative contributor documentation for the Open Elements repository. It provides comprehensive guidance for contributing to this Next.js-based website project, which combines modern frontend development with markdown-driven content management.

## Target Audience

This documentation suite is designed for:

- **First-time Contributors**: Individuals new to the project who need foundational understanding of repository structure, workflows, and contribution processes
- **Maintainers & Onboarding Leads**: Team members responsible for evaluating contributions and guiding contributors through the review and deployment pipeline
- **Content & Engineering Contributors**: Developers and technical writers shipping content updates, page modifications, feature implementations, and ensuring quality standards are met

## Documentation Architecture

The following guides provide structured information organized by topic and use case:

| Document | Purpose | Audience |
|----------|---------|----------|
| [01 - Repository Overview](./01-repo-overview.md) | Comprehensive overview of project structure, technology stack, and architectural patterns | All contributors |
| [02 - Content Folder Guide](./02-content-folder.md) | Detailed explanation of content organization, markdown structure, and content management model | Content contributors, page editors |
| [03 - Adding Pages](./03-adding-pages.md) | Step-by-step guide to implementing new pages including routing, content, and component integration | Feature developers, content editors |
| [04 - First Contribution Checklist](./04-first-contribution-checklist.md) | Pre-submission validation checklist ensuring code quality, documentation completeness, and testing coverage | All contributors |
| [05 - Testing and Quality Checks](./05-testing-and-quality-checks.md) | Comprehensive guide to automated testing, linting, build validation, and quality assurance procedures | Developers, QA reviewers |
| [06 - GitHub Automation Guide](./06-github-automation.md) | Documentation of automated workflows, CI/CD processes, and GitHub Actions behavior | Maintainers, advanced contributors |
| [07 - Adding Blog Posts](./07-adding-blog-post.md) | Dedicated workflow for post creation in `content/posts/`, including front matter, URL rules, and linking conventions | Content contributors, editors |

## Getting Started: Recommended Reading Path

### For First-Time Contributors

To successfully onboard and make your first contribution, please follow this reading sequence:

1. **[01 - Repository Overview](./01-repo-overview.md)** (10 min)
   - Understand project structure and technology stack
   - Familiarize yourself with key directories and their purposes
   - Learn the hybrid content + code model

2. **[02 - Content Folder Guide](./02-content-folder.md)** (10 min)
   - Learn how content is organized and structured
   - Understand markdown frontmatter and metadata requirements
   - Discover content conventions and best practices

3. **[03 - Adding Pages](./03-adding-pages.md)** (10 min)
   - Follow the end-to-end workflow for adding new pages
   - Learn the integration pattern between content and routing
   - Understand asset management

4. **[07 - Adding Blog Posts](./07-adding-blog-post.md)** (5 min, when working on posts)
   - Learn the post-specific filename and front matter schema
   - Follow `/posts/...` routing conventions and linking rules
   - Avoid common metadata and visibility mistakes

5. **[04 - First Contribution Checklist](./04-first-contribution-checklist.md)** (5 min)
   - Validate your work before submitting a pull request
   - Ensure all quality gates are met
   - Review PR submission requirements

### For Reference During Implementation

Consult these documents as needed while actively developing:

- **[05 - Testing and Quality Checks](./05-testing-and-quality-checks.md)** - When running validation commands or debugging test failures
- **[06 - GitHub Automation Guide](./06-github-automation.md)** - When troubleshooting CI failures or understanding review workflows
- **[07 - Adding Blog Posts](./07-adding-blog-post.md)** - When adding or translating any file in `content/posts/`

## Local Development Environment

### Prerequisites

- **Node.js**: Compatible version as specified in `.nvmrc` or project lockfile
- **pnpm**: Package manager used across this project (install via `npm install -g pnpm`)
- **Git**: For version control and repository access

### Quick Start

Initialize the development environment and launch the application:

```bash
# Install all project dependencies
pnpm install

# Start the development server with hot-reload
pnpm run dev
```

Once the server is running, navigate to `http://localhost:3000` in your web browser to view the application.

**Development Server Details:**
- Hot Module Replacement (HMR) is enabled for rapid development iteration
- Changes to files are reflected immediately without full page reloads
- TypeScript type-checking occurs during compilation

### Production Build

To generate a production-optimized build:

```bash
pnpm run build
pnpm run start
```

## Code Quality and Validation

Before submitting a pull request, ensure all validation commands pass successfully:

### Linting and Code Style

```bash
pnpm run lint
```

Validates TypeScript code, enforces code style conventions, and detects potential issues using ESLint and project-configured rules. Fix automatically correctable violations:

```bash
pnpm run lint --fix
```

### Build Verification

```bash
pnpm run build
```

Compiles TypeScript, bundles assets, and generates the production-ready application. This ensures there are no build-time errors or type mismatches.

### End-to-End Testing

```bash
pnpm run test:e2e
```

Executes automated browser-based tests using Playwright. These tests validate critical user flows and ensure functionality works as expected across the application.

### Complete Validation Suite

Run all quality checks in sequence:

```bash
pnpm run lint && pnpm run build && pnpm run test:e2e
```

**Note:** Ensure all commands complete successfully before opening a pull request, as CI/CD will run these same checks as gate conditions.

## Documentation Maintenance and Updates

Documentation is a critical component of project maintainability and contributor experience. It must remain current and accurate.

### When to Update Documentation

Update documentation in this folder whenever you:

- **Modify Project Structure**: Changes to directory organization, file locations, or architectural layers
- **Update Contributor Workflows**: Changes to pull request processes, code review procedures, or deployment pipelines
- **Modify GitHub Automation**: Changes to Actions workflows, branch protection rules, or automated checks
- **Add New Tools or Dependencies**: Significant additions to the technology stack or development tooling
- **Change Deployment or Release Process**: Modifications to how code reaches production

### Documentation Update Requirements

All documentation updates must:

1. **Included in Same PR**: Documentation updates must be submitted in the same pull request as the associated code changes. Never separate documentation from implementation changes.

2. **Keep Examples Current**: Verify all code samples, command examples, file paths, and configuration snippets match the current state of the repository. Outdated examples create confusion and waste contributor time.

3. **Maintain Consistency**: Ensure documentation language, formatting, and terminology aligns with existing docs in this folder.

4. **Update Related Sections**: If you update one guide, check related guides for consistency. Cross-references must remain accurate.

### Example Scenarios

- **Adding a new configuration option?** → Update the relevant guide and include it in your PR alongside the code change
- **Changing CI workflow?** → Update `06-github-automation.md` in the same PR
- **Restructuring content organization?** → Update `02-content-folder.md` along with your code changes

## Common Workflow Patterns

### Contributing a Bug Fix

1. Read [01 - Repository Overview](./01-repo-overview.md) to locate the relevant code
2. Make your code changes and ensure they pass: `pnpm run lint && pnpm run build && pnpm run test:e2e`
3. Use [04 - First Contribution Checklist](./04-first-contribution-checklist.md) before submitting the PR

### Adding or Updating Content

1. Follow [02 - Content Folder Guide](./02-content-folder.md) for content structure
2. Study [03 - Adding Pages](./03-adding-pages.md) if adding new pages
3. Use [07 - Adding Blog Posts](./07-adding-blog-post.md) for any blog/article work in `content/posts/`
4. Verify quality with the validation commands
5. Reference [04 - First Contribution Checklist](./04-first-contribution-checklist.md) when ready to submit

### Implementing a Feature

1. Start with [01 - Repository Overview](./01-repo-overview.md)
2. Understand existing patterns in the codebase before implementing
3. For frontend changes, refer to component patterns and TypeScript conventions
4. Run full validation suite: `pnpm run lint && pnpm run build && pnpm run test:e2e`
5. Follow the checklist in [04 - First Contribution Checklist](./04-first-contribution-checklist.md)

## Support and Troubleshooting

- **Build or test failures?** → Consult [05 - Testing and Quality Checks](./05-testing-and-quality-checks.md)
- **Unsure about automation behavior?** → Review [06 - GitHub Automation Guide](./06-github-automation.md)
- **Need help with page structure?** → Check [03 - Adding Pages](./03-adding-pages.md) or [02 - Content Folder Guide](./02-content-folder.md)
- **Need help with post metadata or `/posts/...` links?** → Check [07 - Adding Blog Posts](./07-adding-blog-post.md)
- **Repository questions?** → See [01 - Repository Overview](./01-repo-overview.md) for architecture and structure details

## Additional Resources

- **[ADDING_PAGES.md](../ADDING_PAGES.md)** - Legacy documentation for reference (prefer the guides in this docs folder)
- **[README.md](../README.md)** - Project-level README with high-level overview
- **[GitHub Workflows](.github/workflows)** - Automated CI/CD pipeline definitions
