import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  CheckSquare,
  Square,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Kashmir Travel Guide — Tips for First-Time Visitors | Al Madaan Ventures" },
      {
        name: "description",
        content:
          "Complete Kashmir travel guide — best seasons to visit, what to pack, safety tips, local customs, route planning, and interactive checklists from local drivers.",
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

interface ChecklistItem {
  id: string;
  text: string;
  detail: string;
}

interface ChecklistSection {
  title: string;
  description: string;
  icon: string;
  items: ChecklistItem[];
}

const checklistsData: Record<string, ChecklistSection> = {
  firstTimer: {
    title: "First-Timer Essentials",
    description: "Crucial regulatory, network, and dress code checks before entering Kashmir.",
    icon: "🎒",
    items: [
      {
        id: "ft-sim",
        text: "Postpaid SIM Card (Mandatory)",
        detail:
          "Prepaid SIM cards from outside J&K do NOT work in Jammu & Kashmir due to security regulations. Verify yours is postpaid or get one at Srinagar airport.",
      },
      {
        id: "ft-cash",
        text: "Physical Cash (INR)",
        detail:
          "Network in remote mountain valleys is patchy, making UPI/cards fail. Keep sufficient cash for small vendors, horse rides, and local guides.",
      },
      {
        id: "ft-maps",
        text: "Offline Maps Installed",
        detail:
          "Download offline maps of Srinagar, Gulmarg, Pahalgam, and Sonmarg on Google Maps or Maps.me before leaving home.",
      },
      {
        id: "ft-clothes",
        text: "Modest Clothing for Shrines",
        detail:
          "Ensure you cover shoulders and knees when visiting Hazratbal shrine or local mosques. A head scarf/rumaal is also helpful.",
      },
      {
        id: "ft-warmth",
        text: "Light jacket for evenings",
        detail:
          "Even in peak summer, Srinagar and mountain stations get breezy and cold after sunset. Keep one layer handy.",
      },
    ],
  },
  adventure: {
    title: "Adventure & Offbeat",
    description:
      "Gear and planning for local treks, high-altitude spots, and offbeat valley exploration.",
    icon: "🥾",
    items: [
      {
        id: "adv-shoes",
        text: "Sturdy Hiking Shoes",
        detail:
          "Crucial for walking on rocky terrain in Aru/Betaab valley, Yusmarg meadows, or walking on snow at Gulmarg Phase 2.",
      },
      {
        id: "adv-meds",
        text: "Motion Sickness Medicines",
        detail:
          "Winding mountain roads to Sonamarg or Pahalgam are famous for triggering motion sickness. Carry Avomine or similar meds.",
      },
      {
        id: "adv-union",
        text: "Local Union Cab Budget",
        detail:
          "Outside cabs can only drop you at Srinagar hotels or main stands. You must book local union cabs for sights inside Pahalgam (Aru/Betaab) or Sonamarg (Zero Point).",
      },
      {
        id: "adv-power",
        text: "Heavy-duty Powerbank",
        detail:
          "Cold weather rapidly drains phone batteries, especially when taking high-res photos. Keep a 10,000mAh+ bank handy.",
      },
      {
        id: "adv-water",
        text: "Hydration Flask",
        detail:
          "High-altitude sickness is best fought by drinking water regularly. Carry a reusable water bottle.",
      },
    ],
  },
  seasonal: {
    title: "Seasonal Packing",
    description: "Essential clothing & gear tailored to when you are visiting.",
    icon: "🧥",
    items: [
      {
        id: "sea-heavy",
        text: "Winter: Heavy Woolens & Thermals",
        detail:
          "For Nov–Feb. High-quality thermals, down jackets, woolen socks, beanies, and gloves are absolute life-savers.",
      },
      {
        id: "sea-boots",
        text: "Winter: Waterproof Snow Boots",
        detail:
          "Highly recommended for walking on snow in Gulmarg. You can rent them at Tangmarg/Gulmarg for around ₹100–200/day.",
      },
      {
        id: "sea-summer",
        text: "Summer: Cottons & Sun protection",
        detail:
          "For Jun–Aug. High altitude sun burns easily. Carry sunscreen (SPF 50+), UV-polarized sunglasses, and light jackets.",
      },
      {
        id: "sea-rain",
        text: "Autumn/Monsoon: Compact Umbrella",
        detail:
          "Weather in the Himalayas changes in minutes. Sudden brief showers can catch you off guard.",
      },
      {
        id: "sea-shopper",
        text: "Saffron & Walnut Carry Bag",
        detail:
          "Leave extra room in your luggage to carry home authentic Kashmiri saffron, walnuts, and almonds!",
      },
    ],
  },
};

function GuidePage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"firstTimer" | "adventure" | "seasonal">("firstTimer");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("almadaan-travel-checklists");
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading checklist state:", e);
    }
  }, []);

  // Save to localStorage
  const toggleItem = (id: string) => {
    const nextState = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(nextState);
    try {
      localStorage.setItem("almadaan-travel-checklists", JSON.stringify(nextState));
    } catch (e) {
      console.error("Error saving checklist state:", e);
    }
  };

  const resetActiveList = () => {
    const listItems = checklistsData[activeTab].items;
    const nextState = { ...checkedItems };
    for (const item of listItems) {
      nextState[item.id] = false;
    }
    setCheckedItems(nextState);
    try {
      localStorage.setItem("almadaan-travel-checklists", JSON.stringify(nextState));
    } catch (e) {
      console.error("Error saving checklist state:", e);
    }
  };

  // Calculations
  const activeSection = checklistsData[activeTab];
  const activeItems = activeSection.items;
  const checkedActiveCount = activeItems.filter((item) => checkedItems[item.id]).length;
  const progressPercent =
    activeItems.length > 0 ? Math.round((checkedActiveCount / activeItems.length) * 100) : 0;

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

      {/* Interactive Checklist Widget */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-panel p-6 shadow-soft sm:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="section-kicker">Interactive planner</p>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Travel Prep Checklists
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Save your progress in your browser as you prepare for the trip.
              </p>
            </div>
            {checkedActiveCount > 0 && (
              <button
                type="button"
                onClick={resetActiveList}
                className="flex items-center gap-1.5 self-start rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-destructive hover:text-destructive active:scale-95 sm:self-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset List
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-2 border-b border-border pb-4 mb-6">
            {(Object.keys(checklistsData) as Array<keyof typeof checklistsData>).map((key) => {
              const sec = checklistsData[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`flex flex-col items-center gap-1 rounded-xl p-3 text-center transition border ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-transparent text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span className="text-2xl">{sec.icon}</span>
                  <span className="text-xs font-bold leading-tight sm:text-sm">{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Alert for Mandatory SIM rules if firstTimer active */}
          {activeTab === "firstTimer" && (
            <div className="mb-6 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-800 dark:text-amber-300">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <span className="font-bold">Important Network Note: </span>
                Prepaid SIM cards issued outside Jammu &amp; Kashmir will not have any network
                signal once you enter Srinagar. Postpaid connection is mandatory to keep in touch
                with your driver.
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Preparation Progress</span>
              <span className="text-primary">
                {progressPercent}% Completed ({checkedActiveCount}/{activeItems.length})
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent-strong transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Item Cards */}
          <div className="grid gap-3">
            {activeItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`chk-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                    isChecked
                      ? "border-primary/50 bg-primary/5 dark:bg-primary/5/10"
                      : "border-border/60 bg-card hover:border-primary/40"
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="h-5 w-5 text-primary" />
                    ) : (
                      <Square className="h-5 w-5 text-muted-foreground" />
                    )}
                  </span>
                  <div>
                    <h3
                      className={`font-semibold text-sm ${isChecked ? "text-primary line-through" : "text-foreground"}`}
                    >
                      {item.text}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Complete celebration block */}
          {progressPercent === 100 && (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 animate-bounce" />
              <div>
                <h4 className="font-bold text-sm">All set for Kashmir! 🏔️</h4>
                <p className="text-xs mt-1">
                  You have checked off all the critical preparation items. Send us your custom
                  itinerary now!
                </p>
              </div>
            </div>
          )}
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
