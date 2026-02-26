---
outdated: false
showInBlog: true
title: "Using Maveniverse Toolbox in Initializer for Apache Maven™"
date: 2026-02-26
author: noah
excerpt: "Initializer for Apache Maven™ uses Maveniverse Toolbox for programmatic Maven project generation. This post explains why we chose it and how it helps with version resolution and POM editing."
categories: [open-source, support-and-care, maven]
preview_image: "/posts/preview-images/build-pink.svg"
---

# Using Maveniverse Toolbox in Initializer for Apache Maven™

[Initializer for Apache Maven™](https://maven-starter.io/) helps you bootstrap production-ready Maven-based Java projects: a well-structured `pom.xml`, sensible defaults, and up-to-date dependencies in one click. Under the hood, the backend relies on **[Maveniverse Toolbox](https://github.com/maveniverse/toolbox)** for the Maven-heavy work. This short post is about that choice and where it fits.

## The problem: programmatic Maven project generation

The core challenge is **programmatic Maven project generation**: producing a full, valid Maven project (directory layout, `pom.xml`, Maven Wrapper, README) from code, based on user choices in the web UI. We don't just fill in a static template, we need to create and edit the POM dynamically (add dependencies, plugins, and properties), resolve real versions from Maven repositories, and ensure the result is a valid, buildable project every time. Doing that reliably and maintainably meant we had to choose how to handle the Maven-specific logic (POM model, version resolution, session handling) instead of reimplementing or gluing it ourselves.

## Why the Toolbox?

We needed a way to generate and edit POMs programmatically, resolve dependency and plugin versions from Maven repositories, and keep the logic maintainable. After evaluating archetype components and custom template engines, we chose **Maveniverse Toolbox**: a library from the Apache Maven™ ecosystem that offers a Java DSL for POM creation and editing, plus version resolution. It's actively maintained and keeps Maven-specific details in one place instead of scattering them across our codebase.

The Toolbox gives us methods like `addDependencies` and a clear editing model (e.g. transactional sessions so the POM stays valid), which made it straightforward to implement our generation pipeline.

## Version resolution: how the Toolbox helps

Generated projects should use **current stable versions** of dependencies and plugins, not hard-coded ones. We need to query Maven repositories (e.g. Maven Central) and pick the newest non-snapshot version. The Toolbox gives us exactly that through `ToolboxResolver`, which we obtain from `ToolboxCommando`.

Our `ArtifactVersionService` wraps the resolver and exposes methods like `resolveLatestDependencyVersion` and `resolveLatestPluginVersion`. Under the hood we call `findNewestVersion` with an artifact coordinate and a version matcher that excludes snapshots and previews:

```java
private static final ArtifactVersionMatcher VERSION_MATCHER =
    ArtifactVersionMatcher.noSnapshotsAndPreviews();

private String resolveLatestVersion(
    String groupId, String artifactId, String classifier, String extension) {
  Version newestVersion =
      toolboxResolver.findNewestVersion(
          new DefaultArtifact(groupId, artifactId, classifier, extension, "LATEST"),
          VERSION_MATCHER);
  return newestVersion != null ? newestVersion.toString() : "TODO";
}
```

So for each dependency or plugin we add to the generated POM, we first resolve its latest version via the Toolbox; the resolver talks to the configured repositories and returns a single version string we can plug into the POM. No manual HTTP calls or metadata parsing—the Toolbox encapsulates that.

## POM generation and editing: how the Toolbox helps

Building the POM is the other half: we start from a minimal `pom.xml` (group, artifact, version) and then add properties, dependency management, dependencies, and plugins. Here we use a **combination of two tools**: the Toolbox provides the **edit session** (create, commit, rollback), while the actual POM editing API comes from **[domtrip](https://github.com/maveniverse/domtrip)**. The Toolbox uses domtrip under the hood: the callback you pass to `editPom` receives a `PomEditor`, which is a class from **domtrip-maven** (the Maven-specific part of domtrip). So if you need to edit XML in general, domtrip can help; for Maven POMs and Maven-specific operations, **domtrip-maven** is the right fit.

We create a session with `toolboxCommando.createEditSession(pomFile)` and pass one or more editors to `editPom`. Each editor receives a `PomEditor` (from domtrip-maven) and can set packaging, update properties, insert elements, add dependencies, and configure plugins.

```java
try (ToolboxCommando.EditSession editSession = toolboxCommando.createEditSession(pomFile)) {
    toolboxCommando.editPom(
            editSession,
            Collections.singletonList(
                    editor -> {
                        editor.setPackaging("jar");
                        editor.properties()
                                .updateProperty(true, "maven.compiler.release", request.getJavaVersion());
                        editor.properties().updateProperty(true, "project.build.sourceEncoding", "UTF-8");
                        editor.insertMavenElement(editor.root(), "description", request.getDescription());

                        // add dependency management
                        var root = editor.root();
                        var dm = editor.findChildElement(root, MavenPomElements.Elements.DEPENDENCY_MANAGEMENT);
                        if (dm == null) {
                            dm = editor.insertMavenElement(root, MavenPomElements.Elements.DEPENDENCY_MANAGEMENT);
                        }
                        var dmsTmp = editor.findChildElement(dm, MavenPomElements.Elements.DEPENDENCIES);
                        if (dmsTmp == null) {
                            dmsTmp = editor.insertMavenElement(dm, MavenPomElements.Elements.DEPENDENCIES);
                        }
                        final var dms = dmsTmp;
                        var bom = new MavenDependency("org.junit", "junit-bom", DependencyType.BOM, artifactVersionService);
                        var depEl = editor.insertMavenElement(dms, MavenPomElements.Elements.DEPENDENCY);
                        editor.insertMavenElement(depEl, MavenPomElements.Elements.GROUP_ID, bom.groupId());
                        editor.insertMavenElement(depEl, MavenPomElements.Elements.ARTIFACT_ID, bom.artifactId());
                        editor.insertMavenElement(depEl, MavenPomElements.Elements.VERSION, bom.version());
                        editor.insertMavenElement(depEl, MavenPomElements.Elements.TYPE, "pom");
                        editor.insertMavenElement(depEl, MavenPomElements.Elements.SCOPE, "import");

                        // add dependency
                        var depsTmp = editor.findChildElement(root, MavenPomElements.Elements.DEPENDENCIES);
                        if (depsTmp == null) {
                            depsTmp = editor.insertMavenElement(root, MavenPomElements.Elements.DEPENDENCIES);
                        }
                        final var deps = depsTmp;
                        var dependency = new MavenDependency("org.junit.jupiter", "junit-jupiter", DependencyType.JAR, null);
                        var depEl2 = editor.insertMavenElement(deps, MavenPomElements.Elements.DEPENDENCY);
                        editor.insertMavenElement(depEl2, MavenPomElements.Elements.GROUP_ID, dependency.groupId());
                        editor.insertMavenElement(depEl2, MavenPomElements.Elements.ARTIFACT_ID, dependency.artifactId());
                        editor.insertMavenElement(depEl2, MavenPomElements.Elements.SCOPE, "test");
                        if (!dependency.isManagedByBom()) {
                            editor.insertMavenElement(depEl2, MavenPomElements.Elements.VERSION, dependency.version());
                        }

                        // add plugin
                        var plugin = new MavenPlugin(
                                "org.apache.maven.plugins", "maven-clean-plugin", artifactVersionService);
                        editor.plugins().updatePlugin(true, Coordinates.of(
                                plugin.groupId(), plugin.artifactId(), plugin.version(), "", "maven-plugin"));
                    }));
}
```

Adding a dependency is done by finding or creating the `<dependencies>` element and inserting `<dependency>` children with `<groupId>`, `<artifactId>`, `<scope>`, and optionally `<version>` (when not managed by a BOM). domtrip-maven's `PomEditor` and Maven element helpers keep the structure valid and avoid manual XML string building. Plugin coordinates (including versions we resolved earlier) are applied with `updatePlugin`.

To make the benefit concrete: we start from a **minimal POM** (only model version and GAV) and the Toolbox edit session turns it into a **full, build-ready POM**. Here is the same project before and after.

**Before — minimal POM written to disk, then passed to the Toolbox edit session:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>dev.parsick.maven.samples</groupId>
    <artifactId>simple-single-module-project</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</project>
```

**After — POM once the Toolbox (and domtrip-maven) edit session has run** (same project; packaging, name, description, properties, dependency management, dependencies, and plugins added with resolved versions):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>dev.parsick.maven.samples</groupId>
    <artifactId>simple-single-module-project</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>My maven project</name>
    <description>This is a test</description>
    <properties>
        <maven.compiler.release>25</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.junit</groupId>
                <artifactId>junit-bom</artifactId>
                <version>6.0.2</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-clean-plugin</artifactId>
                <version>3.5.0</version>
            </plugin>
        </plugins>
    </build>
</project>
```

So the flow is: resolve versions with the Toolbox → write minimal POM → edit in one session with the Toolbox (and domtrip-maven) → formatted, build-ready POM on disk.

For a concise picture of how the Initializer is structured and how the Toolbox fits next to the REST API, project generation, and config, see the **[architecture overview in our technical documentation](https://support-and-care.github.io/maven-initializer/architecture/)**. There you'll find high-level diagrams, the end-to-end generation flow, and pointers to the ADRs (including the decision to use the Toolbox).

## Try It and Read More

- **Use the app:** [maven-starter.io](https://maven-starter.io/)
- **Technical docs (architecture + ADRs):** [support-and-care.github.io/maven-initializer](https://support-and-care.github.io/maven-initializer/)
- **Source:** [GitHub — support-and-care/maven-initializer](https://github.com/support-and-care/maven-initializer)
