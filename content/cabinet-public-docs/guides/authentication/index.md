---
title: "Authentication & remote access"
created: "2026-06-15T00:00:00.000Z"
modified: "2026-06-15T00:00:00.000Z"
status: draft
tags:
  - guide
  - security
  - deployment
order: 34
---

# Authentication & remote access

By default Cabinet is <mark data-color="amber">**local-first**</mark>: the servers bind to `127.0.0.1` and there is no login. If you only ever open Cabinet at `http://localhost:4000` on your own machine, that is a reasonable default and you can skip this page.

The moment Cabinet is reachable by anything other than your own loopback (a LAN, a Tailscale tailnet, a VPN, your phone), turn on the password gate. This page covers how, and how to expose Cabinet safely.

## Turn on the password gate

Set `KB_PASSWORD` in your `.env` (or your process manager / container environment):

```bash
KB_PASSWORD=your-strong-passphrase
```

With it set, every page and API route requires login: Cabinet shows a `/login` page, redirects unauthenticated page requests there, and rejects unauthenticated API requests with `401`. Leave `KB_PASSWORD` empty to disable auth entirely. Restart Cabinet after changing it.

## How the session is protected

When you log in, Cabinet sets a single `kb-auth` cookie. It is <span class="tx-accent">not</span> a fast hash of your password:

- <span class="tx-accent">**Slow KDF.**</span> The cookie value is `PBKDF2-HMAC-SHA256` over your password (600,000 iterations by default), which makes guessing expensive.
- <span class="tx-accent">**Per-install salt.**</span> A random salt is generated once and stored in `.cabinet.env`, so tokens are unique to your install and cannot be attacked with precomputed tables.
- <span class="tx-accent">**Login rate limiting.**</span> Repeated failed logins are throttled (per client, plus a global ceiling) and locked out for a cool-down window, returning `429 Too Many Requests` with a `Retry-After`.
- <span class="tx-accent">**Constant-time checks.**</span> The gate compares tokens in constant time and derives the expected value once per process, so it adds no meaningful per-request cost.

Changing your password (or the salt or iteration count) invalidates existing sessions, so everyone logs in again once.

### Configuration

| Variable | Default | What it does |
|---|---|---|
| `KB_PASSWORD` | _(empty)_ | Set it to require login. Empty means no auth. |
| `CABINET_AUTH_SALT` | _(auto)_ | Per-install salt, auto-generated into `.cabinet.env`. Set only to pin a value. |
| `CABINET_LOGIN_PBKDF2_ITERS` | `600000` | KDF cost. Lower only on very constrained hardware. |
| `CABINET_LOGIN_MAX_ATTEMPTS` | `10` | Failed attempts per client before lockout. |
| `CABINET_LOGIN_WINDOW_MS` | `900000` | Counting window (15 minutes). |
| `CABINET_LOGIN_LOCKOUT_MS` | `900000` | Lockout duration once tripped (15 minutes). |
| `CABINET_LOGIN_GLOBAL_MAX` | `60` | Global failed-attempt ceiling per window. |
| `KB_ALLOW_HTTP` | _(unset)_ | Set to `1` to drop the cookie's `Secure` flag in production (plain-HTTP on a trusted network only). |

## Background automation and the gate

The gate covers Cabinet's own background work too. Scheduled jobs and persona heartbeats are fired by the scheduler **daemon** — a process separate from the web app — and it authenticates with the same `kb-auth` cookie a logged-in browser carries.

Because it is a separate process, the daemon must see the **same auth values** as the app: `KB_PASSWORD`, `CABINET_AUTH_SALT`, and `CABINET_LOGIN_PBKDF2_ITERS`. If any of them differ between the two, the daemon derives a different token, every scheduled trigger is rejected with `401`, and nothing runs — while `/health` still reports `status: ok` with a non-zero `scheduledJobs`, so the failure is easy to miss.

In practice this usually takes care of itself: the salt lives in `.cabinet.env` (both processes read it at boot), and the daemon backfills `KB_PASSWORD` and `CABINET_LOGIN_PBKDF2_ITERS` from `.env` in its working directory when they aren't already in its environment. The one case to watch is setting auth **only** through a process manager or container environment for the app, with no `.env` the daemon can read — then keep the daemon's environment in sync too.

To confirm automation is actually running, check `/health`: alongside `scheduledJobs` it reports `lastTriggerAt`, `lastSuccessfulTriggerAt`, `lastFailedTriggerAt`, and `triggerFailures`. Triggers firing (`lastTriggerAt` advancing) while `lastSuccessfulTriggerAt` stays stale and `triggerFailures` climbs is the signature of a token mismatch.

## Reaching Cabinet from another device

Cabinet can run behind a LAN address, a Tailscale tailnet, a VPN, or a reverse proxy. Two things to set:

- **Dev-origin allowlist.** When you run the dev server behind a non-localhost hostname, set `CABINET_APP_ORIGIN` to that origin (comma-separated for more than one) so cross-origin requests for dev assets are allowed:

  ```bash
  CABINET_APP_ORIGIN=https://cabinet.your-tailnet.ts.net
  ```

- **Use HTTPS.** The auth cookie is marked `Secure` in production, so it is only sent over HTTPS. Tailscale and most VPNs give you encrypted transport. If you must serve plain HTTP on a trusted private network, set `KB_ALLOW_HTTP=1`, but prefer HTTPS.

## Exposing Cabinet safely: checklist

- [ ] Set a strong `KB_PASSWORD`.
- [ ] Reach it over an encrypted path (HTTPS, or a private network like Tailscale).
- [ ] Keep it off the open public internet unless you have put your own auth/proxy in front and understand the tradeoffs.

## What this is, and what it is not

Cabinet's gate is a <mark data-color="amber">**single shared password**</mark> for the whole instance. There are no per-user accounts, roles, or per-user audit. It is designed to keep a self-hosted instance private on a network you trust, not to be a multi-tenant identity system. Agents and skills run with the full authority of that single user.

For the full threat model and the exact token derivation, see [`docs/AUTH.md`](https://github.com/hilash/cabinet/blob/main/docs/AUTH.md) in the repository.
