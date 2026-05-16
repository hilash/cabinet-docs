---
title: "Persona schema"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - reference
  - schema
  - persona
order: 44
---

# `persona.md` schema

A persona is a markdown file at <code>.agents/&lt;slug&gt;/persona.md</code>. The frontmatter (between the two <code>---</code> lines) is structured. The body is the agent's <span class="tx-accent">system prompt</span>.

For the conceptual story see [Persona](../../cabinet/agents/persona/). This page is the field-by-field reference.

## Minimal valid persona

```yaml
---
name: Inbox Triager
role: Email triage
type: specialist
---

You read /inbox/ every weekday at 9am, tag urgency, write to /briefings/today.md.
```

## Frontmatter fields

### Identity

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>name</code> | string | yes | — | Display name. Shown in mentions, sidebar, org chart. |
| <code>emoji</code> | string | no | <code>"🤖"</code> | Single emoji or short string. The agent's avatar in compact lists. |
| <code>role</code> | string | yes | — | One-line subtitle. ≤3 words is the convention. |
| <code>type</code> | <code>"lead"</code> \| <code>"specialist"</code> | yes | — | <mark data-color="amber">Leads can dispatch.</mark> Specialists do focused work. |

### Model & dispatch

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>model</code> | string | no | inherits | Provider+model. Examples: <code>claude-opus-4-7</code>, <code>gpt-4.1</code>, <code>gemini-2.5-pro</code>, <code>ollama/llama-3.3-70b</code>. |
| <code>effort</code> | <code>"low"</code> \| <code>"medium"</code> \| <code>"high"</code> | no | <code>"medium"</code> | Default reasoning effort for this agent. |
| <code>canDispatch</code> | boolean | no | <code>true</code> for leads, <code>false</code> for specialists | Allow `LAUNCH_TASK` / `SCHEDULE_JOB` proposals. |
| <code>tools</code> | string[] | no | inherits | Allow-list of tool names. Empty = inherit cabinet defaults. |
| <code>visibility</code> | <code>"folder"</code> \| <code>"cabinet"</code> \| <code>"all"</code> | no | <code>"cabinet"</code> | How far the agent can read. |

### Heartbeats

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>heartbeats</code> | array | no | <code>[]</code> | Recurring check-ins. See subfields below. |
| <code>heartbeats[].cron</code> | cron string | yes | — | Standard 5-field cron expression. |
| <code>heartbeats[].label</code> | string | no | derived | Shown in the schedule UI. |
| <code>heartbeats[].prompt</code> | string | yes | — | Prompt the agent receives when this beat fires. |
| <code>heartbeats[].model</code> | string | no | persona's <code>model</code> | Override per heartbeat. |
| <code>heartbeats[].effort</code> | string | no | persona's <code>effort</code> | Override per heartbeat. |
| <code>heartbeats[].enabled</code> | boolean | no | <code>true</code> | Disable without removing. |

### Memory & skills

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>memory</code> | string \| object | no | <code>"memory.md"</code> | Path to the agent's memory file, relative to the persona folder. |
| <code>memory.maxLines</code> | integer | no | <code>2000</code> | Soft cap before Cabinet suggests a memory compaction. |
| <code>skills</code> | string[] | no | <code>[]</code> | Skill slugs to attach by default. See [Skills](../../cabinet/agents/skills/). |

### Budget

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>budget.daily.maxCostUsd</code> | number | no | inherits | Hard cap per agent per day. |
| <code>budget.perRun.maxCostUsd</code> | number | no | inherits | Hard cap per individual run. |
| <code>budget.perRun.maxTokens</code> | integer | no | inherits | Token cap per run. |

### Display

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>color</code> | string | no | derived | Hex or token name. Used for sidebar dot and chat bubbles. |
| <code>order</code> | integer | no | alpha | Lower numbers sort first in lists. |

## Body — the system prompt

Everything after the closing <code>---</code> is the system prompt the agent gets at the start of every run. Treat it like an onboarding doc:

- **Who they are** — title, scope, personality if any.
- **What they own** — folders, files, recurring outputs.
- **What they should never do** — forbidden tools, forbidden folders, escalation rules.
- **How they hand off** — when to dispatch, when to write, when to stay quiet.

Use markdown freely. The whole body is sent verbatim. <mark data-color="green">Shorter is usually better.</mark>

## Example: a complete lead

```yaml
---
name: GTM Lead
emoji: "🎯"
role: Launch strategy
type: lead
model: claude-opus-4-7
effort: high
canDispatch: true
visibility: cabinet
heartbeats:
  - cron: "0 9 * * 1"
    label: "Monday standup"
    prompt: "Open /marketing/launches/. Report what changed since Friday."
  - cron: "0 17 * * 5"
    label: "Friday wrap"
    model: claude-sonnet-4-6
    prompt: "Draft Monday's launch checklist."
skills: [competitor-brief, launch-checklist]
budget:
  daily:
    maxCostUsd: 10
---

You are the GTM Lead.

## Workspace
You always work in /marketing/. Outputs land in /marketing/launches/<launch-slug>/.

## What you own
- Positioning, channels, offers, launch risk register.
- Weekly launch room state.

## How you delegate
- Research gaps → LAUNCH_TASK to Research Lead with the question and the deadline.
- Draft polish → LAUNCH_TASK to Launch Editor with the draft path.
- Recurring posts → SCHEDULE_JOB to LinkedIn Operator (weekly, Friday 5pm).

## Tone
Direct, concrete, ≤3 sentences per recommendation.
```

## Validation

Bad fields fail at boot with a precise error and exit code <code>6</code>:

```text
Error: .agents/gtm-lead/persona.md
  heartbeats[1].cron: invalid cron expression "every monday"
  Use a 5-field cron string. Try crontab.guru.
```

## Read on

- [Persona (concept)](../../cabinet/agents/persona/) — the conceptual story.
- [Manifest schema](../manifest-schema/) — the cabinet-level config.
- [Job schema](../job-schema/) — for routines (<code>.jobs/&lt;slug&gt;.yaml</code>).
- [Skill schema](../skill-schema/) — for SKILL.md.
