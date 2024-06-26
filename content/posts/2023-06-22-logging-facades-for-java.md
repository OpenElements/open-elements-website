---
outdated: false
showInBlog: true
title: "Logging Facades for Java"
date: 2023-06-22
author: hendrik
excerpt: "Logging is an important part of error analysis. However, consolidating different logging libs in Java applications is always a challenge."
categories: [Java]
origin: https://www.heise.de/blog/Logging-Facades-fuer-Java-7355974.html
preview_image: "/posts/2023-06-22-logging-facades-for-java/preview.jpg"
---

After covering best practices and pitfalls in the [first post on Java logging](https://www.heise.de/blog/Best-Practices-und-Anti-Pattern-beim-Logging-in-Java-und-anderen-Sprachen-7336005.html), I now want to look at using logging in a large project.
Problems often arise in this area between different logging frameworks, and consolidating the entire application logging can sometimes be difficult.

To better understand the issue, I'll start with a very simple example, almost the "Hello World" of logging.
The following code shows a minimal Java application that simply logs a message:

{{< highlight java >}}
public class HelloLogging {

    private static final Logger LOG = Logger.getLogger("HelloLogging");

    public static void main(final String[] args) {
        LOG.info("Hello World");
    }
}
{{< / highlight >}}

Even in this trivial application, logging can be configured through the features of the logging framework, in this example `java.util.Logging` (JUL), and output to a file or the console (shell).
The following diagram shows the structure and configuration of logging in a schematic layout.

![Logging Structure](/posts/2023-06-22-logging-facades-for-java/structure-logging.jpg)

## A Realistic Scenario

While the given setup works well for a small project, it sometimes becomes problematic as soon as the first dependencies are added.
Let's imagine that we need two dependencies for our application: a library to provide access to a database and another dependency on a security library to secure our application against attacks.
Since the developers of these libraries also want to output information about its state, usage and runtime errors, they also use logging.
However, these libraries do not use `java.util.Logging`, but rather other logging libraries.
As you can see in the following diagram, we assume that [Log4J2](https://logging.apache.org/log4j/2.x/) and [Logback](https://github.com/qos-ch/logback) are in use.

![Log4J2 and Logback Structure](/posts/2023-06-22-logging-facades-for-java/application-logging.jpg)

Now we have the problem that the logging of our application is handled by three different logging frameworks.
Although Log4J and Logback also offer enough configuration options, since the logging frameworks do not synchronize with each other, it would be a really dumb idea to have all frameworks write to the same file.
It can happen that several of the frameworks write to the same line, resulting in an unreadable jumble of randomly strung together text snippets or even deadlocks.
Another idea is to have each framework log to its own file, as indicated in the following diagram.

![File Per Framework Structure](/posts/2023-06-22-logging-facades-for-java/extended-application-logging.jpg)

This setup causes the loggings to act completely independently of each other and not get in each other's way.
This results in clean logging, but it is distributed across multiple files that you have to synchronize manually or with the help of tools.
In addition, you always have to configure all available logging systems, for example, if you want to activate a higher logging level for application analysis.
To make matters worse, in a real project you have more than just two dependencies, and so there can be even more logging frameworks in use.

## Global Logging Through the Use of a Facade

Logging facades provide a solution here.
With a facade, you can separate the code from a concrete implementation.
The [Simple Logging Facade for Java](https://www.slf4j.org/) (SLF4J) has clearly established itself as the standard here.
SLF4J provides a logging API that comes as a single dependency without transitive dependencies and can be easily integrated into almost any system.
The API can be used in this case to generate concrete log calls in the code.
The following code shows a "Hello World" logging example:

{{< highlight java >}}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloLogging {

    private static final Logger logger = 
      LoggerFactory.getLogger(HelloLogging.class);

    public static void main(String[] args) {
        logger.info("Hello World!");
    }
}
{{< / highlight >}}

Looking at this code alone, one might wonder what advantages SLF4J offers over classic Java logging.
One of the most important points is that `org.slf4j.Logger` is an interface.
The `slf4j-api` module, which contains the SLF4J API and thus the mentioned interface, does not provide an implementation of the interface.
The entire module only defines the public SLF4J API, the logging facade.

To use it, we must provide an implementation.
For this, a so-called binding must be added as a dependency, which provides an implementation of the logging facade.
Usually, such a binding forwards the logging events to a concrete logging framework.
For example, if you want to use Apache Commons Logging as the concrete logging implementation, you only need to add the `slf4j-jcl-VERSION.jar` module to the classpath.
Such bindings are not needed at compile time and can therefore be specified as a runtime scope in Maven or as a "RuntimeOnly" dependency in Gradle.
Since SLF4J internally uses the Java SPI, no code needs to be adapted to use the concrete logging implementation.
We can now use this feature for our sample application:

![Example Application Structure](/posts/2023-06-22-logging-facades-for-java/example-application-logging.jpg)

In the diagram, Log4J2 is used as the logging implementation, and by adding a suitable binding, all log messages created via the `org.slf4j.Logger` logger are automatically forwarded to Log4J2.
Since in this example our "Database lib" dependency apparently also uses Log4J2, the messages from different internal and external modules are thus handled directly via Log4J2.
In addition to the bindings to specific logging implementations, SLF4J also offers the slf4j-simple library, which provides a minimal implementation of SLF4J and outputs messages to the console (`System.error`).

However, there is still a problem in the example: The used "Security lib" uses Logback as a logger, and its messages therefore still end up in a different output.
For such cases, so-called adapters for SLF4J can be used.
These allow log messages that are sent directly to a logging API to be forwarded to SLF4J.
There are completely different implementation approaches for such adapters depending on the logging framework.
While SLF4J offers some of these adapters, they are also sometimes provided directly by the logging frameworks.
For Log4J2, for example, the following dependency must be added if you want to forward messages from Log4J2 to SLF4J:

{{< highlight xml >}}
<groupId>org.apache.logging.log4j</groupId>
<artifactId>log4j-to-slf4j</artifactId>
{{< / highlight >}}

By adding this dependency, which you should preferably only add to the runtime classpath, a logging flow is created as shown in the following diagram:

![Logging History](/posts/2023-06-22-logging-facades-for-java/history-logging.jpg)

SLF4J provides a good overview of the integration through bindings and adapters for various logging libraries [on their website](https://www.slf4j.org/legacy.html).

If we now look at our sample application based on these findings, we can achieve our goal by adding an adapter for Logback.
As shown in the following diagram, all log messages of the entire system are routed via Log4J2, and we thus have the advantage that we only have to document one central location.

![Central Logging](/posts/2023-06-22-logging-facades-for-java/central-logging.jpg)

(rme)