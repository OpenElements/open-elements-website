---
outdated: false
showInBlog: true
title: "On the supply chain, locally built artifacts and how Maven handles them"
slug: on-the-supply-chain-locally-built-artifacts-and-how-maven-handles-them
date: 2026-09-16
author: sebastian
excerpt: "Locally built artifacts can become a problem for reproducible builds and therefore a risk for the supply chain. In this post I show how Maven resolves artifacts and how you can tell whether a self-built artifact was used by mistake."
categories: [Open Elements, Open-Source, Security, Java]
preview_image: "/posts/preview-images/oss-world.svg"
---


# On the supply chain, maven repositories and the File `_remote.repositories`

[Reproducible Builds](https://reproducible-builds.org/) rest on a simple promise: the same source code, the same build
environment, the same result, byte for byte. Anyone who wants to verify that promise needs a reliable reference, and
this is exactly where things get interesting, because in Maven that reference sits in the local repository, that is, in
a directory whose contents do not indicate at first glance where they came from. We have already covered the
technical side of reproducible builds in another [blog post](https://open-elements.com/posts/2025/09/12/reproducible-builds)
in the context of Apache Maven and its effects on the supply chain.

Here we want to answer the question of how Maven resolves and manages artifacts, what the inconspicuous file
`_remote.repositories` contains, and how a concrete improvement for the Apache Maven Artifact Plugin and ultimately for
the supply chain can be built on top of it.

## Why provenance is a supply chain related topic

The [Maven Artifact Plugin](https://maven.apache.org/plugins/maven-artifact-plugin/) is the tool used to demonstrate
reproducible builds in the Maven ecosystem. The goal `artifact:buildinfo` produces a description of the build result
including checksums, and `artifact:compare` compares the result of the current build with a reference. If both match,
this shows that the published artifacts can indeed have been produced from the stated source code.

It becomes problematic, however, if one of the dependencies involved does not come from a public repository but was
built locally on the same machine three weeks ago via `mvn install`. In that case, you end up comparing one local result
with another local result. The outcome looks clean, but it says nothing about the published artifacts. From a supply
chain perspective, a locally installed artifact is an input to the build that nobody has verified, neither through a
signature nor through a checksum against a remote repository. As the past has shown, malicious manipulation may already
have taken place at this point, and you can read more about that
[here](https://reproducible-builds.org/docs/why/) on [reproducible-builds.org](https://reproducible-builds.org).

Precisely this gap was described in
[MARTIFACT-58](https://github.com/apache/maven-artifact-plugin/issues/146). The observation: `artifact:compare` compares
the output of the current build with content from the local repository, and what is not easy to recognize is whether
that content originates from an earlier local `mvn install` or was downloaded from a remote repository. The suggestion
was that the plugin could determine and report this information itself.

## The local repository as a mixed Store

To implement this, you need to understand how the local Maven repository works. The
[Maven documentation](https://maven.apache.org/guides/introduction/introduction-to-repositories.html) describes it as a
mixed store that serves two purposes at once: it is a cache for artifacts that were loaded from a remote repository, and
it is a store for artifacts that were built and installed locally. Both end up in the same layout, that is, under the
same path made up of groupId, artifactId, and version. The origin can therefore not be derived from the path alone.

## How Maven manages the local repository

Underneath Maven, the Maven Artifact Resolver does the work. It encapsulates everything that has to do with
repositories, such as resolving coordinates, downloading, caching, and installing. A dedicated management layer is
responsible for the local repository, and the variant used at runtime does more than place files in the right spot. It
keeps track of which repository a cached artifact originally came from.

This bookkeeping serves a very practical purpose. If an artifact was loaded from a repository R1 and a later build needs
the same artifact but does not know R1, then the locally available artifact counts as not present and is downloaded
again. The reasoning behind this is one of trust: two artifacts with identical coordinates from two different
repositories do not have to be the same thing. Incidentally, the same mechanism explains the occasionally confusing
error message that an artifact cannot be resolved even though it is visibly sitting in the directory.

That leaves the question of where this bookkeeping actually lives, and the answer is a single file that is easy to
overlook.

## The file `_remote.repositories`

The provenance information that Maven records while downloading ends up in the tracking file `_remote.repositories`.
Maven creates it in every directory of the local repository in which artifacts are managed.

Its content is a Java properties file. The keys consist of the file name, a `>` as a separator, and the ID of the
repository the file was obtained from. The value stays empty. A directory can therefore look something like this:

```
#NOTE: This is a Maven Resolver internal implementation file, its format can be changed without prior notice.
artifact-1.0.pom>central=
artifact-1.0.jar>central=
artifact-1.0.pom>my_repo_id=
```

The decisive special case is the empty repository ID. An entry of the form `artifact-1.0.jar>=` means that this file was
not downloaded but installed locally. If an existing file has no entry at all, it is internally treated as locally
installed as well.

Through the API, you can find out which repository an artifact came from, and in the case of a local installation, that is
the local repository itself.

## The implementation in the Maven Artifact Plugin

Pull request [#227](https://github.com/apache/maven-artifact-plugin/pull/227) for the Apache Maven Artifact Plugin makes
use of exactly this option. The change sits where the plugin determines the reference for the comparison, and it
receives the current repository configuration of the build from the comparison goal.

In addition to the artifact under examination, it is just as important to walk the dependency tree of that artifact, in
case further included components or their child dependencies were built locally.

If that is the case, the following kind of warning appears in the log afterward, together with the urgent
recommendation to check the build and to potentially delete artifacts found locally so that the versions from the remote
repository are used instead:

```
The dependency org.slf4j:slf4j-api:1.7.36 is stemming from a local install to your
local Maven repository. Please ensure that this is intended. If not, consider
removing this artifact and rebuilding or that your locally installed artifact
from /home/user/.m2/repository/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar
matches public reference from remote.
```

## What this means in practice

Thanks to this change in the Artifact Plugin, releasing components without accidentally pulling in locally built
dependencies has become considerably more convenient. Differences at the byte level that look rather inconspicuous can be
very laborious to track down, yet they are no less important for full reproducibility. A possible source of errors can
therefore be avoided, especially in complex components, and in the end time is saved on debugging and on additional
work after the fact. In this way, a seemingly small piece of information in the log makes another contribution to supply
chain security.

---

*The work on Apache Maven as part of Support & Care is funded by the Sovereign Tech Agency.*

*This article was created with the help of AI.*
