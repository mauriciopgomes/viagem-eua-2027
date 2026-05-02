// ==================== TRIP DATA ====================
// Shared data for the PWA

const enData = {
    1: { title: "Day 1 — Thu, 01/21", route: "Arrival + Light Midtown 🗽", note: "Arriving at JFK at 7am. Easy day to adjust — everything on foot in Midtown.", items: ["✈️ Arrival at JFK — immigration + baggage", "🚕 Transport JFK → Hotel (Uber ~$70, ~60 min)", "🏨 Check-in at <strong>Marriott Marquis</strong> (1535 Broadway, Times Square)", "☕ Breakfast — <strong>Russ & Daughters</strong> or nearby café", "🎮 <strong>Nintendo NY</strong> (10 Rockefeller Plaza) — official store, 2 floors", "⛪ <strong>St. Patrick's Cathedral</strong> (5th Ave & 50th St) — free, stunning inside", "🧸 <strong>FAO Schwarz</strong> (30 Rockefeller Plaza) — iconic toy store", "🧱 <strong>LEGO Store</strong> (636 5th Ave) — giant LEGO models of NY landmarks", "🍕 Lunch — <strong>Joe's Pizza</strong> (classic NY slice!)", "🚶 Walk along <strong>5th Avenue</strong> — Saks, Tiffany's, Apple Store", "🎨 <strong>MoMA</strong> (11 W 53rd St) — Van Gogh, Monet, Warhol, Picasso. ~1.5h", "📚 <strong>NY Public Library</strong> (476 5th Ave) — Rose Reading Room!", "🧊 <strong>Bryant Park</strong> — behind the Library! Ice skating rink in winter", "🍔 Dinner in <strong>Hell's Kitchen</strong> (9th Ave) — Shake Shack, burger joints", "🏨 Hotel — rest (jet lag!)"] },
    2: { title: "Day 2 — Fri, 01/22", route: "Downtown + Brooklyn + Chelsea 🌉", note: "Intense day! WTC, Brooklyn Bridge, Coney Island, SoHo, High Line, Hudson Yards.", items: ["☕ Coffee at hotel or nearby", "👻 <strong>Ghostbusters Firehouse</strong> (14 North Moore St) — real firehouse from the movies!", "🏛️ <strong>Wall Street + Charging Bull + Fearless Girl</strong>", "⛪ <strong>Trinity Church</strong> (Broadway & Wall St) — Alexander Hamilton's grave", "⛪ <strong>Oculus</strong> (WTC) — Calatrava's stunning architecture", "🕊️ <strong>9/11 Memorial</strong> — reflecting pools at the tower sites. Free", "🏙️ <strong>One World Observatory</strong> — top of One WTC, 541m! 360° views", "👔 <strong>7 World Trade Center</strong> — Pearson Specter's office (Suits!)", "🌉 <strong>Brooklyn Bridge</strong> on foot — ~30 min crossing", "📸 <strong>DUMBO</strong> — classic photo on Washington St", "🌳 <strong>Brooklyn Bridge Park + Jane's Carousel</strong>", "🍕 Lunch — <strong>Juliana's Pizza</strong> or <strong>Time Out Market</strong> (rooftop!)", "🚇 Subway → <strong>Coney Island</strong> (F line, ~40 min)", "🎡 <strong>Coney Island!</strong> Boardwalk + winter beach", "🌭 <strong>Nathan's Famous</strong> — original hot dog since 1916!", "🚇 Subway back → Manhattan (~50 min)", "🛍️ <strong>SoHo</strong> — shops, street art, cafés", "🏛️ <strong>Washington Square Park</strong> — iconic arch, Greenwich Village", "🏙️ <strong>Chelsea Market</strong> + 🌮 <strong>Los Tacos No.1</strong>", "🌿 <strong>High Line</strong> — elevated park on old rail tracks", "🏢 <strong>Pier 57</strong> (Google HQ) + 🌴 <strong>Little Island</strong> (floating park)", "🌇 <strong>Hudson Yards + The Vessel</strong>", "🍝 Dinner in <strong>Chelsea / West Village</strong>", "🏨 Back to hotel"] },
    3: { title: "Day 3 — Sat, 01/23", route: "Central Park + Museums + Downtown 🌳", note: "Morning: Central Park and museums. Afternoon: Macy's, Chinatown, Little Italy, Katz's.", items: ["☕ Coffee — <strong>Levain Bakery</strong> (167 W 74th St) — famous cookies!", "🌳 <strong>Central Park</strong> — Strawberry Fields (John Lennon), Bethesda Fountain, Bow Bridge", "🏨 <strong>The Plaza Hotel</strong> — Kevin's hotel from Home Alone 2!", "🦕 <strong>Natural History Museum</strong> (Central Park West & 79th St) — ~2h", "🍔 Lunch — <strong>Shake Shack</strong> on the UWS", "🏛️ <strong>MET — Metropolitan Museum of Art</strong> (1000 5th Ave) — USA's largest!", "Back to hotel — rest", "🛍️ <strong>Macy's Herald Square</strong> (34th St) — world's largest department store!", "🚇 Subway → Canal St", "🏮 <strong>Chinatown</strong> — Canal St + Mott St, largest Chinatown in the US!", "🍝 <strong>Little Italy</strong> — Mulberry St. Cannoli at <strong>Ferrara Bakery</strong> (since 1892!)", "🍖 Dinner — <strong>Katz's Deli</strong> (205 E Houston St) — legendary pastrami! Harry & Sally scene", "🏨 Back to hotel"] },
    4: { title: "Day 4 — Sun, 01/24", route: "Observatory + Flatiron + Farewell 🏙️", note: "Last full day in NY. Summit One Vanderbilt, Grand Central, Flatiron, farewell dinner.", items: ["☕ Coffee — <strong>NY Bagels</strong> (Ess-a-Bagel, 831 3rd Ave)", "🏙️ <strong>Summit One Vanderbilt</strong> (45 E 42nd St) — immersive mirror experience! ~1.5h", "🚶 <strong>Grand Central Terminal</strong> — starry ceiling, opal clock", "🏢 <strong>E Corp HQ — Mr. Robot</strong> (135 E 57th St) — Evil Corp's facade!", "🚡 <strong>Roosevelt Island Tramway</strong> (59th St & 2nd Ave) — aerial tram! $2.90", "🍝 Lunch — <strong>Eataly</strong> (200 5th Ave, Flatiron) — huge Italian market!", "🏢 <strong>Flatiron Building</strong> (23rd St & Broadway) — triangular 1902 building!", "🎮 Revisit <strong>Nintendo NY</strong> or explore something new", "Free time — rest or last exploration", "🧳 Back to hotel — pack bags", "🍽️ NY farewell dinner — <strong>Carmine's</strong> or <strong>Junior's</strong> (cheesecake!)", "🏨 Hotel — early night (flight tomorrow!)"] },
    5: { title: "Day 5 — Mon, 01/25", route: "Leaving NY ✈️ Roadtrip begins!", note: "Check-out from Marriott Marquis, flight to LAX, Tesla pickup.", items: ["☕ Coffee at Marriott Marquis", "🏨 Check-out", "🚕 Uber Times Square → JFK (~60 min, ~$70)", "Arrival at JFK — check-in / bag drop", "✈️ Flight AA 3 → Los Angeles"], tips: ["Continues: arrival at LAX on Day 6 — Tesla pickup and head to Sequoia!"] },
    6: { title: "Day 6 — Mon, 01/25", route: "Pick up Tesla and head to Sequoia! 🌲", note: "Roadtrip begins! 300 km to Three Rivers.", items: ["✈️ Arrival at LAX", "🚗 Pick up <strong>Tesla Model Y</strong> (car at ~80-90%)", "🛣️ Depart to <strong>Three Rivers</strong> (~300 km, ~3.5h via CA-99 N)", "⚡ <strong>Supercharger Tejon/Lebec, CA</strong> (~150 km) — ⚠️ <strong>CHARGE TO 100%!</strong> (~40 min) — Sequoia has no chargers!", "🚗 Continue to Three Rivers (~150 km, ~2h)", "🏨 Arrival at <strong>Three Rivers</strong>! Check-in", "🍽️ Dinner in Three Rivers"], tips: ["⚠️ CHARGE TO 100% at Tejon — Sequoia has ~190 km of mountain driving and no chargers!"] },
    7: { title: "Day 7 — Tue, 01/26", route: "Full day! Morning Sequoia, afternoon Kings Canyon 🌲", note: "The LARGEST TREE IN THE WORLD by volume!", items: ["☕ Coffee in Three Rivers", "🚗 Drive up to park via Generals Highway (~45 min)", "🌲 <strong>General Sherman Tree</strong> — the LARGEST TREE IN THE WORLD by volume! Short trail ~0.8 km", "🌲 <strong>Congress Trail</strong> (~3 km loop) — dozens of giant sequoias", "🚗 Head to <strong>Kings Canyon NP</strong> (~1h)", "🌲 <strong>General Grant Tree Trail</strong> (~1 km) — the 'Nation's Christmas Tree'", "🏞️ <strong>Kings Canyon Scenic Byway</strong> — scenic road down to canyon floor", "🥾 <strong>Zumwalt Meadow Trail</strong> (~2.5 km loop)", "📸 <strong>Roaring River Falls</strong>", "🍽️ Lunch — picnic or Grant Grove", "🚗 Back to <strong>Sequoia NP</strong> (~1h)", "🌅 <strong>Moro Rock</strong> — 350 steps, 360° view!", "🌲 <strong>Crescent Meadow / Tharp's Log</strong> — cabin inside a hollow trunk!", "🚗 Drive down to Three Rivers", "🍽️ Dinner in Three Rivers"], tips: ["❄️ In January there may be snow at higher elevations — check conditions on NPS website."] },
    8: { title: "Day 8 — Wed, 01/27", route: "Heading to our favorite park! 🏞️", note: "~2.5h drive to Yosemite Valley.", items: ["☕ Coffee + check-out from Three Rivers", "🚗 Depart to <strong>Yosemite NP</strong> (~200 km, ~2.5h via CA-99 → CA-41)", "🏞️ Arrival at <strong>Yosemite Valley</strong>!", "🍽️ Lunch at Yosemite Village", "📸 <strong>Tunnel View</strong> — the most iconic view: El Capitan, Half Dome & Bridalveil Fall", "🥾 <strong>Lower Yosemite Fall Trail</strong> (~30 min) — base of the waterfall", "📸 <strong>El Capitan Meadow</strong> — 900m vertical wall", "🌉 <strong>Swinging Bridge</strong> — classic Yosemite Falls view", "🌅 Sunset at <strong>Valley View</strong>", "🍽️ Dinner — Yosemite Village or <strong>Majestic Yosemite Hotel</strong>"], tips: ["❄️ Snowy Yosemite in late January is STUNNING! Fewer tourists, silence, snow-capped peaks."] },
    9: { title: "Day 9 — Thu, 01/28", route: "Full day exploring Yosemite! 🏞️", note: "Trails, frozen waterfalls and Badger Pass!", items: ["🌅 Sunrise at <strong>Tunnel View</strong> or <strong>Cook's Meadow</strong>", "☕ Coffee", "🥾 <strong>Vernal Fall Footbridge Trail</strong> (~3 km) — frozen waterfall!", "🥾 <strong>Mirror Lake Trail</strong> (~3h) — Half Dome reflection", "🍽️ Lunch", "🥾 <strong>Bridalveil Fall Trail</strong> (short, ~20 min)", "📸 <strong>Sentinel Bridge</strong> — Half Dome reflected in Merced River", "🎿 <strong>Badger Pass Ski Area</strong> — ski or play in the snow!", "📸 <strong>Cook's Meadow Loop</strong>", "🌅 Sunset in the park", "🍽️ Dinner — <strong>Majestic Yosemite Hotel Dining Room</strong> (reservations!)"] },
    10: { title: "Day 10 — Fri, 01/29", route: "Morning in Yosemite, afternoon in SF! 🌉", note: "Farewell Yosemite + Golden Gate!", items: ["🌅 Last sunrise in Yosemite — <strong>Valley View</strong>", "☕ Coffee", "📸 <strong>Yosemite Chapel + Ansel Adams Gallery</strong> + last photos", "🚗 Check-out + depart to <strong>San Francisco</strong> (~310 km, ~4h)", "⚡ <strong>Supercharger Manteca/Oakdale</strong> (~130 km) — ~25 min", "🌉 Arrival in <strong>San Francisco</strong>! Golden Gate view!", "🏨 Check-in", "🌆 Walk along the <strong>Embarcadero</strong> — Ferry Building Marketplace", "🌅 Sunset at <strong>Crissy Field</strong> — Golden Gate view", "🍽️ Dinner at <strong>Fisherman's Wharf</strong> — clam chowder!"] },
    11: { title: "Day 11 — Sat, 01/30", route: "SF classics! 🌉", note: "Pier 39, Cable Car, Golden Gate, Lombard Street!", items: ["☕ Coffee", "🏖️ <strong>Pier 39</strong> — sea lions!", "🚋 <strong>Cable Car</strong> ride (historic trolley)", "🌆 <strong>Lombard Street</strong> — world's most winding street", "🏘️ <strong>Painted Ladies / Alamo Square</strong>", "🍽️ Lunch in <strong>Haight-Ashbury</strong> (hippie district)", "🌉 <strong>Golden Gate Bridge</strong> — walk or bike!", "🏰 <strong>Fort Point</strong> — Vertigo filming location!", "🛍️ <strong>Union Square</strong> — shopping", "🍽️ Dinner in <strong>North Beach</strong> (SF's Little Italy)"] },
    12: { title: "Day 12 — Sun, 01/31", route: "Neighborhoods, Muir Woods & Sausalito! 🌲", note: "Redwoods 30 min from SF!", items: ["☕ Coffee", "🏮 <strong>SF Chinatown</strong> — oldest in the US! Dragon's Gate, dim sum", "🎨 <strong>Mission District Murals</strong> — Balmy Alley & Clarion Alley", "🍽️ Lunch in Mission — burritos at <strong>La Taqueria</strong>!", "🏞️ <strong>Muir Woods</strong> (~30 min) — coastal redwoods", "☕ <strong>Sausalito</strong> — houseboats, cafés", "🌉 Return via Golden Gate (sunset!)", "🍽️ Last dinner in SF — <strong>Waterbar</strong>"] },
    13: { title: "Day 13 — Mon, 02/01", route: "North coast! Point Reyes + wild elk! 🦌", note: "Heading up US-101 toward the redwoods.", items: ["☕ Coffee + check-out from SF", "🦌 <strong>Point Reyes</strong> (~65 km) — Elk Preserve (elk!), Point Reyes Lighthouse", "🚗 Continue US-101 north", "⚡🍽️ <strong>Supercharger Ukiah</strong> (~190 km) — ~25 min + lunch", "🚗 Continue US-101 (~250 km, ~3h)", "🏨 Arrival in <strong>Eureka</strong>! Check-in", "🏙️ <strong>Old Town Eureka</strong> — Carson Mansion (iconic Victorian mansion!)", "🍽️ Dinner in Eureka"] },
    14: { title: "Day 14 — Tue, 02/02", route: "The tallest trees on Earth! Fern Canyon!", note: "Jurassic Park 2 filming location! 🦕", items: ["☕ Coffee + check-out from Eureka", "🥾 <strong>Fern Canyon</strong> (~1.5 km loop) — 15m fern-covered walls! <strong>Jurassic Park 2</strong> filming location!", "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km) — among the tallest redwoods", "🍽️ Lunch in the area", "🌲 <strong>Prairie Creek Redwoods SP</strong>", "🚗 <strong>Newton B. Drury Scenic Parkway</strong>", "📸 <strong>Big Tree Wayside</strong>", "🌊 <strong>Gold Bluffs Beach</strong> — wild beach among redwoods!", "🌲 <strong>Stout Memorial Grove Trail</strong> (~30 min)", "🏨 Check-in at <strong>Crescent City</strong>", "🍽️ Dinner"], tips: ["🦕 Fern Canyon is a MUST — feels like another world!"] },
    15: { title: "Day 15 — Wed, 02/03", route: "Samuel Boardman + Cape Blanco + Shore Acres", note: "Oregon coast's most beautiful stretch!", items: ["☕ Coffee + check-out from Crescent City", "🌲 <strong>Tall Trees Grove</strong> — some of the tallest trees on EARTH! (~5 km)", "🚗 Crossing CA → Oregon!", "📸 <strong>Samuel Boardman Scenic Corridor</strong> — the most beautiful stretch!", "📸 <strong>Natural Bridges Viewpoint</strong> — natural sea arches!", "🍽️ Lunch in <strong>Gold Beach</strong> — fresh seafood!", "📸 <strong>Cape Blanco</strong> — Oregon's westernmost lighthouse", "📸 <strong>Shore Acres State Park</strong> — botanical garden over the sea!", "⚡ <strong>Supercharger Coos Bay</strong> — ~25 min", "🌅 Sunset on the Oregon coast", "🍽️ Dinner"] },
    16: { title: "Day 16 — Thu, 02/04", route: "Thor's Well + Haystack Rock at sunset!", note: "Best coast day! Goonies filming location!", items: ["☕ Coffee + check-out", "📸 <strong>Cape Perpetua + Thor's Well</strong> — 'Thor's Well', hole in the ocean!", "🏖️ <strong>Heceta Head Lighthouse</strong> — one of the most photographed in the world!", "🍽️ Lunch in <strong>Newport, OR</strong>", "⚡ <strong>Supercharger Lincoln City</strong> (~60 km) — ~25 min", "🌊 Arrival at <strong>Cannon Beach</strong>!", "📸 <strong>Haystack Rock</strong> — Oregon icon! <strong>Goonies</strong> location!", "🌊 <strong>Ecola State Park</strong> — spectacular viewpoint", "🌅 <strong>Sunset at Cannon Beach</strong> — SPECTACULAR!", "🍽️ Dinner at Cannon Beach"], tips: ["🌅 Cannon Beach at sunset is a MUST. Haystack Rock silhouetted against the sky!"] },
    17: { title: "Day 17 — Fri, 02/05", route: "Oregon → Washington! Astoria + Olympic!", note: "Goonies city + Twilight city!", items: ["☕ Last walk on Cannon Beach", "📸 <strong>Astoria, OR</strong> (~40 km) — <strong>The Goonies</strong> location! Astoria Column", "🌊 <strong>Astoria-Megler Bridge</strong> — Oregon → Washington!", "⚡ <strong>Supercharger Aberdeen, WA</strong> (~170 km) — ⚠️ <strong>CHARGE TO 100%!</strong> (~40 min) — Olympic has ~265 km internal driving + no SC until Olympia!", "🍽️ Lunch in Aberdeen (Kurt Cobain's hometown!)", "🏞️ <strong>Lake Crescent</strong> — crystal clear lake between mountains", "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km) — forest waterfall", "🏨 Check-in at <strong>Forks</strong>", "🧛 Twilight Tour! Forks High School + Bella Swan's House", "🍽️ Dinner in Forks"], tips: ["⚠️ CHARGE TO 100% at Aberdeen — Olympic has 265 km internal driving + no SC until Olympia (260 km)!"] },
    18: { title: "Day 18 — Sat, 02/06", route: "Mystical forests + wild beaches!", note: "Hoh Rain Forest + Ruby Beach + Twilight!", items: ["☕ Coffee", "🌲 <strong>Hoh Rain Forest</strong> — temperate rainforest!", "🥾 <strong>Hall of Mosses Trail</strong> (~1.3 km) — moss-covered trees", "🥾 <strong>Spruce Nature Trail</strong> (~2 km) — along the Hoh River", "🌊 <strong>Ruby Beach</strong> — wild beach with sea stacks!", "🧪 Tidepools at Ruby Beach — starfish!", "🍽️ Lunch in Forks", "🌊 <strong>La Push Beach / First Beach</strong> — Quileute beach (Twilight)!", "🌊 <strong>Rialto Beach</strong> — sea stacks and driftwood", "🥾 <strong>Marymere Falls Trail</strong> (~2.5 km) — 27m waterfall", "🌅 Sunset on one of the beaches — wild Pacific!", "🍽️ Farewell dinner in Forks"] },
    19: { title: "Day 19 — Sun, 02/07", route: "Leaving Olympic + Rainier volcano! 🌋", note: "Detour to the 4,392m snow-covered volcano!", items: ["☕ Coffee + check-out from Forks", "🚗 Depart south (~5h with stops)", "⚡ <strong>Supercharger Olympia/Tacoma</strong> (~260 km) — ~25 min", "🚗 Detour to <strong>Mt. Rainier NP</strong> (~100 km, ~1.5h)", "🌋 <strong>Mt. Rainier — Paradise!</strong> Snow-covered volcano!", "🥾 <strong>Nisqually Vista Trail</strong> (~2 km) — snowy trail, glacier view", "🍽️ Lunch in the area (Ashford or Elbe)", "🚗 Back to Olympia (~1.5h)", "🏨 Arrival at <strong>Olympia</strong>! Washington State capital", "🍽️ Dinner in Olympia"], tips: ["⚠️ If the road to Mt. Rainier is closed due to snow, head straight to Olympia."] },
    20: { title: "Day 20 — Mon, 02/08", route: "Multnomah Falls + Columbia Gorge! 💧", note: "Long day but 3 SCs + 189m waterfall!", items: ["☕ Coffee + check-out from Olympia", "🌲 <strong>Multnomah Falls</strong> (~170 km) — iconic 189m waterfall!", "🏞️ <strong>Columbia River Gorge</strong> — spectacular gorge", "⚡ <strong>Supercharger The Dalles</strong> (~100 km) — ~25 min", "⚡🍽️ <strong>Supercharger Pendleton</strong> (~200 km) — ~20 min + lunch", "⚡ <strong>Supercharger Baker City</strong> (~200 km) — ~25 min", "🏨 Arrival in <strong>Boise</strong>!", "🏙️ <strong>Boise River Greenbelt + Idaho State Capitol</strong>", "🍽️ Dinner at <strong>Basque Block</strong> — Bar Gernika!"] },
    21: { title: "Day 21 — Tue, 02/09", route: "Shoshone Falls + Antelope Island! 🦬", note: "Long day but FSD does the heavy lifting!", items: ["☕ Coffee + check-out from Boise", "⚡ <strong>Supercharger Twin Falls</strong> (~210 km) — ~25 min", "🌊 <strong>Shoshone Falls</strong> (~5 min from SC) — 'Niagara of the West'! 65m drop!", "⚡ <strong>Supercharger Salt Lake City</strong> (~280 km) — ~25 min", "🦬 <strong>Antelope Island State Park</strong> — ~700 wild bison in the Great Salt Lake!", "📸 <strong>Buffalo Point</strong> — 360° Great Salt Lake viewpoint", "⚡ <strong>Supercharger Price</strong> (~190 km) — ~20 min", "⚡ <strong>Supercharger Green River</strong> (~100 km) — ~20 min", "🏨 Arrival in <strong>Moab</strong>! Check-in", "🍽️ Dinner in Moab"] },
    22: { title: "Day 22 — Wed, 02/10", route: "Island in the Sky — endless canyons!", note: "Mesa Arch at sunrise — Utah's most photographed arch!", items: ["☕ Early coffee", "🚗 Head to <strong>Canyonlands — Island in the Sky</strong> (~40 min)", "🌅 <strong>Mesa Arch</strong> at sunrise — the sun rises THROUGH the arch!", "📸 <strong>Grand View Point</strong> — infinite canyons, 360°!", "📸 <strong>Green River Overlook</strong> — river winding through canyon", "📸 <strong>Buck Canyon Overlook</strong>", "📸 <strong>White Rim Overlook</strong> (~3 km round-trip)", "🥾 <strong>Upheaval Dome Trail</strong> (~2.5 km) — mysterious crater!", "🍽️ Picnic in the park (bring food!)", "🥾 <strong>Aztec Butte Trail</strong> (~3 km) — ancient Pueblo ruins!", "🌅 Sunset at <strong>Grand View Point</strong> — golden canyons!", "🍽️ Dinner in Moab"] },
    23: { title: "Day 23 — Thu, 02/11", route: "Delicate Arch + Dead Horse sunset! 🏜️", note: "World's most famous arch + 600m Colorado River view!", items: ["☕ Early coffee", "🥾 <strong>Delicate Arch Trail</strong> (~5 km, ~2-3h) — the most famous arch in the WORLD!", "📸 <strong>Windows Section</strong> — North Window, South Window, Turret Arch", "📸 <strong>Double Arch</strong> — two giant connected arches!", "📸 <strong>Balanced Rock</strong>", "🍽️ Lunch", "🥾 <strong>Devils Garden Trail to Landscape Arch</strong> (~3 km) — world's longest arch (93m)!", "🏜️ <strong>Fiery Furnace Viewpoint + Park Avenue</strong>", "🌅 <strong>Dead Horse Point</strong> — 600m above the Colorado River horseshoe! <strong>Mission Impossible 2</strong> & <strong>Westworld</strong> location!", "🍽️ Farewell dinner in Moab"], tips: ["❄️ Arches with snow in February are MAGICAL! Bring traction boots for Delicate Arch."] },
    24: { title: "Day 24 — Fri, 02/12", route: "Drive + hoodoos + stargazing! 🌌", note: "Navajo Loop in person is INSANE!", items: ["☕ Coffee + check-out from Moab", "⚡ <strong>Supercharger Green River</strong> (~100 km) — ~20 min", "⚡ <strong>Supercharger Salina</strong> (~170 km) — ~25 min", "🏨 Arrival at <strong>Bryce Canyon</strong>! Check-in", "🛣️ <strong>Red Canyon</strong> — red arches over the road!", "📸 <strong>Sunrise/Sunset Point</strong> — first view of the hoodoos!", "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h) — walk AMONG the hoodoos!", "🌅 <strong>Sunset at Bryce Amphitheater</strong> — golden hoodoos!", "🍽️ Dinner in the area", "🌌 <strong>Stargazing at Bryce!</strong> — Milky Way visible to naked eye! Very cold!"], tips: ["🔭 Bryce has one of the BEST dark skies in the WORLD — International Dark Sky Park. Bring blankets!"] },
    25: { title: "Day 25 — Sat, 02/13", route: "Sunrise on hoodoos + arrival at Zion! 🏞️", note: "Sunrise at Bryce Point is UNFORGETTABLE!", items: ["🌅 <strong>Sunrise at Bryce Point</strong> — illuminated hoodoos!", "☕ Coffee", "🚗 <strong>Scenic Drive</strong>: Inspiration Point, Natural Bridge, Rainbow Point (360°)", "🚗 Check-out + depart to <strong>Zion</strong> (~130 km, ~1.5h)", "🏨 Arrival at <strong>Springdale</strong>! Check-in", "🍽️ Lunch in Springdale", "🚌 Shuttle along <strong>Zion Canyon Scenic Drive</strong>", "🥾 <strong>Riverside Walk</strong> — easy trail along the river", "🌄 <strong>Canyon Overlook Trail</strong> (~1h) — spectacular panoramic view", "🌅 Sunset in Zion — amazing colors on the red walls!", "🍽️ Dinner in Springdale"] },
    26: { title: "Day 26 — Sun, 02/14 ❤️", route: "Angels Landing + Emerald Pools! ❤️", note: "One of the most EPIC trails in the world!", items: ["☕ Coffee in Springdale", "🥾 <strong>Angels Landing Trail</strong> (~8 km, ~4h) — one of the most EPIC trails in the world! ⚠️ Permit required!", "🍽️ Lunch in Springdale", "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km) — natural pools with waterfalls", "🥾 <strong>Pa'rus Trail</strong> (~6 km) — flat trail along the Virgin River", "📸 <strong>Court of the Patriarchs + Weeping Rock</strong>", "🌅 <strong>Sunset at Canyon Junction Bridge</strong> — panoramic view!", "🍽️ Dinner in Springdale — well deserved after Angels Landing!"], tips: ["⚠️ Angels Landing requires a PERMIT — book at recreation.gov! Microspikes essential in winter."] },
    27: { title: "Day 27 — Mon, 02/15", route: "Heading to Grand Canyon via Kanab! 🏜️", note: "One of the most impressive sunsets of the trip!", items: ["☕ Coffee + check-out from Springdale", "🚗 Depart to <strong>Grand Canyon South Rim</strong> (~270 km, ~3.5h)", "⚡🍽️ <strong>Kanab, UT</strong> — ⚠️ <strong>CHARGE TO 100%!</strong> (~40 min) + coffee. GC has ~130 km internal driving + next SC is Kingman at 260 km!", "🏜️ Arrival at <strong>Grand Canyon South Rim</strong>!", "📸 <strong>Mather Point</strong> — first canyon view. UNREAL!", "🍽️ Lunch in the park (Market Plaza or El Tovar)", "🥾 <strong>Rim Trail</strong> (Mather Point → Yavapai Point, ~1.5 km)", "🏛️ <strong>Yavapai Geology Museum</strong> — glass panels over the abyss", "🚗 <strong>Desert View Drive</strong> (~40 km)", "📸 <strong>Grandview Point</strong> — dramatic viewpoint", "🏛️ <strong>Desert View Watchtower</strong> — 1932 tower, 360° view", "🌅 <strong>Sunset at Grand Canyon</strong> — Hopi Point. SPECTACULAR!", "🍽️ Dinner in the park or Tusayan"], tips: ["🌌 Grand Canyon is an International Dark Sky Park — go out at night to see the stars!", "⚠️ CHARGE TO 100% at Kanab — GC has 130 km internal driving + 260 km to Kingman!"] },
    28: { title: "Day 28 — Tue, 02/16", route: "GC sunrise + Vegas in the afternoon!", note: "Triumphant arrival in Vegas! Grand finale!", items: ["🌅 <strong>Grand Canyon sunrise</strong> — Mather/Yaki Point. UNFORGETTABLE!", "☕ Coffee", "🥾 <strong>Bright Angel Trail</strong> — first switchbacks (~1.5h)", "📸 <strong>Hermit Road</strong> (shuttle) — Hopi Point (widest view), Pima Point", "🚗 Check-out + depart to <strong>Las Vegas</strong> (~430 km, ~4.5h)", "⚡ <strong>Supercharger Kingman, AZ</strong> (~260 km) — ~25 min. Route 66!", "🎰 Arrival in <strong>Las Vegas</strong>! Check-in on the Strip!", "🍽️ Late lunch — <strong>In-N-Out Burger</strong>!", "🎨 <strong>Seven Magic Mountains</strong> — neon rock towers in the desert!", "📸 <strong>Welcome to Las Vegas Sign</strong>!", "🏨 Themed hotels — Venetian, Bellagio, Caesars Palace", "🍽️ Dinner on the Strip", "🌃 <strong>The Strip at night</strong> — Bellagio Fountains, casinos!"], tips: ["🎰 Triumphant arrival in Vegas after 24 days of roadtrip!"] },
    29: { title: "Day 29 — Wed, 02/17", route: "Nevada's most photogenic park! 🔥", note: "Fire Wave + Elephant Rock + Strip at night!", items: ["☕ Coffee + early departure", "🚗 Head to <strong>Valley of Fire</strong> (~45 min)", "🥾 <strong>Fire Wave Trail</strong> (~2 km) — striped rock waves!", "📸 <strong>Elephant Rock</strong>", "📸 <strong>White Domes Trail</strong> (~1.8 km) — colorful canyon", "🚗 Back to Vegas (~1h)", "🍽️ Lunch on the Strip", "🛍️ <strong>Outlets</strong> — Las Vegas North Premium Outlets", "🎲 Walk along the Strip", "🍽️ Dinner on the Strip"] },
    30: { title: "Day 30 — Thu, 02/18", route: "Lowest point in the Americas!", note: "Winter is the best time for Death Valley!", items: ["☕ Coffee + early departure from Vegas", "🏜️ Arrival at <strong>Death Valley National Park</strong>", "📸 <strong>Zabriskie Point</strong> — golden formations", "🚗 <strong>Artist's Drive + Artist's Palette</strong> — colorful mountains", "⬇️ <strong>Badwater Basin</strong> — lowest point in the Americas (-86m)!", "🍽️ Lunch — snacks/picnic (bring from Vegas)", "🏜️ <strong>Mesquite Flat Sand Dunes</strong> — classic dunes", "👀 <strong>Dante's View</strong> — panoramic viewpoint", "🚗 Back to Vegas (~2h)", "🍽️ Dinner on the Strip"] },
    31: { title: "Day 31 — Fri, 02/19", route: "Last full day in Vegas! 🏜️", note: "Red Rock in the morning, Strip in the afternoon!", items: ["☕ Coffee", "🚗 <strong>Red Rock Canyon</strong> (~30 min from Strip)", "🏜️ <strong>Scenic Loop Drive</strong> (~21 km)", "🥾 <strong>Calico Tanks Trail</strong> (~4 km) — panoramic Vegas view!", "🚗 Back to Strip", "🍽️ Lunch on the Strip", "🏨 Free time — pool, shopping, casino", "🍽️ Last dinner in Vegas! <strong>Gordon Ramsay Hell's Kitchen</strong> or <strong>Nobu</strong>", "🌃 Last night on the Strip — Bellagio Fountains!"], tips: ["💡 Red Rock Canyon is a surprise: BEAUTIFUL canyon 30 min from the Strip!"] },
    32: { title: "Day 32 — Sat, 02/20", route: "Heading to LA! Last roadtrip stretch! 🎬", note: "Santa Monica Pier at sunset!", items: ["☕ Coffee + check-out from Vegas", "🚗 Depart to <strong>Los Angeles</strong> (~430 km, ~4.5h)", "⚡ <strong>Supercharger Barstow</strong> (~250 km) — ~25 min. World's largest SC!", "🏨 Arrival in <strong>LA</strong>! Check-in", "🍽️ Lunch", "🏞️ <strong>Santa Monica Pier</strong> — ferris wheel, beach!", "🌅 Sunset over the Pacific!", "🍽️ Dinner in <strong>Santa Monica</strong>"] },
    33: { title: "Day 33 — Sun, 02/21", route: "Last day in the USA! 🎬", note: "Malibu, Venice and Griffith Observatory at night!", items: ["☕ Coffee", "🏖️ <strong>Malibu</strong> — iconic beaches, scenic PCH", "🏝️ <strong>El Matador Beach</strong> — caves, rock arches in the sea!", "🍽️ Lunch in Malibu", "🏖️ <strong>Venice Beach</strong> — Muscle Beach, murals, skatepark", "📸 <strong>Hollywood Sign</strong> — view from Griffith Park", "🛍️ Last-minute shopping", "🍽️ Last dinner in the USA!", "🔭 <strong>Griffith Observatory at night</strong> — telescopes + illuminated LA! Perfect farewell!", "🧳 Hotel — pack bags"] },
    34: { title: "Day 34 — Mon, 02/22", route: "Heading home! 🇧🇷", note: "Return Tesla + flight MIA → GIG.", items: ["☕ Coffee + check-out", "🚗 Return Tesla at LAX", "Arrival at LAX — check-in", "🛍️ Last duty free shopping", "✈️ Flight AA 608 → Miami (connection)", "Arrival in Miami", "✈️ Flight AA 905 → Rio de Janeiro"], tips: ["Arrival in Rio: 02/23 (Tue) at 09:25 🇧🇷 Welcome back!"] }
};

const dayPhotos = {
    1: 'img/dia-01.jpg',
    2: 'img/dia-02.jpg',
    3: 'img/dia-03.jpg',
    4: 'img/dia-04.jpg',
    5: 'img/dia-05.jpg',
    6: 'img/dia-06.jpg',
    7: 'img/dia-07.jpg',
    8: 'img/dia-08.jpg',
    9: 'img/dia-09.jpg',
    10: 'img/dia-10.jpg',
    11: 'img/dia-11.jpg',
    12: 'img/dia-12.jpg',
    13: 'img/dia-13.jpg',
    14: 'img/dia-14.jpg',
    15: 'img/dia-15.jpg',
    16: 'img/dia-16.jpg',
    17: 'img/dia-17.jpg',
    18: 'img/dia-18.jpg',
    19: 'img/dia-19.jpg',
    20: 'img/dia-20.jpg',
    21: 'img/dia-21.jpg',
    22: 'img/dia-22.jpg',
    23: 'img/dia-23.jpg',
    24: 'img/dia-24.jpg',
    25: 'img/dia-25.jpg',
    26: 'img/dia-26.jpg',
    27: 'img/dia-27.jpg',
    28: 'img/dia-28.jpg',
    29: 'img/dia-29.jpg',
    30: 'img/dia-30.jpg',
    31: 'img/dia-31.jpg',
    32: 'img/dia-32.jpg',
    33: 'img/dia-33.jpg',
    34: 'img/dia-34.jpg'
};

const days = [
    {
        day: 1, title: "Dia 1 — Qui, 21/01", location: "New York, NY",
        route: "Chegada + Midtown leve 🗽",
        note: "Chegada no JFK às 07h. Dia tranquilo pra se adaptar — tudo a pé em Midtown.",
        region: "ny",
        items: [
            { time: "07:00", text: "✈️ Chegada no JFK — imigração + bagagem", type: "drive" },
            { time: "~09:00", text: "🚕 Transporte JFK → Hotel (Uber ~$70, ~60 min)", type: "drive" },
            { time: "~10:00", text: "🏨 Check-in no <strong>Marriott Marquis</strong> (1535 Broadway, Times Square)", type: "" },
            { time: "10:30", text: "☕ Café da manhã — <strong>Russ & Daughters</strong> ou café perto do hotel", type: "food" },
            { time: "11:30", text: "🎮 <strong>Nintendo NY</strong> (10 Rockefeller Plaza) — loja oficial, 2 andares", type: "highlight" },
            { time: "12:15", text: "⛪ <strong>St. Patrick's Cathedral</strong> (5th Ave com 50th St) — gratuita, linda por dentro", type: "" },
            { time: "12:30", text: "🧸 <strong>FAO Schwarz</strong> (30 Rockefeller Plaza) — loja de brinquedos icônica", type: "" },
            { time: "12:45", text: "🧱 <strong>LEGO Store</strong> (636 5th Ave) — maquetes gigantes de NY em LEGO", type: "" },
            { time: "13:15", text: "🍕 Almoço — <strong>Joe's Pizza</strong> (clássica de NY!)", type: "food" },
            { time: "14:00", text: "🚶 Passeio pela <strong>5th Avenue</strong> — Saks, Tiffany's, Apple Store", type: "" },
            { time: "15:00", text: "🎨 <strong>MoMA</strong> (11 W 53rd St) — Van Gogh, Monet, Warhol, Picasso. ~1.5h", type: "highlight" },
            { time: "16:30", text: "📚 <strong>Biblioteca Pública de NY</strong> (476 5th Ave) — Sala Rose de Leitura!", type: "" },
            { time: "16:50", text: "🧊 <strong>Bryant Park</strong> — atrás da Biblioteca! Pista de patinação no inverno", type: "" },
            { time: "19:00", text: "🍔 Jantar em <strong>Hell's Kitchen</strong> (9th Ave) — Shake Shack, burger joints", type: "food" },
            { time: "20:30", text: "🏨 Hotel — descanso (jet lag!)", type: "" }
        ]
    },
    {
        day: 2, title: "Dia 2 — Sex, 22/01", location: "New York, NY",
        route: "Downtown + Brooklyn + Chelsea 🌉",
        note: "Dia intenso! WTC, Brooklyn Bridge, Coney Island, SoHo, High Line, Hudson Yards.",
        region: "ny",
        items: [
            { time: "08:00", text: "☕ Café no hotel ou próximo", type: "" },
            { time: "09:00", text: "👻 <strong>Ghostbusters Firehouse</strong> (14 North Moore St) — quartel real dos Caça-Fantasmas!", type: "" },
            { time: "09:20", text: "🏛️ <strong>Wall Street + Charging Bull + Fearless Girl</strong> — foto rápida", type: "" },
            { time: "09:40", text: "⛪ <strong>Trinity Church</strong> (Broadway com Wall St) — túmulo do Alexander Hamilton", type: "" },
            { time: "09:50", text: "⛪ <strong>Oculus</strong> (WTC) — arquitetura de Calatrava impressionante", type: "highlight" },
            { time: "10:10", text: "🕊️ <strong>9/11 Memorial</strong> — piscinas nos locais das torres. Gratuito", type: "highlight" },
            { time: "10:30", text: "🏙️ <strong>One World Observatory</strong> — topo do One WTC, 541m! Vista 360°", type: "highlight" },
            { time: "11:15", text: "👔 <strong>7 World Trade Center</strong> — escritório Pearson Specter (Suits!)", type: "" },
            { time: "11:30", text: "🌉 <strong>Brooklyn Bridge</strong> a pé — travessia ~30 min", type: "highlight" },
            { time: "12:00", text: "📸 <strong>DUMBO</strong> — foto clássica na Washington St", type: "" },
            { time: "12:15", text: "🌳 <strong>Brooklyn Bridge Park + Jane's Carousel</strong>", type: "" },
            { time: "12:45", text: "🍕 Almoço — <strong>Juliana's Pizza</strong> ou <strong>Time Out Market</strong> (rooftop!)", type: "food" },
            { time: "13:45", text: "🚇 Metrô → <strong>Coney Island</strong> (linha F, ~40 min)", type: "drive" },
            { time: "14:30", text: "🎡 <strong>Coney Island!</strong> Boardwalk + praia de inverno", type: "highlight" },
            { time: "14:45", text: "🌭 <strong>Nathan's Famous</strong> — hot dog original de 1916!", type: "food" },
            { time: "15:30", text: "🚇 Metrô de volta → Manhattan (~50 min)", type: "drive" },
            { time: "16:30", text: "🛍️ <strong>SoHo</strong> — lojas, arte de rua, cafés", type: "" },
            { time: "17:00", text: "🏛️ <strong>Washington Square Park</strong> — arco icônico, Greenwich Village", type: "" },
            { time: "17:30", text: "🏙️ <strong>Chelsea Market</strong> + 🌮 <strong>Los Tacos No.1</strong>", type: "food" },
            { time: "18:00", text: "🌿 <strong>High Line</strong> — parque elevado num antigo trilho de trem", type: "highlight" },
            { time: "18:20", text: "🏢 <strong>Pier 57</strong> (sede Google NY) + 🌴 <strong>Little Island</strong> (parque flutuante)", type: "" },
            { time: "18:50", text: "🌇 <strong>Hudson Yards + The Vessel</strong>", type: "highlight" },
            { time: "19:30", text: "🍝 Jantar em <strong>Chelsea / West Village</strong>", type: "food" },
            { time: "21:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        day: 3, title: "Dia 3 — Sab, 23/01", location: "New York, NY",
        route: "Central Park + Museus + Downtown 🌳",
        note: "Manhã: Central Park e museus. Tarde: Macy's, Chinatown, Little Italy, Katz's.",
        region: "ny",
        items: [
            { time: "08:00", text: "☕ Café — <strong>Levain Bakery</strong> (167 W 74th St) — cookies famosos!", type: "food" },
            { time: "09:00", text: "🌳 <strong>Central Park</strong> — Strawberry Fields (John Lennon), Bethesda Fountain, Bow Bridge", type: "highlight" },
            { time: "10:30", text: "🏨 <strong>The Plaza Hotel</strong> — hotel do Kevin em Esqueceram de Mim 2!", type: "" },
            { time: "11:00", text: "🦕 <strong>Museu de História Natural</strong> (Central Park West com 79th St) — ~2h", type: "highlight" },
            { time: "13:00", text: "🍔 Almoço — <strong>Shake Shack</strong> no UWS", type: "food" },
            { time: "14:00", text: "🏛️ <strong>MET — Metropolitan Museum of Art</strong> (1000 5th Ave) — o maior dos EUA!", type: "highlight" },
            { time: "17:00", text: "Volta ao hotel — descansar", type: "" },
            { time: "17:30", text: "🛍️ <strong>Macy's Herald Square</strong> (34th St) — maior loja de departamento do mundo!", type: "" },
            { time: "18:15", text: "🚇 Metrô → Canal St", type: "drive" },
            { time: "18:30", text: "🏮 <strong>Chinatown</strong> — Canal St + Mott St, a maior Chinatown dos EUA!", type: "" },
            { time: "18:50", text: "🍝 <strong>Little Italy</strong> — Mulberry St. Cannoli na <strong>Ferrara Bakery</strong> (desde 1892!)", type: "" },
            { time: "19:15", text: "🍖 Jantar — <strong>Katz's Deli</strong> (205 E Houston St) — pastrami lendário! Cena de Harry & Sally", type: "food" },
            { time: "20:30", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        day: 4, title: "Dia 4 — Dom, 24/01", location: "New York, NY",
        route: "Mirante + Flatiron + Despedida 🏙️",
        note: "Último dia cheio em NY. Summit One Vanderbilt, Grand Central, Flatiron, jantar de despedida.",
        region: "ny",
        items: [
            { time: "08:30", text: "☕ Café — <strong>Bagels de NY</strong> (Ess-a-Bagel, 831 3rd Ave)", type: "food" },
            { time: "09:30", text: "🏙️ <strong>Summit One Vanderbilt</strong> (45 E 42nd St) — mirante imersivo com espelhos! ~1.5h", type: "highlight" },
            { time: "11:15", text: "🚶 <strong>Grand Central Terminal</strong> — teto estrelado, relógio de opala", type: "highlight" },
            { time: "11:30", text: "🏢 <strong>E Corp HQ — Mr. Robot</strong> (135 E 57th St) — fachada da Evil Corp!", type: "" },
            { time: "11:50", text: "🚡 <strong>Roosevelt Island Tramway</strong> (59th St com 2nd Ave) — bondinho aéreo! $2.90", type: "highlight" },
            { time: "12:30", text: "🍝 Almoço — <strong>Eataly</strong> (200 5th Ave, Flatiron) — mercado italiano enorme!", type: "food" },
            { time: "13:30", text: "🏢 <strong>Flatiron Building</strong> (23rd St com Broadway) — prédio triangular de 1902!", type: "" },
            { time: "14:00", text: "🎮 Voltar na <strong>Nintendo NY</strong> ou explorar algo novo", type: "" },
            { time: "16:00", text: "Tempo livre — descansar ou última exploração", type: "" },
            { time: "18:00", text: "🧳 Volta ao hotel — arrumar malas", type: "" },
            { time: "19:00", text: "🍽️ Jantar de despedida de NY — <strong>Carmine's</strong> ou <strong>Junior's</strong> (cheesecake!)", type: "food" },
            { time: "21:00", text: "🏨 Hotel — dormir cedo (voo amanhã!)", type: "" }
        ]
    },
    {
        day: 5, title: "Dia 5 — Seg, 25/01", location: "New York → Los Angeles",
        route: "Saída de NY ✈️ Início da roadtrip!",
        note: "Check-out do Marriott Marquis, voo pro LAX, retirada do Tesla.",
        region: "ny",
        items: [
            { time: "07:30", text: "☕ Café no Marriott Marquis", type: "" },
            { time: "08:00", text: "🏨 Check-out", type: "" },
            { time: "08:30", text: "🚕 Uber Times Square → JFK (~60 min, ~$70)", type: "drive" },
            { time: "~09:30", text: "Chegada no JFK — check-in / despachar malas", type: "" },
            { time: "11:00", text: "✈️ Voo AA 3 → Los Angeles", type: "drive" }
        ],
        tips: ["Continuação: chegada no LAX no Dia 6 — retirada do Tesla e subida pra Sequoia!"]
    },
    {
        day: 6, title: "Dia 6 — Seg, 25/01", location: "LAX → Three Rivers / Sequoia",
        route: "Pegam o Tesla e sobem pra Sequoia! 🌲",
        note: "Início da roadtrip! 300 km até Three Rivers.",
        region: "ca",
        items: [
            { time: "14:20", text: "✈️ Chegada no LAX", type: "drive" },
            { time: "~15:30", text: "🚗 Retirada do <strong>Tesla Model Y</strong> (carro vem ~80-90%)", type: "drive" },
            { time: "16:00", text: "🛣️ Saída rumo a <strong>Three Rivers</strong> (~300 km, ~3.5h via CA-99 N)", type: "drive" },
            { time: "17:30", text: "⚡ <strong>Supercharger Tejon/Lebec, CA</strong> (~150 km) — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) — Sequoia não tem carregadores!", type: "charge" },
            { time: "18:15", text: "🚗 Continuação até Three Rivers (~150 km, ~2h)", type: "drive" },
            { time: "~20:00", text: "🏨 Chegada em <strong>Three Rivers</strong>! Check-in", type: "" },
            { time: "20:30", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["⚠️ CARREGAR ATÉ 100% em Tejon — Sequoia tem ~190 km de subida/descida e não há carregadores!"]
    },
    {
        day: 7, title: "Dia 7 — Ter, 26/01", location: "Sequoia + Kings Canyon",
        route: "Dia inteiro! Manhã Sequoia, tarde Kings Canyon 🌲",
        note: "A MAIOR ÁRVORE DO MUNDO em volume!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café em Three Rivers", type: "" },
            { time: "08:00", text: "🚗 Subida pro parque pela Generals Highway (~45 min)", type: "drive" },
            { time: "08:45", text: "🌲 <strong>General Sherman Tree</strong> — a MAIOR ÁRVORE DO MUNDO em volume! Trilha ~0.8 km", type: "highlight" },
            { time: "09:30", text: "🌲 <strong>Congress Trail</strong> (~3 km loop) — dezenas de sequóias gigantes", type: "" },
            { time: "11:00", text: "🚗 Rumo a <strong>Kings Canyon NP</strong> (~1h)", type: "drive" },
            { time: "11:15", text: "🌲 <strong>General Grant Tree Trail</strong> (~1 km) — a 'Árvore de Natal da Nação'", type: "highlight" },
            { time: "12:00", text: "🏞️ <strong>Kings Canyon Scenic Byway</strong> — descendo ao fundo do cânion", type: "" },
            { time: "12:45", text: "🥾 <strong>Zumwalt Meadow Trail</strong> (~2.5 km loop)", type: "" },
            { time: "13:30", text: "📸 <strong>Roaring River Falls</strong>", type: "" },
            { time: "14:00", text: "🍽️ Almoço — picnic ou Grant Grove", type: "food" },
            { time: "15:00", text: "🚗 Volta pra <strong>Sequoia NP</strong> (~1h)", type: "drive" },
            { time: "16:00", text: "🌅 <strong>Moro Rock</strong> — 350 degraus, vista 360°!", type: "highlight" },
            { time: "17:00", text: "🌲 <strong>Crescent Meadow / Tharp's Log</strong> — cabana dentro de um tronco oco!", type: "" },
            { time: "18:30", text: "🚗 Descida pra Three Rivers", type: "drive" },
            { time: "19:00", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["❄️ Em janeiro pode ter neve nas áreas mais altas — verifiquem condições no site do NPS."]
    },
    {
        day: 8, title: "Dia 8 — Qua, 27/01", location: "Three Rivers → Yosemite",
        route: "Rumo ao parque favorito! 🏞️",
        note: "~2.5h de estrada até Yosemite Valley.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Three Rivers", type: "" },
            { time: "08:30", text: "🚗 Saída rumo a <strong>Yosemite NP</strong> (~200 km, ~2.5h via CA-99 → CA-41)", type: "drive" },
            { time: "~11:00", text: "🏞️ Chegada em <strong>Yosemite Valley</strong>!", type: "highlight" },
            { time: "11:30", text: "🍽️ Almoço no Yosemite Village", type: "food" },
            { time: "12:30", text: "📸 <strong>Tunnel View</strong> — a vista mais icônica: El Capitan, Half Dome e Bridalveil Fall", type: "highlight" },
            { time: "13:30", text: "🥾 <strong>Lower Yosemite Fall Trail</strong> (~30 min) — base da cachoeira", type: "" },
            { time: "14:30", text: "📸 <strong>El Capitan Meadow</strong> — paredão vertical de 900m", type: "" },
            { time: "15:30", text: "🌉 <strong>Swinging Bridge</strong> — vista clássica de Yosemite Falls", type: "" },
            { time: "16:30", text: "🌅 Pôr do sol no <strong>Valley View</strong>", type: "highlight" },
            { time: "18:00", text: "🍽️ Jantar — Yosemite Village ou <strong>Majestic Yosemite Hotel</strong>", type: "food" }
        ],
        tips: ["❄️ Yosemite nevado no final de janeiro é LINDO! Menos turistas, silêncio, neve nos picos."]
    },
    {
        day: 9, title: "Dia 9 — Qui, 28/01", location: "Yosemite dia cheio",
        route: "Dia inteiro explorando Yosemite! 🏞️",
        note: "Trilhas, cachoeiras congeladas e Badger Pass!",
        region: "ca",
        items: [
            { time: "07:00", text: "🌅 Nascer do sol em <strong>Tunnel View</strong> ou <strong>Cook's Meadow</strong>", type: "highlight" },
            { time: "08:30", text: "☕ Café", type: "" },
            { time: "09:00", text: "🥾 <strong>Vernal Fall Footbridge Trail</strong> (~3 km) — cachoeira congelada!", type: "" },
            { time: "10:30", text: "🥾 <strong>Mirror Lake Trail</strong> (~3h) — reflexo do Half Dome", type: "" },
            { time: "12:00", text: "🍽️ Almoço", type: "food" },
            { time: "13:00", text: "🥾 <strong>Bridalveil Fall Trail</strong> (curta, ~20 min)", type: "" },
            { time: "13:30", text: "📸 <strong>Sentinel Bridge</strong> — vista do Half Dome refletido", type: "" },
            { time: "14:00", text: "🎿 <strong>Badger Pass Ski Area</strong> — esquiar ou brincar na neve!", type: "highlight" },
            { time: "16:00", text: "📸 <strong>Cook's Meadow Loop</strong>", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no parque", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Majestic Yosemite Hotel Dining Room</strong> (reservar!)", type: "food" }
        ]
    },
    {
        day: 10, title: "Dia 10 — Sex, 29/01", location: "Yosemite → San Francisco",
        route: "Manhã em Yosemite, tarde em SF! 🌉",
        note: "Despedida de Yosemite + Golden Gate!",
        region: "ca",
        items: [
            { time: "07:30", text: "🌅 Último nascer do sol em Yosemite — <strong>Valley View</strong>", type: "highlight" },
            { time: "08:30", text: "☕ Café", type: "" },
            { time: "09:00", text: "📸 <strong>Yosemite Chapel + Ansel Adams Gallery</strong> + últimas fotos", type: "" },
            { time: "10:00", text: "🚗 Check-out + saída rumo a <strong>San Francisco</strong> (~310 km, ~4h)", type: "drive" },
            { time: "11:30", text: "⚡ <strong>Supercharger Manteca/Oakdale</strong> (~130 km) — ~25 min", type: "charge" },
            { time: "~14:00", text: "🌉 Chegada em <strong>San Francisco</strong>! Vista da Golden Gate!", type: "highlight" },
            { time: "14:30", text: "🏨 Check-in", type: "" },
            { time: "15:00", text: "🌆 Passeio pelo <strong>Embarcadero</strong> — Ferry Building Marketplace", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no <strong>Crissy Field</strong> — vista da Golden Gate", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em <strong>Fisherman's Wharf</strong> — clam chowder!", type: "food" }
        ]
    },
    {
        day: 11, title: "Dia 11 — Sab, 30/01", location: "San Francisco dia cheio",
        route: "Os clássicos de SF! 🌉",
        note: "Pier 39, Cable Car, Golden Gate, Lombard Street!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café com calma", type: "" },
            { time: "10:00", text: "🏖️ <strong>Pier 39</strong> — leões-marinhos!", type: "highlight" },
            { time: "11:00", text: "🚋 Passeio de <strong>Cable Car</strong> (bonde histórico)", type: "highlight" },
            { time: "11:30", text: "🌆 <strong>Lombard Street</strong> — rua mais sinuosa do mundo", type: "" },
            { time: "12:00", text: "🏘️ <strong>Painted Ladies / Alamo Square</strong>", type: "" },
            { time: "12:30", text: "🍽️ Almoço em <strong>Haight-Ashbury</strong> (bairro hippie)", type: "food" },
            { time: "14:00", text: "🌉 <strong>Golden Gate Bridge</strong> — caminhar ou pedalar!", type: "highlight" },
            { time: "15:30", text: "🏰 <strong>Fort Point</strong> — cenário de Vertigo!", type: "" },
            { time: "16:00", text: "🛍️ <strong>Union Square</strong> — compras", type: "" },
            { time: "18:00", text: "🍽️ Jantar em <strong>North Beach</strong> (Little Italy de SF)", type: "food" }
        ]
    },
    {
        day: 12, title: "Dia 12 — Dom, 31/01", location: "SF — Chinatown + Muir Woods",
        route: "Bairros, Muir Woods e Sausalito! 🌲",
        note: "Redwoods a 30 min de SF!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA! Dragon's Gate, dim sum", type: "highlight" },
            { time: "11:30", text: "🎨 <strong>Murais do Mission District</strong> — Balmy Alley e Clarion Alley", type: "" },
            { time: "12:30", text: "🍽️ Almoço no Mission — burritos na <strong>La Taqueria</strong>!", type: "food" },
            { time: "14:00", text: "🏞️ <strong>Muir Woods</strong> (~30 min) — sequoias costeiras", type: "highlight" },
            { time: "16:00", text: "☕ <strong>Sausalito</strong> — casas-barco, cafés", type: "" },
            { time: "17:30", text: "🌉 Volta pela Golden Gate (pôr do sol!)", type: "" },
            { time: "18:30", text: "🍽️ Último jantar em SF — <strong>Waterbar</strong>", type: "food" }
        ]
    },
    {
        day: 13, title: "Dia 13 — Seg, 01/02", location: "SF → Point Reyes → Eureka",
        route: "Costa norte! Point Reyes + alces selvagens! 🦌",
        note: "Subindo a US-101 rumo às redwoods.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de SF", type: "" },
            { time: "09:30", text: "🦌 <strong>Point Reyes</strong> (~65 km) — Elk Preserve (alces!), Point Reyes Lighthouse", type: "highlight" },
            { time: "11:00", text: "🚗 Continuação US-101 norte", type: "drive" },
            { time: "12:30", text: "⚡🍽️ <strong>Supercharger Ukiah</strong> (~190 km) — ~25 min + almoço", type: "charge" },
            { time: "13:00", text: "🚗 Continuação US-101 (~250 km, ~3h)", type: "drive" },
            { time: "~16:00", text: "🏨 Chegada em <strong>Eureka</strong>! Check-in", type: "" },
            { time: "16:30", text: "🏙️ <strong>Old Town Eureka</strong> — Carson Mansion (mansão vitoriana icônica!)", type: "" },
            { time: "18:00", text: "🍽️ Jantar em Eureka", type: "food" }
        ]
    },
    {
        day: 14, title: "Dia 14 — Ter, 02/02", location: "Redwood NP dia cheio 🌲",
        route: "As árvores mais altas do mundo! Fern Canyon!",
        note: "Cenário de Jurassic Park 2! 🦕",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café + check-out de Eureka", type: "" },
            { time: "09:00", text: "🥾 <strong>Fern Canyon</strong> (~1.5 km loop) — paredes de samambaias de 15m! Cenário de <strong>Jurassic Park 2</strong>!", type: "highlight" },
            { time: "10:30", text: "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km) — entre as maiores redwoods", type: "" },
            { time: "12:00", text: "🍽️ Almoço na região", type: "food" },
            { time: "13:00", text: "🌲 <strong>Prairie Creek Redwoods SP</strong>", type: "" },
            { time: "14:00", text: "🚗 <strong>Newton B. Drury Scenic Parkway</strong>", type: "" },
            { time: "14:30", text: "📸 <strong>Big Tree Wayside</strong>", type: "" },
            { time: "15:00", text: "🌊 <strong>Gold Bluffs Beach</strong> — praia selvagem entre redwoods!", type: "" },
            { time: "16:00", text: "🌲 <strong>Stout Memorial Grove Trail</strong> (~30 min)", type: "" },
            { time: "17:30", text: "🏨 Check-in em <strong>Crescent City</strong>", type: "" },
            { time: "18:30", text: "🍽️ Jantar", type: "food" }
        ],
        tips: ["🦕 Fern Canyon é IMPERDÍVEL — parece outro mundo!"]
    },
    {
        day: 15, title: "Dia 15 — Qua, 03/02", location: "Costa Oregon Sul 🌊",
        route: "Samuel Boardman + Cape Blanco + Shore Acres",
        note: "A faixa mais bonita da costa de Oregon!",
        region: "pnw",
        items: [
            { time: "07:30", text: "☕ Café + check-out de Crescent City", type: "" },
            { time: "08:00", text: "🌲 <strong>Tall Trees Grove</strong> — algumas das árvores mais altas do MUNDO! (~5 km)", type: "" },
            { time: "10:00", text: "🚗 Cruzando CA → Oregon!", type: "drive" },
            { time: "10:30", text: "📸 <strong>Samuel Boardman Scenic Corridor</strong> — a faixa mais bonita!", type: "highlight" },
            { time: "10:45", text: "📸 <strong>Natural Bridges Viewpoint</strong> — arcos naturais no mar!", type: "highlight" },
            { time: "12:00", text: "🍽️ Almoço em <strong>Gold Beach</strong> — frutos do mar!", type: "food" },
            { time: "14:00", text: "📸 <strong>Cape Blanco</strong> — farol mais ocidental de Oregon", type: "" },
            { time: "15:00", text: "📸 <strong>Shore Acres State Park</strong> — jardim botânico sobre o mar!", type: "" },
            { time: "16:00", text: "⚡ <strong>Supercharger Coos Bay</strong> — ~25 min", type: "charge" },
            { time: "17:00", text: "🌅 Pôr do sol na costa de Oregon", type: "highlight" },
            { time: "18:00", text: "🍽️ Jantar", type: "food" }
        ]
    },
    {
        day: 16, title: "Dia 16 — Qui, 04/02", location: "Costa Oregon → Cannon Beach 🌅",
        route: "Thor's Well + Haystack Rock ao pôr do sol!",
        note: "O melhor dia de costa! Cenário do Goonies!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Café + check-out", type: "" },
            { time: "09:30", text: "📸 <strong>Cape Perpetua + Thor's Well</strong> — 'poço de Thor', buraco no oceano!", type: "highlight" },
            { time: "10:15", text: "🏖️ <strong>Heceta Head Lighthouse</strong> — um dos mais fotografados do mundo!", type: "" },
            { time: "11:00", text: "🍽️ Almoço em <strong>Newport, OR</strong>", type: "food" },
            { time: "12:00", text: "⚡ <strong>Supercharger Lincoln City</strong> (~60 km) — ~25 min", type: "charge" },
            { time: "14:30", text: "🌊 Chegada em <strong>Cannon Beach</strong>!", type: "" },
            { time: "15:00", text: "📸 <strong>Haystack Rock</strong> — ícone de Oregon! Cenário do <strong>Goonies</strong>!", type: "highlight" },
            { time: "15:45", text: "🌊 <strong>Ecola State Park</strong> — mirante espetacular", type: "" },
            { time: "17:00", text: "🌅 <strong>Pôr do sol em Cannon Beach</strong> — ESPETACULAR!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Cannon Beach", type: "food" }
        ],
        tips: ["🌅 Cannon Beach ao pôr do sol é OBRIGATÓRIO. Haystack Rock silhuetado contra o céu!"]
    },
    {
        day: 17, title: "Dia 17 — Sex, 05/02", location: "Cannon Beach → Forks 🧛",
        route: "Oregon → Washington! Astoria + Olympic!",
        note: "Cidade do Goonies + Cidade do Twilight!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Última caminhada em Cannon Beach", type: "" },
            { time: "09:30", text: "📸 <strong>Astoria, OR</strong> (~40 km) — cenário de <strong>The Goonies</strong>! Astoria Column", type: "highlight" },
            { time: "10:15", text: "🌊 <strong>Astoria-Megler Bridge</strong> — Oregon → Washington!", type: "" },
            { time: "11:30", text: "⚡ <strong>Supercharger Aberdeen, WA</strong> (~170 km) — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) — Olympic tem ~265 km internos + sem SC até Olympia!", type: "charge" },
            { time: "12:15", text: "🍽️ Almoço em Aberdeen (cidade natal do Kurt Cobain!)", type: "food" },
            { time: "15:00", text: "🏞️ <strong>Lake Crescent</strong> — lago cristalino entre montanhas", type: "" },
            { time: "16:00", text: "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km) — cachoeira na floresta", type: "" },
            { time: "17:00", text: "🏨 Check-in em <strong>Forks</strong>", type: "" },
            { time: "17:30", text: "🧛 Tour Crepúsculo! Forks High School + Casa da Bella Swan", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Forks", type: "food" }
        ],
        tips: ["⚠️ CARREGAR ATÉ 100% em Aberdeen — Olympic tem 265 km internos + sem SC até Olympia (260 km)!"]
    },
    {
        day: 18, title: "Dia 18 — Sab, 06/02", location: "Olympic NP dia cheio 🌲",
        route: "Florestas místicas + praias selvagens!",
        note: "Hoh Rain Forest + Ruby Beach + Twilight!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café", type: "" },
            { time: "07:30", text: "🌲 <strong>Hoh Rain Forest</strong> — floresta tropical temperada!", type: "highlight" },
            { time: "08:00", text: "🥾 <strong>Hall of Mosses Trail</strong> (~1.3 km) — árvores cobertas de musgo", type: "highlight" },
            { time: "09:00", text: "🥾 <strong>Spruce Nature Trail</strong> (~2 km) — ao longo do rio Hoh", type: "" },
            { time: "10:15", text: "🌊 <strong>Ruby Beach</strong> — praia selvagem com sea stacks!", type: "highlight" },
            { time: "10:45", text: "🧪 Tidepools em Ruby Beach — estrelas-do-mar!", type: "" },
            { time: "12:00", text: "🍽️ Almoço em Forks", type: "food" },
            { time: "13:00", text: "🌊 <strong>La Push Beach / First Beach</strong> — praia dos Quileute (Twilight)!", type: "" },
            { time: "14:30", text: "🌊 <strong>Rialto Beach</strong> — sea stacks e troncos na areia", type: "" },
            { time: "16:00", text: "🥾 <strong>Marymere Falls Trail</strong> (~2.5 km) — cachoeira de 27m", type: "" },
            { time: "17:30", text: "🌅 Pôr do sol numa das praias — Pacífico selvagem!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar de despedida de Forks", type: "food" }
        ]
    },
    {
        day: 19, title: "Dia 19 — Dom, 07/02", location: "Forks → Mt. Rainier → Olympia",
        route: "Olympic saída + vulcão Rainier! 🌋",
        note: "Desvio pelo vulcão de 4.392m coberto de neve!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Forks", type: "" },
            { time: "07:30", text: "🚗 Saída rumo ao sul (~5h com paradas)", type: "drive" },
            { time: "10:30", text: "⚡ <strong>Supercharger Olympia/Tacoma</strong> (~260 km) — ~25 min", type: "charge" },
            { time: "11:00", text: "🚗 Desvio rumo a <strong>Mt. Rainier NP</strong> (~100 km, ~1.5h)", type: "drive" },
            { time: "12:30", text: "🌋 <strong>Mt. Rainier — Paradise!</strong> Vulcão nevado!", type: "highlight" },
            { time: "13:15", text: "🥾 <strong>Nisqually Vista Trail</strong> (~2 km) — trilha com neve, vista do glaciar", type: "" },
            { time: "14:30", text: "🍽️ Almoço na região (Ashford ou Elbe)", type: "food" },
            { time: "15:30", text: "🚗 Volta pra Olympia (~1.5h)", type: "drive" },
            { time: "~17:00", text: "🏨 Chegada em <strong>Olympia</strong>! Capital de Washington", type: "" },
            { time: "18:30", text: "🍽️ Jantar em Olympia", type: "food" }
        ],
        tips: ["⚠️ Se a estrada pra Mt. Rainier estiver fechada por neve, sigam direto pra Olympia."]
    },
    {
        day: 20, title: "Dia 20 — Seg, 08/02", location: "Olympia → Boise",
        route: "Multnomah Falls + Columbia Gorge! 💧",
        note: "Dia longo mas com 3 SCs + cachoeira de 189m!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Olympia", type: "" },
            { time: "09:00", text: "🌲 <strong>Multnomah Falls</strong> (~170 km) — cachoeira icônica de 189m!", type: "highlight" },
            { time: "09:30", text: "🏞️ <strong>Columbia River Gorge</strong> — paredões espetaculares", type: "" },
            { time: "10:00", text: "⚡ <strong>Supercharger The Dalles</strong> (~100 km) — ~25 min", type: "charge" },
            { time: "12:00", text: "⚡🍽️ <strong>Supercharger Pendleton</strong> (~200 km) — ~20 min + almoço", type: "charge" },
            { time: "14:30", text: "⚡ <strong>Supercharger Baker City</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "17:00", text: "🏨 Chegada em <strong>Boise</strong>!", type: "" },
            { time: "17:30", text: "🏙️ <strong>Boise River Greenbelt + Idaho State Capitol</strong>", type: "" },
            { time: "18:30", text: "🍽️ Jantar no <strong>Basque Block</strong> — Bar Gernika!", type: "food" }
        ]
    },
    {
        day: 21, title: "Dia 21 — Ter, 09/02", location: "Boise → Moab",
        route: "Shoshone Falls + Antelope Island! 🦬",
        note: "Dia longo mas FSD faz o trabalho pesado!",
        region: "ut",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Boise", type: "" },
            { time: "09:30", text: "⚡ <strong>Supercharger Twin Falls</strong> (~210 km) — ~25 min", type: "charge" },
            { time: "10:00", text: "🌊 <strong>Shoshone Falls</strong> (~5 min do SC) — 'Niágara do Oeste'! 65m de altura!", type: "highlight" },
            { time: "13:30", text: "⚡ <strong>Supercharger Salt Lake City</strong> (~280 km) — ~25 min", type: "charge" },
            { time: "14:00", text: "🦬 <strong>Antelope Island State Park</strong> — ~700 bisões selvagens no Great Salt Lake!", type: "highlight" },
            { time: "15:00", text: "📸 <strong>Buffalo Point</strong> — mirante 360° do Great Salt Lake", type: "" },
            { time: "17:00", text: "⚡ <strong>Supercharger Price</strong> (~190 km) — ~20 min", type: "charge" },
            { time: "18:00", text: "⚡ <strong>Supercharger Green River</strong> (~100 km) — ~20 min", type: "charge" },
            { time: "19:00", text: "🏨 Chegada em <strong>Moab</strong>! Check-in", type: "" },
            { time: "19:30", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        day: 22, title: "Dia 22 — Qua, 10/02", location: "Canyonlands NP dia cheio 🏜️",
        route: "Island in the Sky — cânions infinitos!",
        note: "Mesa Arch ao nascer do sol — O arco mais fotografado de Utah!",
        region: "ut",
        items: [
            { time: "06:30", text: "☕ Café cedo", type: "" },
            { time: "07:00", text: "🚗 Saída rumo a <strong>Canyonlands — Island in the Sky</strong> (~40 min)", type: "drive" },
            { time: "07:30", text: "🌅 <strong>Mesa Arch</strong> ao nascer do sol — o sol nasce ATRAVÉS do arco!", type: "highlight" },
            { time: "08:30", text: "📸 <strong>Grand View Point</strong> — cânions infinitos, 360°!", type: "highlight" },
            { time: "09:15", text: "📸 <strong>Green River Overlook</strong> — rio serpenteando", type: "" },
            { time: "10:15", text: "📸 <strong>Buck Canyon Overlook</strong>", type: "" },
            { time: "10:45", text: "📸 <strong>White Rim Overlook</strong> (~3 km ida e volta)", type: "" },
            { time: "11:30", text: "🥾 <strong>Upheaval Dome Trail</strong> (~2.5 km) — cratera misteriosa!", type: "" },
            { time: "12:30", text: "🍽️ Picnic no parque (levem comida!)", type: "food" },
            { time: "14:00", text: "🥾 <strong>Aztec Butte Trail</strong> (~3 km) — ruínas ancestrais Pueblo!", type: "" },
            { time: "16:30", text: "🌅 Pôr do sol no <strong>Grand View Point</strong> — cânions dourados!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        day: 23, title: "Dia 23 — Qui, 11/02", location: "Arches NP + Dead Horse Point",
        route: "Delicate Arch + Dead Horse sunset! 🏜️",
        note: "O arco mais famoso do mundo + vista de 600m sobre o Colorado!",
        region: "ut",
        items: [
            { time: "07:00", text: "☕ Café cedo", type: "" },
            { time: "08:00", text: "🥾 <strong>Delicate Arch Trail</strong> (~5 km, ~2-3h) — o arco mais famoso do MUNDO!", type: "highlight" },
            { time: "10:30", text: "📸 <strong>Windows Section</strong> — North Window, South Window, Turret Arch", type: "" },
            { time: "11:30", text: "📸 <strong>Double Arch</strong> — dois arcos gigantes!", type: "" },
            { time: "12:00", text: "📸 <strong>Balanced Rock</strong>", type: "" },
            { time: "12:30", text: "🍽️ Almoço", type: "food" },
            { time: "14:00", text: "🥾 <strong>Devils Garden Trail até Landscape Arch</strong> (~3 km) — arco mais longo do mundo (93m)!", type: "highlight" },
            { time: "15:30", text: "🏜️ <strong>Fiery Furnace Viewpoint + Park Avenue</strong>", type: "" },
            { time: "17:00", text: "🌅 <strong>Dead Horse Point</strong> — 600m sobre o rio Colorado! Cenário de <strong>Missão Impossível 2</strong> e <strong>Westworld</strong>!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar de despedida de Moab", type: "food" }
        ],
        tips: ["❄️ Arcos com neve em fevereiro são MÁGICOS! Levem botas com tração pra Delicate Arch."]
    },
    {
        day: 24, title: "Dia 24 — Sex, 12/02", location: "Moab → Bryce Canyon",
        route: "Estrada + hoodoos + stargazing! 🌌",
        note: "Navajo Loop ao vivo é INSANO!",
        region: "ut",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Moab", type: "" },
            { time: "09:30", text: "⚡ <strong>Supercharger Green River</strong> (~100 km) — ~20 min", type: "charge" },
            { time: "11:00", text: "⚡ <strong>Supercharger Salina</strong> (~170 km) — ~25 min", type: "charge" },
            { time: "13:30", text: "🏨 Chegada em <strong>Bryce Canyon</strong>! Check-in", type: "" },
            { time: "14:00", text: "🛣️ <strong>Red Canyon</strong> — arcos vermelhos na estrada!", type: "" },
            { time: "14:30", text: "📸 <strong>Sunrise/Sunset Point</strong> — primeira vista dos hoodoos!", type: "highlight" },
            { time: "15:00", text: "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h) — descer ENTRE os hoodoos!", type: "highlight" },
            { time: "17:00", text: "🌅 <strong>Pôr do sol no Bryce Amphitheater</strong> — hoodoos dourados!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar na região", type: "food" },
            { time: "20:30", text: "🌌 <strong>Stargazing em Bryce!</strong> — Via Láctea a olho nu! Faz MUITO frio!", type: "highlight" }
        ],
        tips: ["🔭 Bryce é um dos melhores céus escuros do MUNDO — International Dark Sky Park. Levem cobertores!"]
    },
    {
        day: 25, title: "Dia 25 — Sab, 13/02", location: "Bryce AM → Zion PM",
        route: "Nascer do sol nos hoodoos + chegada em Zion! 🏞️",
        note: "Sunrise em Bryce Point é INESQUECÍVEL!",
        region: "ut",
        items: [
            { time: "06:30", text: "🌅 <strong>Nascer do sol em Bryce Point</strong> — hoodoos iluminados!", type: "highlight" },
            { time: "07:30", text: "☕ Café", type: "" },
            { time: "08:00", text: "🚗 <strong>Scenic Drive</strong>: Inspiration Point, Natural Bridge, Rainbow Point (360°)", type: "" },
            { time: "10:00", text: "🚗 Check-out + saída rumo a <strong>Zion</strong> (~130 km, ~1.5h)", type: "drive" },
            { time: "11:30", text: "🏨 Chegada em <strong>Springdale</strong>! Check-in", type: "" },
            { time: "12:00", text: "🍽️ Almoço em Springdale", type: "food" },
            { time: "13:30", text: "🚌 Shuttle pelo <strong>Zion Canyon Scenic Drive</strong>", type: "" },
            { time: "14:00", text: "🥾 <strong>Riverside Walk</strong> — trilha fácil ao longo do rio", type: "" },
            { time: "15:30", text: "🌄 <strong>Canyon Overlook Trail</strong> (~1h) — vista panorâmica espetacular", type: "highlight" },
            { time: "17:00", text: "🌅 Pôr do sol em Zion — cores incríveis nos paredões!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Springdale", type: "food" }
        ]
    },
    {
        day: 26, title: "Dia 26 — Dom, 14/02 ❤️", location: "Zion NP dia cheio — Valentine's Day!",
        route: "Angels Landing + Emerald Pools! ❤️",
        note: "Uma das trilhas mais ÉPICAS do mundo!",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café em Springdale", type: "" },
            { time: "08:30", text: "🥾 <strong>Angels Landing Trail</strong> (~8 km, ~4h) — uma das mais ÉPICAS do mundo! ⚠️ Precisa de permit!", type: "highlight" },
            { time: "12:30", text: "🍽️ Almoço em Springdale", type: "food" },
            { time: "13:30", text: "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km) — piscinas naturais com cachoeiras", type: "" },
            { time: "15:00", text: "🥾 <strong>Pa'rus Trail</strong> (~6 km) — trilha ao longo do rio Virgin", type: "" },
            { time: "16:00", text: "📸 <strong>Court of the Patriarchs + Weeping Rock</strong>", type: "" },
            { time: "17:00", text: "🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong> — vista panorâmica!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Springdale — merecido depois de Angels Landing!", type: "food" }
        ],
        tips: ["⚠️ Angels Landing exige PERMIT — reservem em recreation.gov! Microspikes essenciais no inverno."]
    },
    {
        day: 27, title: "Dia 27 — Seg, 15/02", location: "Zion → Grand Canyon",
        route: "Rumo ao Grand Canyon via Kanab! 🏜️",
        note: "Um dos pôr do sol mais impressionantes da viagem!",
        region: "ut",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Springdale", type: "" },
            { time: "08:30", text: "🚗 Saída rumo ao <strong>Grand Canyon South Rim</strong> (~270 km, ~3.5h)", type: "drive" },
            { time: "10:00", text: "⚡🍽️ <strong>Kanab, UT</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) + café. GC tem ~130 km internos + próximo SC é Kingman a 260 km!", type: "charge" },
            { time: "~12:15", text: "🏜️ Chegada no <strong>Grand Canyon South Rim</strong>!", type: "highlight" },
            { time: "12:30", text: "📸 <strong>Mather Point</strong> — primeira vista do cânion. ABSURDO!", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço no parque (Market Plaza ou El Tovar)", type: "food" },
            { time: "14:00", text: "🥾 <strong>Rim Trail</strong> (Mather Point → Yavapai Point, ~1.5 km)", type: "" },
            { time: "14:45", text: "🏛️ <strong>Yavapai Geology Museum</strong> — painéis de vidro sobre o abismo", type: "" },
            { time: "16:00", text: "🚗 <strong>Desert View Drive</strong> (~40 km)", type: "drive" },
            { time: "16:30", text: "📸 <strong>Grandview Point</strong> — mirante dramático", type: "" },
            { time: "17:00", text: "🏛️ <strong>Desert View Watchtower</strong> — torre de 1932, vista 360°", type: "" },
            { time: "17:30", text: "🌅 <strong>Pôr do sol no Grand Canyon</strong> — Hopi Point. ESPETACULAR!", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar no parque ou Tusayan", type: "food" }
        ],
        tips: ["🌌 Grand Canyon é International Dark Sky Park — saiam à noite pra ver as estrelas!", "⚠️ CARREGAR ATÉ 100% em Kanab — GC tem 130 km internos + 260 km até Kingman!"]
    },
    {
        day: 28, title: "Dia 28 — Ter, 16/02", location: "Grand Canyon → Las Vegas! 🎰",
        route: "Nascer do sol no GC + Vegas à tarde!",
        note: "Chegada triunfal em Vegas! Grand finale!",
        region: "nv",
        items: [
            { time: "06:30", text: "🌅 <strong>Nascer do sol no Grand Canyon</strong> — Mather/Yaki Point. INESQUECÍVEL!", type: "highlight" },
            { time: "08:00", text: "☕ Café", type: "" },
            { time: "08:30", text: "🥾 <strong>Bright Angel Trail</strong> — primeiros switchbacks (~1.5h)", type: "" },
            { time: "10:00", text: "📸 <strong>Hermit Road</strong> (shuttle) — Hopi Point (vista mais ampla), Pima Point", type: "" },
            { time: "11:00", text: "🚗 Check-out + saída rumo a <strong>Las Vegas</strong> (~430 km, ~4.5h)", type: "drive" },
            { time: "12:45", text: "⚡ <strong>Supercharger Kingman, AZ</strong> (~260 km) — ~25 min. Route 66!", type: "charge" },
            { time: "~15:15", text: "🎰 Chegada em <strong>Las Vegas</strong>! Check-in na Strip!", type: "highlight" },
            { time: "15:30", text: "🍽️ Almoço tardio — <strong>In-N-Out Burger</strong>!", type: "food" },
            { time: "16:30", text: "🎨 <strong>Seven Magic Mountains</strong> — torres neon no deserto!", type: "" },
            { time: "17:00", text: "📸 <strong>Welcome to Las Vegas Sign</strong>!", type: "" },
            { time: "18:00", text: "🏨 Hotéis temáticos — Venetian, Bellagio, Caesars Palace", type: "" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" },
            { time: "21:00", text: "🌃 <strong>Strip à noite</strong> — Bellagio Fountains, cassinos!", type: "highlight" }
        ],
        tips: ["🎰 Chegada triunfal em Vegas depois de 24 dias de roadtrip!"]
    },
    {
        day: 29, title: "Dia 29 — Qua, 17/02", location: "Valley of Fire + Strip",
        route: "Parque mais fotogênico de Nevada! 🔥",
        note: "Fire Wave + Elephant Rock + Strip à noite!",
        region: "nv",
        items: [
            { time: "07:30", text: "☕ Café + saída cedo", type: "" },
            { time: "08:45", text: "🚗 Rumo a <strong>Valley of Fire</strong> (~45 min)", type: "drive" },
            { time: "09:45", text: "🥾 <strong>Fire Wave Trail</strong> (~2 km) — ondas de rocha listrada!", type: "highlight" },
            { time: "10:30", text: "📸 <strong>Elephant Rock</strong>", type: "" },
            { time: "11:00", text: "📸 <strong>White Domes Trail</strong> (~1.8 km) — cânion colorido", type: "" },
            { time: "11:45", text: "🚗 Volta pra Vegas (~1h)", type: "drive" },
            { time: "12:45", text: "🍽️ Almoço na Strip", type: "food" },
            { time: "14:00", text: "🛍️ <strong>Outlets</strong> — Las Vegas North Premium Outlets", type: "" },
            { time: "17:00", text: "🎲 Passeio pela Strip", type: "" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" }
        ]
    },
    {
        day: 30, title: "Dia 30 — Qui, 18/02", location: "Day trip Death Valley 🏜️",
        route: "Ponto mais baixo das Américas!",
        note: "Inverno é a melhor época pra Death Valley!",
        region: "nv",
        items: [
            { time: "07:00", text: "☕ Café + saída cedo de Vegas", type: "" },
            { time: "~09:00", text: "🏜️ Chegada em <strong>Death Valley National Park</strong>", type: "" },
            { time: "09:30", text: "📸 <strong>Zabriskie Point</strong> — formações douradas", type: "highlight" },
            { time: "10:30", text: "🚗 <strong>Artist's Drive + Artist's Palette</strong> — montanhas coloridas", type: "" },
            { time: "11:30", text: "⬇️ <strong>Badwater Basin</strong> — ponto mais baixo das Américas (-86m)!", type: "highlight" },
            { time: "12:30", text: "🍽️ Almoço — lanche/picnic (levar de Vegas)", type: "food" },
            { time: "13:30", text: "🏜️ <strong>Mesquite Flat Sand Dunes</strong> — dunas clássicas", type: "" },
            { time: "14:30", text: "👀 <strong>Dante's View</strong> — mirante panorâmico", type: "" },
            { time: "15:30", text: "🚗 Volta pra Vegas (~2h)", type: "drive" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" }
        ]
    },
    {
        day: 31, title: "Dia 31 — Sex, 19/02", location: "Red Rock Canyon + Strip",
        route: "Último dia cheio em Vegas! 🏜️",
        note: "Red Rock de manhã, Strip à tarde!",
        region: "nv",
        items: [
            { time: "08:00", text: "☕ Café", type: "" },
            { time: "08:30", text: "🚗 <strong>Red Rock Canyon</strong> (~30 min da Strip)", type: "drive" },
            { time: "09:00", text: "🏜️ <strong>Scenic Loop Drive</strong> (~21 km)", type: "" },
            { time: "09:30", text: "🥾 <strong>Calico Tanks Trail</strong> (~4 km) — vista panorâmica de Vegas!", type: "highlight" },
            { time: "11:00", text: "🚗 Volta pra Strip", type: "drive" },
            { time: "12:00", text: "🍽️ Almoço na Strip", type: "food" },
            { time: "13:30", text: "🏨 Tempo livre — piscina, compras, cassino", type: "" },
            { time: "19:00", text: "🍽️ Último jantar em Vegas! <strong>Gordon Ramsay Hell's Kitchen</strong> ou <strong>Nobu</strong>", type: "food" },
            { time: "21:00", text: "🌃 Última noite na Strip — Bellagio Fountains!", type: "highlight" }
        ],
        tips: ["💡 Red Rock Canyon é uma surpresa: cânion LINDO a 30 min da Strip!"]
    },
    {
        day: 32, title: "Dia 32 — Sab, 20/02", location: "Vegas → Los Angeles",
        route: "Rumo a LA! Último trecho de roadtrip! 🎬",
        note: "Santa Monica Pier ao pôr do sol!",
        region: "ca",
        items: [
            { time: "08:30", text: "☕ Café + check-out de Vegas", type: "" },
            { time: "09:00", text: "🚗 Saída rumo a <strong>Los Angeles</strong> (~430 km, ~4.5h)", type: "drive" },
            { time: "10:45", text: "⚡ <strong>Supercharger Barstow</strong> (~250 km) — ~25 min. Maior SC do mundo!", type: "charge" },
            { time: "~13:15", text: "🏨 Chegada em <strong>LA</strong>! Check-in", type: "" },
            { time: "14:00", text: "🍽️ Almoço", type: "food" },
            { time: "17:00", text: "🏞️ <strong>Santa Monica Pier</strong> — roda-gigante, praia!", type: "" },
            { time: "18:00", text: "🌅 Pôr do sol no Pacífico!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em <strong>Santa Monica</strong>", type: "food" }
        ]
    },
    {
        day: 33, title: "Dia 33 — Dom, 21/02", location: "LA — Malibu + Venice + Griffith",
        route: "Último dia nos EUA! 🎬",
        note: "Malibu, Venice e Griffith Observatory à noite!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🏖️ <strong>Malibu</strong> — praias icônicas, PCH cênica", type: "" },
            { time: "10:30", text: "🏝️ <strong>El Matador Beach</strong> — grutas, arcos de rocha no mar!", type: "highlight" },
            { time: "12:00", text: "🍽️ Almoço em Malibu", type: "food" },
            { time: "13:30", text: "🏖️ <strong>Venice Beach</strong> — Muscle Beach, murais, skatepark", type: "" },
            { time: "15:00", text: "📸 <strong>Hollywood Sign</strong> — vista do Griffith Park", type: "" },
            { time: "16:00", text: "🛍️ Compras de última hora", type: "" },
            { time: "17:30", text: "🍽️ Último jantar nos EUA!", type: "food" },
            { time: "19:30", text: "🔭 <strong>Griffith Observatory à noite</strong> — telescópios + LA iluminada! Despedida perfeita!", type: "highlight" },
            { time: "21:30", text: "🧳 Hotel — arrumar malas", type: "" }
        ]
    },
    {
        day: 34, title: "Dia 34 — Seg, 22/02", location: "LA → Voo de volta ✈️",
        route: "Dia da volta! 🇧🇷",
        note: "Devolução do Tesla + voo MIA → GIG.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out", type: "" },
            { time: "09:00", text: "🚗 Devolução do Tesla no LAX", type: "drive" },
            { time: "10:00", text: "Chegada no LAX — check-in", type: "" },
            { time: "11:00", text: "🛍️ Últimas compras duty free", type: "" },
            { time: "13:45", text: "✈️ Voo AA 608 → Miami (conexão)", type: "drive" },
            { time: "21:44", text: "Chegada em Miami", type: "" },
            { time: "22:55", text: "✈️ Voo AA 905 → Rio de Janeiro", type: "drive" }
        ],
        tips: ["Chegada no Rio: 23/02 (terça) às 09:25 🇧🇷 Bem-vindos de volta!"]
    }
];

const hotels = [
    { num: 1, name: "Marriott Marquis, Times Square, NY", checkin: "21/01", checkout: "25/01", nights: 4 },
    { num: 2, name: "Three Rivers, CA (Sequoia)", checkin: "25/01", checkout: "27/01", nights: 2 },
    { num: 3, name: "Yosemite NP, CA", checkin: "27/01", checkout: "29/01", nights: 2 },
    { num: 4, name: "San Francisco, CA", checkin: "29/01", checkout: "01/02", nights: 3 },
    { num: 5, name: "Eureka / Arcata, CA", checkin: "01/02", checkout: "02/02", nights: 1 },
    { num: 6, name: "Crescent City, CA", checkin: "02/02", checkout: "03/02", nights: 1 },
    { num: 7, name: "Gold Beach / Coos Bay, OR", checkin: "03/02", checkout: "04/02", nights: 1 },
    { num: 8, name: "Cannon Beach, OR", checkin: "04/02", checkout: "05/02", nights: 1 },
    { num: 9, name: "Forks / Port Angeles, WA", checkin: "05/02", checkout: "07/02", nights: 2 },
    { num: 10, name: "Olympia, WA", checkin: "07/02", checkout: "08/02", nights: 1 },
    { num: 11, name: "Boise, ID", checkin: "08/02", checkout: "09/02", nights: 1 },
    { num: 12, name: "Moab, UT", checkin: "09/02", checkout: "12/02", nights: 3 },
    { num: 13, name: "Bryce Canyon, UT", checkin: "12/02", checkout: "13/02", nights: 1 },
    { num: 14, name: "Springdale, UT (Zion)", checkin: "13/02", checkout: "15/02", nights: 2 },
    { num: 15, name: "Grand Canyon, AZ (Tusayan)", checkin: "15/02", checkout: "16/02", nights: 1 },
    { num: 16, name: "Las Vegas, NV (Strip)", checkin: "16/02", checkout: "20/02", nights: 4 },
    { num: 17, name: "Los Angeles, CA", checkin: "20/02", checkout: "22/02", nights: 2 }
];

const parks = [
    { name: "🌲 Sequoia National Park", days: "Dia 7", highlights: "General Sherman Tree (maior árvore do mundo em volume!), Congress Trail, Moro Rock (350 degraus, vista 360°), Crescent Meadow." },
    { name: "🏞️ Kings Canyon National Park", days: "Dia 7", highlights: "General Grant Tree, Kings Canyon Scenic Byway, Zumwalt Meadow Trail, Roaring River Falls." },
    { name: "🏞️ Yosemite National Park", days: "Dias 8–10", highlights: "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Vernal Fall, Mirror Lake, Badger Pass Ski Area." },
    { name: "🌲 Redwood National Park", days: "Dia 14", highlights: "Fern Canyon (Jurassic Park 2!), Lady Bird Johnson Grove, Prairie Creek, Stout Grove, Gold Bluffs Beach." },
    { name: "🌲 Olympic National Park", days: "Dias 17–18", highlights: "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push Beach (Twilight!), Rialto Beach, Sol Duc Falls." },
    { name: "🌋 Mt. Rainier National Park", days: "Dia 19", highlights: "Paradise, Nisqually Vista Trail, vulcão de 4.392m coberto de neve, Henry M. Jackson Visitor Center." },
    { name: "🏜️ Canyonlands National Park", days: "Dia 22", highlights: "Mesa Arch ao nascer do sol, Grand View Point, Green River Overlook, Upheaval Dome, Aztec Butte." },
    { name: "🏜️ Arches National Park", days: "Dia 23", highlights: "Delicate Arch (o arco mais famoso do mundo!), Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace." },
    { name: "🏔️ Bryce Canyon National Park", days: "Dias 24–25", highlights: "Navajo Loop, Queen's Garden Trail, hoodoos, Bryce Amphitheater, stargazing (International Dark Sky Park!)." },
    { name: "🏞️ Zion National Park", days: "Dias 25–26", highlights: "Angels Landing (precisa permit!), Canyon Overlook Trail, Emerald Pools, Riverside Walk, Pa'rus Trail." },
    { name: "🏞️ Grand Canyon National Park", days: "Dias 27–28", highlights: "Mather Point, Bright Angel Trail, Desert View Watchtower, Hermit Road, Rim Trail, nascer/pôr do sol ÉPICOS." },
    { name: "🏜️ Death Valley National Park", days: "Dia 30", highlights: "Badwater Basin (-86m!), Zabriskie Point, Artist's Palette, Mesquite Sand Dunes, Dante's View." }
];

const superchargers = [
    { day: 6, name: "Tejon / Lebec, CA", leg: "LAX → Three Rivers", critical: true, note: "⚠️ CARREGAR ATÉ 100% — Sequoia sem carregadores!", noteEn: "⚠️ CHARGE TO 100% — No chargers in Sequoia!" },
    { day: 10, name: "Manteca / Oakdale, CA", leg: "Yosemite → SF", critical: false },
    { day: 13, name: "Ukiah, CA", leg: "SF → Eureka", critical: false },
    { day: 15, name: "Coos Bay, OR", leg: "Crescent City → Coos Bay", critical: false },
    { day: 16, name: "Lincoln City, OR", leg: "Coos Bay → Cannon Beach", critical: false },
    { day: 17, name: "Aberdeen, WA", leg: "Cannon Beach → Forks", critical: true, note: "⚠️ CARREGAR ATÉ 100% — Olympic 265 km internos + sem SC até Olympia!", noteEn: "⚠️ CHARGE TO 100% — Olympic 165 mi internal + no SC until Olympia!" },
    { day: 19, name: "Olympia / Tacoma, WA", leg: "Forks → Olympia", critical: false },
    { day: 20, name: "The Dalles, OR", leg: "Olympia → Boise", critical: false },
    { day: 20, name: "Pendleton, OR", leg: "Olympia → Boise", critical: false },
    { day: 20, name: "Baker City, OR", leg: "Olympia → Boise", critical: false },
    { day: 21, name: "Twin Falls, ID", leg: "Boise → Moab", critical: false },
    { day: 21, name: "Salt Lake City, UT", leg: "Boise → Moab", critical: false },
    { day: 21, name: "Price, UT", leg: "Boise → Moab", critical: false },
    { day: 21, name: "Green River, UT", leg: "Boise → Moab", critical: false },
    { day: 24, name: "Green River, UT", leg: "Moab → Bryce", critical: false },
    { day: 24, name: "Salina, UT", leg: "Moab → Bryce", critical: false },
    { day: 27, name: "Kanab, UT", leg: "Zion → Grand Canyon", critical: true, note: "⚠️ CARREGAR ATÉ 100% — GC 130 km internos + 260 km até Kingman!", noteEn: "⚠️ CHARGE TO 100% — GC 80 mi internal + 160 mi to Kingman!" },
    { day: 28, name: "Kingman, AZ", leg: "Grand Canyon → Vegas", critical: false },
    { day: 32, name: "Barstow, CA", leg: "Vegas → LA", critical: false, note: "Maior Supercharger do mundo! 120 stalls" }
];
