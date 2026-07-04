# PWA Viagem EUA 2027 — Data Validation & Constraint Specs

## Overview
This document formalizes all data validation rules, constraints, and cross-file dependencies discovered in the test suite and source code.

---

## 1. DAYS DATA STRUCTURE

### Array Structure
- **Total:** Exactly 33 days
- **Order:** Sequential, numbered 1–33 in array order
- **Required fields per day object:**
  - `day` (number): 1–33, must match array index + 1
  - `title` (string): Format "Dia N — <description>"
  - `location` (string): Non-empty string
  - `route` (string): Non-empty string
  - `note` (string): Non-empty string
  - `region` (string): One of `['ny', 'ut', 'pnw', 'ca', 'nv']`
  - `items` (array): Min 5 items per day
  - `photo` (string): Path to photo file (e.g., `img/dia-NN.jpg`)

### Optional Fields
- `tips` (array): Array of strings (tips for the day)
- `chargeStops` (array): For driving days, array of objects:
  - `name` (string): Supercharger location name
  - `leg` (string): Route leg description
  - `critical` (boolean): If true, must have `note` with ⚠️ or "100%"

### Item Structure (required for each item in `items` array)
- `time` (string): Non-empty time string (e.g., "07:00", "~09:00")
- `text` (string): Non-empty description (should start with emoji prefix)
- `type` (string): One of `['', 'highlight', 'food', 'charge', 'drive']`

### Validation Rules
1. **Sequential numbering:** `days[i].day === i + 1` for all i
2. **Title format:** Must start with "Dia " + day number + " — "
3. **Region sequence:** Must follow geographic route
   - Days 1–4: `ny` (New York)
   - Days 5–9: `ca` (San Francisco/Redwood)
   - Days 10–15: `pnw` (Pacific Northwest)
   - Days 16–21: `ut` (Utah)
   - Days 22–24: `nv` (Nevada)
   - Days 25–33: `ca` (California)
4. **Activity count:** Each day ≥ 5 items
5. **Food items:** Each day (except day 33) must have ≥ 1 item with `type === 'food'`
6. **Driving days:** Days with drive type items [5,8,11,12,13,15,16,19,23,27,30] must have ≥ 1 item with `type === 'drive'`
7. **Emoji prefix:** Activity text should start with emoji (required for highlights/food)

### Known Key Constraints
- **Day 1 title:** Must include "21/01" (start date)
- **Day 33 title:** Must include "22/02" (end date)
- **Day 5:** Must have flight NYC → LAX
- **Day 33:** Must have return flight (✈️ indicator)
- **Last day item:** Day 33 is exempt from food check (flight day)

---

## 2. DAY PHOTOS MAPPING (`dayPhotos`)

### Structure
- **Key:** Day number (1–33)
- **Value:** File path string (e.g., `img/dia-01.jpg`)
- **Coverage:** All 33 days must have entry

### Validation Rules
1. **Completeness:** All keys 1–33 must exist
2. **File existence:** All referenced files must exist on disk
3. **Format:** JPG images in `./img/` directory
4. **Naming:** Typically `dia-01.jpg` through `dia-33.jpg`
5. **Consistency:** Must match `photo` field in day objects

---

## 3. HOTELS DATA STRUCTURE

### Array Structure
- **Total:** Exactly 17 hotels
- **Order:** Sequential check-in dates
- **Required fields:**
  - `num` (number): 1–17, must match array index + 1
  - `name` (string): Hotel name
  - `checkin` (string): Date in format DD/MM (e.g., "21/01")
  - `checkout` (string): Date in format DD/MM
  - `nights` (number): Duration

### Validation Rules
1. **Sequential numbering:** `hotels[i].num === i + 1`
2. **Contiguity:** `hotels[i].checkin === hotels[i-1].checkout` (no gaps)
3. **Total nights:** Sum of all nights === 32
4. **Date range:** First checkin "21/01", last checkout "22/02"
5. **First hotel:** Name must include "Marriott" (NYC check-in)

---

## 4. PARKS DATA STRUCTURE

### Array Structure
- **Total:** Exactly 12 national parks
- **Required fields:**
  - `name` (string): Park name
  - `days` (string): Range spec (e.g., "5-7" or "13, 14" or "5–7")
  - `highlights` (string): Description of park highlights

### Validation Rules
1. **Day references valid:** Day numbers in range must be 1–33
2. **Parks list:** Must include:
   - Redwood (days 8–9)
   - Mt. Rainier (day 12)
   - Olympic (days 12–13)
   - Canyonlands (day 17)
   - Arches (day 18)
   - Capitol Reef (day 19)
   - Bryce Canyon (days 19–20)
   - Zion (days 20–21)
   - Grand Canyon (day 22)
   - Death Valley (day 24)
   - Sequoia (day 26)
   - Yosemite (days 27–28)

---

## 5. SUPERCHARGERS DATA STRUCTURE

### Array Structure
- **Total:** Exactly 24 charging stations
- **Required fields:**
  - `day` (number): 1–33 (when charging occurs)
  - `name` (string): Location name
  - `leg` (string): Route leg (e.g., "LAX → Zion")
  - `critical` (boolean): Whether charging is mandatory
  - `note` (string, conditional): If `critical === true`, must contain ⚠️ or "100%"

### Validation Rules
1. **Day range:** All days in [1, 33]
2. **Ordering:** Array must be sorted by day (non-decreasing)
3. **Critical flag enforcement:** If `critical === true`:
   - `note` field must exist
   - `note` must include ⚠️ or "100%" warning
4. **Non-empty:** All string fields must be non-empty

---

## 6. MANIFEST.JSON CONSTRAINTS

### Required Fields
- `name` (string): Full app name
- `short_name` (string): ≤12 chars (Windows taskbar, some displays)
- `start_url` (string): Must be "./"
- `display` (string): Must be "standalone"
- `lang` (string): Must be "pt-BR"
- `scope` (string): Must be "./"
- `icons` (array): Minimum 2 icons (192x192, 512x512)
- `background_color` (string): Hex color #RRGGBB
- `theme_color` (string): Hex color #RRGGBB
- `orientation` (string): Must be "portrait"
- `description` (string): Must mention "33 dias" (match trip duration)

### Icon Validation
1. **192x192:** Required, purpose "any"
2. **512x512:** Required, purpose "any" or "maskable"
3. **Maskable icon:** Required, typically 512x512
4. **File existence:** All `src` paths must exist

---

## 7. SERVICE WORKER (SW.JS) CONSTRAINTS

### Cache Naming
- **Pattern:** `viagem-eua-2027-v<N>` where N is semantic version major
- **Tile cache:** `viagem-tiles-v1` (constant)
- **Update rule:** Increment N whenever modifying:
  - `index.html`
  - `app.js`
  - `pwa.js`
  - `sync.js`
  - `storage.js`
  - `styles.css`
  - `manifest.json`
  - `data.js`

### Critical Assets (CRITICAL_ASSETS array)
Must include:
- `.` (root)
- `./index.html`
- `./data.js`
- `./manifest.json`
- `./app.js`, `./pwa.js`, `./sync.js`
- `./icons/icon-192.png`, `./icons/icon-512.png`
- `./lib/leaflet.js`, `./lib/leaflet.css`
- `./fonts/inter.woff2`

### Assets to Cache (ASSETS_TO_CACHE array)
- All day photos (img/dia-NN.jpg, all 33)
- All activity photos (img/activities/*.jpg)
- All markers (lib/marker-icon.png, lib/marker-icon-2x.png, lib/marker-shadow.png)
- No duplicates allowed

### Event Handlers Required
1. `install` event: Must call `self.skipWaiting()`
2. `activate` event: Must call `self.clients.claim()`
3. `fetch` event: Must handle navigation & image fallbacks

### Fallback Content
- **Navigation fallback:** Must serve `./index.html` offline
- **Image fallback:** Must serve SVG placeholder (data:image/svg+xml) offline
- **Tile caching:** Must cache map tiles (cartocdn or OpenStreetMap)

---

## 8. INDEX.HTML CONSTRAINTS

### Meta Tags Required
- `<!DOCTYPE html>` (first line)
- `lang="pt-BR"` on `<html>`
- `charset="UTF-8"` (meta)
- `viewport` with `width=device-width`
- `theme-color` meta (hex color)
- `apple-mobile-web-app-capable`
- `apple-touch-icon` link

### Links & Resources
- `link[rel="manifest"]` → `manifest.json`
- Preload hero image (`rel="preload"`, `as="image"`)
- Link `styles.css`
- Load `leaflet.css` before scripts

### Script Loading Order (CRITICAL)
```
1. data.js
2. storage.js
3. trails.js (if used)
4. app.js
5. pwa.js
6. sync.js
```

### DOM Elements Required
- `#sec-home` (Home tab section)
- `#sec-map` (Map tab section)
- `#sec-explore` (Explore tab section)
- `#sec-settings` (Settings tab section)
- `#heroImg` (Hero image with day photo)
- `#daySelector` (Day pill container)
- `#dayContainer` (Content for current day)
- `#sheet` (Detail sheet modal)
- `#sheetOverlay` (Sheet overlay)
- `#sheetBody` (Sheet content area)
- `#lightbox` (Image lightbox)
- `#toast` (Toast notification area)
- `#offlineBar` (Offline indicator)
- `#map` (Leaflet map container)
- `#searchInput` (Search box)
- `#syncUrlInput` (Sync URL input)

### Accessibility (a11y)
- Tab bar has `role="tablist"`
- 4 tab items with `role="tab"`
- `aria-selected` on active tab
- Tabs have meaningful `aria-label`
- Images have `alt` text (non-decorative)
- Buttons have text or `aria-label`

### CSP Headers (if used)
- Allow `https://*.basemaps.cartocdn.com` (map tiles)
- Allow `https://server.arcgisonline.com` (satellite tiles)
- Allow `'self'` for scripts/styles

---

## 9. APP.JS & CORE FUNCTIONS

### Required Global Functions
- `showDay(dayNum)` — Display specific day
- `switchTab(tabName)` — Switch between tabs
- `renderDaySelector()` — Render day pills
- `renderDay(dayNum)` — Render day activities
- `toggleCheck(dayNum, itemIdx)` — Mark activity done
- `toggleFav(dayNum, itemIdx)` — Mark activity favorite
- `openDetail(dayNum, itemIdx)` — Open detail sheet
- `closeSheet()` — Close detail sheet
- `initMap()` — Initialize Leaflet map
- `searchItems(query)` — Search activities
- `renderExplore()` — Render Explore tab
- `shareDay(dayNum)` — Share day data
- `openLightbox(imagePath)` — Open image viewer
- `findPlaceInfo(placeName)` — Lookup place details
- `findPhoto(placeName)` — Find photo for place
- `getTodayDay()` — Get current trip day (if during trip)
- `updateCountdown()` — Update countdown badge
- `exportUserData()` — Export user state (JSON)
- `importUserData(jsonStr)` — Import user state
- `escapeHtml(str)` — Sanitize HTML (security)

### Global Objects
- `window.days` — Trip days array
- `window.hotels` — Hotels array
- `window.parks` — National parks array
- `window.superchargers` — Charging stations array
- `window.dayPhotos` — Day photo mapping
- `window.activityPhotos` — Activity photo mapping
- `window.placeInfo` — Location details
- `window.dayCoords` — Day latitude/longitude
- `window.dayStats` — Day statistics (km, hotel, etc.)
- `window.dayRouteIdx` — Route index per day
- `window.dayRouteSegments` — Encoded polylines per day

### Keyboard Navigation
- `ArrowLeft` / `ArrowRight` — Navigate days
- `Escape` — Close sheet
- `Tab` — Focus trap in sheet

### Touch Gestures
- **Swipe left/right (60px min):** Navigate days
- **Pinch-to-zoom:** Image lightbox zoom
- **Pull-to-dismiss:** Drag sheet down to close

---

## 10. STORAGE.JS & SYNC ENGINE CONSTRAINTS

### StorageLayer Global Object
Required methods:
- `get(key)` → value or null
- `set(key, value)` → undefined
- `remove(key)` → undefined
- `clear()` → undefined

Implementation:
- Primary: IndexedDB (using `indexedDB.open`)
- Fallback: localStorage
- Maintain `this.db` reference

### SyncEngine Global Object
Required methods:
- `track(key, value)` → queue item
- `push()` → async, send queue to server
- `pull()` → async, fetch updates from server
- `mergeRemote(changes)` → apply remote changes

Track Format:
- `key` (string): Identifier (e.g., "check-5-2" for day 5 item 2)
- `value` (string): New value ("0" or "1")
- `ts` (number): Timestamp when tracked

### Sync Constraints
1. **Queue storage:** Persist in `localStorage['syncQueue']` as JSON array
2. **Debounce:** 3000ms before push (combine rapid updates)
3. **Deduplication:** Keep latest value per key before sending
4. **Batch size:** Maximum 15 changes per HTTP request
5. **Retry strategy:**
   - Exponential backoff: 3s → 6s → 12s → (cap at 30s)
   - Up to 5 retry attempts
   - Reset counter on success
6. **Atomic snapshot:** `queue.slice(0, snapshotLen)` (not destructive during send)
7. **Race condition fix:** Items added during push stay in queue
8. **Offline:** Queue locally; no `navigator.onLine` check
9. **HTTP method:** POST preferred (with GET fallback for Apps Script)
10. **Pull behavior:** If queue not empty, push first, then pull

### Tracked Keys
- `check-<day>-<itemIdx>` → "0" or "1" (activity done)
- `fav-<day>-<itemIdx>` → "0" or "1" (activity favorite)
- `note-<day>` → text string (day note)

### Timestamp Tracking
- Save `_ts_<key>` in localStorage when tracking
- Use for deduplication (keep latest timestamp)

---

## 11. PWA.JS & OFFLINE FEATURES

### Service Worker Registration
- Register `./sw.js`
- Listen for `controlling` → show update toast
- Update toast: click button → `window.location.reload()`
- NO automatic reload (user-triggered only)

### Online/Offline Listeners
- Listen to `'online'` event
- Listen to `'offline'` event
- Show/hide offline indicator

### Update Toast
- Element structure: Avoid inline `onclick` (use `addEventListener`)
- Text: "Nova versão disponível"
- Action: Reload button

### Update frequency
- Poll every 30000ms (30 seconds)

---

## 12. DATA INTEGRITY CHECKS

### Date Constraints
- **Trip start:** 21/01 (Thursday)
- **Trip end:** 22/02 (Monday)
- **Duration:** 33 days
- **Hotel nights:** 32 (no hotel on day 33)

### Activity Totals
- **Total items across all days:** > 300
- **Activity photos (activityPhotos):** ≥ 100 entries
- **Place info (placeInfo):** ≥ 100 entries
  - Must include: "Golden Gate Bridge", "Grand Canyon", "Times Square"

### Image Files
- All day photos must exist: `img/dia-01.jpg` through `img/dia-33.jpg`
- All activity photos must exist (referenced in `activityPhotos`)
- Icons exist: `icons/icon-192.png`, `icons/icon-512.png`
- Fonts exist: `fonts/inter.woff2`
- Leaflet markers: `lib/marker-icon.png`, `lib/marker-icon-2x.png`, `lib/marker-shadow.png`

### Cross-File Consistency
- `days.length` === 33 === `dayPhotos` keys
- `hotels` total nights === 32
- `parks` day references are valid (1–33)
- `superchargers.length` === 24
- All SW cache assets exist on disk
- All manifest icons exist

---

## 13. CSS & THEMING

### CSS Variables (in `:root`)
Required:
- `--bg` (background, dark: #191919)
- `--text` (text, light: #e3e3e3)
- `--blue` (accent blue)
- `--gold` (accent gold)
- `--red` (accent red)
- `--green` (accent green)
- `--radius` (border-radius)

### Font
- `font-family: 'Inter'` (main font)
- `inter.woff2` loaded and cached
- No system font fallback

### Theme
- Always dark mode (no toggle)
- No light theme support

---

## 14. ESLINT RULES

### Enforced Rules
```json
{
  "no-eval": "error",
  "no-implied-eval": "error",
  "no-new-func": "error",
  "no-script-url": "error",
  "no-unused-vars": "warn",
  "no-console": "off"
}
```

### Violations
- `eval()` forbidden
- `new Function()` forbidden
- `eval` in strings forbidden
- `javascript:` URLs forbidden

---

## 15. TEST SUITE COVERAGE

### tests.js Sections
1. **data.js — Estrutura dos Dados** (9 tests)
2. **data.js — Fotos dos Dias** (2 tests)
3. **data.js — Hotéis** (6 tests)
4. **data.js — Parques Nacionais** (3 tests)
5. **data.js — Superchargers** (4 tests)
6. **sw.js — Service Worker** (15 tests)
7. **manifest.json — PWA Manifest** (12 tests)
8. **index.html — Meta Tags & Head** (10 tests)
9. **index.html — CSS & Theme** (3 tests)
10. **index.html — Core Functions** (19 tests)
11. **index.html — Day Coordinates** (3 tests)
12. **index.html — Activity Photos** (3 tests)
13. **index.html — Place Info** (3 tests)
14. **index.html — HTML Structure** (15 tests)
15. **index.html — Accessibility** (4 tests)
16. **index.html — SyncEngine** (11 tests)
17. **index.html — Offline Support** (7 tests)
18. **index.html — Swipe Gesture** (5 tests)
19. **Cross-file — Consistência** (20 tests)
20. **Validação Lógica dos Dados** (10 tests)

**Total:** 175 tests across 20 sections

---

## SUMMARY TABLE

| Component | Count | Status |
|-----------|-------|--------|
| Days | 33 | Validated |
| Hotels | 17 | Validated |
| Parks | 11 | Validated |
| Superchargers | 24 | Validated |
| Day Photos | 33 | Must exist |
| Activity Photos | ≥100 | Must exist |
| Place Info | ≥100 | Must exist |
| Tests | 175+ | Comprehensive |
| Test Sections | 20 | Full coverage |

