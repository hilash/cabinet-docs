---
title: "Write & edit"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - guides
  - editor
order: 31
---

# Write & edit

Cabinet's editor is <mark data-color="yellow">Notion-grade WYSIWYG</mark> on top of plain markdown. Everything you type roundtrips to a file on disk. Toggle **Source** in the top right to see the raw markdown anytime.

## Bubble menu

Select any text and the bubble menu appears. Use it for **bold**, *italic*, <mark data-color="amber">highlight</mark>, color, alignment, and links. Selections roundtrip through markdown as inline HTML so styling survives a file save.

## Slash commands

Press <kbd>/</kbd> on an empty line to open the command menu, grouped into <span class="tx-accent">Basic</span>, <span class="tx-accent">Media</span>, and <span class="tx-accent">Advanced</span>.

| Group | Commands |
| --- | --- |
| Basic | Text, H1/H2/H3, Bullet, Numbered, Checklist, Code block, Quote, Divider, Table |
| Media | Image, Video, Embed, File |
| Advanced | Callout, Warning, Math, Emoji |

## Images, videos, embeds

Three ways to add an image, all save the file next to the page on disk:

1. <mark data-color="green">**Paste**</mark> a copy-pasted screenshot — uploads and inserts automatically.
2. **Drag & drop** from Finder onto the editor.
3. Click the image icon or type <kbd>/Image</kbd> for the **Upload** or **From URL** tab.

Hover any image and drag side handles to resize — width persists across reloads.

For videos and embeds, type <kbd>/Video</kbd> or <kbd>/Embed</kbd>. Cabinet auto-detects YouTube, Vimeo, Loom, X, TikTok, Spotify, Facebook, Instagram, and more — paste a recognized URL on an empty line to auto-embed without the popover.

## Highlights & colors

Pick text color or background highlight from the toolbar or bubble menu. Use them with intent:

- <mark data-color="yellow">Yellow highlights</mark> for key terms.
- <mark data-color="blue">Blue backgrounds</mark> for cross-references.
- <span class="tx-red">Red text</span> for urgency / blockers.
- <span class="tx-green">Green text</span> for confirmations / shipped items.
- <mark data-color="amber">Amber highlights</mark> for tips / notes.

They roundtrip through markdown as `<mark>` and `<span>` tags so other tools (and git) can read them.

## Callouts, math, emoji, checklists

| Command | What you get |
| --- | --- |
| <kbd>/Callout</kbd> | Info block with left border |
| <kbd>/Warning</kbd> | Amber warning block |
| <kbd>/Math</kbd> | Inline KaTeX (or wrap in `$…$` / `$$…$$`) |
| <kbd>/Emoji</kbd> | Picker (or paste unicode 🚀 directly) |
| <kbd>/Checklist</kbd> | Task list with checkboxes |

## Wiki-links and `@` mentions

Type <code>[[Page Name]]</code> to link another page (autocompletes the slug). In the AI panel use <code>@PageName</code> to attach pages as context for the agent.

## Drag handle

Hover any block and a ⋮⋮ handle appears in the left margin. Drag it to reorder paragraphs, lists, embeds, or images.

## Source mode

Every editor view has a <span class="tx-accent">Source</span> toggle in the top-right. Click it to see (and edit) the raw markdown that will be written to disk.

## Read on

- [Tips → CLI Power User](../tips/) — the keyboard flow that compounds.
- [Reference → Supported file types](../../reference/file-structure/) — what renders inline beyond markdown.
