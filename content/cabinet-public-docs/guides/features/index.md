---
title: "Features"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - features
  - overview
order: 30
---

# Features

Everything Cabinet does, on one page. Each feature links to the deep dive.

## Knowledge & editor

The surface where you read, write, and search.

| Feature | What it is | Read more |
| --- | --- | --- |
| <mark data-color="yellow">**WYSIWYG editor**</mark> | Rich text with bubble menu, slash commands, callouts, math, embeds. Roundtrips to plain markdown. | [Guides → Write & edit](../write-and-edit/) |
| <mark data-color="yellow">**File tree with first-class types**</mark> | Markdown, CSV, PDF, code, mermaid, images, audio, office docs, embedded apps — all render inline. | [Reference → Supported file types](../../reference/file-structure/) |
| <mark data-color="yellow">**⌘K full-text search**</mark> | Searches every page in the cabinet. Surfaces matches in milliseconds. | — |
| <mark data-color="yellow">**Wiki-links and `@` mentions**</mark> | Type `[[Page Name]]` or `@Page` to link or attach as agent context. | — |
| <mark data-color="yellow">**Git-backed page history**</mark> | Click the clock icon on any page to see every change, diff them, restore. | — |
| <mark data-color="yellow">**Highlights, colors, callouts**</mark> | Yellow key terms, red urgency, green confirmations. Inline marks roundtrip through markdown. | — |

## AI team

Where the work gets done.

| Feature | What it is | Read more |
| --- | --- | --- |
| <mark data-color="amber">**Personas**</mark> | One markdown file per agent. Edit the file, the agent updates. | [Agents → Persona](../../cabinet/agents/persona/) |
| <mark data-color="amber">**Heartbeats**</mark> | Recurring check-ins on a cron schedule. Decides what to do at a moment. | [Agents → Heartbeats](../../cabinet/agents/heartbeats/) |
| <mark data-color="amber">**Routines**</mark> | Tasks that recur. Same prompt, same output shape, every Friday. | [Agents → Routines](../../cabinet/agents/routines/) |
| <mark data-color="amber">**Tasks board**</mark> | Kanban / list / schedule views. Filter by agent, trigger, or status. | [Agents → Tasks](../../cabinet/agents/tasks/) |
| <mark data-color="amber">**Approvals queue**</mark> | Every cross-agent action queues for one-click human approval. | [Agents → Conversations & approvals](../../cabinet/agents/conversations-and-approvals/) |
| <mark data-color="amber">**Org chart & departments**</mark> | Departments are folders. Leads can dispatch. Specialists stay in lane. | [Agents → Org chart](../../cabinet/agents/org-chart-and-departments/) |
| <mark data-color="amber">**Skills**</mark> | Installable instruction packs from skills.sh. Allow-list security. | [Agents → Skills](../../cabinet/agents/skills/) |
| <mark data-color="amber">**BYOAI**</mark> | Connect Claude, GPT, Gemini, Grok, or local. Pick per agent or per task. | [Agents → BYOAI](../../cabinet/agents/byoai/) |

## Cabinets

The file format and what it makes possible.

| Feature | What it is | Read more |
| --- | --- | --- |
| <mark data-color="green">**`.cabinet` manifest**</mark> | One YAML file names the cabinet, sets the entry page, and parents it. | [Reference → Manifest schema](../../reference/manifest-schema/) |
| <mark data-color="green">**Child cabinets**</mark> | Nest cabinets inside cabinets. Each one has its own agents and visibility. | [Philosophy](../../philosophy/) |
| <mark data-color="green">**Load knowledge / symlinks**</mark> | Point at any folder on disk — Cabinet creates a symlink, no copy. | [Guides → Load knowledge](../load-knowledge/) |
| <mark data-color="green">**Linked git repos**</mark> | A folder with `.repo.yaml` becomes a repo Cabinet's agents can reason about. | [Guides → Apps & repos](../apps-and-repos/) |
| <mark data-color="green">**Embedded apps**</mark> | A folder with `index.html` renders as an iframe in the main panel. | [Guides → Apps & repos](../apps-and-repos/) |
| <mark data-color="green">**Google Workspace pages**</mark> | A markdown page with `google:` frontmatter becomes a live Sheet/Doc/Slide. | — |
| <mark data-color="green">**Office docs**</mark> | Drop `.docx`, `.xlsx`, `.pptx` and they render inline read-only. | — |

## Integrations

What Cabinet connects to.

| Feature | What it is | Status |
| --- | --- | --- |
| <mark data-color="blue">**MCP servers**</mark> | Connect any [Model Context Protocol](https://modelcontextprotocol.io) server as a tool surface. | live |
| <mark data-color="blue">**Slack**</mark> | Trigger tasks, get approvals, receive briefings. | <span class="tx-amber">soon</span> |
| <mark data-color="blue">**Telegram**</mark> | DM your agents. Approve from the lock screen. | <span class="tx-amber">soon</span> |
| <mark data-color="blue">**Gmail / Calendar**</mark> | OAuth-connected inbox triage and meeting prep. | <span class="tx-amber">soon</span> |
| <mark data-color="blue">**GitHub**</mark> | PR triage, issue grooming, release prep. | <span class="tx-amber">soon</span> |
| <mark data-color="blue">**skills.sh**</mark> | Public registry of agent skills. | live |
| <mark data-color="blue">**cabinets.sh**</mark> | Public registry of template cabinets. | live |

## Ergonomics

The small stuff that adds up.

| Feature | What it is |
| --- | --- |
| **Themes** | Pick from a curated set of light and dark themes — Paper, Slate, Claude, Ink. |
| **Keyboard shortcuts** | Press <kbd>?</kbd> anywhere for the searchable cheat sheet. |
| **Web terminal** | <kbd>⌘`</kbd> opens an interactive terminal in the workspace. |
| **Drag & drop** | Reorder pages in the sidebar. Drop files onto the editor to upload. |
| **Source mode toggle** | Every page has a Source toggle for the raw markdown. |

## Read on

- [Philosophy](../../philosophy/) — why all of this is one folder, not five tools.
- [Showcase](../../showcase/) — the live agents workspace and task board.
- [Reference](../../reference/) — every YAML schema, every CLI command.
