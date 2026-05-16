---
title: "Images"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - images
order: 5
---

# Images

Files: <code>.png .jpg .jpeg .gif .webp .svg .avif .ico</code>.

Images render with the <mark data-color="yellow">native browser viewer</mark>. Drop an image anywhere in your cabinet folder and it appears in the sidebar with a pink image icon.

## Live example

This folder contains a sample PNG: [`cabinet-icon.png`](./cabinet-icon.png).

Embedded inline in this page:

![Cabinet icon — PNG](./cabinet-icon.png)

And the JPG version: [`cabinet-icon.jpg`](./cabinet-icon.jpg).

![Cabinet icon — JPG](./cabinet-icon.jpg)

## Three ways to add images

In the [editor](../../editor/), three paths all save the file next to the page:

1. <mark data-color="green">**Paste**</mark> a copy-pasted screenshot from the clipboard — uploads and inserts automatically.
2. **Drag & drop** from Finder onto the editor.
3. Click the image icon or type <kbd>/Image</kbd> for the <span class="tx-accent">Upload</span> or <span class="tx-accent">From URL</span> tab.

Hover any image in the editor and drag the side handles to resize. The width persists as inline HTML on the markdown page.

## Where they land on disk

Images live in the same folder as the page that holds them:

```text
launches/2026-q3/
├── index.md
├── hero-screenshot.png      ← pasted into index.md
└── pricing-table.png        ← dragged in from Finder
```

<mark data-color="green">No global media bucket.</mark> Move the page folder, the assets move with it.

## What agents see

Agents on a vision-capable model (Claude Sonnet+, GPT-4o+, Gemini 2.5+) can read images you `@`-mention in a task prompt. Useful for screenshots ("annotate this onboarding flow") and for visual QA ("does this match our brand?").

```yaml
prompt: |
  @file:launches/2026-q3/hero-screenshot.png
  Suggest three copy variations for this hero. Keep each ≤8 words.
```

## SVGs are first-class

`.svg` files render inline with full vector quality and stay editable as text. <span class="tx-accent">An agent can edit an SVG by editing its source.</span> That's a quiet superpower for diagrams that need fine-tuning.

## Read on

- [Markdown editor → Media & embeds](../../editor/media-and-embeds/) — paste, drop, URL.
- [Video & audio](../video-and-audio/) — for moving pictures and sound.
