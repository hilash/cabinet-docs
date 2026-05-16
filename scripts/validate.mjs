import fs from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const OUT_DIR = path.join(PROJECT_ROOT, "out");
const GENERATED = path.join(PROJECT_ROOT, "src", "generated", "content.json");
// Strings or patterns that must never appear in shipped output.
// FORBIDDEN_SUBSTRINGS — exact substring matches.
// FORBIDDEN_PATTERNS — regex matches (caught at build time, not in source).
const FORBIDDEN_SUBSTRINGS = ["/api/"];
// Allowlist of placeholder usernames intentionally used in docs copy.
const PLACEHOLDER_USERNAMES = new Set(["you", "me", "user", "username", "yourname"]);

const FORBIDDEN_PATTERNS = [
  // Catch any leaked developer absolute path (macOS or Linux home),
  // except docs placeholders like /Users/you/, /home/me/, etc.
  {
    pattern: /\/Users\/([a-z0-9_-]+)\/(Development|Projects|Documents|Code|workspace|src)/gi,
    allow: (match) => PLACEHOLDER_USERNAMES.has(match[1].toLowerCase())
  },
  {
    pattern: /\/home\/([a-z0-9_-]+)\/(Development|Projects|Documents|Code|workspace|src)/gi,
    allow: (match) => PLACEHOLDER_USERNAMES.has(match[1].toLowerCase())
  }
];

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(abs)));
    } else {
      out.push(abs);
    }
  }
  return out;
}

function outputPathForRoute(route) {
  if (route === "/") return path.join(OUT_DIR, "index.html");
  return path.join(OUT_DIR, route.replace(/^\/|\/$/g, ""), "index.html");
}

function stripBase(value, basePath) {
  if (basePath && value.startsWith(basePath)) return value.slice(basePath.length) || "/";
  return value;
}

if (!(await pathExists(OUT_DIR))) {
  throw new Error("Missing out/. Run npm run build first.");
}

const data = JSON.parse(await fs.readFile(GENERATED, "utf8"));
const routes = new Set(data.pages.map((page) => page.route));
const basePath = data.site.basePath || "";

for (const page of data.pages) {
  const output = outputPathForRoute(page.route);
  if (!(await pathExists(output))) {
    throw new Error(`Missing output for ${page.route}: ${output}`);
  }
}

const files = await walkFiles(OUT_DIR);
for (const file of files) {
  if (!/\.(html|js|css|json|txt|xml)$/.test(file)) continue;
  const raw = await fs.readFile(file, "utf8");
  for (const needle of FORBIDDEN_SUBSTRINGS) {
    if (raw.includes(needle)) {
      throw new Error(`Forbidden string ${needle} found in ${file}`);
    }
  }
  for (const { pattern, allow } of FORBIDDEN_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(raw)) !== null) {
      if (allow && allow(match)) continue;
      throw new Error(`Forbidden path pattern ${match[0]} found in ${file}`);
    }
  }
}

for (const page of data.pages) {
  const hrefs = [...page.html.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    const clean = stripBase(href, basePath);
    if (clean.startsWith("/assets/")) continue;
    if (["/sitemap.xml", "/robots.txt", "/llms.txt", "/llms-full.txt"].includes(clean)) continue;
    if (!routes.has(clean)) {
      throw new Error(`Unresolved internal link on ${page.route}: ${href}`);
    }
  }
}

console.log(`Validated ${data.pages.length} pages and ${files.length} output files.`);
