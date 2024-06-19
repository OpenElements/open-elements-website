---
outdated: false
showInBlog: true
title: "Software Development: Minimal Support for the Java Module System"
date: 2024-01-11
author: hendrik
excerpt: "The Java Module System remains an underutilized feature in the development of applications and libraries, despite its often straightforward entry point."
categories: [Java]
origin: https://www.heise.de/blog/Softwareentwicklung-Minimale-Unterstuetzung-fuer-das-Java-Modulsystem-7434695.html
preview_image: "/posts/2024-01-11-java-module-system/preview.jpg"
---

Over the past few years, there have been many differing opinions about the Java Module System. While many developers are positive about the standardized way to define modules, there are also critical voices pointing out missing features, such as version support. However, I do not intend to delve into this debate here. Personally, I see many advantages in the module system and understand why framework and library developers would (want to) use it.

One major drawback is that a (transitive) dependency that is not adapted to the Java Module System may not fit the definitions and constraints of the module system and thus cannot be added to the module path. The Java Module System automatically creates a module for each JAR it finds on the module path. This can lead to some issues, which can often be resolved with minor adjustments in a library.

In several posts, I will take a closer look at these problems and suggest possible solutions. This post focuses on the use and definition of automatic modules.

## Implementing Modules as Automatic Modules

A key definition of the module system is that each module requires a unique name. There is a distinction between explicitly declared modules, which have a `module-info.java`, and automatic modules, which are implicitly declared. More information can be found in the [Java SE Spec](https://docs.oracle.com/javase/specs/jls/se16/html/jls-7.html#jls-7.7.1). If you do not want to leverage the benefits of the module system by using a `module-info.java` in your project, it is sufficient to define your library as an automatic module.

The only requirement is that the module has a unique name. Although Java can extract a name from the JAR file name if necessary, this is not recommended. Defining a name for an automatic module is very simple. You only need to define the `Automatic-Module-Name` property in the `MANIFEST.MF` of the JAR. If you use Maven or Gradle as your build tool, you can even automate this process with a plugin.

As shown in the following example, you only need to configure the maven-jar-plugin for a Maven build:

{{< highlight xml >}}
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.3.0</version>
    <configuration>
        <archive>
            <manifestEntries>
                <Automatic-Module-Name>com.example.lib</Automatic-Module-Name>
            </manifestEntries>
        </archive>
    </configuration>
</plugin>
{{< / highlight >}}

In Gradle, you can achieve this by using the Java Library Plugin, which should be part of every Java build. Detailed documentation for using Gradle can be found [here](https://docs.gradle.org/current/userguide/java_library_plugin.html#sec:java_library_modular_auto), while the following code shows a simple integration into a project:

{{< highlight java >}}
tasks.jar {
    manifest {
        attributes("Automatic-Module-Name" to "com.example.lib")
    }
}
{{< / highlight >}}

## Next Steps

Since these changes are very simple, they are also ideal for offering as a pull request for open-source libraries. [In one example](https://github.com/offbynull/portmapper/pull/48), I added a PR to define an `Automatic-Module-Name` to an open-source Java library. Perhaps an open-source developer is reading this and will create a "Good First Issue" for such a change to their libraries, which could be implemented by newcomers during events like [Hacktoberfest](https://hacktoberfest.com/).

(rme)