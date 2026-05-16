import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PublicTreeNode } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeRoute(route: string) {
  if (!route || route === "/") return "/";
  return `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

export function withBasePath(pathname: string, basePath = "") {
  if (!basePath) return pathname;
  if (pathname === "/") return `${basePath}/`;
  return `${basePath}${pathname}`;
}

export function findNodeByRoute(nodes: PublicTreeNode, route: string): PublicTreeNode | null {
  if (nodes.route === route) return nodes;
  for (const child of nodes.children) {
    const found = findNodeByRoute(child, route);
    if (found) return found;
  }
  return null;
}

export function findNodePath(
  nodes: PublicTreeNode,
  route: string,
  trail: PublicTreeNode[] = []
): PublicTreeNode[] | null {
  const nextTrail = [...trail, nodes];
  if (nodes.route === route) return nextTrail;
  for (const child of nodes.children) {
    const found = findNodePath(child, route, nextTrail);
    if (found) return found;
  }
  return null;
}

export function collectExpandablePaths(node: PublicTreeNode, out = new Set<string>()): Set<string> {
  if (node.children.length > 0) out.add(node.path);
  for (const child of node.children) collectExpandablePaths(child, out);
  return out;
}

export function routeToStaticParam(route: string): string[] {
  if (route === "/") return [];
  return route.replace(/^\/|\/$/g, "").split("/");
}

export function routeFromSlug(slug?: string[]): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}/`;
}
