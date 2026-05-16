import fs from "node:fs/promises";
import path from "node:path";

const SOURCE_ROOT =
  process.env.CABINET_DOCS_SOURCE ||
  path.resolve(process.cwd(), "../cabinet-data/cabinet-public-docs");
const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT = path.join(PROJECT_ROOT, "content", "cabinet-public-docs");

const SKIP_DIRS = new Set([
  ".agents",
  ".jobs",
  ".cabinet-state",
  ".chat",
  ".git",
  ".cabinet-meta",
  "node_modules",
  "__pycache__",
  ".venv",
  "dist",
  "build",
  "out",
  "coverage"
]);

const SKIP_FILES = new Set([
  ".DS_Store",
  ".cabinet.db",
  ".cabinet.db-shm",
  ".cabinet.db-wal"
]);

function isSkippedEntry(name, isDirectory) {
  if (isDirectory) return SKIP_DIRS.has(name);
  if (name === ".cabinet") return false;
  if (name.startsWith(".")) return true;
  return SKIP_FILES.has(name);
}

async function copyVisible(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      if (isSkippedEntry(entry.name, entry.isDirectory())) continue;
      await copyVisible(path.join(src, entry.name), path.join(dest, entry.name));
    }
    return;
  }
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

await fs.rm(CONTENT_ROOT, { recursive: true, force: true });
await copyVisible(SOURCE_ROOT, CONTENT_ROOT);
console.log(`Synced ${SOURCE_ROOT} -> ${CONTENT_ROOT}`);
