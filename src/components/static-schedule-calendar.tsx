import { HeartPulse } from "lucide-react";
import { demoAgents, demoScheduleEvents, type DemoScheduleEvent } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export type StaticCalendarMode = "day" | "week" | "month";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const HOURS = Array.from({ length: 11 }, (_, index) => 8 + index);
const HOUR_HEIGHT = 54;

function formatHour(hour: number) {
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

function agentFor(event: DemoScheduleEvent) {
  return demoAgents.find((agent) => agent.name === event.agent);
}

function eventTone(event: DemoScheduleEvent) {
  const agent = agentFor(event);
  const color = agent?.color ?? "rgb(99, 102, 241)";
  return {
    backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
    color
  };
}

function sourceLabel(source: DemoScheduleEvent["source"]) {
  if (source === "routine") return "Job";
  if (source === "heartbeat") return "Heartbeat";
  if (source === "agent") return "Agent";
  return "Manual";
}

function EventPill({ event, dense = false }: { event: DemoScheduleEvent; dense?: boolean }) {
  const agent = agentFor(event);
  return (
    <button
      type="button"
      aria-disabled="true"
      title={`${event.title} - ${event.agent} - static public demo`}
      className={cn(
        "flex min-w-0 items-center gap-1.5 rounded-md px-1.5 text-left transition-all",
        "hover:ring-1 hover:ring-foreground/20 hover:shadow-sm",
        dense ? "h-5" : "h-[22px]"
      )}
      style={eventTone(event)}
    >
      <span className="shrink-0 text-[9px] font-semibold leading-none">
        {agent?.emoji ?? "Ai"}
      </span>
      <span className={cn("truncate font-medium", dense ? "text-[9px]" : "text-[10px]")}>
        {event.title}
      </span>
      {!dense && event.source === "heartbeat" && (
        <HeartPulse className="ml-auto h-2.5 w-2.5 shrink-0 opacity-75" />
      )}
    </button>
  );
}

function DayColumn({
  day,
  events,
  highlight
}: {
  day: (typeof DAYS)[number];
  events: DemoScheduleEvent[];
  highlight?: boolean;
}) {
  return (
    <div className={cn("relative border-r border-border/30 last:border-r-0", highlight && "bg-amber-500/[0.03]")}>
      {HOURS.map((hour, index) => (
        <div
          key={hour}
          className="absolute left-0 right-0 border-t border-border/20"
          style={{ top: index * HOUR_HEIGHT }}
        />
      ))}
      {events.map((event) => {
        const top = ((event.hour - HOURS[0]) + event.minute / 60) * HOUR_HEIGHT;
        const height = Math.max(28, (event.duration / 60) * HOUR_HEIGHT - 3);
        return (
          <div
            key={event.id}
            className="absolute left-1 right-1"
            style={{ top, height }}
          >
            <EventPill event={event} dense={height < 38} />
            {height >= 44 && (
              <div className="mt-1 truncate px-1.5 text-[9px] text-muted-foreground/70">
                {event.time} · {sourceLabel(event.source)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WeekGrid({ mode }: { mode: Exclude<StaticCalendarMode, "month"> }) {
  const visibleDays = mode === "day" ? (["Wed"] as const) : DAYS;
  const gridTemplateColumns = mode === "day" ? "56px minmax(220px, 1fr)" : `56px repeat(${visibleDays.length}, minmax(132px, 1fr))`;

  return (
    <div className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-lg border border-border/70 bg-card">
      <div className="grid border-b border-border/50 bg-muted/20" style={{ gridTemplateColumns }}>
        <div className="border-r border-border/30 px-2 py-2" />
        {visibleDays.map((day, index) => (
          <div
            key={day}
            className={cn(
              "border-r border-border/30 px-2 py-2 text-center last:border-r-0",
              day === "Wed" && "bg-amber-500/[0.06]"
            )}
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              {day}
            </div>
            <div
              className={cn(
                "mx-auto mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                day === "Wed" ? "bg-primary text-primary-foreground" : "text-foreground"
              )}
            >
              {6 + index}
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
        <div
          className="relative grid min-w-full"
          style={{
            gridTemplateColumns,
            height: HOURS.length * HOUR_HEIGHT
          }}
        >
          <div className="relative border-r border-border/30">
            {HOURS.map((hour, index) => (
              <div
                key={hour}
                className="absolute right-2 text-[10px] tabular-nums text-muted-foreground/50"
                style={{ top: index * HOUR_HEIGHT - 6 }}
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>
          {visibleDays.map((day) => (
            <DayColumn
              key={day}
              day={day}
              highlight={day === "Wed"}
              events={demoScheduleEvents.filter((event) => event.day === day)}
            />
          ))}
          <div className="pointer-events-none absolute left-[56px] right-0 top-[226px] z-10">
            <div className="h-px w-full bg-red-500/60" />
            <div className="absolute -left-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthGrid() {
  const cells = Array.from({ length: 35 }, (_, index) => index + 1);
  const eventsByDay = new Map<number, DemoScheduleEvent[]>();
  demoScheduleEvents.forEach((event, index) => {
    const dayNumber = 4 + index;
    eventsByDay.set(dayNumber, [...(eventsByDay.get(dayNumber) ?? []), event]);
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border/70 bg-card">
      <div className="grid grid-cols-7 border-b border-border/50 bg-muted/20">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="border-r border-border/30 px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day) => {
          const dayEvents = eventsByDay.get(day) ?? [];
          const muted = day < 3 || day > 30;
          return (
            <button
              key={day}
              type="button"
              aria-disabled="true"
              className={cn(
                "min-h-[92px] border-r border-b border-border/30 p-1.5 text-left last:border-r-0",
                muted && "bg-muted/20 text-muted-foreground/45",
                day === 6 && "bg-amber-500/[0.04]"
              )}
            >
              <div className={cn("mb-1 text-[11px] font-medium", day === 6 && "text-primary")}>
                {day}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventPill key={event.id} event={event} dense />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StaticScheduleCalendar({ mode }: { mode: StaticCalendarMode }) {
  return mode === "month" ? <MonthGrid /> : <WeekGrid mode={mode} />;
}
