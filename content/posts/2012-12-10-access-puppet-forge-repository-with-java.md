---
outdated: true
showInBlog: false
title: 'Access Puppet Forge Repository with Java'
date: "2012-12-10"
author: hendrik
categories: [Vagrant-Binding]
excerpt: 'To integrate Puppet modules more easy to Vagrant-Binding projects I created a Java API that access Puppet Forge by REST.'
preview_image: "/posts/preview-images/software-development-green.svg"
---
To integrate Puppet modules more easy to [Vagrant-Binding]({{< ref "/posts/2012-11-01-introducing-vagrant-binding" >}}) projects I created a Java API that access Puppet Forge by REST. You can search for modules or download any module to your locale disc. So you can easily add modules from the repository to your own Vagrant environments. The API is currently not part of Vagrant-Binding and can be found [here](https://github.com/guigarage/puppet-forge-ws) but I plan to integrate the API in the future. Additionally I added a demo to the [Vagrant-Binding-Demos]({{ site.baseurl }}{% post_url 2012-11-03-vagrant-binding-demos %}
) project that can be found at [github](https://github.com/guigarage/vagrant-binding-demos/blob/master/src/main/java/com/guigarage/vagrant/tutorials/PuppetTutorial2.java). Here is a short example that uses the API:

{{< highlight java >}}
PuppetForgeClient client = new PuppetForgeClient();
File moduleFolder = new File("/path/to/my/modules");

ListallDescriptions = client.findModules("mongodb");

for(PuppetForgeModuleDescription description : allDescriptions) {
   System.out.println("Installing " + description.getFullName());
   PuppetForgeModule module = client.findModule(description);
   client.installToModulesDir(moduleFolder, module);
}
{{< / highlight >}}
