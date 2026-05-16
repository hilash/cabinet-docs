"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  Code2,
  FileImage,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Info,
  Link as LinkIcon,
  ListChecks,
  ListOrdered,
  ListTree,
  Minus,
  Quote,
  Smile,
  Table as TableIcon,
  Type,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = { name: string; group: "Basic" | "Media" | "Advanced"; icon: LucideIcon; hint: string };

const ITEMS: Item[] = [
  { name: "Text", group: "Basic", icon: Type, hint: "plain paragraph" },
  { name: "Heading 1", group: "Basic", icon: Heading1, hint: "page title" },
  { name: "Heading 2", group: "Basic", icon: Heading2, hint: "section title" },
  { name: "Heading 3", group: "Basic", icon: Heading3, hint: "subsection" },
  { name: "Bullet list", group: "Basic", icon: ListTree, hint: "unordered" },
  { name: "Numbered list", group: "Basic", icon: ListOrdered, hint: "ordered" },
  { name: "Checklist", group: "Basic", icon: ListChecks, hint: "task list" },
  { name: "Code block", group: "Basic", icon: Code2, hint: "fenced code" },
  { name: "Quote", group: "Basic", icon: Quote, hint: "blockquote" },
  { name: "Divider", group: "Basic", icon: Minus, hint: "horizontal rule" },
  { name: "Table", group: "Basic", icon: TableIcon, hint: "rows and cells" },
  { name: "Image", group: "Media", icon: ImageIcon, hint: "upload or URL" },
  { name: "Video", group: "Media", icon: Video, hint: "upload or URL" },
  { name: "Embed", group: "Media", icon: LinkIcon, hint: "YouTube, Loom, etc." },
  { name: "File", group: "Media", icon: FileImage, hint: "any attachment" },
  { name: "Callout", group: "Advanced", icon: Info, hint: "info block" },
  { name: "Warning", group: "Advanced", icon: AlertTriangle, hint: "alert block" },
  { name: "Math", group: "Advanced", icon: Calculator, hint: "KaTeX inline / block" },
  { name: "Emoji", group: "Advanced", icon: Smile, hint: "picker" },
];

const QUERIES = ["", "h", "im", "call", "math", ""];

export function SlashMenuDemo({ caption }: { caption?: string }) {
  const [qIdx, setQIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQIdx((i) => (i + 1) % QUERIES.length), 1900);
    return () => clearInterval(id);
  }, []);

  const query = QUERIES[qIdx];
  const filtered = query
    ? ITEMS.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    : ITEMS;

  const groups: Item["group"][] = ["Basic", "Media", "Advanced"];

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Slash menu
          </span>
          <span className="text-[10px] text-muted-foreground/70">type / on an empty line</span>
        </div>

        <div className="rounded-xl border border-border bg-[var(--bg-warm)] p-4 font-serif text-sm leading-relaxed text-foreground">
          <p>The new launch goes live on Friday.</p>
          <p className="text-muted-foreground/60">
            <span className="font-mono text-foreground">/{query}</span>
            <span className="cursor-blink ml-0.5">▊</span>
          </p>

          <div className="relative">
            <div className="absolute left-0 top-2 z-10 w-72 overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
              <div className="border-b border-border bg-[var(--accent-bg-subtle)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "command" : "commands"}
              </div>
              <div className="max-h-72 overflow-y-auto p-1.5 text-[13px]">
                {groups.map((g) => {
                  const list = filtered.filter((i) => i.group === g);
                  if (list.length === 0) return null;
                  return (
                    <div key={g} className="mb-1.5 last:mb-0">
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {g}
                      </div>
                      <ul className="font-sans">
                        {list.map((it, i) => {
                          const Icon = it.icon;
                          const active = i === 0 && g === filtered[0]?.group;
                          return (
                            <li
                              key={it.name}
                              className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                                active
                                  ? "bg-[var(--accent-bg)] text-[var(--accent-warm)]"
                                  : "text-foreground hover:bg-muted"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              <span className="font-medium">{it.name}</span>
                              <span className="ml-auto text-[10px] text-muted-foreground">
                                {it.hint}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="p-3 text-center text-xs text-muted-foreground">
                    no commands match
                  </div>
                )}
              </div>
            </div>

            <div className="h-72" />
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Hit <kbd className="rounded bg-muted px-1 font-mono text-[10px]">Enter</kbd> to insert.
          Cabinet writes the markdown to disk; the source toggle shows you exactly what.
        </p>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
