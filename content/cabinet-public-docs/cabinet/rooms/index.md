---
title: "Rooms"
created: "2026-06-13T00:00:00.000Z"
modified: "2026-06-13T00:00:00.000Z"
status: draft
tags:
  - rooms
  - workspaces
  - navigation
order: 4
---

# Rooms

Think of Cabinet as your **home**. In your home you have several **rooms**: one for the office, one for your studies, one for a side project, one that's personal. You walk into a room and everything in it belongs to that part of your life. You don't keep tax files in the kitchen.

A <mark data-color="yellow">**room is a top-level cabinet**</mark> with its own pages, its own AI team, its own tasks, its own search, and its own look. Switch rooms and the whole workspace changes with you.

## Switching rooms

The **home button** sits next to the `cabinet` logo and shows the current room's icon. Click it to:

- **Switch** to another room.
- **Customize** a room: name, icon, accent color, theme.
- **Add** a new room.
- **Open** a room in its own window.
- **Delete** a room (it moves to trash, so it stays recoverable).

You are always inside a room, and Cabinet reopens where you left off, down to the exact page.

## Each room is its own world

<span class="tx-green">Rooms keep your contexts apart by default.</span> Work never bleeds into Personal:

- **Agents and tasks** are scoped to the room.
- **Search** (<kbd>⌘K</kbd>) covers the current room. To look wider, turn on **Search other rooms**, and results show which room each match came from.
- **Theme** follows the room, so you can tell at a glance which one you're in.

This is about focus, not a security sandbox: it keeps the right things in front of you and the rest out of the way. To share across rooms, you opt in explicitly.

## Rooms vs. sub-cabinets

Inside a room you can still **nest cabinets**. A "Marketing" cabinet might hold "Launch" and "Ads", each with its own agents. Those are *sub-cabinets*: departments within the same room, and they roll up to it.

**Rooms are the top level**: separate spaces that never roll up into each other. Use sub-cabinets to organize one area of work. Use rooms to separate different areas entirely.

## Clean, shareable URLs

Every room and page has a clean URL that mirrors the file tree:

```
/room/office/launch/brief
/room/office/marketing/-/tasks
/room/personal/journal/2026#trips
```

Paste one to a teammate and it opens exactly there, including a `#section` jump to a heading. Older links keep working.

## Read on

- [What is a Cabinet?](../) (the three tabs inside every room)
- [Data](../data/) (your file tree)
- [Agents](../agents/) (your per-room AI team)
