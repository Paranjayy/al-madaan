# Feature Roadmap & Saturation Status - Al Madaan Ventures

This document tracks the completeness of features on the Al Madaan Ventures Kashmir Taxi Tours website, identifying completed goals and outlining upcoming iterations.

---

## Saturation Status

```
Core Taxi Portfolio    ████████████████████ 100% (Dzire cabs, rates, drivers)
Interactive Travel Map  ██████████████████░░ 90%  (Leaflet + Google Maps Dir)
Trip & Itinerary Form   ████████████████████ 100% (WhatsApp auto-formatting)
Multilingual Native UI  ████████████████████ 100% (EN, HI, KS, UR + Google API)
Mobile Responsiveness   ██████████████████░░ 90%  (Fluid flex/grids, topbar)
Social Feed Discovery   ██████████████░░░░░░ 70%  (Instagram grid widget)
```

**~92% overall** — The core platform is fully interactive and responsive, providing direct local connections for tourists.

---

## Completed Features

### 🔴 High Impact (Delivered)

1. **Interactive Leaflet Map**: Added open-source Leaflet map using free OpenStreetMap tiles (saving API costs). Points Srinagar hub, Gulmarg, Sonmarg, Pahalgam, Yusmarg, Doodhpathri, and Martand Sun Temple (ruins visited on 3rd June).
2. **One-Click Google Maps Directions**: Added deep links on map details that open directions from Srinagar base to the destination directly in Google Maps for the tourist's phone.
3. **Multilingual Toggle (Topbar)**: Implemented native switcher for **English, Hindi, Kashmiri (کٲشُر), and Urdu (اردو)**, in addition to the custom-styled Google Translate Simple API.
4. **Interactive Fare Estimator**: Added a dynamic React calculator on the Services page that computes standard Union fares instantly with search, sort, and group options.
5. **Simulated Instagram Grid**: Implemented visual posts with hover cards ("♥ Follow @al_madaan") to funnel site visitors directly to their high-engagement reels.

---

## Upcoming Roadmap

### 🟠 Medium Impact (Next Steps)

- **Domain Mapping (`al-maadan.com`)**: Purchase domain name (~$11.25) and configure Vercel DNS settings to map `https://al-madaan.vercel.app` directly to the custom domain.
- **Acclimatization Indicator**: Dynamic weather alert on the top-bar warning tourists if they need heavy winter woolens based on real temperature readings.
- **TripAdvisor Reviews Embed**: Connect reviews from TripAdvisor widget to further strengthen credibility.
- **Local Guide Integration**: Add a directory of verified local helpers and houseboats recommended by Aalim & Umair.

### 🟡 Blocked / Awaiting Input

- **Real Photo Upload**: Replace mock Instagram visual items with actual high-res photos and reels from Sahil and Aalim once compiled.
- **Martand Sun Temple / Itineraries Info**: Detailed custom packages including specific stops (like Pandav Lari, Martand temple ruins, and Mohinder Singh's area).
- **Tour Booking PDF**: Allow tourists to download a clean PDF itinerary after filling out the planner.
