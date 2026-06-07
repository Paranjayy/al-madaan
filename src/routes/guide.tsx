import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Kashmir Travel Guide — Tips for First-Time Visitors | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Complete Kashmir travel guide — best seasons to visit, what to pack, safety tips, local customs, route planning, and insider advice from local drivers.",
      },
      {
        property: "og:title",
        content: "Kashmir Travel Guide — Tips for First-Time Visitors | Al Madaan Ventures",
      },
      {
        property: "og:description",
        content:
          "Everything you need to know before visiting Kashmir — seasonal guide, packing list, local customs, route tips, and how to book local taxis.",
      },
      { property: "og:url", content: "/guide" },
    ],
    links: [{ rel: "canonical", href: "/guide" }],
  }),
  component: GuidePage,
});

const seasons = [
  {
    name: "🌸 Spring (March – May)",
    tagline: "Tulips, Blossoms & Cool Air",
    temp: "10°C – 22°C",
    highlights: [
      "Tulip Garden in full bloom (Asia's largest tulip garden)",
      "Cherry blossom trails across Srinagar",
      "Pahalgam rivers flowing at full strength",
      "Best time for families and first-timers",
    ],
    tips: "Book at least 3–4 weeks in advance — hotels and taxis fill fast during Tulip Festival season (April).",
    rating: "⭐⭐⭐⭐⭐ Best for most tourists",
  },
  {
    name: "☀️ Summer (June – August)",
    tagline: "Cool Escape from Indian Heat",
    temp: "20°C – 30°C",
    highlights: [
      "Escape India's 40°C+ heat — Srinagar stays pleasantly cool",
      "Sonmarg glacier treks & Thajiwas ice fields",
      "Gulmarg green meadows (no snow, but beautiful)",
      "Houseboat season at its peak on Dal Lake",
    ],
    tips: "Light cotton clothes + a warm jacket for evenings. Rain showers possible — carry an umbrella.",
    rating: "⭐⭐⭐⭐ Great escape from mainland heat",
  },
  {
    name: "🍂 Autumn (September – October)",
    tagline: "Golden Chinar Season",
    temp: "8°C – 20°C",
    highlights: [
      "Stunning red & golden Chinar leaves across Kashmir",
      "Harvesting season — fresh apples, walnuts, saffron",
      "Calm crowds after peak summer rush",
      "Clear blue skies — best for photography",
    ],
    tips: "Our personal favourite season. Pack layers — mornings get cold. Saffron fields near Pampore are unmissable.",
    rating: "⭐⭐⭐⭐⭐ Local driver's top pick",
  },
  {
    name: "❄️ Winter (November – February)",
    tagline: "Snow, Skiing & Cozy Houseboats",
    temp: "-5°C – 10°C",
    highlights: [
      "Gulmarg skiing & snowboarding (India's best ski resort)",
      "Dramatic snow-capped landscapes across the valley",
      "Dal Lake partially frozen (January) — magical views",
      "Much fewer tourists — peaceful & romantic",
    ],
    tips: "Heavy woollens mandatory. Snow chains needed for Gulmarg drive — we handle this. Gondola tickets sell out fast; book weeks in advance.",
    rating: "⭐⭐⭐⭐ Perfect for snow lovers & couples",
  },
];

const routeCombos = [
  {
    title: "Quick 2-Day Weekend",
    destinations: ["Srinagar City Tour", "Gulmarg Day Trip"],
    duration: "2 days",
    budget: "₹5,000 – ₹7,000 (cab only)",
    note: "Great for extended weekend visitors from Delhi or Mumbai.",
  },
  {
    title: "Classic 5-Day Kashmir",
    destinations: [
      "Srinagar (2 nights)",
      "Gulmarg excursion",
      "Pahalgam (1 night)",
      "Sonmarg day trip",
    ],
    duration: "5 days",
    budget: "₹15,000 – ₹25,000 (cab only)",
    note: "The most popular itinerary — covers all the essentials without rushing.",
  },
  {
    title: "Offbeat Explorer",
    destinations: ["Yusmarg", "Doodhpathri", "Martand Sun Temple", "Pahalgam valleys"],
    duration: "3–4 days",
    budget: "₹10,000 – ₹15,000 (cab only)",
    note: "For repeat visitors wanting to go beyond the tourist trail.",
  },
  {
    title: "Photography Tour",
    destinations: ["Dal Lake at sunrise", "Chinar gardens", "Sonamarg glaciers", "Tulip Garden"],
    duration: "4–5 days",
    budget: "₹12,000 – ₹18,000 (cab only)",
    note: "We know the best golden hour spots — just tell your driver you're into photography.",
  },
];

const firstTimerTips = [
  {
    icon: "🎒",
    title: "What to Pack",
    tips: [
      "Warm jacket even in summer — evenings get cold",
      "Comfortable walking shoes (for valley treks)",
      "Sunscreen and sunglasses (high altitude UV)",
      "Offline maps downloaded (data can be patchy in mountains)",
      "Small cash (₹INR) for local vendors and chai stalls",
    ],
  },
  {
    icon: "📶",
    title: "Connectivity & SIM",
    tips: [
      "Jio and Airtel work in most parts of Srinagar and main roads",
      "Data is slow or unavailable in Gulmarg upper gondola, Sonmarg Zero Point",
      "Download offline maps (Google Maps / Maps.me) before leaving Srinagar",
      "BSNL sometimes works where private operators don't",
    ],
  },
  {
    icon: "🕌",
    title: "Local Customs & Etiquette",
    tips: [
      "Dress modestly near shrines and mosques (cover shoulders and knees)",
      "Ask before photographing locals — always respectful",
      "Fridays are holy — some shops may close midday for prayers",
      "Remove shoes before entering any shrine or mosque",
      "Kashmiri people are warm and hospitable — greet with 'Adaab' or 'Salaam'",
    ],
  },
  {
    icon: "🏔️",
    title: "Altitude & Health",
    tips: [
      "Srinagar is at ~1,585m — most people adjust easily",
      "Gulmarg upper gondola (3,979m) — slow down if you feel dizzy",
      "Drink lots of water, especially in summer",
      "Carry personal medications and a light first-aid kit",
      "Sonmarg Zero Point is at ~3,500m — short acclimatization walk before riding",
    ],
  },
  {
    icon: "🍽️",
    title: "Food & Local Eats",
    tips: [
      "Must try: Wazwan feast (traditional multi-course Kashmiri meal)",
      "Try noon chai (pink salty tea) and kulcha at local bakeries",
      "Rogan Josh, Yakhni, and Dum Aloo are local staples — try at a local dhaba",
      "Shikara-wala vendors sell snacks on Dal Lake — fresh lotus stems are a delicacy",
      "Avoid eating at tourist traps — ask your driver for local restaurant picks",
    ],
  },
  {
    icon: "💰",
    title: "Budget Tips",
    tips: [
      "Always confirm the price in advance — get it on WhatsApp",
      "Bargain at local craft markets (Pashmina, copperware, saffron)",
      "Local union cabs inside Aru/Betaab are mandatory and fixed price by the government",
      "Gondola tickets — book online to avoid queue and last-minute markup",
      "Hotels in Srinagar range from ₹800 (budget guest house) to ₹15,000+ (luxury houseboat)",
    ],
  },
];

function GuidePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <p className="section-kicker">Kashmir travel guide</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Everything you need to know before visiting Kashmir.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Written from a local driver's perspective — seasonal tips, what to pack, route
              combinations, local customs, and honest advice for first-time visitors to the valley.
            </p>
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 space-y-2">
          <p className="section-kicker">When to visit</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Seasonal guide to Kashmir
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Kashmir is beautiful year-round — but each season offers a different experience. Here's
            what to expect.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {seasons.map((season) => (
            <article key={season.name} className="service-card space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">{season.name}</h3>
                <p className="text-sm font-semibold text-primary">{season.tagline}</p>
                <p className="text-xs text-muted-foreground">🌡️ Temperature: {season.temp}</p>
              </div>

              <ul className="space-y-2">
                {season.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-border/60 bg-panel p-3 text-xs">
                <span className="font-semibold text-foreground">💡 Driver tip: </span>
                <span className="text-muted-foreground">{season.tips}</span>
              </div>

              <p className="text-xs font-semibold text-accent-foreground bg-accent/30 rounded-full px-3 py-1 w-fit">
                {season.rating}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Route Combinations */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-10 space-y-2">
          <p className="section-kicker">Route planning</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Smart destination combinations
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Not sure which places to combine? Here are our most popular itinerary suggestions based
            on duration and travel style.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {routeCombos.map((combo) => (
            <article key={combo.title} className="surface-card p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{combo.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  ⏱️ {combo.duration} • 💰 {combo.budget}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {combo.destinations.map((dest) => (
                  <span
                    key={dest}
                    className="rounded-full border border-border/70 bg-panel px-3 py-1 text-xs font-medium text-foreground"
                  >
                    📍 {dest}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-3">
                {combo.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* First Timer Tips */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-10 space-y-2">
          <p className="section-kicker">First-timer essentials</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Must-know tips for your Kashmir visit
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {firstTimerTips.map((section) => (
            <article key={section.title} className="info-panel space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{section.icon}</span>
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-2xl)] border border-border/70 bg-panel p-8 sm:p-12 text-center space-y-6">
          <p className="section-kicker">Ready to plan your trip?</p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            We'll help you put it all together.
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Share your travel dates and the places you want to cover. We'll suggest the best route,
            timing, and a fair price — no pressure, no hard sell.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/91917006109912" target="_blank" rel="noreferrer">
              <Button variant="hero" size="lg">
                <MessageCircle className="h-5 w-5" />
                Plan on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
