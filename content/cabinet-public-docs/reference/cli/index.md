---
title: "CLI Reference"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-07-14T00:00:00.000Z"
status: draft
tags:
  - reference
  - cli
order: 41
---

# CLI Reference

Cabinet's CLI starts, scaffolds, diagnoses, updates, and removes the locally cached application. Run it through `npx`; a global install is not required.

```bash
npx cabinetai <command> [options]
```

## How the app is installed

The CLI version and app version move together. On the first `run`, Cabinet checks `~/.cabinet/app/vX.Y.Z/` and downloads the matching release when needed.

- macOS and Linux prefer checksum-verified prebuilt bundles. They unpack atomically and do not run `npm install`.
- A platform without a matching bundle falls back to the tagged source archive and installs its dependencies.
- `update` reads `cabinet-release.json` from the latest published GitHub Release and downloads a newer app without changing your cabinet data.
- `run` prefers the newest complete app already installed, even if the invoking CLI package is older.

## Commands at a glance

| Command | What it does |
| --- | --- |
| [<code>create</code>](#create) | Create a new cabinet directory |
| [<code>run</code>](#run) | Start Cabinet for the current or explicitly selected directory |
| [<code>doctor</code>](#doctor) | Check the local Cabinet environment and optionally repair safe issues |
| [<code>update</code>](#update) | Download the newest published Cabinet app |
| [<code>import</code>](#import) | Import a cabinet template from the registry |
| [<code>list</code>](#list) | List cabinets below the current cabinet or directory |
| [<code>uninstall</code>](#uninstall) | Remove cached app versions; optionally remove global state |
| [<code>reset-config</code>](#reset-config) | Remove the current `.cabinet` binding without deleting content |

Use `npx cabinetai --help` or `npx cabinetai <command> --help` for the executable's exact current options.

<a id="create"></a>

## <code>create</code>

```bash
npx cabinetai create <name>
```

Creates a slugged child directory below the current working directory, writes its `.cabinet` manifest, and prints the next `cd` and `run` commands. When invoked inside an existing cabinet, the new cabinet is marked as a child.

<a id="run"></a>

## <code>run</code>

```bash
npx cabinetai run [--data-dir <path>] [--app-version <version>] [--no-open]
```

Without `--data-dir`, Cabinet looks for a `.cabinet` in the current directory and then its ancestors. If none exists, it offers to bootstrap the current directory. It refuses unsafe roots such as your home directory or filesystem root and warns before adopting a broad development folder.

| Option | What it does |
| --- | --- |
| <code>--data-dir &lt;path&gt;</code> | Use this exact directory, skipping ancestor traversal. Creates and bootstraps it when needed. |
| <code>--app-version &lt;version&gt;</code> | Pin a particular app version instead of auto-selecting the newest complete install. |
| <code>--no-open</code> | Start the services without opening a browser. |

The preferred ports are `4000` for the app and `4100` for the daemon. Set `CABINET_APP_PORT` (or `PORT`) and `CABINET_DAEMON_PORT` to change them; Cabinet selects another free port if a preference is occupied.

<a id="doctor"></a>

## <code>doctor</code>

```bash
npx cabinetai doctor [--fix] [--quiet]
```

Runs environment, runtime, app-install, port, and native-dependency checks. `--fix` applies the safe repairs exposed by failed checks; `--quiet` suppresses the report and is useful with `--fix`.

<a id="update"></a>

## <code>update</code>

```bash
npx cabinetai update
```

Reads the latest published release manifest. If a newer app exists, it downloads and verifies the platform bundle (or uses the source fallback), then tells you to restart `npx cabinetai run`. Cabinet directories and their data are untouched.

<a id="import"></a>

## <code>import</code>

```bash
npx cabinetai import <template>
```

Imports a named template from the `cabinetai/cabinets` registry into a new directory below the current working directory.

<a id="list"></a>

## <code>list</code>

```bash
npx cabinetai list
```

Lists valid cabinets below the current cabinet root (or current directory), including their kind, relative path, agent count, and job count.

<a id="uninstall"></a>

## <code>uninstall</code>

```bash
npx cabinetai uninstall [--all] [--yes]
# `remove` is an alias
```

The default removes cached app versions under `~/.cabinet/app/`. `--all` also removes Cabinet's global state, configuration, and telemetry directory. `--yes` skips confirmation. <mark data-color="green">Cabinet directories and their data are never deleted.</mark>

<a id="reset-config"></a>

## <code>reset-config</code>

```bash
npx cabinetai reset-config [--yes]
```

Removes the `.cabinet` manifest found from the current directory upward. Content stays in place; the next `run` treats the location as unbound and can bootstrap or bind a different directory.

## Read on

- [Install](../../install/) — platform downloads and first run.
- [File structure](../file-structure/) — what's inside a cabinet.
- [Manifest schema](../manifest-schema/) — the `.cabinet` marker.
