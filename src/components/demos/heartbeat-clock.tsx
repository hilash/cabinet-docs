"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const BEATS = [
  { hour: 8, agent: "🎯 GTM Lead", label: "Market pulse" },
  { hour: 9, agent: "🎯 GTM Lead", label: "Open the launch room" },
  { hour: 10, agent: "✏️ Launch Editor", label: "Founder story pass" },
  { hour: 11, agent: "🛠️ Ops Coordinator", label: "Loose-end sweep" },
  { hour: 13, agent: "📊 Revenue Analyst", label: "Investor packet draft" },
  { hour: 14, agent: "🔬 Product Auditor", label: "Six-report audit" },
  { hour: 16, agent: "📣 LinkedIn Operator", label: "Reply queue check" },
  { hour: 17, agent: "🎯 GTM Lead", label: "Tomorrow's checklist" },
];

export function HeartbeatClockDemo({ caption }: { caption?: string }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % BEATS.length), 1500);
    return () => clearInterval(id);
  }, []);

  const activeBeat = BEATS[tick];

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Today&apos;s heartbeats
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeBeat.hour).padStart(2, "0")}:00
          </span>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <div className="relative grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 7;
              const beat = BEATS.find((b) => b.hour === hour);
              const isActive = beat && beat === activeBeat;
              return (
                <div key={hour} className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {hour}
                  </span>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
                      isActive
                        ? "scale-125 border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/30"
                        : beat
                          ? "border-[var(--accent-warm)] bg-[var(--accent-bg)] text-[var(--accent-warm)]"
                          : "border-border bg-transparent"
                    }`}
                  >
                    {beat && (
                      <Heart
                        className={`h-3 w-3 ${isActive ? "fill-white" : "fill-current"}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-[var(--accent-bg-subtle)] p-4">
          <div className="mb-1 text-xs text-muted-foreground">
            <span className="font-mono">{activeBeat.agent}</span> wakes up &middot;{" "}
            <span className="font-mono">
              {String(activeBeat.hour).padStart(2, "0")}:00
            </span>
          </div>
          <p className="font-medium italic text-foreground">
            &ldquo;{activeBeat.label}&rdquo;
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          A heartbeat fires on schedule, the agent looks at its slice of the cabinet,
          decides if anything needs doing, and writes the result back as a page.
          Nothing escalates without your approval.
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
