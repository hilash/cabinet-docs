---
title: "Routines"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - routines
  - schedules
order: 3
---

# Routines

A routine is <mark data-color="yellow">a task that runs on a schedule</mark>. Same prompt, same agent, same output shape, every Friday at 5pm. While [heartbeats](../heartbeats/) decide what to do at a moment, routines do the same thing reliably.

<div data-demo="rhythm" data-caption="Tasks run once. Routines recur. Heartbeats check in."></div>

## Where routines live

Each routine is a YAML file in <code>.jobs/</code>:

```text
my-cabinet/
├── .agents/
│   └── gtm-lead/persona.md
└── .jobs/
    ├── monday-launch-room.yaml
    ├── friday-investor-update.yaml
    └── weekly-competitor-sweep.yaml
```

The filename becomes the routine's slug. <span class="tx-accent">Add a file, the routine appears.</span> Delete it, the routine disappears. Git tracks it.

## A complete routine

```yaml
schedule: "0 17 * * 5"        # Fridays at 5pm
ownerAgent: revenue-analyst
enabled: true
title: "Friday investor update packet"

prompt: |
  Compile this week's metrics into /investors/$WEEK/.
  Pull from /metrics/, /sales/pipeline.csv, /support/tickets.csv.
  End with a 3-sentence narrative for the cover email.

model: claude-opus-4-8
effort: high
budget:
  maxTokens: 80000
  maxCostUsd: 2.50

outputs:
  - path: "investors/${YYYY-WW}/packet.md"
  - path: "investors/${YYYY-WW}/cover.md"
```

## Every field

| Field | Type | Required | What it does |
| --- | --- | --- | --- |
| <code>schedule</code> | cron string \| "manual" | yes | When the routine fires. Use <code>manual</code> for run-on-button. |
| <code>ownerAgent</code> | agent slug | yes | Which persona runs it. Inherits their model, tools, and memory. |
| <code>enabled</code> | boolean | no (default <code>true</code>) | Off without deleting. |
| <code>title</code> | string | yes | Shown in the schedule UI and approval logs. |
| <code>prompt</code> | string | yes | The instruction. Variables like <code>$DATE</code>, <code>$WEEK</code>, <code>$YYYY-WW</code> get interpolated. |
| <code>model</code> | string | no | Override the agent's default model for this routine. |
| <code>effort</code> | <code>"low"</code> \| <code>"medium"</code> \| <code>"high"</code> | no | Reasoning effort. <mark data-color="amber">High = slower, more careful, more expensive.</mark> |
| <code>budget</code> | object | no | Cap tokens or dollars per run. |
| <code>outputs</code> | array | no | Hint Cabinet which files this routine writes. Helps with link-checking. |
| <code>requiresApproval</code> | boolean | no (default <code>false</code>) | If true, queue the result before it lands. |

## Routines vs. heartbeats — which do I want?

Pick a routine when you can describe the output before it runs:

> "Every Friday, summarize the week's metrics into a packet."

Pick a heartbeat when you can only describe the *trigger*:

> "Every weekday morning, look at the launch room and tell me what changed — *if anything*."

A rough rule: <mark data-color="green">if the output goes in a predictable folder structure, it's a routine.</mark> If the output might be "nothing today, sorry," it's a heartbeat.

## Manual routines

Set <code>schedule: "manual"</code> for a routine you trigger from the UI:

```yaml
schedule: "manual"
ownerAgent: research-lead
title: "Brief 10 competitors"
prompt: |
  Take the company name from the trigger context.
  Produce one /research/competitors/<slug>.md per competitor.
  Use the brief template at /research/templates/competitor.md.
```

These show up as <span class="tx-accent">"Run"</span> buttons in the agent's profile. Click to trigger, optionally pass arguments.

## Variable interpolation

| Variable | Expands to | Example |
| --- | --- | --- |
| <code>$DATE</code> | YYYY-MM-DD | <code>2026-05-03</code> |
| <code>$WEEK</code> | YYYY-WW (ISO week) | <code>2026-W18</code> |
| <code>$MONTH</code> | YYYY-MM | <code>2026-05</code> |
| <code>$AGENT</code> | owner agent's slug | <code>gtm-lead</code> |
| <code>$CABINET</code> | current cabinet's id | <code>my-startup</code> |
| <code>$RUN_ID</code> | unique id for this run | <code>r_42a8</code> |

Useful for routing outputs into dated folders that won't collide.

## Watching a routine run

Open the agent's profile (or **Routines** in the sidebar). Each scheduled run shows up as a row with:

- The <mark data-color="blue">trigger</mark> (cron / manual / heartbeat dispatch).
- The <span class="tx-accent">model</span> and effort actually used.
- A live token counter.
- The <mark data-color="green">output paths</mark> as they get written.

You can <span class="tx-accent">interrupt</span> a long-running routine the same way you'd interrupt a chat — Cabinet writes a clean <code>partial</code> page so nothing is lost.

## Read on

- [Heartbeats](../heartbeats/) — when a check-in is enough.
- [Tasks](../tasks/) — for one-offs, not schedules.
- [Job schema reference](../../../reference/job-schema/) — every YAML field, every default.
