"use client";

import { Bot, Crown } from "lucide-react";

type Agent = { emoji: string; name: string; role: string; model: string };

type Department = {
  name: string;
  lead: Agent;
  team: Agent[];
};

const ROOT = {
  emoji: "🏢",
  name: "Cabinet Operator",
  role: "Coordinates the team",
};

const DEPARTMENTS: Department[] = [
  {
    name: "Marketing",
    lead: { emoji: "🎯", name: "GTM Lead", role: "Launch strategy", model: "Claude" },
    team: [
      { emoji: "📣", name: "LinkedIn Operator", role: "Drafts, not spam", model: "GPT" },
      { emoji: "✏️", name: "Copywriter", role: "Brand voice", model: "Claude" },
    ],
  },
  {
    name: "Research",
    lead: { emoji: "🔬", name: "Research Lead", role: "Parallel research", model: "Gemini" },
    team: [
      { emoji: "📚", name: "Citation Keeper", role: "Source quality", model: "Claude" },
      { emoji: "📈", name: "Trend Analyst", role: "Market signals", model: "Gemini" },
    ],
  },
  {
    name: "Operations",
    lead: { emoji: "🛠️", name: "Ops Coordinator", role: "Task dispatcher", model: "GPT" },
    team: [
      { emoji: "🔬", name: "Product Auditor", role: "Six-report audits", model: "Codex" },
      { emoji: "📊", name: "Revenue Analyst", role: "Metrics narrator", model: "Local" },
    ],
  },
];

export function OrgChartDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Org chart
        </div>

        {/* Root */}
        <div className="mb-2 flex justify-center">
          <RootCard />
        </div>

        {/* Connector to departments */}
        <div className="mx-auto mb-2 h-5 w-px bg-border" />
        <div className="relative mb-2 mx-auto h-px bg-border" style={{ width: "82%" }} />

        {/* Departments */}
        <div className="grid gap-4 md:grid-cols-3">
          {DEPARTMENTS.map((d) => (
            <DepartmentColumn key={d.name} dep={d} />
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Departments are folders. Leads can dispatch to specialists. Specialists
          stay in their lane. The whole org is just files in <code className="font-mono text-foreground">.agents/</code>.
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

function RootCard() {
  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-[var(--accent-warm)] bg-[var(--accent-bg)] px-4 py-2.5 shadow-sm">
      <Crown className="h-4 w-4 text-[var(--accent-warm)]" />
      <div>
        <div className="text-sm font-semibold text-foreground">{ROOT.name}</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {ROOT.role}
        </div>
      </div>
    </div>
  );
}

function DepartmentColumn({ dep }: { dep: Department }) {
  return (
    <div className="rounded-xl border border-border bg-[var(--bg-warm)] p-3">
      <div className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
        {dep.name}
      </div>
      <AgentCard agent={dep.lead} isLead />
      <div className="mx-auto my-2 h-3 w-px bg-border" />
      <ul className="space-y-1.5">
        {dep.team.map((a) => (
          <li key={a.name}>
            <AgentCard agent={a} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AgentCard({ agent, isLead }: { agent: Agent; isLead?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5 ${
        isLead ? "border-[var(--accent-warm)]/40" : "border-border"
      }`}
    >
      <span className="text-base leading-none">{agent.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-xs font-semibold text-foreground">
            {agent.name}
          </span>
          {isLead && (
            <span className="rounded bg-[var(--accent-warm)] px-1 text-[8px] font-semibold uppercase tracking-wider text-white">
              Lead
            </span>
          )}
        </div>
        <div className="truncate text-[10px] text-muted-foreground">
          {agent.role}
        </div>
      </div>
      <span className="hidden shrink-0 rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground sm:inline">
        {agent.model}
      </span>
      <Bot className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
    </div>
  );
}
