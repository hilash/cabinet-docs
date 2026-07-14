---
title: "Tips & best practices"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - tips
  - guides
  - best-practices
order: 35
---

# Tips & best practices

The small habits that compound. Skim by section.

## Getting the best results from agents

> **Anchor every agent to a folder.** Agents that own a folder write predictable things in predictable places. Agents that "help with everything" produce noise that's hard to revisit. Pick a folder, name it after the work, point the agent at it.

> **Write the system prompt like a job description.** Title, scope, what they own, what they should never do, how they hand off. <mark data-color="green">Avoid abstractions.</mark> "Always write to /sales/changelog.md" beats "stay organized."

> **Set <code>visibility</code> deliberately.** A specialist with <code>visibility: folder</code> is fast and cheap. A lead with <code>visibility: cabinet</code> is aware. Almost nobody needs <code>visibility: all</code>.

> **Use heartbeats for the morning, not the moment.** A heartbeat that fires every 15 minutes is a notification system. A heartbeat that fires once a day at 9am is a teammate.

> **Default heartbeats to silence.** Write the prompt so the agent only escalates *new* or *important* findings. The good ones run for weeks without paging you.

## CLI power user

> **<kbd>⌘N</kbd> from anywhere opens the task composer.** The fastest path from "I want X" to a queued task.

> **<kbd>?</kbd> opens the searchable shortcut sheet.** Filter by name or key. Better than memorizing.

> **<kbd>⌘`</kbd> toggles the web terminal.** A real shell in the workspace. <span class="tx-accent">Use it for `git log`, `find`, quick scripts.</span>

> **<kbd>⌘K</kbd> + <code>>command</code> jumps straight to a command.** Like Spotlight but for Cabinet actions.

> **<code>/save</code> in any chat persists the conversation as a page.** No more "this was a great chat, where did it go."

> **<code>/compact</code> shortens a long chat without losing the highlights.** Useful before a hand-off to another agent.

## Context files & mentions

> **<code>@PageName</code> attaches a page as agent context.** Works in chats, task composers, and skill prompts.

> **<code>@folder/</code> attaches a whole folder.** The agent gets the directory listing plus the index page.

> **<code>[[Page Name]]</code> wiki-links autocomplete.** Type two brackets, start the title, hit tab.

> **<code>AGENTS.md</code> at any folder root is auto-loaded.** Use it like <code>CLAUDE.md</code> — write the working agreements for that area of the cabinet.

## Memory & skills

> **Edit <code>memory.md</code> like any page.** If an agent learned something wrong, just open the file and fix it. <mark data-color="green">No magic, no migration.</mark>

> **Memory should fit on one screen.** When an agent's <code>memory.md</code> grows past ~200 lines, run <code>/compact memory</code> in their chat. Cabinet rewrites it shorter.

> **Skills are folders. Treat them like libraries.** Version them, write a README, ship them to skills.sh when they're useful to others.

> **An empty <code>allowed-tools</code> list is the safest skill.** Read-only skills never break anything.

## Performance & cost

> **Cheap model for triage, careful model for synthesis.** Use Haiku/GPT-4.1-mini for inbox sweeps and dispatch. Save Opus for the weekly synthesis.

> **Set per-task budgets in <code>.cabinet</code>.** A single hard cap (<code>budget.perTask.maxCostUsd: 5</code>) prevents runaway runs.

> **Fallback chains save the day.** Configure <code>fallbacks.claude-opus-4-8</code> to drop to Sonnet, then GPT, when the primary 429s.

> **Local models for private data.** Ollama + a 70B model is competent for most internal work. <span class="tx-accent">Zero API spend.</span>

> **Avoid <code>visibility: all</code> on lead agents.** It pulls the whole cabinet into context on every run. Cost adds up quickly.

## Privacy & local-first

> **Cabinet is local-first, not network-free.** Your cabinet stays on disk, while update checks, optional anonymous telemetry, AI CLIs, and connected integrations can make network requests. Review Settings → Privacy and each provider's terms.

> **<code>.gitignore</code> what shouldn't be shipped.** Default: <code>.chat/</code>, <code>.cabinet-state/</code>, <code>.cabinet.db</code>. Add anything cabinet-specific (raw client lists, API keys you accidentally committed).

> **Review every template submission manually.** The v0.5.1 CLI has no publish command that automatically strips secrets for you.

> **CABINET_DATA_DIR can be encrypted.** Cabinet doesn't care where its files live. Point it at a FileVault / LUKS volume.

## Publishing & templates

> **Test your template from a fresh clone.** Open or run the clean clone as a cabinet and verify its agents, jobs, and sample data before submitting it.

> **The <code>description</code> field on <code>.cabinet</code> is your hook.** ≤80 chars, present tense, action-oriented. <span class="tx-accent">"Run your job search like a sales pipeline"</span> beats "A cabinet for searching jobs."

> **Strip your real data before publishing.** Replace your CSV rows with synthetic ones. Make it obvious. Real users will fill in their own.

> **Pin model names that exist.** A template that says <code>model: claude-3-7</code> breaks for everyone after the model retires. Use the <code>defaults</code> in the manifest so users can override.

> **Document heartbeats in the body of <code>persona.md</code>.** When the install confirmation prompts the user, the heartbeat label is what they read.

## Read on

- [Install](../../install/) — start here if you haven't.
- [Agents](../../cabinet/agents/) — the conceptual model.
- [Templates](../../templates/) — the registry.
