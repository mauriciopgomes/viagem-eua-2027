// ==================== GLOBAL ERROR HANDLER ====================
window.addEventListener('error', function(e) {
    console.error('[App Error]', e.message, e.filename, e.lineno);
});
window.addEventListener('unhandledrejection', function(e) {
    console.error('[Unhandled Promise]', e.reason);
});

// ==================== SECURITY: HTML SANITIZATION ====================
function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(ch) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
}

// Safe innerHTML setter for user-controlled content
function safeSetHTML(element, html) {
    if (!element) return;
    // For user-generated content and sync data, use textContent + createElement pattern
    // For controlled HTML structure, innerHTML is acceptable with escaping already applied
    element.innerHTML = html;
}

// ==================== THEME MANAGEMENT ====================
// ==================== THEME: DARK MODE ONLY ====================
// Theme is always dark, no toggle needed

// ==================== NAVIGATION HELPERS ====================
function goToDay(dayNum, itemIdx) {
    // Switch to home tab first, then show the day
    switchTab('home', { currentTarget: document.querySelector('[aria-controls="sec-home"]') });
    setTimeout(function() {
        showDay(dayNum);
        if (itemIdx !== undefined && itemIdx !== null) {
            // Scroll to the specific card after render
            setTimeout(function() {
                var card = document.querySelector('[data-action-check="' + dayNum + '-' + itemIdx + '"]');
                if (card) {
                    var actCard = card.closest('.activity-card');
                    if (actCard) actCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 200);
        }
    }, 50);
}
// Initialize PWA on app load
document.addEventListener('DOMContentLoaded', function() {

    // Event delegation para botão "Ver no Mapa" no sheet (evita inline onclick com coords)
    var sheetBody = document.getElementById('sheetBody');
    if (sheetBody) {
        sheetBody.addEventListener('click', function(e) {
            var btn = e.target.closest('[data-fly-lat]');
            if (!btn) return;
            var lat = parseFloat(btn.getAttribute('data-fly-lat'));
            var lng = parseFloat(btn.getAttribute('data-fly-lng'));
            if (isNaN(lat) || isNaN(lng)) return;
            closeSheet();
            switchTab('map', e);
            setTimeout(function() { if (mapInstance) mapInstance.flyTo([lat, lng], 15); }, 500);
        });
    }

    // ==================== EVENT DELEGATION: dayContainer ====================
    var dayContainer = document.getElementById('dayContainer');
    if (dayContainer) {
        dayContainer.addEventListener('click', function(e) {
            // Share day button
            var shareBtn = e.target.closest('[data-share-day]');
            if (shareBtn) { e.stopPropagation(); shareDay(parseInt(shareBtn.getAttribute('data-share-day'))); return; }

            // Toggle hide done
            var toggleBtn = e.target.closest('[data-toggle-done]');
            if (toggleBtn) { e.stopPropagation(); toggleHideDone(parseInt(toggleBtn.getAttribute('data-toggle-done'))); return; }

            // Check button
            var checkBtn = e.target.closest('[data-action-check]');
            if (checkBtn) { e.stopPropagation(); var parts = checkBtn.getAttribute('data-action-check').split('-'); toggleCheck(parseInt(parts[0]), parseInt(parts[1]), e); return; }

            // Fav button
            var favBtn = e.target.closest('[data-action-fav]');
            if (favBtn) { e.stopPropagation(); var parts2 = favBtn.getAttribute('data-action-fav').split('-'); toggleFav(parseInt(parts2[0]), parseInt(parts2[1]), e); return; }

            // Photo: lightbox (no placeInfo)
            var lightboxImg = e.target.closest('img[data-lightbox]');
            if (lightboxImg) { e.stopPropagation(); var nameEl = lightboxImg.closest('.activity-card').querySelector('.activity-name'); openLightbox(lightboxImg.src, nameEl ? nameEl.textContent : ''); return; }

            // Photo: openDetail (has placeInfo)
            var detailImg = e.target.closest('img[data-open-day]');
            if (detailImg) { e.stopPropagation(); openDetail(parseInt(detailImg.getAttribute('data-open-day')), parseInt(detailImg.getAttribute('data-open-idx'))); return; }

            // Card click → openDetail
            var detailCard = e.target.closest('[data-open-day].activity-card');
            if (detailCard) { openDetail(parseInt(detailCard.getAttribute('data-open-day')), parseInt(detailCard.getAttribute('data-open-idx'))); return; }
        });

        // Image load: fade-in class
        dayContainer.addEventListener('load', function(e) {
            if (e.target && e.target.classList && e.target.classList.contains('activity-card-photo')) {
                e.target.classList.add('loaded');
            }
        }, true);

        // Image error: hide broken image and mark card
        dayContainer.addEventListener('error', function(e) {
            var img = e.target;
            if (!img || img.tagName !== 'IMG' || !img.hasAttribute('data-onerror-hide')) return;
            var cardEl = img.closest('.activity-card');
            if (cardEl) cardEl.setAttribute('data-no-photo', '1');
            img.style.display = 'none';
        }, true);

        // Textarea: save day notes
        dayContainer.addEventListener('input', function(e) {
            var ta = e.target.closest('[data-daynote]');
            if (ta) saveDayNote(parseInt(ta.getAttribute('data-daynote')));
        });
    }
    // Resize/orientation: invalidate map size
    window.addEventListener('resize', function() {
        if (mapInstance && document.querySelector('#sec-map.active')) {
            mapInstance.invalidateSize();
        }
    });
    window.addEventListener('orientationchange', function() {
        if (mapInstance && document.querySelector('#sec-map.active')) {
            setTimeout(function() { mapInstance.invalidateSize(); }, 200);
        }
    });

    // Hero: scroll topo
    var heroSection = document.getElementById('heroSection');
    if (heroSection) heroSection.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Search (debounced 300ms)
    var searchInput = document.getElementById('searchInput');
    var _searchDebounce = null;
    if (searchInput) searchInput.addEventListener('input', function() {
        var val = this.value;
        if (_searchDebounce) clearTimeout(_searchDebounce);
        _searchDebounce = setTimeout(function() { searchItems(val); }, 300);
    });
    var searchFavFilter = document.getElementById('searchFavFilter');
    if (searchFavFilter) searchFavFilter.addEventListener('click', function() { toggleSearchFav(this); });

    // Map toolbar
    var btnMapDay = document.getElementById('btnMapDay');
    if (btnMapDay) btnMapDay.addEventListener('click', function() { mapFlyToDay(); });
    var btnMapFit = document.getElementById('btnMapFit');
    if (btnMapFit) btnMapFit.addEventListener('click', function() { mapFitAll(); });
    var btnMapSat = document.getElementById('btnMapSat');
    if (btnMapSat) btnMapSat.addEventListener('click', function() { mapToggleSat(); });
    var btnMapLayers = document.getElementById('btnMapLayers');
    if (btnMapLayers) btnMapLayers.addEventListener('click', function() { mapTogglePanel(); });

    // Map layer checkboxes
    var layerMap = { chkRoute: 'route', chkStops: 'stops', chkSuperchargers: 'sc', chkRoadPois: 'roadpois', chkDayTrips: 'daytrips', chkDayRoute: 'dayroute' };
    Object.keys(layerMap).forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('change', function() { mapToggleLayer(layerMap[id]); });
    });

    // Map stats main click → go to day
    var mapStatsMain = document.getElementById('mapStatsMain');
    if (mapStatsMain) mapStatsMain.addEventListener('click', function() { switchTab('home'); showDay(mapScrubDay); });

    // Map scrubber
    var mapScrubRange = document.getElementById('mapScrubRange');
    if (mapScrubRange) mapScrubRange.addEventListener('input', function() { mapScrubTo(this.value); });
    var btnScrubPrev = document.getElementById('btnScrubPrev');
    if (btnScrubPrev) btnScrubPrev.addEventListener('click', function() { mapScrubPrev(); });
    var btnScrubNext = document.getElementById('btnScrubNext');
    if (btnScrubNext) btnScrubNext.addEventListener('click', function() { mapScrubNext(); });

    // Explore filters (event delegation)
    var exploreFilters = document.querySelector('.explore-filters');
    if (exploreFilters) {
        exploreFilters.addEventListener('click', function(e) {
            var btn = e.target.closest('[data-filter]');
            if (!btn) return;
            filterExplore(btn.getAttribute('data-filter'), btn);
        });
    }

    // Sync URL input
    var syncUrlInput = document.getElementById('syncUrlInput');
    if (syncUrlInput) syncUrlInput.addEventListener('change', function() { SyncEngine.setUrl(this.value); });
    var btnSyncNow = document.getElementById('btnSyncNow');
    if (btnSyncNow) btnSyncNow.addEventListener('click', function() { SyncEngine.fullSync(); });

    // Map cache button
    var btnCacheMap = document.getElementById('btnCacheMap');
    if (btnCacheMap) btnCacheMap.addEventListener('click', function() {
        localStorage.removeItem('mapTilesCached');
        cacheMapTiles(false);
    });

    // Export / import data
    var btnExportData = document.getElementById('btnExportData');
    if (btnExportData) btnExportData.addEventListener('click', function() { exportUserData(); });
    var importDataFile = document.getElementById('importDataFile');
    if (importDataFile) importDataFile.addEventListener('change', function(e) { importUserData(e); });
    var btnImportData = document.getElementById('btnImportData');
    if (btnImportData) btnImportData.addEventListener('click', function() {
        document.getElementById('importDataFile').click();
    });

    // Sheet overlay + close button
    var sheetOverlay = document.getElementById('sheetOverlay');
    if (sheetOverlay) sheetOverlay.addEventListener('click', function() { closeSheet(); });
    var btnSheetClose = document.getElementById('btnSheetClose');
    if (btnSheetClose) btnSheetClose.addEventListener('click', function() { closeSheet(); });

    // Sheet photo onerror
    var sheetPhoto = document.getElementById('sheetPhoto');
    if (sheetPhoto) sheetPhoto.addEventListener('error', function() { this.style.display = 'none'; });

    // Lightbox: click backdrop to close + close button
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.addEventListener('click', function(e) { if (e.target === this) closeLightbox(); });
    var btnLightboxClose = document.getElementById('btnLightboxClose');
    if (btnLightboxClose) btnLightboxClose.addEventListener('click', function() { closeLightbox(); });

    // Tab bar
    var tabDefs = [
        { id: 'tabHome', tab: 'home' },
        { id: 'tabMap', tab: 'map' },
        { id: 'tabExplore', tab: 'explore' },
        { id: 'tabSettings', tab: 'settings' }
    ];
    tabDefs.forEach(function(def) {
        var el = document.getElementById(def.id);
        if (el) el.addEventListener('click', function(e) { switchTab(def.tab, e); });
    });

    // Day pills → showDay (delegation on daySelector)
    var daySelectorEl = document.getElementById('daySelector');
    if (daySelectorEl) {
        daySelectorEl.addEventListener('click', function(e) {
            var pill = e.target.closest('.day-pill[data-d]');
            if (!pill) return;
            showDay(parseInt(pill.getAttribute('data-d')));
        });
    }

    // Sidebar items → showDay (delegation on homeSidebar)
    var homeSidebarEl = document.getElementById('homeSidebar');
    if (homeSidebarEl) {
        homeSidebarEl.addEventListener('click', function(e) {
            var item = e.target.closest('.sidebar-item[data-sd]');
            if (!item) return;
            showDay(parseInt(item.getAttribute('data-sd')));
        });
    }

    // data-goto-day → switchTab home + showDay (map popups, map stats btn, explore items)
    document.addEventListener('click', function(e) {
        // Legend toggle
        var legendH3 = e.target.closest('[data-legend-toggle]');
        if (legendH3) { legendH3.parentElement.classList.toggle('open'); return; }

        // Map links in explore — stop propagation on anchor links
        if (e.target.closest('.hotel-map-link, .charge-map-link')) {
            e.stopPropagation();
            return;
        }

        // goto-day (explore items, map popups, map stats)
        var gotoEl = e.target.closest('[data-goto-day]');
        if (gotoEl) {
            e.stopPropagation();
            var day = parseInt(gotoEl.getAttribute('data-goto-day'));
            var item = gotoEl.hasAttribute('data-goto-item') ? parseInt(gotoEl.getAttribute('data-goto-item')) : undefined;
            goToDay(day, item);
            return;
        }
    });

    // Search results delegation (on searchResults container)
    var searchResultsEl = document.getElementById('searchResults');
    if (searchResultsEl) {
        searchResultsEl.addEventListener('click', function(e) {
            var item = e.target.closest('[data-search-day]');
            if (!item) return;
            var day = parseInt(item.getAttribute('data-search-day'));
            var idx = item.hasAttribute('data-search-idx') ? parseInt(item.getAttribute('data-search-idx')) : null;
            closeSearch();
            showDay(day);
            if (idx !== null) setTimeout(function() { openDetail(day, idx); }, 300);
        });
        searchResultsEl.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                var item = e.target.closest('[data-search-day]');
                if (item) item.click();
            }
        });
    }
});

// ==================== PERFORMANCE OBSERVER ====================
if (typeof PerformanceObserver !== 'undefined') {
    // Track LCP
    try {
        new PerformanceObserver(function(list) {
            var entries = list.getEntries();
            var last = entries[entries.length - 1];
            if (last) console.info('[LCP]', Math.round(last.startTime) + 'ms', last.element && last.element.tagName);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch(e) {}
    // Track long tasks (>50ms)
    try {
        new PerformanceObserver(function(list) {
            list.getEntries().forEach(function(entry) {
                if (entry.duration > 100) console.warn('[Long Task]', Math.round(entry.duration) + 'ms');
            });
        }).observe({ type: 'longtask', buffered: true });
    } catch(e) {}
}


// ==================== STATE ==
let currentDay = 1;
let mapInstance = null;
const totalDays = days.length;
const protoDays = days.length;

// ==================== HELPERS ====================
function getTitle(d) { return d.title; }
function getRoute(d) { return d.route; }
function getNote(d) { return d.note; }
function getItemText(d, i) { return d.items[i].text; }

const typeLabel = { highlight: '⭐ Destaque', food: '🍽️ Comida', charge: '⚡ Carga', drive: '🚗 Transporte', '': '📍 Local' };

// ==================== RENDER DAY SELECTOR ====================
function renderDaySelector() {
    const el = document.getElementById('daySelector');
    let html = '';
    for (let i = 1; i <= totalDays; i++) {
        var dd = days[i-1];
        const r = dd ? dd.region || 'nv' : 'nv';
        const loc = dd ? dd.location : '';
        const short = dd ? dd.shortLoc || '' : '';
        var dt = new Date(TRIP_START); dt.setDate(dt.getDate() + i - 1);
        var dateStr = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0');
        var thumbSrc = dd && dd.photo ? dd.photo : '';
        var thumbHtml = thumbSrc
            ? '<img class="pill-thumb" src="' + webpSrc(thumbSrc) + '" alt="" width="40" height="40" loading="lazy" onerror="this.style.display=\'none\'">'
            : '<div class="pill-thumb" style="background:var(--glass2)"></div>';
        html += '<button class="day-pill ' + r + '" data-d="' + i + '" aria-label="Dia ' + i + ' — ' + dateStr + ' — ' + loc + '" title="' + loc + '">' +
            thumbHtml +
            '<span class="pill-date">' + dateStr + '</span>' +
            '<span class="pill-label">' + short + '</span>' +
            '<span class="pill-dot"></span>' +
            '</button>';
    }
    el.innerHTML = html;
}

// ==================== RENDER SIDEBAR (desktop) ====================
function renderSidebar() {
    var el = document.getElementById('homeSidebar');
    if (!el) return;
    var html = '<div style="padding:16px 16px 8px;font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em">33 Dias</div>';
    for (var i = 1; i <= totalDays; i++) {
        var d = days[i-1];
        var loc = d ? d.shortLoc || d.location.split(',')[0].trim() : '';
        var fullLoc = d ? d.location : '';
        var dt = new Date(TRIP_START); dt.setDate(dt.getDate() + i - 1);
        var dateStr = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0');
        var photo = d && d.photo ? d.photo : '';
        var thumbHtml = photo
            ? '<img class="sidebar-thumb" src="' + webpSrc(photo) + '" alt="" width="32" height="32" loading="lazy" onerror="this.style.display=\'none\'">'
            : '<div class="sidebar-thumb sidebar-thumb-placeholder"></div>';
        html += '<div class="sidebar-item" data-sd="' + i + '" title="' + escapeHtml(fullLoc) + '">' +
            thumbHtml +
            '<div class="sidebar-item-text"><span class="sidebar-day">' + dateStr + '</span><span class="sidebar-loc">' + escapeHtml(loc) + '</span></div>' +
            '</div>';
    }
    el.innerHTML = html;
}

// ==================== ACTIVITY CHECKLIST ====================
function toggleCheck(dayNum, itemIdx, event) {
    event.stopPropagation();
    var key = 'check-' + dayNum + '-' + itemIdx;
    var done = localStorage.getItem(key) === '1';
    localStorage.setItem(key, done ? '0' : '1');
    updateCheckUI(dayNum, itemIdx, !done);
    updateDayProgress(dayNum);
    updateTripStats();
}

function isChecked(dayNum, itemIdx) {
    return localStorage.getItem('check-' + dayNum + '-' + itemIdx) === '1';
}

function updateCheckUI(dayNum, itemIdx, done) {
    var actionBtn = document.querySelector('[data-action-check="' + dayNum + '-' + itemIdx + '"]');
    if (actionBtn) {
        actionBtn.classList.toggle('action-done', done);
        if (done) { actionBtn.classList.add('just-checked'); setTimeout(function() { actionBtn.classList.remove('just-checked'); }, 600); }
        var parent = actionBtn.closest('.activity-card');
        if (parent) parent.classList.toggle('item-done', done);
    }
}

function updateDayProgress(dayNum) {
    var d = days.find(function(x) { return x.day === dayNum; });
    if (!d) return;
    var total = d.items.length;
    var done = 0;
    for (var i = 0; i < total; i++) {
        if (isChecked(dayNum, i)) done++;
    }
    var el = document.getElementById('day-progress-' + dayNum);
    if (el) el.textContent = done + '/' + total;
    // Update progress ring
    var ring = document.getElementById('prog-ring-' + dayNum);
    if (ring) {
        var r = 16, circ = Math.round(2 * Math.PI * r);
        var pct = total > 0 ? done / total : 0;
        var offset = circ - Math.round(pct * circ);
        ring.style.strokeDashoffset = offset;
        ring.style.stroke = pct === 1 ? 'var(--green)' : pct >= 0.5 ? 'var(--blue)' : 'var(--gold)';
    }
    var pill = document.querySelector('.day-pill[data-d="' + dayNum + '"]');
    if (pill) pill.classList.toggle('day-complete', done === total && total > 0);
    if (done === total && total > 0) {
        showToast('🎉 Dia ' + dayNum + ' completo!');
    }
    // Update app badge with remaining items for current day
    updateAppBadge();
}

function updateAppBadge() {
    if (!navigator.setAppBadge) return;
    var d = days.find(function(x) { return x.day === currentDay; });
    if (!d) return;
    var remaining = 0;
    for (var i = 0; i < d.items.length; i++) {
        if (!isChecked(currentDay, i)) remaining++;
    }
    if (remaining > 0) {
        navigator.setAppBadge(remaining).catch(function() {});
    } else {
        navigator.clearAppBadge().catch(function() {});
    }
}

function toggleHideDone(dayNum) {
    var grid = document.querySelector('#ds-' + dayNum + ' .activity-grid');
    var btn = document.getElementById('toggleDone-' + dayNum);
    if (!grid || !btn) return;
    var hiding = !grid.classList.contains('hide-done');
    grid.classList.toggle('hide-done', hiding);
    btn.classList.toggle('active', hiding);
    btn.textContent = hiding ? '👁️ Mostrar' : '👁️ Esconder';
}

// ==================== RENDER DAY CONTENT ====================
function renderDay(d) {
    var h = ['<div class="day-slide" id="ds-' + d.day + '">'];
    h.push('<div class="day-info"><div style="display:flex;align-items:center;justify-content:space-between"><h2>' + getTitle(d) + '</h2><button class="share-day-btn" data-share-day="' + d.day + '" aria-label="Compartilhar dia">📤</button></div>');
    h.push('<div class="day-route">📍 ' + d.location + ' — ' + getRoute(d) + '</div>');
    h.push('<div class="day-note">' + getNote(d) + '</div>');
    h.push(getWeatherCard(d));
    h.push('</div>');

    // Progress counter with ring
    var r = 16, circ = Math.round(2 * Math.PI * r);
    h.push('<div class="day-progress">' +
        '<svg class="progress-ring" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">' +
        '<circle class="progress-ring-track" cx="20" cy="20" r="' + r + '" fill="none" stroke-width="3"/>' +
        '<circle class="progress-ring-fill" id="prog-ring-' + d.day + '" cx="20" cy="20" r="' + r + '" fill="none" stroke-width="3"' +
        ' stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '" stroke-linecap="round"/>' +
        '</svg>' +
        '<span id="day-progress-' + d.day + '">0/' + d.items.length + '</span> concluídos ' +
        '<button type="button" class="toggle-done-btn" id="toggleDone-' + d.day + '" data-toggle-done="' + d.day + '" aria-label="Esconder concluídos">👁️ Esconder</button></div>');

    h.push('<div class="activity-grid">');
    var currentPeriod = '';
    d.items.forEach(function(item, idx) {
        var hour = parseInt(item.time.replace('~', '')) || 0;
        var period = hour < 12 ? 'manha' : hour < 17 ? 'tarde' : 'noite';
        var periodLabels = { manha: '☀️ Manhã', tarde: '🌤️ Tarde', noite: '🌙 Noite' };
        if (period !== currentPeriod) {
            currentPeriod = period;
            h.push('<div class="time-group-label" data-period="' + period + '">' + periodLabels[period] + '</div>');
        }
        var text = getItemText(d, idx);
        var _tmpDiv = document.createElement('div');
        _tmpDiv.innerHTML = text;
        var plainText = _tmpDiv.textContent || _tmpDiv.innerText || '';
        var photo = findPhoto(item.text);
        var tl = typeLabel[item.type] || '📍 Local';

        var placeData = findPlaceInfo(item.text);
        var hasInfo = !!placeData;
        var cardTitle = placeData && placeData.info.detail ? ' title="' + placeData.info.detail.replace(/"/g, '&quot;').substring(0, 150) + '"' : '';
        var doneClass = isChecked(d.day, idx) ? ' item-done' : '';

        h.push('<div class="activity-card' + doneClass + '" data-type="' + escapeHtml(item.type || '') + '"' + (hasInfo ? ' data-open-day="' + d.day + '" data-open-idx="' + idx + '" style="cursor:pointer"' : '') + cardTitle + '>');
        // Media area (foto real ou placeholder gradiente)
        h.push('<div class="activity-card-media">');
        if (photo) {
            h.push('<picture>');
            h.push('<source type="image/webp" srcset="' + webpSrc400(photo) + ' 400w, ' + webpSrc(photo) + ' 800w" sizes="(max-width:768px) 400px, 800px">');
            h.push('<img class="activity-card-photo photo-loading" src="' + photo + '" alt="' + plainText.replace(/"/g, '&quot;') + '" width="400" height="200" loading="lazy" decoding="async" data-onerror-hide="1"' + (hasInfo ? ' data-open-day="' + d.day + '" data-open-idx="' + idx + '"' : ' data-lightbox="1"') + '>');
            h.push('</picture>');
        } else {
            // Placeholder com ícone do tipo
            var placeholderIcons = { highlight: '⭐', food: '🍽️', charge: '⚡', drive: '🚗', '': '📍' };
            var pIcon = placeholderIcons[item.type || ''] || '📍';
            h.push('<div class="activity-card-placeholder"><div class="activity-card-placeholder-icon">' + pIcon + '</div></div>');
        }
        // Type badge sobre a mídia
        h.push('<div class="activity-type-badge">' + tl + '</div>');
        if (hasInfo) h.push('<span class="detail-arrow">›</span>');
        h.push('</div>');
        h.push('<div class="activity-card-body">');
        h.push('<div class="activity-time">' + item.time + (hasInfo ? ' · <span style="color:var(--blue)">ⓘ</span>' : '') + '</div>');
        h.push('<div class="activity-name">' + text + '</div>');
        // Descrição do local quando disponível
        if (placeData && placeData.info.detail) {
            h.push('<div class="activity-desc">' + escapeHtml(placeData.info.detail.substring(0, 120)) + '</div>');
        }
        h.push('<div class="card-actions">');
        h.push('<button type="button" class="card-action-btn' + (isChecked(d.day, idx) ? ' action-done' : '') + '" data-action-check="' + d.day + '-' + idx + '" aria-label="Marcar como concluído"></button>');
        h.push('<button type="button" class="card-action-btn' + (isFav(d.day, idx) ? ' action-fav-active' : '') + '" data-action-fav="' + d.day + '-' + idx + '" aria-label="Favoritar"></button>');
        h.push('</div>');
        h.push('</div></div>');
    });
    h.push('</div>');

    // Day notes
    var noteVal = loadDayNote(d.day);
    h.push('<details class="day-notes-wrap"' + (noteVal ? ' open' : '') + '>');
    h.push('<summary class="day-notes-summary">📝 Notas pessoais</summary>');
    h.push('<textarea class="day-notes-textarea" id="daynote-' + d.day + '" placeholder="Adicione suas anotações para este dia..." data-daynote="' + d.day + '">' + escapeHtml(noteVal) + '</textarea>');
    h.push('</details>');

    // Tips section
    if (d.tips && d.tips.length) {
        h.push('<div class="tips-box">');
        d.tips.forEach(function(tip) {
            h.push('<div>' + tip + '</div>');
        });
        h.push('</div>');
    }

    h.push('</div>');
    return h.join('');
}

var renderedDays = {};
function renderAllDays() {
    renderedDays = {};
    document.getElementById('dayContainer').innerHTML = '';
}
function ensureDayRendered(n) {
    if (renderedDays[n]) return;
    var container = document.getElementById('dayContainer');
    container.insertAdjacentHTML('beforeend', renderDay(days[n - 1]));
    renderedDays[n] = true;
}

// ==================== SHOW DAY ====================
function showDay(n) {
    if (n < 1 || n > protoDays) return;
    var prev = currentDay;
    currentDay = n;
    // Update URL hash for deep linking (replace to avoid polluting history)
    if (history.replaceState) history.replaceState(null, '', '#day/' + n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Preload next 2 days for smoother navigation
    if (!renderedDays[n+1] && n+1 <= protoDays) setTimeout(function() { ensureDayRendered(n+1); }, 300);
    if (!renderedDays[n+2] && n+2 <= protoDays) setTimeout(function() { ensureDayRendered(n+2); }, 600);

    // Animate outgoing day slide
    var outgoing = document.querySelector('.day-slide.active');
    if (outgoing && outgoing.id !== 'ds-' + n) {
        var outAnim = n > prev ? 'slideOut' : 'slideOutRight';
        outgoing.style.animation = outAnim + ' 0.2s ease forwards';
        outgoing.classList.remove('active');
        setTimeout(function() { outgoing.style.display = 'none'; outgoing.style.animation = ''; }, 200);
    } else {
        document.querySelectorAll('.day-slide').forEach(function(s) { s.classList.remove('active'); s.style.display = 'none'; });
    }
    document.querySelectorAll('.day-pill').forEach(function(b) { b.classList.remove('active'); });
    // Sync sidebar
    document.querySelectorAll('.sidebar-item').forEach(function(s) { s.classList.remove('active'); });
    var sideItem = document.querySelector('.sidebar-item[data-sd="' + n + '"]');
    if (sideItem) { sideItem.classList.add('active'); sideItem.scrollIntoView({ block: 'nearest' }); }

    if (!renderedDays[n]) {
        var skelId = 'ds-skel-' + n;
        // Skeleton fiel ao shape do card: mídia 180px + badge + body (hora + nome + desc + actions)
        var skelCard = '<div class="skeleton-card">' +
            '<div class="skeleton-shimmer" style="height:180px;border-radius:12px 12px 0 0"></div>' +
            '<div style="padding:14px 14px 12px">' +
            '<div class="skeleton-shimmer" style="height:10px;width:30%;border-radius:4px;margin-bottom:8px"></div>' +
            '<div class="skeleton-shimmer" style="height:15px;width:80%;border-radius:4px;margin-bottom:6px"></div>' +
            '<div class="skeleton-shimmer" style="height:11px;width:60%;border-radius:4px;margin-bottom:14px"></div>' +
            '<div style="display:flex;gap:6px">' +
            '<div class="skeleton-shimmer" style="height:44px;width:44px;border-radius:12px"></div>' +
            '<div class="skeleton-shimmer" style="height:44px;width:44px;border-radius:12px"></div>' +
            '</div></div></div>';
        document.getElementById('dayContainer').insertAdjacentHTML('beforeend',
            '<div class="day-slide" id="' + skelId + '" style="display:block;padding:0 20px 32px">' +
            skelCard + skelCard + skelCard +
            '</div>');
        requestAnimationFrame(function() {
            var skel = document.getElementById(skelId);
            if (skel) skel.remove();
            ensureDayRendered(n);
            var s = document.getElementById('ds-' + n);
            if (s) { s.style.display = 'block'; s.classList.add('active'); s.style.animation = n > prev ? 'slideIn 0.25s ease' : 'slideInLeft 0.25s ease'; }
            updateDayProgress(n);
        });
    } else {
        var slide = document.getElementById('ds-' + n);
        if (slide) {
            slide.style.display = 'block';
            slide.classList.add('active');
            slide.style.animation = n > prev ? 'slideIn 0.25s ease' : 'slideInLeft 0.25s ease';
        }
    }

    var btn = document.querySelector('.day-pill[data-d="' + n + '"]');
    if (btn) {
        btn.classList.add('active');
        var container = document.getElementById('daySelector');
        var target = btn.offsetLeft - container.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
        var scrollTarget = Math.max(0, target);
        // setTimeout to run after browser's native focus scroll
        setTimeout(function() {
            container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        }, 0);
    }

    // Hero crossfade
    var heroA = document.getElementById('heroImg');
    var heroB = document.getElementById('heroImgNext');
    var newSrcJpg = dayPhotos[n] || dayPhotos[1];
    var newSrc = webpSrc(newSrcJpg);
    if (heroA.src !== newSrc && !heroA.src.endsWith(newSrc) && !heroA.src.endsWith(newSrcJpg)) {
        heroB.src = newSrc;
        heroB.alt = getTitle(days[n-1]) || 'Foto do dia';
        heroB.onload = function() {
            heroB.classList.remove('hero-img-out');
            heroA.classList.add('hero-img-out');
            // Update the <source> in the <picture> element
            var heroSource = heroA.parentElement.querySelector('source[type="image/webp"]');
            if (heroSource) heroSource.srcset = newSrc;
            setTimeout(function() {
                heroA.src = newSrcJpg;
                heroA.alt = heroB.alt;
                heroA.classList.remove('hero-img-out');
                heroB.classList.add('hero-img-out');
            }, 520);
        };
        heroB.onerror = function() {
            // WebP failed, fallback to JPG
            heroB.src = newSrcJpg;
        };
    }
    // Preload adjacent hero images (webp)
    if (dayPhotos[n+1]) { var pre = new Image(); pre.src = webpSrc(dayPhotos[n+1]); }
    if (dayPhotos[n-1]) { var pre2 = new Image(); pre2.src = webpSrc(dayPhotos[n-1]); }

    // Update trip progress
    var pct = Math.round((n / totalDays) * 100);
    var pf = document.getElementById('heroProgress');
    if (pf) pf.style.width = pct + '%';
    var pl = document.getElementById('heroProgressLabel');
    if (pl) pl.textContent = 'Dia ' + n + ' de ' + totalDays;
    updateAppBadge();

    updateDayProgress(n);
    updateTripStats();
    var nt = document.getElementById('daynote-' + n);
    if (nt && nt.value) setTimeout(function() { autoResizeTextarea(nt); }, 50);
    
    // Send notification on day change
    if (n !== prev && n > 1) {
        var dayData = days[n - 1];
        notifyDayChange(n, getTitle(dayData));
    }
}

// ==================== TAB SWITCHING ====================
function switchTab(tab, e) {
    var doSwitch = function() {
        document.querySelectorAll('.tab-item').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        if (e && e.currentTarget) {
            e.currentTarget.classList.add('active');
            e.currentTarget.setAttribute('aria-selected', 'true');
        }
        // Fade out current, fade in next
        var current = document.querySelector('.section.active');
        var next = document.getElementById('sec-' + tab);
        if (current && current !== next) {
            current.classList.remove('active');
            next.classList.add('section-entering');
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    next.classList.remove('section-entering');
                    next.classList.add('active');
                });
            });
        } else if (next) {
            document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
            next.classList.add('active');
        }

        if (tab === 'map' && !mapInstance) setTimeout(initMap, 400);
        if (tab === 'map' && mapInstance) setTimeout(function() { mapInstance.invalidateSize(); mapUpdateDay(currentDay, false); }, 150);
        if (tab === 'explore') renderExplore();
        if (tab === 'settings') updateAppVersion();
        if (tab === 'home' && typeof mapScrubDay !== 'undefined' && mapScrubDay && mapScrubDay !== currentDay) {
            showDay(mapScrubDay);
        }
    };
    // Use View Transitions API if available
    if (document.startViewTransition) {
        document.startViewTransition(doSwitch);
    } else {
        doSwitch();
    }
}

// ==================== DETAIL SHEET ====================
function openDetail(dayNum, itemIdx) {
    var d = days.find(function(x) { return x.day === dayNum; });
    if (!d) return;
    var item = d.items[itemIdx];
    var text = getItemText(d, itemIdx);
    var pi = findPlaceInfo(item.text);
    var photo = findPhoto(item.text);
    var tl = typeLabel[item.type] || '📍 Local';

    var img = document.getElementById('sheetPhoto');
    var plainAlt = text.replace(/<[^>]+>/g, '');
    if (photo) {
        img.src = webpSrc(photo);
        img.alt = plainAlt;
        img.onerror = function() { img.onerror = null; if (img.src !== photo) img.src = photo; else img.style.display = 'none'; };
        img.style.display = 'block';
    } else { img.style.display = 'none'; }

    var html = '';
    html += '<div class="sheet-badge" data-t="' + escapeHtml(item.type) + '">' + tl + '</div>';
    html += '<div class="sheet-name">' + text + '</div>';

    html += '<div class="sheet-meta">';
    html += '<div class="sheet-meta-item">🕐 ' + item.time + '</div>';
    html += '<div class="sheet-meta-item">📅 ' + getTitle(d).replace(/Dia \d+ — |Day \d+ — /, '') + '</div>';
    if (pi && pi.info.cost) html += '<div class="sheet-meta-item">💰 ' + pi.info.cost + '</div>';
    if (pi && pi.info.hours) html += '<div class="sheet-meta-item">🕑 ' + pi.info.hours + '</div>';
    html += '</div>';

    if (pi) {
        html += '<div class="sheet-detail">';
        if (pi.info.detail) html += '<p>' + escapeHtml(pi.info.detail) + '</p>';
        if (pi.info.addr) html += '<p><span class="sd-label">Endereço</span><br>' + escapeHtml(pi.info.addr) + '</p>';
        html += '</div>';

        html += '<div class="sheet-nav-title">📍 Navegar</div>';
        html += '<div class="sheet-nav-btns">';
        html += '<a class="sheet-nav-btn btn-gmaps" href="' + buildDirectionsUrl('google', pi.key, pi.info) + '" target="_blank" rel="noopener">🗺️ Google Maps</a>';
        html += '<a class="sheet-nav-btn btn-amaps" href="' + buildDirectionsUrl('apple', pi.key, pi.info) + '" target="_blank" rel="noopener">🍎 Apple Maps</a>';
        html += '</div>';
        if (pi.info.coords) {
            var c = pi.info.coords.split(',');
            var lat = parseFloat(c[0]), lng = parseFloat(c[1]);
            if (!isNaN(lat) && !isNaN(lng)) {
                html += '<button type="button" class="sheet-nav-btn btn-appmap" data-fly-lat="' + lat + '" data-fly-lng="' + lng + '">📌 Ver no Mapa</button>';
            }
        }
    }

    // Add recommended trails
    if (typeof getTrailsForLocation !== 'undefined') {
        var trails = getTrailsForLocation(text);
        if (trails && trails.length > 0) {
            html += renderTrailsCard(trails);
        }
    }

    document.getElementById('sheetBody').innerHTML = html;
    document.getElementById('sheetOverlay').classList.add('open');
    document.getElementById('sheet').classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus trap
    var sheet = document.getElementById('sheet');
    trapFocus(sheet);
    setTimeout(function() {
        var close = document.querySelector('.sheet-close');
        if (close) close.focus();
    }, 400);
}

function closeSheet() {
    document.getElementById('sheetOverlay').classList.remove('open');
    document.getElementById('sheet').classList.remove('open');
    document.body.style.overflow = '';
    releaseFocus();
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSheet();
    // Arrow keys to navigate days (only on home tab, not in inputs)
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && document.getElementById('sec-home').classList.contains('active') && !e.target.closest('input, textarea')) {
        e.preventDefault();
        if (e.key === 'ArrowLeft' && currentDay > 1) showDay(currentDay - 1);
        if (e.key === 'ArrowRight' && currentDay < totalDays) showDay(currentDay + 1);
    }
    // Focus trap in sheet
    if (e.key === 'Tab' && document.getElementById('sheet').classList.contains('open')) {
        var sheet = document.getElementById('sheet');
        var focusable = sheet.querySelectorAll('button, a, input, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }
});

// ==================== MAP ====================
function initMap() {
    document.getElementById('map').classList.add('map-loading');
    if (typeof L === 'undefined') {
        var s = document.createElement('script');
        s.src = 'lib/leaflet.js';
        s.onload = doInitMap;
        document.head.appendChild(s);
        return;
    }
    doInitMap();
}

// Map layer groups & state
var mapLayers = { route: null, routeDone: null, routeUpcoming: null, stops: null, sc: null, daytrips: null, dayroute: null, roadpois: null };
var mapTileDark = null, mapTileSat = null;
var isSatellite = false;
var mapStopMarkers = {};
var allStopMarkerEls = [];
var activePhotoMarker = null;
var mapScrubDay = 1;

// Day → coordinate mapping for fly-to
var dayCoords = {
    1:[40.7580,-73.9855], 2:[40.7580,-73.9855], 3:[40.7580,-73.9855], 4:[40.7580,-73.9855],
    5:[37.2090,-112.9871], 6:[37.2090,-112.9871], 7:[37.6283,-112.1677],
    8:[38.5733,-109.5498], 9:[38.5733,-109.5498], 10:[38.5733,-109.5498],
    11:[42.5558,-114.4701], 12:[46.7218,-122.9821], 13:[47.0,-123.5],
    14:[47.9504,-124.3855], 15:[45.8918,-123.9615], 16:[43.3665,-124.2179],
    17:[41.7558,-124.2026], 18:[40.8021,-124.1637], 19:[37.7749,-122.4194],
    20:[37.7749,-122.4194], 21:[37.7749,-122.4194], 22:[36.6,-121.9],
    23:[37.8651,-119.5383], 24:[37.8651,-119.5383], 25:[37.8651,-119.5383],
    26:[36.5640,-118.7510], 27:[36.1699,-115.1398], 28:[36.1699,-115.1398],
    29:[36.1699,-115.1398], 30:[34.0522,-118.2437],
    31:[34.0522,-118.2437], 32:[34.0522,-118.2437], 33:[34.0522,-118.2437]
};

// Build route data from encoded polylines (route-data.js must be loaded first)
var dayRouteSegments = {};
var routeCoords = [];
var dayRouteIdx = {};

(function buildRouteData() {
    if (typeof encodedRoutes === 'undefined' || typeof decodePolyline === 'undefined') {
        console.warn('route-data.js not loaded — map will use empty routes');
        return;
    }
    // Decode each driving day's polyline
    routeDayOrder.forEach(function(day) {
        if (encodedRoutes[day]) {
            dayRouteSegments[day] = decodePolyline(encodedRoutes[day]);
        }
    });
    // Build full route by concatenating day segments in order
    routeDayOrder.forEach(function(day) {
        var seg = dayRouteSegments[day];
        if (!seg || seg.length === 0) return;
        // Skip first point if it's close to the last point in routeCoords (avoid duplication at day boundaries)
        var startIdx = 0;
        if (routeCoords.length > 0) {
            var last = routeCoords[routeCoords.length - 1];
            var first = seg[0];
            var dist = Math.abs(last[0] - first[0]) + Math.abs(last[1] - first[1]);
            if (dist < 0.01) startIdx = 1; // ~1km threshold
        }
        // Record the index where this day starts in the full route
        dayRouteIdx[day] = routeCoords.length + (startIdx > 0 ? -1 : 0);
        for (var i = startIdx; i < seg.length; i++) {
            routeCoords.push(seg[i]);
        }
    });
    // Fill dayRouteIdx for non-driving days (point to nearest driving day's end)
    var lastIdx = 0;
    for (var d = 1; d <= 33; d++) {
        if (dayRouteIdx[d] !== undefined) {
            lastIdx = dayRouteIdx[d] + (dayRouteSegments[d] ? dayRouteSegments[d].length - 1 : 0);
        }
        if (dayRouteIdx[d] === undefined) {
            dayRouteIdx[d] = lastIdx;
        }
    }
})();

// Day stats for stats card
var dayStats = {
    1: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    2: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    3: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    4: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    5: { km: '~700', drive: 'LAX → Zion', hotel: 'Springdale' },
    6: { km: '~30', drive: 'Zion NP', hotel: 'Springdale' },
    7: { km: '~130', drive: 'Zion → Bryce', hotel: 'Bryce Canyon' },
    8: { km: '~490', drive: 'Bryce → Capitol Reef → Moab', hotel: 'Moab' },
    9: { km: '~80', drive: 'Canyonlands', hotel: 'Moab' },
    10: { km: '~50', drive: 'Arches NP', hotel: 'Moab' },
    11: { km: '~770', drive: 'Moab → Antelope Island → Twin Falls', hotel: 'Twin Falls' },
    12: { km: '~670', drive: 'Twin Falls → Multnomah → Centralia', hotel: 'Centralia' },
    13: { km: '~500', drive: 'Centralia → Rainier → Forks', hotel: 'Forks' },
    14: { km: '~100', drive: 'Olympic NP', hotel: 'Forks' },
    15: { km: '~380', drive: 'Forks → Cannon Beach', hotel: 'Cannon Beach' },
    16: { km: '~350', drive: 'Costa Oregon', hotel: 'Gold Beach' },
    17: { km: '~160', drive: 'Redwood NP norte', hotel: 'Crescent City' },
    18: { km: '~130', drive: 'Redwood NP sul → Eureka', hotel: 'Eureka' },
    19: { km: '~440', drive: 'Eureka → SF', hotel: 'San Francisco' },
    20: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    21: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    22: { km: '~200', drive: 'SF → Monterey → Carmel', hotel: 'Carmel' },
    23: { km: '~450', drive: 'Big Sur → Yosemite', hotel: 'Mariposa' },
    24: { km: '~110', drive: 'Yosemite NP', hotel: 'Mariposa' },
    25: { km: '~110', drive: 'Yosemite NP', hotel: 'Mariposa' },
    26: { km: '~250', drive: 'Mariposa → KC → Sequoia', hotel: 'Three Rivers' },
    27: { km: '~580', drive: 'Three Rivers → Death Valley → Vegas', hotel: 'Las Vegas' },
    28: { km: '~210', drive: 'Mt. Charleston + Valley of Fire', hotel: 'Las Vegas' },
    29: { km: '~30', drive: 'Vegas dia livre', hotel: 'Las Vegas' },
    30: { km: '~430', drive: 'Vegas → LA', hotel: 'Los Angeles' },
    31: { km: '~80', drive: 'LA dia cheio', hotel: 'Los Angeles' },
    32: { km: '~320', drive: 'Big Bear Lake', hotel: 'Los Angeles' },
    33: { km: '~30', drive: 'LAX → voo', hotel: '✈️ Volta!' }
};

function doInitMap() {
    L.Icon.Default.imagePath = 'lib/';
    mapInstance = L.map('map', { center: [38, -105], zoom: 5, zoomControl: false });

    // Remove loading overlay once tile layer finishes first render
    // mapInstance 'load' fires on map init before tiles arrive — use tileLayer 'load' instead
    var tilesAreCached = localStorage.getItem('mapTilesCached') === 'tiles-v1';
    var isOffline = !navigator.onLine;
    var _mapOfflineBanner = null;

    // Se offline e sem cache de tiles → mostrar banner após 3s sem tiles carregarem
    var _mapLoadTimer = setTimeout(function() {
        document.getElementById('map').classList.remove('map-loading');
        if (!tilesAreCached && isOffline && !_mapOfflineBanner) {
            _mapOfflineBanner = document.createElement('div');
            _mapOfflineBanner.className = 'map-offline-banner';
            _mapOfflineBanner.innerHTML =
                '<div class="map-offline-banner-text">' +
                '<strong>📡 Mapa indisponível offline</strong><br>' +
                'Os tiles do mapa não foram baixados. Conecte-se à internet e baixe o mapa offline nos Ajustes.' +
                '</div>' +
                '<button class="map-offline-banner-btn" id="btnGoDownloadTiles">📥 Ir para Ajustes → Baixar Mapa</button>';
            document.getElementById('sec-map').appendChild(_mapOfflineBanner);
            var btn = document.getElementById('btnGoDownloadTiles');
            if (btn) btn.addEventListener('click', function() {
                document.getElementById('tabSettings').click();
                setTimeout(function() {
                    var el = document.getElementById('btnCacheMap');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 400);
            });
        }
    }, 3000);

    // Zoom control bottom-left
    L.control.zoom({ position: 'topleft' }).addTo(mapInstance);

    // Tile layers
    mapTileDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OSM &copy; CARTO', maxZoom: 19
    });
    mapTileSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri', maxZoom: 18
    });
    mapTileDark.addTo(mapInstance);
    mapTileDark.once('load', function() {
        clearTimeout(_mapLoadTimer);
        document.getElementById('map').classList.remove('map-loading');
        mapInstance.invalidateSize();
        // Tiles carregaram — remover banner offline se existir
        if (_mapOfflineBanner && _mapOfflineBanner.parentNode) {
            _mapOfflineBanner.parentNode.removeChild(_mapOfflineBanner);
            _mapOfflineBanner = null;
        }
    });

    // ---- ROUTE: DONE + UPCOMING (progress split) ----
    mapLayers.route = L.layerGroup();
    mapLayers.routeDone = L.polyline(routeCoords, { color: '#4ecdc4', weight: 2.5, opacity: 0.35, smoothFactor: 1.5 });
    mapLayers.routeUpcoming = L.polyline([], { color: '#4ecdc4', weight: 3.5, opacity: 0.9, smoothFactor: 1.5, dashArray: '10,6', className: 'route-upcoming' });
    mapLayers.routeDone.addTo(mapLayers.route);
    mapLayers.routeUpcoming.addTo(mapLayers.route);
    mapLayers.route.addTo(mapInstance);

    // ---- DAY TRIPS LAYER ----
    var dayTrips = [
        [[36.1699,-115.1398],[36.2716,-115.6956]],
        [[36.1699,-115.1398],[36.4394,-114.5131]],
        [[36.1699,-115.1398],[36.5054,-116.9325]]
    ];
    mapLayers.daytrips = L.layerGroup();
    dayTrips.forEach(function(p) { L.polyline(p, { color: '#ffd700', weight: 2.5, dashArray: '6,6', opacity: 0.7 }).addTo(mapLayers.daytrips); });
    mapLayers.daytrips.addTo(mapInstance);

    // ---- STOPS LAYER (with photo markers) ----
    var stops = [
        { n: "New York", lat: 40.7580, lng: -73.9855, i: "✈️", info: "Dias 1–4 • 4 noites\nMarriott Marquis, Times Square", days: [1,2,3,4], photo: 1 },
        { n: "Las Vegas", lat: 36.1699, lng: -115.1398, i: "🎰", info: "Dias 5–8 • 4 noites", days: [5,6,7,8], photo: 5 },
        { n: "Grand Canyon", lat: 36.0544, lng: -112.1401, i: "🏞️", info: "Dia 9 • Mather Point", days: [9], photo: 9 },
        { n: "Zion NP", lat: 37.2090, lng: -112.9871, i: "🏞️", info: "Dias 9–11 • Watchman, Emerald Pools", days: [9,10,11], photo: 10 },
        { n: "Bryce Canyon", lat: 37.6283, lng: -112.1677, i: "🏔️", info: "Dias 11–12 • Hoodoos + stargazing", days: [11,12], photo: 11 },
        { n: "Moab, UT", lat: 38.5733, lng: -109.5498, i: "🏜️", info: "Dias 12–14 • Arches, Canyonlands", days: [12,13,14], photo: 13 },
        { n: "Twin Falls, ID", lat: 42.5558, lng: -114.4701, i: "🌊", info: "Dia 15 • Perrine Bridge, Shoshone Falls", days: [15], photo: 15 },
        { n: "Mt. Rainier NP", lat: 46.8523, lng: -121.7603, i: "🌋", info: "Dia 17 • Paradise", days: [17], photo: 17 },
        { n: "Olympic NP", lat: 47.9504, lng: -124.3855, i: "🧛", info: "Dias 17–18 • Hoh, Ruby Beach", days: [17,18], photo: 18 },
        { n: "Cannon Beach", lat: 45.8918, lng: -123.9615, i: "🌅", info: "Dia 19 • Haystack Rock", days: [19], photo: 19 },
        { n: "Costa Oregon", lat: 43.3407, lng: -124.2132, i: "🌊", info: "Dia 20 • Thor's Well, Samuel Boardman", days: [20], photo: 20 },
        { n: "Redwood NP", lat: 41.7558, lng: -124.2026, i: "🦕", info: "Dias 21–22 • Fern Canyon, Tall Trees", days: [21,22], photo: 22 },
        { n: "San Francisco", lat: 37.7749, lng: -122.4194, i: "🌉", info: "Dias 23–26 • Golden Gate, Alcatraz", days: [23,24,25,26], photo: 24 },
        { n: "Monterey / PCH", lat: 36.6002, lng: -121.8947, i: "🏖️", info: "Dia 27 • PCH, 17-Mile Drive", days: [27], photo: 27 },
        { n: "Mariposa / Yosemite", lat: 37.4849, lng: -119.9663, i: "🏞️", info: "Dias 27–29 • Yosemite NP", days: [27,28,29], photo: 28 },
        { n: "Three Rivers / Sequoia", lat: 36.4519, lng: -118.9054, i: "🌲", info: "Dia 30 • Sequoia + Kings Canyon", days: [30], photo: 30 },
        { n: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, i: "🎬", info: "Dias 31–33 • Griffith, Hollywood", days: [31,32,33], photo: 32 }
    ];

    mapLayers.stops = L.layerGroup();
    stops.forEach(function(s) {
        // Photo marker with fallback to emoji
        var photoSrc = dayPhotos[s.photo] || '';
        var markerHtml;
        if (photoSrc) {
            markerHtml = '<div class="map-photo-marker" data-day-marker="true" style="background-image:url(' + photoSrc + ')"></div>';
        } else {
            markerHtml = '<div class="map-stop-icon" data-day-marker="true" style="font-size:22px;text-shadow:0 2px 6px rgba(0,0,0,0.6)">' + s.i + '</div>';
        }
        var ic = L.divIcon({
            html: markerHtml,
            className: '', iconSize: [36,36], iconAnchor: [18,18], popupAnchor: [0,-20]
        });
        var q = encodeURIComponent(s.n);
        var navHtml = '<div class="popup-nav-btns">' +
            '<a class="popup-nav-btn gmaps" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">🗺️ Google</a>' +
            '<a class="popup-nav-btn amaps" href="https://maps.apple.com/?q=' + q + '" target="_blank" rel="noopener">🍎 Apple</a>' +
            '</div>' +
            '<div class="popup-nav-btns" style="margin-top:4px"><a class="popup-nav-btn" style="background:rgba(10,132,255,0.15);color:#0a84ff;flex:1;cursor:pointer" data-goto-day="' + s.days[0] + '">📅 Ver Dia ' + s.days[0] + '</a></div>';
        var marker = L.marker([s.lat, s.lng], { icon: ic }).addTo(mapLayers.stops)
            .bindPopup('<h3>' + s.i + ' ' + s.n + '</h3><div class="days">' + s.info.replace(/\n/g,'<br>') + '</div>' + navHtml, { className: 'custom-popup' });
        s.days.forEach(function(d) {
            if (!mapStopMarkers[d]) mapStopMarkers[d] = [];
            mapStopMarkers[d].push({ marker: marker, el: null });
        });
        allStopMarkerEls.push({ marker: marker, days: s.days });
    });
    mapLayers.stops.addTo(mapInstance);

    // ---- SUPERCHARGER LAYER ----
    var scCoords = {
        "Barstow, CA": [35.0527,-117.0676], "Kingman, AZ": [35.2053,-114.0530],
        "Kanab, UT": [37.0215,-112.5263], "Salina, UT": [38.9340,-111.8600],
        "Green River, UT": [38.9953,-110.1593], "Price, UT": [39.5994,-110.8107],
        "Twin Falls, ID": [42.5558,-114.4614], "Baker City, OR": [44.7749,-117.8344],
        "Pendleton, OR": [45.6721,-118.7886], "The Dalles, OR": [45.5946,-121.1787],
        "Centralia, WA": [46.7218,-122.9542], "Olympia / Centralia, WA": [47.0379,-122.9007],
        "Aberdeen, WA": [46.9754,-123.8157], "Lincoln City, OR": [44.9581,-124.0159],
        "Coos Bay, OR": [43.3665,-124.2179], "Eureka, CA": [40.8021,-124.1637],
        "Ukiah, CA": [39.1502,-123.2078], "Gilroy, CA": [37.0058,-121.5882],
        "Merced, CA": [37.3022,-120.4830], "Fresno, CA": [36.7378,-119.7871],
        "Bakersfield, CA": [35.3733,-119.0187]
    };
    mapLayers.sc = L.layerGroup();
    superchargers.forEach(function(sc) {
        var c = scCoords[sc.name];
        if (!c) return;
        var scI = L.divIcon({
            html: '<div style="font-size:13px;background:#00c853;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.5);border:2px solid #fff">⚡</div>',
            className: '', iconSize: [18,18], iconAnchor: [9,9], popupAnchor: [0,-9]
        });
        var q = encodeURIComponent('Tesla Supercharger ' + sc.name);
        var navHtml = '<div class="popup-nav-btns">' +
            '<a class="popup-nav-btn gmaps" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">🗺️ Google</a>' +
            '<a class="popup-nav-btn amaps" href="https://maps.apple.com/?q=' + q + '" target="_blank" rel="noopener">🍎 Apple</a>' +
            '</div>' +
            '<div class="popup-nav-btns" style="margin-top:4px"><a class="popup-nav-btn" style="background:rgba(10,132,255,0.15);color:#0a84ff;flex:1;cursor:pointer" data-goto-day="' + sc.day + '">📅 Ver Dia ' + sc.day + '</a></div>';
        L.marker(c, { icon: scI }).addTo(mapLayers.sc)
            .bindPopup('<h3>⚡ SC ' + escapeHtml(sc.name) + '</h3><div class="days">Dia ' + sc.day + ' • ' + escapeHtml(sc.leg) + (sc.note ? '<br>' + escapeHtml(sc.note) : '') + '</div>' + navHtml, { className: 'custom-popup' });
    });
    mapLayers.sc.addTo(mapInstance);

    // ---- ROADSIDE POI LAYER (scenic stops along the route) ----
    var roadPois = [
        // Day 5: LAX → Vegas
        { n: "Bottle Tree Ranch", lat: 34.6192, lng: -117.3347, i: "🎨", day: 5 },
        // Day 9: Vegas → Grand Canyon → Zion
        { n: "Watchman Trail", lat: 37.1988, lng: -112.9841, i: "🥾", day: 9 },
        { n: "Emerald Pools", lat: 37.2568, lng: -112.9587, i: "💎", day: 9 },
        // Day 11: Zion → Capitol Reef → Moab
        { n: "Head of the Rocks", lat: 37.7650, lng: -111.5920, i: "🏜️", day: 11 },
        { n: "Capitol Reef", lat: 38.2972, lng: -111.2615, i: "🏞️", day: 11 },
        { n: "Scenic Byway 128", lat: 38.6131, lng: -109.5103, i: "🛣️", day: 11 },
        // Day 12: Canyonlands
        { n: "Mesa Arch", lat: 38.3891, lng: -109.8673, i: "🌅", day: 12 },
        { n: "Grand View Point", lat: 38.3103, lng: -109.8591, i: "👀", day: 12 },
        { n: "Green River Overlook", lat: 38.3300, lng: -109.8839, i: "🏜️", day: 12 },
        // Day 15: Moab → Twin Falls → Centralia
        { n: "Multnomah Falls", lat: 45.5762, lng: -122.1158, i: "🌊", day: 15 },
        { n: "Columbia River Gorge", lat: 45.5956, lng: -122.0517, i: "🏞️", day: 15 },
        { n: "Rowena Crest", lat: 45.6823, lng: -121.3005, i: "🌀", day: 15 },
        { n: "Vista House", lat: 45.5391, lng: -122.2443, i: "🏛️", day: 15 },
        { n: "Deadman Pass", lat: 45.6042, lng: -118.5561, i: "⛰️", day: 15 },
        // Day 16: Centralia → Rainier → Olympic
        { n: "Paradise", lat: 46.7853, lng: -121.7356, i: "🌋", day: 16 },
        { n: "Lake Crescent", lat: 48.0596, lng: -123.7898, i: "🏔️", day: 16 },
        { n: "Sol Duc Falls", lat: 47.9525, lng: -123.8359, i: "🌊", day: 16 },
        // Day 17: Olympic NP
        { n: "Hoh Rain Forest", lat: 47.8602, lng: -123.9343, i: "🌲", day: 17 },
        { n: "Ruby Beach", lat: 47.7108, lng: -124.4126, i: "🏖️", day: 17 },
        { n: "Rialto Beach", lat: 47.9210, lng: -124.6376, i: "🪵", day: 17 },
        { n: "La Push", lat: 47.9075, lng: -124.6356, i: "🧛", day: 17 },
        // Day 19: Oregon Coast
        { n: "Cape Perpetua", lat: 44.2808, lng: -124.1092, i: "🌊", day: 19 },
        { n: "Heceta Head", lat: 44.1372, lng: -124.1285, i: "🏠", day: 19 },
        { n: "Samuel Boardman", lat: 42.1481, lng: -124.3533, i: "🌉", day: 19 },
        { n: "Shore Acres", lat: 43.3220, lng: -124.3870, i: "🌺", day: 19 },
        { n: "Newport", lat: 44.6368, lng: -124.0535, i: "🦀", day: 19 },
        // Day 20: Redwood coast
        { n: "Battery Point Lighthouse", lat: 41.7445, lng: -124.2048, i: "🏠", day: 20 },
        { n: "Stout Memorial Grove", lat: 41.7867, lng: -124.0946, i: "🌲", day: 20 },
        // Day 21: Redwood NP
        { n: "Fern Canyon", lat: 41.4012, lng: -124.0635, i: "🌿", day: 21 },
        { n: "Lady Bird Johnson", lat: 41.3253, lng: -124.0199, i: "🌲", day: 21 },
        { n: "Tall Trees Grove", lat: 41.2137, lng: -124.0022, i: "🌳", day: 21 },
        { n: "Avenue of the Giants", lat: 40.3521, lng: -123.9218, i: "🛣️", day: 21 },
        // Day 22: Eureka → SF
        { n: "Glass Beach", lat: 39.4521, lng: -123.8136, i: "💎", day: 22 },
        { n: "Mendocino", lat: 39.3076, lng: -123.7995, i: "🏡", day: 22 },
        { n: "Point Reyes", lat: 38.0682, lng: -122.8776, i: "🦭", day: 22 },
        // Day 27: SF → Yosemite
        { n: "Tunnel View", lat: 37.7157, lng: -119.6770, i: "📸", day: 27 },
        { n: "El Capitan", lat: 37.7340, lng: -119.6384, i: "🧗", day: 27 },
        { n: "Bridalveil Fall", lat: 37.7171, lng: -119.6465, i: "🌊", day: 27 },
        // Day 30: Kings Canyon / Sequoia
        { n: "General Sherman Tree", lat: 36.5817, lng: -118.7510, i: "🌲", day: 30 }
    ];

    mapLayers.roadpois = L.layerGroup();
    roadPois.forEach(function(poi) {
        var photo = findPhoto(poi.n);
        var markerHtml;
        if (photo) {
            markerHtml = '<div class="map-photo-marker map-road-poi" style="background-image:url(' + photo + ')"></div>';
        } else {
            markerHtml = '<div class="map-road-poi-emoji">' + poi.i + '</div>';
        }
        var ic = L.divIcon({
            html: markerHtml,
            className: '', iconSize: [28,28], iconAnchor: [14,14], popupAnchor: [0,-16]
        });
        var q = encodeURIComponent(poi.n);
        var navHtml = '<div class="popup-nav-btns">' +
            '<a class="popup-nav-btn gmaps" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">🗺️ Google</a>' +
            '<a class="popup-nav-btn amaps" href="https://maps.apple.com/?q=' + q + '" target="_blank" rel="noopener">🍎 Apple</a>' +
            '</div>' +
            '<div class="popup-nav-btns" style="margin-top:4px"><a class="popup-nav-btn" style="background:rgba(10,132,255,0.15);color:#0a84ff;flex:1;cursor:pointer" data-goto-day="' + poi.day + '">📅 Ver Dia ' + poi.day + '</a></div>';
        L.marker([poi.lat, poi.lng], { icon: ic }).addTo(mapLayers.roadpois)
            .bindPopup('<h3>' + poi.i + ' ' + escapeHtml(poi.n) + '</h3><div class="days">Dia ' + poi.day + '</div>' + navHtml, { className: 'custom-popup' });
    });
    // Show only when zoomed in enough (≥7)
    if (mapInstance.getZoom() >= 7) mapLayers.roadpois.addTo(mapInstance);
    mapInstance.on('zoomend', function() {
        if (mapInstance.getZoom() >= 7) {
            if (!mapInstance.hasLayer(mapLayers.roadpois)) mapLayers.roadpois.addTo(mapInstance);
        } else {
            if (mapInstance.hasLayer(mapLayers.roadpois)) mapInstance.removeLayer(mapLayers.roadpois);
        }
    });

    // ---- DAY ROUTE LAYER ----
    mapLayers.dayroute = L.layerGroup();
    mapLayers.dayroute.addTo(mapInstance);

    // ---- LEGEND ----
    var legend = L.control({ position: 'topright' });
    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML = '<h3 data-legend-toggle="1">🗺️ Legenda</h3>' +
            '<div class="legend-body">' +
            '<div class="legend-item"><div class="legend-line" style="background:#4ecdc4;opacity:0.35"></div><span>Rota percorrida</span></div>' +
            '<div class="legend-item"><div class="legend-line" style="background:#4ecdc4;border-style:dashed"></div><span>Trecho restante</span></div>' +
            '<div class="legend-item"><div class="legend-line" style="background:#0a84ff;height:4px"></div><span>Trecho do dia</span></div>' +
            '<div class="legend-item"><div class="legend-line" style="background:#ffd700;border-style:dashed"></div><span>Day trips (Vegas)</span></div>' +
            '<div class="legend-item"><div style="font-size:11px;background:#00c853;border-radius:50%;width:14px;height:14px;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff">⚡</div><span>Superchargers</span></div>' +
            '<div class="legend-item"><div style="width:14px;height:14px;border-radius:50%;background:#555;border:1.5px solid rgba(255,215,0,0.8)">📷</div><span>Pontos turísticos</span></div>' +
            '<br><div style="color:#888;font-size:10px">📅 21/01 → 22/02/2027<br>🚗 ~6.500 km • 🔄 Sentido horário</div>' +
            '</div>';
        L.DomEvent.disableClickPropagation(div);
        return div;
    };
    legend.addTo(mapInstance);

    // Sync scrubber with current day
    mapScrubDay = currentDay;
    mapUpdateDay(currentDay, false);

    mapInstance.fitBounds(L.latLngBounds(routeCoords).pad(0.1));

    // Close layers panel on map click
    mapInstance.on('click', function() {
        document.getElementById('mapLayersPanel').classList.remove('open');
    });
}

function mapUpdateRouteProgress(dayNum) {
    if (!mapLayers.routeDone || !mapLayers.routeUpcoming) return;
    var idx = dayRouteIdx[dayNum] || 0;
    var done = routeCoords.slice(0, idx + 1);
    var upcoming = routeCoords.slice(idx);
    mapLayers.routeDone.setLatLngs(done.length > 1 ? done : routeCoords);
    mapLayers.routeUpcoming.setLatLngs(upcoming.length > 1 ? upcoming : []);
}

function mapUpdateDay(dayNum, fly) {
    mapScrubDay = dayNum;

    // Update toolbar label
    var label = document.getElementById('mapDayLabel');
    if (label) {
        var d = days.find(function(x) { return x.day === dayNum; });
        label.textContent = 'Dia ' + dayNum + (d ? ' — ' + d.location : '');
    }

    // Update scrubber
    var range = document.getElementById('mapScrubRange');
    if (range) range.value = dayNum;
    var scrubLabel = document.getElementById('mapScrubLabel');
    if (scrubLabel) scrubLabel.textContent = dayNum + ' / ' + totalDays;
    var scrubLoc = document.getElementById('mapScrubLoc');
    if (scrubLoc) {
        var dl = days.find(function(x) { return x.day === dayNum; });
        scrubLoc.textContent = dl ? dl.location : '';
    }

    // Clear old day route
    if (mapLayers.dayroute) mapLayers.dayroute.clearLayers();

    // Draw day segment
    var seg = dayRouteSegments[dayNum];
    if (seg && seg.length > 1 && mapLayers.dayroute) {
        L.polyline(seg, { color: '#0a84ff', weight: 5, opacity: 0.9, smoothFactor: 1 }).addTo(mapLayers.dayroute);
    }

    // Update route progress
    mapUpdateRouteProgress(dayNum);

    // Highlight active photo marker
    if (activePhotoMarker) { activePhotoMarker.classList.remove('active-day'); activePhotoMarker = null; }
    allStopMarkerEls.forEach(function(item) {
        var el = item.marker.getElement();
        if (!el) return;
        var markerDiv = el.querySelector('[data-day-marker]');
        if (!markerDiv) return;
        if (item.days.indexOf(dayNum) !== -1) {
            markerDiv.classList.add('active-day');
            activePhotoMarker = markerDiv;
        } else {
            markerDiv.classList.remove('active-day');
        }
    });

    // Update stats card
    mapUpdateStatsCard(dayNum);

    // Fly to location
    if (fly && mapInstance) {
        var c = dayCoords[dayNum];
        if (c) mapInstance.flyTo(c, dayNum <= 4 ? 11 : 9, { duration: 0.8 });
    }
}

function mapUpdateStatsCard(dayNum) {
    var card = document.getElementById('mapStatsCard');
    var d = days.find(function(x) { return x.day === dayNum; });
    var stats = dayStats[dayNum];
    if (!d || !stats) { card.classList.remove('visible'); return; }

    var photo = document.getElementById('mapStatsPhoto');
    var src = dayPhotos[dayNum];
    if (src) {
        photo.style.backgroundImage = 'url(' + webpSrc(src) + '), url(' + src + ')';
        photo.style.display = 'block';
    } else {
        photo.style.display = 'none';
    }

    document.getElementById('mapStatsTitle').textContent = 'Dia ' + dayNum + ' — ' + d.location;
    document.getElementById('mapStatsSub').textContent = d.title.replace(/Dia \d+ — /, '');

    var badges = '';
    if (stats.km !== '—') badges += '<span class="map-stats-badge drive">🚗 ' + stats.km + ' km</span>';
    if (stats.drive) badges += '<span class="map-stats-badge">' + stats.drive + '</span>';
    if (stats.hotel) badges += '<span class="map-stats-badge hotel">🏨 ' + stats.hotel + '</span>';
    // Day progress
    var total = d.items.length, done = 0;
    for (var i = 0; i < total; i++) { if (isChecked(dayNum, i)) done++; }
    if (total > 0) badges += '<span class="map-stats-badge progress">✓ ' + done + '/' + total + '</span>';
    document.getElementById('mapStatsBadges').innerHTML = badges;

    // Action buttons
    var actions = '';
    actions += '<button class="map-stats-action-btn btn-roteiro" data-goto-day="' + dayNum + '">📅 Ver Roteiro</button>';
    var coord = dayCoords[dayNum];
    if (coord) {
        var locName = encodeURIComponent(d.location);
        actions += '<a class="map-stats-action-btn btn-directions" href="https://maps.apple.com/?daddr=' + coord[0] + ',' + coord[1] + '&dirflg=d" target="_blank" rel="noopener" onclick="event.stopPropagation()">🧭 Direções</a>';
    }
    document.getElementById('mapStatsActions').innerHTML = actions;

    card.classList.add('visible');
}

function mapFlyToDay() {
    if (!mapInstance) return;
    mapUpdateDay(currentDay, true);
}

function mapFitAll() {
    if (!mapInstance) return;
    mapInstance.fitBounds(L.latLngBounds(routeCoords).pad(0.1), { animate: true, duration: 0.8 });
    document.getElementById('mapStatsCard').classList.remove('visible');
}

function mapToggleSat() {
    if (!mapInstance) return;
    isSatellite = !isSatellite;
    if (isSatellite) {
        mapInstance.removeLayer(mapTileDark);
        mapTileSat.addTo(mapInstance);
    } else {
        mapInstance.removeLayer(mapTileSat);
        mapTileDark.addTo(mapInstance);
    }
    document.getElementById('btnMapSat').classList.toggle('active', isSatellite);
}

function mapTogglePanel() {
    document.getElementById('mapLayersPanel').classList.toggle('open');
}

function mapToggleLayer(key) {
    if (!mapInstance || !mapLayers[key]) return;
    if (mapInstance.hasLayer(mapLayers[key])) {
        mapInstance.removeLayer(mapLayers[key]);
    } else {
        mapLayers[key].addTo(mapInstance);
    }
}

function mapScrubTo(val) {
    var d = parseInt(val);
    if (d >= 1 && d <= totalDays) mapUpdateDay(d, true);
}

function mapScrubPrev() {
    if (mapScrubDay > 1) mapScrubTo(mapScrubDay - 1);
}

function mapScrubNext() {
    if (mapScrubDay < totalDays) mapScrubTo(mapScrubDay + 1);
}

// ==================== OFFLINE MAP TILES ====================
var tileCacheRunning = false;
var tileCachePaused = false;
var tileDownloadLockKey = 'mapTilesLock';
var tileDownloadLockTTL = 30000; // 30 segundos em ms

function acquireTileDownloadLock() {
    var now = Date.now();
    var existingLock = localStorage.getItem(tileDownloadLockKey);
    if (existingLock) {
        var lockTime = parseInt(existingLock, 10);
        if (now - lockTime < tileDownloadLockTTL) return false; // Lock ativo em outra aba
    }
    localStorage.setItem(tileDownloadLockKey, String(now));
    return true;
}

function releaseTileDownloadLock() {
    localStorage.removeItem(tileDownloadLockKey);
}

function generateTileList() {
    var tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    var subdomains = ['a', 'b', 'c', 'd'];
    var tiles = [];

    function addBbox(north, west, south, east, zMin, zMax) {
        for (var z = zMin; z <= zMax; z++) {
            var tMin = latLngToTile(north, west, z);
            var tMax = latLngToTile(south, east, z);
            for (var x = tMin.x; x <= tMax.x; x++) {
                for (var y = tMin.y; y <= tMax.y; y++) {
                    var s = subdomains[(x + y) % subdomains.length];
                    tiles.push(tileUrl.replace('{s}', s).replace('{z}', z).replace('{x}', x).replace('{y}', y).replace('{r}', ''));
                }
            }
        }
    }

    // Rota completa EUA Oeste — visão macro z4-8
    addBbox(48, -125, 33, -109, 4, 8);

    // Zonas estendidas da rota (z9-10) — Nevada, Utah, AZ, CA, OR, WA
    addBbox(48, -125, 33, -109, 9, 10);

    // Cidades principais do roteiro (z11-13) — detalhe de navegação
    var cities = [
        // [north, west, south, east, label]
        [40.92, -74.26, 40.48, -73.70],  // New York City
        [36.38, -115.40, 35.95, -114.95], // Las Vegas
        [36.20, -112.25, 35.95, -111.90], // Grand Canyon South Rim
        [37.35, -113.05, 37.05, -112.85], // Zion NP (Springdale)
        [37.70, -112.25, 37.55, -112.10], // Bryce Canyon
        [38.65, -109.65, 38.45, -109.40], // Arches NP (Moab)
        [37.30, -111.55, 37.05, -111.45], // Monument Valley
        [36.10, -109.95, 35.85, -109.70], // Canyon de Chelly / Chinle
        [33.65, -117.95, 33.45, -117.70], // Orange County / Laguna
        [34.15, -118.50, 33.95, -118.25], // Los Angeles
        [37.83, -122.55, 37.65, -122.35], // San Francisco
        [37.90, -119.65, 37.65, -119.45], // Yosemite Valley
        [36.65, -118.90, 36.35, -118.60], // Sequoia / Kings Canyon
        [35.85, -121.55, 35.55, -121.20], // Big Sur / Hearst
        [34.47, -119.80, 34.36, -119.65], // Santa Barbara
        [41.75, -124.25, 41.30, -123.90], // Redwoods NP Norte
        [44.20, -124.20, 43.90, -124.00], // Oregon Coast (Florence)
        [45.55, -122.80, 45.40, -122.55], // Portland
        [47.70, -122.45, 47.45, -122.20], // Seattle
        [47.95, -123.95, 47.80, -123.65], // Olympic NP (Forks/Kalaloch)
        [48.80, -121.75, 48.45, -121.40], // North Cascades
        [46.95, -121.85, 46.75, -121.60], // Mount Rainier
        [25.85, -80.35, 25.65, -80.15],   // Miami
    ];
    cities.forEach(function(c) { addBbox(c[0], c[1], c[2], c[3], 11, 13); });

    // Deduplica URLs repetidas
    return tiles.filter(function(url, i, arr) { return arr.indexOf(url) === i; });
}

async function cacheMapTiles(silent) {
    if (tileCacheRunning && !tileCachePaused) return;
    if (localStorage.getItem('mapTilesCached') === 'tiles-v1') {
        updateTileCacheUI(true, 0);
        return;
    }
    if (!navigator.onLine) {
        tileCachePaused = true;
        tileCacheRunning = false;
        return;
    }
    if (tileCachePaused) tileCachePaused = false; // Resume if paused

    if (tileCacheRunning) return; // Already running, continue from where we paused

    // Acquire multi-tab lock to prevent concurrent downloads
    // Prefer navigator.locks (atomic) over localStorage-based lock
    if (navigator.locks) {
        return navigator.locks.request('map-tile-cache', { ifAvailable: true }, async function(lock) {
            if (!lock) return; // Another tab holds the lock
            await _cacheMapTilesInner(silent);
        });
    }
    if (!acquireTileDownloadLock()) return;
    await _cacheMapTilesInner(silent);
}

async function _cacheMapTilesInner(silent) {
    tileCacheRunning = true;
    var btn = document.getElementById('btnCacheMap');
    var status = document.getElementById('mapCacheStatus');
    var progress = document.getElementById('mapProgress');
    var fill = document.getElementById('mapProgressFill');

    if (btn && !tileCachePaused) { btn.disabled = true; btn.textContent = '⏳ Baixando...'; }
    if (progress && !tileCachePaused) progress.style.display = 'block';

    var tiles = generateTileList();
    var startIdx = parseInt(localStorage.getItem('mapTilesIndex') || '0');
    var totalErrors = parseInt(localStorage.getItem('mapTilesErrors') || '0');
    var totalTiles = parseInt(localStorage.getItem('mapTilesTotal') || tiles.length);
    localStorage.setItem('mapTilesTotal', totalTiles);

    if (status && startIdx === 0) status.textContent = '0 / ' + tiles.length + ' tiles...';

    var cache = await caches.open('viagem-tiles-v1');
    var done = startIdx;
    var errors = totalErrors;
    var batchSize = silent ? 6 : 10; // smaller batches in background to save bandwidth

    for (var i = startIdx; i < tiles.length; i += batchSize) {
        if (!navigator.onLine) {
            tileCachePaused = true;
            tileCacheRunning = false;
            localStorage.setItem('mapTilesIndex', i);
            localStorage.setItem('mapTilesErrors', errors);
            if (status) status.textContent = 'Pausado: ' + done + ' / ' + tiles.length + ' tiles. Retomara ao reconectar.';
            return;
        }
        var batch = tiles.slice(i, i + batchSize);
        var results = await Promise.allSettled(batch.map(function(url) {
            return cache.match(url).then(function(cached) {
                if (cached) return;
                return fetch(url).then(function(r) {
                    if (r.ok) return cache.put(url, r);
                });
            });
        }));
        results.forEach(function(r) { if (r.status === 'rejected') errors++; });
        done += batch.length;
        localStorage.setItem('mapTilesIndex', done);
        localStorage.setItem('mapTilesErrors', errors);
        var pct = Math.round((done / tiles.length) * 100);
        if (fill) fill.style.width = pct + '%';
        if (status) status.textContent = done + ' / ' + tiles.length + ' tiles...' + (errors > 0 ? ' (' + errors + ' erros)' : '');
    }

    tileCacheRunning = false;
    tileCachePaused = false;
    releaseTileDownloadLock();
    localStorage.setItem('mapTilesCached', 'tiles-v1');
    localStorage.removeItem('mapTilesIndex');
    localStorage.removeItem('mapTilesErrors');
    localStorage.removeItem('mapTilesTotal');
    updateTileCacheUI(true, errors);
}

function updateTileCacheUI(complete, errors) {
    var btn = document.getElementById('btnCacheMap');
    var status = document.getElementById('mapCacheStatus');
    var progress = document.getElementById('mapProgress');
    if (btn) { btn.textContent = '✅ Mapa Offline Pronto!'; btn.style.background = 'var(--green)'; btn.disabled = true; }
    if (progress) progress.style.display = 'none';
    if (status) status.textContent = 'Tiles do mapa salvos para uso offline' + (errors ? ' (' + errors + ' falharam)' : '');
}

async function checkMapCacheStatus() {
    if (localStorage.getItem('mapTilesCached') === 'tiles-v1') {
        updateTileCacheUI(true, 0);
    }
}

function latLngToTile(lat, lng, zoom) {
    var n = Math.pow(2, zoom);
    var x = Math.floor((lng + 180) / 360 * n);
    var latRad = lat * Math.PI / 180;
    var y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
    return { x: x, y: y };
}

// ==================== INIT ====================
function getTodayDay() {
    var tripStart = new Date(TRIP_START);
    var today = new Date();
    today.setHours(0,0,0,0);
    tripStart.setHours(0,0,0,0);
    var diff = Math.floor((today - tripStart) / 86400000) + 1;
    if (diff >= 1 && diff <= totalDays) return diff;
    return 1;
}

function updateCountdown() {
    var tripStart = new Date(TRIP_START);
    var tripEnd = new Date(2027, 1, 22); // 22 fev 2027
    var today = new Date();
    today.setHours(0,0,0,0);
    tripStart.setHours(0,0,0,0);
    tripEnd.setHours(0,0,0,0);

    var sub = document.getElementById('heroSub');
    var title = document.getElementById('heroTitle');
    var pl = document.getElementById('heroProgressLabel');
    var pf = document.getElementById('heroProgress');

    var diff = Math.floor((tripStart - today) / 86400000);

    if (diff > 0) {
        // Antes da viagem — countdown
        if (pl) pl.textContent = '🛫 Faltam ' + diff + (diff === 1 ? ' dia!' : ' dias!');
        if (pf) pf.style.width = '0%';
        if (sub) sub.innerHTML = '<span style="color:var(--gold);font-weight:700">✈️ ' + diff + ' dias</span> para o grande dia · 21 Jan 2027';
        // Adicionar badge de countdown no hero
        var badgesEl = document.querySelector('.hero-badges');
        if (badgesEl && !document.getElementById('countdownBadge')) {
            var cb = document.createElement('span');
            cb.id = 'countdownBadge';
            cb.className = 'hero-badge hero-badge-countdown';
            cb.innerHTML = '🗓️ <b>' + diff + '</b> dias';
            badgesEl.insertBefore(cb, badgesEl.firstChild);
        }
    } else if (today <= tripEnd) {
        // Durante a viagem
        var dayNum = Math.floor((today - tripStart) / 86400000) + 1;
        dayNum = Math.max(1, Math.min(dayNum, totalDays));
        var todayData = days[dayNum - 1];
        if (sub && todayData) {
            sub.innerHTML = '<span style="color:var(--green);font-weight:700">🚗 Dia ' + dayNum + ' de ' + totalDays + '</span> · ' + todayData.location;
        }
    } else {
        // Após a viagem
        if (sub) sub.innerHTML = '<span style="color:var(--teal);font-weight:700">✅ ' + totalDays + ' dias</span> de aventura · Jan–Fev 2027';
    }
}

renderDaySelector();
renderSidebar();
renderAllDays();

// Prevent native focus-scroll on day pills (browser scrolls overflow containers on button focus)
document.getElementById('daySelector').addEventListener('mousedown', function(e) {
    if (e.target.closest('.day-pill')) e.preventDefault();
});

var initDay = getTodayDay();
// Deep link: #day/N in URL takes priority
var hashMatch = location.hash.match(/^#day\/(\d+)$/);
if (hashMatch) {
    var hashDay = parseInt(hashMatch[1], 10);
    if (hashDay >= 1 && hashDay <= totalDays) initDay = hashDay;
} else if (initDay === 1) {
    // Restore last viewed day if not during trip dates
    var saved = parseInt(localStorage.getItem('lastDay'), 10);
    if (saved >= 1 && saved <= totalDays && !isNaN(saved)) initDay = saved;
}
showDay(initDay);
updateCountdown(); // show countdown only on initial load

// Handle hash changes for deep linking (e.g. user shares URL or uses back/forward)
window.addEventListener('hashchange', function() {
    var m = location.hash.match(/^#day\/(\d+)$/);
    if (m) {
        var d = parseInt(m[1], 10);
        if (d >= 1 && d <= totalDays && d !== currentDay) {
            switchTab('home');
            showDay(d);
        }
    }
});

// Ensure day selector scroll position is correct after layout
requestAnimationFrame(function() {
    var btn = document.querySelector('.day-pill.active');
    var container = document.getElementById('daySelector');
    if (btn && container) {
        var target = btn.offsetLeft - container.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
        container.scrollLeft = Math.max(0, target);
    }
});
checkMapCacheStatus();

// Helper to schedule automatic map tile download
function scheduleAutoMapTileDownload() {
    setTimeout(function() { cacheMapTiles(true); }, 3000);
}

// Auto-download map tiles in background after 3s (only if online and not already cached)
scheduleAutoMapTileDownload();

// ==================== FAVORITES ====================
function isFav(dayNum, itemIdx) {
    return localStorage.getItem('fav-' + dayNum + '-' + itemIdx) === '1';
}
function toggleFav(dayNum, itemIdx, event) {
    event.stopPropagation();
    var key = 'fav-' + dayNum + '-' + itemIdx;
    var faved = localStorage.getItem(key) === '1';
    localStorage.setItem(key, faved ? '0' : '1');
    var actionBtn = document.querySelector('[data-action-fav="' + dayNum + '-' + itemIdx + '"]');
    if (actionBtn) {
        actionBtn.classList.toggle('action-fav-active', !faved);
        if (!faved) { actionBtn.classList.add('just-faved'); setTimeout(function() { actionBtn.classList.remove('just-faved'); }, 600); }
    }
}

// ==================== SEARCH ====================
function searchItems(query) {
    var showFavsOnly = document.getElementById('searchFavFilter').classList.contains('active');
    if ((!query || query.length < 2) && !showFavsOnly) {
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchResults').style.display = 'none';
        return;
    }
    var results = [];
    var q = query ? query.toLowerCase() : '';
    days.forEach(function(d) {
        d.items.forEach(function(item, idx) {
            var text = item.text.replace(/<[^>]+>/g, '');
            if (showFavsOnly && !isFav(d.day, idx)) return;
            if (!q || text.toLowerCase().indexOf(q) !== -1) {
                results.push({ day: d.day, idx: idx, time: item.time, text: text, hasInfo: !!findPlaceInfo(item.text) });
            }
        });
    });
    var el = document.getElementById('searchResults');
    if (results.length === 0) {
        var emptyMsg = showFavsOnly ? '<div style="padding:24px;text-align:center;color:var(--text3);font-size:13px"><div style="font-size:32px;margin-bottom:8px">⭐</div>Nenhum favorito ainda.<br>Toque ♥ nos cards para favoritar.</div>' : '<div style="padding:16px;color:var(--text3);font-size:13px">Nenhum resultado encontrado</div>';
        el.innerHTML = emptyMsg;
        el.style.display = 'block';
        return;
    }
    var html = '';
    results.slice(0, 40).forEach(function(r) {
        var thumb = findPhoto(r.text);
        var thumbHtml = thumb
            ? '<img class="search-result-thumb" src="' + webpSrc(thumb) + '" alt="' + r.text.replace(/<[^>]+>/g, '').replace(/"/g, '&quot;').substring(0, 80) + '" width="40" height="40" loading="lazy" onerror="this.style.display=\'none\'">'
            : '<div class="search-result-thumb search-result-thumb-placeholder"></div>';
        html += '<div class="search-result-item" tabindex="0" role="option" data-search-day="' + r.day + '"' + (r.hasInfo ? ' data-search-idx="' + r.idx + '"' : '') + '>';
        html += thumbHtml;
        html += '<div class="search-result-body">';
        html += '<span class="search-result-day">Dia ' + r.day + '</span>';
        html += '<span class="search-result-time">' + r.time + '</span>';
        var displayText = r.text;
        if (q) { displayText = displayText.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark style="background:rgba(10,132,255,0.3);color:var(--text);border-radius:2px;padding:0 2px">$1</mark>'); }
        html += '<span class="search-result-text">' + displayText + '</span>';
        html += '</div>';
        html += '</div>';
    });
    el.innerHTML = html;
    el.style.display = 'block';
}
function closeSearch() {
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('searchInput').value = '';
}
function toggleSearchFav(btn) {
    btn.classList.toggle('active');
    searchItems(document.getElementById('searchInput').value);
}

// ==================== LIGHTBOX ====================
var lbScale = 1, lbStartDist = 0, lbStartScale = 1;
function openLightbox(src, caption) {
    var lb = document.getElementById('lightbox');
    var img = document.getElementById('lightboxImg');
    document.getElementById('lightboxCaption').textContent = caption || '';
    // Prefer WebP for lightbox
    img.src = src.replace(/\.jpg$/, '.webp');
    img.onerror = function() { img.onerror = null; img.src = src; };
    img.style.transform = '';
    lbScale = 1;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    trapFocus(lb);
    setTimeout(function() { document.getElementById('btnLightboxClose').focus(); }, 200);
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    releaseFocus();
}
function lbGetDist(t) {
    var dx = t[0].clientX - t[1].clientX;
    var dy = t[0].clientY - t[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
(function() {
    var img = document.getElementById('lightboxImg');
    if (!img) return;
    img.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) { e.preventDefault(); lbStartDist = lbGetDist(e.touches); lbStartScale = lbScale; }
    }, { passive: false });
    img.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            lbScale = Math.min(5, Math.max(1, lbStartScale * (lbGetDist(e.touches) / lbStartDist)));
            img.style.transform = 'scale(' + lbScale + ')';
        }
    }, { passive: false });
    img.addEventListener('touchend', function() {
        if (lbScale <= 1) { lbScale = 1; img.style.transform = ''; }
    });
})();
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('lightbox').classList.contains('open')) closeLightbox();
});

// ==================== SHARE DAY ====================
function shareDay(dayNum) {
    var d = days.find(function(x) { return x.day === dayNum; });
    if (!d) return;
    var text = getTitle(d) + '\n📍 ' + d.location + ' — ' + getRoute(d) + '\n\n';
    d.items.forEach(function(item) {
        text += item.time + ' — ' + item.text.replace(/<[^>]+>/g, '') + '\n';
    });
    if (navigator.share) {
        navigator.share({ title: getTitle(d), text: text, url: location.href }).catch(function() {});
    } else {
        navigator.clipboard.writeText(text).then(function() {
            var btn = document.querySelector('#ds-' + dayNum + ' .share-day-btn');
            if (btn) { btn.textContent = '✅'; setTimeout(function() { btn.textContent = '📤'; }, 1500); }
        }).catch(function() {});
    }
}

// ==================== WEATHER CARD ====================
function getWeatherCard(d) {
    var regionWeather = {
        ny: '🌡️ -2°C a 4°C • 🧥 Casaco pesado, luvas, gorro',
        ca: '🌡️ 10°C a 20°C • 🧥 Camadas, jaqueta leve',
        pnw: '🌡️ 3°C a 10°C • 🧥 Impermeável, camadas, guarda-chuva',
        ut: '🌡️ -5°C a 8°C • 🧥 Casaco pesado, térmica, bota',
        nv: '🌡️ 5°C a 15°C • 🧥 Camadas, jaqueta, protetor solar'
    };
    var region = d.region;
    if (!region || !regionWeather[region]) return '';
    var weatherIcons = { ny: '❄️', ca: '☀️', pnw: '🌧️', ut: '❄️', nv: '☀️' };
    var wIcon = weatherIcons[region] || '🌤️';
    return '<div class="weather-card">' + wIcon + ' Clima: ' + regionWeather[region] + '</div>';
}

// ==================== DAY NOTES ====================
function saveDayNote(dayNum) {
    var el = document.getElementById('daynote-' + dayNum);
    if (el) { localStorage.setItem('note-' + dayNum, el.value); autoResizeTextarea(el); }
}
function loadDayNote(dayNum) {
    return localStorage.getItem('note-' + dayNum) || '';
}
function autoResizeTextarea(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

// ==================== TRIP STATS ====================
var statsAnimated = false;
function animateCounter(el, target, prefix, suffix, duration) {
    if (!el) return;
    var numTarget = Math.min(parseInt(String(target).replace(/[^0-9]/g, '')) || 0, 99999); // bounds guard
    var start = null;
    function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (prefix || '') + Math.round(eased * numTarget).toLocaleString() + (suffix || '');
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
function updateTripStats() {
    var totalChecked = 0, totalItems = 0, kmTraveled = 0;
    var parkDaySets = {
        'Death Valley': [8], 'Zion': [9,10,11], 'Bryce Canyon': [11,12], 'Capitol Reef': [12],
        'Canyonlands': [13], 'Arches': [14], 'Mt. Rainier': [17], 'Olympic': [17,18],
        'Redwood': [21,22], 'Yosemite': [27,28,29], 'Sequoia': [30]
    };
    days.forEach(function(d) {
        var dayHasCheck = false;
        d.items.forEach(function(item, idx) {
            totalItems++;
            if (isChecked(d.day, idx)) { totalChecked++; dayHasCheck = true; }
        });
        if (dayHasCheck && dayStats[d.day] && dayStats[d.day].km !== '—') {
            var km = parseInt(dayStats[d.day].km.replace('~', ''));
            if (!isNaN(km)) kmTraveled += km;
        }
    });
    var parksVisited = 0;
    Object.keys(parkDaySets).forEach(function(park) {
        var ds = parkDaySets[park];
        var hasAny = ds.some(function(dayNum) {
            var d = days.find(function(x) { return x.day === dayNum; });
            if (!d) return false;
            return d.items.some(function(item, idx) { return isChecked(dayNum, idx); });
        });
        if (hasAny) parksVisited++;
    });
    var el = document.getElementById('tripStatsCard');
    if (el) {
        if (!statsAnimated) {
            statsAnimated = true;
            animateCounter(document.getElementById('statChecked'), totalChecked, '', '/' + totalItems, 800);
            animateCounter(document.getElementById('statParks'), parksVisited, '', '/11', 800);
            animateCounter(document.getElementById('statKm'), kmTraveled, kmTraveled > 0 ? '~' : '', '/6.500', 1000);
        } else {
            document.getElementById('statChecked').textContent = totalChecked + '/' + totalItems;
            document.getElementById('statParks').textContent = parksVisited + '/11';
            document.getElementById('statKm').textContent = (kmTraveled > 0 ? '~' : '') + kmTraveled.toLocaleString() + '/6.500';
        }
    }
}

// ==================== EXPLORE TAB ====================
function renderExplore() {
    var el = document.getElementById('exploreContent');
    if (!el) return;
    el.innerHTML = '';
    var html = '';

    // Trip stats
    var totalChecked = 0, totalItems = 0, totalFavs = 0;
    days.forEach(function(d) {
        d.items.forEach(function(item, idx) {
            totalItems++;
            if (isChecked(d.day, idx)) totalChecked++;
            if (isFav(d.day, idx)) totalFavs++;
        });
    });
    var pct = totalItems > 0 ? Math.round(totalChecked / totalItems * 100) : 0;
    html += '<div class="explore-section" data-explore="stats">';
    html += '<div class="explore-stats">';
    var pctColor = pct === 0 ? 'muted' : pct < 50 ? 'gold' : 'green';
    html += '<div class="explore-stat-card"><div class="explore-stat-value ' + pctColor + '">' + pct + '%</div><div class="explore-stat-label">Concluído</div></div>';
    html += '<div class="explore-stat-card"><div class="explore-stat-value blue">' + totalItems + '</div><div class="explore-stat-label">Atividades</div></div>';
    html += '<div class="explore-stat-card"><div class="explore-stat-value gold">' + totalFavs + '</div><div class="explore-stat-label">Favoritos</div></div>';
    html += '</div></div>';

    // Favorites
    html += '<div class="explore-section" data-explore="favs">';
    html += '<h3 class="explore-title">❤️ Favoritos</h3>';
    var favItems = [];
    days.forEach(function(d) {
        d.items.forEach(function(item, idx) {
            if (isFav(d.day, idx)) {
                favItems.push({ day: d.day, idx: idx, time: item.time, text: item.text.replace(/<[^>]+>/g, '') });
            }
        });
    });
    if (favItems.length > 0) {
        html += '<div class="explore-section-card">';
        favItems.forEach(function(f) {
            html += '<div class="fav-item" data-goto-day="' + f.day + '">';
            html += '<div class="fav-day-badge">D' + f.day + '</div>';
            html += '<div class="fav-text">' + f.text + '</div>';
            html += '<div class="fav-time">' + f.time + '</div>';
            html += '</div>';
        });
        html += '</div>';
    } else {
        html += '<div class="explore-empty">Toque no ♥ nas atividades para adicionar favoritos</div>';
    }
    html += '</div>';

    // Hotels
    html += '<div class="explore-section" data-explore="hotels">';
    html += '<h3 class="explore-title">🏨 Hotéis <span style="font-size:13px;font-weight:500;color:var(--text3)">' + hotels.length + '</span></h3>';
    html += '<div class="explore-section-card">';
    hotels.forEach(function(h) {
        var mapsUrl = 'https://maps.apple.com/?q=' + encodeURIComponent(h.name);
        var checkinDay = findDayByDate(h.checkin);
        var hotelPhoto = dayPhotos[checkinDay] || '';
        html += '<div class="hotel-item" data-goto-day="' + checkinDay + '">';
        if (hotelPhoto) {
            html += '<div class="hotel-thumb-wrap"><img class="hotel-thumb" src="' + webpSrc(hotelPhoto) + '" alt="' + escapeHtml(h.name) + '" width="72" height="72" loading="lazy" onerror="this.parentElement.style.display=\'none\'"></div>';
        } else {
            html += '<div class="hotel-num">' + h.num + '</div>';
        }
        html += '<div class="hotel-info"><div class="hotel-name">' + escapeHtml(h.name) + '</div>';
        html += '<div class="hotel-dates">' + h.checkin + ' → ' + h.checkout + '</div></div>';
        html += '<div class="hotel-right">';
        html += '<div class="hotel-nights">' + h.nights + 'n</div>';
        html += '<a class="hotel-map-link" href="' + mapsUrl + '" target="_blank" rel="noopener" aria-label="Abrir no Maps">📍</a>';
        html += '</div>';
        html += '</div>';
    });
    html += '</div></div>';

    // Parks
    html += '<div class="explore-section" data-explore="parks">';
    html += '<h3 class="explore-title">🏞️ Parques Nacionais <span style="font-size:13px;font-weight:500;color:var(--text3)">' + parks.length + '</span></h3>';
    parks.forEach(function(p) {
        var dayMatch = p.days.match(/\d+/);
        var dayNum = dayMatch ? parseInt(dayMatch[0]) : 1;
        var parkPhoto = dayPhotos[dayNum] || '';
        html += '<div class="explore-park-card" data-goto-day="' + dayNum + '">';
        if (parkPhoto) {
            html += '<div class="explore-park-photo-wrap"><img class="explore-park-photo" src="' + webpSrc(parkPhoto) + '" alt="' + escapeHtml(p.name) + '" width="400" height="120" loading="lazy" onerror="this.parentElement.style.display=\'none\'"></div>';
        }
        html += '<div class="explore-park-header"><div>';
        html += '<div class="explore-park-name">' + escapeHtml(p.name) + '</div>';
        html += '<div class="explore-park-days">' + p.days + '</div>';
        html += '</div><div class="explore-goto">Ver dia →</div></div>';
        html += '<div class="explore-park-highlights">' + p.highlights + '</div>';
        html += '</div>';
    });
    html += '</div>';

    // Superchargers
    html += '<div class="explore-section" data-explore="superchargers">';
    html += '<h3 class="explore-title">⚡ Superchargers <span style="font-size:13px;font-weight:500;color:var(--text3)">' + superchargers.length + '</span></h3>';
    html += '<div class="explore-section-card">';
    superchargers.forEach(function(sc) {
        var mapsUrl = 'https://maps.apple.com/?q=' + encodeURIComponent('Tesla Supercharger ' + sc.name);
        html += '<div class="charge-item' + (sc.critical ? ' critical' : '') + '" data-goto-day="' + sc.day + '">';
        html += '<div class="charge-icon-wrap">' + (sc.critical ? '⚠️' : '⚡') + '</div>';
        html += '<div class="charge-info"><div class="charge-name">' + sc.name + '</div>';
        html += '<div class="charge-leg">Dia ' + sc.day + ' • ' + sc.leg + '</div>';
        if (sc.note) html += '<div class="charge-note">' + escapeHtml(sc.note) + '</div>';
        html += '</div>';
        html += '<a class="charge-map-link" href="' + mapsUrl + '" target="_blank" rel="noopener" aria-label="Abrir no Maps">📍</a>';
        html += '</div>';
    });
    html += '</div></div>';

    el.innerHTML = html;
}

function findDayByDate(dateStr) {
    var parts = dateStr.split('/');
    var d = parseInt(parts[0]), m = parseInt(parts[1]);
    var tripStart = new Date(TRIP_START);
    var target = new Date(2027, m - 1, d);
    var diff = Math.round((target - tripStart) / 86400000) + 1;
    return Math.max(1, Math.min(diff, totalDays));
}

function filterExplore(filter, btn) {
    document.querySelectorAll('.explore-filter-btn').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    if (filter === 'favs') {
        // Re-render to update favorites list
        var el = document.getElementById('exploreContent');
        if (el) el.innerHTML = '';
        renderExplore();
    }
    document.querySelectorAll('.explore-section').forEach(function(s) {
        var type = s.dataset.explore;
        if (filter === 'all') { s.style.display = ''; return; }
        if (filter === 'favs') {
            s.style.display = (type === 'favs' || type === 'stats') ? '' : 'none';
            return;
        }
        s.style.display = (type === filter || type === 'stats') ? '' : 'none';
    });
}

// ==================== SWIPE GESTURE (day navigation) ====================
(function() {
    var container = document.getElementById('dayContainer');
    if (!container) return;

    var startX = 0;
    var startY = 0;
    var tracking = false;
    var decided = false;
    var activeSlide = null;

    function resetSlide() {
        if (activeSlide) {
            activeSlide.style.transition = 'transform 0.25s ease';
            activeSlide.style.transform = '';
            setTimeout(function() { if (activeSlide) activeSlide.style.transition = ''; activeSlide = null; }, 250);
        }
    }

    container.addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
        decided = false;
        activeSlide = document.getElementById('ds-' + currentDay);
    }, { passive: true });

    container.addEventListener('touchmove', function(e) {
        if (!tracking) return;
        var dx = e.touches[0].clientX - startX;
        var dy = e.touches[0].clientY - startY;
        var absDx = Math.abs(dx);
        var absDy = Math.abs(dy);

        if (!decided) {
            if (absDx < 15 && absDy < 15) return;
            if (absDx < absDy * 2) { tracking = false; return; }
            decided = true;
        }

        // Parallax: slide current day 30% of drag distance
        var limited = dx * 0.3;
        if (activeSlide) {
            activeSlide.style.transition = 'none';
            activeSlide.style.transform = 'translateX(' + limited + 'px)';
        }

        // Show swipe peek indicators
        var hintL = document.getElementById('swipeHintL');
        var hintR = document.getElementById('swipeHintR');
        if (hintL && hintR) {
            if (dx > 40 && currentDay > 1) {
                hintL.textContent = '← ' + (currentDay - 1);
                hintL.classList.add('visible');
            } else {
                hintL.classList.remove('visible');
            }
            if (dx < -40 && currentDay < totalDays) {
                hintR.textContent = (currentDay + 1) + ' →';
                hintR.classList.add('visible');
            } else {
                hintR.classList.remove('visible');
            }
        }
    }, { passive: true });

    container.addEventListener('touchend', function(e) {
        var hintL = document.getElementById('swipeHintL');
        var hintR = document.getElementById('swipeHintR');
        if (hintL) hintL.classList.remove('visible');
        if (hintR) hintR.classList.remove('visible');

        if (!tracking || !decided) {
            tracking = false;
            resetSlide();
            return;
        }
        tracking = false;

        var endX = e.changedTouches[0].clientX;
        var dx = endX - startX;

        if (Math.abs(dx) < 50) {
            resetSlide();
            return;
        }

        // Snap slide out before showing next day
        if (activeSlide) {
            var dir = dx < 0 ? -1 : 1;
            activeSlide.style.transition = 'transform 0.2s ease';
            activeSlide.style.transform = 'translateX(' + (dir * 80) + 'px)';
            setTimeout(function() {
                if (activeSlide) { activeSlide.style.transition = ''; activeSlide.style.transform = ''; }
                activeSlide = null;
            }, 200);
        }

        if (dx < 0 && currentDay < totalDays) {
            showDay(currentDay + 1);
        } else if (dx > 0 && currentDay > 1) {
            showDay(currentDay - 1);
        }
    }, { passive: true });
})();

window.addEventListener('scroll', function() {
    if (!document.getElementById('sec-home').classList.contains('active')) return;
    if (window.scrollY < 400) {
        var t = 'translateY(' + (window.scrollY * 0.3) + 'px) scale(1.05)';
        document.querySelectorAll('.hero img').forEach(function(img) { img.style.transform = t; });
    }
}, { passive: true });

// ==================== SHEET PULL-TO-DISMISS ====================
(function() {
    var sheet = document.getElementById('sheet');
    var startY = 0, dragging = false;
    sheet.addEventListener('touchstart', function(e) {
        if (sheet.scrollTop > 0) return;
        startY = e.touches[0].clientY;
        dragging = true;
        sheet.style.transition = 'none';
    });
    sheet.addEventListener('touchmove', function(e) {
        if (!dragging) return;
        var dy = e.touches[0].clientY - startY;
        if (dy > 0) { sheet.style.transform = 'translateY(' + dy + 'px)'; e.preventDefault(); }
    }, { passive: false });
    sheet.addEventListener('touchend', function(e) {
        if (!dragging) return;
        dragging = false;
        sheet.style.transition = '';
        var dy = e.changedTouches[0].clientY - startY;
        if (dy > 100) closeSheet(); else sheet.style.transform = '';
    });
})();

// ==================== OFFLINE INDICATOR ====================
(function() {
    var bar = document.getElementById('offlineBar');
    function setOffline(offline) {
        if (offline) {
            bar.classList.add('visible');
            document.body.classList.add('is-offline');
        } else {
            bar.classList.remove('visible');
            document.body.classList.remove('is-offline');
        }
    }
    function checkOnline() {
        if (!navigator.onLine) { setOffline(true); return; }
        // Verify real connectivity (navigator.onLine is unreliable on iOS PWA)
        fetch('./manifest.json', { cache: 'no-store' }).then(function(r) {
            setOffline(!r.ok);
        }).catch(function() { setOffline(true); });
    }
    window.addEventListener('online', function() {
        setOffline(false);
        if (typeof SyncEngine !== 'undefined' && SyncEngine.url && SyncEngine.queue.length > 0) {
            setTimeout(function() { SyncEngine.push(); }, 2000);
        }
        // Resume or start map tile caching if not already cached
        if (localStorage.getItem('mapTilesCached') !== 'tiles-v1') {
            setTimeout(function() { cacheMapTiles(true); }, 1500);
        }
    });
    window.addEventListener('offline', function() { setOffline(true); });
    checkOnline();
})();

// ==================== PERSIST CURRENT DAY ====================
(function() {
    var origShowDay = showDay;
    showDay = function(n) {
        origShowDay(n);
        try { localStorage.setItem('lastDay', n); } catch(e) {}
    };
})();

// ==================== EXPORT / IMPORT USER DATA ====================
function exportUserData() {
    var data = { version: 1, exported: new Date().toISOString(), checks: {}, favs: {}, notes: {} };
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var val = localStorage.getItem(key);
        if (key.startsWith('check-')) data.checks[key] = val;
        else if (key.startsWith('fav-')) data.favs[key] = val;
        else if (key.startsWith('note-')) data.notes[key] = val;
    }
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'viagem-backup.json', { type: 'application/json' })] })) {
        navigator.share({
            title: 'Backup Viagem EUA 2027',
            files: [new File([blob], 'viagem-eua-2027-backup.json', { type: 'application/json' })]
        }).catch(function() {});
    } else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'viagem-eua-2027-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    var btn = document.getElementById('btnExportData');
    btn.textContent = '✅ Exportado!';
    setTimeout(function() { btn.textContent = '📤 Exportar Backup'; }, 2000);
}

function importUserData(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var data = JSON.parse(e.target.result);
            if (!data || !data.version) throw new Error('Invalid');
            var count = 0;
            var validKey = /^(check|fav)-\d+-\d+$|^note-\d+$/;
            if (data.checks) Object.keys(data.checks).forEach(function(k) {
                if (validKey.test(k)) { localStorage.setItem(k, data.checks[k]); count++; }
            });
            if (data.favs) Object.keys(data.favs).forEach(function(k) {
                if (validKey.test(k)) { localStorage.setItem(k, data.favs[k]); count++; }
            });
            if (data.notes) Object.keys(data.notes).forEach(function(k) {
                if (/^note-\d+$/.test(k)) { localStorage.setItem(k, data.notes[k]); count++; }
            });
            showToast('✅ ' + count + ' itens restaurados!');
            // Re-render current day to reflect imported data
            renderedDays = {};
            document.getElementById('dayContainer').innerHTML = '';
            showDay(currentDay);
        } catch(err) {
            showToast('❌ Arquivo inválido', { type: 'error' });
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ==================== GLOBAL TOAST ====================
function showToast(msg, opts) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    var type = (opts && opts.type) || 'default';
    toast.textContent = msg;
    toast.style.background = type === 'error' ? 'var(--red)' : type === 'warning' ? 'var(--orange)' : '';
    toast.classList.add('show');
    var duration = (opts && opts.duration) || 2500;
    setTimeout(function() { toast.classList.remove('show'); toast.style.background = ''; }, duration);
}

// ==================== FOCUS TRAP ====================
var _focusTrapEl = null;
var _focusTrapPrev = null;

function trapFocus(el) {
    _focusTrapEl = el;
    _focusTrapPrev = document.activeElement;
    document.addEventListener('keydown', _focusTrapHandler);
}

function releaseFocus() {
    document.removeEventListener('keydown', _focusTrapHandler);
    if (_focusTrapPrev && _focusTrapPrev.focus) _focusTrapPrev.focus();
    _focusTrapEl = null;
    _focusTrapPrev = null;
}

function _focusTrapHandler(e) {
    if (e.key !== 'Tab' || !_focusTrapEl) return;
    var focusable = _focusTrapEl.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
}

// ==================== PULL-TO-REFRESH ====================
(function() {
    var PTR_THRESHOLD = 50; // px to pull before triggering
    var PTR_MAX = 110;      // max visual pull distance
    var startY = 0;
    var pulling = false;
    var triggered = false;
    var indicator = null;

    // iOS Safari PWA: use documentElement.scrollTop as fallback
    function getScrollY() {
        return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function getIndicator() {
        if (!indicator) {
            indicator = document.getElementById('ptrIndicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.id = 'ptrIndicator';
                indicator.innerHTML = '<div class="ptr-spinner"></div><span class="ptr-label">Puxe para atualizar</span>';
                document.body.insertBefore(indicator, document.body.firstChild);
            }
        }
        return indicator;
    }

    function setIndicatorProgress(dy) {
        var el = getIndicator();
        var pct = Math.min(dy / PTR_THRESHOLD, 1);
        var translateY = Math.min(dy * 0.6, PTR_MAX * 0.6);
        el.style.transition = 'none';
        el.style.transform = 'translateX(-50%) translateY(' + translateY + 'px)';
        el.style.opacity = Math.min(pct * 1.5, 1);
        el.querySelector('.ptr-spinner').style.transform = 'rotate(' + (pct * 360) + 'deg)';
        el.querySelector('.ptr-label').textContent = pct >= 1 ? 'Solte para atualizar ↑' : 'Puxe para atualizar';
        el.classList.toggle('ptr-ready', pct >= 1);
    }

    function resetIndicator() {
        var el = getIndicator();
        el.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
        el.style.transform = 'translateX(-50%) translateY(-100%)';
        el.style.opacity = '0';
        el.classList.remove('ptr-ready', 'ptr-refreshing');
        setTimeout(function() { el.style.transition = ''; }, 350);
        triggered = false;
    }

    function triggerRefresh() {
        var el = getIndicator();
        el.classList.add('ptr-refreshing');
        el.querySelector('.ptr-label').textContent = 'Atualizando...';
        el.style.transition = 'transform 0.2s ease';
        el.style.transform = 'translateX(-50%) translateY(52px)';

        var done = false;
        function finish() {
            if (done) return;
            done = true;
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistration().then(function(reg) {
                    if (reg && reg.waiting) {
                        // Nova versão disponível — recarregar
                        el.querySelector('.ptr-label').textContent = 'Nova versão! Reiniciando...';
                        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                        setTimeout(function() { window.location.reload(); }, 600);
                    } else {
                        showToast('✅ Sincronizado!');
                        setTimeout(resetIndicator, 300);
                    }
                }).catch(function() {
                    showToast('✅ Atualizado!');
                    setTimeout(resetIndicator, 300);
                });
            } else {
                showToast('✅ Atualizado!');
                setTimeout(resetIndicator, 300);
            }
        }

        if (typeof SyncEngine !== 'undefined' && SyncEngine.url && navigator.onLine) {
            SyncEngine.fullSync().then(finish).catch(finish);
            setTimeout(finish, 6000); // fallback
        } else {
            setTimeout(finish, 600);
        }
    }

    document.addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        if (getScrollY() > 4) return;
        var homeActive = document.getElementById('sec-home') && document.getElementById('sec-home').classList.contains('active');
        if (!homeActive) return;
        startY = e.touches[0].clientY;
        pulling = true;
        triggered = false;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!pulling || triggered) return;
        var dy = e.touches[0].clientY - startY;
        if (dy <= 0) { pulling = false; return; }
        if (getScrollY() > 4) { pulling = false; resetIndicator(); return; }
        setIndicatorProgress(dy);
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        if (!pulling) return;
        pulling = false;
        var dy = e.changedTouches[0].clientY - startY;
        if (dy >= PTR_THRESHOLD && !triggered) {
            triggered = true;
            triggerRefresh();
        } else {
            resetIndicator();
        }
    }, { passive: true });
})();
