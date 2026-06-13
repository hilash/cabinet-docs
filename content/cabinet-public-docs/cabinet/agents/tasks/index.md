---
title: "Tasks"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - tasks
  - kanban
order: 4
---

# Tasks

A task is the <mark data-color="yellow">smallest unit of work</mark> in Cabinet. One prompt, one agent, one run, one output. Tasks are the thing routines schedule, agents dispatch, and you create from the kanban board.

<div data-demo="task-board-mini" data-caption="The same board lives in Cabinet, one click from any room."></div>

## Where tasks come from

Tasks land on the board through three channels:

- **You** — click **+ New Task** on the kanban, type a prompt, pick an agent.
- **Routines** — every scheduled run shows up as a task with the routine name attached.
- **Other agents** — a [lead](../org-chart-and-departments/) proposes a `LAUNCH_TASK`, you approve it, it lands on the board.

## The five lanes

Cabinet's default board has five lanes that mirror how a real team's work moves:

| Lane | Meaning | Who acts next |
| --- | --- | --- |
| <mark data-color="blue">**Inbox**</mark> | Just landed. Not assigned, not started. | You triage. |
| <mark data-color="amber">**Your turn**</mark> | The agent finished and needs your call (review, approve, decide). | You. |
| <span class="tx-accent">**Running**</span> | An agent is actively working it. | The agent. |
| <span class="tx-green">**Just finished**</span> | Output written, not yet acknowledged. | You skim. |
| <span class="tx-purple">**Archive**</span> | Done. Kept for history and search. | Nobody. |

Drag cards across lanes. Status changes are <span class="tx-accent">git-tracked</span> so you can see who moved what when.

## A task card

Every card shows:

- **Title** — what the task is.
- **Agent** — who's running it, with their emoji.
- **Trigger** — Manual / Job / Heartbeat / Dispatched-by.
- **Status pills** — running, waiting on you, blocked, done.
- **Effort** — model + reasoning level used for this run.
- **Output links** — pages this task wrote.

Click a card for the full transcript, the prompt, and the diff of every page it touched.

## Creating a task

The fastest way is the global hotkey <kbd>⌘N</kbd> from anywhere in the app. You get a small composer:

```
┌─────────────────────────────────────────┐
│  Task                                    │
│  ─────────────────────────────────────   │
│  Brief 10 competitors before Friday     │
│                                          │
│  → Research Lead   ▾  claude-opus  ▾    │
│  ◯ low  ● medium  ◯ high                │
│                                          │
│  [ Add to Inbox ]   [ Run now ]         │
└─────────────────────────────────────────┘
```

Pick an agent, pick a model + effort, choose **Add to Inbox** (queued for later) or **Run now** (the agent starts immediately).

## Filters and views

The board has <span class="tx-accent">three views</span>:

- **Kanban** — the lanes above. Default.
- **List** — flat sortable table. Best for triage of a busy day.
- **Schedule** — calendar view of upcoming routines + heartbeats.

And these <mark data-color="amber">filters</mark>:

- By **agent** — see only what one agent is doing.
- By **trigger** — Manual, Job, Heartbeat.
- By **status** — Running, Waiting, Done.
- By **cabinet visibility** — current folder only, current cabinet, or all.

## Approvals

Tasks proposed by another agent show up with <mark data-color="amber">an approval pill</mark> instead of a normal status. You approve them inline, swap the model or effort, or reject. See [Conversations & approvals](../conversations-and-approvals/).

<div data-demo="approval-queue" data-caption="The approval queue is the same data, viewed differently."></div>

## What a task writes

Every task writes at least one of:

1. **A page** — the output, in a folder you (or the agent) chose.
2. **A memory entry** — for the agent's own future runs.
3. **A transcript** — kept under <code>.cabinet-state/</code> for audit.

<mark data-color="green">If it writes a page, it's durable.</mark> If it only writes memory or a transcript, it's invisible to your future self. Default to writing a page when the work matters.

## Read on

- [Routines](../routines/) — for tasks that need to recur.
- [Showcase: Tasks](../../../showcase/tasks/) — the live read-only board.
- [Conversations & approvals](../conversations-and-approvals/) — the safety surface around dispatched tasks.
