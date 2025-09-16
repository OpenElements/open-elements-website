---
outdated: false
showInBlog: true
title: "Reproducible builds"
date: 2025-09-12
author: sebastian
excerpt: "This blog post features an overview of what reproducible builds are and why they provide value in the context of software supply chain security. Since the announcement of the European Cyber Security Act (CRA), supply chain security is in the spotlight of many companies. The purpose of this blog post is to provide ideas and guidelines about the critical concept of reproducible builds. The German Sovereign Tech Agency supports this blog post."
categories: [open-source, support-and-care, maven, security]
preview_image: "/posts/preview-images/open-source-green.svg"
---
In this blog post, we'd like to share how to improve the Supply Chain Security in software projects as part of the Cyber Resilience Act.

Our [Support and Care]({{< relref "support-care-maven" >}}) project got financially supported by the [German Sovereign Tech Fund](https://www.sovereign.tech/) (STF) to work on the following four packages of [Apache Maven](https://open-elements.com/articles/what-is-maven/)™:

- Security of the Supply Chain
- Maintenance
- Modernization of Core Features
- Documentation

One task in the *Security of the Supply Chain* working package was to share information about existing solutions and what how to improve existing projects.

## Security of the Supply Chain in software development
Since December 2014, the Cyber Resilience Act has been active as the *first European regulation to set a minimum level of cybersecurity for all connected products available*.(https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Cyber_Resilience_Act/cyber_resilience_act_node.html)
To achieve this goal, improving the security levels of the supply chain in software projects is a significant milestone.
But what is part of a software supply chain?
In general, everything touching anything from the software, including the IDE, necessary software libraries, and the used CI/CD pipeline, is part of this chain.
And with it as part of the chain, everything is also a worthy target for an attack.
Exploit statistics (https://www.sonatype.com/state-of-the-software-supply-chain/2024/10-year-look) and even older exploits like CVE-2002-0083 are showing that even a single bit will decide whether a piece of software,
OpenSSH, in that particular example, is secure or may be used to manipulate code or execute malicious software. Therefore, it is essential to be aware of the risks that a software supply chain can involve.
{{< centered-image src="/posts/2025-09-12-support-and-care-reproducible-builds/software-supply-chain.png" width="80%" showCaption="false" alt="Software Supply Chain Security">}}

## Reproducible Builds
One tool in the toolbox against those attacks is reproducible builds. To consider a component or project reproducible, it is necessary to produce bitwise identical builds every time.
At first thought, that doesn't sound too complicated.
Let's assume we are in the context of a Java project that is built with Maven.
The output of a *mvn clean install* is a jar-file, a compressed folder containing different folders and files like classes and configurations.
The *install* command makes sure that this artifact is also moved to my local Maven repository. To prove reproducibility, I will need a tool that is capable of taking at least two jar files, unpacking them, and comparing them recursively to check every folder and file. Ideally, I would also receive a report on what is different so that I can analyze potential issues.
Luckily, there already exists such a tool: *diffoscope*.

## diffoscope
The actively maintained open-source tool diffoscope can compare two files or archives bit-by-bit and output a list of differences. Plenty of file types are supported, even images like .png or whole filesystems, see (https://diffoscope.org/) for details.
Diffoscope can be executed on various operating systems, as well as in a prepared Docker image, and is licensed under the GPL-3.
Now that we have the context of our software project, we know what we need to do to hopefully achieve a reproducible build, and we know the tool that can compare our builds. So are we done yet?
Maybe we should stick to our context for a moment. Maven, as a Java build tool, has a broad community and ecosystem, speaking of plugins and extensions.
The Maven community has already prepared something to make things a bit easier:

## Maven Artifact Plugin
The Maven Artifact plugin serves as a wrapper around *diffoscope* that can be easily integrated into any Maven project. (https://github.com/apache/maven-artifact-plugin)
The plugin can compare the artifact we build against locally installed variants or those located in a remote repository, such as Maven Central or the company's Nexus.
It does even more. While comparing, it generates a *buildinfo* file. As long as we are developing some open-source artifact or component,
we can put this file into the reproducible central project on GitHub (https://github.com/apache/maven-artifact-plugin)

## Reproducible Central
Again, there is something already prepared for our use case: the GitHub repository *Reproducible-Central*. On the overview page, we find a list of 900 projects that are already reproducible or at least on their way to becoming fully reproducible.
The list is regularly recreated based on monthly rebuilds of every artifact and its releases. If our artifact makes it on this list as reproducible, chances are very high that our project is not only reproducible on our local machine.
But why aren't all projects reproducible? What we've learned so far is that Maven can rebuild the project, and as long as we've done our homework, e.g., regarding flaky tests, we are done here, aren't we?
Sadly, it is not that trivial.

## The issue with full reproducibility
Of course, having a Maven build that never fails is an auspicious start. But sadly, a successful Maven build is potentially far away from reproducibility.
In our example, a Java project built with Maven, we have plenty of risk factors that may prevent us from having a real reproducible build.
Let's start with the JVM as an example. When I rebuild the exact project with different JVMs, my build is **not** reproducible. The reason is quite simple: Different JVMs produce different bytecode from the same Java files. Even some dependencies behave differently depending on the Java version they are built with.
At last, it all depends on your project. Java code, dependencies, and even Maven itself may contain pitfalls such as generated content, timestamps, or even differing usages of Maven as a standalone version or an Eclipse-built-in version.
At this point, I recommend starting by using the maven plugin as described here(https://maven.apache.org/guides/mini/guide-reproducible-builds.html) and trying to understand what is preventing you from having a fully reproducible build. Unfortunately, reproducibility can be a huge task to fulfill.
If you are more interested in what can possibly go wrong, you can find plenty of documentation and academic papers even outside the Java and Maven ecosystem:
https://reproducible-builds.org/docs/publications/ or https://arxiv.org/html/2504.21679v1 as a concrete example may be good starting points.

## Putting all pieces together
Let's assume we have a Java project that is built with Maven. To not mix too many things up, we start with common approach:
We go to the Spring initializr project (https://start.spring.io/) and generate a Maven POM. To keep it simple but pragmatic, we only use Spring Web as feature. 
After importing the project in our preferred IDE, we can build this project as usual with _mvn clean install_.
In order to use the Artfiact Plugin mentioned above we need to add it to the POM:
{{< centered-image src="/posts/2025-09-12-support-and-care-reproducible-builds/artifact-plugin.png" width="80%" showCaption="false" alt="Maven artifact plugin in POM">}}

With _mvn verify artifact:compare_, we can run the plugin and let it check if there are any reproducibility issues compared to the local artifact we have built before.
As expected, we don't have a reproducible build, but the console is telling us at least what is not fully reproducible.
The POM looks fine, but our built jar seems to have an issue with the build timestamp. 
(Screenshot console)
Therefore, let's add the property project.build.outputTimestamp to the POM with a default value as mentioned on https://maven.apache.org/guides/mini/guide-reproducible-builds.html.
Running _mvn verify artifact:compare_ again shows: The build is now reproducible!
That was easy, maybe a bit too easy? Well, this is a brand-new project without any technical debt or source code.
Let's try something from reproducible-central, that is not reproducible: What about Jetty 12.1.1?
Eclipse's Jetty is a commonly used and lightweight web servlet. With its mature codebase, the first release on GitHub, version 9.4, dated back to 01.10.2020, it appears to be a good candidate for a real-world example.  
As there are plenty of submodules, I focus on Jetty-Util, a submodule of Jetty-Core.
To have a faster build, I skip the test execution as tests are not part of the final jar file.
After running _mvn clean install_, I execute the Artifact plugin with _mvn clean verify artifact:compare_ as before.
And there we have it: we have reproducibility issues. Again, let's look at the console output:
{{< centered-image src="/posts/2025-09-12-support-and-care-reproducible-builds/blackened-console-output.png" width="80%" showCaption="false" alt="Console output not reproducible build">}}

_project.build.outputTimestamp_ is set, so this is not an issue. We have to dig deeper.
The console output lists issues in the sources and what command I could use for further investigation. To avoid problems related to my local machine, I use podman as stated on diffoscope.org with
_podman run --rm -t -w $(pwd) -v $(pwd):$(pwd):ro \ registry.salsa.debian.org/reproducible-builds/diffoscope jetty-util-12.1.1.jar m2-jetty-util-12.1.1.jar_
where the first jetty file is from the current /target directory of jetty-util, and the latter file is the one I installed before in my local Maven repository.
The output looks as follows:
{{< centered-image src="/posts/2025-09-12-support-and-care-reproducible-builds/docker-diffoscope-comparison.png" width="80%" showCaption="false" alt="Docker diffoscope comparison">}}

Another timestamp issue! Let's try to temporarily fix the issue by entering a static number.
After generating two new jar files with the approach described before, I compared them again.
Hurray, both jetty.jar and jetty-sources.jar are now considered reproducible!
Therefore, the open issue, at least for this submodule, is to find a suitable solution for this always-varying timestamp. Since I am not a contributor to this project, I cannot decide whether it is a good idea to use a static value here in general or if other parts are relying on this number.
Reproducibility can be a challenging goal to achieve, but now you should be best prepared to start with reproducible builds and how to improve.

## Summary
Supply Chain security in software development as part of the Cyber Resiliance Act is more important than ever before. Developers are unfortunately worthy targets for attacks, and they may not even recognize it while doing their job: building software.
Reproducible builds are most likely quite a task to achieve, but knowing about potential pitfalls and trying to reach that goal can be a good start for further improvements.
Compared to the risk, being the next company on the rapidly growing list of companies that have been victims of malicious code injections and ignoring this topic, hardening one's own Software Supply Chain is the far better approach.
