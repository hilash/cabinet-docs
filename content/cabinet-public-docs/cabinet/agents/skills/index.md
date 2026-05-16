---
title: "Skills"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - skills
  - security
order: 6
---

# Skills

A skill is a <mark data-color="yellow">reusable bundle of instructions and helper scripts</mark> an agent can pull in for a task. Each skill is a folder with a <code>SKILL.md</code> on top and any assets, scripts, or schemas the agent needs to do the job. Cabinet hosts skills locally, attaches them to personas, and mounts them into the agent's working directory at run time.

This page covers what skills can do, where they live, and — most importantly — the <span class="tx-accent">security model you're opting into when you install one</span>.

## What a skill is

A folder, e.g.:

```text
.agents/skills/competitor-brief/
├── SKILL.md          # frontmatter + body the agent reads
├── scripts/          # optional helper scripts the agent may run
│   └── pull-funding.py
├── templates/        # optional reference files
│   └── brief.md
└── assets/           # optional logos, schemas, etc.
    └── competitor-schema.json
```

Cabinet mounts that folder into the agent's run sandbox. The agent reads <code>SKILL.md</code>, decides whether to use the skill, and (if allowed) can run the scripts inside.

## SKILL.md anatomy

```yaml
---
name: competitor-brief
description: |
  Produce a one-page competitive brief for any company.
  Pulls funding data, reads recent product launches, summarizes positioning.
allowed-tools:
  - read_file
  - write_file
  - run_script        # required for scripts/pull-funding.py
  - web_fetch
input-schema:
  company: string
  depth: "quick" | "deep"
output-schema:
  path: string
estimated-cost-usd: 0.20
---

You produce competitor briefs.

# How to run

1. Read templates/brief.md for the shape.
2. Run scripts/pull-funding.py {company} for fresh funding data.
3. Use web_fetch to pull the company's homepage and pricing page.
4. Compose the brief at /research/competitors/{company-slug}.md.
5. Always include "Last updated: {date}" at the top.
```

| Field | Purpose |
| --- | --- |
| <code>name</code> | Slug used in <code>@</code> mentions and the skills picker. |
| <code>description</code> | Shown in the picker. Write it like a hover-card. |
| <code>allowed-tools</code> | <mark data-color="amber">**Allow-list**</mark> — only these tools can fire while this skill is active. |
| <code>input-schema</code> | Optional. Lets you `/competitor-brief company=acme` without freeform parsing. |
| <code>output-schema</code> | Optional. Hints Cabinet which files this skill writes. |
| <code>estimated-cost-usd</code> | Shown in approvals. Helps your auto-approval policy. |

## Three ways an agent uses a skill

1. **Attached to the persona.** Listed in the agent's <code>persona.md</code> under <code>skills:</code>. Available on every run.
2. **Mentioned in a task.** A user types <code>@competitor-brief</code> in a task prompt. The skill loads for that one run.
3. **Auto-discovered.** Cabinet looks at the prompt, sees a relevant skill in <code>.agents/skills/</code>, and offers it. The agent decides whether to use it.

## Where skills come from

Cabinet reads skills from <span class="tx-accent">three locations</span>, in order:

1. **Cabinet-local** — <code>.agents/skills/</code> inside the cabinet you're in.
2. **User-global** — <code>~/.cabinet/skills/</code> across every cabinet on this machine.
3. **Bundled** — ships with the app for common tasks (research synthesis, code review, doc edits).

Local wins on slug collisions. <mark data-color="green">If you don't like a bundled skill, redefine it locally with the same slug.</mark>

## Installing a skill

```bash
# Install from skills.sh into the current cabinet
npx cabinetai skills add cabinet-app/competitor-brief

# Install user-globally
npx cabinetai skills add cabinet-app/competitor-brief --global

# Install from a GitHub URL
npx cabinetai skills add https://github.com/you/my-skill
```

Cabinet downloads the skill, runs a <span class="tx-accent">security scan</span> (see below), and asks you to confirm the allowed-tools list before activating it.

## Security model

Skills can include scripts. <mark data-color="red">Scripts can do anything a script on your machine can do.</mark> Cabinet's defense is in three layers.

### Layer 1: allow-list

The <code>allowed-tools</code> field in <code>SKILL.md</code> is an **allow-list**, not a deny-list. If a tool isn't in the list, the agent can't call it while the skill is active. <mark data-color="amber">Empty list = read-only skill</mark> (no file writes, no scripts, no network).

### Layer 2: install-time scan

When you install a skill, Cabinet scans for known dangerous patterns:

- Shell injection vectors in <code>scripts/</code>.
- Network calls to non-allow-listed domains.
- Filesystem access outside the cabinet.
- Symlink shenanigans in the skill folder.

The scan output is shown before you confirm the install. <code>--force</code> overrides the scan, but you'll see exactly what you're overriding.

### Layer 3: run-time confirmation

The first time a skill tries to run a script, Cabinet asks you to confirm — <mark data-color="green">per-script, per-skill</mark>. You can grant "always allow," but it's per-script and reversible.

> **Heads up.** Skills you write yourself in <code>.agents/skills/</code> skip the install-time scan because there's no install. Treat your own skills with the same care you'd treat your own scripts — they run as you.

## skills.sh — the registry

[skills.sh](https://skills.sh) is the public registry of agent skills. Each skill page on the registry shows:

- The full <code>SKILL.md</code>.
- The scripts.
- The security scan result.
- Usage stats and reviews.
- A one-line install command.

You can also publish your own:

```bash
# In a skill folder
npx cabinetai skills publish
```

It opens a PR to the registry repo with your skill folder. Keep <code>SKILL.md</code> tight and the description honest — those are what people see in the picker.

## Updating skills

```bash
npx cabinetai skills update                # update all installed skills
npx cabinetai skills update competitor-brief
```

Updates <span class="tx-accent">re-run the security scan</span> and re-prompt you for any new <code>allowed-tools</code> entries. <mark data-color="green">A skill can never silently gain a new permission.</mark>

## Read on

- [Persona](../persona/) — how to attach skills to an agent by default.
- [Skill schema reference](../../../reference/skill-schema/) — every <code>SKILL.md</code> field.
- [Browse skills.sh ↗](https://skills.sh) — the public registry.
