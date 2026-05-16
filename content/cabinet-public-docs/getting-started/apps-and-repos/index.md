---
title: "Apps and Repos"
created: "2026-04-12T00:00:00.000Z"
modified: "2026-05-09T00:00:00.000Z"
status: draft
tags:
  - guide
  - apps
  - repos
order: 1
---

# Apps and Repos

Cabinet goes beyond markdown pages. You can <mark data-color="yellow">embed full web applications</mark>, link external Git repositories, and create interactive tools that live right alongside your documentation.

## Embedded apps

Any directory that contains an `index.html` file **and no** `index.md` is treated as an embedded app. Cabinet renders it in an iframe.

### Standard embedded app

The app renders in the main content area with the sidebar and AI panel still visible. Good for dashboards and reference tools you want to glance at while working.

```
data/
  my-dashboard/
    index.html     ← the app (renders as iframe with sidebar)
    app.js
    style.css
```

### Full-screen app (`.app` marker)

Add an empty `.app` marker file to the directory and the app gets maximum space: the sidebar and AI panel <span class="tx-accent">auto-collapse on open</span>. A **Back to KB** button in the toolbar restores the normal layout.

```
data/
  my-tool/
    index.html     ← the app
    .app           ← marker: full-screen mode
    other-files/
```

Both types appear in the sidebar automatically — <mark data-color="green">no build step, no deployment</mark>.

## Linked repositories

A `.repo.yaml` file in any data directory links it to a Git repository. Agents use this to read and search source code in context when working on related documentation.

```yaml
name: my-project
local: /path/to/local/repo
remote: https://github.com/org/repo.git
source: both
branch: main
description: What this repo contains (helps agents understand context)
```

### Fields

| Field | Required | Description |
| --- | --- | --- |
| `name` | <span class="tx-green">Yes</span> | Human-readable project name |
| `local` | <span class="tx-green">Yes</span> | Absolute path to local clone |
| `remote` | <span class="tx-muted">No</span> | GitHub URL — used for links, issues, PR suggestions |
| `source` | <span class="tx-muted">No</span> | `local`, `remote`, or `both` (default: `both`) |
| `branch` | <span class="tx-muted">No</span> | Default branch (default: `main`) |
| `description` | <span class="tx-muted">No</span> | Free-text description for agent context |

When an agent works on a KB page that has a `.repo.yaml` in the same directory or any parent, it will:

1. Read the `.repo.yaml` to find the linked repo
2. Use the `local` path to read source code and understand architecture
3. Use the `remote` URL when creating links or suggesting PRs

The sidebar shows these directories with an <span class="tx-amber">orange GitBranch icon</span>.

---

Back to [Getting Started](../).
