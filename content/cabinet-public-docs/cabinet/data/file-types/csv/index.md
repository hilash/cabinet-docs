---
title: "CSV data"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - csv
  - data
order: 2
---

# CSV data

Files: <code>*.csv</code>.

CSV files render as an <mark data-color="yellow">interactive table editor</mark> in Cabinet. Click a cell to edit, press <kbd>Tab</kbd> / <kbd>Enter</kbd> to navigate, sort by clicking a header. Toggle to source view to see and edit the raw CSV.

## Sample file in this docs cabinet

There's a real CSV in this folder:

[sample-pipeline.csv](./sample-pipeline.csv) — 6 rows of a sales pipeline.

In Cabinet, opening that file would show:

| name | company | stage | owner | next_action | score | last_touched |
| --- | --- | --- | --- | --- | --- | --- |
| Avery Chen | Northwind | demo-scheduled | GTM Lead | send agenda | 84 | 2026-05-02 |
| Jordan Park | Globex | intro-replied | LinkedIn Operator | follow up Tuesday | 67 | 2026-05-01 |
| Kai Müller | Initech | negotiation | GTM Lead | respond to redlines | 91 | 2026-05-03 |
| Priya Rao | Acme | proposal-sent | GTM Lead | nudge by Friday | 76 | 2026-04-29 |
| Sam Okafor | Hooli | closed-won | Revenue Analyst | kickoff scheduled | 99 | 2026-05-04 |
| Thalia Reyes | Soylent | evaluating | Research Lead | send case study | 72 | 2026-04-30 |

## What the table editor gives you

- <span class="tx-accent">Click-to-edit</span> any cell. Auto-saves to disk.
- <span class="tx-accent">Sort</span> by clicking a column header.
- <span class="tx-accent">Filter</span> with a quick search above the table.
- <span class="tx-accent">Add</span> rows or columns at the end.
- <span class="tx-accent">Source toggle</span> to switch between table and raw CSV.

## Why it matters

Most KB tools force CSVs to live somewhere else (Drive, Sheets, an attachment). Cabinet lets <mark data-color="green">your data sit next to your notes</mark>. That's a big deal for agents — a Pipeline Tracker agent can read this file directly, write a one-line note to <code>changelog.md</code> when a row's status changes, and the whole loop stays in the same folder.

> <mark data-color="amber">**Tip.**</mark> CSV agents work better when columns have stable names. Rename a column once, update memory, and the agent keeps up — but mid-flight column renames cause silent breaks.

## Limits

- Cabinet's CSV editor is <span class="tx-accent">not a spreadsheet</span>. No formulas, no charts, no pivot tables. For that, drop in an `.xlsx` (rendered read-only) or use a [Google Workspace page](../google-workspace/).
- Very large CSVs (>50,000 rows) lazy-load. The whole file isn't in memory at once.

## Read on

- [Office documents](../office-documents/) — `.xlsx` for formulas and charts.
- [Google Workspace pages](../google-workspace/) — live, collaborative sheets.
