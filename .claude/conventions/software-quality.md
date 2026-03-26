# Software Quality and Architecture Conventions for Claude Code

## API Design

- **IMPORTANT**: Define clean, minimal public APIs. Expose only what consumers need and hide all implementation details behind private or package-private access.
- Use language features to enforce encapsulation (Java modules, package-private classes, internal packages). The goal is that implementation details are not just undocumented but truly inaccessible.
- API design, modularization, meaningful abstractions, and configurability have the highest priority. Software from Open Elements stands out through quality in these areas.
- Follow the principle of convention over configuration — provide sensible defaults, but allow overriding where needed.
- **IMPORTANT**: Never expose API solely for testing purposes. Tests should exercise the public API as a consumer would. Prefer more complex tests over polluting the API with test-only entry points.

## Technical Integrity

- **IMPORTANT**: Do not implement features that cannot be done correctly. Open Elements does not ship solutions that only work in 60% of cases or that are known to cause problems in the future.
- If a requirement cannot be met with a clean technical solution, raise the concern rather than building a workaround.

## Namespace

- The base namespace for all Open Elements projects is `com.openelements` (Java packages) / `com.open-elements` (other contexts).

## Build Metadata

- Build tool configurations (Maven `pom.xml`, `package.json`, etc.) must include meaningful project metadata: name, description, URL, license, and developer information.
- **IMPORTANT**: For the project URL (e.g., `<url>` in Maven `pom.xml`), try to read it from the Git remote (`git remote get-url origin`) and convert it to the corresponding GitHub web URL. If no Git remote is configured, **ask the user** for the correct URL. Never guess or assume a repository URL.
- This metadata is used for generated artifacts, SBOM generation, and repository listings.

## Software Bill of Materials (SBOM)

- All products must produce an SBOM in CycloneDX format as part of the build process.
- For Maven projects, use the [CycloneDX Maven Plugin](https://github.com/CycloneDX/cyclonedx-maven-plugin) (`org.cyclonedx:cyclonedx-maven-plugin`). Include it in the `<build><plugins>` section of the POM so that the SBOM is generated automatically during every build.
- SBOMs should be uploaded to the Open Elements Dependency-Track instance for vulnerability tracking and compliance.

## Continuous Integration

- Use GitHub Actions to build and test code automatically.
- Pull requests must be built and tested before merging. At minimum, run the full test suite and verify the build succeeds.
- Keep CI pipelines fast. Fail early on compilation or lint errors before running the full test suite.
