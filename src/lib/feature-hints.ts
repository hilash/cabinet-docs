export interface FeatureHint {
  id: string;
  title: string;
  body: string;
  readMoreRoute: string;
  readMoreLabel: string;
}

export const featureHints = {
  "sidebar-tree": {
    id: "sidebar-tree",
    title: "Cabinet tree",
    body: "This is the same mental model as Cabinet: cabinets, folders, pages, and assets in one browsable knowledge tree. On the public site every row is read only.",
    readMoreRoute: "/public-docs/start-here/",
    readMoreLabel: "Start with Cabinet"
  },
  "cabinet-node": {
    id: "cabinet-node",
    title: "Cabinet",
    body: "A cabinet is a folder with a .cabinet manifest. It can contain pages, assets, agents, jobs, and child cabinets, while the public site publishes only visible docs content.",
    readMoreRoute: "/public-docs/concepts/cabinet-file-format/",
    readMoreLabel: "Read about the file format"
  },
  "page-node": {
    id: "page-node",
    title: "Documentation page",
    body: "Pages are Markdown files rendered as static HTML. That keeps the docs fast, indexable, and easy for people or LLMs to read.",
    readMoreRoute: "/publishing-workflow/",
    readMoreLabel: "See the publishing workflow"
  },
  breadcrumbs: {
    id: "breadcrumbs",
    title: "Breadcrumbs",
    body: "The toolbar shows where the current page lives inside the cabinet. Each earlier breadcrumb is a static link, so search engines and readers can follow the hierarchy.",
    readMoreRoute: "/public-docs/reference/file-structure/",
    readMoreLabel: "View file structure"
  },
  search: {
    id: "search",
    title: "Static search",
    body: "Search runs from a generated JSON index. It does not call a backend, run agents, or read the local filesystem.",
    readMoreRoute: "/publishing-workflow/",
    readMoreLabel: "See how the site is generated"
  },
  "llm-export": {
    id: "llm-export",
    title: "LLM-friendly copies",
    body: "Copy actions expose the current page, raw Markdown, and an LLM-ready version. The site also publishes llms.txt and llms-full.txt.",
    readMoreRoute: "/public-docs/media/",
    readMoreLabel: "Plan screenshots and videos"
  },
  "agents-panel": {
    id: "agents-panel",
    title: "Agents panel",
    body: "A real Cabinet can keep agent personas beside the docs. This public version shows sample agents only, so there is no runtime, memory, filesystem access, or private data.",
    readMoreRoute: "/public-docs/concepts/ai-team/",
    readMoreLabel: "Read about AI teams"
  },
  "tasks-panel": {
    id: "tasks-panel",
    title: "Tasks panel",
    body: "Tasks are how agents do work. These examples are static product demos: no task can be launched, resumed, deleted, or executed from the public docs.",
    readMoreRoute: "/public-docs/guides/tasks-and-routines/",
    readMoreLabel: "Read about tasks"
  },
  showcase: {
    id: "showcase",
    title: "Showcase",
    body: "The showcase borrows the feel of Cabinet's in-app help demos while keeping everything static, indexable, and safe for a public docs site.",
    readMoreRoute: "/public-docs/showcase/",
    readMoreLabel: "Open the showcase"
  }
} satisfies Record<string, FeatureHint>;

export type FeatureHintId = keyof typeof featureHints;
