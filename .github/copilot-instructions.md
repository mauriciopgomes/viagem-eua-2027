# Copilot Instructions — Viagem EUA 2027 PWA

## Project Overview

This is a Progressive Web App (PWA) for an interactive 34-day USA road trip itinerary. Built with vanilla HTML/CSS/JS — no frameworks, no build tools.

## Tech Stack

- **HTML/CSS/JS** — Vanilla, no frameworks
- **Service Worker** (`sw.js`) — Precaching with versioned cache names
- **Web App Manifest** (`manifest.json`) — Standalone, dark theme
- **Leaflet.js** — Interactive maps (CDN)
- **Inter** — Font family (Google Fonts CDN)
- **Language** — Portuguese (pt-BR) primary, English data available

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Main PWA page (app shell) |
| `data.js` | All trip data (EN + PT-BR), photos mapping |
| `sw.js` | Service Worker with precache list |
| `manifest.json` | PWA manifest |
| `img/` | Day photos + activity photos |
| `icons/` | App icons (192, 512) |
| `roteiro.md` | Trip notes (markdown) |

## Conventions

- Dark theme: background `#191919`, text `#e3e3e3`
- CSS custom properties in `:root` for all colors
- Mobile-first responsive design
- Emoji-prefixed items in itinerary data
- `<strong>` tags for place names in data strings
- Cache name pattern: `viagem-eua-2027-vN` (increment N on changes)

## PWA Agents Available

Use `@pwa-orchestrator` for cross-cutting tasks, or go directly to:
- `@pwa-service-worker` — Caching, offline, sw.js
- `@pwa-ui` — HTML, CSS, responsive, accessibility
- `@pwa-performance` — Lighthouse, Core Web Vitals
- `@pwa-data` — Trip data, itinerary content
- `@pwa-manifest` — manifest.json, installability
