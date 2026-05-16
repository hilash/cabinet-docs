"use client";

import { useState } from "react";
import { Bot } from "lucide-react";

type Persona = {
  slug: string;
  emoji: string;
  name: string;
  role: string;
  type: "lead" | "specialist";
  model: string;
  canDispatch: boolean;
  heartbeats: { cron: string; label: string; prompt: string }[];
  prompt: string;
};

const PERSONAS: Persona[] = [
  {
    slug: "ceo",
    emoji: "🎯",
    name: "GTM Lead",
    role: "Launch strategist",
    type: "lead",
    model: "claude-opus-4-7",
    canDispatch: true,
    heartbeats: [
      {
        cron: "0 9 * * 1",
        label: "Mon 9am",
        prompt: "Open the launch room and report what changed.",
      },
      {
        cron: "0 17 * * 5",
        label: "Fri 5pm",
        prompt: "Draft next Monday's launch checklist.",
      },
    ],
    prompt:
      "You are the GTM Lead. You translate positioning notes into channels, offers, and launch risks. You always work in /marketing/.",
  },
  {
    slug: "research",
    emoji: "🔬",
    name: "Research Lead",
    role: "Parallel research",
    type: "lead",
    model: "gemini-2.5-pro",
    canDispatch: true,
    heartbeats: [
      {
        cron: "0 8 * * 1-5",
        label: "Weekday 8am",
        prompt: "Sweep new sources in /research/inbox/ for freshness.",
      },
    ],
    prompt:
      "You are the Research Lead. You split a market question into ten focused research tasks, fan them out, and synthesize the answers into briefs.",
  },
  {
    slug: "ops",
    emoji: "🛠️",
    name: "Ops Coordinator",
    role: "Task dispatcher",
    type: "specialist",
    model: "gpt-4.1",
    canDispatch: false,
    heartbeats: [
      {
        cron: "30 11 * * 1-5",
        label: "Weekday 11:30",
        prompt: "Find stale follow-ups before lunch.",
      },
    ],
    prompt:
      "You are the Ops Coordinator. Break messy requests into handoffs, approvals, and follow-ups. Never act without writing the breakdown to a page first.",
  },
];

const FIELD_NOTES: Record<string, string> = {
  name: "Shown in the AI team panel.",
  emoji: "Quick visual identifier in lists, mentions, and the org chart.",
  role: "Sub-line under the name. Keep it ≤3 words.",
  type: '"lead" agents can hire and dispatch to others; "specialist" agents do focused work.',
  model: "Default model. Override per task or per heartbeat.",
  canDispatch: "If true, this agent can propose LAUNCH_TASK / SCHEDULE_JOB. Every proposal still needs your approval.",
  heartbeats: "Recurring check-ins. Each has its own cron + prompt. Lightweight, separate from full Routines.",
};

export function PersonaFileDemo({ caption }: { caption?: string }) {
  const [active, setActive] = useState(PERSONAS[0]);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border bg-[var(--accent-bg-subtle)] px-4 py-2 text-xs">
          <Bot className="h-3.5 w-3.5 text-[var(--accent-warm)]" />
          <span className="font-mono text-muted-foreground">
            .agents/{active.slug}/persona.md
          </span>
          <div className="ml-auto flex gap-1">
            {PERSONAS.map((p) => (
              <button
                key={p.slug}
                onClick={() => setActive(p)}
                className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
                  active.slug === p.slug
                    ? "bg-[var(--accent-warm)] text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {p.emoji} {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_18rem]">
          <pre className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-foreground">
            <Line k="---" />
            <Field name="name" value={`"${active.name}"`} hover={hover} setHover={setHover} />
            <Field name="emoji" value={`"${active.emoji}"`} hover={hover} setHover={setHover} />
            <Field name="role" value={`"${active.role}"`} hover={hover} setHover={setHover} />
            <Field name="type" value={active.type} hover={hover} setHover={setHover} />
            <Field name="model" value={active.model} hover={hover} setHover={setHover} />
            <Field
              name="canDispatch"
              value={String(active.canDispatch)}
              hover={hover}
              setHover={setHover}
            />
            <Field name="heartbeats" value="" hover={hover} setHover={setHover} block />
            {active.heartbeats.map((h, i) => (
              <span key={i} className="block pl-4">
                <span className="text-muted-foreground/70">- </span>
                <span className="text-[var(--tx-purple)]">cron: </span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;{h.cron}&quot;
                </span>
                <span className="ml-2 text-muted-foreground/60"># {h.label}</span>
                {"\n"}
                <span className="block pl-4">
                  <span className="text-[var(--tx-purple)]">prompt: </span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    &quot;{h.prompt}&quot;
                  </span>
                </span>
              </span>
            ))}
            <Line k="---" />
            <span className="block pt-3 text-foreground/90">{active.prompt}</span>
          </pre>

          <aside className="border-t border-border bg-[var(--bg-warm)] p-4 text-xs lg:border-l lg:border-t-0">
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Hover a field
            </div>
            {hover && FIELD_NOTES[hover] ? (
              <>
                <div className="mb-1 font-mono text-[11px] text-[var(--accent-warm)]">
                  {hover}:
                </div>
                <p className="leading-relaxed text-foreground/85">{FIELD_NOTES[hover]}</p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Hover any key in the file to see what it controls.
              </p>
            )}
          </aside>
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

function Line({ k }: { k: string }) {
  return <span className="block text-muted-foreground/70">{k}</span>;
}

function Field({
  name,
  value,
  hover,
  setHover,
  block,
}: {
  name: string;
  value: string;
  hover: string | null;
  setHover: (v: string | null) => void;
  block?: boolean;
}) {
  const active = hover === name;
  return (
    <span
      onMouseEnter={() => setHover(name)}
      onMouseLeave={() => setHover(null)}
      className={`block cursor-help rounded px-1 transition-colors ${
        active ? "bg-[var(--hl-yellow)]" : ""
      }`}
    >
      <span className="text-[var(--tx-purple)]">{name}: </span>
      {!block && (
        <span className="text-emerald-700 dark:text-emerald-400">{value}</span>
      )}
    </span>
  );
}
