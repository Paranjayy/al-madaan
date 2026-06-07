import { MessageCircle, Mail, Plus, Minus, MapPin, Clock, Car } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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
const taxiTypes = ["Toyota Dzire (up to 4 guests)", "Innova Crysta (up to 7 guests)"];

export function TripPlanner() {
  const [name, setName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [tripType, setTripType] = useState(tripTypes[1]);
  const [taxiType, setTaxiType] = useState(taxiTypes[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [picked, setPicked] = useState<string[]>(["Srinagar City Tour"]);
  const [notes, setNotes] = useState("");

  const toggle = (d: string) =>
    setPicked((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  const adjustGuests = (delta: number) => setGuests((g) => Math.min(7, Math.max(1, g + delta)));

  const message = useMemo(() => {
    const lines = [
      "Hi Al Madaan Ventures! I'd like to book a trip.",
      name && `Name: ${name}`,
      `Trip type: ${tripType}`,
      `Taxi preference: ${taxiType}`,
      pickupLocation && `Pickup location: ${pickupLocation}`,
      date && `Date: ${date}`,
      time && `Pickup time: ${time}`,
      `Guests: ${guests}`,
      picked.length && `Destinations: ${picked.join(", ")}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [name, tripType, taxiType, pickupLocation, date, time, guests, picked, notes]);

  const waUrl = `https://wa.me/91917006109912?text=${encodeURIComponent(message)}`;

  const emailSubject = encodeURIComponent(`Taxi Booking Request – ${name || "New Guest"}`);
  const emailBody = encodeURIComponent(message);
  const emailUrl = `mailto:almadaanventures@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="surface-card space-y-6 p-6 sm:p-8">
      <div className="space-y-1">
        <p className="section-kicker">Booking request</p>
        <h2 className="text-2xl font-semibold text-foreground">
          Plan your trip, send it instantly
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in your details and we'll auto-compose a clear WhatsApp or Email message — no account
          needed.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Your name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aman Sharma"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </label>

        {/* Pickup location */}
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Pickup location
          </span>
          <input
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Hotel name or area in Srinagar"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </label>

        {/* Trip type */}
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Trip type</span>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            {tripTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        {/* Taxi type */}
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground flex items-center gap-1.5">
            <Car className="h-3.5 w-3.5 text-primary" />
            Taxi preference
          </span>
          <select
            value={taxiType}
            onChange={(e) => setTaxiType(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            {taxiTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        {/* Date */}
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground">Travel date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </label>

        {/* Time */}
        <label className="space-y-1 text-sm">
          <span className="font-medium text-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Pickup time
          </span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </label>
      </div>

      {/* Guests stepper */}
      <div className="space-y-1">
        <span className="block text-sm font-medium text-foreground">Number of guests</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => adjustGuests(-1)}
            disabled={guests <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-panel disabled:opacity-40"
            aria-label="Decrease guests"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center text-2xl font-bold text-foreground">
            {guests}
          </span>
          <button
            type="button"
            onClick={() => adjustGuests(1)}
            disabled={guests >= 7}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-panel disabled:opacity-40"
            aria-label="Increase guests"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="text-xs text-muted-foreground">
            {guests <= 4 ? "Dzire fits comfortably" : "Innova Crysta recommended"}
          </span>
        </div>
      </div>

      {/* Destinations */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Destinations to cover</p>
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

      {/* Notes */}
      <label className="block space-y-1 text-sm">
        <span className="font-medium text-foreground">Anything else?</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Flight time, hotel name, language preference, special needs…"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </label>

      {/* Preview */}
      <div className="rounded-md border border-border/70 bg-panel p-3 text-xs leading-6 text-muted-foreground whitespace-pre-wrap">
        {message}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
          onClick={() => toast.success("Opening WhatsApp with your customized Kashmir route plan!")}
        >
          <Button variant="hero" size="lg">
            <MessageCircle className="h-5 w-5" />
            Send on WhatsApp
          </Button>
        </a>
        <a
          href={emailUrl}
          className="inline-block"
          onClick={() => toast.success("Opening your email client to send booking inquiry!")}
        >
          <Button variant="pill" size="lg">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
        </a>
      </div>
    </div>
  );
}
