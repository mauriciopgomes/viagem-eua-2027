#!/usr/bin/env node
/**
 * generate-routes.js — One-time OSRM route generator
 *
 * Calls the public OSRM API for each driving day's waypoints,
 * gets real road geometry as encoded polylines, and writes route-data.js.
 *
 * Usage: node tools/generate-routes.js
 */

const fs = require('fs');
const path = require('path');

// Driving day waypoints — rota invertida (LA→Sequoia→Yosemite→SF→PNW→Utah→Vegas→LA)
const dayWaypoints = {
    // D5: LAX → Three Rivers via CA-99 (Bakersfield)
    5: [[33.94,-118.41],[35.37,-119.02],[36.45,-118.91]],
    // D6: Kings Canyon → Fresno → Fishcamp (direct, no return to Three Rivers)
    6: [[36.45,-118.91],[36.80,-118.96],[36.74,-119.79],[37.4877,-119.6423]],
    // D7: Fishcamp → Mariposa Grove → Yosemite Valley (Tunnel View) → Fishcamp (round trip, full day)
    7: [[37.4877,-119.6423],[37.5139,-119.6069],[37.7157,-119.6770],[37.4877,-119.6423]],
    // D8: Fishcamp → Yosemite Valley (full day: falls, Badger Pass, Sentinel Bridge) → Fishcamp (round trip)
    8: [[37.4877,-119.6423],[37.66,-119.66],[37.4877,-119.6423]],
    // D9: Fishcamp → Yosemite Valley (quick pass, no stop) → El Portal (Arch Rock) → CA-140 Merced River Canyon → Mariposa (no stop) → CA-99 → I-580 → SF
    9: [[37.4877,-119.6423],[37.7157,-119.6570],[37.6725,-119.7048],[37.4849,-119.9663],[37.77,-122.42]],
    // D12: SF → Eureka via Avenue of the Giants (Leggett)
    12: [[37.77,-122.42],[39.87,-123.72],[40.35,-123.92],[40.80,-124.16]],
    // D13: Eureka → Redwood NP → Crescent City
    13: [[40.80,-124.16],[41.29,-124.06],[41.79,-124.09],[41.76,-124.20]],
    // D14: Crescent City → Coos Bay
    14: [[41.76,-124.20],[42.15,-124.35],[43.37,-124.22]],
    // D15: Coos Bay → Cannon Beach
    15: [[43.37,-124.22],[44.28,-124.11],[44.96,-124.02],[45.89,-123.96]],
    // D16: Cannon Beach → Astoria → Forks via Aberdeen
    16: [[45.89,-123.96],[46.00,-123.92],[46.19,-123.83],[46.72,-122.95],[46.98,-123.82],[47.50,-124.35],[47.95,-124.39]],
    // D19: Forks → Olympia → The Dalles → Pendleton (Columbia River Gorge)
    19: [[47.95,-124.39],[47.04,-122.90],[45.58,-122.12],[45.60,-121.18],[45.67,-118.79]],
    // D20: Pendleton → Twin Falls via Deadman Pass → Baker City
    20: [[45.67,-118.79],[44.77,-117.83],[42.56,-114.46]],
    // D21: Twin Falls → SLC → Moab
    21: [[42.56,-114.46],[40.76,-111.89],[39.60,-110.81],[38.99,-110.16],[38.57,-109.55]],
    // D24: Moab → Capitol Reef → Bryce
    24: [[38.57,-109.55],[38.99,-110.16],[38.28,-111.26],[37.76,-111.55],[37.63,-112.17]],
    // D25: Bryce → Zion (Springdale)
    25: [[37.63,-112.17],[37.29,-112.68],[37.21,-112.99]],
    // D26: Zion → Page (via US-89)
    26: [[37.21,-112.99],[37.10,-112.53],[36.91,-111.46]],
    // D27: Page → Monument Valley → Grand Canyon South Rim
    27: [[36.91,-111.46],[36.98,-110.10],[36.0544,-112.1401]],
    // D28: Grand Canyon → Hoover Dam → Vegas
    28: [[36.0544,-112.1401],[35.20,-114.05],[36.0161,-114.7377],[36.17,-115.14]],
    // D30: Vegas → Death Valley → Vegas (loop)
    30: [[36.17,-115.14],[36.21,-115.99],[36.43,-116.81],[36.25,-116.83],[36.17,-115.14]],
    // D31: Vegas → LA via I-15 (Barstow)
    31: [[36.17,-115.14],[34.90,-117.02],[34.05,-118.24]],
    // D33: LA → LAX
    33: [[34.05,-118.24],[33.94,-118.41]]
};

const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving';

async function fetchRoute(dayNum, waypoints) {
    // OSRM expects lng,lat (not lat,lng)
    const coords = waypoints.map(p => p[1] + ',' + p[0]).join(';');
    const url = `${OSRM_BASE}/${coords}?overview=full&geometries=polyline`;

    console.log(`  Day ${dayNum}: ${waypoints.length} waypoints → ${url.substring(0, 80)}...`);

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`OSRM HTTP ${resp.status} for day ${dayNum}`);

    const data = await resp.json();
    if (data.code !== 'Ok') throw new Error(`OSRM error for day ${dayNum}: ${data.code} — ${data.message || ''}`);

    const polyline = data.routes[0].geometry;
    const distKm = (data.routes[0].distance / 1000).toFixed(1);
    const durationMin = (data.routes[0].duration / 60).toFixed(0);

    console.log(`         → ${polyline.length} chars, ${distKm} km, ~${durationMin} min`);

    // Simplify: decode, reduce points with Douglas-Peucker-like distance filter, re-encode
    const points = decodePoly(polyline);
    const simplified = simplifyPoints(points, 0.0003); // ~30m tolerance
    const reEncoded = encodePoly(simplified);
    console.log(`         → simplified: ${points.length} → ${simplified.length} pts (${reEncoded.length} chars)`);
    return reEncoded;
}

// Decode Google polyline
function decodePoly(encoded) {
    const points = [];
    let i = 0, lat = 0, lng = 0;
    while (i < encoded.length) {
        let b, shift = 0, result = 0;
        do { b = encoded.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
        lat += (result & 1) ? ~(result >> 1) : (result >> 1);
        shift = 0; result = 0;
        do { b = encoded.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
        lng += (result & 1) ? ~(result >> 1) : (result >> 1);
        points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
}

// Encode points to Google polyline
function encodePoly(points) {
    let prevLat = 0, prevLng = 0, out = '';
    for (const [lat, lng] of points) {
        const iLat = Math.round(lat * 1e5);
        const iLng = Math.round(lng * 1e5);
        out += encodeValue(iLat - prevLat) + encodeValue(iLng - prevLng);
        prevLat = iLat;
        prevLng = iLng;
    }
    return out;
}

function encodeValue(v) {
    v = v < 0 ? ~(v << 1) : (v << 1);
    let out = '';
    while (v >= 0x20) {
        out += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
        v >>= 5;
    }
    out += String.fromCharCode(v + 63);
    return out;
}

// Simplified Douglas-Peucker: perpendicular distance filter
function simplifyPoints(pts, tolerance) {
    if (pts.length <= 2) return pts;
    return rdp(pts, 0, pts.length - 1, tolerance);
}

function rdp(pts, start, end, tol) {
    let maxDist = 0, maxIdx = 0;
    for (let i = start + 1; i < end; i++) {
        const d = perpDist(pts[i], pts[start], pts[end]);
        if (d > maxDist) { maxDist = d; maxIdx = i; }
    }
    if (maxDist > tol) {
        const left = rdp(pts, start, maxIdx, tol);
        const right = rdp(pts, maxIdx, end, tol);
        return left.concat(right.slice(1));
    }
    return [pts[start], pts[end]];
}

function perpDist(p, a, b) {
    const dx = b[1] - a[1], dy = b[0] - a[0];
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return Math.sqrt((p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2);
    return Math.abs(dy * (p[1] - a[1]) - dx * (p[0] - a[0])) / mag;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    console.log('🗺️  OSRM Route Generator\n');

    const sortedDays = Object.keys(dayWaypoints).map(Number).sort((a, b) => a - b);
    const routes = {};

    for (const day of sortedDays) {
        routes[day] = await fetchRoute(day, dayWaypoints[day]);
        // Be nice to the public OSRM server
        await sleep(1200);
    }

    // Build output
    let output = '// Generated by tools/generate-routes.js — do not edit manually\n';
    output += '// Real road geometry from OSRM, encoded as Google polylines\n';
    output += '// Decode with decodePolyline() below\n\n';

    // Decoder function
    output += `/**
 * Decode a Google encoded polyline string into [[lat, lng], ...] array.
 * Algorithm: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
 */
function decodePolyline(encoded) {
    var points = [];
    var i = 0, lat = 0, lng = 0;
    while (i < encoded.length) {
        var b, shift = 0, result = 0;
        do { b = encoded.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
        lat += (result & 1) ? ~(result >> 1) : (result >> 1);
        shift = 0; result = 0;
        do { b = encoded.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
        lng += (result & 1) ? ~(result >> 1) : (result >> 1);
        points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
}\n\n`;

    // Route order for building full route
    output += '// Driving days in route order\n';
    output += 'var routeDayOrder = [' + sortedDays.join(',') + '];\n\n';

    // Encoded routes
    output += 'var encodedRoutes = {\n';
    for (const day of sortedDays) {
        const comment = dayWaypoints[day][0].join(',') + ' → ' + dayWaypoints[day][dayWaypoints[day].length - 1].join(',');
        // Escape backslashes in encoded polyline for JS string literal
        const escaped = routes[day].replace(/\\/g, '\\\\');
        output += `    ${day}: "${escaped}",  // ${comment}\n`;
    }
    output += '};\n';

    const outPath = path.join(__dirname, '..', 'route-data.js');
    fs.writeFileSync(outPath, output, 'utf8');

    const sizeKb = (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1);
    console.log(`\n✅ Written ${outPath} (${sizeKb} KB)`);
    console.log(`   ${sortedDays.length} driving days, ${Object.values(routes).join('').length} total encoded chars`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });
