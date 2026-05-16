import rawContent from "@/generated/content.json";
import type { PublicContent, PublicPage } from "@/lib/types";
import { normalizeRoute } from "@/lib/utils";

export const content = rawContent as PublicContent;

const pagesByRoute = new Map(content.pages.map((page) => [normalizeRoute(page.route), page]));

export function getPageByRoute(route: string): PublicPage | null {
  return pagesByRoute.get(normalizeRoute(route)) ?? null;
}

export function getAllPages() {
  return content.pages;
}

export function getBasePath() {
  return content.site.basePath || "";
}
