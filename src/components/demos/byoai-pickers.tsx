"use client";

import { useState } from "react";
import { Check, Cpu } from "lucide-react";

const PROVIDERS = [
  {
    id: "claude",
    name: "Claude",
    house: "Anthropic",
    models: ["claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5"],
    bg: "bg-amber-100 dark:bg-amber-950",
    accent: "text-amber-800 dark:text-amber-300",
  },
  {
    id: "openai",
    name: "GPT",
    house: "OpenAI",
    models: ["gpt-4.1", "gpt-4o", "o4-mini"],
    bg: "bg-emerald-100 dark:bg-emerald-950",
    accent: "text-emerald-800 dark:text-emerald-300",
  },
  {
    id: "gemini",
    name: "Gemini",
    house: "Google",
    models: ["gemini-2.5-pro", "gemini-2.5-flash"],
    bg: "bg-sky-100 dark:bg-sky-950",
    accent: "text-sky-800 dark:text-sky-300",
  },
  {
    id: "grok",
    name: "Grok",
    house: "xAI",
    models: ["grok-3", "grok-3-mini"],
    bg: "bg-violet-100 dark:bg-violet-950",
    accent: "text-violet-800 dark:text-violet-300",
  },
  {
    id: "local",
    name: "Local",
    house: "Ollama / LM Studio",
    models: ["llama-3.3-70b", "qwen-2.5-coder", "deepseek-r1"],
    bg: "bg-rose-100 dark:bg-rose-950",
    accent: "text-rose-800 dark:text-rose-300",
  },
];

export function ByoaiDemo({ caption }: { caption?: string }) {
  const [selected, setSelected] = useState<string[]>(["claude", "openai"]);

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Bring your own AI
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Connect the providers you already pay for. Pick a default per agent or override per task.
        </p>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PROVIDERS.map((p) => {
            const on = selected.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-all ${
                  on
                    ? "border-[var(--accent-warm)] bg-[var(--accent-bg-subtle)] shadow-sm"
                    : "border-border bg-card opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${p.bg}`}
                  >
                    <Cpu className={`h-4 w-4 ${p.accent}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {p.house}
                    </div>
                  </div>
                </div>
                {on && (
                  <Check className="h-4 w-4 text-[var(--accent-warm)]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-lg border border-border bg-[var(--bg-warm)] p-3 text-xs text-muted-foreground">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--accent-warm)]">
            Available models
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PROVIDERS.filter((p) => selected.includes(p.id)).flatMap((p) =>
              p.models.map((m) => (
                <code
                  key={`${p.id}-${m}`}
                  className="rounded bg-card px-1.5 py-0.5 font-mono text-[11px] text-foreground"
                >
                  {m}
                </code>
              )),
            )}
            {selected.length === 0 && (
              <span className="italic text-muted-foreground">
                Select at least one provider to see available models.
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          You pay your own bills, use your own quota, no middleman. Cabinet never forwards your prompts to a hosted backend.
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
