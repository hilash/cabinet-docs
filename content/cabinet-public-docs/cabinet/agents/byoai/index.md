---
title: "Bring your own AI"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - byoai
  - providers
order: 7
---

# Bring your own AI

Cabinet doesn't host inference. <mark data-color="yellow">You connect the providers you already pay for</mark>, and Cabinet routes your agents' calls to them. There's no Cabinet middleman, no inference markup, no opaque quota. <span class="tx-green">You pay your own bill, you use your own quota.</span>

<div data-demo="byoai" data-caption="Click providers on or off — see which models become available."></div>

## Supported providers today

Cabinet runs through a <mark data-color="yellow">**provider adapter layer**</mark>. As of **v0.4.0**, eight CLI providers ship in the default runtime — all local, so your prompts go through a tool you've already installed and authenticated:

| Adapter | Provider | Install |
| --- | --- | --- |
| <mark data-color="amber">**`claude_local`**</mark> | **Anthropic Claude** (via [Claude Code CLI](https://www.anthropic.com/claude-code)) | <code>npm install -g @anthropic-ai/claude-code</code> |
| <mark data-color="green">**`codex_local`**</mark> | **OpenAI GPT** (via [Codex CLI](https://github.com/openai/codex)) | <code>npm install -g @openai/codex</code> or <code>brew install --cask codex</code> |
| <mark data-color="blue">**`gemini_local`**</mark> | **Google Gemini** (via Gemini CLI) | See provider docs |
| <mark data-color="purple">**`opencode_local`**</mark> | **OpenCode** | See provider docs |
| <mark data-color="amber">**`pi_local`**</mark> | **Pi** (Inflection) | See provider docs |
| | + 3 more CLI providers | See [provider settings in app](#) |

You need <span class="tx-accent">**at least one**</span> CLI installed. The defaults Cabinet boots with are `claude_local` and `codex_local`; everything else turns on per-agent. Each adapter has shared runtime controls — model picker, effort sliders, dynamic `listModels()`, brand icons.

## Coming next

Direct API access (no CLI required) and more open-weights models are on the way:

| Provider | How it'll connect | Status |
| --- | --- | --- |
| **Hermes** (Nous) | Local via Ollama | <span class="tx-amber">Planned</span> |
| **Llama / Mistral / Qwen** | Local via Ollama | <span class="tx-amber">Planned</span> |
| **LM Studio** | Local, no key | <span class="tx-amber">Planned</span> |
| **Anthropic API (direct)** | API key, no CLI required | <span class="tx-amber">Planned</span> |
| **OpenAI API (direct)** | API key, no CLI required | <span class="tx-amber">Planned</span> |
| **xAI Grok** (direct) | API key | <span class="tx-amber">Planned</span> |
| **Image generation** | FLUX, DALL·E, local SD | <span class="tx-amber">Planned</span> |

Track progress on the [Roadmap](../../../roadmap/).

## Why a mix of models

Most AI products lock you to one model behind one API. Cabinet's bet is the opposite: <mark data-color="amber">your team should be a mix of models</mark>, picked per job. The strategy lead runs on Opus because it writes carefully. The triage agent runs on Haiku because it's cheap and fast. The local agent runs on a local model because the data is sensitive. <span class="tx-accent">Same cabinet, different brains.</span>

## What each provider is good for

| Provider | Strengths | When to pick |
| --- | --- | --- |
| <mark data-color="amber">**Anthropic Claude**</mark> | Long careful writing, strong reasoning, big context | Defaults for leads, editors, anything where tone matters |
| <mark data-color="green">**OpenAI GPT**</mark> | Fast, cheap, strong tool use | Triage, dispatchers, high-volume routine work |
| <mark data-color="blue">**Google Gemini**</mark> | Long context, low cost per token, vision | Research synthesis, document QA, long-form summaries |
| <mark data-color="purple">**xAI Grok**</mark> | Fresh news access, lighter touch | Trend analysts, social listening |
| **Local (Ollama / LM Studio)** | Offline, private, free | Sensitive data, air-gapped work, hobby experiments |

## Setting an agent's model

In <code>persona.md</code>:

```yaml
---
name: GTM Lead
model: claude-opus-4-8      # the default for this agent
---
```

Or override per task at the composer:

```
┌───────────────────────────────────┐
│  → GTM Lead   ▾  gpt-4.1   ▾     │   ← override the model here
│  ◯ low  ● medium  ◯ high          │
└───────────────────────────────────┘
```

Or per heartbeat:

```yaml
heartbeats:
  - cron: "0 9 * * 1-5"
    model: claude-haiku-4-5    # cheap for the daily pulse
    prompt: "Inbox triage."
  - cron: "0 17 * * 5"
    model: claude-opus-4-8     # opus for the weekly synthesis
    prompt: "Friday wrap."
```

## Routing rules

In <code>.cabinet</code> you can set <span class="tx-accent">global routing</span>:

```yaml
providers:
  defaults:
    lead: claude-opus-4-8
    specialist: claude-sonnet-4-6
    triage: gpt-4.1
  fallbacks:
    claude-opus-4-8:
      - claude-sonnet-4-6
      - gpt-4.1
  budgets:
    daily:
      maxCostUsd: 25
    perTask:
      maxCostUsd: 5
```

If a request hits a budget cap or a 429, Cabinet falls back to the next model in the list and writes a note in the run transcript.

## What Cabinet never does

- Forwards your prompts to a Cabinet-hosted backend.
- Caches your prompts for "model improvement."
- Charges you for inference.
- Locks you to a provider after install.

If you delete your API key, the provider disappears. <mark data-color="green">Your prompts and outputs stay in your cabinet folder, on your disk.</mark>

## Local-only mode

Want every call to stay on your machine? Set <code>providers.localOnly: true</code> in <code>.cabinet</code>:

```yaml
providers:
  localOnly: true
  defaults:
    lead: ollama/llama-3.3-70b
    specialist: ollama/qwen-2.5-coder
```

Cabinet refuses any non-local provider. If an agent's persona points at <code>claude-opus-4-8</code>, the run errors with a clear "local-only" message instead of silently falling through.

## Read on

- [Persona](../persona/) — where you set an agent's model.
- [Routines](../routines/) — per-routine model overrides.
- [Tips → Performance & cost](../../../guides/tips/) — the cheap-fast / careful-slow recipe.
