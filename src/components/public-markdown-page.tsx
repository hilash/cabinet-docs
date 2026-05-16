import type { PublicPage, PublicTreeNode } from "@/lib/types";
import { MarkdownWithDemos } from "@/components/markdown-with-demos";
import { PublicFolderIndex } from "@/components/public-folder-index";
import { ReadOnlyAgentWorkspace } from "@/components/read-only-agent-workspace";
import { ReadOnlyTaskBoard } from "@/components/read-only-task-board";
import { cn } from "@/lib/utils";

export function PublicMarkdownPage({
  page,
  node,
  basePath
}: {
  page: PublicPage;
  node: PublicTreeNode | null;
  basePath: string;
}) {
  const isWorkspaceShowcase =
    page.route === "/showcase/agents/" ||
    page.route === "/showcase/tasks/";

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-background" data-public-page>
      <article
        className={cn(
          "mx-auto px-6 py-10 sm:px-10 lg:px-14",
          isWorkspaceShowcase ? "max-w-[1500px]" : "max-w-3xl"
        )}
      >
        <MarkdownWithDemos html={page.html} />

        {node && node.children.length > 0 && (
          <PublicFolderIndex entries={node.children} basePath={basePath} />
        )}

        {page.route === "/showcase/agents/" && <ReadOnlyAgentWorkspace />}
        {page.route === "/showcase/tasks/" && <ReadOnlyTaskBoard />}
      </article>
    </main>
  );
}
