---
title: "Heartbeats"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - agents
  - heartbeats
order: 2
---

# Heartbeats

A heartbeat is the difference between an assistant you have to summon and a teammate who shows up.

It's a <mark data-color="yellow">cron-scheduled prompt</mark> attached to a persona. Every weekday at 9am, every Friday at 5pm, every hour, whatever — at that moment Cabinet wakes the agent, hands them the prompt, and lets them decide whether anything needs doing. <span class="tx-green">If nothing changed, the heartbeat ends silently.</span> If something needs your attention, it shows up in the [Approval Queue](../conversations-and-approvals/) or as a new page in the cabinet.

<div data-demo="heartbeat-clock" data-caption="A real day's heartbeats firing across the team."></div>

## Heartbeats vs. routines vs. tasks

Three rhythms. They look similar. They're different on purpose.

| | When | What it is | What it produces |
| --- | --- | --- | --- |
| **Task** | Once | A specific piece of work | A page, a draft, a result |
| **Routine** | On a schedule | A task that recurs | The same thing, every Friday |
| **Heartbeat** | On a schedule | A *check-in* to decide what to do | Maybe nothing. Maybe a proposal. Maybe a page. |

A routine knows what it'll produce. <mark data-color="amber">A heartbeat doesn't.</mark> The agent looks around and decides.

## The shape of a heartbeat

Heartbeats live in the persona's frontmatter:

```yaml
---
name: GTM Lead
heartbeats:
  - cron: "0 9 * * 1"
    label: "Monday standup"
    prompt: "Open the launch room. Report what changed since Friday."

  - cron: "0 17 * * 5"
    label: "Friday wrap"
    prompt: "Draft next Monday's launch checklist."

  - cron: "*/30 9-18 * * 1-5"
    label: "Workday pulse"
    prompt: "Skim /marketing/inbox/. Flag anything labeled 'urgent'."
---
```

Three fields per beat:

- <code>cron</code> — standard 5-field cron expression. <span class="tx-accent">Use [crontab.guru](https://crontab.guru)</span> if you need a translator.
- <code>label</code> — optional name shown in the schedule UI.
- <code>prompt</code> — what the agent reads when the heartbeat fires.

## Common cron patterns

| Pattern | Reads as | Good for |
| --- | --- | --- |
| `0 9 * * 1-5` | weekdays at 9am | Morning standup |
| `0 17 * * 5` | Fridays at 5pm | Weekly wrap |
| `30 11 * * 1-5` | weekdays at 11:30 | Pre-lunch sweep |
| `0 */4 * * *` | every 4 hours | Inbox / feed scanner |
| `*/15 9-18 * * 1-5` | every 15 min, business hours, weekdays | High-frequency monitoring |
| `0 0 1 * *` | 1st of every month | Monthly report |

## What a heartbeat sees

When a heartbeat fires, the agent gets:

1. The <span class="tx-accent">prompt</span> from the heartbeat.
2. The agent's <span class="tx-accent">persona prompt</span>.
3. Their <span class="tx-accent">memory</span> file.
4. Whatever folder is in scope (their <code>visibility</code>).

That's it. No conversation history, no other agents, no full cabinet read. <mark data-color="green">Heartbeats are intentionally tight.</mark> They run quickly, they cost less, and they're predictable.

If the agent decides work needs to happen, it can:

- **Write** a page (e.g., a daily briefing).
- **Propose** a task or job → goes to the Approval Queue.
- **Update** memory and exit.
- **Do nothing** and exit.

## Designing a heartbeat that doesn't get annoying

A heartbeat that pings you every time it runs gets muted within a week. Two rules:

> **Tip — Default to silence.** Write the prompt so the agent only escalates *new* or *important* findings. Encourage it to update its memory and stay quiet otherwise.

> **Tip — Anchor to a file, not a topic.** "Check /sales/pipeline.csv" beats "Check on sales." A heartbeat that has a specific page to read writes a specific page back.

Bad heartbeat:

```yaml
- cron: "0 9 * * *"
  prompt: "Tell me what's important today."
```

Better:

```yaml
- cron: "0 9 * * 1-5"
  label: "Inbox triage"
  prompt: |
    Read /inbox/today.md. Group items by urgency.
    Write the result to /briefings/$DATE.md.
    If you see anything that contradicts /briefings/yesterday.md,
    flag it in a separate "Conflicts" section.
    Only @mention me if there's a P0.
```

## Pausing a heartbeat

Three options, in order of permanence:

1. **Disable** — open the agent in the AI team panel, click the heartbeat, toggle it off. Reversible in one click.
2. **Comment it out** — open <code>persona.md</code>, prefix the YAML line with <code>#</code>. Git-trackable.
3. **Delete** — remove the array entry. Done.

Heartbeats also auto-pause when the cabinet is closed. They resume the next time the app boots — they're not background daemons.

## Read on

- [Persona](../persona/) — where heartbeats are declared.
- [Routines](../routines/) — when you want a specific task to recur, not just a check-in.
- [Conversations & approvals](../conversations-and-approvals/) — what happens when a heartbeat proposes work.
