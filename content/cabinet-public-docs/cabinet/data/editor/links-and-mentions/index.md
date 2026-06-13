---
title: "Links & mentions"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-06-13T00:00:00.000Z"
status: draft
tags:
  - editor
  - links
  - mentions
  - context
order: 4
---

# Links & mentions

Cabinet has <mark data-color="yellow">three link surfaces</mark>: standard markdown links, wiki-links, and `@`-mentions for AI context.

## Standard markdown links

Type `[label](url)` or paste any URL with text selected. Renders as a link, source stays plain markdown.

```md
[Browse cabinets.sh ↗](https://cabinets.sh)
```

External URLs open in a new tab; internal `./relative/` and `/absolute/` paths stay in-app.

## Wiki-links

Type <code>[[</code> and start typing a page title. Cabinet autocompletes by slug.

```md
See [[GTM Lead]] for the launch ownership story.
```

Wiki-links resolve at <span class="tx-accent">build time</span> (in the docs site) and at <span class="tx-accent">render time</span> (in the app). If the target page is renamed, links don't break — Cabinet re-resolves by slug. <mark data-color="green">Refactor your titles freely.</mark>

## `@`-mentions in the AI panel

In the AI panel composer (or any agent task prompt) type <code>@</code> and start typing:

| Form | What it attaches |
| --- | --- |
| <code>@PageName</code> | The full page contents as agent context. |
| <code>@folder/</code> | The folder's directory listing plus its index page. |
| <code>@chat:slug</code> | A past conversation, by chat slug. |
| <code>@agent:slug</code> | Another agent's persona — useful when leads dispatch. |
| <code>@skill:slug</code> | A skill, scoped to this run only. |

Mentions become attached context tokens — the agent sees the file, but you don't have to copy-paste it.

## AGENTS.md — the auto-attached context file

Drop an <code>AGENTS.md</code> at any folder root and Cabinet auto-attaches it to every agent run that touches that folder. Use it like a working agreement:

```md
# Marketing — agent rules
- All launch artifacts live in /launches/.
- Default tone: direct, ≤3 sentences per recommendation.
- Always link competitor briefs by name (no [[Brief #]]).
- Don't post to LinkedIn before legal review.
```

Cabinet treats <code>AGENTS.md</code> like a per-folder system prompt that <mark data-color="amber">augments</mark> (never replaces) the persona.

## Page anchors

Every heading gets an auto-generated anchor, in the Cabinet app and on this docs site alike, so a `#section` link jumps straight to that heading. Page URLs are clean and shareable (for example `/room/your-room/path/to/page#provider-routing`), so you can send a teammate to the exact spot. Click any heading on this docs site to copy its deep link. In source:

```md
## Provider routing

[Jump to provider routing](#provider-routing)
```

## Read on

- [Reference → Manifest schema](../../../../reference/manifest-schema/) — where `dispatch` and `approvals` policy live.
- [Tips → Context Files & Mentions](../../../../guides/tips/) — the small habits that compound.
