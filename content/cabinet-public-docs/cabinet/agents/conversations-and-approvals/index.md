---
title: "Conversations & approvals"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - approvals
  - safety
order: 5
---

# Conversations & approvals

Cabinet's safety story is one rule: <mark data-color="yellow">no agent acts on another agent's behalf without your approval.</mark>

When a [lead](../org-chart-and-departments/) decides the researcher should brief a competitor, or the editor should polish a draft, or the marketer should run a weekly post batch, that decision becomes a <span class="tx-accent">proposal</span> in the Approval Queue. You see who proposed what, to whom, with which model and effort. You approve, change settings inline, or reject.

<div data-demo="approval-queue" data-caption="Three real proposals, one click away from running."></div>

## What can be proposed

Three action types. Same approval surface for all of them.

| Action | What it creates | Default approval |
| --- | --- | --- |
| <mark data-color="amber">**LAUNCH_TASK**</mark> | A task in the kanban Inbox | required |
| <mark data-color="blue">**SCHEDULE_JOB**</mark> | A new YAML in <code>.jobs/</code> | required |
| <mark data-color="purple">**SCHEDULE_TASK**</mark> | A one-off task at a future time | required |

You can <span class="tx-accent">auto-approve</span> low-impact proposals (e.g., LinkedIn post drafts under $0.10) by setting policy in <code>.cabinet</code>:

```yaml
approvals:
  auto:
    - kind: LAUNCH_TASK
      maxCostUsd: 0.10
      fromAgent: linkedin-operator
      toAgent: copywriter
```

Anything outside policy still queues. <mark data-color="green">There's no global "trust this agent forever" toggle</mark>, on purpose.

## What you see in the queue

For each proposal:

- **Kind** — LAUNCH_TASK / SCHEDULE_JOB / SCHEDULE_TASK
- **From → To** — proposing agent and target agent
- **Title + detail** — what they want to run
- **Model** — defaults to the target agent's model, but editable inline
- **Effort** — low / medium / high, editable
- **Schedule** (for SCHEDULE_*) — cron string, editable
- **Estimated cost** — token estimate × current model price

You can <span class="tx-accent">change any of those before approving</span>. A common move: a lead suggests Opus + high effort for a quick task; you downgrade to Sonnet + medium and approve.

## Why this matters

Most agent platforms either:

1. Run everything autonomously and let you find out later, or
2. Make every action a chat turn you have to babysit.

Cabinet sits in the middle. <mark data-color="green">Agents propose, you approve.</mark> The lead can plan a whole week's work in one turn, you scan the queue in 30 seconds and ship it, and the team executes without further interruption. The proposal queue is the seam where human judgment lives.

## Where conversations live

Every approval (and every chat with an agent) is a <span class="tx-accent">durable conversation</span> stored under <code>.chat/</code>. You can:

- **Re-read** any past chat — they're plain text on disk.
- **Search** them with <kbd>⌘K</kbd>.
- **Reference** a past chat from a new prompt with `@chat:slug`.
- **Convert** a chat into a routine if you find yourself re-running it.

`.chat/` is git-ignored by default — chats can be long and noisy — but you can opt in per-cabinet if you want them version-tracked.

## Manual conversations

You can also chat with an agent directly. Click their avatar in the AI team panel:

- **Cmd+Shift+A** opens the agent panel for the current page (the agent reads the page as context).
- The agent panel is a normal chat, but `@`-mentions can pull in any page or folder as context.
- If the agent decides the conversation should turn into work, they propose a task — same approval flow.

Manual chats <mark data-color="amber">don't auto-write to the cabinet.</mark> You decide whether the conversation becomes a page (use <code>/save</code>) or stays in <code>.chat/</code>.

## Read on

- [Delegating between agents](../org-chart-and-departments/) — what `canDispatch: true` actually unlocks.
- [Tasks](../tasks/) — where approved proposals land.
- [Routines](../routines/) — what an approved <code>SCHEDULE_JOB</code> becomes.
