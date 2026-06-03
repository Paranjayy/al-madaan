import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CarFront,
  Globe2,
  Hotel,
  MapPin,
  MessageCircle,
  PlaneLanding,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

import { GoogleTranslateWidget } from "@/components/google-translate";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

const heroPosterUrl = "/images/al-madaan-poster.png";
const servicePosterUrl = "/images/taxi-service-poster.png";
import {
  destinationCards,
  languages,
  reasons,
  serviceHighlights,
  translations,
  type LanguageCode,
} from "@/lib/site-content";

const whatsappUrl = "https://wa.me/91917006109912";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kashmir Taxi Service & Tours | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Tourist-friendly Kashmir taxi service with friendly local drivers, airport transfers, sightseeing, outstation trips, and multilingual support.",
      },
      { property: "og:title", content: "Kashmir Taxi Service & Tours | Al Madaan Ventures" },
      {
        property: "og:description",
        content:
          "Tourist-friendly Kashmir taxi service with friendly local drivers, airport transfers, sightseeing, outstation trips, and multilingual support.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroPosterUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroPosterUrl },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Al Madaan Ventures",
          image: heroPosterUrl,
          telephone: "0917006109912",
          areaServed: "Kashmir",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Srinagar",
            addressRegion: "Jammu and Kashmir",
            addressCountry: "IN",
          },
          sameAs: [
            "https://www.instagram.com/al_madaan",
            "https://www.instagram.com/sahilhamdani109",
          ],
          description:
            "Tourist-friendly Kashmir taxi and travel support with local sightseeing, airport transfers, outstation routes, and helpful local drivers.",
        }),
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const t = useMemo(() => translations[language], [language]);

  return (
    <SiteLayout language={language}>
      <section className="hero-shell">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="space-y-7">
            <div className="space-y-4">
              <p className="section-kicker">{t.eyebrow}</p>
              <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {t.heroDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <Button variant="hero" size="lg">
                  <MessageCircle className="h-5 w-5" />
                  {t.primaryCta}
                </Button>
              </a>
              <Link to="/services">
                <Button variant="pill" size="lg">
                  {t.secondaryCta}
                </Button>
              </Link>
            </div>

            <p className="text-sm font-medium text-muted-foreground">{t.miniNote}</p>

            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={(value) => setLanguage(value as LanguageCode)}
              languages={[...languages]}
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="surface-card p-5">
                <p className="text-3xl font-semibold text-foreground">2</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Well-kept taxis for comfortable, tourist-friendly journeys.
                </p>
              </article>
              <article className="surface-card p-5">
                <p className="text-3xl font-semibold text-foreground">Local</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Knowledge of routes, seasons, photo stops, and common travel needs.
                </p>
              </article>
              <article className="surface-card p-5">
                <p className="text-3xl font-semibold text-foreground">Nominal</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Fair pricing with a friendly and polite approach for visitors.
                </p>
              </article>
            </div>
          </div>

          <div className="space-y-5">
            <figure className="surface-card overflow-hidden">
              <img
                src={heroPosterUrl}
                alt="Al Madaan Ventures poster showing local Kashmir drivers, two taxis, and travel-friendly branding"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="surface-card p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent-strong" />
                  <h2 className="text-lg font-semibold">Safe and polite service</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Helpful local drivers for airport transfers, sightseeing, and family travel.
                </p>
              </article>
              <article className="surface-card p-5">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-accent-strong" />
                  <h2 className="text-lg font-semibold">Tourist-friendly support</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Good for first-time visitors who want clarity, comfort, and local guidance.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-kicker">{t.trustTitle}</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t.trustDescription}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article key={reason} className="surface-card p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <p className="text-base leading-7 text-foreground">{reason}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-5">
            <p className="section-kicker">{t.servicesTitle}</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t.servicesDescription}
            </h2>
            <div className="grid gap-4">
              {serviceHighlights.map((service, index) => {
                const icons = [PlaneLanding, MapPin, CarFront, Hotel];
                const Icon = icons[index];
                return (
                  <article key={service.title} className="surface-card p-5">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <figure className="surface-card overflow-hidden">
            <img
              src={servicePosterUrl}
              alt="Taxi service poster showing comfortable two-person Kashmir taxi ride with contact details"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="space-y-5">
          <p className="section-kicker">{t.routesTitle}</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t.routesDescription}
            </h2>
            <Link to="/destinations" className="text-sm font-semibold text-primary">
              Explore all destinations →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {destinationCards.map((card) => (
              <article key={card.name} className="destination-card min-h-52">
                <h3 className="text-xl font-semibold text-foreground">{card.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="info-panel">
            <div className="space-y-4">
              <p className="section-kicker">{t.socialTitle}</p>
              <h2 className="text-3xl font-semibold text-foreground">{t.socialDescription}</h2>
              <p className="text-base leading-7 text-muted-foreground">
                See recent visuals, local personality, and destination glimpses on Instagram before
                booking.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.instagram.com/al_madaan" target="_blank" rel="noreferrer">
                <Button variant="hero">@al_madaan</Button>
              </a>
              <a href="https://www.instagram.com/sahilhamdani109" target="_blank" rel="noreferrer">
                <Button variant="pill">@sahilhamdani109</Button>
              </a>
            </div>
          </article>

          <article className="info-panel">
            <div className="space-y-4">
              <p className="section-kicker">{t.languagesTitle}</p>
              <h2 className="text-3xl font-semibold text-foreground">{t.languagesDescription}</h2>
              <div className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-border/70 bg-card p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Globe2 className="h-5 w-5" />
                </span>
                <p className="text-sm leading-7 text-muted-foreground">
                  English, Hindi, and Urdu quick-copy support is built in, and Google Translate
                  helps wider international visitors browse the page more comfortably.
                </p>
              </div>
              <div className="rounded-[var(--radius-xl)] border border-border/70 bg-card p-4">
                <GoogleTranslateWidget />
              </div>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
