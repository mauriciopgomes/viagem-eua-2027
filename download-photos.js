#!/usr/bin/env node
// download-photos.js — Download missing/fallback activity photos from Wikimedia
// Usage: node download-photos.js [--dry-run]
// Rate limit: 1 request every 2 seconds (Wikimedia friendly)

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 5000; // 5 seconds between requests (max safety)
const IMG_DIR = path.join(__dirname, 'img', 'activities');
const USER_AGENT = 'ViagemEUA2027PWA/1.0 (travel planning app; contact: github.com/mauriciopgomes)';

// Locations that need their own photos: [activityPhotos key, Wikipedia search term, output filename]
const LOCATIONS = [
    // Big Bear (using wrong fallback photos)
    ['Snow Summit', 'Snow Summit ski resort Big Bear', 'snow_summit.jpg'],
    ['Alpine Slide', 'Alpine Slide at Magic Mountain Big Bear', 'alpine_slide_big_bear.jpg'],
    ['Castle Rock Trail', 'Castle Rock Trail Big Bear Lake', 'castle_rock_big_bear.jpg'],
    ['Big Bear', 'Big Bear Lake California', 'big_bear_lake.jpg'],
    ['Big Bear Lake', null, null], // will reuse big_bear_lake.jpg
    ['Big Bear Village', 'Big Bear Village California', 'big_bear_village.jpg'],

    // NYC
    ['Harry Potter Shop', 'Harry Potter New York store', 'harry_potter_ny.jpg'],

    // Las Vegas
    ['Venetian', 'The Venetian Las Vegas', 'venetian_vegas.jpg'],
    ['Caesars Palace', 'Caesars Palace Las Vegas', 'caesars_palace.jpg'],
    ['Mt. Charleston', 'Mount Charleston Nevada', 'mt_charleston_peak.jpg'],
    ['Furnace Creek', 'Furnace Creek Death Valley', 'furnace_creek.jpg'],

    // Utah
    ['Fairyland Point', 'Fairyland Point Bryce Canyon', 'fairyland_point.jpg'],
    ['Mossy Cave', 'Mossy Cave Trail Bryce Canyon', 'mossy_cave.jpg'],
    ['Hickman Bridge', 'Hickman Natural Bridge Capitol Reef', 'hickman_bridge.jpg'],
    ['San Rafael Swell', 'San Rafael Swell Utah', 'san_rafael_swell.jpg'],
    ['Zion', 'Zion National Park', 'zion_np.jpg'],
    ['Zion Canyon', 'Zion Canyon', 'zion_canyon.jpg'],
    ['Canyonlands', 'Canyonlands National Park', 'canyonlands_np.jpg'],
    ['Arches NP', 'Arches National Park', 'arches_np.jpg'],

    // California Coast
    ['Cannery Row', 'Cannery Row Monterey', 'cannery_row.jpg'],
    ['Monterey Bay Aquarium', 'Monterey Bay Aquarium', 'monterey_bay_aquarium.jpg'],
    ['Pfeiffer Beach', 'Pfeiffer Beach Big Sur', 'pfeiffer_beach.jpg'],
    ['McWay Falls', 'McWay Falls', 'mcway_falls.jpg'],
    ['Battery Spencer', 'Battery Spencer Golden Gate', 'battery_spencer.jpg'],
    ['North Grove Loop', 'General Grant Grove Kings Canyon', 'north_grove_loop.jpg'],
    ['Generals Highway', 'Generals Highway Sequoia', 'generals_highway.jpg'],

    // LA
    ['Universal Studios', 'Universal Studios Hollywood', 'universal_studios_hollywood.jpg'],
    ['Cool Cat Collective', 'cat cafe Long Beach California', 'cool_cat_collective.jpg'],

    // PNW
    ['Nintendo San Francisco', 'Nintendo Store San Francisco', 'nintendo_sf.jpg'],

    // Oregon
    ['Howland Hill Road', 'Howland Hill Road Jedediah Smith', 'howland_hill_road.jpg'],
    ['Damnation Creek', 'Damnation Creek Trail', 'damnation_creek.jpg'],
    ['Spruce Nature Trail', 'Spruce Nature Trail Olympic', 'spruce_nature_trail.jpg'],

    // Misc fallbacks
    ['Bottle Tree Ranch', 'Bottle Tree Ranch Oro Grande', 'bottle_tree_ranch.jpg'],
    ['Eldorado Canyon', 'Eldorado Canyon Nevada', 'eldorado_canyon.jpg'],
    ['Thousand Springs', 'Thousand Springs State Park Idaho', 'thousand_springs.jpg'],
    ['Rowena Crest', 'Rowena Crest Viewpoint Oregon', 'rowena_crest.jpg'],
    ['Cypress Tree Tunnel', 'Cypress Tree Tunnel Point Reyes', 'cypress_tree_tunnel.jpg'],
    ['Pigeon Point Lighthouse', 'Pigeon Point Lighthouse', 'pigeon_point_lighthouse.jpg'],
    ['Cathedral Rock Trail', 'Cathedral Rock Trail Red Rock Canyon', 'cathedral_rock_rrc.jpg'],
    ['Stargazing', null, null], // skip, not a place
    ['Elk Meadow', 'Elk Meadow Orick California', 'elk_meadow.jpg'],
    ['Kurt Cobain', 'Kurt Cobain house Aberdeen Washington', 'kurt_cobain_aberdeen.jpg'],
];

// Filter out entries that reuse another photo or should be skipped
const toDownload = LOCATIONS.filter(l => l[1] !== null && l[2] !== null);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchJSON(res.headers.location).then(resolve, reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(new Error('JSON parse error: ' + data.substring(0, 200))); }
            });
        });
        req.on('error', reject);
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadFile(res.headers.location, dest).then(resolve, reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error('HTTP ' + res.statusCode));
            }
            const stream = fs.createWriteStream(dest);
            res.pipe(stream);
            stream.on('finish', () => { stream.close(); resolve(); });
            stream.on('error', reject);
        });
        req.on('error', reject);
        req.setTimeout(30000, () => { req.destroy(); reject(new Error('Download timeout')); });
    });
}

async function searchWikipediaImage(query) {
    // Strategy 1: Try Wikipedia page image (main article image)
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&piprop=original&format=json&redirects=1`;
    try {
        const data = await fetchJSON(searchUrl);
        const pages = data.query.pages;
        for (const id of Object.keys(pages)) {
            if (pages[id].original && pages[id].original.source) {
                return pages[id].original.source;
            }
        }
    } catch (e) { /* fall through */ }

    // Strategy 2: Search Wikipedia for article, then get image
    await sleep(DELAY_MS);
    const searchUrl2 = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json`;
    try {
        const data = await fetchJSON(searchUrl2);
        if (data.query.search.length > 0) {
            const title = data.query.search[0].title;
            await sleep(DELAY_MS);
            const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original&format=json&redirects=1`;
            const imgData = await fetchJSON(imgUrl);
            const pages = imgData.query.pages;
            for (const id of Object.keys(pages)) {
                if (pages[id].original && pages[id].original.source) {
                    return pages[id].original.source;
                }
            }
        }
    } catch (e) { /* fall through */ }

    // Strategy 3: Search Wikimedia Commons directly
    await sleep(DELAY_MS);
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=1&format=json`;
    try {
        const data = await fetchJSON(commonsUrl);
        if (data.query.search.length > 0) {
            const fileTitle = data.query.search[0].title;
            await sleep(DELAY_MS);
            const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
            const infoData = await fetchJSON(infoUrl);
            const pages = infoData.query.pages;
            for (const id of Object.keys(pages)) {
                if (pages[id].imageinfo && pages[id].imageinfo[0]) {
                    return pages[id].imageinfo[0].thumburl || pages[id].imageinfo[0].url;
                }
            }
        }
    } catch (e) { /* fall through */ }

    return null;
}

async function main() {
    console.log(`\n📸 Download de fotos da Wikipedia/Wikimedia Commons`);
    console.log(`   ${toDownload.length} locais para baixar`);
    console.log(`   Rate limit: ${DELAY_MS}ms entre requests`);
    console.log(`   Modo: ${DRY_RUN ? 'DRY RUN (só mostra URLs)' : 'DOWNLOAD'}\n`);

    let downloaded = 0, failed = 0, skipped = 0;
    const results = [];

    for (let i = 0; i < toDownload.length; i++) {
        const [key, query, filename] = toDownload[i];
        const dest = path.join(IMG_DIR, filename);

        // Skip if file already exists and is > 10KB (probably a real photo)
        if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
            console.log(`⏭️  [${i + 1}/${toDownload.length}] ${key} — já existe (${(fs.statSync(dest).size / 1024).toFixed(0)}KB)`);
            skipped++;
            continue;
        }

        process.stdout.write(`🔍 [${i + 1}/${toDownload.length}] ${key} ...`);
        
        try {
            const imageUrl = await searchWikipediaImage(query);
            
            if (!imageUrl) {
                console.log(` ❌ sem imagem encontrada`);
                failed++;
                results.push({ key, status: 'not_found', query });
                await sleep(DELAY_MS);
                continue;
            }

            if (DRY_RUN) {
                console.log(` → ${imageUrl.substring(0, 80)}...`);
                downloaded++;
                results.push({ key, status: 'found', url: imageUrl, filename });
            } else {
                await downloadFile(imageUrl, dest);
                const size = fs.statSync(dest).size;
                console.log(` ✅ ${filename} (${(size / 1024).toFixed(0)}KB)`);
                downloaded++;
                results.push({ key, status: 'downloaded', filename, size });
            }
        } catch (e) {
            console.log(` ❌ ${e.message}`);
            failed++;
            results.push({ key, status: 'error', error: e.message });
        }

        await sleep(DELAY_MS);
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 Resultado: ${downloaded} baixadas, ${failed} falharam, ${skipped} já existiam`);
    
    if (failed > 0) {
        console.log(`\n❌ Falharam:`);
        results.filter(r => r.status === 'not_found' || r.status === 'error').forEach(r => {
            console.log(`   - ${r.key}: ${r.status === 'not_found' ? 'sem imagem no Wikipedia' : r.error}`);
        });
    }

    // Generate app.js update snippet for downloaded photos
    if (downloaded > 0 && !DRY_RUN) {
        console.log(`\n📝 Atualizar activityPhotos com os novos arquivos:`);
        results.filter(r => r.status === 'downloaded').forEach(r => {
            console.log(`   '${r.key}': 'img/activities/${r.filename}',`);
        });
    }
}

main().catch(console.error);
