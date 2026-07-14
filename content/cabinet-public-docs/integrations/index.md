---
title: "Integrations"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-07-14T00:00:00.000Z"
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

Cabinet is <mark data-color="yellow">bring-your-own-AI</mark>. In v0.5.1, Settings guides you through installing, signing in to, and verifying supported local CLI providers.

| Provider | Best for | Status |
| --- | --- | --- |
| **Claude Code** | Anthropic models | <span class="tx-green">live</span> |
| **Codex CLI** | OpenAI models | <span class="tx-green">live</span> |
| **Gemini CLI** | Google models | <span class="tx-green">live</span> |
| **OpenCode / Pi** | Multi-provider model catalogs | <span class="tx-green">live</span> |
| **Grok CLI** | xAI models, including Grok 4.5 | <span class="tx-green">live</span> |
| **GitHub Copilot CLI / Cursor CLI** | Models available to those subscriptions | <span class="tx-green">live</span> |

→ Read [BYOAI](../cabinet/agents/byoai/) for provider setup, model selection, and where prompts go.

## Integrations Hub (MCP)

[Model Context Protocol](https://modelcontextprotocol.io) servers add tool surfaces to your agents. Cabinet's tabbed Integrations Hub includes guided configuration for local stdio servers, hosted HTTP servers, OAuth flows, and user-supplied MCP endpoints. Catalog availability does not grant access by itself: each service still requires its own account and authorization.

| MCP server | What it gives agents | Status |
| --- | --- | --- |
| **Slack, Google Workspace, Microsoft 365** | Messaging, mail, calendars, drives, docs, and teams | <span class="tx-green">available</span> |
| **GitHub, Linear, Jira & Confluence, Notion** | Code and project knowledge | <span class="tx-green">available</span> |
| **Stripe, Snowflake, LinkedIn** | Payments, data, and professional workflows | <span class="tx-green">available</span> |
| **Telegram, Discord** | Messaging and remote agent interaction | <span class="tx-green">available</span> |
| **Meta Ads** | Official hosted Meta marketing tools; includes a daily reporter agent | <span class="tx-green">available in v0.5.1</span> |
| **StackAdapt** | Campaign and reporting tools through Cabinet's StackAdapt MCP package | <span class="tx-green">available in v0.5.1</span> |
| **Sentry, Asana, HubSpot, ClickUp, Box, monday.com, Shopify, Figma, Salesforce** | Official hosted or vendor-published endpoints | <span class="tx-green">catalogued</span> |
| **Community/BYO endpoints** | Zapier, Make, Miro, Motion, Clockwise, and more | <span class="tx-amber">bring an endpoint or self-host</span> |

Vendor trust badges distinguish official, vendor-published, and community endpoints. A badge describes the publisher relationship; it is not a security guarantee. Review the requested scopes before connecting.

## File sources

Beyond editing files in the cabinet folder, Cabinet can <span class="tx-accent">read your data where it already lives</span>.

| Source | How it's wired | Status |
| --- | --- | --- |
| **Symlinks ("Load Knowledge")** | Right-click → Load Knowledge → pick a folder | <span class="tx-green">live</span> |
| **Linked git repos** | Folder with <code>.repo.yaml</code> | <span class="tx-green">live</span> |
| **Embedded apps** | Folder with <code>index.html</code> | <span class="tx-green">live</span> |
| **Google Workspace pages** | Markdown page with <code>google:</code> frontmatter | <span class="tx-green">live</span> |
| **Office docs** | <code>.docx</code> / <code>.xlsx</code> / <code>.pptx</code> render inline read-only | <span class="tx-green">live</span> |
| **Notion export** | Import a Notion export ZIP as local Markdown | <span class="tx-green">live</span> |
| **Apple Notes** | Import notes as local Markdown on macOS | <span class="tx-green">live</span> |
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
| **Local folders** | Open a clean template folder directly as a cabinet for testing | <span class="tx-green">live</span> |

## Smart home & devices

| Integration | What it does | Status |
| --- | --- | --- |
| **Home Assistant** | Cabinet as the brain on top of your HA setup | <span class="tx-amber">later</span> |
| **Voice (TTS / Whisper)** | Voice in / voice out for agent chats | <span class="tx-amber">soon</span> |

## Read on

- [BYOAI](../cabinet/agents/byoai/) — provider setup and model selection.
- [Skills](../cabinet/agents/skills/) — the security model around installable instructions.
- [Templates](../templates/) — pre-built cabinets you install in one command.
- [Reference → Manifest schema](../reference/manifest-schema/) — the cabinet identity and structure marker.
