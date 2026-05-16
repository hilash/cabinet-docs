---
title: "Markdown editor"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - editor
  - markdown
order: 22
---

# Markdown editor

Cabinet's editor is <mark data-color="yellow">Notion-grade WYSIWYG on top of plain markdown</mark>. Everything you type roundtrips to a file on disk. Open the source toggle in the top right of any page to see the raw markdown anytime.

This is the page surface where most of the work happens. Below is what it can do.

<div data-demo="slash-menu" data-caption="Type / on an empty line to open the slash menu."></div>

## What lives in this section

| Page | What it covers |
| --- | --- |
| <mark data-color="amber">**[Slash commands](./slash-commands/)**</mark> | Every command grouped into Basic, Media, Advanced. |
| <mark data-color="blue">**[Media & embeds](./media-and-embeds/)**</mark> | Images, video, embed providers (YouTube, Loom, X, Spotify, …). |
| <mark data-color="green">**[Callouts, math, & color](./callouts-math-and-color/)**</mark> | Tip / warning blocks, KaTeX math, the Cabinet highlight palette. |
| <mark data-color="purple">**[Links & mentions](./links-and-mentions/)**</mark> | Wiki-links, `@`-mentions, AGENTS.md context files. |

## Bubble menu — at a glance

Select any text, the bubble menu appears. From there:

- **Bold**, *italic*, <u>underline</u>, ~strike~, `inline code`.
- **Color** the selection or **highlight** it. <span class="tx-amber">All six Cabinet highlights</span> are available.
- Align left / center / right / justify.
- Wrap as a link.

Selections roundtrip through markdown as inline HTML so styling survives a file save and a `git diff`.

## Drag handle

Hover any block and a <code>⋮⋮</code> handle appears in the left margin. Drag it to reorder paragraphs, lists, embeds, or images. Cabinet writes the new ordering back to the markdown file.

## Source mode

Every editor view has a <span class="tx-accent">Source</span> toggle in the top right. Click it to see (and edit) the raw markdown that will be written to disk. The two modes share the same selection, so you can drop into source for a tricky section and pop back without losing your place.

## Auto-save

Cabinet auto-saves <mark data-color="yellow">500ms after the last keystroke</mark>. There's no Save button, no unsaved-changes indicator. If you want to force a save, <kbd>⌘S</kbd> works. Every save is one git commit, so you can <kbd>⌘Z</kbd> through *days* of work via the page-history pane.

## Keyboard shortcuts (greatest hits)

| Shortcut | Action |
| --- | --- |
| <kbd>/</kbd> on empty line | Open slash menu |
| <kbd>⌘B</kbd> / <kbd>⌘I</kbd> | Bold / Italic |
| <kbd>⌘K</kbd> | Search across pages |
| <kbd>⌘⇧A</kbd> | Toggle AI panel |
| <kbd>⌘`</kbd> | Toggle web terminal |
| <kbd>⌘S</kbd> | Force save |
| <kbd>⌘Z</kbd> / <kbd>⌘⇧Z</kbd> | Undo / Redo |
| <kbd>?</kbd> | Open the searchable cheat sheet |

The full list lives behind <kbd>?</kbd> in the app. <span class="tx-accent">It's searchable.</span>

## Read on

- [File types](../file-types/) — what else Cabinet renders inline beyond markdown.
- [Tips → CLI Power User](../../../guides/tips/) — the keyboard flow that compounds.
- [Reference → Supported file types](../../../reference/file-structure/) — the full first-class types table.
