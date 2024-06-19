---
outdated: false
showInBlog: true
title: "Java Without Headaches: Distributions and Support Beyond Oracle"
date: 2023-08-03
author: hendrik
excerpt: "There isn't just one provider for Java distributions and support. Gartner has analyzed the options in a report, and Oracle doesn't fare well."
categories: [Java]
origin: https://www.heise.de/blog/Java-ohne-Kopfschmerzen-Distributionen-und-Support-jenseits-von-Oracle-9232113.html
preview_image: "/posts/2023-08-03-distributions-and-support-without-oracle/preview.jpg"
---

For most companies, both Java as a programming language and the JVM as a runtime environment are critical infrastructure on which a large part of our digital world is built. Since it is always advisable to have appropriate support options for critical infrastructure in the enterprise environment, many companies have a commercial support contract for Java. Historically, these contracts were often concluded with Oracle, as the company was the most prominent provider of Java distributions for a long time. However, much has changed in this area in recent years, raising the question of whether Oracle is still the best partner for commercial Java support.

## Diversity in the Runtime Environment

In many areas of today's world, diversity is an important topic, as it brings new perspectives, solutions, and opportunities. This has also been the case in the field of Java runtime environments in recent years. The days when developers primarily downloaded Java from Oracle because it was the dominant player in Java distributions are long gone. With the growing popularity of open source, more and more companies are working on [OpenJDK](https://openjdk.org/), the open-source implementation of the Java Standard Edition. Since Oracle's distributions are also built from these sources, it is easy to switch to alternatives. Additionally, many runtime environments are tested for compatibility with the standard through the Java Test Compatibility Kit (TCK).

Eclipse has [opened a marketplace](https://adoptium.net/de/marketplace/) where all TCK and AQAvit verified or licensed Java runtime environments are available for download. In addition to various builds from companies like Microsoft or Azul, [Eclipse Temurin](https://adoptium.net/de/) stands out as the only vendor-independent variant. The Eclipse Adoptium working group, which includes companies like [Microsoft](https://www.microsoft.com/openjdk), [Red Hat](https://www.redhat.com/en), [Google](https://cloud.google.com/java?hl=de), and [Open Elements](https://open-elements.com/), is responsible for this. With [over 200 million downloads](https://dash.adoptium.net/), no other Java distribution comes close to the spread of Eclipse Temurin. This is [underscored by a recent Gartner report](https://www.gartner.com/en/documents/4540799), which predicts that by 2026, over 80% of all Java applications will not run on an Oracle distribution. Eclipse Temurin will likely take the largest share of this market.

![Distributions Java](/posts/2023-08-03-distributions-and-support-without-oracle/distributions.jpeg)

## Java Support

In addition to analyzing various distributions, Gartner examined the different commercial support options for Java. Oracle support did not fare well in this analysis:

Oracle has once again changed the licensing rules for its Java distributions. On January 23, 2023, the company introduced a new licensing metric, the [SE Universal Subscription](https://www.oracle.com/us/corporate/pricing/price-lists/java-se-subscription-pricelist-5028356.pdf). This controversial pricing model is based on the total number of customer employees rather than the number of employees using the software. This may be Oracle's attempt to discourage customers from considering other support models for Java. For customers, this often leads to skyrocketing support costs for Java. According to Gartner, this results in costs that are two to five times higher for most organizations. Additionally, commercial support from Oracle only covers the Oracle distribution and not the increasingly popular Eclipse Temurin. Therefore, now might be the right time to look at alternative Java support offerings.

Organizations like Azul and the Eclipse Adoptium working group have responded to these events. Mike Milinkovich, the Executive Director of the [Eclipse Foundation](https://www.eclipse.org/), commented on the situation on X / Twitter:

![Tweet Mike Milinkovich](/posts/2023-08-03-distributions-and-support-without-oracle/tweet.jpg)
*(Picture: Twitter / X)*

But beyond this comment, Adoptium has also taken action and set up a page for [commercial support for Eclipse Temurin](https://adoptium.net/temurin/commercial-support/). On this page, support for Eclipse Temurin is offered by three industry experts: Red Hat, IBM, and Open Elements. For the German-speaking market, Open Elements is particularly noteworthy, as they not only actively promote Temurin as an open-source project with their ["Support & Care" package](https://open-elements.com/temurin-support/) but also offer support in German.

As you can see, the range of support options for the Java runtime environment has become significantly more diverse in recent years. In addition to Oracle's offering, there are now various options that are often much better tailored to individual needs. Of course, this also means that every company must look beyond the horizon and evaluate alternatives to the Oracle support contract concluded years ago. For companies that do not yet have a support contract, some of the offerings may be much more suitable than signing a contract directly with the giant Oracle. However, Oracle's offering also has its place and will be the right choice for some companies. Therefore, I do not want to present one offering as the winner here but rather highlight the diversity of options as a **win for the entire Java community**, thanks to companies like IBM, Red Hat, Azul, Open Elements, and of course, Oracle.

(rme)