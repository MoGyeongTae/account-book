"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import FullCalendar, {
  joinClassNames,
  type DateClickInfo,
  type DayCellInfo,
  type EventDisplayInfo,
} from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/classic";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

type EventType = "bar" | "card" | "badge" | "text" | "progress";

type CustomEventProps = {
  type: EventType;
  subtitle?: string;
  time?: string;
  variant?: "purple" | "green";
  progress?: number;
};

const events = [
  {
    id: "design-sprint",
    title: "Design Sprint",
    start: "2026-12-01",
    end: "2026-12-03",
    extendedProps: { type: "bar" } satisfies CustomEventProps,
    color: "#3b82f6",
  },
  {
    id: "client-review",
    title: "Client Review",
    start: "2026-12-11",
    extendedProps: {
      type: "card",
      time: "10:00 - 11:30",
      variant: "purple",
    } satisfies CustomEventProps,
    color: "transparent",
  },
  {
    id: "deadline",
    title: "Deadline",
    start: "2026-12-16",
    extendedProps: { type: "badge" } satisfies CustomEventProps,
    color: "transparent",
  },
  {
    id: "workshop",
    title: "Workshop",
    start: "2026-12-21",
    extendedProps: {
      type: "card",
      subtitle: "Room 302",
      variant: "green",
    } satisfies CustomEventProps,
    color: "transparent",
  },
  {
    id: "lunch-break",
    title: "Lunch Break",
    start: "2026-12-24",
    extendedProps: { type: "text" } satisfies CustomEventProps,
    color: "transparent",
  },
  {
    id: "q4-planning",
    title: "Q4 Planning",
    start: "2027-01-02",
    extendedProps: { type: "progress", progress: 65 } satisfies CustomEventProps,
    color: "transparent",
  },
];

function getCellDate(info: DayCellInfo) {
  const { date } = info;
  return date instanceof Date ? date : new Date(String(date));
}

function isSelectedDay(info: DayCellInfo) {
  const date = getCellDate(info);

  return (
    date.getFullYear() === 2026 &&
    date.getMonth() === 11 &&
    date.getDate() === 16
  );
}

function EventCard({
  title,
  subtitle,
  time,
  variant,
}: {
  title: string;
  subtitle?: string;
  time?: string;
  variant: "purple" | "green";
}) {
  const styles =
    variant === "purple"
      ? "border-l-4 border-violet-500 bg-violet-50 text-violet-950"
      : "border-t-4 border-emerald-600 bg-emerald-50 text-emerald-950";

  return (
    <div className={`w-full rounded-md px-2 py-1.5 text-xs ${styles}`}>
      <p className="font-semibold">{title}</p>
      {time && <p className="mt-0.5 text-[11px] opacity-80">{time}</p>}
      {subtitle && (
        <p className="mt-0.5 text-[11px] font-medium opacity-80">{subtitle}</p>
      )}
      {variant === "purple" && (
        <div className="mt-1.5 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-violet-200" />
        </div>
      )}
    </div>
  );
}

function renderEventContent({ event }: EventDisplayInfo) {
  const props = event.extendedProps as CustomEventProps;

  if (props.type === "bar") {
    return (
      <div className="truncate px-1 text-xs font-medium text-white">
        {event.title}
      </div>
    );
  }

  if (props.type === "card" && props.variant) {
    return (
      <EventCard
        title={event.title}
        subtitle={props.subtitle}
        time={props.time}
        variant={props.variant}
      />
    );
  }

  if (props.type === "badge") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        {event.title}
      </span>
    );
  }

  if (props.type === "text") {
    return <p className="text-[11px] text-zinc-400">{event.title}</p>;
  }

  if (props.type === "progress") {
    return (
      <div className="w-full rounded-md bg-sky-50 px-2 py-1.5 text-[11px] text-sky-950">
        <p className="font-semibold">{event.title}</p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sky-100">
          <div
            className="h-full rounded-full bg-sky-500"
            style={{ width: `${props.progress ?? 0}%` }}
          />
        </div>
        <p className="mt-1 text-[10px] text-sky-700">
          {props.progress}% Complete
        </p>
      </div>
    );
  }

  return <span>{event.title}</span>;
}

export default function Calendar() {
  const router = useRouter();
  const initialDate = useMemo(() => dayjs().format("YYYY-MM-DD"), []);

  const handleDateClick = useCallback(
    (info: DateClickInfo) => {
      router.push(`/${info.dateStr}/info`);
    },
    [router],
  );

  return (
    <div className="account-book-calendar mx-auto w-full max-w-6xl px-4 py-8 font-sans">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <FullCalendar
          plugins={[themePlugin, dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={initialDate}
          events={events}
          dateClick={handleDateClick}
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next",
          }}
          height="auto"
          fixedWeekCount={false}
          dayMaxEvents={3}
          eventContent={renderEventContent}
          dayCellClass={(info) =>
            joinClassNames(isSelectedDay(info) && "fc-selected-day")
          }
          views={{
            dayGrid: { listItemEventBeforeClass: "hidden" },
          }}
        />
      </div>
    </div>
  );
}
