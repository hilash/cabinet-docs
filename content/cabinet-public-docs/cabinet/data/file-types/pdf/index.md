---
title: "PDF document"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - pdf
order: 3
---

# PDF document

Files: <code>*.pdf</code>.

PDFs render with the <mark data-color="yellow">browser-native viewer</mark> — pagination, zoom, search, print, and download all work without a third-party library. Drop a PDF into your cabinet folder and it appears in the sidebar with a red PDF icon.

## What you get

- <span class="tx-accent">Inline pagination</span> in the main panel — no full-screen takeover.
- <span class="tx-accent">Browser search</span> across the document with <kbd>⌘F</kbd>.
- <span class="tx-accent">Download</span> and **Reveal in Finder** buttons in the toolbar.
- <span class="tx-accent">Sidebar navigation</span> stays visible — you can browse other pages without closing the PDF.

## Drop a PDF anywhere

```text
research/
├── index.md
└── competitors/
    ├── acme-pricing.pdf      ← inline viewer
    ├── globex-deck.pdf       ← inline viewer
    └── notes.md
```

Both PDFs become navigable nodes. Your notes file can `[link to](./acme-pricing.pdf)` either of them.

## What agents see

By default, agents <mark data-color="amber">see the filename and metadata</mark> but not the PDF text. To let an agent read a PDF, attach it explicitly with `@file:competitors/acme-pricing.pdf` in a task prompt — Cabinet runs the PDF through a text extractor before sending the content to the model.

```yaml
# in a routine
prompt: |
  @file:research/competitors/acme-pricing.pdf
  Summarize their pricing tiers into /research/competitors/acme.md.
```

## Limits

- The viewer is <span class="tx-accent">read-only</span>. Cabinet doesn't edit PDFs in place.
- For very large PDFs (>200 pages), open them in your default PDF app via <span class="tx-accent">Reveal in Finder</span> for better performance.
- Annotation isn't supported. Use a real PDF tool, save back to the same path, Cabinet picks up the new version.

## Read on

- [Markdown editor](../../editor/) — for the kind of editing PDFs aren't for.
- [File types](../) — the rest of the inventory.
