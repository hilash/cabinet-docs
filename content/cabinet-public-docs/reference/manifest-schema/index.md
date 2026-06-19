---
title: "Manifest schema"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - reference
  - schema
  - manifest
order: 43
---

# `.cabinet` — manifest schema

Every cabinet folder has a <mark data-color="yellow"><code>.cabinet</code> file at its root</mark>. It's the only file Cabinet *requires*. Without it, a folder is just a folder; with it, the folder becomes a cabinet that the app can open, the registry can install, and other cabinets can nest.

```yaml
schemaVersion: 1
id: my-startup
name: My Startup
description: One-person SaaS company with an AI team.
kind: root
version: 0.1.0
entry: index.md
```

## Every field

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>schemaVersion</code> | integer | yes | — | <mark data-color="amber">Always <code>1</code> right now.</mark> Lets Cabinet evolve the schema without breaking old cabinets. |
| <code>id</code> | string | yes | — | Slug used as the cabinet's stable identifier. <code>[a-z0-9-]+</code>. |
| <code>name</code> | string | yes | — | Display name. Shown in the sidebar header and in the registry. |
| <code>description</code> | string | no | "" | One-line summary. <mark data-color="green">≤80 chars</mark> — that's the registry card limit. |
| <code>kind</code> | <code>"root"</code> \| <code>"child"</code> | yes | — | Root cabinets stand alone; child cabinets nest under another cabinet's folder. |
| <code>version</code> | semver | no | <code>"0.1.0"</code> | Useful for templates published to cabinets.sh. |
| <code>entry</code> | path | no | <code>"index.md"</code> | The page Cabinet opens when you click into the cabinet. |
| <code>icon</code> | string | no | inherits | Path or URL to a square icon used in the sidebar and registry. |
| <code>tags</code> | string[] | no | <code>[]</code> | Free-form tags used for registry filtering. |
| <code>license</code> | SPDX id | no | inherits | <code>MIT</code>, <code>Apache-2.0</code>, etc. Shown on the registry page. |
| <code>author</code> | object | no | — | <code>{name, url, email}</code>. Shown on the registry page. |
| <code>providers</code> | object | no | — | Provider routing config. See [BYOAI](../../cabinet/agents/byoai/) for the shape. |
| <code>dispatch</code> | object | no | — | Cross-department dispatch policy. See [Org chart](../../cabinet/agents/org-chart-and-departments/). |
| <code>approvals</code> | object | no | — | Auto-approval rules for low-impact proposals. |

## Root vs. child

A <span class="tx-accent">root cabinet</span> is the top of a tree. It has its own <code>.cabinet</code>, lives directly in <code>$CABINET_DATA_DIR</code>, and shows up in <code>cabinetai list</code>.

A <span class="tx-accent">child cabinet</span> is a folder *inside* another cabinet that gets its own scope, agents, and settings. The child has its own <code>.cabinet</code>, and the parent treats it as a sub-cabinet (it shows up nested in the sidebar).

```text
~/cabinets/
├── my-startup/                ← root
│   ├── .cabinet               ← kind: root
│   └── clients/
│       └── acme/
│           ├── .cabinet       ← kind: child
│           └── index.md
└── job-hunt-hq/               ← root
    └── .cabinet               ← kind: root
```

## Provider routing example

```yaml
providers:
  defaults:
    lead: claude-opus-4-8
    specialist: claude-sonnet-4-6
  fallbacks:
    claude-opus-4-8:
      - claude-sonnet-4-6
      - gpt-4.1
  budgets:
    daily:
      maxCostUsd: 25
    perTask:
      maxCostUsd: 5
  localOnly: false
```

| Subkey | Purpose |
| --- | --- |
| <code>defaults.lead</code> / <code>defaults.specialist</code> | Default model per agent type. |
| <code>fallbacks</code> | Per-model fallback chain when the primary returns 429 or hits a budget cap. |
| <code>budgets.daily.maxCostUsd</code> | Hard cap per cabinet per day. |
| <code>budgets.perTask.maxCostUsd</code> | Hard cap per individual task. |
| <code>localOnly</code> | If true, refuse any non-local provider. |

## Dispatch policy example

```yaml
dispatch:
  allow:
    - from: marketing/gtm-lead
      to: research/*
      kinds: [LAUNCH_TASK]
    - from: operations/ops-coordinator
      to: marketing/copywriter
      kinds: [LAUNCH_TASK, SCHEDULE_JOB]
  acceptFromParent:
    - from: ops-coordinator
      kinds: [LAUNCH_TASK]
```

See [Org chart & departments](../../cabinet/agents/org-chart-and-departments/) for the full story.

## Approvals example

```yaml
approvals:
  auto:
    - kind: LAUNCH_TASK
      maxCostUsd: 0.10
      fromAgent: linkedin-operator
      toAgent: copywriter
    - kind: SCHEDULE_TASK
      maxCostUsd: 0.50
      fromAgent: ceo
```

Anything outside policy queues for manual approval. <mark data-color="green">There's no global "trust everything" toggle.</mark>

## Validation

Cabinet validates the manifest at boot. <code>cabinetai doctor</code> re-runs validation. A bad manifest exits with code <code>6</code> and a precise field-level error.

## Read on

- [Persona schema](../persona-schema/) — the agent file format.
- [Job schema](../job-schema/) — the routine YAML format.
- [Skill schema](../skill-schema/) — the SKILL.md format.
- [File structure](../file-structure/) — what else lives in a cabinet folder.
