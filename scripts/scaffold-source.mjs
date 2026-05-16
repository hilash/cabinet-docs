import fs from "node:fs/promises";
import path from "node:path";

const SOURCE_ROOT =
  process.env.CABINET_DOCS_SOURCE ||
  path.resolve(process.cwd(), "../cabinet-data/cabinet-public-docs");

const CREATED = "2026-05-03T00:00:00.000Z";

function page(title, tags, order, body) {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `created: ${JSON.stringify(CREATED)}`,
    `modified: ${JSON.stringify(CREATED)}`,
    "status: draft",
    "tags:",
    ...tags.map((tag) => `  - ${tag}`),
    `order: ${order}`,
    "---",
    "",
    body.trim(),
    ""
  ].join("\n");
}

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function writeIfMissing(relativePath, content) {
  const target = path.join(SOURCE_ROOT, relativePath);
  if (await exists(target)) return;
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, "utf8");
}

async function touchGitkeep(relativeDir) {
  await writeIfMissing(path.join(relativeDir, ".gitkeep"), "");
}

await fs.mkdir(SOURCE_ROOT, { recursive: true });

await writeIfMissing(
  ".cabinet",
  [
    "schemaVersion: 1",
    "id: cabinet-public-docs",
    "name: Cabinet Public Docs",
    "kind: child",
    "version: 0.1.0",
    "description: Public documentation website source cabinet for Cabinet.",
    "entry: index.md",
    "",
    "parent:",
    "  shared_context: []",
    "",
    "access:",
    "  mode: subtree-plus-parent-brief",
    ""
  ].join("\n")
);

await touchGitkeep(".agents");
await touchGitkeep(".jobs");
await touchGitkeep(".cabinet-state");

await writeIfMissing(
  "index.md",
  page(
    "Welcome to Cabinet",
    ["docs", "home"],
    0,
    `# Welcome to Cabinet

A smart folder for you and your AI team. Local-first. Markdown-backed. Yours.

Cabinet collapses your notes, files, tasks, and AI agents into one folder on your computer. You open one app — everything is there. You close your laptop — your AI team keeps working.

## Pick your path

- [Install Cabinet](./install/) — five minutes from zero to running.
- [What is a Cabinet?](./cabinet/) — the three tabs of the app, in plain language.
- [Meet your AI team](./agents/) — personas, skills, tasks, routines, heartbeats.
- [Philosophy](./philosophy/) — the 90-second pitch.
- [Reference](./reference/) — CLI, file structure, schemas.
`
  )
);

await writeIfMissing(
  "showcase/index.md",
  page(
    "Showcase",
    ["showcase", "agents", "tasks"],
    5,
    `# Showcase

This page is a public-safe demo of how Cabinet can feel when a knowledge base also has agents, tasks, routines, screenshots, and generated reports.

The panels on this page are examples only. They do not run tasks, call models, access files, or expose private cabinet state.

## Demo surfaces

- [[Agents Workspace]]
- [[Tasks Board]]

## What to notice

- The docs are real static pages.
- The agents and tasks are playful examples of what a private Cabinet can contain.
- File examples show how documentation, media, reports, and task recipes can sit together.
- The public website stays SEO-friendly and LLM-friendly because every docs page is rendered as static HTML.
`
  )
);

await writeIfMissing(
  "showcase/agents/index.md",
  page(
    "Agents Workspace",
    ["showcase", "agents"],
    6,
    `# Agents Workspace

This is a read-only public version of Cabinet's Agents workspace.

It uses static sample agents to show the real product shape: team counts, the org-chart action, agent cards, routine controls, heartbeats, and schedule previews.

Nothing on this page can create agents, run models, edit personas, or read private state.
`
  )
);

await writeIfMissing(
  "showcase/tasks/index.md",
  page(
    "Tasks Board",
    ["showcase", "tasks"],
    7,
    `# Tasks Board

This is a read-only public version of Cabinet's task board.

It shows the same work surface shape as the app: view controls, filters, trigger chips, lanes, cards, agent pills, and task metadata. The examples are intentionally public-safe.

Nothing on this page can launch, resume, reassign, delete, or schedule work.
`
  )
);

await writeIfMissing(
  "concepts/index.md",
  page(
    "Concepts",
    ["concepts"],
    10,
    `# Concepts

These pages explain the product model behind Cabinet.

- [[What is Cabinet App]]
- [[Cabinet File Format]]
- [[AI Team Concept]]
`
  )
);

await writeIfMissing(
  "concepts/what-is-cabinet-app/index.md",
  page(
    "What is Cabinet App",
    ["concepts", "app"],
    11,
    `# What is Cabinet App

Cabinet is a local-first knowledge base with AI work built into the workspace.

It gives you:

- A file tree for your knowledge base.
- A rich markdown editor.
- Search across your pages.
- AI agents with personas and memory.
- Tasks and routines that can write back into the cabinet.
- Git-backed history for changes.

The public website mirrors the Cabinet browsing experience, but it is read-only and static.
`
  )
);

await writeIfMissing(
  "concepts/cabinet-file-format/index.md",
  page(
    "Cabinet File Format",
    ["concepts", "file-format"],
    12,
    `# Cabinet File Format

A cabinet is a folder with a small manifest and regular files.

\`\`\`text
my-cabinet/
  .cabinet
  index.md
  .agents/
  .jobs/
  notes/
    index.md
\`\`\`

The \`.cabinet\` manifest names the cabinet and tells Cabinet whether the folder is a root cabinet or a child cabinet.

\`\`\`yaml
schemaVersion: 1
id: my-cabinet
name: My Cabinet
kind: root
version: 0.1.0
entry: index.md
\`\`\`

Everything important remains inspectable on disk.
`
  )
);

await writeIfMissing(
  "concepts/ai-team/index.md",
  page(
    "AI Team Concept",
    ["concepts", "agents"],
    13,
    `# AI Team Concept

Cabinet treats AI helpers as a team that works inside your knowledge base.

An agent can have:

- A persona.
- A goal.
- Skills.
- Scheduled jobs.
- Memory files.
- A workspace for outputs.

The goal is not to hide work inside a chat transcript. The goal is to let useful work become durable pages, tasks, research, and decisions in your cabinet.
`
  )
);

await writeIfMissing(
  "install/index.md",
  page(
    "Install Cabinet",
    ["install", "quickstart"],
    20,
    `# Install Cabinet

Cabinet runs from \`npx\`.

\`\`\`bash
npx create-cabinet@latest
cd cabinet
npm run dev:all
\`\`\`

Open the local URL shown in your terminal. Cabinet will guide you through first-run setup and create a workspace for your files and AI team.

## Update

\`\`\`bash
npx cabinetai update
\`\`\`

## Uninstall cached app versions

\`\`\`bash
npx cabinetai uninstall
\`\`\`

Your cabinet folders are your data. Removing the cached app does not delete your cabinets.
`
  )
);

await writeIfMissing(
  "guides/index.md",
  page(
    "Guides",
    ["guides"],
    30,
    `# Guides

Practical workflows for using Cabinet.

- [[Create New Cabinet]]
- [[Tasks and Routines]]
- [[Skills]]
- [[Showcase]]
`
  )
);

await writeIfMissing(
  "guides/tasks-and-routines/index.md",
  page(
    "Tasks and Routines",
    ["guides", "tasks", "routines"],
    32,
    `# Tasks and Routines

Tasks are one-off pieces of work. Routines are tasks that run on a schedule.

Good task examples:

- Launch ten separate competitor brief tasks and synthesize the results.
- Draft a go-to-market launch room with positioning, channels, objections, and a checklist.
- Produce six product audit reports: onboarding, pricing, docs, activation, churn, and trust.
- Draft a week of LinkedIn posts for human review.

Good routine examples:

- Scan product feedback every morning.
- Prepare a weekly metrics brief.
- Summarize new research every Friday.
- Turn new support themes into Discord-ready release notes.

The important Cabinet pattern is that outputs should become files in the knowledge base.
`
  )
);

await writeIfMissing(
  "reference/index.md",
  page(
    "Reference",
    ["reference"],
    40,
    `# Reference

Technical details for Cabinet users and builders.

- [[CLI Reference]]
- [[File Structure]]
`
  )
);

await writeIfMissing(
  "reference/cli/index.md",
  page(
    "CLI Reference",
    ["reference", "cli"],
    41,
    `# CLI Reference

\`\`\`bash
npx cabinetai create my-cabinet
npx cabinetai run
npx cabinetai list
npx cabinetai doctor
npx cabinetai update
npx cabinetai uninstall
\`\`\`

The CLI manages the app install and starts Cabinet against the current cabinet directory.
`
  )
);

await writeIfMissing(
  "reference/file-structure/index.md",
  page(
    "File Structure",
    ["reference", "files"],
    42,
    `# File Structure

Common cabinet paths:

| Path | Purpose |
| --- | --- |
| \`.cabinet\` | Cabinet manifest |
| \`index.md\` | Entry page |
| \`.agents/\` | Agent personas and memory |
| \`.jobs/\` | Scheduled job definitions |
| \`.cabinet-state/\` | Runtime state managed by Cabinet |

Do not publish hidden runtime folders to public websites.
`
  )
);

await writeIfMissing(
  "roadmap/index.md",
  page(
    "Roadmap",
    ["roadmap"],
    50,
    `# Roadmap

The public roadmap should explain what is stable, what is experimental, and what is coming next.

## Draft items

- More polished onboarding.
- More import/export workflows.
- Better docs for nested cabinets.
- More examples of AI teams doing useful work.
`
  )
);

console.log(`Source cabinet ready: ${SOURCE_ROOT}`);
