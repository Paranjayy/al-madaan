import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://al-madaan.lovable.app/guide/uber-in-srinagar";
const whatsappUrl = "https://wa.me/917006109912";

export const Route = createFileRoute("/guide/uber-in-srinagar")({
  head: () => ({
    meta: [
      { title: "Is Uber or Ola Available in Srinagar? (2026 Guide)" },
      {
        name: "description",
        content:
          "Uber and Ola don't operate in Srinagar or Kashmir. Here's what tourists use instead — local taxi unions, prepaid cabs, and trusted drivers.",
      },
      {
        property: "og:title",
        content: "Is Uber or Ola Available in Srinagar? (2026 Guide)",
      },
      {
        property: "og:description",
        content:
          "Uber and Ola don't operate in Kashmir. Learn what locals actually use and how to book a reliable taxi in Srinagar.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is Uber available in Srinagar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Uber does not operate in Srinagar or anywhere in Kashmir as of 2026. Tourists rely on local taxi unions, prepaid airport cabs, and trusted private drivers.",
              },
            },
            {
              "@type": "Question",
              name: "Is Ola available in Srinagar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Ola also does not operate in Srinagar. The local taxi union system is the standard way to get around.",
              },
            },
            {
              "@type": "Question",
              name: "How do tourists get around in Srinagar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most tourists pre-book a local taxi with a known driver for the duration of their trip. This is cheaper, safer, and more reliable than trying to flag down cabs each day.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: UberGuidePage,
});

function UberGuidePage() {
  return (
    <SiteLayout>
      <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          to="/guide"
          className="mb-6 inline-flex items-center text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Travel Guide
        </Link>

        <header className="space-y-4">
          <p className="section-kicker">Transport in Kashmir</p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Is Uber or Ola available in Srinagar?
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Short answer: <strong className="text-foreground">no</strong>. Neither Uber nor Ola
            operate in Srinagar or anywhere in the Kashmir Valley. Here's what tourists actually
            use instead — and how to book without getting overcharged.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <XCircle className="h-5 w-5 text-destructive" /> Uber in Srinagar
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Not available. The Uber app shows "no cars" in Kashmir.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <XCircle className="h-5 w-5 text-destructive" /> Ola in Srinagar
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Not available either. Local taxi unions hold the market.
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Why isn't Uber in Kashmir?</h2>
          <p className="text-base leading-7 text-muted-foreground">
            Kashmir's taxi market is run by local unions that hold designated stands at the
            airport, hotels, and tourist points. Ride-hailing apps have not been able to enter
            because fares, routes and stand allocations are union-controlled. The good news: most
            drivers are locals who know the valley intimately, speak basic English/Hindi, and
            charge nominal day rates rather than per-kilometre app surge.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">What tourists use instead</h2>
          <ul className="space-y-3">
            {[
              {
                title: "Pre-booked private driver (recommended)",
                desc: "Book one trusted driver for your full stay. Same car picks you up at the airport, takes you sightseeing, and drops you back. Predictable pricing, no haggling daily.",
              },
              {
                title: "Prepaid airport taxi",
                desc: "Available at Srinagar Airport's prepaid counter — fixed rate to your hotel, no surprises.",
              },
              {
                title: "Local Union taxis at sightseeing points",
                desc: "Required at Pahalgam (for Aru/Betaab/Chandanwari) and Sonmarg (for Zero Point). Srinagar cabs can't enter — you transfer to a local union vehicle at the gate.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-xl border border-border/60 bg-panel p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Book a trusted local driver in Srinagar
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Al Madaan Ventures runs two well-maintained cabs in Srinagar with friendly local
            drivers who speak English, Hindi and Urdu. Nominal pricing, airport pickup, and full
            sightseeing support across Kashmir.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Button variant="hero">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </Button>
            </a>
            <a href="tel:+917006109912">
              <Button variant="outline">
                <Phone className="h-4 w-4" /> Call +91 70061 09912
              </Button>
            </a>
            <Link to="/packages">
              <Button variant="ghost">See sample itineraries →</Button>
            </Link>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}
