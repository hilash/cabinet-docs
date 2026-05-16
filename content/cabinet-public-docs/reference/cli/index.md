---
title: "CLI Reference"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - reference
  - cli
order: 41
---

# CLI Reference

Cabinet's CLI is intentionally small. <mark data-color="yellow">Most of the work happens inside the app</mark>, and the CLI exists to start, scaffold, diagnose, and update.

```bash
npx cabinetai <command> [args] [flags]
```

If you've installed Cabinet globally, drop the `npx`. Everything below uses `cabinetai` for short.

## Commands at a glance

| Command | What it does |
| --- | --- |
| [<code>create</code>](#create) | Scaffold a new cabinet folder |
| [<code>run</code>](#run) | Start Cabinet against the current cabinet folder |
| [<code>list</code>](#list) | List cabinets visible to this install |
| [<code>add</code>](#add) | Install a template cabinet from cabinets.sh |
| [<code>doctor</code>](#doctor) | Diagnose env, ports, providers, db |
| [<code>sessions</code>](#sessions) | Manage active sessions and locks |
| [<code>skills</code>](#skills) | Install, update, publish skills |
| [<code>publish</code>](#publish) | Publish the current cabinet to cabinets.sh |
| [<code>update</code>](#update) | Reinstall the latest version |
| [<code>uninstall</code>](#uninstall) | Remove cached app (keeps your data) |

## Global flags

| Flag | What it does |
| --- | --- |
| <code>--data-dir &lt;path&gt;</code> | Override <code>CABINET_DATA_DIR</code> for this run. |
| <code>--port &lt;n&gt;</code> | Override the default port (3000). |
| <code>--quiet</code> | Suppress non-error output. |
| <code>--json</code> | Emit machine-readable JSON instead of human output. |
| <code>--no-color</code> | Disable ANSI color in terminal output. |
| <code>--help</code> | Print help for any command. |

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| <code>CABINET_DATA_DIR</code> | <code>~/cabinets/</code> | Where Cabinet looks for cabinet folders. |
| <code>CABINET_LOG_LEVEL</code> | <code>info</code> | <code>debug</code> / <code>info</code> / <code>warn</code> / <code>error</code>. |
| <code>CABINET_OFFLINE</code> | <code>false</code> | Skip provider connectivity checks at boot. |
| <code>ANTHROPIC_API_KEY</code> | — | Picked up automatically. |
| <code>OPENAI_API_KEY</code> | — | Picked up automatically. |
| <code>GOOGLE_API_KEY</code> | — | Picked up automatically. |
| <code>XAI_API_KEY</code> | — | Picked up automatically. |

## Exit codes

| Code | Meaning |
| --- | --- |
| <code>0</code> | Success |
| <code>1</code> | Generic error (see stderr) |
| <code>2</code> | Bad input (missing arg, unknown flag) |
| <code>3</code> | Cabinet not found at the given path |
| <code>4</code> | Port in use |
| <code>5</code> | Provider auth failure |
| <code>6</code> | Schema violation (a malformed persona / job / skill) |

---

<a id="create"></a>

## <code>create</code>

Scaffold a new cabinet folder.

```bash
npx cabinetai create [name] [--template <slug>] [--dir <path>] [--no-install]
```

| Arg / flag | Default | What it does |
| --- | --- | --- |
| <code>[name]</code> | prompts | Folder name. Sluggified for the cabinet id. |
| <code>--template &lt;slug&gt;</code> | empty | Start from a template cabinet on cabinets.sh. |
| <code>--dir &lt;path&gt;</code> | <code>$CABINET_DATA_DIR</code> | Parent directory. |
| <code>--no-install</code> | false | Skip <code>npm install</code> after scaffold. |

<span class="tx-accent">Examples</span>

```bash
# Empty cabinet, prompts for a name
npx cabinetai create

# Named cabinet
npx cabinetai create my-startup

# From a template
npx cabinetai create my-jobsearch --template cabinet-app/job-hunt-hq
```

---

<a id="run"></a>

## <code>run</code>

Start Cabinet against the current folder (or a specified cabinet).

```bash
npx cabinetai run [path] [--port <n>] [--open] [--read-only]
```

| Arg / flag | Default | What it does |
| --- | --- | --- |
| <code>[path]</code> | <code>.</code> | Cabinet folder to open. |
| <code>--port &lt;n&gt;</code> | <code>3000</code> | Port to bind. |
| <code>--open</code> | true | Open the browser automatically. Use <code>--no-open</code> to disable. |
| <code>--read-only</code> | false | Disable agent runs, edits, and git writes. Useful for demos. |

<span class="tx-accent">Examples</span>

```bash
npx cabinetai run                                    # current dir
npx cabinetai run ~/cabinets/my-startup              # specific cabinet
npx cabinetai run --port 3001 --no-open              # alt port, headless
npx cabinetai run --read-only                        # demo mode
```

---

<a id="list"></a>

## <code>list</code>

List cabinets visible to this install.

```bash
npx cabinetai list [--json]
```

Reads <code>$CABINET_DATA_DIR</code> for any folder with a <code>.cabinet</code> manifest at the top level.

<span class="tx-accent">Output</span>

```text
NAME              ID              KIND     PATH
My Startup        my-startup      root     ~/cabinets/my-startup
Job Hunt HQ       job-hunt-hq     root     ~/cabinets/job-hunt-hq
Acme Client       acme            child    ~/cabinets/agency/clients/acme
```

---

<a id="add"></a>

## <code>add</code>

Install a template cabinet from cabinets.sh.

```bash
npx cabinetai add <owner/template> [--into <path>] [--name <name>]
```

| Arg / flag | Default | What it does |
| --- | --- | --- |
| <code>&lt;owner/template&gt;</code> | required | Template slug on cabinets.sh, e.g. <code>cabinet-app/job-hunt-hq</code>. |
| <code>--into &lt;path&gt;</code> | <code>$CABINET_DATA_DIR</code> | Where to install. |
| <code>--name &lt;name&gt;</code> | template's id | Rename on install. |

<mark data-color="amber">Heartbeats are paused on first install.</mark> Cabinet asks you to confirm each one before it fires.

---

<a id="doctor"></a>

## <code>doctor</code>

Diagnose environment, ports, providers, and database integrity.

```bash
npx cabinetai doctor [--fix] [--json]
```

| Flag | What it does |
| --- | --- |
| <code>--fix</code> | Attempt safe auto-fixes (kill stale ports, clear bad locks). |
| <code>--json</code> | Machine-readable output for CI / scripts. |

Checks:

- Node version ≥ 20
- Git installed
- <code>$CABINET_DATA_DIR</code> exists and is writable
- Default port is free
- Each configured provider responds to a ping
- The cabinet's SQLite (<code>.cabinet.db</code>) is healthy

---

<a id="sessions"></a>

## <code>sessions</code>

Manage active agent sessions and locks.

```bash
npx cabinetai sessions list                # show active runs
npx cabinetai sessions kill <id>           # stop a run
npx cabinetai sessions clear-locks         # release stale file locks
```

---

<a id="skills"></a>

## <code>skills</code>

Install, update, and publish skills.

```bash
npx cabinetai skills add <slug> [--global] [--force]
npx cabinetai skills list
npx cabinetai skills update [<slug>]
npx cabinetai skills remove <slug>
npx cabinetai skills publish              # in a skill folder
```

<mark data-color="red">Use <code>--force</code> only if you've reviewed the security scan output.</mark>

---

<a id="publish"></a>

## <code>publish</code>

Publish the current cabinet folder to cabinets.sh.

```bash
npx cabinetai publish [--dry-run]
```

Strips <code>.gitignore</code>'d files, generates a README, validates schemas, and opens a PR to the registry.

---

<a id="update"></a>

## <code>update</code>

Reinstall the latest Cabinet app version.

```bash
npx cabinetai update [--channel <stable|beta>]
```

Your data is untouched. Only the cached app version changes.

---

<a id="uninstall"></a>

## <code>uninstall</code>

Remove the cached Cabinet app from your machine.

```bash
npx cabinetai uninstall
```

<mark data-color="green">Your cabinet folders are not affected.</mark> They live wherever <code>$CABINET_DATA_DIR</code> points (default <code>~/cabinets/</code>) and stay where they are.

## Read on

- [Install](../../install/) — the runbook.
- [File structure](../file-structure/) — what's inside a cabinet.
- [Manifest schema](../manifest-schema/) — every <code>.cabinet</code> field.
