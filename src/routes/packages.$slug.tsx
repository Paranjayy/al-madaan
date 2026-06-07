import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, MessageCircle, Users, CheckCircle, Info } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

interface PackageDetails {
  name: string;
  days: string;
  people: string;
  description: string;
  longDescription: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  priceEstimate: string;
  inclusions: string[];
  exclusions: string[];
  tips: string[];
}

const packageDb: Record<string, PackageDetails> = {
  "srinagar-express": {
    name: "Srinagar Express",
    days: "1 Day",
    people: "1-4 pax",
    description: "Dal Lake, Mughal Gardens, old-city culture, and shrines.",
    longDescription:
      "Ideal for travelers with limited time or as an acclimatization introduction on your first day in the valley. This curated experience brings you the best of Srinagar's heritage, standard sightseeing, and local markets.",
    highlights: [
      "Shikara ride on Dal Lake",
      "Nishat & Shalimar Mughal Gardens",
      "Hazratbal Shrine & Jamia Masjid",
      "Shankaracharya Temple Viewpoint",
    ],
    itinerary: [
      {
        day: "Morning",
        title: "Shankaracharya Temple & Mughal Gardens",
        desc: "Start early with panoramic views of the city from the temple hill, followed by walks through the historic Nishat Bagh and Shalimar Bagh.",
      },
      {
        day: "Afternoon",
        title: "Old City Heritage Walk & Lunch",
        desc: "Savor local Wazwan dishes or street food, and visit the historical wooden architecture of Jamia Masjid and Shah-e-Hamdan Shrine.",
      },
      {
        day: "Evening",
        title: "Dal Lake Shikara Ride",
        desc: "Enjoy a relaxing 1-hour boat ride on Dal Lake, visiting floating gardens and witnessing the sunset over the Zabarwan range.",
      },
    ],
    priceEstimate: "₹2,000 - ₹2,500 total (Includes full day cab, fuel, and driver guide)",
    inclusions: [
      "Dedicated Toyota Dzire cab",
      "Fuel and driver allowance",
      "Hotel pick & drop within Srinagar",
    ],
    exclusions: [
      "Shikara ride charges (standard Union rates apply)",
      "Garden entry tickets",
      "Meals and personal items",
    ],
    tips: [
      "Start before 9:00 AM to avoid local market traffic.",
      "Respect local dress codes when entering shrines.",
    ],
  },
  "gulmarg-snow-day": {
    name: "Gulmarg Snow Day",
    days: "1 Day",
    people: "1-4 pax",
    description: "Full day alpine mountain travel and Gondola ride assistance.",
    longDescription:
      "A gorgeous trip to the meadow of flowers, transforming into India's premier ski hub during winters. We manage the scenic drive and guide you on parking, tickets, and safety.",
    highlights: [
      "Scenic drive through Tangmarg pine roads",
      "Gondola cable car ride (Phase 1 & 2)",
      "Snow sledging & ski viewpoints",
      "Local wooden cottages & shrines",
    ],
    itinerary: [
      {
        day: "Morning",
        title: "Srinagar to Gulmarg Drive",
        desc: "A 2-hour picturesque climb. We stop at Tangmarg for snow chain fitting (if winter) and local tea.",
      },
      {
        day: "Mid-day",
        title: "Gondola Experience & Snow Fun",
        desc: "Ascend to Phase 1 (Kungdoor) and Phase 2 (Apharwat Peak) at 14,000 ft. Enjoy skiing, sledding or panoramic views.",
      },
      {
        day: "Afternoon",
        title: "St. Mary's Church & Local Lunch",
        desc: "Walk around the golf course, visit the historic British-era church, and return back to Srinagar by sunset.",
      },
    ],
    priceEstimate: "₹2,600 - ₹2,800 total (Includes return transport)",
    inclusions: [
      "Toyota Dzire transport",
      "Driver guide assistance",
      "Toll taxes & mountain permits",
    ],
    exclusions: [
      "Gondola tickets (book online in advance!)",
      "Pony rides or local ATV hires",
      "Ski guides and activity gear",
    ],
    tips: [
      "Gondola tickets sell out weeks in advance; always book before you travel.",
      "Carry heavy woolens and waterproof shoes (available for rent in Tangmarg).",
    ],
  },
  "pahalgam-valley": {
    name: "Pahalgam Valley",
    days: "1 Day",
    people: "1-4 pax",
    description: "Pine forests, Betaab & Aru Valleys, and Lidder river points.",
    longDescription:
      "Pahalgam offers unparalleled landscapes of dense conifer forests and the rushing Lidder river. This day-trip takes you from Srinagar through the saffron fields of Pampore to the heart of shepherd valleys.",
    highlights: [
      "Saffron fields of Pampore (in season)",
      "Lidder River rafting point",
      "Aru Valley & Betaab Valley",
      "Martand Sun Temple detour",
    ],
    itinerary: [
      {
        day: "Morning",
        title: "Srinagar to Pahalgam via Pampore",
        desc: "Drive along national highway, view saffron plateaus, apple orchards, and stop at Lidder rafting points.",
      },
      {
        day: "Mid-day",
        title: "Valleys Tour (Aru, Betaab, Chandanwari)",
        desc: "Transfer to local Union cabs to visit Aru Valley's quiet meadows and the movie-famous Betaab Valley.",
      },
      {
        day: "Afternoon",
        title: "Martand Sun Temple detour",
        desc: "On our return journey, we stop at the ancient ruins of the 8th-century Martand temple.",
      },
    ],
    priceEstimate: "₹3,200 - ₹3,500 total (Includes return transport)",
    inclusions: ["Full day Dzire return cab", "Fuel & driver night allowance", "Highway toll tax"],
    exclusions: [
      "Local Pahalgam Union cab (required for Aru/Betaab)",
      "Pony charges",
      "Rafting tickets",
    ],
    tips: [
      "Ask the driver to stop at a local apple orchard for fresh juice.",
      "Wear comfortable walking shoes for meadow treks.",
    ],
  },
  "classic-kashmir": {
    name: "Classic Kashmir 4N/5D",
    days: "5 Days",
    people: "Family friendly",
    description: "Complete signature tour covering Srinagar, Gulmarg, and Pahalgam.",
    longDescription:
      "The ultimate introductory multi-day itinerary. Spend your nights in traditional houseboats and alpine hotels, traveling smoothly in our dedicated taxi cab with the same driver companion throughout.",
    highlights: [
      "Traditional Dal Lake Houseboat stay",
      "Full day excursions to Gulmarg & Sonmarg",
      "Overnight stay in Pahalgam",
      "Airport transfers included",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Srinagar Arrival & Houseboat check-in",
        desc: "Airport pickup, transfer to houseboat, evening Shikara ride and Srinagar local gardens sightseeing.",
      },
      {
        day: "Day 2",
        title: "Srinagar to Gulmarg Excursion",
        desc: "Full-day mountain trip to Gulmarg. Gondola cable car ride, return to Srinagar hotel for night stay.",
      },
      {
        day: "Day 3",
        title: "Srinagar to Pahalgam Transfer (Overnight)",
        desc: "Scenic drive to Pahalgam. Check-in to hotel, visit Lidder river shores, local market walk and dinner.",
      },
      {
        day: "Day 4",
        title: "Pahalgam Valleys & Return to Srinagar",
        desc: "Morning visit to Aru and Betaab Valley. Afternoon return drive to Srinagar hotel.",
      },
      {
        day: "Day 5",
        title: "Airport Departure Transfer",
        desc: "Apple shopping stop, check-out from hotel, and drop off at Srinagar International Airport.",
      },
    ],
    priceEstimate: "₹25,000 - ₹28,000 total (Varies by hotel category & seasons)",
    inclusions: [
      "Dedicated taxi throughout the 5 days",
      "Airport transfers",
      "Driver allowance and night halts",
      "Toll taxes & parking",
    ],
    exclusions: [
      "Hotel / Houseboat room charges (can be co-booked on request)",
      "Gondola tickets & activity entry fees",
      "Meals and personal services",
    ],
    tips: [
      "Book at least 3 weeks in advance for summer or peak winter.",
      "We can customize hotels based on your budget (Standard / Deluxe / Luxury).",
    ],
  },
};

export const Route = createFileRoute("/packages/$slug")({
  component: PackageDetailPage,
});

function PackageDetailPage() {
  const { slug } = Route.useParams();
  const pkg = packageDb[slug];

  if (!pkg) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-7xl px-4 py-16 text-center space-y-6">
          <h1 className="text-3xl font-bold">Itinerary not found</h1>
          <p className="text-muted-foreground">
            The package you are looking for does not exist or has been updated.
          </p>
          <Link to="/packages">
            <Button variant="outline" className="border-border">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Packages
            </Button>
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const whatsappMessage = `Hi Al Madaan! I want to book the "${pkg.name}" package (${pkg.days}). Please let me know the best rates and customize options.`;
  const whatsappUrl = `https://wa.me/91917006109912?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/packages"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Packages
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {pkg.days} Tour
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">{pkg.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{pkg.longDescription}</p>
            </div>

            {/* Highlights */}
            <div className="surface-card p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Trip Highlights</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-accent-strong shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Suggested Itinerary</h2>
              <div className="relative border-l border-border/80 pl-6 ml-3 space-y-8">
                {pkg.itinerary.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker on timeline */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                      <span className="h-1.5 w-1.5 rounded-full bg-background" />
                    </span>
                    <span className="text-xs font-bold text-accent-strong uppercase block mb-1">
                      {item.day}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Card */}
          <div className="space-y-6">
            <div className="surface-card p-6 space-y-6">
              <div className="border-b border-border/60 pb-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Capacity
                </span>
                <span className="text-sm font-bold text-foreground flex items-center gap-1.5 mt-1">
                  <Users className="h-4 w-4 text-primary" /> {pkg.people}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Cab Fare Estimate
                </span>
                <p className="text-xl font-extrabold text-primary mt-1">{pkg.priceEstimate}</p>
              </div>

              <div className="pt-4 border-t border-border/60">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-block"
                >
                  <Button
                    variant="hero"
                    className="w-full py-3 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" /> Customize & Book on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="info-panel space-y-4">
              <h4 className="font-bold text-foreground">Pricing Policy</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-primary block">Included:</span>
                  <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-semibold text-destructive block">Excluded:</span>
                  <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                    {pkg.exclusions.map((exc) => (
                      <li key={exc}>{exc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="surface-card p-5 space-y-3 bg-panel/30">
              <h4 className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                <Info className="h-4 w-4 text-accent-strong" /> Local Driver Tips
              </h4>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1.5 leading-relaxed">
                {pkg.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
