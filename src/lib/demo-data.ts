import {
  BarChart3,
  BriefcaseBusiness,
  FileSearch,
  Megaphone,
  PenLine,
  ScanSearch,
  Sparkles,
  type LucideIcon
} from "lucide-react";

export interface DemoAgent {
  slug: string;
  name: string;
  role: string;
  department: string;
  status: "live" | "running" | "scheduled" | "paused";
  model: string;
  note: string;
  heartbeat: string;
  routine: string;
  emoji: string;
  color: string;
  Icon: LucideIcon;
}

export interface DemoTask {
  id: string;
  title: string;
  agent: string;
  status: "inbox" | "running" | "needs-review" | "scheduled" | "done" | "archive";
  trigger: "manual" | "routine" | "agent" | "heartbeat";
  note: string;
  model: string;
  lastActivity: string;
  groupSize?: number;
}

export interface DemoScheduleEvent {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  time: string;
  hour: number;
  minute: number;
  duration: number;
  title: string;
  agent: string;
  source: "manual" | "routine" | "agent" | "heartbeat";
}

export interface ShowcaseFile {
  path: string;
  kind: string;
  note: string;
  accent: string;
}

export const demoAgents: DemoAgent[] = [
  {
    slug: "gtm-lead",
    name: "GTM Lead",
    role: "Launch strategy",
    department: "Marketing",
    status: "live",
    model: "Claude",
    note: "Turns positioning notes into channels, offers, and launch risks.",
    heartbeat: "Daily market pulse",
    routine: "Monday launch room",
    emoji: "Go",
    color: "rgb(245, 158, 11)",
    Icon: Megaphone
  },
  {
    slug: "research-lead",
    name: "Research Lead",
    role: "Parallel research",
    department: "Research",
    status: "running",
    model: "Gemini",
    note: "Splits a market question into ten focused research tasks.",
    heartbeat: "Source freshness sweep",
    routine: "Competitor briefs",
    emoji: "Rs",
    color: "rgb(16, 185, 129)",
    Icon: ScanSearch
  },
  {
    slug: "linkedin-operator",
    name: "LinkedIn Operator",
    role: "Drafts, not spam",
    department: "Marketing",
    status: "scheduled",
    model: "GPT",
    note: "Drafts founder posts and reply queues for a human to approve.",
    heartbeat: "Reply queue check",
    routine: "Weekly post batch",
    emoji: "Li",
    color: "rgb(14, 165, 233)",
    Icon: PenLine
  },
  {
    slug: "product-auditor",
    name: "Product Auditor",
    role: "Six-report audits",
    department: "Operations",
    status: "live",
    model: "Codex",
    note: "Reviews onboarding, pricing, docs, activation, churn, and trust.",
    heartbeat: "Regression watch",
    routine: "Six report audit",
    emoji: "Pa",
    color: "rgb(139, 92, 246)",
    Icon: FileSearch
  },
  {
    slug: "revenue-analyst",
    name: "Revenue Analyst",
    role: "Metrics narrator",
    department: "Operations",
    status: "paused",
    model: "Local",
    note: "Builds weekly scorecards and gently bullies messy spreadsheets.",
    heartbeat: "Metric anomaly scan",
    routine: "Friday update packet",
    emoji: "Ra",
    color: "rgb(99, 102, 241)",
    Icon: BarChart3
  },
  {
    slug: "launch-editor",
    name: "Launch Editor",
    role: "Narrative polish",
    department: "Creative",
    status: "live",
    model: "Claude",
    note: "Turns rough research into crisp launches, scripts, and docs.",
    heartbeat: "Tone consistency pass",
    routine: "Launch copy review",
    emoji: "Le",
    color: "rgb(236, 72, 153)",
    Icon: Sparkles
  },
  {
    slug: "ops-coordinator",
    name: "Ops Coordinator",
    role: "Task dispatcher",
    department: "Operations",
    status: "scheduled",
    model: "GPT",
    note: "Breaks a messy request into handoffs, approvals, and follow-ups.",
    heartbeat: "Loose-end sweep",
    routine: "Morning task triage",
    emoji: "Oc",
    color: "rgb(20, 184, 166)",
    Icon: BriefcaseBusiness
  }
];

export const demoTasks: DemoTask[] = [
  {
    id: "triage-launch-ideas",
    title: "Triage the launch ideas inbox",
    agent: "Ops Coordinator",
    status: "inbox",
    trigger: "manual",
    note: "Sort raw ideas into research, copy, audit, and founder-review handoffs.",
    model: "GPT",
    lastActivity: "waiting"
  },
  {
    id: "parallel-briefs",
    title: "Launch 10 competitor brief tasks",
    agent: "Research Lead",
    status: "running",
    trigger: "agent",
    note: "One lead dispatches ten specialists, then gathers the findings.",
    model: "Gemini",
    lastActivity: "2m ago",
    groupSize: 10
  },
  {
    id: "gtm-launch-room",
    title: "Build a go-to-market launch room",
    agent: "GTM Lead",
    status: "running",
    trigger: "manual",
    note: "Offer, audience, launch checklist, objections, and channel plan.",
    model: "Claude",
    lastActivity: "6m ago"
  },
  {
    id: "linkedin-week",
    title: "Draft a week of LinkedIn posts",
    agent: "LinkedIn Operator",
    status: "needs-review",
    trigger: "routine",
    note: "Human-approved drafts only. The public demo sends nothing.",
    model: "GPT",
    lastActivity: "18m ago"
  },
  {
    id: "six-audits",
    title: "Run six product audit reports",
    agent: "Product Auditor",
    status: "scheduled",
    trigger: "manual",
    note: "Onboarding, pricing, docs, activation, churn, and trust.",
    model: "Codex",
    lastActivity: "today 3:30 PM"
  },
  {
    id: "founder-narrative",
    title: "Rewrite founder story from customer calls",
    agent: "Launch Editor",
    status: "needs-review",
    trigger: "agent",
    note: "Three variants are ready: direct, cinematic, and delightfully blunt.",
    model: "Claude",
    lastActivity: "31m ago"
  },
  {
    id: "heartbeat-cleanup",
    title: "Heartbeat: find stale follow-ups before Monday",
    agent: "Ops Coordinator",
    status: "done",
    trigger: "heartbeat",
    note: "Collected dangling approvals and assigned owners.",
    model: "GPT",
    lastActivity: "1h ago",
    groupSize: 4
  },
  {
    id: "investor-update",
    title: "Friday investor update packet",
    agent: "Revenue Analyst",
    status: "done",
    trigger: "routine",
    note: "Metrics, blockers, wins, asks, and the part where numbers behave.",
    model: "Local",
    lastActivity: "yesterday"
  },
  {
    id: "old-demo-campaign",
    title: "Archive old launch-room demo tasks",
    agent: "Ops Coordinator",
    status: "archive",
    trigger: "manual",
    note: "Kept as a public-safe example of finished work history.",
    model: "GPT",
    lastActivity: "3d ago"
  }
];

export const demoScheduleEvents: DemoScheduleEvent[] = [
  {
    id: "mon-gtm-room",
    day: "Mon",
    time: "9:00",
    hour: 9,
    minute: 0,
    duration: 90,
    title: "Launch room",
    agent: "GTM Lead",
    source: "routine"
  },
  {
    id: "mon-research-briefs",
    day: "Mon",
    time: "11:30",
    hour: 11,
    minute: 30,
    duration: 60,
    title: "10 competitor briefs",
    agent: "Research Lead",
    source: "agent"
  },
  {
    id: "tue-heartbeat",
    day: "Tue",
    time: "8:15",
    hour: 8,
    minute: 15,
    duration: 45,
    title: "Loose-end sweep",
    agent: "Ops Coordinator",
    source: "heartbeat"
  },
  {
    id: "tue-linkedin",
    day: "Tue",
    time: "14:00",
    hour: 14,
    minute: 0,
    duration: 60,
    title: "LinkedIn batch",
    agent: "LinkedIn Operator",
    source: "routine"
  },
  {
    id: "wed-audit",
    day: "Wed",
    time: "10:00",
    hour: 10,
    minute: 0,
    duration: 120,
    title: "Six-report audit",
    agent: "Product Auditor",
    source: "manual"
  },
  {
    id: "thu-editor",
    day: "Thu",
    time: "13:30",
    hour: 13,
    minute: 30,
    duration: 75,
    title: "Founder story pass",
    agent: "Launch Editor",
    source: "agent"
  },
  {
    id: "fri-investor",
    day: "Fri",
    time: "9:30",
    hour: 9,
    minute: 30,
    duration: 90,
    title: "Investor packet",
    agent: "Revenue Analyst",
    source: "routine"
  },
  {
    id: "fri-market-pulse",
    day: "Fri",
    time: "15:00",
    hour: 15,
    minute: 0,
    duration: 45,
    title: "Market pulse",
    agent: "GTM Lead",
    source: "heartbeat"
  }
];

export const showcaseFiles: ShowcaseFile[] = [
  {
    path: ".cabinet",
    kind: "manifest",
    note: "Names the cabinet and tells Cabinet where the entry page lives.",
    accent: "#B9854B"
  },
  {
    path: "public-docs/start-here/index.md",
    kind: "markdown page",
    note: "Turns into a static HTML docs route with SEO metadata.",
    accent: "#5A8F78"
  },
  {
    path: "public-docs/media/walkthrough.mp4",
    kind: "video",
    note: "Embeddable media can sit beside the page that explains it.",
    accent: "#4C78A8"
  },
  {
    path: "public-docs/showcase/product-audit.md",
    kind: "report",
    note: "Example outputs become durable docs, not trapped chat logs.",
    accent: "#8B6FAD"
  },
  {
    path: "public-docs/assets/sidebar-tour.png",
    kind: "screenshot",
    note: "Screenshots keep docs visual while remaining static assets.",
    accent: "#9D745C"
  },
  {
    path: "public-docs/examples/gtm-launch.task.md",
    kind: "task recipe",
    note: "Public-safe examples show what a private Cabinet can run.",
    accent: "#7C8A3D"
  }
];

export const demoDepartments = [
  {
    name: "Marketing",
    lead: "GTM Lead",
    agents: ["Copywriter", "Designer", "LinkedIn Operator"],
    Icon: Megaphone
  },
  {
    name: "Research",
    lead: "Research Lead",
    agents: ["Market Scout", "Citation Keeper", "Trend Analyst"],
    Icon: ScanSearch
  },
  {
    name: "Operations",
    lead: "Product Auditor",
    agents: ["QA Reviewer", "Docs Critic", "Report Factory"],
    Icon: BriefcaseBusiness
  },
  {
    name: "Creative",
    lead: "Launch Editor",
    agents: ["Script Writer", "Post Optimizer", "Image Creator"],
    Icon: Sparkles
  }
];
