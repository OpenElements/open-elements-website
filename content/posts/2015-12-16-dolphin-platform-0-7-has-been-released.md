---
title: 'Dolphin Platform 0.7 has been released'
date: "2015-12-16"
author: hendrik
categories: [Dolphin Platform]
excerpt: 'We released version 0.7 of the Dolphin Platform today. Next to the framework we updated the Spring Boot archetype for Maven and added a KumuluzEE Maven archetype.'
---
We released version 0.7 of the [Dolphin Platform](http://www.dolphin-platform.io) today. Next to the framework we updated the Spring Boot archetype for Maven and added a KumuluzEE Maven archetype. By using this archetypes you can create a Dolphin Platform based client server application in a minute. An example how you can use the archetypes can be found [here]({{< ref "/posts/2015-12-02-dolphin-platform-jumpstart" >}}).

If you want to create your new project from command line you can simply call this Maven command and select one of the shown Dolphin Platform archetypes:

{{< highlight shell >}}
mvn archetype:generate -Dfilter=com.canoo.dolphin-platform:
{{< / highlight >}}

Currently the projects contains only a JavaFX based client but it's planned to add a Polymer based client to the archetypes with the next release.
