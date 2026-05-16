---
title: "Slash commands"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - editor
  - slash-commands
order: 1
---

# Slash commands

Press <kbd>/</kbd> on an empty line to open the command menu. Type to filter, <kbd>↑</kbd>/<kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to insert.

<div data-demo="slash-menu" data-caption="The slash menu animates through a few queries."></div>

## Every command

Three groups, all sharing the same picker.

### <span class="tx-accent">Basic</span> — text and structure

| Command | Inserts | Markdown it writes |
| --- | --- | --- |
| <kbd>/Text</kbd> | Plain paragraph | `…` |
| <kbd>/Heading 1</kbd> | H1 | `# …` |
| <kbd>/Heading 2</kbd> | H2 | `## …` |
| <kbd>/Heading 3</kbd> | H3 | `### …` |
| <kbd>/Bullet list</kbd> | Unordered list | `- …` |
| <kbd>/Numbered list</kbd> | Ordered list | `1. …` |
| <kbd>/Checklist</kbd> | Task list | `- [ ] …` |
| <kbd>/Code block</kbd> | Fenced code | ` ``` ` |
| <kbd>/Quote</kbd> | Blockquote | `> …` |
| <kbd>/Divider</kbd> | Horizontal rule | `---` |
| <kbd>/Table</kbd> | Markdown table | `\| … \| … \|` |

### <span class="tx-accent">Media</span> — images, video, embeds

| Command | What it does |
| --- | --- |
| <kbd>/Image</kbd> | Upload, drag, paste, or insert from URL. Saves next to the page. |
| <kbd>/Video</kbd> | Upload a file or paste a direct URL. |
| <kbd>/Embed</kbd> | Auto-detects YouTube, Vimeo, Loom, X, TikTok, Spotify, Facebook, Instagram, more. |
| <kbd>/File</kbd> | Generic attachment. Renders as a download chip. |

> <mark data-color="amber">**Tip.**</mark> Pasting a recognized URL on an empty line auto-embeds without the popover.

### <span class="tx-accent">Advanced</span> — callouts, math, more

| Command | What it does |
| --- | --- |
| <kbd>/Callout</kbd> | Info block with a left border. |
| <kbd>/Warning</kbd> | Amber warning block. |
| <kbd>/Math</kbd> | Inline KaTeX (or wrap in `$…$` / `$$…$$`). |
| <kbd>/Emoji</kbd> | Picker — or paste 🚀 directly. |

## Quick commands

You can register your own slash commands per cabinet. Add a YAML to <code>.cabinet/slash-commands.yaml</code>:

```yaml
commands:
  - name: meeting
    label: Meeting note
    insert: |
      # Meeting — $DATE
      **Attendees:** _
      ## Notes
      -
      ## Action items
      - [ ]
  - name: weekly
    label: Weekly review
    insert: |
      # Week of $YYYY-WW
      ## Wins
      ## Blockers
      ## Next week
```

Type <kbd>/meeting</kbd> on a new line, hit Enter, the template lands. <span class="tx-green">Variables get interpolated</span>, just like in [routines](../../../agents/routines/).

## Read on

- [Media & embeds](../media-and-embeds/) — what each media command does in detail.
- [Callouts, math, & color](../callouts-math-and-color/) — the advanced group in detail.
- [Tips](../../../../guides/tips/) — the keyboard flow that compounds.
