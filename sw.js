const CACHE_NAME = 'viagem-eua-2027-v48';
const TILE_CACHE = 'viagem-tiles-v1';

// Critical assets — must succeed for install
const CRITICAL_ASSETS = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './lib/leaflet.js',
  './lib/leaflet.css',
  './lib/marker-icon.png',
  './lib/marker-icon-2x.png',
  './lib/marker-shadow.png',
  './fonts/inter.woff2',
];

// ALL assets precached on install (full offline mode)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  // Local libraries
  './lib/leaflet.js',
  './lib/leaflet.css',
  './lib/marker-icon.png',
  './lib/marker-icon-2x.png',
  './lib/marker-shadow.png',
  './fonts/inter.woff2',
  // Day photos
  './img/dia-01.jpg',
  './img/dia-02.jpg',
  './img/dia-03.jpg',
  './img/dia-04.jpg',
  './img/dia-05.jpg',
  './img/dia-06.jpg',
  './img/dia-07.jpg',
  './img/dia-08.jpg',
  './img/dia-09.jpg',
  './img/dia-10.jpg',
  './img/dia-11.jpg',
  './img/dia-12.jpg',
  './img/dia-13.jpg',
  './img/dia-14.jpg',
  './img/dia-15.jpg',
  './img/dia-16.jpg',
  './img/dia-17.jpg',
  './img/dia-18.jpg',
  './img/dia-19.jpg',
  './img/dia-20.jpg',
  './img/dia-21.jpg',
  './img/dia-22.jpg',
  './img/dia-23.jpg',
  './img/dia-24.jpg',
  './img/dia-25.jpg',
  './img/dia-26.jpg',
  './img/dia-27.jpg',
  './img/dia-28.jpg',
  './img/dia-29.jpg',
  './img/dia-30.jpg',
  './img/dia-31.jpg',
  './img/dia-32.jpg',
  './img/dia-33.jpg',
  './img/dia-34.jpg',
  // Activity photos
  './img/activities/5th_avenue.jpg',
  './img/activities/7_world_trade_center.jpg',
  './img/activities/9_11_memorial.jpg',
  './img/activities/angels_landing.jpg',
  './img/activities/antelope_island.jpg',
  './img/activities/artists_palette.jpg',
  './img/activities/astoria.jpg',
  './img/activities/astoria_megler_bridge.jpg',
  './img/activities/aztec_butte.jpg',
  './img/activities/badger_pass.jpg',
  './img/activities/badwater_basin.jpg',
  './img/activities/balanced_rock.jpg',
  './img/activities/basque_block.jpg',
  './img/activities/bellagio_fountains.jpg',
  './img/activities/bethesda_fountain.jpg',
  './img/activities/biblioteca_p_blica.jpg',
  './img/activities/big_tree_wayside.jpg',
  './img/activities/boise_river.jpg',
  './img/activities/bow_bridge.jpg',
  './img/activities/bridalveil_fall.jpg',
  './img/activities/bright_angel_trail.jpg',
  './img/activities/brooklyn_bridge.jpg',
  './img/activities/brooklyn_bridge_park.jpg',
  './img/activities/bryant_park.jpg',
  './img/activities/bryce_canyon.jpg',
  './img/activities/bryce_point.jpg',
  './img/activities/cable_car.jpg',
  './img/activities/calico_tanks.jpg',
  './img/activities/cannon_beach.jpg',
  './img/activities/canyon_overlook.jpg',
  './img/activities/cape_blanco.jpg',
  './img/activities/cape_perpetua.jpg',
  './img/activities/carson_mansion.jpg',
  './img/activities/central_park.jpg',
  './img/activities/charging_bull.jpg',
  './img/activities/chelsea_market.jpg',
  './img/activities/chinatown_de_sf.jpg',
  './img/activities/chinatown_ny.jpg',
  './img/activities/columbia_river_gorge.jpg',
  './img/activities/coney_island.jpg',
  './img/activities/congress_trail.jpg',
  './img/activities/cooks_meadow.jpg',
  './img/activities/court_of_patriarchs.jpg',
  './img/activities/crescent_meadow.jpg',
  './img/activities/crissy_field.jpg',
  './img/activities/dante_s_view.jpg',
  './img/activities/dead_horse_point.jpg',
  './img/activities/delicate_arch.jpg',
  './img/activities/desert_view_watchtower.jpg',
  './img/activities/double_arch.jpg',
  './img/activities/dumbo.jpg',
  './img/activities/eataly_nyc.jpg',
  './img/activities/ecola_state_park.jpg',
  './img/activities/el_capitan.jpg',
  './img/activities/el_matador_beach.jpg',
  './img/activities/elephant_rock.jpg',
  './img/activities/embarcadero_sf.jpg',
  './img/activities/emerald_pools.jpg',
  './img/activities/ess_a_bagel.jpg',
  './img/activities/fao_schwarz.jpg',
  './img/activities/fearless_girl.jpg',
  './img/activities/fern_canyon.jpg',
  './img/activities/fiery_furnace.jpg',
  './img/activities/fire_wave.jpg',
  './img/activities/fishermans_wharf.jpg',
  './img/activities/flatiron.jpg',
  './img/activities/forks_washington.jpg',
  './img/activities/fort_point.jpg',
  './img/activities/general_grant.jpg',
  './img/activities/general_sherman_tree.jpg',
  './img/activities/ghostbusters.jpg',
  './img/activities/gold_beach_or.jpg',
  './img/activities/gold_bluffs_beach.jpg',
  './img/activities/golden_gate_bridge.jpg',
  './img/activities/grand_canyon.jpg',
  './img/activities/grand_central_terminal.jpg',
  './img/activities/grand_view_point.jpg',
  './img/activities/grandview_point.jpg',
  './img/activities/great_salt_lake.jpg',
  './img/activities/green_river_overlook.jpg',
  './img/activities/griffith_observatory.jpg',
  './img/activities/haight_ashbury.jpg',
  './img/activities/half_dome.jpg',
  './img/activities/hall_of_mosses.jpg',
  './img/activities/haystack_rock.jpg',
  './img/activities/heceta_head.jpg',
  './img/activities/hells_kitchen.jpg',
  './img/activities/high_line.jpg',
  './img/activities/hoh_rain_forest.jpg',
  './img/activities/hollywood_sign.jpg',
  './img/activities/hopi_point.jpg',
  './img/activities/hudson_yards.jpg',
  './img/activities/idaho_state_capitol.jpg',
  './img/activities/in_n_out_burger.jpg',
  './img/activities/inspiration_point_bryce.jpg',
  './img/activities/janes_carousel.jpg',
  './img/activities/joes_pizza.jpg',
  './img/activities/julianas_pizza.jpg',
  './img/activities/juniors_cheesecake.jpg',
  './img/activities/katz_s_deli.jpg',
  './img/activities/kings_canyon.jpg',
  './img/activities/la_push.jpg',
  './img/activities/la_taqueria.jpg',
  './img/activities/lady_bird_johnson_grove.jpg',
  './img/activities/lake_crescent.jpg',
  './img/activities/landscape_arch.jpg',
  './img/activities/las_vegas_strip_night.jpg',
  './img/activities/lego_store_ny.jpg',
  './img/activities/levain_bakery.jpg',
  './img/activities/little_island.jpg',
  './img/activities/little_italy_ny.jpg',
  './img/activities/lombard_street.jpg',
  './img/activities/macys_herald_square.jpg',
  './img/activities/malibu_pch.jpg',
  './img/activities/marriott_marquis.jpg',
  './img/activities/marymere_falls.jpg',
  './img/activities/mather_point.jpg',
  './img/activities/mesa_arch.jpg',
  './img/activities/mesquite_flat_sand_dunes.jpg',
  './img/activities/met.jpg',
  './img/activities/mirror_lake.jpg',
  './img/activities/mission_district.jpg',
  './img/activities/moma.jpg',
  './img/activities/moro_rock.jpg',
  './img/activities/mt__rainier.jpg',
  './img/activities/muir_woods.jpg',
  './img/activities/multnomah_falls.jpg',
  './img/activities/muscle_beach.jpg',
  './img/activities/nathans_famous.jpg',
  './img/activities/natural_bridge_bryce.jpg',
  './img/activities/natural_bridges.jpg',
  './img/activities/natural_history_museum.jpg',
  './img/activities/navajo_loop.jpg',
  './img/activities/newport_oregon.jpg',
  './img/activities/newton_b_drury.jpg',
  './img/activities/nintendo_ny.jpg',
  './img/activities/nisqually_vista.jpg',
  './img/activities/north_beach_sf.jpg',
  './img/activities/ny_public_library.jpg',
  './img/activities/oculus.jpg',
  './img/activities/olympia_wa.jpg',
  './img/activities/one_world_observatory.jpg',
  './img/activities/painted_ladies.jpg',
  './img/activities/park_avenue_arches.jpg',
  './img/activities/parus_trail.jpg',
  './img/activities/pier_39.jpg',
  './img/activities/pier_57_nyc.jpg',
  './img/activities/point_reyes.jpg',
  './img/activities/prairie_creek.jpg',
  './img/activities/queens_garden.jpg',
  './img/activities/rainbow_point_bryce.jpg',
  './img/activities/red_canyon_ut.jpg',
  './img/activities/red_rock_canyon.jpg',
  './img/activities/rialto_beach.jpg',
  './img/activities/riverside_walk_zion.jpg',
  './img/activities/roaring_river_falls.jpg',
  './img/activities/rockefeller_center.jpg',
  './img/activities/roosevelt_island_tramway.jpg',
  './img/activities/ruby_beach.jpg',
  './img/activities/russ_and_daughters.jpg',
  './img/activities/samuel_boardman.jpg',
  './img/activities/santa_monica_pier.jpg',
  './img/activities/sausalito.jpg',
  './img/activities/sentinel_bridge.jpg',
  './img/activities/seven_magic_mountains.jpg',
  './img/activities/shake_shack.jpg',
  './img/activities/shore_acres.jpg',
  './img/activities/shoshone_falls.jpg',
  './img/activities/soho.jpg',
  './img/activities/sol_duc_falls.jpg',
  './img/activities/st__patrick.jpg',
  './img/activities/st_patricks_cathedral.jpg',
  './img/activities/stout_memorial_grove.jpg',
  './img/activities/strawberry_fields.jpg',
  './img/activities/summit_one_vanderbilt.jpg',
  './img/activities/sunrise_point_bryce.jpg',
  './img/activities/swinging_bridge_yosemite.jpg',
  './img/activities/tall_trees_grove.jpg',
  './img/activities/test_gg.jpg',
  './img/activities/the_plaza_hotel.jpg',
  './img/activities/the_vessel_nyc.jpg',
  './img/activities/thor_s_well.jpg',
  './img/activities/times_square.jpg',
  './img/activities/trinity_church.jpg',
  './img/activities/tunnel_view.jpg',
  './img/activities/union_square_sf.jpg',
  './img/activities/upheaval_dome.jpg',
  './img/activities/valley_of_fire.jpg',
  './img/activities/valley_view_yosemite.jpg',
  './img/activities/venice_beach.jpg',
  './img/activities/vernal_fall.jpg',
  './img/activities/washington_square.jpg',
  './img/activities/weeping_rock.jpg',
  './img/activities/welcome_to_las_vegas.jpg',
  './img/activities/white_domes.jpg',
  './img/activities/white_rim_overlook.jpg',
  './img/activities/windows_arches.jpg',
  './img/activities/yavapai_point.jpg',
  './img/activities/yosemite_chapel.jpg',
  './img/activities/yosemite_falls_lower.jpg',
  './img/activities/zabriskie_point.jpg',
  './img/activities/zumwalt_meadow.jpg',
];

// Install: precache critical assets, then best-effort images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Critical assets must all succeed
      await cache.addAll(CRITICAL_ASSETS);
      // Images: best-effort — don't block install if one fails
      const images = ASSETS_TO_CACHE.filter(a => a.includes('/img/'));
      await Promise.allSettled(
        images.map(async (url) => {
          try { await cache.add(url); } catch (e) { console.warn('SW: skip', url); }
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches (preserve tile cache)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME && key !== TILE_CACHE).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for everything, cache map tiles on demand
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Map tiles: cache on first load in dedicated tile cache
  if (url.hostname.includes('basemaps.cartocdn.com') || url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.open(TILE_CACHE).then((cache) => {
        return cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => new Response('', { status: 404 }));
        });
      })
    );
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache any new local assets on the fly
        if (response.ok && url.origin === self.location.origin) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        // Offline placeholder for images
        if (event.request.destination === 'image') {
          return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>', { headers: { 'Content-Type': 'image/svg+xml' } });
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
