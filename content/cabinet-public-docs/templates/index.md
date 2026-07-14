---
title: "Templates"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - templates
  - cabinets-sh
  - registry
order: 28
---

# Template cabinets

You don't have to build your AI team from scratch. <mark data-color="yellow">cabinets.sh</mark> is a public registry of plug-and-play cabinets — each one is a complete folder with agents, jobs, knowledge, and connectors ready to run.

Browse them at [<span class="tx-accent">cabinets.sh</span>](https://cabinets.sh).

## What's inside a template

Every template is a real, working cabinet folder:

```text
job-hunt-hq/
├── .cabinet                         ← identity, version, parent
├── .agents/
│   ├── resume-tailor/persona.md
│   ├── interview-coach/persona.md
│   └── offer-analyst/persona.md
├── .jobs/
│   ├── daily-job-scan.yaml
│   └── weekly-pipeline-review.yaml
├── pipeline/
│   ├── target-companies.csv
│   └── applications.csv
├── interviews/
└── index.md
```

You install it. Cabinet picks up <mark data-color="amber">the agents, the jobs, and the knowledge skeleton</mark> all at once. You're running in 30 seconds.

## Install in one command

```bash
npx cabinetai import job-hunt-hq
```

That copies the template into a new directory. Enter it and run <code>npx cabinetai run</code> to open the imported agents, jobs, and sample content.

If you only want one template from a monorepo:

```bash
git clone --filter=blob:none --sparse \
  https://github.com/cabinet-app/cabinets.git \
  && cd cabinets && git sparse-checkout set job-hunt-hq
```

## Featured templates

| Template | What it does | Team | Get it |
| --- | --- | --- | --- |
| <mark data-color="amber">**ship-it-solo**</mark> | Full startup ops for a one-person team — strategy, product, growth, support | CEO, CTO, Growth Lead, Support Rep | <code>npx cabinetai import ship-it-solo</code> |
| <mark data-color="blue">**job-hunt-hq**</mark> | Run your job search like a sales pipeline | Resume Tailor, Interview Coach, Networking Strategist, Offer Analyst | <code>npx cabinetai import job-hunt-hq</code> |
| <mark data-color="green">**reply-to-everyone**</mark> | Email triage, drafting, follow-up automation | Inbox-Zero Strategist, Reply Drafter, Follow-up Nagger | <code>npx cabinetai import reply-to-everyone</code> |
| <mark data-color="purple">**saas-startup**</mark> | Marketing, product, ops cabinets for a small SaaS | PM, Marketer, Customer Success, QA | <code>npx cabinetai import saas-startup</code> |
| <mark data-color="red">**wedding-ops**</mark> | Wedding planning as a project, with a team | Planner, Budget Hawk, Day-of Coordinator | <code>npx cabinetai import wedding-ops</code> |
| **podcast-machine** | Podcast pipeline — research, scripts, show notes, social | Producer, Researcher, Show-Notes Writer, Clip Strategist | <code>npx cabinetai import podcast-machine</code> |
| **open-source-maintainer** | Issue triage, PR review prep, releases, community | Triage Lead, Docs Writer, Release Manager | <code>npx cabinetai import open-source-maintainer</code> |
| **agency** | Multi-client agency ops with a child cabinet per client | Account Lead, Producer, Project Manager | <code>npx cabinetai import agency</code> |

[Browse all 20+ templates on cabinets.sh ↗](https://cabinets.sh)

## Make it yours

A template is a starting point, not a contract. Once installed, <span class="tx-accent">edit anything</span>:

1. Open <code>.agents/&lt;agent&gt;/persona.md</code>. Change the model, the role, the heartbeats.
2. Open <code>.jobs/&lt;job&gt;.yaml</code>. Retime, retarget, disable, delete.
3. Move folders. Rename pages. Add child cabinets.

Cabinet doesn't track "diff from upstream." Once it's in your data folder, <mark data-color="green">it's yours</mark>. The import is a copy without the registry repository's Git history; compare or re-import a newer template separately if you want upstream changes.

## Publishing your own template

Made something useful? Share it.

The v0.5.1 `cabinetai` CLI does not expose a publish command. Prepare the cabinet in a clean repository and submit it to the Cabinet registry for review. Before opening a registry PR:

1. Remove private data, API keys, and chat logs; do not assume <code>.gitignore</code> cleans the submission automatically.
2. Include a clear <code>README.md</code> at the cabinet root.
3. Validate the <code>persona.md</code> and job YAML files.
4. Open a PR to the <code>cabinetai/cabinets</code> registry with the template folder.

Tips for a template people will actually install:

> **Tip — Name it like a noun, not a verb.** `wedding-ops` beats `plan-your-wedding`. People scan for what it *is*, not what it does.

> **Tip — Ship example data, not real data.** Replace your real CSV rows with synthetic ones. Make it obvious. Real users will fill in their own.

> **Tip — Write a one-line `description` in the .cabinet manifest.** That's what shows in the registry list. Keep it ≤80 chars.

## What templates can't do

- They can't bring your <mark data-color="red">API keys</mark>. You add those in Settings after installing.
- They can't bring your <mark data-color="red">private connectors</mark> (Gmail, Calendar, etc). The template defines the *shape*; you authorize per-install.
- They can't <mark data-color="red">auto-fire heartbeats</mark> on first install. Cabinet asks you to confirm each one.

## Read on

- [Philosophy: a team of teams](../philosophy/) — why templates compose well.
- [Org chart & departments](../cabinet/agents/org-chart-and-departments/) — the structure templates ship with.
- [cabinets.sh ↗](https://cabinets.sh) — the registry itself.
