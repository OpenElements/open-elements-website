---
outdated: false
showInBlog: true
title: "Validating DCO Signing for Open Source Projects"
date: 2024-01-03
author: hendrik
excerpt: "TODO"
categories: [open-source]
preview_image: "/posts/preview-images/open-source-pink.svg"
---

The **Developer Certificate of Origin (DCO)** is a lightweight mechanism that developers use to certify that they wrote or have the right to contribute the code they are submitting.
This article gives an overview about the usage of the DCO and how to validate it for open source projects.

## What is the Developer Certificate of Origin (DCO)?
From my point of view the DCO is a legally binding statement that asserts that the contributor has the right to submit the code they are contributing to the project.
Since Open Source Software (OSS) are becoming more and more important, the DCO looks is a good way to ensure that the code is legally contributed to the project.
The idea of the DCO is simple: Every contributor must sign the DCO before contributing to an Open Source project.
The full text of the DCO, as hosted at https://developercertificate.org is as follows:

{{< highlight bash >}}
By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
{{< / highlight >}}

As you can see the text of the DCO reads as a legal statement.
Since a legal statement normally need to be signed, there must be a way to sign the DCO for a contribution to an OSS.

### How to Sign the DCO?

The DCO has been created to be as lightweight as possible.
Next to that the integration in the workflow of git, and GitHub must be very easy to not disturb the normal workflow of the developers.

Therefore the DCO is even mentioned in the man page (the documentation) of git. By calling `git help commit` you can see the following information:

{{< highlight bash >}}
-s, --signoff, --no-signoff
Add a Signed-off-by trailer by the committer at the end of the commit log message.
The meaning of a signoff depends on the project to which you’re committing.
For example, it may certify that the committer has the rights to submit the work under the project’s license or agrees
to some contributor representation, such as a Developer Certificate of Origin.
(See http://developercertificate.org for the one used by the Linux kernel and Git projects.) 
Consult the documentation or leadership of the project to which you’re contributing to understand how the signoffs are
used in that project.

The --no-signoff option can be used to countermand an earlier --signoff option on the command line.
{{< / highlight >}}

As you can see a developer only needs to add the -s or --signoff option to the `git commit` command to sign the DCO.
You can easily try this at home by creating a new git repository and adding a new file to it.

