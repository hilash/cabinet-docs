---
title: "Apps & repos"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - guides
  - apps
  - repos
order: 33
---

# Apps & repos

Cabinet goes beyond markdown pages. You can <mark data-color="yellow">embed full web applications</mark>, link external Git repositories, and create interactive tools that live right alongside your documentation.

## Embedded apps

Any directory that contains an <code>index.html</code> file <span class="tx-accent">and no</span> <code>index.md</code> is treated as an embedded app. Cabinet renders it in an iframe.

### Standard embedded app

The app renders in the main content area with the sidebar and AI panel still visible. Good for dashboards and reference tools you want to glance at while working.

```text
data/
  my-dashboard/
    index.html
    style.css
    app.js
```

### Full-screen app

Add a <code>.app</code> marker file in the directory and Cabinet expands the iframe to full screen, hiding the sidebar.

```text
data/
  my-launch-room/
    .app             ← full-screen marker (empty file)
    index.html
```

Use full-screen for immersive tools — pipeline dashboards, custom Kanban boards, embedded apps you want to feel like a Cabinet page.

## Linked Git repos

A folder with a <code>.repo.yaml</code> at the root is treated as a Linked Git Repo. Cabinet gives agents <mark data-color="green">extra context</mark> about the repo: branch, commit log, file structure, recent diffs.

```yaml
# .repo.yaml
remote: github.com/you/my-repo
branch: main
description: Acme backend monorepo
language: typescript
```

The folder still behaves like a normal cabinet folder — pages render, files are editable, agents can write into it. The repo metadata just makes agents <span class="tx-accent">aware</span> of git context.

## Embedding inside a markdown page

Sometimes you want to embed a small interactive widget inline, not as a full app. Use the embed slash command:

- <kbd>/Embed</kbd> — paste any URL (YouTube, Vimeo, Loom, X, etc.). Cabinet auto-detects the provider.
- For raw iframes, paste an iframe tag in source mode.

## Read on

- [Connect Knowledge](../load-knowledge/) — local & cloud folders, <code>.cabinet-meta</code>, <code>CABINET_DATA_DIR</code>.
- [Reference → Supported file types](../../reference/file-structure/) — what else Cabinet renders inline.
