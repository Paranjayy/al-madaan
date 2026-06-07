# Technical Handover Guide - Sahil Hamdani

Hi Sahil! This guide documents the technical architecture of the **Al Madaan Ventures** site so you can easily modify or scale it.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19 + Vite 7).
- **Styling**: Tailwind CSS + Custom variable tokens in [src/styles.css](file:///Users/paranjay/Developer/al-madaan/src/styles.css).
- **Maps**: Leaflet + OpenStreetMap (No Google Maps API charges. Standard directions use deep link integration instead).
- **Package Manager**: Bun (recommended) or npm.

## Project Structure

- `/src/routes/`: File-based routes.
  - `__root.tsx`: Core layout shell, metadata declarations.
  - `index.tsx`: Homepage carrying Leaflet map and Instagram widgets.
  - `destinations.$slug.tsx` & `packages.$slug.tsx`: Dynamic routing detail pages.
  - `sitemap[.]xml.ts`: Dynamic sitemap generator.
- `/src/components/`: Reusable components (Fare Calculator, Trip Planner form, Leaflet Map, Theme Toggle).
- `/src/lib/site-content.ts`: Localized translation dictionaries (English, Hindi, Kashmiri, Urdu).

## Critical Implementation Notes

### 1. Leaflet Map & SSR Safeguard

Leaflet accesses the `window`/`document` DOM APIs directly on initialization, which crashes Node-based SSR builds. To prevent this, the map component wrapper in `src/components/kashmir-map.tsx` dynamically imports Leaflet inside a client-side `useEffect` hook:

```typescript
useEffect(() => {
  if (!isClient) return;
  import("leaflet").then((L) => {
    // Map setup logic here
  });
}, [isClient]);
```

### 2. Vercel Build Target

The `@lovable.dev/vite-tanstack-config` package defaults Nitro presets to `cloudflare`. To build successfully for Vercel, the build script in `package.json` prepends the `NITRO_PRESET=vercel` flag:

```json
"build": "NITRO_PRESET=vercel vite build"
```

### 3. Adding New Routes

To create a new route, simply create a file in `src/routes/` (e.g. `src/routes/about.tsx`). The TanStack Router CLI will automatically generate the corresponding entries in `src/routeTree.gen.ts` when running `bun run dev` or `bun run build`.

## Development Commands

```bash
# Start local development server
bun run dev

# Run Prettier format check
bun run format

# Run linter
bun run lint

# Compile production build
bun run build
```
