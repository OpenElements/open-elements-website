# Java Conventions for Claude Code

## Common Commands

These are the typical commands for Maven-based Java projects. Always use the Maven Wrapper (`./mvnw`) when available.

- **Build**: `./mvnw clean verify`
- **Run tests**: `./mvnw test`
- **Run a single test class**: `./mvnw test -Dtest=com.example.MyTestClass`
- **Run a single test method**: `./mvnw test -Dtest=com.example.MyTestClass#myTestMethod`
- **Skip tests during build**: `./mvnw clean package -DskipTests`
- **Check for dependency updates**: `./mvnw versions:display-dependency-updates`
- **Generate Javadoc**: `./mvnw javadoc:javadoc`

## Code Style

Formatting rules (indentation, charset, line endings) are defined in `.editorconfig` — see [editorconfig.md](editorconfig.md).

- **IMPORTANT**: Do not use wildcard imports (`import java.util.*`). Always use explicit imports.
- **IMPORTANT**:Prefer `final` fields and local variables where possible.
- Use `final` on method parameters when the method body does not reassign them.
- Prefer records for immutable data carriers. Use classes with `final` fields and getters for types that mix mutable and
  immutable state.
- Do not use `var`
- Follow standard Java naming: `PascalCase` for classes, `camelCase` for methods/fields, `UPPER_SNAKE_CASE` for
  constants.
- **IMPORTANT**: Do not use Lombok. Use modern Java features (records, pattern matching) instead.
- Always override `equals`, `hashCode`, and `toString` together for non-record classes. Use `Objects.equals()` and
  `Objects.hash()` as helpers.
- Format `toString` as `ClassName[field1=value1, field2=value2]`. **IMPORTANT**: Never expose sensitive data (passwords, tokens) in `toString`.
- **IMPORTANT**: All public API (public classes, interfaces, methods, constructors, and fields) must have Javadoc comments.

## Build Tools

- Respect the existing build tool (Maven or Gradle) — do not switch without explicit instruction.
- We always prefer Maven over Gradle.
- **IMPORTANT**: Before choosing a Java version for a new project, verify that the framework (Spring Boot, Helidon, etc.) and all major dependencies support that version. Use the latest Java LTS version that is fully supported by the framework. The Java version must be consistent across `pom.xml` (`<java.version>` / `<maven.compiler.release>`), `.sdkmanrc`, and Docker base images.
- When adding dependencies, use the dependency management section (Maven `<dependencyManagement>` or Gradle version
  catalog) if one exists.
- Do not add dependencies that duplicate functionality already available in the project.
- **IMPORTANT**: Every new Maven project or module must include the [CycloneDX Maven Plugin](https://github.com/CycloneDX/cyclonedx-maven-plugin) (`org.cyclonedx:cyclonedx-maven-plugin`) in its `<build><plugins>` section for SBOM generation.
- Always use meaningful dependency scopes.
  Use `compile`, `provided`, `runtime` or `test` whenever it makes sense.

### Pinning Default Maven Plugin Versions

- **IMPORTANT**: Every new Maven project must explicitly define versions for all default lifecycle plugins in `<build><pluginManagement>` to ensure reproducible builds across all systems.
- Pin at least the following plugins (always use the latest stable version of each):
  - `maven-clean-plugin`
  - `maven-compiler-plugin`
  - `maven-resources-plugin`
  - `maven-surefire-plugin`
  - `maven-jar-plugin`
  - `maven-install-plugin`
  - `maven-deploy-plugin`
- When reviewing or setting up an existing project, check that these plugins have explicit versions and update them to the latest stable release if they are outdated.

## Testing

- Use JUnit 5 (`org.junit.jupiter`) for tests.
- Use AssertJ for assertions (`org.assertj.core.api.Assertions`).
- Name test methods descriptively: `shouldReturnEmptyListWhenNoItemsExist()` or use `@DisplayName`.
- Use `@Nested` classes to group related tests within a test class.
- Use `@ParameterizedTest` for testing multiple inputs with the same logic.
- Use `//GIVEN //WHEN //THEN` comments to structure test methods.
- Test one behavior per test method. Provide meaningful assertion messages.
- Test edge cases: null values, empty collections, boundary values, and expected exceptions.
- Keep tests independent and fast — each test should run in milliseconds without depending on other tests.
- **IMPORTANT**: Avoid excessive mocking. Excessive mocking is often a sign that APIs have too many dependencies or are poorly designed. Prefer simple dummy/stub implementations of interfaces for test dependencies instead if possible. Use mocking when the dependency is a concrete or final class that cannot be substituted otherwise or the complexity becomes too big.

## Logging

- Use SLF4J as the logging API (`org.slf4j.Logger`).
- For libraries and low-level code, prefer `java.lang.System.Logger` to avoid external logging dependencies and let consumers choose their own logging backend.
- Use parameterized logging — never string concatenation. For SLF4J: `log.info("Processing item {}", itemId)`. For System.Logger: `logger.log(Level.INFO, "Processing item {0}", itemId)`.
- For expensive log message construction, use `Supplier<String>` or guard with `logger.isLoggable(level)` to avoid unnecessary computation.
- Log at appropriate levels: `ERROR` for failures that need attention, `WARN` for recoverable issues, `INFO` for significant events, `DEBUG` for development details.

## Null Handling

- Prefer `Optional<T>` for return types that may have no value. Do not use `Optional` as a method parameter, constructor parameter, or field type — use `@Nullable` annotations instead.
- Prefer `Optional.ofNullable(value)` when nullability is uncertain. Use `Optional.of(value)` only when the value is guaranteed non-null.
- Annotate parameters and fields with `@Nullable` or `@NonNull` (using `org.jspecify` when available) to make intent explicit.
- Use `Objects.requireNonNull(param, "paramName must not be null")` for early validation of non-null parameters — always include the parameter name in the message.
- **IMPORTANT**: Never return `null` from a method that returns a collection — return an empty collection instead.

## Collections

- Always copy incoming collections before storing them to avoid external mutation (`List.copyOf()`, `Set.copyOf()`,
  `Map.copyOf()`).
- Return unmodifiable collections from public API methods.
- Use thread-safe backing types (`CopyOnWriteArrayList`, `ConcurrentHashMap`) when collections may be accessed from
  multiple threads.

## Immutability and Validation

- **IMPORTANT**: Prefer immutable objects. Use records for fully immutable types.
- Validate constructor and setter arguments early. Throw `IllegalArgumentException` for constraint violations (min/max
  values, string length, patterns).
- Use `java.time` types (`Instant`, `LocalDate`, `Duration`, etc.) for all date and time handling — never
  `java.util.Date` or `java.util.Calendar`.
- Use `BigDecimal` for precise decimal values (financial calculations, etc.) — never `float` or `double`.

## Factory Methods

- Prefer static factory methods on the type itself over separate factory classes (e.g., `Money.of(amount, currency)`
  instead of `MoneyFactory.create()`).
- Name factory methods descriptively: `of`, `from`, `create`, `valueOf`.

## Builder Pattern

- Use the builder pattern for classes with more than 4–5 constructor parameters, multiple optional parameters, or confusing parameter ordering.
- Provide a static `builder()` factory method. All builder setter methods return `this` for a fluent interface.
- Make the builder a `static final` nested class within the product class.
- Set default values in builder field declarations, not in the `build()` method.
- Perform validation in the main class constructor, not in builder setter methods. Perform null checks on required parameters in builder setters.
- Always provide a public all-args constructor alongside the builder for direct instantiation.
- Builders are not thread-safe — each thread needs its own builder instance.

## Java Module System

- Use the Java Platform Module System (JPMS) for standalone libraries whenever possible. Define a `module-info.java` that exports only the public API packages and keeps implementation packages hidden.
- **IMPORTANT**: Only export packages that contain the public API. Internal and implementation packages should not be exported.
- Use `requires` to declare module dependencies explicitly rather than relying on the classpath.
- Use `requires static` for compile-time only dependencies (annotation libraries, code generators).
- Structure packages to separate API from implementation (e.g., `com.example.mylib/` for public API, `com.example.mylib.impl/` for internals), even in projects that do not use JPMS.
- Some frameworks (e.g., Spring Boot) have limited JPMS support. In those projects, skip module-info if it causes friction — but still follow the package structure convention above.

## Service Provider Interface (SPI)

- Use the Java SPI (`java.util.ServiceLoader`) for extensibility points where implementations should be discovered at runtime.
- In modular projects, declare providers in `module-info.java` with `provides ... with ...`.
- In classpath-based projects, use `@com.google.auto.service.AutoService` to generate `META-INF/services` files automatically via annotation processor.
  Dependency for the annotation is `com.google.auto.service:auto-service`.
  Annotation processor to support it must be configured in the build tool.
- When a library must support both modular and classpath consumers, provide both the `module-info.java` declaration and the AutoService annotation.

## Asynchronous Code

- Use `CompletionStage<T>` or `CompletableFuture<T>` for asynchronous return types.
- When providing async methods, consider offering synchronous alternatives that accept a timeout with `TimeUnit`.
