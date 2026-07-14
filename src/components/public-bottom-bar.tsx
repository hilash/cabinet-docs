"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, HelpCircle, Star } from "lucide-react";
import { cn, withBasePath } from "@/lib/utils";

const DISCORD_URL = "https://discord.gg/hJa5TRTbTH";
const GITHUB_URL = "https://github.com/cabinetai/cabinet";
const GET_CABINET_URL = "https://github.com/cabinetai/cabinet/releases/latest";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.32 4.37a16.4 16.4 0 0 0-4.1-1.28.06.06 0 0 0-.07.03c-.18.32-.38.73-.52 1.06a15.16 15.16 0 0 0-4.56 0c-.15-.34-.35-.74-.53-1.06a.06.06 0 0 0-.07-.03c-1.43.24-2.8.68-4.1 1.28a.05.05 0 0 0-.02.02C3.77 8.17 3.12 11.87 3.44 15.53a.06.06 0 0 0 .02.04 16.52 16.52 0 0 0 5.03 2.54.06.06 0 0 0 .07-.02c.39-.54.74-1.12 1.04-1.73a.06.06 0 0 0-.03-.08 10.73 10.73 0 0 1-1.6-.77.06.06 0 0 1-.01-.1l.32-.24a.06.06 0 0 1 .06-.01c3.35 1.53 6.98 1.53 10.29 0a.06.06 0 0 1 .06 0c.1.08.21.16.32.24a.06.06 0 0 1-.01.1c-.51.3-1.05.56-1.6.77a.06.06 0 0 0-.03.08c.3.61.65 1.19 1.04 1.73a.06.06 0 0 0 .07.02 16.42 16.42 0 0 0 5.03-2.54.06.06 0 0 0 .02-.04c.38-4.23-.64-7.9-2.89-11.14a.04.04 0 0 0-.02-.02ZM9.68 13.3c-.98 0-1.78-.9-1.78-2s.79-2 1.78-2c.99 0 1.79.9 1.78 2 0 1.1-.8 2-1.78 2Zm4.64 0c-.98 0-1.78-.9-1.78-2s.79-2 1.78-2c.99 0 1.79.9 1.78 2 0 1.1-.79 2-1.78 2Z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.37-1.33-1.73-1.33-1.73-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.22 1.83 1.22 1.06 1.8 2.8 1.28 3.48.98.11-.77.42-1.28.76-1.58-2.67-.3-5.47-1.32-5.47-5.86 0-1.3.47-2.36 1.23-3.2-.12-.3-.53-1.52.12-3.16 0 0 1-.32 3.3 1.22a11.67 11.67 0 0 1 6.02 0c2.3-1.54 3.3-1.22 3.3-1.22.65 1.64.24 2.86.12 3.16.77.84 1.23 1.9 1.23 3.2 0 4.55-2.8 5.56-5.48 5.86.43.37.81 1.08.81 2.19v3.25c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function formatStars(n: number | null): string {
  if (n === null) return "";
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

export function PublicBottomBar({ basePath }: { basePath: string }) {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/repos/cabinetai/cabinet")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.stargazers_count != null) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <footer
      role="contentinfo"
      aria-label="Cabinet docs footer"
      className="relative flex shrink-0 items-center justify-between gap-3 border-t border-border bg-background px-4 py-2 text-[11px] text-muted-foreground"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={withBasePath("/", basePath)}
          className="font-logo text-[18px] italic leading-none text-foreground/85 transition-colors hover:text-foreground"
        >
          cabinet
        </Link>
        <span className="hidden text-muted-foreground/70 sm:inline">
          Open-source · Local-first · MIT licensed
        </span>
      </div>

      <div className="relative flex items-center gap-2" ref={popoverRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Help & community"
          title="Help & community"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/55 px-2.5 py-1 text-muted-foreground transition-all",
            "hover:-translate-y-px hover:border-foreground/15 hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1"
          )}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold tracking-[0.04em] text-foreground">
            Help
          </span>
          {stars !== null && (
            <span
              title={`${formatStars(stars)} GitHub stars`}
              className="-mr-0.5 inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-1.5 py-px text-[9px] font-semibold text-amber-700 dark:text-amber-300"
            >
              <Star className="h-2.5 w-2.5 fill-current" />
              {formatStars(stars)}
            </span>
          )}
        </button>

        {open && (
          <div
            role="menu"
            className="absolute bottom-full right-0 mb-2 z-50 w-64 rounded-lg border border-border bg-background p-1.5 shadow-lg"
          >
            <Link
              href={withBasePath("/cabinet/", basePath)}
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-muted"
            >
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex flex-col">
                <span className="font-medium text-foreground">Help</span>
                <span className="text-[10px] text-muted-foreground">What is a Cabinet?</span>
              </span>
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-muted"
            >
              <DiscordIcon className="h-3.5 w-3.5 text-[#5865F2]" />
              <span className="flex flex-col">
                <span className="font-medium text-foreground">Chat on Discord</span>
                <span className="text-[10px] text-muted-foreground">Support and feedback</span>
              </span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-muted"
            >
              <GitHubIcon className="h-3.5 w-3.5 text-foreground" />
              <span className="flex flex-col">
                <span className="font-medium text-foreground">Contribute on GitHub</span>
                <span className="text-[10px] text-muted-foreground">Source, issues, PRs</span>
              </span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-muted"
            >
              <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
              <span className="flex flex-col">
                <span className="font-medium text-foreground">
                  {stars === null ? "Star Cabinet" : `${formatStars(stars)} stars`}
                </span>
                <span className="text-[10px] text-muted-foreground">If you find it useful</span>
              </span>
            </a>
          </div>
        )}

        <a
          href={GET_CABINET_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Get Cabinet at runcabinet.com"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-sm transition-all",
            "hover:-translate-y-px hover:shadow-md hover:brightness-[1.05]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2"
          )}
        >
          <Download className="h-3.5 w-3.5" />
          Get Cabinet
        </a>
      </div>
    </footer>
  );
}
