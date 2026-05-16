export type PublicNodeType =
  | "cabinet"
  | "directory"
  | "file"
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "csv"
  | "code"
  | "unknown";

export interface PublicTreeNode {
  name: string;
  title: string;
  path: string;
  type: PublicNodeType;
  route: string | null;
  assetUrl?: string;
  order: number | null;
  children: PublicTreeNode[];
}

export interface PublicPage {
  id: string;
  pagePath: string;
  route: string;
  sourceFile: string;
  sourceDir: string;
  title: string;
  description: string;
  tags: string[];
  order: number | null;
  status: string | null;
  modified: string | null;
  rawMarkdown: string;
  text: string;
  excerpt: string;
  headings: Array<{ depth: number; text: string; id: string }>;
  html: string;
}

export interface PublicSearchHit {
  id: string;
  title: string;
  route: string;
  excerpt: string;
  tags: string[];
  text: string;
}

export interface PublicContent {
  site: {
    name: string;
    description: string;
    sourcePath: string;
    generatedAt: string;
    basePath: string;
  };
  tree: PublicTreeNode;
  pages: PublicPage[];
  search: PublicSearchHit[];
}
