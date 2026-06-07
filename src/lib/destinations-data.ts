// Central destination data — single source of truth for the wall + itinerary builder + detail pages

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  distance: string;
  distanceKm: number; // numeric for itinerary calc
  time: string;
  season: string;
  seasonShort: string;
  price: string;
  priceMin: number; // for itinerary cost estimate
  priceMax: number;
  highlights: string[];
  details: string;
  longDescription: string;
  lat: number;
  lng: number;
  activities: string[];
  weatherAlert?: string;
  badge?: string; // e.g. "Most Popular" | "Offbeat Gem" | "Heritage"
}

export const destinations: Destination[] = [
  {
    slug: "srinagar",
    name: "Srinagar",
    tagline: "The Crown of Kashmir",
    image: "/images/destinations/srinagar.jpg",
    distance: "Central Hub",
    distanceKm: 0,
    time: "Your base camp",
    season: "All seasons",
    seasonShort: "Year-round",
    price: "₹900 – ₹2,500",
    priceMin: 900,
    priceMax: 2500,
    highlights: ["Dal Lake Shikara", "Mughal Gardens", "Shankaracharya Temple", "Hazratbal Shrine"],
    details: "The summer capital of J&K. Your base for all Kashmir sightseeing.",
    longDescription:
      "Srinagar is the summer capital of Jammu and Kashmir, resting gracefully on the banks of the River Jhelum. Famed for its tranquil houseboats, Mughal gardens, historic wooden shrines, and bustling craft bazaars, it serves as the ultimate starting point for every traveler's Kashmir trip.",
    lat: 34.0837,
    lng: 74.7973,
    activities: [
      "Take a shikara ride at sunset to the floating markets.",
      "Explore Mughal heritage gardens designed by Emperor Jahangir.",
      "Walk the winding lanes of Old City (Shehr-e-Khas) to admire architectural legacy.",
    ],
    badge: "Most Popular",
  },
  {
    slug: "gulmarg",
    name: "Gulmarg",
    tagline: "World's Highest Gondola",
    image: "/images/destinations/gulmarg.jpg",
    distance: "52 km from Srinagar",
    distanceKm: 52,
    time: "~2 hrs drive",
    season: "Dec – Mar (snow) / May – Sep (green)",
    seasonShort: "All year",
    price: "₹2,500 – ₹2,800",
    priceMin: 2500,
    priceMax: 2800,
    highlights: [
      "Gondola Cable Car",
      "Skiing & Snowboarding",
      "Alpine Meadows",
      "Biosphere Reserve",
    ],
    details: "Ski paradise — highest operating cable car in the world.",
    longDescription:
      "Nestled in the Pir Panjal range, Gulmarg is an alpine paradise. Renowned for carrying visitors up to Phase 1 (Kungdoor) and Phase 2 (Apharwat Peak) on one of the world's highest cable cars, it turns into a stunning snow wonderland during winter and a green golf meadow in summer.",
    lat: 34.0484,
    lng: 74.3805,
    activities: [
      "Ascend to Apharwat peak via Gulmarg Gondola.",
      "Try local snowboarding or snow-sled rides.",
      "Visit the high-altitude St. Mary's stone church.",
    ],
    weatherAlert:
      "Snow alert: Mountain passes can get blocked in heavy snowfall. Snow chains are fitted on cab wheels at Tangmarg.",
    badge: "Winter Favourite",
  },
  {
    slug: "sonmarg",
    name: "Sonmarg",
    tagline: "Meadow of Gold",
    image: "/images/destinations/sonmarg.jpg",
    distance: "80 km from Srinagar",
    distanceKm: 80,
    time: "~2.5 hrs drive",
    season: "Apr – Oct",
    seasonShort: "Apr – Oct",
    price: "₹2,800 – ₹3,200",
    priceMin: 2800,
    priceMax: 3200,
    highlights: ["Thajiwas Glacier", "Zero Point", "Sindh River", "Zoji La Views"],
    details: "The gateway to Ladakh — glaciers, alpine meadows and river trails.",
    longDescription:
      "Sonmarg, translated to 'Meadow of Gold', is located along the bank of the Sindh River. Bordered by snow peaks, it is the historical gateway to Ladakh via Zoji La. Visitors love trekking or riding ponies to the foot of Thajiwas Glacier.",
    lat: 34.3012,
    lng: 75.2987,
    activities: [
      "Trek to the pristine Thajiwas Glacier on foot or horseback.",
      "Drive to Zero Point near Zoji La pass for high alpine views.",
      "Relax on the banks of the rushing Sindh River.",
    ],
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    tagline: "Valley of Shepherds",
    image: "/images/destinations/pahalgam.jpg",
    distance: "95 km from Srinagar",
    distanceKm: 95,
    time: "~2.5 – 3 hrs drive",
    season: "All year",
    seasonShort: "Year-round",
    price: "₹3,000 – ₹3,500",
    priceMin: 3000,
    priceMax: 3500,
    highlights: ["Betaab Valley", "Aru Valley", "Chandanwari", "Lidder River Rafting"],
    details: "Lush pine forests, Lidder river, and the Mini Switzerland of India.",
    longDescription:
      "Pahalgam (the Valley of Shepherds) is a serene resort town set around the convergence of streams from Lidder River and Sheshnag Lake. Famed for its dense pine forests, green meadows, and starting routes of the holy Amarnath Yatra.",
    lat: 34.0161,
    lng: 75.315,
    activities: [
      "Transfer to local union cabs to see Betaab and Aru Valley.",
      "Go trout fishing or river-rafting in Lidder River.",
      "Hike or ride pony up to Baisaran meadow (Mini Switzerland).",
    ],
  },
  {
    slug: "yusmarg",
    name: "Yusmarg",
    tagline: "The Offbeat Meadow",
    image: "/images/destinations/yusmarg.jpg",
    distance: "47 km from Srinagar",
    distanceKm: 47,
    time: "~1.8 hrs drive",
    season: "May – Sep",
    seasonShort: "May – Sep",
    price: "₹2,400 – ₹2,700",
    priceMin: 2400,
    priceMax: 2700,
    highlights: ["Nilnag Lake Trek", "Doodh Ganga Trail", "Horse Riding", "Pine Forest"],
    details: "Untouched alpine meadow — peaceful escape from crowded tourist spots.",
    longDescription:
      "Yusmarg is a quiet alpine meadow untouched by mass commercial tourism. Supposedly visited by Jesus Christ ('Meadow of Jesus'), it is a pine-scented basin surrounded by the snow-capped Pir Panjal peaks.",
    lat: 33.8242,
    lng: 74.6675,
    activities: [
      "Take a peaceful forest walk to the hidden Nilnag Lake.",
      "Trek down to the rocky bed of the rushing Doodh Ganga River.",
      "Hire horses for a forest ride with panoramic mountain borders.",
    ],
    badge: "Offbeat Gem",
  },
  {
    slug: "doodhpathri",
    name: "Doodhpathri",
    tagline: "Meadow of Milk",
    image: "/images/destinations/doodhpathri.jpg",
    distance: "42 km from Srinagar",
    distanceKm: 42,
    time: "~1.5 hrs drive",
    season: "May – Oct",
    seasonShort: "May – Oct",
    price: "₹2,300 – ₹2,600",
    priceMin: 2300,
    priceMax: 2600,
    highlights: ["Shaliganga Rapids", "Rolling Green Hills", "Nature Walks", "Photography Spot"],
    details: "Pristine milky river rapids and emerald green meadows.",
    longDescription:
      "Doodhpathri (Meadow of Milk) gets its name from the Shaliganga River, which churns over rocks creating a rich milky-white froth. With rolling green knolls and pristine pine backdrop, it is one of J&K's cleanest and newest tourist spots.",
    lat: 33.8744,
    lng: 74.5684,
    activities: [
      "Sit by the rushing banks of Shaliganga river rapids.",
      "Explore the vast rolling green meadows on foot.",
      "Savour local hot tea and snacks from shepherd huts.",
    ],
    badge: "Hidden Gem",
  },
  {
    slug: "martand",
    name: "Martand Sun Temple",
    tagline: "8th Century Heritage",
    image: "/images/destinations/martand.jpg",
    distance: "64 km from Srinagar",
    distanceKm: 64,
    time: "~1.8 hrs drive",
    season: "All year",
    seasonShort: "Year-round",
    price: "₹2,500 – ₹3,000",
    priceMin: 2500,
    priceMax: 3000,
    highlights: ["8th Century Ruins", "Pandav Lari", "Valley Panorama", "Greek-Hindu Architecture"],
    details: "Ancient Sun Temple by King Lalitaditya — Greek, Buddhist and Hindu architecture.",
    longDescription:
      "Martand Sun Temple is an exceptionally preserved archaeological monument dedicated to the Sun God, built in the 8th Century by Lalitaditya Muktapida. Resting on an elevated plateau overlooking the Anantnag valley.",
    lat: 33.6934,
    lng: 75.2217,
    activities: [
      "Explore the colonnades and historical central chambers.",
      "Photograph the ancient carvings and temple ruins.",
      "Gaze over the wide plains of Anantnag valley below.",
    ],
    badge: "Heritage",
  },
];
