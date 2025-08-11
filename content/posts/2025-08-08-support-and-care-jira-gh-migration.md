---
outdated: false
showInBlog: true
title: "Recap Jira Issue to GitHub Issue Migration in Apache Maven - How a funding can help"
date: 2025-08-08
author: sandra
excerpt: "A new post about how a funding can help"
categories: [open-source, support-and-care, maven]
preview_image: "/posts/preview-images/open-source-green.svg"
---
In this blog post, we'd like to share how funding can help in doing maintenance tasks in open-source projects.

Our Support and Care project got funding by the [German Sovereign Tech Fund](https://www.sovereign.tech/) (STF) to work on the following four packages of [Apache Maven](https://maven.apache.org/)™:

- Security of the Supply Chain
- Maintenance
- Modernization of Core Features
- Documentation

One task in the *maintenance* working package was to support the migration of Jira issues to GitHub issues.

## How the journey started

In April 2024, a [first voting](https://lists.apache.org/thread/yt819f08rvfoywlpwtbkk3w1kpow4ynb) was started to move two small projects (AFS Parent POM and Maven Parent POM) to GitHub (GH).
The motivation was that the most changes in these projects are done by [DependaBot](https://github.com/dependabot) and the Jira issues are created manually by copy-and-paste for creating the release notes.
It passed the voting, and the migration path was

- Enable the GH issues feature in the GH repository.
- Make the JIRA project read-only.
- Leave current open issues in Jira.
  If someone wants to work on it, they can copy it to GH.

For these projects, this migration path was good enough because most issues were about version updates.

In October 2024, a common [discussion](https://lists.apache.org/thread/v23tj8s8f6oyrmbyn1m6xg2pv7k92n4p) about migration to GH has started.
The common sense among the Maven committers was, yes, we want to have GH issues instead of Jira issues.
The reasons were

- Improve linking between issues and pull requests (PRs).
- Better user experience in writing issues (Jira custom syntax vs. Markdown).
- It is clearer for the user where to open an issue.
- The barrier to writing an issue is smaller because the reporter does not need an additional Jira account.

But the migration process was still unclear.
Therefore, a [discussion](https://lists.apache.org/thread/jskz22vsbv2n5ks1q42690ohp7cbt1qw) has started in November 2024.
Three options were discussed:

1.  Trying an issue migration and make Jira read-only.
2.  Make Jira read-only, and new issues would be raised on GH.
3.  Do not change Jira but slowly switch to GH.

We, as the Support and Care Team, saw a value in migrating the whole issue from Jira to GH.
The main argument for us was, as a user, I don't have to think about in which tracking system, I have to search for getting information.
Everything is in one location.

In the discussion, a [blog post](https://spring.io/blog/2019/01/15/spring-framework-s-migration-from-jira-to-github-issues) of the Spring Team was mentioned.
It describes how they have migrated their Jira issues to GH.
They wrote a [migration tool](https://github.com/rwinch/jira-to-gh-issues) that uses an unofficial import GH API.
We [have forked](https://github.com/support-and-care/jira-to-gh-issues) it and tested if we can reuse it for the Maven repositories.

Not everyone saw a value in investing volunteer time in such a migration task.
To be fair, in Maven's context, such a kind of migration means touching 83 repositories (check the [whole migration documentation](https://cwiki.apache.org/confluence/display/MAVEN/JIRA+to+GitHub+Issues+switching) to get a better feeling).

Of course, such a migration is not fun, and nobody wants to do it in their spare time, although it can add value in the long term.
Therefore, we, as a Support and Care Team, decided to spend some of our maintenance budget to help with the migration and concentrate on the automation of moving Jira issues to GH issues.

At the end, the whole migration project was divided into three phases:

- Phase 1: Enable GH issues and stop new issues in Jira.
- Phase 2: Migrate Jira issues history to GH issues.
- Phase 3: Clean up and \"archive\" Jira projects.

We were involved in phase 2.
Therefore, we want to give some background information on how phase 2 proceeded.

## Phase 2: Migrate Jira issues history to GH issues — A recap

We forked [Spring's migration tool](https://github.com/support-and-care/jira-to-gh-issues) and adjusted it to match the requirements that we had on Apache Maven's side.
Some requirements were clear before we started the migration, some of them turned out during testing and others during the first real
migrations.

While preparing the list which Jira project should be migrated, it became clear that some Jira projects have to be split to many repositories.
Fortunately, we could use the Jira component field as the source of truth for the splitting, so we could adjust the migration tool
easily.

During testing, we have recognized that doing the migration with your personal token is a bad idea, since you are the author of every imported GH issue then, and this has consequences in notification
Our solution was to set up [a service account](https://github.com/support-and-care/jira-to-gh-issues/blob/master/docs/how-to-create-gh-service-account.adoc) in GitHub.

We wanted the old PRs to be linked to the new related GH issues.
In the UI, you have a specific field for that, but the GH REST API has not implemented this feature.
As a work-around, we had to add a comment to the GH issue so that GH events are triggered that link the issue with
the PR.

During the GH import, some imported issues got a pending status
That means that they are created but not visible.
In the first migration runs, we didn't recognize it, and therefore, we accidentally imported some Jira issues twice.
We could clean it up with the help of the GitHub support.
Unfortunately, we have realized too late that GH stores PRs and issues on the same domain object (issue), and so some PRs of
m-jlink-plugin were deleted during the cleanup.
Our lesson learned was to introduce better handling of pending issues.

The complete list of changes:

- Add handling of a prefix in Apache's Jira path.
- Add handling for GH URLs of an organization.
- Prepare an author mapping file.
- Customize the issue title for migrated issues.
- Preparing Label Mapping:
  - Map Jira Issue Types to GH Labels.
  - Map Jira Priority field to GH Labels.
  - Map the special Jira Version field to GH Labels.
  - Dependency-update-related Jira issues are mapped automatically with the dependency label.
  - Create labels that don't exist automatically.
- Add a filter to skip bot comments during importing.
- Add a filter to skip Jira issues that don't have a specific Jira component set.
- Create only non-existing milestones on GH.
- Grab related PRs to a Jira issue and add a link to the new GH issue.
- Introduce a mechanism to add links to PRs for ex-pending issues.
- Improve the retry mechanism because of pending issues.
- Add mapping a Jira resolution type to GH state reason not planned.

But we have also learnt on the organization level.
During the migration, we learnt that the GH import API was already retired, so that we had luck that it was still running.
It does not match all features that GH already has, for example, the GH state field was not supported, but we found a workaround for that.

The GH has rate limits for its REST API.
So for Jira projects with a huge number of issues, we have to organize the migration of it in many steps.

Every migration run has created a huge number of email notifications.
Of course, not everyone was amused about it, and it costs some migration runs to find out which configuration is responsible for which kind of email notification.
In the end, we could not disable all email notifications in all systems, only reduce them.
For example, in GH, every user can have personal email notifications; in Jira, it was a global setting for all Jira projects.

At the end of every migration run, we could improve the tool and our process in general.

In conclusion, without funding, nobody could spend so much time to prepare and support such a huge migration.

## We want to say Thank You

The whole migration was a result of good teamwork and based on another person's work.

Therefore, a big *Thank-you* in particular to

- The Spring team for creating the original migration tool.
- Benjamin Marwell for running the first migrations and troubleshooting.
- Sławomir Jaranowski for driving the first phase and giving the first feedback.
- Sylwester Lachiewicz for giving the first feedback.
- Hervé Boutemy for providing feedback and supporting on the organization side.
- Matthias Bünger and Olivier Lamy for speeding up Phase 2.
- The ASF infra team, especially Gavin McDonald and Daniel Gruno, for supporting us with the whole infrastructure stuff.
- GitHub support.
