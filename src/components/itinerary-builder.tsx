import { useState, useEffect } from "react";
import {
  MapPin,
  MessageCircle,
  X,
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/lib/destinations-data";

const STORAGE_KEY = "almadaan_itinerary";

interface ItineraryBuilderProps {
  allDestinations: Destination[];
}

function saveToStorage(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* ignore */
  }
}

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ItineraryBuilder({ allDestinations }: ItineraryBuilderProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setSelected(loadFromStorage());
  }, []);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      saveToStorage(next);
      if (next.length > 0 && !open) setOpen(true);
      return next;
    });
  };

  const remove = (slug: string) => {
    setSelected((prev) => {
      const next = prev.filter((s) => s !== slug);
      saveToStorage(next);
      return next;
    });
  };

  const clear = () => {
    setSelected([]);
    saveToStorage([]);
  };

  const selectedDests = selected
    .map((slug) => allDestinations.find((d) => d.slug === slug))
    .filter((d): d is Destination => !!d);

  const totalMinFare = selectedDests.reduce((acc, d) => acc + d.priceMin, 0);
  const totalMaxFare = selectedDests.reduce((acc, d) => acc + d.priceMax, 0);
  const totalKm = selectedDests.reduce((acc, d) => acc + d.distanceKm, 0);
  const estimatedDays = Math.max(1, Math.ceil(selectedDests.length / 2));

  const waMessage =
    selected.length === 0
      ? ""
      : [
          "Hi Al Madaan Ventures! I'd like to plan a custom Kashmir trip.",
          "",
          `Destinations I want to cover:`,
          ...selectedDests.map((d, i) => `${i + 1}. ${d.name} (${d.distance})`),
          "",
          `Total estimated distance: ~${totalKm} km`,
          `Estimated days: ${estimatedDays}+`,
          `Estimated cab cost: ₹${totalMinFare.toLocaleString()} – ₹${totalMaxFare.toLocaleString()}`,
          "",
          "Please help me plan this itinerary and confirm best prices & availability.",
        ].join("\n");

  const waUrl = `https://wa.me/917006109912?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Floating bubble */}
      <button
        type="button"
        id="itinerary-toggle-btn"
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:bg-panel active:scale-95"
        aria-label="Open itinerary builder"
      >
        <ShoppingBag className="h-4 w-4 text-primary" />
        My Itinerary
        {selected.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {selected.length}
          </span>
        )}
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="itinerary-panel"
          className="w-[min(92vw,380px)] rounded-2xl border border-border/80 bg-card shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-foreground">Trip Planner</p>
              <p className="text-xs text-muted-foreground">
                {selected.length === 0
                  ? "Add destinations to build your itinerary"
                  : `${selected.length} destination${selected.length > 1 ? "s" : ""} selected`}
              </p>
            </div>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>

          {/* Empty state */}
          {selected.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
              <MapPin className="h-8 w-8 text-primary/40" />
              <p className="text-sm text-muted-foreground">
                Click <strong className="text-foreground">+ Add to Trip</strong> on any destination
                card to start planning.
              </p>
            </div>
          ) : (
            <>
              {/* Destinations list */}
              <ul className="divide-y divide-border/50 max-h-[220px] overflow-y-auto">
                {selectedDests.map((dest, i) => (
                  <li key={dest.slug} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{dest.name}</p>
                      <p className="text-xs text-muted-foreground">{dest.distance}</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      ₹{dest.priceMin.toLocaleString()}+
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(dest.slug)}
                      className="text-muted-foreground/60 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <div className="grid grid-cols-3 divide-x divide-border/50 border-y border-border/60">
                <div className="px-3 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Est. Days
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-foreground">{estimatedDays}+</p>
                </div>
                <div className="px-3 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Total KM
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-foreground">~{totalKm}</p>
                </div>
                <div className="px-3 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Est. Fare
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-primary">
                    ₹{(totalMinFare / 1000).toFixed(1)}k+
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 space-y-2">
                <a href={waUrl} target="_blank" rel="noreferrer" className="block">
                  <Button variant="hero" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Send Itinerary on WhatsApp
                  </Button>
                </a>
                <p className="text-center text-[11px] text-muted-foreground">
                  ₹{totalMinFare.toLocaleString()} – ₹{totalMaxFare.toLocaleString()} estimated •
                  Confirm prices with driver
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Export-only: expose toggle for destination cards */}
    </div>
  );
}

// Hook for destination cards to check selection state
export function useItinerary() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(loadFromStorage());

    const handler = () => setSelected(loadFromStorage());
    window.addEventListener("almadaan:itinerary", handler);
    return () => window.removeEventListener("almadaan:itinerary", handler);
  }, []);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      saveToStorage(next);
      window.dispatchEvent(new Event("almadaan:itinerary"));
      return next;
    });
  };

  return { selected, toggle };
}
