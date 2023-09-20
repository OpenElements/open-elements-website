---
outdated: true
title: 'JGrid Tutorial #1'
date: "2011-09-14"
author: hendrik
categories: [Swing]
excerpt: 'I created a series of tutorials to get familiar with JGrid. This is the first out of five tutorials.'
slug: jgrid-tutorial-1
---
At the moment all JGrid demonstrations are very complex and use a lot of Java2D code, web services an so on. So many people asked me to create some simple demos. For this reason I started some bottom-up tutorials for the JGrid.

Here is the first one:
You can integrate a JGrid in every swing application. Just add it to a container:

{{< highlight java >}}
JGrid grid = new JGrid();
getContentPane().add(new JScrollPane(grid));
{{< / highlight >}}

Normally you want to visualize some data in the grid. All data must wrapped in a ListModel:

{{< highlight java >}}
DefaultListModel model = new DefaultListModel();
for(int i=0; i &lt; 100; i++) {
  model.addElement(new Integer(i));
}
{{< / highlight >}}

In a final step you must set the model for the grid:

{{< highlight java >}}
grid.setModel(model);
{{< / highlight >}}

With this few lines of code you can add a JGrid to your code. Because the default renderer of the grid uses a label and renders the `toString()`-result of the data to the grid you will see all Integers in a grid:

![Tutorial1](/posts/guigarage-legacy/Tutorial1.png)

You can download the [source file for the tutorial](/assets/downloads/jgrid/tutorial1.java). To run the program you need the jgrid.jar in your classpath.
