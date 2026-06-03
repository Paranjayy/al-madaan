import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Users } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Srinagar Express",
    days: "1 day",
    people: "1-4 pax",
    highlights: ["Dal Lake shikara", "Mughal Gardens", "Old city & shrines", "Sunset viewpoint"],
    note: "Perfect first-day intro for new visitors.",
  },
  {
    name: "Gulmarg Snow Day",
    days: "1 day",
    people: "1-4 pax",
    highlights: ["Srinagar → Gulmarg drive", "Gondola access support", "Meadow & snow stops", "Return by evening"],
    note: "Carry warm clothes; best Nov–March.",
  },
  {
    name: "Pahalgam Valley",
    days: "1 day",
    people: "1-4 pax",
    highlights: ["Pine forests", "Betaab & Aru Valley", "River photo stops", "Local lunch break"],
    note: "Most relaxed & nature-heavy route.",
  },
  {
    name: "Classic Kashmir 4N/5D",
    days: "5 days",
    people: "Family friendly",
    highlights: ["Srinagar (2N)", "Gulmarg day trip", "Pahalgam (1N)", "Sonmarg day trip"],
    note: "Most-requested itinerary — pricing on request.",
  },
];

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Kashmir Tour Packages & Itineraries | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Sample Kashmir tour packages — Srinagar, Gulmarg, Sonmarg, Pahalgam. Single-day and multi-day itineraries with friendly local taxi support.",
      },
      { property: "og:title", content: "Kashmir Tour Packages & Itineraries | Al Madaan Ventures" },
      {
        property: "og:description",
        content:
          "Single-day and multi-day Kashmir itineraries with friendly local drivers and nominal pricing.",
      },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Tour packages</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Ready-made Kashmir itineraries you can tweak in one message.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Sample plans based on what tourists ask for most. Tap any package and message us — we'll adjust dates, hotels, and pace to fit your group.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {packages.map((p) => {
            const msg = encodeURIComponent(
              `Hi! I'm interested in the "${p.name}" package (${p.days}). Please share details.`,
            );
            return (
              <article key={p.name} className="surface-card space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold text-foreground">{p.name}</h2>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" /> {p.days}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" /> {p.people}
                  </span>
                </div>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic text-muted-foreground">{p.note}</p>
                <a href={`https://wa.me/91917006109912?text=${msg}`} target="_blank" rel="noreferrer">
                  <Button variant="hero" size="sm">
                    Enquire on WhatsApp
                  </Button>
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-[var(--radius-2xl)] border border-border/70 bg-panel p-6 text-sm text-muted-foreground">
          Want a custom plan instead?{" "}
          <Link to="/contact" className="font-semibold text-primary">
            Use the trip planner →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
