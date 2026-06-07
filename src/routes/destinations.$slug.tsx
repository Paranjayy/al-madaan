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
import { destinations } from "@/lib/destinations-data";

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
                {dest.highlights.map((att) => (
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
                  Cab Fare
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
