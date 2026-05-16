---
title: "Agents"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - overview
order: 2
---

# Your AI team

A Cabinet agent is <mark data-color="yellow">a markdown file with a heartbeat</mark>. The file lives at <code>.agents/&lt;slug&gt;/persona.md</code>. Edit it, and the agent updates. Delete it, and the agent disappears. <span class="tx-green">Git tracks every change.</span>

That's the whole mental model. Everything below is what those files can do.

<div data-demo="org-chart" data-caption="A real cabinet org. Departments are folders. Leads dispatch. Specialists ship."></div>

## What an agent has

| Piece | What it is | Where it lives |
| --- | --- | --- |
| **Persona** | The system prompt + identity | <code>.agents/&lt;slug&gt;/persona.md</code> |
| **Memory** | Things the agent has learned about you and the work | <code>.agents/&lt;slug&gt;/memory.md</code> |
| **Heartbeats** | Recurring check-ins on a schedule | YAML inside <code>persona.md</code> |
| **Skills** | Reusable instruction packs the agent can pull in | <code>.agents/skills/&lt;name&gt;/SKILL.md</code> |
| **Workspace** | Where their outputs land | Any folder you point them at |
| **Model** | Which provider runs them | Set in <code>persona.md</code>, override per task |

## Three rhythms a team runs on

<div data-demo="rhythm" data-caption="Same agent, three different ways to ship work."></div>

- A <mark data-color="amber">task</mark> is one piece of work that runs once.
- A <mark data-color="blue">routine</mark> is a task on a schedule.
- A <mark data-color="red">heartbeat</mark> is a recurring check-in the agent uses to decide what to do next.

Heartbeats are the difference between an assistant you have to summon and a teammate who shows up.

## The dispatch and approval loop

A <span class="tx-accent">lead</span> agent can propose work for the rest of the team — launch a task for the researcher, schedule a job for the marketer, queue a one-off for the editor. Every proposal goes through the **Approval Queue** before anything runs. You approve, change the model or effort, or reject.

<div data-demo="approval-queue" data-caption="Approve or reject before any agent acts."></div>

## Read on

- [Persona](./persona/) — the full <code>persona.md</code> schema.
- [Heartbeats](./heartbeats/) — recurring check-ins.
- [Routines](./routines/) — scheduled tasks.
- [Tasks](./tasks/) — the kanban board.
- [Conversations & approvals](./conversations-and-approvals/) — the safety story.
- [Delegating between agents](./org-chart-and-departments/) — leads, specialists, departments.
- [Skills](./skills/) — installable instruction packs.
- [BYOAI](./byoai/) — bring your own AI provider.
