---
title: "Google Workspace pages"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - google-workspace
  - sheets
  - docs
order: 10
---

# Google Workspace pages

A markdown page with a <code>google:</code> key in its frontmatter becomes a <mark data-color="yellow">live iframe of a Google Sheet, Slide deck, Doc, or Form</mark> right inside Cabinet.

```yaml
---
title: "Q3 OKR Tracker"
google:
  url: https://docs.google.com/spreadsheets/d/xxxxx/edit
  kind: sheet
---
```

Open the page — instead of the markdown body, Cabinet renders the embedded sheet. Click <span class="tx-accent">Open in Google</span> in the toolbar to jump to the source for editing.

## What it supports

| <code>kind</code> | Surface |
| --- | --- |
| <code>sheet</code> | Live Google Sheet — view, navigate, sometimes edit (depends on the sheet's sharing) |
| <code>doc</code> | Live Google Doc |
| <code>slide</code> | Live Slides deck — present mode supported |
| <code>form</code> | Live Form (collect responses) |

## Why it works

Cabinet doesn't host inference and Cabinet doesn't host collaborative editing. <span class="tx-accent">Google does both well.</span> The Google Workspace integration lets you keep <mark data-color="green">live, collaborative, formula-rich documents</mark> as nodes in your cabinet tree — searchable in the sidebar, linked from your markdown notes, attached to agent tasks — without trying to reimplement Sheets or Docs.

## Patterns

> <mark data-color="amber">**Tip.**</mark> Use a Google Sheet for anything where formulas, charts, or pivot tables matter. Use a [`.csv`](../csv/) for everything else — CSVs sit in your cabinet, syncs are simpler, agents can edit them directly.

| Use a Google Sheet for | Use a CSV for |
| --- | --- |
| Formulas, pivots, charts | Agent-edited row data (CRM, leads, content calendars) |
| Live collaboration with non-Cabinet users | Anything you want git-tracked |
| Sheets you already have | New data tables |

## What agents see

By default, agents see only the metadata (title, URL, kind). To let an agent read the contents:

1. Install the [Google Workspace MCP server](../../../../integrations/) — it gives agents a `gws.read_sheet` / `gws.read_doc` tool.
2. Authenticate the agent's persona with a service account or OAuth flow.
3. The agent can now `read_sheet({url: ...})` as part of a task.

> <mark data-color="amber">**Heads up.**</mark> Granting an agent Google Workspace access is a real permission expansion. Treat it like granting any external API access — start tight, expand as needed.

## Read on

- [CSV data](../csv/) — for editable tables that live in your cabinet.
- [Office documents](../office-documents/) — for `.xlsx` files (read-only, no live collab).
- [Integrations](../../../../integrations/) — the Google Workspace MCP server.
