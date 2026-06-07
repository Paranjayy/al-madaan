import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone, UserRound } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { TripPlanner } from "@/components/trip-planner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kashmir Taxi Driver | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Call or message Al Madaan Ventures for Kashmir taxi bookings, local sightseeing, airport transfers, and tour assistance.",
      },
      { property: "og:title", content: "Contact Kashmir Taxi Driver | Al Madaan Ventures" },
      {
        property: "og:description",
        content:
          "Call or message Al Madaan Ventures for Kashmir taxi bookings, local sightseeing, airport transfers, and tour assistance.",
      },
      { property: "og:url", content: "https://al-madaan.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://al-madaan.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="section-kicker">Contact</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Talk directly with the team before your Kashmir trip.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              For now, the fastest way to book is by phone or WhatsApp. Share your travel dates,
              pickup point, number of people, and destination plans.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a href="tel:0917006109912" className="contact-card">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="contact-label">Call</p>
                  <p className="contact-value">0917006109912</p>
                </div>
              </a>
              <a
                href="https://wa.me/91917006109912"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="contact-label">WhatsApp</p>
                  <p className="contact-value">Quick booking chat</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/al_madaan"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <Instagram className="h-5 w-5 text-primary" />
                <div>
                  <p className="contact-label">Instagram</p>
                  <p className="contact-value">@al_madaan</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/sahilhamdani109"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <UserRound className="h-5 w-5 text-primary" />
                <div>
                  <p className="contact-label">Additional profile</p>
                  <p className="contact-value">@sahilhamdani109</p>
                </div>
              </a>
            </div>
          </div>

          <aside className="info-panel">
            <div className="space-y-4">
              <p className="section-kicker">Booking note</p>
              <h2 className="text-2xl font-semibold text-foreground">Best details to send</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Arrival date and flight timing</li>
                <li>• Number of passengers and luggage</li>
                <li>• Places you want to cover</li>
                <li>• Hotel pickup or airport transfer needs</li>
                <li>• If you prefer English, Hindi, or Urdu support</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:0917006109912">
                <Button variant="hero">Call now</Button>
              </a>
              <a href="https://wa.me/91917006109912" target="_blank" rel="noreferrer">
                <Button variant="pill">Open WhatsApp</Button>
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <TripPlanner />
        </div>
      </section>
    </SiteLayout>
  );
}
