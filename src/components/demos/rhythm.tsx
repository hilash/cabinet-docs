"use client";

import { CalendarClock, Heart, Zap } from "lucide-react";

const ROWS = [
  {
    id: "task",
    icon: Zap,
    name: "Task",
    tone: "text-amber-600 dark:text-amber-400",
    when: "once",
    example: "Draft the launch post.",
  },
  {
    id: "routine",
    icon: CalendarClock,
    name: "Routine",
    tone: "text-sky-600 dark:text-sky-400",
    when: "every Friday at 5pm",
    example: "Draft next Monday's launch checklist.",
  },
  {
    id: "heartbeat",
    icon: Heart,
    name: "Heartbeat",
    tone: "text-rose-600 dark:text-rose-400",
    when: "weekdays at 9am",
    example: "Look at the launch room and tell me what changed.",
  },
];

export function RhythmDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Three rhythms
        </div>

        <ul className="divide-y divide-border">
          {ROWS.map((row) => {
            const Icon = row.icon;
            return (
              <li key={row.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-3 sm:grid-cols-[auto_8rem_minmax(0,1fr)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Icon className={`h-4 w-4 ${row.tone}`} />
                </span>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {row.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {row.when}
                  </div>
                </div>
                <p className="col-span-2 sm:col-span-1 text-sm italic text-muted-foreground">
                  &ldquo;{row.example}&rdquo;
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
