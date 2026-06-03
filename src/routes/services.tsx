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
      </section>
    </SiteLayout>
  );
}
