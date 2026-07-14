"use client";

import { useEffect, useRef, useState } from "react";

const LINES: { kind: "prompt" | "out" | "agent" | "ok"; text: string }[] = [
  { kind: "prompt", text: "npx cabinetai run" },
  { kind: "out", text: "Initializing cabinet at ~/cabinets/my-cabinet/" },
  { kind: "out", text: "Loading .agents/" },
  { kind: "out", text: "" },
  { kind: "agent", text: "  🎯 GTM Lead          ready    launch strategy" },
  { kind: "agent", text: "  🔬 Research Lead     ready    parallel research" },
  { kind: "agent", text: "  ✏️  Launch Editor    ready    narrative polish" },
  { kind: "agent", text: "  📊 Revenue Analyst   ready    metrics" },
  { kind: "agent", text: "  🛠️  Ops Coordinator  ready    task dispatch" },
  { kind: "out", text: "" },
  { kind: "out", text: "Heartbeats scheduled: 18 this week" },
  { kind: "out", text: "" },
  { kind: "ok", text: "Cabinet running at http://127.0.0.1:4000" },
  { kind: "ok", text: "Your AI team is awake." },
];

export function TerminalBootDemo({ caption }: { caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let i = 0;
          const id = setInterval(() => {
            i += 1;
            setShown(i);
            if (i >= LINES.length) clearInterval(id);
          }, 220);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <figure className="my-8 not-prose">
      <div ref={ref} className="terminal-chrome relative scanline">
        <div className="term-dots">
          <span className="term-dot r" />
          <span className="term-dot y" />
          <span className="term-dot g" />
          <span className="ml-2 font-mono">cabinet ~ zsh</span>
        </div>
        <div className="term-body min-h-[320px]">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className="flex">
              {l.kind === "prompt" ? (
                <>
                  <span className="mr-2 text-emerald-400">$</span>
                  <span className="text-zinc-200">{l.text}</span>
                </>
              ) : l.kind === "agent" ? (
                <span className="text-amber-300">{l.text}</span>
              ) : l.kind === "ok" ? (
                <span className="font-semibold text-emerald-400">{l.text}</span>
              ) : (
                <span className="text-zinc-400">{l.text || " "}</span>
              )}
            </div>
          ))}
          {shown >= LINES.length && (
            <span className="cursor-blink text-emerald-400">▊</span>
          )}
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
