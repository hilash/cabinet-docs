"use client";

import { CircleHelp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { FeatureHint } from "@/lib/feature-hints";
import { cn, withBasePath } from "@/lib/utils";

export function FeatureHintButton({
  hint,
  basePath,
  className,
  align = "right"
}: {
  hint: FeatureHint;
  basePath: string;
  className?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-label={`Explain ${hint.title}`}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        title={`Explain ${hint.title}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <CircleHelp className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          id={id}
          role="dialog"
          aria-label={hint.title}
          className={cn(
            "absolute top-7 z-50 w-72 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-xl",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold leading-tight">{hint.title}</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint.body}</p>
            </div>
            <button
              type="button"
              aria-label="Close explanation"
              onClick={() => setOpen(false)}
              className="-mr-1 -mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link
            href={withBasePath(hint.readMoreRoute, basePath)}
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {hint.readMoreLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
