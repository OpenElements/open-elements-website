---
outdated: true
showInBlog: false
title: 'Adding JavaFX to your Eclipse project'
date: "2012-10-28"
author: hendrik
categories: [JavaFX]
excerpt: 'Sometimes you work with an raw Eclipse project without maven based dependency management for example. Maybe your builds still run with ant and all dependencies are configured in Eclipse. With a few tricks you can add JavaFX support to this projects on an easy way.'
preview_image: "/posts/preview-images/software-development-green.svg"
---
Sometimes you work with an raw Eclipse project without maven based dependency management for example. Maybe your builds still run with ant and all dependencies are configured in Eclipse. With a few tricks you can add JavaFX support to this projects on an easy way:

First of all you need the e(fx)clipse plugin for eclipse. You can find the plugin on the eclipse marketplace or you can download it [here](http://efxclipse.org). The Plugin offers "JavaFX Library" as a new library type. You can add this library directly to your project to add the JavaFX dependency.

![javafx-lib](/posts/guigarage-legacy/javafx-lib.png)

This adds JavaFX to your classpath but does not write an OS specific path in the project configuration. Any developer can now work with the project. The e(fx)clipse plugin handles the JavaFX dependency and finds the correct jar on your system. If the eclipse project depends on a JRE > 7u6 JavaFX is bundled in the JRE and e(fx)clipse finds it automatically.
