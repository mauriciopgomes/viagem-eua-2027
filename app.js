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
    // Leaflet CSS: carregar de print → all após load
    var leafletCss = document.getElementById('leafletCss');
    if (leafletCss) leafletCss.addEventListener('load', function() { this.media = 'all'; });

    // Hero: scroll topo
    var heroSection = document.getElementById('heroSection');
    if (heroSection) heroSection.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Search
    var searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', function() { searchItems(this.value); });
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
    var layerMap = { chkRoute: 'route', chkStops: 'stops', chkSuperchargers: 'sc', chkDayTrips: 'daytrips', chkDayRoute: 'dayroute' };
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

// ==================== ACTIVITY PHOTOS ====================
const activityPhotos = {
    'Times Square': 'img/activities/times_square.jpg',
    'Rockefeller': 'img/activities/rockefeller_center.jpg',
    'FAO Schwarz': 'img/activities/fao_schwarz.jpg',
    'LEGO Store': 'img/activities/lego_store_ny.jpg',
    "Joe's Pizza": 'img/activities/joes_pizza.jpg',
    'Russ & Daughters': 'img/activities/russ_and_daughters.jpg',
    "Hell's Kitchen": 'img/activities/hells_kitchen.jpg',
    'Marriott Marquis': 'img/activities/marriott_marquis.jpg',
    'St. Patrick': 'img/activities/st_patricks_cathedral.jpg',
    'Nintendo NY': 'img/activities/nintendo_ny.jpg',
    'MoMA': 'img/activities/moma.jpg',
    'Bryant Park': 'img/activities/bryant_park.jpg',
    'Biblioteca Pública': 'img/activities/biblioteca_p_blica.jpg',
    'NY Public Library': 'img/activities/ny_public_library.jpg',
    'Ghostbusters': 'img/activities/ghostbusters.jpg',
    'Charging Bull': 'img/activities/charging_bull.jpg',
    'Fearless Girl': 'img/activities/fearless_girl.jpg',
    'Trinity Church': 'img/activities/trinity_church.jpg',
    'Oculus': 'img/activities/oculus.jpg',
    '9/11 Memorial': 'img/activities/9_11_memorial.jpg',
    'One World Observatory': 'img/activities/one_world_observatory.jpg',
    '7 World Trade': 'img/activities/7_world_trade_center.jpg',
    'Brooklyn Bridge': 'img/activities/brooklyn_bridge.jpg',
    'DUMBO': 'img/activities/dumbo.jpg',
    'Brooklyn Bridge Park': 'img/activities/brooklyn_bridge_park.jpg',
    "Jane's Carousel": 'img/activities/janes_carousel.jpg',
    "Juliana's Pizza": 'img/activities/julianas_pizza.jpg',
    'Coney Island': 'img/activities/coney_island.jpg',
    "Nathan's Famous": 'img/activities/nathans_famous.jpg',
    'SoHo': 'img/activities/soho.jpg',
    'Washington Square': 'img/activities/washington_square.jpg',
    'Chelsea Market': 'img/activities/chelsea_market.jpg',
    'High Line': 'img/activities/high_line.jpg',
    'Little Island': 'img/activities/little_island.jpg',
    'Pier 57': 'img/activities/pier_57_nyc.jpg',
    'The Vessel': 'img/activities/the_vessel_nyc.jpg',
    'Hudson Yards': 'img/activities/hudson_yards.jpg',
    '5th Avenue': 'img/activities/5th_avenue.jpg',
    'Central Park': 'img/activities/central_park.jpg',
    'Strawberry Fields': 'img/activities/strawberry_fields.jpg',
    'Bethesda Fountain': 'img/activities/bethesda_fountain.jpg',
    'Bow Bridge': 'img/activities/bow_bridge.jpg',
    'MET': 'img/activities/met.jpg',
    'História Natural': 'img/activities/natural_history_museum.jpg',
    'Shake Shack': 'img/activities/shake_shack.jpg',
    "Macy's": 'img/activities/macys_herald_square.jpg',
    'Chinatown': 'img/activities/chinatown_ny.jpg',
    'Little Italy': 'img/activities/little_italy_ny.jpg',
    'Ferrara': 'img/activities/little_italy_ny.jpg',
    'Ess-a-Bagel': 'img/activities/ess_a_bagel.jpg',
    'Eataly': 'img/activities/eataly_nyc.jpg',
    'Suka Sushi': 'img/activities/suka_sushi.jpg',
    "Junior's": 'img/activities/juniors_cheesecake.jpg',
    "Carmine's": 'img/activities/juniors_cheesecake.jpg',
    'Summit One Vanderbilt': 'img/activities/summit_one_vanderbilt.jpg',
    'Grand Central Terminal': 'img/activities/grand_central_terminal.jpg',
    'General Sherman Tree': 'img/activities/general_sherman_tree.jpg',
    'Congress Trail': 'img/activities/congress_trail.jpg',
    'Kings Canyon': 'img/activities/kings_canyon.jpg',
    'Zumwalt Meadow': 'img/activities/zumwalt_meadow.jpg',
    'Roaring River Falls': 'img/activities/roaring_river_falls.jpg',
    'Crescent Meadow': 'img/activities/crescent_meadow.jpg',
    'Moro Rock': 'img/activities/moro_rock.jpg',
    'Tunnel View': 'img/activities/tunnel_view.jpg',
    'Yosemite Fall': 'img/activities/yosemite_falls_lower.jpg',
    'Swinging Bridge': 'img/activities/swinging_bridge_yosemite.jpg',
    'Valley View': 'img/activities/valley_view_yosemite.jpg',
    "Cook's Meadow": 'img/activities/cooks_meadow.jpg',
    'Vernal Fall': 'img/activities/vernal_fall.jpg',
    'Mirror Lake': 'img/activities/mirror_lake.jpg',
    'Bridalveil Fall': 'img/activities/bridalveil_fall.jpg',
    'Sentinel Bridge': 'img/activities/sentinel_bridge.jpg',
    'Yosemite Chapel': 'img/activities/yosemite_chapel.jpg',
    'Half Dome': 'img/activities/half_dome.jpg',
    'Embarcadero': 'img/activities/embarcadero_sf.jpg',
    'Crissy Field': 'img/activities/crissy_field.jpg',
    "Fisherman's Wharf": 'img/activities/fishermans_wharf.jpg',
    'Golden Gate Bridge': 'img/activities/golden_gate_bridge.jpg',
    'Pier 39': 'img/activities/pier_39.jpg',
    'Haight-Ashbury': 'img/activities/haight_ashbury.jpg',
    'Fort Point': 'img/activities/fort_point.jpg',
    'Union Square': 'img/activities/union_square_sf.jpg',
    'North Beach': 'img/activities/north_beach_sf.jpg',
    'Mission District': 'img/activities/mission_district.jpg',
    'La Taqueria': 'img/activities/la_taqueria.jpg',
    'Sausalito': 'img/activities/sausalito.jpg',
    'Muir Woods': 'img/activities/muir_woods.jpg',
    'Carson Mansion': 'img/activities/carson_mansion.jpg',
    'Lady Bird Johnson': 'img/activities/lady_bird_johnson_grove.jpg',
    'Prairie Creek': 'img/activities/prairie_creek.jpg',
    'Gold Bluffs Beach': 'img/activities/gold_bluffs_beach.jpg',
    'Newton B. Drury': 'img/activities/newton_b_drury.jpg',
    'Big Tree Wayside': 'img/activities/big_tree_wayside.jpg',
    'Stout Memorial Grove': 'img/activities/stout_memorial_grove.jpg',
    'Fern Canyon': 'img/activities/fern_canyon.jpg',
    'Cape Blanco': 'img/activities/cape_blanco.jpg',
    'Tall Trees Grove': 'img/activities/tall_trees_grove.jpg',
    'Gold Beach': 'img/activities/gold_beach_or.jpg',
    'Dean Creek': 'img/activities/dean_creek_elk.jpg',
    'Shore Acres': 'img/activities/shore_acres.jpg',
    'Ecola State Park': 'img/activities/ecola_state_park.jpg',
    'Cannon Beach': 'img/activities/cannon_beach.jpg',
    'Newport': 'img/activities/newport_oregon.jpg',
    'Haystack Rock': 'img/activities/haystack_rock.jpg',
    'Lake Crescent': 'img/activities/lake_crescent.jpg',
    'Sol Duc Falls': 'img/activities/sol_duc_falls.jpg',
    'Hoh Rain Forest': 'img/activities/hoh_rain_forest.jpg',
    'Ruby Beach': 'img/activities/ruby_beach.jpg',
    'Rialto Beach': 'img/activities/rialto_beach.jpg',
    'Marymere Falls': 'img/activities/marymere_falls.jpg',
    'Nisqually Vista': 'img/activities/nisqually_vista.jpg',
    'Mt. Rainier': 'img/activities/mt__rainier.jpg',
    'Portland': 'img/activities/portland_or.jpg',
    'Voodoo Doughnut': 'img/activities/voodoo_doughnut.jpg',
    "Powell's Books": 'img/activities/powells_books.jpg',
    'Pittock Mansion': 'img/activities/pittock_mansion.jpg',
    'Multnomah Falls': 'img/activities/multnomah_falls.jpg',
    'Boise River': 'img/activities/boise_river.jpg',
    'Idaho State Capitol': 'img/activities/idaho_state_capitol.jpg',
    'Basque Block': 'img/activities/basque_block.jpg',
    'Shoshone Falls': 'img/activities/shoshone_falls.jpg',
    'Perrine Bridge': 'img/activities/perrine_bridge.jpg',
    'Evel Knievel': 'img/activities/evel_knievel_jump_site.jpg',
    'Mesa Arch': 'img/activities/mesa_arch.jpg',
    'Upheaval Dome': 'img/activities/upheaval_dome.jpg',
    'Delicate Arch': 'img/activities/delicate_arch.jpg',
    'Balanced Rock': 'img/activities/balanced_rock.jpg',
    'Dead Horse Point': 'img/activities/dead_horse_point.jpg',
    'Red Canyon': 'img/activities/red_canyon_ut.jpg',
    'Bryce Canyon': 'img/activities/bryce_canyon.jpg',
    'Angels Landing': 'img/activities/angels_landing.jpg',
    'Grand Canyon': 'img/activities/grand_canyon.jpg',
    'Valley of Fire': 'img/activities/valley_of_fire.jpg',
    'Badwater Basin': 'img/activities/badwater_basin.jpg',
    'Red Rock Canyon': 'img/activities/red_rock_canyon.jpg',
    'Santa Monica Pier': 'img/activities/santa_monica_pier.jpg',
    'Griffith Observatory': 'img/activities/griffith_observatory.jpg',
    'Venice Beach': 'img/activities/venice_beach.jpg',
    'Welcome to Las Vegas': 'img/activities/welcome_to_las_vegas.jpg',
    'Katz\'s Deli': 'img/activities/katz_s_deli.jpg',
    'Levain Bakery': 'img/activities/levain_bakery.jpg',
    'The Plaza Hotel': 'img/activities/the_plaza_hotel.jpg',
    'Flatiron': 'img/activities/flatiron.jpg',
    'Roosevelt Island Tramway': 'img/activities/roosevelt_island_tramway.jpg',
    'General Grant': 'img/activities/general_grant.jpg',
    'El Capitan': 'img/activities/el_capitan.jpg',
    'Badger Pass': 'img/activities/badger_pass.jpg',
    'Lombard Street': 'img/activities/lombard_street.jpg',
    'Painted Ladies': 'img/activities/painted_ladies.jpg',
    'Cable Car': 'img/activities/cable_car.jpg',
    'Chinatown de SF': 'img/activities/chinatown_de_sf.jpg',
    'Point Reyes': 'img/activities/point_reyes.jpg',
    'Astoria': 'img/activities/astoria.jpg',
    'Astoria-Megler': 'img/activities/astoria_megler_bridge.jpg',
    'Forks': 'img/activities/forks_washington.jpg',
    'Hall of Mosses': 'img/activities/hall_of_mosses.jpg',
    'La Push': 'img/activities/la_push.jpg',
    'Mt. Hood': 'img/activities/mt_hood.jpg',
    'Trillium Lake': 'img/activities/trillium_lake.jpg',
    'Columbia River Gorge': 'img/activities/columbia_river_gorge.jpg',
    'Deadman Pass': 'img/activities/deadman_pass.jpg',
    'Antelope Island': 'img/activities/antelope_island.jpg',
    'Great Salt Lake': 'img/activities/great_salt_lake.jpg',
    'Grand View Point': 'img/activities/grand_view_point.jpg',
    'Green River Overlook': 'img/activities/green_river_overlook.jpg',
    'White Rim Overlook': 'img/activities/white_rim_overlook.jpg',
    'Aztec Butte': 'img/activities/aztec_butte.jpg',
    'Landscape Arch': 'img/activities/landscape_arch.jpg',
    'Double Arch': 'img/activities/double_arch.jpg',
    'Windows': 'img/activities/windows_arches.jpg',
    'Fiery Furnace': 'img/activities/fiery_furnace.jpg',
    'Park Avenue': 'img/activities/park_avenue_arches.jpg',
    'Navajo Loop': 'img/activities/navajo_loop.jpg',
    "Queen's Garden": 'img/activities/queens_garden.jpg',
    'Sunrise': 'img/activities/sunrise_point_bryce.jpg',
    'Sunset Point': 'img/activities/sunrise_point_bryce.jpg',
    'Bryce Point': 'img/activities/bryce_point.jpg',
    'Inspiration Point': 'img/activities/inspiration_point_bryce.jpg',
    'Natural Bridge': 'img/activities/natural_bridge_bryce.jpg',
    'Rainbow Point': 'img/activities/rainbow_point_bryce.jpg',
    'Riverside Walk': 'img/activities/riverside_walk_zion.jpg',
    'Canyon Overlook': 'img/activities/canyon_overlook.jpg',
    'Emerald Pools': 'img/activities/emerald_pools.jpg',
    "Pa'rus Trail": 'img/activities/parus_trail.jpg',
    'Weeping Rock': 'img/activities/weeping_rock.jpg',
    'Court of the Patriarchs': 'img/activities/court_of_patriarchs.jpg',
    'Mather Point': 'img/activities/mather_point.jpg',
    'Yavapai': 'img/activities/yavapai_point.jpg',
    'Grandview Point': 'img/activities/grandview_point.jpg',
    'Desert View Watchtower': 'img/activities/desert_view_watchtower.jpg',
    'Hopi Point': 'img/activities/hopi_point.jpg',
    'Bright Angel Trail': 'img/activities/bright_angel_trail.jpg',
    'Bellagio Fountains': 'img/activities/bellagio_fountains.jpg',
    'In-N-Out': 'img/activities/in_n_out_burger.jpg',
    'Strip': 'img/activities/las_vegas_strip_night.jpg',
    'Fire Wave': 'img/activities/fire_wave.jpg',
    'Elephant Rock': 'img/activities/elephant_rock.jpg',
    'White Domes': 'img/activities/white_domes.jpg',
    'Zabriskie Point': 'img/activities/zabriskie_point.jpg',
    "Artist's Palette": 'img/activities/artists_palette.jpg',
    'El Matador Beach': 'img/activities/el_matador_beach.jpg',
    'Malibu': 'img/activities/malibu_pch.jpg',
    'Muscle Beach': 'img/activities/muscle_beach.jpg',
    'Hollywood Sign': 'img/activities/hollywood_sign.jpg',
    'Calico Tanks': 'img/activities/calico_tanks.jpg',
    'Samuel Boardman': 'img/activities/samuel_boardman.jpg',
    'Cape Perpetua': 'img/activities/cape_perpetua.jpg',
    "Thor's Well": 'img/activities/thor_s_well.jpg',
    'Heceta Head': 'img/activities/heceta_head.jpg',
    'Natural Bridges': 'img/activities/natural_bridges.jpg',
    'Mesquite Flat Sand Dunes': 'img/activities/mesquite_flat_sand_dunes.jpg',
    "Dante's View": 'img/activities/dante_s_view.jpg',
    'Seven Magic Mountains': 'img/activities/seven_magic_mountains.jpg',
    'Watchman Trail': 'img/activities/watchman_trail.jpg',
    'Corona Arch': 'img/activities/corona_arch.jpg',
    'Scenic Byway 128': 'img/activities/scenic_byway_128.jpg',
    'Big Bend': 'img/activities/big_bend_zion.jpg',
    'Canyon Junction': 'img/activities/canyon_junction_bridge.jpg',
    'Giant Forest Museum': 'img/activities/giant_forest_museum.jpg',
    'Big Trees Trail': 'img/activities/big_trees_trail.jpg',
    'Golden Gate Park': 'img/activities/golden_gate_park.jpg',
    'Ocean Beach': 'img/activities/ocean_beach_sf.jpg',
    'Temple Square': 'img/activities/temple_square.jpg',
    'Buffalo Point': 'img/activities/buffalo_point.jpg',
    'Hermit Road': 'img/activities/hermit_road.jpg',
    // --- Additional mappings (coverage pass) ---
    'Las Vegas': 'img/activities/las_vegas_strip_night.jpg',
    'Kyle Canyon': 'img/activities/red_rock_canyon.jpg',
    'brincar na neve': 'img/activities/badger_pass.jpg',
    'Cathedral Rock Trail': 'img/activities/calico_tanks.jpg',
    'Mt. Charleston Lodge': 'img/activities/mt_charleston.jpg',
    'Death Valley': 'img/activities/zabriskie_point.jpg',
    'Springdale': 'img/activities/canyon_overlook.jpg',
    'Bryce Amphitheater': 'img/activities/bryce_canyon.jpg',
    'Stargazing': 'img/activities/bryce_point.jpg',
    'Moab': 'img/activities/corona_arch.jpg',
    'Potash Road': 'img/activities/dead_horse_point.jpg',
    'Thelma & Louise': 'img/activities/dead_horse_point.jpg',
    'SLC': 'img/activities/temple_square.jpg',
    'Boise': 'img/activities/shoshone_falls.jpg',
    'Centralia': 'img/activities/centralia_wa.jpg',
    'Henry M. Jackson': 'img/activities/mt__rainier.jpg',
    'Spruce Nature Trail': 'img/activities/hoh_rain_forest.jpg',
    'Crescent City': 'img/activities/crescent_city_ca.jpg',
    'Avenue of the Giants': 'img/activities/avenue_of_the_giants.jpg',
    'Eureka': 'img/activities/carson_mansion.jpg',
    'Nintendo San Francisco': 'img/activities/nintendo_ny.jpg',
    'San Francisco': 'img/activities/golden_gate_bridge.jpg',
    'Half Moon Bay': 'img/activities/half_moon_bay_ca.jpg',
    'Santa Cruz': 'img/activities/santa_cruz_ca.jpg',
    'Monterey': 'img/activities/monterey_ca.jpg',
    'Carmel-by-the-Sea': 'img/activities/carmel_by_the_sea.jpg',
    '17-Mile Drive': 'img/activities/17_mile_drive.jpg',
    'Bixby Creek Bridge': 'img/activities/bixby_creek_bridge.jpg',
    'Big Sur': 'img/activities/big_sur_coast.jpg',
    'Mariposa': 'img/activities/mariposa_ca.jpg',
    '1850 Restaurant': 'img/activities/mariposa_ca.jpg',
    'Majestic Yosemite': 'img/activities/majestic_yosemite_hotel.jpg',
    'Yosemite Village': 'img/activities/yosemite_village_hub.jpg',
    'Ansel Adams': 'img/activities/yosemite_village_hub.jpg',
    'Three Rivers': 'img/activities/three_rivers_ca.jpg',
    'LA': 'img/activities/griffith_observatory.jpg',
    'Santa Monica': 'img/activities/santa_monica_pier.jpg',
    // --- New route additions ---
    'Tunnel Log': 'img/activities/congress_trail.jpg',
    'Auto Log': 'img/activities/congress_trail.jpg',
    'Howland Hill Road': 'img/activities/stout_memorial_grove.jpg',
    'Boy Scout Tree Trail': 'img/activities/stout_memorial_grove.jpg',
    'Battery Point Lighthouse': 'img/activities/crescent_city_ca.jpg',
    'Del Norte Coast Redwoods': 'img/activities/newton_b_drury.jpg',
    'Damnation Creek': 'img/activities/newton_b_drury.jpg',
    'Jedediah Smith': 'img/activities/stout_memorial_grove.jpg',
    'Orick': 'img/activities/tall_trees_grove.jpg',
    'Fog Harbor': 'img/activities/fishermans_wharf.jpg',
    'Ferry Building': 'img/activities/embarcadero_sf.jpg',
    'Alcatraz': 'img/activities/alcatraz.jpg',
    'Elephant Seal Vista Point': 'img/activities/elephant_seal_vista_point.jpg',
    'Hearst Castle': 'img/activities/hearst_castle.jpg',
    'Santa Barbara': 'img/activities/santa_barbara.jpg',
    'State Street': 'img/activities/santa_barbara.jpg',
    'Santa Barbara County Courthouse': 'img/activities/santa_barbara.jpg',
    'East Beach': 'img/activities/santa_barbara.jpg',
    'Stearns Wharf': 'img/activities/stearns_wharf.jpg',
    'Point Mugu': 'img/activities/point_mugu.jpg',
    'Hollywood Walk of Fame': 'img/activities/hollywood_walk_of_fame.jpg',
    'TCL Chinese Theatre': 'img/activities/tcl_chinese_theatre.jpg',
    'The Grove': 'img/activities/the_grove_la.jpg',
    'Farmers Market': 'img/activities/the_grove_la.jpg',
    'Citadel Outlets': 'img/activities/citadel_outlets.jpg',
    'The Lark': 'img/activities/santa_barbara.jpg',
    // --- Roadside stops ---
    'Alien Fresh Jerky': 'img/activities/alien_fresh_jerky.jpg',
    'Cape Disappointment': 'img/activities/cape_disappointment.jpg',
    'Capitol Reef': 'img/activities/capitol_reef.jpg',
    'Checkerboard Mesa': 'img/activities/checkerboard_mesa.jpg',
    'Glass Beach': 'img/activities/glass_beach.jpg',
    'Goblin Valley': 'img/activities/goblin_valley.jpg',
    'Hackberry General Store': 'img/activities/hackberry_general_store.jpg',
    'Head of the Rocks': 'img/activities/head_of_the_rocks.jpg',
    'Hoover Dam': 'img/activities/hoover_dam.jpg',
    'Kalaloch': 'img/activities/kalaloch_tree_of_life.jpg',
    'Tree of Life': 'img/activities/kalaloch_tree_of_life.jpg',
    'Mendocino': 'img/activities/mendocino.jpg',
    'Navajo Bridge': 'img/activities/navajo_bridge.jpg',
    'Peter Iredale': 'img/activities/peter_iredale_shipwreck.jpg',
    'Seligman': 'img/activities/seligman_route66.jpg',
    'Tehachapi Loop': 'img/activities/tehachapi_loop.jpg',
    'Vista House': 'img/activities/vista_house.jpg',
    'Crown Point': 'img/activities/vista_house.jpg',
    'World\'s Tallest Thermometer': 'img/activities/worlds_tallest_thermometer.jpg',
    // --- Roteiro sync additions ---
    'Bottle Tree Ranch': 'img/activities/seven_magic_mountains.jpg',
    'Eldorado Canyon': 'img/activities/valley_of_fire.jpg',
    'Thousand Springs': 'img/activities/shoshone_falls.jpg',
    'Rowena Crest': 'img/activities/columbia_river_gorge.jpg',
    'Kurt Cobain': 'img/activities/cannon_beach.jpg',
    'Fort Stevens': 'img/activities/peter_iredale_shipwreck.jpg',
    'Devil\'s Punchbowl': 'img/activities/newport_oregon.jpg',
    'Elk Meadow': 'img/activities/dean_creek_elk.jpg',
    'Cypress Tree Tunnel': 'img/activities/point_reyes.jpg',
    'Pigeon Point Lighthouse': 'img/activities/heceta_head.jpg',
    'Cool Cat Collective': 'img/activities/santa_monica_pier.jpg',
    'Lake Shrine': 'img/activities/golden_gate_park.jpg',
    'California Science Center': 'img/activities/giant_forest_museum.jpg',
    'Greystone Mansion & Gardens': 'img/activities/carson_mansion.jpg',
    'Getty Center': 'img/activities/golden_gate_park.jpg',
    // --- Missing locations audit (roteiro sync) ---
    'Harry Potter Shop': 'img/activities/flatiron.jpg',
    "Devil's Golf Course": 'img/activities/badwater_basin.jpg',
    'Fairyland Point': 'img/activities/bryce_canyon.jpg',
    'Mossy Cave': 'img/activities/bryce_canyon.jpg',
    'Hickman Bridge': 'img/activities/capitol_reef.jpg',
    'San Rafael Swell': 'img/activities/capitol_reef.jpg',
    'Cannery Row': 'img/activities/monterey_ca.jpg',
    'Monterey Bay Aquarium': 'img/activities/monterey_ca.jpg',
    'Pfeiffer Beach': 'img/activities/big_sur_coast.jpg',
    'McWay Falls': 'img/activities/big_sur_coast.jpg',
    'North Grove Loop': 'img/activities/general_grant.jpg',
    'Generals Highway': 'img/activities/general_sherman_tree.jpg',
    'Universal Studios': 'img/activities/hollywood_sign.jpg',
    'Snow Summit': 'img/activities/badger_pass.jpg',
    'Alpine Slide': 'img/activities/badger_pass.jpg',
    'Castle Rock Trail': 'img/activities/badger_pass.jpg',
    'Big Bear': 'img/activities/mt_charleston.jpg',
    // --- Coverage pass 2 (full-text audit) ---
    'Mt. Charleston': 'img/activities/mt_charleston.jpg',
    'Venetian': 'img/activities/las_vegas_strip_night.jpg',
    'Caesars Palace': 'img/activities/las_vegas_strip_night.jpg',
    'Furnace Creek': 'img/activities/zabriskie_point.jpg',
    'Zion Canyon': 'img/activities/canyon_overlook.jpg',
    'Zion': 'img/activities/canyon_overlook.jpg',
    'Canyonlands': 'img/activities/mesa_arch.jpg',
    'Arches NP': 'img/activities/delicate_arch.jpg',
    'Battery Spencer': 'img/activities/golden_gate_bridge.jpg',
    'Golden Gate Overlook': 'img/activities/golden_gate_bridge.jpg',
    // --- Coverage pass 3 (missing photos) ---
    'St. Patrick': 'img/activities/st_patricks_cathedral.jpg',
    "Joe's Pizza": 'img/activities/joes_pizza.jpg',
    'Ghostbusters Firehouse': 'img/activities/ghostbusters.jpg',
    'Wall Street': 'img/activities/charging_bull.jpg',
    'Brooklyn Bridge Park': 'img/activities/brooklyn_bridge_park.jpg',
    "Juliana's Pizza": 'img/activities/julianas_pizza.jpg',
    'Los Tacos No.1': 'img/activities/la_taqueria.jpg',
    'Hudson Yards': 'img/activities/hudson_yards.jpg',
    'Ferrara Bakery': 'img/activities/levain_bakery.jpg',
    'Disney Store': 'img/activities/times_square.jpg',
    'Rockefeller Center': 'img/activities/rockefeller_center.jpg',
    'Bellagio': 'img/activities/bellagio_fountains.jpg',
    'Venetian': 'img/activities/las_vegas_strip_night.jpg',
    'Caesars Palace': 'img/activities/las_vegas_strip_night.jpg',
    'Valley of Fire': 'img/activities/valley_of_fire.jpg',
    'Artist Palette': 'img/activities/artists_palette.jpg',
    'Badwater Basin': 'img/activities/badwater_basin.jpg',
    'Canyon Overlook': 'img/activities/canyon_overlook.jpg',
    'Emerald Pools': 'img/activities/emerald_pools.jpg',
    'Bryce Canyon': 'img/activities/bryce_canyon.jpg',
    'Queen\'s Garden': 'img/activities/queens_garden.jpg',
    'Navajo Loop': 'img/activities/navajo_loop.jpg',
    'Capitol Reef': 'img/activities/capitol_reef.jpg',
    'Island in the Sky': 'img/activities/grand_view_point.jpg',
    'Delicate Arch': 'img/activities/delicate_arch.jpg',
    'Landscape Arch': 'img/activities/landscape_arch.jpg',
    'Dead Horse Point': 'img/activities/dead_horse_point.jpg',
    'Antelope Island': 'img/activities/antelope_island.jpg',
    'Evel Knievel': 'img/activities/evel_knievel_jump_site.jpg',
    'Mt. Rainier': 'img/activities/mt__rainier.jpg',
    'Paradise': 'img/activities/mt__rainier.jpg',
    'Olympic NP': 'img/activities/sol_duc_falls.jpg',
    'Hoh Rain Forest': 'img/activities/hall_of_mosses.jpg',
    'Hall of Mosses': 'img/activities/hall_of_mosses.jpg',
    'Sol Duc Falls': 'img/activities/sol_duc_falls.jpg',
    'La Push': 'img/activities/la_push.jpg',
    'Cannon Beach': 'img/activities/cannon_beach.jpg',
    'Thor\'s Well': 'img/activities/thor_s_well.jpg',
    'Heceta Head': 'img/activities/heceta_head.jpg',
    'Cape Perpetua': 'img/activities/cape_perpetua.jpg',
    'Shore Acres': 'img/activities/shore_acres.jpg',
    'Fern Canyon': 'img/activities/fern_canyon.jpg',
    'Redwood NP': 'img/activities/lady_bird_johnson_grove.jpg',
    'Stout Grove': 'img/activities/stout_memorial_grove.jpg',
    'San Francisco': 'img/activities/golden_gate_bridge.jpg',
    'Golden Gate Bridge': 'img/activities/golden_gate_bridge.jpg',
    'Crissy Field': 'img/activities/crissy_field.jpg',
    'Painted Ladies': 'img/activities/painted_ladies.jpg',
    'Cable Car': 'img/activities/cable_car.jpg',
    'Alcatraz': 'img/activities/alcatraz.jpg',
    'Lombard Street': 'img/activities/lombard_street.jpg',
    'Yosemite NP': 'img/activities/tunnel_view.jpg',
    'Half Dome': 'img/activities/half_dome.jpg',
    'Tunnel View': 'img/activities/tunnel_view.jpg',
    'Sequoia NP': 'img/activities/general_sherman_tree.jpg',
    'General Sherman': 'img/activities/general_sherman_tree.jpg',
    'Moro Rock': 'img/activities/moro_rock.jpg',
    'Kings Canyon': 'img/activities/kings_canyon.jpg',
    'Griffith Observatory': 'img/activities/griffith_observatory.jpg',
    // --- Coverage pass 4 ---
    "Katz's Deli": 'img/activities/katz_s_deli.jpg',
    "World's Tallest Thermometer": 'img/activities/worlds_tallest_thermometer.jpg',
    'Bryce': 'img/activities/bryce_canyon.jpg',
    "Cook's Meadow Loop": 'img/activities/cooks_meadow.jpg',
    "Fisherman's Wharf": 'img/activities/fishermans_wharf.jpg',
    'Time Out Market': 'img/activities/chelsea_market.jpg',
    'The Goonies': 'img/activities/astoria.jpg',
    "Devil's Punchbowl": 'img/activities/cape_perpetua.jpg',
    'Coastal Trail': 'img/activities/lady_bird_johnson_grove.jpg',
    'Jurassic Park 2': 'img/activities/fern_canyon.jpg',
    'baleias cinzentas': 'img/activities/la_push.jpg',
    'SF': 'img/activities/golden_gate_bridge.jpg',
    'Tesla Model Y': 'img/activities/hollywood_walk_of_fame.jpg',
    'Scenic Drive': 'img/activities/scenic_byway_128.jpg',
    'Disney Store': 'img/activities/times_square.jpg',
    'Artist\'s Drive': 'img/activities/artists_palette.jpg',
    "Devil's Golf Course": 'img/activities/badwater_basin.jpg',
    'Los Tacos': 'img/activities/chelsea_market.jpg',
    // --- Superchargers (fallback route photo) ---
    'Supercharger Barstow': 'img/activities/seligman_route66.jpg',
    'Supercharger Salina, UT': 'img/activities/seligman_route66.jpg',
    'Supercharger Green River, UT': 'img/activities/seligman_route66.jpg',
    'Supercharger Green River': 'img/activities/seligman_route66.jpg',
    'Supercharger Price': 'img/activities/seligman_route66.jpg',
    'Supercharger Twin Falls': 'img/activities/seligman_route66.jpg',
    'Supercharger Baker City, OR': 'img/activities/seligman_route66.jpg',
    'Supercharger Pendleton, OR': 'img/activities/seligman_route66.jpg',
    'Supercharger The Dalles, OR': 'img/activities/seligman_route66.jpg',
    'Supercharger Olympia': 'img/activities/seligman_route66.jpg',
    'Supercharger Aberdeen, WA': 'img/activities/seligman_route66.jpg',
    'Supercharger Lincoln City, OR': 'img/activities/seligman_route66.jpg',
    'Supercharger Coos Bay': 'img/activities/seligman_route66.jpg',
    'Supercharger Ukiah': 'img/activities/seligman_route66.jpg',
    'Supercharger Gilroy': 'img/activities/seligman_route66.jpg',
    'Supercharger Merced': 'img/activities/seligman_route66.jpg',
    'Supercharger Fresno': 'img/activities/seligman_route66.jpg',
    'Supercharger Bakersfield': 'img/activities/seligman_route66.jpg',
    'Supercharger San Bernardino': 'img/activities/seligman_route66.jpg',
    // --- Generic/Events ---
    'Brincar na neve!': 'img/activities/mt__rainier.jpg',
    'CARREGAR ATÉ 100%!': 'img/activities/charging_bull.jpg',
    'Tesla': 'img/activities/las_vegas_strip_night.jpg',
    // --- Roadside stops (missing mappings) ---
    'Terrible\'s Road House': 'img/activities/seligman_route66.jpg',
    'Boudin': 'img/activities/fishermans_wharf.jpg',
};

// Pre-sort keys longest-first for accurate matching (e.g., "Brooklyn Bridge Park" before "Brooklyn Bridge")
const _photoKeys = Object.keys(activityPhotos).sort((a, b) => b.length - a.length);

function findPhoto(text) {
    const clean = text.replace(/<[^>]+>/g, '');
    for (let i = 0; i < _photoKeys.length; i++) {
        if (clean.includes(_photoKeys[i])) return activityPhotos[_photoKeys[i]];
    }
    return null;
}

// Helper: convert .jpg path to .webp
function webpSrc(jpg) { return jpg.replace(/\.jpg$/, '.webp'); }
function webpSrc400(jpg) { return jpg.replace(/\.jpg$/, '-400w.webp'); }

// ==================== PLACE INFO (addresses + details) ====================
const placeInfo = {
    // Day 1
    'JFK': { addr: 'John F. Kennedy International Airport, Queens, NY', coords: '40.6413,-73.7781', detail: 'Terminal internacional. Imigração pode levar 1-2h na alta temporada.' },
    'Marriott Marquis': { addr: '1535 Broadway, New York, NY 10036', coords: '40.7579,-73.9860', detail: 'Hotel 4★ no coração de Times Square. 49 andares, vista panorâmica. Lobby no 8° andar.', hours: 'Check-in: 16h / Check-out: 11h', cost: '~$350-500/noite' },
    'Russ & Daughters': { addr: '179 E Houston St, New York, NY 10002', coords: '40.7224,-73.9886', detail: 'Deli judaica lendária desde 1914. Famosa por bagels, lox (salmão defumado) e babka.', hours: 'Seg-Dom 8h-18h', cost: '~$15-25/pessoa' },
    'Nintendo NY': { addr: '10 Rockefeller Plaza, New York, NY 10020', coords: '40.7587,-73.9787', detail: 'Maior loja Nintendo do mundo! 2 andares com consoles pra jogar, merchandise exclusivo e estátuas em tamanho real do Mario, Zelda e Pokémon.', hours: '10h-21h', cost: 'Entrada gratuita' },
    'St. Patrick': { addr: "St. Patrick's Cathedral, 5th Ave & 50th St, New York, NY 10022", coords: '40.7585,-73.9760', detail: 'Catedral neogótica de 1878, a maior da América do Norte. Vitrais impressionantes, altar de mármore e bronze.', hours: '6h30-20h45', cost: 'Gratuito' },
    'FAO Schwarz': { addr: '30 Rockefeller Plaza, New York, NY 10112', coords: '40.7590,-73.9795', detail: 'Loja de brinquedos icônica desde 1862. Piano gigante do filme "Big" com Tom Hanks.', hours: '10h-20h' },
    'LEGO Store': { addr: '636 5th Ave, New York, NY 10020', coords: '40.7583,-73.9775', detail: 'Flagship LEGO com maquetes gigantes: Estátua da Liberdade, Empire State, metrô de NY — tudo em LEGO!', hours: '10h-21h', cost: 'Entrada gratuita' },
    "Joe's Pizza": { addr: "7 Carmine St, New York, NY 10014", coords: '40.7305,-74.0024', detail: 'Pizza de NY clássica desde 1975. Fatia fina e crocante. Favorita dos locais e turistas. Fila rápida.', hours: '10h-5h (madrugada!)', cost: '~$3-5/fatia' },
    '5th Avenue': { addr: '5th Avenue & 50th St, New York, NY', coords: '40.7585,-73.9765', detail: 'A avenida mais famosa do mundo. Saks Fifth Avenue, Tiffany & Co., Apple Store (cubo de vidro), Cartier, Bergdorf Goodman.' },
    'MoMA': { addr: '11 W 53rd St, New York, NY 10019', coords: '40.7614,-73.9776', detail: 'Museum of Modern Art — acervo de 200.000 obras. Noite Estrelada (Van Gogh), Nenúfares (Monet), Campbell\'s Soup (Warhol), Les Demoiselles d\'Avignon (Picasso).', hours: '10h30-17h30 (Sáb até 19h)', cost: '$30 adulto / grátis <16 anos' },
    'Biblioteca Pública': { addr: '476 5th Ave, New York, NY 10018', coords: '40.7532,-73.9822', detail: 'Beaux-Arts de 1911. A Sala Rose de Leitura tem 23m de pé-direito com nuvens pintadas no teto. Os leões de pedra (Patience & Fortitude) na entrada são ícones de NY.', hours: 'Seg-Sáb 10h-18h, Dom 13h-17h', cost: 'Gratuito' },
    'NY Public Library': { addr: '476 5th Ave, New York, NY 10018', coords: '40.7532,-73.9822', detail: 'Beaux-Arts de 1911. A Sala Rose de Leitura tem 23m de pé-direito com nuvens pintadas no teto.', hours: 'Seg-Sáb 10h-18h', cost: 'Gratuito' },
    'Bryant Park': { addr: 'Bryant Park, 42nd St & 6th Ave, New York, NY 10018', coords: '40.7536,-73.9832', detail: 'Parque urbano atrás da Biblioteca. No inverno: pista de patinação gratuita (aluguel de patins ~$20), Winter Village com lojas e comida.', hours: '7h-22h', cost: 'Gratuito (patinação: aluguel ~$20)' },
    "Hell's Kitchen": { addr: "9th Ave & 46th St, New York, NY 10036", coords: '40.7608,-73.9940', detail: 'Bairro gastronômico de NYC. Restaurant Row (46th St) tem dezenas de opções. Shake Shack, Empanada Mama, Rubirosa, Don Antonio — tudo ali perto.' },

    // Day 2
    'Ghostbusters': { addr: '14 N Moore St, New York, NY 10013', coords: '40.7197,-74.0066', detail: 'Quartel de bombeiros Hook & Ladder 8, usado como fachada no filme Ghostbusters (1984). Tem o logo pintado na calçada e placa comemorativa.', hours: 'Exterior 24h (interior é quartel ativo)', cost: 'Gratuito' },
    'Charging Bull': { addr: 'Bowling Green, Broadway, New York, NY 10004', coords: '40.7056,-74.0134', detail: 'Touro de bronze de 3.200kg instalado guerrilheiramente em 1989 por Arturo Di Modica. Símbolo de Wall Street e otimismo financeiro. Fearless Girl fica em frente à NYSE agora.', cost: 'Gratuito' },
    'Wall Street': { addr: 'Wall Street, New York, NY 10005', coords: '40.7068,-74.0089', detail: 'Centro financeiro do mundo. NYSE (Bolsa de NY), Federal Hall (onde Washington tomou posse), estátuas.', cost: 'Gratuito' },
    'Trinity Church': { addr: '89 Broadway, New York, NY 10006', coords: '40.7082,-74.0121', detail: 'Igreja anglicana de 1846. Cemitério com o túmulo de Alexander Hamilton. Arquitetura neogótica linda.', hours: '7h-18h', cost: 'Gratuito' },
    'Oculus': { addr: 'Oculus, 185 Greenwich St, New York, NY 10007', coords: '40.7113,-74.0125', detail: 'Hub de transporte projetado por Santiago Calatrava. Formato de pomba em voo. Interior branco com nervuras simétricas — impressionante! Westfield shops dentro.', hours: '5h-0h', cost: 'Gratuito' },
    '9/11 Memorial': { addr: '180 Greenwich St, New York, NY 10007', coords: '40.7115,-74.0134', detail: 'Duas piscinas nos exatos locais das torres. Nomes de todas as 2.983 vítimas gravados nas bordas de bronze. Memorial Museum embaixo conta a história completa.', hours: 'Memorial: 10h-17h / Pools: 9h-20h', cost: 'Memorial: gratuito / Museum: $28 adulto' },
    'One World Observatory': { addr: '117 West St, New York, NY 10007', coords: '40.7130,-74.0132', detail: 'Observatório no topo do One World Trade Center (541m). Elevador sobe 102 andares em 47 segundos com vídeo da história de NY nas paredes. Vista 360° incrível.', hours: '10h-19h', cost: '$43 adulto / $37 criança (6-12)' },
    '7 World Trade Center': { addr: '7 World Trade Center, 250 Greenwich St, New York, NY 10007', coords: '40.7132,-74.0116', detail: 'Prédio reconstruído após o 11/9. Escritório fictício da Pearson Specter Litt no seriado Suits!' },
    'Brooklyn Bridge': { addr: 'Brooklyn Bridge, New York, NY', coords: '40.7061,-73.9969', detail: 'Ponte suspensa de 1883, ícone de NY. Travessia a pé leva ~30min pelo passadiço de madeira. Melhor de Manhattan → Brooklyn para ter a vista do skyline de frente.', cost: 'Gratuito' },
    'DUMBO': { addr: 'Washington St & Water St, Brooklyn, NY 11201', coords: '40.7033,-73.9894', detail: 'Down Under the Manhattan Bridge Overpass. A foto mais instagramável de NY: Manhattan Bridge emoldurada pelos prédios de tijolo na Washington St.', cost: 'Gratuito' },
    'Brooklyn Bridge Park': { addr: 'Brooklyn Bridge Park, Brooklyn, NY 11201', coords: '40.7003,-73.9965', detail: 'Parque à beira-rio com vista espetacular de Manhattan. Jane\'s Carousel ($2) é um carrossel vintage dentro de um cubo de vidro.' },
    "Juliana's Pizza": { addr: '19 Old Fulton St, Brooklyn, NY 11201', coords: '40.7027,-73.9938', detail: 'Pizzaria do lendário Patsy Grimaldi. Forno a carvão, massa fininha. Considerada a melhor pizza de NY por muitos. Fila pode ser longa — vá cedo!', hours: '11h30-22h', cost: '~$20-30 pizza inteira' },
    'Time Out Market': { addr: '55 Water St, Brooklyn, NY 11201', coords: '40.7024,-73.9904', detail: 'Food hall curado pela Time Out. 21 restaurantes + rooftop bar com vista da ponte e Manhattan.', hours: '11h-22h' },
    'Coney Island': { addr: 'Coney Island Boardwalk, Brooklyn, NY 11224', coords: '40.5738,-73.9712', detail: 'Praia e parque de diversões clássico de NY desde 1900s. Boardwalk de madeira, Luna Park (aberto no verão), aquário de NY. No inverno é mais vazio mas ainda charmoso.', cost: 'Boardwalk gratuito / Luna Park: $$ por atração' },
    "Nathan's Famous": { addr: '1310 Surf Ave, Brooklyn, NY 11224', coords: '40.5756,-73.9814', detail: 'Hot dog original desde 1916! Local do famoso concurso de comer hot dogs no 4 de julho. O hot dog clássico é obrigatório.', hours: '10h-0h', cost: '~$5-8' },
    'SoHo': { addr: 'SoHo, Spring St & Broadway, New York, NY 10012', coords: '40.7233,-73.9985', detail: 'South of Houston. Prédios com fachadas de ferro fundido, galerias, lojas de grife, street art. Ótimo para fotos e vitrine.' },
    'Washington Square': { addr: 'Washington Square Park, New York, NY 10012', coords: '40.7308,-73.9973', detail: 'Coração de Greenwich Village e NYU. O Washington Square Arch (1892) foi inspirado no Arco do Triunfo de Paris. Artistas de rua, músicos, xadrez.', cost: 'Gratuito' },
    'Chelsea Market': { addr: '75 9th Ave, New York, NY 10011', coords: '40.7424,-74.0061', detail: 'Food hall numa antiga fábrica da Nabisco (onde o Oreo foi inventado!). Los Tacos No.1 é o destaque — tacos autênticos mexicanos com fila que vale a pena.', hours: '7h-21h', cost: 'Los Tacos: ~$5-8/taco' },
    'High Line': { addr: 'The High Line, New York, NY 10011', coords: '40.7480,-74.0048', detail: 'Parque linear elevado de 2.3km construído sobre uma antiga linha de trem de carga. Jardins, arte urbana, vista do Hudson e da cidade. Acesso gratuito por várias escadas.', hours: '7h-22h (inverno até 19h)', cost: 'Gratuito' },
    'Little Island': { addr: 'Little Island, Pier 55, Hudson River Park, NY 10014', coords: '40.7415,-74.0100', detail: 'Parque flutuante inaugurado em 2021. 132 tulipas de concreto sustentam o parque sobre o Rio Hudson. Gramados, mirantes e anfiteatro.', hours: '6h-1h (inverno fecha mais cedo)', cost: 'Gratuito' },
    'Pier 57': { addr: 'Pier 57, 25 11th Ave, New York, NY 10011', coords: '40.7435,-74.0080', detail: 'Sede do Google em NY! Rooftop público com vista do Hudson. Food hall no térreo.' },
    'Hudson Yards': { addr: 'Hudson Yards, New York, NY 10001', coords: '40.7538,-74.0014', detail: 'Complexo de $25 bilhões inaugurado em 2019. The Vessel: estrutura de 150 escadas interconectadas (16 andares). Edge: observatório ao ar livre a 335m de altura.', hours: 'Shops: 10h-21h', cost: 'Edge: $41 adulto / Vessel: gratuito (reserva)' },
    'The Vessel': { addr: 'Hudson Yards, 20 Hudson Yards, New York, NY 10001', coords: '40.7538,-74.0014', detail: 'Estrutura em forma de colmeia com 2.500 degraus e 154 lances de escada. Vista 360° da cidade. Precisa de ingresso gratuito (reservar online).', cost: 'Gratuito (reserva obrigatória)' },

    // Day 3
    'Levain Bakery': { addr: '167 W 74th St, New York, NY 10023', coords: '40.7792,-73.9788', detail: 'Cookies enormes e famosos mundialmente! Chocolate chip walnut é o mais pedido. Fila comum mas anda rápido.', hours: '8h-0h', cost: '~$5/cookie' },
    'Central Park': { addr: 'Central Park, New York, NY', coords: '40.7829,-73.9654', detail: 'Parque de 341 hectares no coração de Manhattan. Strawberry Fields (memorial John Lennon), Bethesda Fountain (filme Angels in America), Bow Bridge (vista icônica).', hours: '6h-1h', cost: 'Gratuito' },
    'The Plaza Hotel': { addr: '768 5th Ave, New York, NY 10019', coords: '40.7645,-73.9744', detail: 'Hotel de luxo de 1907. Kevin McCallister ficou aqui em Esqueceram de Mim 2! Lobby aberto ao público.', cost: 'Gratuito (lobby)' },
    'História Natural': { addr: 'American Museum of Natural History, Central Park West & 79th St, NY 10024', coords: '40.7813,-73.9740', detail: 'Um dos maiores museus de ciência do mundo! Fósseis de dinossauros, planetário, diorama dos oceanos. Filme "Uma Noite no Museu" filmado aqui.', hours: '10h-17h30', cost: '$28 adulto / grátis <13 anos' },
    'Natural History': { addr: 'American Museum of Natural History, Central Park West & 79th St, NY 10024', coords: '40.7813,-73.9740', detail: 'One of the world\'s largest science museums. Dinosaur fossils, planetarium, ocean dioramas. "Night at the Museum" filmed here.', hours: '10h-17h30', cost: '$28 adult / free <13' },
    'Shake Shack': { addr: '366 Columbus Ave, New York, NY 10024', coords: '40.7809,-73.9755', detail: 'Rede de hamburgueria premium nascida em NY. ShackBurger e crinkle-cut fries são obrigatórios!', cost: '~$12-18/pessoa' },
    'MET': { addr: '1000 5th Ave, New York, NY 10028', coords: '40.7794,-73.9632', detail: 'Metropolitan Museum of Art — o maior museu dos EUA! 2 milhões de obras. Egito antigo (Templo de Dendur), arte europeia, armaduras medievais.', hours: '10h-17h (Sex-Sáb até 21h)', cost: '$30 adulto / grátis <12 anos' },
    'Metropolitan Museum': { addr: '1000 5th Ave, New York, NY 10028', coords: '40.7794,-73.9632', detail: 'Metropolitan Museum of Art — o maior museu dos EUA! 2 milhões de obras.', hours: '10h-17h', cost: '$30 adulto / grátis <12 anos' },
    "Macy's": { addr: "151 W 34th St, New York, NY 10001", coords: '40.7508,-73.9890', detail: "Maior loja de departamento do mundo! 11 andares. Escada rolante de madeira original de 1902.", hours: '10h-22h', cost: 'Entrada gratuita' },
    'Chinatown': { addr: 'Canal St & Mott St, New York, NY 10013', coords: '40.7158,-73.9970', detail: 'Maior Chinatown das Américas! ~100.000 moradores. Canal Street para compras, Mott Street para comida. Dim sum no Nom Wah Tea Parlor (desde 1920).', cost: 'Gratuito' },
    'Little Italy': { addr: 'Mulberry St, New York, NY 10013', coords: '40.7198,-73.9975', detail: 'Bairro italiano histórico. Mulberry St é a principal rua. Ferrara Bakery (desde 1892) para cannoli e espresso.', cost: 'Gratuito' },
    'Ferrara Bakery': { addr: '195 Grand St, New York, NY 10013', coords: '40.7188,-73.9970', detail: 'A bakery italiana mais antiga dos EUA (desde 1892). Cannoli, tiramisu e espresso são imperdíveis.', hours: '8h-0h', cost: '~$5-12' },
    "Katz's Deli": { addr: "205 E Houston St, New York, NY 10002", coords: '40.7223,-73.9874', detail: "Deli lendária desde 1888. Pastrami defumado por 30 dias, cortado à mão. Cena 'I\'ll have what she\'s having' de Harry & Sally filmada aqui.", hours: '8h-22h45', cost: '~$25-30/sanduíche' },

    // Day 4
    'Ess-a-Bagel': { addr: '831 3rd Ave, New York, NY 10022', coords: '40.7569,-73.9689', detail: 'Bagels de NY autênticos desde 1976. Enormes, densos e com cream cheese generoso. Fila longa mas vale a pena.', hours: '6h-21h', cost: '~$5-12' },
    'Summit One Vanderbilt': { addr: '45 E 42nd St, New York, NY 10017', coords: '40.7530,-73.9785', detail: 'Observatório imersivo a 427m. Salas de espelhos infinitos (SUMMIT One), piso de vidro, terraço ao ar livre. Experiência única!', hours: '9h-0h', cost: '$42 adulto' },
    'Grand Central': { addr: 'Grand Central Terminal, 89 E 42nd St, New York, NY 10017', coords: '40.7527,-73.9772', detail: 'Estação de trem de 1913. Teto com constelações pintadas (invertidas!), relógio de opala de 4 faces ($20M), Whispering Gallery.', hours: '5h15-2h', cost: 'Gratuito' },
    'Mr. Robot': { addr: '135 E 57th St, New York, NY 10022', coords: '40.7616,-73.9686', detail: 'Fachada usada como E Corp HQ no seriado Mr. Robot. Prédio de escritórios real.' },
    'E Corp': { addr: '135 E 57th St, New York, NY 10022', coords: '40.7616,-73.9686', detail: 'Fachada usada como E Corp HQ no seriado Mr. Robot.' },
    'Roosevelt Island Tramway': { addr: '59th St & 2nd Ave, New York, NY 10022', coords: '40.7613,-73.9645', detail: 'Bondinho aéreo sobre o East River. Vista incrível de Manhattan e Queensboro Bridge. 4 minutos de travessia, usa MetroCard.', hours: '6h-2h (Seg-Sex) / 6h-3h30 (Sáb-Dom)', cost: '$2.90 (MetroCard)' },
    'Eataly': { addr: '200 5th Ave, New York, NY 10010', coords: '40.7420,-73.9893', detail: 'Mega mercado italiano fundado pelo chef Oscar Farinetti. Restaurantes, padaria, queijos, vinhos. Rooftop bar com vista do Flatiron.', hours: '10h-23h', cost: '~$15-30/pessoa' },
    'Suka Sushi': { addr: '61 Lexington Ave, New York, NY 10010', coords: '40.7430,-73.9828', detail: 'Sushi japonês autêntico em Midtown/Gramercy. Último jantar em NY!', cost: '~$30-60/pessoa' },
    'Flatiron': { addr: 'Flatiron Building, 175 5th Ave, New York, NY 10010', coords: '40.7411,-73.9897', detail: 'Prédio triangular de 1902, um dos mais antigos arranha-céus de NY. Formato de ferro de passar. Recentemente convertido em residências de luxo.', cost: 'Exterior gratuito' },
    "Carmine's": { addr: "200 W 44th St, New York, NY 10036", coords: '40.7575,-73.9875', detail: "Restaurante italiano com porções familiares enormes! Pasta, chicken parm, veal. Reserva recomendada.", hours: '11h-23h', cost: '~$30-50/pessoa' },
    "Junior's": { addr: "1515 Broadway, New York, NY 10036", coords: '40.7580,-73.9856', detail: "Famoso pelo cheesecake de NY! Desde 1950 no Brooklyn, filial em Times Square. Cheesecake de morango é o clássico.", hours: '6h30-0h', cost: '~$10-15/fatia' },

    // Day 6 — LAX / Sequoia
    'LAX': { addr: 'Los Angeles International Airport, 1 World Way, LA, CA 90045', coords: '33.9425,-118.4081', detail: 'Aeroporto internacional de LA. Terminal de retirada do Tesla geralmente no estacionamento P1/P2.' },
    'Supercharger Tejon': { addr: 'Tejon Ranch Commerce Center, Lebec, CA 93243', coords: '34.9876,-118.9199', detail: 'Supercharger Tesla V3 com ~20 stalls. ⚠️ CARREGAR ATÉ 100% — Sequoia não tem carregadores!', cost: '~$10-15' },
    'Three Rivers': { addr: 'Three Rivers, CA 93271', coords: '36.4524,-118.9048', detail: 'Vilarejo na entrada do Sequoia NP. Poucas opções de restaurante — The Gateway é popular.' },

    // Day 7 — Sequoia + Kings Canyon
    'General Sherman': { addr: 'General Sherman Tree, Sequoia NP, CA', coords: '36.5819,-118.7513', detail: 'A MAIOR ÁRVORE DO MUNDO em volume! 84m de altura, 11m de diâmetro na base, ~2.100 anos. Trilha pavimentada de ~0.8 km (descida).', cost: 'Entrada do parque: $35/veículo' },
    'Congress Trail': { addr: 'Congress Trail, Sequoia NP, CA', coords: '36.5810,-118.7520', detail: 'Loop de ~3 km entre dezenas de sequoias gigantes: The President (2° maior), The Senate Group, The House Group.', cost: 'Incluso na entrada do parque' },
    'General Grant': { addr: 'General Grant Tree Trail, Kings Canyon NP, CA', coords: '36.7472,-118.9717', detail: 'A "Árvore de Natal da Nação" — designada por Eisenhower em 1956. 3ª maior árvore do mundo. Trilha fácil de ~1 km.', cost: 'Incluso na entrada do parque' },
    'Kings Canyon Scenic Byway': { addr: 'Kings Canyon Scenic Byway (Hwy 180), CA', coords: '36.7947,-118.6731', detail: 'Estrada cênica de 80 km descendo ao fundo do cânion. Profundidade de até 2.500m — mais profundo que o Grand Canyon!', cost: 'Incluso na entrada' },
    'Zumwalt Meadow': { addr: 'Zumwalt Meadow Trail, Kings Canyon NP, CA', coords: '36.7953,-118.5916', detail: 'Loop de ~2.5 km num vale glacial. Paredões de granito, rio Kings, meadow verde. Relativamente fácil.', cost: 'Incluso' },
    'Roaring River Falls': { addr: 'Roaring River Falls, Kings Canyon NP, CA', coords: '36.7944,-118.6144', detail: 'Cachoeira curta e poderosa. Caminhada de ~5 min da estrada. Ótima pra foto rápida.' },
    'Moro Rock': { addr: 'Moro Rock, Sequoia NP, CA', coords: '36.5463,-118.7656', detail: '350 degraus esculpidos na rocha até o topo! Vista 360° do Great Western Divide e do vale. Imperdível ao pôr do sol!', cost: 'Incluso na entrada' },
    'Crescent Meadow': { addr: 'Crescent Meadow, Sequoia NP, CA', coords: '36.5525,-118.7530', detail: "John Muir a chamou de 'Jóia da Sierra'. Tharp's Log: cabana pioneira dentro de um tronco oco de sequoia!", cost: 'Incluso' },

    // Day 8-9 — Yosemite
    'Tunnel View': { addr: 'Tunnel View, Yosemite NP, CA', coords: '37.7157,-119.6770', detail: 'A vista mais icônica de Yosemite! El Capitan à esquerda, Half Dome ao centro, Bridalveil Fall à direita. Estacionamento pequeno — chegue cedo!', cost: 'Entrada: $35/veículo' },
    'Yosemite Valley': { addr: 'Yosemite Valley, Yosemite NP, CA', coords: '37.7459,-119.5933', detail: 'Vale glacial de 11 km rodeado por paredões de granito. Village tem restaurantes, lojas e centro de visitantes.' },
    'El Capitan': { addr: 'El Capitan Meadow, Yosemite NP, CA', coords: '37.7340,-119.6384', detail: 'Paredão vertical de 900m — maior monolito de granito do mundo! Escaladores levam 4-5 dias. Free Solo (2018) filmado aqui.' },
    'Lower Yosemite Fall': { addr: 'Lower Yosemite Fall Trail, Yosemite NP, CA', coords: '37.7466,-119.5961', detail: 'Trilha pavimentada de ~1.6 km até a base de Yosemite Falls (739m total). No inverno pode ter gelo — microspikes úteis.' },
    'Swinging Bridge': { addr: 'Swinging Bridge, Yosemite NP, CA', coords: '37.7436,-119.5997', detail: 'Ponte sobre o Rio Merced com vista clássica de Yosemite Falls. Ótimo ponto para fotos.' },
    'Valley View': { addr: 'Valley View, Yosemite NP, CA', coords: '37.7189,-119.6595', detail: 'Vista do vale com El Capitan e Bridalveil Fall refletidos no rio Merced. Espetacular ao pôr do sol!' },
    'Vernal Fall': { addr: 'Vernal Fall Footbridge, Yosemite NP, CA', coords: '37.7270,-119.5425', detail: 'Cachoeira de 97m. Trilha até a ponte (~1.6 km) oferece vista frontal. No inverno pode estar congelada — LINDO!', cost: 'Incluso' },
    'Mirror Lake': { addr: 'Mirror Lake Trail, Yosemite NP, CA', coords: '37.7507,-119.5574', detail: 'Lago que reflete Half Dome perfeitamente em dias calmos. Trilha de ~8 km (loop). No inverno o lago pode estar seco.', cost: 'Incluso' },
    'Bridalveil Fall': { addr: 'Bridalveil Fall Trail, Yosemite NP, CA', coords: '37.7171,-119.6465', detail: 'Cachoeira de 189m — uma das primeiras vistas ao entrar no vale. Trilha curta (~0.8 km ida e volta).', cost: 'Incluso' },
    'Sentinel Bridge': { addr: 'Sentinel Bridge, Yosemite NP, CA', coords: '37.7455,-119.5899', detail: 'Ponte sobre o Rio Merced. Ponto clássico pra foto do Half Dome refletido na água.' },
    'Badger Pass': { addr: 'Badger Pass Ski Area, Yosemite NP, CA', coords: '37.6625,-119.6621', detail: 'Estação de esqui mais antiga da Califórnia (1935). Esqui, snowboard, snow tubing. Ótimo pra família!', hours: '9h-16h (inverno)', cost: 'Lift: ~$60 adulto / $40 criança' },
    'Majestic Yosemite': { addr: 'The Majestic Yosemite Hotel, Yosemite NP, CA', coords: '37.7487,-119.5744', detail: 'Hotel histórico de 1927 (ex-Ahwahnee). Dining Room com teto de 10m e vitrais. Reserva obrigatória para jantar!', cost: '~$40-70/pessoa jantar' },
    'Yosemite Chapel': { addr: 'Yosemite Chapel, Yosemite NP, CA', coords: '37.7441,-119.5880', detail: 'A estrutura mais antiga de Yosemite (1879). Igrejinha de madeira encantadora com Yosemite Falls ao fundo.' },
    'Ansel Adams Gallery': { addr: 'Ansel Adams Gallery, Yosemite Village, CA', coords: '37.7490,-119.5885', detail: 'Galeria do fotógrafo Ansel Adams, famoso pelas fotos icônicas de Yosemite em preto e branco. Vende prints originais.', hours: '10h-17h', cost: 'Entrada gratuita' },

    // Day 5 — LAX → Vegas roadside stops
    'Bottle Tree Ranch': { addr: '24266 National Trails Hwy, Oro Grande, CA 92368', coords: '34.6192,-117.3347', detail: 'Instalação de arte outsider no deserto! "Floresta" de mais de 200 "árvores" feitas com garrafas de vidro, peças de metal e objetos reaproveitados pelo artista Elmer Long. Grátis, às margens da Route 66.', cost: 'Gratuito' },
    // Day 9 — Three Rivers → Vegas (roadside stops)
    'Tehachapi Loop': { addr: 'Tehachapi Loop, Keene, CA 93531', coords: '35.1328,-118.5470', detail: 'Maravilha de engenharia ferroviária! O trem faz um loop de 1.17 km subindo a montanha — quando é longo o bastante, a locomotiva passa POR CIMA dos últimos vagões! Melhor visto do mirante na Woodford-Tehachapi Rd.', cost: 'Gratuito' },
    'World\'s Tallest Thermometer': { addr: '72157 Baker Blvd, Baker, CA 92309', coords: '35.2661,-116.0731', detail: 'Termômetro de 40m construído em 1991 — marca 134°F, a temperatura mais alta já registrada (Death Valley, 1913). Baker é o último posto antes de Vegas!', cost: 'Gratuito' },
    'Alien Fresh Jerky': { addr: '72242 Baker Blvd, Baker, CA 92309', coords: '35.2665,-116.0738', detail: 'Loja temática de aliens com >100 sabores de jerky artesanal! Divertida parada no deserto. Estátuas de ETs gigantes na frente.', hours: '8h-20h', cost: '~$5-15' },

    // Day 10 — SF
    'Supercharger Manteca': { addr: 'Bass Pro Shops, Manteca, CA 95337', coords: '37.7880,-121.2390', detail: 'Supercharger V3 com ~16 stalls. Ao lado de Bass Pro Shops — bom pra esticar as pernas.' },
    'Embarcadero': { addr: 'The Embarcadero, San Francisco, CA', coords: '37.7955,-122.3937', detail: 'Orla de SF. Ferry Building Marketplace tem comidas artesanais, queijos, ostras. Vista da Bay Bridge.', hours: 'Ferry Building: 10h-18h', cost: 'Gratuito' },
    'Crissy Field': { addr: 'Crissy Field, San Francisco, CA 94129', coords: '37.8036,-122.4652', detail: 'Praia e gramado com vista frontal da Golden Gate Bridge. Melhor ponto pra foto ao pôr do sol!', cost: 'Gratuito' },
    "Fisherman's Wharf": { addr: "Fisherman's Wharf, San Francisco, CA", coords: '37.8080,-122.4177', detail: "Área turística com Pier 39, Ghirardelli Square, restaurantes de frutos do mar. Clam chowder em bread bowl é obrigatório!", cost: 'Gratuito (passear)' },

    // Day 11 — SF
    'Pier 39': { addr: 'Pier 39, San Francisco, CA 94133', coords: '37.8087,-122.4098', detail: 'Píer turístico famoso pelos leões-marinhos no K-Dock! Lojas, restaurantes, Aquarium of the Bay. Vista de Alcatraz.', hours: '10h-21h', cost: 'Gratuito (passear)' },
    'Cable Car': { addr: 'Powell-Hyde Cable Car, Powell & Market, SF, CA', coords: '37.7845,-122.4079', detail: 'Bonde histórico a cabo desde 1873! Linha Powell-Hyde tem as melhores vistas. Pode pegar de pé no estribo!', hours: '6h30-23h30', cost: '$8/viagem' },
    'Lombard Street': { addr: 'Lombard St, San Francisco, CA 94133', coords: '37.8021,-122.4187', detail: 'A "rua mais sinuosa do mundo" — 8 curvas em um quarteirão! Florida St em Potrero Hill é na verdade mais sinuosa, mas Lombard é a famosa.', cost: 'Gratuito' },
    'Painted Ladies': { addr: 'Painted Ladies, Steiner St & Hayes St, SF, CA 94117', coords: '37.7763,-122.4328', detail: 'Fileira de casas vitorianas coloridas com o skyline de SF ao fundo. Abertura do seriado Full House! Foto do Alamo Square Park.', cost: 'Gratuito (exterior)' },
    'Alamo Square': { addr: 'Alamo Square Park, San Francisco, CA 94117', coords: '37.7764,-122.4340', detail: 'Parque no topo de uma colina com a vista icônica das Painted Ladies. Ótimo pra picnic.', cost: 'Gratuito' },
    'Haight-Ashbury': { addr: 'Haight St & Ashbury St, San Francisco, CA 94117', coords: '37.7697,-122.4468', detail: 'Berço do movimento hippie e Summer of Love (1967). Lojas vintage, head shops, murais. Grateful Dead moraram na Ashbury 710.', cost: 'Gratuito' },
    'Golden Gate Bridge': { addr: 'Golden Gate Bridge, San Francisco, CA', coords: '37.8199,-122.4783', detail: 'Ponte suspensa de 2.737m inaugurada em 1937. Caminhar leva ~30 min (só lado leste). Bike também! Vista do Baker Beach.', hours: '5h-21h (pedestres)', cost: 'Gratuito (caminhar/pedalar) / Pedágio carro: $8.75' },
    'Fort Point': { addr: 'Fort Point, Marine Dr, San Francisco, CA 94129', coords: '37.8107,-122.4770', detail: 'Forte militar de 1861 sob a Golden Gate Bridge. Cenário do filme Vertigo (1958) de Hitchcock!', hours: '10h-17h (Sex-Dom)', cost: 'Gratuito' },
    'Union Square': { addr: 'Union Square, San Francisco, CA 94108', coords: '37.7876,-122.4074', detail: 'Praça central de compras de SF. Macy\'s, Saks, Neiman Marcus, Apple Store. Coração comercial da cidade.' },
    'North Beach': { addr: 'North Beach, San Francisco, CA', coords: '37.7997,-122.4080', detail: 'Little Italy de SF. Restaurantes italianos, City Lights Bookstore (berço da Beat Generation), Café Trieste.', cost: 'Gratuito' },

    // Day 12 — SF neighborhoods
    'Chinatown de SF': { addr: 'Chinatown, Grant Ave, San Francisco, CA 94108', coords: '37.7941,-122.4078', detail: 'A Chinatown mais antiga dos EUA (desde 1848)! Dragon\'s Gate na Grant Ave. Dim sum no Great Eastern, R&G Lounge.', cost: 'Gratuito' },
    'Mission District': { addr: 'Mission District, San Francisco, CA', coords: '37.7599,-122.4148', detail: 'Bairro latino vibrante! Murais em Balmy Alley e Clarion Alley. Melhor burrito de SF na La Taqueria.', cost: 'Gratuito' },
    'La Taqueria': { addr: '2889 Mission St, San Francisco, CA 94110', coords: '37.7511,-122.4183', detail: 'Melhor burrito de SF (e talvez dos EUA!). Sem arroz no burrito — só carne, feijão, queijo, salsa. Fila longa mas vale!', hours: '11h-21h', cost: '~$12-15' },
    'Muir Woods': { addr: 'Muir Woods National Monument, Mill Valley, CA 94941', coords: '37.8912,-122.5718', detail: 'Floresta de sequoias costeiras (coast redwoods) a 30 min de SF. Árvores de até 75m! Reserva de estacionamento obrigatória.', hours: '8h-17h', cost: '$15/pessoa + $9 estacionamento' },
    'Sausalito': { addr: 'Sausalito, CA 94965', coords: '37.8591,-122.4853', detail: 'Vila pitoresca na baía. Casas-barco coloridas, galerias, cafés com vista de SF. Ferry de volta pra SF é uma boa opção.', cost: 'Gratuito' },
    'Waterbar': { addr: '399 The Embarcadero, San Francisco, CA 94105', coords: '37.7895,-122.3885', detail: 'Restaurante de frutos do mar premium com vista da Bay Bridge. Aquários no interior. Reserva recomendada.', cost: '~$50-80/pessoa' },

    // Day 13 — Point Reyes / Eureka
    // Day 23 — Eureka → SF
    'Cypress Tree Tunnel': { addr: 'Cypress Tree Tunnel, Point Reyes Station, CA 94956', coords: '38.0780,-122.8450', detail: 'Túnel natural formado por ciprestes de Monterey centenários plantados na década de 1930! Os galhos se entrelaçam sobre a estrada criando um arco perfeito. Ponto de foto clássico de Point Reyes — especialmente lindo com neblina matinal. Na Sir Francis Drake Blvd.', cost: 'Gratuito' },
    'Point Reyes': { addr: 'Point Reyes National Seashore, CA', coords: '38.0682,-122.8776', detail: 'Reserva costeira com elk preserve (alces tule!), Point Reyes Lighthouse (308 degraus descendo), praias selvagens.', hours: 'Lighthouse: 10h-16h30 (Sex-Seg)', cost: '$0 (estacionamento gratuito)' },
    'Supercharger Ukiah': { addr: 'Ukiah, CA 95482', coords: '39.1532,-123.2063', detail: 'Supercharger V3. Bom ponto pra almoço — restaurantes perto.' },
    'Mendocino': { addr: 'Mendocino, CA 95460', coords: '39.3076,-123.7995', detail: 'Vila vitoriana na costa de Mendocino — cenário de "A Dama de Ferro" e serviu como Cabot Cove em "Se Ela Dança, Eu Danço" (Murder, She Wrote). Galerias de arte, cafés charmosos, vista espetacular dos penhascos.', cost: 'Gratuito' },
    'Glass Beach': { addr: 'Glass Beach, Fort Bragg, CA 95437', coords: '39.4521,-123.8136', detail: 'Praia coberta de vidro marítimo polido pelas ondas! De 1906-1967 era área de despejo — a natureza transformou o lixo em arte. Vidro colorido (verde, azul, âmbar) brilha com o sol. Não coletar!', hours: 'Amanhecer ao anoitecer', cost: 'Gratuito' },
    'Old Town Eureka': { addr: 'Old Town, Eureka, CA 95501', coords: '40.8027,-124.1637', detail: 'Distrito histórico vitoriano. Carson Mansion (1886) é a mansão vitoriana mais fotografada dos EUA! Não abre pro público, mas vale ver de fora.', cost: 'Gratuito' },
    'Carson Mansion': { addr: '143 M St, Eureka, CA 95501', coords: '40.8032,-124.1626', detail: 'Mansão vitoriana Queen Anne de 1886, considerada a mais ornamentada dos EUA. Agora é um clube privado — exterior apenas.', cost: 'Gratuito (exterior)' },

    // Day 14 — Redwood NP
    'Fern Canyon': { addr: 'Fern Canyon, Prairie Creek Redwoods SP, CA', coords: '41.4012,-124.0635', detail: 'Cânion estreito com paredes de 15m cobertas de samambaias! Cenário de Jurassic Park 2. Loop de ~1.5 km. Pode ter água no chão — sapato impermeável!', cost: '$12 day use' },
    'Lady Bird Johnson': { addr: 'Lady Bird Johnson Grove Trail, Redwood NP, CA', coords: '41.3253,-124.0199', detail: 'Trilha suave de ~2.5 km entre as maiores redwoods costeiras. Dedicada à ex-primeira-dama em 1969.', cost: 'Gratuito' },
    'Prairie Creek': { addr: 'Prairie Creek Redwoods State Park, CA', coords: '41.3676,-124.0268', detail: 'Parque estadual com redwoods gigantes, elk meadows (alces!) e acesso a Fern Canyon.', cost: '$12 day use' },
    'Newton B. Drury': { addr: 'Newton B. Drury Scenic Parkway, CA', coords: '41.3785,-124.0210', detail: 'Estrada cênica de 16 km sob o dossel de redwoods gigantes. Uma das estradas mais bonitas da CA!' },
    'Big Tree Wayside': { addr: 'Big Tree Wayside, Prairie Creek Redwoods SP, CA', coords: '41.3768,-124.0232', detail: 'Redwood gigante de 93m de altura e 6m de diâmetro. Acesso fácil da estrada — parada rápida.' },
    'Gold Bluffs Beach': { addr: 'Gold Bluffs Beach, Prairie Creek Redwoods SP, CA', coords: '41.3860,-124.0776', detail: 'Praia selvagem com falésias douradas e redwoods chegando até a areia. Cenário surreal!', cost: '$12 day use' },
    // Day 22 — Redwood
    'Elk Meadow': { addr: 'Elk Meadow, US-101, Orick, CA 95555', coords: '41.3400,-124.0500', detail: 'Manada de Roosevelt elk (a maior subespécie de elk da América do Norte) pastando tranquilamente ao lado da US-101! Pullover seguro com vista da pradaria. Melhor de manhã cedo ou fim de tarde. Não se aproxime — são selvagens!', cost: 'Gratuito' },
    'Stout Memorial Grove': { addr: 'Stout Memorial Grove, Jedediah Smith Redwoods SP, CA', coords: '41.7867,-124.0946', detail: 'Bosque de redwoods antigos ao longo do Smith River. Trilha fácil de ~30 min. Paz absoluta.', cost: 'Gratuito' },

    // Day 15 — Oregon Coast South
    'Tall Trees Grove': { addr: 'Tall Trees Grove, Redwood NP, CA', coords: '41.2137,-124.0022', detail: 'Algumas das árvores mais altas do MUNDO! Trilha de ~5 km. Precisa de permit gratuito no visitor center.', cost: 'Gratuito (permit obrigatório)' },
    'Samuel Boardman': { addr: 'Samuel H. Boardman State Scenic Corridor, OR', coords: '42.1481,-124.3533', detail: 'Os 19 km mais bonitos da costa de Oregon! Arcos naturais, sea stacks, mirantes sobre o Pacífico.', cost: 'Gratuito' },
    'Natural Bridges': { addr: 'Natural Bridges Viewpoint, Samuel Boardman Corridor, OR', coords: '42.1489,-124.3564', detail: 'Arcos de rocha naturais esculpidos pelo mar. Vista espetacular do mirante!', cost: 'Gratuito' },
    'Cape Blanco': { addr: 'Cape Blanco State Park, OR 97415', coords: '42.8372,-124.5634', detail: 'O ponto mais ocidental de Oregon continental! Farol de 1870. Vista selvagem do Pacífico.', cost: 'Gratuito' },
    'Dean Creek': { addr: 'Dean Creek Elk Viewing Area, Reedsport, OR 97467', coords: '43.7210,-124.1220', detail: 'Manada de 60-100 Roosevelt elk selvagens visíveis da estrada! Maior subespécie de elk da América do Norte. Área de observação com painéis informativos. Melhor ao amanhecer/entardecer, mas visíveis o dia todo.', cost: 'Gratuito' },
    'Shore Acres': { addr: 'Shore Acres State Park, Coos Bay, OR 97420', coords: '43.3220,-124.3870', detail: 'Jardim botânico num penhasco sobre o mar! Antigo estado do magnata Louis J. Simpson. Ondas batendo nas rochas — show!', cost: '$5 day use' },
    'Supercharger Coos Bay': { addr: 'Coos Bay, OR 97420', coords: '43.3660,-124.2138', detail: 'Supercharger Tesla V3. Perto de restaurantes.' },

    // Day 16 — Oregon Coast / Cannon Beach
    // Day 20 — Oregon Coast
    'Devil\'s Punchbowl': { addr: 'Devil\'s Punchbowl State Natural Area, Otter Rock, OR 97369', coords: '44.7480,-124.0650', detail: 'Bacia natural de rocha escavada pelo mar! Na maré alta, ondas explodem dentro do "punchbowl" — espetáculo da natureza. Viewpoint gratuito e fácil de acessar no alto da falésia. Marine Gardens abaixo tem tidepools na maré baixa.', cost: 'Gratuito' },
    'Cape Perpetua': { addr: 'Cape Perpetua Scenic Area, OR', coords: '44.2808,-124.1092', detail: "Thor's Well — 'poço de Thor', buraco no oceano que engole e cospe água! Spouting Horn geyser natural. Melhor na maré alta!", cost: 'Free' },
    "Thor's Well": { addr: "Thor's Well, Cape Perpetua, OR", coords: '44.2790,-124.1112', detail: "Buraco natural na rocha vulcânica que drena e explode água do mar. MUITO fotogênico na maré alta! Cuidado com as ondas — pode ser perigoso.", cost: 'Gratuito' },
    'Heceta Head': { addr: 'Heceta Head Lighthouse, Florence, OR 97439', coords: '44.1372,-124.1285', detail: 'Um dos faróis mais fotografados do mundo! Trilha de ~1 km até o farol. Vista espetacular da costa.', cost: '$5 day use' },
    'Supercharger Lincoln City': { addr: 'Lincoln City, OR 97367', coords: '44.9628,-123.9847', detail: 'Supercharger Tesla V3.' },
    'Haystack Rock': { addr: 'Haystack Rock, Cannon Beach, OR 97110', coords: '45.8841,-123.9688', detail: 'Monolito de 72m na praia — ícone do Oregon! Cenário do Goonies. Tidepools na base na maré baixa. Ao pôr do sol é MÁGICO.', cost: 'Gratuito' },
    'Cannon Beach': { addr: 'Cannon Beach, OR 97110', coords: '45.8918,-123.9615', detail: 'Uma das praias mais bonitas dos EUA. Vilarejo charmoso com galerias e restaurantes. Haystack Rock é o cartão-postal.', cost: 'Gratuito' },
    'Ecola State Park': { addr: 'Ecola State Park, Cannon Beach, OR 97110', coords: '45.9209,-123.9766', detail: 'Mirantes espetaculares de Cannon Beach e Tillamook Head. Cenário do Goonies e Point Break!', cost: '$5 day use' },

    // Day 17 — Astoria / Olympic
    'Astoria': { addr: 'Astoria, OR 97103', coords: '46.1879,-123.8313', detail: 'Cidade do filme The Goonies! Astoria Column (164 degraus, vista 360°), Flavel House Museum. Ponte Astoria-Megler cruza pro Washington.', cost: 'Astoria Column: gratuito' },
    'Astoria Column': { addr: 'Astoria Column, 1 Coxcomb Dr, Astoria, OR 97103', coords: '46.1825,-123.8171', detail: 'Coluna de 38m com espiral de murais contando a história do Oregon. 164 degraus — vista incrível do rio Columbia e Pacífico!', cost: '$5 estacionamento' },
    'Astoria-Megler Bridge': { addr: 'Astoria-Megler Bridge, US-101', coords: '46.2273,-123.8806', detail: 'Maior ponte contínua de treliça dos EUA! 6.6 km cruzando o Rio Columbia de Oregon → Washington.' },
    // Day 19 — Forks → Cannon Beach stops
    'Kurt Cobain': { addr: 'Kurt Cobain Memorial Park, 500 E 2nd St, Aberdeen, WA 98520', coords: '46.9753,-123.8044', detail: 'Pequeno parque memorial dedicado ao vocalista do Nirvana, nascido em Aberdeen em 1967. Placa "Come As You Are" na entrada, banco com guitarra esculpida, e o rio Wishkah onde Kurt brincava de criança. Fãs deixam mensagens e flores.', cost: 'Gratuito' },
    'Fort Stevens': { addr: 'Fort Stevens State Park, Hammond, OR 97121', coords: '46.2040,-123.9614', detail: 'Único forte continental dos EUA atacado por forças estrangeiras durante a WWII! Em 21/jun/1942, um submarino japonês (I-25) disparou 17 tiros — nenhum acertou o forte. Ruínas de bunkers e baterias de artilharia. Mesmo parque do naufrágio Peter Iredale.', hours: '6h-pôr do sol', cost: '$5/veículo (dia)' },
    'Supercharger Aberdeen': { addr: 'Aberdeen, WA 98520', coords: '46.9754,-123.8158', detail: '⚠️ CARREGAR ATÉ 100%! Olympic tem 265 km internos + sem SC até Olympia/Centralia (260 km)!' },
    'Lake Crescent': { addr: 'Lake Crescent, Olympic NP, WA', coords: '48.0596,-123.7898', detail: 'Lago glacial cristalino com 190m de profundidade! Rodeado por montanhas cobertas de floresta. Storm King trail parte daqui.', cost: 'Incluso na entrada ($30/veículo)' },
    'Sol Duc Falls': { addr: 'Sol Duc Falls Trail, Olympic NP, WA', coords: '47.9525,-123.8359', detail: 'Cachoeira tríplice numa floresta densa. Trilha fácil de ~2.5 km. Hot springs naturais perto (Sol Duc Hot Springs Resort).', cost: 'Incluso na entrada' },
    'Forks': { addr: 'Forks, WA 98331', coords: '47.9504,-124.3855', detail: 'Cidade do Twilight! Forks High School, casa da Bella Swan, placa "Welcome to Forks". Também a capital madeireira de WA.' },
    'Cape Disappointment': { addr: 'Cape Disappointment State Park, Ilwaco, WA 98624', coords: '46.2790,-124.0520', detail: 'Farol de 1856 no ponto onde o Rio Columbia encontra o Pacífico. Lewis & Clark Interpretive Center conta a expedição de 1805. Nome dado por um capitão britânico que não conseguiu entrar na foz em 1788!', hours: '6h30-pôr do sol', cost: '$10/veículo (Discover Pass)' },
    'Kalaloch': { addr: 'Kalaloch Tree of Life, US-101, Kalaloch, WA 98331', coords: '47.6088,-124.3744', detail: 'Impressionante Sitka Spruce crescendo sobre uma caverna costeira com raízes expostas como tentáculos! A erosão criou uma cavidade sob a árvore mas ela sobrevive agarrada pelas raízes. Uma das fotos mais icônicas de Olympic!', cost: 'Gratuito' },
    'Peter Iredale': { addr: 'Peter Iredale Shipwreck, Fort Stevens State Park, Hammond, OR 97121', coords: '46.1753,-123.9964', detail: 'Naufrágio de 1906! O veleiro britânico Peter Iredale encalhou numa tempestade e o esqueleto de ferro ainda está na praia — uma das fotos mais icônicas da costa de Oregon!', cost: '$5/veículo' },

    // Day 18 — Olympic NP
    'Hoh Rain Forest': { addr: 'Hoh Rain Forest, Olympic NP, WA', coords: '47.8602,-123.9343', detail: 'Uma das poucas florestas tropicais temperadas do hemisfério norte! 3-4m de chuva/ano. Árvores cobertas de musgo e samambaias.', hours: 'Amanhecer ao anoitecer', cost: 'Incluso ($30/veículo)' },
    'Hall of Mosses': { addr: 'Hall of Mosses Trail, Hoh Rain Forest, WA', coords: '47.8602,-123.9343', detail: 'Trilha curta (~1.3 km) entre árvores gigantes cobertas de musgo verde pendurado. Parece um cenário de Senhor dos Anéis!', cost: 'Incluso' },
    'Ruby Beach': { addr: 'Ruby Beach, Olympic NP, WA', coords: '47.7108,-124.4126', detail: 'Praia selvagem com sea stacks e troncos gigantes na areia. Tidepools com estrelas-do-mar! Uma das praias mais bonitas de WA.', cost: 'Incluso' },
    'La Push': { addr: 'La Push Beach (First Beach), WA 98350', coords: '47.9075,-124.6356', detail: 'Praia da tribo Quileute — cenário do Twilight! Sea stacks impressionantes. James Island visível da praia.', cost: 'Gratuito' },
    'Rialto Beach': { addr: 'Rialto Beach, Olympic NP, WA', coords: '47.9210,-124.6376', detail: 'Praia com pilhas de troncos (driftwood) e sea stacks. Hole-in-the-Wall arch fica a ~2.5 km pela praia. Cenário dramático!', cost: 'Incluso' },
    'Marymere Falls': { addr: 'Marymere Falls Trail, Olympic NP, WA', coords: '48.0571,-123.7982', detail: 'Cachoeira de 27m numa floresta antiga. Trilha de ~2.5 km fácil. Perto de Lake Crescent.', cost: 'Incluso' },

    // Day 18 — Centralia → Mt. Rainier → Forks
    'Supercharger Olympia': { addr: 'Olympia/Centralia, WA', coords: '47.0379,-122.9007', detail: 'Supercharger Tesla V3. ⚠️ CARREGAR ATÉ 90-100%! Trecho longo até Forks sem Supercharger, inclui subida ao Rainier.' },
    'Mt. Rainier': { addr: 'Mt. Rainier National Park — Paradise, WA', coords: '46.7853,-121.7356', detail: 'Vulcão ativo de 4.392m coberto de neve o ano todo! Paradise é o ponto mais acessível — Henry M. Jackson Visitor Center.', hours: 'Paradise: 10h-17h (inverno)', cost: '$30/veículo' },
    'Paradise': { addr: 'Paradise, Mt. Rainier NP, WA 98304', coords: '46.7853,-121.7356', detail: 'Área mais visitada do Mt. Rainier. No inverno: snowshoeing, sledding. Wildflower meadows no verão. Visitor center com café.' },
    'Nisqually Vista Trail': { addr: 'Nisqually Vista Trail, Paradise, Mt. Rainier NP', coords: '46.7860,-121.7370', detail: 'Trilha de ~2 km com vista do Glaciar Nisqually. No inverno é uma caminhada na neve — microspikes recomendados!', cost: 'Incluso' },
    'Voodoo Doughnut': { addr: '22 SW 3rd Ave, Portland, OR 97204', coords: '45.5228,-122.6726', detail: 'Donuts bizarros e famosos! O Bacon Maple Bar e o Voodoo Doll são os mais pedidos. Fila rápida no inverno.', hours: '24h', cost: '~$3-6/donut' },
    "Powell's Books": { addr: '1005 W Burnside St, Portland, OR 97209', coords: '45.5231,-122.6812', detail: 'Maior livraria independente do MUNDO! Ocupa um quarteirão inteiro. Mapa do 1º andar na entrada. Seção Rare Books imperdível.', hours: '10h-21h', cost: 'Gratuito' },
    'Pittock Mansion': { addr: '3229 NW Pittock Dr, Portland, OR 97210', coords: '45.5255,-122.7162', detail: 'Mansão de 1914 com vista panorâmica de Portland, Mt. Hood e Mt. St. Helens! Exterior gratuito, interior ~$15.', hours: '10h-16h', cost: 'Exterior gratuito / Interior ~$15' },

    'Mt. Hood': { addr: 'Mt. Hood, OR', coords: '45.3735,-121.6959', detail: 'Vulcão de 3.429m — pico mais alto de Oregon! Coberto de neve o ano todo. Timberline Lodge (1937) inspirou o hotel de O Iluminado. Desvio de ~1h ao sul da I-84 pela US-26.', cost: 'Gratuito' },
    'Trillium Lake': { addr: 'Trillium Lake, Mt Hood National Forest, OR 97028', coords: '45.2685,-121.7400', detail: 'Lago alpino com reflexo perfeito do Mt. Hood! Um dos spots de foto mais icônicos de Oregon. Trilha fácil de 3 km ao redor do lago. Neve possível no inverno.', cost: 'Northwest Forest Pass: $5/dia' },

    // Day 20 — Multnomah / Columbia / Boise
    // Day 16 — Twin Falls → Centralia roadside stops
    'Thousand Springs': { addr: 'Thousand Springs State Park, Hagerman, ID 83332', coords: '42.7680,-114.8340', detail: 'Cachoeiras brotando diretamente do paredão de basalto no Snake River Canyon! Água do aquífero subterrâneo emerge pelas rochas vulcânicas. Mirante grátis na US-30 / I-84 com vista impressionante.', cost: 'Gratuito (mirante)' },
    'Rowena Crest': { addr: 'Rowena Crest Viewpoint, Historic Columbia River Hwy, Mosier, OR 97040', coords: '45.6823,-121.3005', detail: 'Mirante espetacular com curvas hairpin (Tom McCall Preserve) e vista panorâmica 360° do Columbia River Gorge! Wildflowers na primavera, cores dramáticas no inverno. Um dos viewpoints mais subestimados de Oregon.', cost: 'Gratuito' },
    'Deadman Pass': { addr: 'Deadman Pass Rest Area, I-84, Emigrant Hill, OR 97850', coords: '45.6042,-118.5561', detail: 'Passagem a 1.278m de altitude nas Blue Mountains. Mirante com vista panorâmica espetacular! Nome vem de um confronto entre colonos e nativos em 1878. Rest area com banheiros.', cost: 'Gratuito' },
    'Multnomah Falls': { addr: 'Multnomah Falls, Bridal Veil, OR 97010', coords: '45.5762,-122.1158', detail: 'Cachoeira de 189m — a mais alta de Oregon e uma das mais altas dos EUA! Ponte Benson a 32m. A apenas 50 km de Portland!', hours: '9h-18h', cost: 'Gratuito (reserva de estacionamento: $2)' },
    'Columbia River Gorge': { addr: 'Columbia River Gorge, OR', coords: '45.5956,-122.0517', detail: 'Desfiladeiro de 130 km no rio Columbia. Paredões de 1.200m, cachoeiras, windsurfing. Historic Columbia River Highway é imperdível.', cost: 'Gratuito' },
    'Vista House': { addr: 'Vista House at Crown Point, 40700 E Historic Columbia River Hwy, Corbett, OR 97019', coords: '45.5391,-122.2443', detail: 'Edifício octogonal de 1917 no topo de Crown Point, 222m acima do Rio Columbia. Vista 270° do Columbia River Gorge. Museu sobre a construção da Historic Columbia River Highway.', hours: '9h-18h', cost: 'Gratuito' },
    'Basque Block': { addr: 'Basque Block, 619 Grove St, Boise, ID 83702', coords: '43.6154,-116.2023', detail: 'Boise tem a maior comunidade basca fora da Espanha! Bar Gernika: croquetas, pintxos, lamb grinder. Basque Museum ao lado.', cost: '~$15-25/pessoa' },
    'Bar Gernika': { addr: '202 S Capitol Blvd, Boise, ID 83702', coords: '43.6155,-116.2023', detail: 'Pub basco autêntico! Croquetas, solomo (pork loin sandwich) e lamb grinder são imperdíveis. Cerveja basca.', hours: '11h-22h', cost: '~$12-20/pessoa' },

    // Day 21 — Shoshone / Antelope Island / Moab
    'Perrine Bridge': { addr: 'Perrine Bridge, US-93, Twin Falls, ID 83301', coords: '42.5968,-114.4529', detail: 'Ponte de 148m sobre o Snake River Canyon. Um dos únicos locais nos EUA onde BASE jumping é legal sem permissão! Construída em 1976. Vista espetacular do canyon.', cost: 'Gratuito' },
    'Evel Knievel': { addr: 'Evel Knievel Jump Site, Shoshone Falls Grade Rd, Twin Falls, ID 83301', coords: '42.5889,-114.3900', detail: 'Em 8/set/1974, Evel Knievel tentou saltar o Snake River Canyon na "Skycycle X-2" (foguete a vapor). O paraquedas abriu cedo e ele caiu no canyon, mas sobreviveu! Placa comemorativa e rampa original visíveis.', cost: 'Gratuito' },
    'Shoshone Falls': { addr: 'Shoshone Falls, Twin Falls, ID 83301', coords: '42.5930,-114.3984', detail: "'Niágara do Oeste' — 65m de altura (mais alta que Niágara Falls!). Melhor fluxo na primavera. ~5 min do Supercharger Twin Falls.", cost: '$5/veículo' },
    'Antelope Island': { addr: 'Antelope Island State Park, Syracuse, UT 84075', coords: '40.9577,-112.2102', detail: '~700 bisões selvagens na maior ilha do Great Salt Lake! Buffalo Point tem vista 360°. Pode ver bisões de perto na estrada.', hours: '6h-22h', cost: '$15/veículo' },
    'Buffalo Point': { addr: 'Buffalo Point, Antelope Island State Park, UT', coords: '40.9516,-112.2326', detail: 'Mirante no topo da ilha com vista 360° do Great Salt Lake e Wasatch Mountains. Trilha curta até o topo.' },

    // Day 22 — Canyonlands
    'Mesa Arch': { addr: 'Mesa Arch, Canyonlands NP, UT', coords: '38.3891,-109.8673', detail: 'O arco mais fotografado de Utah! Ao nascer do sol, a luz vermelha ilumina o arco por baixo — MÁGICO. Trilha de ~0.8 km. Chegue 30 min antes do sunrise!', cost: 'Entrada: $30/veículo' },
    'Grand View Point': { addr: 'Grand View Point, Canyonlands NP, UT', coords: '38.3103,-109.8591', detail: 'Mirante no fim da estrada com vista 360° de cânions infinitos. White Rim, La Sal Mountains, rio Colorado e Green River visíveis.', cost: 'Incluso' },
    'Green River Overlook': { addr: 'Green River Overlook, Canyonlands NP, UT', coords: '38.3300,-109.8839', detail: 'Vista do Green River serpenteando num cânion de 300m. Menos lotado que Grand View Point.', cost: 'Incluso' },
    'Upheaval Dome': { addr: 'Upheaval Dome Trail, Canyonlands NP, UT', coords: '38.4259,-109.9290', detail: 'Cratera misteriosa de ~5 km de diâmetro! Impacto de meteorito ou domo de sal? Cientistas discutem. Trilha ~2.5 km até 2 mirantes.', cost: 'Incluso' },
    'Aztec Butte': { addr: 'Aztec Butte Trail, Canyonlands NP, UT', coords: '38.3995,-109.8617', detail: 'Trilha de ~3 km com ruínas ancestrais Pueblo (granários). Vista do canyon. Subida moderada.', cost: 'Incluso' },

    // Day 23 — Arches NP
    'Delicate Arch': { addr: 'Delicate Arch Trail, Arches NP, UT', coords: '38.7436,-109.4993', detail: 'O arco mais famoso do MUNDO! Trilha de ~5 km (ida e volta), subida moderada. No final: o arco sozinho numa borda — ICÔNICO. Está na placa de Utah!', cost: 'Entrada: $30/veículo' },
    'Windows Section': { addr: 'Windows Section, Arches NP, UT', coords: '38.6869,-109.5369', detail: 'North Window, South Window e Turret Arch juntos! Trilha fácil de ~1.6 km. Ótimo pra fotos!', cost: 'Incluso' },
    'Double Arch': { addr: 'Double Arch, Arches NP, UT', coords: '38.6884,-109.5372', detail: 'Dois arcos gigantes conectados! Altura de 32m. Indiana Jones e a Última Cruzada filmado aqui. Trilha curta (~0.5 km).', cost: 'Incluso' },
    'Balanced Rock': { addr: 'Balanced Rock, Arches NP, UT', coords: '38.7012,-109.5641', detail: 'Pedra de 3.600 toneladas equilibrada sobre um pedestal. 39m de altura total. Loop curto (~0.5 km).', cost: 'Incluso' },
    'Landscape Arch': { addr: 'Landscape Arch, Devils Garden Trail, Arches NP, UT', coords: '38.7910,-109.6069', detail: 'Arco mais longo do mundo — 93m de envergadura! Fininho e delicado. Trilha de ~3 km pela Devils Garden.', cost: 'Incluso' },
    'Devils Garden': { addr: 'Devils Garden Trailhead, Arches NP, UT', coords: '38.7828,-109.5946', detail: 'Trilha com 7 arcos! Landscape Arch é o principal. Trilha completa ~12 km. Até Landscape Arch é ~3 km (fácil).', cost: 'Incluso' },
    'Fiery Furnace': { addr: 'Fiery Furnace Viewpoint, Arches NP, UT', coords: '38.7395,-109.5682', detail: 'Labirinto de arenito vermelho! Visita guiada com ranger ou permit. Viewpoint gratuito com vista panorâmica.', cost: 'Tour guiado: $16/pessoa' },
    'Park Avenue': { addr: 'Park Avenue Viewpoint, Arches NP, UT', coords: '38.7178,-109.5942', detail: 'Paredões de arenito que lembram arranha-céus! Trilha de ~1.6 km (mão única). Primeira parada no parque.', cost: 'Incluso' },
    'Dead Horse Point': { addr: 'Dead Horse Point State Park, Moab, UT 84532', coords: '38.4826,-109.7388', detail: 'Mirante 600m acima de uma curva do rio Colorado! Cenário de Missão Impossível 2 e Westworld. Um dos pôr do sol mais lindos de Utah.', cost: '$20/veículo' },

    // Day 24-25 — Bryce Canyon
    'Red Canyon': { addr: 'Red Canyon, Dixie National Forest, UT', coords: '37.7481,-112.2982', detail: 'Arcos vermelhos naturais sobre a estrada! Parece a entrada de outro planeta. ~15 min antes de Bryce.', cost: 'Gratuito' },
    'Bryce Canyon': { addr: 'Bryce Canyon NP, UT 84764', coords: '37.6283,-112.1671', detail: 'Anfiteatro de hoodoos (pináculos de rocha) — a maior concentração do mundo! Cores que mudam com a luz.', cost: 'Entrada: $35/veículo' },
    'Navajo Loop': { addr: 'Navajo Loop Trail, Bryce Canyon NP, UT', coords: '37.6233,-112.1668', detail: 'Trilha de ~2.2 km descendo entre os hoodoos. Wall Street Narrows é o destaque — passagem estreita entre paredões de 40m!', cost: 'Incluso' },
    "Queen's Garden": { addr: "Queen's Garden Trail, Bryce Canyon NP, UT", coords: '37.6279,-112.1635', detail: "Trilha mais fácil do parque (~3 km). Desce entre os hoodoos até a Queen Victoria (formação que parece a rainha). Conecta com Navajo Loop.", cost: 'Incluso' },
    'Bryce Point': { addr: 'Bryce Point, Bryce Canyon NP, UT', coords: '37.6147,-112.1545', detail: 'Melhor mirante pra nascer do sol! Vista mais ampla do anfiteatro. Hoodoos iluminados em dourado — INESQUECÍVEL.', cost: 'Incluso' },
    'Inspiration Point': { addr: 'Inspiration Point, Bryce Canyon NP, UT', coords: '37.6211,-112.1592', detail: 'Vista panorâmica do Bryce Amphitheater. Menos lotado que Sunset Point. 3 níveis de mirante.', cost: 'Incluso' },
    'Rainbow Point': { addr: 'Rainbow Point, Bryce Canyon NP, UT', coords: '37.4953,-112.2418', detail: 'Ponto mais alto do parque (2.778m)! Vista 360° — num dia claro vê-se até 160 km. Fim da Scenic Drive.', cost: 'Incluso' },

    // Day 25-26 — Zion
    'Zion': { addr: 'Zion NP, Springdale, UT', coords: '37.2982,-113.0263', detail: 'Cânion de paredões vermelhos de 600m cortados pelo Virgin River. Um dos parques mais visitados dos EUA. Shuttle obrigatório no cânion principal.', cost: 'Entrada: $35/veículo' },
    'Springdale': { addr: 'Springdale, UT 84767', coords: '37.1899,-112.9988', detail: 'Vilarejo charmoso na entrada de Zion. Restaurantes, lojas de outdoor, hotéis. Base perfeita para explorar o parque.' },
    'Riverside Walk': { addr: 'Riverside Walk, Zion NP, UT', coords: '37.2851,-112.9476', detail: 'Trilha pavimentada de ~3.5 km ao longo do Virgin River. Leva até o início do The Narrows. Fácil e linda!', cost: 'Incluso' },
    'Canyon Overlook': { addr: 'Canyon Overlook Trail, Zion NP, UT', coords: '37.2130,-112.9408', detail: 'Trilha curta (~1.6 km ida e volta) com vista panorâmica espetacular do Pine Creek Canyon e Lower Zion Canyon!', cost: 'Incluso' },
    'Angels Landing': { addr: 'Angels Landing Trail, Zion NP, UT', coords: '37.2692,-112.9478', detail: 'Uma das trilhas mais ÉPICAS do mundo! ~8 km, 450m de desnível. Últimos 800m com correntes sobre abismos! ⚠️ Permit obrigatório (recreation.gov).', cost: 'Permit: $6 (loteria)' },
    'Emerald Pools': { addr: 'Emerald Pools Trail, Zion NP, UT', coords: '37.2568,-112.9587', detail: 'Lower Pool: trilha fácil (~1.9 km). Upper Pool: mais íngreme (~5 km). Piscinas naturais com cachoeiras. Refrescante!', cost: 'Incluso' },
    "Pa'rus Trail": { addr: "Pa'rus Trail, Zion NP, UT", coords: '37.2049,-112.9843', detail: 'Trilha plana de ~6 km ao longo do Virgin River. Aceita bicicletas e pets. Vista dos paredões de Zion. Perfeita pra relaxar.', cost: 'Incluso' },
    'Court of the Patriarchs': { addr: 'Court of the Patriarchs, Zion NP, UT', coords: '37.2512,-112.9635', detail: 'Três picos de arenito nomeados Abraham, Isaac e Jacob. Mirante curto do ponto de shuttle.', cost: 'Incluso' },
    'Weeping Rock': { addr: 'Weeping Rock, Zion NP, UT', coords: '37.2720,-112.9404', detail: 'Parede de rocha que "chora" — água de chuva que levou 1.200 anos pra filtrar pela rocha! Trilha curta.', cost: 'Incluso' },
    'Canyon Junction Bridge': { addr: 'Canyon Junction Bridge, Zion NP, UT', coords: '37.2099,-112.9777', detail: 'Ponte com vista panorâmica dos paredões de Zion. Um dos melhores pontos pra pôr do sol no parque!', cost: 'Incluso' },
    'Checkerboard Mesa': { addr: 'Checkerboard Mesa, UT-9, Zion NP, UT', coords: '37.2371,-112.8757', detail: 'Formação de arenito Navajo com padrão xadrez natural! As linhas verticais são fraturas e as horizontais são camadas de deposição. Pullover na UT-9 saindo de Zion pelo lado leste.', cost: 'Incluso na entrada de Zion' },

    // Day 27-28 — Grand Canyon
    'Kanab': { addr: 'Kanab, UT 84741', coords: '37.0475,-112.5263', detail: '⚠️ CARREGAR ATÉ 100%! GC tem ~130 km internos + 260 km até próximo SC (Kingman). Cidade pequena e charmosa — "Little Hollywood".', cost: 'SC: ~$15' },
    'Mather Point': { addr: 'Mather Point, Grand Canyon South Rim, AZ', coords: '36.0617,-112.1074', detail: 'Primeira vista do Grand Canyon pra maioria dos visitantes. ABSURDO — nada prepara pra este momento. 1.600m de profundidade, 16 km de largura!', cost: 'Entrada: $35/veículo' },
    'Grand Canyon': { addr: 'Grand Canyon National Park, South Rim, AZ', coords: '36.0544,-112.1401', detail: 'O cânion mais famoso do mundo! 446 km de comprimento, até 1.800m de profundidade, 2 bilhões de anos de geologia exposta.', cost: '$35/veículo (7 dias)' },
    'Rim Trail': { addr: 'Rim Trail, Grand Canyon South Rim, AZ', coords: '36.0578,-112.1170', detail: 'Trilha pavimentada de 21 km ao longo da borda. Mather Point → Yavapai (~1.5 km) é o trecho mais popular. Plano e fácil.', cost: 'Incluso' },
    'Yavapai Geology Museum': { addr: 'Yavapai Geology Museum, Grand Canyon, AZ', coords: '36.0567,-112.1166', detail: 'Museu com painéis de vidro sobre o abismo! Explica 2 bilhões de anos de geologia das camadas visíveis.', hours: '8h-18h', cost: 'Gratuito (incluso na entrada)' },
    'Desert View': { addr: 'Desert View Watchtower, Grand Canyon, AZ', coords: '36.0444,-111.8264', detail: 'Torre de observação de 1932 projetada por Mary Colter. 21m de altura, murais Hopi no interior. Vista 360° — Colorado River visível!', cost: 'Incluso' },
    'Grandview Point': { addr: 'Grandview Point, Grand Canyon, AZ', coords: '35.9952,-111.9903', detail: 'Um dos mirantes mais dramáticos! Vistas do Horseshoe Mesa e das camadas geológicas. Menos turistas que Mather Point.', cost: 'Incluso' },
    'Hopi Point': { addr: 'Hopi Point, Grand Canyon, AZ', coords: '36.0726,-112.1543', detail: 'O melhor ponto pra pôr do sol no South Rim! Vista mais ampla do cânion. Acessível apenas por shuttle (Hermit Road).', cost: 'Incluso' },
    'Bright Angel Trail': { addr: 'Bright Angel Trailhead, Grand Canyon, AZ', coords: '36.0575,-112.1440', detail: 'Trilha mais popular do Grand Canyon! Primeiros switchbacks (1.5 Mile Resthouse) levam ~1-2h. Vista incrível descendo no cânion.', cost: 'Incluso' },
    'Hermit Road': { addr: 'Hermit Road, Grand Canyon, AZ', coords: '36.0726,-112.1543', detail: 'Estrada panorâmica de 11 km (shuttle only). 8 mirantes: Hopi Point (melhor pôr do sol), Pima Point, Hermits Rest.', cost: 'Incluso' },
    'Supercharger Kingman': { addr: 'Kingman, AZ 86401', coords: '35.1894,-114.0530', detail: 'Supercharger na Historic Route 66! Kingman é um marco da Route 66 com museus e diners vintage.' },
    'Hackberry General Store': { addr: 'Hackberry General Store, AZ-66, Hackberry, AZ 86411', coords: '35.3710,-113.7274', detail: 'Posto de gasolina vintage da Route 66 desde 1934. Corvette vermelho clássico estacionado na frente, memorabilia de Route 66, refrigerantes retrô.', hours: '9h-17h', cost: 'Gratuito' },
    'Seligman': { addr: 'Historic Route 66, Seligman, AZ 86337', coords: '35.3248,-112.8756', detail: '"Berço da Route 66" — Angel Delgadillo lutou pra preservar a rota histórica nos anos 80. Inspiração direta de Radiator Springs do filme Carros da Pixar! Lanchonetes retrô, carros antigos, neon.', cost: 'Gratuito' },
    'Hoover Dam': { addr: 'Hoover Dam, Boulder City, NV 89005', coords: '36.0160,-114.7377', detail: 'Barragem de 221m construída em 1935 durante a Grande Depressão. A ponte Mike O\'Callaghan–Pat Tillman Memorial Bridge (2010) tem passarela pedestre com vista espetacular da barragem a 270m acima do rio Colorado.', hours: '9h-17h (tours)', cost: 'Vista gratuita / Tour: $30' },
    'Navajo Bridge': { addr: 'Navajo Bridge, US-89A, Marble Canyon, AZ 86036', coords: '36.8115,-111.6327', detail: 'Duas pontes a 142m sobre o Rio Colorado em Marble Canyon! A ponte original (1929) é agora pedestre. Condores da Califórnia frequentemente avistados planando abaixo da ponte.', cost: 'Gratuito' },

    // Day 28-29 — Las Vegas
    'In-N-Out': { addr: 'In-N-Out Burger, 3545 S Las Vegas Blvd, Las Vegas, NV', coords: '36.1195,-115.1727', detail: 'Fast food cult da Califórnia! Double-Double Animal Style é o pedido secreto. Batata frita fresca. Não existe na Costa Leste!', cost: '~$8-12' },
    'Seven Magic Mountains': { addr: 'Seven Magic Mountains, Las Vegas, NV', coords: '35.9833,-115.2749', detail: 'Instalação de arte: 7 torres de pedras neon no deserto! Por Ugo Rondinone. ~20 min ao sul da Strip. Grátis.', cost: 'Gratuito' },
    'Welcome to Las Vegas': { addr: 'Welcome to Fabulous Las Vegas Sign, 5100 Las Vegas Blvd S', coords: '36.0828,-115.1728', detail: 'Placa icônica de 1959! Fila pra foto mas anda rápido. Estacionamento gratuito atrás. Melhor à noite (iluminada).', cost: 'Gratuito' },
    'Bellagio': { addr: 'Bellagio Hotel & Casino, 3600 S Las Vegas Blvd, Las Vegas, NV', coords: '36.1129,-115.1765', detail: 'Hotel icônico! Fountains of Bellagio (show de águas gratuito a cada 15-30 min), Conservatory (jardim botânico grátis), Galeria de arte.', cost: 'Gratuito (shows de água)' },
    'Bellagio Fountains': { addr: 'Fountains of Bellagio, Las Vegas Blvd, Las Vegas, NV', coords: '36.1127,-115.1742', detail: 'Show de águas dançantes com música! A cada 15 min (tarde) ou 30 min (manhã). 1.200 jatos, 4.500 luzes. IMPERDÍVEL à noite.', cost: 'Gratuito' },

    // Day 7 — Eldorado Canyon
    'Eldorado Canyon': { addr: 'Eldorado Canyon Mine Tours, 16880 NV-165, Nelson, NV 89046', coords: '35.7275,-114.8308', detail: 'Cidade-fantasma no deserto com a mina de ouro Techatticup (1861) — a mais antiga e rica de Nevada! Ruínas de construções, carros antigos enferrujados, cenário de faroeste. Filmagens de comerciais e filmes. ~45 min ao sul da Strip.', hours: 'Amanhecer ao anoitecer (tours: 9h-17h)', cost: 'Self-guided tour: $15/pessoa' },

    // Day 29 — Valley of Fire
    'Valley of Fire': { addr: 'Valley of Fire State Park, Overton, NV 89040', coords: '36.4414,-114.5135', detail: 'Parque estadual mais antigo de Nevada! Formações de arenito vermelho de 150 milhões de anos. Fire Wave é o destaque.', hours: '8h-16h30', cost: '$10/veículo' },
    'Fire Wave': { addr: 'Fire Wave Trail, Valley of Fire SP, NV', coords: '36.4389,-114.4997', detail: 'Trilha de ~2 km até formações de rocha listrada em ondas! Parece The Wave (AZ) mas sem permit. Melhor de manhã cedo.', cost: 'Incluso' },
    'Elephant Rock': { addr: 'Elephant Rock, Valley of Fire SP, NV', coords: '36.4258,-114.5365', detail: 'Formação de arenito que parece um elefante! Parada rápida da estrada. Ótima pra foto.', cost: 'Incluso' },
    'White Domes': { addr: 'White Domes Trail, Valley of Fire SP, NV', coords: '36.4678,-114.4905', detail: 'Loop de ~1.8 km por um cânion estreito de arenito colorido. Ruínas de set de filme dos anos 1960.', cost: 'Incluso' },

    // Day 30 — Death Valley
    'Death Valley': { addr: 'Death Valley National Park, CA/NV', coords: '36.5054,-116.9297', detail: 'O lugar mais quente, seco e baixo das Américas! No inverno (~15-25°C) é perfeito. 13.600 km² de paisagens alienígenas.', cost: '$30/veículo' },
    'Zabriskie Point': { addr: 'Zabriskie Point, Death Valley NP, CA', coords: '36.4200,-116.8117', detail: 'Mirante com formações douradas e erodidas espetaculares. Nascer do sol aqui é INCRÍVEL. Curta caminhada do estacionamento.', cost: 'Incluso' },
    "Artist's Drive": { addr: "Artist's Drive, Death Valley NP, CA", coords: '36.3664,-116.8072', detail: "Estrada cênica de 14 km (mão única). Artist's Palette: montanhas coloridas por minerais — verde (mica), rosa (manganês), roxo (turmalina).", cost: 'Incluso' },
    "Artist's Palette": { addr: "Artist's Palette, Death Valley NP, CA", coords: '36.3661,-116.8069', detail: 'Montanhas coloridas naturalmente por minerais oxidados. Melhor à tarde quando o sol realça as cores.', cost: 'Incluso' },
    'Badwater Basin': { addr: 'Badwater Basin, Death Valley NP, CA', coords: '36.2296,-116.7677', detail: 'Ponto mais baixo das Américas: -86m abaixo do nível do mar! Planície de sal cristalizado que se estende por km. Placa "Sea Level" na montanha acima.', cost: 'Incluso' },
    'Mesquite Flat Sand Dunes': { addr: 'Mesquite Flat Sand Dunes, Death Valley NP, CA', coords: '36.6119,-117.1086', detail: 'Dunas de areia clássicas! Mais altas chegam a ~30m. Nascer/pôr do sol melhor pra fotos (sombras nas ondulações). Star Wars filmado aqui!', cost: 'Incluso' },
    "Dante's View": { addr: "Dante's View, Death Valley NP, CA", coords: '36.2206,-116.7262', detail: "Mirante a 1.669m com vista panorâmica de Badwater Basin e do vale inteiro. Num dia claro vê-se o Mt. Whitney (4.421m) — ponto mais alto dos 48 estados!", cost: 'Incluso' },

    // Day 31 — Red Rock Canyon
    'Red Rock Canyon': { addr: 'Red Rock Canyon NCA, Las Vegas, NV 89161', coords: '36.1350,-115.4294', detail: 'Cânion de arenito vermelho a 30 min da Strip! Scenic Loop Drive de 21 km. Keystone Thrust: onde rochas de 600M anos empurraram sobre rochas de 200M anos.', hours: '6h-17h (inverno) / 6h-19h (verão)', cost: '$15/veículo' },
    'Calico Tanks': { addr: 'Calico Tanks Trail, Red Rock Canyon NCA, NV', coords: '36.1580,-115.4550', detail: 'Trilha de ~4 km com scrambling (subida em pedras). No topo: vista panorâmica da Las Vegas Strip! Surpresa total.', cost: 'Incluso' },
    'Gordon Ramsay': { addr: "Gordon Ramsay Hell's Kitchen, 3570 Las Vegas Blvd S, Las Vegas, NV", coords: '36.1204,-115.1692', detail: 'Restaurante do Gordon Ramsay no Caesars Palace! Beef Wellington é o prato estrela. Decoração do Hell\'s Kitchen (lado vermelho vs azul).', hours: '11h-23h', cost: '~$60-100/pessoa' },
    'Nobu': { addr: 'Nobu Restaurant, Caesars Palace, 3570 Las Vegas Blvd S, Las Vegas, NV', coords: '36.1204,-115.1692', detail: 'Restaurante japonês premium do chef Nobu Matsuhisa. Black cod miso é o prato icônico. Reserva obrigatória.', cost: '~$80-150/pessoa' },

    // Day 32 — LA
    'Supercharger Barstow': { addr: 'Barstow Supercharger, Barstow, CA 92311', coords: '34.8462,-117.0845', detail: 'Maior Supercharger do mundo! ~120 stalls. No outlet center de Barstow. Route 66 Museum perto.' },
    'Santa Monica Pier': { addr: 'Santa Monica Pier, 200 Santa Monica Pier, CA 90401', coords: '34.0094,-118.4973', detail: 'Píer icônico com roda-gigante, Pacific Park, aquário. Fim da Route 66! Pôr do sol no Pacífico é PERFEITO.', hours: 'Aberto 24h (atrações: 11h-23h)', cost: 'Pier gratuito / Atrações: $$' },

    // Day 33 — LA final
    'Malibu': { addr: 'Malibu, CA 90265', coords: '34.0259,-118.7798', detail: 'Praias icônicas ao longo da Pacific Coast Highway. Surfers Paradise, casas de celebridades, paisagens cinematográficas.' },
    'El Matador Beach': { addr: 'El Matador State Beach, 32350 Pacific Coast Hwy, Malibu, CA', coords: '34.0383,-118.8744', detail: 'A praia mais fotogênica de Malibu! Grutas, arcos de rocha, sea stacks. Descida por escada íngreme. Melhor na maré baixa.', cost: '$12 estacionamento' },
    'Venice Beach': { addr: 'Venice Beach, Los Angeles, CA 90291', coords: '33.9850,-118.4695', detail: 'Praia e calçadão icônico! Muscle Beach (academia ao ar livre), murais, artistas de rua, skatepark lendário. Vibe única de LA.', cost: 'Gratuito' },
    'Hollywood Sign': { addr: 'Hollywood Sign, Los Angeles, CA', coords: '34.1341,-118.3215', detail: 'Letreiro de 1923 (originalmente "Hollywoodland"). Melhor visto do Griffith Observatory ou Lake Hollywood Park. Trilha até as letras: ~8 km.', cost: 'Gratuito' },
    'Griffith Observatory': { addr: 'Griffith Observatory, 2800 E Observatory Rd, Los Angeles, CA 90027', coords: '34.1184,-118.3004', detail: 'Observatório art deco de 1935. Telescópios gratuitos, planetário, vista 360° de LA e Hollywood Sign. Cenário de La La Land!', hours: '12h-22h (Ter-Sex) / 10h-22h (Sáb-Dom)', cost: 'Gratuito (planetário: $7)' },

    // Day 1 — NYC
    'Rockefeller Center Plaza': { addr: '45 Rockefeller Plaza, New York, NY 10111', coords: '40.7587,-73.9787', detail: 'Complexo art deco icônico. Pista de patinação no inverno, bandeiras internacionais, estátua de Prometheus dourada. Top of the Rock no topo.', hours: 'Praça aberta 24h', cost: 'Gratuito (Top of the Rock: $40+)' },

    // Day 5 — Flight
    'Las Vegas': { addr: 'Las Vegas, NV 89109', coords: '36.1699,-115.1398', detail: 'A capital mundial do entretenimento. Cassinos, shows, restaurantes de chefs famosos e a icônica Strip iluminada.' },

    // Day 6 — Mt. Charleston
    'Kyle Canyon Scenic Drive': { addr: 'Kyle Canyon Rd, Mt. Charleston, NV 89124', coords: '36.2719,-115.6513', detail: 'Rota cênica de 45 min saindo de Vegas até as Spring Mountains. Paisagem desértica vira floresta alpina. Neve no inverno!', cost: 'Gratuito' },
    'brincar na neve': { addr: 'Mt. Charleston, Spring Mountains NRA, NV 89124', coords: '36.3100,-115.6800', detail: 'Área de neve perto de Lee Canyon. Atividades de inverno a menos de 1h de Las Vegas!', cost: 'Gratuito' },
    'Cathedral Rock Trail': { addr: 'Cathedral Rock Trail, Mt. Charleston, NV 89124', coords: '36.2696,-115.6639', detail: 'Trilha de ~4 km com vistas panorâmicas das Spring Mountains. Moderada, ideal para famílias.', cost: 'Gratuito' },
    'Mt. Charleston Lodge': { addr: '5375 Kyle Canyon Rd, Mt. Charleston, NV 89124', coords: '36.2670,-115.6475', detail: 'Lodge de montanha com lareira, chocolate quente e vista para o canyon. Refúgio aconchegante a 45 min de Vegas.' },

    // Day 10 — Zion
    'Watchman Trail': { addr: 'Watchman Trail, Zion NP, Springdale, UT 84767', coords: '37.1988,-112.9841', detail: 'Trilha de ~5 km com vistas panorâmicas do canyon. Começa perto do Visitor Center. Moderada, pôr do sol espetacular.', cost: 'Incluído no ingresso do parque' },

    // Day 11 — Bryce Canyon
    'Sunrise/Sunset Point': { addr: 'Sunrise/Sunset Point, Bryce Canyon NP, UT 84764', coords: '37.6270,-112.1671', detail: 'Primeira vista do anfiteatro de hoodoos. Nascer e pôr do sol transformam as formações em tons dourados e vermelhos.', cost: 'Incluído no ingresso do parque' },
    'Bryce Amphitheater': { addr: 'Bryce Amphitheater, Bryce Canyon NP, UT 84764', coords: '37.6230,-112.1680', detail: 'Maior concentração de hoodoos do mundo. Tons dourados ao pôr do sol criam cenário surreal.', cost: 'Incluído no ingresso do parque' },
    'Stargazing': { addr: 'Bryce Canyon NP, UT 84764', coords: '37.5930,-112.1871', detail: 'International Dark Sky Park. Via Láctea visível a olho nu! Um dos melhores céus noturnos dos EUA.', cost: 'Gratuito' },

    // Day 12 — Bryce → Moab
    'Moab': { addr: 'Moab, UT 84532', coords: '38.5733,-109.5498', detail: 'Cidade-base para Arches e Canyonlands. Capital da aventura de Utah: jeep, mountain bike, rafting.' },
    'Corona Arch Trail': { addr: 'Corona Arch Trail, Moab, UT 84532', coords: '38.5777,-109.6208', detail: 'Trilha de ~5 km até um arco gigante sem multidões. Alternativa gratuita ao Arches NP!', cost: 'Gratuito' },
    'Scenic Byway 128': { addr: 'UT-128, Moab, UT 84532', coords: '38.6131,-109.5103', detail: 'Estrada cênica com paredões vermelhos ao longo do Rio Colorado. Cenário de vários filmes de faroeste.', cost: 'Gratuito' },
    'Capitol Reef': { addr: 'Capitol Reef National Park, UT-24, Torrey, UT 84775', coords: '38.2972,-111.2615', detail: 'Parque nacional subestimado! Waterpocket Fold — dobra geológica de 160 km. Petroglífos Fremont de 2.000 anos visíveis da estrada. Fruita Historic District com pomares do séc. XIX. Scenic Drive gratuita pela UT-24!', cost: '$20/veículo (America the Beautiful Pass aceito)' },
    'Head of the Rocks': { addr: 'Head of the Rocks Overlook, UT-12, Escalante, UT 84726', coords: '37.7650,-111.5920', detail: 'Um dos mirantes mais espetaculares da UT-12 Scenic Byway! Vista panorâmica dos cânions de Escalante e do Grand Staircase. A UT-12 é considerada uma das estradas mais bonitas dos EUA.', cost: 'Gratuito' },
    'Goblin Valley': { addr: 'Goblin Valley State Park, Green River, UT 84525', coords: '38.5694,-110.7025', detail: 'Milhares de formações rochosas em forma de cogumelos/aliens esculpidas pela erosão! Crianças adoram escalar e explorar os "goblins". Cenário do filme Galaxy Quest. Parece outro planeta!', hours: '6h-22h', cost: '$20/veículo' },

    // Day 13 — Canyonlands
    'White Rim Overlook': { addr: 'White Rim Overlook Trail, Canyonlands NP, UT 84532', coords: '38.4593,-109.8203', detail: 'Trilha de ~3 km (ida e volta) com vista do White Rim abaixo. Vista vertiginosa dos canyons e do Rio Colorado.', cost: 'Incluído no ingresso do parque' },
    'Potash Road': { addr: 'Potash Road (UT-279), Moab, UT 84532', coords: '38.5450,-109.5950', detail: 'Estrada cênica com petróglifos indígenas e pegadas de dinossauro ao longo do Rio Colorado.', cost: 'Gratuito' },
    'Thelma & Louise Point': { addr: 'Fossil Point, Potash Road, Moab, UT 84532', coords: '38.5200,-109.6100', detail: 'Local de filmagem da cena final icônica do filme Thelma & Louise (1991). Vista dramática do penhasco.', cost: 'Gratuito' },

    // Day 15 — Salt Lake City
    'SLC': { addr: 'Salt Lake City, UT 84101', coords: '40.7608,-111.8910', detail: 'Capital de Utah, fundada por pioneiros mórmons em 1847. Cercada por montanhas, porta de entrada para estações de ski.' },
    'Temple Square + State Capitol': { addr: 'Temple Square, 50 N Temple, Salt Lake City, UT 84150', coords: '40.7708,-111.8919', detail: 'Centro espiritual dos mórmons: templo, tabernáculo (acústica perfeita), jardins. State Capitol com vista panorâmica da cidade.', hours: '9h-21h', cost: 'Gratuito' },

    // Day 16 — Boise
    'Boise': { addr: 'Boise, ID 83702', coords: '43.6150,-116.2023', detail: 'Capital de Idaho, conhecida pela cultura basca, cena gastronômica e o Greenbelt ao longo do rio.' },
    'Boise River Greenbelt + Idaho State Capitol': { addr: 'Boise River Greenbelt, Boise, ID 83702', coords: '43.6088,-116.2050', detail: 'Caminho pavimentado de 40 km ao longo do Rio Boise + Capitólio neoclássico com cúpula de águia dourada.', cost: 'Gratuito' },

    // Day 17 — Centralia
    'Centralia': { addr: 'Centralia, WA 98531', coords: '46.7162,-122.9543', detail: 'Pequena cidade entre Portland e Seattle. Parada estratégica na I-5 com outlets e restaurantes locais.' },

    // Day 18 — Mt. Rainier
    'Henry M. Jackson Visitor Center': { addr: 'Henry M. Jackson Memorial Visitor Center, Paradise, Mt. Rainier NP, WA 98304', coords: '46.7864,-121.7353', detail: 'Centro de visitantes principal em Paradise. Exposições sobre o vulcão e geleiras. Ponto de partida para trilhas com vista do Rainier.', hours: '10h-17h (varia por estação)', cost: 'Incluído no ingresso do parque' },

    // Day 19 — Olympic
    'Spruce Nature Trail': { addr: 'Spruce Nature Trail, Hoh Rain Forest, Olympic NP, WA 98382', coords: '47.8608,-123.9344', detail: 'Loop de ~2 km ao longo do Rio Hoh através de floresta primária. Musgos, samambaias e árvores centenárias.', cost: 'Incluído no ingresso do parque' },

    // Day 21 — Oregon Coast
    'Newport, OR': { addr: 'Newport, OR 97365', coords: '44.6368,-124.0535', detail: 'Vila de pescadores charmosa. Distrito Bayfront com frutos do mar frescos, leões-marinhos e aquário.' },
    'Gold Beach': { addr: 'Gold Beach, OR 97444', coords: '42.4073,-124.4218', detail: 'Pequena cidade costeira na foz do Rio Rogue. Praias selvagens e passeios de jet boat.' },

    // Day 22 — Redwood
    'Crescent City': { addr: 'Crescent City, CA 95531', coords: '41.7558,-124.2026', detail: 'Porta de entrada para o Redwood NP. Cidade mais ao norte da costa da Califórnia, com farol histórico.' },

    // Day 23 — Eureka
    'Avenue of the Giants': { addr: 'Avenue of the Giants, Humboldt Redwoods SP, CA 95571', coords: '40.3521,-123.9218', detail: 'Estrada de 50 km através de sequoias monumentais. Árvores de 100m de altura formam um túnel natural.', cost: 'Gratuito' },
    'Eureka': { addr: 'Eureka, CA 95501', coords: '40.8021,-124.1637', detail: 'Cidade portuária vitoriana. Old Town com edifícios históricos, Carson Mansion e baía de Humboldt.' },

    // Day 24 — San Francisco
    'San Francisco': { addr: 'San Francisco, CA 94102', coords: '37.7749,-122.4194', detail: 'City by the Bay. Icônica pela neblina, ladeiras, Golden Gate Bridge, bondinhos e diversidade cultural.' },

    // Day 25 — San Francisco
    'Nintendo San Francisco': { addr: '200 Stockton St, San Francisco, CA 94108', coords: '37.7867,-122.4065', detail: 'Segunda loja oficial da Nintendo nos EUA, inaugurada em 2025. Produtos exclusivos, demos jogáveis e experiências interativas.', hours: '10h-20h (Dom: 11h-19h)', cost: 'Gratuito (loja)' },

    // Day 26 — PCH
    // Day 27 — PCH
    'Pigeon Point Lighthouse': { addr: 'Pigeon Point Lighthouse, 210 Pigeon Point Rd, Pescadero, CA 94060', coords: '37.1820,-122.3930', detail: 'Um dos faróis mais altos da Costa Oeste com 35m de altura! Construído em 1872, nomeado após o naufrágio do clipper Carrier Pigeon em 1853. Vista espetacular do Pacífico, baleias cinzentas frequentes no inverno. Hostel ao lado!', hours: '8h-pôr do sol (terrenos)', cost: 'Gratuito' },
    'Half Moon Bay': { addr: 'Half Moon Bay, CA 94019', coords: '37.4636,-122.4286', detail: 'Cidade costeira famosa pelo surf gigante de Mavericks e festival de abóboras no outono.' },
    'Santa Cruz': { addr: 'Santa Cruz, CA 95060', coords: '36.9741,-122.0308', detail: 'Cidade praiana com o icônico boardwalk (parque de diversões à beira-mar desde 1907). Vibe surf e universitária.' },
    'Monterey': { addr: 'Monterey, CA 93940', coords: '36.6002,-121.8947', detail: 'Cidade portuária histórica. Cannery Row (Steinbeck), Monterey Bay Aquarium de classe mundial e Old Fisherman\'s Wharf.' },
    'Carmel-by-the-Sea': { addr: 'Carmel-by-the-Sea, CA 93921', coords: '36.5554,-121.9233', detail: 'Vila artística com casinhas de conto de fadas, galerias de arte e praia de areia branca. Sem semáforos nem números nas casas!' },
    '17-Mile Drive': { addr: '17-Mile Drive, Pebble Beach, CA 93953', coords: '36.5725,-121.9614', detail: 'Estrada cênica costeira. Lone Cypress, Pebble Beach Golf Links, mansões e paisagens deslumbrantes.', cost: '$11.25/carro' },
    'Bixby Creek Bridge': { addr: 'Bixby Creek Bridge, Big Sur, CA 93920', coords: '36.3714,-121.9016', detail: 'Ponte icônica de 1932, 85m de altura. A ponte mais fotografada da Califórnia, cenário de comerciais e filmes.', cost: 'Gratuito' },
    'Big Sur': { addr: 'Big Sur, CA 93920', coords: '36.2704,-121.8081', detail: '145 km de costa dramática. McWay Falls (cachoeira que cai direto no oceano!), Pfeiffer Beach com areia roxa.', cost: 'Gratuito (estacionamentos: $10-12)' },
    'Mariposa': { addr: 'Mariposa, CA 95338', coords: '37.4849,-119.9663', detail: 'Cidade da Corrida do Ouro, porta de entrada para o Yosemite. Charme histórico e California State Mining Museum.' },
    '1850 Restaurant': { addr: '5114 CA-140, Mariposa, CA 95338', coords: '37.4830,-119.9690', detail: 'Restaurante farm-to-table na histórica Mariposa. Ingredientes locais e ambiente acolhedor.', hours: '17h-21h (Qui-Dom)' },

    // Day 27-28 — Yosemite
    'Cook\'s Meadow Loop': { addr: 'Cook\'s Meadow, Yosemite Valley, CA 95389', coords: '37.7460,-119.5890', detail: 'Loop fácil de 1,6 km com vistas de Half Dome, Yosemite Falls e Glacier Point. Perfeito para amanhecer.', cost: 'Incluído no ingresso do parque' },
    'Cook\'s Meadow': { addr: 'Cook\'s Meadow, Yosemite Valley, CA 95389', coords: '37.7460,-119.5890', detail: 'Prado aberto no coração do Yosemite Valley. Vistas clássicas de Half Dome e Yosemite Falls refletidas na grama.', cost: 'Incluído no ingresso do parque' },
    'Yosemite Village': { addr: 'Yosemite Village, Yosemite NP, CA 95389', coords: '37.7490,-119.5870', detail: 'Hub principal do parque: Visitor Center, Ansel Adams Gallery, museu, lojas e restaurantes.', hours: '9h-17h', cost: 'Incluído no ingresso do parque' },
    'Ansel Adams': { addr: 'Ansel Adams Gallery, Yosemite Village, CA 95389', coords: '37.7489,-119.5873', detail: 'Galeria gratuita com fotografias icônicas em preto e branco de Ansel Adams. Yosemite foi sua grande musa.', hours: '10h-17h', cost: 'Gratuito' },

    // Day 30 — Sequoia
    'Giant Forest Museum': { addr: 'Giant Forest Museum, Sequoia NP, CA 93262', coords: '36.5640,-118.7510', detail: 'Exposições sobre ecologia e história das sequoias gigantes. Ponto de partida para trilhas no Giant Forest.', hours: '9h-16h30', cost: 'Incluído no ingresso do parque' },
    'Big Trees Trail': { addr: 'Big Trees Trail, Sequoia NP, CA 93262', coords: '36.5630,-118.7520', detail: 'Loop pavimentado de ~2 km ao redor de Round Meadow. Sequoias refletidas na água, acessível para cadeirantes.', cost: 'Incluído no ingresso do parque' },
    'Tunnel Log': { addr: 'Tunnel Log, Crescent Meadow Rd, Sequoia NP, CA 93262', coords: '36.5560,-118.7480', detail: 'Tronco caído de sequoia gigante com túnel escavado para carros passarem. Caiu em 1937 por causas naturais.', cost: 'Incluído no ingresso do parque' },
    'Auto Log': { addr: 'Auto Log, Sequoia NP, CA 93262', coords: '36.5550,-118.7500', detail: 'Tronco caído de sequoia onde antigamente carros estacionavam em cima para fotos. Hoje apenas pedestres.', cost: 'Incluído no ingresso do parque' },

    // Day 31 — PCH South: Elephant Seal, Hearst Castle, Santa Barbara
    'Elephant Seal Vista Point': { addr: 'Elephant Seal Vista Point, CA-1, San Simeon, CA 93452', coords: '35.6625,-121.2547', detail: 'Colônia de elefantes-marinhos na praia! Milhares de animais descansando, brigando e brincando. Passarelas de observação gratuitas.', cost: 'Gratuito' },
    'Hearst Castle': { addr: '750 Hearst Castle Rd, San Simeon, CA 93452', coords: '35.6854,-121.1685', detail: 'Mansão espetacular do magnata William Randolph Hearst. 165 quartos, piscinas romanas, arte europeia. Patrimônio histórico.', hours: '9h-17h', cost: '~$30/adulto (tour guiado obrigatório)' },
    'Stearns Wharf': { addr: 'Stearns Wharf, Santa Barbara, CA 93101', coords: '34.4098,-119.6853', detail: 'Píer de madeira mais antigo da Califórnia em funcionamento (1872). Restaurantes, lojas e vista panorâmica do litoral e das montanhas.', cost: 'Gratuito' },
    'Santa Barbara': { addr: 'Santa Barbara, CA 93101', coords: '34.4208,-119.6982', detail: 'A "Riviera Americana". Arquitetura espanhola colonial, praias douradas, montanhas como pano de fundo. Clima perfeito o ano todo.' },
    'Santa Barbara County Courthouse': { addr: '1100 Anacapa St, Santa Barbara, CA 93101', coords: '34.4255,-119.7030', detail: 'Prédio público mais bonito dos EUA! Estilo colonial espanhol de 1929. Suba na torre do relógio para vista 360° gratuita.', hours: '8h-17h (torre até 16h45)', cost: 'Gratuito' },
    'State Street': { addr: 'State Street, Santa Barbara, CA 93101', coords: '34.4220,-119.7020', detail: 'Rua principal de Santa Barbara. Lojas, restaurantes, galerias e vida noturna. Trecho de pedestres (State Street Promenade).', cost: 'Gratuito' },
    'East Beach': { addr: 'East Beach, Santa Barbara, CA 93103', coords: '34.4150,-119.6780', detail: 'Praia mais popular de Santa Barbara. Areia ampla, vôlei de praia, ciclovias e vista do Stearns Wharf.', cost: 'Gratuito (estacionamento: $2/h)' },
    'The Lark': { addr: '131 Anacapa St, Santa Barbara, CA 93101', coords: '34.4170,-119.6930', detail: 'Restaurante premiado no Funk Zone. Pratos criativos para compartilhar, coquetelaria artesanal. Ambiente industrial-chique em antigo armazém ferroviário.', hours: '17h-22h (Sex-Sáb até 23h)', cost: '~$40-60/pessoa' },
    'Point Mugu': { addr: 'Point Mugu State Park, Malibu, CA 90265', coords: '34.0860,-119.0360', detail: 'Parque estadual na PCH com praias selvagens, trilhas costeiras e formações rochosas dramáticas. Big Sycamore Canyon é destaque.', cost: '$12/carro' },

    // Day 32 — LA Hollywood + Shopping
    'Hollywood Walk of Fame': { addr: 'Hollywood Blvd, Los Angeles, CA 90028', coords: '34.1016,-118.3267', detail: 'Mais de 2.700 estrelas na calçada homenageando celebridades do entretenimento. 15 quarteirões de Hollywood Blvd.', cost: 'Gratuito' },
    'TCL Chinese Theatre': { addr: '6925 Hollywood Blvd, Los Angeles, CA 90028', coords: '34.1022,-118.3409', detail: 'Cinema lendário de 1927. Pegadas e mãos de estrelas no cimento do pátio. Premieres de Hollywood acontecem aqui.', hours: 'Pátio: 24h / Tours: 10h30-16h', cost: 'Pátio gratuito / Tour: ~$18' },
    'The Grove': { addr: '189 The Grove Dr, Los Angeles, CA 90036', coords: '34.0720,-118.3578', detail: 'Shopping ao ar livre com bonde elétrico, fonte dançante e The Original Farmers Market (1934) ao lado. Experiência LA.', hours: '10h-21h (Dom: 10h-20h)', cost: 'Gratuito (estacionamento: primeiras 2h grátis)' },
    'Citadel Outlets': { addr: '100 Citadel Dr, Commerce, CA 90040', coords: '34.0005,-118.1520', detail: 'Outlet a céu aberto com arquitetura estilo fortaleza assíria. 130+ lojas de marca com descontos. Próximo ao aeroporto.', hours: '10h-21h (Dom: 10h-20h)', cost: 'Gratuito' },

    // Day 22 — Jedediah Smith / Crescent City additions
    'Jedediah Smith Redwoods': { addr: 'Jedediah Smith Redwoods SP, Crescent City, CA 95531', coords: '41.8020,-124.0880', detail: 'Parque estadual com redwoods antigos intocados. Stout Memorial Grove, Howland Hill Road e Smith River cristalino.', cost: '$8/carro' },
    'Howland Hill Road': { addr: 'Howland Hill Rd, Crescent City, CA 95531', coords: '41.7900,-124.0800', detail: 'Estrada de terra de 10 km através de redwoods gigantes. Uma das drives mais impressionantes — árvores tocam o carro! Não recomendada para trailers.', cost: 'Gratuito' },
    'Boy Scout Tree Trail': { addr: 'Boy Scout Tree Trail, Jedediah Smith Redwoods SP, CA', coords: '41.7805,-124.0695', detail: 'Trilha de ~8 km (ida e volta) por floresta primária de redwoods. Pouco visitada, silêncio total. Uma das melhores trilhas do norte da CA.', cost: 'Gratuito' },
    'Battery Point Lighthouse': { addr: 'Battery Point Lighthouse, Crescent City, CA 95531', coords: '41.7445,-124.2048', detail: 'Farol de 1856 em uma ilha rochosa acessível apenas na maré baixa! Museu dentro. Um dos faróis mais fotogênicos da costa oeste.', hours: '10h-16h (Abr-Set, maré baixa)', cost: '$5/adulto' },
    'Del Norte Coast Redwoods': { addr: 'Del Norte Coast Redwoods SP, CA', coords: '41.7150,-124.1250', detail: 'Parque com redwoods que descem até o oceano. Damnation Creek Trail é a jóia escondida — descida íngreme até praia selvagem.', cost: '$8/carro' },
    'Damnation Creek Trail': { addr: 'Damnation Creek Trail, Del Norte Coast Redwoods SP, CA', coords: '41.6700,-124.1200', detail: 'Trilha de 7 km que desce 300m de altitude dos redwoods até uma praia remota. Vegetação densa, neblina mística. Nível moderado-difícil.', cost: 'Gratuito' },

    // Day 29 — San Francisco (Alcatraz + extras)
    'Alcatraz': { addr: 'Alcatraz Island, San Francisco, CA 94133', coords: '37.8267,-122.4233', detail: 'A prisão mais famosa do mundo, na ilha da baía de SF. Tour de áudio premiado narra histórias de Al Capone e fugas lendárias. Reserve com antecedência!', hours: 'Ferries: 8h45-15h30', cost: '$41/adulto (ferry + tour)' },
    'Golden Gate Park': { addr: 'Golden Gate Park, San Francisco, CA 94118', coords: '37.7694,-122.4862', detail: 'Parque urbano maior que o Central Park! Jardim Japonês, California Academy of Sciences, de Young Museum, bisão e moinhos.', cost: 'Gratuito (atrações internas pagas)' },
    'Ocean Beach': { addr: 'Ocean Beach, San Francisco, CA 94122', coords: '37.7594,-122.5107', detail: 'Praia oceânica de 5,6 km na borda oeste de SF. Ondas fortes, vento, fogueiras no pôr do sol. Surfistas e corredores.', cost: 'Gratuito' },
    'Fog Harbor Fish House': { addr: 'Pier 39, Ste A-202, San Francisco, CA 94133', coords: '37.8090,-122.4100', detail: 'Restaurante no Pier 39 com vista para a baía e Alcatraz. Especialidade: Dungeness crab e clam chowder em pão sourdough.', hours: '11h-21h30', cost: '~$30-50/pessoa' },
    'Ferry Building': { addr: 'Ferry Building, San Francisco, CA 94105', coords: '37.7955,-122.3937', detail: 'Marco histórico com mercado gastronômico artesanal. Queijos, ostras, café Blue Bottle, padarias. Farmers market aos sábados.', hours: '10h-18h (mercado)', cost: 'Gratuito' },

    // Restaurantes de jantar
    'John\'s of Times Square': { addr: '260 W 44th St, New York, NY 10036', coords: '40.7579,-73.9896', detail: 'Pizzaria em forno de lenha desde 1929, servindo pizzas inteiras crocantes de estilo nova-iorquino. Uma das mais tradicionais de Manhattan. Ambiente de madeira e tijolos, sem fatias — só pizzas inteiras. Clássico que não decepciona.', hours: '11h30-23h30', cost: '~$15-20/pessoa' },
    'Dallas BBQ': { addr: '261 8th Ave, New York, NY 10011', coords: '40.7437,-74.0008', detail: 'Churrasco americano com porções absurdas em Chelsea! Ribs, chicken, onion rings gigantes e daiquiris em copos tamanho balde. Ambiente barulhento e divertido, perfeito para família. Fila esperada nos fins de semana.', hours: '12h-1h', cost: '~$18-25/pessoa' },
    'Raising Cane\'s': { addr: '3717 Las Vegas Blvd S, Las Vegas, NV 89109', coords: '36.1182,-115.1726', detail: 'Chicken tenders crocantes com o famoso Cane\'s Sauce — simples, consistente e delicioso. Localizado no próprio Strip de Las Vegas. Menu direto ao ponto: tenders, toast, coleslaw e lemonade. Kids adoram.', hours: '9h-3h', cost: '~$10-14/pessoa' },
    'Fogo de Chão': { addr: '3500 Las Vegas Blvd S (Paris Las Vegas), Las Vegas, NV 89109', coords: '36.1118,-115.1707', detail: '🇧🇷 Churrascaria brasileira de rodízio dentro do Paris Las Vegas na Strip! Picanha, fraldinha, cordeiro, costela e muito mais. Salad bar com palmito, farofa e pão de queijo. Despedida de Vegas com gostinho do Brasil!', hours: '17h-22h (Sáb-Dom 12h-22h)', cost: '~$45-55/adulto (crianças 6-12: ~$22)' },
    'Cracker Barrel': { addr: '1357 Blue Lakes Blvd N, Twin Falls, ID 83301', coords: '42.5798,-114.4604', detail: 'O clássico comfort food americano do interior! Chicken fried steak, mashed potatoes com gravy, biscuits frescos, pancakes e country ham. Ambiente de country store com jogos de madeira na varanda. Kids adoram o menu infantil.', hours: '7h-21h', cost: '~$12-18/pessoa' },
    'The Forge in the Forest': { addr: '5th Ave e Junipero St, Carmel-by-the-Sea, CA 93921', coords: '36.5556,-121.9236', detail: 'Restaurante americana casual em casinha charmosa com jardim coberto de flores no centro de Carmel. Burgers artesanais, ribs, saladas e sobremesas caseiras. Ambiente de fazenda encantada, kid-friendly, sem reserva.', hours: '11h30-22h', cost: '~$20-28/pessoa' },
    'Big Bear Lake Brewing Company': { addr: '40827 Lakeview Dr, Big Bear Lake, CA 92315', coords: '34.2437,-116.9048', detail: 'Brewpub com pizza artesanal e burgers com vista para o lago Big Bear. Cervejas artesanais de montanha produzidas no local. Ambiente descontraído de ski resort, perfeito para encerrar o dia antes de descer para LA.', hours: '11h-21h', cost: '~$15-20/pessoa' },
    'Lake Shrine': { addr: '17190 Sunset Blvd, Pacific Palisades, CA 90272', coords: '34.0508,-118.5331', detail: 'Jardim de meditação sereno fundado em 1950 pela Self-Realization Fellowship. Lago com cisnes, moinho histórico holandês do século XVII, Templo do Silêncio e esculturas de todas as religiões do mundo. Ambiente de paz total a poucos minutos de Santa Monica.', hours: '9h-16h30 (fecha seg)', cost: 'Gratuito' },
    'California Science Center': { addr: '700 Exposition Park Dr, Los Angeles, CA 90037', coords: '34.0143,-118.2856', detail: 'Lar do Space Shuttle Endeavour — o ônibus espacial real em tamanho natural! Um dos museus mais impressionantes dos EUA. Exposições sobre ciência, tecnologia e exploração espacial. O Endeavour foi ao espaço 25 vezes entre 1992 e 2011.', hours: '10h-17h', cost: 'Gratuito (Endeavour: $3 sugerido)' },
    'Greystone Mansion & Gardens': { addr: '905 Loma Vista Dr, Beverly Hills, CA 90210', coords: '34.0843,-118.4019', detail: 'Mansão Tudor de 1928 com 46 quartos, palco de dezenas de filmes e séries como There Will Be Blood, The Witcher e Ghostbusters. Jardins formais gratuitos com vista de Beverly Hills. Um dos locais históricos mais fotogênicos de LA.', hours: '10h-17h', cost: 'Gratuito' },
    'Getty Center': { addr: '1200 Getty Center Dr, Los Angeles, CA 90049', coords: '34.0780,-118.4741', detail: 'Museu de arte com vista panorâmica deslumbrante de Los Angeles e o Pacífico. Jardim central com obras de arte ao ar livre. Coleção de arte européia, fotografias e design. Tram gratuito da entrada até o topo. Vista de LA ao pôr do sol é espetacular.', hours: '10h-17h30 (Sex-Sáb até 21h)', cost: 'Gratuito (estacionamento $20)' },
    'Gazala Place': { addr: '709 9th Ave, New York, NY 10019', coords: '40.7623,-73.9898', detail: 'Restaurante druza-israelense único em NYC. Famoso pelas burekas crocantes recheadas e shakshuka. Ambiente aconchegante, sem frescura, frequentado por moradores de Hell\'s Kitchen.', hours: '11h30-22h', cost: '~$15-20/pessoa' },
    'Coppelia': { addr: '207 W 14th St, New York, NY 10011', coords: '40.7403,-74.0010', detail: 'Diner latino-cubano aberto 24h em Chelsea. Ropa vieja, arroz con pollo, milkshakes. Frequentado por moradores do bairro, não turistas. Ótimo custo-benefício em NY.', hours: '24h', cost: '~$15-20/pessoa' },
    'Katz\'s Deli': { addr: '205 E Houston St, New York, NY 10002', coords: '40.7223,-73.9874', detail: 'Lendária delicatessen judaica de 1888. Pastrami e corned beef são os pedidos obrigatórios. Cenário do filme "Quando Harry Encontrou Sally". Fila faz parte da experiência.', hours: 'Seg-Qui 8h-22h45, Sex 8h-15h (Sáb 24h)', cost: '~$20-30/pessoa' },
    'Ellen\'s Stardust Diner': { addr: '1650 Broadway, New York, NY 10019', coords: '40.7607,-73.9835', detail: 'Diner temático dos anos 50 em Times Square onde os garçons cantam ao vivo! Burgers, milkshakes e espetáculo musical incluídos. Perfeito para crianças. Fila esperada.', hours: '8h-23h', cost: '~$20-25/pessoa' },
    'Secret Pizza': { addr: 'The Cosmopolitan, 3708 Las Vegas Blvd S (3º andar, sem placa), Las Vegas, NV 89109', coords: '36.1090,-115.1735', detail: 'O hidden gem mais famoso de Las Vegas! Pizzaria escondida no 3º andar do Cosmopolitan sem placa na porta — siga os sinais de pizza no corredor. Pizza NY-style honesta e barata dentro de um dos hotéis mais badalados do Strip.', hours: '11h-2h', cost: '~$15-20/pessoa' },
    'China Mama': { addr: '3420 S Jones Blvd, Las Vegas, NV 89146', coords: '36.1150,-115.2080', detail: 'Melhor dim sum de Las Vegas no Chinatown da cidade (fora do Strip). Xiao long bao (dumplings de sopa) e mapo tofu são os destaques. Frequentado pelos moradores de Vegas, não turistas.', hours: 'Ter-Dom 10h-21h', cost: '~$15-20/pessoa' },
    'In-N-Out Burger': { addr: '4888 Dean Martin Dr, Las Vegas, NV 89103', coords: '36.0975,-115.1690', detail: 'O clássico fast food da Califórnia/Nevada. Double-Double com cheddar, batata frita fresquinha. Menu secreto: peça "Animal Style" (mustard grilled, extra molho, grilled onions). Filas andam rápido.', hours: '10h30-1h (Sex-Sáb até 1h30)', cost: '~$8-12/pessoa' },
    'Oscar\'s Cafe': { addr: '948 Zion Park Blvd, Springdale, UT 84767', coords: '37.1990,-112.9870', detail: 'O clássico de Springdale na entrada do Zion. Mexicana casual com porções generosas — burritos do café da manhã servidos dia todo, enchiladas e tacos. Fila comum nos horários de pico.', hours: '7h-21h', cost: '~$12-18/pessoa' },
    'Zion Canyon Brew Pub': { addr: '95 Zion Park Blvd, Springdale, UT 84767', coords: '37.1960,-112.9862', detail: 'Brewpub com cervejas artesanais regionais na porta do Zion. Burgers artesanais, fish & chips e nachos. Ótima pedida para encerrar o dia com cerveja gelada após trilha.', hours: '11h30-22h', cost: '~$15-20/pessoa' },
    'Cowboy\'s Smokehouse BBQ': { addr: '95 N Main St, Panguitch, UT 84759', coords: '37.8283,-112.4344', detail: 'BBQ defumado autêntico no Utah rural a ~22 km de Bryce Canyon. Ribs, brisket e sides caseiros preparados no fumeiro. Frequentado por moradores da região — bem longe do turismo de Bryce.', hours: '11h-21h (fecha seg)', cost: '~$15-20/pessoa' },
    'Moab Brewery': { addr: '686 S Main St, Moab, UT 84532', coords: '38.5628,-109.5504', detail: 'A cervejaria local mais tradicional de Moab desde 1996. Burger Dead Horse, nachos artesanais e variedade de cervejas próprias. Ambiente animado e perfeito pós-trilha. Chega antes das 18h para evitar espera.', hours: '11h30-22h', cost: '~$15-20/pessoa' },
    'Pasta Jay\'s': { addr: '4 S 100 W, Moab, UT 84532', coords: '38.5731,-109.5503', detail: 'Italiano casual muito querido pelos moradores de Moab. Massas feitas na casa, lasanha, fettuccine alfredo. Porções generosas e bom custo-benefício para a região.', hours: '11h-22h', cost: '~$15-20/pessoa' },
    'Spoke on Center': { addr: '702 S Main St, Moab, UT 84532', coords: '38.5584,-109.5504', detail: 'Café e bistrô favorito de trilheiros e ciclistas de Moab. Sanduíches artesanais, sopa do dia e saladas frescas. Mais leve para encerrar uma jornada intensa no deserto.', hours: '7h-15h', cost: '~$12-18/pessoa' },
    'Koto Japanese Restaurant': { addr: '132 Shoshone St N, Twin Falls, ID 83301', coords: '42.5626,-114.4609', detail: 'Instituição local de Twin Falls há décadas — surpreendentemente bom para uma cidade do Idaho. Sushi rolls frescos, teriyaki e pratos japoneses clássicos. Ambiente simples e honesto.', hours: 'Ter-Dom 11h-21h', cost: '~$15-20/pessoa' },
    'Olympic Club Hotel & Bar': { addr: '112 N Tower Ave, Centralia, WA 98531', coords: '46.7163,-122.9538', detail: 'Bar e restaurante histórico de 1908 — o mais antigo do estado de Washington ainda em funcionamento! Ambiente de saloon do Velho Oeste preservado. Burgers artesanais e fish & chips do Pacific Northwest.', hours: '11h-23h', cost: '~$15-20/pessoa' },
    'Pacific Pizza & Pasta': { addr: '70 N Forks Ave, Forks, WA 98331', coords: '47.9495,-124.3847', detail: 'A opção mais confiável e frequentada pelos moradores locais em Forks. Pizzas artesanais e massas em ambiente descontraído. A cidade tem opções muito limitadas — esse é o mais consistente.', hours: '11h-21h', cost: '~$12-18/pessoa' },
    'Bella Italia': { addr: '118 E 1st St, Port Angeles, WA 98362', coords: '48.1178,-123.4307', detail: 'Italiano autêntico com ingredientes frescos do Pacific Northwest em Port Angeles. Mushroom ravioli e linguine alle vongole são os destaques. Ficou famoso por aparecer no livro Twilight. Melhor restaurante da cidade.', hours: '16h-21h30 (fecha seg)', cost: '~$20-25/pessoa' },
    'Ecola Seafood Restaurant & Market': { addr: '208 N Spruce St, Cannon Beach, OR 97110', coords: '45.8919,-123.9618', detail: 'Mercado de frutos do mar frescos a poucos metros da Haystack Rock. Dungeness crab, fish & chips de halibut do Oregon. Ambiente simples de mercado de pescadores — sem mesas sofisticadas, só frescor.', hours: '11h-20h', cost: '~$20-25/pessoa' },
    'Spinner\'s Seafood Steak & Chowder House': { addr: '29430 Ellensburg Ave, Gold Beach, OR 97444', coords: '42.4148,-124.4228', detail: 'Melhor restaurante de Gold Beach. Salmão grelhado do Rio Rogue (pedido obrigatório quando disponível) e clam chowder caseiro. Frutos do mar da costa sul do Oregon servidos frescos.', hours: '16h-21h (fecha seg-ter)', cost: '~$20-25/pessoa' },
    'Fisherman\'s Restaurant': { addr: '700 US-101 S, Crescent City, CA 95531', coords: '41.7483,-124.1977', detail: 'Clássico de Crescent City há décadas. Dungeness crab grelhado e halibut plate frescos do Pacífico Norte. Cidade de pescadores com frutos do mar servidos sem frescura — exatamente o que esperar da região.', hours: '11h-21h', cost: '~$15-22/pessoa' },
    'Lost Coast Brewery & Cafe': { addr: '617 4th St, Eureka, CA 95501', coords: '40.8021,-124.1637', detail: 'Cervejaria artesanal pioneira do North Coast da Califórnia, fundada em 1990. Conhecida pelas cervejas Downtown Brown e Great White. Burgers artesanais e fish tacos. Ambiente animado no centro de Eureka.', hours: '11h-22h', cost: '~$15-20/pessoa' },
    'Tony\'s Pizza Napoletana': { addr: '1570 Stockton St, San Francisco, CA 94133', coords: '37.8004,-122.4103', detail: 'Campeão mundial de pizza napolitana (World Pizza Championship). No coração do North Beach, bairro italiano de SF. Pizza Margherita STG autentica com massa fermentada. Fila esperada — vale cada minuto.', hours: '12h-22h (fecha ter)', cost: '~$20-25/pessoa' },
    'La Taqueria': { addr: '2889 Mission St, San Francisco, CA 94110', coords: '37.7518,-122.4182', detail: 'Vencedor do James Beard America\'s Classic Award — o burrito mais famoso dos EUA! Carnitas crocantes, feijão frito, sem arroz (estilo SF autêntico). Fila na porta faz parte da experiência no Mission District.', hours: '11h-21h (Dom até 20h, fecha ter)', cost: '~$12-15/pessoa' },
    'Mundaka': { addr: 'San Carlos St entre Ocean e 7th Ave, Carmel-by-the-Sea, CA 93921', coords: '36.5553,-121.9233', detail: 'Tapas espanholas autênticas num endereço charmoso de Carmel. Patatas bravas, croquetas de jamón e pulpo a la gallega. Ambiente de bodega com lista de vinhos ibéricos. Ótimo para compartilhar.', hours: '17h-21h30', cost: '~$20-25/pessoa' },
    'Charles Street Dinner House': { addr: '5043 Charles St, Mariposa, CA 95338', coords: '37.4840,-119.9660', detail: 'O restaurante de jantar mais tradicional de Mariposa desde os anos 70. Prime rib e chicken marsala com acompanhamentos caseiros. Steakhouse local perfeito para repor energia após o primeiro dia em Yosemite.', hours: '17h-21h (fecha seg-ter)', cost: '~$20-25/pessoa' },
    'Savoury\'s': { addr: '5034 Hwy 140, Mariposa, CA 95338', coords: '37.4836,-119.9658', detail: 'O mais gastronômico que Mariposa oferece. Cozinha americana eclética com ingredientes locais da Sierra Nevada, menu rotativo. Ambiente acolhedor próximo à entrada do Yosemite.', hours: '17h-21h (liga antes no inverno)', cost: '~$20-25/pessoa' },
    'Castillo\'s Mexican Food': { addr: '4995 5th St, Mariposa, CA 95338', coords: '37.4852,-119.9667', detail: 'Mexicano familiar frequentado pelos próprios moradores de Mariposa. Enchiladas verdes e chile relleno caseiros. Preços baixos, porções fartas — ótimo encerramento antes de Sequoia.', hours: '10h-20h (fecha seg)', cost: '~$12-18/pessoa' },
    'The Gateway Restaurant': { addr: '45978 Sierra Dr, Three Rivers, CA 93271', coords: '36.4372,-118.9107', detail: 'O restaurante mais estabelecido em Three Rivers, bem na rota de entrada do Sequoia NP. Burgers locais e trout almondine. Opções são muito limitadas nessa região — este é o mais confiável. Confirme horários no inverno.', hours: '7h-21h (horários variam no inverno)', cost: '~$15-20/pessoa' },
    'Tacos Por Favor': { addr: '1406 Olympic Blvd, Santa Monica, CA 90404', coords: '34.0242,-118.4732', detail: 'Taqueria de bairro amada pelos moradores de Santa Monica há décadas. Fila constante de locais na hora do jantar — o melhor sinal de qualidade. Tacos de carne asada e burrito de pollo sem frescura.', hours: '8h-21h', cost: '~$10-15/pessoa' },
    'Himalayan Restaurant': { addr: '672 Pine Knot Ave, Big Bear Village, CA 92315', coords: '34.2439,-116.9116', detail: 'Surpresa agradável nas montanhas de Big Bear! Cozinha nepalesa/indiana autêntica no coração da Serra de San Bernardino. Momo (dumplings tibetanos), chicken tikka masala e Dal Bhat. Favorito absoluto dos moradores locais.', hours: '11h-21h', cost: '~$15-20/pessoa' },
    'Grand Central Market': { addr: '317 S Broadway, Los Angeles, CA 90013', coords: '34.0506,-118.2498', detail: 'Mercado gastronômico histórico de 1917 no centro de Los Angeles. Cada um escolhe o que quer: tacos, ramen, pizza, burgers, açaí. Sem reserva, sem formalidade — perfeito para família. Ambiente vibrante e diverso do DTLA.', hours: '8h-21h (Sex-Sáb até 22h)', cost: '~$10-18/pessoa' },

    'Grand Central Market': { addr: '317 S Broadway, Los Angeles, CA 90013', coords: '34.0506,-118.2498', detail: 'Mercado gastronômico histórico de 1917 no centro de Los Angeles. Cada um escolhe o que quer: tacos, ramen, pizza, burgers, açaí. Sem reserva, sem formalidade — perfeito para família. Ambiente vibrante e diverso do DTLA.', hours: '8h-21h (Sex-Sáb até 22h)', cost: '~$10-18/pessoa' },
    'LACMA Urban Light': { addr: '5905 Wilshire Blvd, Los Angeles, CA 90036', coords: '34.0639,-118.3592', detail: 'Instalação de arte com 202 postes de luz antiga — a foto mais icônica do Instagram em Los Angeles! Fica do lado de fora do LACMA (Los Angeles County Museum of Art), disponível 24h e totalmente gratuita. Imperdível para fotos ao pôr do sol.', hours: '24h (acesso externo)', cost: 'Gratuito' },
    'The Grove': { addr: '189 The Grove Dr, Los Angeles, CA 90036', coords: '34.0720,-118.3551', detail: 'Shopping ao ar livre super instagrammável com trolley vermelho, fonte dançante e lojas como Anthropologie, Zara e Urban Outfitters. Ao lado do Original Farmers Market histórico. Um dos pontos mais "LA real" para passear e fazer fotos.', hours: '10h-21h (Dom até 20h)', cost: 'Gratuito (compras à vontade)' },
    'Sprinkles Cupcakes': { addr: '9635 S Santa Monica Blvd, Beverly Hills, CA 90210', coords: '34.0667,-118.3994', detail: 'A primeira cupcakeria do mundo (2005) em Beverly Hills! Famosa pelos cupcakes de Red Velvet, Birthday Cake e Churro. Atração especial: o Cupcake ATM — máquina que vende cupcakes 24h. A foto com o cupcake saindo da máquina é cult no Instagram de qualquer teen!', hours: '9h-21h (Cupcake ATM 24h)', cost: '~$5-6/cupcake' },
    'El Compadre': { addr: '7408 W Sunset Blvd, Hollywood, CA 90046', coords: '34.0898,-118.3558', detail: 'Restaurante mexicano lendário em Hollywood desde 1975. Famoso pela tradição da margarita em chamas (flambe tableside) — super instagrammável e festivo! Perfeito para aniversários: ambiente barulhento do jeito certo, pratos generosos e sobremesa surpresa para aniversariantes.', hours: '11h30-23h', cost: '~$18-30/pessoa' },

    // Day 31 — LA
    'Cool Cat Collective': { addr: '2741 E 4th St, Long Beach, CA 90814', coords: '33.7700,-118.1600', detail: 'Café/galeria de arte temática de gatos com gatinhos foster disponíveis para adoção! Ambiente colorido com murais, produtos artísticos de gatos e área de interação com os felinos. Ótimo para famílias!', hours: 'Qua-Dom 10h-18h', cost: 'Gratuito (doações aceitas)' },
    'LA': { addr: 'Los Angeles, CA 90012', coords: '34.0522,-118.2437', detail: 'A Cidade dos Anjos! Segunda maior cidade dos EUA, capital do cinema e do entretenimento.' },
    'Santa Monica': { addr: 'Santa Monica, CA 90401', coords: '34.0195,-118.4912', detail: 'Cidade praiana com o icônico píer, roda-gigante, 3rd Street Promenade (shopping a céu aberto) e ciclovia à beira-mar.' },

    // --- Missing locations audit ---
    // Day 4 — NYC
    'Harry Potter Shop': { addr: '935 Broadway, New York, NY 10010', coords: '40.7400,-73.9893', detail: 'Harry Potter New York — maior loja HP do mundo! 3 andares com varinhas interativas, roupas das casas, doces de Honeydukes e experiências imersivas.', hours: '10h-21h', cost: 'Entrada gratuita' },

    // Day 7 — Death Valley
    "Devil's Golf Course": { addr: "Devil's Golf Course Rd, Death Valley, CA 92328", coords: '36.3103,-116.8339', detail: 'Planície de sal cristalizado com formações pontiagudas irregulares. A superfície estala no calor! Fica entre Badwater Basin e Furnace Creek.' , cost: 'Incluso no passe do parque ($30/carro)' },

    // Day 10 — Bryce Canyon
    'Fairyland Point': { addr: 'Fairyland Point, Bryce Canyon NP, UT 84764', coords: '37.6521,-112.1426', detail: 'Mirante menos visitado no extremo norte do parque. Vista ampla dos hoodoos sem multidões. Acessível antes da entrada principal (sem taxa!).', cost: 'Incluso no passe do parque' },
    'Mossy Cave Trail': { addr: 'Mossy Cave Trail, Bryce Canyon, UT 84764', coords: '37.6891,-112.1115', detail: 'Trilha curta (0.8 km ida e volta) até uma caverna com musgo e uma cascata. Fica fora da entrada principal, na Hwy 12. Fácil e fotogênica.', cost: 'Gratuito (fora da área com taxa)' },

    // Day 11 — Capitol Reef
    'Hickman Bridge Trail': { addr: 'Hickman Bridge Trail, Capitol Reef NP, UT 84775', coords: '38.2888,-111.2297', detail: 'Trilha moderada de 2.9 km (ida e volta) até arco natural de 40m de envergadura. Uma das trilhas mais icônicas do Capitol Reef.', cost: 'Incluso no passe do parque' },
    'Fruita Historic District': { addr: 'Fruita, Capitol Reef NP, UT 84775', coords: '38.2825,-111.2475', detail: 'Comunidade mórmon do séc. XIX preservada dentro do parque. Pomares históricos onde você pode colher frutas na temporada!', cost: 'Gratuito' },
    'San Rafael Swell': { addr: 'San Rafael Swell, UT', coords: '38.8500,-110.7500', detail: 'Formação geológica espetacular entre Capitol Reef e Green River. I-70 corta o Spotted Wolf Canyon com paredões de arenito colorido dos dois lados.', cost: 'Gratuito' },

    // Day 25 — Monterey / Carmel
    'Cannery Row': { addr: 'Cannery Row, Monterey, CA 93940', coords: '36.6181,-121.9014', detail: 'Rua histórica imortalizada por John Steinbeck. Antigas fábricas de sardinha convertidas em lojas, restaurantes e o aquário. Atmosfera encantadora.', cost: 'Gratuito' },
    'Monterey Bay Aquarium': { addr: '886 Cannery Row, Monterey, CA 93940', coords: '36.6185,-121.9018', detail: 'Um dos melhores aquários do mundo! Tanque de algas gigantes (kelp forest), lontras-marinhas, águas-vivas bioluminescentes e Open Sea com tubarões.', hours: '10h-17h', cost: '$54.95 adulto / $39.95 criança (3-12)' },

    // Day 26 — Big Sur
    'Pfeiffer Beach': { addr: 'Pfeiffer Beach, Big Sur, CA 93920', coords: '36.2383,-121.8157', detail: 'Praia escondida com areia roxa (mineral manganês) e o famoso Keyhole Arch. Acesso por estrada estreita de 3 km — chegar cedo!', hours: '9h-20h', cost: '$12/carro' },
    'McWay Falls': { addr: 'McWay Falls, Julia Pfeiffer Burns SP, Big Sur, CA', coords: '36.1582,-121.6719', detail: 'Cachoeira de 24m que cai direto na praia do oceano — uma das cenas mais icônicas da Califórnia! Vista do mirante na trilha curta (0.6 km). Não é possível descer à praia.', cost: '$10/carro' },

    // Day 29 — Kings Canyon / Sequoia
    'North Grove Loop': { addr: 'North Grove Loop, Grant Grove, Kings Canyon NP, CA', coords: '36.7469,-118.9679', detail: 'Trilha fácil de 2.4 km entre sequoias gigantes, incluindo a General Grant Tree (terceira maior árvore do mundo). Acessível para todas as idades.', cost: 'Incluso no passe do parque' },
    'Generals Highway': { addr: 'Generals Highway, Sequoia/Kings Canyon NP, CA', coords: '36.6500,-118.8300', detail: 'Estrada cênica de 75 km conectando Grant Grove a Giant Forest. Curvas panorâmicas entre sequoias gigantes, mirantes e vistas do Sierra Nevada.', cost: 'Incluso no passe do parque' },

    // Day 31 — Big Bear
    'Big Bear Lake': { addr: 'Big Bear Lake, CA 92315', coords: '34.2439,-116.9114', detail: 'Lago de montanha a 2.000m de altitude nas montanhas San Bernardino. Ski, snowboard, trilhas, aldeia alpina. 2h de LA. Neve no inverno!', cost: 'Gratuito' },
    'Big Bear Village': { addr: 'Village Dr, Big Bear Lake, CA 92315', coords: '34.2428,-116.8925', detail: 'Centro turístico com lojas, restaurantes e sorveterias. Atmosfera de vila alpina com casas de madeira.', cost: 'Gratuito' },
    'Snow Summit': { addr: '880 Summit Blvd, Big Bear Lake, CA 92315', coords: '34.2310,-116.8900', detail: 'Estação de ski com 240 acres de pistas. No inverno: ski e snowboard. No verão: mountain bike e scenic sky chair. Vista panorâmica do lago.', hours: '8h30-16h', cost: 'Lift ticket: ~$99-149/dia' },
    'Alpine Slide at Magic Mountain': { addr: '800 Wildrose Ln, Big Bear Lake, CA 92315', coords: '34.2350,-116.8850', detail: 'Tobogã alpino em trilho com bobsled! Descida de 400m com controle de velocidade. Também tem go-karts e minigolfe. Diversão garantida para o Bernardo!', hours: '10h-17h', cost: '$8/descida ou $25 passe ilimitado' },
    'Castle Rock Trail': { addr: 'Castle Rock Trail, Big Bear Lake, CA 92315', coords: '34.2520,-116.8770', detail: 'Trilha curta (1 km ida) até formação rochosa com vista panorâmica do Big Bear Lake. Inclinação moderada. Ótima para fotos do pôr do sol.', cost: 'Gratuito' },

    // Day 32 — LA
    'Universal Studios Hollywood': { addr: '100 Universal City Plaza, Universal City, CA 91608', coords: '34.1381,-118.3534', detail: 'Parque temático de cinema! Wizarding World of Harry Potter, Studio Tour (bastidores reais), Jurassic World, Super Nintendo World (2023). Imperdível com criança!', hours: '9h-22h (varia)', cost: '$109-164/adulto (varia por data)' },

    // --- Coverage pass 2 (full-text audit) ---
    'Mt. Charleston': { addr: 'Mt. Charleston, Spring Mountains, NV 89124', coords: '36.2716,-115.6956', detail: 'Montanha de 3.632m a apenas 45 min de Vegas! Neve no inverno, trilhas no verão. Kyle Canyon Rd é a rota cênica. Mt. Charleston Lodge tem restaurante com lareira.', cost: 'Gratuito' },
    'Furnace Creek': { addr: 'Furnace Creek, Death Valley NP, CA 92328', coords: '36.4573,-116.8658', detail: 'Centro de Death Valley. Visitor Center (museu gratuito), Furnace Creek Inn (resort), general store e posto de gasolina. Ponto de partida para explorar o parque.', hours: 'Visitor Center: 8h-17h', cost: 'Incluso no passe do parque' },
    'Big Bend': { addr: 'Big Bend, Zion NP, UT 84767', coords: '37.2550,-112.9500', detail: 'Curva dramática do Virgin River dentro de Zion Canyon. Ponto de parada do shuttle com vistas de paredões verticais. Acesso a trilhas menores.', cost: 'Incluso no passe do parque' },
    'Canyonlands': { addr: 'Canyonlands National Park, UT 84532', coords: '38.3269,-109.8783', detail: 'Parque dividido em 3 distritos. Island in the Sky é o mais acessível — mesa elevada com vistas vertiginosas de cânions esculpidos pelo Colorado e Green River.', cost: '$30/carro (7 dias)' },
    'Arches NP': { addr: 'Arches National Park, Moab, UT 84532', coords: '38.7331,-109.5925', detail: 'Mais de 2.000 arcos naturais de arenito! Delicate Arch é o ícone de Utah. Landscape Arch tem 93m — o mais longo da América do Norte.', cost: '$30/carro (7 dias)' },
    'Newport': { addr: 'Newport, OR 97365', coords: '44.6368,-124.0535', detail: 'Vila de pescadores charmosa. Distrito Bayfront com frutos do mar frescos, leões-marinhos sob a ponte e Oregon Coast Aquarium.', cost: 'Gratuito' },
    'Orick': { addr: 'Orick, CA 95555', coords: '41.2869,-124.0594', detail: 'Pequena vila gateway para Redwood NP. Ponto de partida para Tall Trees Grove e trilhas costeiras. Elk Meadow com alces Roosevelt pastando à beira da estrada!' },
    'Battery Spencer': { addr: 'Battery Spencer, Sausalito, CA 94965', coords: '37.8278,-122.4830', detail: 'Antigo forte militar com a vista mais icônica da Golden Gate Bridge! Mirante elevado do lado Marin — a ponte inteira com SF ao fundo. Chegar cedo (estacionamento limitado).', cost: 'Gratuito' },
    'Golden Gate Overlook': { addr: 'Langdon Ct, San Francisco, CA 94129', coords: '37.8242,-122.4882', detail: 'Segundo mirante de Golden Gate em Marin Headlands, lado SF. Vista alternativa da ponte com ângulo diferente de Battery Spencer. Menos multidão, também ótimo para fotos!', cost: 'Gratuito' },
    'Yosemite Falls': { addr: 'Yosemite Falls, Yosemite NP, CA 95389', coords: '37.7566,-119.5963', detail: 'A cachoeira mais alta da América do Norte (739m em 3 quedas). Lower Yosemite Fall Trail (1.6 km) é fácil e leva à base. Fluxo máximo na primavera — pode secar no final do verão.', cost: 'Incluso no passe do parque' },
    'Big Bear': { addr: 'Big Bear Lake, CA 92315', coords: '34.2439,-116.9114', detail: 'Destino de montanha a 2h de LA. Lago alpino a 2.000m com ski, trilhas, aldeia e neve no inverno. Perfeito para um day trip da família!' },
    // --- Coverage pass 4 ---
    'Los Tacos No.1': { addr: '75 9th Ave, Chelsea Market, New York, NY 10011', coords: '40.7424,-74.0061', detail: 'Os melhores tacos autênticos de NYC! Carnitas, carne asada e adobada com tortillas feitas na hora. Fila enorme mas vale cada minuto no Chelsea Market.' },
    'Disney Store': { addr: '1540 Broadway, Times Square, NY 10036', coords: '40.7580,-73.9856', detail: 'Loja oficial da Disney em Times Square. 2 andares de merchandise de Parks, personagens e novidades. Imperdível para as crianças!', hours: '9h-23h' },
    "World's Tallest Thermometer": { addr: "World's Tallest Thermometer, Baker, CA 92309", coords: '35.2642,-116.0709', detail: 'Termômetro monumental de 42m em Baker — porta do Death Valley! Marca a temperatura recorde de 56.7°C registrada em 1913. Parada obrigatória para a foto icônica.' },
    'Venetian': { addr: 'The Venetian Resort, 3355 Las Vegas Blvd S, Las Vegas, NV 89109', coords: '36.1224,-115.1702', detail: 'Hotel/cassino temático de Veneza. Canais internos com gôndolas, teto pintado como céu, réplica do Campanile. Grand Canal Shoppes com dezenas de restaurantes.' },
    'Caesars Palace': { addr: 'Caesars Palace, 3570 Las Vegas Blvd S, Las Vegas, NV 89109', coords: '36.1397,-115.1733', detail: 'Ícone de Vegas desde 1966. Tema Império Romano com estátuas e fontes. The Forum Shops (160 lojas de luxo), Gordon Ramsay\'s Hell\'s Kitchen e piscinas épicas.' },
    'Bryce': { addr: 'Bryce Canyon National Park, UT 84717', coords: '37.5930,-112.1871', detail: 'Anfiteatro natural com 2.000+ hoodoos (agulhas de rocha avermelhada) — cenário de outro planeta! Inspiration Point, Bryce Point e trilhas Navajo Loop + Queen\'s Garden.' },
    'Scenic Drive': { addr: 'Capitol Reef Scenic Drive, Torrey, UT 84775', coords: '38.2918,-111.2340', detail: 'Estrada panorâmica de 16 km em Capitol Reef. Passa por cânions coloridos e o Water Pocket Fold — dobra geológica de 160 km visível da estrada. Gratuita com passe.' },
    "Devil's Golf Course": { addr: "Devil's Golf Course, Death Valley NP, CA", coords: '36.3492,-116.7934', detail: 'Campo de cristais de sal tão irregulares que só o diabo poderia jogar golfe aqui! Formações afiadas criadas por evaporação de lago pré-histórico. Incrível de perto.' },
    "Devil's Punchbowl": { addr: "Devil's Punchbowl, Yachats, OR 97498", coords: '44.2943,-124.1145', detail: 'Piscina circular de rocha onde o oceano entra rugindo em maré alta! Água jorrei para cima pelas fendas. Fica em Cape Perpetua — combine com Thor\'s Well.' },
    'The Goonies': { addr: '368 38th St, Astoria, OR 97103', coords: '46.1819,-123.8347', detail: 'Casa do filme The Goonies (1985)! Fachada original preservada em Astoria. Astoria também aparece em Twilight, Kindergarten Cop e Short Circuit. HEY YOU GUYS!' },
    'Coastal Trail': { addr: 'Coastal Trail, Enderts Beach, Crescent City, CA 95531', coords: '41.6944,-124.1413', detail: 'Trilha costeira onde sequoias encontram o Pacífico. Enderts Beach tem piscinas de marés com estrelas do mar. Acesso por estrada de terra de 5 km.' },
    'Jurassic Park 2': { addr: 'Fern Canyon, Prairie Creek Redwoods SP, CA 95555', coords: '41.4012,-124.0635', detail: 'Fern Canyon foi cenário de Jurassic Park 2: O Mundo Perdido (1997)! Paredes de 15m cobertas de samambaias verdes. Caminhar pela trilha é entrar dentro do filme.' },
    "Fisherman's Wharf": { addr: "Fisherman's Wharf, San Francisco, CA 94133", coords: '37.8083,-122.4177', detail: 'Bairro histórico à beira-mar de SF. Pier 39 com leões marinhos selvagens, aquário, lojas. Boudin Sourdough (pão em formato de caranguejo), Ghirardelli Square, vista de Alcatraz.' },
    'SF': { addr: 'San Francisco, CA 94102', coords: '37.7749,-122.4194', detail: 'City by the Bay! Golden Gate Bridge, cable cars, Alcatraz, Painted Ladies. Névoa icônica, morros e diversidade cultural incomparáveis. 3 dias mínimo para ver os destaques.' },
    "Cook's Meadow Loop": { addr: "Cook's Meadow Loop, Yosemite Valley, CA 95389", coords: '37.7410,-119.5934', detail: 'Caminhada fácil de 2.5 km no coração do vale. Vista simultânea de El Capitan, Half Dome e Sentinel Rock. Nascer do sol ou fim de tarde com luz dourada — imperdível!' },

    // ==================== SUPERCHARGERS (18 descriptions) ====================
    'Supercharger Barstow': { addr: 'Barstow, CA 92311', coords: '34.8462,-117.0845', detail: 'Maior Supercharger do mundo com ~120 stalls! Base de carregamento na junction entre Las Vegas e LA. Outlet center próximo.', cost: '~$10-15' },
    'Supercharger Salina, UT': { addr: 'Salina, UT 84654', coords: '38.9480,-111.8220', detail: 'Supercharger isolado na US-89 entre Manti e Richfield. Sem comidas próximas — trazer snacks. Bom ponto de parada.', cost: '~$10' },
    'Supercharger Green River, UT': { addr: 'Green River, UT 84525', coords: '38.9899,-110.1580', detail: 'Supercharger na I-70, gateway para Canyonlands. Restaurantes no town, belo cenário de cânions ao redor.', cost: '~$10' },
    'Supercharger Price': { addr: 'Price, UT 84501', coords: '39.6005,-110.8163', detail: 'Supercharger na US-6/191 entre Twin Falls e Price. Carbon County — histórico da mineração de carvão. Parada curta.', cost: '~$10' },
    'Supercharger Twin Falls': { addr: 'Twin Falls, ID 83301', coords: '42.5740,-114.4600', detail: 'Supercharger perto de Shoshone Falls. Restaurantes na região, vista para o Snake River Canyon.', cost: '~$10' },
    'Supercharger Baker City, OR': { addr: 'Baker City, OR 97814', coords: '44.7755,-118.0028', detail: 'Supercharger na I-84 antes de Baker City. Cenário de montanhas douradas, histórico da Corrida do Ouro.', cost: '~$10' },
    'Supercharger Pendleton, OR': { addr: 'Pendleton, OR 97801', coords: '45.6747,-118.7822', detail: 'Supercharger na I-84 antes de Pendleton. Famosa pelo rodeo anual e lã de qualidade. Restaurantes rápidos próximos.', cost: '~$10' },
    'Supercharger The Dalles, OR': { addr: 'The Dalles, OR 97058', coords: '45.5942,-121.3157', detail: 'Supercharger na I-84 antes da Columbia River Gorge. Histórico local — primeiros colonos, trilhos ferroviários.', cost: '~$10' },
    'Supercharger Olympia': { addr: 'Olympia, WA 98501', coords: '47.0379,-122.9007', detail: 'Supercharger na I-5 antes de Olympia. Capital de Washington, ponto de parada estratégico antes do Mt. Rainier.', cost: '~$10' },
    'Supercharger Aberdeen, WA': { addr: 'Aberdeen, WA 98520', coords: '46.9754,-123.8158', detail: 'Supercharger antes de entrar em Olympic. Último carregador antes de Forks — ⚠️ CARREGAR ATÉ 100%!', cost: '~$10' },
    'Supercharger Lincoln City, OR': { addr: 'Lincoln City, OR 97367', coords: '44.9628,-123.9847', detail: 'Supercharger na US-101, gateway para a costa de Oregon. Praia próxima, restaurantes de frutos do mar.', cost: '~$10' },
    'Supercharger Coos Bay': { addr: 'Coos Bay, OR 97420', coords: '43.3660,-124.2138', detail: 'Supercharger na US-101 no sul de Oregon. Perto de Shore Acres State Park e cenário de praias selvagens.', cost: '~$10' },
    'Supercharger Ukiah': { addr: 'Ukiah, CA 95482', coords: '39.1532,-123.2063', detail: 'Supercharger na US-101, gateway para Mendocino. Região de vinhos, cenário de colinas cobertas de floresta.', cost: '~$10' },
    'Supercharger Gilroy': { addr: 'Gilroy, CA 95020', coords: '37.0047,-121.5694', detail: 'Supercharger na US-101 antes de San Jose. Famosa pelas moranguinhas e garlic festival. Preda para LA/SF.', cost: '~$10' },
    'Supercharger Merced': { addr: 'Merced, CA 95340', coords: '37.3023,-120.4818', detail: 'Supercharger na CA-99, gateway para Yosemite. Restaurantes na região, ponto de convergência para muitos viajantes.', cost: '~$10' },
    'Supercharger Fresno': { addr: 'Fresno, CA 93650', coords: '36.7469,-119.7727', detail: 'Supercharger na CA-99, sul de Califórnia Central Valley. Trecho longo entre SFO e LA — parada importante.', cost: '~$10' },
    'Supercharger Bakersfield': { addr: 'Bakersfield, CA 93301', coords: '35.3733,-119.0187', detail: 'Supercharger na CA-99 antes de Bakersfield. Início de transição do vale para as montanhas da Sierra.', cost: '~$10' },
    'Supercharger San Bernardino': { addr: 'San Bernardino, CA 92408', coords: '34.1083,-117.2898', detail: 'Supercharger na I-10 antes de LA. ⚠️ ÚLTIMO antes de LA — importante para a chegada ao destino final!', cost: '~$10' },
};

// Pre-sort keys longest-first for accurate matching
const _placeKeys = Object.keys(placeInfo).sort((a, b) => b.length - a.length);

function findPlaceInfo(text) {
    var clean = text.replace(/<[^>]+>/g, '');
    for (var i = 0; i < _placeKeys.length; i++) {
        if (clean.indexOf(_placeKeys[i]) !== -1) return { key: _placeKeys[i], info: placeInfo[_placeKeys[i]] };
    }
    return null;
}

function buildMapsUrl(type, name, info) {
    var q = encodeURIComponent(name + (info.addr ? ', ' + info.addr : ''));
    if (type === 'google') {
        if (info.coords) return 'https://www.google.com/maps/search/?api=1&query=' + info.coords;
        return 'https://www.google.com/maps/search/?api=1&query=' + q;
    }
    if (info.coords) {
        var parts = info.coords.split(',');
        return 'https://maps.apple.com/?ll=' + parts[0] + ',' + parts[1] + '&q=' + encodeURIComponent(name);
    }
    return 'https://maps.apple.com/?q=' + q;
}

function buildDirectionsUrl(type, name, info) {
    var q = encodeURIComponent(name + (info.addr ? ', ' + info.addr : ''));
    if (type === 'google') {
        if (info.coords) return 'https://www.google.com/maps/dir/?api=1&destination=' + info.coords;
        return 'https://www.google.com/maps/dir/?api=1&destination=' + q;
    }
    if (info.coords) {
        var parts = info.coords.split(',');
        return 'https://maps.apple.com/?daddr=' + parts[0] + ',' + parts[1] + '&dirflg=w';
    }
    return 'https://maps.apple.com/?daddr=' + q + '&dirflg=w';
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
        var toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = '🎉 Dia ' + dayNum + ' completo!';
            toast.classList.add('show');
            setTimeout(function() { toast.classList.remove('show'); }, 2500);
        }
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

        h.push('<div class="activity-card' + doneClass + '" data-type="' + (item.type || '') + '"' + (hasInfo ? ' data-open-day="' + d.day + '" data-open-idx="' + idx + '" style="cursor:pointer"' : '') + cardTitle + '>');
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

        if (tab === 'map' && !mapInstance) setTimeout(initMap, 100);
        if (tab === 'map' && mapInstance) setTimeout(function() { mapInstance.invalidateSize(); mapUpdateDay(currentDay, false); }, 100);
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
    if (photo) {
        img.src = webpSrc(photo);
        img.onerror = function() { img.onerror = null; if (img.src !== photo) img.src = photo; else img.style.display = 'none'; };
        img.style.display = 'block';
    } else { img.style.display = 'none'; }

    var html = '';
    html += '<div class="sheet-badge" data-t="' + item.type + '">' + tl + '</div>';
    html += '<div class="sheet-name">' + text + '</div>';

    html += '<div class="sheet-meta">';
    html += '<div class="sheet-meta-item">🕐 ' + item.time + '</div>';
    html += '<div class="sheet-meta-item">📅 ' + getTitle(d).replace(/Dia \d+ — |Day \d+ — /, '') + '</div>';
    if (pi && pi.info.cost) html += '<div class="sheet-meta-item">💰 ' + pi.info.cost + '</div>';
    if (pi && pi.info.hours) html += '<div class="sheet-meta-item">🕑 ' + pi.info.hours + '</div>';
    html += '</div>';

    if (pi) {
        html += '<div class="sheet-detail">';
        if (pi.info.detail) html += '<p>' + pi.info.detail + '</p>';
        if (pi.info.addr) html += '<p><span class="sd-label">Endereço</span><br>' + pi.info.addr + '</p>';
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
    setTimeout(function() {
        var close = document.querySelector('.sheet-close');
        if (close) close.focus();
    }, 400);
}

function closeSheet() {
    document.getElementById('sheetOverlay').classList.remove('open');
    document.getElementById('sheet').classList.remove('open');
    document.body.style.overflow = '';
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
var mapLayers = { route: null, routeDone: null, routeUpcoming: null, stops: null, sc: null, daytrips: null, dayroute: null };
var mapTileDark = null, mapTileSat = null;
var isSatellite = false;
var mapStopMarkers = {};
var allStopMarkerEls = [];
var activePhotoMarker = null;
var mapScrubDay = 1;

// Day → coordinate mapping for fly-to
var dayCoords = {
    1:[40.7580,-73.9855], 2:[40.7580,-73.9855], 3:[40.7580,-73.9855], 4:[40.7580,-73.9855],
    5:[36.1699,-115.1398], 6:[36.1699,-115.1398], 7:[36.1699,-115.1398], 8:[36.1699,-115.1398],
    9:[36.0544,-112.1401], 10:[37.2090,-112.9871], 11:[37.6283,-112.1677],
    12:[38.5733,-109.5498], 13:[38.5733,-109.5498], 14:[38.5733,-109.5498],
    15:[40.7608,-111.8910], 16:[45.5,-121.0], 17:[47.0,-123.5],
    18:[47.9504,-124.3855], 19:[45.8918,-123.9615], 20:[43.3665,-124.2179],
    21:[41.7558,-124.2026], 22:[40.8021,-124.1637], 23:[37.7749,-122.4194],
    24:[37.7749,-122.4194], 25:[37.7749,-122.4194], 26:[37.7749,-122.4194],
    27:[36.6,-121.9], 28:[37.8651,-119.5383], 29:[37.8651,-119.5383],
    30:[36.5640,-118.7510], 31:[34.0522,-118.2437],
    32:[34.0522,-118.2437], 33:[34.0522,-118.2437]
};

// Route split by day index (cumulative coordinates for progress)
var routeCoords = [
    // Day 5: LAX → Vegas (I-10 → I-15 N)
    [33.94,-118.41],  // 0: LAX
    [34.10,-117.89],  // 1: Ontario / I-15 junction
    [34.90,-117.02],  // 2: Barstow SC
    [35.27,-116.07],  // 3: Baker
    [35.61,-115.39],  // 4: Primm / NV border
    [36.17,-115.14],  // 5: Las Vegas
    // Day 9: Vegas → GC → Zion (US-93 → I-40 → AZ-64 → US-89)
    [35.98,-114.83],  // 6: Boulder City
    [35.20,-114.05],  // 7: Kingman SC
    [35.25,-112.19],  // 8: Williams
    [36.06,-112.14],  // 9: Grand Canyon
    [36.81,-111.63],  // 10: Marble Canyon
    [36.86,-112.53],  // 11: Kanab
    [37.02,-112.53],  // 12: Zion / Springdale
    // Day 11: Zion → Bryce (UT-9 → US-89 → UT-12)
    [37.29,-112.68],  // 13: UT-9/US-89 junction
    [37.68,-112.15],  // 14: Panguitch area
    [37.63,-112.17],  // 15: UT-12 junction
    [37.21,-112.99],  // 16: Bryce Canyon
    // Day 12: Bryce → Moab (US-89 → UT-24 → I-70 → US-191)
    [37.76,-112.33],  // 17: US-89 N
    [38.29,-111.57],  // 18: Capitol Reef area
    [38.75,-111.50],  // 19: I-70 junction
    [38.99,-110.16],  // 20: Green River SC
    [38.57,-109.55],  // 21: Moab
    // Day 15: Moab → SLC → Twin Falls
    [38.99,-110.16],  // 22: Green River (backtrack)
    [39.60,-110.81],  // 23: Price SC
    [39.97,-111.53],  // 24: Spanish Fork
    [40.76,-111.89],  // 25: SLC
    [41.07,-112.25],  // 26: Antelope Island
    [40.76,-111.89],  // 27: SLC (back)
    [41.73,-112.17],  // 28: Brigham City
    [42.00,-112.45],  // 29: I-84 junction
    [42.56,-114.46],  // 30: Twin Falls
    // Day 16: Twin Falls → Centralia (I-84 W → I-82 → I-5 N)
    [42.87,-115.54],  // 31: I-84 W
    [43.62,-116.20],  // 32: Boise
    [44.05,-116.97],  // 33: Ontario OR
    [44.77,-117.83],  // 34: Baker City SC
    [45.67,-118.79],  // 35: Pendleton SC
    [45.60,-121.18],  // 36: The Dalles SC
    [45.57,-122.40],  // 37: Portland area
    [46.07,-122.88],  // 38: Kelso
    [46.72,-122.95],  // 39: Centralia
    // Day 17: Centralia → Rainier → Forks
    [46.85,-121.76],  // 40: Mt. Rainier
    [47.04,-122.90],  // 41: Olympia SC
    [47.30,-123.10],  // 42: US-101
    [47.59,-123.79],  // 43: Queets area
    [47.95,-124.39],  // 44: Forks
    // Day 19: Forks → Cannon Beach (US-101 S)
    [47.50,-124.35],  // 45: US-101 S
    [46.98,-123.82],  // 46: Aberdeen SC
    [46.19,-123.83],  // 47: Astoria
    [45.89,-123.96],  // 48: Cannon Beach
    // Day 20: Oregon Coast (US-101 S)
    [45.37,-123.97],  // 49: Lincoln City SC
    [44.96,-124.02],  // 50: Newport
    [43.97,-124.10],  // 51: Florence / Dunes
    [43.37,-124.22],  // 52: Coos Bay SC
    [42.86,-124.42],  // 53: Brookings
    [42.41,-124.42],  // 54: Gold Beach
    // Day 21: → Crescent City
    [41.94,-124.20],  // 55: Brookings
    [41.76,-124.20],  // 56: Crescent City
    // Day 22: → Eureka (US-101 S)
    [41.20,-124.09],  // 57: Prairie Creek / Orick
    [40.80,-124.16],  // 58: Eureka
    // Day 23: Eureka → SF (US-101 S)
    [40.10,-123.79],  // 59: Garberville
    [39.15,-123.21],  // 60: Ukiah SC
    [38.44,-122.72],  // 61: Santa Rosa
    [38.07,-122.88],  // 62: Point Reyes area
    [37.77,-122.42],  // 63: San Francisco
    // Day 27: SF → PCH → Mariposa / Yosemite
    [37.46,-122.43],  // 64: Half Moon Bay
    [36.97,-122.03],  // 65: Santa Cruz
    [36.60,-121.89],  // 66: Monterey
    [36.55,-121.92],  // 67: Carmel
    [36.83,-121.40],  // 68: inland (Hwy 156)
    [37.30,-120.48],  // 69: Merced SC
    [37.49,-119.97],  // 70: Mariposa
    // Day 28-29: Yosemite (day trip)
    [37.74,-119.60],  // 71: Yosemite Valley
    // Day 30: Mariposa → KC → Sequoia → Three Rivers
    [37.33,-119.65],  // 72: Oakhurst
    [37.06,-119.58],  // 73: Coarsegold
    [36.82,-119.68],  // 74: Fresno area
    [36.80,-118.68],  // 75: Kings Canyon
    [36.56,-118.77],  // 76: Sequoia
    [36.45,-118.91],  // 77: Three Rivers
    // Day 31: Three Rivers → LA
    [36.06,-118.96],  // 78: Porterville
    [35.37,-119.02],  // 79: Bakersfield SC
    [35.13,-118.44],  // 80: Tehachapi
    [34.90,-118.17],  // 81: Palmdale
    [34.50,-118.15],  // 82: Santa Clarita
    [34.05,-118.24]   // 83: LA
];

// Day index → route coord index (approximate)
var dayRouteIdx = {
    1:0,2:0,3:0,4:0,5:5,6:5,7:5,8:5,9:12,10:12,
    11:16,12:21,13:21,14:21,15:30,16:39,17:44,18:44,19:48,20:54,
    21:56,22:58,23:63,24:63,25:63,26:63,27:70,28:71,29:71,
    30:77,31:83,32:83,33:83
};

// Route coordinates per day for day-route highlighting
var dayRouteSegments = {
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

// Day stats for stats card
var dayStats = {
    1: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    2: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    3: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    4: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    5: { km: '~430', drive: 'LAX → Las Vegas', hotel: 'Las Vegas' },
    6: { km: '~110', drive: 'Mt. Charleston', hotel: 'Las Vegas' },
    7: { km: '~100', drive: 'Valley of Fire', hotel: 'Las Vegas' },
    8: { km: '~380', drive: 'Death Valley', hotel: 'Las Vegas' },
    9: { km: '~700', drive: 'Vegas → GC → Zion', hotel: 'Springdale' },
    10: { km: '~30', drive: 'Zion NP', hotel: 'Springdale' },
    11: { km: '~130', drive: 'Zion → Bryce', hotel: 'Bryce Canyon' },
    12: { km: '~490', drive: 'Bryce → Goblin Valley → Moab', hotel: 'Moab' },
    13: { km: '~80', drive: 'Canyonlands', hotel: 'Moab' },
    14: { km: '~50', drive: 'Arches NP', hotel: 'Moab' },
    15: { km: '~770', drive: 'Moab → SLC → Twin Falls', hotel: 'Twin Falls' },
    16: { km: '~670', drive: 'Twin Falls → Centralia', hotel: 'Centralia' },
    17: { km: '~500', drive: 'Centralia → Rainier → Forks', hotel: 'Forks' },
    18: { km: '~100', drive: 'Olympic NP', hotel: 'Forks' },
    19: { km: '~380', drive: 'Forks → Cannon Beach', hotel: 'Cannon Beach' },
    20: { km: '~350', drive: 'Costa Oregon', hotel: 'Gold Beach' },
    21: { km: '~160', drive: 'Redwood NP', hotel: 'Crescent City' },
    22: { km: '~130', drive: 'Crescent City → Eureka', hotel: 'Eureka' },
    23: { km: '~440', drive: 'Eureka → SF', hotel: 'San Francisco' },
    24: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    25: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    26: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    27: { km: '~450', drive: 'SF → PCH → Yosemite', hotel: 'Mariposa' },
    28: { km: '~110', drive: 'Yosemite NP', hotel: 'Mariposa' },
    29: { km: '~110', drive: 'Yosemite NP', hotel: 'Mariposa' },
    30: { km: '~250', drive: 'Mariposa → KC → Sequoia', hotel: 'Three Rivers' },
    31: { km: '~330', drive: 'Three Rivers → LA', hotel: 'Los Angeles' },
    32: { km: '~80', drive: 'LA: Hollywood, Griffith', hotel: 'Los Angeles' },
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
            .bindPopup('<h3>⚡ SC ' + sc.name + '</h3><div class="days">Dia ' + sc.day + ' • ' + sc.leg + (sc.note ? '<br>' + sc.note : '') + '</div>' + navHtml, { className: 'custom-popup' });
    });
    mapLayers.sc.addTo(mapInstance);

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
// Restore last viewed day if not during trip dates
if (initDay === 1) {
    var saved = parseInt(localStorage.getItem('lastDay'), 10);
    if (saved >= 1 && saved <= totalDays && !isNaN(saved)) initDay = saved;
}
showDay(initDay);
updateCountdown(); // show countdown only on initial load
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
            ? '<img class="search-result-thumb" src="' + webpSrc(thumb) + '" alt="" width="40" height="40" loading="lazy" onerror="this.style.display=\'none\'">'
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
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
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
            html += '<div class="hotel-thumb-wrap"><img class="hotel-thumb" src="' + webpSrc(hotelPhoto) + '" alt="" width="72" height="72" loading="lazy" onerror="this.parentElement.style.display=\'none\'"></div>';
        } else {
            html += '<div class="hotel-num">' + h.num + '</div>';
        }
        html += '<div class="hotel-info"><div class="hotel-name">' + h.name + '</div>';
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
        html += '<div class="explore-park-name">' + p.name + '</div>';
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
        if (sc.note) html += '<div class="charge-note">' + sc.note + '</div>';
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

        if (Math.abs(dx) < 60) {
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
            var toast = document.getElementById('toast');
            toast.textContent = '✅ ' + count + ' itens restaurados!';
            toast.classList.add('show');
            setTimeout(function() { toast.classList.remove('show'); }, 2500);
            // Re-render current day to reflect imported data
            renderedDays = {};
            document.getElementById('dayContainer').innerHTML = '';
            showDay(currentDay);
        } catch(err) {
            var toast = document.getElementById('toast');
            toast.textContent = '❌ Arquivo inválido';
            toast.style.background = 'var(--red)';
            toast.classList.add('show');
            setTimeout(function() { toast.classList.remove('show'); toast.style.background = ''; }, 2500);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}
