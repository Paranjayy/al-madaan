import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Calendar,
  Compass,
  Shield,
  Map,
  Info,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/destinations-data";
import type { Map as LeafletMap } from "leaflet";

// Detailed mapping of local sightseeing points for all 14 destinations
const subPlacesDb: Record<string, { name: string; desc: string; tip?: string }[]> = {
  srinagar: [
    {
      name: "Dal Lake & Houseboats",
      desc: "Kashmir's iconic lake. Ride standard wooden shikaras, explore the floating vegetable markets, or spend a night in heritage houseboats.",
      tip: "Avoid shikara rides at midday during summers — sunrise or sunset offers the best breeze and photography lighting.",
    },
    {
      name: "Mughal Gardens (Nishat & Shalimar)",
      desc: "Terraced lawns, cascading fountains, and centuries-old Chinar trees built by Emperor Jahangir for Empress Nur Jahan.",
      tip: "Nishat Bagh offers direct views over Dal Lake; Shalimar is famous for its grand black stone pavilion.",
    },
    {
      name: "Shankaracharya Temple Viewpoint",
      desc: "An ancient stone temple dedicated to Lord Shiva situated atop a high hill, offering 360-degree views of Srinagar.",
      tip: "Cameras and phones are strictly not allowed inside due to security; leave them in the taxi cab with the driver.",
    },
    {
      name: "Hazratbal Shrine",
      desc: "A beautiful white marble mosque on the lake's edge, housing a sacred relic of Prophet Muhammad.",
      tip: "Please dress modestly; ladies must cover their heads when walking inside the outer shrine courtyard.",
    },
  ],
  gulmarg: [
    {
      name: "Gulmarg Gondola (Phase 1 & 2)",
      desc: "One of the highest and longest cable cars in Asia. Phase 1 takes you to Kungdoor meadow, and Phase 2 ascends to Apharwat peak (14,000 ft).",
      tip: "Gondola tickets must be pre-booked online weeks ahead. If Zoji La passes or peak winds block Phase 2, check status with the driver.",
    },
    {
      name: "Baisaran (Mini Switzerland)",
      desc: "Lush glades bordered by giant pines. Located a short distance from the golf meadows, perfect for walks or horse-back rides.",
      tip: "Bargain with local horse handlers at the tourist center; union prices are posted, but rates vary by duration.",
    },
    {
      name: "St. Mary's Stone Church",
      desc: "A charming British colonial-era church built in 1902, set in the middle of alpine valleys.",
      tip: "Best photographed at sunset when the light catches the stone towers.",
    },
  ],
  sonmarg: [
    {
      name: "Thajiwas Glacier",
      desc: "A stunning glacier situated 3km from Sonmarg base, offering sledging and year-round ice fields.",
      tip: "Ponies or union cabs can take you up, but it is a pleasant hike on foot if you are physically fit.",
    },
    {
      name: "Zero Point (Zoji La Route)",
      desc: "A high-altitude snow point located near the Ladakh highway, featuring snow-sliding and dramatic mountain views.",
      tip: "Requires hiring local Union vehicles at Sonmarg; Srinagar taxis are not allowed to drop guests directly at Zero Point.",
    },
  ],
  pahalgam: [
    {
      name: "Betaab Valley",
      desc: "A beautiful meadow named after the movie 'Betaab'. Rushing Lidder streams divide the green lawns and pine hills.",
      tip: "Perfect picnic spot for kids. Entry tickets are nominal.",
    },
    {
      name: "Aru Valley",
      desc: "A quiet, green shepherd village located 12km uphill, serving as the base for trekking to Kolahoi Glacier.",
      tip: "Local Pahalgam Union taxis must be hired to visit Aru, Betaab and Chandanwari; Srinagar cabs wait at the main parking.",
    },
    {
      name: "Chandanwari",
      desc: "The scenic starting gate for the holy Amarnath Yatra pilgrimage, featuring natural ice bridges.",
      tip: "Best visited in early summer to see active snow slides.",
    },
  ],
  yusmarg: [
    {
      name: "Doodh Ganga River Bed",
      desc: "A rapid-running mountain river. The water churns aggressively over granite rocks, creating white milky froth.",
      tip: "It is a 20-minute descent trail from the main meadow; ride a pony back up if you have knee issues.",
    },
    {
      name: "Nilnag Lake",
      desc: "A quiet, turquoise-colored lake surrounded by thick conifer pine forests, accessible via a 4km forest trail.",
      tip: "Hire a local guide to avoid getting lost on forest shortcuts.",
    },
  ],
  doodhpathri: [
    {
      name: "Shaliganga River Rapids",
      desc: "Glacier waters rushing through massive boulders with green rolling knolls bordering the stream.",
      tip: "Sit beside local tea stalls to enjoy hot Maggie and pink salt tea (Noon Chai) by the cold water.",
    },
    {
      name: "Dikshal Meadows",
      desc: "Vast, rolling emerald green fields extending towards the Pir Panjal mountains where sheep graze.",
      tip: "Great place for panoramic drone shots and wide landscape photography.",
    },
  ],
  martand: [
    {
      name: "Martand Sun Temple Colonnades",
      desc: "The majestic ruins of an 8th-century temple built by King Lalitaditya, showcasing a fusion of Greek, Roman, and Kashmiri architectures.",
      tip: "Visit around 4 PM to capture golden-hour lighting across the ancient stone carvings.",
    },
  ],
  aharbal: [
    {
      name: "Veshu River Gorge & Falls",
      desc: "The 'Niagara of Kashmir'. A dramatic waterfall plunging 25 meters down a narrow conifer-forested rocky canyon.",
      tip: "Fenced viewing galleries provide safe viewpoints, but pathways get slippery; wear shoes with good grip.",
    },
  ],
  manasbal: [
    {
      name: "Jharokha Mughal Garden",
      desc: "A beautiful, lesser-visited arched brick garden built by Mughal royalty overlooking the calm waters.",
      tip: "Offers a very quiet, peaceful alternative to the crowded gardens of Srinagar.",
    },
  ],
  verinag: [
    {
      name: "Jahangir's Octagonal Basin",
      desc: "A historic stone basin constructed around the deep blue spring source of Jhelum River, enclosed by Mughal arches.",
      tip: "Peer down into the pool to spot large local trout fish swimming in the crystal-clear spring.",
    },
  ],
  gurez: [
    {
      name: "Habba Khatoon Mountain",
      desc: "A majestic pyramid-shaped peak overlooking Dawar, named after the famous 16th-century peasant-poetess.",
      tip: "Watch the peak turn orange-gold during sunset from the Kishenganga river banks.",
    },
    {
      name: "Dawar Border Village",
      desc: "The central hub of Gurez, home to the Dard-Shina tribe, featuring old-style wooden houses and extreme border hospitality.",
      tip: "Expect multiple army security checkpoints; carry your physical Aadhaar card at all times.",
    },
  ],
  "sinthan-top": [
    {
      name: "Sinthan summit pass (12,000 ft)",
      desc: "A high alpine pass offering 360-degree views of Kishtwar valleys and Kashmir plains. Snow exists here even in June.",
      tip: "Carry warm coats and head caps; the pass gets extremely windy and freezing within minutes.",
    },
  ],
  lolab: [
    {
      name: "Kalaroos Caves & Satbaran",
      desc: "Mysterious archaeological caves with ancient stone structures carved into the mountains, historically believed to lead to Central Asia.",
      tip: "Hire a local Sogam village boy as a guide to safely hike up the cave chambers.",
    },
  ],
  bangus: [
    {
      name: "Bada Bangus Meadows",
      desc: "A massive, pristine high-altitude plateau in Kupwara covered in wildflowers and surrounded by deep forests.",
      tip: "Very offbeat; cell connectivity is nil. Ensure you travel with an experienced driver companion.",
    },
  ],
};

export const Route = createFileRoute("/destinations/$slug")({
  head: ({ params }) => {
    const dest = destinations.find((d) => d.slug === params.slug);
    const title = dest ? `${dest.name} Travel Guide & Cab Fare | Al Madaan Ventures` : "Destination Details";
    const description = dest ? `${dest.name} travel info: distance is ${dest.distance}, travel time is ${dest.time}. Best highlights: ${dest.highlights.join(", ")}.` : "Destination Details";
    
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: dest?.image || "" },
      ],
    };
  },
  component: DestinationDetailPage,
});

function DestinationDetailPage() {
  const { slug } = Route.useParams();
  const dest = destinations.find((d) => d.slug === slug);
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Map for specific destination
  useEffect(() => {
    if (!isClient || !dest || !mapRef.current) return;

    import("leaflet").then((L) => {
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!mapInstance.current) {
        const map = L.map(mapRef.current!, {
          center: [dest.lat, dest.lng],
          zoom: 11,
          zoomControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        L.marker([dest.lat, dest.lng])
          .addTo(map)
          .bindPopup(`<strong>${dest.name}</strong><br/>${dest.tagline}`)
          .openPopup();

        // Srinagar reference point if not Srinagar
        if (dest.slug !== "srinagar") {
          const srinagarLat = 34.0837;
          const srinagarLng = 74.7973;
          L.marker([srinagarLat, srinagarLng], {
            opacity: 0.8,
          })
            .addTo(map)
            .bindPopup("Srinagar (Base Hub)");

          L.polyline([[srinagarLat, srinagarLng], [dest.lat, dest.lng]], {
            color: "#0f3d30",
            weight: 3,
            dashArray: "6, 6",
            opacity: 0.6,
          }).addTo(map);
        }

        mapInstance.current = map;
      }
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isClient, dest]);

  if (!dest) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-7xl px-4 py-16 text-center space-y-6">
          <h1 className="text-3xl font-bold">Destination not found</h1>
          <p className="text-muted-foreground">
            The tourist spot you are looking for does not exist in our database.
          </p>
          <Link to="/destinations">
            <Button variant="outline" className="border-border">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Destinations
            </Button>
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const bookMsg = `Hi Al Madaan! I want to book a taxi ride from Srinagar to ${dest.name}. Please let me know availability and best prices.`;
  const bookUrl = `https://wa.me/917006109912?text=${encodeURIComponent(bookMsg)}`;
  const gmapUrl = `https://www.google.com/maps/dir/?api=1&origin=Srinagar&destination=${dest.lat},${dest.lng}`;

  const subPlaces = subPlacesDb[dest.slug] || [];

  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/destinations"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Destinations
          </Link>

          <span className="text-xs text-muted-foreground bg-panel px-3 py-1.5 rounded-full border border-border/60 uppercase font-semibold">
            🗺️ Srinagar to {dest.name} Guide
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-accent/20 text-accent-strong-foreground rounded">
                {dest.distance}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">{dest.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {dest.longDescription}
              </p>
            </div>

            {/* Sub-places sightseeing guide */}
            {subPlaces.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Local Sightseeing Points &amp; Sub-Places</h2>
                <div className="grid gap-5">
                  {subPlaces.map((sp) => (
                    <article key={sp.name} className="surface-card p-5 space-y-3 bg-panel/30 hover:shadow-soft transition duration-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                        <h3 className="text-base font-bold text-foreground">{sp.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{sp.desc}</p>
                      {sp.tip && (
                        <div className="flex items-start gap-2 rounded-lg bg-card p-3 border border-border/80 text-xs text-muted-foreground">
                          <Info className="h-4 w-4 text-accent-strong shrink-0 mt-0.5" />
                          <p>
                            <strong>Local Tip:</strong> {sp.tip}
                          </p>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Location Map */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Interactive Route Map</h2>
              <div className="surface-card p-4">
                {isClient ? (
                  <div
                    ref={mapRef}
                    className="w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden border border-border/60 z-10"
                  />
                ) : (
                  <div className="w-full h-[320px] bg-panel rounded-xl flex items-center justify-center border border-border/60">
                    <span className="text-sm text-muted-foreground">Loading Destination Map...</span>
                  </div>
                )}
                <div className="flex gap-4 justify-center mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> {dest.name} Point
                  </span>
                  {dest.slug !== "srinagar" && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span> Srinagar Base
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="surface-card p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Recommended Activities</h2>
              <ul className="space-y-3">
                {dest.activities.map((act, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Compass className="h-5 w-5 text-accent-strong shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Transport Info */}
          <div className="space-y-6">
            <div className="surface-card p-6 space-y-5">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Travel Duration
                </span>
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5 mt-1">
                  <Clock className="h-4 w-4 text-primary" /> {dest.time}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Best Season to Visit
                </span>
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5 mt-1">
                  <Calendar className="h-4 w-4 text-primary" /> {dest.season}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Standard Cab Fare
                </span>
                <span className="text-lg font-black text-primary block mt-0.5">{dest.price}</span>
                <span className="text-[10px] text-muted-foreground block mt-1">
                  * Estimated rate for Maruti Suzuki Swift Dzire sedan. Innova pricing varies.
                </span>
              </div>

              <div className="pt-4 border-t border-border/60 grid gap-2">
                <a href={bookUrl} target="_blank" rel="noreferrer" className="w-full inline-block">
                  <Button variant="hero" className="w-full flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" /> Book Cab on WhatsApp
                  </Button>
                </a>
                <a href={gmapUrl} target="_blank" rel="noreferrer" className="w-full inline-block">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border border-border text-foreground hover:bg-panel"
                  >
                    <ExternalLink className="h-4 w-4 text-primary" /> Google Maps Directions
                  </Button>
                </a>
              </div>
            </div>

            {dest.weatherAlert && (
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-xs text-yellow-700 dark:text-yellow-400 flex items-start gap-2.5">
                <Shield className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{dest.weatherAlert}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
