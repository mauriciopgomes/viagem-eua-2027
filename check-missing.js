const fs = require('fs');

const appJs = fs.readFileSync('./app.js', 'utf8');
const dataJs = fs.readFileSync('./data.js', 'utf8');

// Extract place names from placeInfo
const placeInfoStart = appJs.indexOf('const placeInfo = {');
const placeInfoEnd = appJs.indexOf('\n};', placeInfoStart) + 3;
const placeInfoStr = appJs.substring(placeInfoStart, placeInfoEnd);

const placeNames = new Set();
// Match single-quoted keys OR double-quoted keys (handles Joe's Pizza etc)
const regex = /^\s*(?:'([^']+)'|"([^"]+)"):\s*\{/gm;
let match;
while ((match = regex.exec(placeInfoStr)) !== null) {
    placeNames.add(match[1] || match[2]);
}

console.log(`📍 Total de places em placeInfo: ${placeNames.size}\n`);

// Extract strong tags from data.js
const strongRegex = /<strong>([^<]+)<\/strong>/g;
const items = new Set();
let dataMatch;
while ((dataMatch = strongRegex.exec(dataJs)) !== null) {
    items.add(dataMatch[1]);
}

console.log(`🎯 Total de <strong> items em data.js: ${items.size}\n`);

// Find missing ones — use substring match (same logic as findPlaceInfo in app.js)
const placeKeysSorted = [...placeNames].sort((a, b) => b.length - a.length);
const missing = [];
items.forEach(item => {
    const found = placeKeysSorted.some(k => item.includes(k));
    if (!found) missing.push(item);
});

if (missing.length === 0) {
    console.log('✅ Todos os items têm descrição!\n');
} else {
    console.log(`⚠️  ${missing.length} items SEM descrição:\n`);
    missing.forEach(item => console.log(`  ❌ ${item}`));
}

// Also check for places that don't have photos
const appJs2 = fs.readFileSync('./app.js', 'utf8');
const activityPhotosStart = appJs2.indexOf('const activityPhotos = {');
const activityPhotosEnd = appJs2.indexOf('\n};', activityPhotosStart) + 3;
const activityPhotosStr = appJs2.substring(activityPhotosStart, activityPhotosEnd);

const photos = new Set();
// Match single-quoted keys OR double-quoted keys
const photoRegex = /^\s*(?:'([^']+)'|"([^"]+)"):/gm;
let photoMatch;
while ((photoMatch = photoRegex.exec(activityPhotosStr)) !== null) {
    photos.add(photoMatch[1] || photoMatch[2]);
}

console.log(`\n🖼️  Total de fotos em activityPhotos: ${photos.size}`);

const photoKeysSorted = [...photos].sort((a, b) => b.length - a.length);
const missingPhotos = [];
items.forEach(item => {
    const found = photoKeysSorted.some(k => item.includes(k));
    if (!found) missingPhotos.push(item);
});

if (missingPhotos.length === 0) {
    console.log(`✅ Todos os items têm foto!\n`);
} else {
    console.log(`\n⚠️  ${missingPhotos.length} items SEM foto:\n`);
    missingPhotos.slice(0, 30).forEach(item => console.log(`  ❌ ${item}`));
    if (missingPhotos.length > 30) {
        console.log(`  ... e mais ${missingPhotos.length - 30}`);
    }
}
