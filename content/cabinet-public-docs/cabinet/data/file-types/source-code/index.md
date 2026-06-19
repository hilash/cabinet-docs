---
title: "Source code"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - code
order: 7
---

# Source code

Files: <code>.js .ts .tsx .jsx .json .css .html .py .go .rs .swift .kt .java .rb .php .sh .yaml .yml .toml .sql .md .mjs</code> (and more).

Source files render with a <mark data-color="yellow">syntax-highlighted viewer</mark>. Cabinet picks the right language by file extension and themes it to match light or dark mode. Toggle the source view to see the file as plain text.

## Live example

This folder has a real file: [`example-persona.yaml`](./example-persona.yaml). Inline:

```yaml
name: GTM Lead
emoji: "🎯"
role: Launch strategy
type: lead
model: claude-opus-4-8
canDispatch: true
heartbeats:
  - cron: "0 9 * * 1"
    label: "Monday standup"
    prompt: "Open the launch room. Report what changed since Friday."
  - cron: "0 17 * * 5"
    label: "Friday wrap"
    prompt: "Draft Monday's launch checklist."
skills:
  - competitor-brief
  - launch-checklist
budget:
  daily:
    maxCostUsd: 10
```

That's the same shape an agent's <code>persona.md</code> uses — Cabinet's own configuration is just YAML files.

## More languages

```typescript
// TypeScript
type Persona = {
  name: string;
  type: "lead" | "specialist";
  heartbeats: { cron: string; prompt: string }[];
};
```

```python
# Python
def fire_heartbeat(persona: Persona) -> None:
    if datetime.now() >= persona.next_run:
        run_agent(persona)
```

```rust
// Rust
fn dispatch(action: Action) -> Result<Approval, Error> {
    queue.push(Approval::pending(action))
}
```

## Why this matters in a knowledge base

A cabinet often sits next to a code repo (or *contains* a [linked git repo](../linked-content/)). Being able to <span class="tx-accent">see and search the code</span> alongside the notes that explain it means:

- An agent that documents your codebase can read both at once.
- A meeting note can `[link to](../../my-repo/src/agents/run.ts)` and the link works.
- A project handoff page can reference real files in the same tree.

## What agents see

Agents see source files as plain text — same as any other file. `@`-mention a file in a task and the agent gets its full contents (subject to context limits and visibility scope).

```yaml
prompt: |
  @file:my-repo/src/agents/run.ts
  Suggest a refactor that extracts the retry logic into a helper.
```

For repository-level reasoning, use a [linked git repo](../linked-content/) — the agent gets commit history and branch context as well.

## Read on

- [Linked content](../linked-content/) — `.repo.yaml` and symlinks.
- [Markdown editor](../../editor/) — code blocks inline in pages.
