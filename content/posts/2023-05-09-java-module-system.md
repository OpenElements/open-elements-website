---
outdated: false
showInBlog: true
title: "Java's Module System: Help, My Dependencies Are Not Java Modules!"
date: 2023-05-09
author: hendrik
excerpt: "With Java, you can now modularize applications quite well, but you also have to consider dependencies. When these are not Java modules, it gets interesting."
categories: [Java]
origin: https://www.heise.de/blog/Javas-Modulsystem-Hilfe-meine-Abhaengigkeiten-sind-keine-Java-Module-7536607.html
preview_image: "/posts/2023-05-09-java-module-system/preview.jpg"
---

In a [previous post](https://www.heise.de/blog/Softwareentwicklung-Minimale-Unterstuetzung-fuer-das-Java-Modulsystem-7434695.html), I wrote about minimal support for the Java Module System (Java Platform Module System, JPMS) and how you can help achieve it.
However, it can always happen that libraries do not support the Java module system, and it is also not foreseeable that they will be available as "automatic modules" in the future.

If you want to migrate your own code to JPMS and depend on such libraries, you sometimes have to resort to tricks.
In this post, I would like to address precisely such dependencies and see how you can deal with them.

## Gradle Plugin as a Remedy

Although I feel more at home with Maven, I recently worked on migrating a large Gradle project to Java modules.
Since the project is open source, it can be easily [viewed on GitHub](https://github.com/hashgraph/hedera-services).
At the beginning of the migration, this project had a multitude of dependencies that did not support the Java module system.
For some, we were able to achieve a sustainable solution by creating direct pull requests (PRs) at the respective projects to add an `Automatic-Module-Name`.
I have already described in the [previous post on this topic](https://www.heise.de/blog/Softwareentwicklung-Minimale-Unterstuetzung-fuer-das-Java-Modulsystem-7434695.html) how you can easily achieve this using a Maven or Gradle plugin.
An example of such a PR can be found [here](https://github.com/offbynull/portmapper/pull/48).

However, there are also dependencies for which you cannot simply create such a PR or where the PR is not accepted.
Perhaps you also have a dependency whose further development has been discontinued.
In all these cases, a different implementation is needed.
Basically, you have to take care of creating Java modules from the dependencies yourself.
There are different ways to do this.
For example, you can manually add an `Automatic-Module-Name` entry to the manifest of the JAR and then host the modified version in an internal Maven repository.
For the mentioned Gradle project, we fell back on the "extra-java-module-info" plugin by Jendrik Johannes.
This [open-source plugin](https://github.com/gradlex-org/extra-java-module-info) allows you to add an `Automatic-Module-Name` entry to dependencies at build time.
Specifically, the plugin is used as in the following example, where for each `automaticModule(...)` call, the Gradle identifier of the dependency is passed as the first parameter and the module name to be used as the second parameter:

{{< highlight java >}}
plugins {
    id("org.gradlex.extra-java-module-info")
}

extraJavaModuleInfo {
    failOnMissingModuleInfo.set(true)

	automaticModule("io.prometheus:simpleclient", 
	                "io.prometheus.simpleclient")
	automaticModule("io.prometheus:simpleclient_common",
	                "io.prometheus.simpleclient_common")
	automaticModule("io.prometheus:simpleclient_httpserver", 
	                "io.prometheus.simpleclient.httpserver")
}
{{< / highlight >}}

Together with the author of the plugin, we were even able to significantly extend it in a very productive exchange.
In addition to automatic modules, the plugin has always been able to create modules with a `module-info.java`.
However, you had to manually define things like exports.
Thanks to new functionalities, you can now define a module so that its complete packages are exported ([see further info](https://github.com/gradlex-org/extra-java-module-info/issues/38)).
This has the great advantage that you do not have to work with automatic modules, which bring some peculiarities with them, since, among other things, all automatic modules are added to the "required" dependencies of a module as soon as an automatic module is specified as "required" in the `module-info.java` (see [Java spec](https://docs.oracle.com/javase/specs/jls/se16/html/jls-7.html#jls-7.7.1)).
Once again, a big thank you to Jendrik Johannes as the maintainer of the library.
Our collaboration has, in my opinion, extremely well demonstrated the advantages of open source.
For anyone who wants to go deeper into this topic, Jendrik has hosted several videos on this and other topics around Gradle for free [on YouTube](https://www.youtube.com/@jjohannes).

## One Problem Remains

However, one last major problem cannot be solved even with the implementations presented here: As soon as a JAR violates the package split constraints of the Java module system, it cannot be added to the module path.
In this case, much more far-reaching steps must be taken.
However, I will address this point in a future post.

(rme)