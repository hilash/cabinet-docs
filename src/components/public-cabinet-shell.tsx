"use client";

import { PublicBottomBar } from "@/components/public-bottom-bar";
import { PublicMarkdownPage } from "@/components/public-markdown-page";
import { PublicSidebar } from "@/components/public-sidebar";
import { PublicViewerToolbar } from "@/components/public-viewer-toolbar";
import { StaticSearchPalette } from "@/components/static-search-palette";
import type { PublicContent, PublicPage } from "@/lib/types";
import { findNodeByRoute } from "@/lib/utils";

export function PublicCabinetShell({
  content,
  page
}: {
  content: PublicContent;
  page: PublicPage;
}) {
  const node = findNodeByRoute(content.tree, page.route);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <PublicSidebar
        tree={content.tree}
        selectedRoute={page.route}
        basePath={content.site.basePath}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <PublicViewerToolbar
          tree={content.tree}
          page={page}
          basePath={content.site.basePath}
        />
        <PublicMarkdownPage
          page={page}
          node={node}
          basePath={content.site.basePath}
        />
        <PublicBottomBar basePath={content.site.basePath} />
      </div>
      <StaticSearchPalette hits={content.search} />
    </div>
  );
}
