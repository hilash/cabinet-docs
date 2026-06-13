---
title: "Getting Started"
created: "2026-04-12T00:00:00.000Z"
modified: "2026-05-09T00:00:00.000Z"
status: draft
tags:
  - guide
  - onboarding
  - files
order: 22
---

# Getting Started with Cabinet

<mark data-color="yellow">Cabinet is an AI-first knowledge base.</mark> Everything lives as files on disk — no database, no cloud lock-in. You write pages in markdown, organize them in a tree, and let AI agents help you edit and maintain the whole thing.

> <span class="tx-muted">Already installed?</span> This page is the in-app onboarding tour, mirrored for the web. If you're brand new, start with [Install Cabinet](../install/) first.

## Editor — Notion-grade writing

The WYSIWYG editor runs on <span class="tx-accent">Tiptap</span>. Everything you type roundtrips to plain markdown on disk.

### Headings, lists, and styling

Select any text and the **bubble menu** appears. Use it for **bold**, *italic*, <u>underline</u>, ~~strike~~, `code`, super<sup>script</sup>, sub<sub>script</sub>, alignment, and links.

### Text color and highlights

Pick text color or background highlight from the toolbar or bubble menu. They roundtrip through markdown as inline HTML.

- <mark data-color="red">Red urgency notes</mark> for incidents
- <mark data-color="green">Green confirmations</mark> for shipped items
- <mark data-color="yellow">Yellow highlights</mark> for key terms
- <mark data-color="blue">Blue backgrounds</mark> for cross-references

### Images — paste, drop, or URL

Three ways to add an image, all save the file next to this page on disk:

1. **Paste** a copy-pasted screenshot — it uploads and inserts automatically
2. **Drag & drop** a file from Finder onto the editor
3. Click the **image icon** on the toolbar, or type `/Image`, and use the **Upload** tab or **From URL** tab

Hover any image and drag its side handles to resize — the width persists across reloads.

### Videos and universal embeds

Click the **video icon** or type `/Video` to upload a file or paste a direct video URL. Click the **embed icon** (sparkles) or type `/Embed` for YouTube, X, Vimeo, Loom, TikTok, Spotify, Facebook, Instagram, or any URL — Cabinet auto-detects the provider.

Supported providers when you type `/Embed`:

| Provider | Paste a link like… |
| --- | --- |
| YouTube | `https://youtube.com/watch?v=…` |
| Vimeo | `https://vimeo.com/…` |
| Loom | `https://loom.com/share/…` |
| X / Twitter | `https://x.com/user/status/…` |
| TikTok | `https://tiktok.com/@user/video/…` |
| Facebook / Instagram | any public post URL |
| Spotify | `https://open.spotify.com/track/…` |
| Anything else | Falls back to a generic iframe |

<span class="tx-muted">Pasting a recognized URL on an empty line auto-embeds without the popover.</span>

### Slash commands

Press `/` on an empty line to open the command menu, grouped into **Basic**, **Media**, and **Advanced**.

| Group | Commands |
| --- | --- |
| **Basic** | Text, H1/H2/H3, Bullet, Numbered, Checklist, Code block, Quote, Divider, Table |
| **Media** | Image, Video, Embed, File |
| **Advanced** | Callout, Warning, Math, Emoji |

### Callouts

Use `/Callout` for info blocks and `/Warning` for alerts:

> <mark data-color="green">**Tip.**</mark> You can drop a file onto an already-open page and it saves straight into the page's directory — no need to move it manually.

> <mark data-color="amber">**Heads up.**</mark> Don't edit files inside `.git`, `.history`, or `.jobs` — Cabinet owns those.

### Math, emoji, checklists

- Type `/Math` or wrap in `$…$` / `$$…$$` — KaTeX renders inline, e.g., $E = mc^2$
- Type `/Emoji` for a picker, or paste unicode directly 🚀
- Type `/Checklist` for a task list

### Drag handle

Hover any block and a ⋮⋮ handle appears in the left margin. Drag it to reorder paragraphs, lists, embeds, or images.

### Wiki-links and mentions

Type `[[Page Name]]` to link another page (autocompletes the slug). In the right-side AI panel use `@PageName` to attach pages as context for the agent.

### Source mode

Every editor view has a **Source** toggle in the top-right. Click it to see (and edit) the raw markdown that will be written to disk.

## Core features

- **WYSIWYG Editor** — rich text with Notion-grade features. Auto-saves 500ms after each keystroke.
  - *Example:* Select a phrase → pick yellow highlight → keep typing. On disk it's saved as `<mark style="background-color: #fef08a">phrase</mark>`.

- **AI Editor Panel** — right-side chat for editing the current page. `@mention` other pages to pass their content as context.
  - *Example:* Open a draft, press <kbd>⌘⇧A</kbd>, type *"Tighten the intro using @Brand Voice as reference."* The agent edits this page inline.

- **Agent Dashboard** — detached AI runs with live transcripts. Each conversation becomes a row under Agents.
  - *Example:* Ask an agent to research competitors overnight. Run shows `running → completed` with full output accessible next morning.

- **Scheduled Jobs** — YAML configs in `/data/.jobs/` fired by cron.
  - *Example:* `monday-digest.yaml` runs every Monday 09:00, asks Claude to summarize last week's commits, writes the result to `/data/weekly/`.

- **Heartbeats** — recurring agent check-ins defined in `persona.md`. Lightweight "ping the state" runs.
  - *Example:* A `support` heartbeat every 4h scans `/data/inbox/` for new tickets and tags urgency.

- **Kanban Tasks** — visit `/tasks`. Cards live in `board.yaml`.
  - *Example:* Drag a card from **Backlog** to **In Progress** → Cabinet kicks off the linked agent run automatically.

- **Agent-to-Agent Dispatch** — any agent with the **Can dispatch** toggle on can propose tasks, scheduled runs, and recurring jobs for teammates. Every proposal is queued for one-click human approval. See [Delegating Between Agents](./delegating-between-agents/).

- **Web Terminal** — <kbd>⌘`</kbd> toggles an interactive terminal. Good for focused CLI work.

- **Search** — <kbd>⌘K</kbd>, full-text across the current room, ranked by relevance. (Opt in to search other rooms.)

- **Version History** — click the clock icon on any page to see git commits, diff them, or one-click restore.

- **Drag & Drop** — reorder pages in the sidebar, drop files onto the editor to upload.

- **Cabinets** — subdirectories tagged as runtime cabinets get their own agents, jobs, and visibility.

- **Office documents** — drop `.docx`, `.xlsx`, or `.pptx` anywhere and they render inline. Read-only, with Download and Reveal-in-Finder buttons.

- **Google Workspace pages** — a markdown page with a `google:` frontmatter key becomes a live iframe of a Google Sheet, Slide deck, Doc, or Form.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| <kbd>⌘K</kbd> | Open search |
| <kbd>⌘S</kbd> | Force save |
| <kbd>⌘`</kbd> | Toggle terminal |
| <kbd>⌘⇧A</kbd> | Toggle AI panel |

## Sub-pages

- [Apps and Repos](./apps-and-repos/) — embedded apps, full-screen mode, and linked repos
- [Symlinks and Load Knowledge](./symlinks-and-load-knowledge/) — direct symlinks, `.cabinet-meta`, `.repo.yaml`, and `CABINET_DATA_DIR`
- [Delegating Between Agents](./delegating-between-agents/) — agent-to-agent dispatch, `LAUNCH_TASK` / `SCHEDULE_*` proposals, approval panel, per-row model/effort overrides
- [Skills](./skills/) — installable agent skills, attaching to personas, and the security model

## Supported file types

Cabinet treats specific file formats as first-class views. Everything else can still live in the KB as an asset linked from a markdown page.

| Type | Files | How Cabinet shows it |
| --- | --- | --- |
| Markdown page | `*.md`, `index.md` | WYSIWYG editor with markdown source toggle |
| CSV data | `*.csv` | Interactive table editor with source view |
| PDF document | `*.pdf` | Inline PDF viewer (browser-native) |
| Mermaid diagram | `*.mermaid`, `*.mmd` | Rendered diagram |
| Image | `.png .jpg .jpeg .gif .webp .svg .avif .ico` | Inline image viewer |
| Video | `.mp4 .webm .mov .m4v` | Inline video player |
| Audio | `.mp3 .wav .ogg .m4a .aac` | Inline audio player |
| Source code | `.js .ts .py .go .swift .yaml .json` (and more) | Syntax-highlighted viewer |
| Embedded website | Directory with `index.html`, no `index.md` | Iframe in main panel, sidebar visible |
| Full-screen app | Directory with `index.html` + `.app` marker | Full-screen iframe, sidebar collapses |
| Directory | Any folder with `index.md` | Expandable tree node in the sidebar |
| Linked Git repo | Directory with `.repo.yaml` | Normal page/folder, repo context for agents |
| Linked directory | Symlink without `.repo.yaml` | Normal folder, contents appear as children |
| Word document | `.docx` | Inline read-only render (docx-preview) |
| Spreadsheet | `.xlsx`, `.xlsm` | Multi-sheet grid with tabs (SheetJS) |
| Presentation | `.pptx` | Slide-by-slide view (pptx-preview) |
| Google Workspace page | `*.md` with `google:` frontmatter | Iframe to Sheets / Slides / Docs / Forms |
| Legacy office / archive | `.doc .ppt .xls .odt .rtf .zip .fig .sketch` | Shown in sidebar, opens in Finder |

For more detail, see [File types](../cabinet/data/file-types/).
