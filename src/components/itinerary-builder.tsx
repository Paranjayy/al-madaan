import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  MapPin,
  MessageCircle,
  X,
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  Trash2,
  FileDown,
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
    const dest = allDestinations.find((d) => d.slug === slug);
    const name = dest ? dest.name : slug;
    setSelected((prev) => {
      const isAdding = !prev.includes(slug);
      const next = isAdding ? [...prev, slug] : prev.filter((s) => s !== slug);
      saveToStorage(next);
      if (isAdding) {
        toast.success(`Added ${name} to your custom trip!`);
        if (!open) setOpen(true);
      } else {
        toast.info(`Removed ${name} from your custom trip.`);
      }
      return next;
    });
  };

  const remove = (slug: string) => {
    const dest = allDestinations.find((d) => d.slug === slug);
    const name = dest ? dest.name : slug;
    setSelected((prev) => {
      const next = prev.filter((s) => s !== slug);
      saveToStorage(next);
      toast.info(`Removed ${name} from your custom trip.`);
      return next;
    });
  };

  const clear = () => {
    setSelected([]);
    saveToStorage([]);
    toast.error("Cleared your custom trip itinerary.");
  };

  const selectedDests = selected
    .map((slug) => allDestinations.find((d) => d.slug === slug))
    .filter((d): d is Destination => !!d);

  const totalMinFare = selectedDests.reduce((acc, d) => acc + d.priceMin, 0);
  const totalMaxFare = selectedDests.reduce((acc, d) => acc + d.priceMax, 0);
  const totalKm = selectedDests.reduce((acc, d) => acc + d.distanceKm, 0);
  const estimatedDays = Math.max(1, Math.ceil(selectedDests.length / 2));

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = selectedDests
      .map(
        (dest, i) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 12px; font-weight: bold; font-size: 14px;">${i + 1}. ${dest.name}</td>
        <td style="padding: 12px; font-size: 13px; color: #555;">${dest.distance}</td>
        <td style="padding: 12px; font-size: 13px; color: #555;">${dest.time}</td>
        <td style="padding: 12px; font-size: 13px; color: #555;">${dest.highlights.slice(0, 3).join(", ")}</td>
        <td style="padding: 12px; font-size: 14px; font-weight: bold; color: #1e3a1e; text-align: right;">${dest.price}</td>
      </tr>
    `
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Custom Kashmir Itinerary — Al Madaan Ventures</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; padding: 40px; line-height: 1.5; background: #fff; }
            .header { border-bottom: 2px solid #285a43; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo-title { font-size: 24px; font-weight: 800; color: #285a43; letter-spacing: 1px; }
            .title { font-size: 28px; font-weight: 800; margin-bottom: 10px; color: #111; }
            .meta-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 20px; background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 16px; margin-bottom: 30px; }
            .meta-item { font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.5px; }
            .meta-val { font-size: 18px; font-weight: 800; color: #14532d; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #285a43; color: white; padding: 12px; text-align: left; font-size: 13px; font-weight: 600; }
            .footer { border-top: 1px solid #eee; padding-top: 20px; font-size: 11px; color: #777; text-align: center; margin-top: 50px; }
            .driver-card { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 16px; display: flex; gap: 20px; margin-bottom: 20px; }
            .btn-print { background: #285a43; color: white; border: none; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 99px; cursor: pointer; display: block; margin: 0 auto 30px auto; box-shadow: 0 4px 12px rgba(40, 90, 67, 0.2); transition: transform 0.2s; }
            .btn-print:hover { transform: scale(1.02); }
            @media print {
              .btn-print { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <button class="btn-print" onclick="window.print()">🖨️ Save as PDF / Print Itinerary</button>
          
          <div class="header">
            <div>
              <div class="logo-title">AL MADAAN VENTURES</div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">Kashmir taxi & local travel support</div>
            </div>
            <div style="text-align: right; font-size: 12px; color: #666; line-height: 1.6;">
              <div>WhatsApp Support: +91 70061 09912</div>
              <div>Instagram: @al_madaan</div>
            </div>
          </div>

          <h1 class="title">Your Custom Kashmir Tour</h1>
          <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
            Here is your custom-built travel plan for exploring Jammu & Kashmir. Hand over this copy to your driver or use it to plan with our travel companions.
          </p>

          <div class="meta-grid">
            <div class="meta-item">ESTIMATED TOUR DURATION<div class="meta-val">${estimatedDays} Days</div></div>
            <div class="meta-item">TOTAL ROUTE MILEAGE<div class="meta-val">~${totalKm} Kilometers</div></div>
            <div class="meta-item">TOTAL CAB BUDGET<div class="meta-val">₹${totalMinFare.toLocaleString()} - ₹${totalMaxFare.toLocaleString()}</div></div>
          </div>

          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 15px; color: #111;">Route Breakdown & Details</h2>
          <table>
            <thead>
              <tr>
                <th style="border-top-left-radius: 8px; border-bottom-left-radius: 8px;">DESTINATION</th>
                <th>DISTANCE FROM HUB</th>
                <th>TRAVEL TIME</th>
                <th>TOP ATTRACTIONS</th>
                <th style="border-top-right-radius: 8px; border-bottom-right-radius: 8px; text-align: right; padding-right: 12px;">EST. CAB FARE</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="display: grid; grid-template-cols: 1.1fr 0.9fr; gap: 30px; margin-top: 40px;">
            <div>
              <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 10px; color: #111;">Travel Rules & Exclusions:</h3>
              <ul style="font-size: 12px; color: #666; padding-left: 16px; margin: 0; line-height: 1.8;">
                <li>Local sightseeing inside Sonmarg (Zero Point) and Pahalgam (Aru/Betaab) requires local union cabs.</li>
                <li>Tolls, entry tickets, and parking fees are extra.</li>
                <li>Ensure you carry a Postpaid SIM card. Prepaid cards outside of J&K will not have connectivity.</li>
                <li>Carry cash for horse rides and local vendors as UPI connection is patchy in mountains.</li>
              </ul>
            </div>
            <div>
              <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 10px; color: #111;">Driver Details & Support:</h3>
              <div class="driver-card">
                <div>
                  <div style="font-weight: bold; font-size: 14px; color: #111;">Aalim / Umair</div>
                  <div style="font-size: 11px; color: #666; margin-top: 4px;">Maruti Suzuki Dzire (4 guests) & Innova (7 guests) available</div>
                  <div style="font-size: 12px; font-weight: 700; color: #285a43; margin-top: 10px;">WhatsApp booking: +91 70061 09912</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for choosing Al Madaan Ventures. We ride for the love of Kashmir!</p>
            <p style="margin-top: 5px; color: #999;">Itinerary created on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. Estimates subject to local traffic & seasonal union cab regulations.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-panel active:scale-95 cursor-pointer"
                >
                  <FileDown className="h-4 w-4 text-primary" />
                  Download PDF Itinerary
                </button>
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
      const isAdding = !prev.includes(slug);
      const next = isAdding ? [...prev, slug] : prev.filter((s) => s !== slug);
      saveToStorage(next);
      window.dispatchEvent(new Event("almadaan:itinerary"));
      const name = slug.charAt(0).toUpperCase() + slug.slice(1);
      if (isAdding) {
        toast.success(`Added ${name} to your custom trip!`);
      } else {
        toast.info(`Removed ${name} from your custom trip.`);
      }
      return next;
    });
  };

  return { selected, toggle };
}
