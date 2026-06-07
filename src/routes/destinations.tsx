import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Calendar, Plus, Check, MessageCircle } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { ItineraryBuilder, useItinerary } from "@/components/itinerary-builder";
import { destinations } from "@/lib/destinations-data";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Kashmir Destinations — Visual Guide & Itinerary Builder | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Browse Kashmir's most beautiful destinations — Srinagar, Gulmarg, Sonmarg, Pahalgam, Yusmarg, Doodhpathri, Martand. Build your custom itinerary and book instantly on WhatsApp.",
      },
      {
        property: "og:title",
        content: "Kashmir Destinations | Al Madaan Ventures",
      },
      {
        property: "og:description",
        content:
          "Visual destination guide for Kashmir — browse all spots, plan your custom itinerary, get instant WhatsApp booking.",
      },
      { property: "og:url", content: "/destinations" },
      { property: "og:image", content: "/images/destinations/srinagar.jpg" },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  component: DestinationsPage,
});

const badgeStyle: Record<string, string> = {
  "Most Popular": "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  "Winter Favourite": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  "Offbeat Gem": "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  "Hidden Gem": "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  Heritage: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

function DestinationCard({ dest }: { dest: (typeof destinations)[number] }) {
  const { selected, toggle } = useItinerary();
  const isAdded = selected.includes(dest.slug);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Hero Image */}
      <Link to="/destinations/$slug" params={{ slug: dest.slug }} className="block">
        <div className="relative h-52 w-full overflow-hidden sm:h-60">
          <img
            src={dest.image}
            alt={`${dest.name} — ${dest.tagline}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badge */}
          {dest.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm ${badgeStyle[dest.badge] ?? "bg-white/20 text-white"}`}
            >
              {dest.badge}
            </span>
          )}

          {/* Name overlay on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h2 className="text-xl font-bold text-white drop-shadow-md">{dest.name}</h2>
            <p className="text-xs font-medium text-white/80 drop-shadow">{dest.tagline}</p>
          </div>
        </div>
      </Link>

      {/* Info strip */}
      <div className="flex flex-col gap-3 p-4">
        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {dest.distance}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {dest.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {dest.seasonShort}
          </span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {dest.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full border border-border/60 bg-panel px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {h}
            </span>
          ))}
          {dest.highlights.length > 3 && (
            <span className="rounded-full border border-border/60 bg-panel px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{dest.highlights.length - 3} more
            </span>
          )}
        </div>

        {/* Price + actions */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/50 pt-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Cab fare
            </p>
            <p className="text-base font-bold text-primary">{dest.price}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              id={`itinerary-add-${dest.slug}`}
              onClick={() => toggle(dest.slug)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                isAdded
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
              aria-pressed={isAdded}
            >
              {isAdded ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {isAdded ? "Added" : "Add to Trip"}
            </button>
            <Link to="/destinations/$slug" params={{ slug: dest.slug }}>
              <span className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-panel">
                Details →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function DestinationsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <p className="section-kicker">Destination wall</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Every corner of Kashmir — with a price, a map and a driver.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Browse all destinations, click{" "}
              <strong className="text-foreground">+ Add to Trip</strong> to build your custom
              itinerary, and send it to us on WhatsApp in one tap.
            </p>
          </div>

          {/* Quick stats bar */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: "Destinations covered", value: "7+" },
              { label: "Avg drive from Srinagar", value: "~2 hrs" },
              { label: "Starting cab fare", value: "₹900" },
              { label: "Available taxis", value: "2 cabs" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Wall */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Browse &amp; plan</p>
            <h2 className="text-2xl font-semibold text-foreground">
              {destinations.length} destinations
            </h2>
          </div>
          <a href="https://wa.me/917006109912" target="_blank" rel="noreferrer">
            <Button variant="hero" size="sm">
              <MessageCircle className="h-4 w-4" />
              Ask for a custom route
            </Button>
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </section>

      {/* Itinerary tips banner */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/60 bg-panel p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🗺️",
                title: "Build your itinerary",
                desc: "Click + Add to Trip on any destination. Your selections persist across page reloads.",
              },
              {
                icon: "💬",
                title: "Send it to us",
                desc: "Hit the WhatsApp button in the floating builder — your full plan auto-fills the message.",
              },
              {
                icon: "✅",
                title: "We'll confirm & quote",
                desc: "We'll reply with exact pricing, route order suggestions, and availability within hours.",
              },
            ].map((step) => (
              <div key={step.title} className="flex gap-4">
                <span className="text-3xl">{step.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Itinerary Builder */}
      <ItineraryBuilder allDestinations={destinations} />
    </SiteLayout>
  );
}
