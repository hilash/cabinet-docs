---
title: "Integrations"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - integrations
  - providers
  - connectors
order: 40
---

# Integrations

What Cabinet connects to. Grouped by category, with status pills.

## AI providers

Cabinet is <mark data-color="yellow">bring-your-own-AI</mark>. Connect the providers you already pay for; Cabinet routes your agents' calls. There's no Cabinet middleman, no inference markup.

| Provider | Best for | Status |
| --- | --- | --- |
| **Anthropic Claude** | Long careful writing, strong reasoning | <span class="tx-green">live</span> |
| **OpenAI GPT** | Fast triage, cheap routing, strong tool use | <span class="tx-green">live</span> |
| **Google Gemini** | Long-context research, low cost per token | <span class="tx-green">live</span> |
| **xAI Grok** | Fresh news access, lighter tasks | <span class="tx-green">live</span> |
| **Local — Ollama / LM Studio** | Offline, private, no API bill | <span class="tx-green">live</span> |
| **OpenRouter** | One key, many providers, automatic fallback | <span class="tx-amber">soon</span> |
| **Together / Groq / Replicate** | Specialty model hosts | <span class="tx-amber">soon</span> |

→ Read [BYOAI](../cabinet/agents/byoai/) for routing, fallbacks, budgets.

## Tool servers (MCP)

[Model Context Protocol](https://modelcontextprotocol.io) servers add tool surfaces to your agents. Cabinet connects via stdio or HTTP transport.

| MCP server | What it gives agents | Status |
| --- | --- | --- |
| **filesystem** | Read/write inside a folder (built-in) | <span class="tx-green">live</span> |
| **chrome-devtools** | Drive a browser, take screenshots | <span class="tx-green">live</span> |
| **github** | Issues, PRs, file ops, search | <span class="tx-green">live</span> |
| **gws (Google Workspace)** | Sheets / Drive / Gmail / Calendar via service account | <span class="tx-green">live</span> |
| **playwright** | Heavier browser automation | <span class="tx-green">live</span> |
| **figma** | Read components and designs | <span class="tx-green">live</span> |
| **stripe** | Customer / subscription / invoice ops | <span class="tx-green">live</span> |

Add an MCP server to a cabinet by writing one file at <code>.mcp/servers.json</code> — Cabinet picks it up on next boot.

## Connectors (live messaging surfaces)

Push notifications, approve from your phone, trigger tasks from a DM.

| Connector | What it does | Status |
| --- | --- | --- |
| **Slack** | Trigger tasks, get approvals, receive briefings | <span class="tx-amber">soon</span> |
| **Telegram** | DM your agents. Approve from the lock screen. | <span class="tx-amber">soon</span> |
| **Discord** | Channel-driven approvals + briefings | <span class="tx-amber">soon</span> |
| **Email (IMAP/SMTP)** | Inbox triage, draft replies, follow-ups | <span class="tx-amber">soon</span> |
| **SMS (Twilio)** | One-line approvals on the road | <span class="tx-amber">soon</span> |
| **iMessage (BlueBubbles)** | Mac-only iMessage bridge | <span class="tx-amber">later</span> |

Each connector ships as an MCP server + a Cabinet plugin. Authorization is OAuth where possible, scoped tokens where not.

## File sources

Beyond editing files in the cabinet folder, Cabinet can <span class="tx-accent">read your data where it already lives</span>.

| Source | How it's wired | Status |
| --- | --- | --- |
| **Symlinks ("Load Knowledge")** | Right-click → Load Knowledge → pick a folder | <span class="tx-green">live</span> |
| **Linked git repos** | Folder with <code>.repo.yaml</code> | <span class="tx-green">live</span> |
| **Embedded apps** | Folder with <code>index.html</code> | <span class="tx-green">live</span> |
| **Google Workspace pages** | Markdown page with <code>google:</code> frontmatter | <span class="tx-green">live</span> |
| **Office docs** | <code>.docx</code> / <code>.xlsx</code> / <code>.pptx</code> render inline read-only | <span class="tx-green">live</span> |
| **Notion import** | Read-only import from a Notion workspace | <span class="tx-amber">soon</span> |
| **Obsidian vault adoption** | Open an Obsidian vault as a cabinet (zero conversion) | <span class="tx-green">live</span> |

## Skill marketplaces

Where agents pick up new instructions.

| Marketplace | What's there | Status |
| --- | --- | --- |
| **skills.sh** | Public registry of agent skills, with security scans | <span class="tx-green">live</span> |
| **GitHub URLs** | Install from any public repo with a <code>SKILL.md</code> at the root | <span class="tx-green">live</span> |
| **Bundled** | Common skills (research synthesis, code review, doc edits) ship with the app | <span class="tx-green">live</span> |

→ Read [Skills](../cabinet/agents/skills/) for how a SKILL.md is structured and the security model.

## Template marketplaces

Where you find pre-built cabinets.

| Marketplace | What's there | Status |
| --- | --- | --- |
| **cabinets.sh** | Public registry of plug-and-play cabinets — full AI teams in one folder | <span class="tx-green">live</span> |
| **GitHub URLs** | Install any public repo with a <code>.cabinet</code> at the root | <span class="tx-green">live</span> |
| **Local folders** | <code>npx cabinets add ./my-template</code> works on local paths too | <span class="tx-green">live</span> |

## Smart home & devices

| Integration | What it does | Status |
| --- | --- | --- |
| **Home Assistant** | Cabinet as the brain on top of your HA setup | <span class="tx-amber">later</span> |
| **Voice (TTS / Whisper)** | Voice in / voice out for agent chats | <span class="tx-amber">soon</span> |

## Read on

- [BYOAI](../cabinet/agents/byoai/) — provider routing, fallbacks, local-only mode.
- [Skills](../cabinet/agents/skills/) — the security model around installable instructions.
- [Templates](../templates/) — pre-built cabinets you install in one command.
- [Reference → Manifest schema](../reference/manifest-schema/) — where provider routing config lives.
