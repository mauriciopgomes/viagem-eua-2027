// ==================== TRIP DATA ====================
// Roteiro Alternativo — Viagem EUA 2027
// NYC → LAX → Zion → Bryce → Moab
// → Twin Falls → PNW → Costa Oregon → Redwood → SF → PCH → Yosemite → Sequoia
// → Death Valley → Las Vegas → LA
//
// Para REORDENAR dias: mova os objetos dentro do array `days`.
// initDays() recalcula automaticamente: número, data, dia da semana, dayPhotos e superchargers.
// Para TROCAR DE ROTA: renomeie este arquivo e copie data-reverso.js como data.js.

const days = [
    // ==================== NYC (Dias 1-4) ====================
    {
        photo: 'img/dia-01.jpg', shortLoc: 'NYC', location: "New York, NY",
        route: "Chegada + Midtown leve 🗽",
        note: "Chegada no JFK às 07h. Dia tranquilo pra se adaptar — tudo a pé em Midtown.",
        region: "ny",
        items: [
            { time: "07:00", text: "✈️ Chegada no JFK — imigração + bagagem", type: "drive" },
            { time: "~09:00", text: "🚕 Transporte JFK → Hotel (AirTrain + Subway E ~$11/pessoa, ~65 min · AirTrain + LIRR ~$14/pessoa, ~45 min · Uber ~$70, ~60 min)", type: "drive" },
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
            { time: "19:00", text: "🍽️ Jantar — <strong>John's of Times Square</strong> (260 W 44th St) — pizza em forno de lenha desde 1929, tortas inteiras crocantes. O clássico de NY que todos voltam. ~$15-20/pessoa", type: "food" },
            { time: "20:30", text: "🏨 Hotel — descanso (jet lag!)", type: "" }
        ]
    },
    {
        photo: 'img/dia-02.jpg', shortLoc: 'NYC', location: "New York, NY",
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
            { time: "17:30", text: "🍽️ Jantar — <strong>Dallas BBQ</strong> (261 8th Ave, Chelsea) — churrasco americano com porções absurdas, ribs e onion rings. Fila garantida mas vale! ~$18-25/pessoa", type: "food" },
            { time: "19:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        photo: 'img/dia-03.jpg', shortLoc: 'NYC', location: "New York, NY",
        route: "Central Park + Chinatown + Downtown 🌳",
        note: "Norte → Sul! Central Park, depois desce: Chinatown, Little Italy, Katz's.",
        region: "ny",
        items: [
            { time: "08:00", text: "☕ Café — <strong>Levain Bakery</strong> (167 W 74th St) — cookies famosos!", type: "food" },
            { time: "09:00", text: "🌳 <strong>Central Park</strong> — Strawberry Fields, Bethesda Fountain, Bow Bridge", type: "highlight" },
            { time: "11:00", text: "🏨 <strong>The Plaza Hotel</strong> — hotel do Kevin em Esqueceram de Mim 2!", type: "" },
            { time: "11:30", text: "🍔 Almoço — <strong>Shake Shack</strong> (Columbus Circle ou Midtown)", type: "food" },
            { time: "13:00", text: "🏮 <strong>Chinatown</strong> — Canal St + Mott St, a maior dos EUA!", type: "highlight" },
            { time: "16:30", text: "🍝 <strong>Little Italy</strong> — Mulberry St. Cannoli na <strong>Ferrara Bakery</strong> (desde 1892!)", type: "" },
            { time: "17:30", text: "🍖 Jantar — <strong>Katz's Deli</strong> (205 E Houston St) — pastrami lendário!", type: "food" },
            { time: "19:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        photo: 'img/dia-04.jpg', shortLoc: 'NYC', location: "New York, NY",
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
            { time: "14:00", text: "🧙 <strong>Harry Potter Shop</strong> (935 Broadway) — butterbeer bar, varinhas, vassouras! Ao lado do Flatiron", type: "highlight" },
            { time: "15:15", text: "🏰 <strong>Disney Store</strong> (1540 Broadway, Times Square) — flagship de 2 andares! Balões gigantes do Mickey e Minnie, área interativa e produtos exclusivos", type: "highlight" },
            { time: "16:15", text: "🕐 Tempo livre — descansar no hotel ou última exploração", type: "" },
            { time: "18:00", text: "🧳 Volta ao hotel — arrumar malas", type: "" },
            { time: "19:00", text: "\uD83C\uDF7D\uFE0F Jantar — <strong>Ellen's Stardust Diner</strong> (1650 Broadway, Times Square) — diner temático anos 50 com garçons que cantam ao vivo, clássico para crianças! Burgers, milkshakes e espetáculo. ~$20-25/pessoa", type: "food" },
            { time: "21:00", text: "🏨 Hotel — dormir cedo (voo amanhã!)", type: "" }
        ]
    },

    // ==================== UTAH (Dias 5-10) ====================
    {
        photo: 'img/dia-05.jpg', shortLoc: 'Zion',
        chargeStops: [
            { name: 'Barstow, CA', leg: 'LAX → Zion', critical: false },
            { name: 'Las Vegas, NV', leg: 'LAX → Zion', critical: false },
            { name: 'St. George, UT', leg: 'LAX → Zion', critical: false }
        ],
        location: "New York → LAX → Zion",
        route: "NY → LA → Zion! ✈️🚗",
        note: "Check-out do Marriott, voo pro LAX, Tesla e direto pra Zion! ~700 km com FSD.",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café no Marriott Marquis", type: "" },
            { time: "08:00", text: "🏨 Check-out", type: "" },
            { time: "08:30", text: "🚕 Times Square → JFK", type: "drive" },
            { time: "~09:30", text: "🛫 Chegada no JFK — check-in / despachar malas", type: "" },
            { time: "10:15", text: "🍽️ Almoço no aeroporto (JFK Terminal)", type: "food" },
            { time: "11:00", text: "✈️ Voo AA 3 → Los Angeles (~5.5h)", type: "drive" },
            { time: "13:20", text: "✈️ Chegada no LAX (horário local, -3h)", type: "drive" },
            { time: "~14:00", text: "🚗 Retirada do <strong>Tesla Model Y</strong>", type: "drive" },
            { time: "14:30", text: "🛣️ Saída rumo a <strong>Zion</strong> (~700 km, ~7h via I-15 N, FSD)", type: "drive" },
            { time: "16:30", text: "⚡🍽️ <strong>Supercharger Barstow</strong> (~200 km) — ~25 min + lanche", type: "charge" },
            { time: "18:00", text: "⚡ <strong>Supercharger Las Vegas</strong> (~270 km) — ~20 min", type: "charge" },
            { time: "19:00", text: "⚡ <strong>Supercharger St. George</strong> (~170 km) — ~25 min", type: "charge" },
            { time: "~21:30", text: "🏨 Chegada em <strong>Springdale</strong>! Check-in", type: "" },
            { time: "21:30", text: "🍽️ Jantar — <strong>Oscar's Cafe</strong> (948 Zion Park Blvd, Springdale) — mexicana clássica, burritos e enchiladas. ~$12-18/pessoa", type: "food" }
        ],
        tips: ["⚡ Dia longo (~700 km) mas FSD ajuda. Se cansar, improvisar hotel em St. George ou Vegas.", "⚡ Fuso horário ajuda (-3h). Chegam cansados — dormir cedo!"]
    },
    {
        photo: 'img/dia-10.jpg', shortLoc: 'Zion', location: "Zion NP dia cheio",
        route: "Trilhas, mirantes e pôr do sol! 🏞️",
        note: "Dia cheio em Zion! No inverno pode dirigir no canyon (sem shuttle).",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café em Springdale", type: "" },
            { time: "08:00", text: "🚗 Dirigir pra <strong>Zion Canyon</strong> (sem shuttle no inverno — pode entrar de carro!)", type: "drive" },
            { time: "08:30", text: "🥾 <strong>Watchman Trail</strong> (~5 km, ~2h) — vista panorâmica!", type: "highlight" },
            { time: "10:30", text: "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km)", type: "" },
            { time: "12:30", text: "🍽️ Almoço em Springdale ou Zion Lodge", type: "food" },
            { time: "13:30", text: "🏔️ <em>Opcional:</em> <strong>Court of the Patriarchs</strong> + <strong>Big Bend</strong> — mirantes rápidos no canyon", type: "" },
            { time: "14:00", text: "🥾 <strong>Scout Lookout</strong> (~6.4 km ida e volta, ~2.5h) — degraus esculpidos na rocha, vista incrível do canyon! ⚠️ Em fevereiro pode ter gelo — levar microspikes ou confirmar condições.", type: "highlight" },
            { time: "16:30", text: "�🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Oscar's Cafe</strong> (948 Zion Park Blvd, Springdale) — mexicana clássica, burritos e enchiladas. ~$12-18/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-11.jpg', shortLoc: 'Bryce', location: "Zion AM → Bryce PM",
        route: "Última manhã em Zion + Bryce à tarde! 🏔️",
        note: "Navajo Loop + pôr do sol + stargazing em Bryce!",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café", type: "" },
            { time: "08:00", text: "🚗 Dirigir pra <strong>Zion Canyon</strong>", type: "drive" },
            { time: "08:30", text: "📸 Últimas fotos em Zion", type: "" },
            { time: "09:30", text: "🚗 Check-out + saída pra <strong>Bryce</strong> (~130 km, ~1.5h)", type: "drive" },
            { time: "09:45", text: "🏁 <strong>Checkerboard Mesa</strong> — arenito com padrão xadrez natural! Pullover na UT-9", type: "" },
            { time: "10:00", text: "🛣️ <strong>Red Canyon</strong> — arcos vermelhos na estrada!", type: "" },
            { time: "11:00", text: "🏨 Check-in Bryce Canyon", type: "" },
            { time: "11:30", text: "🍽️ Almoço", type: "food" },
            { time: "12:30", text: "📸 <strong>Fairyland Point</strong> — mirante menos visitado, vista única dos hoodoos!", type: "highlight" },
            { time: "13:00", text: "🥾 <strong>Mossy Cave Trail</strong> (~1.5 km, ~30 min) — caverna com musgo + cascata congelada!", type: "highlight" },
            { time: "13:30", text: "📸 <strong>Sunrise/Sunset Point</strong>", type: "highlight" },
            { time: "14:00", text: "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h)", type: "highlight" },
            { time: "15:00", text: "🚗 <strong>Scenic Drive</strong> — Inspiration Point, Natural Bridge, Rainbow Point", type: "" },
            { time: "17:30", text: "🌅 <strong>Pôr do sol no Bryce Amphitheater</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Cowboy's Smokehouse BBQ</strong> (95 N Main St, Panguitch, ~22 km) — BBQ defumado do Utah rural, ribs e brisket caseiros. ~$15-20/pessoa", type: "food" },
            { time: "20:30", text: "🌌 <strong>Stargazing em Bryce!</strong> — International Dark Sky Park!", type: "highlight" }
        ],
        tips: ["🔭 Bryce é um dos melhores céus escuros do MUNDO! Levem cobertores — faz MUITO frio!"]
    },
    {
        photo: 'img/dia-12.jpg', shortLoc: 'Moab',
        chargeStops: [
            { name: 'Salina, UT', leg: 'Bryce → Moab', critical: false },
            { name: 'Green River, UT', leg: 'Bryce → Moab', critical: false }
        ],
        location: "Bryce → Moab",
        route: "Nascer do sol em Bryce + Corona Arch! 🏜️",
        note: "Sunrise épico, depois estrada até Moab.",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café + check-out", type: "" },
            { time: "08:00", text: "🚗 Saída rumo a <strong>Moab</strong> (~490 km, ~6h)", type: "drive" },
            { time: "08:45", text: "🌄 <strong>Head of the Rocks Overlook</strong> — mirante da UT-12 com vista épica de Escalante!", type: "" },
            { time: "09:30", text: "⚡ <strong>Supercharger Salina, UT</strong> (~170 km) — ~25 min", type: "charge" },
            { time: "10:15", text: "🏜️ <strong>Capitol Reef NP</strong> — paredões vermelhos! Petroglífos Fremont de 2.000 anos + Fruita Historic District", type: "highlight" },
            { time: "10:30", text: "👀 <strong>Goosenecks Overlook</strong> — meandros do Sulphur Creek vistos de cima, ~5 min do Visitors Center. Vista impressionante!", type: "" },
            { time: "10:40", text: "🌄 <strong>Panoramic Point</strong> — vista 360° do Waterpocket Fold e das montanhas. ~1 km do Visitors Center, estrada de terra, ~15 min.", type: "" },
            { time: "10:55", text: "🥾 <strong>Hickman Bridge Trail</strong> (~2.8 km, ~1h) — arco natural lindo!", type: "highlight" },
            { time: "11:45", text: "🚗 <strong>Scenic Drive</strong> parcial + saída pra Moab", type: "drive" },
            { time: "12:15", text: "🏜️ <strong>San Rafael Swell</strong> (I-70) — paredões dramáticos de ambos os lados da highway! Corte no canyon espetacular. Rest area com viewpoint", type: "" },
            { time: "12:45", text: "⚡ <strong>Supercharger Green River, UT</strong> (~170 km) — ~20 min", type: "charge" },
            { time: "~14:15", text: "🏨 Chegada em <strong>Moab</strong>!", type: "" },
            { time: "14:30", text: "🍽️ Almoço em Moab", type: "food" },
            { time: "15:30", text: "🥾 <strong>Corona Arch Trail</strong> (~5 km, ~2h) — arco gigante sem multidões!", type: "highlight" },
            { time: "17:30", text: "🚗 <strong>Scenic Byway 128</strong> — rio Colorado", type: "" },
            { time: "17:30", text: "🌅 Pôr do sol em Moab", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Moab Brewery</strong> (686 S Main St) — cervejaria local tradicional, burger e nachos. ~$15-20/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-13.jpg', shortLoc: 'Moab', location: "Canyonlands NP dia cheio 🏜️",
        route: "Island in the Sky — cânions infinitos!",
        note: "Mesa Arch ao nascer do sol — o sol nasce ATRAVÉS do arco!",
        region: "ut",
        items: [
            { time: "06:30", text: "☕ Café cedo", type: "" },
            { time: "07:00", text: "🚗 Saída pra <strong>Canyonlands — Island in the Sky</strong> (~40 min)", type: "drive" },
            { time: "07:30", text: "🌅 <strong>Mesa Arch</strong> ao nascer do sol — o arco mais fotografado de Utah!", type: "highlight" },
            { time: "08:30", text: "📸 <strong>Grand View Point</strong> — cânions infinitos!", type: "highlight" },
            { time: "09:15", text: "📸 <strong>Green River Overlook</strong>", type: "" },
            { time: "09:45", text: "🏞️ <strong>Shafer Canyon Overlook</strong>", type: "" },
            { time: "10:15", text: "📸 <strong>Buck Canyon + White Rim Overlook</strong>", type: "" },
            { time: "11:30", text: "🥾 <strong>Upheaval Dome Trail</strong> (~2.5 km)", type: "" },
            { time: "12:30", text: "🍽️ Picnic no parque", type: "food" },
            { time: "14:00", text: "🥾 <strong>Aztec Butte Trail</strong> (~3 km)", type: "" },
            { time: "16:30", text: "🌅 Pôr do sol no <strong>Grand View Point</strong>", type: "highlight" },
            { time: "17:45", text: "📸 <strong>Petroglifos na Potash Road</strong>", type: "" },
            { time: "18:00", text: "📸 <strong>Thelma & Louise Point</strong>", type: "" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Pasta Jay's</strong> (4 S 100 W, Moab) — italiano caseiro favorito dos moradores, massas e lasanha. ~$15-20/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-14.jpg', shortLoc: 'Moab', location: "Arches NP + Dead Horse Point",
        route: "Delicate Arch + Dead Horse sunset! 🏜️",
        note: "O arco mais famoso do mundo + vista sobre o Colorado!",
        region: "ut",
        items: [
            { time: "07:00", text: "☕ Café", type: "" },
            { time: "07:30", text: "🏞️ Entrada em <strong>Arches NP</strong>", type: "" },
            { time: "08:00", text: "🥾 <strong>Delicate Arch Trail</strong> (~5 km, ~2-3h) — o arco mais famoso!", type: "highlight" },
            { time: "10:30", text: "📸 <strong>Windows Section</strong> — North/South Window, Turret Arch", type: "" },
            { time: "11:30", text: "📸 <strong>Double Arch</strong>", type: "" },
            { time: "12:00", text: "📸 <strong>Balanced Rock</strong>", type: "" },
            { time: "12:30", text: "🍽️ Almoço", type: "food" },
            { time: "14:00", text: "🥾 <strong>Devils Garden Trail → Landscape Arch</strong> (~3 km)", type: "highlight" },
            { time: "15:30", text: "🏜️ <strong>Fiery Furnace Viewpoint + Park Avenue</strong>", type: "" },
            { time: "16:30", text: "🚗 → <strong>Dead Horse Point SP</strong> (~30 min)", type: "drive" },
            { time: "17:00", text: "🌅 <strong>Dead Horse Point</strong> — 600m sobre o Colorado! Westworld!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar de despedida de Moab — <strong>Spoke on Center</strong> (702 S Main St) — bistrô local favorito de trilheiros, sanduíches artesanais e sopa do dia. ~$12-18/pessoa", type: "food" }
        ]
    },

    // ==================== TRANSIÇÃO → PNW (Dias 11-12) ====================
    {
        photo: 'img/dia-15.jpg', shortLoc: 'Twin Falls',
        chargeStops: [
            { name: 'Green River, UT', leg: 'Moab → Twin Falls', critical: false },
            { name: 'Price, UT', leg: 'Moab → Twin Falls', critical: false },
            { name: 'Twin Falls, ID', leg: 'Moab → Twin Falls', critical: false }
        ],
        location: "Moab → Antelope Island → Twin Falls",
        route: "Bisões + Shoshone Falls + Evel Knievel! 🦬",
        note: "Dia longo — bisões na Antelope Island + Shoshone Falls + local do salto do Evel Knievel!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out", type: "" },
            { time: "07:30", text: "🚗 Saída rumo norte (~770 km total)", type: "drive" },
            { time: "09:00", text: "⚡ <strong>Supercharger Green River</strong> (~100 km) — ~20 min", type: "charge" },
            { time: "10:30", text: "⚡ <strong>Supercharger Price</strong> (~100 km) — ~20 min", type: "charge" },
            { time: "~12:00", text: "🦬 <strong>Antelope Island SP</strong> — bisões selvagens + Great Salt Lake!", type: "highlight" },
            { time: "12:30", text: "📸 <strong>Buffalo Point</strong> — mirante 360°", type: "" },
            { time: "13:00", text: "🍽️ Almoço rápido", type: "food" },
            { time: "13:30", text: "🚗 I-15 N → I-84 W rumo Twin Falls (~340 km, ~3.5h)", type: "drive" },
            { time: "~17:00", text: "⚡ <strong>Supercharger Twin Falls</strong>", type: "charge" },
            { time: "17:15", text: "� <strong>Perrine Bridge</strong> — ponte sobre o Snake River Canyon! Ponto de BASE jumping legal 🪂", type: "highlight" },
            { time: "17:30", text: "📸 <strong>Evel Knievel Jump Site</strong> — local do famoso salto de 1974 sobre o Snake River Canyon!", type: "highlight" },
            { time: "17:50", text: "�🌊 <strong>Shoshone Falls</strong> — 'Niágara do Oeste'! 65m de queda!", type: "highlight" },
            { time: "18:00", text: "🏨 Check-in", type: "" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Cracker Barrel</strong> (1357 Blue Lakes Blvd N, Twin Falls) — comfort food americano clássico: chicken fried steak, mashed potatoes, biscuits e gravy. Ambiente de country store, kids adoram! ~$12-18/pessoa", type: "food" }
        ],
        tips: ["⚠️ Dois dias longos seguidos (14 + 15): ~770km + ~700km. Dormir cedo!"]
    },
    {
        photo: 'img/dia-16.jpg', shortLoc: 'Centralia',
        chargeStops: [
            { name: 'Baker City, OR', leg: 'Twin Falls → Centralia', critical: false },
            { name: 'Pendleton, OR', leg: 'Twin Falls → Centralia', critical: false },
            { name: 'The Dalles, OR', leg: 'Twin Falls → Centralia', critical: false },
            { name: 'Centralia, WA', leg: 'Twin Falls → Centralia', critical: false }
        ],
        location: "Twin Falls → Multnomah → Centralia",
        route: "Columbia Gorge + Multnomah Falls! 💧",
        note: "Dia de transição longo — cachoeira icônica de 189m!",
        region: "pnw",
        items: [
            { time: "07:30", text: "☕ Café + check-out", type: "" },
            { time: "08:00", text: "🚗 Saída via I-84 W", type: "drive" },
            { time: "08:30", text: "🌊 <strong>Thousand Springs</strong> (Hagerman, ID) — cachoeiras brotando do paredão de rocha no Snake River! Mirante na I-84. Grátis", type: "" },
            { time: "09:30", text: "⚡ <strong>Supercharger Baker City, OR</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "10:45", text: "📸 <strong>Deadman Pass Overlook</strong> — mirante nas Blue Mountains! Vista panorâmica a 1.278m de altitude", type: "highlight" },
            { time: "11:30", text: "⚡ <strong>Supercharger Pendleton, OR</strong> (~200 km) — ~20 min", type: "charge" },
            { time: "12:00", text: "🍽️ Almoço em Pendleton", type: "food" },
            { time: "13:30", text: "⚡ <strong>Supercharger The Dalles, OR</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "14:00", text: "�️ (opcional) <strong>Mt. Hood</strong> — desvio ~1h ao sul pela US-26. Vulcão de 3.429m coberto de neve!", type: "" },
            { time: "14:30", text: "🏞️ (opcional) <strong>Trillium Lake</strong> — lago com reflexo perfeito do Mt. Hood! Ótimo pra fotos", type: "" },
            { time: "14:45", text: "📸 <strong>Rowena Crest Viewpoint</strong> — mirante épico com curvas hairpin sobre o Columbia River! Panorâmica 360°. Grátis", type: "" },
            { time: "15:00", text: "🏛️ <strong>Vista House at Crown Point</strong> — edifício octogonal de 1917 com vista 270° do Gorge!", type: "highlight" },
            { time: "15:15", text: "🏞️ <strong>Columbia River Gorge</strong>", type: "" },
            { time: "15:30", text: "🌲 <strong>Multnomah Falls</strong> — cachoeira icônica de 189m!", type: "highlight" },
            { time: "16:00", text: "🚗 I-84 W → I-5 N → Centralia (~240 km, ~2.5h)", type: "drive" },
            { time: "~17:30", text: "🏨 Chegada em <strong>Centralia</strong>!", type: "" },
            { time: "18:00", text: "⚡ <strong>Supercharger Centralia</strong>", type: "charge" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Olympic Club Hotel & Bar</strong> (112 N Tower Ave, Centralia) — bar histórico de 1908, o mais antigo de WA em funcionamento, burgers e fish & chips. ~$15-20/pessoa", type: "food" }
        ]
    },

    // ==================== PNW (Dias 13-16) ====================
    {
        photo: 'img/dia-17.jpg', shortLoc: 'Rainier',
        chargeStops: [{ name: 'Olympia, WA', leg: 'Centralia → Rainier → Forks', critical: true, note: '⚠️ CARREGAR ATÉ 100% — Olympic 265 km sem SC!' }],
        location: "Centralia → Mt. Rainier → Forks",
        route: "Parada rápida no Rainier + Olympic NP! 🌋",
        note: "Rainier opcional só para foto em Paradise; foco do dia é chegar bem em Forks.",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out", type: "" },
            { time: "07:30", text: "🚗 Rumo a <strong>Mt. Rainier NP (Paradise)</strong> (~130 km, ~1.5h via SR-7 → SR-706)", type: "drive" },
            { time: "09:00", text: "📸 <strong>Parada fotográfica rápida em Paradise</strong> (~30-45 min) — somente se estrada/clima estiverem bons", type: "highlight" },
            { time: "09:45", text: "🚗 Descida → Olympia (~100 km, ~1.5h)", type: "drive" },
            { time: "11:30", text: "⚡ <strong>Supercharger Olympia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~35 min)", type: "charge" },
            { time: "12:00", text: "🍽️ Almoço em Olympia", type: "food" },
            { time: "12:30", text: "🚗 Rumo a <strong>Forks</strong> (~265 km, ~3.5h via US-101)", type: "drive" },
            { time: "15:30", text: "🏞️ <strong>Lake Crescent</strong> — lago cristalino", type: "" },
            { time: "16:30", text: "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km)", type: "" },
            { time: "17:30", text: "🏨 Check-in em <strong>Forks</strong>", type: "" },
            { time: "18:00", text: "🧛 Tour Crepúsculo! Forks High School + Casa da Bella Swan", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Pacific Pizza & Pasta</strong> (70 N Forks Ave, Forks) — a opção mais confiável da cidade, favorita dos moradores locais. ~$12-18/pessoa", type: "food" }
        ],
        tips: ["⚠️ Visitor Center fecha no meio da semana no inverno (abre só sex-dom).", "🔄 Se Rainier FECHADO ou com neve forte: cortar Paradise e ir direto Centralia → Olympia → Forks (sem perda do dia)."]
    },
    {
        photo: 'img/dia-18.jpg', shortLoc: 'Olympic', location: "Olympic NP dia cheio 🌲",
        route: "Florestas místicas + praias selvagens!",
        note: "Hoh Rain Forest + Ruby Beach + Twilight!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café", type: "" },
            { time: "07:30", text: "🌲 <strong>Hoh Rain Forest</strong> — floresta tropical temperada!", type: "highlight" },
            { time: "08:00", text: "🥾 <strong>Hall of Mosses Trail</strong> (~1.3 km) — musgos pendurados!", type: "highlight" },
            { time: "09:00", text: "🥾 <strong>Spruce Nature Trail</strong> (~2 km)", type: "" },
            { time: "10:15", text: "🌊 <strong>Ruby Beach</strong> — sea stacks!", type: "highlight" },
            { time: "10:45", text: "🧪 Tidepools — estrelas-do-mar! ⚠️ Inverno: ondas fortes, observar de longe", type: "" },
            { time: "12:00", text: "🍽️ Almoço em Forks", type: "food" },
            { time: "13:00", text: "🌊 <strong>La Push / First Beach</strong> — praia dos Quileute (Twilight!)", type: "" },
            { time: "14:30", text: "🌊 <strong>Rialto Beach</strong> — sea stacks e troncos", type: "" },
            { time: "16:00", text: "🥾 <strong>Marymere Falls Trail</strong> (~2.5 km)", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no Pacífico!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Bella Italia</strong> (118 E 1st St, Port Angeles) — italiano autêntico com ingredientes do PNW, mushroom ravioli e linguine alle vongole. ~$20-25/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-19.jpg', shortLoc: 'Cannon',
        chargeStops: [{ name: 'Aberdeen, WA', leg: 'Forks → Cannon Beach', critical: false }],
        location: "Forks → Cannon Beach",
        route: "Astoria + Haystack Rock ao pôr do sol! 🌅",
        note: "Cidade do Goonies + pôr do sol mais bonito da viagem!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Forks", type: "" },
            { time: "08:30", text: "🚗 Saída rumo ao sul via US-101 S (~380 km)", type: "drive" },
            { time: "09:30", text: "🌳 <strong>Kalaloch Tree of Life</strong> — árvore crescendo sobre caverna com raízes expostas como tentáculos!", type: "" },
            { time: "11:00", text: "⚡ <strong>Supercharger Aberdeen, WA</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "11:25", text: "🎸 <strong>Kurt Cobain Memorial</strong> — placa 'Come As You Are' + memorial do Nirvana!", type: "" },
            { time: "11:30", text: "🍽️ Almoço em Aberdeen", type: "food" },
            { time: "12:30", text: "🏖️ <strong>Cape Disappointment</strong> — farol no encontro do Rio Columbia com o Pacífico!", type: "" },
            { time: "13:15", text: "🚢 <strong>Peter Iredale Shipwreck</strong> — naufrágio de 1906 na praia! Esqueleto do navio visível!", type: "highlight" },
            { time: "13:30", text: "🏚️ <strong>Fort Stevens WWII Bunkers</strong> — único forte continental dos EUA atacado por submarino japonês (1942)! Ruínas grátis no mesmo parque", type: "" },
            { time: "14:00", text: "🌊 <strong>Astoria</strong> — cenário de <strong>The Goonies</strong>! Astoria Column!", type: "highlight" },
            { time: "15:30", text: "🏨 Check-in em <strong>Cannon Beach</strong>", type: "" },
            { time: "16:00", text: "📸 <strong>Haystack Rock</strong> — ícone de Oregon!", type: "highlight" },
            { time: "16:45", text: "🌊 <strong>Ecola State Park</strong> — mirante espetacular!", type: "" },
            { time: "17:00", text: "🌅 <strong>Pôr do sol em Cannon Beach</strong> — ESPETACULAR!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Ecola Seafood Restaurant & Market</strong> (208 N Spruce St) — Dungeness crab e fish & chips de halibut frescos a poucos metros da Haystack Rock. ~$20-25/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-20.jpg', shortLoc: 'Oregon',
        chargeStops: [
            { name: 'Lincoln City, OR', leg: 'Cannon Beach → Gold Beach', critical: false },
            { name: 'Coos Bay, OR', leg: 'Cannon Beach → Gold Beach', critical: false }
        ],
        location: "Costa Oregon Sul",
        route: "Thor's Well + faróis + Samuel Boardman! 🌊",
        note: "O melhor dia de costa — 350 km de paradas espetaculares!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Café + última caminhada em Cannon Beach", type: "" },
            { time: "09:00", text: "🚗 Saída rumo ao sul pela US-101 (~350 km)", type: "drive" },
            { time: "10:30", text: "⚡ <strong>Supercharger Lincoln City, OR</strong> (~130 km) — ~25 min", type: "charge" },
            { time: "11:00", text: "🌊 <strong>Devil's Punchbowl</strong> (Otter Rock) — bacia natural de rocha onde as ondas explodem! Viewpoint gratuito", type: "" },
            { time: "11:15", text: "🍽️ Almoço em <strong>Newport</strong>", type: "food" },
            { time: "12:15", text: "📸 <strong>Cape Perpetua + Thor's Well</strong>", type: "highlight" },
            { time: "12:45", text: "🏖️ <strong>Heceta Head Lighthouse</strong>", type: "" },
            { time: "13:45", text: "🦌 <strong>Dean Creek Elk Viewing Area</strong> — manada de Roosevelt elk selvagens!", type: "highlight" },
            { time: "14:30", text: "📸 <strong>Shore Acres State Park</strong>", type: "" },
            { time: "15:15", text: "⚡ <strong>Supercharger Coos Bay</strong> — ~25 min", type: "charge" },
            { time: "16:45", text: "📸 <strong>Samuel Boardman Scenic Corridor</strong>!", type: "highlight" },
            { time: "17:15", text: "📸 <strong>Natural Bridges Viewpoint</strong>", type: "highlight" },
            { time: "17:30", text: "🌅 Pôr do sol na costa de Oregon", type: "highlight" },
            { time: "18:00", text: "🏨 Check-in em <strong>Gold Beach</strong>", type: "" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Spinner's Seafood Steak & Chowder House</strong> (Gold Beach, OR) — salmão grelhado do Rio Rogue e clam chowder frescos. ~$20-25/pessoa", type: "food" }
        ]
    },

    // ==================== REDWOOD (Dias 17-18) ====================
    {
        photo: 'img/dia-21.jpg', shortLoc: 'Redwood',
        location: "Redwood NP norte — Jedediah Smith! 🌲",
        route: "Jedediah Smith + Crescent City! 🌲",
        note: "Dia tranquilo entre redwoods perto de Crescent City.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Gold Beach", type: "" },
            { time: "08:30", text: "🚗 US-101 sul (~70 km, ~1h)", type: "drive" },
            { time: "09:30", text: "🌲 <strong>Jedediah Smith Redwoods SP</strong> — <strong>Stout Memorial Grove Trail</strong> (~1 km loop entre gigantes!)", type: "highlight" },
            { time: "10:30", text: "🚗 <strong>Howland Hill Road</strong> — estrada de terra entre redwoods enormes", type: "" },
            { time: "11:15", text: "🥾 <strong>Simpson-Reed Trail</strong> (~1 km loop) — trilha pavimentada entre old-growth redwoods, acessível o ano todo!", type: "" },
            { time: "13:00", text: "🏨 Check-in <strong>Crescent City</strong>", type: "" },
            { time: "13:30", text: "🍽️ Almoço", type: "food" },
            { time: "14:30", text: "🏝️ <strong>Battery Point Lighthouse</strong> — ilha acessível na maré baixa!", type: "" },
            { time: "15:30", text: "🌲 <strong>Del Norte Coast Redwoods SP</strong> — <strong>Coastal Trail (Enderts Beach)</strong> (~4 km) — praia selvagem! ⚠️ Ondas fortes no inverno — observar de longe, não entrar na água", type: "highlight" },
            { time: "17:15", text: "🌅 Pôr do sol no porto de Crescent City", type: "" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Fisherman's Restaurant</strong> (700 US-101 S, Crescent City) — Dungeness crab e halibut do Pacífico Norte, clássico de cidade de pescadores. ~$15-22/pessoa", type: "food" }
        ],
        tips: ["🌊 Battery Point: verificar tábua de marés! Só acessível na maré baixa."]
    },
    {
        photo: 'img/dia-22.jpg', shortLoc: 'Redwood',
        chargeStops: [{ name: 'Eureka, CA', leg: 'Crescent City → Eureka', critical: false }],
        location: "Redwood NP sul → Eureka",
        route: "Fern Canyon + Tall Trees + Avenue of Giants! 🌲",
        note: "Tudo descendo ao sul — sem backtrack! Fern Canyon, Tall Trees e Avenue of Giants.",
        region: "ca",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Crescent City", type: "" },
            { time: "07:30", text: "🚗 US-101 sul (~35 km) → <strong>Prairie Creek Redwoods SP</strong>", type: "drive" },
            { time: "07:50", text: "🦌 <strong>Elk Meadow</strong> (Orick) — manada de Roosevelt elk pastando ao lado da US-101! Pullover grátis", type: "" },
            { time: "08:00", text: "🚗 <strong>Newton B. Drury Scenic Parkway</strong>", type: "" },
            { time: "08:30", text: "📸 <strong>Big Tree Wayside</strong>", type: "" },
            { time: "09:00", text: "🥾 <strong>Fern Canyon</strong> (~1.5 km) — samambaias! <strong>Jurassic Park 2</strong>!", type: "highlight" },
            { time: "10:30", text: "🌊 <strong>Gold Bluffs Beach</strong>", type: "" },
            { time: "11:00", text: "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km)", type: "" },
            { time: "12:00", text: "🌲 <em>Opcional (checar condições):</em> <strong>Tall Trees Grove</strong> — árvores mais altas do MUNDO! (~5 km, ~2h). ⚠️ Permit no Info Center (Orick), estrada pode estar difícil no inverno", type: "highlight" },
            { time: "14:00", text: "🍽️ Almoço em <strong>Orick</strong>", type: "food" },
            { time: "14:30", text: "🚗 US-101 sul (~60 km)", type: "drive" },
            { time: "15:30", text: "🌲 <strong>Avenue of the Giants</strong> — 50 km entre redwoods!", type: "highlight" },
            { time: "17:00", text: "🏨 Chegada em <strong>Eureka</strong>! Check-in", type: "" },
            { time: "17:30", text: "🏙️ <strong>Old Town Eureka</strong> — <strong>Carson Mansion</strong>", type: "" },
            { time: "18:00", text: "⚡ <strong>Supercharger Eureka</strong>", type: "charge" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Lost Coast Brewery & Cafe</strong> (617 4th St, Eureka) — cervejaria artesanal pioneira do North Coast, burgers e fish tacos. ~$15-20/pessoa", type: "food" }
        ],
        tips: ["⚠️ Fern Canyon: Davison Road (terra, 10 km) pode fechar com chuva forte. Ligar pro Visitors Center de manhã: (707) 464-6101 ext. 5265. Se fechada, mais tempo em Lady Bird Johnson Grove.", "⚠️ Tall Trees Grove: permit gratuito no Thomas Clarke Info Center (Orick) — pode estar fechado em dia de semana no inverno."]
    },

    // ==================== SAN FRANCISCO (Dias 19-21) ====================
    {
        photo: 'img/dia-23.jpg', shortLoc: 'SF',
        chargeStops: [{ name: 'Ukiah, CA', leg: 'Eureka → SF', critical: false }],
        location: "Eureka → San Francisco",
        route: "Point Reyes + baleias + Pier 39! 🐋",
        note: "Alces selvagens, baleias cinzentas e Pier 39!",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Eureka", type: "" },
            { time: "08:30", text: "🚗 US-101 S (~440 km, ~5.5h)", type: "drive" },
            { time: "10:30", text: "⚡ <strong>Supercharger Ukiah</strong> (~250 km) — ~25 min", type: "charge" },
            { time: "11:00", text: "🍽️ Almoço em Ukiah", type: "food" },
            { time: "11:15", text: "🏖️ <strong>Glass Beach</strong> (Fort Bragg) — praia coberta de vidro marítimo polido pelas ondas!", type: "" },
            { time: "11:30", text: "🌊 <strong>Mendocino</strong> — vila costeira charmosa, cenário de filmes! Parada rápida", type: "" },
            { time: "12:00", text: "🌳 <strong>Cypress Tree Tunnel</strong> (Point Reyes) — túnel de ciprestes centenários formando arco perfeito! Grátis", type: "" },
            { time: "12:30", text: "🐋 <strong>Point Reyes</strong> — Elk Preserve, Lighthouse + <strong>baleias cinzentas!</strong> (migração jan-abr!)", type: "highlight" },
            { time: "~15:00", text: "🏨 Chegada em <strong>SF</strong>! Check-in", type: "" },
            { time: "15:30", text: "🌆 <strong>Embarcadero</strong> — Ferry Building", type: "" },
            { time: "16:30", text: "🏖️ <strong>Pier 39</strong> — leões-marinhos!", type: "highlight" },
            { time: "18:00", text: "🍽️ Jantar — <strong>Tony's Pizza Napoletana</strong> (1570 Stockton St, North Beach) — campeão mundial de pizza napolitana, a 5 min de Fisherman's Wharf. ~$20-25/pessoa. OU: Clam chowder no <strong>Boudin</strong> (Pier 39)", type: "food" }
        ]
    },
    {
        photo: 'img/dia-24.jpg', shortLoc: 'SF', location: "San Francisco — Golden Gate + West Side",
        route: "Battery Spencer + Golden Gate Bridge + Ocean Beach! 🌉",
        note: "Golden Gate de todos os ângulos! Battery Spencer, ponte, parque e praia.",
        region: "ca",
        items: [
            { time: "08:30", text: "☕ Café", type: "" },
            { time: "09:00", text: "🏞️ <strong>Battery Spencer</strong> — vista icônica da Golden Gate!", type: "highlight" },
            { time: "09:45", text: "📸 <strong>Golden Gate Overlook</strong> (Langdon Ct) — segundo ponto de vista em SF lado, Marin Headlands!", type: "highlight" },
            { time: "10:00", text: "🌉 <strong>Golden Gate Bridge</strong> — caminhar pela ponte!", type: "highlight" },
            { time: "11:30", text: "🏰 <strong>Fort Point</strong> — cenário de Vertigo!", type: "" },
            { time: "12:00", text: "🌅 <strong>Crissy Field</strong> — vista da Golden Gate!", type: "" },
            { time: "12:30", text: "🍽️ Almoço", type: "food" },
            { time: "14:00", text: "🌳 <strong>Golden Gate Park</strong> — Japanese Tea Garden, Conservatory of Flowers", type: "" },
            { time: "16:00", text: "🏖️ <strong>Ocean Beach</strong> — praia do Pacífico", type: "" },
            { time: "18:00", text: "🍽️ Jantar — <strong>Burma Superstar</strong> (309 Clement St, Inner Richmond) — birmanês premiado, tea leaf salad e coconut chicken noodles. Único em SF! ~$15-22/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-25.jpg', shortLoc: 'SF', location: "San Francisco — City Tour",
        route: "Cable Car + Chinatown + Nintendo! 🚋",
        note: "Tour pela cidade! Cable Car, Chinatown, Nintendo e Union Square.",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🚋 Passeio de <strong>Cable Car</strong>", type: "highlight" },
            { time: "10:30", text: "🌆 <strong>Lombard Street</strong>", type: "" },
            { time: "11:00", text: "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA!", type: "highlight" },
            { time: "12:30", text: "🍽️ Almoço — <strong>La Taqueria</strong> (Mission)", type: "food" },
            { time: "14:00", text: "🎮 <strong>Nintendo San Francisco</strong> (Union Square)", type: "highlight" },
            { time: "15:30", text: "🛍️ <strong>Union Square</strong> — compras", type: "" },
            { time: "17:00", text: "🍽️ Jantar de despedida de SF — <strong>Fog Harbor Fish House</strong> (Pier 39, Fisherman's Wharf) — frutos do mar com vista para a Baía, menu kids disponível, sem reserva, crianças adoram. ~$20-28/pessoa", type: "food" }
        ]
    },

    // ==================== PCH + YOSEMITE + SEQUOIA (Dias 22-26) ====================
    {
        photo: 'img/dia-26.jpg', shortLoc: 'Monterey',
        location: "SF → PCH → Monterey/Carmel",
        route: "Pigeon Point + Aquarium + 17-Mile Drive! 🌊",
        note: "Costa do Pacífico até Monterey! Aquarium e 17-Mile Drive.",
        region: "ca",
        items: [
            { time: "07:00", text: "☕ Café + check-out de SF", type: "" },
            { time: "07:30", text: "🚗 Hwy 1 sul → <strong>Half Moon Bay</strong> (~45 min)", type: "drive" },
            { time: "08:15", text: "🏖️ Parada rápida em Half Moon Bay", type: "" },
            { time: "08:45", text: "🏠 <strong>Pigeon Point Lighthouse</strong> (Pescadero) — um dos faróis mais altos da Costa Oeste! 35m, vista linda do Pacífico. Grátis", type: "" },
            { time: "09:00", text: "🚗 Continue Hwy 1 → Monterey (~1.5h)", type: "drive" },
            { time: "10:30", text: "🦞 <strong>Cannery Row</strong> — passear + café", type: "" },
            { time: "11:00", text: "🐙 <strong>Monterey Bay Aquarium</strong> — um dos melhores do mundo! (~2.5h)", type: "highlight" },
            { time: "13:30", text: "🍽️ Almoço em Monterey", type: "food" },
            { time: "14:30", text: "🚗 <strong>17-Mile Drive</strong> — Lone Cypress, Pebble Beach!", type: "highlight" },
            { time: "16:30", text: "🏖️ <strong>Carmel-by-the-Sea</strong> — vila charmosa, galerias, Carmel Beach", type: "" },
            { time: "18:00", text: "🍽️ Jantar — <strong>The Forge in the Forest</strong> (5th Ave e Junipero St, Carmel) — americana casual em casinha charmosa com jardim, burgers e ribs. Kid-friendly, sem frescura, ambiente de fazenda no centro de Carmel. ~$20-28/pessoa", type: "food" }
        ],
        tips: ["🎟️ Monterey Bay Aquarium: compre os ingressos online antes da viagem! A bilheteria pode esgotar. ~$50/adulto, ~$30/criança. Site: montereybayaquarium.org"]
    },
    {
        photo: 'img/dia-27.jpg', shortLoc: 'Big Sur',
        chargeStops: [
            { name: 'Gilroy, CA', leg: 'Carmel → Yosemite', critical: false },
            { name: 'Merced, CA', leg: 'Carmel → Yosemite', critical: false }
        ],
        location: "Carmel → Big Sur → Yosemite",
        route: "Bixby Bridge + McWay Falls + Yosemite! 🌊🏔️",
        note: "Big Sur de manhã, depois corta pro interior rumo a Yosemite!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café em Carmel", type: "" },
            { time: "08:00", text: "🌉 <strong>Bixby Creek Bridge</strong> — foto icônica!", type: "highlight" },
            { time: "08:45", text: "🏖️ <strong>Pfeiffer Beach</strong> — arco de pedra (keyhole rock)!", type: "highlight" },
            { time: "09:45", text: "🌊 <strong>McWay Falls</strong> — cachoeira de 24m direto na praia!", type: "highlight" },
            { time: "10:30", text: "🚗 Volta pra Carmel (~1h)", type: "drive" },
            { time: "11:30", text: "🍽️ Almoço em Carmel", type: "food" },
            { time: "12:15", text: "🚗 Corta pro interior: Carmel → CA-68 → CA-99 → CA-140 → Yosemite (~300 km, ~3.5h)", type: "drive" },
            { time: "13:00", text: "⚡ <strong>Supercharger Gilroy</strong> — ~20 min", type: "charge" },
            { time: "14:30", text: "⚡ <strong>Supercharger Merced</strong> — ~20 min", type: "charge" },
            { time: "~16:30", text: "🏨 Chegada em <strong>Mariposa</strong>! Check-in", type: "" },
            { time: "18:00", text: "🍽️ Jantar — <strong>Charles Street Dinner House</strong> (5043 Charles St, Mariposa) — steakhouse local tradicional, prime rib e chicken marsala. ~$20-25/pessoa", type: "food" }
        ],
        tips: ["⚠️ Se Hwy 1 estiver FECHADA ao sul de Bixby: pular Pfeiffer Beach e McWay Falls, sair direto de Carmel pro interior mais cedo."]
    },
    {
        photo: 'img/dia-28.jpg', shortLoc: 'Yosemite', location: "Yosemite NP dia 1 — Valley",
        route: "Tunnel View + cachoeiras + neve! 🏞️",
        note: "Primeiro dia em Yosemite! Valley com neve — lindo!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café em Mariposa", type: "" },
            { time: "08:00", text: "🚗 Drive Mariposa → Yosemite Valley (~1.5h via CA-140)", type: "drive" },
            { time: "09:30", text: "📸 <strong>Tunnel View</strong> — vista icônica: El Capitan + Half Dome + Bridalveil!", type: "highlight" },
            { time: "10:00", text: "🌊 <strong>Bridalveil Fall</strong> — trilha curta ~10 min", type: "" },
            { time: "10:45", text: "🏔️ <strong>El Capitan Meadow</strong> — paredão de 900m!", type: "" },
            { time: "11:30", text: "🌊 <strong>Yosemite Falls</strong> — Lower trail ~30 min — pode ter gelo!", type: "highlight" },
            { time: "12:30", text: "🍽️ Almoço no Yosemite Valley Lodge", type: "food" },
            { time: "13:30", text: "🪞 <strong>Mirror Lake</strong> — trilha ~3 km, reflexo do Half Dome!", type: "" },
            { time: "15:00", text: "🌲 <strong>Valley View</strong> — foto clássica do Merced River", type: "" },
            { time: "15:30", text: "📸 <strong>Swinging Bridge</strong> — outra vista do Yosemite Falls", type: "" },
            { time: "16:30", text: "🌅 Sunset no <strong>Sentinel Bridge</strong> — Half Dome dourado!", type: "highlight" },
            { time: "17:30", text: "🚗 Volta pra Mariposa (~45 min)", type: "drive" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Savoury's</strong> (5034 Hwy 140, Mariposa) — cozinha americana eclética com ingredientes locais da Sierra Nevada. ~$20-25/pessoa", type: "food" }
        ],
        tips: ["❄️ Yosemite nevado em fevereiro é LINDO! Menos turistas, silêncio, neve nos picos.", "🏨 Hospedagem recomendada: <strong>Tenaya Lodge</strong> (Fish Camp, 3 km da entrada sul) — resort completo com piscina aquecida, spa e restaurante, fica na Hwy 41 no caminho de entrada. Alternativa mais barata: <strong>Mariposa</strong> (40 km, mais opções de preço). Reserve com meses de antecedência!"]
    },
    {
        photo: 'img/dia-29.jpg', shortLoc: 'Yosemite', location: "Yosemite NP dia 2 — Neve!",
        route: "Badger Pass + trilhas na neve! ⛷️",
        note: "Snow tubing, snowshoeing e mais Yosemite Valley! 🏨 Dica: considere hospedar em El Portal ou Fish Camp — bem na porta do parque.",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café em Mariposa", type: "" },
            { time: "08:00", text: "🚗 Drive → Yosemite", type: "drive" },
            { time: "09:00", text: "⛷️ <strong>Badger Pass Ski Area</strong> — snow tubing! Perfeito pra família!", type: "highlight" },
            { time: "11:00", text: "🏔️ Snowshoeing guiado pelo ranger (grátis, ~2h)", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço no Yosemite Valley", type: "food" },
            { time: "14:00", text: "🌲 <strong>Cook's Meadow Loop</strong> — trilha fácil, Half Dome + Yosemite Falls com neve", type: "" },
            { time: "15:00", text: "📸 Revisitar favoritos — luz diferente da tarde!", type: "" },
            { time: "16:00", text: "🎨 <strong>Ansel Adams Gallery</strong> — fotografia icônica de Yosemite", type: "" },
            { time: "16:30", text: "🌅 Sunset no <strong>Tunnel View</strong> — segunda chance, luz dourada!", type: "highlight" },
            { time: "17:30", text: "🚗 Volta pra Mariposa", type: "drive" },
            { time: "19:00", text: "🍽️ Jantar de despedida — <strong>Castillo's Mexican Food</strong> (4995 5th St, Mariposa) — mexicano familiar dos moradores, enchiladas verdes e chile relleno. ~$12-18/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/dia-30.jpg', shortLoc: 'Sequoia',
        chargeStops: [
            { name: 'Fresno, CA', leg: 'Mariposa → Sequoia', critical: false }
        ],
        location: "Mariposa → Kings Canyon → Sequoia",
        route: "General Sherman + Moro Rock! 🌲",
        note: "Dia inteiro entre as maiores árvores do mundo!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café + check-out de Mariposa", type: "" },
            { time: "08:00", text: "🚗 Drive Mariposa → Kings Canyon (~250 km, ~3.5h via Fresno)", type: "drive" },
            { time: "09:30", text: "⚡ <strong>Supercharger Fresno</strong> — ~25 min", type: "charge" },
            { time: "11:30", text: "🌲 <strong>General Grant Tree</strong> — 2ª maior sequoia do mundo!", type: "highlight" },
            { time: "12:00", text: "🌲 <strong>North Grove Loop</strong> (~1 km) — floresta de sequoias gigantes!", type: "" },
            { time: "12:45", text: "🍽️ Almoço (levar lanche ou Grant Grove Restaurant)", type: "food" },
            { time: "13:30", text: "🚗 <strong>Generals Highway</strong> → Sequoia NP (~1h, estrada cênica!)", type: "drive" },
            { time: "14:30", text: "🌲 <strong>General Sherman Tree</strong> — a MAIOR árvore do mundo! 84m!", type: "highlight" },
            { time: "15:00", text: "🥾 <strong>Congress Trail</strong> (~3 km loop) — entre sequoias gigantes", type: "" },
            { time: "16:00", text: "📸 <strong>Tunnel Log</strong> — sequoia caída com túnel pra carro! + <strong>Auto Log</strong> — suba em cima de uma sequoia gigante caída!", type: "" },
            { time: "17:00", text: "🚗 Descida → Three Rivers (~1h)", type: "drive" },
            { time: "18:00", text: "🏨 Check-in em <strong>Three Rivers</strong>", type: "" },
            { time: "19:00", text: "🍽️ Jantar — <strong>The Gateway Restaurant</strong> (45978 Sierra Dr, Three Rivers) — o mais confiável na porta do Sequoia, burgers e trout almondine. ~$15-20/pessoa", type: "food" }
        ],
        tips: ["❄️ Em fevereiro pode ter neve nas áreas mais altas.", "⚠️ Kings Canyon Scenic Byway (CA-180 leste) fecha no inverno (nov–abr). Só General Grant Tree é acessível.", "⚠️ Moro Rock: degraus frequentemente fechados no inverno por gelo. Se aberto, vale a subida (~30 min ida e volta, vista 360°)."]
    },

    // ==================== LAS VEGAS (Dias 27-29) ====================
    {
        photo: 'img/dia-30.jpg', shortLoc: 'Vegas',
        chargeStops: [
            { name: 'Ridgecrest, CA', leg: 'Three Rivers → Death Valley', critical: false }
        ],
        location: "Three Rivers → Death Valley → Las Vegas",
        route: "Kern Canyon + Death Valley + Vegas! 🏜️",
        note: "Dia longo mas paisagem épica! Kern River Canyon, Death Valley e chegada em Vegas.",
        region: "nv",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Three Rivers (sair cedo!)", type: "" },
            { time: "07:30", text: "🚗 Three Rivers → CA-190 E → CA-178 (<strong>Kern River Canyon</strong> + Walker Pass) — estrada cênica linda pelo cânion!", type: "drive" },
            { time: "09:30", text: "⚡ <strong>Supercharger Ridgecrest</strong> (~200 km) — ~25 min. ⚠️ Carregar a 100%!", type: "charge" },
            { time: "10:00", text: "🚗 Ridgecrest → <strong>Death Valley</strong> (~180 km, ~2h via CA-178/190)", type: "drive" },
            { time: "12:00", text: "⬇️ <strong>Badwater Basin</strong> — ponto mais baixo das Américas (-86m)!", type: "highlight" },
            { time: "12:45", text: "🚗 <strong>Artist's Drive + Artist's Palette</strong> — montanhas coloridas", type: "" },
            { time: "13:15", text: "📸 <strong>Zabriskie Point</strong> — formações douradas", type: "highlight" },
            { time: "13:45", text: "🍽️ Almoço no <strong>Furnace Creek</strong>", type: "food" },
            { time: "14:30", text: "🏜️ <strong>Mesquite Flat Sand Dunes</strong> — dunas clássicas!", type: "" },
            { time: "15:00", text: "🚗 Death Valley → <strong>Las Vegas</strong> (~200 km, ~2h via NV-160)", type: "drive" },
            { time: "~17:00", text: "🎰 Chegada em <strong>Las Vegas</strong>! Check-in", type: "" },
            { time: "18:00", text: "🌅 <strong>Bellagio Fountains</strong> — show a cada 30 min!", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Secret Pizza</strong> (The Cosmopolitan, 3º andar, sem placa) — o hidden gem de Vegas, pizza NY-style escondida no hotel mais badalado. ~$15-20/pessoa", type: "food" }
        ],
        tips: ["⚡ Carregar 100% em Ridgecrest! Trecho DV→Vegas ~200 km sem Supercharger confirmado.", "🔄 Fallback: se autonomia não der, pular Death Valley e ir Ridgecrest → CA-14 → I-15 → Vegas."]
    },
    {
        photo: 'img/dia-06.jpg', shortLoc: 'Vegas', location: "Mt. Charleston + Valley of Fire",
        route: "Neve + arenito vermelho! 🏔️🔥",
        note: "Mt. Charleston de manhã (neve!) + Valley of Fire à tarde (melhor luz).",
        region: "nv",
        items: [
            { time: "08:15", text: "☕ Café", type: "" },
            { time: "09:00", text: "📸 <strong>Welcome to Las Vegas Sign</strong> — foto icônica!", type: "highlight" },
            { time: "09:30", text: "🚗 Rumo a <strong>Mt. Charleston</strong> (~55 km, ~45 min)", type: "drive" },
            { time: "10:15", text: "🏔️ <strong>Kyle Canyon Scenic Drive</strong> — neve nas montanhas!", type: "" },
            { time: "10:45", text: "⛄ Parada — <strong>brincar na neve!</strong> Boneco de neve, guerra de bolas!", type: "highlight" },
            { time: "12:00", text: "☕ <strong>Mt. Charleston Lodge</strong> — chocolate quente com lareira!", type: "food" },
            { time: "12:45", text: "🚗 Volta pra Vegas (~45 min)", type: "drive" },
            { time: "13:30", text: "🍔 Almoço rápido", type: "food" },
            { time: "14:30", text: "🚗 Rumo a <strong>Valley of Fire</strong> (~45 min pela I-15 N)", type: "drive" },
            { time: "15:15", text: "🔥 <strong>Valley of Fire</strong> — arenito vermelho surreal!", type: "highlight" },
            { time: "15:30", text: "🥾 <strong>Fire Wave Trail</strong> (~2 km) — ondas de rocha listrada!", type: "highlight" },
            { time: "16:15", text: "📸 <strong>Elephant Rock</strong>", type: "" },
            { time: "16:45", text: "📸 <strong>White Domes Trail</strong> (~1.8 km) — cânion colorido", type: "" },
            { time: "17:30", text: "🌅 Pôr do sol em Valley of Fire — ESPETACULAR!", type: "highlight" },
            { time: "18:30", text: "🚗 Volta pra Vegas (~45 min)", type: "drive" },
            { time: "19:30", text: "🍽️ Jantar — <strong>Fogo de Chão</strong> (3500 Las Vegas Blvd S, Paris Las Vegas) — 🇧🇷 churrascaria brasileira na Strip! Rodízio com picanha, fraldinha, cordeiro e a melhor farofa. ~$45-55/adulto, crianças menor preço", type: "food" }
        ],
        tips: ["🏔️ Mt. Charleston: pode estar -5°C com neve! Levar casaco, luvas e botas."]
    },
    {
        photo: 'img/dia-07.jpg', shortLoc: 'Vegas', location: "Las Vegas Strip",
        route: "Hotéis icônicos + compras + shows! 🎰",
        note: "Dia livre em Vegas! Strip, hotéis, compras e show à noite.",
        region: "nv",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🏨 Explorar hotéis — <strong>Venetian</strong> (canais), <strong>Bellagio</strong> (conservatório), <strong>Caesars Palace</strong>", type: "highlight" },
            { time: "12:00", text: "🍽️ Almoço na Strip", type: "food" },
            { time: "13:30", text: "🛍️ <strong>Forum Shops</strong> (Caesars) ou <strong>Fashion Show Mall</strong>", type: "" },
            { time: "15:00", text: "🎮 Tempo livre — piscina, arcade, explorar", type: "" },
            { time: "17:00", text: "🌅 <strong>High Roller</strong> — roda-gigante ao pôr do sol!", type: "highlight" },
            { time: "18:00", text: "🌅 <strong>Bellagio Fountains</strong> — show noturno!", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Raising Cane's</strong> (3717 Las Vegas Blvd S, na Strip!) — chicken tenders crocantes com o famoso Cane's Sauce. Fila rápida, kids adoram! ~$10-14/pessoa", type: "food" },
            { time: "20:30", text: "🎪 Show ou passeio noturno na Strip", type: "highlight" }
        ]
    },

    // ==================== LA (Dias 30-33) ====================
    {
        photo: 'img/activities/hollywood_sign.jpg', shortLoc: 'LA',
        chargeStops: [
            { name: 'Barstow, CA', leg: 'Vegas → LA', critical: false }
        ],
        location: "Las Vegas → Los Angeles",
        route: "I-15 rumo a LA + Santa Monica! 🏖️",
        note: "Drive tranquilo Vegas→LA + Santa Monica Pier ao pôr do sol!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café + check-out de Vegas", type: "" },
            { time: "09:30", text: "🚗 Saída rumo a <strong>Los Angeles</strong> (~430 km, ~4h via I-15 S)", type: "drive" },
            { time: "11:30", text: "⚡🍽️ <strong>Supercharger Barstow</strong> (~200 km) — ~25 min + lanche", type: "charge" },
            { time: "12:00", text: "🎨 <strong>Elmer's Bottle Tree Ranch</strong> (Oro Grande) — floresta de 'árvores' de garrafas de vidro e metal! Grátis", type: "" },
            { time: "12:30", text: "👽 <strong>Alien Fresh Jerky</strong> (Baker) — loja alien + jerky de 100 sabores! + 🌡️ <strong>World's Tallest Thermometer</strong>!", type: "" },
            { time: "~14:00", text: "🏨 Chegada em <strong>LA</strong>! Check-in", type: "" },
            { time: "15:00", text: "🏖️ <strong>Santa Monica Pier</strong> — roda-gigante, Route 66 End Sign!", type: "highlight" },
            { time: "17:00", text: "🌅 Sunset na praia!", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar no <strong>Santa Monica Pier</strong> — <strong>Bubba Gump Shrimp Co.</strong> (com vista pro oceano, menu de frutos do mar, temático do Forrest Gump, kids adoram!) ~$20-30/pessoa", type: "food" }
        ]
    },
    {
        photo: 'img/activities/griffith_observatory.jpg', shortLoc: 'LA', location: "LA dia cheio",
        route: "Hollywood + Griffith Observatory! 🎬",
        note: "LA dia cheio! Science Center, Getty, Griffith Observatory.",
        region: "ca",
        items: [
            { time: "08:30", text: "☕ Café", type: "" },
            { time: "09:00", text: "🚀 <strong>California Science Center</strong> (700 Exposition Park Dr) — Space Shuttle Endeavour real em tamanho natural! Gratuito, imperdível para a família. ~2h", type: "highlight" },
            { time: "11:30", text: "🦕 <strong>La Brea Tar Pits & Museum</strong> (5801 Wilshire Blvd) — fossos de asfalto natural com fósseis de mamutes, sabres-dente e preguiças gigantes! Museu incluso ~$25 adulto / $10 criança. ~1.5h", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço no <strong>Fairfax District</strong> (perto do La Brea)", type: "food" },
            { time: "14:00", text: "🌴 <strong>Venice Beach</strong> — boardwalk icônico, Muscle Beach, artistas de rua, skatepark. ~15 min de Santa Monica Pier a pé. ~1h", type: "" },
            { time: "15:00", text: "🏛️ <strong>Getty Center</strong> (1200 Getty Center Dr) — museu gratuito com jardins e vista panorâmica incrível de LA, arte + fotos!", type: "highlight" },
            { time: "17:00", text: "🌆 Pôr do sol com vista de LA no Getty!", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar — <strong>Grand Central Market</strong> (317 S Broadway, DTLA) — mercado gastronômico histórico de 1917, cada um escolhe o que quer (tacos, ramen, pizza, burgers), sem reserva, perfeito para família. ~$10-18/pessoa", type: "food" },
            { time: "20:30", text: "🔭 <strong>Griffith Observatory à noite</strong> — LA iluminada!", type: "highlight" },
            { time: "22:00", text: "🧳 Hotel — arrumar malas", type: "" }
        ]
    },
    {
        photo: 'img/activities/mt_hood.jpg', shortLoc: 'Big Bear',
        chargeStops: [
            { name: 'San Bernardino, CA', leg: 'LA → Big Bear', critical: false }
        ],
        location: "Big Bear Lake",
        route: "Neve nas montanhas! ⛷️",
        note: "Day trip a Big Bear Lake — neve a 2h de LA!",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café", type: "" },
            { time: "08:30", text: "🚗 LA → <strong>Big Bear Lake</strong> (~160 km, ~2h via CA-330)", type: "drive" },
            { time: "10:00", text: "⚡ <strong>Supercharger San Bernardino</strong> (no caminho) — ~20 min", type: "charge" },
            { time: "10:45", text: "🏔️ Chegada em <strong>Big Bear</strong>!", type: "" },
            { time: "11:00", text: "⛷️ <strong>Snow Summit</strong> — snow tubing / snow play!", type: "highlight" },
            { time: "12:30", text: "🍽️ Almoço em <strong>Big Bear Village</strong>", type: "food" },
            { time: "13:30", text: "🎢 <strong>Alpine Slide at Magic Mountain</strong> — tobogã alpino!", type: "highlight" },
            { time: "14:30", text: "🥾 <strong>Castle Rock Trail</strong> (~1.5 km) — vista panorâmica do lago", type: "" },
            { time: "15:30", text: "🛍️ Passear pelo <strong>Big Bear Village</strong> — lojas, cafés", type: "" },
            { time: "16:00", text: "☕ Chocolate quente com vista pro lago!", type: "" },
            { time: "16:30", text: "🍽️ Jantar cedo — <strong>Big Bear Lake Brewing Company</strong> (40827 Lakeview Dr) — pizza artesanal e burgers com vista pro lago. Cerveja artesanal de montanha, ambiente descontraído. Janta antes de descer pra LA! ~$15-20/pessoa", type: "food" },
            { time: "17:30", text: "🚗 Volta pra LA (~2h)", type: "drive" }
        ],
        tips: ["⚡ Round trip ~320 km com subida forte. Carregar 100% antes ou parar em San Bernardino.", "❄️ Big Bear a 2.000m — pode ter neve! Levar casacos e botas. Chains podem ser obrigatórias na CA-330."]
    },
    {
        photo: 'img/activities/santa_monica_pier.jpg', shortLoc: 'LAX', location: "LA → Voo de volta ✈️",
        route: "Dia da volta! 🇧🇷",
        note: "Devolução do Tesla + voo MIA → GIG.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out", type: "" },
            { time: "09:00", text: "🛍️ Manhã livre — compras de última hora", type: "" },
            { time: "11:00", text: "🚗 Devolução do <strong>Tesla</strong> no LAX", type: "drive" },
            { time: "12:00", text: "🛫 Chegada no LAX — check-in", type: "" },
            { time: "13:00", text: "🛍️ Últimas compras duty free", type: "" },
            { time: "13:45", text: "✈️ Voo AA 608 → Miami (conexão)", type: "drive" },
            { time: "21:44", text: "🛬 Chegada em Miami", type: "" },
            { time: "22:55", text: "✈️ Voo AA 905 → Rio de Janeiro", type: "drive" }
        ],
        tips: ["Chegada no Rio: 23/02 (terça) às 09:25 🇧🇷 Bem-vindos de volta!"]
    }
];

// ==================== HOTELS ====================
const hotels = [
    { num: 1, name: "Marriott Marquis, Times Square, NY", checkin: "21/01", checkout: "25/01", nights: 4 },
    { num: 2, name: "Springdale, UT (Zion)", checkin: "25/01", checkout: "27/01", nights: 2 },
    { num: 3, name: "Bryce Canyon, UT", checkin: "27/01", checkout: "28/01", nights: 1 },
    { num: 4, name: "Moab, UT (Arches/Canyonlands)", checkin: "28/01", checkout: "31/01", nights: 3 },
    { num: 5, name: "Twin Falls, ID", checkin: "31/01", checkout: "01/02", nights: 1 },
    { num: 6, name: "Centralia, WA", checkin: "01/02", checkout: "02/02", nights: 1 },
    { num: 7, name: "Forks / Port Angeles, WA (Olympic)", checkin: "02/02", checkout: "04/02", nights: 2 },
    { num: 8, name: "Cannon Beach, OR", checkin: "04/02", checkout: "05/02", nights: 1 },
    { num: 9, name: "Gold Beach / Coos Bay, OR", checkin: "05/02", checkout: "06/02", nights: 1 },
    { num: 10, name: "Crescent City / Klamath, CA", checkin: "06/02", checkout: "07/02", nights: 1 },
    { num: 11, name: "Eureka / Arcata, CA", checkin: "07/02", checkout: "08/02", nights: 1 },
    { num: 12, name: "San Francisco, CA", checkin: "08/02", checkout: "11/02", nights: 3 },
    { num: 13, name: "Carmel, CA", checkin: "11/02", checkout: "12/02", nights: 1 },
    { num: 14, name: "Mariposa / El Portal, CA", checkin: "12/02", checkout: "15/02", nights: 3 },
    { num: 15, name: "Three Rivers, CA (Sequoia)", checkin: "15/02", checkout: "16/02", nights: 1 },
    { num: 16, name: "Las Vegas, NV", checkin: "16/02", checkout: "19/02", nights: 3 },
    { num: 17, name: "Los Angeles, CA", checkin: "19/02", checkout: "22/02", nights: 3 }
];

// ==================== NATIONAL PARKS ====================
const parks = [
    { name: "🏜️ Death Valley National Park", days: "Dia 27", highlights: "Badwater Basin (-86m!), Zabriskie Point, Artist's Palette, Devil's Golf Course, Mesquite Sand Dunes." },
    { name: "🏞️ Zion National Park", days: "Dias 5–7", highlights: "Watchman Trail, Emerald Pools, Canyon Overlook, Riverside Walk, Court of the Patriarchs." },
    { name: "🏔️ Bryce Canyon National Park", days: "Dias 7–8", highlights: "Navajo Loop, Queen's Garden, hoodoos, Bryce Amphitheater, stargazing!" },
    { name: "🏜️ Capitol Reef National Park", days: "Dia 8", highlights: "Petroglífos Fremont, Hickman Bridge Trail, Fruita Historic District, Scenic Drive." },
    { name: "🏜️ Canyonlands National Park", days: "Dia 9", highlights: "Mesa Arch sunrise, Grand View Point, Upheaval Dome, Aztec Butte." },
    { name: "🏜️ Arches National Park", days: "Dia 10", highlights: "Delicate Arch, Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace." },
    { name: "🌋 Mt. Rainier National Park", days: "Dia 13", highlights: "Paradise, neve, vulcão de 4.392m." },
    { name: "🌲 Olympic National Park", days: "Dias 13–14", highlights: "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push (Twilight!), Sol Duc Falls." },
    { name: "🌲 Redwood National Park", days: "Dias 17–18", highlights: "Stout Memorial Grove, Fern Canyon (Jurassic Park 2!), Tall Trees, Lady Bird Johnson, Avenue of Giants." },
    { name: "🏞️ Yosemite National Park", days: "Dias 24–25", highlights: "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Badger Pass, Mirror Lake." },
    { name: "🌲 Sequoia + Kings Canyon NP", days: "Dia 26", highlights: "General Sherman Tree (maior árvore!), Congress Trail, Moro Rock, General Grant Tree." }
];

// ==================== REORDERING SYSTEM ====================
// Para reordenar dias: basta mover o objeto dentro do array `days`.
// Tudo é recalculado automaticamente: número do dia, título com data,
// mapa de fotos (dayPhotos) e lista de superchargers.
//
// ⚠️ Se mudar dias de hotel/parque, atualize `hotels` e `parks` manualmente.

const TRIP_START = new Date(2027, 0, 21);
const WEEKDAYS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];

// Rebuilt at init — do NOT edit manually
var dayPhotos = {};
var superchargers = [];

function initDays() {
    if (typeof window !== 'undefined' && window.__daysInitialized) return;
    dayPhotos = {};
    superchargers = [];
    days.forEach(function(d, i) {
        // Auto-assign day number from array position
        d.day = i + 1;

        // Auto-compute title with weekday and date
        var dt = new Date(TRIP_START);
        dt.setDate(dt.getDate() + i);
        var dd = String(dt.getDate()).padStart(2, '0');
        var mm = String(dt.getMonth() + 1).padStart(2, '0');
        d.title = 'Dia ' + d.day + ' \u2014 ' + WEEKDAYS_PT[dt.getDay()] + ', ' + dd + '/' + mm + (d.titleSuffix || '');

        // Rebuild dayPhotos map
        if (d.photo) dayPhotos[d.day] = d.photo;

        // Rebuild superchargers from embedded chargeStops
        if (d.chargeStops) {
            d.chargeStops.forEach(function(cs) {
                superchargers.push({
                    day: d.day,
                    name: cs.name,
                    leg: cs.leg,
                    critical: cs.critical,
                    note: cs.note || undefined
                });
            });
        }
    });
    if (typeof window !== 'undefined') window.__daysInitialized = true;
}

// Run on load
initDays();
