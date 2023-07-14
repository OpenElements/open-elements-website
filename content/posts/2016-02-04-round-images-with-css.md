---
layout: "article"
title: 'Round Images with CSS'
author: hendrik
categories: [Web Frontends]
excerpt: 'Always wanted to create round images in your web page? Instead of doing this with a graphic editor by hand you can use CSS to show a rounded image based on a regular image on your page.'
---
In this post I will show the easiest way how a rounded image can be defined in CSS. This example is for HTML. If you want to create a rounded image with JavaFX you should [read this post]({{< ref "/posts/2015-11-30-round-images-with-javafx" >}}).

An image is defined by the `img` tag. To define some CSS for the image we should add a style class like "avatar":

{{< highlight html >}}
<img class="avatar" src="dude.png">
{{< / highlight >}}

In this first example I will show how you can define a rounded image for a square image. To do so we define the size of the image in CSS:

{{< highlight css >}}
.avatar {
    width: 64px;
    height: 64px;
}
{{< / highlight >}}

Once this is done it's quite easy to create the round effect by defining a rounded border. Here the radius of the border must be defined as the half width / height. In addition we could define a border color and a border width to add a visual contrast.

{{< highlight css >}}
.avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: lightgrey;
}
{{< / highlight >}}

Once this is done you could use the image on any background and it's looks quite nice:

![radius-example](/posts/guigarage-legacy/radius-example.png)
