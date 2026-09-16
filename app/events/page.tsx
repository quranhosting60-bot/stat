import Reveal from "@/components/Reveal";
import { events } from "@/data/events";

export const metadata = { title: "Events & Exhibitions — Smart Printing" };

const typeLabel: Record<string, string> = {
  exhibition: "Exhibition",
  workshop: "Workshop",
  "open-day": "Open Day",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal>
        <p className="text-sm font-medium text-cyan-deep">Events & Exhibitions</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">
          Where to find us next
        </h1>
        <p className="mt-4 max-w-lg text-navy/60">
          Trade shows, workshops and branch open days across Saudi Arabia.
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {events.map((event, i) => (
          <Reveal key={event.slug} delay={i * 0.07}>
            <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="rounded-pill bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan-deep">
                  {typeLabel[event.type]}
                </span>
                <h2 className="mt-3 font-display text-lg font-semibold text-navy">{event.title}</h2>
                <p className="mt-1.5 max-w-lg text-sm text-navy/60">{event.description}</p>
                <p className="mt-2 text-xs text-navy/40">{event.location}</p>
              </div>
              <div className="flex-shrink-0 rounded-2xl bg-mist px-5 py-3 text-center">
                <p className="font-display text-lg font-semibold text-navy">
                  {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </p>
                <p className="text-xs text-navy/50">
                  {new Date(event.date).toLocaleDateString("en-GB", { year: "numeric" })}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
