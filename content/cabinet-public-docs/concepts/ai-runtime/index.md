---
title: "AI Runtime"
created: "2026-05-09T00:00:00.000Z"
modified: "2026-05-09T00:00:00.000Z"
status: draft
tags:
  - concepts
  - architecture
  - ai-runtime
order: 16
---

# AI Runtime

How an agent's call actually reaches a model — and what's between you and the inference.

## The adapter layer

Every AI call in Cabinet — a task, a routine, a heartbeat, a chat message — flows through a <mark data-color="yellow">**provider adapter**</mark>. The adapter knows how to talk to one specific provider. Cabinet itself doesn't know which model it's calling, just that it asked an adapter to run a prompt and got a transcript back.

```
agent persona / task brief
        ↓
provider adapter  ──→  Claude Code CLI / Codex CLI / (future: API / local)
        ↓
persisted conversation + live transcript view
```

This split matters because it means Cabinet can support <span class="tx-green">new providers without changing how agents are written</span>. A new adapter ships, the existing personas just gain a new option in their `model:` field.

## What ships today

Two adapters are in default builds:

- <mark data-color="amber">**`claude_local`**</mark> — talks to the [Claude Code CLI](https://www.anthropic.com/claude-code) on your machine.
- <mark data-color="green">**`codex_local`**</mark> — talks to the [Codex CLI](https://github.com/openai/codex) on your machine.

Both are <span class="tx-accent">local CLI providers</span> — you authenticate the CLI once with your own account, and Cabinet uses it as a subprocess. Your prompts don't go through a Cabinet-hosted backend. There's no Cabinet API key.

See [Bring your own AI](../../cabinet/agents/byoai/) for the full provider list and what's coming next.

## Conversations and transcripts

Every adapter run is <mark data-color="yellow">persisted as a conversation</mark> — a stream of messages with timestamps, tool calls, and outputs. While a run is in progress, you watch the transcript live in the [Approval Queue](../../cabinet/agents/conversations-and-approvals/) or in the agent's workspace. After it finishes, the conversation lands in the cabinet folder so you can scroll, search, or `git log` it.

This is the difference between <span class="tx-accent">"the agent ran"</span> and <span class="tx-accent">"the agent did this, you can read every step"</span>.

## Per-run overrides

A persona declares a default model. A routine, a task, or even a single dispatch can override it.

```yaml
# In persona.md — the default
---
name: GTM Lead
model: claude-opus-4-7
---

# In a routine — Friday wraps go on Opus, daily pulses on Haiku
heartbeats:
  - cron: "0 9 * * 1-5"
    model: claude-haiku-4-5
    prompt: "Inbox triage."
  - cron: "0 17 * * 5"
    model: claude-opus-4-7
    prompt: "Friday wrap."
```

You can also pick model and reasoning effort right at the composer when you launch a one-off task:

```
┌─────────────────────────────────────────┐
│ → GTM Lead   ▾  gpt-4.1   ▾             │
│ ◯ low  ● medium  ◯ high                 │
└─────────────────────────────────────────┘
```

## The terminal still exists

Cabinet ships with a <mark data-color="purple">**web terminal**</mark> — an interactive local AI CLI inside the browser. It's not the only way agents run anymore (the adapter layer is), but it stays as a first-class surface for:

- Direct CLI sessions when you want to drive the agent yourself.
- Debugging adapter behavior.
- Future terminal-native features (Cabinet-managed tmux-style workspaces).

You can ignore it if you're working entirely through the agent dispatch UI.

## Read on

- [Bring your own AI](../../cabinet/agents/byoai/) — the supported provider list.
- [Conversations & approvals](../../cabinet/agents/conversations-and-approvals/) — what happens before a run actually fires.
- [Tasks](../../cabinet/agents/tasks/) — the dispatch surface that creates these runs.
- [Persona](../../cabinet/agents/persona/) — where you set an agent's default model.
