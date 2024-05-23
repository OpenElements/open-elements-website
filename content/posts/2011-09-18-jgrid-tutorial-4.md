---
outdated: true
showInBlog: false
title: 'JGrid Tutorial #4'
date: "2011-09-18"
author: hendrik
categories: [Swing]
excerpt: 'I created a series of tutorials to get familiar with JGrid. This is the fourth out of five tutorials.'
slug: jgrid-tutorial-4
---
In this tutorial we want to add zoom functionality to the JGrid. You can set the dimension of the grid cells be the property `fixedCellDimension`. Here is a example for two different dimensions:

![tutorial4-1](/posts/guigarage-legacy/tutorial4-1.png)

![tutorial4-2](/posts/guigarage-legacy/tutorial4-2.png)

To add a zoom functionality to the grid you can set the dimension by using a JSlider. Here is the code:

{{< highlight java >}}
final JSlider slider = new JSlider(32, 256);
slider.setValue(grid.getFixedCellDimension());

slider.addChangeListener(new ChangeListener() {
  @Override
  public void stateChanged(ChangeEvent arg0) {
    grid.setFixedCellDimension(slider.getValue());
  }
});
{{< / highlight >}}

Now you can edit the dimension dynamically. Here is the result:

{{< youtube Zyqf-P2ftFs >}}


You can download the source file [here](/assets/downloads/jgrid/tutorial4.java).
