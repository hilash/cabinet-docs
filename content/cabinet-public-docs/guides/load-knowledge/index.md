---
title: "Connect Knowledge"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-06-20T00:00:00.000Z"
status: draft
tags:
  - guides
  - symlinks
  - knowledge
  - cloud
order: 32
---

# Connect Knowledge

Connect Knowledge brings folders you already have, on your machine or in the cloud, into a Cabinet room. <mark data-color="yellow">Nothing is copied or uploaded.</mark> Cabinet points at the folder where it lives, so its files show up in the sidebar and your AI agents can read them as context.

## Open the picker

Right-click the data area or any folder in the sidebar and choose <span class="tx-accent">Connect Knowledge</span>. A tile picker opens with your options:

- <span class="tx-amber">**Local folder**</span> brings in any folder on your computer.
- <span class="tx-green">**Google Drive, iCloud Drive, OneDrive, SharePoint, Dropbox**</span> bring in a cloud folder, read straight from that service's desktop sync app. No sign-in, no API keys.
- <span class="tx-purple">**Notion, Confluence**</span> are app connectors, so their tiles take you to the Integrations Hub.

Anything already installed on your Mac also appears under <mark data-color="green">Detected on this Mac</mark> for one click.

Connections are <mark data-color="yellow">per room</mark>. A folder you connect in one room does not show up in another.

## Local folders

Choose <span class="tx-accent">Local folder</span>, pick a folder (or paste a path), and Connect. The folder's contents appear directly in the tree, for example <code>/Users/you/Development/my-repo/</code> shows up as <code>./my-repo/</code>. Edits stay in the original location.

If the folder is a git repo, Cabinet auto-detects it and writes a <code>.repo.yaml</code> so agents get extra context about commits, branches, and history. See [Apps & repos](../apps-and-repos/).

## Cloud folders

Choose a cloud service. Cabinet finds its local sync folder, lets you browse to the sub-folder you want, and asks how to connect it:

- <span class="tx-green">**View only**</span> (the default). Agents can read the files, but nothing in Cabinet can change them.
- <span class="tx-amber">**Read and write**</span>. Edits you make in Cabinet sync back to the cloud.

A cloud folder can land in two places:

- <mark data-color="yellow">**Inline**</mark>, right where you clicked in the tree, marked with the service's logo and, for view-only folders, a small "view" badge.
- In a <mark data-color="green">**cloud browser**</mark> section for the room, when you connect from the room's top level.

Google Docs, Sheets, and Slides always open in a read-only viewer, since they live in Google's editor rather than as plain files.

## Read only keeps your files safe

When you connect a folder as view only, Cabinet protects it everywhere. The page opens in a read-only editor, and the menu hides rename, move, and delete. Your agents can read those files, but they cannot change them. This makes it safe to point Cabinet at a shared drive or a folder you do not want touched.

## Tracking metadata about a connected folder

For a local folder, add a <code>.cabinet-meta</code> file next to (or inside) it:

```yaml
# .cabinet-meta
title: My Code Repo
description: Backend monorepo for acme.com.
visibility: cabinet
```

Cabinet picks up the metadata on the next scan. The title shows in the sidebar; the description shows on hover.

## Disconnecting

Right-click a connected folder and choose <span class="tx-accent">Unlink</span> (or <span class="tx-accent">Disconnect</span> for a cloud folder). Cabinet removes only its pointer. The original folder and every file in it are left exactly as they were.

## CABINET_DATA_DIR

Cabinet looks for cabinets at <code>$CABINET_DATA_DIR</code> (default <code>~/cabinets/</code>). Set the env var to point at a different location:

```bash
export CABINET_DATA_DIR=~/Documents/cabinets
```

This is useful if you keep cabinets on an encrypted volume or a synced folder.

## Read on

- [Apps & repos](../apps-and-repos/) for embedded apps and linked repos.
- [Reference → File structure](../../reference/file-structure/) for what lives inside a cabinet folder.
