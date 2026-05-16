"use client";

import {
  Activity,
  Bot,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crown,
  HeartPulse,
  Loader2,
  Maximize2,
  Network,
  Plus,
  RefreshCw,
  Sparkles,
  UserPlus,
  X
} from "lucide-react";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import { StaticScheduleCalendar, type StaticCalendarMode } from "@/components/static-schedule-calendar";
import { demoAgents, demoDepartments } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

function tint(color: string, alpha = 12) {
  return `color-mix(in srgb, ${color} ${alpha}%, transparent)`;
}

function AgentAvatar({
  color,
  Icon,
  label,
  size = "md"
}: {
  color: string;
  Icon?: ComponentType<{ className?: string }>;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const avatarSize = size === "lg" ? "h-14 w-14 text-[16px]" : size === "sm" ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-[12px]";
  const iconSize = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  const initials = label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]",
        avatarSize
      )}
      style={{ backgroundColor: color }}
    >
      {Icon ? <Icon className={iconSize} /> : initials}
    </span>
  );
}

function ActivityBeacon({ status }: { status: string }) {
  const running = status === "running";
  const live = status === "live";
  return (
    <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
      {(running || live) && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-35",
            running ? "animate-ping bg-sky-500" : "bg-emerald-500"
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          running && "bg-sky-500",
          live && "bg-emerald-500",
          status === "scheduled" && "bg-blue-400",
          status === "paused" && "bg-muted-foreground/30"
        )}
      />
    </span>
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

function MetricPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
      {children}
    </span>
  );
}

function ScheduleModeToggle({
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

function RootAgentCard() {
  return (
    <button
      type="button"
      aria-disabled="true"
      title="In Cabinet this opens the top-level operator profile."
      className="group flex w-full max-w-[380px] items-center gap-3 rounded-[26px] border border-primary/15 bg-primary/[0.08] p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/[0.11]"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_35px_rgba(0,0,0,0.08)]">
        <Crown className="h-6 w-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] font-semibold text-foreground">Cabinet Operator</span>
          <ActivityBeacon status="live" />
        </span>
        <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">
          Coordinates the team, routes work, and keeps the cabinet readable.
        </span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          <MetricPill>
            <Sparkles className="h-2.5 w-2.5 text-primary" />
            Orchestrator
          </MetricPill>
          <MetricPill>
            <HeartPulse className="h-2.5 w-2.5 text-pink-500" />
            Heartbeats on
          </MetricPill>
        </span>
      </span>
    </button>
  );
}

function DepartmentCard({
  department,
  members
}: {
  department: (typeof demoDepartments)[number];
  members: typeof demoAgents;
}) {
  const Icon = department.Icon;
  const lead = members.find((agent) => agent.name === department.lead) ?? members[0];

  return (
    <article className="rounded-[26px] border border-border/60 bg-primary/[0.08] p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background/80 text-primary ring-1 ring-border/60">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-[14px] font-semibold text-foreground">{department.name}</h3>
            <span className="rounded-full bg-background/70 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              {members.length} agents
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
            Lead: {lead?.name ?? department.lead}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {members.map((agent) => {
          const AgentIcon = agent.Icon;
          return (
            <a
              key={agent.slug}
              href={`#${agent.slug}`}
              className="group rounded-2xl border border-border/50 bg-background/72 p-3 text-left transition hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background"
              title={`${agent.name} profile - static demo`}
            >
              <div className="flex items-start gap-2.5">
                <AgentAvatar color={agent.color} Icon={AgentIcon} label={agent.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-[12px] font-semibold text-foreground">{agent.name}</span>
                    <ActivityBeacon status={agent.status} />
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-4 text-muted-foreground">
                    {agent.role}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="rounded bg-muted/55 px-1.5 py-0.5 text-[9.5px] text-muted-foreground">
                      {agent.model}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-muted/55 px-1.5 py-0.5 text-[9.5px] text-muted-foreground">
                      <Clock3 className="h-2.5 w-2.5" />
                      {agent.routine}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </article>
  );
}

function AgentProfileGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {demoAgents.map((agent) => {
        const Icon = agent.Icon;
        return (
          <article
            id={agent.slug}
            key={agent.slug}
            className="group scroll-mt-24 rounded-xl border border-border/70 bg-card p-4 text-left transition hover:border-foreground/20 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <AgentAvatar color={agent.color} Icon={Icon} label={agent.name} />
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <h3 className="truncate text-[13px] font-semibold text-foreground">{agent.name}</h3>
                  <ActivityBeacon status={agent.status} />
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {agent.role} · {agent.department}
                </p>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: tint(agent.color, 10), color: agent.color }}
              >
                {agent.model}
              </span>
            </div>
            <p className="mt-3 line-clamp-3 text-[12px] leading-5 text-muted-foreground">
              {agent.note}
            </p>
            <div className="mt-3 grid gap-1.5 text-[10px] text-muted-foreground">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-muted/45 px-2 py-1">
                <HeartPulse className="h-3 w-3 text-pink-500" />
                {agent.heartbeat}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-muted/45 px-2 py-1">
                <Clock3 className="h-3 w-3 text-primary" />
                {agent.routine}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ReadOnlyNotice() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-3 text-[12px] leading-5 text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <Bot className="h-4 w-4 text-primary" />
        Static public workspace
      </div>
      <p className="mt-1">
        This page mirrors Cabinet&apos;s agent workspace, but every control is demo-only. No agents run, no private files are read, and no backend is present.
      </p>
    </div>
  );
}

export function ReadOnlyAgentWorkspace() {
  const [scheduleMode, setScheduleMode] = useState<StaticCalendarMode>("week");
  const activeCount = demoAgents.filter((agent) => agent.status !== "paused").length;
  const departments = useMemo(
    () =>
      demoDepartments
        .map((department) => ({
          department,
          members: demoAgents.filter((agent) => agent.department === department.name)
        }))
        .filter((item) => item.members.length > 0),
    []
  );

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-border/70 bg-background text-foreground shadow-sm">
      <div className="flex flex-wrap items-center gap-3 border-b border-border/70 bg-background/95 px-4 py-2.5 sm:px-6">
        <h2 className="truncate text-[14px] font-semibold tracking-tight text-foreground">Agents</h2>
        <div className="flex items-center gap-1.5">
          <MetricPill>
            <span className="font-semibold tabular-nums text-foreground">{demoAgents.length}</span>
            agents
          </MetricPill>
          <MetricPill>
            <span className="font-semibold tabular-nums text-foreground">{activeCount}</span>
            active
          </MetricPill>
          <MetricPill>
            <span className="font-semibold tabular-nums text-foreground">{departments.length}</span>
            departments
          </MetricPill>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <HeaderButton title="Cabinet visibility depth">
            All <ChevronDown className="h-3.5 w-3.5" />
          </HeaderButton>
          <div className="h-3.5 w-px bg-border/60" />
          <HeaderButton active title="Static org chart preview">
            <Network className="h-3.5 w-3.5" />
            Org chart
          </HeaderButton>
          <HeaderButton title="Disabled on the public docs site">
            <UserPlus className="h-3.5 w-3.5" />
            New Agent
          </HeaderButton>
          <HeaderButton title="Disabled on the public docs site">
            <RefreshCw className="h-3.5 w-3.5" />
          </HeaderButton>
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
      </div>

      <div className="max-h-[980px] overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <div className="relative space-y-4">
            <button
              type="button"
              aria-disabled="true"
              title="Intro dismissal is disabled in the static demo"
              className="absolute right-0 top-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <h1 className="max-w-3xl text-[36px] font-semibold leading-[1.1] text-foreground sm:text-[44px]">
              This is your AI team.
            </h1>
            <p className="max-w-3xl pr-8 text-[17px] leading-[1.55] text-muted-foreground">
              A small crew of agents that <span className="font-semibold text-foreground">work for you around the clock</span>. Each agent has a role, a personality, and a memory. They wake up on schedule, check in while you sleep, and ship work into your knowledge base.
            </p>
            <p className="max-w-3xl pr-8 text-[15px] leading-[1.6] text-muted-foreground">
              On this page you can meet your team, set up routines, inspect heartbeats, and see the calendar that keeps the whole thing moving.
            </p>
          </div>

          <ReadOnlyNotice />

          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[24px] font-semibold tracking-tight text-foreground sm:text-[28px]">
                  Org chart
                </h2>
                <p className="mt-1 max-w-3xl text-[14px] leading-6 text-muted-foreground">
                  Cabinet treats agents like a small operating team: departments, leads, routines, and handoffs instead of one giant prompt.
                </p>
              </div>
              <HeaderButton title="Static public demo">
                <Maximize2 className="h-3.5 w-3.5" />
                Expand
              </HeaderButton>
            </div>

            <div
              className="overflow-hidden rounded-[30px] border border-border/70 bg-card p-4 sm:p-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 0)",
                backgroundSize: "22px 22px"
              }}
            >
              <div className="flex flex-col items-center gap-5">
                <RootAgentCard />
                <div className="h-8 w-px bg-border/80" />
                <div className="grid w-full gap-3 lg:grid-cols-2 xl:grid-cols-4">
                  {departments.map(({ department, members }) => (
                    <DepartmentCard key={department.name} department={department} members={members} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[24px] font-semibold tracking-tight text-foreground sm:text-[28px]">
                  Agent directory
                </h2>
                <p className="mt-1 max-w-3xl text-[14px] leading-6 text-muted-foreground">
                  Each profile can carry a role, model, routines, heartbeats, notes, and a working history inside the cabinet.
                </p>
              </div>
              <HeaderButton title="Disabled on the public docs site">
                <Plus className="h-3.5 w-3.5" />
                New Agent
              </HeaderButton>
            </div>
            <AgentProfileGrid />
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[24px] font-semibold tracking-tight text-foreground sm:text-[28px]">
                  Routines & heartbeats
                </h2>
                <p className="mt-1 max-w-3xl text-[14px] leading-6 text-muted-foreground">
                  Routines are scheduled jobs. Heartbeats are the built-in rhythm that lets an agent decide what to inspect next.
                </p>
              </div>
              <button
                type="button"
                aria-disabled="true"
                title="Disabled on the public docs site"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-4 text-[13px] font-semibold text-background opacity-85"
              >
                <Clock3 className="h-4 w-4" />
                Add routine
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
              <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-background/95 px-3 py-2">
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <CalendarRange className="h-4 w-4 text-primary" />
                  Team schedule
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <ScheduleModeToggle value={scheduleMode} onChange={setScheduleMode} />
                  <div className="h-3.5 w-px bg-border/60" />
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
              </div>
              <StaticScheduleCalendar mode={scheduleMode} />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: "Heartbeats this week", value: "18", icon: HeartPulse, tone: "text-pink-500" },
                { label: "Jobs scheduled", value: "11", icon: Clock3, tone: "text-emerald-500" },
                { label: "Approvals waiting", value: "3", icon: CheckCircle2, tone: "text-amber-500" }
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="rounded-xl border border-border/70 bg-card p-4">
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <Icon className={cn("h-4 w-4", metric.tone)} />
                      {metric.label}
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-[28px] font-semibold leading-none text-foreground">{metric.value}</span>
                      <span className="text-[11px] text-muted-foreground">public demo</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2 text-[11px] text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-primary" />
              Hover and click affordances are preserved for the tour, but the docs site cannot run tasks, edit agents, or touch your filesystem.
              <Loader2 className="ml-auto h-3.5 w-3.5 animate-spin text-sky-500 [animation-duration:3s]" />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
