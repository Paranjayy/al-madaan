import { useState } from "react";
import { toast } from "sonner";
import {
  Car,
  AlertTriangle,
  CheckCircle,
  Copy,
  Info,
  Compass,
  PhoneCall,
  MapPin,
  Luggage,
  CloudSun,
} from "lucide-react";
import { Button } from "./ui/button";

// Configuration for passes
const INITIAL_PASSES = [
  {
    name: "Zoji La Pass (Ladakh Highway)",
    altitude: "11,575 ft",
    status: "Clear", // Clear | Caution | Closed
    color: "emerald",
    updated: "2 hours ago",
    note: "One-way traffic control in place. Check traffic schedules before heading.",
  },
  {
    name: "Razdan Pass (Gurez Gate)",
    altitude: "11,672 ft",
    status: "Caution",
    color: "amber",
    updated: "4 hours ago",
    note: "Light rain reported at top. Vehicles with good tyre tread advised.",
  },
  {
    name: "Margan Top (Warwan Road)",
    altitude: "14,000 ft",
    status: "Closed",
    color: "red",
    updated: "1 day ago",
    note: "Road closed for maintenance and clearance work.",
  },
  {
    name: "Tangmarg to Gulmarg Peak",
    altitude: "8,690 ft",
    status: "Clear",
    color: "emerald",
    updated: "1 hour ago",
    note: "Clear road. Snow chains NOT required right now.",
  },
];

// Configuration for emergency contacts
const EMERGENCY_CONTACTS = [
  { label: "Tourist Police Srinagar", phone: "+91 194 250227" },
  { label: "TRC Tourist Reception Centre", phone: "+91 194 250228" },
  { label: "Srinagar Airport Helpline", phone: "+91 194 230300" },
  { label: "Disaster Management J&K", phone: "1070" },
  { label: "SMHS Hospital Srinagar", phone: "+91 194 250125" },
];

// Drivers location
const DRIVERS_BOARD = [
  {
    name: "Aalim (Maruti Dzire)",
    status: "On Trip",
    location: "Gulmarg",
    nextAvailable: "Tomorrow Morning",
    color: "amber",
  },
  {
    name: "Umair (Innova Crysta)",
    status: "Available",
    location: "Srinagar Base",
    nextAvailable: "Now",
    color: "emerald",
  },
];

export function TravelerDashboard() {
  const [passengers, setPassengers] = useState(3);
  const [bags, setBags] = useState(2);
  const [passes, setPasses] = useState(INITIAL_PASSES);

  // Luggage logic
  const fitsDzire = passengers <= 4 && bags <= 3;
  const fitsInnova = passengers <= 7 && bags <= 6;

  const handleCopy = (num: string, label: string) => {
    navigator.clipboard.writeText(num);
    toast.success(`Copied ${label} helpline: ${num}`);
  };

  const simulateAlertRefresh = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Querying road transport department database...",
        success: () => {
          // Add minor variation in update time
          setPasses((prev) =>
            prev.map((p) => ({
              ...p,
              updated: "Just now",
            }))
          );
          return "Road conditions & alerts successfully updated!";
        },
        error: "Failed to connect to road database.",
      }
    );
  };

  return (
    <div className="space-y-10">
      {/* 2x2 Feature Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: Interactive Luggage & Space Calculator */}
        <div className="surface-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Car className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">Luggage &amp; Space Matchmaker</h3>
                <p className="text-xs text-muted-foreground">Select your group setup to find the perfect cab.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {/* Passengers Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">Passengers</span>
                  <span className="font-bold text-foreground">{passengers} Guests</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Bags Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">Luggage Bags (Large)</span>
                  <span className="font-bold text-foreground">{bags} Bags</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={bags}
                  onChange={(e) => setBags(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Results visualization */}
            <div className="rounded-xl border border-border/80 bg-panel/30 p-4 space-y-3 mt-4">
              <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Recommended Cab Option:</span>
              
              {fitsDzire ? (
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <CheckCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Maruti Suzuki Swift Dzire (Sedan)</h4>
                    <p className="text-xs text-muted-foreground">Dzire fits your group and luggage perfectly. Best nominal choice!</p>
                  </div>
                </div>
              ) : fitsInnova ? (
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Toyota Innova Crysta (SUV)</h4>
                    <p className="text-xs text-muted-foreground">Required due to passenger or luggage volume. Standard SUV comfort.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <AlertTriangle className="h-5 w-5 animate-pulse" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-red-600 dark:text-red-400">Tempo Traveller / Double Cab Required</h4>
                    <p className="text-xs text-muted-foreground">Exceeds standard SUV limits. Please query a customized heavy coach.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs mt-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Luggage className="h-4 w-4" /> Dzire: 4 pax/3 bags • Innova: 7 pax/6 bags
            </span>
          </div>
        </div>

        {/* Card 2: Road Conditions Alert Tracker */}
        <div className="surface-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Live Mountain Pass Conditions</h3>
                  <p className="text-xs text-muted-foreground">Real-time status updates for critical sightseeing passes.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={simulateAlertRefresh}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {passes.map((p) => (
                <div key={p.name} className="flex justify-between items-start gap-4 border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      {p.name}
                      <span className="text-[10px] text-muted-foreground font-normal">({p.altitude})</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{p.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.color === "emerald"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : p.color === "amber"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                          : "bg-red-500/10 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {p.status}
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-0.5">updated {p.updated}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 flex items-center gap-1 text-[11px] text-muted-foreground mt-3">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" /> Safety tip: Always check pass status prior to mountain departures.
          </div>
        </div>

        {/* Card 3: Drivers Location Board */}
        <div className="surface-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">Driver Live Location Board</h3>
                <p className="text-xs text-muted-foreground">See where your driver companions are right now.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {DRIVERS_BOARD.map((d) => (
                <div key={d.name} className="flex justify-between items-center gap-4 rounded-xl border border-border/60 bg-panel/30 p-3">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{d.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Currently in: <strong className="text-foreground">{d.location}</strong>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        d.color === "emerald"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {d.status}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1">Available: {d.nextAvailable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 flex items-center gap-1 text-[11px] text-muted-foreground mt-3">
            <CloudSun className="h-3.5 w-3.5 text-primary shrink-0" /> Drive with localized drivers who handle snow/rain weather easily.
          </div>
        </div>

        {/* Card 4: Emergency Contacts & Quick Dial Directory */}
        <div className="surface-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <PhoneCall className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">Traveler Emergency Directory</h3>
                <p className="text-xs text-muted-foreground">Tap and copy critical tourism helpline numbers in one click.</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {EMERGENCY_CONTACTS.map((c) => (
                <div key={c.label} className="flex justify-between items-center gap-4 text-xs">
                  <span className="font-semibold text-muted-foreground">{c.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground font-mono">{c.phone}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(c.phone, c.label)}
                      className="p-1 rounded bg-panel hover:bg-border/60 transition text-muted-foreground hover:text-foreground"
                      title="Copy Number"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 flex items-center gap-1 text-[11px] text-muted-foreground mt-3">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" /> Dial 100 or +91 194 250227 for immediate tourism police support.
          </div>
        </div>
      </div>
    </div>
  );
}
