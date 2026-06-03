import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

const destinations = [
  "Srinagar City Tour",
  "Gulmarg",
  "Sonmarg",
  "Pahalgam",
  "Yusmarg",
  "Doodhpathri",
  "Patnitop",
  "Airport Transfer",
];

const tripTypes = ["Airport pickup", "Local sightseeing", "Outstation tour", "Multi-day package"];

export function TripPlanner() {
  const [name, setName] = useState("");
  const [tripType, setTripType] = useState(tripTypes[1]);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const [picked, setPicked] = useState<string[]>(["Srinagar City Tour"]);
  const [notes, setNotes] = useState("");

  const toggle = (d: string) =>
    setPicked((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  const message = useMemo(() => {
    const lines = [
      "Hi Al Madaan Ventures!",
      name && `Name: ${name}`,
      `Trip type: ${tripType}`,
      date && `Date: ${date}`,
      `People: ${people}`,
      picked.length && `Destinations: ${picked.join(", ")}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [name, tripType, date, people, picked, notes]);

  const waUrl = `https://wa.me/91917006109912?text=${encodeURIComponent(message)}`;

  return (
    <div className="surface-card space-y-5 p-6">
      <div className="space-y-1">
        <p className="section-kicker">Trip planner</p>
        <h2 className="text-2xl font-semibold text-foreground">
          Build your request, send it on WhatsApp
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill the basics. We'll auto-compose a clear WhatsApp message — no account needed.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Your name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aman"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Travel date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Trip type</span>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            {tripTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Passengers</span>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Destinations</p>
        <div className="flex flex-wrap gap-2">
          {destinations.map((d) => {
            const active = picked.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggle(d)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="font-medium text-foreground">Anything else?</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Flight time, hotel name, language preference…"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </label>

      <div className="rounded-md border border-border/70 bg-panel p-3 text-xs leading-6 text-muted-foreground whitespace-pre-wrap">
        {message}
      </div>

      <a href={waUrl} target="_blank" rel="noreferrer" className="inline-block">
        <Button variant="hero" size="lg">
          <MessageCircle className="h-5 w-5" />
          Send on WhatsApp
        </Button>
      </a>
    </div>
  );
}
