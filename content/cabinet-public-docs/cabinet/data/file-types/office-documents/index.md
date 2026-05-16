---
title: "Office documents"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - office
  - docx
  - xlsx
  - pptx
order: 8
---

# Office documents

Files: <code>.docx</code>, <code>.xlsx</code>, <code>.xlsm</code>, <code>.pptx</code>.

Office files render <mark data-color="yellow">inline, read-only</mark> in Cabinet. Drop a `.docx`, `.xlsx`, or `.pptx` anywhere in your cabinet folder and it appears in the sidebar — click it to view in place. <span class="tx-accent">Download</span> and <span class="tx-accent">Reveal in Finder</span> buttons let you open in the source app for editing.

## Word documents (`.docx`)

Renders via <code>docx-preview</code>. You see formatted text, headings, lists, tables, inline images.

| Surface | Behavior |
| --- | --- |
| Sidebar icon | Blue document |
| Inline viewer | Full text + basic formatting |
| Editing | <mark data-color="amber">Read-only</mark> — edit in Word / Pages, save, Cabinet picks up the new version |
| Agent context | `@file:meeting-notes.docx` extracts text and feeds the agent |

## Spreadsheets (`.xlsx`, `.xlsm`)

Renders via <code>SheetJS</code>. You get a multi-sheet grid with tabs to switch sheets, plus the values of formulas (not the formulas themselves).

| Surface | Behavior |
| --- | --- |
| Sidebar icon | Green spreadsheet |
| Inline viewer | Tabbed sheets, scrollable grid |
| Editing | Read-only. Use [`.csv`](../csv/) for editable tables, or [Google Workspace pages](../google-workspace/) for live sheets. |
| Formulas | Computed values shown; formulas not preserved on save |

## Presentations (`.pptx`)

Renders via <code>pptx-preview</code>. You get a slide-by-slide view with speaker notes, navigable by arrows or thumbnail strip.

| Surface | Behavior |
| --- | --- |
| Sidebar icon | Orange presentation |
| Inline viewer | Slide-by-slide with thumbnails |
| Editing | Read-only — edit in Keynote / PowerPoint |
| Agent context | Extracts slide text + speaker notes |

## When to use what

> <mark data-color="amber">**Tip.**</mark> If you're authoring something new in Cabinet, use markdown. If you're inheriting docs from elsewhere (a contract, a board deck, a partner's workbook), drop the office file in as-is — Cabinet renders it without conversion.

| If you want to… | Use |
| --- | --- |
| Edit text alongside notes | A markdown page |
| Run formulas, build charts | An `.xlsx` (read in Cabinet, edit in Excel/Numbers) or a [Google Workspace Sheet](../google-workspace/) |
| Show a board deck inline | A `.pptx` |
| Share legal docs | A `.docx` or [`.pdf`](../pdf/) |

## Why read-only is the right default

Cabinet's editor is for markdown. Word docs have <mark data-color="green">tracked changes</mark>, sheets have <mark data-color="green">complex formulas</mark>, decks have <mark data-color="green">precise layouts</mark> — those workflows belong in the source app. Cabinet's role is to make them visible in the same sidebar where everything else lives, so you don't have to bounce between apps to know what's in your folder.

## Read on

- [CSV data](../csv/) — for editable tables.
- [Google Workspace pages](../google-workspace/) — for live, collaborative office docs.
- [PDF document](../pdf/) — for any final-form document.
