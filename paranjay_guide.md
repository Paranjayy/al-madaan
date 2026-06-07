# Al Madaan Ventures - Coordinator Guide

This guide helps you manage and coordinate changes on the Kashmir Taxi Tours website.

## Core Features Implemented

1. **Interactive J&K Route Map**: Built with Leaflet/OpenStreetMap. Users can tap places (Gulmarg, Sonmarg, Pahalgam, Yusmarg, Doodhpathri, and Martand Sun Temple) to reveal travel duration, season details, and native Google Maps directions links.
2. **Dynamic Slugs Routing**: Both packages and destination listings now link to their own standalone detail pages (e.g. `/packages/classic-kashmir` or `/destinations/gulmarg`) to make sharing direct itineraries easy.
3. **WhatsApp Auto-Formulation**: Trip Planner forms compose WhatsApp texts automatically to prevent manual typos.
4. **Interactive Fares Database**: Dynamic client-side sorting, category filtering, and grouping options to make browsing easy on mobile.
5. **Dark / Light Mode**: Seamless theme switching that persists choices locally.

## How to Coordinate Content Updates

When you receive new photos or text updates from the driver:

- **Instagram Gallery**: Swap out placeholders in `src/components/instagram-gallery.tsx` with their real Instagram URLs and captions.
- **Custom Packages**: Modify the package detail database in `src/routes/packages.$slug.tsx` to add specific day-by-day stops.
- **Accclimatization Indicator**: We can add dynamic weather alerts on the top ribbon.

## Pushing Changes to Vercel

Whenever you edit code files, run:

```bash
bun run build
git add .
git commit -m "feat: updated travel details"
git push origin main
```

Vercel is linked to the GitHub repository and will auto-deploy the changes.
