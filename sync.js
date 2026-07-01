// ==================== SUPABASE SYNC ====================
var SyncEngine = {
    supabaseUrl: 'https://kahlxqiopfuobciiihzr.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthaGx4cWlvcGZ1b2JjaWlpaHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NDE1NjQsImV4cCI6MjA5ODQxNzU2NH0._RxgyjxzYyPpQSnBO4b0xmn44o9OGlzhNvyHCsdkF44',
    deviceId: 'viagem-gomes-2027',
    url: true, // compat flag — always "connected"
    queue: JSON.parse(localStorage.getItem('syncQueue') || '[]'),
    syncing: false,
    debounceTimer: null,
    retryTimer: null,
    pullIntervalId: null,
    pushRetries: 0,

    _headers: function() {
        return {
            'apikey': this.supabaseKey,
            'Authorization': 'Bearer ' + this.supabaseKey,
            'Content-Type': 'application/json'
        };
    },

    track: function(key, value) {
        var ts = Date.now();
        localStorage.setItem('_ts_' + key, ts);
        this.queue.push({ key: key, value: value, ts: ts });
        this._persistQueue();
        this.debouncedSync();
    },

    debouncedSync: function() {
        var self = this;
        if (self.debounceTimer) clearTimeout(self.debounceTimer);
        self.debounceTimer = setTimeout(function() { self.push(); }, 3000);
    },

    push: async function() {
        if (this.syncing || this.queue.length === 0) return;
        this.syncing = true;
        if (navigator.locks) {
            var self = this;
            return navigator.locks.request('sync-push', { ifAvailable: true }, function(lock) {
                if (!lock) { self.syncing = false; return; }
                return self._doPush();
            });
        }
        return this._doPush();
    },

    _persistQueue: function() {
        try {
            localStorage.setItem('syncQueue', JSON.stringify(this.queue));
        } catch(e) {
            console.warn('[Sync] Queue persist failed:', e);
        }
    },

    _doPush: async function() {
        if (!this.syncing) this.syncing = true;
        this.updateUI('syncing');
        // Snapshot queue atomically before async work
        var snapshot = this.queue.slice(0);
        var snapshotLen = snapshot.length;
        this.queue = this.queue.slice(snapshotLen);
        this._persistQueue();
        // Dedup: keep only latest per key
        var latest = {};
        snapshot.forEach(function(e) {
            if (!latest[e.key] || e.ts > latest[e.key].ts) latest[e.key] = e;
        });
        var changes = Object.values(latest);
        try {
            // Upsert to Supabase in batches of 50
            var BATCH = 50;
            var deviceId = this.deviceId;
            for (var i = 0; i < changes.length; i += BATCH) {
                var chunk = changes.slice(i, i + BATCH);
                var rows = chunk.map(function(c) {
                    return { device_id: deviceId, key: c.key, value: c.value, ts: c.ts };
                });
                var resp = await fetch(this.supabaseUrl + '/rest/v1/user_data', {
                    method: 'POST',
                    headers: Object.assign({}, this._headers(), { 'Prefer': 'resolution=merge-duplicates' }),
                    body: JSON.stringify(rows)
                });
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
            }
            this.updateUI('synced');
            this.pushRetries = 0;
        } catch(e) {
            console.warn('Sync push failed:', e);
            // Restore snapshot on failure
            this.queue = snapshot.concat(this.queue);
            this._persistQueue();
            var maxRetries = 10;
            this.pushRetries = (this.pushRetries || 0) + 1;
            var errMsg = String(e && e.message ? e.message : e);
            if (errMsg.indexOf('429') !== -1) {
                this.pushRetries = Math.max(this.pushRetries, 4);
            }
            if (errMsg.indexOf('403') !== -1 || errMsg.indexOf('401') !== -1) {
                this.updateUI('autherror');
                if (typeof showToast === 'function') showToast('⚠️ Sync sem permissão — verifique configuração', { type: 'error', duration: 4000 });
                this.syncing = false;
                this.pushRetries = 0;
                return;
            }
            if (this.pushRetries >= maxRetries) {
                console.error('Sync push: máximo de tentativas atingido (' + maxRetries + ')');
                this.updateUI('maxretry');
                if (typeof showToast === 'function') showToast('❌ Sync falhou após ' + maxRetries + ' tentativas', { type: 'error', duration: 4000 });
                this.syncing = false;
                this.pushRetries = 0;
                return;
            }
            this.updateUI('error');
            this.syncing = false;
            if (!navigator.onLine) {
                var self = this;
                var onlineHandler = function() {
                    window.removeEventListener('online', onlineHandler);
                    self.push();
                };
                window.addEventListener('online', onlineHandler);
                return;
            }
            var delay = Math.min(3000 * Math.pow(2, this.pushRetries - 1), 30000);
            var self = this;
            this.retryTimer = setTimeout(function() { self.push(); }, delay);
            return;
        }
        this.syncing = false;
        if (this.queue.length > 0) {
            var self = this;
            setTimeout(function() { self.push(); }, 1000);
        }
    },

    pull: async function() {
        if (this.syncing) return;
        if (this.queue.length > 0) {
            await this.push();
            return;
        }
        this.syncing = true;
        this.updateUI('syncing');
        try {
            var resp = await fetch(
                this.supabaseUrl + '/rest/v1/user_data?device_id=eq.' + encodeURIComponent(this.deviceId) + '&select=key,value,ts',
                { headers: this._headers() }
            );
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            var rows = await resp.json();
            // Convert array of {key, value, ts} to object format for mergeRemote
            var remote = {};
            rows.forEach(function(r) {
                remote[r.key] = { v: r.value, ts: r.ts };
            });
            this.mergeRemote(remote);
            this.updateUI('synced');
        } catch(e) {
            console.warn('Sync pull failed:', e);
            this.updateUI('error');
            if (typeof showToast === 'function') showToast('⚠️ Falha ao sincronizar', { type: 'warning' });
        }
        this.syncing = false;
    },

    mergeRemote: function(remote) {
        if (!remote || typeof remote !== 'object') return;
        var dominated = false;
        Object.keys(remote).forEach(function(key) {
            var entry = remote[key];
            if (!entry || typeof entry !== 'object') return;
            var remoteTs = parseInt(entry.ts);
            if (isNaN(remoteTs)) return;
            var localTs = parseInt(localStorage.getItem('_ts_' + key)) || 0;
            if (remoteTs > localTs) {
                localStorage.setItem(key, entry.v);
                localStorage.setItem('_ts_' + key, remoteTs);
                var val = entry.v;
                if (key.startsWith('check-')) {
                    var parts = key.replace('check-', '').split('-');
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
        var doneKey = 'syncInitialPushDone-' + this.deviceId;
        if (!localStorage.getItem(doneKey)) {
            await this.initialPush();
            localStorage.setItem(doneKey, '1');
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
            this._persistQueue();
        }
        await this.push();
        await this.pull();
    },

    // Legacy compat — setUrl no longer needed but keep for UI
    setUrl: function() {
        this.initialPush();
    },

    updateUI: function(status) {
        var el = document.getElementById('syncStatus');
        if (!el) return;
        var pending = this.queue.length;
        if (status === 'syncing') el.textContent = 'Sincronizando...';
        else if (status === 'synced') {
            localStorage.setItem('lastSync', Date.now());
            el.textContent = 'Sincronizado ✓';
        }
        else if (status === 'error') el.textContent = 'Falha na sync' + (pending ? ' (' + pending + ' pendentes)' : '');
        else if (status === 'autherror') el.textContent = 'Erro de autenticação — verifique configuração';
        else if (status === 'maxretry') el.textContent = 'Sync falhou após 10 tentativas';
        else el.textContent = '';
    },

    initUI: function() {
        var last = parseInt(localStorage.getItem('lastSync'));
        if (last) {
            var ago = Math.round((Date.now() - last) / 60000);
            var el = document.getElementById('syncStatus');
            if (el) el.textContent = ago < 1 ? 'Sincronizado ✓' : 'Ultima sync: ' + (ago < 60 ? ago + ' min' : Math.round(ago/60) + 'h') + ' atrás';
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

// Flush queue to localStorage on page close
window.addEventListener('beforeunload', function() {
    if (SyncEngine.queue && SyncEngine.queue.length > 0) SyncEngine._persistQueue();
});

// Auto-sync on load (after 5s to let page settle)
// Force initial push on first load with shared ID
setTimeout(function() {
    var doneKey = 'syncInitialPushDone-' + SyncEngine.deviceId;
    if (!localStorage.getItem(doneKey)) {
        // Clear old flag
        localStorage.removeItem('syncInitialPushDone');
        SyncEngine.initialPush().then(function() {
            localStorage.setItem(doneKey, '1');
        });
    } else {
        SyncEngine.fullSync();
    }
}, 5000);

// Poll every 30s
SyncEngine.pullIntervalId = setInterval(function() {
    if (navigator.onLine && !SyncEngine.syncing) SyncEngine.pull();
}, 30000);

// Sync on visibility change (tab re-focus)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && navigator.onLine && !SyncEngine.syncing) {
        SyncEngine.fullSync();
    }
});
