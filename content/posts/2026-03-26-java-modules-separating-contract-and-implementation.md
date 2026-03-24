---
outdated: false
showInBlog: true
title: "Separating Contract and Implementation with Java Modules"
slug: "java-modules-separating-contract-and-implementation"
date: 2026-03-26
author: gerd
excerpt: "Java Modules let you separate domain types from their implementation. Learn how to extract an API module and use requires transitive for implied readability, so consumers get access to contract types automatically."
categories: [open-source, support-and-care, maven, java]
preview_image: "/posts/preview-images/open-source-green.svg"
---


The [previous article]({{< relref "posts/2026-03-12-java-modules-encapsulation-internal-packages" >}}) showed how to hide implementation details using internal packages.
The core module still mixes two concerns, though: it exports both the domain model (`Document`, `Statistics`) and the service implementation (`TextAnalyzer`).
Consumers that only need the data types must depend on the entire implementation.
Java Modules provide an elegant solution: separate the domain types into their own module and use `requires transitive` to keep things convenient.

## The problem: mixed concerns

After the [previous article]({{< relref "posts/2026-03-12-java-modules-encapsulation-internal-packages" >}}), the core module looks like this:

```java
module com.openelements.showcases.analyzer.core {
    requires org.apache.logging.log4j;

    exports com.openelements.showcases.analyzer.core.model;
    exports com.openelements.showcases.analyzer.core.service;
}
```

The module exports both `model` — domain types — and `service` — implementation.
Any module that needs `Document` or `Statistics` must depend on `core` and transitively pulls in Log4j and the internal implementation.

This represents a common antipattern in modular design: mixing the _contract_ — what the module promises — with the _implementation_ — how it fulfills that promise.

## Introducing a contract module

The solution is a classic layering pattern: extract the domain types into a dedicated _API module_.
The implementation module then _depends on_ the API and provides concrete service classes.

<img src="/posts/2026-03-26-java-modules-separating-contract-and-implementation/module-structure-3.svg" alt="Module dependencies">

The project now has three Java modules:

* **analyzer.api**\
Pure contract — domain types, no dependencies
* **analyzer.core**\
Implementation — depends on API transitively, provides service classes
* **analyzer.cli**\
Consumer — depends on core, gains access to API types automatically via `requires transitive`

## The contract module

The new module contains the domain records `Document` and `Statistics`, moved from `core.model`.

### Module descriptor

```java
module com.openelements.showcases.analyzer.api {
    exports com.openelements.showcases.analyzer.api; // ①
}
```
1. Single export — all API types live in one package

The API module has _no dependencies_.
It is a pure contract that any module can depend on without pulling in implementation details.

The `Document` and `Statistics` types moved from `com.openelements.showcases.analyzer.core.model` to `com.openelements.showcases.analyzer.api`.

**NOTE:** In the [first]({{< relref "posts/2026-01-27-java-modules-maven4-basics" >}}) and [previous]({{< relref "posts/2026-03-12-java-modules-encapsulation-internal-packages" >}}) articles, a separate `DocumentReader` class in the core module handled reading files from disk.
With the API/core split, `DocumentReader` remains in the core module — and any module that needs to read a `Document` from disk must depend on core.
This becomes a problem when consumers should depend only on the API.
The clean alternative — a `DocumentReader` interface in the API module with an implementation in core — would require its own service wiring and add complexity.
A pragmatic solution: move the file-reading logic into `Document` itself as factory methods.
The `Document` record gains `fromPath(Path)` for the common UTF-8 case, and `fromPath(Path, Charset)` for reading with a specific character encoding.
```java
    /**
     * Reads a document from the given path using UTF-8 encoding.
     *
     * @param path the path to the file
     * @return a new Document instance
     * @throws IOException if the file cannot be read
     */
    public static Document fromPath(Path path) throws IOException {
        return fromPath(path, StandardCharsets.UTF_8);
    }
    /**
     * Reads a document from the given path using the specified charset.
     *
     * @param path the path to the file
     * @param charset the charset to use for reading
     * @return a new Document instance
     * @throws IOException if the file cannot be read
     */
    public static Document fromPath(Path path, Charset charset) throws IOException {
        if (!Files.exists(path)) {
            throw new IOException("File not found: " + path);
        }
        if (!Files.isRegularFile(path)) {
            throw new IOException("Not a regular file: " + path);
        }
        String content = Files.readString(path, charset);
        return new Document(path, content);
    }
```
This keeps the API module self-contained without introducing additional classes or service interfaces.
One trade-off: the old `DocumentReader` logged file paths via Log4j before and after reading.
The API module has no logging dependency, so these diagnostic messages are gone.
Callers that need logging can add it at the call site.



## The updated core module

The core module now _uses_ the API types rather than _defining_ them.

### Module descriptor

```java
module com.openelements.showcases.analyzer.core {
    requires transitive com.openelements.showcases.analyzer.api; // ①
    requires org.apache.logging.log4j; // ②

    exports com.openelements.showcases.analyzer.core.service; // ③
    // Note: com.openelements.showcases.analyzer.core.internal is NOT exported // ④
}
```
1. `requires transitive` — any module that requires `core` automatically reads `api`
2. Log4j is an implementation detail, required but not transitive
3. Only the service package is exported
4. The internal package remains encapsulated

The key change is `requires transitive com.openelements.showcases.analyzer.api`.
This means the API types appear in core’s exported signatures — `TextAnalyzer.analyze(Document)` returns `Statistics` — so consumers of core automatically need access to the API module.
The `transitive` keyword makes this explicit and automatic.

The `TextAnalyzer` class itself is unchanged — it still delegates to the internal `TextNormalizer` encapsulated in the [previous article]({{< relref "posts/2026-03-12-java-modules-encapsulation-internal-packages" >}}).
Only its imports changed from `core.model.Document` to `api.Document`, and likewise for `Statistics`.

## How `requires transitive` works

The command-line module’s descriptor has _not changed_ from the [previous article]({{< relref "posts/2026-03-12-java-modules-encapsulation-internal-packages" >}}):

```java
module com.openelements.showcases.analyzer.cli {
    requires com.openelements.showcases.analyzer.core;
    requires info.picocli;
    requires org.apache.logging.log4j;

    opens com.openelements.showcases.analyzer.cli to info.picocli;
}
```

The command-line module declares `requires com.openelements.showcases.analyzer.core` — and because core declares `requires transitive com.openelements.showcases.analyzer.api`, it can use `Document` and `Statistics` without an explicit `requires api` directive.

This is called _implied readability_: the transitive keyword propagates the dependency through the module graph.

Without `transitive`, the command-line module would need to declare:

```java
module com.openelements.showcases.analyzer.cli {
    requires com.openelements.showcases.analyzer.core;
    requires com.openelements.showcases.analyzer.api; // ①
    requires info.picocli;
    requires org.apache.logging.log4j;

    opens com.openelements.showcases.analyzer.cli to info.picocli;
}
```
1. Would be required without `transitive` on core’s dependency

### What breaks without `transitive`?

If you remove the `transitive` keyword from core’s module-info.java:

```java
module com.openelements.showcases.analyzer.core {
    requires com.openelements.showcases.analyzer.api; // no transitive!
    // ...
}
```

The command-line module will fail to compile:

```text
error: package com.openelements.showcases.analyzer.api is not visible
  (package com.openelements.showcases.analyzer.api is declared in module
    com.openelements.showcases.analyzer.api, which is not in the module graph)
```

The compiler tells you exactly what’s wrong: the API module is not in the command-line module’s graph because core no longer transitively exports it.

## The updated project structure

With three modules, the directory structure looks like this:

```text
src/
├── com.openelements.showcases.analyzer.api/          ①
│   └── main/java/
│       ├── module-info.java
│       └── com/openelements/showcases/analyzer/api/
│           ├── Document.java
│           └── Statistics.java
├── com.openelements.showcases.analyzer.core/         ②
│   └── main/java/
│       ├── module-info.java
│       └── com/openelements/showcases/analyzer/core/
│           ├── internal/
│           │   └── TextNormalizer.java
│           └── service/
│               └── TextAnalyzer.java
└── com.openelements.showcases.analyzer.cli/          ③
    └── main/java/
        ├── module-info.java
        └── com/openelements/showcases/analyzer/cli/
            └── AnalyzerCommand.java
```
1. API module — domain types, no dependencies
2. Core module — implementation, depends on API transitively
3. Command-line module — consumer, unchanged module descriptor

## Updated POM configuration

The Maven POM now declares three module sources:

```xml
        <sources>
            <source>
                <module>com.openelements.showcases.analyzer.api</module> <!--1-->
            </source>
            <source>
                <module>com.openelements.showcases.analyzer.core</module> <!--2-->
            </source>
            <source>
                <module>com.openelements.showcases.analyzer.cli</module> <!--3-->
            </source>
        </sources>
```
1. The API module — domain types
2. The core module — implementation
3. The command-line module

Maven compiles them in dependency order: api first — no dependencies — then core — depends on api — then cli — depends on core.

## Source Code

The above changes are committed to the sample source code repository on [GitHub](https://github.com/support-and-care/maven-modular-sources-showcases).
Clone it and switch to branch `blog-3-api-impl`:

```bash
git clone https://github.com/support-and-care/maven-modular-sources-showcases # unless already done
cd maven-modular-sources-showcases
git checkout blog-3-api-impl
```

## Building and running

As described in the [first article]({{< relref "posts/2026-01-27-java-modules-maven4-basics" >}}), compile and prepare the dependencies:

```bash
./mvnw prepare-package
```

Then run the application:

```bash
java --module-path "target/classes:target/lib" \
     --module com.openelements.showcases.analyzer.cli/com.openelements.showcases.analyzer.cli.AnalyzerCommand \
     README.*
```

The output is unchanged from the [previous article]({{< relref "posts/2026-03-12-java-modules-encapsulation-internal-packages" >}}) — the API extraction is an internal restructuring that does not affect runtime behavior.

## Summary

This article covered:

* How to separate domain types into a dedicated API module
* The `requires transitive` directive provides _implied readability_ — consumers of core automatically get access to API types
* Domain types (`Document`, `Statistics`) belong in the API module — along with file-reading logic via `Document.fromPath()`
* Service classes (`TextAnalyzer`) remain in the core module
* The command-line module’s descriptor is unchanged — `requires transitive` handles the wiring

This separation brings a clear architectural benefit: any future module can depend on just the API without pulling in the implementation.

However, you may have noticed that the command-line module still directly depends on the core module to instantiate `TextAnalyzer`.
The next article addresses this by introducing the _Service Provider Interface_ pattern.
Using `uses`, `provides`, and `ServiceLoader`, the command-line module will depend _only_ on the API module — achieving true inversion of control where the consumer no longer needs to know the implementation at all.

## Homework

* **Remove `transitive` and fix the build**\
Remove the `transitive` keyword from core’s `requires api` declaration and observe the compilation error.
Then add an explicit `requires com.openelements.showcases.analyzer.api;` to the command-line module to fix it.
Which approach do you prefer, and why?
* **Add a second consumer module**\
Create a test module that imports only `Document` and `Statistics` from the API.
Does it need to depend on core?
What happens if it does — does it also get access to `TextAnalyzer`?
* **Preview: Inversion of Control**\
Right now the command-line module still instantiates `new TextAnalyzer(...)` directly, coupling it to the implementation.
Can you imagine a way to discover the analyzer at runtime so the command-line module only needs `requires api`?
The next article explores this with `ServiceLoader`.

---

Apache Maven and Maven are trademarks of the [Apache Software Foundation](https://www.apache.org/).
