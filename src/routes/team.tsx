import { createFileRoute } from "@tanstack/react-router";
import {
  Car,
  Globe2,
  MessageCircle,
  Star,
  Users,
  Luggage,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { driverStatus } from "@/lib/driver-status";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team | Al Madaan Ventures Kashmir Taxi" },
      {
        name: "description",
        content:
          "Meet the friendly drivers and vehicles behind Al Madaan Ventures — Aalim and the team, driving tourists safely across Kashmir since years.",
      },
      {
        property: "og:title",
        content: "Meet the Team | Al Madaan Ventures Kashmir Taxi",
      },
      {
        property: "og:description",
        content:
          "Meet Aalim and the team at Al Madaan Ventures — local Kashmir drivers with deep route knowledge, multilingual support, and a genuine love for hosting tourists.",
      },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const drivers = [
  {
    id: "aalim",
    name: "Aalim",
    role: "Lead Driver & Route Expert",
    vehicle: "Toyota Dzire",
    languages: ["Kashmiri", "Urdu", "Hindi", "Basic English"],
    bio: "Aalim has been guiding tourists across Kashmir's valleys for years. Born and raised in Srinagar, he knows every backroad, scenic viewpoint, and hidden chai dhaba between Gulmarg and Pahalgam. Guests consistently note his patience, warm personality, and genuine pride in showing off the beauty of Kashmir.",
    specialties: ["Gulmarg Snow Drives", "Airport Transfers", "Family Trips", "Photography Stops"],
    instagram: "https://www.instagram.com/al_madaan",
    whatsapp: "https://wa.me/91917006109912",
    emoji: "🚕",
  },
  {
    id: "umair",
    name: "Umair",
    role: "Co-Driver & Local Host",
    vehicle: "Toyota Dzire / Innova Crysta",
    languages: ["Kashmiri", "Urdu", "Hindi"],
    bio: "Umair brings local warmth and expert road knowledge to every journey. Known for his friendly conversations and willingness to share local stories, culture, and food recommendations along the way. He's especially popular with couples and solo travellers who appreciate authentic local engagement.",
    specialties: [
      "Pahalgam Valleys",
      "Sonmarg Glaciers",
      "Local Sightseeing",
      "Hotel Coordination",
    ],
    instagram: "https://www.instagram.com/sahilhamdani109",
    whatsapp: "https://wa.me/91917006109912",
    emoji: "🏔️",
  },
];

const taxis = [
  {
    name: "Toyota Dzire",
    type: "Compact Sedan",
    capacity: "Up to 4 guests",
    luggage: "2 large bags + cabin bags",
    ac: true,
    features: [
      "Air-conditioned interior",
      "Comfortable rear seating",
      "Ideal for couples & small families",
      "Srinagar city & outstation",
    ],
    bestFor: "Day trips, airport transfers, couples, small groups",
    emoji: "🚗",
  },
  {
    name: "Innova Crysta",
    type: "Premium SUV",
    capacity: "Up to 7 guests",
    luggage: "4+ large bags",
    ac: true,
    features: [
      "Spacious 7-seater cabin",
      "Higher ground clearance for mountain roads",
      "Ideal for families & large groups",
      "Multi-day tour recommended",
    ],
    bestFor: "Families, large groups, multi-day Kashmir packages",
    emoji: "🚙",
  },
];

const testimonials = [
  {
    name: "Aman & Priya Sharma",
    city: "Mumbai",
    rating: 5,
    text: "Aalim bhai was phenomenal! He took us to the most beautiful viewpoints of Dal Lake at sunrise and knew exactly which stalls had the best noon chai. Booking through WhatsApp was so easy. Highly recommended for any family visiting Kashmir.",
    trip: "Srinagar 3-day city tour",
  },
  {
    name: "Rohan Mehta",
    city: "Bangalore",
    rating: 5,
    text: "Solo traveller here — was a bit nervous about getting around Kashmir alone. The driver was incredibly warm and made sure I felt safe throughout. He even pointed out the Martand Sun Temple on the way to Pahalgam — a hidden gem I'd have missed otherwise!",
    trip: "Pahalgam Day Trip",
  },
  {
    name: "The Kapoor Family",
    city: "Delhi",
    rating: 5,
    text: "We travelled with 6 people and the Innova was perfect. Clean, comfortable, and our driver was patient with our kids asking a hundred questions. He even stopped at an apple orchard for us. This is the kind of local, genuine service that makes Kashmir memorable.",
    trip: "Classic Kashmir 4N/5D Package",
  },
  {
    name: "Fatima & Tariq",
    city: "Hyderabad",
    rating: 5,
    text: "From airport pickup to the final drop, everything was seamless. They communicated clearly on WhatsApp beforehand and the quoted price was exactly what we paid — no surprises. The driver's knowledge of Gulmarg was exceptional. We'll definitely book again!",
    trip: "Gulmarg Snow Day Trip",
  },
  {
    name: "Paranjay V.",
    city: "Rajkot, Gujarat",
    rating: 5,
    text: "Incredible experience visiting Kashmir! The team took us to Sonamarg and Martand Sun Temple and it was unforgettable. Very honest pricing, super friendly, and genuinely passionate about showing you the real Kashmir. Made for the website out of love for this beautiful place and its people!",
    trip: "Sonmarg + Srinagar Sightseeing",
  },
];

function TeamPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <p className="section-kicker">The people behind the wheel</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Local drivers who genuinely care about your Kashmir trip.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Al Madaan Ventures is built on local knowledge, honest pricing, and the belief that
              the best travel memory comes from the right people — not just the right places.
            </p>
          </div>
        </div>
      </section>

      {/* Driver Profiles */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 space-y-2">
          <p className="section-kicker">Driver profiles</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Meet the team
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {drivers.map((driver) => {
            const status = driverStatus[driver.id];
            return (
              <article key={driver.id} className="service-card space-y-6">
                {/* Header */}
                <div className="flex items-start gap-5">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-accent text-4xl shadow-soft">
                    {driver.emoji}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{driver.name}</h3>
                        <p className="text-sm font-semibold text-primary">{driver.role}</p>
                      </div>
                      {status && (
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            status.available
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              status.available ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                            }`}
                          />
                          {status.available
                            ? "Available Now"
                            : `On Trip: ${status.currentTrip || "Outstation"}`}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Car className="h-3.5 w-3.5 text-primary" />
                      {driver.vehicle}
                    </p>
                    {status && !status.available && status.nextAvailable && (
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1 mt-1 font-medium bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 w-fit">
                        <Clock className="h-3.5 w-3.5" /> Next Available: {status.nextAvailable}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm leading-7 text-muted-foreground">{driver.bio}</p>

                {/* Languages */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5 text-primary" />
                    Languages spoken
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {driver.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-border/70 bg-panel px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {driver.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-accent/60 px-3 py-1 text-xs font-medium text-accent-foreground"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-border/60">
                  <a href={driver.whatsapp} target="_blank" rel="noreferrer">
                    <Button variant="hero" size="sm">
                      <MessageCircle className="h-4 w-4" />
                      Book with {driver.name}
                    </Button>
                  </a>
                  <a href={driver.instagram} target="_blank" rel="noreferrer">
                    <Button variant="pill" size="sm">
                      Instagram →
                    </Button>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Taxi Fleet */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-10 space-y-2">
          <p className="section-kicker">Our fleet</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Two well-kept, clean taxis
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Both vehicles are regularly maintained, clean, and comfortable for Kashmir's varied
            terrain — from city roads to mountain switchbacks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {taxis.map((taxi) => (
            <article key={taxi.name} className="info-panel space-y-5">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{taxi.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{taxi.name}</h3>
                  <p className="text-sm text-muted-foreground">{taxi.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{taxi.capacity}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Luggage className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{taxi.luggage}</span>
                </div>
                {taxi.ac && (
                  <div className="flex items-center gap-2 text-sm">
                    <Wind className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">Air-conditioned</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">Well maintained</span>
                </div>
              </div>

              <ul className="space-y-1.5">
                {taxi.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-border/60 bg-card p-3 text-xs">
                <span className="font-semibold text-foreground">Best for: </span>
                <span className="text-muted-foreground">{taxi.bestFor}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-10 space-y-2 text-center">
          <p className="section-kicker">Traveller stories</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What guests say about their Kashmir trip
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Real feedback from tourists who booked with Al Madaan Ventures.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="surface-card flex flex-col gap-4 p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-strong text-accent-strong" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-7 text-muted-foreground italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-border/60 pt-3">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.city} • {t.trip}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="https://wa.me/91917006109912" target="_blank" rel="noreferrer">
            <Button variant="hero" size="lg">
              <MessageCircle className="h-5 w-5" />
              Book your Kashmir trip now
            </Button>
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
