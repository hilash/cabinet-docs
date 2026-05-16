---
title: "Tasks"
created: "2026-05-07T00:00:00.000Z"
modified: "2026-05-07T00:00:00.000Z"
status: draft
tags:
  - overview
  - tasks
order: 3
---

# Tasks

The Tasks tab is <mark data-color="yellow">**what the team does**</mark>. Real teams have rhythms — a Monday standup, a Friday update, an inbox check at 9am. Cabinet has the same three rhythms.

## The three rhythms

**<mark data-color="amber">Tasks</mark>** — one thing, runs once. *"Draft the launch post."* You write a brief, dispatch it, the agent works, the output lands in your folder.

**<mark data-color="blue">Routines</mark>** — a task on a schedule. *"Draft the launch post every Friday at 10am."* Same shape as a task, plus a cron-like schedule.

**<mark data-color="red">Heartbeats</mark>** — a recurring check-in the agent uses to decide what to do next. *"Every weekday at 9am, look at the launch room and tell me what changed."* The difference between an assistant you have to summon and a teammate who shows up.

## What lands back

Outputs are <span class="tx-green">durable pages, not chat transcripts</span>. A research task produces a research page. A weekly summary produces a weekly summary page. You'll be able to find it next year by `ls`-ing.

Every dispatched piece of work also queues a <span class="tx-accent">one-click human approval</span> before anything runs that touches the outside world.

## Read more

- [Tasks](../agents/tasks/) — anatomy of a task, brief format, dispatch loop.
- [Routines](../agents/routines/) — schedules, triggers, history.
- [Heartbeats](../agents/heartbeats/) — the rhythm that turns assistants into teammates.
- [Conversations & approvals](../agents/conversations-and-approvals/) — how nothing runs without your say-so.
- [Tasks vs Routines](../../guides/tasks-and-routines/) — when to pick which.
