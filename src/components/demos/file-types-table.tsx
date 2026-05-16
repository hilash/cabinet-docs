"use client";

import Link from "next/link";
import {
  AppWindow,
  ArrowUpRight,
  Bot,
  Code,
  File,
  FileSpreadsheet,
  FileText,
  FileType,
  Folder,
  GitBranch,
  Globe,
  Image as ImageIcon,
  Link2,
  Music,
  Presentation,
  Table as TableIcon,
  Video,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Row = {
  type: string;
  files: string;
  view: string;
  icon: LucideIcon;
  tone: string;
  href?: string;
  live?: boolean;
};

const ROWS: Row[] = [
  {
    type: "Markdown page",
    files: "*.md, index.md",
    view: "WYSIWYG editor with markdown source toggle",
    icon: FileText,
    tone: "text-zinc-600 dark:text-zinc-300",
    href: "/public-docs/file-types/markdown/",
    live: true,
  },
  {
    type: "CSV data",
    files: "*.csv",
    view: "Interactive table editor with source view",
    icon: TableIcon,
    tone: "text-emerald-600 dark:text-emerald-400",
    href: "/public-docs/file-types/csv/",
    live: true,
  },
  {
    type: "PDF document",
    files: "*.pdf",
    view: "Inline PDF viewer (browser-native)",
    icon: FileType,
    tone: "text-rose-600 dark:text-rose-400",
    href: "/public-docs/file-types/pdf/",
  },
  {
    type: "Mermaid diagram",
    files: "*.mermaid, *.mmd",
    view: "Rendered diagram",
    icon: Workflow,
    tone: "text-violet-600 dark:text-violet-400",
    href: "/public-docs/file-types/mermaid/",
    live: true,
  },
  {
    type: "Image",
    files: ".png .jpg .jpeg .gif .webp .svg .avif .ico",
    view: "Inline image viewer",
    icon: ImageIcon,
    tone: "text-pink-600 dark:text-pink-400",
    href: "/public-docs/file-types/images/",
    live: true,
  },
  {
    type: "Video",
    files: ".mp4 .webm .mov .m4v",
    view: "Inline video player",
    icon: Video,
    tone: "text-cyan-600 dark:text-cyan-400",
    href: "/public-docs/file-types/video-and-audio/",
    live: true,
  },
  {
    type: "Audio",
    files: ".mp3 .wav .ogg .m4a .aac",
    view: "Inline audio player",
    icon: Music,
    tone: "text-amber-600 dark:text-amber-400",
    href: "/public-docs/file-types/video-and-audio/",
    live: true,
  },
  {
    type: "Source code",
    files: ".js .ts .py .go .swift .yaml .json …",
    view: "Syntax-highlighted viewer",
    icon: Code,
    tone: "text-violet-600 dark:text-violet-400",
    href: "/public-docs/file-types/source-code/",
    live: true,
  },
  {
    type: "Embedded website",
    files: "Directory with index.html, no index.md",
    view: "Iframe in main panel, sidebar visible",
    icon: Globe,
    tone: "text-sky-600 dark:text-sky-400",
    href: "/public-docs/file-types/embedded-apps/",
  },
  {
    type: "Full-screen app",
    files: "Directory with index.html + .app marker",
    view: "Full-screen iframe, sidebar collapses",
    icon: AppWindow,
    tone: "text-emerald-600 dark:text-emerald-400",
    href: "/public-docs/file-types/embedded-apps/",
  },
  {
    type: "Directory",
    files: "Any folder with index.md",
    view: "Expandable tree node in the sidebar",
    icon: Folder,
    tone: "text-zinc-600 dark:text-zinc-300",
  },
  {
    type: "Linked Git repo",
    files: "Directory with .repo.yaml",
    view: "Normal page/folder, repo context for agents",
    icon: GitBranch,
    tone: "text-orange-600 dark:text-orange-400",
    href: "/public-docs/file-types/linked-content/",
  },
  {
    type: "Linked directory",
    files: "Symlink without .repo.yaml",
    view: "Normal folder, contents appear as children",
    icon: Link2,
    tone: "text-sky-600 dark:text-sky-400",
    href: "/public-docs/file-types/linked-content/",
  },
  {
    type: "Word document",
    files: ".docx",
    view: "Inline read-only render (docx-preview)",
    icon: FileText,
    tone: "text-sky-600 dark:text-sky-400",
    href: "/public-docs/file-types/office-documents/",
  },
  {
    type: "Spreadsheet",
    files: ".xlsx, .xlsm",
    view: "Multi-sheet grid with tabs (SheetJS)",
    icon: FileSpreadsheet,
    tone: "text-emerald-600 dark:text-emerald-400",
    href: "/public-docs/file-types/office-documents/",
  },
  {
    type: "Presentation",
    files: ".pptx",
    view: "Slide-by-slide view (pptx-preview)",
    icon: Presentation,
    tone: "text-orange-600 dark:text-orange-400",
    href: "/public-docs/file-types/office-documents/",
  },
  {
    type: "Google Workspace page",
    files: "*.md with google: frontmatter",
    view: "Iframe to Sheets / Slides / Docs / Forms",
    icon: Globe,
    tone: "text-sky-600 dark:text-sky-400",
    href: "/public-docs/file-types/google-workspace/",
  },
  {
    type: "Legacy / archive",
    files: ".doc .ppt .xls .odt .rtf .zip .fig .sketch …",
    view: "Shown in sidebar, opens in Finder",
    icon: File,
    tone: "text-zinc-500",
  },
];

export function FileTypesTableDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-border bg-[var(--accent-bg-subtle)] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Bot className="h-3.5 w-3.5 text-[var(--accent-warm)]" />
          <span>{ROWS.length} file types — all first-class</span>
          <span className="ml-auto hidden text-[10px] text-muted-foreground/70 sm:inline">
            click a row for the live sample
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="w-44 px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Files</th>
                <th className="px-4 py-2 text-left font-semibold">How Cabinet shows it</th>
                <th className="w-20 px-2 py-2 text-right font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const Icon = row.icon;
                const RowEl = row.href ? Link : "div";
                const cellClass =
                  "px-4 py-2.5 align-top group-hover:bg-[var(--bg-card-hover)] transition-colors";
                const inner = (
                  <>
                    <td className={cellClass}>
                      <span className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 shrink-0 ${row.tone}`} />
                        <span className="font-medium text-foreground">{row.type}</span>
                      </span>
                    </td>
                    <td className={cellClass}>
                      <code className="font-mono text-[12px] text-muted-foreground">
                        {row.files}
                      </code>
                    </td>
                    <td className={`${cellClass} text-muted-foreground`}>{row.view}</td>
                    <td className={`${cellClass} text-right`}>
                      {row.live && (
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          live
                        </span>
                      )}
                      {row.href && (
                        <ArrowUpRight className="ml-1 inline h-3 w-3 text-[var(--accent-warm)] opacity-0 group-hover:opacity-100" />
                      )}
                    </td>
                  </>
                );
                return row.href ? (
                  <tr key={row.type} className="group cursor-pointer border-b border-border last:border-b-0">
                    <td colSpan={4} className="p-0">
                      <Link href={row.href} className="block">
                        <table className="w-full">
                          <tbody>
                            <tr>{inner}</tr>
                          </tbody>
                        </table>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  <tr key={row.type} className="group border-b border-border last:border-b-0">
                    {inner}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
