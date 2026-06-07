import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Layers, MessageCircle, Info } from "lucide-react";
import { Button } from "./ui/button";

interface FareItem {
  id: string;
  route: string;
  type: "Transfer" | "Day Trip" | "Multi-day";
  duration: string;
  price: number;
  priceDisplay: string;
  details: string;
}

const initialFares: FareItem[] = [
  {
    id: "sxr-hotel",
    route: "Airport → Srinagar Hotel",
    type: "Transfer",
    duration: "1 Hour",
    price: 900,
    priceDisplay: "₹900",
    details: "One-way transfer from Srinagar International Airport (SXR) to city limits."
  },
  {
    id: "srinagar-local",
    route: "Srinagar Local Sightseeing",
    type: "Day Trip",
    duration: "8 Hours",
    price: 2000,
    priceDisplay: "₹2,000",
    details: "Includes Mughal Gardens, Dal Lake shores, Old City, Shrines, and Pari Mahal."
  },
  {
    id: "srinagar-gulmarg",
    route: "Srinagar ↔ Gulmarg Return",
    type: "Day Trip",
    duration: "Full Day",
    price: 2600,
    priceDisplay: "₹2,600",
    details: "Round trip to Gulmarg valley. Excludes local guide/pony inside Gulmarg if required."
  },
  {
    id: "srinagar-sonmarg",
    route: "Srinagar ↔ Sonmarg Return",
    type: "Day Trip",
    duration: "Full Day",
    price: 3000,
    priceDisplay: "₹3,000",
    details: "Round trip to Sonmarg glacier point. Scenic driver stops included."
  },
  {
    id: "srinagar-pahalgam",
    route: "Srinagar ↔ Pahalgam Return",
    type: "Day Trip",
    duration: "Full Day",
    price: 3200,
    priceDisplay: "₹3,200",
    details: "Round trip to Pahalgam valleys. Includes driver guide support."
  },
  {
    id: "srinagar-doodhpathri",
    route: "Srinagar ↔ Doodhpathri Return",
    type: "Day Trip",
    duration: "Full Day",
    price: 2400,
    priceDisplay: "₹2,400",
    details: "Day tour to Meadow of Milk. Beautiful river spots."
  },
  {
    id: "srinagar-yusmarg",
    route: "Srinagar ↔ Yusmarg Return",
    type: "Day Trip",
    duration: "Full Day",
    price: 2500,
    priceDisplay: "₹2,500",
    details: "Offbeat dense pine forest meadow. Round trip."
  },
  {
    id: "pkg-classic",
    route: "Classic Kashmir (4N/5D)",
    type: "Multi-day",
    duration: "5 Days",
    price: 25000,
    priceDisplay: "₹25,000",
    details: "Complete basic tour including Dal Lake, Gulmarg, and Pahalgam hotels + cab."
  },
  {
    id: "pkg-exotic",
    route: "Exotic Exploration (5N/6D)",
    type: "Multi-day",
    duration: "6 Days",
    price: 25999,
    priceDisplay: "₹25,999",
    details: "Adventure focused itinerary covering glaciers, houseboats, and offbeat spots."
  }
];

export function FareTableInteractive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("price-asc");
  const [groupByType, setGroupByType] = useState(false);

  // Filter & Sort Logic
  const filteredSortedFares = useMemo(() => {
    let result = [...initialFares];

    // Search query
    if (searchQuery.trim().length > 0) {
      result = result.filter(item => 
        item.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (activeCategory !== "All") {
      result = result.filter(item => item.type === activeCategory);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.route.localeCompare(b.route);
      } else if (sortBy === "price-asc") {
        return a.price - b.price;
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Grouping Logic
  const groupedFares = useMemo(() => {
    if (!groupByType) return { "All Fares": filteredSortedFares };

    return filteredSortedFares.reduce((acc, curr) => {
      const type = curr.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(curr);
      return acc;
    }, {} as Record<string, FareItem[]>);
  }, [filteredSortedFares, groupByType]);

  const handleInquire = (route: string, price: string) => {
    const msg = `Hi Al Madaan! I'm interested in booking the "${route}" option. The listed estimate is ${price}. Please let me know your availability.`;
    return `https://wa.me/917006109912?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6">
      {/* Control Filters Bar */}
      <div className="grid gap-4 sm:flex sm:items-center sm:justify-between flex-wrap bg-panel border border-border/80 p-4 rounded-2xl shadow-soft">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search routes/pricing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {["All", "Transfer", "Day Trip", "Multi-day"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:border-primary/40 border border-transparent"
              }`}
            >
              {cat === "Multi-day" ? "Packages" : cat}
            </button>
          ))}
        </div>

        {/* Sort & Group Options */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-card border border-border rounded-lg p-1 outline-none text-foreground font-semibold"
            >
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={groupByType}
              onChange={(e) => setGroupByType(e.target.checked)}
              className="rounded text-primary border-border focus:ring-primary/20"
            />
            <Layers className="h-3.5 w-3.5" />
            Group
          </label>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="surface-card overflow-hidden">
        {Object.keys(groupedFares).length === 0 || (Object.keys(groupedFares).length === 1 && Object.values(groupedFares)[0].length === 0) ? (
          <div className="p-8 text-center text-muted-foreground space-y-2">
            <Search className="h-8 w-8 mx-auto stroke-muted-foreground/50 animate-bounce" />
            <p className="text-sm font-semibold">No matching routes found.</p>
            <p className="text-xs">Try searching for other locations like Srinagar, Gulmarg, or Pahalgam.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {Object.entries(groupedFares).map(([groupName, items]) => {
              if (items.length === 0) return null;
              
              return (
                <div key={groupName} className="p-4 sm:p-6 space-y-4">
                  {groupByType && (
                    <h4 className="text-sm font-bold tracking-wider text-accent-strong-foreground uppercase border-b border-border/40 pb-2">
                      {groupName}s
                    </h4>
                  )}

                  <div className="grid gap-4">
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border border-border/40 bg-card/40 hover:bg-card hover:border-primary/25 transition shadow-sm hover:shadow-md"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-base font-bold text-foreground">{item.route}</h3>
                            <span className="text-[10px] font-semibold tracking-wider bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 uppercase">
                              {item.type}
                            </span>
                            <span className="text-[10px] font-medium text-muted-foreground">
                              Duration: {item.duration}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                            {item.details}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-border/40 sm:border-none pt-3 sm:pt-0">
                          <div className="text-right sm:text-right">
                            <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Estimated Fare</span>
                            <span className="text-lg font-black text-primary">{item.priceDisplay}</span>
                          </div>

                          <a 
                            href={handleInquire(item.route, item.priceDisplay)} 
                            target="_blank" 
                            rel="noreferrer"
                          >
                            <Button variant="hero" size="sm" className="flex items-center gap-1.5">
                              <MessageCircle className="h-4 w-4" />
                              Book
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-start gap-2.5 bg-panel p-4 rounded-xl border border-border/50 text-xs text-muted-foreground">
        <Info className="h-4 w-4 text-accent-strong shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          * Standard Union Prices are base estimations for the Toyota Dzire sedan (capacity: 4 guests). Rates exclude overnight halts, driver night allowance, toll taxes, and local sightseeing cabs inside specific restricted areas (e.g. Aru Valley union cabs or Gulmarg local pony charges) which have strict localized transport administration rules.
        </p>
      </div>
    </div>
  );
}
