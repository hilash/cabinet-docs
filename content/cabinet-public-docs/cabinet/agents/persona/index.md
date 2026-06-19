---
title: "Persona"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - persona
  - schema
order: 1
---

# Persona

A persona is the file that <mark data-color="yellow">is</mark> your agent. Edit it, the agent updates. Delete it, the agent disappears. <span class="tx-green">Git tracks every change.</span>

The whole agent — name, model, schedule, system prompt — sits in one file at <code>.agents/&lt;slug&gt;/persona.md</code>. Hover the fields below to see what each one controls.

<div data-demo="persona-file" data-caption="A real persona.md. Tabs switch between three example agents."></div>

## The minimum viable persona

```yaml
---
name: Inbox Triager
emoji: "📥"
role: Email triage
type: specialist
model: claude-haiku-4-5
---

You read /inbox/ every weekday at 9am, tag urgency, and write a one-line summary to /briefings/today.md.
```

That's a working agent. Three lines of frontmatter and a system prompt. Cabinet picks up the file the next time the app boots.

## Every field

| Field | Type | Default | What it does |
| --- | --- | --- | --- |
| <code>name</code> | string | — | Display name in the AI team panel and `@`-mentions. |
| <code>emoji</code> | string | "🤖" | Quick visual identifier in lists, mentions, and the org chart. |
| <code>role</code> | string | — | One-line subtitle. Keep it ≤3 words. |
| <code>type</code> | <code>"lead"</code> \| <code>"specialist"</code> | <code>specialist</code> | <mark data-color="amber">Leads</mark> can dispatch work to other agents. Specialists do focused work. |
| <code>model</code> | string | inherits cabinet default | Default provider+model. Override per task or per heartbeat. |
| <code>canDispatch</code> | boolean | <code>true</code> for leads, <code>false</code> for specialists | Allow `LAUNCH_TASK` / `SCHEDULE_JOB` proposals. |
| <code>heartbeats</code> | array | <code>[]</code> | Recurring check-ins. See [Heartbeats](../heartbeats/). |
| <code>memory</code> | string \| object | <code>"memory.md"</code> | Where the agent's learned context lives. |
| <code>skills</code> | string[] | <code>[]</code> | Skill slugs to attach by default. See [Skills](../skills/). |
| <code>tools</code> | string[] | inherits | Allow-list of tool names. Empty = inherit cabinet defaults. |
| <code>visibility</code> | <code>"all"</code> \| <code>"cabinet"</code> \| <code>"folder"</code> | <code>cabinet</code> | How far up/down the tree this agent can read. |
| <code>budget</code> | object | inherits | Token / dollar caps per run, per day. |

The body of the file (everything after the second `---`) is the <span class="tx-accent">system prompt</span>. Write it like you're onboarding a new hire: who they are, what they own, where their workspace is, what they should never do.

## Patterns that work

### A specialist who lives in a folder

```yaml
---
name: Pipeline Tracker
emoji: "📈"
role: CRM keeper
type: specialist
model: gpt-4.1
visibility: folder
---

You watch /sales/pipeline.csv. Whenever a row's status changes,
write a one-line note to /sales/changelog.md with the date.
```

<mark data-color="green">Why it works:</mark> narrow scope (<code>visibility: folder</code>), boring model (cheap, fast), one job, output goes to a durable page.

### A lead who orchestrates

```yaml
---
name: GTM Lead
emoji: "🎯"
role: Launch strategy
type: lead
model: claude-opus-4-8
canDispatch: true
heartbeats:
  - cron: "0 9 * * 1"        # Mon 9am
    prompt: "Open the launch room and report what changed."
  - cron: "0 17 * * 5"       # Fri 5pm
    prompt: "Draft Monday's launch checklist."
---

You translate positioning notes into channels, offers, and launch
risks. You always work in /marketing/. When you see a research gap,
dispatch a LAUNCH_TASK to the Research Lead.
```

<mark data-color="green">Why it works:</mark> opinionated model (Opus for strategy), explicit dispatch permission, two heartbeats that frame the week.

### A heartbeat-only agent

```yaml
---
name: Stale Sweep
emoji: "🧹"
role: Weekly cleanup
type: specialist
model: claude-haiku-4-5
heartbeats:
  - cron: "0 18 * * 5"
    prompt: "Find pages in /tasks/ not touched in 30 days. Suggest archive or delete."
---
```

<mark data-color="green">Why it works:</mark> no chat surface, no dispatch, just a Friday-evening sweeper that gets out of your way.

## Memory

A persona's memory file is a markdown page the agent reads at the start of every run and writes to at the end. Think of it as their notebook.

```text
.agents/gtm-lead/
├── persona.md       ← who they are
└── memory.md        ← what they've learned
```

You can read or edit <code>memory.md</code> like any other page. <mark data-color="amber">If the agent learns something wrong, just open the file and fix it.</mark>

## Sharing a persona

A persona is a folder. To share one:

```bash
# Copy out a single agent
cp -r .agents/gtm-lead/ ~/Desktop/

# Or commit + push as part of a [template cabinet](../../../templates/) on cabinets.sh
git add .agents/gtm-lead/
git commit -m "Add GTM Lead persona"
```

When you publish a template to cabinets.sh, the personas come with it. Anyone who installs the template gets your team, ready to run.

## Read on

- [Heartbeats](../heartbeats/) — the recurring check-in field, in detail.
- [Skills](../skills/) — pluggable instruction packs you attach to a persona.
- [Delegating](../org-chart-and-departments/) — what `canDispatch: true` actually unlocks.
- [Persona schema reference](../../../reference/persona-schema/) — every field, every type, every default.
