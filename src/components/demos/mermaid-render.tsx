"use client";

import { useEffect, useRef, useState } from "react";

const SOURCE = `flowchart LR
  user(["You"]) -- writes --> page["Markdown page"]
  page --> cabinet[(Cabinet)]
  cabinet --> agents{{"AI team\\n(.agents/)"}}
  cabinet --> jobs[("Routines\\n(.jobs/)")]
  agents -- propose --> queue["Approval queue"]
  jobs -- on schedule --> queue
  queue -- you approve --> run[("Agent run")]
  run --> output[/"New page in cabinet"/]
  output --> cabinet
  classDef accent fill:#F5E6D3,stroke:#8B5E3C,color:#3B2F2F;
  class cabinet,output accent;`;

let renderId = 0;

export function MermaidRenderDemo({ caption }: { caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const m = await import("mermaid");
        m.default.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#FAF6F1",
            primaryBorderColor: "#8B5E3C",
            primaryTextColor: "#3B2F2F",
            lineColor: "#8B5E3C",
            secondaryColor: "#F3EDE4",
            tertiaryColor: "#FFFFFF",
            fontFamily: "ui-sans-serif, system-ui",
          },
          securityLevel: "loose",
        });
        const id = `mermaid-${++renderId}`;
        const { svg } = await m.default.render(id, SOURCE);
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Mermaid — rendered live
          </span>
          <code className="font-mono text-[10px] text-muted-foreground">flowchart.mermaid</code>
        </div>
        <div className="overflow-x-auto">
          <div
            ref={ref}
            className="mermaid-output flex justify-center [&>svg]:h-auto [&>svg]:max-w-full"
            aria-label="Mermaid flowchart of the Cabinet agent loop"
          />
          {error && (
            <pre className="text-xs text-rose-600">
              Mermaid render failed: {error}
            </pre>
          )}
        </div>
        <details className="mt-4 text-xs text-muted-foreground">
          <summary className="cursor-pointer">Show source</summary>
          <pre className="mt-2 overflow-x-auto rounded-md bg-[var(--bg-warm)] p-3 font-mono text-[11px] text-foreground">
            {SOURCE}
          </pre>
        </details>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
