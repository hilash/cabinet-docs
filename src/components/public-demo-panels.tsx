"use client";

import { Bot, Download, ListChecks, Sparkles } from "lucide-react";
import { FeatureHintButton } from "@/components/feature-hint";
import { demoAgents, demoTasks } from "@/lib/demo-data";
import { featureHints } from "@/lib/feature-hints";
import { cn } from "@/lib/utils";

function statusClass(status: string) {
  switch (status) {
    case "running":
      return "bg-emerald-500";
    case "live":
      return "bg-emerald-400";
    case "needs-review":
      return "bg-amber-500";
    case "scheduled":
      return "bg-blue-400";
    case "done":
      return "bg-emerald-500";
    case "archive":
      return "bg-muted-foreground/40";
    case "paused":
      return "bg-muted-foreground/30";
    default:
      return "bg-muted-foreground/40";
  }
}

function DemoSectionHeader({
  title,
  count,
  hint,
  basePath
}: {
  title: string;
  count: number;
  hint: keyof typeof featureHints;
  basePath: string;
}) {
  return (
    <div className="flex items-center justify-between px-1 pt-4 pb-1.5 text-[10px] uppercase text-muted-foreground/70">
      <div className="flex items-center gap-1">
        <span>{title}</span>
        <FeatureHintButton hint={featureHints[hint]} basePath={basePath} align="left" />
      </div>
      <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] normal-case text-muted-foreground">
        {count} demo
      </span>
    </div>
  );
}

export function PublicDemoPanels({ basePath }: { basePath: string }) {
  return (
    <div className="space-y-1 border-t border-sidebar-border px-1 pt-2">
      <DemoSectionHeader title="Agents" count={demoAgents.length} hint="agents-panel" basePath={basePath} />
      <div className="space-y-1">
        {demoAgents.map((agent) => {
          const Icon = agent.Icon;
          return (
            <div
              key={agent.slug}
              className={cn(
                "group rounded-md border border-transparent px-2 py-1.5 transition-colors",
                "hover:border-border/70 hover:bg-foreground/[0.03]"
              )}
              title={`${agent.name} - static demo agent`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-background"
                  style={{ backgroundColor: agent.color }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-[12px] font-medium">{agent.name}</span>
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", statusClass(agent.status), agent.status === "running" && "animate-pulse")} />
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground/70">
                    {agent.role} · {agent.model}
                  </div>
                </div>
              </div>
              <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground/60">
                {agent.note}
              </p>
            </div>
          );
        })}
      </div>

      <DemoSectionHeader title="Tasks" count={demoTasks.length} hint="tasks-panel" basePath={basePath} />
      <div className="space-y-1">
        {demoTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "group rounded-md border border-transparent px-2 py-1.5 transition-colors",
              "hover:border-border/70 hover:bg-foreground/[0.03]"
            )}
            title={`${task.title} - static demo task`}
          >
            <div className="flex items-start gap-2">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", statusClass(task.status), task.status === "running" && "animate-pulse")} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-medium">{task.title}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground/65">
                  <span>{task.agent}</span>
                  <span>·</span>
                  <span>{task.trigger}</span>
                  <span>·</span>
                  <span>{task.status.replace("-", " ")}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground/60">
                  {task.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-1 mt-3 rounded-lg border border-primary/20 bg-primary/[0.04] p-2.5">
        <div className="flex items-center gap-2 text-[11px] font-medium">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Read-only demo panels
        </div>
        <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
          These rows show what a real Cabinet can contain. This public website never runs agents or tasks.
        </p>
        <a
          href="https://github.com/cabinetai/cabinet/releases/latest"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Download className="h-3 w-3" />
          Get Cabinet
        </a>
      </div>

      <div className="flex items-center gap-1 px-2 py-2 text-[10px] text-muted-foreground/50">
        <Bot className="h-3 w-3" />
        No backend. No private tasks. Just the shape.
        <ListChecks className="ml-auto h-3 w-3" />
      </div>
    </div>
  );
}
