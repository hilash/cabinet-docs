---
title: "Media & embeds"
created: "2026-05-04T00:00:00.000Z"
modified: "2026-05-04T00:00:00.000Z"
status: draft
tags:
  - editor
  - media
  - embeds
order: 2
---

# Media & embeds

Cabinet handles images, videos, and dozens of URL-based embeds as <mark data-color="yellow">first-class blocks in the editor</mark>. Everything saves next to the page on disk, except embeds — which are stored as iframes in the markdown source.

## Images

Three ways to add an image, all save the file next to the page:

1. <mark data-color="green">**Paste**</mark> a copy-pasted screenshot — uploads and inserts automatically.
2. **Drag & drop** from Finder onto the editor.
3. Click the image icon or type <kbd>/Image</kbd> for the **Upload** or **From URL** tab.

Hover any image and drag the side handles to resize — the width persists across reloads.

![Cabinet icon](../../../../media/cabinet-icon.png)

↑ Example image inserted via <kbd>/Image → From URL</kbd>. Hover it in edit mode to see the resize handles.

## Video

Click the video icon or type <kbd>/Video</kbd> to upload a file or paste a direct video URL.

```html
<video controls src="https://runcabinet.com/demo.webm"></video>
```

In the editor it renders as a player; on disk it's a plain HTML5 <code>&lt;video&gt;</code> tag the markdown source preserves.

## Embeds — universal

Click the embed icon (sparkles) or type <kbd>/Embed</kbd>. Cabinet auto-detects the provider and writes the right iframe markup.

| Provider | Paste a link like… |
| --- | --- |
| YouTube | <code>https://youtube.com/watch?v=…</code> |
| Vimeo | <code>https://vimeo.com/…</code> |
| Loom | <code>https://loom.com/share/…</code> |
| X / Twitter | <code>https://x.com/user/status/…</code> |
| TikTok | <code>https://tiktok.com/@user/video/…</code> |
| Facebook / Instagram | any public post URL |
| Spotify | <code>https://open.spotify.com/track/…</code> |
| Anything else | falls back to a generic iframe |

> <mark data-color="amber">**Tip.**</mark> Pasting a recognized URL on an <span class="tx-accent">empty line</span> auto-embeds without the popover.

## Files

For anything that isn't an image or video, type <kbd>/File</kbd> (or drop it into the editor). It saves next to the page and renders as a download chip with the filename and size.

```html
<a class="file-chip" href="./brief.pdf" download>brief.pdf · 412 KB</a>
```

The browser handles previews for what it can (PDF, plain text, images); other types open in Finder.

## Where files live on disk

Every uploaded file lands in the same folder as the page that holds it. So a page at:

```text
marketing/launches/2026-q3/index.md
```

…with a pasted screenshot ends up with:

```text
marketing/launches/2026-q3/
├── index.md
└── screenshot-2026-05-04-09-12.png
```

<mark data-color="green">No global media bucket.</mark> Move the page folder, the assets move with it. Delete the folder, the assets are gone too.

## Read on

- [Slash commands](../slash-commands/) — the picker reference.
- [File types](../../file-types/) — every file type Cabinet renders inline.
