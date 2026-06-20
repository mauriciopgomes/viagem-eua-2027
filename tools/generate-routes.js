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

// Driving day waypoints — extracted from app.js dayRouteSegments
const dayWaypoints = {
    5: [[33.94,-118.41],[34.10,-117.89],[34.90,-117.02],[35.27,-116.07],[35.61,-115.39],[36.17,-115.14]],
    9: [[36.17,-115.14],[35.98,-114.83],[35.20,-114.05],[35.25,-112.19],[36.06,-112.14],[36.81,-111.63],[36.86,-112.53],[37.02,-112.53]],
    11: [[37.02,-112.53],[37.29,-112.68],[37.68,-112.15],[37.63,-112.17],[37.21,-112.99]],
    12: [[37.21,-112.99],[37.76,-112.33],[38.29,-111.57],[38.75,-111.50],[38.99,-110.16],[38.57,-109.55]],
    15: [[38.57,-109.55],[38.99,-110.16],[39.60,-110.81],[39.97,-111.53],[40.76,-111.89],[41.07,-112.25],[40.76,-111.89],[41.73,-112.17],[42.00,-112.45],[42.56,-114.46]],
    16: [[42.56,-114.46],[42.87,-115.54],[43.62,-116.20],[44.05,-116.97],[44.77,-117.83],[45.67,-118.79],[45.60,-121.18],[45.57,-122.40],[46.07,-122.88],[46.72,-122.95]],
    17: [[46.72,-122.95],[46.85,-121.76],[47.04,-122.90],[47.30,-123.10],[47.59,-123.79],[47.95,-124.39]],
    19: [[47.95,-124.39],[47.50,-124.35],[46.98,-123.82],[46.19,-123.83],[45.89,-123.96]],
    20: [[45.89,-123.96],[45.37,-123.97],[44.96,-124.02],[43.97,-124.10],[43.37,-124.22],[42.86,-124.42],[42.41,-124.42]],
    21: [[42.41,-124.42],[41.94,-124.20],[41.76,-124.20]],
    22: [[41.76,-124.20],[41.20,-124.09],[40.80,-124.16]],
    23: [[40.80,-124.16],[40.10,-123.79],[39.15,-123.21],[38.44,-122.72],[38.07,-122.88],[37.77,-122.42]],
    27: [[37.77,-122.42],[37.46,-122.43],[36.97,-122.03],[36.60,-121.89],[36.55,-121.92],[36.83,-121.40],[37.30,-120.48],[37.49,-119.97]],
    28: [[37.49,-119.97],[37.74,-119.60]],
    30: [[37.49,-119.97],[37.33,-119.65],[37.06,-119.58],[36.82,-119.68],[36.80,-118.68],[36.56,-118.77],[36.45,-118.91]],
    31: [[36.45,-118.91],[36.06,-118.96],[35.37,-119.02],[35.13,-118.44],[34.90,-118.17],[34.50,-118.15],[34.05,-118.24]]
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
