---
title: "Principles"
created: "2026-05-09T00:00:00.000Z"
modified: "2026-05-09T00:00:00.000Z"
status: draft
tags:
  - concepts
  - philosophy
  - principles
order: 14
---

# Principles

Cabinet is built around a few principles we think matter deeply for the future of AI + data tools. Every product decision gets weighed against these.

## <span class="tx-amber">Yours</span>

Your data stays yours: <mark data-color="yellow">local, visible, and portable</mark>. It's not trapped inside a particular AI provider's system with no clean way to get it out. Plain markdown files on your disk. <code>ls</code> and you see your work. Move the folder, the cabinet moves with it.

## <span class="tx-purple">Git everything</span>

Memory should have history. You should be able to <mark data-color="green">inspect changes, revert mistakes, audit how knowledge evolves</mark>, and treat your AI system like the important infrastructure it is. Every save auto-commits. Full diff viewer. Restore any page to any point in time.

## <span class="tx-accent">BYOAI</span>

Bring your own AI. Cabinet should work with <mark data-color="yellow">Claude, Codex, OpenCode, local models, and whatever comes next</mark>, without forcing your knowledge into a single provider's ecosystem. See [Bring your own AI](../../cabinet/agents/byoai/) for the supported list.

## <span class="tx-green">KISS</span>

Keep it simple, stupid. AI tools should be <mark data-color="amber">understandable, inspectable, and hackable</mark>. We prefer plain files, clear behavior, and systems that developers can actually reason about. If a feature can't be explained in a paragraph, it usually shouldn't ship.

## <span class="tx-red">Security</span>

We care deeply about security. If AI is going to work with your documents, research, plans, and internal context, the system should <mark data-color="red">minimize surprise, reduce unnecessary exposure, and make trust a design requirement</mark> — not an afterthought. Every dispatched piece of work runs through a [human approval queue](../../cabinet/agents/conversations-and-approvals/) before it touches the outside world.

## <span class="tx-amber">Self-hosted</span>

If AI is going to hold your context, plans, research, and operating memory, it should <mark data-color="green">run in an environment you control</mark>. Cabinet is open source. Self-hosted by default. Your data never leaves your machine unless you point an agent at a cloud model — and even then, only the prompts and outputs of that one call.

## How these compose

These six aren't independent — they reinforce each other:

- <span class="tx-accent">**Yours + Git everything**</span> = your knowledge is auditable forever.
- <span class="tx-accent">**BYOAI + Self-hosted**</span> = no vendor lock-in, no hostage data.
- <span class="tx-accent">**KISS + Security**</span> = a system you can trust because you can read it.

If a feature would break any of these, it doesn't make it in.

## Read on

- [Philosophy](../../philosophy/) — the 90-second pitch.
- [Cabinet vs the alternatives](../comparison/) — how these principles play out vs Obsidian and Notion.
- [Bring your own AI](../../cabinet/agents/byoai/) — BYOAI in practice.
