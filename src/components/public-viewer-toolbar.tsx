"use client";

import { ChevronRight, Home, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { CopyActions } from "@/components/copy-actions";
import { ThemeToggle } from "@/components/theme-toggle";
import type { PublicPage, PublicTreeNode } from "@/lib/types";
import { cn, findNodePath, withBasePath } from "@/lib/utils";

export function PublicViewerToolbar({
  tree,
  page,
  basePath
}: {
  tree: PublicTreeNode;
  page: PublicPage;
  basePath: string;
}) {
  const trail = findNodePath(tree, page.route) ?? [tree];
  const segments = trail.slice(1);

  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-background/95 px-4 py-2.5 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-1 text-[11px] text-muted-foreground">
        <Link
          href={withBasePath("/", basePath)}
          aria-label="Home"
          title="Home"
          className="inline-flex shrink-0 items-center rounded px-1 py-0.5 hover:bg-muted/60 hover:text-foreground"
        >
          <Home className="h-3 w-3" />
        </Link>
        {segments.map((node, index) => {
          const isLast = index === segments.length - 1;
          return (
            <div key={`${node.type}:${node.path}`} className="flex min-w-0 items-center gap-1">
              <ChevronRight className="h-3 w-3 shrink-0 opacity-40" />
              {isLast ? (
                <span
                  className={cn("truncate text-[15px] font-semibold text-foreground")}
                  title={node.title}
                >
                  {node.title}
                </span>
              ) : node.route ? (
                <Link
                  href={withBasePath(node.route, basePath)}
                  className="max-w-[14rem] shrink-0 truncate rounded px-1 py-0.5 hover:bg-muted/60 hover:text-foreground"
                  title={`Open ${node.title}`}
                >
                  {node.title}
                </Link>
              ) : (
                <span className="max-w-[14rem] shrink-0 truncate rounded px-1 py-0.5 text-foreground/70">
                  {node.title}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <CopyActions page={page} basePath={basePath} />

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("cabinet-docs:open-search"))}
          aria-label="Open search"
          title="Open search (⌘K)"
          className="hidden h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground/60 transition-colors hover:bg-muted hover:text-muted-foreground sm:inline-flex"
        >
          <Search className="h-3.5 w-3.5" />
          <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </button>

        <button
          type="button"
          aria-label="AI panel — disabled in the public docs"
          title="AI panel — disabled in the public docs"
          disabled
          className="inline-flex h-7 w-7 cursor-default items-center justify-center rounded-md text-muted-foreground/40"
        >
          <Sparkles className="h-4 w-4" />
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
