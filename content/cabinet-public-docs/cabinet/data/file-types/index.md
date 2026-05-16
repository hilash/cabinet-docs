---
title: "File types"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - files
  - viewers
  - reference
order: 24
---

# File types

Cabinet treats <mark data-color="yellow">specific file formats as first-class views</mark>. Drop them in your cabinet folder and they render inline — markdown, CSV, PDF, mermaid, images, video, audio, code, office docs, embedded apps, and Google Workspace pages all just work.

Click any row in the table for a live or annotated example. Anything not on this list still lives in your cabinet as an asset linked from a markdown page.

<div data-demo="file-types-table" data-caption="18 first-class file types. Click a row for the example."></div>

## Why this matters

A scattered tool stack means you open a different app to view each file. Cabinet collapses that — <span class="tx-accent">your screenshot, your spreadsheet, your podcast clip, your codebase, and your meeting notes all sit in the same sidebar</span>, all browsable, all searchable, all editable in place. The agent that reads your launch plan can also see the screenshot you pasted into it.

## Patterns

A few rules that show up across all the file-type viewers:

> **Files render where they live.** A pasted screenshot saves into the same folder as the page that holds it. Move the page folder, the assets move with it.

> <mark data-color="amber">**The sidebar shows actual file extensions.**</mark> No hidden conversion. What you see in `ls` is what you see in Cabinet.

> **Read-only is fine — and intentional.** Office docs, PDFs, and Google Workspace pages render but don't allow inline edits. Cabinet's editor is for markdown; everything else has a source app.

## Sub-pages

- [Markdown page](./markdown/) — the editor surface itself.
- [CSV data](./csv/) — interactive table editor with source view.
- [PDF document](./pdf/) — inline browser-native viewer.
- [Mermaid diagram](./mermaid/) — rendered live.
- [Images](./images/) — paste, drop, URL, resize handles.
- [Video & audio](./video-and-audio/) — inline players.
- [Source code](./source-code/) — syntax-highlighted viewer.
- [Office documents](./office-documents/) — `.docx` / `.xlsx` / `.pptx`, inline.
- [Embedded apps](./embedded-apps/) — folders with `index.html`.
- [Google Workspace pages](./google-workspace/) — live Sheets / Docs / Slides / Forms.
- [Linked content](./linked-content/) — symlinks and `.repo.yaml` git repos.

## Read on

- [Markdown editor](../editor/) — the editing surface itself.
- [Reference → File structure](../../../reference/file-structure/) — what else lives in a cabinet folder.
