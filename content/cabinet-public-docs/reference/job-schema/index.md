---
title: "Job schema"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - reference
  - schema
  - jobs
  - routines
order: 45
---

# `.jobs/<slug>.yaml` schema

Routines are YAML files in <code>.jobs/</code>. The filename becomes the routine slug.

For the conceptual story see [Routines](../../cabinet/agents/routines/). This page is the field-by-field reference.

## Minimal valid job

```yaml
schedule: "0 9 * * 1"
ownerAgent: ops-coordinator
title: "Monday triage"
prompt: "Read /inbox/. Group by urgency. Write /briefings/$DATE.md."
```

## Every field

### Trigger

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>schedule</code> | cron string \| <code>"manual"</code> | yes | — | <mark data-color="amber">Standard 5-field cron</mark>, or <code>"manual"</code> for run-on-button. |
| <code>timezone</code> | IANA tz | no | system | E.g., <code>"America/New_York"</code>. |
| <code>enabled</code> | boolean | no | <code>true</code> | Off without deleting. |
| <code>jitterMinutes</code> | integer | no | <code>0</code> | Random delay added per run to avoid thundering herd on cron-aligned beats. |

### Identity

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>title</code> | string | yes | — | Shown in the schedule UI and approval logs. |
| <code>description</code> | string | no | "" | One-line summary. |
| <code>tags</code> | string[] | no | <code>[]</code> | Free-form tags for filtering. |

### Execution

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>ownerAgent</code> | agent slug | yes | — | Which persona runs this routine. Inherits its tools and memory. |
| <code>prompt</code> | string | yes | — | The instruction. Variables get interpolated (see below). |
| <code>model</code> | string | no | agent's default | Override the agent's model for this routine. |
| <code>effort</code> | <code>"low"</code> \| <code>"medium"</code> \| <code>"high"</code> | no | agent's default | Override reasoning effort. |
| <code>tools</code> | string[] | no | agent's default | Allow-list of tool names for this routine. |
| <code>requiresApproval</code> | boolean | no | <code>false</code> | If true, the result queues for review before landing. |

### Budget

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>budget.maxTokens</code> | integer | no | inherits | Token cap per run. |
| <code>budget.maxCostUsd</code> | number | no | inherits | Dollar cap per run. |

### Outputs

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>outputs</code> | array | no | <code>[]</code> | Hint Cabinet which files this routine writes. Powers link-checking. |
| <code>outputs[].path</code> | path | yes | — | Path within the cabinet, with variables interpolated. |
| <code>outputs[].kind</code> | string | no | inferred | E.g., <code>"page"</code>, <code>"data"</code>, <code>"asset"</code>. |

### Dependencies

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>reads</code> | path[] | no | <code>[]</code> | Files the routine declares it'll read. Used for impact analysis. |
| <code>after</code> | string[] | no | <code>[]</code> | Slugs of jobs that must complete first. |

## Variable interpolation

Available in <code>prompt</code>, <code>outputs[].path</code>, and any string field:

| Variable | Expands to |
| --- | --- |
| <code>$DATE</code> | <code>YYYY-MM-DD</code> |
| <code>$TIME</code> | <code>HH:MM</code> |
| <code>$YYYY-WW</code> | ISO week, e.g. <code>2026-W18</code> |
| <code>$WEEK</code> | alias for <code>$YYYY-WW</code> |
| <code>$MONTH</code> | <code>YYYY-MM</code> |
| <code>$AGENT</code> | owner agent's slug |
| <code>$CABINET</code> | current cabinet's id |
| <code>$RUN_ID</code> | unique id for this run, e.g. <code>r_42a8</code> |

## Complete example

```yaml
schedule: "0 17 * * 5"
timezone: "America/Los_Angeles"
enabled: true
title: "Friday investor update packet"
description: "Compile the weekly metrics + cover narrative for investor.update@."
tags: [investors, weekly]

ownerAgent: revenue-analyst
prompt: |
  Compile this week's metrics into /investors/${YYYY-WW}/.
  Pull from /metrics/, /sales/pipeline.csv, /support/tickets.csv.
  End with a 3-sentence narrative for the cover email.

model: claude-opus-4-7
effort: high
budget:
  maxTokens: 80000
  maxCostUsd: 2.50

reads:
  - "/metrics/**"
  - "/sales/pipeline.csv"
  - "/support/tickets.csv"

outputs:
  - path: "investors/${YYYY-WW}/packet.md"
    kind: page
  - path: "investors/${YYYY-WW}/cover.md"
    kind: page

requiresApproval: true
```

## Manual routines

Set <code>schedule: "manual"</code> for a button-driven routine. The body of the YAML is unchanged; the routine just doesn't fire on a clock.

```yaml
schedule: "manual"
ownerAgent: research-lead
title: "Brief 10 competitors"
prompt: |
  Take the company name from the trigger context.
  Produce one /research/competitors/<slug>.md per competitor.
```

When you click **Run** in the UI, you can pass arguments which become available in the trigger context.

## Validation

A bad job file fails at boot with exit code <code>6</code> and a precise error.

## Read on

- [Routines (concept)](../../cabinet/agents/routines/) — the conceptual story.
- [Persona schema](../persona-schema/) — the agent file format.
- [Manifest schema](../manifest-schema/) — the cabinet-level config.
