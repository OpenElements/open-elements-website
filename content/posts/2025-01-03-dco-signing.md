---
outdated: false
showInBlog: true
title: "DCO Signing and Validation for Open Source Projects"
date: 2025-01-03
author: hendrik
excerpt: "The Developer Certificate of Origin (DCO) is a lightweight mechanism for developers to certify that they wrote or have the right to contribute the code they are submitting. This article explores the purpose, usage, and validation of the DCO in open-source projects next to a critical analysis of the DCO’s effectiveness in ensuring legal compliance for open-source contributions."
categories: [open-source]
preview_image: "/posts/preview-images/open-source-green.svg"
---

The **Developer Certificate of Origin (DCO)** is a lightweight mechanism that developers use to certify that they wrote or have the right to contribute the code they are submitting.
This article gives an overview about the usage of the DCO and how to validate it for open source projects.

Currently, I am working on the [Hiero project](https://hiero.org) for that a lot of repositories are transferred to the new [Hiero GitHub organization](https://github.com/hiero-ledger).
To do so I have to check the DCO for all repositories.
Since that sounds easier than it is, I decided to write a blog post about the DCO and how to validate it.

## What is the Developer Certificate of Origin (DCO)?
From my point of view the DCO is a legally binding statement that asserts that the contributor has the right to submit the code they are contributing to the project.
Since Open Source Software (OSS) are becoming more and more important, the DCO looks is a good way to ensure that the code is legally contributed to the project.
The idea of the DCO is simple: Every contributor must sign the DCO before contributing to an Open Source project.
The full text of the DCO, as hosted at https://developercertificate.org is as follows:

```bashBy making a contribution to this project, I certify that:

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
```

As you can see the text of the DCO reads as a legal statement.
Since a legal statement normally need to be signed, there must be a way to sign the DCO for a contribution to an OSS.

### How to Sign the DCO?

The DCO has been created to be as lightweight as possible.
Next to that the integration in the workflow of git, and GitHub must be very easy to not disturb the normal workflow of the developers.

Therefore, the DCO is even mentioned in [the man page (the documentation) of git](https://git-scm.com/docs/git-commit). By calling `git help commit` you can see the following information:

```bash-s, --signoff, --no-signoff
Add a Signed-off-by trailer by the committer at the end of the commit log message.
The meaning of a signoff depends on the project to which you’re committing.
For example, it may certify that the committer has the rights to submit the work under the project’s license or agrees
to some contributor representation, such as a Developer Certificate of Origin.
(See http://developercertificate.org for the one used by the Linux kernel and Git projects.) 
Consult the documentation or leadership of the project to which you’re contributing to understand how the signoffs are
used in that project.

The --no-signoff option can be used to countermand an earlier --signoff option on the command line.
```

As you can see a developer only needs to add the `-s` or `--signoff` option to the `git commit` command to sign the DCO.
You can easily try this at home by creating a new git repository and adding a new file to it:

```bash$ git commit -m "DCO post started" -s
[dco-post d2b4530] DCO post started
 1 file changed, 72 insertions(+)
 create mode 100644 content/posts/2025-01-03-validating-dco-signing.md
```

I just did exactly that to commit the current state of this post to the git repository.
As you can see adding the `-s` option to the `git commit` command does not change the output, asks for a signature, or anything else.
Have I done something wrong?

The answer is no.
The DCO workflow is a lightweight mechanism and does not require any manual steps.
It does not even need the author to read the DCO.
You can see that the DCO is signed by looking at the commit message.
The `Signed-off-by` line is added to the commit message:

```bash$ git log -1
commit d2b45309f4a002dd637e7a83fb524d0be0549853 (HEAD -> dco-post)
Author: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
Date:   Thu Jan 2 16:39:43 2025 +0100

    DCO post started
    
    Signed-off-by: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
```

The complete signing process is now done.
It does exactly what you see in the commit message: It adds a single `Signed-off-by` line to the commit message.
This line is the sign that the author has read and agrees to the DCO.
For that purpose the email address of the author is added to the `Signed-off-by` line as an identifier.

The term `Signed-off-by` is defined in the [Linux Kernel Documentation](https://archive.kernel.org/oldwiki/git.wiki.kernel.org/index.php/CommitMessageConventions.html).

I will not discuss the workflow from a legal perspective for now. At the end of the article I will give my critic on the DCO and its usage.

### How to enforce DCO signing?

Since many OSS and even Foundations like the [Linux Foundation](https://www.linuxfoundation.org) relay on the DCO, there are tools that can validate the DCO.
One of the most popular tools is the [DCO Check GitHub App](https://github.com/apps/dco) that can be added to a GitHub repository.
The app checks every pull request for the `Signed-off-by` line.
If a pull request does not contain the `Signed-off-by` line, the PR checks will fail and the PR cannot be merged.

![Sample of a PR with an failed DCO check](/posts/2025-01-03-dco-signing/dco-github-pr-check.png)

While the app is in general a good idea to ensure that every future contribution is signed, it has some drawbacks.
If the check fails, the PR cannot be merged in first place but a committer of the repository can "fix" that:
If you look at the details of the failed check, you can see a help text that explains how to fix the missing DCO signing.
While that is great and even enabled developers that are not familiar with the DCO to sign it, the details page also contains a button to "set DCO to pass".

![Sample of a PR with an failed DCO check](/posts/2025-01-03-dco-signing/dco-github-set-pass.png)

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

```bash$ git show --pretty=format:"Author: %an <%ae>%nCommitter: %cn <%ce>" -s <commit-hash>
Author: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
Committer: Hendrik Ebbers <hendrik.ebbers@open-elements.de>
```

The `--pretty=format` option in the sample is used to define the output format of the `git show` command:
- The `%an` and `%ae` placeholders are used to output the author name and email address.
- The `%cn` and `%ce` placeholders are used to output the committer name and email address.

While the given sample shows the same author and committer, it is possible that the author and committer are different.
The author is the person that has created the commit and the committer is the person that has added the commit to the repository.
If those 2 persons are different, it still makes sense that the author has signed the DCO.
A committer can add a commit to a repository but the author is the person that has created the code and has the right to contribute it.
Therefore, a committer should not add a commit to a repository that is not signed by the author.

#### Squashed Commits

But there is more to check.
Having huge PRs in GitHub, reviewers can easily add their own commits to the PR.
By doing so a PR can contain commits coming from different authors.
While it is clear that each author must sign the DCO for their commits it can become difficult if the PR is merged.
Here [squashing of the commits](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits) can result in a problem.
By creating a single commit from multiple commits, the commit still can only have 1 single author.
The message of the squashed commit contains the messages of all squashed commits.
Here you can find lines like this:

```bashCo-authored-by: Alice <alice@example.com>
Co-authored-by: Bob <bob@example.com>
```

Those lines are used to mention all authors of the squashed commits.
GitHub can even use that metadata and visualize the authors of the squashed commits as described in the [GitHub blog](https://github.blog/news-insights/product-news/commit-together-with-co-authors/).
Other than the `Signed-off-by` term, the `Co-authored-by` term is not defined in the Linux Kernel Documentation.
Maybe it has been defined by GitHub itself.
If somebody knows more about that, please let me know.
In the [Linux Kernel Documentation](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/process/submitting-patches.rst?id=HEAD) the term `Co-developed-by` is used to mention all authors of the squashed commits:

```bashCo-developed-by: First Co-Author <first@coauthor.example.org>
Signed-off-by: First Co-Author <first@coauthor.example.org>
Co-developed-by: Second Co-Author <second@coauthor.example.org>
Signed-off-by: Second Co-Author <second@coauthor.example.org>
Signed-off-by: From Author <from@author.example.org>
```

#### Other problems

Next to the squashed commits there are other problems that can occur.
When doing the research for the Hiero project I found a lot of commits that are not contain a valid DCO signature.
Some of those commits had a different author and Signed-off-by author.
The following example shows 2 real life commits (with anonymized user info) from a repository that I have checked:

```bashAuthor: Aman Ali (He/Him) <aman.example@vitstudent.ac.in>
Committer: GitHub <noreply@github.com>
Removed one / at the beginning of console.clear() (#94)
* removed / at line 269

* Signed-off-by: Author Name aman.example@vitstudent.ac.in
```

Here you can see 2 different problems:

- The author and the Signed-off-by author are different.
  While the email address is the same, the name is different.
- The Signed-off-by line starts with "*" and therefore is maybe not recognized as a valid DCO signature.

Here is another example I found:

```bashAuthor: John Doe <john.doe@swirldslabs.com>
Committer: GitHub <noreply@github.com>
Update .gitbook.yaml
Signed-off-by: John Doe <john.doe@hashgraph.com>
```

In this example the mail address of the author and the Signed-off-by author are different.
They are similar and in fact the company Swirlds Labs has been renamed to [Hashgraph](https://www.hashgraph.com).
I do not know how those 2 different mail addresses are ended up in a single commit but it is a problem when validating the DCO.

#### Summary of the DCO Validation

As you can see the DCO validation is not as easy as it looks like.
While it seems to be a simple mechanism, it can become complex if you have to validate the DCO for a huge repository with many commits and many authors.
The tools and scripts that I found online are all end up in not 100% same results.
The tools I found are:

- https://github.com/coderanger/dco
- https://github.com/hiero-ledger/hiero/tree/main/dco-check
- https://github.com/lfit/releng-lftools?tab=readme-ov-file

I need to do some more research to check if one of the tools can be used to validate repositories with many commits and many authors.
If not I might need to write my own tool to validate repositories.

## My critic on the DCO

To be true I have a lot of critic on the DCO.
While I want contributions to OSS are as easy as possible, the DCO does not help in that from my point of view.
Adding the `-s` / `--signoff` option needs a level of technical knowledge that newcomers might not have.
Especially developers that does not use a command line interface (CLI) for git might not know about the DCO or how to active it in an individual IDE.

Next to that I have seen a lot of developers that are not familiar with the DCO and just added a `-s` to the `git commit` command or clicking a checkbox in the IDEA without knowing what they are doing.
This is not a problem of the developers it is a problem of the DCO and the intransparency of the DCO.
The DCO is a legal statement and should be seen by the author.
From my point of view a developer can not agree to a legal statement without reading it.

Next to that you do not even know if you sign the DCO by adding the `-s` option to the `git commit` command or a total different contributor representation.
The documentation of the `-s` / `--signoff` option states that the meaning of a signoff depends on the project to which you’re committing:

> The meaning of a signoff depends on the project to which you’re committing. (...)
  Consult the documentation or leadership of the project to which you’re contributing to understand how the signoffs are
  used in that project.

Next to that adding the signer as a line started by the term `Signed-off-by` feels like a hack.
If a commit would have more detailed metadata fields for the authors, the DCO could be added to the metadata (including a hash of the DCO) and not as a line in the commit message.
I'm not saying here that git needs to be refactored but the current solution (including the usage of the `Co-developed-by` term that I learned in my research) does not feel like a solid solution that is well-prepared for the future.
With regulations for software like [US Executive Order 14028](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/)
or the [EU Cyber Resilience Act (CRA)](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) I believe that we need a more solid base to address legal concerns in open-source contributions.

It is really questionable for me if the DCO as it is designed today can be used in a case of a legal dispute.
I am not a lawyer, but I can not imagine that a court would accept a DCO that is signed by adding a `-s` to the `git commit` command
by a developer that has not seen the document he signed.
If it is not useable from a legal perspective, I ask myself what the DCO is good for.

Many people hate Contributor License Agreements (CLAs) because they are complex and need to be signed by every contributor.
But a CLA can provided in "Plain Language" / "Accessible Language" in multiple languages.
By doing so it would be clear for every contributor what they are signing.
The Linux Foundation provide the tool [EasyCLA](https://easycla.lfx.linuxfoundation.org/#/) that has a great GitHub integration.
By using the tool a new contributor can sign the CLA digitally in [docusign](https://www.docusign.com/) by simply [clicking a button in the PR](https://docs.linuxfoundation.org/lfx/easycla/v2-current/contributors/individual-contributor#github).

I will continue this research and will keep you updated about my findings.
Maybe some of you have more information about the DCO and can help me to understand it better.
