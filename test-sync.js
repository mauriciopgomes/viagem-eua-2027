// ============================================================
// test-sync.js — Testes automatizados do SyncEngine
// Run: node test-sync.js
// ============================================================

const fs = require('fs');

// ==================== TEST FRAMEWORK ====================
let passed = 0, failed = 0, total = 0;
const results = [];

function test(name, fn) {
    total++;
    try {
        fn();
        passed++;
        results.push({ name, status: '✅' });
    } catch (e) {
        failed++;
        results.push({ name, status: '❌', error: e.message });
    }
}

async function testAsync(name, fn) {
    total++;
    try {
        await fn();
        passed++;
        results.push({ name, status: '✅' });
    } catch (e) {
        failed++;
        results.push({ name, status: '❌', error: e.message });
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

function assertIncludes(arr, item, msg) {
    if (!arr.includes(item)) {
        throw new Error((msg || 'assertIncludes') + `: ${JSON.stringify(item)} not found`);
    }
}

// ==================== MOCKS ====================
function createMocks() {
    const storage = {};
    const localStorage = {
        getItem: (k) => storage[k] !== undefined ? storage[k] : null,
        setItem: (k, v) => { storage[k] = String(v); },
        removeItem: (k) => { delete storage[k]; },
        clear: () => { Object.keys(storage).forEach(k => delete storage[k]); },
        get length() { return Object.keys(storage).length; },
        key: (i) => Object.keys(storage)[i],
        _store: storage
    };

    let fetchCalls = [];
    let fetchDelay = 0;
    let fetchShouldFail = false;
    let fetchResponse = { ok: true, data: {} };
    let fetchResolvers = [];

    function mockFetch(url) {
        fetchCalls.push(url);
        if (fetchShouldFail) return Promise.reject(new Error('Network error'));
        const p = new Promise((resolve) => {
            const finish = () => resolve({
                ok: fetchResponse.ok,
                status: fetchResponse.ok ? 200 : 500,
                json: () => Promise.resolve(JSON.parse(JSON.stringify(fetchResponse)))
            });
            if (fetchDelay > 0) {
                fetchResolvers.push(finish);
            } else {
                finish();
            }
        });
        return p;
    }

    let timers = [];
    let timerIdCounter = 0;
    function mockSetTimeout(fn, ms) {
        timers.push({ id: ++timerIdCounter, fn, ms });
        return timerIdCounter;
    }
    function mockClearTimeout(id) {
        timers = timers.filter(t => t.id !== id);
    }

    return {
        localStorage,
        fetchCalls,
        get fetchShouldFail() { return fetchShouldFail; },
        set fetchShouldFail(v) { fetchShouldFail = v; },
        get fetchDelay() { return fetchDelay; },
        set fetchDelay(v) { fetchDelay = v; },
        fetchResponse,
        fetchResolvers,
        fetch: mockFetch,
        timers,
        setTimeout: mockSetTimeout,
        clearTimeout: mockClearTimeout,
        flushTimers() {
            const t = [...timers];
            timers.length = 0;
            t.forEach(x => x.fn());
        },
        flushTimersByMaxDelay(maxMs) {
            const t = timers.filter(x => x.ms <= maxMs);
            timers = timers.filter(x => x.ms > maxMs);
            this.timers = timers;
            t.forEach(x => x.fn());
        },
        resolvePendingFetches() {
            const r = [...fetchResolvers];
            fetchResolvers.length = 0;
            r.forEach(fn => fn());
        },
        reset() {
            Object.keys(storage).forEach(k => delete storage[k]);
            fetchCalls.length = 0;
            fetchShouldFail = false;
            fetchDelay = 0;
            fetchResponse.ok = true;
            fetchResponse.data = {};
            fetchResolvers.length = 0;
            timers.length = 0;
            timerIdCounter = 0;
        }
    };
}

// Create a fresh SyncEngine with mocks
function createSyncEngine(mocks) {
    const SE = {
        url: 'https://fake-apps-script.test/exec',
        queue: JSON.parse(mocks.localStorage.getItem('syncQueue') || '[]'),
        syncing: false,
        debounceTimer: null,
        pushRetries: 0,

        track: function(key, value) {
            if (!this.url) return;
            var ts = Date.now();
            mocks.localStorage.setItem('_ts_' + key, ts);
            this.queue.push({ key: key, value: value, ts: ts });
            mocks.localStorage.setItem('syncQueue', JSON.stringify(this.queue));
            this.debouncedSync();
        },

        debouncedSync: function() {
            var self = this;
            if (self.debounceTimer) mocks.clearTimeout(self.debounceTimer);
            self.debounceTimer = mocks.setTimeout(function() { self.push(); }, 3000);
        },

        push: async function() {
            if (!this.url || this.syncing || this.queue.length === 0) return;
            this.syncing = true;
            var snapshotLen = this.queue.length;
            var snapshot = this.queue.slice(0, snapshotLen);
            var latest = {};
            snapshot.forEach(function(e) {
                if (!latest[e.key] || e.ts > latest[e.key].ts) latest[e.key] = e;
            });
            var changes = Object.values(latest);
            try {
                var BATCH = 15;
                for (var i = 0; i < changes.length; i += BATCH) {
                    var chunk = changes.slice(i, i + BATCH);
                    var payload = encodeURIComponent(JSON.stringify({ changes: chunk }));
                    var resp = await mocks.fetch(this.url + '?action=push&data=' + payload);
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                }
                var pullResp = await mocks.fetch(this.url);
                var result = await pullResp.json();
                this.queue.splice(0, snapshotLen);
                mocks.localStorage.setItem('syncQueue', JSON.stringify(this.queue));
                this.pushRetries = 0;
            } catch(e) {
                this.pushRetries = Math.min((this.pushRetries || 0) + 1, 5);
                var delay = Math.min(3000 * Math.pow(2, this.pushRetries - 1), 30000);
                var self = this;
                this.syncing = false;
                mocks.setTimeout(function() { self.push(); }, delay);
                return;
            }
            this.syncing = false;
            if (this.queue.length > 0) {
                var self = this;
                mocks.setTimeout(function() { self.push(); }, 1000);
            }
        },

        pull: async function() {
            if (!this.url || this.syncing) return;
            if (this.queue.length > 0) {
                await this.push();
                return;
            }
            this.syncing = true;
            try {
                var resp = await mocks.fetch(this.url);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                var result = await resp.json();
            } catch(e) { /* ignore */ }
            this.syncing = false;
        }
    };
    return SE;
}

// ==================== TESTS ====================
async function runTests() {
    console.log('\n🧪 Viagem EUA 2027 — Sync Engine Tests\n');

    // ---- 1. track() ----
    await testAsync('track() adiciona item à fila', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.track('check-1-0', '1');
        assertEqual(se.queue.length, 1, 'queue length');
        assertEqual(se.queue[0].key, 'check-1-0', 'key');
        assertEqual(se.queue[0].value, '1', 'value');
    });

    await testAsync('track() salva fila no localStorage', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.track('fav-2-3', '1');
        const saved = JSON.parse(m.localStorage.getItem('syncQueue'));
        assertEqual(saved.length, 1, 'localStorage queue length');
        assertEqual(saved[0].key, 'fav-2-3', 'saved key');
    });

    await testAsync('track() salva timestamp no localStorage', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.track('check-5-1', '1');
        const ts = m.localStorage.getItem('_ts_check-5-1');
        assert(ts && parseInt(ts) > 0, 'timestamp should be positive');
    });

    await testAsync('track() agenda debounce de 3s', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.track('check-1-0', '1');
        assertEqual(m.timers.length, 1, 'should have 1 timer');
        assertEqual(m.timers[0].ms, 3000, 'debounce should be 3s');
    });

    // ---- 2. Debounce ----
    await testAsync('debounce: múltiplos tracks mantêm apenas 1 timer', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.track('check-1-0', '1');
        se.track('check-1-1', '1');
        se.track('check-1-2', '1');
        assertEqual(m.timers.length, 1, 'should have only 1 timer after 3 tracks');
        assertEqual(se.queue.length, 3, 'queue should have 3 items');
    });

    // ---- 3. Push ----
    await testAsync('push() envia items e limpa fila', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.track('check-1-0', '1');
        se.track('check-2-0', '1');
        m.timers.length = 0; // clear debounce timers
        await se.push();
        assertEqual(se.queue.length, 0, 'queue should be empty after push');
        assertEqual(se.syncing, false, 'syncing should be false');
        assert(m.fetchCalls.length >= 2, 'should have fetch calls (push + pull)');
    });

    await testAsync('push() deduplica por key (mantém último)', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });
        se.queue.push({ key: 'check-1-0', value: '0', ts: 200 });
        se.queue.push({ key: 'check-1-0', value: '1', ts: 300 });
        await se.push();
        // Should have sent 1 push request (1 unique key, < 15 batch) + 1 pull
        const pushCalls = m.fetchCalls.filter(u => u.includes('action=push'));
        assertEqual(pushCalls.length, 1, 'should batch into 1 push call');
        const payload = decodeURIComponent(pushCalls[0].split('data=')[1]);
        const data = JSON.parse(payload);
        assertEqual(data.changes.length, 1, 'should deduplicate to 1 change');
        assertEqual(data.changes[0].ts, 300, 'should keep latest timestamp');
    });

    // ---- 4. Race condition fix ----
    await testAsync('push() não perde items adicionados durante o envio', async () => {
        const m = createMocks();
        m.fetchDelay = 1; // simulate slow fetch
        const se = createSyncEngine(m);

        // Add initial items
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });
        se.queue.push({ key: 'check-1-1', value: '1', ts: 101 });

        // Start push (will wait for fetch to resolve)
        const pushPromise = se.push();

        // Simulate items added DURING push (before fetch resolves)
        se.queue.push({ key: 'check-1-2', value: '1', ts: 200 });
        se.queue.push({ key: 'check-1-3', value: '1', ts: 201 });

        // Now resolve the fetch
        m.resolvePendingFetches(); // push request
        await new Promise(r => globalThis.setTimeout(r, 10));
        m.resolvePendingFetches(); // pull request
        await pushPromise;

        // Items added during push should still be in queue
        assertEqual(se.queue.length, 2, 'items added during push should remain');
        assertEqual(se.queue[0].key, 'check-1-2', 'first remaining item');
        assertEqual(se.queue[1].key, 'check-1-3', 'second remaining item');
    });

    // ---- 5. Push retry on failure ----
    await testAsync('push() faz retry com backoff em caso de falha', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        m.fetchShouldFail = true;

        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });
        await se.push();

        // Should have scheduled a retry
        assertEqual(se.syncing, false, 'syncing should be reset after failure');
        assertEqual(se.pushRetries, 1, 'retry counter should be 1');
        const retryTimer = m.timers.find(t => t.ms === 3000);
        assert(retryTimer, 'should schedule retry at 3s');
        assertEqual(se.queue.length, 1, 'queue should keep failed items');
    });

    await testAsync('push() backoff exponencial: 3s, 6s, 12s...', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        m.fetchShouldFail = true;
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });

        // First failure → 3s
        await se.push();
        assertEqual(se.pushRetries, 1);
        assert(m.timers.some(t => t.ms === 3000), '1st retry at 3s');
        m.timers.length = 0;

        // Second failure → 6s
        await se.push();
        assertEqual(se.pushRetries, 2);
        assert(m.timers.some(t => t.ms === 6000), '2nd retry at 6s');
        m.timers.length = 0;

        // Third failure → 12s
        await se.push();
        assertEqual(se.pushRetries, 3);
        assert(m.timers.some(t => t.ms === 12000), '3rd retry at 12s');
    });

    await testAsync('push() reseta retries após sucesso', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.pushRetries = 3;
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });
        await se.push();
        assertEqual(se.pushRetries, 0, 'retries should reset on success');
    });

    // ---- 6. Push sem navigator.onLine ----
    await testAsync('push() funciona sem checar navigator.onLine', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        // navigator.onLine would be false in old code — push should still work
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });
        await se.push();
        assertEqual(se.queue.length, 0, 'should push regardless of onLine');
        assert(m.fetchCalls.length > 0, 'should have made fetch calls');
    });

    // ---- 7. Pull drena fila ----
    await testAsync('pull() drena fila pendente antes de puxar', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });
        await se.pull();
        // pull should have called push (which sends + pulls), so queue should be drained
        assertEqual(se.queue.length, 0, 'queue should be drained');
        // The push includes a pull at the end, so there should be push+pull fetch calls
        const pushCalls = m.fetchCalls.filter(u => u.includes('action=push'));
        assert(pushCalls.length > 0, 'should have pushed pending items');
    });

    await testAsync('pull() faz fetch direto se fila está vazia', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        await se.pull();
        assertEqual(m.fetchCalls.length, 1, 'should make 1 fetch (pull only)');
        assert(!m.fetchCalls[0].includes('action=push'), 'should be a GET without push action');
    });

    // ---- 8. Batching ----
    await testAsync('push() faz batch de 15 items por request', async () => {
        const m = createMocks();
        const se = createSyncEngine(m);
        for (let i = 0; i < 20; i++) {
            se.queue.push({ key: 'check-1-' + i, value: '1', ts: 100 + i });
        }
        await se.push();
        const pushCalls = m.fetchCalls.filter(u => u.includes('action=push'));
        assertEqual(pushCalls.length, 2, 'should split 20 items into 2 batches');
    });

    // ---- 9. Queue persistence ----
    await testAsync('fila persiste no localStorage entre instâncias', async () => {
        const m = createMocks();
        const se1 = createSyncEngine(m);
        se1.track('check-1-0', '1');
        se1.track('fav-2-1', '1');

        // Create new SyncEngine (simulates page reload)
        const se2 = createSyncEngine(m);
        assertEqual(se2.queue.length, 2, 'new instance should load queue from localStorage');
    });

    // ---- 10. Concurrent push protection ----
    await testAsync('push() não roda se já tem push em andamento', async () => {
        const m = createMocks();
        m.fetchDelay = 1;
        const se = createSyncEngine(m);
        se.queue.push({ key: 'check-1-0', value: '1', ts: 100 });

        const p1 = se.push(); // starts, sets syncing=true
        assertEqual(se.syncing, true, 'should be syncing');

        // Try to push again — should return immediately
        se.queue.push({ key: 'check-2-0', value: '1', ts: 200 });
        await se.push(); // should be a no-op

        m.resolvePendingFetches();
        await new Promise(r => globalThis.setTimeout(r, 10));
        m.resolvePendingFetches();
        await p1;

        // Second item should still be in queue (not lost)
        assertEqual(se.queue.length, 1, 'concurrent item should remain');
    });

    // ---- 11. Verificação do código real ----
    test('index.html: SyncEngine não usa navigator.onLine no push', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        const pushMatch = html.match(/push:\s*async\s*function\s*\(\)\s*\{([\s\S]*?)\n    \},/);
        assert(pushMatch, 'should find push function');
        assert(!pushMatch[1].includes('navigator.onLine'), 'push should NOT check navigator.onLine');
    });

    test('index.html: SyncEngine não usa navigator.onLine no pull', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        const pullMatch = html.match(/pull:\s*async\s*function\s*\(\)\s*\{([\s\S]*?)\n    \},/);
        assert(pullMatch, 'should find pull function');
        assert(!pullMatch[1].includes('navigator.onLine'), 'pull should NOT check navigator.onLine');
    });

    test('index.html: push faz splice em vez de queue=[]', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        const pushCode = html.match(/push:\s*async\s*function[\s\S]*?this\.syncing\s*=\s*false/);
        assert(pushCode, 'should find push function');
        assert(pushCode[0].includes('.splice('), 'push should use splice to remove sent items');
        assert(!pushCode[0].includes('this.queue = []'), 'push should NOT reset queue to empty array');
    });

    test('index.html: push tem retry com backoff', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        assert(html.includes('pushRetries'), 'should have pushRetries counter');
        assert(html.includes('Math.pow(2,'), 'should use exponential backoff');
    });

    test('index.html: pull drena fila pendente', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        const pullMatch = html.match(/pull:\s*async\s*function\s*\(\)\s*\{([\s\S]*?)\n    \},/);
        assert(pullMatch, 'should find pull function');
        assert(pullMatch[1].includes('this.queue.length > 0'), 'pull should check for pending items');
        assert(pullMatch[1].includes('await this.push()'), 'pull should push pending items');
    });

    test('index.html: toggleCheck chama SyncEngine.track', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        assert(html.includes("SyncEngine.track('check-'"), 'toggleCheck patch should call SyncEngine.track for checks');
    });

    test('index.html: toggleFav chama SyncEngine.track', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        assert(html.includes("SyncEngine.track('fav-'"), 'toggleFav patch should call SyncEngine.track for favs');
    });

    test('index.html: saveDayNote chama SyncEngine.track', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        assert(html.includes("SyncEngine.track('note-'"), 'saveDayNote patch should call SyncEngine.track for notes');
    });

    test('index.html: SW não faz window.location.reload() automático', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        const swBlock = html.match(/serviceWorker\.register[\s\S]*?\}\);[\s\S]*?\}/);
        assert(swBlock, 'should find SW registration block');
        // The reload should only be inside an onclick handler, not automatic
        assert(!swBlock[0].includes("window.location.reload();\n"), 'should NOT auto-reload on SW update');
    });

    test('index.html: poll interval é 30s', () => {
        const html = fs.readFileSync('index.html', 'utf8') + '\n' + fs.readFileSync('app.js', 'utf8');
        assert(html.includes('}, 30000);'), 'poll interval should be 30000ms (30s)');
        assert(!html.includes('}, 120000);'), 'should NOT have old 120000ms interval');
    });

    test('sw.js: precache não referencia arquivos inexistentes', () => {
        const sw = fs.readFileSync('sw.js', 'utf8');
        const matches = [...sw.matchAll(/'\.\/img\/activities\/([^']+)'/g)];
        const missing = matches.filter(m => !fs.existsSync('img/activities/' + m[1]));
        assert(missing.length === 0, 'Missing files: ' + missing.map(m => m[1]).join(', '));
    });

    test('sw.js: todos os arquivos de img/activities/ estão no precache', () => {
        const sw = fs.readFileSync('sw.js', 'utf8');
        const files = fs.readdirSync('img/activities/').filter(f => f.endsWith('.jpg'));
        const missing = files.filter(f => !sw.includes(f));
        assert(missing.length === 0, 'Not in precache: ' + missing.join(', '));
    });

    test('sw.js: todos os dayPhotos do data.js estão no precache', () => {
        const sw = fs.readFileSync('sw.js', 'utf8');
        const dataJs = fs.readFileSync('data.js', 'utf8');
        const dayPhotoFiles = [...dataJs.matchAll(/['"]img\/([^'"]+)['"]/g)].map(m => m[1]);
        const missing = dayPhotoFiles.filter(f => !sw.includes(f) && fs.existsSync('img/' + f));
        assert(missing.length === 0, 'dayPhotos not in precache: ' + missing.join(', '));
    });

    // ==================== RESULTS ====================
    console.log('');
    results.forEach(r => {
        console.log(`  ${r.status} ${r.name}`);
        if (r.error) console.log(`     → ${r.error}`);
    });
    console.log(`\n  ${passed}/${total} passed` + (failed > 0 ? ` (${failed} failed)` : '') + '\n');
    process.exit(failed > 0 ? 1 : 0);
}

runTests();
