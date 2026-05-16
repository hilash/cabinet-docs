---
title: "Cabinet vs the alternatives"
created: "2026-05-09T00:00:00.000Z"
modified: "2026-05-09T00:00:00.000Z"
status: draft
tags:
  - concepts
  - comparison
order: 15
---

# Cabinet vs the alternatives

Cabinet sits in a space that doesn't have an obvious incumbent. It's <mark data-color="yellow">not just a notes app</mark>, not just an AI assistant, not just a file manager. It's the combination — and the combination is what's new.

## At a glance

| Feature | <mark data-color="amber">**Cabinet**</mark> | Obsidian | Notion |
| --- | :---: | :---: | :---: |
| **AI agent orchestration** | <span class="tx-green">Yes</span> | <span class="tx-red">No</span> | <span class="tx-red">No</span> |
| **Scheduled cron jobs** | <span class="tx-green">Yes</span> | <span class="tx-red">No</span> | <span class="tx-red">No</span> |
| **Embedded HTML apps** | <span class="tx-green">Yes</span> | <span class="tx-red">No</span> | <span class="tx-red">No</span> |
| **Web terminal** | <span class="tx-green">Yes</span> | <span class="tx-red">No</span> | <span class="tx-red">No</span> |
| **Self-hosted, files on disk** | <span class="tx-green">Yes</span> | <span class="tx-green">Yes</span> | <span class="tx-red">No</span> |
| **No database / no lock-in** | <span class="tx-green">Yes</span> | <span class="tx-green">Yes</span> | <span class="tx-red">No</span> |
| **Git-backed version history** | <span class="tx-green">Yes</span> | <span class="tx-amber">Via plugin</span> | <span class="tx-red">No</span> |
| **WYSIWYG + Markdown** | <span class="tx-green">Yes</span> | <span class="tx-green">Yes</span> | <span class="tx-green">Yes</span> |

## What this table is really saying

**<mark data-color="amber">vs. Obsidian.</mark>** Obsidian is great for personal knowledge. Cabinet keeps that — files on disk, plain markdown, plugins-style extensibility — and adds <span class="tx-accent">an AI team that lives in the same folder</span>. The agents read your notes, write back into them, and run jobs on a schedule. Obsidian doesn't try to be a workflow tool; Cabinet does.

**<mark data-color="purple">vs. Notion.</mark>** Notion is great for collaborative docs and databases. But your data lives in their cloud, in their format. Cabinet inverts that: <span class="tx-accent">your folder, your files, your AI</span>. The trade-off is real — you give up Notion's polished collab and embedded views, you get full ownership and a teammate that runs on your machine.

**<mark data-color="green">vs. ChatGPT / Claude.app.</mark>** Chat apps are great for ad-hoc questions. They're terrible at long-running work — every session forgets, nothing persists, outputs get lost in transcripts. Cabinet's bet is that <span class="tx-accent">durable pages beat chat history</span>. A research task doesn't end in a chat thread; it ends as `research/competitor-brief-2026-05.md` in your folder.

## When Cabinet is the wrong choice

Cabinet won't replace:

- <span class="tx-red">**Real-time collaboration tools**</span> like Figma or Google Docs. Cabinet is single-user-first. Multi-user comes later.
- <span class="tx-red">**Tools with strong UI primitives**</span> — Notion databases with views, Linear's issue tracker, Airtable's relational tables. Cabinet is markdown + folders.
- <span class="tx-red">**Mobile-first workflows**</span>. Cabinet is desktop-first today (macOS native + browser). Mobile is on the [roadmap](../../roadmap/).

## What you can do that no one else lets you

- Write a `persona.md` and have an agent show up — same model, same prompt structure, every time.
- Drop an `index.html` in any folder and Cabinet renders it as an embedded app. AI-generated dashboards, version-controlled.
- Schedule a cron job that runs Friday 5pm: read this week's notes, write a summary, commit it.
- `git log` your entire knowledge base and see exactly when each idea showed up.

## Read on

- [What is Cabinet App](../what-is-cabinet-app/) — the in-app feature surface.
- [Cabinet File Format](../cabinet-file-format/) — what's actually on disk.
- [Principles](../principles/) — the values driving the design.
