#!/usr/bin/env node
// Generate KML file for Google My Maps import
// Usage: node export-kml.js → creates viagem-eua-2027.kml

// Load data
const vm = require('vm');
const fs = require('fs');
const dataCode = fs.readFileSync('data.js', 'utf8')
    .replace(/const /g, 'var ');
vm.runInThisContext(dataCode);
initDays();

// Load app.js for coordinates
const appSrc = require('fs').readFileSync('app.js', 'utf8');

// Extract routeCoords from app.js
const routeMatch = appSrc.match(/var routeCoords\s*=\s*\[([\s\S]*?)\];/);
const routeCoords = [];
if (routeMatch) {
    const pairs = routeMatch[1].matchAll(/\[\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\]/g);
    for (const m of pairs) routeCoords.push([parseFloat(m[1]), parseFloat(m[2])]);
}

// Extract dayCoords from app.js
const dcMatch = appSrc.match(/var dayCoords\s*=\s*\{([\s\S]*?)\};/);
const dayCoords = {};
if (dcMatch) {
    const entries = dcMatch[1].matchAll(/(\d+)\s*:\s*\[\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\]/g);
    for (const m of entries) dayCoords[parseInt(m[1])] = [parseFloat(m[2]), parseFloat(m[3])];
}

// Extract scCoords from app.js
const scMatch = appSrc.match(/var scCoords\s*=\s*\{([\s\S]*?)\};/);
const scCoords = {};
if (scMatch) {
    const entries = scMatch[1].matchAll(/"([^"]+)"\s*:\s*\[\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\]/g);
    for (const m of entries) scCoords[m[1]] = [parseFloat(m[2]), parseFloat(m[3])];
}

function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/<[^>]*>/g, ''); }
function escXml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// Region colors
const regionColors = {
    ny: 'ff0000ff',   // red
    nv: 'ff00d4ff',   // gold
    ut: 'ff0080ff',   // orange
    pnw: 'ff00c853',  // green
    ca: 'ffff6040',   // blue
};

// Build KML
let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<name>Viagem EUA 2027 — Road Trip</name>
<description>34 dias: NYC → Vegas → Utah → PNW → SF → PCH → Yosemite → Sequoia → LA (21/01 – 22/02/2027)</description>

<!-- Styles -->
<Style id="route"><LineStyle><color>ff4ecdc4</color><width>4</width></LineStyle></Style>
<Style id="hotel"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/blu-blank.png</href></Icon><scale>1.0</scale></IconStyle></Style>
<Style id="supercharger"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/grn-circle.png</href></Icon><scale>0.8</scale></IconStyle></Style>
<Style id="day-ny"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon><scale>0.9</scale></IconStyle></Style>
<Style id="day-nv"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png</href></Icon><scale>0.9</scale></IconStyle></Style>
<Style id="day-ut"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/orange-circle.png</href></Icon><scale>0.9</scale></IconStyle></Style>
<Style id="day-pnw"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/grn-circle.png</href></Icon><scale>0.9</scale></IconStyle></Style>
<Style id="day-ca"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/blu-circle.png</href></Icon><scale>0.9</scale></IconStyle></Style>
<Style id="park"><IconStyle><Icon><href>https://maps.google.com/mapfiles/kml/paddle/grn-blank.png</href></Icon><scale>1.0</scale></IconStyle></Style>

<!-- ==================== ROTA COMPLETA ==================== -->
<Folder>
<name>🛣️ Rota Completa</name>
<Placemark>
<name>Rota EUA 2027</name>
<styleUrl>#route</styleUrl>
<LineString>
<tessellate>1</tessellate>
<coordinates>
`;

// Route coords (KML uses lng,lat,alt)
routeCoords.forEach(c => { kml += `${c[1]},${c[0]},0\n`; });

kml += `</coordinates>
</LineString>
</Placemark>
</Folder>

<!-- ==================== DIAS ==================== -->
<Folder>
<name>📅 Dias (1-33)</name>
`;

days.forEach(d => {
    const coord = dayCoords[d.day];
    if (!coord) return;
    const items = d.items.filter(i => i.type === 'highlight' || i.type === '').slice(0, 5);
    const highlights = items.map(i => esc(i.text.replace(/<[^>]*>/g, ''))).join('\n• ');
    kml += `<Placemark>
<name>Dia ${d.day} — ${escXml(d.location)}</name>
<description>${escXml(d.title || '')}
${escXml(d.route || '')}
${d.note ? escXml(d.note) : ''}

• ${highlights}</description>
<styleUrl>#day-${d.region}</styleUrl>
<Point><coordinates>${coord[1]},${coord[0]},0</coordinates></Point>
</Placemark>
`;
});

kml += `</Folder>

<!-- ==================== HOTÉIS ==================== -->
<Folder>
<name>🏨 Hotéis (${hotels.length})</name>
`;

// Hotel coordinates (approximate)
const hotelCoords = {
    'Marriott Marquis': [40.7580, -73.9855],
    'Las Vegas': [36.1699, -115.1398],
    'Springdale': [37.1890, -112.9988],
    'Bryce Canyon': [37.6283, -112.1677],
    'Moab': [38.5733, -109.5498],
    'Twin Falls': [42.5558, -114.4701],
    'Centralia': [46.7218, -122.9542],
    'Forks': [47.9504, -124.3855],
    'Cannon Beach': [45.8918, -123.9615],
    'Gold Beach': [42.4074, -124.4218],
    'Crescent City': [41.7558, -124.2026],
    'Eureka': [40.8021, -124.1637],
    'San Francisco': [37.7749, -122.4194],
    'Mariposa': [37.4849, -119.9663],
    'Three Rivers': [36.4519, -118.9054],
    'Los Angeles': [34.0522, -118.2437],
};

hotels.forEach(h => {
    const key = Object.keys(hotelCoords).find(k => h.name.includes(k));
    const coord = key ? hotelCoords[key] : null;
    if (!coord) return;
    kml += `<Placemark>
<name>🏨 ${escXml(h.name)}</name>
<description>${escXml(h.name)} — ${h.nights} noite${h.nights > 1 ? 's' : ''}
Check-in: ${h.checkin} | Check-out: ${h.checkout}</description>
<styleUrl>#hotel</styleUrl>
<Point><coordinates>${coord[1]},${coord[0]},0</coordinates></Point>
</Placemark>
`;
});

kml += `</Folder>

<!-- ==================== SUPERCHARGERS ==================== -->
<Folder>
<name>⚡ Superchargers (${superchargers.length})</name>
`;

superchargers.forEach(sc => {
    const coord = scCoords[sc.name];
    if (!coord) return;
    kml += `<Placemark>
<name>⚡ SC ${escXml(sc.name)}</name>
<description>Dia ${sc.day} — ${escXml(sc.leg)}${sc.critical ? '\n⚠️ CRÍTICO' : ''}</description>
<styleUrl>#supercharger</styleUrl>
<Point><coordinates>${coord[1]},${coord[0]},0</coordinates></Point>
</Placemark>
`;
});

kml += `</Folder>

<!-- ==================== PARQUES NACIONAIS ==================== -->
<Folder>
<name>🏞️ Parques Nacionais (${parks.length})</name>
`;

const parkCoords = {
    'Death Valley': [36.5054, -116.9325],
    'Grand Canyon': [36.0544, -112.1401],
    'Zion': [37.2090, -112.9871],
    'Bryce Canyon': [37.6283, -112.1677],
    'Canyonlands': [38.3269, -109.8783],
    'Arches': [38.7331, -109.5925],
    'Mt. Rainier': [46.8523, -121.7603],
    'Olympic': [47.9504, -124.3855],
    'Redwood': [41.2132, -124.0046],
    'Yosemite': [37.8651, -119.5383],
    'Sequoia': [36.4864, -118.5658],
};

parks.forEach(p => {
    const key = Object.keys(parkCoords).find(k => p.name.includes(k));
    const coord = key ? parkCoords[key] : null;
    if (!coord) return;
    kml += `<Placemark>
<name>🏞️ ${escXml(p.name)}</name>
<description>${escXml(p.days)}
${escXml(p.highlights)}</description>
<styleUrl>#park</styleUrl>
<Point><coordinates>${coord[1]},${coord[0]},0</coordinates></Point>
</Placemark>
`;
});

kml += `</Folder>
</Document>
</kml>`;

// Write file
require('fs').writeFileSync('viagem-eua-2027.kml', kml, 'utf8');

// Also generate Google Maps direction URLs per driving day
const driveDays = [5, 9, 11, 12, 15, 16, 17, 19, 20, 21, 22, 23, 27, 30, 31];
let urls = '# Google Maps — Links de Navegação por Dia\n\n';

const dayDestinations = {
    5: { from: 'LAX, Los Angeles, CA', to: 'Las Vegas, NV', via: 'Barstow, CA' },
    9: { from: 'Las Vegas, NV', to: 'Springdale, UT', via: 'Grand Canyon South Rim, AZ' },
    11: { from: 'Springdale, UT', to: 'Bryce Canyon, UT' },
    12: { from: 'Bryce Canyon, UT', to: 'Moab, UT', via: 'Goblin Valley State Park, UT' },
    15: { from: 'Moab, UT', to: 'Twin Falls, ID', via: 'Salt Lake City, UT' },
    16: { from: 'Twin Falls, ID', to: 'Centralia, WA', via: 'Multnomah Falls, OR' },
    17: { from: 'Centralia, WA', to: 'Forks, WA', via: 'Mt Rainier National Park, WA' },
    19: { from: 'Forks, WA', to: 'Cannon Beach, OR', via: 'Astoria, OR' },
    20: { from: 'Cannon Beach, OR', to: 'Gold Beach, OR', via: 'Newport, OR' },
    21: { from: 'Gold Beach, OR', to: 'Crescent City, CA' },
    22: { from: 'Crescent City, CA', to: 'Eureka, CA', via: 'Prairie Creek Redwoods' },
    23: { from: 'Eureka, CA', to: 'San Francisco, CA', via: 'Mendocino, CA' },
    27: { from: 'San Francisco, CA', to: 'Mariposa, CA', via: 'Monterey, CA' },
    30: { from: 'Mariposa, CA', to: 'Three Rivers, CA', via: 'Kings Canyon National Park' },
    31: { from: 'Three Rivers, CA', to: 'Los Angeles, CA', via: 'Bakersfield, CA' },
};

driveDays.forEach(d => {
    const dd = dayDestinations[d];
    if (!dd) return;
    const day = days[d - 1];
    let url = `https://www.google.com/maps/dir/${encodeURIComponent(dd.from)}`;
    if (dd.via) url += `/${encodeURIComponent(dd.via)}`;
    url += `/${encodeURIComponent(dd.to)}`;
    urls += `## Dia ${d}: ${day.location}\n`;
    urls += `${url}\n\n`;
});

require('fs').writeFileSync('google-maps-links.md', urls, 'utf8');

console.log(`✅ Gerado: viagem-eua-2027.kml`);
console.log(`   → ${days.length} dias, ${hotels.length} hotéis, ${superchargers.length} SCs, ${parks.length} parques`);
console.log(`   → ${routeCoords.length} pontos na rota`);
console.log(`✅ Gerado: google-maps-links.md`);
console.log(`   → ${driveDays.length} links de navegação`);
console.log(`\n📱 Para importar:`);
console.log(`   1. Abra https://www.google.com/maps/d/`);
console.log(`   2. Clique "Criar um novo mapa"`);
console.log(`   3. Clique "Importar" → selecione viagem-eua-2027.kml`);
