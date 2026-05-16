import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  tone?: "default" | "soon";
};

export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: Feature[];
  columns?: 2 | 3;
}) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`my-6 grid gap-3 ${cols} not-prose`}>
      {features.map((f) => (
        <FeatureCard key={f.title} feature={f} />
      ))}
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const isSoon = feature.tone === "soon";

  const inner = (
    <div
      className={`group relative h-full rounded-xl border border-border bg-card p-5 card-hover ${
        isSoon ? "opacity-70" : ""
      }`}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-bg)]">
        <Icon className="h-4.5 w-4.5 text-[var(--accent-warm)]" />
      </div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-foreground text-[15px] leading-tight">
          {feature.title}
        </h3>
        {isSoon && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            soon
          </span>
        )}
      </div>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{feature.description}</p>
      {feature.href && !isSoon && (
        <ArrowUpRight className="absolute right-4 top-4 h-3.5 w-3.5 text-[var(--accent-warm)] opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </div>
  );

  if (feature.href && !isSoon) {
    const isExternal = feature.href.startsWith("http");
    if (isExternal) {
      return (
        <a href={feature.href} target="_blank" rel="noreferrer noopener">
          {inner}
        </a>
      );
    }
    return <Link href={feature.href}>{inner}</Link>;
  }
  return inner;
}
