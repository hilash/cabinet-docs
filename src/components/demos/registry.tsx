"use client";

import type { ComponentType } from "react";
import { ApprovalQueueDemo } from "./approval-queue";
import { ByoaiDemo } from "./byoai-pickers";
import { CabinetVsDemo } from "./cabinet-vs";
import { CalloutGalleryDemo } from "./callout-gallery";
import { FileTypesTableDemo } from "./file-types-table";
import { HeartbeatClockDemo } from "./heartbeat-clock";
import { HighlightSwatchesDemo } from "./highlight-swatches";
import { MermaidRenderDemo } from "./mermaid-render";
import { NestedCabinetsDemo } from "./nested-cabinets";
import { OrgChartDemo } from "./org-chart";
import { PersonaFileDemo } from "./persona-file";
import { RhythmDemo } from "./rhythm";
import { SlashMenuDemo } from "./slash-menu";
import { StoriesGridDemo } from "./stories-grid";
import { TaskBoardMiniDemo } from "./task-board-mini";
import { TerminalBootDemo } from "./terminal-boot";

type DemoProps = { caption?: string };

const REGISTRY: Record<string, ComponentType<DemoProps>> = {
  "approval-queue": ApprovalQueueDemo,
  byoai: ByoaiDemo,
  "cabinet-vs": CabinetVsDemo,
  "callout-gallery": CalloutGalleryDemo,
  "file-types-table": FileTypesTableDemo,
  "heartbeat-clock": HeartbeatClockDemo,
  "highlight-swatches": HighlightSwatchesDemo,
  "mermaid-render": MermaidRenderDemo,
  "nested-cabinets": NestedCabinetsDemo,
  "org-chart": OrgChartDemo,
  "persona-file": PersonaFileDemo,
  rhythm: RhythmDemo,
  "slash-menu": SlashMenuDemo,
  stories: StoriesGridDemo,
  "task-board-mini": TaskBoardMiniDemo,
  "terminal-boot": TerminalBootDemo,
};

export function getDemoComponent(id: string): ComponentType<DemoProps> | null {
  return REGISTRY[id] ?? null;
}
