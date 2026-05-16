"use client";

import { useState } from "react";
import { Bot, Calendar, Check, ChevronDown, X, Zap } from "lucide-react";

type Proposal = {
  id: string;
  kind: "LAUNCH_TASK" | "SCHEDULE_JOB" | "SCHEDULE_TASK";
  from: { emoji: string; name: string };
  to: { emoji: string; name: string };
  title: string;
  detail: string;
  defaultModel: string;
  defaultEffort: "low" | "medium" | "high";
  defaultSchedule?: string;
};

const SEED: Proposal[] = [
  {
    id: "p1",
    kind: "LAUNCH_TASK",
    from: { emoji: "🎯", name: "GTM Lead" },
    to: { emoji: "🔬", name: "Research Lead" },
    title: "Brief 10 competitors before Friday's launch",
    detail:
      "Fan out to /research/competitors/. Output one brief per company.",
    defaultModel: "gemini-2.5-pro",
    defaultEffort: "medium",
  },
  {
    id: "p2",
    kind: "SCHEDULE_JOB",
    from: { emoji: "🎯", name: "GTM Lead" },
    to: { emoji: "📣", name: "LinkedIn Operator" },
    title: "Draft a week of LinkedIn posts every Friday 5pm",
    detail: "Pull last week's wins from /marketing/launches/.",
    defaultModel: "gpt-4.1",
    defaultEffort: "low",
    defaultSchedule: "0 17 * * 5",
  },
  {
    id: "p3",
    kind: "LAUNCH_TASK",
    from: { emoji: "🛠️", name: "Ops Coordinator" },
    to: { emoji: "📊", name: "Revenue Analyst" },
    title: "Friday investor update packet",
    detail:
      "Summarize ARR, churn, and pipeline movement into /investors/2026-w19/.",
    defaultModel: "claude-opus-4-7",
    defaultEffort: "high",
  },
];

const MODELS = ["claude-opus-4-7", "gpt-4.1", "gemini-2.5-pro", "local-llama"];
const EFFORTS = ["low", "medium", "high"] as const;

export function ApprovalQueueDemo({ caption }: { caption?: string }) {
  const [items, setItems] = useState(SEED);
  const [resolved, setResolved] = useState<Record<string, "approved" | "rejected">>({});

  function set(id: string, key: keyof Proposal, value: string) {
    setItems((curr) => curr.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  }
  function resolve(id: string, action: "approved" | "rejected") {
    setResolved((r) => ({ ...r, [id]: action }));
  }
  function reset() {
    setResolved({});
  }

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-3.5 w-3.5 text-[var(--accent-warm)]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Approval queue
            </span>
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {items.length - Object.keys(resolved).length} pending
            </span>
          </div>
          {Object.keys(resolved).length > 0 && (
            <button
              onClick={reset}
              className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Reset demo
            </button>
          )}
        </div>

        <ul className="space-y-2.5">
          {items.map((p) => {
            const status = resolved[p.id];
            return (
              <li
                key={p.id}
                className={`rounded-lg border p-3.5 transition-all ${
                  status === "approved"
                    ? "border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : status === "rejected"
                      ? "border-rose-500/40 bg-rose-50/50 opacity-60 dark:bg-rose-950/20"
                      : "border-border bg-[var(--bg-warm)]"
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <KindBadge kind={p.kind} />
                  <span className="text-muted-foreground">
                    {p.from.emoji} {p.from.name}
                  </span>
                  <span className="text-muted-foreground/50">→</span>
                  <span className="font-medium text-foreground">
                    {p.to.emoji} {p.to.name}
                  </span>
                  {status && (
                    <span
                      className={`ml-auto rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                        status === "approved"
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {status}
                    </span>
                  )}
                </div>
                <h4 className="mb-0.5 text-sm font-semibold text-foreground">
                  {p.title}
                </h4>
                <p className="text-xs text-muted-foreground">{p.detail}</p>

                {!status && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Pill icon={Bot}>
                      <select
                        value={p.defaultModel}
                        onChange={(e) => set(p.id, "defaultModel", e.target.value)}
                        className="bg-transparent text-[11px] outline-none"
                      >
                        {MODELS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </Pill>
                    <Pill icon={Zap}>
                      <select
                        value={p.defaultEffort}
                        onChange={(e) => set(p.id, "defaultEffort", e.target.value)}
                        className="bg-transparent text-[11px] capitalize outline-none"
                      >
                        {EFFORTS.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </Pill>
                    {p.defaultSchedule && (
                      <Pill icon={Calendar}>
                        <code className="text-[11px]">{p.defaultSchedule}</code>
                      </Pill>
                    )}

                    <div className="ml-auto flex gap-1.5">
                      <button
                        onClick={() => resolve(p.id, "rejected")}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-muted"
                      >
                        <X className="h-3 w-3" /> Reject
                      </button>
                      <button
                        onClick={() => resolve(p.id, "approved")}
                        className="inline-flex items-center gap-1 rounded-md bg-[var(--accent-warm)] px-2.5 py-1 text-[11px] font-medium text-white hover:bg-[var(--accent-deep)]"
                      >
                        <Check className="h-3 w-3" /> Approve
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Every cross-agent action shows up here first. You change the model or effort
          inline, then approve or reject. Nothing runs until you say so.
        </p>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function KindBadge({ kind }: { kind: Proposal["kind"] }) {
  const tones: Record<Proposal["kind"], string> = {
    LAUNCH_TASK: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    SCHEDULE_JOB: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
    SCHEDULE_TASK: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
  };
  return (
    <span
      className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${tones[kind]}`}
    >
      {kind}
    </span>
  );
}

function Pill({ icon: Icon, children }: { icon: typeof Bot; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-muted-foreground">
      <Icon className="h-3 w-3" />
      {children}
      <ChevronDown className="h-2.5 w-2.5 opacity-50" />
    </span>
  );
}
