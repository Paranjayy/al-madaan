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
      { property: "og:url", content: "https://al-madaan.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://al-madaan.lovable.app/services" }],
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
            Al Madaan Ventures is set up for visitors who need reliable transport plus local
            assistance. The focus is simple: clear communication, helpful planning, comfortable
            travel, and fair pricing.
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
              Filter, sort, search, or group Kashmiri routes and tour packages. Click book to
              pre-compose your WhatsApp request.
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
              <details
                key={f.q}
                className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:shadow-md"
              >
                <summary className="cursor-pointer text-base font-semibold text-foreground select-none list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-primary text-lg font-bold group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground border-t border-border/40 pt-3">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Fare Rules Section */}
        <div className="mt-20 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="section-kicker">Fare rules & policy</p>
            <h2 className="text-3xl font-semibold text-foreground">Clear pricing — no surprises</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about pricing, hours, and policies before booking.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="surface-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-lg">
                  🕐
                </span>
                <h3 className="text-lg font-semibold text-foreground">Airport Night Surcharge</h3>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Late-night or early-morning airport pickups (between{" "}
                <strong className="text-foreground">10 PM – 6 AM</strong>) carry an additional night
                allowance of <strong className="text-foreground">₹200–₹300</strong> above standard
                fares. This is communicated clearly on WhatsApp before confirming your booking.
              </p>
            </div>

            <div className="surface-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-lg">
                  👨‍👩‍👧‍👦
                </span>
                <h3 className="text-lg font-semibold text-foreground">Children Pricing</h3>
              </div>
              <ul className="text-sm leading-7 text-muted-foreground space-y-1">
                <li>
                  <strong className="text-foreground">Under 3 years:</strong> Free (lap-seated, no
                  seat occupied)
                </li>
                <li>
                  <strong className="text-foreground">3–10 years:</strong> No extra charge if
                  sharing an adult seat
                </li>
                <li>
                  <strong className="text-foreground">Above 10 years:</strong> Counted as a regular
                  guest in capacity
                </li>
                <li className="text-xs italic pt-1">
                  Car seats/booster seats can be requested with advance notice.
                </li>
              </ul>
            </div>

            <div className="surface-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-lg">
                  💳
                </span>
                <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
              </div>
              <ul className="text-sm leading-7 text-muted-foreground space-y-1">
                <li>
                  ✅ <strong className="text-foreground">Cash (INR)</strong> — always accepted
                </li>
                <li>
                  ✅ <strong className="text-foreground">UPI</strong> — Google Pay, PhonePe, Paytm
                </li>
                <li>
                  ✅ <strong className="text-foreground">Bank Transfer / NEFT</strong> — for advance
                  bookings
                </li>
                <li>❌ International cards / USD not accepted directly</li>
              </ul>
            </div>

            <div className="surface-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-lg">
                  📋
                </span>
                <h3 className="text-lg font-semibold text-foreground">What's Not Included</h3>
              </div>
              <ul className="text-sm leading-7 text-muted-foreground space-y-1">
                <li>• Local union cabs inside Aru/Betaab/Gulmarg (mandatory by local govt)</li>
                <li>• Entry tickets, gondola charges, garden fees</li>
                <li>• Meals, snacks, and personal purchases</li>
                <li>• Hotel stays (can be coordinated on request)</li>
                <li>• Toll taxes on some routes (added at actuals)</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-panel p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="text-base font-semibold text-foreground">Our Promise</h3>
                <p className="text-sm leading-7 text-muted-foreground mt-1">
                  The final fare is always confirmed over WhatsApp before the trip starts. You'll
                  never face hidden charges or last-minute price changes. If you want a written
                  estimate, just ask — we're happy to share it in advance.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-panel"
              >
                🖨️ Download / Print Price Brochure
              </button>
              <span className="text-xs text-muted-foreground">
                Opens print dialog — save as PDF from your browser
              </span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
