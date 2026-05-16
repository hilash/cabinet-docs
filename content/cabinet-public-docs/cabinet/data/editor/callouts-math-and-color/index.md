---
title: "Callouts, math & color"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - editor
  - callouts
  - color
  - highlights
order: 3
---

# Callouts, math & color

The advanced group of slash commands plus the Cabinet highlight palette. <mark data-color="yellow">Use them to make pages skimmable.</mark>

## Callouts

Type <kbd>/Callout</kbd> for an info block or <kbd>/Warning</kbd> for an alert. The two callouts on this docs site map to four variants under the hood: <span class="tx-accent">tip</span>, <span class="tx-accent">info</span>, <span class="tx-accent">warning</span>, <span class="tx-accent">danger</span>.

<div data-demo="callout-gallery"></div>

In the editor, callouts roundtrip through markdown as fenced HTML blocks:

```html
<aside class="callout callout-tip" data-icon="lightbulb">
  <strong>Tip.</strong> Anchor every agent to a folder.
</aside>
```

## Cabinet highlights

Cabinet ships with <mark data-color="yellow">six highlight colors</mark> and <span class="tx-accent">five inline text colors</span>. They roundtrip through markdown as inline `<mark>` and `<span>` tags so other tools and `git diff` can read them.

<div data-demo="highlight-swatches"></div>

### Conventions on this docs site

- <mark data-color="yellow">Yellow</mark> for the *one thing* the reader needs to remember per section.
- <mark data-color="blue">Blue</mark> for cross-references and external pointers.
- <mark data-color="green">Green</mark> for confirmations, shipped behavior, success paths.
- <mark data-color="red">Red</mark> for blockers and breaking changes.
- <mark data-color="amber">Amber</mark> for tips and small habits that compound.
- <mark data-color="purple">Purple</mark> for schema fields, YAML keys, and code-adjacent emphasis.

You're free to redefine these per cabinet — they're just CSS.

## Math

Type <kbd>/Math</kbd> for inline KaTeX, or wrap raw text in `$…$` (inline) or `$$…$$` (block).

```text
The energy-mass equivalence is $E = mc^2$.
```

Renders as: *The energy-mass equivalence is $E = mc^2$.*

For a block:

```text
$$
\\sigma(z) = \\frac{1}{1 + e^{-z}}
$$
```

KaTeX is fast (no MathJax dependency) and the source stays readable as plain text — you can grep your cabinet for `mc^2` and find it.

## Emoji

<kbd>/Emoji</kbd> opens a picker, or paste any emoji directly: 🚀 ☕ 🔥 🌱 📈 🧭. Emoji is used heavily in agent personas (the 🤖 in <code>persona.md</code>) and across the AI team UI.

## Checklists

<kbd>/Checklist</kbd> creates a task list:

- [x] Edit colors and highlights
- [x] Paste a YouTube link
- [ ] Try the drag handle on the left gutter
- [ ] Toggle source mode on this page

These roundtrip through GFM checklist syntax so they work cleanly in any other markdown editor too.

## Read on

- [Slash commands](../slash-commands/) — the picker reference.
- [Tips → Best Results](../../../../guides/tips/) — when to use which highlight.
