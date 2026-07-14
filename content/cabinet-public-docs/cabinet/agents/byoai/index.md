---
title: "Bring your own AI"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-07-14T00:00:00.000Z"
status: draft
tags:
  - agents
  - byoai
  - providers
order: 7
---

# Bring your own AI

Cabinet doesn't resell inference. <mark data-color="yellow">You connect an AI CLI you already use</mark>, and Cabinet starts that tool locally for agent work. Your provider subscription, account, and limits remain between you and that provider.

<div data-demo="byoai" data-caption="Click providers on or off — see which models become available."></div>

## Supported providers in v0.5.1

| Provider | Local CLI adapter | Authentication |
| --- | --- | --- |
| **Anthropic Claude** | Claude Code | Claude subscription and setup-token/login flow |
| **OpenAI** | Codex CLI | Codex browser login |
| **Google** | Gemini CLI | Gemini CLI login |
| **OpenCode** | OpenCode | Interactive provider login |
| **Pi** | Pi | Interactive provider login |
| **xAI** | Grok CLI | xAI API key / Grok CLI setup |
| **GitHub** | Copilot CLI | GitHub Copilot login |
| **Cursor** | Cursor CLI | Cursor login |

Cabinet can detect CLIs installed with npm, pnpm, Bun, Homebrew, and common user-level binary paths. Available models are read from each adapter; they can differ as providers update their CLIs and subscriptions.

## Guided setup

Open **Settings → Providers** and select a provider. The v0.5.1 setup dialog walks through three stages:

1. **Install** — Cabinet offers the provider's supported install command.
2. **Sign in** — browser authentication opens outside Electron when needed; interactive CLI flows run in an embedded terminal.
3. **Verify** — Cabinet re-probes the executable and authentication state before marking it ready.

The same setup dialog remains available for a provider that is already ready, so you can repair or change its login. If no provider is available, the home screen points you to setup.

## Pick a model and effort

Choose a default provider/model in Settings, on an agent, or for an individual task. The composer can override the agent default for one run. Providers that expose reasoning controls also show their supported effort levels.

Do not copy model identifiers from old documentation: provider CLIs change their catalogs. Use the model picker populated by the installed adapter.

## Where prompts go

Cabinet starts the selected provider CLI as a local child process in the cabinet's working directory. The provider CLI then communicates with its own service under that provider's terms. Cabinet does not proxy the prompt through a Cabinet inference service or add an inference markup.

Your pages, personas, and saved run artifacts remain in the cabinet directory. Provider authentication stays in the provider's own CLI configuration or in the Cabinet environment value used for that adapter.

## Read on

- [Persona](../persona/) — agent identity and default model.
- [Routines](../routines/) — scheduled work.
- [Integrations](../../../integrations/) — MCP tools are separate from AI runtime providers.
