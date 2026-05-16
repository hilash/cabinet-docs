---
title: "Video & audio"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - file-types
  - video
  - audio
order: 6
---

# Video & audio

Video files: <code>.mp4 .webm .mov .m4v</code>.
Audio files: <code>.mp3 .wav .ogg .m4a .aac</code>.

Both render with <mark data-color="yellow">native browser players</mark>. Drop them in your cabinet, they appear in the sidebar with a cyan video icon (or amber music icon for audio).

## Live video example

A sample WebM is in this folder: [`cabinet-demo.webm`](./cabinet-demo.webm).

Embedded inline:

<video controls preload="metadata" style="width: 100%; max-width: 720px; border-radius: 8px;">
  <source src="./cabinet-demo.webm" type="video/webm" />
  Your browser doesn't support inline video. <a href="./cabinet-demo.webm">Download instead.</a>
</video>

The same clip you see on the cabinet-website hero — Cabinet renders any video file the same way.

## Inserting in the editor

| Path | What it does |
| --- | --- |
| Type <kbd>/Video</kbd> → **Upload** | Pick a file from disk, copies into the page folder. |
| Type <kbd>/Video</kbd> → **From URL** | Paste any direct video URL. |
| Drag & drop a video file from Finder | Same as Upload. |

Audio works the same — <kbd>/File</kbd> picks up `.mp3` and `.wav` and renders the audio player.

## Why this matters

A cabinet that can hold a screen-recording next to the page that explains it is a different beast from one that holds a Loom URL pointing at a third-party CDN.

- <span class="tx-accent">Demos</span> for product features live next to the docs.
- <span class="tx-accent">Voice notes</span> can be dropped into a meeting page and transcribed by an agent.
- <span class="tx-accent">Podcast clips</span> can sit beside the show notes that reference them.

> <mark data-color="amber">**Tip.**</mark> For long recordings (>200MB), `.gitignore` the file and link to the original. Cabinet still plays it inline; git won't get bloated.

## What agents see

Agents on transcription-capable providers can read audio you `@`-mention. Pair with a Whisper-on-disk skill for offline transcription:

```yaml
prompt: |
  @file:meetings/2026-05-04-monday.mp3
  Transcribe and summarize action items into /meetings/2026-05-04-monday.md.
```

## Read on

- [Images](../images/) — for stills and screenshots.
- [Markdown editor → Media & embeds](../../editor/media-and-embeds/) — for embed providers (YouTube, Loom, X, etc.).
