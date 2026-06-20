---
title: "Linked content"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - symlinks
  - repos
  - knowledge
order: 11
---

# Linked content

Cabinet can <mark data-color="yellow">point at folders that live elsewhere on disk</mark> without copying anything. Two flavors:

- **Linked directory** — a plain symlink. Behaves like any folder in your cabinet.
- **Linked git repo** — a folder with a <code>.repo.yaml</code>. Behaves the same, plus agents get repo context.

## How to link a folder

Right-click any item in the sidebar → <span class="tx-accent">Load Knowledge</span> → pick a folder on your machine → optionally name it → **Load**.

Cabinet creates a symlink inside the cabinet, so a folder at `/Users/you/Development/my-repo/` shows up as `./my-repo/` in the sidebar tree. <span class="tx-green">Edits stay in the original location.</span>

For details and the `.cabinet-meta` schema see [Guides → Connect Knowledge](../../../../guides/load-knowledge/).

## .cabinet-meta

Add metadata about the linked folder:

```yaml
# /path/to/your/folder/.cabinet-meta
title: My Code Repo
description: Backend monorepo for acme.com.
visibility: cabinet
icon: ./logo.png
```

Cabinet picks it up on next scan. Title shows in the sidebar; description shows on hover.

## .repo.yaml — turn a folder into a Linked Git Repo

If the linked folder is a git repo, drop a <code>.repo.yaml</code> at the root:

```yaml
remote: github.com/you/my-repo
branch: main
description: Acme backend monorepo
language: typescript
```

The folder still acts like a normal cabinet folder — pages render, files are editable, agents can write into it. The difference: <mark data-color="green">agents become aware of git context</mark>:

- The current branch and commit.
- Recent commit messages and authors.
- A diff for any range the agent asks about.
- Which files have uncommitted changes.

That makes a Code Reviewer agent qualitatively better — it can see what *changed* this week, not just what's there now.

## Why linking matters

Most KB tools force you to import or copy. Cabinet works <mark data-color="yellow">where your data already lives</mark>:

- Your code repo appears as a folder inside your cabinet — agents can read it without checkout.
- A Notes folder synced via iCloud/Dropbox can be navigated and searched from Cabinet.
- A multi-cabinet setup can share a common folder by symlinking it into both.

## Where linked folders show up in the sidebar

Linked directories get a <mark data-color="blue">link icon</mark>. Linked git repos get an <mark data-color="amber">orange branch icon</mark>. Both expand and behave like normal folders — your fingers can't tell the difference.

## CABINET_DATA_DIR

Cabinet looks for top-level cabinets at <code>$CABINET_DATA_DIR</code> (default <code>~/cabinets/</code>). Set the env var to point at a different location:

```bash
export CABINET_DATA_DIR=~/Documents/cabinets
```

Useful if you keep cabinets on an encrypted volume or a synced folder. Agents respect the path; symlinks under it work normally.

## Read on

- [Guides → Connect Knowledge](../../../../guides/load-knowledge/) — the right-click flow in detail.
- [Guides → Apps & repos](../../../../guides/apps-and-repos/) — embedded apps and repos paired together.
