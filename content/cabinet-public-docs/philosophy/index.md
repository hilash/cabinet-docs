---
title: "Philosophy"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - philosophy
  - overview
order: 2
---

# One place for all your work

Most of your day is spread across tools that don't know each other.
<mark data-color="blue">Notes in Notion.</mark> <mark data-color="blue">Files on Drive.</mark> <mark data-color="blue">Tasks in Linear.</mark> <mark data-color="blue">Threads in Slack.</mark> Research in chat windows. Drafts in Docs. Screenshots in Downloads.

<span class="tx-red">Nothing compounds.</span> Every Monday you reassemble the picture by hand.

Cabinet collapses that into <mark data-color="yellow">**one folder on your computer**</mark>. Inside it lives everything: your knowledge, your files, your AI agents, their schedules, their memory, their outputs. <span class="tx-green">You open one app and everything is there.</span> You close your laptop and an AI team keeps working.

<div data-demo="nested-cabinets" data-caption="A cabinet is a folder. Inside it: pages, agents, jobs, child cabinets."></div>

## Two pictures of the same idea

**<span class="tx-amber">If you don't write code.</span>** Cabinet is <mark data-color="yellow">a smarter folder</mark>. You write notes. You drop in PDFs, docs, spreadsheets, and screenshots. You describe a person you wish you'd hired — *"an analyst who reads my inbox every morning and tells me what's urgent"* — and that person exists, in the same folder, getting better at the job over time.

**<span class="tx-purple">If you do write code.</span>** Cabinet is a <mark data-color="green">local-first, git-tracked knowledge tree</mark>. Every page is a markdown file. Every agent is a `persona.md`. Every scheduled job is a YAML file in `.jobs/`. The whole thing is portable, scriptable, and yours. <span class="tx-green">No database. No cloud. No lock-in.</span> `ls` and you see your work. `git log` and you see its history.

## Why "one place" matters

A scattered tool stack means scattered context. An assistant in ChatGPT can't see your meeting notes. An agent in Linear can't see your research. A scheduled job in Zapier can't write back into your brain.

Cabinet's bet is that <mark data-color="yellow">**knowledge, work, and the workforce have to live in the same folder**</mark> for any of it to compound. The team that drafts your launch should be able to read last quarter's launch. The agent that summarizes your week should be able to write the summary into the same place you'll go looking for it.

<div data-demo="cabinet-vs" data-caption="What Cabinet trades for what."></div>

## Your AI team works 24/7 — without you babysitting

Real teams have rhythms: a Monday standup, a Friday update, an inbox check at 9am. Cabinet agents have the same.

- <mark data-color="amber">**Tasks**</mark> — one thing, runs once. *"Draft the launch post."*
- <mark data-color="blue">**Routines**</mark> — a task on a schedule. *"Draft the launch post every Friday."*
- <mark data-color="red">**Heartbeats**</mark> — a recurring check-in the agent uses to decide what to do next. *"Every weekday at 9am, look at the launch room and tell me what changed."*

<span class="tx-green">Heartbeats are the difference between an assistant you have to summon and a teammate who shows up.</span> You go to sleep; the team keeps doing the work that doesn't need you. You wake up to durable pages in your knowledge base — not a chat transcript you'll never reread.

<div data-demo="rhythm" data-caption="Tasks, routines, heartbeats — three rhythms, one team."></div>

## Bring the brains you already pay for

Cabinet doesn't host inference. <mark data-color="green">You connect Claude, GPT, Gemini, Grok, or a local model</mark>, and Cabinet routes your agents' calls to them. There's no Cabinet middleman, no inference markup, no quota.

<div data-demo="byoai" data-caption="Click providers on or off — see which models become available."></div>

## A team of teams

A real company isn't one big team. It's a tree: a CEO at the top, departments under that, projects under those, each with its own people and knowledge.

<mark data-color="yellow">Cabinets nest the same way.</mark> The root cabinet is your company, your life, your project. Child cabinets are departments — `marketing/`, `research/`, `clients/acme/`. Each child cabinet has its own agents, its own jobs, its own visibility scope. Agents up the tree can dispatch work to agents below them. <span class="tx-green">Every proposal is queued for one-click human approval before anything runs.</span>

<div data-demo="org-chart" data-caption="Departments are folders. Leads can dispatch. Specialists stay in their lane."></div>

You don't have to start from a blank folder. <mark data-color="amber">**[cabinets.sh](https://cabinets.sh)**</mark> is a public registry of plug-and-play cabinets — a complete AI team for a job hunt, a solo startup, a wedding, a podcast, a property portfolio. Clone one folder, run one command, and <span class="tx-accent">you have a team</span>:

```bash
npx cabinetai import <template-name>
```

Open it in Cabinet. Every agent, every job, every page is already there. Edit a persona, change a schedule, point a job at a different folder — make it yours.

## What to read next

- [Install Cabinet](../install/) — get the app running in five minutes.
- [Meet your AI team](../cabinet/agents/) — personas, heartbeats, routines, the whole crew.
- [Browse templates ↗](https://cabinets.sh) — start with a pre-built team.
- [Showcase](../showcase/) — see the agents workspace and task board live.
- [Stories](../stories/) — how real people use Cabinet.
- [Cabinet File Format](../concepts/cabinet-file-format/) — what's actually on disk.
