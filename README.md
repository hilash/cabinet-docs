# Cabinet Public Docs

Read-only Cabinet-style documentation website.

The public site keeps the Cabinet shape without the Cabinet runtime:

- `Data` is the generated documentation cabinet.
- `Agents` and `Tasks` are static sample panels for product storytelling.
- Every docs page ends with the same download, GitHub stars, and Discord CTA.
- `llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt`, and `search-index.json` are generated.

## Workflow

```bash
npm install
npm run sync
npm run dev
```

`npm run sync` creates or refreshes the source cabinet. By default it looks
for `../cabinet-data/cabinet-public-docs` (sibling of this repo). Override with
the `CABINET_DOCS_SOURCE` env var:

```bash
CABINET_DOCS_SOURCE=/path/to/cabinet-public-docs npm run sync
```

The website builds from the checked-in `content/cabinet-public-docs` snapshot
and exports to `out/`.

## Deploying to GitHub Pages

This project uses `output: "export"` (see `next.config.ts`), so `npm run build`
produces a fully static site in `out/`. Push the repo to GitHub, then enable
Pages → "Deploy from a branch" (or use the GitHub Actions workflow under
`.github/workflows/`).
