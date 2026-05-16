"use client";

import { useState } from "react";
import {
  Bot,
  Clock,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  label: string;
  hint?: string;
  kind: "root" | "child" | "agent" | "job" | "page";
  depth: number;
  children?: Node[];
};

const TREE: Node = {
  id: "root",
  label: "my-company/",
  hint: "root cabinet",
  kind: "root",
  depth: 0,
  children: [
    { id: "manifest", label: ".cabinet", hint: "identity", kind: "page", depth: 1 },
    { id: "agents-dir", label: ".agents/", hint: "AI team", kind: "agent", depth: 1 },
    { id: "jobs-dir", label: ".jobs/", hint: "scheduled work", kind: "job", depth: 1 },
    { id: "index", label: "index.md", hint: "entry page", kind: "page", depth: 1 },
    {
      id: "marketing",
      label: "marketing/",
      hint: "child cabinet",
      kind: "child",
      depth: 1,
      children: [
        { id: "m-agents", label: ".agents/", hint: "GTM Lead, Copywriter", kind: "agent", depth: 2 },
        { id: "m-jobs", label: ".jobs/", hint: "Monday launch room", kind: "job", depth: 2 },
        { id: "m-launch", label: "launches/", hint: "drafts & reports", kind: "page", depth: 2 },
      ],
    },
    {
      id: "research",
      label: "research/",
      hint: "child cabinet",
      kind: "child",
      depth: 1,
      children: [
        { id: "r-agents", label: ".agents/", hint: "Research Lead", kind: "agent", depth: 2 },
        { id: "r-briefs", label: "briefs/", hint: "competitor briefs", kind: "page", depth: 2 },
      ],
    },
    {
      id: "clients",
      label: "clients/acme/",
      hint: "child cabinet",
      kind: "child",
      depth: 1,
    },
  ],
};

function flatten(node: Node, out: Node[] = []): Node[] {
  out.push(node);
  for (const child of node.children ?? []) flatten(child, out);
  return out;
}

const KIND_ICON = {
  root: FolderOpen,
  child: Folder,
  agent: Bot,
  job: Clock,
  page: FileText,
} as const;

const KIND_TONE = {
  root: "text-amber-600 dark:text-amber-400",
  child: "text-amber-600 dark:text-amber-400",
  agent: "text-emerald-600 dark:text-emerald-400",
  job: "text-sky-600 dark:text-sky-400",
  page: "text-muted-foreground",
} as const;

export function NestedCabinetsDemo({ caption }: { caption?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const rows = flatten(TREE);

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>A cabinet on disk</span>
          <span className="hidden sm:inline">hover a row</span>
        </div>

        <ul className="font-mono text-sm space-y-0.5">
          {rows.map((node) => {
            const Icon = KIND_ICON[node.kind];
            const tone = KIND_TONE[node.kind];
            const isRoot = node.kind === "root";
            const isChild = node.kind === "child";
            const active = hovered === node.id;

            return (
              <li
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
                  active && "bg-muted/60",
                )}
                style={{ paddingLeft: 8 + node.depth * 20 }}
              >
                <Icon className={cn("h-3.5 w-3.5 shrink-0", tone)} />
                <span
                  className={cn(
                    "truncate",
                    isRoot || isChild
                      ? "font-medium text-foreground"
                      : "text-foreground/80",
                  )}
                >
                  {node.label}
                </span>
                {node.hint && (
                  <span
                    className={cn(
                      "ml-auto pl-3 text-[11px]",
                      isRoot || isChild
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {node.hint}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
          <Legend icon={FolderOpen} tone={KIND_TONE.root} label="cabinet" />
          <Legend icon={Folder} tone={KIND_TONE.child} label="child cabinet" />
          <Legend icon={Bot} tone={KIND_TONE.agent} label=".agents — your team" />
          <Legend icon={Clock} tone={KIND_TONE.job} label=".jobs — schedules" />
          <Legend icon={FileText} tone={KIND_TONE.page} label="markdown page" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Legend({
  icon: Icon,
  tone,
  label,
}: {
  icon: typeof Folder;
  tone: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className={cn("h-3 w-3", tone)} />
      {label}
    </span>
  );
}
