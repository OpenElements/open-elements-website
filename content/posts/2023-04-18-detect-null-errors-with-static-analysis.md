---
outdated: false
showInBlog: true
title: "Programming language Java: Detecting NullPointerExceptions with Static Code Analysis"
date: 2023-04-18
author: hendrik
excerpt: "NullPointerExceptions are one of the most common sources of errors in Java. However, these errors can be significantly minimized through static code analysis."
categories: [Java]
origin: https://www.heise.de/blog/Programmiersprache-Java-Null-Fehler-mit-statischer-Analyse-aufspueren-7351944.html
preview_image: "/posts/2023-04-18-detect-null-errors-with-static-analysis/preview.jpg"
---

New projects bring new challenges and new knowledge with them. [In my current project](https://github.com/hashgraph/hedera-services), I recently created a definition for handling null checks during static code analysis. For many on the project, it was important that parameters are not only checked at runtime, for example through `Objects.requireNonNull(...)`, but also directly during compilation. Therefore, we decided to also rely on static code analysis here to verify the handling of `null`.

## Static Code Analysis

Before we dive into the various annotation and checker libraries available for Java, let's briefly explain what static code analysis is. During compilation, the program code is checked by a tooling. The currently most popular tool in Java is probably SpotBugs, which can be integrated into builds with Maven or Gradle, and its results can also be automatically published on platforms like SonarCloud. With static code analysis, you can find problems such as buffer overflows, infinite loops, or "out of bounds" errors. A simple example is division by zero. If such a case occurs in the code, the analysis can provide a warning or, depending on the configuration, terminate the entire build with an error. In our project, we have such a check in GitHub Actions, which displays the results directly in [SonarCloud](https://sonarcloud.io/project/overview?id=com.hedera.hashgraph%3Ahedera-services) and a Pull Request.

## Proper Handling of `null`

One problem when programming with Java is certainly the handling of `null` values. While I personally clearly believe that `null` has its justification, even though Tony Hoare, the inventor of the `null` reference in programming, now refers to it as a "billion-dollar mistake".

However, in Java, you cannot natively define whether a parameter is allowed to be `null`. This has been attempted to be solved through various means in the class library. Examples include `java.util.Optional`, `Objects.requireNonNull(...)`, or [JSR305](https://jcp.org/en/jsr/detail?id=305).

An illustrative example of a programming language that has native support for null references is Kotlin. It explicitly distinguishes between nullable references and non-null references. The latter is the default, and a variable with such a reference can never be assigned null. If you need a variable that can include null, you must work with a nullable reference. This is indicated by the `?` character. The following code includes a Kotlin example for both references:

{{< highlight java >}}
var a: String = "abc" // Regular initialization means
                      // non-null by default
a = null // compilation error

var b: String? = "abc" // can be set to null
b = null // ok
{{< / highlight >}}

Since there is no such native support in Java, attempts are made to integrate it as best as possible through static code analysis. In general, two annotations are needed, one (`@Nullable`) defining that a value or variable can be null, and the other annotation defining that a value or variable must never be null (`@NonNull`).

To understand this, let's look at a code example that defines a method and adds the information via annotation that the return value of the method can never be `null`:

{{< highlight java >}}
@NonNull String getName() {
    if(isUnique()) {
        return „Item „ + getId();
    } else {
        return null;
    }
}
{{< / highlight >}}

As you can see in the implementation of the method, it is possible for it to return `null`. This would be a case where the static code analysis would show a violation. If desired, you can configure tools like IntelliJ to display such problems directly.

The following code, which uses the `@Nullable` annotation, leads to a warning in the analysis:

{{< highlight java >}}
void check(@Nullable String value) {
    Objects.hash(value.toLowerCase());
}
{{< / highlight >}}

In this example, the `@Nullable` annotation defines for the variable `value` that it can have the value `null`. However, the fact that the code directly accesses the variable potentially leads to a `NullPointerException` at runtime. This would also be evaluated by the static code analysis and reported as a problem.

## Integrating Static Code Analysis into Your Project

If you want to integrate such static code analysis into your own project, you need to meet a few simple prerequisites. First, you need to choose one or more analysis tools. Here, I recommend [SpotBugs](https://spotbugs.github.io/), which is the successor to FindBugs. The tool can be started either via the command line or integrated into a Gradle or Maven build. To analyze the problems found, you can either view them in the SpotBugs' own Swing client or, for example, as an HTML-based overview as part of a generated Maven site using the Maven `site` goal. You can configure the tool to upload the results, for example, to Sonar or SonarCloud.

If you want to use `@Nullable` and `@NonNull` annotations in your project, you need a library that provides the annotation. Your own project only needs to depend on the library at compile time. Unfortunately, there is a plethora of libraries that provide annotations here as well. Examining the individual libraries based on their advantages and disadvantages will be the subject of its own post. Therefore, I initially recommend SpotBugs Annotations as a dependency, which you can find under the following Maven coordinates:

{{< highlight xml >}}
<dependency>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-annotations</artifactId>
    <version>4.7.3</version>
</dependency>
{{< / highlight >}}

The abundance of tools and libraries unfortunately does not make it easy to find the perfect and future-oriented combination. When I delved deeper into the topic, I was shocked that much in this area is still not defined by standards or generally used best practices. While there have been various approaches such as [JSR305](https://jcp.org/en/jsr/detail?id=305), these have always run aground at some point and are now used in a wild mix. Therefore, I will also dedicate a separate post to this problem in the near future.

(rme)