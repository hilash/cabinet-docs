"use client";

import {
  Archive,
  ArrowDownToLine,
  Bot,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  HeartPulse,
  LayoutList,
  Loader2,
  MessageCircleQuestion,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  SquareKanban,
  Terminal,
  type LucideIcon
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { StaticScheduleCalendar, type StaticCalendarMode } from "@/components/static-schedule-calendar";
import { demoAgents, demoTasks, type DemoTask } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type BoardView = "kanban" | "list" | "schedule";
type Density = "comfortable" | "compact";
type LaneKey = "inbox" | "needs" | "running" | "done" | "archive";

const LANES: Array<{
  key: LaneKey;
  label: string;
  icon: LucideIcon;
}> = [
  { key: "inbox", label: "Inbox", icon: ArrowDownToLine },
  { key: "needs", label: "Your turn", icon: MessageCircleQuestion },
  { key: "running", label: "Running", icon: Loader2 },
  { key: "done", label: "Just Finished", icon: CheckCircle2 },
  { key: "archive", label: "Archive", icon: Archive }
];

const VIEW_OPTIONS: Array<{ key: BoardView; label: string; icon: LucideIcon }> = [
  { key: "kanban", label: "Kanban", icon: SquareKanban },
  { key: "list", label: "List", icon: LayoutList },
  { key: "schedule", label: "Schedule", icon: CalendarRange }
];

function laneFor(task: DemoTask): LaneKey {
  if (task.status === "needs-review") return "needs";
  if (task.status === "running") return "running";
  if (task.status === "done") return "done";
  if (task.status === "archive") return "archive";
  return "inbox";
}

function agentFor(task: DemoTask) {
  return demoAgents.find((agent) => agent.name === task.agent);
}

function taskState(task: DemoTask, lane: LaneKey) {
  if (lane === "running") return "running";
  if (lane === "needs") return "ask";
  if (lane === "done") return "just-done";
  if (lane === "archive") return "archive";
  if (task.status === "scheduled") return "handoff";
  return "idle";
}

function StatusIcon({
  state,
  size = "sm"
}: {
  state: "running" | "ask" | "just-done" | "handoff" | "idle" | "archive";
  size?: "sm" | "md";
}) {
  const meta = {
    running: {
      icon: Loader2,
      color: "text-sky-500",
      label: "Running",
      animate: "animate-spin [animation-duration:1.6s]"
    },
    ask: {
      icon: MessageCircleQuestion,
      color: "text-amber-500",
      label: "Your turn"
    },
    "just-done": {
      icon: CheckCircle2,
      color: "text-emerald-500",
      label: "Just finished"
    },
    handoff: {
      icon: ArrowDownToLine,
      color: "text-violet-500",
      label: "Waiting to start"
    },
    idle: {
      icon: Circle,
      color: "text-muted-foreground/50",
      label: "Idle"
    },
    archive: {
      icon: Archive,
      color: "text-muted-foreground/50",
      label: "Archive"
    }
  }[state];
  const Icon = meta.icon;

  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center", meta.color)} title={meta.label}>
      <Icon className={cn(size === "md" ? "h-4 w-4" : "h-3.5 w-3.5", meta.animate)} strokeWidth={2.25} />
    </span>
  );
}

function AgentPill({ task, size = "md" }: { task: DemoTask; size?: "sm" | "md" }) {
  const agent = agentFor(task);
  const Icon = agent?.Icon;
  const color = agent?.color ?? "rgb(99, 102, 241)";

  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
        size === "sm" ? "max-w-[112px] text-[9.5px]" : "max-w-[142px] text-[10px]"
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
        color
      }}
      title={task.agent}
    >
      {Icon && <Icon className="h-2.5 w-2.5 shrink-0" />}
      <span className="truncate">{task.agent}</span>
    </span>
  );
}

function ViewToggle({
  value,
  onChange
}: {
  value: BoardView;
  onChange: (view: BoardView) => void;
}) {
  return (
    <div className="flex h-7 items-center rounded-lg border border-border/60 p-0.5">
      {VIEW_OPTIONS.map((option) => {
        const Icon = option.icon;
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function DensityToggle({
  value,
  onChange
}: {
  value: Density;
  onChange: (density: Density) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value === "comfortable" ? "compact" : "comfortable")}
      className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      title="Toggle task density"
    >
      <SlidersHorizontal className="h-3.5 w-3.5" />
      {value === "comfortable" ? "Comfort" : "Compact"}
    </button>
  );
}

function HeaderButton({
  children,
  active,
  title
}: {
  children: ReactNode;
  active?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title={title ?? "Static public demo"}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function TriggerChip({
  active,
  children,
  count,
  icon,
  tone = "neutral"
}: {
  active?: boolean;
  children: ReactNode;
  count?: ReactNode;
  icon?: ReactNode;
  tone?: "neutral" | "sky" | "emerald" | "pink";
}) {
  const toneClass = {
    neutral: "",
    sky: "text-sky-600 dark:text-sky-300",
    emerald: "text-emerald-600 dark:text-emerald-300",
    pink: "text-pink-600 dark:text-pink-300"
  }[tone];

  return (
    <button
      type="button"
      aria-disabled="true"
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] transition-colors",
        active ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground hover:bg-muted",
        !active && toneClass
      )}
    >
      {icon}
      {count ? <span className="font-semibold tabular-nums">{count}</span> : null}
      {children}
    </button>
  );
}

function TaskCard({
  task,
  lane,
  density
}: {
  task: DemoTask;
  lane: LaneKey;
  density: Density;
}) {
  const compact = density === "compact";
  const state = taskState(task, lane);
  const groupSize = task.groupSize && task.groupSize > 1 ? task.groupSize : 0;

  return (
    <div id={task.id} className="group relative w-full scroll-mt-24">
      <button
        type="button"
        aria-disabled="true"
        aria-label={task.title}
        title={`${task.title} - static public demo`}
        className={cn(
          "relative w-full rounded-md border bg-card text-left transition-all",
          "hover:border-foreground/30 hover:shadow-sm",
          compact ? "px-2 py-1.5" : "p-3",
          "border-border/60",
          task.trigger === "heartbeat" &&
            "border-l-2 border-l-pink-500/50 bg-[linear-gradient(to_right,rgba(236,72,153,0.035),transparent_30%)]"
        )}
      >
        <div className="flex items-start gap-2">
          <span className={cn("shrink-0", compact ? "mt-px" : "mt-0.5")}>
            <StatusIcon state={state} />
          </span>
          <p
            title={task.title}
            className={cn(
              "flex-1 leading-snug text-foreground",
              compact ? "line-clamp-1 pr-14 text-[12px]" : "line-clamp-2 pr-[88px] text-[13px]"
            )}
          >
            {task.title}
          </p>
        </div>
        <div
          className={cn(
            "flex min-w-0 items-center gap-1.5 text-[10.5px] text-muted-foreground",
            compact ? "mt-1.5" : "mt-2.5"
          )}
        >
          <AgentPill task={task} size={compact ? "sm" : "md"} />
          {lane === "needs" && (
            <span className="inline-flex items-center gap-0.5 rounded bg-violet-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-violet-600 dark:text-violet-400">
              <ShieldCheck className="h-2.5 w-2.5" />
              Approval
            </span>
          )}
          {groupSize > 0 && (
            <span
              title={`${groupSize} runs collapsed - showing the latest`}
              className="inline-flex items-center gap-0.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-pink-600 dark:text-pink-400"
            >
              <HeartPulse className="h-2.5 w-2.5" />+{groupSize - 1}
            </span>
          )}
          {!compact && (
            <span className="truncate font-mono text-[10px] text-foreground/60">
              {task.model}
            </span>
          )}
          {task.agent === "Product Auditor" && !compact ? (
            <span
              title="Running in terminal mode in the real app"
              className="inline-flex items-center gap-0.5 rounded bg-emerald-500/15 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
            >
              <Terminal className="h-2.5 w-2.5" />
              PTY
            </span>
          ) : null}
          <span className="ml-auto whitespace-nowrap tabular-nums">{task.lastActivity}</span>
        </div>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-muted-foreground">
            {task.note}
          </p>
        )}
      </button>
    </div>
  );
}

function KanbanView({ density }: { density: Density }) {
  const byLane = useMemo(() => {
    const next = new Map<LaneKey, DemoTask[]>();
    LANES.forEach((lane) => next.set(lane.key, []));
    demoTasks.forEach((task) => {
      next.get(laneFor(task))?.push(task);
    });
    return next;
  }, []);

  return (
    <div className="grid min-h-[560px] gap-2 overflow-x-auto p-3 md:grid-cols-5">
      {LANES.map((lane) => {
        const Icon = lane.icon;
        const laneTasks = byLane.get(lane.key) ?? [];
        return (
          <section key={lane.key} className="flex min-w-[210px] flex-col rounded-lg border border-border/70 bg-muted/20">
            <div className="flex w-full items-center gap-2 border-b border-border/60 px-3 py-2 text-left">
              <Icon className={cn("h-3.5 w-3.5 text-muted-foreground", lane.key === "running" && "animate-spin text-sky-500 [animation-duration:1.8s]")} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {lane.label}
              </span>
              <span className="ml-auto rounded-full bg-background px-1.5 text-[10px] font-medium tabular-nums text-muted-foreground">
                {laneTasks.length}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-2">
              {laneTasks.length > 0 ? (
                laneTasks.map((task) => (
                  <TaskCard key={task.id} task={task} lane={lane.key} density={density} />
                ))
              ) : (
                <div className="rounded-md border border-dashed border-border/70 px-2 py-6 text-center text-[11px] text-muted-foreground/70">
                  Nothing here yet.
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ListView({ density }: { density: Density }) {
  const sorted = useMemo(
    () =>
      [...demoTasks].sort((a, b) => {
        const rank = (lane: LaneKey) =>
          lane === "running" ? 0 : lane === "needs" ? 1 : lane === "inbox" ? 2 : lane === "done" ? 3 : 4;
        const laneDelta = rank(laneFor(a)) - rank(laneFor(b));
        if (laneDelta !== 0) return laneDelta;
        return demoTasks.indexOf(a) - demoTasks.indexOf(b);
      }),
    []
  );

  return (
    <div className="min-h-[560px] overflow-y-auto md:px-[4%] lg:px-[6%] xl:px-[8%]">
      <div className="divide-y divide-border/60">
        {sorted.map((task, index) => {
          const lane = laneFor(task);
          const selected = index === 0;
          return (
            <button
              id={task.id}
              key={task.id}
              type="button"
              aria-disabled="true"
              title={`${task.title} - static public demo`}
              className={cn(
                "relative flex w-full items-center gap-3 px-6 text-left transition-colors hover:bg-muted/40",
                density === "compact" ? "py-2" : "py-2.5"
              )}
            >
              {selected && <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-primary" />}
              <StatusIcon state={taskState(task, lane)} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-[13px] font-medium text-foreground">{task.title}</span>
                  {lane === "needs" && (
                    <span className="shrink-0 rounded bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600 dark:text-amber-400">
                      approval
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{task.note}</p>
              </div>
              <AgentPill task={task} />
              <span className="hidden w-20 text-right font-mono text-[10px] text-muted-foreground sm:block">
                {task.model}
              </span>
              <span className="w-16 text-right text-[10.5px] tabular-nums text-muted-foreground">
                {task.lastActivity}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CalendarModeToggle({
  value,
  onChange
}: {
  value: StaticCalendarMode;
  onChange: (mode: StaticCalendarMode) => void;
}) {
  return (
    <div className="flex h-7 items-center rounded-lg border border-border/60 p-0.5">
      {(["day", "week", "month"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          className={cn(
            "rounded-md px-2.5 py-1 text-[11px] font-medium capitalize transition-colors",
            value === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

function ScheduleView() {
  const [mode, setMode] = useState<StaticCalendarMode>("week");
  const label = mode === "month" ? "May 2026" : mode === "day" ? "Wednesday, May 6" : "May 4 - 8, 2026";

  return (
    <div className="flex min-h-[560px] flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-background/95 px-3 py-2">
        <CalendarModeToggle value={mode} onChange={setMode} />
        <div className="ml-auto flex items-center gap-1">
          <HeaderButton title="Static public demo">
            <ChevronLeft className="h-3.5 w-3.5" />
          </HeaderButton>
          <HeaderButton active title="Static public demo">
            Today
          </HeaderButton>
          <HeaderButton title="Static public demo">
            <ChevronRight className="h-3.5 w-3.5" />
          </HeaderButton>
        </div>
        <div className="min-w-[132px] text-right text-[12px] font-semibold text-foreground">{label}</div>
      </div>
      <div className="min-h-0 flex-1 p-3">
        <StaticScheduleCalendar mode={mode} />
      </div>
    </div>
  );
}

export function ReadOnlyTaskBoard() {
  const [view, setView] = useState<BoardView>("kanban");
  const [density, setDensity] = useState<Density>("comfortable");

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-border/70 bg-background text-foreground shadow-sm">
      <header className="flex flex-wrap items-center gap-3 border-b border-border/70 bg-background/95 px-4 py-2.5 sm:px-6">
        <h2 className="text-[14px] font-semibold tracking-tight">Tasks</h2>
        <div className="ml-4 flex items-center gap-2">
          <ViewToggle value={view} onChange={setView} />
          <DensityToggle value={density} onChange={setDensity} />
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <HeaderButton title="Cabinet visibility depth">
            All <ChevronDown className="h-3.5 w-3.5" />
          </HeaderButton>
          <div className="h-3.5 w-px bg-border/60" />
          <HeaderButton title="Static agent filter">
            Agent <ChevronDown className="h-3.5 w-3.5" />
          </HeaderButton>
          <div className="h-3.5 w-px bg-border/60" />
          <div className="flex items-center gap-1">
            <TriggerChip active count={demoTasks.length}>
              All
            </TriggerChip>
            <TriggerChip icon={<Bot className="h-3 w-3" />} tone="sky">
              Manual
            </TriggerChip>
            <TriggerChip icon={<Clock3 className="h-3 w-3" />} tone="emerald">
              Jobs
            </TriggerChip>
            <TriggerChip icon={<HeartPulse className="h-3 w-3" />} tone="pink">
              Heartbeat
            </TriggerChip>
          </div>
          <div className="h-3.5 w-px bg-border/60" />
          <div className="inline-flex h-7 items-stretch overflow-hidden rounded-md shadow-sm ring-1 ring-primary/20">
            <button
              type="button"
              aria-disabled="true"
              title="Disabled on the public docs site"
              className="inline-flex items-center gap-1.5 bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground opacity-85"
            >
              <Plus className="h-3.5 w-3.5" />
              New Task
            </button>
            <button
              type="button"
              aria-disabled="true"
              title="Disabled on the public docs site"
              className="inline-flex items-center bg-primary px-1.5 text-primary-foreground opacity-85"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-border/70 bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground sm:px-6">
        Read-only public board. It keeps Cabinet&apos;s lanes, list, schedule, filters, and card language, but every task is public-safe demo data.
      </div>

      {view === "kanban" && <KanbanView density={density} />}
      {view === "list" && <ListView density={density} />}
      {view === "schedule" && <ScheduleView />}
    </section>
  );
}
