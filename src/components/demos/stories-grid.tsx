"use client";

import { useMemo, useState } from "react";

export type Story = {
  id: string;
  category: string;
  source: string;
  headline: string;
  quote: string;
  attribution: string;
  example?: boolean;
};

const STORIES: Story[] = [
  {
    id: "s1",
    category: "Solo founder",
    source: "Discord",
    headline: "My startup runs while I sleep",
    quote:
      "I have a CEO agent that drafts the Monday plan from last week's metrics, a researcher that fans out competitor briefs every Friday, and a writer that turns the briefs into a launch post. I wake up to drafts, not blank pages.",
    attribution: "@ada · solo founder",
    example: true,
  },
  {
    id: "s2",
    category: "Job hunt",
    source: "X",
    headline: "Job search as a sales pipeline",
    quote:
      "Job search is a full-time job, so I staffed it. Resume tailor, interview coach, offer analyst. Friday: weekly pipeline review fires automatically. I've never been more on top of an inbox.",
    attribution: "@nora.dev",
    example: true,
  },
  {
    id: "s3",
    category: "Researcher",
    source: "GitHub",
    headline: "Ten parallel research tasks at once",
    quote:
      "I ask the Research Lead a single question. It dispatches ten focused sub-tasks, each writes its own brief, then synthesizes the lot into one page. What used to take three days takes one afternoon.",
    attribution: "PhD candidate, materials science",
    example: true,
  },
  {
    id: "s4",
    category: "Indie hacker",
    source: "X",
    headline: "An hourly Reddit scout for my B2C app",
    quote:
      "Hourly Reddit scout, daily competitor sweep, weekly app-store listing refresh. The whole 'product team' is six markdown files. The actual product team is still just me.",
    attribution: "@indie_andre",
    example: true,
  },
  {
    id: "s5",
    category: "Podcaster",
    source: "Discord",
    headline: "Episode prep, distribution, and clip strategy in one folder",
    quote:
      "From 'we should start a podcast' to actually shipping weekly. Producer plans the slate, researcher briefs the guests, show-notes writer cuts timestamps. The whole flow lives in one cabinet so I never lose context between episodes.",
    attribution: "Two-host indie podcast",
    example: true,
  },
  {
    id: "s6",
    category: "Agency",
    source: "GitHub",
    headline: "Each client is a child cabinet",
    quote:
      "Acme is a child cabinet. Globex is a child cabinet. Each one has its own agents, its own jobs, its own visibility scope. The parent cabinet has the agency-wide PM. Scoping isolation comes for free with the file system.",
    attribution: "Boutique design agency, Berlin",
    example: true,
  },
  {
    id: "s7",
    category: "Sales",
    source: "Reddit",
    headline: "2,000 leads. Three agents. Zero hires.",
    quote:
      "Lead Researcher reads each company. Outreach Writer drafts personalized emails. Pipeline Tracker watches the CSV. They're all one persona.md each. The CSV updates in real time and I haven't touched it manually in two weeks.",
    attribution: "u/saas_grind",
    example: true,
  },
  {
    id: "s8",
    category: "Writer",
    source: "X",
    headline: "My editor lives in the same folder as my drafts",
    quote:
      "I write in the page, the Editor reads the page, the diff is in git. No tab-switching, no copy-paste, no 'wait let me find the doc.' Just the work and the help, in the same place.",
    attribution: "@anon_essayist",
    example: true,
  },
];

const CATEGORIES = [
  "All",
  "Solo founder",
  "Job hunt",
  "Researcher",
  "Indie hacker",
  "Podcaster",
  "Agency",
  "Sales",
  "Writer",
] as const;

const SOURCES = ["All", "X", "GitHub", "Discord", "Reddit"] as const;

export function StoriesGridDemo({ caption }: { caption?: string }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [source, setSource] = useState<(typeof SOURCES)[number]>("All");

  const filtered = useMemo(
    () =>
      STORIES.filter(
        (s) =>
          (category === "All" || s.category === category) &&
          (source === "All" || s.source === source),
      ),
    [category, source],
  );

  return (
    <div className="my-8 not-prose">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-xs text-muted-foreground">
          <span className="font-mono text-[var(--accent-warm)]">{filtered.length}</span> of {STORIES.length} stories
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          all examples — real stories coming
        </div>
      </div>

      <div className="mb-2 flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
            {c !== "All" && (
              <span className="ml-1 text-muted-foreground/70">
                {STORIES.filter((s) => s.category === c).length}
              </span>
            )}
          </Chip>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {SOURCES.map((s) => (
          <Chip key={s} small active={source === s} onClick={() => setSource(s)}>
            {s}
          </Chip>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((s) => (
          <article
            key={s.id}
            className="rounded-xl border border-border bg-card p-4 shadow-sm card-hover"
          >
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider">
              <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                {s.source}
              </span>
              <span className="rounded bg-[var(--accent-bg)] px-1.5 py-0.5 text-[var(--accent-warm)]">
                {s.category}
              </span>
            </div>
            <h3 className="mb-2 text-[15px] font-semibold leading-snug text-foreground">
              {s.headline}
            </h3>
            <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
              &ldquo;{s.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground/80">— {s.attribution}</span>
              {s.example && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  example
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          No stories match those filters yet.
        </div>
      )}

      {caption && (
        <p className="mt-4 text-center text-xs text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}

function Chip({
  children,
  active,
  small,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  small?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border transition-colors ${
        small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"
      } ${
        active
          ? "border-[var(--accent-warm)] bg-[var(--accent-warm)] text-white"
          : "border-border bg-card text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
