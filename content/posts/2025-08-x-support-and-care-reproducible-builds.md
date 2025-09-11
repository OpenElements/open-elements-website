---
outdated: false
showInBlog: true
title: "Jira Issue to GitHub Issue Migration in Apache Maven"
date: 2025-08-08
author: sandra
excerpt: "This blog post details the Apache Maven Support and Care team’s funded effort to migrate issues from Jira to GitHub, supported by the German Sovereign Tech Fund. This post provides valuable insights into the challenges of migrating large-scale issue tracking systems and the importance of thorough planning and adaptation and why this was only possible with a funding."
categories: [open-source, support-and-care, maven]
preview_image: "/posts/preview-images/open-source-green.svg"
---
In this blog post, we'd like to share how funding can help in improving the Supply Chain Security in software projects as part of the Cyber Resiliance Act.

Our [Support and Care]({{< relref "support-care-maven" >}}) project got financially supported by the [German Sovereign Tech Fund](https://www.sovereign.tech/) (STF) to work on the following four packages of [Apache Maven](https://maven.apache.org/)™:

- Security of the Supply Chain
- Maintenance
- Modernization of Core Features
- Documentation

One task in the *Security of the Supply Chain* working package was to share information about existing solutions and what how to improve existing projects.

Image placeholder:
{{< centered-image src="/posts/2025-08-08-support-and-care-jira-gh-migration/migration-automation.png" width="80%" showCaption="false" alt="Jira Issue to GitHub Isssue Migration">}}

## Security of the Supply Chain in software development
Since December 2014, the Cyber Resilience Act has been active as the *first European regulation to set a minimum level of cybersecurity for all connected products available*.(https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Cyber_Resilience_Act/cyber_resilience_act_node.html)
To achieve this goal, improving the security levels of the supply chain in software projects is a significant milestone.
But what is part of this supply chain?
In general, everything touching anything from the software, including the IDE, necessary software libraries, and the used CI/CD pipeline, is part of this chain.
And with it as part of the chain, everything is also a worthy target for an attack.
Exploit statistics (https://www.sonatype.com/state-of-the-software-supply-chain/2024/10-year-look) and even older exploits like CVE-2002-0083 are showing that even a single bit will decide whether a piece of software,
OpenSSH, in that particular example, is secure or may be used to manipulate code or execute malicious software. Therefore, it is essential to be aware of the risks that a software supply chain can involve.

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
If you are more interested in what possibly went wrong at other people's projects, there is plenty of documentation and academic papers even outside the Java and Maven ecosystem.
https://reproducible-builds.org/docs/publications/ or https://arxiv.org/html/2504.21679v1 as a concrete example may be good starting points.

## Let's find out
Let's assume we have a Java project that is built with Maven. To not mix too many things up, we start with a pretty simple approach:
Apart from the pom and folder structure, we have 1 class. This class contains the main method and a System.out.println("Hello world!").
We have no dependencies and only the mentioned Maven Artifact Plugin in our pom. You may have a look at that project here: (Github Link)
Now, I can, of course, run _mvn clean install_ as often as I want; it will most likely always work.
But what about reproducibility?
Let's run _mvn clean verify artifact:compare_ and find out.
(Screenshot)
Oh. We are not? No, even worse: we are practically never. Having a look at the generated .buildinfo-file while executing the Artifact plugin again shows that our hash is changing with every build.
The console gives us some hints, and it looks like we didn't do our homework properly.
Let's add the property project.build.outputTimestamp to the pom with a default value. Otherwise, our build timestamp will vary every time we build, and therefore, the corresponding hash also changes every time.
Now we can consider our build reproducible! So we are safe. But how long? What happens if I modify the JVM I build my project with?
Let's try it out. Instead of Java 17 as before, I will update my JVM to 21. And again, the build is different. The good thing: it is only different compared to what we built before.
When we override our installed version in the local Maven repository, the build is reproducible again.
As you can see, even for a very simple project, there are issues we need to solve.
For more detailed real-world issues, I would suggest you have a look at this list from reproducible.org: https://s.apache.org/reproducible-builds .
Reproducibility can be a challenging goal to achieve, but now you should be best prepared to start with reproducible builds and how to improve.

## Summary
Supply Chain security in software development as part of the Cyber Resiliance Act is more important than ever before. Developers are unfortunately worthy targets for attacks, and they may not even recognize it while doing their job: building software.
Reproducible builds are most likely quite a task to achieve, but knowing about potential pitfalls and trying to reach that goal can be a good start for further improvements.
Compared to the risk, being the next company on the rapidly growing list of companies that have been victims of malicious code injections and ignoring this topic, hardening one's own Software Supply Chain is the far better approach.
