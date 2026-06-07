import { useState } from "react";
import { Clock, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Button } from "./ui/button";

interface LocationData {
  title: string;
  distance: string;
  time: string;
  season: string;
  attractions: string[];
  price: string;
  coords: { cx: number; cy: number };
}

const kashmirDestinations: Record<string, LocationData> = {
  srinagar: {
    title: "Srinagar (Central Hub)",
    distance: "0 km (Center)",
    time: "Hub Base",
    season: "All seasons (Charming Houseboats & Shrines)",
    attractions: ["Dal Lake Shikara Ride", "Mughal Gardens (Shalimar & Nishat)", "Shankaracharya Temple", "Hazratbal Shrine & Soura"],
    price: "₹900 - ₹2,500 (Local Sightseeing)",
    coords: { cx: 400, cy: 320 }
  },
  gulmarg: {
    title: "Gulmarg Valley",
    distance: "52 km from Srinagar",
    time: "Approx. 2 Hours",
    season: "December to March (Winter Snow & Skiing)",
    attractions: ["Gondola Cable Car Ride", "Snow activities & snowboarding", "Scenic Alpine Meadows"],
    price: "₹2,500 - ₹2,800",
    coords: { cx: 200, cy: 280 }
  },
  sonmarg: {
    title: "Sonmarg Glacier",
    distance: "80 km from Srinagar",
    time: "Approx. 2.5 Hours",
    season: "April to October (Glaciers & Meadows)",
    attractions: ["Thajiwas Glacier pony ride", "Zero Point snow slopes", "Sindh River viewpoints"],
    price: "₹2,800 - ₹3,200",
    coords: { cx: 580, cy: 180 }
  },
  pahalgam: {
    title: "Pahalgam Valley",
    distance: "95 km from Srinagar",
    time: "Approx. 2.5 - 3 Hours",
    season: "All Year (Stunning rivers & valleys)",
    attractions: ["Betaab Valley & Aru Valley", "Chandanwari snow bridge", "River Lidder scenic spots"],
    price: "₹3,000 - ₹3,500",
    coords: { cx: 590, cy: 460 }
  },
  yusmarg: {
    title: "Yusmarg Forest Meadow",
    distance: "47 km from Srinagar",
    time: "Approx. 1.8 Hours",
    season: "May to September (Offbeat, peaceful meadows)",
    attractions: ["Nilnag Lake forest trek", "Doodh Ganga river trail", "Pristine horse-riding routes"],
    price: "₹2,400 - ₹2,700",
    coords: { cx: 350, cy: 490 }
  },
  doodhpathri: {
    title: "Doodhpathri (Meadow of Milk)",
    distance: "42 km from Srinagar",
    time: "Approx. 1.5 Hours",
    season: "May to October (Cascading fresh streams)",
    attractions: ["Shaliganga river rapids", "Rolling green hillocks", "Unspoiled nature walks"],
    price: "₹2,300 - ₹2,600",
    coords: { cx: 250, cy: 420 }
  }
};

export function KashmirMap() {
  const [selectedLoc, setSelectedLoc] = useState<string | null>(null);

  const activeData = selectedLoc ? kashmirDestinations[selectedLoc] : null;

  const handleBook = (title: string) => {
    const message = `Hi Al Madaan! I want to book a taxi ride from Srinagar to ${title}. Please let me know the best rates and availability.`;
    return `https://wa.me/917006109912?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
      {/* SVG Interactive Map */}
      <div className="surface-card p-6 flex flex-col justify-between">
        <div className="relative w-full aspect-[4/3] bg-radial from-accent/5 to-primary/5 rounded-2xl overflow-hidden border border-border/40">
          <svg viewBox="0 0 800 600" className="w-full h-full select-none">
            {/* Soft decorative grid or mountains in background */}
            <rect width="800" height="600" rx="16" fill="rgba(12, 45, 34, 0.01)" />
            
            {/* Illustrated Mountains */}
            <path d="M 50,150 L 150,50 L 250,150 Z" className="fill-accent/5 stroke-accent/10 stroke-2" />
            <path d="M 200,200 L 300,80 L 400,200 Z" className="fill-accent/5 stroke-accent/10 stroke-2" />
            <path d="M 500,180 L 600,60 L 700,180 Z" className="fill-accent/5 stroke-accent/10 stroke-2" />
            
            {/* Connective Route Lines */}
            <path d="M 400,320 Q 450,220 580,180" className="fill-none stroke-primary/35 stroke-[3] stroke-dashed" />
            <path d="M 400,320 Q 300,280 200,280" className="fill-none stroke-primary/35 stroke-[3] stroke-dashed" />
            <path d="M 400,320 Q 310,380 250,420" className="fill-none stroke-primary/35 stroke-[3] stroke-dashed" />
            <path d="M 400,320 Q 360,430 350,490" className="fill-none stroke-primary/35 stroke-[3] stroke-dashed" />
            <path d="M 400,320 Q 480,410 590,460" className="fill-none stroke-primary/35 stroke-[3] stroke-dashed" />

            {/* Pins */}
            {Object.entries(kashmirDestinations).map(([id, info]) => {
              const isActive = selectedLoc === id;
              const isHub = id === "srinagar";
              
              return (
                <g 
                  key={id} 
                  className="cursor-pointer group"
                  onClick={() => setSelectedLoc(id)}
                  onMouseEnter={() => setSelectedLoc(id)}
                >
                  {/* Glowing hover circle */}
                  <circle 
                    cx={info.coords.cx} 
                    cy={info.coords.cy} 
                    r={isActive ? 22 : 14} 
                    className={`transition-all duration-300 fill-accent/25 opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100 scale-110' : ''}`} 
                  />
                  {/* Inner Pin */}
                  <circle 
                    cx={info.coords.cx} 
                    cy={info.coords.cy} 
                    r={isHub ? 8 : 6} 
                    className={`transition-all duration-300 stroke-card stroke-2 ${
                      isHub 
                        ? 'fill-primary strong-shadow' 
                        : isActive 
                          ? 'fill-accent stroke-primary' 
                          : 'fill-primary-strong group-hover:fill-accent'
                    }`} 
                  />
                  {/* Label Text */}
                  <text 
                    x={info.coords.cx} 
                    y={id === "yusmarg" ? info.coords.cy + 22 : info.coords.cy - 16} 
                    className={`text-[11px] font-bold text-center tracking-wider transition-colors duration-200 select-none ${
                      isHub 
                        ? 'fill-primary font-black' 
                        : isActive 
                          ? 'fill-accent-strong font-black' 
                          : 'fill-muted-foreground group-hover:fill-primary-strong'
                    }`}
                    textAnchor="middle"
                  >
                    {id.toUpperCase()} {isHub && "(HUB)"}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> Srinagar Central Hub
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-strong inline-block"></span> Major Tourist Spot
          </span>
          <span className="flex items-center gap-2">
            <span className="w-6 border-b-2 border-dashed border-primary inline-block"></span> Cab Route
          </span>
        </div>
      </div>

      {/* Info Details Panel */}
      <div className="info-panel flex flex-col justify-center min-h-[350px]">
        {!activeData ? (
          <div className="text-center space-y-4 py-8">
            <Navigation className="h-12 w-12 text-primary mx-auto animate-pulse" />
            <h3 className="text-xl font-semibold text-foreground">Explore Kashmir Routes</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Hover over or click on any destination pin on the J&K map to explore travel times, tourist highlights, and direct booking links.
            </p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-border/60 pb-4">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-accent/20 text-accent-strong-foreground rounded mb-2">
                {activeData.distance}
              </span>
              <h3 className="text-2xl font-bold text-foreground">{activeData.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3.5 w-3.5 text-accent-strong" /> Travel Duration: {activeData.time}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Best Season</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{activeData.season}</p>
              </div>

              <div>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Top Attractions</span>
                <ul className="grid grid-cols-1 gap-2 mt-2">
                  {activeData.attractions.map((att) => (
                    <li key={att} className="text-sm flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-accent-strong shrink-0" />
                      {att}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-card border border-border/80 p-3.5">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase block">Estimated Dzire Fare</span>
                <p className="text-lg font-bold text-accent-strong-foreground mt-0.5">{activeData.price}</p>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href={handleBook(activeData.title.split(" ")[0])} 
                target="_blank" 
                rel="noreferrer"
                className="w-full inline-block"
              >
                <Button variant="hero" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Inquire Ride to {activeData.title.split(" ")[0]}
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
