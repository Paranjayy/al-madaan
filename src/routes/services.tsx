import { createFileRoute } from "@tanstack/react-router";
import { CarFront, Hotel, MapPinned, PlaneLanding } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { serviceHighlights } from "@/lib/site-content";

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

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card p-6">
            <p className="section-kicker">Indicative fares</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Approximate route pricing</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Friendly nominal pricing. Final fare depends on season, vehicle, and stops — confirmed on WhatsApp before the trip.
            </p>
            <div className="mt-5 overflow-hidden rounded-md border border-border/70">
              <table className="w-full text-sm">
                <thead className="bg-panel text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Route</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">From</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {[
                    ["Airport → Srinagar hotel", "Transfer", "₹900"],
                    ["Srinagar local sightseeing", "Full day", "₹2,000"],
                    ["Srinagar ↔ Gulmarg", "Day trip", "₹3,000"],
                    ["Srinagar ↔ Sonmarg", "Day trip", "₹3,500"],
                    ["Srinagar ↔ Pahalgam", "Day trip", "₹3,500"],
                    ["Classic 4N/5D package", "Multi-day", "On request"],
                  ].map(([route, type, price]) => (
                    <tr key={route} className="bg-card">
                      <td className="px-4 py-3 text-foreground">{route}</td>
                      <td className="px-4 py-3 text-muted-foreground">{type}</td>
                      <td className="px-4 py-3 font-semibold text-primary">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              * Indicative only. Updated prices shared on WhatsApp.
            </p>
          </div>

          <div className="surface-card p-6">
            <p className="section-kicker">FAQ</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Common traveller questions</h2>
            <div className="mt-5 space-y-4">
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
                <details key={f.q} className="group rounded-md border border-border/70 bg-panel p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground marker:hidden">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
