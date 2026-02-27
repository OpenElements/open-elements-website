# 06 - Testing and Quality Checks

## Overview

Quality assurance is a shared responsibility. Before submitting a PR, you must validate your changes through automated and manual testing to ensure:

- Code meets style and quality standards (linting)
- Application builds without errors (compilation)
- Functionality works as expected (end-to-end testing)
- User experience is intact (manual verification)

This guide explains each quality check, when it's required, how to run it, and how to debug common failures.

## Quality Assurance Philosophy

### Definition of "Review-Ready"

A pull request is considered review-ready only when ALL of the following are true:

1. **Linting passes**: Code style is consistent, no static analysis issues detected
2. **Build succeeds**: TypeScript compiles without errors, assets bundle correctly
3. **Affected behavior validated locally**: Changes are manually tested in the browser
4. **E2E coverage executed** (when applicable): Critical user flows are validated by automated browser tests
5. **No unintended changes**: Only files necessary for the fix/feature are modified

### Responsibility Model

- **Developer**: Runs all checks locally before pushing, ensures everything passes
- **CI/CD**: Automatically re-runs all checks on every PR push as a safety net
- **Code Reviewers**: Examine code logic, architecture, and implementation quality

If any check fails in CI/CD, the PR cannot be merged until fixed.

## Mandatory Quality Checks

These checks are required for every PR:

### 1. Linting (ESLint + TypeScript Checker)

**Purpose**: Ensures code style consistency, detects potential bugs, enforces best practices

**Run locally:**
```bash
pnpm run lint
```

**What it checks:**
- TypeScript syntax and type correctness
- Code style violations (indentation, spacing, naming)
- Unused variables and imports
- Potential logic errors
- Security issues

**Output examples:**

✅ **Success:**
```
✔ No issues found
```

❌ **Failure example:**
```
src/components/Header.tsx:45:5
  47:5  error  'unusedVar' is defined but never used  @typescript-eslint/no-unused-vars
```

**How to fix linting errors:**

```bash
# Auto-fix correctable issues
pnpm run lint --fix

# For remaining errors, fix manually:
# - Read the error message carefully
# - Go to the specified file and line
# - Correct the issue
# - Run lint again to verify
```

**Common lint errors:**
| Error | Meaning | Fix |
|-------|---------|-----|
| `Unused import` | Import brought into file but not used | Remove the import statement |
| `Missing return type` | Function lacks TypeScript return type annotation | Add `: ReturnType` to function signature |
| `Unused variable` | Variable declared but never referenced | Remove declaration or use the variable |
| `Property does not exist` | Accessing non-existent property on object | Check object type/structure definition |

### 2. Build Verification

**Purpose**: Ensures the entire application compiles and bundles correctly for production

**Run locally:**
```bash
pnpm run build
# Takes 2-5 minutes on first run
# Much faster on subsequent runs due to caching
```

**What it does:**
1. Compiles all TypeScript to JavaScript
2. Processes CSS and Tailwind utilities
3. Optimizes and bundles assets
4. Generates all Next.js routes
5. Prepares for production deployment

**Output examples:**

✅ **Success:**
```
✓ Build complete!
✓ Generated .next folder ready for deployment
```

❌ **Failure example:**
```
ERROR in src/app/[locale]/page.tsx
Type 'string' is not assignable to type 'number'
```

**How to fix build errors:**
```bash
# 1. Read the error message - points to file and line
# 2. Check the type mismatch
# 3. Fix TypeScript types
pnpm run build  # Re-run to verify fix
```

**Common build errors:**
| Error | Meaning | Fix |
|-------|---------|-----|
| `Cannot find module` | Import references non-existent file | Verify file path and extension |
| `Type 'X' is not assignable to type 'Y'` | Passing wrong type | Check parameter types match function signature |
| `Element type 'string' cannot be JSX` | React component error | Ensure calling valid React components, not strings |
| `Unexpected token` | Syntax error in code | Check syntax near the error line |

### 3. End-to-End (E2E) Testing - When Required

**Purpose**: Validates critical user workflows through automated browser automation using Playwright

**Run locally:**
```bash
pnpm run test:e2e
# Takes 2-5 minutes
# Opens real browser instances and runs test scripts
```

**Important**: E2E testing is conditional - only required for certain types of changes (see below)

#### When E2E Testing is MANDATORY

Run `pnpm run test:e2e` when your PR changes ANY of:

1. **Routing and Navigation**
   - New routes added (`src/app/[locale]/...`)
   - URL paths changed
   - Route parameters modified
   - Redirects or rewrite rules added

2. **Locale and Language Switching**
   - Locale detection logic changed
   - Language switcher modified
   - i18n routing configuration updated
   - Multi-locale page rendering changed

3. **Content Rendering**
   - Markdown parser modified
   - Front matter processing changed
   - Page rendering logic altered
   - Content loading mechanism changed

4. **Forms and Interactive Components**
   - Form submission flow changed
   - Input validation modified
   - Event handlers added/changed
   - State management modified

5. **Metadata and SEO**
   - Page titles/descriptions changed dynamically
   - Open Graph tags modified
   - Canonical URLs updated
   - meta tags generation logic altered

#### When E2E Testing is NOT Required

E2E testing can be skipped for:

- Simple typo fixes in blog content
- Visual styling changes (CSS-only, no HTML structure change)
- Update to dependencies without API changes
- Documentation-only changes
- Changes to build configuration/non-user-facing files
- Linting rule adjustments

#### Understanding E2E Test Results

✅ **All tests pass:**
```
✔ 42 tests passed
Test run duration: 2m 34s
```

❌ **Test failures:**
```
✗ Homepage loads in English
  Error: Page title should be "Home" but was "404"
  
✗ German translation loads correctly  
  Error: Timed out waiting for element [data-testid="de-content"]
```

**How to fix E2E failures:**

1. **Identify which test failed** - read the error message
2. **Understand what it was testing** - navigate to `tests/e2e/` and find the test file
3. **Run the scenario manually** in your browser locally
4. **Debug the issue** - is it rendering, timing, or logic?
5. **Make the fix** in your code
6. **Re-run E2E** to verify: `pnpm run test:e2e`

## Manual Verification Checklist

Automated tests can't catch everything. Manual verification is essential:

### Visual and Functional Checks

- [ ] **Page rendering**: Open the page in browser and visually inspect
  - Does it match expected layout?
  - Are colors, fonts, spacing correct?
  - Do responsive breakpoints work (test mobile, tablet, desktop)?

- [ ] **Navigation**: Test all links and navigation
  - Internal links navigate correctly
  - External links open in new tab
  - Back button works
  - No broken links

- [ ] **Content accuracy**: 
  - Titles and descriptions are correct
  - Text is properly formatted
  - Images display with correct alt text
  - No typos or grammatical errors

- [ ] **Multi-locale testing**:
  - English version loads: `http://localhost:3000/path`
  - German version loads: `http://localhost:3000/de/path`
  - Both render correctly without console errors
  - Language switcher (if present) changes locale

- [ ] **Assets and media**:
  - All images load (no broken image icons)
  - Alt text is present and descriptive
  - Thumbnails properly sized
  - Videos/embedded content plays

- [ ] **Browser console**:
  - Open DevTools (F12)
  - Go to Console tab
  - No red errors or warnings specific to your changes
  - Network tab shows all assets loaded (200/304 status codes, no 404s)

- [ ] **Responsive design**:
  - Test at mobile width (375px)
  - Test at tablet width (768px)
  - Test at desktop width (1440px)
  - Content is readable at all sizes, no overflow

### Test Scenarios by Change Type

**Adding a new page:**
- [ ] Route loads at both EN and DE URLs
- [ ] Page title and description are in browser tab
- [ ] All links on the page work
- [ ] Images load correctly
- [ ] No TypeScript errors in console
- [ ] Page renders properly on mobile

**Updating content (markdown):**
- [ ] Updated text renders correctly
- [ ] Links still work
- [ ] Images display properly
- [ ] EN and DE versions both updated
- [ ] Build completes without errors

**Changing navigation/routing:**
- [ ] All navigation links go to correct pages
- [ ] EN and DE routing works
- [ ] No 404 errors
- [ ] URL structure is logical

**CSS/styling changes:**
- [ ] Changes display as intended
- [ ] No layout breakage
- [ ] Works at mobile, tablet, desktop sizes
- [ ] Other pages not affected

## High-Risk Change Areas

Extra caution required when modifying these areas:

| Area | Risk | What Can Break | Prevention |
|------|------|-----------------|------------|
| `src/app/[locale]/...` route files | CRITICAL | Page routing, SSR, metadata, i18n | Test both EN/DE, run E2E |
| `content/` markdown files | HIGH | URL routing, front matter parsing, SEO | Validate front matter, test rendering |
| `src/i18n/` locale configuration | CRITICAL | Language detection, routing, all pages | Test EN and DE on all pages |
| `.github/workflows/` CI/CD files | CRITICAL | Automation, deployment, code quality gates | Understand GitHub Actions syntax, test locally if possible |
| `next.config.js`, `tsconfig.json` | HIGH | Build process, type checking, compilation | Run full build after changes |
| Component rendering logic | HIGH | Page display, data binding, state management | Manual testing of affected components |

## Common Failure Patterns

Learn to recognize and fix these recurring issues:

### Pattern 1: Invalid Markdown Front Matter

**Symptom**: Build fails with "Invalid front matter" error

**Cause**: YAML syntax error (bad indentation, missing quotes, invalid structure)

**Example broken front matter:**
```yaml
---
title: "My Page"
description: This is missing quotes
keywords: [keyword1 keyword2]  # Error: missing quotes around keywords
url: /my-page
---
```

**Fix**: Validate YAML structure
```yaml
---
title: "My Page"
description: "This is properly quoted"
keywords: ["keyword1", "keyword2"]
url: "/my-page"
---
```

### Pattern 2: File Naming Mismatch

**Symptom**: Page doesn't load or returns 404

**Causes**: 
- `index.md` exists but missing `index.de.md`
- Route path doesn't match content slug
- Wrong file extension

**Example wrong:**
```
content/about/
  ├── index.md
  └── about.de.md  # ERROR: should be index.de.md

src/app/[locale]/about-us/page.tsx  # ERROR: should be about/, not about-us/
```

**Fix**: Ensure consistency
```
content/about/
  ├── index.md
  └── index.de.md  # Correct

src/app/[locale]/about/page.tsx  # Matches content slug
```

### Pattern 3: Broken Asset References

**Symptom**: Images don't load or 404 errors on images

**Causes**:
- Using filesystem path instead of web path
- Incorrect path including `public/` prefix
- Typo in asset filename or path

**Example wrong markdown:**
```markdown
![Image](./public/images/hero.png)  # ERROR: wrong path
![Image](public/images/hero.png)    # ERROR: includes public/
```

**Fix**: Use web paths only
```markdown
![Image](/images/hero.png)  # Correct
```

### Pattern 4: Route/Content Slug Mismatch

**Symptom**: Page content doesn't load or shows wrong content

**Cause**: Route name doesn't match content directory name

**Example wrong:**
```
content/getting-started/index.md
src/app/[locale]/gettingstarted/page.tsx  # ERROR: missing hyphen

# URLs:
# Browser: /getting-started
# Route: /gettingstarted
# MISMATCH!
```

**Fix**: Ensure names align
```
content/getting-started/index.md
src/app/[locale]/getting-started/page.tsx

# URLs: /getting-started (works!)
```

### Pattern 5: Untested Locale Rendering

**Symptom**: English works but German page 404s or shows wrong content

**Cause**: Only updated English version, missed German in multi-locale change

**Example wrong:**
```
# Updated:
content/about/index.md          # ✅ English updated
content/about/index.de.md       # ❌ German NOT updated

# Result:
/about           # ✅ Works (English)
/de/about        # ❌ 404 (German file missing)
```

**Fix**: Update both versions
```
content/about/index.md          # ✅ English
content/about/index.de.md       # ✅ German

# Both URLs work!
```

## PR Evidence and Documentation

### What to Include in PR Description

Use your PR description to document testing:

**Template:**

```markdown
## Testing Evidence

**Commands executed:**
```bash
✅ pnpm run lint → PASSED
✅ pnpm run build → PASSED  
✅ pnpm run test:e2e → PASSED (4 new tests, 38 total pass)
```

**Manual testing:**
- [ ] English version tested: `/path`
- [ ] German version tested: `/de/path`
- [ ] Mobile responsive verified (375px)
- [ ] Console has no errors
- [ ] All links functional
- [ ] Images load correctly

**Pages tested:** 
- Homepage
- Blog page
- New page (if added)

## Build Troubleshooting Reference

**If you encounter build issues, use this debug flow:**

1. **Run build and capture full error**:
   ```bash
   pnpm run build 2>&1 | tee build.log
   # Saves error to build.log for review
   ```

2. **Identify error location** - check file and line number

3. **Categorize the error**:
   - TypeScript type error → Check type definitions
   - Missing import → Check path and file exists
   - Syntax error → Check code syntax near line number
   - Build configuration → Check webpack/Next.js config

4. **Make minimal fix** and re-test

5. **If still stuck** → Include build.log output in your PR comments asking for help
