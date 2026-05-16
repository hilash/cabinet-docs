import {
  Archive,
  CheckCircle2,
  FileText,
  KanbanSquare,
  Loader2,
  MessageCircleQuestion,
  Play,
  Sparkles
} from "lucide-react";
import { FeatureHintButton } from "@/components/feature-hint";
import { demoDepartments, demoTasks, showcaseFiles } from "@/lib/demo-data";
import { featureHints } from "@/lib/feature-hints";
import { cn } from "@/lib/utils";

const lanes = [
  { key: "inbox", label: "Inbox", icon: Archive },
  { key: "needs-review", label: "Your turn", icon: MessageCircleQuestion },
  { key: "running", label: "Running", icon: Loader2 },
  { key: "done", label: "Just Finished", icon: CheckCircle2 },
  { key: "archive", label: "Archive", icon: Archive }
] as const;

function taskLane(status: string) {
  if (status === "scheduled") return "inbox";
  return status;
}

function statusDot(status: string) {
  switch (status) {
    case "running":
      return "bg-emerald-500";
    case "needs-review":
      return "bg-amber-500";
    case "scheduled":
      return "bg-blue-400";
    case "done":
      return "bg-emerald-500";
    case "archive":
      return "bg-muted-foreground/40";
    default:
      return "bg-primary";
  }
}

export function DocsShowcase({ basePath, compact = false }: { basePath: string; compact?: boolean }) {
  const visibleFiles = compact ? showcaseFiles.slice(0, 4) : showcaseFiles;

  return (
    <section className="mt-10 space-y-4 border-y border-border py-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold">Cabinet, as a public demo</h2>
            <FeatureHintButton hint={featureHints.showcase} basePath={basePath} align="left" />
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            The docs are static, but the surface shows how a real cabinet can hold files, agents, tasks, routines, screenshots, and reports together.
          </p>
        </div>
        <a
          href="https://runcabinet.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Play className="h-4 w-4" />
          Get Cabinet
        </a>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <FileText className="h-4 w-4 text-primary" />
            File showcase
          </div>
          <div className="mt-3 grid gap-2">
            {visibleFiles.map((file) => (
              <div key={file.path} className="rounded-md border border-border/70 bg-background p-3">
                <div className="flex items-start gap-2">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: file.accent }}
                  />
                  <div className="min-w-0">
                    <div className="break-all font-mono text-xs text-foreground">{file.path}</div>
                    <div className="mt-1 text-[11px] uppercase text-muted-foreground/70">{file.kind}</div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{file.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Archive className="h-4 w-4 text-primary" />
            AI team directory
          </div>
          <div className="mt-3 grid gap-2">
            {demoDepartments.map((department) => {
              const Icon = department.Icon;
              return (
                <div key={department.name} className="rounded-md border border-border/70 bg-background p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-medium">{department.name}</div>
                      <div className="text-xs text-muted-foreground">Lead: {department.lead}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {department.agents.map((agent) => (
                      <span
                        key={agent}
                        className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <KanbanSquare className="h-4 w-4 text-primary" />
            Static task board preview
          </div>
          <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            Demo only
          </span>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-5">
          {lanes.map((lane) => {
            const Icon = lane.icon;
            const laneTasks = demoTasks.filter((task) => taskLane(task.status) === lane.key);
            return (
              <div key={lane.key} className="rounded-md border border-border/70 bg-background p-2">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-muted-foreground">
                  <Icon className={cn("h-3 w-3", lane.key === "running" && "animate-spin [animation-duration:3s]")} />
                  <span>{lane.label}</span>
                  <span className="ml-auto">{laneTasks.length}</span>
                </div>
                <div className="space-y-1.5">
                  {(laneTasks.length ? laneTasks : [{ id: `${lane.key}-empty`, title: "Waiting for a good idea", agent: "Cabinet", status: lane.key, trigger: "manual", note: "" }]).map((task) => (
                    <div key={task.id} className="rounded border border-border/60 bg-card p-2">
                      <div className="flex items-start gap-1.5">
                        <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", statusDot(task.status))} />
                        <div className="min-w-0">
                          <div className="line-clamp-2 text-xs font-medium">{task.title}</div>
                          <div className="mt-1 text-[10px] text-muted-foreground">{task.agent}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
