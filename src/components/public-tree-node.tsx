"use client";

import Link from "next/link";
import {
  Archive,
  AppWindow,
  ArrowUpRight,
  ChevronRight,
  Code,
  File,
  FileText,
  FileType,
  Folder,
  FolderOpen,
  Globe,
  Image,
  Music,
  Table,
  Video
} from "lucide-react";

const SHOWCASE_BY_ROUTE: Record<string, string> = {
  "/cabinet/agents/": "/showcase/agents/",
  "/cabinet/tasks/": "/showcase/tasks/"
};
import type { PublicTreeNode as PublicTreeNodeType } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

function IconForNode({
  node,
  expanded
}: {
  node: PublicTreeNodeType;
  expanded: boolean;
}) {
  const className = "h-3.5 w-3.5 shrink-0";
  switch (node.type) {
    case "csv":
      return <Table className={cn(className, "text-green-500")} />;
    case "pdf":
      return <FileType className={cn(className, "text-red-400")} />;
    case "code":
      return <Code className={cn(className, "text-violet-400")} />;
    case "image":
      return <Image className={cn(className, "text-pink-400")} />;
    case "video":
      return <Video className={cn(className, "text-cyan-400")} />;
    case "audio":
      return <Music className={cn(className, "text-amber-400")} />;
    case "cabinet":
      return <Archive className={cn(className, "text-amber-400")} />;
    case "directory":
      return expanded ? (
        <FolderOpen className={cn(className, "text-muted-foreground")} />
      ) : (
        <Folder className={cn(className, "text-muted-foreground")} />
      );
    default:
      if (node.assetUrl?.endsWith(".html")) return <Globe className={cn(className, "text-blue-400")} />;
      if (node.assetUrl?.endsWith(".app")) return <AppWindow className={cn(className, "text-emerald-400")} />;
      return node.route ? (
        <FileText className={cn(className, "text-muted-foreground")} />
      ) : (
        <File className={cn(className, "text-muted-foreground/50")} />
      );
  }
}

export function PublicTreeNode({
  node,
  depth,
  selectedRoute,
  expandedPaths,
  toggleExpanded,
  basePath
}: {
  node: PublicTreeNodeType;
  depth: number;
  selectedRoute: string;
  expandedPaths: Set<string>;
  toggleExpanded: (path: string) => void;
  basePath: string;
}) {
  const hasChildren = node.children.length > 0;
  const expanded = hasChildren && expandedPaths.has(node.path);
  const selected = node.route === selectedRoute;
  const href = node.route ? withBasePath(node.route, basePath) : node.assetUrl || "#";
  const isExternalAsset = !node.route && !!node.assetUrl;

  return (
    <div>
      <div className="relative">
        <div
          className={cn(
            "group relative flex w-full items-center gap-2 rounded-md py-1 pr-2 text-left text-[12px] text-foreground/75 transition-colors",
            "hover:bg-foreground/[0.03] hover:text-foreground",
            selected &&
              "bg-accent/70 font-semibold text-accent-foreground before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:rounded-r-full before:bg-primary"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {hasChildren ? (
            <button
              type="button"
              aria-label={expanded ? `Collapse ${node.title}` : `Expand ${node.title}`}
              aria-expanded={expanded}
              onClick={() => toggleExpanded(node.path)}
              className="-ml-1 flex h-3 w-3 shrink-0 items-center justify-center rounded hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight
                className={cn(
                  "h-3 w-3 text-muted-foreground/70 transition-transform duration-150",
                  expanded && "rotate-90"
                )}
              />
            </button>
          ) : (
            <span className="-ml-1 w-3 shrink-0" />
          )}

          <IconForNode node={node} expanded={expanded} />

          {node.route || node.assetUrl ? (
            <Link
              href={href}
              target={isExternalAsset ? "_blank" : undefined}
              className={cn(
                "min-w-0 flex-1 truncate focus-visible:outline-none",
                node.type === "cabinet" && "font-medium"
              )}
            >
              {node.title}
            </Link>
          ) : (
            <span
              className={cn(
                "min-w-0 flex-1 truncate",
                node.type === "cabinet" && "font-medium"
              )}
            >
              {node.title}
            </span>
          )}

          {node.type === "cabinet" && node.route && (
            <Link
              href={withBasePath(node.route, basePath)}
              className={cn(
                "ml-auto shrink-0 rounded-md bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground/80 transition-[opacity,background-color,color]",
                "opacity-0 hover:bg-accent hover:text-accent-foreground group-hover:opacity-100 focus:opacity-100"
              )}
            >
              Open
            </Link>
          )}

          {node.route && SHOWCASE_BY_ROUTE[node.route] && (
            <Link
              href={withBasePath(SHOWCASE_BY_ROUTE[node.route], basePath)}
              title="Open the live demo"
              className={cn(
                "ml-auto flex shrink-0 items-center gap-1 rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/80 transition-colors",
                "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Demo
              <ArrowUpRight className="h-2.5 w-2.5" />
            </Link>
          )}
        </div>
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children.map((child) => (
            <PublicTreeNode
              key={`${child.type}:${child.path}`}
              node={child}
              depth={depth + 1}
              selectedRoute={selectedRoute}
              expandedPaths={expandedPaths}
              toggleExpanded={toggleExpanded}
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
