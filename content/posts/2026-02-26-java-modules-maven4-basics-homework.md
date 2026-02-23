---
outdated: false
showInBlog: true
title: "Solving Resource and Packaging Challenges with Maven 4 Modules"
slug: "java-modules-maven4-basics-homework"
date: 2026-02-26
author: gerd
excerpt: "Maven 4 module source hierarchy is powerful but still maturing. This article explains workarounds for missing resources and JAR packaging until Apache Maven fully supports these features."
categories: [open-source, support-and-care, maven, java]
preview_image: "/posts/preview-images/open-source-green.svg"
---


In the <a href="/posts/2026/01/27/your-first-modular-java-project-with-apache-maven-4/" target="_blank">previous article</a>, we left you with two homework assignments.
This follow-up explains why things don’t work out of the box and provides workarounds until [Apache Maven](https://maven.apache.org/) 4 fully supports these features.

## The Homework Challenges

If you tried the homework from Blog 1, you likely encountered two issues:

1. **Missing log output** – The application runs but doesn’t show the expected logging messages
2. **JAR packaging problems** - Running `./mvnw package` creates a single JAR that doesn’t work as expected on the module path

Both issues stem from the fact that Maven 4’s module source hierarchy is still evolving.
While the [Maven Compiler Plugin](https://maven.apache.org/plugins/maven-compiler-plugin-4.x/modules.html) (version 4.0.0-beta-3) already supports this new structure, other parts of the build lifecycle haven’t caught up yet.

## Issue 1: Missing Resources

### What's Happening?

When you run the application after `./mvnw compile`, you might notice that Log4j falls back to its [default configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html#automatic-configuration) instead of using our custom `log4j2.xml`.

Looking at the source structure:

```text
src/com.openelements.showcases.analyzer.cli/
├── main/
│   ├── java/
│   │   └── ...
│   └── resources/
│       └── log4j2.xml  ①
```
Our Log4j configuration file

And the compiled output:

```text
target/classes/
├── com.openelements.showcases.analyzer.core/
│   └── ...
└── com.openelements.showcases.analyzer.cli/
    └── com/openelements/showcases/analyzer/cli/
        └── AnalyzerCommand.class  ①
```
Notice: no `log4j2.xml` here!

The `log4j2.xml` file is missing from the compiled output.

### The Hint in Maven's Output

If you watch the Maven output carefully during `./mvnw compile`, you’ll notice these messages:

```text
[INFO] --- resources:3.3.1:resources (default-resources) @ analyzer ---
[INFO] skip non existing resourceDirectory .../src/main/resources
[INFO] skip non existing resourceDirectory .../src/main/resources-filtered
```

This is the hint: Maven’s resources plugin looks for the traditional `src/main/resources/` directory, which doesn’t exist in our project.
It completely ignores our module-specific resource directories.

### Why It Doesn't Work

Maven’s [standard directory layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html) expects resources in `src/main/resources/`.
The module source hierarchy places resources in `src/<module>/main/resources/`, but Maven’s core resource handling doesn’t yet recognize this convention.

You can track the fix in [Maven Core PR 11505](https://github.com/apache/maven/pull/11505).

**NOTE:** The Maven team already merged the fixes into the `master` branch, which will become Maven 4.1.
For Maven 4.0 (e.g., 4.0.0-rc-6), the team needs to backport these changes to the 4.0.x branch.
Then it will eventually become part of the next Maven release.



### The Workaround

Until the Maven team releases the fix, we explicitly copy resources using the maven-resources-plugin:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.3.1</version>
    <executions>
        <execution>
            <id>copy-cli-resources</id>
            <phase>process-resources</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <outputDirectory>${project.build.outputDirectory}/com.openelements.showcases.analyzer.cli</outputDirectory> <!--1-->
                <resources>
                    <resource>
                        <directory>src/com.openelements.showcases.analyzer.cli/main/resources</directory> <!--2-->
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```
1. Copy to the module’s output directory
2. From the module’s resource directory

After applying this workaround, run `./mvnw compile` again and verify:

```bash
ls target/classes/com.openelements.showcases.analyzer.cli/log4j2.xml
```

Now the application finds the Log4j configuration and logging works as expected.

## Issue 2: JAR Packaging

### What's Happening?

When you run `./mvnw package`, Maven creates a single JAR file:

```text
target/
└── analyzer-1.0.0-SNAPSHOT.jar
```

If you try to use this JAR on the module path:

```bash
java --module-path "target/analyzer-1.0.0-SNAPSHOT.jar:target/lib" \
     --module com.openelements.showcases.analyzer.cli/...
```

You’ll get an error because the JAR contains **both** modules combined, which violates Java Module System rules.
According to the [JAR File Specification](https://docs.oracle.com/en/java/javase/17/docs/specs/jar/jar.html#modular-jar-files), a modular JAR must contain exactly one `module-info.class` at its root.

### Why It Doesn't Work

Maven’s JAR plugin traditionally creates one JAR per Maven module (Maven 3).
With the module source hierarchy, we have one Maven project but multiple Java modules.
The default behavior packages everything in `target/classes/` into a single JAR, mixing all contained Java modules.

This creates a broken JAR:

```text
analyzer-1.0.0-SNAPSHOT.jar
├── com.openelements.showcases.analyzer.core/
│   ├── module-info.class  <-- First module descriptor
│   └── ...
└── com.openelements.showcases.analyzer.cli/
    ├── module-info.class  <-- Second module descriptor (conflict!)
    └── ...
```

The fix requires changes to both [Maven Core PR 11549](https://github.com/apache/maven/pull/11549) and [JAR Plugin PR 508](https://github.com/apache/maven-jar-plugin/pull/508).

### The Workaround

Until the Maven team releases the fix, we configure the JAR plugin to create separate JARs for each Java module:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.4.2</version>
    <executions>
        <execution>
            <id>default-jar</id>
            <phase>none</phase> <!--1-->
        </execution>
        <execution>
            <id>jar-core</id>
            <phase>package</phase>
            <goals>
                <goal>jar</goal>
            </goals>
            <configuration>
                <classesDirectory>${project.build.outputDirectory}/com.openelements.showcases.analyzer.core</classesDirectory> <!--2-->
                <classifier>core</classifier> <!--3-->
            </configuration>
        </execution>
        <execution>
            <id>jar-cli</id>
            <phase>package</phase>
            <goals>
                <goal>jar</goal>
            </goals>
            <configuration>
                <classesDirectory>${project.build.outputDirectory}/com.openelements.showcases.analyzer.cli</classesDirectory>
                <classifier>cli</classifier>
            </configuration>
        </execution>
    </executions>
</plugin>
```
1. Disable the default JAR creation
2. Each execution packages one Java module’s classes
3. The current JAR plugin requires classifiers to distinguish the respective artifact for each module

After `./mvnw package`, you’ll have:

```text
target/
├── analyzer-1.0.0-SNAPSHOT-core.jar
└── analyzer-1.0.0-SNAPSHOT-cli.jar
```

### Running from JARs

Now you can run the application from the JARs:

```bash
java --module-path "target/analyzer-1.0.0-SNAPSHOT-core.jar:\
target/analyzer-1.0.0-SNAPSHOT-cli.jar:\
target/lib" \
  --module com.openelements.showcases.analyzer.cli/com.openelements.showcases.analyzer.cli.AnalyzerCommand \
  README.*
```

**CAUTION:** The classifier suffix (`-core`, `-cli`) is a limitation of the current JAR plugin.
Once the Maven team releases PR 508, you’ll be able to create properly named JARs like `analyzer-core-1.0.0-SNAPSHOT.jar` without classifiers.



## Source Code

We committed the above changes to the sample source code repository on [GitHub](https://github.com/support-and-care/maven-modular-sources-showcases).
Clone it and switch to branch `blog-1-homework`:

```bash
git clone https://github.com/support-and-care/maven-modular-sources-showcases # unless already done
cd maven-modular-sources-showcases
git checkout blog-1-homework
```

## Summary

Maven 4’s module source hierarchy is a powerful feature, but it’s still maturing.
The two workarounds we’ve shown address:

| Issue | Cause | Workaround | Tracking |
| --- | --- | --- | --- |
| Missing resources | Maven doesn’t copy `src/<module>/main/resources/` automatically | Explicit maven-resources-plugin configuration | [PR 11505](https://github.com/apache/maven/pull/11505) |
| Broken JAR packaging | Single JAR contains multiple Java modules | Explicit maven-jar-plugin executions per module | [PR 11549](https://github.com/apache/maven/pull/11549), [PR 508](https://github.com/apache/maven-jar-plugin/pull/508) |

These workarounds will become unnecessary once the respective Maven releases include the fixes.
We’ll update this blog series when that happens.

---

This article is published on the <a href="/posts/2026/02/26/java-modules-maven4-basics-homework/" target="_blank">Open Elements blog</a>.

Apache Maven and Maven are trademarks of the [Apache Software Foundation](https://www.apache.org/).
