---
name: doc-coauthoring
description: Guide users through a structured workflow for co-authoring documents such as proposals, tenders, technical specs, decision docs, or similar structured content. Helps users efficiently transfer context, refine content through iteration, and verify the document works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, preparing tenders, or similar documentation tasks.
license: Apache-2.0
metadata:
  source: https://github.com/anthropics/skills
  author: Anthropic
  modifications: Adapted for Open Elements projects with business communication rules
---

# Doc Co-Authoring Workflow

This skill provides a structured workflow for guiding users through collaborative document creation. Act as an active guide, walking users through three stages: Context Gathering, Refinement & Structure, and Reader Testing.

## When to Offer This Workflow

**Trigger conditions:**
- User mentions writing documentation: "write a doc", "draft a proposal", "create a spec", "write up"
- User mentions specific doc types: "PRD", "design doc", "decision doc", "RFC", "tender", "Angebot", "Ausschreibung"
- User seems to be starting a substantial writing task

**Initial offer:**
Offer the user a structured workflow for co-authoring the document. Explain the three stages:

1. **Context Gathering**: User provides all relevant context while Claude asks clarifying questions
2. **Refinement & Structure**: Iteratively build each section through brainstorming and editing
3. **Reader Testing**: Test the doc with a fresh Claude (no context) to catch blind spots before others read it

Explain that this approach helps ensure the doc works well when others read it. Ask if they want to try this workflow or prefer to work freeform.

If user declines, work freeform. If user accepts, proceed to Stage 1.

## Business Communication Rules

**IMPORTANT:** For any document that represents Open Elements externally (proposals, tenders, presentations, cover letters), load and apply the rules from `business-communication.md` throughout all stages. These rules govern truthfulness, confidentiality, transparency, attribution, tone, and language.

Key rules to keep in mind at all times:
- Every factual claim must be verifiable. Do not invent achievements, partnerships, certifications, or capabilities.
- Cross-check facts against the `open-elements-info` skill as the primary source of truth.
- Never include customer names or confidential details without explicit approval.
- Use the full legal name "Open Elements GmbH" in formal documents.
- Document language follows the target audience (German or English).
- Avoid marketing buzzwords. Let concrete facts speak for themselves.

## Stage 1: Context Gathering

**Goal:** Close the gap between what the user knows and what Claude knows, enabling smart guidance later.

### Initial Questions

Start by asking the user for meta-context about the document:

1. What type of document is this? (e.g., technical spec, decision doc, proposal, tender response)
2. Who is the primary audience?
3. What is the desired impact when someone reads this?
4. Is there a template or specific format to follow?
5. What language should the document be in? (German for German-speaking recipients, English for international contexts)
6. Any other constraints or context to know?

Inform them they can answer in shorthand or dump information however works best for them.

**If user provides a template or reference document:**
- Read the provided file
- If it is a tender document with evaluation criteria, extract and list all criteria explicitly — these will guide the entire drafting process

**If the document is a tender response or formal submission:**
- Identify all evaluation criteria and scoring levels from the tender document
- Create a tracking list of criteria to ensure each one is explicitly addressed
- Use the same terminology as the evaluation criteria where possible

### Info Dumping

Once initial questions are answered, encourage the user to dump all the context they have. Request information such as:
- Background on the project or problem
- Related discussions or documents
- Why alternative approaches are not being used
- Organizational context (stakeholder concerns, timeline pressures)
- Technical architecture or dependencies
- For tenders: the complete tender document, evaluation matrix, and any Q&A responses

Advise them not to worry about organizing it — just get it all out.

**During context gathering:**

- If user mentions entities, projects, or facts about Open Elements: cross-check against the `open-elements-info` skill before proceeding
- As user provides context, track what has been learned and what is still unclear
- Flag any claims that cannot be verified and ask the user for confirmation

**Asking clarifying questions:**

When user signals they have done their initial dump, ask clarifying questions to ensure understanding:

Generate 5-10 numbered questions based on gaps in the context.

Inform them they can use shorthand to answer (e.g., "1: yes, 2: no because backwards compat, 3: see attached doc").

**Exit condition:**
Sufficient context has been gathered when questions show understanding — when edge cases and trade-offs can be asked about without needing basics explained.

**Transition:**
Ask if there is any more context they want to provide at this stage, or if it is time to move on to drafting the document.

## Stage 2: Refinement & Structure

**Goal:** Build the document section by section through brainstorming, curation, and iterative refinement.

**Instructions to user:**
Explain that the document will be built section by section. For each section:
1. Clarifying questions will be asked about what to include
2. 5-20 options will be brainstormed
3. User will indicate what to keep, remove, or combine
4. The section will be drafted
5. It will be refined through surgical edits

Start with whichever section has the most unknowns, then work through the rest.

**Section ordering:**

If the document structure is clear (e.g., from a template or tender requirements):
Ask which section they would like to start with. Suggest starting with whichever section has the most unknowns.

If user does not know what sections they need:
Based on the type of document, suggest 3-5 sections appropriate for the doc type. Ask if this structure works or if they want to adjust it.

**Once structure is agreed:**

Create the document as a markdown file in the working directory. Name it appropriately (e.g., `decision-doc.md`, `technical-spec.md`, `tender-response.md`).

Create the file with all section headers and brief placeholder text like "[To be written]".

Confirm the file has been created and indicate it is time to fill in each section.

**For each section:**

### Step 1: Clarifying Questions

Announce work will begin on the section. Ask 5-10 clarifying questions about what should be included.

### Step 2: Brainstorming

Brainstorm 5-20 things that might be included, depending on the section's complexity. Look for:
- Context shared that might have been forgotten
- Angles or considerations not yet mentioned
- For business documents: concrete, verifiable examples from past work that demonstrate claimed capabilities

### Step 3: Curation

Ask which points should be kept, removed, or combined. Request brief justifications to help learn priorities for the next sections.

**If user gives freeform feedback** instead of numbered selections, extract their preferences and proceed.

### Step 4: Gap Check

Based on what they have selected, ask if there is anything important missing for this section.

**For tender responses:** Check the selected content against the evaluation criteria. Flag any criteria that are not yet addressed and ask the user how to handle them.

### Step 5: Drafting

Use `str_replace` to replace the placeholder text with the actual drafted content.

After drafting, confirm completion and ask the user to read through it and indicate what to change.

**Key instruction for user (include when drafting the first section):**
Instead of editing the doc directly, ask them to indicate what to change. This helps learning of their style for future sections.

### Step 6: Iterative Refinement

As user provides feedback:
- Use `str_replace` to make edits (never reprint the whole doc)
- Confirm edits are complete after each change

**Continue iterating** until user is satisfied with the section.

### Quality Checking

After 3 consecutive iterations with no substantial changes, ask if anything can be removed without losing important information.

When section is done, confirm it is complete and ask if ready to move to the next section.

**Repeat for all sections.**

### Near Completion

As approaching completion (80%+ of sections done), re-read the entire document and check for:
- Flow and consistency across sections
- Redundancy or contradictions
- Generic filler that does not carry weight
- Whether every sentence adds value

**For business documents, additionally check against the review checklist from `business-communication.md`:**
- All stated facts match information from the `open-elements-info` skill or other confirmed sources
- No claims are exaggerated or misleading
- The tone is consistent — professional, honest, and confident
- Foundation roles and memberships are stated with correct titles
- Team members are referenced with their correct names and roles
- Customer names or confidential details are not disclosed without approval
- The full legal name "Open Elements GmbH" is used in formal contexts
- The document language is appropriate for the target audience and consistent throughout
- Facts are current — not copied from outdated sources without verification

**For tender responses, additionally verify:**
- Each evaluation criterion is explicitly addressed in the response
- The text uses the same terminology as the evaluation criteria
- For each claimed capability or process, at least one concrete, verifiable example is included

Provide any findings and suggestions.

When all sections are drafted and refined, ask if ready to move to Reader Testing, or if they want to refine anything else.

## Stage 3: Reader Testing

**Goal:** Test the document with a fresh Claude (no context bleed) to verify it works for readers.

Explain that testing will now occur to see if the document actually works for readers. This catches blind spots — things that make sense to the authors but might confuse others.

### Step 1: Predict Reader Questions

Predict what questions readers might ask when reading this document.

Generate 5-10 questions that readers would realistically ask. For tender responses, include questions an evaluator would ask when scoring against the criteria.

### Step 2: Test with Sub-Agent

Test these questions with a fresh Claude instance (no context from this conversation).

For each question, invoke a sub-agent with just the document content and the question.

Summarize what the reader agent got right and wrong for each question.

### Step 3: Run Additional Checks

Invoke a sub-agent to check for:
- Ambiguity or unclear passages
- False assumptions about reader knowledge
- Internal contradictions or inconsistencies

**For business documents, also check:**
- Whether any claims could be perceived as exaggerated or unverifiable
- Whether the tone is consistent and appropriate for the audience
- Whether Open Elements' role is clearly distinguished from broader community contributions

### Step 4: Report and Fix

If issues are found:
- Report the specific issues
- Loop back to refinement for problematic sections

### Exit Condition

When the reader agent consistently answers questions correctly and does not surface new gaps or ambiguities, the doc is ready.

## Final Review

When Reader Testing passes:

1. Recommend they do a final read-through themselves — they own this document and are responsible for its quality
2. Suggest double-checking any facts, links, or technical details
3. For business documents: remind them to verify that no confidential information has been included without approval
4. Ask them to verify it achieves the impact they wanted

**If user wants a final review, provide it. Otherwise:**

Announce document completion. Provide a few final tips:
- Update the document as feedback is received from real readers
- For tender responses: consider having a colleague review before submission

## Tips for Effective Guidance

**Tone:**
- Be direct and procedural
- Explain rationale briefly when it affects user behavior
- Do not try to "sell" the approach — just execute it

**Handling Deviations:**
- If user wants to skip a stage: ask if they want to skip and write freeform
- If user seems frustrated: acknowledge this is taking longer than expected and suggest ways to move faster
- Always give user agency to adjust the process

**Context Management:**
- Throughout, if context is missing on something mentioned, proactively ask
- Do not let gaps accumulate — address them as they come up

**Quality over Speed:**
- Do not rush through stages
- Each iteration should make meaningful improvements
- The goal is a document that actually works for readers
