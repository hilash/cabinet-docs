"use client";

import {
  Archive,
  BookOpen,
  ChevronDown,
  Clock3,
  FilePlus,
  Home,
  ListPlus,
  PanelLeft,
  PanelLeftClose,
  Plus,
  RefreshCw,
  Settings,
  SquareKanban,
  UserPlus,
  Users
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode
} from "react";
import { PublicTreeNode } from "@/components/public-tree-node";
import { demoAgents, demoTasks } from "@/lib/demo-data";
import type { PublicTreeNode as PublicTreeNodeType } from "@/lib/types";
import { cn, findNodePath, withBasePath } from "@/lib/utils";

const SIDEBAR_MIN_WIDTH = 220;
const SIDEBAR_MAX_WIDTH = 420;
const SIDEBAR_DEFAULT_WIDTH = 280;
const WIDTH_KEY = "cabinet-docs-sidebar-width";
const COLLAPSED_KEY = "cabinet-docs-sidebar-collapsed";

type DrawerId = "data" | "agents" | "tasks";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function drawerForRoute(route: string): DrawerId {
  if (route.startsWith("/showcase/agents/")) return "agents";
  if (route.startsWith("/showcase/tasks/")) return "tasks";
  return "data";
}

function pad(depth: number): CSSProperties {
  return { paddingLeft: `${depth * 16 + 8}px` };
}

const itemClass = (active: boolean) =>
  cn(
    "flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-[12px] text-foreground/75 transition-colors",
    "hover:bg-foreground/[0.03] hover:text-foreground",
    active && "bg-accent text-accent-foreground font-medium"
  );

function ReadOnlyFooterButton({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title="Read-only public demo"
      className={cn(
        "flex min-w-0 flex-1 cursor-not-allowed items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

function AgentAvatar({
  color,
  children
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-background shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

function statusDot(status: string) {
  switch (status) {
    case "running":
    case "live":
      return "bg-green-500";
    case "needs-review":
      return "bg-amber-500";
    case "scheduled":
      return "bg-blue-400";
    case "done":
      return "bg-emerald-500";
    case "archive":
      return "bg-muted-foreground/35";
    default:
      return "bg-muted-foreground/30";
  }
}

function readStoredSidebarWidth() {
  if (typeof window === "undefined") return SIDEBAR_DEFAULT_WIDTH;
  const storedWidth = window.localStorage.getItem(WIDTH_KEY);
  const parsedWidth = storedWidth ? Number(storedWidth) : NaN;
  return Number.isFinite(parsedWidth)
    ? clamp(parsedWidth, SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH)
    : SIDEBAR_DEFAULT_WIDTH;
}

function readStoredCollapsed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(COLLAPSED_KEY) === "true";
}

export function PublicSidebar({
  tree,
  selectedRoute,
  basePath
}: {
  tree: PublicTreeNodeType;
  selectedRoute: string;
  basePath: string;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(readStoredCollapsed);
  const [mobile, setMobile] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerId>(() => drawerForRoute(selectedRoute));
  const [sidebarWidth, setSidebarWidth] = useState(readStoredSidebarWidth);
  const dragStateRef = useRef<{ startX: number; startWidth: number } | null>(null);

  const initialExpanded = useMemo(() => {
    const set = new Set<string>();
    const activeTrail = findNodePath(tree, selectedRoute);
    if (activeTrail) {
      for (const node of activeTrail) {
        if (node.children.length > 0) set.add(node.path);
      }
    } else {
      set.add(tree.path);
      set.add("public-docs");
    }
    return set;
  }, [tree, selectedRoute]);

  const [expandedPaths, setExpandedPaths] = useState(initialExpanded);

  useEffect(() => {
    setActiveDrawer(drawerForRoute(selectedRoute));
  }, [selectedRoute]);

  useEffect(() => {
    setExpandedPaths((current) => {
      const next = new Set(current);
      for (const path of initialExpanded) next.add(path);
      return next;
    });
  }, [initialExpanded]);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(WIDTH_KEY, String(sidebarWidth));
      window.localStorage.setItem(COLLAPSED_KEY, String(collapsed));
    } catch {
      // ignore
    }
  }, [sidebarWidth, collapsed]);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (!dragStateRef.current) return;
      const nextWidth =
        dragStateRef.current.startWidth + (event.clientX - dragStateRef.current.startX);
      setSidebarWidth(clamp(nextWidth, SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH));
    }

    function handlePointerUp() {
      dragStateRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  function startResize(event: ReactPointerEvent<HTMLDivElement>) {
    dragStateRef.current = { startX: event.clientX, startWidth: sidebarWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }

  const toggleExpanded = (nodePath: string) => {
    setExpandedPaths((current) => {
      const next = new Set(current);
      if (next.has(nodePath)) next.delete(nodePath);
      else next.add(nodePath);
      return next;
    });
  };

  const openDrawer = (drawer: DrawerId) => {
    setActiveDrawer(drawer);
    if (drawer === "agents") {
      router.push(withBasePath("/showcase/agents/", basePath));
    } else if (drawer === "tasks") {
      router.push(withBasePath("/showcase/tasks/", basePath));
    }
  };

  const HIDDEN_TREE_PATHS = new Set(["showcase"]);
  const visibleChildren = tree.children.filter((child) => !HIDDEN_TREE_PATHS.has(child.path));
  const dataNodes = visibleChildren.length > 0 ? visibleChildren : [tree];
  const desktopClass = collapsed ? "w-0 overflow-hidden" : "shrink-0";
  const mobileClass = cn(
    "fixed bottom-0 left-0 top-0 z-40",
    collapsed ? "w-0 overflow-hidden" : "w-[280px]"
  );

  return (
    <>
      {mobile && !collapsed && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        suppressHydrationWarning
        className={cn(
          "flex h-screen flex-col overflow-hidden bg-sidebar transition-all duration-200",
          mobile ? mobileClass : desktopClass
        )}
        style={!mobile && !collapsed ? { width: sidebarWidth } : undefined}
      >
        <div className="sidebar-header flex items-center justify-between px-4 py-3">
          <Link
            href={withBasePath("/", basePath)}
            className="group -ml-1 flex items-center gap-1.5 rounded px-1 font-logo text-[22px] italic text-foreground transition-colors hover:bg-accent/60 hover:text-foreground/80"
            title="Go to home"
            aria-label="Go to home"
          >
            cabinet
            <Home className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-50" />
          </Link>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-disabled="true"
              aria-label="Refresh sidebar"
              title="Refresh is unavailable on the static public docs"
              className="inline-flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-md text-muted-foreground/60 transition-colors hover:bg-muted hover:text-muted-foreground"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
            <button
              type="button"
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setCollapsed(true)}
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-1 scrollbar-thin">
          <div className="px-2 pt-3">
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-1.5 ring-1 ring-border/60 transition-colors hover:bg-muted/80">
              <Link
                href={withBasePath("/", basePath)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
                title="Open cabinet overview"
              >
                <Archive className="h-[18px] w-[18px] shrink-0 text-amber-400" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {tree.title}
                </span>
              </Link>
              <button
                type="button"
                aria-disabled="true"
                title="Depth selector is static in public docs"
                className="ml-auto inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
              >
                All
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            <div
              role="tablist"
              aria-label="Cabinet drawers"
              className="mx-[9px] grid grid-cols-3 gap-1 rounded-b-lg border border-border/60 bg-muted/40 p-1 pt-2"
            >
              {([
                {
                  id: "data" as DrawerId,
                  label: "Data",
                  icon: BookOpen,
                  addIcon: FilePlus,
                  onClick: () => openDrawer("data")
                },
                {
                  id: "agents" as DrawerId,
                  label: "Agents",
                  icon: Users,
                  addIcon: UserPlus,
                  onClick: () => openDrawer("agents")
                },
                {
                  id: "tasks" as DrawerId,
                  label: "Tasks",
                  icon: SquareKanban,
                  addIcon: ListPlus,
                  onClick: () => openDrawer("tasks")
                }
              ] as const).map((drawer, index) => {
                const Icon = drawer.icon;
                const AddIcon = drawer.addIcon;
                const active = activeDrawer === drawer.id;
                return (
                  <div key={drawer.id} className="group relative">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={`${drawer.label} drawer`}
                      title={`${drawer.label} drawer`}
                      onClick={drawer.onClick}
                      className={cn(
                        "relative flex w-full flex-col items-center gap-0.5 rounded-md px-1.5 pt-3 pb-2 transition-all duration-150",
                        active
                          ? "-translate-y-px bg-background text-foreground shadow-[0_1px_0_rgba(0,0,0,0.06),0_6px_14px_-10px_rgba(0,0,0,0.35)] ring-1 ring-border/70"
                          : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-1/2 top-1 h-[2px] w-4 -translate-x-1/2 rounded-full transition-colors",
                          active ? "bg-amber-400/50" : "bg-muted-foreground/30"
                        )}
                      />
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        {drawer.label}
                      </span>
                    </button>
                    {active && (
                      <button
                        type="button"
                        aria-disabled="true"
                        title="Read-only public demo"
                        aria-label={`New ${drawer.label.slice(0, -1)}`}
                        className="absolute right-1 top-1 inline-flex h-4 w-4 cursor-not-allowed items-center justify-center rounded text-muted-foreground/70 opacity-0 transition-opacity duration-150 hover:bg-muted hover:text-foreground group-hover:opacity-100"
                      >
                        <AddIcon className="h-3 w-3" />
                      </button>
                    )}
                    {index < 2 ? null : null}
                  </div>
                );
              })}
            </div>
          </div>

          {activeDrawer === "data" && (
            <div
              key="drawer-data"
              className="pt-1 animate-in fade-in slide-in-from-top-1 duration-200 ease-out"
            >
              {dataNodes.map((node) => (
                <PublicTreeNode
                  key={`${node.type}:${node.path}`}
                  node={node}
                  depth={0}
                  selectedRoute={selectedRoute}
                  expandedPaths={expandedPaths}
                  toggleExpanded={toggleExpanded}
                  basePath={basePath}
                />
              ))}
            </div>
          )}

          {activeDrawer === "agents" && (
            <div
              key="drawer-agents"
              className="pt-1 animate-in fade-in slide-in-from-top-1 duration-200 ease-out"
            >
              {demoAgents.map((agent, index) => {
                const Icon = agent.Icon;
                return (
                  <button
                    key={agent.slug}
                    type="button"
                    onClick={() => router.push(withBasePath(`/showcase/agents/#${agent.slug}`, basePath))}
                    className={itemClass(false)}
                    style={{
                      ...pad(1),
                      animationDelay: `${Math.min(index, 10) * 20}ms`,
                      animationFillMode: "backwards"
                    }}
                    title={`${agent.name} - static demo agent`}
                  >
                    <AgentAvatar color={agent.color}>
                      <Icon className="h-3.5 w-3.5" />
                    </AgentAvatar>
                    <span className="min-w-0 flex-1 truncate text-[12px] text-foreground/75">
                      {agent.name}
                    </span>
                    <span
                      className={cn(
                        "ml-auto h-1.5 w-1.5 shrink-0 rounded-full",
                        agent.status === "running" ? "animate-pulse bg-green-500" : statusDot(agent.status)
                      )}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {activeDrawer === "tasks" && (
            <div
              key="drawer-tasks"
              className="pt-1 animate-in fade-in slide-in-from-top-1 duration-200 ease-out"
            >
              {demoTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => router.push(withBasePath(`/showcase/tasks/#${task.id}`, basePath))}
                  className={itemClass(false)}
                  style={pad(1)}
                  title={`${task.title} - static demo task`}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      task.status === "running" ? "animate-pulse bg-green-500" : statusDot(task.status)
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate text-[12px] text-foreground/75">
                    {task.title}
                  </span>
                  <Clock3 className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 p-2">
          {activeDrawer === "data" && (
            <>
              <ReadOnlyFooterButton>
                <Plus className="h-4 w-4 shrink-0" />
                <span className="min-w-0 truncate">New Page</span>
              </ReadOnlyFooterButton>
              <ReadOnlyFooterButton>
                <Archive className="h-4 w-4 shrink-0" />
                <span className="min-w-0 truncate">New Cabinet</span>
              </ReadOnlyFooterButton>
            </>
          )}
          {activeDrawer === "agents" && (
            <ReadOnlyFooterButton>
              <UserPlus className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate">New Agent</span>
            </ReadOnlyFooterButton>
          )}
          {activeDrawer === "tasks" && (
            <ReadOnlyFooterButton>
              <Plus className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate">New Task</span>
            </ReadOnlyFooterButton>
          )}
          <button
            type="button"
            aria-disabled="true"
            aria-label="Settings"
            title="Settings are unavailable on the static public docs"
            className="inline-flex h-7 w-7 shrink-0 cursor-not-allowed items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>

      {!mobile && !collapsed && (
        <div className="relative -ml-px h-screen w-px shrink-0 bg-border">
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar - double-click to reset"
            title="Double-click to reset width"
            onPointerDown={startResize}
            onDoubleClick={() => setSidebarWidth(SIDEBAR_DEFAULT_WIDTH)}
            className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 cursor-col-resize bg-transparent"
          />
        </div>
      )}

      {collapsed && (
        <button
          type="button"
          aria-label="Expand sidebar"
          title="Expand sidebar"
          className={cn(
            "absolute top-3 z-50 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            mobile ? "left-3" : "left-2"
          )}
          onClick={() => setCollapsed(false)}
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
