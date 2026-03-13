---
outdated: false
showInBlog: true
title: "When \"Contributions\" Become a Burden"
date: 2026-03-05
author: hendrik
excerpt: "Generative AI is changing open source: An increasing number of automatically generated pull requests are overwhelming maintainers and presenting new challenges for review processes. How projects are trying to preserve quality and openness despite the growing flood of AI slop."
categories: [open-source, ai]
preview_image: "/posts/preview-images/ai-slop-yellow.svg"
---

Open source software is the foundation of modern software ecosystems.
Voluntary and active contributions help develop, improve, and maintain libraries, frameworks, and infrastructure code over the long term.
But this openness brings new challenges in the age of generative AI.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/small-tree.svg" width="80%" alt="Symbolic image of open source maintenance">}}

Many projects currently report that the number of machine-generated and poorly thought-out contributions (usually in the form of pull requests) has increased so dramatically that maintainers are reaching their limits and traditional review processes are becoming increasingly inadequate.
For example, teams like the maintainers of the [Godot project](https://godotengine.org/) report receiving dozens of such contributions daily that were automatically generated but are usually insufficiently reviewed or meaningful.
The maintainers describe the review effort as "demoralizing" and warn that this burden threatens the long-term assurance of quality and security (source: https://www.pcgamer.com/software/platforms/open-source-game-engine-godot-is-drowning-in-ai-slop-code-contributions-i-dont-know-how-long-we-can-keep-it-up/).

This development is not a theoretical problem: Many projects are currently grappling with how to handle a growing number of low-value, AI-driven contributions without hindering legitimate human contributions.

## Case Study: An Unusual Contribution Trend in the Context of Major Projects

A concrete example of unusual contribution patterns involves a GitHub account that, after approximately seven years of negligible activity, generated thousands of commits in a short period — including activity on weekends and in high volume, some of which appear to have been automatically generated.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/github-timeline.png" width="100%" showCaption=true alt="Contribution timeline of the account on GitHub">}}

At first glance, an unsuspecting observer might look at this volume of contributions and think:
"That's a very active developer."
But upon closer inspection, it becomes clear that many of these "contributions" are devoid of substance and rarely deliver real value, as can be seen from the example of automatically and cyclically overwriting temperature data in a text file (https://github.com/ambicuity/Weather).
The same account repeatedly submits contributions to several well-known open source projects. Here are a few recent examples:

- An issue was created in an SDK of the [Hiero project](https://hiero.org), in which the account describes having conducted a "white-box security and architectural review" of the project and discovered various security vulnerabilities: https://github.com/hiero-ledger/hiero-sdk-python/issues/1859
- A contribution to the central [Kubernetes repository](https://kubernetes.io) about "dynamic GPU sharing": https://github.com/kubernetes/kubernetes/pull/137156
- Attempts were made to contribute code to [OpenClaw](https://openclaw.ai), an AI project currently hyped on social media and in AI circles but viewed as extremely critical and problematic from a security perspective: https://github.com/openclaw/openclaw/pull/22785

These examples are not meant to single out an individual, but to show how unusual contribution patterns can manifest — even where review quality and security processes are particularly important.
In the mentioned projects, these contributions were not accepted.
This shows that the project maintainers actively uphold their review and governance standards:

- Some PRs were closed because they contained too many unrelated changes.
- Others were rejected because such large structural changes must first be proposed through formal processes.
- In parts of the Linux Foundation, the account was temporarily blocked.

## Why This AI Slop Matters

In modern open source development processes, a social contract must exist between maintainers and contributors.
Contributions are made in good faith, and experienced maintainers help with review, mentorship, and integration.
But a large number of automatically generated or contextless contributions can permanently disrupt this balance and social contract.
This creates a host of problems:
- **High review effort for maintainers** — often without proportional benefit.
  This leads especially maintainers who support OSS in their spare time to withdraw from projects, as the tasks either stop being enjoyable or become emotionally too burdensome.
- **Risk of quality and security issues**, as exhausted maintainers are more likely to overlook errors.
  Incidents like Log4Shell show how quickly a bug in a central OSS library can have severe consequences for the entire world.
  It is precisely these central and security-critical projects that are targeted by meaninglessly generated AI contributions, as the people behind the AI agents mistakenly hope to gain prestige through potentially accepted contributions to these projects.
  Additionally, attacks on OSS libraries, as in the case of [XZ](https://www.bsi.bund.de/SharedDocs/Cybersicherheitswarnungen/DE/2024/2024-223608-1032.pdf?__blob=publicationFile), are becoming increasingly easy to carry out.
- **Distortion of OSS indicators**, because quantitative metrics alone are no longer meaningful about actual competence or value.
  Through ever more automatically created contributions to arbitrary personal projects, the image of GitHub accounts becomes distorted.
  While in the past a glance at someone's GitHub account could reveal important information about a potential contributor, the mass of meaningless contributions destroys any insight.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/ai-slop.png" width="80%" alt="AI slop destroying projects">}}

Such developments are already being discussed in the community as structural risks.
This is not about individual projects, but about a threat to the entire OSS ecosystem.
The community has since adopted the term **AI slop** for this large number of unhelpful or automated contributions.

## How OSS Can Deal with the Flood of Contributions

There is movement in the area of OSS governance.
Many maintainers are currently discussing how the CONTRIBUTING guidelines or PR policies of their projects can be adapted to counter this problem.
The OSS community needs to share best practices so that projects can collectively learn how to handle an increasing volume of contributions.

In general, the balance between humans, machines, and automation must be reconsidered and brought back into harmony.
AI should not just automatically generate contributions, but should always be used in the context of human accountability and responsibility.
Used correctly, tools like [GitHub Copilot](https://github.com/features/copilot) or [Claude Code](https://code.claude.com/docs/overview) can deliver significant value in the OSS space.
They can improve contributions and considerably simplify reviews. However, this also requires a mindset shift from the people who are currently flooding the community with AI slop through agents.
Even though mentoring would certainly be a good approach, it must not again be imposed as a burden on project maintainers.
AI tools are still tools operated by humans.

The platform GitHub has also recognized the problem and begun providing specific tools to support maintainers.
These features include:
- **Restricting or disabling pull requests at the repository level:** Maintainers can completely disable PRs or only allow them from certain contributor groups (e.g., internal collaborators), preventing unwanted contributions from being opened.
  (https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/disabling-pull-requests)
- **Temporary interaction limits:** Interaction limits can be set at the repository or user level when contributions become conspicuous.

Beyond these immediate measures, further mechanisms are being discussed internally and together with maintainers.
For example, there is a proposal to only allow PRs that are linked to existing issues.
An active discussion about features in GitHub to address the problem at the tool level can be found here: https://github.com/orgs/community/discussions/185387

A more extensive analysis of how various OSS foundations and projects are dealing with and addressing the threat of AI slop can be found at RedMonk: https://redmonk.com/kholterhoff/2026/02/26/generative-ai-policy-landscape-in-open-source/

## Our Goal: Detect AI Slop and Preserve Quality

Maintainer teams are not machines — they invest time, mental energy, and passion, often in their spare time, to keep projects alive.
This should not be made harder by an unstructured mass of semi-automated contributions, but rather supported by tools, policies, and workflows that promote quality and efficiency.

The development of new tools and discussions about better handling of contributions is a signal that the platform and many maintainers are not only aware of this challenge but are actively seeking solutions.
Especially for projects with high visibility or large communities, it is important that not only individual review work is done, but that structural tools are also established to reduce the review burden and to more quickly identify or exclude unwanted contributions.

Beyond these problems, both automation and AI should increasingly find their way into the open source community as powerful tools.
Generative AI tools have the potential to support developers, automate routine tasks, and empower contributors to address larger problems without having to write every detail by hand.
At the same time, the discussion around AI slop shows that we must consciously ensure we prioritize quality over quantity, strengthen review workflows, and give maintainers real tools for relief.

Through all these various efforts, open source remains open, sustainable, and human in the future.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/oss-tree.svg" width="80%" alt="People working together on a project">}}