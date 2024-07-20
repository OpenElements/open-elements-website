---
outdated: true
showInBlog: false
title: 'GridFX supports CSS'
date: "2012-12-03"
author: hendrik
categories: [JavaFX]
excerpt: 'GridFX has no CSS support. Several CSS properties were added to GridFX and let you style the control'
preview_image: "/posts/preview-images/software-development-green.jpg"
---
I added CSS support to [GridFX]({{ site.baseurl }}{% link pages/projects/gridfx.md %}). There are five properties that can be styled by CSS at the moment:

* `-fx-vertical-cell-spacing` - vertical spacing between two cells (double)
* `-fx-horizontal-cell-spacing` - horizontal spacing between two cells (double)
* `-fx-cell-height` - height of a cell (double)
* `-fx-cell-width` - width of a cell (double)
* `-fx-horizontal-alignment` - horizontal alignment of all cells (LEFT,CENTER, or RIGHT)

Stay tuned for the upcoming "Custom Controls" post that will handle CSS support.
