// ==================== STORAGE LAYER (localStorage + IndexedDB) ====================
// Wrapper para abstrair storage, permitindo upgrade para IndexedDB sem quebrar código existente.
// Atualmente usa localStorage; pronto para migrar para IndexedDB quando necessário.

var StorageLayer = {
    db: null,
    dbName: 'ViagemEUA2027',
    dbVersion: 1,
    ready: Promise.resolve(),

    // Inicializar IndexedDB (chamado automaticamente na primeira vez)
    init: function() {
        if (this.db) return Promise.resolve();
        if (!('indexedDB' in window)) {
            console.warn('IndexedDB não disponível, usando localStorage');
            return Promise.resolve();
        }

        var self = this;
        return new Promise(function(resolve, reject) {
            var req = indexedDB.open(self.dbName, self.dbVersion);
            req.onerror = function() { reject(req.error); };
            req.onsuccess = function() {
                self.db = req.result;
                resolve();
            };
            req.onupgradeneeded = function(e) {
                var db = e.target.result;
                // Criar object stores
                if (!db.objectStoreNames.contains('state')) {
                    db.createObjectStore('state', { keyPath: 'key' });
                }
            };
        });
    },

    // Get value (com fallback para localStorage)
    get: function(key) {
        if (this.db) {
            var self = this;
            return new Promise(function(resolve) {
                try {
                    var tx = self.db.transaction('state', 'readonly');
                    var store = tx.objectStore('state');
                    var req = store.get(key);
                    req.onsuccess = function() {
                        resolve(req.result ? req.result.value : null);
                    };
                    req.onerror = function() { resolve(null); };
                } catch(e) {
                    resolve(localStorage.getItem(key));
                }
            });
        }
        return Promise.resolve(localStorage.getItem(key));
    },

    // Set value (com fallback para localStorage)
    set: function(key, value) {
        localStorage.setItem(key, value);

        if (this.db) {
            var self = this;
            return new Promise(function(resolve) {
                try {
                    var tx = self.db.transaction('state', 'readwrite');
                    var store = tx.objectStore('state');
                    store.put({ key: key, value: value, ts: Date.now() });
                    tx.oncomplete = resolve;
                    tx.onerror = resolve;
                } catch(e) {
                    resolve();
                }
            });
        }
        return Promise.resolve();
    },

    // Remove value
    remove: function(key) {
        localStorage.removeItem(key);

        if (this.db) {
            var self = this;
            return new Promise(function(resolve) {
                try {
                    var tx = self.db.transaction('state', 'readwrite');
                    var store = tx.objectStore('state');
                    store.delete(key);
                    tx.oncomplete = resolve;
                    tx.onerror = resolve;
                } catch(e) {
                    resolve();
                }
            });
        }
        return Promise.resolve();
    },

    // Clear all storage
    clear: function() {
        // Limpar apenas chaves de app (não system keys)
        ['check-', 'fav-', 'note-', 'syncQueue', 'syncUrl'].forEach(function(prefix) {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.startsWith(prefix)) {
                    localStorage.removeItem(key);
                }
            }
        });

        if (this.db) {
            var self = this;
            return new Promise(function(resolve) {
                try {
                    var tx = self.db.transaction('state', 'readwrite');
                    var store = tx.objectStore('state');
                    store.clear();
                    tx.oncomplete = resolve;
                    tx.onerror = resolve;
                } catch(e) {
                    resolve();
                }
            });
        }
        return Promise.resolve();
    },

    // Get size estimate (apenas IDB)
    getSize: function() {
        if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
            return Promise.resolve({ usage: 0, quota: 0 });
        }
        return navigator.storage.estimate();
    }
};

// Initialize on page load (non-blocking)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        StorageLayer.init().catch(function(e) {
            console.warn('StorageLayer init failed:', e);
        });
    });
} else {
    StorageLayer.init().catch(function(e) {
        console.warn('StorageLayer init failed:', e);
    });
}
