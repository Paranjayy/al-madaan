import { useEffect, useRef, useState } from "react";
import { Clock, MapPin, MessageCircle, Navigation, ExternalLink } from "lucide-react";
import type { Map as LeafletMap } from "leaflet";
import { Button } from "./ui/button";
import { destinations } from "@/lib/destinations-data";

interface LocationData {
  title: string;
  lat: number;
  lng: number;
  distance: string;
  time: string;
  season: string;
  attractions: string[];
  price: string;
  details: string;
}

const kashmirDestinations: Record<string, LocationData> = {};

destinations.forEach((d) => {
  kashmirDestinations[d.slug] = {
    title: d.slug === "srinagar" ? "Srinagar (Central Hub)" : d.name,
    lat: d.lat,
    lng: d.lng,
    distance: d.distance,
    time: d.time,
    season: d.season,
    attractions: d.highlights,
    price: d.price,
    details: d.details,
  };
});

export function KashmirMap() {
  const [selectedLoc, setSelectedLoc] = useState<string>("srinagar");
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<LeafletMap | null>(null);

  // Set isClient to true when component mounts on browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isClient) return;

    // Dynamically import Leaflet inside useEffect to avoid SSR window errors
    import("leaflet").then((L) => {
      // Fix default marker icon issues in Leaflet with webpack/vite
      // Use Leaflet default styles or custom color icons
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!leafletMapInstance.current && mapRef.current) {
        // Create Leaflet Map instance
        const map = L.map(mapRef.current, {
          center: [34.05, 74.85],
          zoom: 9,
          zoomControl: true,
        });

        // Use free OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        leafletMapInstance.current = map;

        // Draw routes from Srinagar to destinations
        const srinagarCoords = [
          kashmirDestinations.srinagar.lat,
          kashmirDestinations.srinagar.lng,
        ] as [number, number];

        // Add Markers and Draw Routes
        Object.entries(kashmirDestinations).forEach(([key, value]) => {
          const coords = [value.lat, value.lng] as [number, number];
          const isHub = key === "srinagar";

          // Draw dotted polyline if not Srinagar
          if (!isHub) {
            L.polyline([srinagarCoords, coords], {
              color: "#0f3d30",
              weight: 3,
              dashArray: "6, 6",
              opacity: 0.7,
            }).addTo(map);
          }

          // Add Marker
          const marker = L.marker(coords)
            .addTo(map)
            .bindTooltip(value.title, { permanent: false, direction: "top" });

          marker.on("click", () => {
            setSelectedLoc(key);
            map.setView(coords, 10);
          });
        });
      }
    });

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [isClient]);

  // Handle flyTo when selectedLoc changes
  useEffect(() => {
    if (leafletMapInstance.current && selectedLoc) {
      const data = kashmirDestinations[selectedLoc];
      if (data) {
        leafletMapInstance.current.flyTo([data.lat, data.lng], 10, {
          duration: 1.5,
        });
      }
    }
  }, [selectedLoc]);

  const activeData = selectedLoc ? kashmirDestinations[selectedLoc] : null;

  const handleBook = (title: string) => {
    const message = `Hi Al Madaan! I want to book a taxi ride from Srinagar to ${title}. Please let me know the best rates and availability.`;
    return `https://wa.me/917006109912?text=${encodeURIComponent(message)}`;
  };

  const getGmapLink = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&origin=Srinagar&destination=${lat},${lng}`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
      {/* Leaflet Map Card */}
      <div className="surface-card p-4 flex flex-col justify-between min-h-[400px]">
        {isClient ? (
          <div
            ref={mapRef}
            className="w-full h-[350px] sm:h-[450px] rounded-xl overflow-hidden border border-border/60 z-10"
          />
        ) : (
          <div className="w-full h-[450px] bg-panel rounded-xl flex items-center justify-center border border-border/60">
            <span className="text-sm text-muted-foreground">
              Loading Kashmir Interactive Map...
            </span>
          </div>
        )}

        {/* Map Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f3d30] inline-block"></span> Srinagar
            Central Hub
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span> Tourist
            Destinations
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 border-b-2 border-dashed border-primary inline-block"></span>{" "}
            Scenic Cab Route
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
              Click on any marker on the map to explore travel times, tourist highlights, and
              directions.
            </p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-border/60 pb-4">
              <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-accent/20 text-accent-strong-foreground rounded mb-2">
                {activeData.distance}
              </span>
              <h3 className="text-2xl font-bold text-foreground">{activeData.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-semibold">
                <Clock className="h-3.5 w-3.5 text-accent-strong" /> Travel Duration:{" "}
                {activeData.time}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Description
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground mt-0.5">
                  {activeData.details}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Best Season
                </span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{activeData.season}</p>
              </div>

              <div>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Top Attractions
                </span>
                <ul className="grid grid-cols-1 gap-1.5 mt-2">
                  {activeData.attractions.map((att) => (
                    <li
                      key={att}
                      className="text-xs flex items-center gap-2 text-muted-foreground font-medium"
                    >
                      <MapPin className="h-3.5 w-3.5 text-accent-strong shrink-0" />
                      {att}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-card border border-border/80 p-3.5">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase block">
                  Estimated Cab Fare
                </span>
                <p className="text-lg font-bold text-accent-strong-foreground mt-0.5">
                  {activeData.price}
                </p>
              </div>
            </div>

            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <a
                href={handleBook(activeData.title.split(" ")[0])}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-block"
              >
                <Button variant="hero" className="w-full text-xs font-semibold py-2">
                  <MessageCircle className="h-4 w-4" />
                  Book Cab
                </Button>
              </a>

              <a
                href={getGmapLink(activeData.lat, activeData.lng)}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-block"
              >
                <Button
                  variant="outline"
                  className="w-full text-xs font-semibold py-2 flex items-center justify-center gap-1.5 border border-border text-foreground hover:bg-panel"
                >
                  <ExternalLink className="h-4 w-4 text-primary" />
                  Google Maps Directions
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
