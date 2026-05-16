"use client";

import {
  AppWindow,
  File,
  FileAudio,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  Globe,
  LayoutGrid,
  List as ListIcon
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicTreeNode } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

type ViewMode = "list" | "gallery";

function iconFor(node: PublicTreeNode) {
  switch (node.type) {
    case "directory":
    case "cabinet":
      return Folder;
    case "image":
      return FileImage;
    case "video":
      return FileVideo;
    case "audio":
      return FileAudio;
    case "code":
      return FileCode2;
    case "csv":
      return FileSpreadsheet;
    default:
      if (node.assetUrl?.endsWith(".html")) return Globe;
      if (node.assetUrl?.endsWith(".app")) return AppWindow;
      return node.route ? FileText : File;
  }
}

function isImageHeavy(children: PublicTreeNode[]) {
  const images = children.filter((child) => child.type === "image").length;
  return children.length > 0 && images >= 4 && images / children.length >= 0.6;
}

export function PublicFolderIndex({
  entries,
  basePath
}: {
  entries: PublicTreeNode[];
  basePath: string;
}) {
  const sorted = useMemo(() => {
    return [...entries].sort((a, b) => {
      const ao = a.order ?? Number.POSITIVE_INFINITY;
      const bo = b.order ?? Number.POSITIVE_INFINITY;
      if (ao !== bo) return ao - bo;
      const ad = a.type === "directory" || a.type === "cabinet";
      const bd = b.type === "directory" || b.type === "cabinet";
      if (ad !== bd) return ad ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }, [entries]);

  const [mode, setMode] = useState<ViewMode>(() => (isImageHeavy(sorted) ? "gallery" : "list"));

  if (sorted.length === 0) return null;

  return (
    <section className="mt-10 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase text-muted-foreground/70">
          {sorted.length} {sorted.length === 1 ? "item" : "items"}
        </p>
        <div className="inline-flex items-center rounded-md border border-border p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setMode("list")}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 transition-colors",
              mode === "list" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ListIcon className="h-3 w-3" />
            List
          </button>
          <button
            type="button"
            onClick={() => setMode("gallery")}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 transition-colors",
              mode === "gallery" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3 w-3" />
            Gallery
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <ul className="overflow-hidden rounded-md border border-border">
          {sorted.map((child) => {
            const Icon = iconFor(child);
            const href = child.route ? withBasePath(child.route, basePath) : child.assetUrl || "#";
            return (
              <li key={`${child.type}:${child.path}`} className="border-b border-border last:border-b-0">
                <Link
                  href={href}
                  target={!child.route && child.assetUrl ? "_blank" : undefined}
                  className="flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-accent/50"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate">{child.title}</span>
                  <span className="text-[11px] capitalize text-muted-foreground/60">{child.type}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sorted.map((child) => {
            const Icon = iconFor(child);
            const href = child.route ? withBasePath(child.route, basePath) : child.assetUrl || "#";
            const isImage = child.type === "image" && child.assetUrl;
            return (
              <Link
                key={`${child.type}:${child.path}`}
                href={href}
                target={!child.route && child.assetUrl ? "_blank" : undefined}
                className="group flex flex-col gap-1.5 text-left"
                title={child.title}
              >
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border border-border bg-muted/40 transition-colors group-hover:bg-muted">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={child.assetUrl}
                      alt={child.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                    />
                  ) : (
                    <Icon className="h-8 w-8 text-muted-foreground/60" />
                  )}
                </div>
                <span className="truncate text-[12px] text-muted-foreground group-hover:text-foreground">
                  {child.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
