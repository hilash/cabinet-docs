---
title: "Install Cabinet"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-07-14T00:00:00.000Z"
status: draft
tags:
  - install
  - quickstart
order: 20
---

# Install Cabinet

Get from <mark data-color="yellow">zero to a running cabinet</mark> in under five minutes. The first-run flow creates your cabinet and guides you through connecting an AI CLI provider.

## Who this is for

You want a <mark data-color="yellow">local-first</mark> knowledge base where every page is a markdown file on disk and a team of AI agents can edit and run jobs against it.

If you're brand new, read [Philosophy](../philosophy/) first — it's the 90-second pitch.

## Supported systems

| System | Status | Notes |
| --- | --- | --- |
| <mark data-color="green">**macOS 12+**</mark> | <span class="tx-green">**Fully supported**</span> | Native Electron app on Apple Silicon; `npx` CLI bundles on Apple Silicon and Intel. |
| <mark data-color="green">**Linux**</mark> | <span class="tx-green">**CLI supported**</span> | `npx cabinetai run` downloads a prebuilt Linux app bundle. There is not yet an AppImage or `.deb`. |
| <mark data-color="green">**Windows 10/11**</mark> | <span class="tx-green">**Native app in v0.5.1**</span> | The v0.5.1 release adds a native Squirrel installer and portable ZIP, exercised on a Windows GitHub runner before publication. The initial installer is unsigned; see below. |

| Requirement | Version | How to check |
| --- | --- | --- |
| <mark data-color="yellow">**Node.js**</mark> | **22+ (LTS)** | <code>node -v</code> — repo ships an `.nvmrc`, run <code>nvm use</code> to auto-switch |
| <mark data-color="yellow">**git**</mark> | any recent | <code>git --version</code> |
| <mark data-color="yellow">**An AI CLI**</mark> | latest | Cabinet can guide you through installing and signing in to Claude Code, Codex, Gemini, OpenCode, Pi, Grok, Copilot, or Cursor. See [Bring your own AI](../cabinet/agents/byoai/). |

## Install — Mac native app (Electron)

<span class="tx-accent">**Easiest path on macOS.**</span> Download the `.dmg`, drag Cabinet into Applications, double-click. No terminal required.

→ [<mark data-color="amber">**Download Cabinet for Mac (.dmg)**</mark>](https://github.com/cabinetai/cabinet/releases/latest)

The native DMG is currently built for **Apple Silicon (M-series)**, signed, notarized, mounted, and launched on a macOS runner before publication. Intel Macs use the checksum-verified `npx` CLI bundle described below.

## Install — Windows native app

The upcoming v0.5.1 release adds a Squirrel `Setup.exe` and a portable Windows ZIP. Use the [Cabinet releases page](https://github.com/cabinetai/cabinet/releases) after v0.5.1 is published. Cabinet's pipeline installs `Setup.exe`, launches the installed app, checks the app and daemon health routes, and uninstalls the test copy on a real Windows runner before release.

> **Unsigned first release.** Windows signing is intentionally not a v0.5.1 release requirement. The app still installs and runs, but Windows may show **Unknown publisher** and Microsoft Defender SmartScreen warnings. Do not treat those warnings as an application failure. A future release will use a hardware-backed cloud-signing service; no self-signed certificate is used.

## Install — `npx` CLI (any platform)

<div data-demo="terminal-boot" data-caption="What npx cabinetai run looks like the first time."></div>

```bash
npx create-cabinet@latest my-cabinet
```

`create-cabinet` creates the cabinet and starts the app. You can also enter any focused folder and run `npx cabinetai run`; if it has no `.cabinet` manifest, Cabinet offers to bootstrap it. Open the URL printed in your terminal (usually <code>http://127.0.0.1:4000</code>).

On macOS and Linux, the CLI downloads a checksum-verified prebuilt bundle into `~/.cabinet/app/vX.Y.Z/`, extracts it atomically, and starts it without running `npm install`. Platforms without a matching bundle fall back to the tagged source package plus dependency installation.

> **Tip.** Cabinets live anywhere on disk. Run <code>npx cabinetai run --data-dir /path/to/folder</code>, or set <code>CABINET_DATA_DIR</code>, to choose the exact location. <mark data-color="green">Your folder is your data</mark>; the cached app is separate.

## Pick a model provider

Cabinet is <mark data-color="green">bring-your-own-AI</mark>. You connect the CLI providers you already use. There's no Cabinet middleman, no inference markup, no Cabinet inference quota.

| Provider | Best for | Connect |
| --- | --- | --- |
| **Anthropic Claude** | Long context, careful writing | Claude Code subscription/login |
| **OpenAI Codex** | Coding and tool use | Codex CLI login |
| **Google Gemini** | Long-context research | Gemini CLI login |
| **Grok** | News, code, and reasoning | Grok CLI + xAI key |
| **OpenCode / Pi** | Multi-model routing | Provider's interactive login |
| **GitHub Copilot / Cursor** | Existing coding subscriptions | Provider's CLI login |

Open **Settings → Providers** and choose **Set up**. Cabinet walks through Install → Sign in → Verify, using a browser or an embedded interactive terminal as appropriate. You can connect <span class="tx-accent">multiple providers</span> and pick a default per agent or override per task.

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
npx cabinetai import <template-name>
```

`import` reads templates from the `cabinetai/cabinets` registry. You can also add agents from Cabinet's in-app library.

## Common failure modes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Preferred port already in use | Another process owns the port | Cabinet automatically chooses the next free app/daemon ports; use `CABINET_APP_PORT` and `CABINET_DAEMON_PORT` to choose preferences. |
| No agent provider available | No supported CLI is authenticated | Open Settings → Providers → Set up, then complete Install → Sign in → Verify. |
| <code>npm ERR! 401</code> on install | Stale auth token in <code>~/.npmrc</code> | <code>npm config delete _authToken</code>, then retry |
| Sidebar says "no cabinets" | <code>CABINET_DATA_DIR</code> points at an empty folder | Unset it, or run <code>npx cabinetai create</code> inside it |
| Agent reports provider authentication | The selected CLI login expired | Open Settings → Providers and run the provider's verification/setup flow again. |
| First-run wizard hangs | Firewall blocks <code>fonts.googleapis.com</code> | Allow it, or use the offline build (<code>npm run dev:offline</code>) |

## Recovery toolkit

When things look broken, run these in order:

```bash
npx cabinetai doctor          # Diagnose env, ports, providers, db
npx cabinetai uninstall       # Remove cached app (your data is safe)
npx cabinetai update          # Download the latest published version
```

<mark data-color="yellow">Your cabinet folders are your data.</mark> <code>uninstall</code> only removes the cached app — it never touches your <code>~/cabinets/</code> folders.

## Quick reference

| Command | What it does |
| --- | --- |
| <code>npx create-cabinet@latest</code> | Scaffold a new cabinet folder and start the app |
| <code>npx cabinetai run</code> | Start Cabinet against the current folder |
| <code>npx cabinetai create &lt;name&gt;</code> | Create a new cabinet inside this one |
| <code>npx cabinetai import &lt;template&gt;</code> | Import a template from the Cabinet registry |
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
