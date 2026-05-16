import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT = path.join(PROJECT_ROOT, "content", "cabinet-public-docs");
const GENERATED_DIR = path.join(PROJECT_ROOT, ".generated");
const SRC_GENERATED_DIR = path.join(PROJECT_ROOT, "src", "generated");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const ASSET_OUT_DIR = path.join(PUBLIC_DIR, "assets", "cabinet-public-docs");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://runcabinet.com").replace(/\/$/, "");

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify, { allowDangerousHtml: true })
  .freeze();

const ASSET_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
  ".ico",
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
  ".mp3",
  ".wav",
  ".ogg",
  ".m4a",
  ".aac",
  ".pdf",
  ".csv",
  ".mermaid",
  ".mmd",
  ".yaml",
  ".yml",
  ".json",
  ".docx",
  ".xlsx",
  ".xlsm",
  ".pptx",
  ".doc",
  ".ppt",
  ".xls",
  ".odt",
  ".rtf",
  ".zip"
]);

function posixPath(value) {
  return value.split(path.sep).join("/");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromName(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function routeFromPagePath(pagePath) {
  if (!pagePath) return "/";
  return `/${pagePath.replace(/^\/+|\/+$/g, "")}/`;
}

function outputPathForRoute(route) {
  if (route === "/") return path.join(PROJECT_ROOT, "out", "index.html");
  return path.join(PROJECT_ROOT, "out", route.replace(/^\/|\/$/g, ""), "index.html");
}

function parseCabinetManifest(raw, fallbackName) {
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    out[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return {
    id: out.id || slugify(fallbackName),
    name: out.name || titleFromName(fallbackName),
    kind: out.kind || "child",
    description: out.description || "",
    entry: out.entry || "index.md"
  };
}

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[[\]#*_`>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(text, max = 180) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function extractHeadings(markdown) {
  const headings = [];
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;
    const text = match[2].replace(/[#*`_]/g, "").trim();
    headings.push({
      depth: match[1].length,
      text,
      id: slugify(text)
    });
  }
  return headings;
}

function typeForFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext)) return "image";
  if ([".mp4", ".webm", ".mov"].includes(ext)) return "video";
  if ([".mp3", ".wav"].includes(ext)) return "audio";
  if (ext === ".pdf") return "pdf";
  if (ext === ".csv") return "csv";
  if ([".js", ".ts", ".tsx", ".jsx", ".json", ".css", ".html", ".mjs"].includes(ext)) return "code";
  return "unknown";
}

async function scanPages() {
  const pages = [];
  const pageBySource = new Map();

  async function walk(dir, relDir = "") {
    const indexPath = path.join(dir, "index.md");
    if (await pathExists(indexPath)) {
      const raw = await fs.readFile(indexPath, "utf8");
      const parsed = matter(raw);
      const pagePath = posixPath(relDir);
      const title = parsed.data.title || titleFromName(path.basename(dir));
      const text = stripMarkdown(parsed.content);
      const record = {
        id: pagePath || "home",
        pagePath,
        route: routeFromPagePath(pagePath),
        sourceFile: posixPath(path.relative(CONTENT_ROOT, indexPath)),
        sourceDir: posixPath(path.relative(CONTENT_ROOT, dir)),
        title,
        description: parsed.data.description || excerpt(text),
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
        order: typeof parsed.data.order === "number" ? parsed.data.order : null,
        status: parsed.data.status || null,
        modified: parsed.data.modified || parsed.data.created || null,
        rawMarkdown: parsed.content,
        text,
        excerpt: excerpt(text),
        headings: extractHeadings(parsed.content),
        html: ""
      };
      pages.push(record);
      pageBySource.set(record.sourceFile, record);
      pageBySource.set(`${record.sourceDir}/index.md`.replace(/^\//, ""), record);
      pageBySource.set(record.sourceDir, record);
    }

    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "index.md") continue;
      const abs = path.join(dir, entry.name);
      const rel = posixPath(path.relative(CONTENT_ROOT, abs));
      if (entry.isDirectory()) {
        await walk(abs, rel);
      } else if (entry.name.endsWith(".md")) {
        const raw = await fs.readFile(abs, "utf8");
        const parsed = matter(raw);
        const pagePath = rel.replace(/\.md$/, "");
        const title = parsed.data.title || titleFromName(entry.name);
        const text = stripMarkdown(parsed.content);
        const record = {
          id: pagePath,
          pagePath,
          route: routeFromPagePath(pagePath),
          sourceFile: rel,
          sourceDir: posixPath(path.dirname(rel)).replace(/^\.$/, ""),
          title,
          description: parsed.data.description || excerpt(text),
          tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
          order: typeof parsed.data.order === "number" ? parsed.data.order : null,
          status: parsed.data.status || null,
          modified: parsed.data.modified || parsed.data.created || null,
          rawMarkdown: parsed.content,
          text,
          excerpt: excerpt(text),
          headings: extractHeadings(parsed.content),
          html: ""
        };
        pages.push(record);
        pageBySource.set(record.sourceFile, record);
        pageBySource.set(pagePath, record);
      }
    }
  }

  await walk(CONTENT_ROOT);
  return { pages, pageBySource };
}

function findPageByWikiName(name, pages) {
  const slug = slugify(name);
  return (
    pages.find((page) => slugify(page.title) === slug) ||
    pages.find((page) => page.pagePath.split("/").some((part) => slugify(part) === slug)) ||
    null
  );
}

function preprocessWikiLinks(markdown, pages) {
  return markdown.replace(/\[\[([^\]]+)]]/g, (_match, label) => {
    const page = findPageByWikiName(label, pages);
    const href = page ? `${BASE_PATH}${page.route}` : `#${slugify(label)}`;
    return `<a data-wiki-link="true" href="${href}" class="wiki-link">${label}</a>`;
  });
}

function resolveLink(href, page, pageBySource) {
  if (!href || /^(https?:|mailto:|tel:|#|data:)/i.test(href)) return href;
  if (BASE_PATH && href.startsWith(BASE_PATH)) return href;
  const clean = href.replace(/^\.\//, "");
  const currentDir = page.sourceDir || "";
  const candidate = posixPath(path.normalize(path.join(currentDir, clean)));

  if (clean.endsWith(".md")) {
    const target = pageBySource.get(candidate) || pageBySource.get(candidate.replace(/\.md$/, ""));
    return target ? `${BASE_PATH}${target.route}` : href;
  }

  if (clean.endsWith("/")) {
    const target = pageBySource.get(candidate.replace(/\/$/, ""));
    if (target) return `${BASE_PATH}${target.route}`;
  }

  const ext = path.extname(clean).toLowerCase();
  if (ASSET_EXTENSIONS.has(ext)) {
    return `${BASE_PATH}/assets/cabinet-public-docs/${candidate}`;
  }

  const target = pageBySource.get(candidate) || pageBySource.get(`${candidate}/index.md`);
  return target ? `${BASE_PATH}${target.route}` : href;
}

function rewriteHtmlUrls(html, page, pageBySource) {
  return html.replace(/\b(href|src|data-src)="([^"]+)"/g, (_match, attr, value) => {
    return `${attr}="${resolveLink(value, page, pageBySource)}"`;
  });
}

async function renderPages(pages, pageBySource) {
  for (const page of pages) {
    const markdown = preprocessWikiLinks(page.rawMarkdown, pages);
    const result = await processor.process(markdown);
    page.html = rewriteHtmlUrls(String(result), page, pageBySource);
  }
}

async function buildTreeForDirectory(dir, relDir = "") {
  const manifestPath = path.join(dir, ".cabinet");
  const indexPath = path.join(dir, "index.md");
  const manifest = (await pathExists(manifestPath))
    ? parseCabinetManifest(await fs.readFile(manifestPath, "utf8"), path.basename(dir))
    : null;
  const index = (await pathExists(indexPath))
    ? matter(await fs.readFile(indexPath, "utf8"))
    : null;

  const title =
    manifest?.name ||
    index?.data.title ||
    (relDir ? titleFromName(path.basename(dir)) : "Cabinet Public Docs");

  const node = {
    name: path.basename(dir) || "cabinet-public-docs",
    title,
    path: posixPath(relDir),
    type: manifest ? "cabinet" : "directory",
    route: index ? routeFromPagePath(posixPath(relDir)) : null,
    order: typeof index?.data.order === "number" ? index.data.order : null,
    children: []
  };

  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "index.md") continue;
    const abs = path.join(dir, entry.name);
    const rel = posixPath(path.relative(CONTENT_ROOT, abs));
    if (entry.isDirectory()) {
      node.children.push(await buildTreeForDirectory(abs, rel));
      continue;
    }
    if (entry.name.endsWith(".md")) {
      const parsed = matter(await fs.readFile(abs, "utf8"));
      node.children.push({
        name: entry.name.replace(/\.md$/, ""),
        title: parsed.data.title || titleFromName(entry.name),
        path: rel.replace(/\.md$/, ""),
        type: "file",
        route: routeFromPagePath(rel.replace(/\.md$/, "")),
        order: typeof parsed.data.order === "number" ? parsed.data.order : null,
        children: []
      });
      continue;
    }
    node.children.push({
      name: entry.name,
      title: titleFromName(entry.name),
      path: rel,
      type: typeForFile(entry.name),
      assetUrl: `${BASE_PATH}/assets/cabinet-public-docs/${rel}`,
      route: null,
      order: null,
      children: []
    });
  }

  node.children.sort((a, b) => {
    const ao = a.order ?? Number.POSITIVE_INFINITY;
    const bo = b.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const ad = a.type === "directory" || a.type === "cabinet";
    const bd = b.type === "directory" || b.type === "cabinet";
    if (ad !== bd) return ad ? -1 : 1;
    return a.title.localeCompare(b.title);
  });

  return node;
}

async function copyAssets() {
  await fs.rm(ASSET_OUT_DIR, { recursive: true, force: true });

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(abs);
        continue;
      }
      if (entry.name.endsWith(".md") || entry.name === ".cabinet") continue;
      const rel = posixPath(path.relative(CONTENT_ROOT, abs));
      const dest = path.join(ASSET_OUT_DIR, rel);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(abs, dest);
    }
  }

  await walk(CONTENT_ROOT);
}

function xmlEscape(value) {
  return value.replace(/[<>&"']/g, (char) => {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[char];
  });
}

async function writePublicFiles(pages) {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const urls = pages.map((page) => `${SITE_URL}${BASE_PATH}${page.route}`);

  await fs.writeFile(
    path.join(PUBLIC_DIR, "sitemap.xml"),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`),
      "</urlset>",
      ""
    ].join("\n"),
    "utf8"
  );

  await fs.writeFile(
    path.join(PUBLIC_DIR, "robots.txt"),
    ["User-agent: *", "Allow: /", `Sitemap: ${SITE_URL}${BASE_PATH}/sitemap.xml`, ""].join("\n"),
    "utf8"
  );

  const llms = [
    "# Cabinet Public Docs",
    "",
    "Cabinet is a local-first knowledge base and AI team workspace. This site is generated from a Cabinet folder.",
    "",
    "## Pages",
    ...pages.map((page) => `- [${page.title}](${SITE_URL}${BASE_PATH}${page.route}): ${page.excerpt}`)
  ].join("\n");

  const llmsFull = [
    "# Cabinet Public Docs Full Text",
    "",
    ...pages.map((page) => [`## ${page.title}`, "", `URL: ${SITE_URL}${BASE_PATH}${page.route}`, "", page.text].join("\n"))
  ].join("\n\n");

  await fs.writeFile(path.join(PUBLIC_DIR, "llms.txt"), `${llms}\n`, "utf8");
  await fs.writeFile(path.join(PUBLIC_DIR, "llms-full.txt"), `${llmsFull}\n`, "utf8");
}

async function main() {
  if (!(await pathExists(CONTENT_ROOT))) {
    throw new Error(`Missing content snapshot: ${CONTENT_ROOT}. Run npm run sync first.`);
  }

  await fs.mkdir(GENERATED_DIR, { recursive: true });
  await fs.mkdir(SRC_GENERATED_DIR, { recursive: true });
  await copyAssets();

  const { pages, pageBySource } = await scanPages();
  pages.sort((a, b) => a.route.localeCompare(b.route));
  await renderPages(pages, pageBySource);
  const tree = await buildTreeForDirectory(CONTENT_ROOT);

  const data = {
    site: {
      name: "Cabinet Public Docs",
      description: "Read-only Cabinet-style documentation for Cabinet.",
      sourcePath: "content/cabinet-public-docs",
      generatedAt: new Date().toISOString(),
      basePath: BASE_PATH
    },
    tree,
    pages,
    search: pages.map((page) => ({
      id: page.id,
      title: page.title,
      route: page.route,
      excerpt: page.excerpt,
      tags: page.tags,
      text: page.text
    }))
  };

  const json = `${JSON.stringify(data, null, 2)}\n`;
  await fs.writeFile(path.join(GENERATED_DIR, "content.json"), json, "utf8");
  await fs.writeFile(path.join(SRC_GENERATED_DIR, "content.json"), json, "utf8");
  await fs.writeFile(path.join(PUBLIC_DIR, "search-index.json"), JSON.stringify(data.search, null, 2), "utf8");
  await writePublicFiles(pages);
  console.log(`Generated ${pages.length} static pages from ${CONTENT_ROOT}`);
}

await main();
