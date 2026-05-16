---
title: "Embedded apps"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - apps
  - html
order: 9
---

# Embedded apps

A folder with an <code>index.html</code> at its root and <span class="tx-accent">no <code>index.md</code></span> is treated as an embedded app. Cabinet renders it in an iframe inside the main panel.

## Standard embedded app

The app renders in the main content area; the sidebar and AI panel stay visible. Good for <mark data-color="yellow">dashboards and reference tools</mark> you want to glance at while writing or doing other work.

```text
data/
  my-dashboard/
    index.html
    style.css
    app.js
    data.json
```

Click `my-dashboard/` in the sidebar — it opens as a live page.

## Full-screen app

Add a <code>.app</code> marker file (empty file, just to flag it) and Cabinet expands the iframe to full screen, hiding the sidebar:

```text
data/
  my-launch-room/
    .app             ← marker (empty file)
    index.html
    app.js
```

Use full-screen for <span class="tx-accent">immersive tools</span> — pipeline dashboards, custom Kanban boards, embedded apps you want to feel like a Cabinet page rather than an iframe.

## What you can build

Anything that runs in a browser. Common patterns:

| Pattern | Example |
| --- | --- |
| Read-only dashboard | Pipeline dashboard reading <code>../data/pipeline.csv</code> via fetch |
| Custom widget | A budget calculator with sliders that writes back to <code>../config.json</code> |
| Mini-game / sandbox | A quick prototype to share with the team |
| Demo for a client | Self-contained, no auth, just a folder you ship |
| Embedded data viz | D3 / Chart.js / Plotly reading from cabinet files |

## Reading other cabinet files from the iframe

Embedded apps can read sibling files via relative `fetch`:

```html
<script>
  // From data/my-dashboard/index.html
  fetch("../pipeline.csv")
    .then(r => r.text())
    .then(text => render(text));
</script>
```

Cabinet's web server serves the cabinet folder as static files, so any text or asset is fetchable.

## Limits

- <mark data-color="amber">No npm install.</mark> Embedded apps are self-contained. Use CDN imports if you need a library.
- The iframe is sandboxed. <mark data-color="amber">No clipboard write</mark> without user gesture, no popups, no top-window navigation.
- The app can't write *outside* the cabinet folder. Reads are scoped to the cabinet root.

## Why this matters

Cabinet folds in <span class="tx-accent">"the dashboard"</span> as another file type. You don't have to deploy a separate web app to put a custom view next to your data. Drop a folder, edit the HTML, refresh the page — the dashboard updates.

## Read on

- [Linked content](../linked-content/) — for git repos and symlinks.
- [Google Workspace pages](../google-workspace/) — for live collaborative apps you don't host yourself.
