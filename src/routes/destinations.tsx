import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site-layout";
import { destinationCards } from "@/lib/site-content";

const placesImageUrl = "/images/kashmir-tourist-places.png";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Kashmir Destinations & Sightseeing | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Explore Srinagar, Gulmarg, Sonmarg, Pahalgam and more with friendly local taxi support for sightseeing and outstation travel.",
      },
      { property: "og:title", content: "Kashmir Destinations & Sightseeing | Al Madaan Ventures" },
      {
        property: "og:description",
        content:
          "Explore Srinagar, Gulmarg, Sonmarg, Pahalgam and more with friendly local taxi support for sightseeing and outstation travel.",
      },
      { property: "og:url", content: "/destinations" },
      { property: "og:image", content: placesImageUrl },
      { name: "twitter:image", content: placesImageUrl },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <p className="section-kicker">Destinations</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              A strong starting guide to the places travellers ask for most.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              The destination board shared by the business already gives a useful snapshot of common
              tourist demand. This page turns that into a cleaner, mobile-friendly overview for
              guests planning a Kashmir trip.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {destinationCards.map((card) => (
                <article
                  key={card.name}
                  className="destination-card flex flex-col justify-between min-h-[160px]"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{card.name}</h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link to="/destinations/$slug" params={{ slug: card.slug }}>
                      <span className="text-xs font-bold text-primary hover:underline cursor-pointer">
                        View Details →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <figure className="overflow-hidden rounded-[var(--radius-2xl)] border border-border/70 bg-panel shadow-soft">
            <img
              src={placesImageUrl}
              alt="Tourist places across Jammu and Kashmir including Srinagar, Gulmarg, Pahalgam, Sonmarg and Jammu sightseeing locations"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </SiteLayout>
  );
}
