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

// Driving day waypoints — current route order (post Jan/Fev 2027 reorg + Redwood/Sequoia fixes)
// NYC→LAX→SF→Eureka→Crescent City→Oregon Coast→WA→UT→Page→GC→Vegas→Sequoia→Yosemite→Coast→LA
const dayWaypoints = {
    // D5: LAX → SF via I-5
    5: [[33.94,-118.41],[34.85,-118.88],[35.05,-119.02],[35.76,-120.33],[36.68,-120.06],[36.98,-121.07],[37.34,-121.89],[37.77,-122.42]],
    // D8: SF → Eureka via Leggett / Avenue of the Giants (US-101 N)
    8: [[37.77,-122.42],[38.44,-122.72],[39.41,-123.36],[39.86,-123.72],[40.10,-123.79],[40.80,-124.16]],
    // D9: Eureka → Crescent City via Redwood NP / Orick / Klamath (US-101 N)
    9: [[40.80,-124.16],[41.29,-124.06],[41.53,-124.04],[41.76,-124.20]],
    // D10: Crescent City → Gold Beach (US-101 N, short hop into Oregon)
    10: [[41.76,-124.20],[42.05,-124.28],[42.41,-124.42]],
    // D11: Gold Beach → Cannon Beach (US-101 north, full coast)
    11: [[42.41,-124.42],[42.86,-124.42],[43.37,-124.22],[43.97,-124.10],[44.63,-124.05],[44.96,-124.02],[45.37,-123.97],[45.89,-123.96],[46.00,-123.92],[45.88,-123.96]],
    // D12: Cannon Beach → Rainier → Forks
    12: [[45.89,-123.96],[46.07,-122.88],[46.72,-122.95],[46.85,-121.76],[47.04,-122.90],[47.30,-123.10],[47.59,-123.79],[47.95,-124.39]],
    // D14: Forks → Aberdeen → Centralia → Multnomah → The Dalles
    14: [[47.95,-124.39],[47.50,-124.35],[46.98,-123.82],[46.72,-122.95],[46.07,-122.88],[45.57,-122.12],[45.60,-121.18]],
    // D15: The Dalles → Twin Falls (I-84 east)
    15: [[45.60,-121.18],[44.77,-117.83],[43.62,-116.20],[42.56,-114.46]],
    // D16: Twin Falls → SLC → Moab
    16: [[42.56,-114.46],[41.73,-112.17],[40.76,-111.89],[39.97,-111.53],[39.60,-110.81],[38.99,-110.16],[38.57,-109.55]],
    // D19: Moab → Capitol Reef → Bryce
    19: [[38.57,-109.55],[38.99,-110.16],[38.29,-111.57],[38.75,-111.50],[37.68,-112.15],[37.63,-112.17]],
    // D20: Bryce → Zion
    20: [[37.63,-112.17],[37.29,-112.68],[37.21,-112.99]],
    // D21: Zion → Page
    21: [[37.21,-112.99],[37.10,-112.53],[36.91,-111.46]],
    // D22: Page → Grand Canyon South Rim → Vegas
    22: [[36.91,-111.46],[36.05,-111.83],[36.06,-112.14],[35.25,-112.19],[35.20,-114.05],[35.98,-114.83],[36.17,-115.14]],
    // D25: Vegas → Three Rivers (Sequoia)
    25: [[36.17,-115.14],[35.27,-116.07],[34.90,-117.02],[35.05,-119.02],[36.12,-119.30],[36.45,-118.91]],
    // D26: Three Rivers → Sequoia → Kings Canyon → Mariposa (sem volta — CA-180 W → CA-41 N → CA-49 N)
    26: [[36.45,-118.91],[36.56,-118.77],[36.74,-118.97],[36.78,-119.79],[37.32,-119.65],[37.49,-119.97]],
    // D27: Mariposa → Yosemite Valley → Mariposa (CA-140, round trip)
    27: [[37.49,-119.97],[37.74,-119.60],[37.49,-119.97]],
    // D29: Mariposa → Monterey/Carmel (via Merced, Gilroy)
    29: [[37.49,-119.97],[37.33,-120.48],[37.06,-121.57],[36.97,-122.03],[36.60,-121.89]],
    // D30: Carmel → PCH (Big Sur) → San Simeon → SLO → Santa Barbara → LA
    30: [[36.55,-121.92],[36.37,-121.90],[36.24,-121.79],[36.18,-121.69],[35.97,-121.49],[35.66,-121.19],[35.28,-120.66],[34.42,-119.70],[34.05,-118.24]],
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
