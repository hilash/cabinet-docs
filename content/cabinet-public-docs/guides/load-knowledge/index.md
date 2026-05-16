---
title: "Load knowledge"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - guides
  - symlinks
  - knowledge
order: 32
---

# Load knowledge

Cabinet uses <mark data-color="yellow">direct symlinks</mark> to bring external folders into your knowledge base without copying anything. The folder stays where it is on disk — Cabinet just creates a pointer to it.

## How it works

1. Right-click any item in the sidebar.
2. Choose <span class="tx-accent">Load Knowledge</span>.
3. Pick a folder on your machine (or paste the path).
4. Optionally set a display name.
5. Click **Load**.

Cabinet creates a symlink inside the cabinet, e.g. <code>/Users/you/Development/my-repo/</code> appears as <code>./my-repo/</code> in the sidebar tree. Edits stay in the original location.

## Why this matters

Most apps make you import or copy. Cabinet works <mark data-color="green">where your data already lives</mark>. That means:

- Code repos appear as folders inside your cabinet — agents can read them.
- A Notes folder you sync via iCloud / Dropbox can be navigated and searched from Cabinet.
- A multi-cabinet setup can share a common folder by symlinking it into both.

## Tracking metadata about a loaded folder

Add a <code>.cabinet-meta</code> file next to (or inside) the symlink:

```yaml
# .cabinet-meta
title: My Code Repo
description: Backend monorepo for acme.com.
visibility: cabinet
```

Cabinet picks up the metadata on next scan. The title shows in the sidebar; the description shows on hover.

## Linking a Git repo

If the loaded folder is a git repo, drop a <code>.repo.yaml</code> at its root:

```yaml
# .repo.yaml
remote: github.com/you/my-repo
branch: main
```

Cabinet treats it as a [Linked Git Repo](../apps-and-repos/) and gives agents extra context about commits, branches, and history.

## CABINET_DATA_DIR

Cabinet looks for cabinets at <code>$CABINET_DATA_DIR</code> (default <code>~/cabinets/</code>). Set the env var to point at a different location:

```bash
export CABINET_DATA_DIR=~/Documents/cabinets
```

This is useful if you keep cabinets on an encrypted volume or a synced folder.

## Read on

- [Apps & repos](../apps-and-repos/) — embedded apps and linked repos.
- [Reference → File structure](../../reference/file-structure/) — what's inside a cabinet folder.
