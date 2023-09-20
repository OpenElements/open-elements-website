---
outdated: true
title: 'Preview: Multitouch gestures in swing'
date: "2011-08-04"
author: hendrik
categories: [General]
excerpt: 'Apple added a listener based API for multitouch gestures to their eawt package. With this wrapper API you can easily integrate it in any app.'
---
In my last [post]({{< ref "/posts/2011-07-28-fun-with-gestures" >}}) I described Apples gestures API. Up to date I´m developing a wrapper API. With this API you can add multitouch-listeners to any swing component. On any OS unlike Mac OS a `GesturesNotSupportedException` is thrown if you try to register a listener. So you can use the API in every application. If the Applications runs on a Mac it supports gestures.

Here is how:

{{< highlight java >}}
try {
  GestureUtilities.add(panel, gestureRotationListener);
} catch (GesturesNotSupportedException e) {
  System.out.println("Gestures-API not Supported!");
}
{{< / highlight >}}

Or you can just check if the Apple API is supported:

{{< highlight java >}}
if(!GestureUtilities.isSupported()) {
  System.out.println("Gestures-API not Supported!");
}
{{< / highlight >}}

I will add javadoc to the source and update the gestures demo next week. You can check out the source @ [https://code.google.com/p/gestures-wrapper/](https://code.google.com/p/gestures-wrapper/).
