"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PublicSearchHit } from "@/lib/types";
import { cn } from "@/lib/utils";

function score(hit: PublicSearchHit, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const title = hit.title.toLowerCase();
  const tags = hit.tags.join(" ").toLowerCase();
  const text = hit.text.toLowerCase();
  let value = 0;
  if (title === q) value += 100;
  if (title.startsWith(q)) value += 50;
  if (title.includes(q)) value += 25;
  if (tags.includes(q)) value += 15;
  if (text.includes(q)) value += 5;
  return value;
}

export function StaticSearchPalette({ hits }: { hits: PublicSearchHit[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const scored = hits
      .map((hit) => ({ hit, score: score(hit, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((item) => item.hit);
    return scored;
  }, [hits, query]);

  useEffect(() => {
    const openSearch = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("cabinet-docs:open-search", openSearch);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("cabinet-docs:open-search", openSearch);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  if (!open) return null;

  const selected = results[index] ?? results[0] ?? null;

  const go = (hit: PublicSearchHit | null) => {
    if (!hit) return;
    setOpen(false);
    setQuery("");
    router.push(hit.route);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setIndex((current) => Math.min(current + 1, results.length - 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setIndex((current) => Math.max(current - 1, 0));
              }
              if (event.key === "Enter") {
                event.preventDefault();
                go(selected);
              }
            }}
            placeholder="Search Cabinet docs..."
            className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-1.5 scrollbar-thin">
          {results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No docs found.
            </div>
          ) : (
            results.map((hit, i) => (
              <button
                key={hit.id}
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => go(hit)}
                className={cn(
                  "flex w-full flex-col gap-1 rounded-md px-3 py-2 text-left transition-colors",
                  i === index ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                )}
              >
                <span className="text-sm font-medium">{hit.title}</span>
                <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {hit.excerpt}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
