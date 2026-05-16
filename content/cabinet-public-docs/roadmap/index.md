---
title: "Roadmap"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-09T00:00:00.000Z"
status: draft
tags:
  - roadmap
order: 50
---

# Roadmap

What's already shipping, what's in flight, what's planned next.

**Legend:** 🟢 Shipped · 🔵 Improved · ⚪ Planned (not yet built) · 🔴 Removed/Breaking · 🟣 AI & Skills

---

## ✅ Already shipped

The short version of the [full changelog](https://github.com/hilash/cabinet/blob/main/CHANGELOG.md). Latest: **v0.4.3** (April 2026).

### 🟢 Platforms & install
- 🟢 **macOS native app** (Electron) — Apple Silicon + Intel `.dmg` builds, hardened-runtime entitlements
- 🟢 **`npx` CLI** — `create-cabinet`, `cabinetai create / run / doctor / update / uninstall`
- 🟢 **Linux** support via `npx`

### 🟣 AI runtime & providers
- 🟣 **8 BYOAI CLI providers** — Claude, Codex, Gemini, OpenCode, Pi, +3 more
- 🟣 **Skills system** — installable agent skills (Anthropic format), `~/.cabinet/skills/`, registry page with live manifests, tiered trust
- 🟣 **Multi-provider runtime** — shared runtime picker, effort sliders, dynamic `listModels()`, brand icons
- 🟢 **Terminal mode** — persistent shell panel, PTY adapters per provider, fullscreen toggle, session resume

### 🟢 Data & file types
- 🟢 **Markdown editor** — WYSIWYG + source mode, slash menu, wiki-links, `@`-mentions, drag handles, heading anchors, embeds
- 🟢 **First-class viewers** — PDF, CSV, Mermaid, code, images, video, audio, Office docs, embedded HTML apps
- 🟢 **Notebook viewer** — `.ipynb` cells, outputs, visualizations
- 🟢 **Search palette** — `⌘K` / `/` 2-pane palette backed by daemon-side FlexSearch
- 🔵 **Cabinet-scoped URLs** — unified hash scheme; legacy paths auto-redirect

### 🟢 Agents & tasks
- 🟢 **Agent page v2** — chat-first, conversations rail, editable identity, 100 famous-figure avatars, sub-task delegation
- 🟢 **Tasks Board v2** — drag-and-drop with undo, multi-select + bulk delete, density toggle, lane collapse, agent/depth/trigger filters, activity feed
- 🟢 **Composer & scheduling** — unified Task / Routine / Heartbeat dialog, `WhenChip` with NL parsing, shared `AgentPicker`, drag-paste-pick attachments
- 🔵 **Conversations** — multi-turn runs, live chat stream, per-turn runtime + tokens

### 🟢 Onboarding, help & UX
- 🟢 **Onboarding tour** — 3-slide animated, blueprint home, staged data reveal, breadcrumb
- 🟢 **Help section** — deep-dive cards per feature, Skills + API Keys demos, keyboard shortcuts
- 🟢 **Sidebar redesign** — Cabinet drawer with Data / Agents / Tasks tabs, drag-reorder, OS file import, Recent Tasks
- 🟢 **Themes** — Cabinet (Paper), Windows 95, Windows XP, Matrix, Apple
- 🔵 **Calendar** — off-window event chevrons, editable hours, density slider, deduped multi-cabinet cron events

### 🟢 Trust & infrastructure
- 🟢 **Telemetry & privacy** — anonymous opt-out, Privacy toggle, [TELEMETRY.md](https://github.com/hilash/cabinet/blob/main/TELEMETRY.md)
- 🟢 **Calm legal flow** — full-screen card, server-side acceptance, ToS + Privacy
- 🔵 **MIT licensed** — fully open source
- 🔵 **Accessibility** — P1/P2 audit pass, focus rings, aria-labels, AT-friendly task cards

---

## ⚪ Coming next

### Platforms
- ⚪ **Windows native** support (today: WSL2 only)
- ⚪ **Linux / Ubuntu full polish** — packaged `.AppImage` / `.deb`, system tray
- ⚪ **iOS / Android** companion apps (read-only first, write later)

### More AI providers
- ⚪ **Hermes** (Nous Hermes / open-weights via Ollama)
- ⚪ **Llama / Mistral / Qwen** — broader local model coverage
- ⚪ **LM Studio** integration
- ⚪ **Direct Anthropic API** (no CLI required)
- ⚪ **Direct OpenAI API** (no CLI required)
- ⚪ **xAI Grok** direct API

### Integrations
- ⚪ **Slack** — read channels, post summaries, agent DMs
- ⚪ **Discord** — community channel ingestion + posting
- ⚪ **Gmail** — inbox triage, draft replies, scheduled summaries
- ⚪ **Google Workspace** — Drive (sync), Calendar (events as tasks), Docs import/export
- ⚪ **Image generation** — FLUX, Gemini, Grok, DALL·E, local SD via the same provider adapter pattern
- ⚪ **GitHub** — PR review, issue triage, repo-aware agents
- ⚪ **Notion / Linear** import bridges

### Collaboration
- ⚪ **Teams collaboration** — multi-user cabinets, presence, comments, permissions
- ⚪ **Cabinet Cloud** (optional) — sync across machines, share a cabinet with a teammate ([waitlist](https://runcabinet.com/waitlist))
- ⚪ **Shared agent libraries** — publish a team's agents, install across cabinets

### Localization & accessibility
- ⚪ **RTL support** — Hebrew, Arabic, Persian, Urdu — right-to-left layout for sidebar, editor, and agent panels
- ⚪ **Multi-language UI** — Spanish, French, German, Portuguese, Japanese, Chinese, more (community-translated)
- ⚪ **Localized agent personas** — built-in personas that speak the user's language by default
- ⚪ **Translated docs & templates** — public docs and starter cabinets in the top-supported languages
- ⚪ **Locale-aware dates & numbers** — calendar, schedule pickers, and reports respect system locale

### AI quality
- ⚪ **Per-agent memory consolidation** — distill long histories into durable facts
- ⚪ **Cross-agent context** — leads can read specialist transcripts without copy-paste
- ⚪ **Routine self-tuning** — agents propose schedule + prompt edits based on outcomes

### Knowledge base
- ⚪ **Better nested cabinet docs** + nav
- ⚪ **Import / export workflows** — Obsidian vault, Notion export, generic markdown trees
- ⚪ **Migration guides** between Cabinet versions
- ⚪ **More example cabinets** on [cabinets.sh](https://cabinets.sh)

---

## 🟣 Wishlist (not committed)

Things we're thinking about, not promising:

- Local-only mode that hides cloud providers entirely (already an opt-in flag — make it a first-class install)
- Voice mode for agents (TTS reports, voice dispatch)
- A read-only public cabinet share link
- An MCP server so other apps can read your cabinet

---

## How this changes

The roadmap moves with each release. Cabinet ships fast — see the [changelog ↗](https://github.com/hilash/cabinet/blob/main/CHANGELOG.md) for what landed last week. Want to push something up the list? Open a discussion in the [Discord](https://discord.gg/hJa5TRTbTH).
