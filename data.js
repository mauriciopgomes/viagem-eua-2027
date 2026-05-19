// ==================== TRIP DATA ====================
// Roteiro Reverso — Viagem EUA 2027 (sentido horário)
// NYC → Vegas → Utah → PNW → Costa Oregon → SF → Yosemite → Sequoia → LA

const dayPhotos = {
    1: 'img/dia-01.jpg',                          // NYC — Times Square
    2: 'img/dia-02.jpg',                          // NYC — Brooklyn Bridge
    3: 'img/dia-03.jpg',                          // NYC — Central Park
    4: 'img/dia-04.jpg',                          // NYC — Skyline
    5: 'img/dia-05.jpg',                          // Voo NYC → Vegas
    6: 'img/dia-29.jpg',                          // Las Vegas — Welcome Sign
    7: 'img/dia-31.jpg',                          // Valley of Fire
    8: 'img/dia-32.jpg',                          // Death Valley
    9: 'img/dia-27.jpg',                          // Grand Canyon
    10: 'img/dia-26.jpg',                         // Zion NP
    11: 'img/dia-24.jpg',                         // Bryce Canyon
    12: 'img/dia-25.jpg',                         // Bryce Canyon — Hoodoos
    13: 'img/dia-22.jpg',                         // Canyonlands — Mesa Arch
    14: 'img/dia-21.jpg',                         // Arches — Delicate Arch
    15: 'img/activities/temple_square.jpg',       // Salt Lake City
    16: 'img/activities/shoshone_falls.jpg',      // Boise — Shoshone Falls
    17: 'img/activities/columbia_river_gorge.jpg',// Centralia — Columbia River Gorge
    18: 'img/dia-19.jpg',                         // Mt Rainier
    19: 'img/dia-17.jpg',                         // Olympic NP — Hoh Rain Forest
    20: 'img/dia-16.jpg',                         // Cannon Beach
    21: 'img/dia-15.jpg',                         // Oregon Coast
    22: 'img/dia-14.jpg',                         // Redwood NP — Fern Canyon
    23: 'img/dia-13.jpg',                         // Eureka — Lighthouse
    24: 'img/dia-11.jpg',                         // San Francisco — Golden Gate
    25: 'img/dia-12.jpg',                         // San Francisco — Muir Woods
    26: 'img/activities/malibu_pch.jpg',          // PCH — Malibu
    27: 'img/dia-08.jpg',                         // Yosemite — Tunnel View
    28: 'img/dia-09.jpg',                         // Yosemite — Half Dome
    29: 'img/dia-07.jpg',                         // Three Rivers — Sequoia Forest
    30: 'img/dia-06.jpg',                         // Sequoia NP — General Sherman
    31: 'img/dia-33.jpg',                         // Los Angeles — Hollywood Sign
    32: 'img/dia-34.jpg',                         // Los Angeles — Santa Monica Pier
    33: 'img/dia-30.jpg',                         // Volta pra casa — Vegas Strip
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
            { time: "10:30", text: "☕ Café da manhã perto do hotel", type: "food" },
            { time: "11:00", text: "🎮 <strong>Nintendo NY</strong> (10 Rockefeller Plaza) — loja oficial, 2 andares de games!", type: "highlight" },
            { time: "12:15", text: "⛪ <strong>St. Patrick's Cathedral</strong> (5th Ave com 50th St) — gratuita, linda por dentro", type: "" },
            { time: "12:30", text: "🧸 <strong>FAO Schwarz</strong> (30 Rockefeller Plaza) — loja de brinquedos icônica", type: "" },
            { time: "12:45", text: "🧱 <strong>LEGO Store</strong> (636 5th Ave) — maquetes gigantes de NY em LEGO", type: "" },
            { time: "13:15", text: "🍕 Almoço — <strong>Joe's Pizza</strong> (clássica de NY!)", type: "food" },
            { time: "14:00", text: "🚶 Passeio pela <strong>5th Avenue</strong> — Saks, Tiffany's, Apple Store (cubo de vidro!)", type: "" },
            { time: "15:00", text: "📸 <strong>Rockefeller Center Plaza</strong> — pista de patinação, bandeiras", type: "" },
            { time: "15:30", text: "🧊 <strong>Bryant Park</strong> — Winter Village no inverno (mercadinho, patinação)", type: "" },
            { time: "19:00", text: "🍔 Jantar em <strong>Hell's Kitchen</strong> (9th Ave) — Shake Shack, Empanada Mama", type: "food" },
            { time: "20:30", text: "🏨 Hotel — descanso (jet lag!)", type: "" }
        ]
    },
    {
        day: 2, title: "Dia 2 — Sex, 22/01", location: "New York, NY",
        route: "Downtown + Brooklyn + Chelsea 🌉",
        note: "Dia intenso! WTC, Brooklyn Bridge, DUMBO, SoHo, High Line, Hudson Yards.",
        region: "ny",
        items: [
            { time: "08:00", text: "☕ Café no hotel ou próximo", type: "" },
            { time: "09:00", text: "👻 <strong>Ghostbusters Firehouse</strong> (14 North Moore St) — quartel real dos Caça-Fantasmas!", type: "" },
            { time: "09:20", text: "🏛️ <strong>Wall Street + Charging Bull + Fearless Girl</strong>", type: "" },
            { time: "09:40", text: "⛪ <strong>Oculus</strong> (WTC) — arquitetura de Calatrava impressionante", type: "highlight" },
            { time: "10:10", text: "🕊️ <strong>9/11 Memorial</strong> — piscinas nos locais das torres. Gratuito", type: "highlight" },
            { time: "10:45", text: "👔 <strong>7 World Trade Center</strong> — escritório Pearson Specter (Suits!)", type: "" },
            { time: "11:00", text: "🌉 <strong>Brooklyn Bridge</strong> a pé — travessia ~30 min", type: "highlight" },
            { time: "11:30", text: "📸 <strong>DUMBO</strong> — foto clássica na Washington St", type: "" },
            { time: "12:00", text: "🌳 <strong>Brooklyn Bridge Park + Jane's Carousel</strong>", type: "" },
            { time: "12:30", text: "🍕 Almoço — <strong>Juliana's Pizza</strong> ou <strong>Time Out Market</strong> (rooftop!)", type: "food" },
            { time: "14:00", text: "🛍️ <strong>SoHo</strong> — lojas, arte de rua, cafés", type: "" },
            { time: "14:30", text: "🏛️ <strong>Washington Square Park</strong> — arco icônico, Greenwich Village", type: "" },
            { time: "15:00", text: "🏙️ <strong>Chelsea Market</strong> + 🌮 <strong>Los Tacos No.1</strong>", type: "food" },
            { time: "15:30", text: "🌿 <strong>High Line</strong> — parque elevado num antigo trilho de trem", type: "highlight" },
            { time: "16:00", text: "🏢 <strong>Pier 57</strong> (sede Google NY) + 🌴 <strong>Little Island</strong> (parque flutuante)", type: "" },
            { time: "16:30", text: "🌇 <strong>Hudson Yards + The Vessel</strong>", type: "highlight" },
            { time: "17:30", text: "🍽️ Jantar na região (Chelsea, Hudson Yards ou Midtown)", type: "food" },
            { time: "19:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        day: 3, title: "Dia 3 — Sab, 23/01", location: "New York, NY",
        route: "Central Park + Chinatown + Downtown 🌳",
        note: "Norte → Sul! Central Park, depois desce: Chinatown, Little Italy, Katz's.",
        region: "ny",
        items: [
            { time: "08:00", text: "☕ Café — <strong>Levain Bakery</strong> (167 W 74th St) — cookies famosos!", type: "food" },
            { time: "09:00", text: "🌳 <strong>Central Park</strong> — Strawberry Fields, Bethesda Fountain, Bow Bridge", type: "highlight" },
            { time: "10:30", text: "🏛️ <strong>MET</strong> (opcional ~2h) — na 82nd com 5th! Ingresso ~$30", type: "" },
            { time: "12:30", text: "🏨 <strong>The Plaza Hotel</strong> — hotel do Kevin em Esqueceram de Mim 2!", type: "" },
            { time: "13:00", text: "🍔 Almoço — <strong>Shake Shack</strong> (Columbus Circle ou Midtown)", type: "food" },
            { time: "15:00", text: "🏮 <strong>Chinatown</strong> — Canal St + Mott St, a maior dos EUA!", type: "highlight" },
            { time: "16:30", text: "🍝 <strong>Little Italy</strong> — Mulberry St. Cannoli na <strong>Ferrara Bakery</strong> (desde 1892!)", type: "" },
            { time: "17:30", text: "🍖 Jantar — <strong>Katz's Deli</strong> (205 E Houston St) — pastrami lendário!", type: "food" },
            { time: "19:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        day: 4, title: "Dia 4 — Dom, 24/01", location: "New York, NY",
        route: "Mirante + Flatiron + Despedida 🏙️",
        note: "Último dia em NY. Roosevelt Island, Summit, Grand Central, Flatiron.",
        region: "ny",
        items: [
            { time: "08:30", text: "☕ Café — <strong>Ess-a-Bagel</strong> (831 3rd Ave com 51st St)", type: "food" },
            { time: "09:15", text: "🚡 <strong>Roosevelt Island Tramway</strong> (59th St com 2nd Ave) — bondinho aéreo! $2.90", type: "highlight" },
            { time: "10:15", text: "🏙️ <strong>Summit One Vanderbilt</strong> (45 E 42nd St) — mirante imersivo de espelhos! ~1.5h", type: "highlight" },
            { time: "12:00", text: "🚶 <strong>Grand Central Terminal</strong> — teto estrelado, relógio de opala", type: "highlight" },
            { time: "12:30", text: "🍝 Almoço — <strong>Eataly</strong> (200 5th Ave) — mercado italiano!", type: "food" },
            { time: "13:30", text: "🏢 <strong>Flatiron Building</strong> (23rd St) — prédio triangular de 1902!", type: "" },
            { time: "14:00", text: "🎮 Voltar na <strong>Nintendo NY</strong> ou explorar algo novo", type: "" },
            { time: "16:00", text: "Tempo livre — descansar no hotel ou última exploração", type: "" },
            { time: "18:00", text: "🧳 Volta ao hotel — arrumar malas", type: "" },
            { time: "19:00", text: "🍽️ Jantar", type: "food" },
            { time: "21:00", text: "🏨 Hotel — dormir cedo (voo amanhã!)", type: "" }
        ]
    },
    {
        day: 5, title: "Dia 5 — Seg, 25/01", location: "New York → LAX → Las Vegas",
        route: "NY → LA → Vegas! ✈️🚗",
        note: "Check-out do Marriott, voo pro LAX, retirada do Tesla, direto pra Vegas!",
        region: "nv",
        items: [
            { time: "07:30", text: "☕ Café no Marriott Marquis", type: "" },
            { time: "08:00", text: "🏨 Check-out", type: "" },
            { time: "08:30", text: "🚕 Times Square → JFK (Uber ~$70, ~60 min)", type: "drive" },
            { time: "~09:30", text: "Chegada no JFK — check-in / despachar malas", type: "" },
            { time: "11:00", text: "✈️ Voo AA 3 → Los Angeles (~5.5h)", type: "drive" },
            { time: "14:20", text: "✈️ Chegada no LAX (horário local, -3h)", type: "drive" },
            { time: "~15:30", text: "🚗 Retirada do <strong>Tesla Model Y</strong>", type: "drive" },
            { time: "16:00", text: "🛣️ Saída rumo a <strong>Las Vegas</strong> (~430 km, ~4.5h via I-15 N)", type: "drive" },
            { time: "18:00", text: "⚡ <strong>Supercharger Barstow, CA</strong> (~250 km) — ~25 min", type: "charge" },
            { time: "18:30", text: "🚗 Continuação até Vegas (~185 km, ~2h)", type: "drive" },
            { time: "~20:30", text: "🎰 Chegada em <strong>Las Vegas</strong>! Check-in", type: "" },
            { time: "21:00", text: "🍽️ Jantar leve na Strip ou no hotel", type: "food" }
        ]
    },
    {
        day: 6, title: "Dia 6 — Ter, 26/01", location: "Mt. Charleston + Vegas 🎰",
        route: "Neve a 45 min de Vegas! Tarde na Strip.",
        note: "Contraste incrível: neve nas montanhas → deserto na Strip!",
        region: "nv",
        items: [
            { time: "07:30", text: "☕ Café + saída", type: "" },
            { time: "08:15", text: "🚗 Rumo a <strong>Mt. Charleston</strong> (~55 km, ~45 min)", type: "drive" },
            { time: "09:00", text: "🏔️ <strong>Kyle Canyon Scenic Drive</strong> — neve nas montanhas!", type: "" },
            { time: "09:30", text: "⛄ Parada — <strong>brincar na neve!</strong> Boneco de neve, guerra de bolas!", type: "highlight" },
            { time: "10:30", text: "🥾 <strong>Cathedral Rock Trail</strong> (~4 km, ~1.5h) — vista panorâmica", type: "" },
            { time: "12:00", text: "☕ <strong>Mt. Charleston Lodge</strong> — chocolate quente com lareira!", type: "food" },
            { time: "13:00", text: "🚗 Volta pra Vegas (~45 min)", type: "drive" },
            { time: "14:00", text: "📸 <strong>Welcome to Las Vegas Sign</strong> — foto icônica!", type: "" },
            { time: "14:30", text: "🏨 Hotéis temáticos — Venetian, Bellagio (jardim + fontes), Caesars Palace", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" },
            { time: "21:00", text: "🌃 <strong>Strip à noite</strong> — Bellagio Fountains, cassinos, neon!", type: "highlight" }
        ],
        tips: ["🏔️ Mt. Charleston: 3.600m — pode estar -5°C com neve enquanto Vegas está 10°C! Levar casaco, luvas e botas."]
    },
    {
        day: 7, title: "Dia 7 — Qua, 27/01", location: "Valley of Fire + Strip",
        route: "Parque mais fotogênico de Nevada! 🔥",
        note: "Fire Wave + Elephant Rock de manhã, tarde livre na Strip.",
        region: "nv",
        items: [
            { time: "07:30", text: "☕ Café + saída cedo", type: "" },
            { time: "08:45", text: "🚗 Rumo a <strong>Valley of Fire</strong> (~45 min pela I-15 N)", type: "drive" },
            { time: "09:30", text: "🔥 <strong>Valley of Fire</strong> — arenito vermelho surreal!", type: "highlight" },
            { time: "09:45", text: "🥾 <strong>Fire Wave Trail</strong> (~2 km) — ondas de rocha listrada!", type: "highlight" },
            { time: "10:30", text: "📸 <strong>Elephant Rock</strong>", type: "" },
            { time: "11:00", text: "📸 <strong>White Domes Trail</strong> (~1.8 km) — cânion colorido", type: "" },
            { time: "11:45", text: "🚗 Volta pra Vegas (~1h)", type: "drive" },
            { time: "12:45", text: "🍽️ Almoço na Strip", type: "food" },
            { time: "14:00", text: "Tempo livre — descanso, piscina, explorar a Strip", type: "" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" }
        ]
    },
    {
        day: 8, title: "Dia 8 — Qui, 28/01", location: "Day trip Death Valley 🏜️",
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
            { time: "~17:30", text: "Chegada em Vegas — descanso", type: "" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" }
        ],
        tips: ["⚡ EV: Round trip ~380 km. Carregar a 100% na noite anterior! SC em Pahrump no caminho se precisar."]
    },
    {
        day: 9, title: "Dia 9 — Sex, 29/01", location: "Vegas → Grand Canyon → Zion",
        route: "GC de tarde + Zion à noite! 🏜️",
        note: "Dia longo (~700 km) mas épico — GC à tarde é suficiente!",
        region: "ut",
        items: [
            { time: "06:30", text: "☕ Café + check-out de Vegas", type: "" },
            { time: "07:00", text: "🚗 Saída rumo ao <strong>Grand Canyon South Rim</strong> (~430 km, ~4.5h)", type: "drive" },
            { time: "09:00", text: "⚡ <strong>Supercharger Kingman, AZ</strong> (~260 km) — ~25 min. Route 66!", type: "charge" },
            { time: "~11:30", text: "🏜️ Chegada no <strong>Grand Canyon South Rim</strong>!", type: "highlight" },
            { time: "11:45", text: "📸 <strong>Mather Point</strong> — vista absurda do cânion!", type: "highlight" },
            { time: "12:15", text: "🍽️ Almoço no parque (Market Plaza ou El Tovar)", type: "food" },
            { time: "13:00", text: "🥾 <strong>Rim Trail</strong> (Mather Point → Yavapai Point, ~1.5 km)", type: "" },
            { time: "13:45", text: "🏛️ <strong>Yavapai Geology Museum</strong> — painéis de vidro sobre o abismo", type: "" },
            { time: "14:30", text: "📸 <strong>Bright Angel Trailhead</strong> — trilha mais famosa", type: "" },
            { time: "15:00", text: "📸 <strong>Hopi Point</strong> — vista mais ampla do cânion", type: "" },
            { time: "15:30", text: "🚗 Saída rumo a <strong>Zion / Springdale</strong> (~270 km, ~3.5h)", type: "drive" },
            { time: "17:00", text: "⚡ <strong>Kanab, UT</strong> (~130 km) — ~25 min + Little Hollywood!", type: "charge" },
            { time: "~19:00", text: "🏨 Chegada em <strong>Springdale</strong>! Check-in", type: "" },
            { time: "19:30", text: "🍽️ Jantar em Springdale", type: "food" }
        ],
        tips: ["⚡ Carregar em Kingman na ida. Em Kanab, carregar pra Springdale (~60 km). Próximo SC: Cedar City (~100 km)."]
    },
    {
        day: 10, title: "Dia 10 — Sab, 30/01", location: "Zion NP dia cheio",
        route: "Trilhas, mirantes e pôr do sol! 🏞️",
        note: "Dia cheio em Zion — ~11 km de caminhada!",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café em Springdale", type: "" },
            { time: "08:00", text: "🚌 Shuttle pra Zion Canyon", type: "" },
            { time: "08:30", text: "🥾 <strong>Watchman Trail</strong> (~5 km, ~2h) — vista panorâmica do cânion!", type: "highlight" },
            { time: "10:30", text: "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km) — cachoeiras!", type: "" },
            { time: "12:30", text: "🍽️ Almoço em Springdale ou Zion Lodge", type: "food" },
            { time: "13:30", text: "📸 <strong>Court of the Patriarchs</strong> — três picos imponentes", type: "" },
            { time: "14:00", text: "🛍️ Explorar <strong>Springdale</strong> — galerias de arte, lojinhas", type: "" },
            { time: "15:00", text: "📸 <strong>Big Bend</strong> — vista do Angels Landing", type: "" },
            { time: "15:30", text: "🌄 <strong>Canyon Overlook Trail</strong> (~1.6 km, ~1h) — mirante espetacular!", type: "highlight" },
            { time: "16:30", text: "🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Springdale", type: "food" }
        ]
    },
    {
        day: 11, title: "Dia 11 — Dom, 31/01", location: "Zion AM → Bryce PM",
        route: "Última manhã em Zion + Bryce à tarde! 🏔️",
        note: "Navajo Loop + pôr do sol + stargazing em Bryce!",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café em Springdale", type: "" },
            { time: "08:00", text: "🚌 Shuttle pra Zion Canyon", type: "" },
            { time: "08:30", text: "🥾 <strong>Riverside Walk</strong> — trilha ao longo do rio", type: "" },
            { time: "09:30", text: "📸 Últimas fotos em Zion — <strong>Big Bend</strong>, mirantes favoritos", type: "" },
            { time: "10:30", text: "🚗 Check-out + saída rumo a <strong>Bryce Canyon</strong> (~130 km, ~1.5h)", type: "drive" },
            { time: "11:00", text: "🛣️ <strong>Red Canyon</strong> — arcos vermelhos na estrada!", type: "" },
            { time: "12:00", text: "🏨 Chegada em <strong>Bryce Canyon</strong>! Check-in", type: "" },
            { time: "12:30", text: "🍽️ Almoço", type: "food" },
            { time: "13:30", text: "📸 <strong>Sunrise/Sunset Point</strong> — primeira vista dos hoodoos!", type: "highlight" },
            { time: "14:00", text: "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h) — entre os hoodoos!", type: "highlight" },
            { time: "16:00", text: "🚗 <strong>Scenic Drive</strong>: Inspiration Point, Natural Bridge, Rainbow Point", type: "" },
            { time: "17:30", text: "🌅 <strong>Pôr do sol no Bryce Amphitheater</strong> — hoodoos dourados!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar na região", type: "food" },
            { time: "20:30", text: "🌌 <strong>Stargazing em Bryce!</strong> — International Dark Sky Park. Via Láctea a olho nu!", type: "highlight" }
        ],
        tips: ["🔭 Bryce é um dos melhores céus escuros do MUNDO! Levem cobertores — faz MUITO frio!"]
    },
    {
        day: 12, title: "Dia 12 — Seg, 01/02", location: "Bryce → Moab",
        route: "Nascer do sol em Bryce + Corona Arch! 🏜️",
        note: "Sunrise épico, depois estrada até Moab.",
        region: "ut",
        items: [
            { time: "06:30", text: "🌅 <strong>Nascer do sol em Bryce Point</strong> — hoodoos iluminados!", type: "highlight" },
            { time: "07:30", text: "☕ Café + check-out", type: "" },
            { time: "08:00", text: "🚗 Saída rumo a <strong>Moab</strong> (~430 km, ~5h)", type: "drive" },
            { time: "09:30", text: "⚡ <strong>Supercharger Salina, UT</strong> (~170 km) — ~25 min", type: "charge" },
            { time: "11:30", text: "⚡ <strong>Supercharger Green River, UT</strong> (~170 km) — ~20 min", type: "charge" },
            { time: "~13:00", text: "🏨 Chegada em <strong>Moab</strong>! Check-in", type: "" },
            { time: "13:30", text: "🍽️ Almoço em Moab", type: "food" },
            { time: "14:30", text: "🥾 <strong>Corona Arch Trail</strong> (~5 km, ~2h) — arco gigante sem multidões!", type: "highlight" },
            { time: "16:30", text: "🚗 <strong>Scenic Byway 128</strong> — paredões vermelhos ao longo do rio Colorado", type: "" },
            { time: "17:30", text: "🌅 Pôr do sol em Moab", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        day: 13, title: "Dia 13 — Ter, 02/02", location: "Canyonlands NP dia cheio 🏜️",
        route: "Island in the Sky — cânions infinitos!",
        note: "Mesa Arch ao nascer do sol — o sol nasce ATRAVÉS do arco!",
        region: "ut",
        items: [
            { time: "06:30", text: "☕ Café cedo", type: "" },
            { time: "07:00", text: "🚗 Saída rumo a <strong>Canyonlands — Island in the Sky</strong> (~40 min)", type: "drive" },
            { time: "07:30", text: "🌅 <strong>Mesa Arch</strong> ao nascer do sol — o arco mais fotografado de Utah!", type: "highlight" },
            { time: "08:30", text: "📸 <strong>Grand View Point</strong> — cânions infinitos, 360°!", type: "highlight" },
            { time: "09:15", text: "📸 <strong>Green River Overlook</strong> — rio serpenteando", type: "" },
            { time: "09:45", text: "🏞️ <strong>Shafer Canyon Overlook</strong> — vista vertiginosa", type: "" },
            { time: "10:15", text: "📸 <strong>Buck Canyon Overlook</strong>", type: "" },
            { time: "10:45", text: "📸 <strong>White Rim Overlook</strong> (~3 km ida e volta)", type: "" },
            { time: "11:30", text: "🥾 <strong>Upheaval Dome Trail</strong> (~2.5 km) — cratera misteriosa!", type: "" },
            { time: "12:30", text: "🍽️ Picnic no parque (levem comida!)", type: "food" },
            { time: "14:00", text: "🥾 <strong>Aztec Butte Trail</strong> (~3 km) — ruínas ancestrais Pueblo!", type: "" },
            { time: "16:30", text: "🌅 Pôr do sol no <strong>Grand View Point</strong> — cânions dourados!", type: "highlight" },
            { time: "17:30", text: "🚗 Descida pela <strong>Potash Road</strong> — estrada cênica + petroglifos!", type: "" },
            { time: "18:00", text: "📸 <strong>Thelma & Louise Point</strong> — cena final do filme!", type: "" },
            { time: "19:00", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        day: 14, title: "Dia 14 — Qua, 03/02", location: "Arches NP + Dead Horse Point",
        route: "Delicate Arch + Dead Horse sunset! 🏜️",
        note: "O arco mais famoso do mundo + vista sobre o Colorado!",
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
            { time: "17:00", text: "🌅 <strong>Dead Horse Point</strong> — 600m sobre o Colorado! Cenário de <strong>Westworld</strong>!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar de despedida de Moab", type: "food" }
        ],
        tips: ["❄️ Arcos com neve em fevereiro são MÁGICOS! Levem botas com tração pra Delicate Arch."]
    },
    {
        day: 15, title: "Dia 15 — Qui, 04/02", location: "Moab → Salt Lake City",
        route: "Antelope Island + Temple Square! 🦬",
        note: "Bisões selvagens no Great Salt Lake!",
        region: "ut",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Moab", type: "" },
            { time: "08:30", text: "🚗 Saída rumo a <strong>Salt Lake City</strong> (~370 km, ~4h)", type: "drive" },
            { time: "10:00", text: "⚡ <strong>Supercharger Green River, UT</strong> (~100 km) — ~20 min", type: "charge" },
            { time: "11:30", text: "⚡🍽️ <strong>Supercharger Price, UT</strong> (~100 km) — ~20 min + almoço", type: "charge" },
            { time: "~13:00", text: "🏨 Chegada em <strong>SLC</strong>! Check-in", type: "" },
            { time: "14:00", text: "🦬 <strong>Antelope Island State Park</strong> (~45 min) — ~700 bisões selvagens!", type: "highlight" },
            { time: "15:00", text: "📸 <strong>Buffalo Point</strong> — mirante 360° do Great Salt Lake", type: "" },
            { time: "16:00", text: "🚗 Volta pra SLC", type: "drive" },
            { time: "16:30", text: "🏙️ <strong>Temple Square + State Capitol</strong>", type: "" },
            { time: "18:00", text: "🍽️ Jantar em SLC", type: "food" }
        ]
    },
    {
        day: 16, title: "Dia 16 — Sex, 05/02", location: "SLC → Boise",
        route: "Shoshone Falls — Niágara do Oeste! 🌊",
        note: "Queda d'água de 65m, mais larga que Niagara!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out de SLC", type: "" },
            { time: "07:30", text: "🚗 Saída rumo a <strong>Boise, ID</strong> (~490 km, ~5.5h)", type: "drive" },
            { time: "10:00", text: "⚡ <strong>Supercharger Twin Falls, ID</strong> (~330 km) — ~25 min", type: "charge" },
            { time: "10:30", text: "🌊 <strong>Shoshone Falls</strong> (~5 min do SC) — a 'Niágara do Oeste'!", type: "highlight" },
            { time: "11:00", text: "🚗 Continuação I-84 oeste (~210 km, ~2h)", type: "drive" },
            { time: "13:00", text: "🍽️ Almoço em Boise", type: "food" },
            { time: "14:00", text: "🏨 Check-in em <strong>Boise</strong>", type: "" },
            { time: "14:30", text: "🏙️ <strong>Boise River Greenbelt + Idaho State Capitol</strong>", type: "" },
            { time: "16:00", text: "Tempo livre — descanso", type: "" },
            { time: "18:00", text: "🍽️ Jantar no <strong>Basque Block</strong> — Bar Gernika!", type: "food" }
        ]
    },
    {
        day: 17, title: "Dia 17 — Sab, 06/02", location: "Boise → Multnomah Falls → Centralia",
        route: "Columbia Gorge + Multnomah Falls! 💧",
        note: "Dia de transição longo — cachoeira icônica de 189m no caminho!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Boise", type: "" },
            { time: "07:30", text: "🚗 Saída (~670 km, ~7.5h via I-84 W → I-5 N)", type: "drive" },
            { time: "09:00", text: "⚡ <strong>Supercharger Baker City, OR</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "11:00", text: "⚡🍽️ <strong>Supercharger Pendleton, OR</strong> (~200 km) — ~20 min + almoço", type: "charge" },
            { time: "13:00", text: "⚡ <strong>Supercharger The Dalles, OR</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "13:30", text: "🏞️ <strong>Columbia River Gorge</strong> — gargantas espetaculares!", type: "" },
            { time: "14:30", text: "🌲 <strong>Multnomah Falls</strong> — cachoeira icônica de 189m! Ponte panorâmica", type: "highlight" },
            { time: "15:00", text: "🚗 Continuação I-84 W → I-5 N rumo a <strong>Centralia</strong> (~240 km, ~2.5h)", type: "drive" },
            { time: "~17:30", text: "🏨 Chegada em <strong>Centralia</strong>! Check-in", type: "" },
            { time: "18:00", text: "⚡ <strong>Supercharger Centralia, WA</strong> — carregar pro trecho de amanhã", type: "charge" },
            { time: "18:30", text: "🍽️ Jantar em Centralia", type: "food" }
        ]
    },
    {
        day: 18, title: "Dia 18 — Dom, 07/02", location: "Centralia → Mt. Rainier → Forks",
        route: "Vulcão Rainier + Olympic NP! 🌋",
        note: "Rainier de manhã, Lake Crescent e Sol Duc Falls à tarde!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Centralia", type: "" },
            { time: "07:30", text: "🚗 Rumo a <strong>Mt. Rainier NP</strong> (~130 km, ~1.5h)", type: "drive" },
            { time: "09:00", text: "🌋 <strong>Mt. Rainier — Paradise!</strong> Vulcão de 4.392m coberto de neve!", type: "highlight" },
            { time: "09:15", text: "🏔️ <strong>Henry M. Jackson Visitor Center</strong>", type: "" },
            { time: "09:45", text: "🥾 <strong>Nisqually Vista Trail</strong> (~2 km) — trilha com neve, vista do glaciar", type: "" },
            { time: "10:30", text: "📸 Fotos no mirante de Paradise", type: "" },
            { time: "11:00", text: "🚗 Descida rumo a <strong>Olympia</strong> (~100 km, ~1.5h)", type: "drive" },
            { time: "12:30", text: "⚡ <strong>Supercharger Olympia/Centralia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~35 min)", type: "charge" },
            { time: "13:00", text: "🍽️ Almoço em Olympia", type: "food" },
            { time: "13:30", text: "🚗 Rumo a <strong>Forks</strong> (~265 km, ~3.5h via US-101 W)", type: "drive" },
            { time: "15:30", text: "🏞️ <strong>Lake Crescent</strong> — lago cristalino entre montanhas", type: "" },
            { time: "16:30", text: "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km) — cachoeira na floresta", type: "" },
            { time: "17:30", text: "🏨 Check-in em <strong>Forks</strong>", type: "" },
            { time: "18:00", text: "🧛 Tour Crepúsculo! Forks High School + Casa da Bella Swan", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Forks", type: "food" }
        ],
        tips: ["⚠️ CARREGAR ATÉ 100% em Olympia — Olympic NP tem ~265 km internos + sem SC até Aberdeen (260 km)!", "🔄 Se Rainier FECHADO: seguir direto Centralia → Forks (~370 km). Chegada ~12:00, tarde livre!"]
    },
    {
        day: 19, title: "Dia 19 — Seg, 08/02", location: "Olympic NP dia cheio 🌲",
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
        day: 20, title: "Dia 20 — Ter, 09/02", location: "Forks → Cannon Beach",
        route: "Astoria + Haystack Rock ao pôr do sol! 🌅",
        note: "Cidade do Goonies + pôr do sol mais bonito da viagem!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Forks", type: "" },
            { time: "08:30", text: "🚗 Saída rumo ao sul via US-101 S (~380 km)", type: "drive" },
            { time: "11:00", text: "⚡ <strong>Supercharger Aberdeen, WA</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "11:30", text: "🍽️ Almoço em Aberdeen (cidade natal do Kurt Cobain!)", type: "food" },
            { time: "12:00", text: "🚗 Continuação US-101 S (~180 km, ~2.5h)", type: "drive" },
            { time: "14:15", text: "📸 <strong>Astoria, OR</strong> — cenário de <strong>The Goonies</strong>! Astoria Column!", type: "highlight" },
            { time: "15:00", text: "🚗 Continuação até Cannon Beach (~40 km, ~30 min)", type: "drive" },
            { time: "15:30", text: "🏨 Check-in em <strong>Cannon Beach</strong>", type: "" },
            { time: "16:00", text: "📸 <strong>Haystack Rock</strong> — ícone de Oregon! Cenário do Goonies!", type: "highlight" },
            { time: "16:45", text: "🌊 <strong>Ecola State Park</strong> — mirante espetacular!", type: "" },
            { time: "17:30", text: "🌅 <strong>Pôr do sol em Cannon Beach</strong> — ESPETACULAR!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Cannon Beach", type: "food" }
        ],
        tips: ["🌅 Cannon Beach ao pôr do sol é OBRIGATÓRIO. Haystack Rock silhuetado contra o céu!"]
    },
    {
        day: 21, title: "Dia 21 — Qua, 10/02", location: "Costa Oregon Sul",
        route: "Thor's Well + faróis + Samuel Boardman! 🌊",
        note: "O melhor dia de costa — 350 km de paradas espetaculares!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Café + última caminhada em Cannon Beach", type: "" },
            { time: "09:00", text: "🚗 Saída rumo ao sul pela US-101 (~350 km)", type: "drive" },
            { time: "10:30", text: "⚡ <strong>Supercharger Lincoln City, OR</strong> (~130 km) — ~25 min", type: "charge" },
            { time: "11:15", text: "🍽️ Almoço em <strong>Newport, OR</strong> — vila de pescadores", type: "food" },
            { time: "12:15", text: "📸 <strong>Cape Perpetua + Thor's Well</strong> — 'poço de Thor', buraco no oceano!", type: "highlight" },
            { time: "12:45", text: "🏖️ <strong>Heceta Head Lighthouse</strong> — farol icônico!", type: "" },
            { time: "13:30", text: "🚗 Continuação US-101 sul", type: "drive" },
            { time: "14:30", text: "📸 <strong>Shore Acres State Park</strong> — jardim botânico sobre o mar!", type: "" },
            { time: "15:15", text: "⚡ <strong>Supercharger Coos Bay, OR</strong> — ~25 min", type: "charge" },
            { time: "15:45", text: "📸 <strong>Cape Blanco</strong> — farol mais ocidental de Oregon", type: "" },
            { time: "16:45", text: "📸 <strong>Samuel Boardman Scenic Corridor</strong> — a faixa mais bonita!", type: "highlight" },
            { time: "17:15", text: "📸 <strong>Natural Bridges Viewpoint</strong> — arcos naturais no mar!", type: "highlight" },
            { time: "17:30", text: "🌅 Pôr do sol na costa de Oregon", type: "highlight" },
            { time: "18:00", text: "🏨 Check-in em <strong>Gold Beach</strong>", type: "" },
            { time: "18:30", text: "🍽️ Jantar — frutos do mar frescos!", type: "food" }
        ]
    },
    {
        day: 22, title: "Dia 22 — Qui, 11/02", location: "Redwood NP dia cheio 🌲",
        route: "As árvores mais altas do mundo!",
        note: "Fern Canyon — cenário de Jurassic Park 2! 🦕",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café + check-out de Gold Beach", type: "" },
            { time: "08:00", text: "🚗 Rumo ao sul (~80 km) — Oregon → California!", type: "drive" },
            { time: "09:30", text: "🌲 <strong>Tall Trees Grove</strong> — árvores mais altas do MUNDO! (~5 km)", type: "" },
            { time: "11:30", text: "🥾 <strong>Fern Canyon</strong> (~1.5 km) — samambaias de 15m! <strong>Jurassic Park 2</strong>!", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço na região", type: "food" },
            { time: "13:30", text: "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km)", type: "" },
            { time: "14:30", text: "🚗 <strong>Newton B. Drury Scenic Parkway</strong>", type: "" },
            { time: "15:00", text: "📸 <strong>Big Tree Wayside</strong>", type: "" },
            { time: "15:30", text: "🌊 <strong>Gold Bluffs Beach</strong> — praia entre redwoods!", type: "" },
            { time: "16:30", text: "🌲 <strong>Stout Memorial Grove Trail</strong> (~30 min)", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol entre as redwoods", type: "" },
            { time: "17:30", text: "🏨 Check-in em <strong>Crescent City</strong>", type: "" },
            { time: "18:30", text: "🍽️ Jantar", type: "food" }
        ],
        tips: ["🦕 Fern Canyon é IMPERDÍVEL!", "⚠️ Inverno: Davison Road pode estar fechada. Substitua por Simpson-Reed Trail."]
    },
    {
        day: 23, title: "Dia 23 — Sex, 12/02", location: "Crescent City → Eureka",
        route: "Avenue of the Giants + Old Town Eureka! 🌲",
        note: "Mais redwoods + chegada em Eureka.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Crescent City", type: "" },
            { time: "08:30", text: "🌲 <strong>Prairie Creek Redwoods SP</strong> — caminhada matinal", type: "" },
            { time: "10:00", text: "🚗 Rumo ao sul pela US-101 (~130 km)", type: "drive" },
            { time: "11:30", text: "🌲 <strong>Avenue of the Giants</strong> — 50 km entre redwoods monumentais!", type: "highlight" },
            { time: "12:30", text: "🍽️ Almoço na região", type: "food" },
            { time: "13:30", text: "🚗 Continuação até <strong>Eureka</strong>", type: "drive" },
            { time: "14:00", text: "🏨 Check-in em <strong>Eureka</strong>", type: "" },
            { time: "14:30", text: "🏙️ <strong>Old Town Eureka</strong> — <strong>Carson Mansion</strong> (mansão vitoriana icônica!)", type: "" },
            { time: "16:00", text: "⚡ <strong>Supercharger Eureka</strong> — carregar pro trecho até SF", type: "charge" },
            { time: "18:00", text: "🍽️ Jantar em Eureka", type: "food" }
        ]
    },
    {
        day: 24, title: "Dia 24 — Sab, 13/02", location: "Eureka → San Francisco",
        route: "Point Reyes + chegada em SF! 🦌",
        note: "Alces selvagens + Golden Gate!",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Eureka", type: "" },
            { time: "08:30", text: "🚗 Saída rumo ao sul (~440 km, ~5.5h via US-101 S)", type: "drive" },
            { time: "10:30", text: "⚡🍽️ <strong>Supercharger Ukiah, CA</strong> (~250 km) — ~25 min + almoço", type: "charge" },
            { time: "12:30", text: "🦌 <strong>Point Reyes National Seashore</strong> — Elk Preserve + Lighthouse!", type: "highlight" },
            { time: "14:00", text: "🚗 Continuação até SF (~65 km, ~1h)", type: "drive" },
            { time: "~15:00", text: "🏨 Chegada em <strong>San Francisco</strong>! Check-in", type: "" },
            { time: "15:30", text: "🌆 Passeio pelo <strong>Embarcadero</strong> — Ferry Building", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no <strong>Crissy Field</strong> — vista da Golden Gate!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em <strong>Fisherman's Wharf</strong> — clam chowder!", type: "food" }
        ]
    },
    {
        day: 25, title: "Dia 25 — Dom, 14/02 ❤️", location: "San Francisco dia cheio",
        route: "Golden Gate + Nintendo! Valentine's Day! ❤️",
        note: "Dia cheio em SF + jantar romântico de Valentine's!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café com calma", type: "" },
            { time: "10:00", text: "🏖️ <strong>Pier 39</strong> — leões-marinhos!", type: "highlight" },
            { time: "11:00", text: "🚋 Passeio de <strong>Cable Car</strong> (bonde histórico)", type: "highlight" },
            { time: "11:30", text: "🌆 <strong>Lombard Street</strong> — rua mais sinuosa do mundo", type: "" },
            { time: "12:00", text: "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA! Dragon's Gate, dim sum", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço em Chinatown ou <strong>La Taqueria</strong> no Mission", type: "food" },
            { time: "14:30", text: "🌉 <strong>Golden Gate Bridge</strong> — caminhar ou pedalar!", type: "highlight" },
            { time: "16:00", text: "🏰 <strong>Fort Point</strong> — cenário de Vertigo!", type: "" },
            { time: "17:00", text: "🎮 <strong>Nintendo San Francisco</strong> (200 Stockton St) — 2ª loja oficial!", type: "highlight" },
            { time: "18:00", text: "🛍️ <strong>Union Square</strong> — compras", type: "" },
            { time: "19:00", text: "🍽️ Jantar Valentine's Day ❤️ — restaurante especial!", type: "food" }
        ]
    },
    {
        day: 26, title: "Dia 26 — Seg, 15/02", location: "SF → PCH → Mariposa",
        route: "Pacific Coast Highway completa! 🛣️",
        note: "Big Sur + Bixby Bridge + pernoite em Mariposa. Evita montanha no escuro!",
        region: "ca",
        items: [
            { time: "07:00", text: "☕ Café + check-out de SF", type: "" },
            { time: "07:30", text: "🚗 Saída pela <strong>Highway 1 sul</strong>", type: "drive" },
            { time: "09:00", text: "🏖️ <strong>Half Moon Bay</strong> — parada rápida", type: "" },
            { time: "09:45", text: "🏄 <strong>Santa Cruz</strong> — boardwalk, surf town", type: "" },
            { time: "11:00", text: "🚗 <strong>Monterey</strong> — Cannery Row, pier", type: "" },
            { time: "12:00", text: "🍽️ Almoço em <strong>Carmel-by-the-Sea</strong> — vila artística!", type: "food" },
            { time: "13:00", text: "🛣️ <strong>17-Mile Drive</strong> — estrada cênica, Lone Cypress", type: "" },
            { time: "14:00", text: "📸 <strong>Bixby Creek Bridge</strong> — ponte mais fotografada da CA!", type: "highlight" },
            { time: "14:30", text: "🏞️ <strong>Big Sur</strong> — McWay Falls, Pfeiffer Beach!", type: "highlight" },
            { time: "15:30", text: "🚗 Backtrack Big Sur → Monterey (~50 km, ~1h)", type: "drive" },
            { time: "16:30", text: "⚡ <strong>Supercharger Monterey/Salinas</strong> — ~30 min", type: "charge" },
            { time: "17:00", text: "🚗 Corta para leste rumo a <strong>Mariposa</strong> (~250 km, ~3.5h)", type: "drive" },
            { time: "18:30", text: "⚡ <strong>Supercharger Merced, CA</strong> (~180 km) — ~25 min", type: "charge" },
            { time: "~19:30", text: "🏨 Chegada em <strong>Mariposa</strong>! Check-in", type: "" },
            { time: "20:00", text: "🍽️ Jantar em Mariposa — <strong>1850 Restaurant</strong> ou <strong>Savoury's</strong>", type: "food" }
        ],
        tips: ["⚠️ Dia longo (~530 km) mas combina PCH + Mariposa sem dirigir na montanha no escuro!", "🔄 Se Highway 1 fechada: ir direto SF → Yosemite (~310 km, ~4h). Pular Mariposa, check-in direto em Yosemite."]
    },
    {
        day: 27, title: "Dia 27 — Ter, 16/02", location: "Mariposa → Yosemite dia cheio 1",
        route: "Nascer do sol em Tunnel View! 🏞️",
        note: "Saída cedo de Mariposa — Cachoeiras, El Capitan e neve!",
        region: "ca",
        items: [
            { time: "06:00", text: "☕ Café rápido + check-out de Mariposa", type: "" },
            { time: "06:15", text: "🚗 Saída rumo a <strong>Yosemite</strong> (~55 km, ~45 min via CA-140)", type: "drive" },
            { time: "07:00", text: "🌅 Nascer do sol em <strong>Tunnel View</strong> — El Capitan, Half Dome, Bridalveil Fall!", type: "highlight" },
            { time: "08:00", text: "🏨 Deixar malas no hotel em Yosemite Valley", type: "" },
            { time: "08:30", text: "☕ Café da manhã", type: "food" },
            { time: "09:00", text: "🥾 <strong>Lower Yosemite Fall Trail</strong> (~30 min) — base da cachoeira", type: "" },
            { time: "10:00", text: "📸 <strong>El Capitan Meadow</strong> — paredão de 900m", type: "" },
            { time: "11:00", text: "🌉 <strong>Swinging Bridge</strong> — vista clássica de Yosemite Falls", type: "" },
            { time: "12:00", text: "🍽️ Almoço no Yosemite Village", type: "food" },
            { time: "13:00", text: "🥾 <strong>Bridalveil Fall Trail</strong> (curta, ~20 min)", type: "" },
            { time: "13:30", text: "📸 <strong>Sentinel Bridge</strong> — Half Dome refletido no rio Merced", type: "" },
            { time: "14:00", text: "⛄ <strong>Badger Pass</strong> — brincar na neve!", type: "highlight" },
            { time: "16:00", text: "📸 <strong>Cook's Meadow Loop</strong>", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no <strong>Valley View</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — Yosemite Village ou <strong>Majestic Yosemite Hotel</strong>", type: "food" }
        ],
        tips: ["❄️ Yosemite nevado em fevereiro é LINDO! Menos turistas, silêncio, neve nos picos."]
    },
    {
        day: 28, title: "Dia 28 — Qua, 17/02", location: "Yosemite dia cheio 2",
        route: "Trilhas longas + últimos momentos! 🏞️",
        note: "Vernal Fall, Mirror Lake e jantar no Majestic Hotel!",
        region: "ca",
        items: [
            { time: "07:00", text: "🌅 Nascer do sol em <strong>Cook's Meadow</strong>", type: "highlight" },
            { time: "08:30", text: "☕ Café", type: "" },
            { time: "09:00", text: "🥾 <strong>Vernal Fall Footbridge Trail</strong> (~3 km) — cachoeira congelada!", type: "" },
            { time: "10:30", text: "🥾 <strong>Mirror Lake Trail</strong> (~8 km, ~3h) — reflexo do Half Dome", type: "" },
            { time: "12:30", text: "🍽️ Almoço", type: "food" },
            { time: "13:30", text: "📸 <strong>Yosemite Chapel</strong> — a menor capela, linda na neve", type: "" },
            { time: "14:00", text: "🖼️ <strong>Ansel Adams Gallery</strong> — fotografias icônicas", type: "" },
            { time: "15:00", text: "🌲 Explorar <strong>Yosemite Village</strong> — Visitor Center, museu", type: "" },
            { time: "16:00", text: "🌅 Último pôr do sol — <strong>Tunnel View</strong> ou <strong>Valley View</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar de despedida — <strong>Majestic Yosemite Hotel Dining Room</strong> (reservar!)", type: "food" }
        ]
    },
    {
        day: 29, title: "Dia 29 — Qui, 18/02", location: "Yosemite → Three Rivers",
        route: "Despedida de Yosemite + Three Rivers! 🌲",
        note: "Manhã tranquila em Yosemite, chegada cedo em Three Rivers.",
        region: "ca",
        items: [
            { time: "07:30", text: "🌅 Último nascer do sol em Yosemite — <strong>Valley View</strong>", type: "highlight" },
            { time: "08:30", text: "☕ Café", type: "" },
            { time: "09:00", text: "📸 Últimas fotos + despedida de Yosemite", type: "" },
            { time: "10:00", text: "🚗 Check-out + saída rumo a <strong>Three Rivers</strong> (~200 km, ~2.5h via CA-41 S)", type: "drive" },
            { time: "11:00", text: "⚡ <strong>Supercharger Oakhurst</strong> (~60 km) — ~20 min", type: "charge" },
            { time: "12:00", text: "⚡🍽️ <strong>Supercharger Visalia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) + almoço", type: "charge" },
            { time: "13:30", text: "🚗 Continuação até Three Rivers (~65 km, ~1h)", type: "drive" },
            { time: "~14:30", text: "🏨 Chegada em <strong>Three Rivers</strong>! Check-in", type: "" },
            { time: "15:00", text: "Tempo livre — descanso, explorar a cidade", type: "" },
            { time: "18:00", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["⚠️ CARREGAR ATÉ 100% em Visalia — Sequoia não tem carregadores! ~190 km de subida/descida no parque."]
    },
    {
        day: 30, title: "Dia 30 — Sex, 19/02", location: "Sequoia + Kings Canyon",
        route: "General Sherman + Moro Rock! 🌲",
        note: "A MAIOR ÁRVORE DO MUNDO em volume!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café em Three Rivers", type: "" },
            { time: "08:00", text: "🚗 Subida pro parque (~45 min)", type: "drive" },
            { time: "08:45", text: "🌲 <strong>General Sherman Tree</strong> — a MAIOR ÁRVORE DO MUNDO! Trilha ~0.8 km", type: "highlight" },
            { time: "09:30", text: "🌲 <strong>Congress Trail</strong> (~3 km) — dezenas de sequóias gigantes", type: "" },
            { time: "10:30", text: "🏛️ <strong>Giant Forest Museum</strong> — história das sequoias", type: "" },
            { time: "11:00", text: "🌲 <strong>Big Trees Trail</strong> (~2 km) — sequóias refletidas no meadow", type: "" },
            { time: "12:00", text: "🚗 Rumo a <strong>Kings Canyon — Grant Grove</strong> (~30 min)", type: "drive" },
            { time: "12:15", text: "🌲 <strong>General Grant Tree Trail</strong> (~1 km) — 'Árvore de Natal da Nação'", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço em Grant Grove", type: "food" },
            { time: "14:00", text: "🚗 Volta pra <strong>Sequoia NP</strong> (~30 min)", type: "drive" },
            { time: "14:30", text: "🌅 <strong>Moro Rock</strong> — 350 degraus, vista 360°!", type: "highlight" },
            { time: "15:30", text: "🌲 <strong>Crescent Meadow / Tharp's Log</strong> — cabana num tronco oco!", type: "" },
            { time: "16:30", text: "🌅 Pôr do sol no parque", type: "highlight" },
            { time: "17:30", text: "🚗 Descida pra Three Rivers", type: "drive" },
            { time: "18:00", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["❄️ Em fevereiro pode ter neve. Kings Canyon Scenic Byway fecha no inverno — só Grant Grove acessível."]
    },
    {
        day: 31, title: "Dia 31 — Sab, 20/02", location: "Three Rivers → Los Angeles",
        route: "Rumo a LA! Outlet no caminho! 🎬",
        note: "Santa Monica Pier ao pôr do sol!",
        region: "ca",
        items: [
            { time: "08:30", text: "☕ Café + check-out de Three Rivers", type: "" },
            { time: "09:00", text: "🚗 Saída rumo a <strong>Los Angeles</strong> (~300 km, ~3.5h)", type: "drive" },
            { time: "10:30", text: "⚡ <strong>Supercharger Tejon/Lebec, CA</strong> (~150 km) — ~25 min", type: "charge" },
            { time: "~13:00", text: "🏨 Chegada em <strong>LA</strong>! Check-in", type: "" },
            { time: "13:30", text: "🍽️ Almoço", type: "food" },
            { time: "14:30", text: "🛍️ Compras — Citadel Outlets ou The Grove", type: "" },
            { time: "17:00", text: "🏞️ <strong>Santa Monica Pier</strong> — roda-gigante, praia!", type: "" },
            { time: "18:00", text: "🌅 Pôr do sol no Pacífico!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em <strong>Santa Monica</strong>", type: "food" }
        ]
    },
    {
        day: 32, title: "Dia 32 — Dom, 21/02", location: "LA — Malibu + Venice + Griffith",
        route: "Último dia nos EUA! 🎬",
        note: "Malibu, Venice e Griffith Observatory à noite!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🏖️ <strong>Malibu</strong> — praias icônicas, PCH cênica", type: "" },
            { time: "10:30", text: "🏝️ <strong>El Matador Beach</strong> — grutas e arcos de rocha no mar!", type: "highlight" },
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
        day: 33, title: "Dia 33 — Seg, 22/02", location: "LA → Voo de volta ✈️",
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
    { num: 2, name: "Las Vegas, NV", checkin: "25/01", checkout: "29/01", nights: 4 },
    { num: 3, name: "Springdale, UT (Zion)", checkin: "29/01", checkout: "31/01", nights: 2 },
    { num: 4, name: "Bryce Canyon, UT", checkin: "31/01", checkout: "01/02", nights: 1 },
    { num: 5, name: "Moab, UT (Arches/Canyonlands)", checkin: "01/02", checkout: "04/02", nights: 3 },
    { num: 6, name: "Salt Lake City, UT", checkin: "04/02", checkout: "05/02", nights: 1 },
    { num: 7, name: "Boise, ID", checkin: "05/02", checkout: "06/02", nights: 1 },
    { num: 8, name: "Centralia, WA", checkin: "06/02", checkout: "07/02", nights: 1 },
    { num: 9, name: "Forks / Port Angeles, WA (Olympic)", checkin: "07/02", checkout: "09/02", nights: 2 },
    { num: 10, name: "Cannon Beach, OR", checkin: "09/02", checkout: "10/02", nights: 1 },
    { num: 11, name: "Gold Beach / Coos Bay, OR", checkin: "10/02", checkout: "11/02", nights: 1 },
    { num: 12, name: "Crescent City / Klamath, CA", checkin: "11/02", checkout: "12/02", nights: 1 },
    { num: 13, name: "Eureka / Arcata, CA", checkin: "12/02", checkout: "13/02", nights: 1 },
    { num: 14, name: "San Francisco, CA", checkin: "13/02", checkout: "15/02", nights: 2 },
    { num: 15, name: "Mariposa, CA", checkin: "15/02", checkout: "16/02", nights: 1 },
    { num: 16, name: "Yosemite NP, CA", checkin: "16/02", checkout: "18/02", nights: 2 },
    { num: 17, name: "Three Rivers, CA (Sequoia)", checkin: "18/02", checkout: "20/02", nights: 2 },
    { num: 18, name: "Los Angeles, CA", checkin: "20/02", checkout: "22/02", nights: 2 }
];

const parks = [
    { name: "🏜️ Death Valley National Park", days: "Dia 8", highlights: "Badwater Basin (-86m!), Zabriskie Point, Artist's Palette, Mesquite Sand Dunes, Dante's View." },
    { name: "🏞️ Grand Canyon National Park", days: "Dia 9", highlights: "Mather Point, Rim Trail, Yavapai Geology Museum, Bright Angel Trailhead, Hopi Point." },
    { name: "🏞️ Zion National Park", days: "Dias 10–11", highlights: "Watchman Trail, Emerald Pools, Canyon Overlook Trail, Riverside Walk, Court of the Patriarchs." },
    { name: "🏔️ Bryce Canyon National Park", days: "Dias 11–12", highlights: "Navajo Loop, Queen's Garden Trail, hoodoos, Bryce Amphitheater, stargazing (International Dark Sky Park!)." },
    { name: "🏜️ Canyonlands National Park", days: "Dia 13", highlights: "Mesa Arch ao nascer do sol, Grand View Point, Green River Overlook, Upheaval Dome, Aztec Butte." },
    { name: "🏜️ Arches National Park", days: "Dia 14", highlights: "Delicate Arch (o arco mais famoso do mundo!), Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace." },
    { name: "🌋 Mt. Rainier National Park", days: "Dia 18", highlights: "Paradise, Nisqually Vista Trail, vulcão de 4.392m coberto de neve, Henry M. Jackson Visitor Center." },
    { name: "🌲 Olympic National Park", days: "Dias 18–19", highlights: "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push Beach (Twilight!), Rialto Beach, Sol Duc Falls." },
    { name: "🌲 Redwood National Park", days: "Dia 22", highlights: "Fern Canyon (Jurassic Park 2!), Lady Bird Johnson Grove, Tall Trees Grove, Prairie Creek, Gold Bluffs Beach." },
    { name: "🏞️ Yosemite National Park", days: "Dias 27–28", highlights: "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Vernal Fall, Mirror Lake, Badger Pass." },
    { name: "🌲 Sequoia + Kings Canyon NP", days: "Dia 30", highlights: "General Sherman Tree (maior árvore do mundo!), Congress Trail, Moro Rock (350 degraus, vista 360°), General Grant Tree." }
];

const superchargers = [
    { day: 5, name: "Barstow, CA", leg: "LAX → Vegas", critical: false },
    { day: 9, name: "Kingman, AZ", leg: "Vegas → GC → Zion", critical: false, note: "Trecho da Route 66!" },
    { day: 9, name: "Kanab, UT", leg: "Vegas → GC → Zion", critical: false },
    { day: 12, name: "Salina, UT", leg: "Bryce → Moab", critical: false },
    { day: 12, name: "Green River, UT", leg: "Bryce → Moab", critical: false },
    { day: 15, name: "Green River, UT", leg: "Moab → SLC", critical: false },
    { day: 15, name: "Price, UT", leg: "Moab → SLC", critical: false },
    { day: 16, name: "Twin Falls, ID", leg: "SLC → Boise", critical: false },
    { day: 17, name: "Baker City, OR", leg: "Boise → Centralia", critical: false },
    { day: 17, name: "Pendleton, OR", leg: "Boise → Centralia", critical: false },
    { day: 17, name: "The Dalles, OR", leg: "Boise → Centralia", critical: false },
    { day: 17, name: "Centralia, WA", leg: "Boise → Centralia", critical: false },
    { day: 18, name: "Olympia / Centralia, WA", leg: "Centralia → Rainier → Forks", critical: true, note: "⚠️ CARREGAR ATÉ 100% — Olympic 265 km internos + sem SC até Aberdeen!" },
    { day: 20, name: "Aberdeen, WA", leg: "Forks → Cannon Beach", critical: false },
    { day: 21, name: "Lincoln City, OR", leg: "Cannon Beach → Gold Beach", critical: false },
    { day: 21, name: "Coos Bay, OR", leg: "Cannon Beach → Gold Beach", critical: false },
    { day: 23, name: "Eureka, CA", leg: "Crescent City → Eureka", critical: false },
    { day: 24, name: "Ukiah, CA", leg: "Eureka → SF", critical: false },
    { day: 26, name: "Monterey / Salinas, CA", leg: "SF → PCH → Mariposa", critical: false },
    { day: 26, name: "Merced, CA", leg: "SF → PCH → Mariposa", critical: false },
    { day: 29, name: "Oakhurst, CA", leg: "Yosemite → Three Rivers", critical: false },
    { day: 29, name: "Visalia, CA", leg: "Yosemite → Three Rivers", critical: true, note: "⚠️ CARREGAR ATÉ 100% — Sequoia sem carregadores! ~190 km de subida/descida!" },
    { day: 31, name: "Tejon / Lebec, CA", leg: "Three Rivers → LA", critical: false }
];
