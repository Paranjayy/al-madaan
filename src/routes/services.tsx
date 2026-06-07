import { createFileRoute } from "@tanstack/react-router";
import { CarFront, Hotel, MapPinned, PlaneLanding } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { serviceHighlights } from "@/lib/site-content";
import { FareTableInteractive } from "@/components/fare-table-interactive";

const serviceIcons = [PlaneLanding, MapPinned, CarFront, Hotel];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Taxi Services in Kashmir | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Airport transfers, local sightseeing, hotel pickup and outstation trips with friendly local drivers in Kashmir.",
      },
      { property: "og:title", content: "Taxi Services in Kashmir | Al Madaan Ventures" },
      {
        property: "og:description",
        content:
          "Airport transfers, local sightseeing, hotel pickup and outstation trips with friendly local drivers in Kashmir.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Services</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Flexible rides and practical travel help across Kashmir.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Al Madaan Ventures is set up for visitors who need reliable transport plus local assistance. The focus is simple: clear communication, helpful planning, comfortable travel, and fair pricing.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {serviceHighlights.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={service.title} className="service-card">
                <span className="service-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">{service.title}</h2>
                  <p className="text-base leading-7 text-muted-foreground">{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 space-y-8">
          <div className="space-y-2">
            <p className="section-kicker">Interactive rates database</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Transparent Cab Fares & Packages
            </h2>
            <p className="text-base text-muted-foreground">
              Filter, sort, search, or group Kashmiri routes and tour packages. Click book to pre-compose your WhatsApp request.
            </p>
          </div>
          <FareTableInteractive />
        </div>

        <div className="mt-20 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="section-kicker">FAQ</p>
            <h2 className="text-3xl font-semibold text-foreground">Common Traveller Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "When is the best time to visit Kashmir?",
                a: "March–May for tulips and gardens, June–August for cool weather, September–October for autumn, December–February for snow in Gulmarg.",
              },
              {
                q: "Are the drivers English-speaking?",
                a: "Yes, basic English along with Hindi, Urdu and Kashmiri. Translation help is available throughout the trip.",
              },
              {
                q: "Do you handle airport pickup at odd hours?",
                a: "Yes, early-morning and late-night Srinagar airport pickups are supported with prior WhatsApp confirmation.",
              },
              {
                q: "Is the taxi suitable for families with kids?",
                a: "Absolutely — clean, comfortable seating, flexible stops and patient driving for families and elderly guests.",
              },
              {
                q: "How do I pay?",
                a: "Cash, UPI, and bank transfer. Confirmed fare is shared on WhatsApp before the trip — no surprises.",
              },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:shadow-md">
                <summary className="cursor-pointer text-base font-semibold text-foreground select-none list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-primary text-lg font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground border-t border-border/40 pt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
