"use client";

import { CompareTable, type CompareRow } from "@/components/docs/compare-table";

const ROWS: CompareRow[] = [
  { feature: "Knowledge base / wiki", values: [true, true, true, false] },
  { feature: "Markdown files on disk", values: [true, true, false, false] },
  { feature: "Self-hosted / local-first", values: [true, true, false, true] },
  { feature: "AI agent orchestration", values: [true, false, "partial", true] },
  { feature: "Agent org chart / departments", values: [true, false, false, "partial"] },
  { feature: "Agent heartbeats & schedules", values: [true, false, false, false] },
  { feature: "Approval-before-action queue", values: [true, false, false, false] },
  { feature: "Embedded HTML apps", values: [true, false, false, false] },
  { feature: "Bring-your-own AI provider", values: [true, false, false, "partial"] },
  { feature: "Plug-and-play templates", values: [true, "partial", true, false] },
  { feature: "WYSIWYG editor", values: [true, true, true, false] },
  { feature: "PDF / CSV inline view", values: [true, "partial", false, false] },
  { feature: "Git-backed page history", values: [true, "partial", "partial", false] },
  { feature: "No database required", values: [true, true, false, false] },
];

export function CabinetVsDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <CompareTable
        columns={["Cabinet", "Obsidian", "Notion", "Generic agent"]}
        rows={ROWS}
        primaryIndex={0}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
