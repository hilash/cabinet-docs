"use client";

import { Check, Copy, Download, Link as LinkIcon, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import type { PublicPage } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

function ActionButton({
  children,
  label,
  onClick
}: {
  children: ReactNode;
  label: string;
  onClick: () => void | Promise<void>;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {children}
    </button>
  );
}

export function CopyActions({ page, basePath }: { page: PublicPage; basePath: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1200);
  }

  const pageUrl = typeof window === "undefined"
    ? withBasePath(page.route, basePath)
    : new URL(withBasePath(page.route, basePath), window.location.origin).toString();

  return (
    <div className="flex items-center gap-1">
      <ActionButton label="Copy page link" onClick={() => copy("link", pageUrl)}>
        {copied === "link" ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </ActionButton>
      <ActionButton label="Copy Markdown" onClick={() => copy("markdown", page.rawMarkdown)}>
        {copied === "markdown" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </ActionButton>
      <ActionButton
        label="Copy for LLMs"
        onClick={() =>
          copy(
            "llm",
            [`# ${page.title}`, "", `Source: ${pageUrl}`, "", "---", "", page.rawMarkdown].join("\n")
          )
        }
      >
        {copied === "llm" ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </ActionButton>
      <a
        href={withBasePath("/llms.txt", basePath)}
        className="hidden items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
      >
        <Download className="h-3.5 w-3.5" />
        llms.txt
      </a>
    </div>
  );
}
