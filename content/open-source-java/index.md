---
title: "Open Source Java"
description: "TODO"
layout: "single"
url: "/open-source-java"
---

The Java platform is one of world's most used digital tools and especially the use of Java as a programming language for
web services, web applications and enterprise services or applications is indispensable in the digitalized world.
What makes the programming language so special is that both the platform on which Java runs and the programming 
language are available as open sources. The resulting Java distributions are also mostly available free of charge.
This means that in many areas **open source Java** is available to developers around the world without having to pay for it.

## What is Java?

Most people think of Java exclusively as the programming language, being one of the most widely used programming
languages in the world. For the past 20 years, it has been virtually consistently in the **top 3 most popular
programming languages** in the highly respected [Toibe Index](https://www.tiobe.com/tiobe-index/).
In addition to the programming language, however, the term Java also refers to the runtime environment in which Java
programs can be executed: the Java Virtual Machine (JVM). 

{{< centered-image src="toibe-de.png" width="100%" showCaption="true" alt="Percentage share of Java in the Toibe Index over the last 20 years">}}

This particular combination of programming language and runtime environment allows Java applications to run on any
machine that has a JVM installed.
This also inspired one of Java's mottos: **"Write Once, Run Anywhere" (WORA)"**.
Both the components of the programming language and the source code of Java's JVM can be found in the OpenJDK,
which contains the open source sources of Java.

{{< centered-image src="wora-de.png" width="80%" alt="Layers of a Java application">}}

## What does open source mean?

Open source can be found in **most areas of our digital everyday life today** and is often taken for granted.
Starting with our smartphones: Both iOS (_Apple_) and Android (_Google, Samsung, etc._) are based on a wide range of open
source components. For example, a large part of the security and encryption algorithms used are open source.
The same applies to the Safari and Chrome browsers. Both are based for the most part on open source software (OSS).
But it is not only in our private use that we are encountering open source applications more and more - 
the significant majority of all German companies also use open source software.

{{< centered-image src="os-logo.png" width="50%" alt="Open Source Initiative logos">}}

**Open source is a strong driver of innovation.**
After all, there are no licensing costs, nor does one have to worry about usage rights being restricted by the
originator in the future. Open source means that the **source code can be viewed openly**.
This allows developers to exchange information on open source projects and develop them together.
Open source does not mean that just anyone can change the sources.
However, today there are workflows that allow people external to the project to contribute to an open source project.
This has a positive effect on diversity in OSS, as it allows anyone to contribute to open source.
The largest platform for open source software, on which the sources of the OpenJDK - i.e. Java - can be found,
is [GitHub](https://github.com/).

{{< centered-image src="pull-request-de.png" width="80%" alt="Pull request workflow to collaborate on OSS as an external developer">}}

### In which areas is open source commonly used?

It is usually underestimated in how many areas we actually engage with open source software (OSS):

- **Infrastructure and Services:** Linux, WordPress
- **Applications:** Firefox, Open Office
- **Software & Web Development:** Java, Java Script, Angular
- **Protocols, formats and interfaces:** HTTPS, PDF, ZIP, Bluetooth

In addition, there are projects and products that use open source components internally.
For example, large parts of Google Chrome are based on OSS, every DVD player contains open source software
(usually Java) and the same applies to smart phones, TVs, cars or vacuum cleaner robots.
In addition to these products, some of the world's most popular online services are also built on OSS:
YouTube, Netflix, PayPal or eBay are all built on an open source base. 

### Advantages of Open Source

Probably the most obvious advantage of open source software is that it is free to use.
Other advantages that are perceived as very positive, especially by companies, can be found in the following diagram:

{{< centered-image src="os-benefits-de.png" width="80%" alt="Survey result on what added value companies see in OSS">}}

However, OSS brings many more positive aspects:

- **Intellectual capital exchange and education:**
  Thanks to the open codes in open source projects, they also serve as valuable educational resources.
  Codes can be learned, programmers can exchange ideas about them and thus drive other projects forward.
  Since the basics of open source software are already available to everyone, a high rate of innovation for new projects
  can be realized.

- **Transparency:**
  Since the codes are openly accessible, there is a high degree of transparency. Any defects or hidden functions are
  visible. Open source thus creates trust through transparency.
  This trust is strengthened by the fact that there is a source code control system, whereby every change in the source
  code can be checked for functionality and the code sequences can be assigned to a specific person as the author.
  For the open source Java runtime environment, for example, there is the testing and quality framework AQAvit. 

- **Vendor independence:**
  Open source projects like Java run independently of software vendors and their business models.
  This is important to ensure long-term availability.
  In addition, bugs do not have to be fixed by a central development team of a software provider, but can in principle
  be addressed by the entire developer community.

- **Social Equity:**
  Open Source accomplishes what many other educational offerings fail to do:
  OSS is available to people from all social and economic backgrounds. 

- **Stability & Performance:**
  The special characteristics of open source software make it possible to work on it continuously.
  Transparent testing procedures, such as Eclipse AQAvit ensure that codes meet high performance standards.

- **Easy integration:**
  The source codes of OSS can be individually adapted to the specific use case.
  This means that the software can be easily integrated into the existing infrastructure.

## Open Source Java - the OpenJDK

Both the **Java** programming language and the platform for running Java applications, the Java Virtual Machine (JVM),
are **based on the OpenJDK sources**. Initially, Java was invented and developed by Sun Microsystems.

Since Oracle bought Sun Microsystems, it currently is the main developer in the OpenJDK.
Basically, however, the **OpenJDK is open source**, which is why more and more companies and also individual persons
contribute source code to the OpenJDK. The OpenJDK can be found as a project on [GitHub](https://github.com/openjdk).
The following image shows which companies have contributed changes to Java 19
(i.e. changes added between the release of Java 18 and 19).

**TODO Bild: verschiedene Contributions**

The OpenJDK source code can be divided into three parts:

- Programming language source code
- Source code for the platform (JVM)
- Source code for tooling (e.g. the compiler of Java)

Users of Java download a **distribution** in the form of the **JDK (Java Development Kit)**, which contains all
three components and is used to program and run Java applications. 

The **OpenJDK** itself only provides so-called **"general availability"** versions of Java for download.
These are not intended for use in the enterprise environment.
However, the OpenJDK defines the versions of the source code (e.g. version 17.0.1) so that all providers of Java 
distributions have the same starting base.
Who would like to use Java productively, should download therefore a distribution of a specific provider
(Oracle, Microsoft, RedHat).
By far the **most widely used distribution is [Eclipse Temurin](https://adoptium.net/de/temurin/releases/)**,
which is provided by the Eclipse Foundation as a **"user-neutral" distribution**.

**TODO Bild: verschiedene Distributionen**

Many of the available runtime environments are tested for **compatibility with the official standard** by the **Java
Test Compatibility Kit (TCK)**.
Therefore, there are also numerous distributions and support services beyond Oracle that offer full functionality
to their users.
Eclipse offers a [marketplace](https://adoptium.net/en-GB/marketplace/) where users can download an overview of all
Java distributions verified by TCK and AQAvit. 

### Why are there different providers at all?

For open source projects like Java, there are different support offerings and requests depending on the usage.
For example, some companies, like Oracle, make their own internal changes when they build their commercial distribution.
These changes are never added open source to the OpenJDK.

## Why should I invest money in Java support when it is open source software?

Open source software applications are popular specifically because they are available free of charge.
So why should companies invest money in a support service?

In order for your **Java applications to perform over the long term**, you need to be familiar with and maintain not
only the application itself, but also the runtime environment.
The functionality, innovations and specifics of the Java runtime environment as well as the Java tooling and language
is extremely complex and knowledge needs to be constantly updated.
In addition, knowledge about possible vulnerabilities must be known early on and disseminated within the company.
This is the only way to avoid security vulnerabilities.
Companies rarely have the necessary resources to meet this challenge.
However, since open source software such as Java is now often part of a company's **critical infrastructure**, external
support is needed. 

Open Elements Support & Care helps companies with this important task.
We help with the upkeep and maintenance of the Java runtime environment.
As part of our [Eclipse Temurin support](/support-care-landingpage-temurin/), we inform you about updates to Temurin,
offer webinars and meetings, as well as direct support in case of questions and problems.
