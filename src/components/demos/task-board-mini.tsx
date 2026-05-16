"use client";

const LANES = [
  {
    name: "Inbox",
    tone: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    cards: [
      { title: "Triage launch ideas", agent: "🛠️ Ops" },
      { title: "Run six audits", agent: "🔬 Auditor" },
    ],
  },
  {
    name: "Your turn",
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    cards: [
      { title: "Approve LinkedIn drafts", agent: "📣 LinkedIn" },
      { title: "Review founder story", agent: "✏️ Editor" },
    ],
  },
  {
    name: "Running",
    tone: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
    cards: [
      { title: "10 competitor briefs", agent: "🔬 Research" },
      { title: "Build launch room", agent: "🎯 GTM" },
    ],
  },
  {
    name: "Done",
    tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    cards: [
      { title: "Investor packet", agent: "📊 Revenue" },
      { title: "Stale-followup sweep", agent: "🛠️ Ops" },
    ],
  },
];

export function TaskBoardMiniDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Task board
          </span>
          <div className="flex gap-1 text-[10px]">
            <span className="rounded bg-[var(--accent-bg)] px-1.5 py-0.5 font-mono text-[var(--accent-warm)]">
              Kanban
            </span>
            <span className="rounded px-1.5 py-0.5 font-mono text-muted-foreground">
              List
            </span>
            <span className="rounded px-1.5 py-0.5 font-mono text-muted-foreground">
              Schedule
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {LANES.map((lane) => (
            <div key={lane.name} className="rounded-lg border border-border bg-[var(--bg-warm)] p-2">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${lane.tone}`}
                >
                  {lane.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {lane.cards.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {lane.cards.map((c) => (
                  <li
                    key={c.title}
                    className="rounded-md border border-border bg-card px-2 py-1.5"
                  >
                    <div className="text-xs font-medium text-foreground">
                      {c.title}
                    </div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      {c.agent}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
