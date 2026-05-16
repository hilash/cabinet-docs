"use client";

const HIGHLIGHTS = [
  { color: "yellow", label: "Yellow", purpose: "Key terms — the thing the reader needs to remember." },
  { color: "blue", label: "Blue", purpose: "Cross-references — points to another page or concept." },
  { color: "green", label: "Green", purpose: "Confirmations — shipped, working, verified." },
  { color: "red", label: "Red", purpose: "Urgency — blockers, breaking changes, gotchas." },
  { color: "amber", label: "Amber", purpose: "Tips — small habits that compound." },
  { color: "purple", label: "Purple", purpose: "Schema fields and YAML keys." },
];

const TX = [
  { cls: "tx-red", label: "tx-red", purpose: "Inline urgency without a highlight block." },
  { cls: "tx-green", label: "tx-green", purpose: "Inline confirmations." },
  { cls: "tx-amber", label: "tx-amber", purpose: "Inline tips." },
  { cls: "tx-purple", label: "tx-purple", purpose: "Inline schema or code-adjacent emphasis." },
  { cls: "tx-accent", label: "tx-accent", purpose: "Match the brand accent — sparingly." },
];

export function HighlightSwatchesDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Cabinet highlight palette
        </div>

        <ul className="space-y-2 text-sm">
          {HIGHLIGHTS.map((h) => (
            <li key={h.color} className="flex items-baseline gap-3">
              <code className="w-20 shrink-0 font-mono text-[11px] text-muted-foreground">
                {h.color}
              </code>
              <p className="text-foreground/85">
                <span
                  data-color={h.color}
                  style={{
                    background: `var(--hl-${h.color})`,
                    padding: "0.04em 0.3em",
                    borderRadius: "0.2em",
                  }}
                >
                  {h.label} highlight
                </span>{" "}
                — {h.purpose}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-border pt-4">
          <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Inline text colors
          </div>
          <ul className="space-y-2 text-sm">
            {TX.map((t) => (
              <li key={t.cls} className="flex items-baseline gap-3">
                <code className="w-20 shrink-0 font-mono text-[11px] text-muted-foreground">
                  {t.cls}
                </code>
                <p className="text-foreground/85">
                  <span className={t.cls}>This sentence uses {t.label}.</span> — {t.purpose}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
