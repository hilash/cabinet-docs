---
title: "Markdown page"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - markdown
order: 1
---

# Markdown page

Files: <code>*.md</code>, plus any folder with an <code>index.md</code> at the root.

The most common file type in a cabinet. Renders in the <mark data-color="yellow">WYSIWYG editor</mark> with a source toggle so you can see and edit the raw markdown anytime.

This page itself is a <code>file-types/markdown/index.md</code> file. <span class="tx-accent">You're looking at the rendered version.</span>

## What makes a markdown page first-class

- The editor parses and writes <span class="tx-accent">GFM markdown</span> (tables, task lists, fenced code, autolinks).
- Extended HTML inside the markdown roundtrips cleanly — `<mark>` highlights, `<span style>` colors, callouts, embeds.
- A page can have <span class="tx-accent">YAML frontmatter</span> for metadata Cabinet reads (title, tags, modified date, custom fields).
- A page becomes a sidebar node when it sits in a folder with the right structure.

## Frontmatter

```yaml
---
title: "GTM Lead — launch checklist"
tags: [marketing, launches, q3]
created: "2026-04-12T09:00:00Z"
modified: "2026-05-04T15:42:00Z"
order: 5
status: "draft"
---

# Page body in markdown
```

| Field | Used for |
| --- | --- |
| <code>title</code> | Sidebar label, page header, OG title. |
| <code>tags</code> | Filter the sidebar, search facet, agent context. |
| <code>created</code> / <code>modified</code> | Sort, recency surfaces, "last updated" hints. |
| <code>order</code> | Override alphabetical sort within a folder. |
| <code>status</code> | <code>draft</code> badge in the UI. |
| <code>google</code> | If set, the page becomes a [Google Workspace page](../google-workspace/). |
| Anything else | Stored verbatim. Available to agents as context. |

## index.md and folder pages

A folder becomes a navigable page when it contains an `index.md`:

```text
launches/
├── index.md            ← this folder is a page
└── 2026-q3/
    ├── index.md        ← so is this one
    ├── plan.md
    └── screenshot.png
```

The folder's <code>index.md</code> shows when you click the folder. Other markdown files in the folder appear as siblings in the sidebar tree.

## What you can put in the body

Everything the [editor](../../editor/) supports:

- Headings, lists, checklists, tables, blockquotes, code fences.
- Inline formatting and Cabinet highlights.
- Wiki-links and `@`-mentions for AI context.
- Math, callouts, embeds, images.
- Plain HTML for anything markdown can't express.

## Read on

- [Markdown editor](../../editor/) — the editing surface in detail.
- [File types](../) — the rest of the inventory.
