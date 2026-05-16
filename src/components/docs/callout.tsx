import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    label: "Tip",
    border: "border-l-[3px] border-l-amber-500",
    bg: "bg-amber-50/70 dark:bg-amber-950/30",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  info: {
    icon: Info,
    label: "Note",
    border: "border-l-[3px] border-l-sky-500",
    bg: "bg-sky-50/70 dark:bg-sky-950/30",
    iconClass: "text-sky-600 dark:text-sky-400",
  },
  warning: {
    icon: AlertTriangle,
    label: "Heads up",
    border: "border-l-[3px] border-l-orange-500",
    bg: "bg-orange-50/70 dark:bg-orange-950/30",
    iconClass: "text-orange-600 dark:text-orange-400",
  },
  danger: {
    icon: ShieldAlert,
    label: "Important",
    border: "border-l-[3px] border-l-rose-500",
    bg: "bg-rose-50/70 dark:bg-rose-950/30",
    iconClass: "text-rose-600 dark:text-rose-400",
  },
} as const;

export function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: keyof typeof VARIANTS;
  title?: string;
  children: React.ReactNode;
}) {
  const v = VARIANTS[variant];
  const Icon = v.icon;
  return (
    <div className={`my-4 flex gap-3 rounded-lg p-4 ${v.border} ${v.bg} not-prose`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${v.iconClass}`} />
      <div className="text-sm leading-relaxed text-foreground">
        {title && <div className="mb-1 font-semibold">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
