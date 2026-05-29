// ==================== GLOBAL ERROR HANDLER ====================
window.addEventListener('error', function(e) {
    console.error('[App Error]', e.message, e.filename, e.lineno);
});
window.addEventListener('unhandledrejection', function(e) {
    console.error('[Unhandled Promise]', e.reason);
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

    // Day 20 — Multnomah / Columbia / Boise
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

    // Day 31 — LA
    'LA': { addr: 'Los Angeles, CA 90012', coords: '34.0522,-118.2437', detail: 'A Cidade dos Anjos! Segunda maior cidade dos EUA, capital do cinema e do entretenimento.' },
    'Santa Monica': { addr: 'Santa Monica, CA 90401', coords: '34.0195,-118.4912', detail: 'Cidade praiana com o icônico píer, roda-gigante, 3rd Street Promenade (shopping a céu aberto) e ciclovia à beira-mar.' },
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
        html += '<button class="day-pill ' + r + '" data-d="' + i + '" onclick="showDay(' + i + ')" aria-label="Dia ' + i + ' — ' + dateStr + ' — ' + loc + '" title="' + loc + '"><span class="pill-date">' + dateStr + '</span><span class="pill-label">' + short + '</span><span class="pill-dot"></span></button>';
    }
    el.innerHTML = html;
}

// ==================== RENDER SIDEBAR (desktop) ====================
function renderSidebar() {
    var el = document.getElementById('homeSidebar');
    if (!el) return;
    var html = '<div style="padding:12px 16px;font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em">Dias</div>';
    for (var i = 1; i <= totalDays; i++) {
        var d = days[i-1];
        var loc = d ? d.location.replace(/ dia cheio| 🌲| 🌊| 🌅| 🧛| 🏜️| ✈️| 🎰| ❤️/g, '').split(' → ').pop().split(' — ').pop().trim() : '';
        var dt = new Date(TRIP_START); dt.setDate(dt.getDate() + i - 1);
        var dateStr = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0');
        html += '<div class="sidebar-item" data-sd="' + i + '" onclick="showDay(' + i + ')"><span class="sidebar-day">' + dateStr + '</span><span class="sidebar-loc">' + loc + '</span></div>';
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
    h.push('<div class="day-info"><div style="display:flex;align-items:center;justify-content:space-between"><h2>' + getTitle(d) + '</h2><button class="share-day-btn" onclick="shareDay(' + d.day + ')" aria-label="Compartilhar dia">📤</button></div>');
    h.push('<div class="day-route">📍 ' + d.location + ' — ' + getRoute(d) + '</div>');
    h.push('<div class="day-note">' + getNote(d) + '</div>');
    h.push(getWeatherCard(d));
    h.push('</div>');

    // Progress counter
    h.push('<div class="day-progress"><span id="day-progress-' + d.day + '">0/' + d.items.length + '</span> concluídos <button type="button" class="toggle-done-btn" id="toggleDone-' + d.day + '" onclick="toggleHideDone(' + d.day + ')" aria-label="Esconder concluídos">👁️ Esconder</button></div>');

    h.push('<div class="activity-grid">');
    var currentPeriod = '';
    d.items.forEach(function(item, idx) {
        var hour = parseInt(item.time.replace('~', '')) || 0;
        var period = hour < 12 ? 'manha' : hour < 17 ? 'tarde' : 'noite';
        var periodLabels = { manha: '☀️ Manhã', tarde: '🌤️ Tarde', noite: '🌙 Noite' };
        if (period !== currentPeriod) {
            currentPeriod = period;
            h.push('<div class="time-group-label">' + periodLabels[period] + '</div>');
        }
        var text = getItemText(d, idx);
        var plainText = text.replace(/<[^>]+>/g, '');
        var photo = findPhoto(item.text);
        var tl = typeLabel[item.type] || '📍 Local';

        var placeData = findPlaceInfo(item.text);
        var hasInfo = !!placeData;
        var cardTitle = placeData && placeData.info.detail ? ' title="' + placeData.info.detail.replace(/"/g, '&quot;').substring(0, 150) + '"' : '';
        var click = hasInfo ? ' onclick="openDetail(' + d.day + ',' + idx + ')" style="cursor:pointer"' : '';
        var doneClass = isChecked(d.day, idx) ? ' item-done' : '';

        h.push('<div class="activity-card' + doneClass + '" data-type="' + item.type + '"' + click + cardTitle + '>');
        if (photo) {
            h.push('<picture>');
            h.push('<source type="image/webp" srcset="' + webpSrc400(photo) + ' 400w, ' + webpSrc(photo) + ' 800w" sizes="(max-width:768px) 400px, 800px">');
            h.push('<img class="activity-card-photo" src="' + photo + '" alt="' + plainText.replace(/"/g, '&quot;') + '" width="400" height="200" loading="lazy" decoding="async" onload="this.classList.add(\'loaded\')" onerror="this.style.display=\'none\'"' + (hasInfo ? ' onclick="event.stopPropagation();openDetail(' + d.day + ',' + idx + ')"' : ' onclick="event.stopPropagation();openLightbox(this.src,this.parentElement.querySelector(\'.activity-name\').textContent)"') + '>');
            h.push('</picture>');
        }
        if (hasInfo) h.push('<span class="detail-arrow">›</span>');
        h.push('<div class="activity-card-body">');
        h.push('<div class="activity-time">' + item.time + ' • ' + tl + (hasInfo ? ' • <span style="color:var(--blue)">ⓘ</span>' : '') + '</div>');
        h.push('<div class="activity-name">' + text + '</div>');
        h.push('<div class="card-actions">');
        h.push('<button type="button" class="card-action-btn' + (isChecked(d.day, idx) ? ' action-done' : '') + '" onclick="event.stopPropagation();toggleCheck(' + d.day + ',' + idx + ',event)" data-action-check="' + d.day + '-' + idx + '" aria-label="Marcar como concluído"></button>');
        h.push('<button type="button" class="card-action-btn' + (isFav(d.day, idx) ? ' action-fav-active' : '') + '" onclick="event.stopPropagation();toggleFav(' + d.day + ',' + idx + ',event)" data-action-fav="' + d.day + '-' + idx + '" aria-label="Favoritar"></button>');
        h.push('</div>');
        h.push('</div></div>');
    });
    h.push('</div>');

    // Day notes
    var noteVal = loadDayNote(d.day);
    h.push('<details class="day-notes-wrap"' + (noteVal ? ' open' : '') + '>');
    h.push('<summary class="day-notes-summary">📝 Notas pessoais</summary>');
    h.push('<textarea class="day-notes-textarea" id="daynote-' + d.day + '" placeholder="Adicione suas anotações para este dia..." oninput="saveDayNote(' + d.day + ')">' + noteVal.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>');
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
        document.getElementById('dayContainer').insertAdjacentHTML('beforeend',
            '<div class="day-slide" id="' + skelId + '" style="display:block;padding:0 20px 32px">' +
            '<div class="skeleton-card"><div class="skeleton-shimmer skeleton-photo"></div><div class="skeleton-shimmer skeleton-text w70"></div><div class="skeleton-shimmer skeleton-text w40"></div></div>' +
            '<div class="skeleton-card"><div class="skeleton-shimmer skeleton-photo"></div><div class="skeleton-shimmer skeleton-text w70"></div><div class="skeleton-shimmer skeleton-text w40"></div></div>' +
            '<div class="skeleton-card"><div class="skeleton-shimmer skeleton-photo"></div><div class="skeleton-shimmer skeleton-text w70"></div><div class="skeleton-shimmer skeleton-text w40"></div></div>' +
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
            html += '<button type="button" class="sheet-nav-btn btn-appmap" onclick="closeSheet();switchTab(\'map\',event);setTimeout(function(){if(mapInstance)mapInstance.flyTo([' + c[0] + ',' + c[1] + '],15)},500)">📌 Ver no Mapa</button>';
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
    5:[37.4849,-119.9663], 6:[37.8651,-119.5383], 7:[37.0,-119.3],
    8:[36.5640,-118.7510], 9:[36.1699,-115.1398], 10:[36.1699,-115.1398],
    11:[36.1699,-115.1398], 12:[36.1699,-115.1398], 13:[36.0544,-112.1401],
    14:[37.0215,-112.5263], 15:[37.2090,-112.9871], 16:[38.5733,-109.5498],
    17:[38.5733,-109.5498], 18:[38.5733,-109.5498], 19:[40.7608,-111.8910],
    20:[45.5,-121.0], 21:[47.0,-123.5], 22:[47.9504,-124.3855],
    23:[45.8918,-123.9615], 24:[43.3665,-124.2179], 25:[41.7558,-124.2026],
    26:[40.8021,-124.1637], 27:[37.7749,-122.4194], 28:[37.7749,-122.4194],
    29:[37.7749,-122.4194], 30:[36.0,-121.0], 31:[34.2,-118.8],
    32:[34.0522,-118.2437], 33:[34.0522,-118.2437]
};

// Route split by day index (cumulative coordinates for progress)
var routeCoords = [
    // Day 5: LAX → Mariposa (I-5 N → CA-99 N → CA-140 E) — west valley
    [33.94,-118.41],  // 0: LAX
    [34.30,-118.47],  // 1: I-5 through San Fernando
    [34.84,-118.87],  // 2: Lebec/Tejon Pass SC
    [35.40,-119.05],  // 3: I-5/CA-99 Bakersfield (west)
    [35.88,-119.30],  // 4: Delano (CA-99 N)
    [36.32,-119.65],  // 5: Tulare area
    [36.75,-119.82],  // 6: Fresno west (CA-99)
    [37.30,-120.48],  // 7: Merced SC
    [37.49,-119.97],  // 8: Mariposa
    // Days 6-7: Yosemite → Three Rivers — east valley via Clovis/Reedley
    [37.87,-119.54],  // 9: Yosemite Valley
    [37.33,-119.65],  // 10: Oakhurst SC (CA-41 S)
    [37.06,-119.58],  // 11: Coarsegold (CA-41 S)
    [36.82,-119.68],  // 12: Clovis/E. Fresno
    [36.60,-119.40],  // 13: Reedley/Dinuba (CA-63 S)
    [36.33,-119.29],  // 14: Visalia SC
    [36.45,-118.91],  // 15: Three Rivers
    // Day 9: Three Rivers → Vegas (CA-65 S → CA-58 E → I-15 NE)
    [36.06,-118.96],  // 16: Porterville (CA-65 S)
    [35.40,-118.98],  // 17: Bakersfield (east, CA-58)
    [35.13,-118.44],  // 18: Tehachapi Pass
    [35.05,-118.17],  // 19: Mojave
    [34.90,-117.02],  // 20: Barstow SC
    [35.27,-116.07],  // 21: Baker (I-15)
    [35.61,-115.39],  // 22: Primm/NV border
    [36.17,-115.14],  // 23: Las Vegas
    // Day 13: Vegas → GC → Zion (US-93 → I-40 → AZ-64 → US-89)
    [35.98,-114.83],  // 24: Boulder City
    [35.20,-114.05],  // 25: Kingman SC
    [35.25,-112.19],  // 26: Williams (I-40 E)
    [36.06,-112.14],  // 27: Grand Canyon
    [36.81,-111.63],  // 28: Marble Canyon (US-89A)
    [36.86,-112.53],  // 29: Kanab (US-89)
    [37.02,-112.53],  // 30: Zion/Springdale
    // Day 15: Zion → Bryce (UT-9 → US-89 → UT-12)
    [37.29,-112.68],  // 31: UT-9/US-89 junction
    [37.68,-112.15],  // 32: US-89 N (Panguitch area)
    [37.63,-112.17],  // 33: UT-12 junction
    [37.21,-112.99],  // 34: Bryce Canyon
    // Day 16: Bryce → Moab (US-89 → UT-24 → I-70 → US-191)
    [37.76,-112.33],  // 35: US-89 N
    [38.29,-111.57],  // 36: Capitol Reef/UT-24 area
    [38.75,-111.50],  // 37: I-70 junction
    [38.99,-110.16],  // 38: Green River SC
    [38.57,-109.55],  // 39: Moab
    // Day 19: Moab → SLC → Twin Falls
    [38.99,-110.16],  // 40: Green River (backtrack I-70)
    [39.60,-110.81],  // 41: Price SC (US-6 W)
    [39.97,-111.53],  // 42: Spanish Fork (US-6/I-15)
    [40.76,-111.89],  // 43: SLC
    [41.07,-112.25],  // 44: Antelope Island
    [40.76,-111.89],  // 45: SLC (back)
    [41.73,-112.17],  // 46: Brigham City (I-15 N)
    [42.00,-112.45],  // 47: I-84 W junction
    [42.56,-114.46],  // 48: Twin Falls
    // Day 20: Twin Falls → Centralia (I-84 W → I-82 → I-5 N)
    [42.87,-115.54],  // 49: I-84 W
    [43.62,-116.20],  // 50: Boise SC
    [44.05,-116.97],  // 51: Ontario, OR area
    [44.77,-117.83],  // 52: Baker City SC
    [45.67,-118.79],  // 53: Pendleton SC
    [45.60,-121.18],  // 54: The Dalles SC
    [45.57,-122.40],  // 55: Troutdale/Portland area
    [46.07,-122.88],  // 56: Kelso (I-5 N)
    [46.72,-122.95],  // 57: Centralia
    // Day 21: Centralia → Rainier → Forks
    [46.85,-121.76],  // 58: Mt. Rainier
    [47.04,-122.90],  // 59: Olympia SC
    [47.30,-123.10],  // 60: US-101 N
    [47.59,-123.79],  // 61: US-101 W (Queets area)
    [47.95,-124.39],  // 62: Forks
    // Day 23: Forks → Cannon Beach (US-101 S)
    [47.50,-124.35],  // 63: US-101 S
    [46.98,-123.82],  // 64: Aberdeen SC
    [46.19,-123.83],  // 65: Astoria
    [45.89,-123.96],  // 66: Cannon Beach
    // Day 24: Oregon Coast (US-101 S)
    [45.37,-123.97],  // 67: Lincoln City SC
    [44.96,-124.02],  // 68: Newport
    [43.97,-124.10],  // 69: Florence/Dunes
    [43.37,-124.22],  // 70: Coos Bay SC
    [42.86,-124.42],  // 71: Brookings area
    [42.41,-124.42],  // 72: Gold Beach
    // Day 25: → Crescent City
    [41.94,-124.20],  // 73: Brookings
    [41.76,-124.20],  // 74: Crescent City
    // Day 26: → Eureka (US-101 S)
    [41.20,-124.09],  // 75: Prairie Creek/Orick
    [40.80,-124.16],  // 76: Eureka
    // Day 27: Eureka → SF (US-101 S)
    [40.10,-123.79],  // 77: Garberville
    [39.15,-123.21],  // 78: Ukiah SC
    [38.44,-122.72],  // 79: Santa Rosa
    [38.07,-122.88],  // 80: Point Reyes area
    [37.77,-122.42],  // 81: San Francisco
    // Day 30: SF → PCH south → Santa Barbara
    [37.46,-122.43],  // 82: Half Moon Bay
    [36.97,-122.03],  // 83: Santa Cruz
    [36.60,-121.89],  // 84: Monterey
    [36.37,-121.90],  // 85: Carmel
    [36.27,-121.81],  // 86: Big Sur
    [35.97,-121.47],  // 87: south Big Sur coast
    [35.66,-121.25],  // 88: San Simeon/Elephant Seal
    [35.28,-120.66],  // 89: SLO SC
    [34.95,-120.44],  // 90: Santa Maria
    [34.61,-120.19],  // 91: Gaviota
    [34.42,-119.70],  // 92: Santa Barbara
    // Day 31: Santa Barbara → LA (US-101 → PCH)
    [34.28,-119.29],  // 93: Ventura
    [34.09,-119.04],  // 94: Point Mugu
    [34.03,-118.69],  // 95: Malibu
    [34.02,-118.49],  // 96: Santa Monica
    [34.05,-118.24]   // 97: LA
];

// Day index → route coord index (approximate)
var dayRouteIdx = {
    1:0,2:0,3:0,4:0,5:8,6:9,7:15,8:15,9:23,10:23,11:23,12:23,13:30,14:30,
    15:34,16:39,17:39,18:39,19:48,20:57,21:62,22:62,23:66,24:72,
    25:74,26:76,27:81,28:81,29:81,30:92,31:97,32:97,33:97
};

// Route coordinates per day for day-route highlighting
var dayRouteSegments = {
    5: [[33.94,-118.41],[34.30,-118.47],[34.84,-118.87],[35.40,-119.05],[35.88,-119.30],[36.32,-119.65],[36.75,-119.82],[37.30,-120.48],[37.49,-119.97]],
    6: [[37.49,-119.97],[37.87,-119.54]],
    7: [[37.87,-119.54],[37.33,-119.65],[37.06,-119.58],[36.82,-119.68],[36.60,-119.40],[36.33,-119.29],[36.45,-118.91]],
    9: [[36.45,-118.91],[36.06,-118.96],[35.40,-118.98],[35.13,-118.44],[35.05,-118.17],[34.90,-117.02],[35.27,-116.07],[35.61,-115.39],[36.17,-115.14]],
    13: [[36.17,-115.14],[35.98,-114.83],[35.20,-114.05],[35.25,-112.19],[36.06,-112.14],[36.81,-111.63],[36.86,-112.53],[37.02,-112.53]],
    15: [[37.02,-112.53],[37.29,-112.68],[37.68,-112.15],[37.63,-112.17],[37.21,-112.99]],
    16: [[37.21,-112.99],[37.76,-112.33],[38.29,-111.57],[38.75,-111.50],[38.57,-110.70],[38.99,-110.16],[38.57,-109.55]],
    19: [[38.57,-109.55],[38.99,-110.16],[39.60,-110.81],[39.97,-111.53],[40.76,-111.89],[41.07,-112.25],[40.76,-111.89],[41.73,-112.17],[42.00,-112.45],[42.56,-114.46]],
    20: [[42.56,-114.46],[42.87,-115.54],[43.62,-116.20],[44.05,-116.97],[44.77,-117.83],[45.67,-118.79],[45.60,-121.18],[45.57,-122.40],[46.07,-122.88],[46.72,-122.95]],
    21: [[46.72,-122.95],[46.85,-121.76],[47.04,-122.90],[47.30,-123.10],[47.59,-123.79],[47.95,-124.39]],
    23: [[47.95,-124.39],[47.61,-124.37],[47.50,-124.35],[46.98,-123.82],[46.19,-123.83],[45.89,-123.96]],
    24: [[45.89,-123.96],[45.37,-123.97],[44.96,-124.02],[43.97,-124.10],[43.72,-124.12],[43.37,-124.22],[42.86,-124.42],[42.41,-124.42]],
    25: [[42.41,-124.42],[41.94,-124.20],[41.76,-124.20]],
    26: [[41.76,-124.20],[41.20,-124.09],[40.80,-124.16]],
    27: [[40.80,-124.16],[40.10,-123.79],[39.15,-123.21],[39.45,-123.81],[39.31,-123.80],[38.44,-122.72],[38.07,-122.88],[37.77,-122.42]],
    30: [[37.77,-122.42],[37.46,-122.43],[36.97,-122.03],[36.60,-121.89],[36.37,-121.90],[36.27,-121.81],[35.97,-121.47],[35.66,-121.25],[35.28,-120.66],[34.95,-120.44],[34.61,-120.19],[34.42,-119.70],[34.28,-119.29],[34.09,-119.04],[34.03,-118.69],[34.02,-118.49],[34.05,-118.24]]
};

// Day stats for stats card
var dayStats = {
    1: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    2: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    3: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    4: { km: '—', drive: '', hotel: 'Marriott Marquis' },
    5: { km: '~460', drive: 'LAX → Mariposa', hotel: 'Mariposa' },
    6: { km: '~110', drive: 'Yosemite NP', hotel: 'Mariposa' },
    7: { km: '~200', drive: 'Yosemite → Three Rivers', hotel: 'Three Rivers' },
    8: { km: '~100', drive: 'Sequoia NP', hotel: 'Three Rivers' },
    9: { km: '~430', drive: 'Three Rivers → Vegas', hotel: 'Las Vegas' },
    10: { km: '~110', drive: 'Mt. Charleston', hotel: 'Las Vegas' },
    11: { km: '~100', drive: 'Valley of Fire', hotel: 'Las Vegas' },
    12: { km: '~380', drive: 'Death Valley', hotel: 'Las Vegas' },
    13: { km: '~700', drive: 'Vegas → GC → Zion', hotel: 'Springdale' },
    14: { km: '~30', drive: 'Zion NP', hotel: 'Springdale' },
    15: { km: '~130', drive: 'Zion → Bryce', hotel: 'Bryce Canyon' },
    16: { km: '~490', drive: 'Bryce → Goblin Valley → Moab', hotel: 'Moab' },
    17: { km: '~80', drive: 'Canyonlands', hotel: 'Moab' },
    18: { km: '~50', drive: 'Arches NP', hotel: 'Moab' },
    19: { km: '~770', drive: 'Moab → SLC → Twin Falls', hotel: 'Twin Falls' },
    20: { km: '~670', drive: 'Twin Falls → Centralia', hotel: 'Centralia' },
    21: { km: '~500', drive: 'Centralia → Rainier → Forks', hotel: 'Forks' },
    22: { km: '~100', drive: 'Olympic NP', hotel: 'Forks' },
    23: { km: '~380', drive: 'Forks → Cannon Beach', hotel: 'Cannon Beach' },
    24: { km: '~350', drive: 'Costa Oregon', hotel: 'Gold Beach' },
    25: { km: '~160', drive: 'Redwood NP', hotel: 'Crescent City' },
    26: { km: '~130', drive: 'Crescent City → Eureka', hotel: 'Eureka' },
    27: { km: '~440', drive: 'Eureka → SF', hotel: 'San Francisco' },
    28: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    29: { km: '~30', drive: 'San Francisco', hotel: 'San Francisco' },
    30: { km: '~750', drive: 'SF → PCH → LA', hotel: 'Los Angeles' },
    31: { km: '~50', drive: 'LA: praias + descanso', hotel: 'Los Angeles' },
    32: { km: '~80', drive: 'LA: Hollywood, shopping', hotel: 'Los Angeles' },
    33: { km: '~30', drive: 'LAX → voo', hotel: '✈️ Volta!' }
};

function doInitMap() {
    L.Icon.Default.imagePath = 'lib/';
    mapInstance = L.map('map', { center: [38, -105], zoom: 5, zoomControl: false });

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
        { n: "Mariposa / Yosemite", lat: 37.4849, lng: -119.9663, i: "🏞️", info: "Dias 5–7 • Yosemite NP", days: [5,6,7], photo: 6 },
        { n: "Three Rivers / Sequoia", lat: 36.4519, lng: -118.9054, i: "🌲", info: "Dias 7–8 • Sequoia + Kings Canyon", days: [7,8], photo: 8 },
        { n: "Las Vegas", lat: 36.1699, lng: -115.1398, i: "🎰", info: "Dias 9–12 • 4 noites", days: [9,10,11,12], photo: 9 },
        { n: "Grand Canyon", lat: 36.0544, lng: -112.1401, i: "🏞️", info: "Dia 13 • Mather Point", days: [13], photo: 13 },
        { n: "Zion NP", lat: 37.2090, lng: -112.9871, i: "🏞️", info: "Dias 13–15 • Watchman, Emerald Pools", days: [13,14,15], photo: 14 },
        { n: "Bryce Canyon", lat: 37.6283, lng: -112.1677, i: "🏔️", info: "Dias 15–16 • Hoodoos + stargazing", days: [15,16], photo: 15 },
        { n: "Moab, UT", lat: 38.5733, lng: -109.5498, i: "🏜️", info: "Dias 16–18 • Arches, Canyonlands", days: [16,17,18], photo: 17 },
        { n: "Twin Falls, ID", lat: 42.5558, lng: -114.4701, i: "🌊", info: "Dia 19 • Perrine Bridge, Evel Knievel Jump Site, Shoshone Falls", days: [19], photo: 19 },
        { n: "Mt. Rainier NP", lat: 46.8523, lng: -121.7603, i: "🌋", info: "Dia 21 • Paradise", days: [21], photo: 21 },
        { n: "Olympic NP", lat: 47.9504, lng: -124.3855, i: "🧛", info: "Dias 21–22 • Hoh, Ruby Beach", days: [21,22], photo: 22 },
        { n: "Cannon Beach", lat: 45.8918, lng: -123.9615, i: "🌅", info: "Dia 23 • Haystack Rock", days: [23], photo: 23 },
        { n: "Costa Oregon", lat: 43.3407, lng: -124.2132, i: "🌊", info: "Dia 24 • Thor's Well, Samuel Boardman", days: [24], photo: 24 },
        { n: "Redwood NP", lat: 41.7558, lng: -124.2026, i: "🦕", info: "Dias 25–26 • Fern Canyon, Tall Trees", days: [25,26], photo: 26 },
        { n: "San Francisco", lat: 37.7749, lng: -122.4194, i: "🌉", info: "Dias 27–29 • Golden Gate, Alcatraz", days: [27,28,29], photo: 28 },
        { n: "Santa Barbara", lat: 34.4208, lng: -119.6982, i: "🏖️", info: "Dia 30 • PCH + costa", days: [30,31], photo: 30 },
        { n: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, i: "🎬", info: "Dias 31–33 • Griffith, Venice", days: [31,32,33], photo: 32 }
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
            '<div class="popup-nav-btns" style="margin-top:4px"><a class="popup-nav-btn" style="background:rgba(10,132,255,0.15);color:#0a84ff;flex:1;cursor:pointer" onclick="switchTab(\'home\');showDay(' + s.days[0] + ')">📅 Ver Dia ' + s.days[0] + '</a></div>';
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
        "Ukiah, CA": [39.1502,-123.2078], "Monterey / Salinas, CA": [36.6780,-121.6555],
        "Merced, CA": [37.3022,-120.4830], "Oakhurst, CA": [37.3268,-119.6487],
        "Visalia, CA": [36.3302,-119.2921], "Tejon / Lebec, CA": [34.9876,-118.9148]
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
            '<div class="popup-nav-btns" style="margin-top:4px"><a class="popup-nav-btn" style="background:rgba(10,132,255,0.15);color:#0a84ff;flex:1;cursor:pointer" onclick="switchTab(\'home\');showDay(' + sc.day + ')">📅 Ver Dia ' + sc.day + '</a></div>';
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
        div.innerHTML = '<h3 onclick="this.parentElement.classList.toggle(\'open\')">🗺️ Legenda</h3>' +
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
    actions += '<button class="map-stats-action-btn btn-roteiro" onclick="event.stopPropagation();switchTab(\'home\');showDay(' + dayNum + ')">📅 Ver Roteiro</button>';
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

function generateTileList() {
    var tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    var subdomains = ['a', 'b', 'c', 'd'];
    var tiles = [];
    for (var z = 4; z <= 8; z++) {
        var minTile = latLngToTile(48, -125, z);
        var maxTile = latLngToTile(33, -109, z);
        for (var x = minTile.x; x <= maxTile.x; x++) {
            for (var y = minTile.y; y <= maxTile.y; y++) {
                var s = subdomains[(x + y) % subdomains.length];
                tiles.push(tileUrl.replace('{s}', s).replace('{z}', z).replace('{x}', x).replace('{y}', y).replace('{r}', ''));
            }
        }
    }
    return tiles;
}

async function cacheMapTiles(silent) {
    if (tileCacheRunning) return;
    if (localStorage.getItem('mapTilesCached') === 'tiles-v1') {
        updateTileCacheUI(true, 0);
        return;
    }
    if (!navigator.onLine) return;

    tileCacheRunning = true;
    var btn = document.getElementById('btnCacheMap');
    var status = document.getElementById('mapCacheStatus');
    var progress = document.getElementById('mapProgress');
    var fill = document.getElementById('mapProgressFill');

    if (btn) { btn.disabled = true; btn.textContent = '⏳ Baixando...'; }
    if (progress) progress.style.display = 'block';

    var tiles = generateTileList();
    if (status) status.textContent = '0 / ' + tiles.length + ' tiles...';

    var cache = await caches.open('viagem-tiles-v1');
    var done = 0;
    var errors = 0;
    var batchSize = silent ? 6 : 10; // smaller batches in background to save bandwidth

    for (var i = 0; i < tiles.length; i += batchSize) {
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
        var pct = Math.round((done / tiles.length) * 100);
        if (fill) fill.style.width = pct + '%';
        if (status) status.textContent = done + ' / ' + tiles.length + ' tiles...' + (errors > 0 ? ' (' + errors + ' erros)' : '');
    }

    tileCacheRunning = false;
    localStorage.setItem('mapTilesCached', 'tiles-v1');
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
    var today = new Date();
    today.setHours(0,0,0,0);
    tripStart.setHours(0,0,0,0);
    var diff = Math.floor((tripStart - today) / 86400000);
    if (diff > 0) {
        var pl = document.getElementById('heroProgressLabel');
        var pf = document.getElementById('heroProgress');
        if (pl) pl.textContent = '🛫 Faltam ' + diff + ' dias!';
        if (pf) pf.style.width = '0%';
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
    var saved = parseInt(localStorage.getItem('lastDay'));
    if (saved >= 1 && saved <= totalDays) initDay = saved;
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
// Auto-download map tiles in background after 3s (only if online and not already cached)
setTimeout(function() { cacheMapTiles(true); }, 3000);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        // Check for updates, but don't auto-reload — let the new SW take control on next visit
        reg.addEventListener('updatefound', function() {
            var newWorker = reg.installing;
            newWorker.addEventListener('statechange', function() {
                if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
                    // New version available — show subtle toast instead of reload loop
                    var toast = document.createElement('div');
                    toast.className = 'update-toast';
                    toast.innerHTML = '🔄 Nova versão disponível <button onclick="window.location.reload()">Atualizar</button>';
                    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--glass2);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:0.5px solid rgba(255,255,255,0.15);color:var(--text);padding:12px 20px;border-radius:16px;z-index:9999;font-family:inherit;font-size:14px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.4)';
                    toast.querySelector('button').style.cssText = 'background:var(--blue);color:#fff;border:none;padding:8px 16px;border-radius:10px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer';
                    document.body.appendChild(toast);
                    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 15000);
                }
            });
        });
    }).catch(function(err) { console.warn('SW:', err); });
}

// Show actual cache version in settings
function updateAppVersion() {
    var el = document.getElementById('appVersion');
    if (!el) return;
    if ('caches' in window) {
        caches.keys().then(function(names) {
            var ver = names.find(function(n) { return n.startsWith('viagem-eua-2027-v'); });
            if (ver) el.textContent = 'EUA 2027 PWA — cache ' + ver.replace('viagem-eua-2027-', '');
        }).catch(function() {});
    }
}
updateAppVersion();

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
        html += '<div class="search-result-item" tabindex="0" role="option" onclick="closeSearch();showDay(' + r.day + ')' + (r.hasInfo ? ';setTimeout(function(){openDetail(' + r.day + ',' + r.idx + ')},300)' : '') + '" onkeydown="if(event.key===\'Enter\')this.click()">';
        html += '<span class="search-result-day">Dia ' + r.day + '</span>';
        html += '<span class="search-result-time">' + r.time + '</span>';
        var displayText = r.text;
        if (q) { displayText = displayText.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark style="background:rgba(10,132,255,0.3);color:var(--text);border-radius:2px;padding:0 2px">$1</mark>'); }
        html += '<span class="search-result-text">' + displayText + '</span>';
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
    var numTarget = parseInt(String(target).replace(/[^0-9]/g, '')) || 0;
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
        'Death Valley': [8], 'Grand Canyon': [9], 'Zion': [10,11], 'Bryce Canyon': [11,12],
        'Canyonlands': [13], 'Arches': [14], 'Mt. Rainier': [18], 'Olympic': [18,19],
        'Redwood': [22], 'Yosemite': [27,28], 'Sequoia': [30]
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
            animateCounter(document.getElementById('statKm'), kmTraveled, '~', '/6.500', 1000);
        } else {
            document.getElementById('statChecked').textContent = totalChecked + '/' + totalItems;
            document.getElementById('statParks').textContent = parksVisited + '/11';
            document.getElementById('statKm').textContent = '~' + kmTraveled.toLocaleString() + '/6.500';
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
    html += '<div class="explore-stat-card"><div class="explore-stat-value green">' + pct + '%</div><div class="explore-stat-label">Concluído</div></div>';
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
            html += '<div class="fav-item" onclick="switchTab(\'home\');showDay(' + f.day + ')">';
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
        html += '<div class="hotel-item" onclick="switchTab(\'home\');showDay(' + findDayByDate(h.checkin) + ')">';
        html += '<div class="hotel-num">' + h.num + '</div>';
        html += '<div class="hotel-info"><div class="hotel-name">' + h.name + '</div>';
        html += '<div class="hotel-dates">' + h.checkin + ' → ' + h.checkout + '</div></div>';
        html += '<div class="hotel-right">';
        html += '<div class="hotel-nights">' + h.nights + 'n</div>';
        html += '<a class="hotel-map-link" href="' + mapsUrl + '" target="_blank" rel="noopener" onclick="event.stopPropagation()" aria-label="Abrir no Maps">📍</a>';
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
        html += '<div class="explore-park-card" onclick="switchTab(\'home\');showDay(' + dayNum + ')">';
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
        html += '<div class="charge-item' + (sc.critical ? ' critical' : '') + '" onclick="switchTab(\'home\');showDay(' + sc.day + ')">';
        html += '<div class="charge-icon-wrap">' + (sc.critical ? '⚠️' : '⚡') + '</div>';
        html += '<div class="charge-info"><div class="charge-name">' + sc.name + '</div>';
        html += '<div class="charge-leg">Dia ' + sc.day + ' • ' + sc.leg + '</div>';
        if (sc.note) html += '<div class="charge-note">' + sc.note + '</div>';
        html += '</div>';
        html += '<a class="charge-map-link" href="' + mapsUrl + '" target="_blank" rel="noopener" onclick="event.stopPropagation()" aria-label="Abrir no Maps">📍</a>';
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
    var decided = false; // whether we've decided horizontal vs vertical

    container.addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
        decided = false;
    }, { passive: true });

    container.addEventListener('touchmove', function(e) {
        if (!tracking) return;
        var dx = e.touches[0].clientX - startX;
        var dy = e.touches[0].clientY - startY;
        var absDx = Math.abs(dx);
        var absDy = Math.abs(dy);

        if (!decided) {
            // Wait until enough movement to decide direction
            if (absDx < 15 && absDy < 15) return;

            // Must be CLEARLY horizontal: dx must be at least 2x dy
            if (absDx < absDy * 2) {
                tracking = false;
                return;
            }

            // Horizontal-dominant: lock in for swipe detection
            decided = true;
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
        // Hide swipe hints
        var hintL = document.getElementById('swipeHintL');
        var hintR = document.getElementById('swipeHintR');
        if (hintL) hintL.classList.remove('visible');
        if (hintR) hintR.classList.remove('visible');

        if (!tracking || !decided) {
            tracking = false;
            return;
        }
        tracking = false;

        var endX = e.changedTouches[0].clientX;
        var dx = endX - startX;

        // Minimum 60px horizontal distance
        if (Math.abs(dx) < 60) return;

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

// ==================== GOOGLE SHEETS SYNC ====================
var SyncEngine = {
    defaultUrl: 'https://script.google.com/macros/s/AKfycbyEfTe62Z58eUSE5KOTzRy6Tm5DoDIso6qZPE1MsUXU1bdzA9ObT2eyWTKfeCZDgfp-Og/exec',
    url: (function() {
        var saved = localStorage.getItem('syncUrl');
        var def = 'https://script.google.com/macros/s/AKfycbyEfTe62Z58eUSE5KOTzRy6Tm5DoDIso6qZPE1MsUXU1bdzA9ObT2eyWTKfeCZDgfp-Og/exec';
        // Reset if user has old/stale URL
        if (saved && saved !== def && saved.indexOf('AKfycbzYaHa1') !== -1) {
            localStorage.removeItem('syncUrl');
            return def;
        }
        return saved || def;
    })(),
    queue: JSON.parse(localStorage.getItem('syncQueue') || '[]'),
    syncing: false,
    debounceTimer: null,

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

    pushRetries: 0,

    push: async function() {
        if (!this.url || this.syncing || this.queue.length === 0) return;
        // Use Web Locks to prevent concurrent sync across tabs
        if (navigator.locks) {
            var self = this;
            return navigator.locks.request('sync-push', { ifAvailable: true }, function(lock) {
                if (!lock) return; // Another tab is syncing
                return self._doPush();
            });
        }
        return this._doPush();
    },

    _doPush: async function() {
        if (this.syncing) return;
        this.syncing = true;
        this.updateUI('syncing');
        // Snapshot current queue — items added during push will remain
        var snapshotLen = this.queue.length;
        var snapshot = this.queue.slice(0, snapshotLen);
        // Deduplicate: keep only latest per key
        var latest = {};
        snapshot.forEach(function(e) {
            if (!latest[e.key] || e.ts > latest[e.key].ts) latest[e.key] = e;
        });
        var changes = Object.values(latest);
        try {
            // Batch in chunks of 15 to avoid URL length limits (GET workaround for Apps Script)
            var BATCH = 15;
            for (var i = 0; i < changes.length; i += BATCH) {
                var chunk = changes.slice(i, i + BATCH);
                var payload = encodeURIComponent(JSON.stringify({ changes: chunk }));
                var resp = await fetch(this.url + '?action=push&data=' + payload);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
            }
            // Pull final state after all batches
            var pullResp = await fetch(this.url);
            var result = await pullResp.json();
            // Remove only sent items, keep any added during push
            this.queue.splice(0, snapshotLen);
            localStorage.setItem('syncQueue', JSON.stringify(this.queue));
            if (result && result.data) this.mergeRemote(result.data);
            this.updateUI('synced');
            this.pushRetries = 0;
        } catch(e) {
            console.warn('Sync push failed:', e);
            this.updateUI('error');
            // Retry with exponential backoff (3s, 6s, 12s, max 30s)
            this.pushRetries = Math.min((this.pushRetries || 0) + 1, 5);
            var delay = Math.min(3000 * Math.pow(2, this.pushRetries - 1), 30000);
            var self = this;
            this.syncing = false;
            setTimeout(function() { self.push(); }, delay);
            return;
        }
        this.syncing = false;
        // If new items were added during push, trigger another push
        if (this.queue.length > 0) {
            var self = this;
            setTimeout(function() { self.push(); }, 1000);
        }
    },

    pull: async function() {
        if (!this.url || this.syncing) return;
        // Drain pending queue before pulling
        if (this.queue.length > 0) {
            await this.push();
            return; // push already pulls after sending
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
                // Targeted DOM update instead of full re-render
                var val = remote[key].v;
                if (key.startsWith('check-')) {
                    var parts = key.replace('check-', '').split('-');
                    var actionBtn = document.querySelector('[data-action-check="' + parts[0] + '-' + parts[1] + '"]');
                    if (actionBtn) {
                        actionBtn.classList.toggle('action-done', val === '1');
                        var card = actionBtn.closest('.activity-card');
                        if (card) card.classList.toggle('item-done', val === '1');
                    }
                    dominated = true;
                } else if (key.startsWith('fav-')) {
                    var parts2 = key.replace('fav-', '').split('-');
                    var favBtn = document.querySelector('[data-action-fav="' + parts2[0] + '-' + parts2[1] + '"]');
                    if (favBtn) favBtn.classList.toggle('action-fav-active', val === '1');
                    dominated = true;
                } else if (key.startsWith('note-')) {
                    var dayNum = key.replace('note-', '');
                    var noteEl = document.getElementById('note-' + dayNum);
                    if (noteEl && noteEl.value !== val) noteEl.value = val || '';
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
        if (status === 'syncing') el.textContent = '🔄 Sincronizando...';
        else if (status === 'synced') {
            localStorage.setItem('lastSync', Date.now());
            el.textContent = '✅ Sincronizado agora';
        }
        else if (status === 'error') el.textContent = '⚠️ Falha na sync' + (pending ? ' (' + pending + ' pendentes)' : '');
        else if (status === 'nourl') el.textContent = '⚠️ Cole a URL acima primeiro';
        else el.textContent = '';
    },

    initUI: function() {
        var input = document.getElementById('syncUrlInput');
        if (input && this.url) input.value = this.url;
        var last = parseInt(localStorage.getItem('lastSync'));
        if (last && this.url) {
            var ago = Math.round((Date.now() - last) / 60000);
            var el = document.getElementById('syncStatus');
            if (el) el.textContent = ago < 1 ? '✅ Sincronizado agora' : '✅ Última sync: ' + (ago < 60 ? ago + ' min' : Math.round(ago/60) + 'h') + ' atrás';
        }
    }
};

// ==================== HAPTIC FEEDBACK ====================
function haptic(style) {
    if (navigator.vibrate) {
        if (style === 'light') navigator.vibrate(10);
        else if (style === 'medium') navigator.vibrate(20);
        else navigator.vibrate(30);
    }
}
// Patch toggleCheck, toggleFav, saveDayNote for haptic + sync
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

// Init sync UI and auto-sync
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

// Poll for remote changes every 30 seconds
if (SyncEngine.url) setInterval(function() {
    if (navigator.onLine && !SyncEngine.syncing) SyncEngine.pull();
}, 30000);

// Pull when tab/app regains focus (user switches back)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && SyncEngine.url && navigator.onLine && !SyncEngine.syncing) {
        SyncEngine.fullSync();
    }
});

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
            if (!data.version) throw new Error('Invalid');
            var count = 0;
            if (data.checks) Object.keys(data.checks).forEach(function(k) { localStorage.setItem(k, data.checks[k]); count++; });
            if (data.favs) Object.keys(data.favs).forEach(function(k) { localStorage.setItem(k, data.favs[k]); count++; });
            if (data.notes) Object.keys(data.notes).forEach(function(k) { localStorage.setItem(k, data.notes[k]); count++; });
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
