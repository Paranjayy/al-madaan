import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Calendar,
  Compass,
  Shield,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

interface DestinationDetail {
  name: string;
  distance: string;
  time: string;
  season: string;
  attractions: string[];
  price: string;
  details: string;
  longDescription: string;
  lat: number;
  lng: number;
  activities: string[];
  weatherAlert?: string;
}

const destinationDb: Record<string, DestinationDetail> = {
  srinagar: {
    name: "Srinagar (Central Hub)",
    distance: "0 km (Center)",
    time: "Hub Base",
    season: "All seasons (Charming Houseboats & Shrines)",
    attractions: [
      "Dal Lake Shikara Ride",
      "Mughal Gardens (Shalimar & Nishat)",
      "Shankaracharya Temple",
      "Hazratbal Shrine & Soura",
    ],
    price: "₹900 - ₹2,500 (Local Sightseeing)",
    details: "The heart of Kashmir Valley. Base camp for all sightseeing and transfers.",
    longDescription:
      "Srinagar is the summer capital of Jammu and Kashmir, resting gracefully on the banks of the River Jhelum. Famed for its tranquil houseboats, Mughal gardens, historic wooden shrines, and bustling craft bazaars, it serves as the ultimate starting point for every traveler's Kashmir trip.",
    lat: 34.0837,
    lng: 74.7973,
    activities: [
      "Take a shikara ride at sunset to the floating markets.",
      "Explore Mughal heritage gardens designed by Emperor Jahangir.",
      "Walk the winding lanes of Old City (Shehr-e-Khas) to admire architectural legacy.",
    ],
  },
  gulmarg: {
    name: "Gulmarg Valley",
    distance: "52 km from Srinagar",
    time: "Approx. 2 Hours",
    season: "December to March (Winter Snow & Skiing)",
    attractions: [
      "Gondola Cable Car Ride",
      "Snow activities & snowboarding",
      "Scenic Alpine Meadows",
    ],
    price: "₹2,500 - ₹2,800",
    details: "Ski destination famous for the highest operating cable car in the world.",
    longDescription:
      "Nestled in the Pir Panjal range, Gulmarg is an alpine paradise. Renowned for carrying visitors up to Phase 1 (Kungdoor) and Phase 2 (Apharwat Peak) on one of the world's highest cable cars, it turns into a stunning snow wonderland during winter and a green golf meadow in summer.",
    lat: 34.0484,
    lng: 74.3805,
    activities: [
      "Ascend to Apharwat peak via Gulmarg Gondola.",
      "Try local snowboarding or snow-sled rides.",
      "Visit the high-altitude St. Mary's stone church.",
    ],
    weatherAlert:
      "Snow alert: Mountain passes can get blocked in heavy snowfall. Snow chains are fitted on cab wheels at Tangmarg.",
  },
  sonmarg: {
    name: "Sonmarg Glacier",
    distance: "80 km from Srinagar",
    time: "Approx. 2.5 Hours",
    season: "April to October (Glaciers & Meadows)",
    attractions: ["Thajiwas Glacier pony ride", "Zero Point snow slopes", "Sindh River viewpoints"],
    price: "₹2,800 - ₹3,200",
    details: "The 'Meadow of Gold' offering majestic glacier treks and river trails.",
    longDescription:
      "Sonmarg, translated to 'Meadow of Gold', is located along the bank of the Sindh River. Bordered by snow peaks, it is the historical gateway to Ladakh via Zoji La. Visitors love trekking or riding ponies to the foot of Thajiwas Glacier.",
    lat: 34.3012,
    lng: 75.2987,
    activities: [
      "Trek to the pristine Thajiwas Glacier on foot or horseback.",
      "Drive to Zero Point near Zoji La pass for high alpine views.",
      "Relax on the banks of the rushing Sindh River.",
    ],
  },
  pahalgam: {
    name: "Pahalgam Valley",
    distance: "95 km from Srinagar",
    time: "Approx. 2.5 - 3 Hours",
    season: "All Year (Stunning rivers & valleys)",
    attractions: [
      "Betaab Valley & Aru Valley",
      "Chandanwari snow bridge",
      "River Lidder scenic spots",
    ],
    price: "₹3,000 - ₹3,500",
    details: "Lush valley bordered by conifer forests and the rushing Lidder river.",
    longDescription:
      "Pahalgam (the Valley of Shepherds) is a serene resort town set around the convergence of streams from Lidder River and Sheshnag Lake. Famed for its dense pine forests, green meadows, and starting routes of the holy Amarnath Yatra, it offers incredible calmness.",
    lat: 34.0161,
    lng: 75.315,
    activities: [
      "Transfer to local union cabs to see Betaab and Aru Valley.",
      "Go trout fishing or river-rafting in Lidder River.",
      "Hike or ride pony up to Baisaran meadow (often called Mini Switzerland).",
    ],
  },
  yusmarg: {
    name: "Yusmarg Forest Meadow",
    distance: "47 km from Srinagar",
    time: "Approx. 1.8 Hours",
    season: "May to September (Offbeat, peaceful meadows)",
    attractions: [
      "Nilnag Lake forest trek",
      "Doodh Ganga river trail",
      "Pristine horse-riding routes",
    ],
    price: "₹2,400 - ₹2,700",
    details: "A tranquil offbeat destination surrounded by pine peaks and meadows.",
    longDescription:
      "Yusmarg is a quiet alpine meadow untouched by mass commercial tourism. Supposedly visited by Jesus Christ ('Meadow of Jesus'), it is a pine-scented basin surrounded by the snow-capped Pir Panjal peaks. Best for nature lovers and trekkers.",
    lat: 34.0161, // using base coords
    lng: 74.7973,
    activities: [
      "Take a peaceful forest walk to the hidden Nilnag Lake.",
      "Trek down to the rocky bed of the rushing Doodh Ganga River.",
      "Hire horses for a forest ride with panoramic mountain borders.",
    ],
  },
  doodhpathri: {
    name: "Doodhpathri (Meadow of Milk)",
    distance: "42 km from Srinagar",
    time: "Approx. 1.5 Hours",
    season: "May to October (Cascading fresh streams)",
    attractions: ["Shaliganga river rapids", "Rolling green hillocks", "Unspoiled nature walks"],
    price: "₹2,300 - ₹2,600",
    details: "A pristine landscape of green hills and rushing milky rapids.",
    longDescription:
      "Doodhpathri (Meadow of Milk) gets its name from the rapid-moving Shaliganga River, which churns over rocks creating a rich milky-white froth. With rolling green knolls and pristine pine backdrop, it is one of J&K's newest and cleanest tourist spots.",
    lat: 33.8744,
    lng: 74.5684,
    activities: [
      "Sit by the rushing banks of Shaliganga river rapids.",
      "Explore the vast, rolling green meadows on foot.",
      "Savor local hot tea and snacks from local shepherd huts.",
    ],
  },
  martand: {
    name: "Martand Sun Temple",
    distance: "64 km from Srinagar",
    time: "Approx. 1.8 Hours",
    season: "All Year (Historical & Archeological heritage)",
    attractions: [
      "8th Century Archeological Ruins",
      "Pandav Lari structures",
      "Scenic view of Anantnag valley",
    ],
    price: "₹2,500 - ₹3,000",
    details: "Ancient heritage site dedicated to the Sun God, built by King Lalitaditya.",
    longDescription:
      "Martand Sun Temple is an exceptionally preserved archaeological monument dedicated to the Sun God, built in the 8th Century by Lalitaditya Muktapida of the Karkota dynasty. Resting on an elevated plateau overlooking the Anantnag valley, its grand colonnades showcase Greek, Buddhist, and Hindu architecture styles.",
    lat: 33.6934,
    lng: 75.2217,
    activities: [
      "Explore the colonnades and historical central chambers.",
      "Photograph the ancient carvings and temple ruins.",
      "Gaze over the wide plains of Anantnag valley below.",
    ],
  },
};

export const Route = createFileRoute("/destinations/$slug")({
  component: DestinationDetailPage,
});

function DestinationDetailPage() {
  const { slug } = Route.useParams();
  const dest = destinationDb[slug];

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

  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/destinations"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Destinations
          </Link>
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

            {/* Attractions grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Top Attractions Included</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {dest.attractions.map((att) => (
                  <div key={att} className="surface-card p-4 flex items-center gap-3 bg-panel/30">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{att}</span>
                  </div>
                ))}
              </div>
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
                  Cab Fare ( Toyota Dzire )
                </span>
                <span className="text-lg font-black text-primary block mt-0.5">{dest.price}</span>
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
                    className="w-full flex items-center justify-center gap-2 border border-border text-foreground"
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
