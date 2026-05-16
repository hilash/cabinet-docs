---
title: "Org chart & departments"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - org
  - departments
  - dispatch
order: 8
---

# Org chart & departments

A Cabinet team is a tree. <mark data-color="yellow">Departments are folders, leads sit at the top, specialists sit underneath.</mark> Leads can dispatch work down. Specialists do focused work. Every dispatch goes through the [Approval Queue](../conversations-and-approvals/) before it runs.

<div data-demo="org-chart" data-caption="A real cabinet org. Leads in bold borders, specialists below."></div>

## How the tree gets built

Two things define the tree:

1. The **folder structure** under <code>.agents/</code> — sub-folders become departments.
2. The <code>type</code> field in each <code>persona.md</code> — <code>lead</code> goes up, <code>specialist</code> goes underneath.

```text
.agents/
├── marketing/
│   ├── gtm-lead/persona.md       (type: lead)
│   ├── linkedin-operator/persona.md
│   └── copywriter/persona.md
├── research/
│   ├── research-lead/persona.md  (type: lead)
│   └── citation-keeper/persona.md
└── operations/
    ├── ops-coordinator/persona.md  (type: lead)
    ├── product-auditor/persona.md
    └── revenue-analyst/persona.md
```

That's it. <span class="tx-accent">No manifest, no graph DSL.</span> Move a folder, the org changes.

## What a lead can do that a specialist can't

| Capability | Lead | Specialist |
| --- | --- | --- |
| Run their own tasks | ✓ | ✓ |
| Be `@`-mentioned by you | ✓ | ✓ |
| Have heartbeats and routines | ✓ | ✓ |
| Propose `LAUNCH_TASK` to other agents | ✓ | <span class="tx-accent">opt-in via <code>canDispatch</code></span> |
| Propose `SCHEDULE_JOB` | ✓ | opt-in |
| See other agents' memory | <mark data-color="amber">opt-in</mark> | no |
| Cross department boundaries when dispatching | with policy | no |

A specialist <mark data-color="green">stays in its lane</mark>. A lead can plan a week of work for the team in one turn.

## Dispatch — the lead's main move

When a lead is reasoning through work, it can emit a structured action instead of just text:

```json
{
  "action": "LAUNCH_TASK",
  "to": "research-lead",
  "title": "Brief 10 competitors before Friday",
  "prompt": "Fan out to /research/competitors/. One brief per company.",
  "model": "gemini-2.5-pro",
  "effort": "medium"
}
```

That action shows up in the [Approval Queue](../conversations-and-approvals/). You see who proposed it, change settings inline, and approve or reject. <span class="tx-green">Nothing runs without you.</span>

A lead can chain dispatches in one turn:

> *"Plan the Q3 launch. Brief competitors via Research Lead. Schedule a weekly LinkedIn batch. Queue a Friday founder-story pass with the Editor."*

The output: three queued proposals, all visible at once. You scan, approve in 30 seconds, the team executes for a week.

## Department visibility

Each persona has a <code>visibility</code> field that controls what they can read:

| Value | Reads |
| --- | --- |
| <code>folder</code> | Only their <code>.agents/&lt;dept&gt;/</code> + the cabinet-level pages they're explicitly given. |
| <code>cabinet</code> | Everything in the current cabinet. (default) |
| <code>all</code> | Everything in this cabinet AND its child cabinets. <mark data-color="amber">Use sparingly.</mark> |

Tight visibility makes agents <span class="tx-accent">fast and predictable</span>. Loose visibility makes them aware but expensive.

## Cross-department policy

By default, a lead can only dispatch <span class="tx-accent">within their department</span>. Marketing can ask Marketing. Research can ask Research. Cross-department dispatches require policy in <code>.cabinet</code>:

```yaml
dispatch:
  allow:
    - from: marketing/gtm-lead
      to: research/*
      kinds: [LAUNCH_TASK]
    - from: operations/ops-coordinator
      to: marketing/copywriter
      kinds: [LAUNCH_TASK]
```

Without an entry, the dispatch is rejected at the proposal stage with a clear "policy: not allowed" message. <mark data-color="green">No surprise cross-team work.</mark>

## A team-of-teams: child cabinets

A child cabinet has its <span class="tx-accent">own</span> <code>.agents/</code> folder with its own org chart. The parent cabinet's leads can dispatch *into* a child cabinet only if the child explicitly opts in via its own <code>.cabinet</code>:

```yaml
# children/clients/acme/.cabinet
dispatch:
  acceptFromParent:
    - from: ops-coordinator
      kinds: [LAUNCH_TASK]
```

This makes Cabinet practical for agencies, multi-tenant work, and "departments-of-departments" setups. <mark data-color="green">Each child stays sovereign.</mark>

## Read on

- [Conversations & approvals](../conversations-and-approvals/) — the queue every dispatch lands in.
- [Persona](../persona/) — where <code>type</code>, <code>canDispatch</code>, and <code>visibility</code> are set.
- [Templates](../../../templates/) — pre-built org charts you can install in one command.
