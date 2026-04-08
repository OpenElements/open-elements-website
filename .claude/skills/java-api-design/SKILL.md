---
name: api-design
license: Apache-2.0
metadata:
  source: https://github.com/open-elements/claude-base
  author: Open Elements
description: Design and review public Java APIs with a focus on hiding implementations, using the right type constructs (interfaces, records, enums, annotations instead of classes), applying design patterns (Factory, SPI, Facade, Builder, Strategy), modularization, and long-term API stability. Use this skill whenever the user asks about designing a public API, reviewing an API for quality, splitting API from implementation, creating an SPI, choosing between interfaces and classes, or structuring a Java library for external consumers. Also trigger when the user mentions API surface, breaking changes, API evolution, or module boundaries.
---

# API Design

Design public Java APIs that are clean, stable, and implementation-hiding. This skill guides the creation and review of APIs that use the right type constructs, apply proven design patterns, and are structured to avoid breaking changes over time.

The core philosophy: a public API is a contract with your users. Every public type and method is a commitment that is easy to add but painful to remove. The goal is to expose the minimum surface needed, hide all implementation details, and choose constructs that naturally support evolution.

## Instructions

### 1. Understand the context

Determine what the user needs:

- **Designing a new API** — they are creating a library, module, or component and need guidance on structure, types, and patterns.
- **Reviewing an existing API** — they want feedback on an existing API's design quality.
- **Refactoring toward a better API** — they have implementation-leaking code and want to improve it.
- **Choosing between constructs** — they need advice on whether to use an interface, record, enum, annotation, or class.

Read the relevant code before giving advice. Understand the domain, the intended consumers, and the existing codebase conventions.

### 2. Apply the type selection rules

Public APIs should be built from interfaces, records, enums, and annotations. Classes are reserved for special cases.

**Interfaces** are the primary API contract type. They decouple consumers from implementations, support multiple implementations, and evolve safely with default methods.

- Keep interfaces small and focused (Interface Segregation Principle).
- Name with nouns for things (`UserRepository`, `Connection`), `-able` for capabilities (`Comparable`, `Closeable`), `-er` for agents (`Converter`, `Validator`).
- Do not use the `I` prefix (`IUserService`) or `Impl` suffix (`UserServiceImpl`). Name implementations by their distinguishing characteristic: `JpaUserRepository`, `InMemoryUserRepository`, `CachingUserRepository`.
- Use static factory methods on interfaces to hide implementation classes entirely.
- Use sealed interfaces (Java 17+) when the set of subtypes is known and finite, enabling exhaustive pattern matching.

**Records** are the right choice for immutable data carriers: DTOs, value objects, API method parameters and return types, configuration objects, results, events.

- Records guarantee immutability, provide `equals`/`hashCode`/`toString`, and clearly communicate their contract.
- Always defensive-copy mutable components in the compact constructor: `members = List.copyOf(members)`.
- Records work well as permitted subtypes of sealed interfaces for algebraic data types.

**Enums** represent fixed sets of constants: statuses, modes, strategies, categories.

- Enums are full classes — they can have fields, methods, and implement interfaces.
- Use enum-specific method implementations for strategy-per-constant patterns.
- Share vocabulary across APIs with top-level enums (like `java.math.RoundingMode`).

**Annotations** provide metadata, constraints, and documentation.

- Use for markers (`@Immutable`, `@ThreadSafe`), configuration (`@Cacheable`), constraints (`@NonNull`), and lifecycle (`@Deprecated`).
- Prefer `RUNTIME` retention for API annotations.
- Provide sensible defaults for annotation attributes.

**Classes** should only appear in public APIs for:

- **Exceptions** — must extend `Exception` or `RuntimeException`. Keep hierarchies shallow (1-2 levels). Include contextual data (error codes, IDs) as fields, not just in the message string. Provide constructors accepting both message and cause.
- **Abstract skeletal implementations** — optional implementation aids alongside interfaces (like `AbstractList`). These supplement the interface, not replace it.
- **Builders** — for constructing complex immutable objects with many optional parameters.

### 3. Ensure consistency and progressive disclosure

Good APIs are consistent and discoverable (Jonathan Giles, JLBP-1 and JLBP-12):

**Consistency** — Apply uniform patterns across the entire API. If one factory uses `of()`, all similar factories should use `of()`. If one method provides a varargs overload, replicate that pattern for similar methods. Choose either `getXYZ()` or `xyz()` accessor style and stick with it. Maintain consistent argument ordering across overloaded methods. Establish a limited subset of collection return types and use them uniformly. Consistency lets developers intuit how new API parts work based on prior experience with other parts.

**Progressive disclosure** — Design intuitive entry points. Expose primary functionality through the main entry point, leaving advanced features for deeper exploration. Minimize friction — a new user should succeed with minimal steps. If a developer cannot intuitively understand how to start using your API, the API has failed regardless of how powerful it is.

**Fit for purpose** — Target the right abstraction level. Do one thing and do it right. Never require developers to understand implementation details to use basic functionality. For example, users of a collection should store and retrieve items without knowing about reallocation thresholds, load factors, or hash collision policies.

### 4. Use generics effectively

Generics are a core tool for type-safe, flexible APIs. These rules come from Joshua Bloch's Effective Java and the design of JDK APIs like Stream, Optional, and Collections.

**Apply PECS (Producer Extends, Consumer Super)** — The foundational rule for wildcard bounds. If a parameter supplies values of type `T` to your method (producer), use `? extends T`. If it accepts values from your method (consumer), use `? super T`. If it does both, use plain `T`. Example: `Collections.copy(List<? super T> dest, List<? extends T> src)`.

**Use wildcards in parameters, avoid them in return types** — Wildcards in parameters increase flexibility for callers. Wildcards in return types force callers to deal with wildcard types, reducing usability. Always return concrete parameterized types.

**Never use raw types** — Raw types (`List` instead of `List<String>`) bypass type safety entirely. Use `List<?>` when the element type is unknown.

**Design for type erasure** — Do not overload methods that differ only by generic type arguments (both erase to the same signature). Use distinct method names instead. Do not depend on runtime generic type information. Use `Supplier<T>` or `Class<T>` tokens when runtime type info is needed (not `new T()`).

**Use recursive type bounds for self-referential APIs** — The pattern `<T extends Base<T>>` enables type-safe method chaining in builders and comparison in `Comparable`. Example: `<T extends Comparable<? super T>> T max(List<? extends T> list)`.

**Use bounded type parameters for compile-time safety** — `<T extends Closeable>` guarantees the caller passes a closeable type. Multiple bounds are possible: `<T extends Comparable<T> & Serializable>`.

**Follow naming conventions** — `T` for general type, `E` for element, `K`/`V` for key/value, `R` for result, `S`/`U` for additional types, `A` for accumulator. Do not shadow class-level type parameters in methods.

**Single-use rule** — If a type parameter appears only once in a method, replace it with a wildcard: `<E> void swap(List<E> list, ...)` simplifies to `void swap(List<?> list, ...)`.

### 5. Apply the design patterns

Choose patterns based on what the API needs to accomplish:

**Factory pattern** — Use when consumers need instances but should not see implementation classes. Replace public constructors with static factory methods (`of()`, `from()`, `create()`, `parse()`). Factories enable caching, subtype selection, and meaningful names. Place factory methods on the interface itself or on a companion utility class.

**Service Provider Interface (SPI)** — Use when third parties should be able to plug in implementations. Define a minimal SPI interface in a separate `spi` package. Use `java.util.ServiceLoader` (and JPMS `provides/uses`) for runtime discovery. The key insight: APIs are called by users and implemented by library authors; SPIs are implemented by third parties and called by the library. Adding methods to an SPI is dangerous (breaks providers); adding methods to an API is safe.

**Facade pattern** — Use when a subsystem is complex and consumers need a simplified entry point. The facade orchestrates internal components, enforces correct usage order, and reduces the learning curve. Keep subsystem classes package-private or in internal packages.

**Builder pattern** — Use when an object has many optional parameters, requires cross-parameter validation, or must be immutable. Required parameters go in the builder's constructor. Use fluent method names without `set` prefix (`timeout()` not `setTimeout()`). Validate in `build()`, not in individual setters.

**Strategy pattern** — Use when behavior should be pluggable and interchangeable. Define strategies as `@FunctionalInterface` to enable lambda usage. Provide built-in strategies as factory methods in a companion class. Prefer standard `java.util.function` interfaces before creating custom ones.

**Options pattern** — An alternative to the Builder pattern for parameter telescoping (Jonathan Giles, JLBP-9). Consolidate optional parameters into a dedicated options container with fluent setters, reducing the API to `foo()` and `foo(FooOptions options)`. This simulates named parameters and avoids overload explosion. Required parameters go in the options constructor or as top-level method parameters.

### 6. Structure for separation and modularization

**Package structure** — Separate API from implementation:

- `com.example.mylib.api` — public interfaces, value types, exceptions
- `com.example.mylib.spi` — service provider interfaces
- `com.example.mylib.model` — public data types (records)
- `com.example.mylib.internal` — implementation details, not for external use

**JPMS** — Export only API packages. Non-exported packages are inaccessible at compile time and runtime:

```java
module com.example.mylib {
    exports com.example.mylib.api;
    exports com.example.mylib.model;
    // com.example.mylib.internal is NOT exported

    provides com.example.mylib.spi.StorageProvider
        with com.example.mylib.internal.DefaultStorageProvider;
}
```

Use `opens` sparingly (only for frameworks needing reflection). Avoid `open module` (ok for modules that are only used for testing). Prefer qualified exports (`exports ... to ...`) when only specific modules need access.

**Multi-module builds** — For libraries, split into API and implementation modules (like SLF4J does with `slf4j-api` + `logback-classic`). The API module has minimal dependencies. Consumers depend on API at compile scope, implementation at runtime. In Gradle, use `implementation` by default and `api` only when a type appears in public signatures.

**Preventing API leakage** — Never let internal or third-party types appear in public method signatures:

- Return interfaces, not implementation classes (`List<User>`, not `ArrayList<User>`).
- Accept the most general type as parameters (`Collection<? extends T>`, `Iterable<T>`).
- Wrap third-party exceptions in API-specific exceptions at module boundaries.
- Use ArchUnit tests to verify no `internal` package types leak into public signatures.
- Use japicmp or Revapi in CI to detect unintended API changes.

### 7. Apply defensive coding practices

These practices from Jonathan Giles and the Hiero SDK guide ensure APIs are robust and safe:

**Fail fast at API boundaries** — Use `Objects.requireNonNull()` with descriptive messages at every public method entry point. Validate constraints (min, max, pattern) in constructors and setters. Catch invalid data early rather than letting it propagate.

**Prefer primitives over wrapper types** — Use `int`, `long`, `double`, `boolean` in API signatures. Use wrapper types only when nullability is required. Boxing introduces null pointer risk, identity comparison bugs (`==` compares references), and performance overhead.

**Use `final` deliberately** — Mark all method parameters `final` to signal intent. Mark classes `final` by default unless designed for inheritance. Remember: removing `final` later is not a breaking change, but adding it is. Protected methods are as much part of the public API as public methods — use `protected` only for intentional extension points.

**Avoid `var` in library code** — Use explicit types for clarity. `Transaction transaction = createTransaction()` is clearer than `var transaction = createTransaction()` for library consumers reading your code or API.

**Avoid Lombok** — Do not use `@Data`, `@Getter`, `@Setter` in library code. Hidden code generation makes debugging difficult, and modern Java (records, sealed classes) provides better, transparent solutions.

**`toString()` discipline** — Use format `ClassName{field1=value1, field2=value2}`. Never include sensitive data. Keep implementations cheap. Be aware that users will parse `toString()` output — changes can break downstream code.

**`equals()`/`hashCode()` contract** — If `equals()` is overridden, `hashCode()` must be too. Use `Objects.equals()` and `Objects.hash()`. Do not use mutable fields in hash code. Prefer records for value types — they generate correct implementations automatically.

**Thread safety** — Prefer immutability over synchronization. Use concurrent collections (`ConcurrentHashMap`, `CopyOnWriteArrayList`) for internal mutable state. Document which classes and methods are thread-safe. Consider `@ThreadSafe` annotations.

**Exception naming** — Follow `[Domain][Condition]Exception` format: `AccountNotFoundException`, `InsufficientFundsException`.

**Logging in libraries** — Prefer `System.Logger` (Java 9+) for libraries, especially low-level ones, to avoid forcing a logging framework dependency on consumers. Use parameterized log messages, never string concatenation. Check log level before expensive computations.

### 8. Design for stability

Every public API element is a long-term commitment. These practices help avoid breaking changes:

**Minimize the surface** — "When in doubt, leave it out." Start with everything package-private. Only make types public when there is a concrete need. Make classes `final` by default unless designed for inheritance.

**Return the right types** — Return interfaces, not concrete classes. Return the most specific useful interface (`List<T>` when ordering matters, `Set<T>` for uniqueness). Never return `null` where an empty collection or `Optional` would work. Always return unmodifiable collections (`List.copyOf()`, `List.of()`).

**Handle null explicitly** — Adopt non-null-by-default with JSpecify annotations (`@NullMarked` at package level). Mark individual nullable cases with `@Nullable`. Use `Optional` for return types where absence is a normal outcome. Never use `Optional` as a parameter, field, or collection element.

**Evolve interfaces safely** — Add default methods for backward-compatible evolution. Use sub-interfaces for major additions (`UserRepositoryV2 extends UserRepository`). Use companion utility classes for static operations. Mark experimental APIs with `@API(status = EXPERIMENTAL)` from API Guardian.

**Version correctly** — Follow Semantic Versioning: MAJOR for breaking changes, MINOR for additions, PATCH for fixes. Deprecate with `@Deprecated(since = "2.3", forRemoval = true)` and document replacements. Remove no earlier than two versions after deprecation. Integrate japicmp or Revapi in CI to catch accidental breaks.

**Use API status markers** — Communicate stability expectations with annotations like API Guardian's `@API(status = STABLE)`, `@API(status = INTERNAL)`, `@API(status = EXPERIMENTAL)`.

### 9. Review checklist

When reviewing an API design (new or existing), check:

- [ ] Are interfaces used as the primary contract types (not classes)?
- [ ] Are implementation classes hidden (package-private, internal package, or non-exported module)?
- [ ] Are data carriers implemented as records (not mutable POJOs)?
- [ ] Are fixed constant sets implemented as enums?
- [ ] Are classes only used for exceptions, skeletal implementations, or builders?
- [ ] Do factory methods replace public constructors?
- [ ] Is the API/SPI distinction clear (separate packages, minimal SPI surface)?
- [ ] Are collections returned as unmodifiable?
- [ ] Are null semantics explicit (JSpecify annotations, Optional for lookups)?
- [ ] Is the package structure clean (api/spi/model/internal)?
- [ ] Does the module-info.java export only API packages?
- [ ] Are third-party types absent from public method signatures?
- [ ] Are exceptions well-designed (contextual data, shallow hierarchy, cause chaining)?
- [ ] Is the API surface minimal — nothing exposed "just in case"?
- [ ] Do generic method signatures follow PECS (extends for producers, super for consumers)?
- [ ] Are wildcards used in parameters but avoided in return types?
- [ ] Are raw types absent from the entire API?
- [ ] Are type parameter names following conventions (T, E, K, V, R)?
- [ ] Is the API consistent — uniform naming, argument ordering, overload patterns?
- [ ] Are public API methods using `Objects.requireNonNull()` for parameter validation?
- [ ] Are primitive types used instead of wrappers where nullability is not needed?
- [ ] Are classes `final` by default (unless designed for inheritance)?
- [ ] Is `var` avoided in favor of explicit types?
- [ ] Does `toString()` exclude sensitive data and follow a consistent format?
- [ ] Are `equals()`/`hashCode()` correctly implemented (or records used)?
- [ ] Is thread safety documented and implemented where needed?
- [ ] Is the API stable — could it survive two major versions without breaking changes?

### 10. Present recommendations

When advising on API design:

- Explain the reasoning behind each recommendation. A developer who understands *why* interfaces are preferred over classes will make better decisions in edge cases than one following a rule mechanically.
- Show concrete code examples that demonstrate the recommended pattern.
- Reference well-designed JDK APIs as models: `java.time` for immutable value types with factories, `java.util.ServiceLoader` for SPI, `java.util.Collections` for factories returning hidden implementations, JDBC for API/SPI separation, SLF4J for facade + SPI.
- When reviewing existing code, prioritize findings by impact: API leakage and missing encapsulation are more important than naming conventions.
