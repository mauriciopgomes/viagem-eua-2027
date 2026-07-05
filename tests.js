// ============================================================
// tests.js — Testes completos da PWA Viagem EUA 2027
// Run: node tests.js
// Cobre: data.js, sw.js, manifest.json, index.html
// ============================================================

const fs = require('fs');
const path = require('path');

// ==================== TEST FRAMEWORK ====================
let passed = 0, failed = 0, total = 0;
const results = [];
const sectionTimes = {};
let currentSection = '';

function section(name) {
    currentSection = name;
    sectionTimes[name] = Date.now();
}

function test(name, fn) {
    total++;
    try {
        fn();
        passed++;
        results.push({ section: currentSection, name, status: '✅' });
    } catch (e) {
        failed++;
        results.push({ section: currentSection, name, status: '❌', error: e.message });
    }
}

function assert(condition, msg) {
    if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        throw new Error((msg || 'assertEqual') + `: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}

function assertRange(val, min, max, msg) {
    if (val < min || val > max) {
        throw new Error((msg || 'assertRange') + `: ${val} not in [${min}, ${max}]`);
    }
}

function parseDaysSpec(spec) {
    const match = spec.match(/(\d+)(?:[–-](\d+))?/);
    if (!match) return [];
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    const days = [];
    for (let day = start; day <= end; day++) days.push(day);
    return days;
}

// ==================== LOAD SOURCE FILES ====================
const BASE = __dirname;
const dataJs = fs.readFileSync(path.join(BASE, 'data.js'), 'utf8');
const swJs = fs.readFileSync(path.join(BASE, 'sw.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(BASE, 'app.js'), 'utf8');
const pwaJs = fs.readFileSync(path.join(BASE, 'pwa.js'), 'utf8');
const syncJs = fs.readFileSync(path.join(BASE, 'sync.js'), 'utf8');
const storageJs = fs.readFileSync(path.join(BASE, 'storage.js'), 'utf8');
const photosJs = fs.readFileSync(path.join(BASE, 'photos.js'), 'utf8');
const placesJs = fs.readFileSync(path.join(BASE, 'places.js'), 'utf8');
const stylesCSS = fs.readFileSync(path.join(BASE, 'styles.css'), 'utf8');
const manifestJson = JSON.parse(fs.readFileSync(path.join(BASE, 'manifest.json'), 'utf8'));
// Combined source for searching JS functions/patterns across both HTML and app.js
const allJs = indexHtml + '\n' + appJs + '\n' + pwaJs + '\n' + syncJs + '\n' + storageJs + '\n' + photosJs + '\n' + placesJs;
const routeDataJs = fs.readFileSync(path.join(BASE, 'route-data.js'), 'utf8');

// Execute data.js to get the actual data objects
const vm = require('vm');
const dataExports = vm.runInNewContext(dataJs + '\n;({dayPhotos, days, hotels, parks, superchargers, TRIP_START})', {});
const { dayPhotos, days, hotels, parks, superchargers, TRIP_START } = dataExports;

// Extract JS from index.html
function extractJsBlock(html, varName) {
    const regex = new RegExp(`(?:const|var|let)\\s+${varName}\\s*=\\s*({[\\s\\S]*?});`, 'm');
    const match = html.match(regex);
    return match ? match[1] : null;
}

// ==================== 1. DATA.JS — TRIP DATA INTEGRITY ====================
section('data.js — Estrutura dos Dados');

test('days é um array com 33 dias', () => {
    assert(Array.isArray(days), 'days deve ser um array');
    assertEqual(days.length, 33, 'deve ter 33 dias');
});

test('cada dia tem campos obrigatórios', () => {
    const requiredFields = ['day', 'title', 'location', 'route', 'note', 'region', 'items'];
    days.forEach((d) => {
        requiredFields.forEach((field) => {
            assert(d[field] !== undefined, `Dia ${d.day}: campo '${field}' ausente`);
        });
    });
});

test('dias numerados sequencialmente de 1 a 33', () => {
    days.forEach((d, i) => {
        assertEqual(d.day, i + 1, `Dia no índice ${i}`);
    });
});

test('cada dia tem region válida', () => {
    const validRegions = ['ny', 'nv', 'ut', 'pnw', 'ca'];
    days.forEach((d) => {
        assert(validRegions.includes(d.region), `Dia ${d.day}: region '${d.region}' inválida`);
    });
});

test('cada item de cada dia tem campos obrigatórios', () => {
    days.forEach((d) => {
        assert(d.items.length > 0, `Dia ${d.day}: sem items`);
        d.items.forEach((item, i) => {
            assert(typeof item.time === 'string', `Dia ${d.day} item ${i}: time deve ser string`);
            assert(typeof item.text === 'string', `Dia ${d.day} item ${i}: text deve ser string`);
            assert(typeof item.type === 'string', `Dia ${d.day} item ${i}: type deve ser string`);
            assert(item.time.length > 0, `Dia ${d.day} item ${i}: time vazio`);
            assert(item.text.length > 0, `Dia ${d.day} item ${i}: text vazio`);
        });
    });
});

test('tipos de item são válidos', () => {
    const validTypes = ['', 'highlight', 'food', 'charge', 'drive'];
    days.forEach((d) => {
        d.items.forEach((item, i) => {
            assert(validTypes.includes(item.type), `Dia ${d.day} item ${i}: type '${item.type}' inválido`);
        });
    });
});

test('total de atividades é razoável (>300)', () => {
    const totalItems = days.reduce((sum, d) => sum + d.items.length, 0);
    assert(totalItems > 300, `Total de atividades: ${totalItems} (esperado >300)`);
});

test('tips é array quando presente', () => {
    days.forEach((d) => {
        if (d.tips !== undefined) {
            assert(Array.isArray(d.tips), `Dia ${d.day}: tips deve ser array`);
            d.tips.forEach((tip, i) => {
                assert(typeof tip === 'string' && tip.length > 0, `Dia ${d.day} tip ${i}: deve ser string não vazia`);
            });
        }
    });
});

// ==================== 2. DATA.JS — DAY PHOTOS ====================
section('data.js — Fotos dos Dias');

test('dayPhotos cobre todos os 33 dias', () => {
    for (let i = 1; i <= 33; i++) {
        assert(dayPhotos[i] !== undefined, `dayPhotos[${i}] ausente`);
    }
});

test('dayPhotos referencia arquivos que existem', () => {
    Object.entries(dayPhotos).forEach(([day, photo]) => {
        const filePath = path.join(BASE, photo);
        assert(fs.existsSync(filePath), `Dia ${day}: foto '${photo}' não encontrada`);
    });
});

// ==================== 3. DATA.JS — HOTELS ====================
section('data.js — Hotéis');

test('hotels é um array com 18 hotéis', () => {
    assert(Array.isArray(hotels), 'hotels deve ser array');
    assertEqual(hotels.length, 18, 'deve ter 18 hotéis');
});

test('hotéis têm campos obrigatórios', () => {
    hotels.forEach((h, i) => {
        assert(h.num !== undefined, `Hotel ${i}: num ausente`);
        assert(typeof h.name === 'string', `Hotel ${i}: name ausente`);
        assert(typeof h.checkin === 'string', `Hotel ${i}: checkin ausente`);
        assert(typeof h.checkout === 'string', `Hotel ${i}: checkout ausente`);
        assert(typeof h.nights === 'number', `Hotel ${i}: nights ausente`);
    });
});

test('hotéis numerados sequencialmente', () => {
    hotels.forEach((h, i) => {
        assertEqual(h.num, i + 1, `Hotel ${i}: num deveria ser ${i + 1}`);
    });
});

test('total de noites = 32 (21/01 a 22/02)', () => {
    const totalNights = hotels.reduce((sum, h) => sum + h.nights, 0);
    assertEqual(totalNights, 32, 'total de noites');
});

test('datas de check-in/checkout são contíguas', () => {
    for (let i = 1; i < hotels.length; i++) {
        assertEqual(hotels[i].checkin, hotels[i - 1].checkout,
            `Hotel ${i} checkin deve ser igual ao checkout do hotel ${i - 1}`);
    }
});

// ==================== 4. DATA.JS — PARKS ====================
section('data.js — Parques Nacionais');

test('parks é um array com 12 parques', () => {
    assert(Array.isArray(parks), 'parks deve ser array');
    assertEqual(parks.length, 12, 'deve ter 12 parques');
});

test('parques têm campos obrigatórios', () => {
    parks.forEach((p, i) => {
        assert(typeof p.name === 'string' && p.name.length > 0, `Park ${i}: name`);
        assert(typeof p.days === 'string' && p.days.length > 0, `Park ${i}: days`);
        assert(typeof p.highlights === 'string' && p.highlights.length > 0, `Park ${i}: highlights`);
    });
});

test('parques referenciam dias válidos', () => {
    parks.forEach((p) => {
        const dayNums = p.days.match(/\d+/g);
        assert(dayNums && dayNums.length > 0, `Park '${p.name}': sem dias`);
        dayNums.forEach((d) => {
            const n = parseInt(d);
            assertRange(n, 1, 33, `Park '${p.name}' dia ${n}`);
        });
    });
});

// ==================== 5. DATA.JS — SUPERCHARGERS ====================
section('data.js — Superchargers');

test('superchargers é um array com 23 paradas', () => {
    assert(Array.isArray(superchargers), 'superchargers deve ser array');
    assertEqual(superchargers.length, 23, 'deve ter 23 superchargers');
});

test('superchargers têm campos obrigatórios', () => {
    superchargers.forEach((sc, i) => {
        assert(typeof sc.day === 'number', `SC ${i}: day`);
        assert(typeof sc.name === 'string' && sc.name.length > 0, `SC ${i}: name`);
        assert(typeof sc.leg === 'string' && sc.leg.length > 0, `SC ${i}: leg`);
        assert(typeof sc.critical === 'boolean', `SC ${i}: critical`);
        assertRange(sc.day, 1, 33, `SC ${i}: dia ${sc.day} fora de [1,33]`);
    });
});

test('superchargers críticos têm nota de aviso', () => {
    superchargers.filter(sc => sc.critical).forEach((sc) => {
        assert(typeof sc.note === 'string' && sc.note.length > 0,
            `SC crítico '${sc.name}' dia ${sc.day}: deve ter note`);
        assert(sc.note.includes('⚠️') || sc.note.includes('100%'),
            `SC crítico '${sc.name}': note deve ter aviso`);
    });
});

test('superchargers ordenados por dia', () => {
    for (let i = 1; i < superchargers.length; i++) {
        assert(superchargers[i].day >= superchargers[i - 1].day,
            `SC ${i}: dia ${superchargers[i].day} < ${superchargers[i - 1].day} (deve ser crescente)`);
    }
});

// ==================== 6. SW.JS — SERVICE WORKER ====================
section('sw.js — Service Worker');

test('cache name segue padrão viagem-eua-2027-vN', () => {
    const match = swJs.match(/CACHE_NAME\s*=\s*'(viagem-eua-2027-v\d+)'/);
    assert(match, 'CACHE_NAME deve seguir padrão viagem-eua-2027-vN');
});

test('tile cache definido', () => {
    assert(swJs.includes("TILE_CACHE = 'viagem-tiles-v1'"), 'TILE_CACHE deve ser viagem-tiles-v1');
});

test('critical assets incluem arquivos essenciais', () => {
    const criticalFiles = ['./', './index.html', './data.js', './manifest.json',
        './app.js', './pwa.js', './sync.js',
        './icons/icon-192.png', './icons/icon-512.png',
        './lib/leaflet.js', './lib/leaflet.css', './fonts/inter.woff2'];
    criticalFiles.forEach((file) => {
        assert(swJs.includes(`'${file}'`), `Critical asset ausente: ${file}`);
    });
});

test('critical assets referenciam arquivos que existem', () => {
    const criticalMatch = swJs.match(/CRITICAL_ASSETS\s*=\s*\[([\s\S]*?)\];/);
    assert(criticalMatch, 'CRITICAL_ASSETS deve existir');
    const urls = criticalMatch[1].match(/'\.\/[^']+'/g) || [];
    urls.forEach((u) => {
        const file = u.replace(/'/g, '').replace('./', '');
        if (file === '') return; // './' is the root
        const filePath = path.join(BASE, file);
        assert(fs.existsSync(filePath), `Critical asset '${file}' não existe no disco`);
    });
});

test('ASSETS_TO_CACHE referenciam arquivos que existem', () => {
    const assetsMatch = swJs.match(/ASSETS_TO_CACHE\s*=\s*\[([\s\S]*?)\];/);
    assert(assetsMatch, 'ASSETS_TO_CACHE deve existir');
    const urls = assetsMatch[1].match(/'\.\/[^']+'/g) || [];
    let missing = [];
    urls.forEach((u) => {
        const file = u.replace(/'/g, '').replace('./', '');
        if (file === '') return;
        const filePath = path.join(BASE, file);
        if (!fs.existsSync(filePath)) missing.push(file);
    });
    assert(missing.length === 0, `Arquivos no cache que não existem: ${missing.join(', ')}`);
});

test('sem duplicatas em ASSETS_TO_CACHE', () => {
    const assetsMatch = swJs.match(/ASSETS_TO_CACHE\s*=\s*\[([\s\S]*?)\];/);
    const urls = (assetsMatch[1].match(/'[^']+'/g) || []).map(u => u.replace(/'/g, ''));
    const seen = new Set();
    const dupes = [];
    urls.forEach((u) => {
        if (seen.has(u)) dupes.push(u);
        seen.add(u);
    });
    assert(dupes.length === 0, `Duplicatas em ASSETS_TO_CACHE: ${dupes.join(', ')}`);
});

test('sem duplicatas em CRITICAL_ASSETS', () => {
    const match = swJs.match(/CRITICAL_ASSETS\s*=\s*\[([\s\S]*?)\];/);
    const urls = (match[1].match(/'[^']+'/g) || []).map(u => u.replace(/'/g, ''));
    const seen = new Set();
    const dupes = [];
    urls.forEach((u) => {
        if (seen.has(u)) dupes.push(u);
        seen.add(u);
    });
    assert(dupes.length === 0, `Duplicatas em CRITICAL_ASSETS: ${dupes.join(', ')}`);
});

test('SW tem handler de install', () => {
    assert(swJs.includes("self.addEventListener('install'"), 'SW deve ter evento install');
});

test('SW tem handler de activate', () => {
    assert(swJs.includes("self.addEventListener('activate'"), 'SW deve ter evento activate');
});

test('SW tem handler de fetch', () => {
    assert(swJs.includes("self.addEventListener('fetch'"), 'SW deve ter evento fetch');
});

test('SW usa skipWaiting no install', () => {
    assert(swJs.includes('self.skipWaiting()'), 'SW deve chamar skipWaiting()');
});

test('SW usa clients.claim no activate', () => {
    assert(swJs.includes('self.clients.claim()'), 'SW deve chamar clients.claim()');
});

test('SW tem fallback offline para navegação', () => {
    assert(swJs.includes("caches.match('./index.html')"), 'SW deve ter fallback para index.html offline');
});

test('SW tem fallback de imagem offline', () => {
    assert(swJs.includes("image/svg+xml"), 'SW deve ter fallback SVG para imagens offline');
});

test('SW cacheia tiles de mapa', () => {
    assert(swJs.includes('basemaps.cartocdn.com') || swJs.includes('tile.openstreetmap.org'),
        'SW deve cachear tiles de mapa');
});

test('todos os arquivos de imagem do disco estão no cache do SW', () => {
    const assetsMatch = swJs.match(/ASSETS_TO_CACHE\s*=\s*\[([\s\S]*?)\];/);
    const cachedUrls = new Set((assetsMatch[1].match(/'[^']+'/g) || []).map(u => u.replace(/'/g, '')));

    // Check all day photos
    const dayPhotoFiles = fs.readdirSync(path.join(BASE, 'img'))
        .filter(f => f.startsWith('dia-') && f.endsWith('.jpg'))
        .map(f => `./img/${f}`);

    const missingDayPhotos = dayPhotoFiles.filter(f => !cachedUrls.has(f));
    assert(missingDayPhotos.length === 0,
        `Fotos de dia não cacheadas: ${missingDayPhotos.join(', ')}`);

    // Check all activity photos
    const actPhotosFiles = fs.readdirSync(path.join(BASE, 'img', 'activities'))
        .filter(f => f.endsWith('.jpg'))
        .map(f => `./img/activities/${f}`);

    const missingActPhotos = actPhotosFiles.filter(f => !cachedUrls.has(f));
    assert(missingActPhotos.length === 0,
        `Fotos de atividades não cacheadas: ${missingActPhotos.join(', ')}`);
});

// ==================== 7. MANIFEST.JSON ====================
section('manifest.json — PWA Manifest');

test('manifest tem campos obrigatórios', () => {
    const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
    required.forEach((field) => {
        assert(manifestJson[field] !== undefined, `Campo '${field}' ausente`);
    });
});

test('display é standalone', () => {
    assertEqual(manifestJson.display, 'standalone');
});

test('lang é pt-BR', () => {
    assertEqual(manifestJson.lang, 'pt-BR');
});

test('start_url é ./', () => {
    assertEqual(manifestJson.start_url, './');
});

test('scope é ./', () => {
    assertEqual(manifestJson.scope, './');
});

test('icons referenciam arquivos que existem', () => {
    manifestJson.icons.forEach((icon) => {
        const filePath = path.join(BASE, icon.src);
        assert(fs.existsSync(filePath), `Icon '${icon.src}' não existe`);
    });
});

test('tem ícone 192x192', () => {
    assert(manifestJson.icons.some(i => i.sizes === '192x192'), 'deve ter ícone 192x192');
});

test('tem ícone 512x512', () => {
    assert(manifestJson.icons.some(i => i.sizes === '512x512'), 'deve ter ícone 512x512');
});

test('tem ícone maskable', () => {
    assert(manifestJson.icons.some(i => i.purpose === 'maskable'), 'deve ter ícone maskable');
});

test('background_color é uma cor válida', () => {
    assert(/^#[0-9a-fA-F]{6}$/.test(manifestJson.background_color),
        `background_color inválida: ${manifestJson.background_color}`);
});

test('theme_color é uma cor válida', () => {
    assert(/^#[0-9a-fA-F]{6}$/.test(manifestJson.theme_color),
        `theme_color inválida: ${manifestJson.theme_color}`);
});

test('shortcuts referenciam URLs válidas', () => {
    if (manifestJson.shortcuts) {
        manifestJson.shortcuts.forEach((s) => {
            assert(typeof s.name === 'string' && s.name.length > 0, 'shortcut name');
            assert(typeof s.url === 'string' && s.url.length > 0, 'shortcut url');
        });
    }
});

test('orientation é portrait', () => {
    assertEqual(manifestJson.orientation, 'portrait');
});

test('manifest descreve a mesma quantidade de dias da viagem', () => {
    assert(manifestJson.description.includes(`${days.length} dias`),
        `manifest description deve mencionar ${days.length} dias`);
});

// ==================== 8. INDEX.HTML — META TAGS ====================
section('index.html — Meta Tags & Head');

test('tem DOCTYPE html', () => {
    assert(indexHtml.startsWith('<!DOCTYPE html>'), 'deve começar com DOCTYPE');
});

test('lang é pt-BR', () => {
    assert(indexHtml.includes('lang="pt-BR"'), 'html lang deve ser pt-BR');
});

test('tem meta viewport com width=device-width', () => {
    assert(indexHtml.includes('width=device-width'), 'meta viewport deve ter width=device-width');
});

test('tem meta charset UTF-8', () => {
    assert(indexHtml.includes('charset="UTF-8"'), 'meta charset deve ser UTF-8');
});

test('tem link para manifest.json', () => {
    assert(indexHtml.includes('href="manifest.json"'), 'deve linkar manifest.json');
});

test('tem meta theme-color', () => {
    const match = indexHtml.match(/meta name="theme-color" content="(#[0-9a-fA-F]+)"/);
    assert(match, 'deve ter meta theme-color');
});

test('tem apple-mobile-web-app-capable', () => {
    assert(indexHtml.includes('apple-mobile-web-app-capable'), 'deve ter apple-mobile-web-app-capable');
});

test('tem apple-touch-icon', () => {
    assert(indexHtml.includes('apple-touch-icon'), 'deve ter apple-touch-icon');
});

test('tem preload da imagem hero', () => {
    assert(indexHtml.includes('rel="preload"') && indexHtml.includes('as="image"'),
        'deve precarregar a imagem hero');
});

test('tem registro do Service Worker', () => {
    assert(allJs.includes("navigator.serviceWorker.register('./sw.js')"),
        'deve registrar sw.js');
});

test('CSP permite tiles do mapa escuro e satélite', () => {
    assert(indexHtml.includes('https://*.basemaps.cartocdn.com'), 'CSP deve permitir CARTO tiles');
    assert(indexHtml.includes('https://server.arcgisonline.com'), 'CSP deve permitir Esri satellite tiles');
});

test('hero mostra a quantidade real de superchargers', () => {
    assert(indexHtml.includes(`<b>${superchargers.length}</b> SC`),
        `hero deve mostrar ${superchargers.length} SC`);
});

test('hero image tem alt contextualizado', () => {
    assert(!indexHtml.includes('alt="Day photo"'), 'hero image não deve usar alt genérico');
    assert(indexHtml.includes('alt="Foto do Dia 1'), 'hero image deve descrever o dia inicial');
});

// ==================== 9. INDEX.HTML — CSS CUSTOM PROPERTIES ====================
section('index.html — CSS & Theme');

test('tem variáveis CSS de tema definidas', () => {
    const vars = ['--bg', '--text', '--blue', '--gold', '--red', '--green', '--radius'];
    vars.forEach((v) => {
        assert(stylesCSS.includes(v + ':'), `Variável CSS ${v} ausente`);
    });
});

test('font-family Inter está definida', () => {
    assert(stylesCSS.includes("font-family: 'Inter'"), 'deve ter font-family Inter');
});

test('font inter.woff2 é referenciada', () => {
    assert(stylesCSS.includes('inter.woff2'), 'deve referenciar inter.woff2');
});

test('leaflet.css é carregado', () => {
    assert(indexHtml.includes('leaflet.css'), 'deve carregar leaflet.css');
});

// ==================== 10. INDEX.HTML — CORE FUNCTIONS ====================
section('index.html — Funções Core');

test('função showDay existe', () => {
    assert(allJs.includes('function showDay('), 'showDay deve existir');
});

test('função switchTab existe', () => {
    assert(allJs.includes('function switchTab('), 'switchTab deve existir');
});

test('função renderDaySelector existe', () => {
    assert(allJs.includes('function renderDaySelector('), 'renderDaySelector deve existir');
});

test('função renderDay existe', () => {
    assert(allJs.includes('function renderDay('), 'renderDay deve existir');
});

test('função toggleCheck existe', () => {
    assert(allJs.includes('function toggleCheck('), 'toggleCheck deve existir');
});

test('função toggleFav existe', () => {
    assert(allJs.includes('function toggleFav('), 'toggleFav deve existir');
});

test('função openDetail existe', () => {
    assert(allJs.includes('function openDetail('), 'openDetail deve existir');
});

test('função closeSheet existe', () => {
    assert(allJs.includes('function closeSheet('), 'closeSheet deve existir');
});

test('função initMap existe', () => {
    assert(allJs.includes('function initMap('), 'initMap deve existir');
});

test('função searchItems existe', () => {
    assert(allJs.includes('function searchItems('), 'searchItems deve existir');
});

test('função renderExplore existe', () => {
    assert(allJs.includes('function renderExplore('), 'renderExplore deve existir');
});

test('função shareDay existe', () => {
    assert(allJs.includes('function shareDay('), 'shareDay deve existir');
});

test('função openLightbox existe', () => {
    assert(allJs.includes('function openLightbox('), 'openLightbox deve existir');
});

test('função findPlaceInfo existe', () => {
    assert(allJs.includes('function findPlaceInfo('), 'findPlaceInfo deve existir');
});

test('função findPhoto existe', () => {
    assert(allJs.includes('function findPhoto('), 'findPhoto deve existir');
});

test('função getTodayDay existe', () => {
    assert(allJs.includes('function getTodayDay('), 'getTodayDay deve existir');
});

test('função updateCountdown existe', () => {
    assert(allJs.includes('function updateCountdown('), 'updateCountdown deve existir');
});

test('função exportUserData existe', () => {
    assert(allJs.includes('function exportUserData('), 'exportUserData deve existir');
});

test('função importUserData existe', () => {
    assert(allJs.includes('function importUserData('), 'importUserData deve existir');
});

// ==================== 11. INDEX.HTML — DAY COORDINATES ====================
section('index.html — Coordenadas dos Dias');

test('dayCoords definido para todos os 33 dias', () => {
    const match = allJs.match(/var dayCoords\s*=\s*\{([\s\S]*?)\};/);
    assert(match, 'dayCoords deve existir');
    for (let i = 1; i <= 33; i++) {
        assert(match[1].includes(`${i}:`), `dayCoords[${i}] ausente`);
    }
});

test('dayRouteIdx definido para todos os 33 dias', () => {
    // dayRouteIdx is built dynamically from route-data.js; verify the builder exists
    assert(appJs.includes('dayRouteIdx[d]') || appJs.includes('dayRouteIdx[day]'), 'dayRouteIdx must be built for all days');
    // Verify route-data.js has encodedRoutes for all driving days
    const routeCtx = vm.runInNewContext(routeDataJs + '\n;({encodedRoutes, routeDayOrder, decodePolyline})', {});
    const drivingDays = [5,7,8,9,10,11,14,15,16,18,19,20,21,22,25,26,27,29,30,33];
    drivingDays.forEach(d => {
        assert(routeCtx.encodedRoutes[d], `encodedRoutes[${d}] ausente`);
    });
});

test('dayStats definido para todos os 33 dias', () => {
    const match = allJs.match(/var dayStats\s*=\s*\{([\s\S]*?)\};/);
    assert(match, 'dayStats deve existir');
    for (let i = 1; i <= 33; i++) {
        assert(match[1].includes(`${i}:`), `dayStats[${i}] ausente`);
    }
});

test('dayStats tem km, drive e hotel para cada dia', () => {
    const match = allJs.match(/var dayStats\s*=\s*(\{[\s\S]*?\});/);
    assert(match, 'dayStats deve existir');
    // Parse the dayStats object
    const statsCode = `(${match[1]})`;
    const statsObj = vm.runInNewContext(statsCode);
    for (let i = 1; i <= 33; i++) {
        assert(statsObj[i], `dayStats[${i}] ausente`);
        assert(statsObj[i].km !== undefined, `dayStats[${i}].km ausente`);
        assert(statsObj[i].hotel !== undefined, `dayStats[${i}].hotel ausente`);
    }
});

test('routeCoords tem pontos suficientes', () => {
    // Route is now decoded from encoded polylines in route-data.js
    const routeCtx = vm.runInNewContext(routeDataJs + '\n;({encodedRoutes, routeDayOrder, decodePolyline})', {});
    let totalPts = 0;
    routeCtx.routeDayOrder.forEach(d => {
        const pts = routeCtx.decodePolyline(routeCtx.encodedRoutes[d]);
        assert(pts.length >= 10, `day ${d} deve ter ≥10 pontos (tem ${pts.length})`);
        totalPts += pts.length;
    });
    assert(totalPts >= 5000, `rota total deve ter ≥5000 pontos (tem ${totalPts})`);
});

test('dayRouteSegments tem segmentos para dias de estrada', () => {
    // dayRouteSegments is now decoded from route-data.js encodedRoutes
    const routeCtx = vm.runInNewContext(routeDataJs + '\n;({encodedRoutes, routeDayOrder, decodePolyline})', {});
    [5, 7, 8, 9, 10, 11, 14, 15, 16, 18, 19, 20, 21, 22, 25, 26, 27, 29, 30, 33].forEach((d) => {
        assert(routeCtx.encodedRoutes[d], `encodedRoutes[${d}] ausente`);
        const pts = routeCtx.decodePolyline(routeCtx.encodedRoutes[d]);
        assert(pts.length >= 2, `day ${d} deve ter ≥2 pontos na rota`);
    });
});

// ==================== 12. INDEX.HTML — ACTIVITY PHOTOS ====================
section('index.html — Activity Photos');

test('activityPhotos definido', () => {
    assert(allJs.includes('const activityPhotos'), 'activityPhotos deve existir');
});

test('activityPhotos referencia arquivos que existem', () => {
    const match = allJs.match(/const activityPhotos\s*=\s*\{([\s\S]*?)\};/);
    assert(match, 'activityPhotos deve existir');
    const photoRefs = match[1].match(/'img\/[^']+'/g) || [];
    const missing = [];
    photoRefs.forEach((ref) => {
        const file = ref.replace(/'/g, '');
        const filePath = path.join(BASE, file);
        if (!fs.existsSync(filePath)) missing.push(file);
    });
    assert(missing.length === 0, `Activity photos não encontradas: ${missing.join(', ')}`);
});

test('activityPhotos tem mapeamentos suficientes (>100)', () => {
    const match = allJs.match(/const activityPhotos\s*=\s*\{([\s\S]*?)\};/);
    const entries = match[1].match(/'[^']+'\s*:/g) || [];
    assert(entries.length > 100, `activityPhotos deve ter >100 entradas (tem ${entries.length})`);
});

// ==================== 13. INDEX.HTML — PLACE INFO ====================
section('index.html — Place Info');

test('placeInfo definido', () => {
    assert(allJs.includes('const placeInfo'), 'placeInfo deve existir');
});

test('placeInfo tem ≥100 locais', () => {
    const match = allJs.match(/const placeInfo\s*=\s*\{([\s\S]*?)\n\};/);
    assert(match, 'placeInfo deve existir');
    const keys = match[1].match(/'[^']+'\s*:\s*\{/g) || [];
    assert(keys.length >= 100, `placeInfo deve ter ≥100 locais (tem ${keys.length})`);
});

test('placeInfo entries têm coords ou addr', () => {
    const match = allJs.match(/const placeInfo\s*=\s*\{([\s\S]*?)\n\};/);
    // Just verify the structure is parseable and has addr/coords
    assert(match[1].includes('addr:'), 'placeInfo deve ter addr');
    assert(match[1].includes('coords:'), 'placeInfo deve ter coords');
});

// ==================== 14. INDEX.HTML — HTML STRUCTURE ====================
section('index.html — Estrutura HTML');

test('tem tab bar com 4 tabs', () => {
    const tabs = indexHtml.match(/class="tab-item/g);
    assert(tabs && tabs.length === 4, `deve ter 4 tab-items (tem ${tabs ? tabs.length : 0})`);
});

test('tem seção home', () => {
    assert(indexHtml.includes('id="sec-home"'), 'deve ter sec-home');
});

test('tem seção map', () => {
    assert(indexHtml.includes('id="sec-map"'), 'deve ter sec-map');
});

test('tem seção explore', () => {
    assert(indexHtml.includes('id="sec-explore"'), 'deve ter sec-explore');
});

test('tem seção settings', () => {
    assert(indexHtml.includes('id="sec-settings"'), 'deve ter sec-settings');
});

test('tem hero image', () => {
    assert(indexHtml.includes('id="heroImg"'), 'deve ter heroImg');
});

test('tem day selector container', () => {
    assert(indexHtml.includes('id="daySelector"'), 'deve ter daySelector');
});

test('tem day container', () => {
    assert(indexHtml.includes('id="dayContainer"'), 'deve ter dayContainer');
});

test('tem detail sheet', () => {
    assert(indexHtml.includes('id="sheet"'), 'deve ter sheet');
    assert(indexHtml.includes('id="sheetOverlay"'), 'deve ter sheetOverlay');
});

test('tem lightbox', () => {
    assert(indexHtml.includes('id="lightbox"'), 'deve ter lightbox');
});

test('tem toast', () => {
    assert(indexHtml.includes('id="toast"'), 'deve ter toast');
});

test('tem offline bar', () => {
    assert(indexHtml.includes('id="offlineBar"'), 'deve ter offlineBar');
});

test('tem map element', () => {
    assert(indexHtml.includes('id="map"'), 'deve ter elemento map');
});

test('tem search input', () => {
    assert(indexHtml.includes('id="searchInput"'), 'deve ter searchInput');
});

test('tem sync status display', () => {
    assert(indexHtml.includes('id="syncStatus"'), 'deve ter syncStatus');
});

// ==================== 15. INDEX.HTML — ACCESSIBILITY ====================
section('index.html — Acessibilidade');

test('tabs têm aria-label ou aria-selected', () => {
    assert(indexHtml.includes('aria-selected'), 'tabs devem ter aria-selected');
});

test('tab bar tem role tablist', () => {
    assert(indexHtml.includes('role="tablist"'), 'tab bar deve ter role="tablist"');
});

test('imagens têm alt text', () => {
    assert(indexHtml.includes('alt='), 'imagens devem ter atributo alt');
});

test('keyboard navigation com Escape fecha sheet', () => {
    assert(allJs.includes("e.key === 'Escape'"), 'deve fechar com Escape');
});

test('keyboard navigation com Arrow keys navega dias', () => {
    assert(allJs.includes("'ArrowLeft'") && allJs.includes("'ArrowRight'"),
        'deve navegar dias com setas');
});

test('focus trap no detail sheet', () => {
    assert(allJs.includes('Focus trap') || allJs.includes('focus trap') ||
        (allJs.includes("e.key === 'Tab'") && allJs.includes('sheet')),
        'deve ter focus trap no sheet');
});

// ==================== 16. INDEX.HTML — SYNC ENGINE ====================
section('index.html — SyncEngine');

test('SyncEngine está definido', () => {
    assert(allJs.includes('var SyncEngine'), 'SyncEngine deve existir');
});

test('SyncEngine.track existe', () => {
    assert(allJs.includes('track: function('), 'SyncEngine.track deve existir');
});

test('SyncEngine.push existe', () => {
    assert(allJs.includes('push: async function('), 'SyncEngine.push deve existir');
});

test('SyncEngine.pull existe', () => {
    assert(allJs.includes('pull: async function('), 'SyncEngine.pull deve existir');
});

test('SyncEngine.mergeRemote existe', () => {
    assert(allJs.includes('mergeRemote: function('), 'SyncEngine.mergeRemote deve existir');
});

test('toggleCheck integra com SyncEngine', () => {
    assert(allJs.includes("SyncEngine.track('check-'"), 'toggleCheck deve chamar SyncEngine.track');
});

test('toggleFav integra com SyncEngine', () => {
    assert(allJs.includes("SyncEngine.track('fav-'"), 'toggleFav deve chamar SyncEngine.track');
});

test('saveDayNote integra com SyncEngine', () => {
    assert(allJs.includes("SyncEngine.track('note-'"), 'saveDayNote deve chamar SyncEngine.track');
});

test('mergeRemote atualiza textarea de nota com id correto', () => {
    assert(allJs.includes("document.getElementById('daynote-' + dayNum)"),
        'mergeRemote deve procurar textarea daynote-N');
});

test('notas pessoais são escapadas ao renderizar', () => {
    assert(appJs.includes('function escapeHtml('), 'deve haver helper escapeHtml');
    assert(appJs.includes('escapeHtml(noteVal)'), 'renderização de notas deve escapar conteúdo');
});

test('sync usa Supabase REST API', () => {
    assert(syncJs.includes("method: 'POST'"), 'sync deve usar POST');
    assert(syncJs.includes('supabaseUrl'), 'sync deve ter supabaseUrl');
    assert(syncJs.includes('supabaseKey'), 'sync deve ter supabaseKey');
    assert(syncJs.includes('deviceId'), 'sync deve ter deviceId');
    assert(syncJs.includes('/rest/v1/user_data'), 'sync deve usar tabela user_data');
});

test('push snapshot queue atomicamente antes de async', () => {
    const pushCode = syncJs.match(/_doPush:\s*async\s*function[\s\S]*?this\.syncing\s*=\s*false/);
    assert(pushCode, '_doPush function');
    assert(pushCode[0].includes('.slice(') || pushCode[0].includes('.splice('), 'push deve usar slice ou splice para snapshot');
});

test('push tem retry com backoff exponencial', () => {
    assert(allJs.includes('pushRetries'), 'deve ter pushRetries');
    assert(allJs.includes('Math.pow(2,'), 'deve usar backoff exponencial');
});

test('pull drena fila pendente', () => {
    const pullMatch = allJs.match(/pull:\s*async\s*function\s*\(\)\s*\{([\s\S]*?)\n    \},/);
    assert(pullMatch, 'pull function');
    assert(pullMatch[1].includes('this.queue.length > 0'), 'pull deve checar fila');
    assert(pullMatch[1].includes('await this.push()'), 'pull deve drenar fila');
});

// ==================== 17. INDEX.HTML — OFFLINE SUPPORT ====================
section('index.html — Offline & PWA');

test('tem indicador offline', () => {
    assert(allJs.includes("navigator.onLine") || allJs.includes("'online'"),
        'deve detectar status online/offline');
});

test('tem listener de online/offline', () => {
    assert(allJs.includes("'online'") && allJs.includes("'offline'"),
        'deve ter listeners de online e offline');
});

test('tem cache de tiles do mapa', () => {
    assert(allJs.includes('cacheMapTiles'), 'deve ter função cacheMapTiles');
});

test('tem update toast para nova versão', () => {
    assert(allJs.includes('update-toast') || allJs.includes('Nova versão'),
        'deve ter toast de nova versão');
});

test('update toast não usa HTML inline para ação de reload', () => {
    assert(pwaJs.includes('showUpdateToast'), 'deve ter showUpdateToast');
    assert(pwaJs.includes('addEventListener'), 'botão de update deve usar addEventListener');
    assert(!pwaJs.includes('innerHTML'), 'pwa.js não deve montar update toast com innerHTML');
});

test('export/import de dados do usuário', () => {
    assert(allJs.includes('exportUserData') && allJs.includes('importUserData'),
        'deve ter export e import de dados');
});

// ==================== 18. INDEX.HTML — SWIPE GESTURE ====================
section('index.html — Gestos Touch');

test('tem swipe gesture para navegar dias', () => {
    assert(allJs.includes('touchstart') && allJs.includes('touchend'),
        'deve ter handlers de touch');
});

test('swipe tem threshold mínimo', () => {
    assert(allJs.includes('60') || allJs.includes('Math.abs(dx)'),
        'swipe deve ter distância mínima');
});

test('tem swipe hints visuais', () => {
    assert(allJs.includes('swipeHintL') && allJs.includes('swipeHintR'),
        'deve ter indicadores de swipe');
});

test('sheet tem pull-to-dismiss', () => {
    assert(allJs.includes('SHEET PULL-TO-DISMISS') || allJs.includes('pull-to-dismiss') ||
        (allJs.includes('sheet') && allJs.includes('translateY')),
        'sheet deve ter pull-to-dismiss');
});

test('lightbox tem pinch-to-zoom', () => {
    assert(allJs.includes('lbScale') && allJs.includes('touchmove'),
        'lightbox deve ter pinch-to-zoom');
});

// ==================== 19. CROSS-FILE CONSISTENCY ====================
section('Cross-file — Consistência entre arquivos');

test('totalDays no HTML === dias em data.js', () => {
    const matchNum = allJs.match(/totalDays\s*=\s*(\d+)/);
    const matchDyn = allJs.match(/totalDays\s*=\s*days\.length/);
    assert(matchNum || matchDyn, 'totalDays deve estar definido');
    if (matchNum) assertEqual(parseInt(matchNum[1]), days.length, 'totalDays deve bater com days.length');
});

test('dayPhotos referenciados no SW cache existem no data.js', () => {
    const assetsMatch = swJs.match(/ASSETS_TO_CACHE\s*=\s*\[([\s\S]*?)\];/);
    const cachedUrls = new Set((assetsMatch[1].match(/'[^']+'/g) || []).map(u => u.replace(/'/g, '')));

    Object.values(dayPhotos).forEach((photo) => {
        const swPath = './' + photo;
        assert(cachedUrls.has(swPath), `dayPhotos '${photo}' não está no SW cache`);
    });
});

test('manifest.json icons existem no SW cache', () => {
    const assetsMatch = swJs.match(/ASSETS_TO_CACHE\s*=\s*\[([\s\S]*?)\];/);
    const cachedUrls = new Set((assetsMatch[1].match(/'[^']+'/g) || []).map(u => u.replace(/'/g, '')));

    manifestJson.icons.forEach((icon) => {
        const swPath = './' + icon.src;
        assert(cachedUrls.has(swPath), `Manifest icon '${icon.src}' não está no SW cache`);
    });
});

test('data.js está no SW cache', () => {
    assert(swJs.includes("'./data.js'"), 'data.js deve estar no SW cache');
});

test('manifest.json está no SW cache', () => {
    assert(swJs.includes("'./manifest.json'"), 'manifest.json deve estar no SW cache');
});

test('leaflet.js local está no SW cache', () => {
    assert(swJs.includes("'./lib/leaflet.js'"), 'lib/leaflet.js deve estar no SW cache');
});

test('leaflet.css local está no SW cache', () => {
    assert(swJs.includes("'./lib/leaflet.css'"), 'lib/leaflet.css deve estar no SW cache');
});

test('marker icons estão no SW cache', () => {
    assert(swJs.includes("'./lib/marker-icon.png'"), 'marker-icon.png deve estar no cache');
    assert(swJs.includes("'./lib/marker-icon-2x.png'"), 'marker-icon-2x.png deve estar no cache');
    assert(swJs.includes("'./lib/marker-shadow.png'"), 'marker-shadow.png deve estar no cache');
});

test('font inter.woff2 está no SW cache', () => {
    assert(swJs.includes("'./fonts/inter.woff2'"), 'fonts/inter.woff2 deve estar no cache');
});

test('HTML carrega data.js', () => {
    assert(indexHtml.includes('src="data.js"'), 'index.html deve carregar data.js');
});

test('HTML carrega app.js', () => {
    assert(indexHtml.includes('src="app.js"'), 'index.html deve carregar app.js');
});

test('HTML carrega módulos pwa.js e sync.js', () => {
    assert(indexHtml.includes('src="pwa.js"'), 'index.html deve carregar pwa.js');
    assert(indexHtml.includes('src="sync.js"'), 'index.html deve carregar sync.js');
});

test('HTML carrega storage.js', () => {
    assert(indexHtml.includes('src="storage.js"'), 'index.html deve carregar storage.js');
});

test('HTML carrega styles.css', () => {
    assert(indexHtml.includes('href="styles.css"'), 'index.html deve linkar styles.css');
});

test('app.js está no SW cache', () => {
    assert(swJs.includes("'./app.js'"), 'app.js deve estar no SW cache');
});

test('módulos pwa.js e sync.js estão no SW cache', () => {
    assert(swJs.includes("'./pwa.js'"), 'pwa.js deve estar no SW cache');
    assert(swJs.includes("'./sync.js'"), 'sync.js deve estar no SW cache');
});

test('storage.js está no SW cache', () => {
    assert(swJs.includes("'./storage.js'"), 'storage.js deve estar no SW cache');
});

test('styles.css está no SW cache', () => {
    assert(swJs.includes("'./styles.css'"), 'styles.css deve estar no SW cache');
});

test('storage.js define StorageLayer object', () => {
    assert(storageJs.includes('var StorageLayer'), 'storage.js deve exportar StorageLayer');
    assert(storageJs.includes('get: function'), 'StorageLayer.get deve existir');
    assert(storageJs.includes('set: function'), 'StorageLayer.set deve existir');
    assert(storageJs.includes('remove: function'), 'StorageLayer.remove deve existir');
    assert(storageJs.includes('clear: function'), 'StorageLayer.clear deve existir');
});

test('storage.js suporta IndexedDB com fallback localStorage', () => {
    assert(storageJs.includes('indexedDB.open'), 'storage.js deve usar IndexedDB');
    assert(storageJs.includes('localStorage.getItem'), 'storage.js deve ter fallback localStorage');
    assert(storageJs.includes('this.db'), 'storage.js deve manter referência DB');
});

test('todos os arquivos estáticos existem no disco', () => {
    const files = [
        'index.html', 'data.js', 'app.js', 'styles.css', 'sw.js', 'manifest.json',
        'pwa.js', 'sync.js', 'storage.js',
        'icons/icon-192.png', 'icons/icon-512.png',
        'lib/leaflet.js', 'lib/leaflet.css',
        'lib/marker-icon.png', 'lib/marker-icon-2x.png', 'lib/marker-shadow.png',
        'fonts/inter.woff2'
    ];
    files.forEach((file) => {
        assert(fs.existsSync(path.join(BASE, file)), `Arquivo '${file}' não existe`);
    });
});

// ==================== 20. DATA LOGIC VALIDATION ====================
section('Validação Lógica dos Dados');

test('viagem começa dia 21/01 (qui) e termina 22/02 (seg)', () => {
    assert(days[0].title.includes('21/01'), 'Dia 1 deve ser 21/01');
    assert(days[32].title.includes('22/02'), 'Dia 33 deve ser 22/02');
});

test('primeiro hotel é checkin 21/01', () => {
    assertEqual(hotels[0].checkin, '21/01');
});

test('primeiro hotel é Marriott Marquis', () => {
    assert(hotels[0].name.includes('Marriott'), 'primeiro hotel deve ser Marriott');
});

test('último dia tem voo de volta', () => {
    const lastDay = days[32];
    const hasFlight = lastDay.items.some(i => i.text.includes('✈️') || i.text.includes('Voo'));
    assert(hasFlight, 'Dia 33 deve ter voo de volta');
});

test('dia 5 é drive LAX → SF', () => {
    const day5 = days[4];
    const hasDrive = day5.items.some(i => i.type === 'drive');
    assert(hasDrive, 'Dia 5 deve ter item drive');
});

test('regiões seguem a rota (NY→NV→UT→PNW→CA)', () => {
    // NY: dias 1-4
    for (let i = 0; i < 4; i++) assertEqual(days[i].region, 'ny', `Dia ${i + 1}`);
    // NV: dias 5-8 (LAX→Vegas, Mt.Charleston, Death Valley, GC→Page)
    for (let i = 4; i < 8; i++) assertEqual(days[i].region, 'nv', `Dia ${i + 1}`);
    // UT: dias 9-14 (Zion, Bryce, Capitol Reef, Moab, Canyonlands, Arches, Twin Falls)
    for (let i = 8; i < 14; i++) assertEqual(days[i].region, 'ut', `Dia ${i + 1}`);
    // PNW: dias 15-20 (The Dalles, Forks, Olympic, Rainier/Cannon Beach, Coos Bay, Crescent City)
    for (let i = 14; i < 20; i++) assertEqual(days[i].region, 'pnw', `Dia ${i + 1}`);
    // CA: dias 21-33 (Eureka, SF, Sequoia, Yosemite, Monterey, LA)
    for (let i = 20; i < 33; i++) assertEqual(days[i].region, 'ca', `Dia ${i + 1}`);
});

test('dias dos parques estão alinhados com o roteiro', () => {
    const expected = {
        'Zion': [9, 10],
        'Bryce Canyon': [10, 11],
        'Capitol Reef': [11],
        'Canyonlands': [12],
        'Arches': [13],
        'Olympic': [16, 17],
        'Mt. Rainier': [18],
        'Redwood': [21, 22],
        'Grand Canyon': [8],
        'Death Valley': [7],
        'Yosemite': [27, 28],
        'Sequoia': [25, 26]
    };
    Object.entries(expected).forEach(([name, expectedDays]) => {
        const park = parks.find(p => p.name.includes(name));
        assert(park, `Parque '${name}' ausente`);
        const actualDays = parseDaysSpec(park.days);
        assertEqual(JSON.stringify(actualDays), JSON.stringify(expectedDays),
            `Dias de '${name}'`);
    });
});

test('cada dia tem pelo menos 5 atividades', () => {
    days.forEach((d) => {
        assert(d.items.length >= 5, `Dia ${d.day}: apenas ${d.items.length} atividades (mínimo 5)`);
    });
});

test('cada dia tem pelo menos 1 item food (exceto dia de voo)', () => {
    days.forEach((d) => {
        if (d.day === 33) return; // dia do voo de volta, sem refeição listada
        const hasFood = d.items.some(i => i.type === 'food');
        assert(hasFood, `Dia ${d.day}: sem item de comida`);
    });
});

test('dias de estrada (>100km) têm items drive', () => {
    const driveDays = [5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 33];
    driveDays.forEach((d) => {
        const day = days[d - 1];
        const hasDrive = day.items.some(i => i.type === 'drive');
        assert(hasDrive, `Dia ${d}: dia de estrada sem item drive`);
    });
});

test('cada dia tem título no formato "Dia N — ..."', () => {
    days.forEach((d) => {
        assert(d.title.startsWith('Dia ' + d.day + ' — '),
            `Dia ${d.day}: título '${d.title}' não segue padrão`);
    });
});

// ==================== 21. SYNC — FONTES DE VERDADE DUPLICADAS ====================
// Estes testes existem porque o repo tem múltiplas cópias manuais do mesmo dado
// (days[] é fonte única, mas dayStats/hotelCoords/scCoords/driveDays em outros
// arquivos precisam ser mantidos em sync à mão). Ver ARCHITECTURE.md.
section('Sync — Fontes de Verdade Duplicadas');

function dayNumFor(ddmm) {
    const [dd, mm] = ddmm.split('/').map(Number);
    const d = new Date(2027, mm - 1, dd);
    const diffDays = Math.round((d - new Date(TRIP_START)) / 86400000);
    return diffDays + 1;
}

test('dayStats.hotel bate com hotels[] (checkin/checkout)', () => {
    const match = allJs.match(/var dayStats\s*=\s*(\{[\s\S]*?\});/);
    assert(match, 'dayStats deve existir');
    const dayStats = vm.runInNewContext('(' + match[1] + ')');

    const expected = {};
    hotels.forEach((h) => {
        const inDay = dayNumFor(h.checkin);
        const outDay = dayNumFor(h.checkout);
        for (let d = inDay; d < outDay; d++) expected[d] = h.name;
    });

    for (let d = 1; d <= 32; d++) {
        const exp = expected[d];
        const got = dayStats[d] && dayStats[d].hotel;
        assert(exp && got && exp.includes(got),
            `dayStats[${d}].hotel='${got}' não bate com hotels[] (esperado algo como '${exp}')`);
    }
});

test('dayStats tem exatamente days.length entradas', () => {
    const match = allJs.match(/var dayStats\s*=\s*(\{[\s\S]*?\});/);
    const dayStats = vm.runInNewContext('(' + match[1] + ')');
    assertEqual(Object.keys(dayStats).length, days.length,
        'dayStats deve ter uma entrada por dia, nem mais nem menos');
});

function haversineKm(a, b) {
    if (!a || !b) return Infinity;
    const R = 6371;
    const dLat = (b[0] - a[0]) * Math.PI / 180, dLng = (b[1] - a[1]) * Math.PI / 180;
    const lat1 = a[0] * Math.PI / 180, lat2 = b[0] * Math.PI / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}

test('dayCoords[N] aponta pro hotel do dia N, não do dia anterior (bug de fly-to)', () => {
    // Achado real: 12/33 dias tinham dayCoords copiado do hotel de ONTEM (mapa
    // voava pro lugar errado ao trocar de dia). Dia 13 é exceção documentada:
    // ponto de atividade dentro do Olympic NP, não o hotel de Forks (~125km, intencional).
    const dcMatch = appJs.match(/var dayCoords\s*=\s*\{([\s\S]*?)\};/);
    assert(dcMatch, 'dayCoords deve existir');
    const dayCoords = vm.runInNewContext('({' + dcMatch[1] + '})');

    const hotelCoordsSrc = fs.readFileSync(path.join(BASE, 'hotel-coords.js'), 'utf8');
    const hcMatch = hotelCoordsSrc.match(/const hotelCoords = \{([\s\S]*?)\};/);
    const hotelCoords = vm.runInNewContext('({' + hcMatch[1] + '})');

    const expected = {};
    hotels.forEach((h) => {
        const inDay = dayNumFor(h.checkin), outDay = dayNumFor(h.checkout);
        for (let d = inDay; d < outDay; d++) expected[d] = h.name;
    });
    expected[33] = hotels[hotels.length - 1].name;

    const KNOWN_ACTIVITY_POINT_DAYS = [13]; // documentado em ARCHITECTURE.md

    for (let d = 1; d <= 33; d++) {
        if (KNOWN_ACTIVITY_POINT_DAYS.includes(d)) continue;
        const hotelName = expected[d];
        const key = Object.keys(hotelCoords).find(k => hotelName && hotelName.includes(k));
        const expCoord = key ? hotelCoords[key] : null;
        const dist = haversineKm(dayCoords[d], expCoord);
        assert(dist <= 90, `dayCoords[${d}]=${JSON.stringify(dayCoords[d])} está a ${dist.toFixed(0)}km do hotel esperado '${hotelName}' — provável cópia do dia anterior`);
    }
});

test('dayStats.km bate com distância real da rota (route-data.js, tolerância 20%)', () => {
    // Achado real: km era estimativa digitada à mão, nunca validada contra a
    // geometria OSRM real. route-data.js é a fonte de verdade de distância —
    // se dessincronizar de novo (waypoint mudou, dia reorganizado), isso trava.
    const match = allJs.match(/var dayStats\s*=\s*(\{[\s\S]*?\});/);
    const dayStats = vm.runInNewContext('(' + match[1] + ')');
    const routeCtx = vm.runInNewContext(routeDataJs + '\n;({encodedRoutes, routeDayOrder, decodePolyline})', {});

    routeCtx.routeDayOrder.forEach((d) => {
        const pts = routeCtx.decodePolyline(routeCtx.encodedRoutes[d]);
        let real = 0;
        for (let i = 1; i < pts.length; i++) real += haversineKm(pts[i - 1], pts[i]);
        const statKm = dayStats[d] ? dayStats[d].km : null;
        const statNum = parseInt(String(statKm).replace(/[^0-9]/g, '')) || 0;
        assert(statNum > 0, `dayStats[${d}].km ausente ou inválido`);
        const pctDiff = Math.abs(real - statNum) / statNum * 100;
        assert(pctDiff <= 20, `dayStats[${d}].km='${statKm}' mas rota real é ~${real.toFixed(0)}km (${pctDiff.toFixed(0)}% de diferença)`);
    });
});

test('app.js: scCoords cobre todos os superchargers (sem sumir do mapa)', () => {
    const scMatch = appJs.match(/var scCoords\s*=\s*\{([\s\S]*?)\};/);
    assert(scMatch, 'scCoords deve existir em app.js');
    const keys = [...scMatch[1].matchAll(/"([^"]+)"\s*:/g)].map(m => m[1]);
    const missing = new Set();
    superchargers.forEach((sc) => {
        if (!keys.includes(sc.name)) missing.add(sc.name);
    });
    assert(missing.size === 0, `Superchargers sem coordenada em scCoords: ${[...missing].join(', ')}`);
});

test('highlights nomeados (<strong>) têm placeInfo (sem card sem endereço/link de mapa)', () => {
    // Achado real: 7 lugares citados como destaque (type:"highlight") não tinham
    // findPlaceInfo() — card ficava sem endereço/coords/link de mapa. Lista de
    // exceção = frases descritivas dentro de <strong> que não são nome de lugar
    // (ex: "Pôr do sol no X"), não bug de cobertura.
    // Foto (findPhoto) não é obrigatória aqui: sem match, card usa placeholder
    // gradiente — degrada bem, não vale travar teste por isso.
    const NOT_A_PLACE_NAME = [
        'baleias cinzentas!', 'Pôr do sol no Colorado River', 'Pôr do sol no Watchman Overlook',
    ];
    const placesCtx = vm.runInNewContext(placesJs.replace(/const /g, 'var ') + '\n;({findPlaceInfo})', {});

    const missing = [];
    const seen = new Set();
    days.forEach((d) => {
        d.items.forEach((item) => {
            if (item.type !== 'highlight') return;
            const names = [...item.text.matchAll(/<strong>([^<]+)<\/strong>/g)].map((m) => m[1]);
            names.forEach((name) => {
                if (NOT_A_PLACE_NAME.includes(name) || seen.has(name)) return;
                seen.add(name);
                if (!placesCtx.findPlaceInfo(name)) missing.push(`Dia ${d.day}: '${name}' sem placeInfo`);
            });
        });
    });
    assert(missing.length === 0, missing.join('; '));
});

test('tools/generate-routes.js: dayWaypoints cobre os mesmos dias que routeDayOrder', () => {
    const genSrc = fs.readFileSync(path.join(BASE, 'tools', 'generate-routes.js'), 'utf8');
    const routeCtx = vm.runInNewContext(routeDataJs + '\n;({routeDayOrder})', {});
    const dwMatch = genSrc.match(/const dayWaypoints = \{([\s\S]*?)\n\};/);
    assert(dwMatch, 'dayWaypoints deve existir em generate-routes.js');
    routeCtx.routeDayOrder.forEach((d) => {
        assert(new RegExp(`\\n\\s*${d}:\\s*\\[`).test(dwMatch[1]),
            `dayWaypoints[${d}] ausente — se rodar o gerador de novo, dia ${d} some do mapa`);
    });
});

// ==================== PRINT RESULTS ====================
console.log('\n🧪 Viagem EUA 2027 — Test Suite Completo\n');
console.log('='.repeat(60));

let currentSec = '';
results.forEach((r) => {
    if (r.section !== currentSec) {
        currentSec = r.section;
        console.log(`\n📦 ${currentSec}`);
    }
    if (r.status === '✅') {
        console.log(`  ${r.status} ${r.name}`);
    } else {
        console.log(`  ${r.status} ${r.name}`);
        console.log(`     → ${r.error}`);
    }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Resultado: ${passed}/${total} passaram, ${failed} falharam\n`);

if (failed > 0) {
    console.log('❌ FALHAS:');
    results.filter(r => r.status === '❌').forEach((r) => {
        console.log(`  • [${r.section}] ${r.name}`);
        console.log(`    ${r.error}`);
    });
    console.log('');
}

process.exit(failed > 0 ? 1 : 0);
