---
outdated: false
showInBlog: true
title: "DCO Signing for Open Source Projects"
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

As you can see a developer only needs to add the `-s` or `--signoff` option to the `git commit` command to sign the DCO.
You can easily try this at home by creating a new git repository and adding a new file to it:

{{< highlight bash >}}
$ git commit -m "DCO post started" -s
[dco-post d2b4530] DCO post started
 1 file changed, 72 insertions(+)
 create mode 100644 content/posts/2025-01-03-validating-dco-signing.md
{{< / highlight >}}

I just did exactly that to commit the current state of this post to the git repository.
As you can see adding the `-s` option to the `git commit` command does not change the output, asks for a signature, or anything else.
Have I done something wrong?

The answer is no.
The DCO workflow is a lightweight mechanism and does not require any manual steps.
It does not even need the author to read the DCO.
You can see that the DCO is signed by looking at the commit message.
The `Signed-off-by` line is added to the commit message:

{{< highlight bash >}}
$ git log -1
commit d2b45309f4a002dd637e7a83fb524d0be0549853 (HEAD -> dco-post)
Author: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
Date:   Thu Jan 2 16:39:43 2025 +0100

    DCO post started
    
    Signed-off-by: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
{{< / highlight >}}

The complete signing process is now done.
It does exactly what you see in the commit message: It adds a single `Signed-off-by` line to the commit message.
This line is the sign that the author has read and agrees to the DCO.
For that purpose the email address of the author is added to the `Signed-off-by` line as an identifier.

### How to enforce DCO signing?

Since many OSS and even Foundations like the [Linux Foundation](https://www.linuxfoundation.org) relay on the DCO, there are tools that can validate the DCO.
One of the most popular tools is the [DCO Check GitHub App](https://github.com/apps/dco) that can be added to a GitHub repository.
The app checks every pull request for the `Signed-off-by` line.
If a pull request does not contain the `Signed-off-by` line, the PR checks will fail and the PR cannot be merged.

{{< centered-image src="/posts/2025-01-03-dco-signing/dco-github-pr-check.png" width="100%" showCaption="true" alt="Sample of a PR with an failed DCO check">}}

While the app is in general a good idea to ensure that every future contribution is signed, it has some drawbacks.
If the check fails, the PR cannot be merged in first place but a committer of the repository can "fix" that:
If you look at the details of the failed check, you can see a help text that explains how to fix the missing DCO signing.
While that is great and even enabled developers that are not familiar with the DCO to sign it, the details page also contains a button to "set DCO to pass".

{{< centered-image src="/posts/2025-01-03-dco-signing/dco-github-set-pass.png" width="100%" showCaption="true" alt="Sample of a PR with an failed DCO check">}}

When I saw and pressed this button for the first time, I was assuming that I would sign the DCO for all commits in the PR.
But that is not the case.
The button only sets the check to pass and does not sign the DCO for the commits.
That behavior is a bit misleading and can lead to the situation that a PR is merged without a signed DCO.

Based on that it is important to check the full commit history of a repository to get recognized if a commit is missing the DCO.
That is highly needed for older repositories that have not used the DCO check app from the beginning, too.
To do such a check we need to understand how to validate the DCO for a commit in a correct way.

### How to Validate the DCO for a Commit?

When looking at the metadata of a commit in a git repository, you can see that every commit contains several metadata fields.
One interesting point is that a commit contains an author and a committer.
When we looked at the `git log` output before, we saw that the `Signed-off-by` line contains the author of the commit.
The committer has not been mentioned so far.
You can see the committer and the author of a commit by using the `git show` command:

{{< highlight bash >}}
$ git show --pretty=format:"Author: %an <%ae>%nCommitter: %cn <%ce>" -s <commit-hash>
Author: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
Committer: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
{{< / highlight >}}

The `--pretty=format` option in the sample is used to define the output format of the `git show` command:
- The `%an` and `%ae` placeholders are used to output the author name and email address.
- The `%cn` and `%ce` placeholders are used to output the committer name and email address.

While the given sample shows the same author and committer, it is possible that the author and committer are different.
The author is the person that has created the commit and the committer is the person that has added the commit to the repository.
If those 2 persons are different, it still makes sense that the author has signed the DCO.
A committer can add a commit to a repository but the author is the person that has created the code and has the right to contribute it.
Therefore, a committer should not add a commit to a repository that is not signed by the author.

