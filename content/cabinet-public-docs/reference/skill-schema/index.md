---
title: "Skill schema"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - reference
  - schema
  - skills
order: 46
---

# `SKILL.md` schema

A skill is a folder. <code>SKILL.md</code> is the manifest the agent reads.

For the conceptual story (and the security model) see [Skills](../../cabinet/agents/skills/). This page is the field-by-field reference.

## Folder shape

```text
.agents/skills/competitor-brief/
├── SKILL.md             # required — frontmatter + body
├── scripts/             # optional — helper scripts (require allowed-tools: run_script)
│   └── pull-funding.py
├── templates/           # optional — reference files
│   └── brief.md
└── assets/              # optional — logos, schemas, etc.
    └── competitor-schema.json
```

Cabinet mounts the folder into the agent's run sandbox. <mark data-color="amber">Files outside the folder are inaccessible</mark> via the skill.

## Frontmatter fields

### Identity

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>name</code> | string | yes | — | Slug used for `@` mentions and the picker. <code>[a-z0-9-]+</code>. |
| <code>displayName</code> | string | no | derived from <code>name</code> | Pretty name for the picker. |
| <code>description</code> | string | yes | — | <mark data-color="green">Hover-card explanation.</mark> ≤140 chars is the convention. |
| <code>version</code> | semver | no | <code>"0.1.0"</code> | For registry publishing. |
| <code>author</code> | object | no | — | <code>{name, url}</code>. |
| <code>license</code> | SPDX id | no | <code>"MIT"</code> | Shown on skills.sh. |

### Permissions

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>allowed-tools</code> | string[] | yes | <code>[]</code> | <mark data-color="red">**Allow-list**</mark>. Only these tools fire while the skill is active. |
| <code>network</code> | object | no | — | Network egress allow-list. |
| <code>network.allow</code> | string[] | no | <code>[]</code> | Hostname patterns the skill may fetch from, e.g. <code>"*.crunchbase.com"</code>. |
| <code>filesystem</code> | object | no | — | Filesystem read/write scope. |
| <code>filesystem.read</code> | string[] | no | inherits agent | Glob patterns this skill may read. |
| <code>filesystem.write</code> | string[] | no | inherits agent | Glob patterns this skill may write. |

### IO contract

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>input-schema</code> | JSON schema fragment | no | — | Lets users invoke the skill with structured args (e.g. <code>/competitor-brief company=acme</code>). |
| <code>output-schema</code> | JSON schema fragment | no | — | Hints which paths the skill writes. Used for link-checking and approvals. |
| <code>estimated-cost-usd</code> | number | no | — | Average cost. Surfaced in the approval queue. |
| <code>estimated-runtime-s</code> | integer | no | — | Average runtime in seconds. Surfaced in the run UI. |

### Discovery

| Field | Type | Required | Default | What it does |
| --- | --- | --- | --- | --- |
| <code>tags</code> | string[] | no | <code>[]</code> | Free-form tags for skills.sh filters. |
| <code>category</code> | string | no | — | <code>"research"</code>, <code>"writing"</code>, <code>"data"</code>, etc. |
| <code>requiresProvider</code> | string[] | no | — | If set, the skill won't load unless one of these providers is configured. |

## Common tool names

The exact list ships with the app and grows. Common ones:

| Tool name | What it can do |
| --- | --- |
| <code>read_file</code> | Read a single file (subject to <code>filesystem.read</code>). |
| <code>write_file</code> | Write or create a file (subject to <code>filesystem.write</code>). |
| <code>list_dir</code> | List a directory's contents. |
| <code>web_fetch</code> | HTTP GET (subject to <code>network.allow</code>). |
| <code>web_search</code> | Search the web through the configured backend. |
| <code>run_script</code> | Execute a script under <code>scripts/</code> (per-run user confirm). |
| <code>shell</code> | Arbitrary shell command. <mark data-color="red">Almost never grant this.</mark> |
| <code>llm_call</code> | Inner LLM call. Only needed for skills that call models themselves. |

## Body — what the agent reads

Everything after the closing <code>---</code> is what the agent sees when it picks up the skill. Treat it like a runbook:

- **What this skill does** in one sentence.
- **How to run it** — step-by-step, including which scripts to call.
- **What inputs it expects.**
- **What outputs it produces and where.**
- **What to watch for** — failure modes, edge cases, when *not* to use it.

Keep it concise. Long preambles get diluted.

## Complete example

```yaml
---
name: competitor-brief
displayName: Competitor Brief
description: One-page competitive brief for any company. Pulls funding, reads launches, summarizes positioning.
version: 1.2.0
license: MIT
author:
  name: cabinet-app
  url: https://github.com/cabinet-app/skills

allowed-tools:
  - read_file
  - write_file
  - run_script
  - web_fetch
network:
  allow:
    - "*.crunchbase.com"
    - "*.producthunt.com"
filesystem:
  read:
    - "research/**"
    - "templates/**"
  write:
    - "research/competitors/**"

input-schema:
  company:
    type: string
  depth:
    type: string
    enum: [quick, deep]
    default: quick
output-schema:
  path:
    type: string
estimated-cost-usd: 0.20
estimated-runtime-s: 90

tags: [research, competitive, gtm]
category: research
requiresProvider: [openai, anthropic, google]
---

You produce one-page competitor briefs.

## How to run

1. Read templates/brief.md for the output shape.
2. Run scripts/pull-funding.py {company} for fresh funding data.
3. Use web_fetch on the company's homepage and pricing page.
4. Compose the brief at /research/competitors/{company-slug}.md using the template.
5. Always include a "Last updated: {date}" line at the top.

## When NOT to use

- For private companies with no public footprint — output will be sparse. Recommend the manual research routine instead.
- For internal projects — this skill is built for external competitive intel.
```

## Validation

Skills are validated:

- At install time (security scan + schema check).
- At every run (allow-list enforcement, network/filesystem scopes).
- At update time (re-scan, re-confirm any new <code>allowed-tools</code>).

A skill that violates its own allow-list at runtime is killed mid-run with a clear error. <mark data-color="green">Cabinet never escalates a skill's permissions silently.</mark>

## Read on

- [Skills (concept)](../../cabinet/agents/skills/) — the security model in plain English.
- [Persona schema](../persona-schema/) — how to attach skills to an agent.
- [skills.sh ↗](https://skills.sh) — the public registry.
