---
title: "Install Cabinet"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - install
  - quickstart
order: 20
---

# Install Cabinet

Get from <mark data-color="yellow">zero to a running cabinet</mark> in under five minutes. The first-run wizard creates your data folder, seeds an example cabinet, and asks you to plug in one model API key.

## Who this is for

You want a <mark data-color="yellow">local-first</mark> knowledge base where every page is a markdown file on disk and a team of AI agents can edit and run jobs against it.

If you're brand new, read [Philosophy](../philosophy/) first — it's the 90-second pitch.

## Supported systems

| System | Status | Notes |
| --- | --- | --- |
| <mark data-color="green">**macOS 12+**</mark> | <span class="tx-green">**Fully supported**</span> | Native Electron app or `npx` CLI. Apple Silicon and Intel. |
| <mark data-color="amber">**Linux**</mark> | <span class="tx-amber">**Untested**</span> | Should work via the `npx` CLI (Cabinet is Node + Electron — both fully Linux-compatible) but hasn't been verified yet. Try it and [share what breaks](https://discord.gg/hJa5TRTbTH). |
| <mark data-color="amber">**Windows**</mark> | <span class="tx-amber">**Via WSL2**</span> | Run inside WSL2 (Ubuntu recommended). Native Windows support is on the [roadmap](../roadmap/). |

| Requirement | Version | How to check |
| --- | --- | --- |
| <mark data-color="yellow">**Node.js**</mark> | **22+ (LTS)** | <code>node -v</code> — repo ships an `.nvmrc`, run <code>nvm use</code> to auto-switch |
| <mark data-color="yellow">**git**</mark> | any recent | <code>git --version</code> |
| <mark data-color="yellow">**An AI CLI**</mark> | latest | One of: [Claude Code](https://www.anthropic.com/claude-code), [Codex CLI](https://github.com/openai/codex). See [Bring your own AI](../cabinet/agents/byoai/). |

## Install — Mac native app (Electron)

<span class="tx-accent">**Easiest path on macOS.**</span> Download the `.dmg`, drag Cabinet into Applications, double-click. No terminal required.

→ [<mark data-color="amber">**Download Cabinet for Mac (.dmg)**</mark>](https://github.com/hilash/cabinet/releases/latest)

Both **Apple Silicon (M-series)** and **Intel** builds are published with each [GitHub Release](https://github.com/hilash/cabinet/releases). The first launch asks for the same things the CLI does — a folder for your cabinets, and an AI provider.

> **Note.** macOS may ask you to confirm the app on first open (Apple Gatekeeper). Right-click → Open if you see "unidentified developer."

## Install — `npx` CLI (any platform)

<div data-demo="terminal-boot" data-caption="What npx cabinetai run looks like the first time."></div>

```bash
npx create-cabinet@latest my-cabinet
cd my-cabinet
npm run dev:all
```

Open the URL printed in your terminal (usually <code>http://localhost:4000</code>). The wizard creates a data folder, seeds an example cabinet, and prompts for one model API key.

> **Tip.** Cabinets live anywhere on disk. Set <code>CABINET_DATA_DIR=/path/to/folder</code> before <code>npm run dev:all</code> to use a different location. <mark data-color="green">Your folder is your data</mark>; the app is just a viewer.

## Pick a model provider

Cabinet is <mark data-color="green">bring-your-own-AI</mark>. You connect the providers you already pay for. There's no Cabinet middleman, no inference markup, no quota.

| Provider | Best for | Get a key |
| --- | --- | --- |
| **Anthropic Claude** | Default for most agents — long context, careful writing | console.anthropic.com |
| **OpenAI GPT** | Cheap routing, strong tool use, fast | platform.openai.com |
| **Google Gemini** | Long-context research, low cost per token | aistudio.google.com |
| **xAI Grok** | Latest news, code, lighter-weight tasks | console.x.ai |
| **Local (Ollama / LM Studio)** | Offline, private, no API bill | ollama.com / lmstudio.ai |

You can connect <span class="tx-accent">multiple providers</span> and pick a default per agent or override per task.

## Verify it worked

Three checks. If any fail, jump to [common failure modes](#common-failure-modes) below.

1. The sidebar shows <code>index.md</code> selected.
2. Press <kbd>⌘K</kbd> (or <kbd>Ctrl+K</kbd>) — search opens.
3. Press <kbd>⌘⇧A</kbd> — the AI panel opens on the right.

If all three pass, your cabinet is alive. Now go meet your team.

## Try your first agent

Open <code>.agents/</code> in the sidebar. Click any persona. Click **Hire**. The agent appears in your AI team panel with the <span class="tx-green">Active</span> dot lit. Click their avatar to chat with them, or assign a task on the [Task Board](../showcase/tasks/).

Don't have a team yet? <mark data-color="amber">Templates</mark> ship complete teams in one command:

```bash
npx cabinets add cabinet-app/job-hunt-hq
# or browse the registry at cabinets.sh
```

## Common failure modes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| <code>EADDRINUSE :3000</code> | Old dev server still bound | <code>lsof -i :3000</code> then kill the PID, or set <code>PORT=3001</code> |
| Blank editor on first load | Model API key missing or invalid | Open Settings → Providers, paste your key, refresh |
| <code>npm ERR! 401</code> on install | Stale auth token in <code>~/.npmrc</code> | <code>npm config delete _authToken</code>, then retry |
| Sidebar says "no cabinets" | <code>CABINET_DATA_DIR</code> points at an empty folder | Unset it, or run <code>npx cabinetai create</code> inside it |
| Agent says "no API key" mid-chat | Provider keyed but model not allowed | Settings → Providers → enable specific models |
| First-run wizard hangs | Firewall blocks <code>fonts.googleapis.com</code> | Allow it, or use the offline build (<code>npm run dev:offline</code>) |

## Recovery toolkit

When things look broken, run these in order:

```bash
npx cabinetai doctor          # Diagnose env, ports, providers, db
npx cabinetai sessions list   # Show active sessions and locks
npx cabinetai uninstall       # Remove cached app (your data is safe)
npx cabinetai update          # Reinstall the latest version
```

<mark data-color="yellow">Your cabinet folders are your data.</mark> <code>uninstall</code> only removes the cached app — it never touches your <code>~/cabinets/</code> folders.

## Quick reference

| Command | What it does |
| --- | --- |
| <code>npx create-cabinet@latest</code> | Scaffold a new cabinet folder and start the app |
| <code>npx cabinetai run</code> | Start Cabinet against the current folder |
| <code>npx cabinetai create &lt;name&gt;</code> | Create a new cabinet inside this one |
| <code>npx cabinetai add &lt;owner/repo&gt;</code> | Install a template cabinet from cabinets.sh |
| <code>npx cabinetai doctor</code> | Diagnose install + provider issues |
| <code>npx cabinetai update</code> | Reinstall the latest version |
| <code>npx cabinetai uninstall</code> | Remove cached app (keeps your data) |
| <kbd>⌘K</kbd> | Open search |
| <kbd>⌘⇧A</kbd> | Toggle AI panel |
| <kbd>⌘`</kbd> | Toggle web terminal |
| <kbd>?</kbd> | Open keyboard cheat sheet |

See the full [CLI reference](../reference/cli/) for every flag and exit code.

## Next steps

- [Meet your AI team](../cabinet/agents/) — what personas, heartbeats, and routines actually are.
- [Browse template cabinets ↗](https://cabinets.sh) — start with a pre-built team for your job.
- [Showcase](../showcase/) — see the agents workspace and task board live.
- [Tips and best practices](../guides/tips/) — the small habits that compound.
