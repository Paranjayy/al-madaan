import { useState } from "react";
import { 
  Calculator, 
  Car, 
  Users, 
  Plus, 
  Check, 
  MessageCircle, 
  Info, 
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";

interface PackageOption {
  slug: string;
  name: string;
  days: number;
  basePrice: number;
  description: string;
}

const PACKAGE_OPTIONS: PackageOption[] = [
  {
    slug: "srinagar-express",
    name: "Srinagar Express (1 Day)",
    days: 1,
    basePrice: 3000,
    description: "Dal Lake, Mughal Gardens, and Shankaracharya Temple.",
  },
  {
    slug: "gulmarg-snow-day",
    name: "Gulmarg Day Trip (1 Day)",
    days: 1,
    basePrice: 4200,
    description: "Srinagar to Gulmarg return trip with meadow & snow views.",
  },
  {
    slug: "pahalgam-valley",
    name: "Pahalgam Valley (1 Day)",
    days: 1,
    basePrice: 4500,
    description: "Relaxed drive to Pahalgam, Betaab Valley, and Aru Valley.",
  },
  {
    slug: "classic-kashmir",
    name: "Classic Kashmir (5 Days)",
    days: 5,
    basePrice: 19500,
    description: "Srinagar, Gulmarg day trip, Pahalgam overnight, and Sonmarg.",
  },
  {
    slug: "gurez-valley-expedition",
    name: "Gurez Borderland (4 Days)",
    days: 4,
    basePrice: 17500,
    description: "Razdan Pass crossing, Dawar town, and Habba Khatoon peak.",
  },
  {
    slug: "kashmir-honeymoon-special",
    name: "Honeymoon Special (6 Days)",
    days: 6,
    basePrice: 26500,
    description: "Houseboat stays, romantic Gulmarg trails, and pine resort nights.",
  },
  {
    slug: "complete-offbeat-kashmir",
    name: "Offbeat J&K Explorer (7 Days)",
    days: 7,
    basePrice: 29800,
    description: "Yusmarg meadows, Doodhpathri rapids, and Aharbal Falls.",
  }
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  perDay?: boolean;
}

const ADDON_OPTIONS: AddonOption[] = [
  { id: "shikara", name: "Dal Lake Shikara Ride (1 Hour)", price: 800 },
  { id: "houseboat", name: "Houseboat Stay Upgrade (1 Night)", price: 4500 },
  { id: "guide", name: "Professional Tour Guide", price: 1500, perDay: true },
  { id: "garden-tickets", name: "All Mughal Gardens Entry passes", price: 400 },
  { id: "gondola", name: "Gulmarg Gondola Phase-1 pre-booking help", price: 900 }
];

export function PackageCustomizer() {
  const [selectedPkgSlug, setSelectedPkgSlug] = useState("classic-kashmir");
  const [guests, setGuests] = useState(3);
  const [cabType, setCabType] = useState<"dzire" | "innova">("dzire");
  const [addons, setAddons] = useState<string[]>([]);

  const currentPkg = PACKAGE_OPTIONS.find(p => p.slug === selectedPkgSlug) || PACKAGE_OPTIONS[3];

  const toggleAddon = (id: string) => {
    setAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  // Pricing calculations
  const cabMultiplier = cabType === "innova" ? 1.45 : 1.0;
  const rawBaseCabPrice = currentPkg.basePrice * cabMultiplier;
  
  const addonsCost = ADDON_OPTIONS.reduce((acc, option) => {
    if (addons.includes(option.id)) {
      const multiplier = option.perDay ? currentPkg.days : 1;
      return acc + (option.price * multiplier);
    }
    return acc;
  }, 0);

  const totalCost = Math.round(rawBaseCabPrice + addonsCost);
  const perPersonCost = Math.round(totalCost / Math.max(1, guests));

  const handleWhatsApp = () => {
    const activeAddonNames = ADDON_OPTIONS
      .filter(a => addons.includes(a.id))
      .map(a => a.name)
      .join(", ");

    const text = `Hi Al Madaan! I want to request a custom booking for:
*Package*: ${currentPkg.name}
*Guests*: ${guests} Passengers
*Vehicle*: ${cabType === "dzire" ? "Swift Dzire (Sedan)" : "Innova Crysta (SUV)"}
*Addons*: ${activeAddonNames || "None"}
*Estimated Budget*: ₹${totalCost.toLocaleString()} (~₹${perPersonCost.toLocaleString()} per guest)
Please check availability!`;

    window.open(`https://wa.me/91917006109912?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="surface-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calculator className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-foreground">Kashmir Package Customizer &amp; Budget Planner</h3>
          <p className="text-sm text-muted-foreground">Estimate your vehicle budget, choose additions, and build a custom package in real time.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] pt-2">
        {/* Left Side: Controls */}
        <div className="space-y-5">
          {/* Package Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">1. Select Tour Package</label>
            <select
              value={selectedPkgSlug}
              onChange={(e) => setSelectedPkgSlug(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-panel px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {PACKAGE_OPTIONS.map(p => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — Base price: ₹{p.basePrice.toLocaleString()}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground italic pl-1">{currentPkg.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Passengers Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">2. Guests count</label>
              <div className="flex items-center gap-3 bg-panel border border-border/60 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-border text-foreground transition font-bold"
                >
                  -
                </button>
                <div className="flex-1 text-center font-bold text-sm text-foreground flex items-center justify-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" /> {guests} Guests
                </div>
                <button
                  type="button"
                  onClick={() => setGuests(prev => Math.min(8, prev + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-border text-foreground transition font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cab Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">3. Cab Preference</label>
              <div className="grid grid-cols-2 gap-2 bg-panel border border-border/60 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCabType("dzire")}
                  className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    cabType === "dzire"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Car className="h-3.5 w-3.5" /> Dzire
                </button>
                <button
                  type="button"
                  onClick={() => setCabType("innova")}
                  className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    cabType === "innova"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Car className="h-3.5 w-3.5 animate-pulse" /> Innova
                </button>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">4. Tour Add-ons (Optional)</label>
            <div className="space-y-2.5">
              {ADDON_OPTIONS.map(option => {
                const isSelected = addons.includes(option.id);
                const displayPrice = option.perDay 
                  ? `₹${option.price.toLocaleString()}/day`
                  : `+₹${option.price.toLocaleString()}`;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleAddon(option.id)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                      isSelected 
                        ? "bg-primary/5 border-primary/45 text-foreground" 
                        : "bg-panel/40 border-border/80 text-muted-foreground hover:border-border hover:bg-panel"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className={`flex h-5 w-5 items-center justify-center rounded border ${
                        isSelected 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "border-border bg-white"
                      }`}>
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </span>
                      {option.name}
                    </div>
                    <span className="text-xs font-bold text-foreground">{displayPrice}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Estimated Bill Card */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-wider text-primary uppercase">Estimated Package Summary:</span>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Base Cab tour ({currentPkg.days} days):</span>
                <span className="font-semibold text-foreground">₹{Math.round(currentPkg.basePrice).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Vehicle type multiplier:</span>
                <span className="font-semibold text-foreground">x{cabMultiplier} ({cabType.toUpperCase()})</span>
              </div>

              <div className="flex justify-between items-center text-sm pt-1">
                <span className="text-muted-foreground">Cab Base Budget:</span>
                <span className="font-bold text-foreground">₹{Math.round(rawBaseCabPrice).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-3">
                <span className="text-muted-foreground">Selected Add-ons:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹{addonsCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">Total Package Budget</h4>
                  <p className="text-[10px] text-muted-foreground">Tolls &amp; drivers allowance included</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="text-xs font-semibold text-muted-foreground">Budget per Guest:</span>
                <span className="text-sm font-bold text-foreground">₹{perPersonCost.toLocaleString()} / guest</span>
              </div>
            </div>

            {guests > 4 && cabType === "dzire" && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300">
                <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                <span>We advise switching to <strong>SUV (Innova)</strong> for comfortable spacing with {guests} passengers.</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button 
              type="button" 
              onClick={handleWhatsApp} 
              variant="hero" 
              className="w-full text-sm py-3 justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="h-5 w-5" /> Book Custom Package
            </Button>
            <div className="flex items-center gap-1 justify-center text-[10px] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Adjustments, hotel upgrades, &amp; dates negotiated via chat!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
