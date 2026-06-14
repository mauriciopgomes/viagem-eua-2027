// ==================== GOOGLE SHEETS SYNC ====================
var SyncEngine = {
    defaultUrl: 'https://script.google.com/macros/s/AKfycbyEfTe62Z58eUSE5KOTzRy6Tm5DoDIso6qZPE1MsUXU1bdzA9ObT2eyWTKfeCZDgfp-Og/exec',
    url: (function() {
        var saved = localStorage.getItem('syncUrl');
        var def = 'https://script.google.com/macros/s/AKfycbyEfTe62Z58eUSE5KOTzRy6Tm5DoDIso6qZPE1MsUXU1bdzA9ObT2eyWTKfeCZDgfp-Og/exec';
        // Reset if user has old/stale URL.
        if (saved && saved !== def && saved.indexOf('AKfycbzYaHa1') !== -1) {
            localStorage.removeItem('syncUrl');
            return def;
        }
        return saved || def;
    })(),
    queue: JSON.parse(localStorage.getItem('syncQueue') || '[]'),
    syncing: false,
    debounceTimer: null,
    pushRetries: 0,

    track: function(key, value) {
        if (!this.url) return;
        var ts = Date.now();
        localStorage.setItem('_ts_' + key, ts);
        this.queue.push({ key: key, value: value, ts: ts });
        localStorage.setItem('syncQueue', JSON.stringify(this.queue));
        this.debouncedSync();
    },

    debouncedSync: function() {
        var self = this;
        if (self.debounceTimer) clearTimeout(self.debounceTimer);
        self.debounceTimer = setTimeout(function() { self.push(); }, 3000);
    },

    push: async function() {
        if (!this.url || this.syncing || this.queue.length === 0) return;
        if (navigator.locks) {
            var self = this;
            return navigator.locks.request('sync-push', { ifAvailable: true }, function(lock) {
                if (!lock) return;
                return self._doPush();
            });
        }
        return this._doPush();
    },

    _sendChunk: async function(chunk) {
        var body = JSON.stringify({ changes: chunk });
        try {
            var postResp = await fetch(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: body
            });
            if (postResp.ok) return postResp;
        } catch(e) {
            console.warn('Sync POST fallback:', e);
        }

        var payload = encodeURIComponent(body);
        return fetch(this.url + '?action=push&data=' + payload);
    },

    _doPush: async function() {
        if (this.syncing) return;
        this.syncing = true;
        this.updateUI('syncing');
        var snapshotLen = this.queue.length;
        var snapshot = this.queue.slice(0, snapshotLen);
        var latest = {};
        snapshot.forEach(function(e) {
            if (!latest[e.key] || e.ts > latest[e.key].ts) latest[e.key] = e;
        });
        var changes = Object.values(latest);
        try {
            var BATCH = 50;
            var result = null;
            for (var i = 0; i < changes.length; i += BATCH) {
                var chunk = changes.slice(i, i + BATCH);
                var resp = await this._sendChunk(chunk);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                result = await resp.json();
            }
            if (!result) {
                var pullResp = await fetch(this.url);
                result = await pullResp.json();
            }
            this.queue.splice(0, snapshotLen);
            localStorage.setItem('syncQueue', JSON.stringify(this.queue));
            if (result && result.data) this.mergeRemote(result.data);
            this.updateUI('synced');
            this.pushRetries = 0;
        } catch(e) {
            console.warn('Sync push failed:', e);
            var maxRetries = 10;
            this.pushRetries = (this.pushRetries || 0) + 1;
            // Tratar HTTP 429 (rate limit) e 403 (auth) separadamente
            var errMsg = String(e && e.message ? e.message : e);
            if (errMsg.indexOf('429') !== -1) {
                // Rate limit: esperar mais antes de tentar novamente
                this.pushRetries = Math.max(this.pushRetries, 4);
            }
            if (errMsg.indexOf('403') !== -1) {
                // Auth error: não tentar novamente, avisar usuário
                this.updateUI('autherror');
                this.syncing = false;
                this.pushRetries = 0;
                return;
            }
            if (this.pushRetries >= maxRetries) {
                console.error('Sync push: máximo de tentativas atingido (' + maxRetries + ')');
                this.updateUI('maxretry');
                this.syncing = false;
                this.pushRetries = 0;
                return;
            }
            this.updateUI('error');
            var delay = Math.min(3000 * Math.pow(2, this.pushRetries - 1), 30000);
            var self = this;
            this.syncing = false;
            setTimeout(function() { self.push(); }, delay);
            return;
        }
        this.syncing = false;
        if (this.queue.length > 0) {
            var self = this;
            setTimeout(function() { self.push(); }, 1000);
        }
    },

    pull: async function() {
        if (!this.url || this.syncing) return;
        if (this.queue.length > 0) {
            await this.push();
            return;
        }
        this.syncing = true;
        this.updateUI('syncing');
        try {
            var resp = await fetch(this.url);
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            var result = await resp.json();
            if (result && result.data) this.mergeRemote(result.data);
            this.updateUI('synced');
        } catch(e) {
            console.warn('Sync pull failed:', e);
            this.updateUI('error');
        }
        this.syncing = false;
    },

    mergeRemote: function(remote) {
        var dominated = false;
        Object.keys(remote).forEach(function(key) {
            var localTs = parseInt(localStorage.getItem('_ts_' + key)) || 0;
            var remoteTs = remote[key].ts || 0;
            if (remoteTs > localTs) {
                localStorage.setItem(key, remote[key].v);
                localStorage.setItem('_ts_' + key, remoteTs);
                var val = remote[key].v;
                if (key.startsWith('check-')) {
                    var parts = key.replace('check-', '').split('-');
                    // Usar CSS.escape para sanitizar partes vindas de dados remotos
                    var checkSel = '[data-action-check="' + CSS.escape(parts[0]) + '-' + CSS.escape(parts[1]) + '"]';
                    var actionBtn = document.querySelector(checkSel);
                    if (actionBtn) {
                        actionBtn.classList.toggle('action-done', val === '1');
                        var card = actionBtn.closest('.activity-card');
                        if (card) card.classList.toggle('item-done', val === '1');
                    }
                    dominated = true;
                } else if (key.startsWith('fav-')) {
                    var parts2 = key.replace('fav-', '').split('-');
                    var favSel = '[data-action-fav="' + CSS.escape(parts2[0]) + '-' + CSS.escape(parts2[1]) + '"]';
                    var favBtn = document.querySelector(favSel);
                    if (favBtn) favBtn.classList.toggle('action-fav-active', val === '1');
                    dominated = true;
                } else if (key.startsWith('note-')) {
                    var dayNum = key.replace('note-', '');
                    var noteEl = document.getElementById('daynote-' + dayNum);
                    if (noteEl && noteEl.value !== val) {
                        noteEl.value = val || '';
                        autoResizeTextarea(noteEl);
                    }
                    dominated = true;
                }
            }
        });
        if (dominated) updateTripStats();
    },

    fullSync: async function() {
        if (!this.url) { this.updateUI('nourl'); return; }
        if (!localStorage.getItem('syncInitialPushDone')) {
            await this.initialPush();
            localStorage.setItem('syncInitialPushDone', '1');
        } else {
            await this.push();
            await this.pull();
        }
    },

    initialPush: async function() {
        var changes = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('check-') || key.startsWith('fav-') || key.startsWith('note-')) {
                if (key.startsWith('_ts_')) continue;
                var ts = parseInt(localStorage.getItem('_ts_' + key)) || Date.now();
                changes.push({ key: key, value: localStorage.getItem(key), ts: ts });
            }
        }
        if (changes.length > 0) {
            this.queue = changes.concat(this.queue);
            localStorage.setItem('syncQueue', JSON.stringify(this.queue));
        }
        await this.push();
        await this.pull();
    },

    setUrl: function(url) {
        this.url = (url || '').trim();
        localStorage.setItem('syncUrl', this.url);
        if (this.url) this.initialPush();
        else this.updateUI('');
    },

    updateUI: function(status) {
        var el = document.getElementById('syncStatus');
        if (!el) return;
        var pending = this.queue.length;
        if (status === 'syncing') el.textContent = 'Sincronizando...';
        else if (status === 'synced') {
            localStorage.setItem('lastSync', Date.now());
            el.textContent = 'Sincronizado agora';
        }
        else if (status === 'error') el.textContent = 'Falha na sync' + (pending ? ' (' + pending + ' pendentes)' : '');
        else if (status === 'autherror') el.textContent = 'Sem permissão (403) — verifique a URL do script';
        else if (status === 'maxretry') el.textContent = 'Sync falhou após 10 tentativas — verifique conexão';
        else if (status === 'nourl') el.textContent = 'Cole a URL acima primeiro';
        else el.textContent = '';
    },

    initUI: function() {
        var input = document.getElementById('syncUrlInput');
        if (input && this.url) input.value = this.url;
        var last = parseInt(localStorage.getItem('lastSync'));
        if (last && this.url) {
            var ago = Math.round((Date.now() - last) / 60000);
            var el = document.getElementById('syncStatus');
            if (el) el.textContent = ago < 1 ? 'Sincronizado agora' : 'Ultima sync: ' + (ago < 60 ? ago + ' min' : Math.round(ago/60) + 'h') + ' atras';
        }
    }
};

function haptic(style) {
    if (navigator.vibrate) {
        if (style === 'light') navigator.vibrate(10);
        else if (style === 'medium') navigator.vibrate(20);
        else navigator.vibrate(30);
    }
}

(function() {
    var origCheck = toggleCheck;
    toggleCheck = function(d, i, e) {
        origCheck(d, i, e);
        haptic('light');
        SyncEngine.track('check-' + d + '-' + i, localStorage.getItem('check-' + d + '-' + i));
    };
    var origFav = toggleFav;
    toggleFav = function(d, i, e) {
        origFav(d, i, e);
        haptic('light');
        SyncEngine.track('fav-' + d + '-' + i, localStorage.getItem('fav-' + d + '-' + i));
    };
    var origNote = saveDayNote;
    saveDayNote = function(dayNum) {
        origNote(dayNum);
        SyncEngine.track('note-' + dayNum, localStorage.getItem('note-' + dayNum));
    };
})();

SyncEngine.initUI();
if (SyncEngine.url) setTimeout(function() {
    if (!localStorage.getItem('syncInitialPushDone')) {
        SyncEngine.initialPush().then(function() {
            localStorage.setItem('syncInitialPushDone', '1');
        });
    } else {
        SyncEngine.fullSync();
    }
}, 5000);

if (SyncEngine.url) setInterval(function() {
    if (navigator.onLine && !SyncEngine.syncing) SyncEngine.pull();
}, 30000);

document.addEventListener('visibilitychange', function() {
    if (!document.hidden && SyncEngine.url && navigator.onLine && !SyncEngine.syncing) {
        SyncEngine.fullSync();
    }
});
