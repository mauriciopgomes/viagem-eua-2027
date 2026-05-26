// ==================== TRIP DATA ====================
// Roteiro Alternativo — Viagem EUA 2027
// NYC → LAX → Yosemite → Sequoia → Vegas → GC → Zion → Bryce → Moab
// → Twin Falls → PNW → Costa Oregon → Redwood → SF → PCH → LA
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
            { time: "19:00", text: "🍔 Jantar em <strong>Hell's Kitchen</strong> (9th Ave) — Shake Shack, Empanada Mama", type: "food" },
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
            { time: "17:30", text: "🍽️ Jantar na região (Chelsea, Hudson Yards ou Midtown)", type: "food" },
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
            { time: "14:00", text: "🎮 Voltar na <strong>Nintendo NY</strong> ou explorar algo novo", type: "" },
            { time: "16:00", text: "Tempo livre — descansar no hotel ou última exploração", type: "" },
            { time: "18:00", text: "🧳 Volta ao hotel — arrumar malas", type: "" },
            { time: "19:00", text: "🍽️ Jantar", type: "food" },
            { time: "21:00", text: "🏨 Hotel — dormir cedo (voo amanhã!)", type: "" }
        ]
    },

    // ==================== YOSEMITE + SEQUOIA (Dias 5-8) ====================
    {
        photo: 'img/dia-05.jpg', shortLoc: 'Mariposa',
        chargeStops: [
            { name: 'Tejon/Lebec, CA', leg: 'LAX → Mariposa', critical: false },
            { name: 'Merced, CA', leg: 'LAX → Mariposa', critical: false }
        ],
        location: "New York → LAX → Mariposa",
        route: "NY → LA → Yosemite! ✈️🚗",
        note: "Check-out do Marriott, voo pro LAX, Tesla e direto pra Yosemite!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café no Marriott Marquis", type: "" },
            { time: "08:00", text: "🏨 Check-out", type: "" },
            { time: "08:30", text: "🚕 Times Square → JFK", type: "drive" },
            { time: "~09:30", text: "Chegada no JFK — check-in / despachar malas", type: "" },
            { time: "11:00", text: "✈️ Voo AA 3 → Los Angeles (~5.5h)", type: "drive" },
            { time: "14:20", text: "✈️ Chegada no LAX (horário local, -3h)", type: "drive" },
            { time: "~15:30", text: "🚗 Retirada do <strong>Tesla Model Y</strong>", type: "drive" },
            { time: "16:00", text: "🛣️ Saída rumo a <strong>Mariposa</strong> (~460 km, ~5h via I-5 N → CA-99 N → CA-140 E)", type: "drive" },
            { time: "18:00", text: "⚡ <strong>Supercharger Tejon/Lebec</strong> (~130 km) — ~25 min", type: "charge" },
            { time: "20:00", text: "⚡ <strong>Supercharger Merced</strong> (~270 km) — ~25 min", type: "charge" },
            { time: "~21:00", text: "🏨 Chegada em <strong>Mariposa</strong>! Check-in", type: "" },
            { time: "21:30", text: "🍽️ Jantar em Mariposa", type: "food" }
        ],
        tips: ["⚡ Dia longo mas o fuso horário ajuda (-3h). Chegam cansados — dormir cedo pra Yosemite amanhã!"]
    },
    {
        photo: 'img/dia-08.jpg', shortLoc: 'Yosemite', location: "Yosemite NP dia cheio",
        route: "Nascer do sol em Tunnel View! 🏞️",
        note: "Saída cedo de Mariposa — Cachoeiras, El Capitan e neve!",
        region: "ca",
        items: [
            { time: "06:00", text: "☕ Café rápido", type: "" },
            { time: "06:15", text: "🚗 Saída rumo a <strong>Yosemite</strong> (~55 km, ~45 min via CA-140)", type: "drive" },
            { time: "07:00", text: "🌅 Nascer do sol em <strong>Tunnel View</strong> — El Capitan, Half Dome, Bridalveil Fall!", type: "highlight" },
            { time: "08:30", text: "☕ Café da manhã", type: "food" },
            { time: "09:00", text: "🥾 <strong>Lower Yosemite Fall Trail</strong> (~30 min) — base da cachoeira", type: "" },
            { time: "10:00", text: "📸 <strong>El Capitan Meadow</strong> — paredão de 900m", type: "" },
            { time: "11:00", text: "🌉 <strong>Swinging Bridge</strong> — vista clássica de Yosemite Falls", type: "" },
            { time: "12:00", text: "🍽️ Almoço no Yosemite Village", type: "food" },
            { time: "13:00", text: "🥾 <strong>Bridalveil Fall Trail</strong> (curta, ~20 min)", type: "" },
            { time: "13:30", text: "📸 <strong>Sentinel Bridge</strong> — Half Dome refletido no rio Merced", type: "" },
            { time: "14:00", text: "⛄ <strong>Badger Pass</strong> — brincar na neve! Boneco de neve, guerra de bolas, sled", type: "highlight" },
            { time: "16:00", text: "📸 <strong>Cook's Meadow Loop</strong>", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no <strong>Valley View</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — Yosemite Village ou <strong>Majestic Yosemite Hotel</strong>", type: "food" },
            { time: "~20:00", text: "🚗 Volta pra Mariposa (~45 min)", type: "drive" }
        ],
        tips: ["❄️ Yosemite nevado em janeiro é LINDO! Menos turistas, silêncio, neve nos picos."]
    },
    {
        photo: 'img/dia-09.jpg', shortLoc: 'Yosemite',
        chargeStops: [
            { name: 'Oakhurst, CA', leg: 'Yosemite → Three Rivers', critical: false },
            { name: 'Visalia, CA', leg: 'Yosemite → Three Rivers', critical: true, note: '⚠️ CARREGAR ATÉ 100% — Sequoia sem carregadores!' }
        ],
        location: "Yosemite manhã → Three Rivers",
        route: "Despedida de Yosemite + Three Rivers! 🌲",
        note: "Manhã em Yosemite — últimas trilhas. Tarde: estrada pra Three Rivers.",
        region: "ca",
        items: [
            { time: "06:30", text: "☕ Café + check-out de Mariposa", type: "" },
            { time: "07:00", text: "🚗 Entrada em Yosemite", type: "drive" },
            { time: "07:30", text: "🌅 Nascer do sol em <strong>Cook's Meadow</strong>", type: "highlight" },
            { time: "08:30", text: "🥾 <strong>Vernal Fall Footbridge Trail</strong> (~3 km) — cachoeira congelada!", type: "" },
            { time: "10:00", text: "📸 <strong>Yosemite Chapel</strong> — linda na neve", type: "" },
            { time: "10:30", text: "🖼️ <strong>Ansel Adams Gallery</strong> — fotografias icônicas", type: "" },
            { time: "11:30", text: "🌲 <strong>Yosemite Village</strong> — Visitor Center, lojinhas", type: "" },
            { time: "12:30", text: "🍽️ Almoço no parque", type: "food" },
            { time: "13:30", text: "📸 Últimas fotos — <strong>Tunnel View</strong> de despedida", type: "" },
            { time: "14:00", text: "🚗 Saída rumo a <strong>Three Rivers</strong> (~200 km, ~3h via CA-41 S)", type: "drive" },
            { time: "15:00", text: "⚡ <strong>Supercharger Oakhurst</strong> (~60 km) — ~20 min", type: "charge" },
            { time: "16:30", text: "⚡🍽️ <strong>Supercharger Visalia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) — Sequoia não tem carregadores!", type: "charge" },
            { time: "~18:00", text: "🏨 Chegada em <strong>Three Rivers</strong>! Check-in", type: "" },
            { time: "18:30", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ]
    },
    {
        photo: 'img/dia-06.jpg', shortLoc: 'Sequoia', location: "Sequoia + Kings Canyon",
        route: "General Sherman + Moro Rock! 🌲",
        note: "Dia inteiro entre as maiores árvores do mundo!",
        region: "ca",
        items: [
            { time: "07:00", text: "☕ Café", type: "" },
            { time: "07:30", text: "🚗 Entrada no <strong>Sequoia NP</strong> via Ash Mountain (CA-198)", type: "drive" },
            { time: "08:30", text: "🚗 Subir Generals Highway até <strong>Grant Grove</strong> (Kings Canyon)", type: "drive" },
            { time: "09:00", text: "🌲 <strong>General Grant Tree Trail</strong> (~1 km loop) — a 'árvore de Natal da nação'!", type: "highlight" },
            { time: "10:00", text: "🚗 Voltar pela Generals Highway rumo sul", type: "drive" },
            { time: "10:30", text: "🌲 <strong>General Sherman Tree</strong> — a maior árvore do mundo em volume!", type: "highlight" },
            { time: "11:00", text: "🥾 <strong>Congress Trail</strong> (~3 km loop) — entre sequoias gigantes", type: "" },
            { time: "12:30", text: "🍽️ Almoço (levar lanche — poucas opções no parque)", type: "food" },
            { time: "13:30", text: "📸 <strong>Moro Rock</strong> — escadaria de 400 degraus com vista 360° (se aberto)", type: "highlight" },
            { time: "14:30", text: "📸 <strong>Tunnel Log</strong> — tronco caído que dá pra passar de carro!", type: "" },
            { time: "15:00", text: "🌲 <strong>Auto Log</strong> + fotos entre as sequoias", type: "" },
            { time: "16:00", text: "🌅 Pôr do sol no parque", type: "highlight" },
            { time: "17:30", text: "🚗 Descida pra Three Rivers", type: "drive" },
            { time: "18:00", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["❄️ Em janeiro pode ter neve nas áreas mais altas.", "⚠️ Kings Canyon Scenic Byway (CA-180 leste) fecha no inverno (nov–abr). Só General Grant Tree é acessível."]
    },

    // ==================== LAS VEGAS (Dias 9-12) ====================
    {
        photo: 'img/dia-33.jpg', shortLoc: 'Vegas',
        chargeStops: [
            { name: 'Bakersfield, CA', leg: 'Three Rivers → Vegas', critical: false },
            { name: 'Barstow, CA', leg: 'Three Rivers → Vegas', critical: false }
        ],
        location: "Three Rivers → Las Vegas",
        route: "Rumo a Vegas! 🎰",
        note: "Chegada no início da tarde pra curtir a Strip.",
        region: "nv",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Three Rivers", type: "" },
            { time: "08:30", text: "🚗 Saída rumo a <strong>Las Vegas</strong> (~430 km, ~4.5h via CA-99 S → CA-58 E → I-15 N)", type: "drive" },
            { time: "10:00", text: "⚡ <strong>Supercharger Bakersfield</strong> (~170 km) — ~25 min", type: "charge" },
            { time: "12:00", text: "⚡🍽️ <strong>Supercharger Barstow</strong> (~200 km) — ~25 min + almoço", type: "charge" },
            { time: "~14:00", text: "🎰 Chegada em <strong>Las Vegas</strong>! Check-in", type: "" },
            { time: "14:30", text: "🏨 Descanso / piscina do hotel", type: "" },
            { time: "16:00", text: "📸 <strong>Welcome to Las Vegas Sign</strong> — foto icônica!", type: "" },
            { time: "16:30", text: "🚶 Passeio pelos <strong>hotéis temáticos</strong> — Venetian, Bellagio (jardim + fontes), Caesars Palace", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" },
            { time: "21:00", text: "🌃 Passeio noturno pela <strong>Strip</strong> — Bellagio Fountains, cassinos, neon!", type: "highlight" }
        ]
    },
    {
        photo: 'img/dia-29.jpg', shortLoc: 'Vegas', location: "Mt. Charleston + Vegas",
        route: "Neve a 45 min de Vegas! 🏔️",
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
            { time: "14:30", text: "🏨 Hotéis temáticos — Venetian, Bellagio, Caesars Palace", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" },
            { time: "21:00", text: "🌃 <strong>Strip à noite</strong> — Bellagio Fountains, cassinos, neon!", type: "highlight" }
        ],
        tips: ["🏔️ Mt. Charleston: pode estar -5°C com neve! Levar casaco, luvas e botas."]
    },
    {
        photo: 'img/dia-31.jpg', shortLoc: 'Vegas', location: "Valley of Fire + Strip",
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
        photo: 'img/dia-32.jpg', shortLoc: 'Vegas', location: "Day trip Death Valley 🏜️",
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
        tips: ["⚡ EV: Round trip ~380 km. Carregar a 100% na noite anterior!"]
    },

    // ==================== UTAH (Dias 13-18) ====================
    {
        photo: 'img/dia-27.jpg', shortLoc: 'GC→Zion',
        chargeStops: [
            { name: 'Kingman, AZ', leg: 'Vegas → GC → Zion', critical: false },
            { name: 'Kanab, UT', leg: 'Vegas → GC → Zion', critical: false }
        ],
        location: "Vegas → Grand Canyon → Zion",
        route: "GC de tarde + Zion à noite! 🏜️",
        note: "Dia longo (~700 km) mas épico — GC à tarde é suficiente!",
        region: "ut",
        items: [
            { time: "06:30", text: "☕ Café + check-out de Vegas", type: "" },
            { time: "07:00", text: "🚗 Saída rumo ao <strong>Grand Canyon South Rim</strong> (~430 km, ~4.5h)", type: "drive" },
            { time: "09:00", text: "⚡ <strong>Supercharger Kingman, AZ</strong> (~260 km) — ~25 min", type: "charge" },
            { time: "~11:30", text: "🏜️ Chegada no <strong>Grand Canyon</strong>!", type: "highlight" },
            { time: "11:45", text: "📸 <strong>Mather Point</strong> — vista absurda!", type: "highlight" },
            { time: "12:15", text: "🍽️ Almoço no parque", type: "food" },
            { time: "13:00", text: "🥾 <strong>Rim Trail</strong> (Mather → Yavapai Point, ~1.5 km)", type: "" },
            { time: "13:45", text: "🏛️ <strong>Yavapai Geology Museum</strong>", type: "" },
            { time: "14:30", text: "📸 <strong>Bright Angel Trailhead</strong>", type: "" },
            { time: "15:00", text: "📸 <strong>Hopi Point</strong>", type: "" },
            { time: "15:30", text: "🚗 Saída rumo a <strong>Zion</strong> (~270 km, ~3.5h via Kanab)", type: "drive" },
            { time: "17:00", text: "⚡ <strong>Kanab, UT</strong> — ~25 min", type: "charge" },
            { time: "~19:00", text: "🏨 Chegada em <strong>Springdale</strong>!", type: "" },
            { time: "19:30", text: "🍽️ Jantar em Springdale", type: "food" }
        ]
    },
    {
        photo: 'img/dia-26.jpg', shortLoc: 'Zion', location: "Zion NP dia cheio",
        route: "Trilhas, mirantes e pôr do sol! 🏞️",
        note: "Dia cheio em Zion! No inverno pode dirigir no canyon (sem shuttle).",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café em Springdale", type: "" },
            { time: "08:00", text: "🚗 Dirigir pra <strong>Zion Canyon</strong> (sem shuttle no inverno — pode entrar de carro!)", type: "drive" },
            { time: "08:30", text: "🥾 <strong>Watchman Trail</strong> (~5 km, ~2h) — vista panorâmica!", type: "highlight" },
            { time: "10:30", text: "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km)", type: "" },
            { time: "12:30", text: "🍽️ Almoço em Springdale ou Zion Lodge", type: "food" },
            { time: "13:30", text: "📸 <strong>Court of the Patriarchs</strong>", type: "" },
            { time: "14:00", text: "🛍️ Explorar <strong>Springdale</strong>", type: "" },
            { time: "15:00", text: "📸 <strong>Big Bend</strong>", type: "" },
            { time: "15:30", text: "🌄 <strong>Canyon Overlook Trail</strong> (~1.6 km, ~1h)", type: "highlight" },
            { time: "16:30", text: "🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Springdale", type: "food" }
        ]
    },
    {
        photo: 'img/dia-24.jpg', shortLoc: 'Bryce', location: "Zion AM → Bryce PM",
        route: "Última manhã em Zion + Bryce à tarde! 🏔️",
        note: "Navajo Loop + pôr do sol + stargazing em Bryce!",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café", type: "" },
            { time: "08:00", text: "🚗 Dirigir pra <strong>Zion Canyon</strong>", type: "drive" },
            { time: "08:30", text: "🥾 <strong>Riverside Walk</strong>", type: "" },
            { time: "09:30", text: "📸 Últimas fotos em Zion", type: "" },
            { time: "10:30", text: "🚗 Check-out + saída pra <strong>Bryce</strong> (~130 km, ~1.5h)", type: "drive" },
            { time: "11:00", text: "🛣️ <strong>Red Canyon</strong> — arcos vermelhos na estrada!", type: "" },
            { time: "12:00", text: "🏨 Check-in Bryce Canyon", type: "" },
            { time: "12:30", text: "🍽️ Almoço", type: "food" },
            { time: "13:30", text: "📸 <strong>Sunrise/Sunset Point</strong>", type: "highlight" },
            { time: "14:00", text: "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h)", type: "highlight" },
            { time: "16:00", text: "🚗 <strong>Scenic Drive</strong> — Inspiration Point, Natural Bridge, Rainbow Point", type: "" },
            { time: "17:30", text: "🌅 <strong>Pôr do sol no Bryce Amphitheater</strong>", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar", type: "food" },
            { time: "20:30", text: "🌌 <strong>Stargazing em Bryce!</strong> — International Dark Sky Park!", type: "highlight" }
        ],
        tips: ["🔭 Bryce é um dos melhores céus escuros do MUNDO! Levem cobertores — faz MUITO frio!"]
    },
    {
        photo: 'img/dia-25.jpg', shortLoc: 'Moab',
        chargeStops: [
            { name: 'Salina, UT', leg: 'Bryce → Moab', critical: false },
            { name: 'Green River, UT', leg: 'Bryce → Moab', critical: false }
        ],
        location: "Bryce → Moab",
        route: "Nascer do sol em Bryce + Corona Arch! 🏜️",
        note: "Sunrise épico, depois estrada até Moab.",
        region: "ut",
        items: [
            { time: "06:30", text: "🌅 <strong>Nascer do sol em Bryce Point</strong>!", type: "highlight" },
            { time: "07:30", text: "☕ Café + check-out", type: "" },
            { time: "08:00", text: "🚗 Saída rumo a <strong>Moab</strong> (~430 km, ~5h)", type: "drive" },
            { time: "09:30", text: "⚡ <strong>Supercharger Salina, UT</strong> (~170 km) — ~25 min", type: "charge" },
            { time: "11:30", text: "⚡ <strong>Supercharger Green River, UT</strong> (~170 km) — ~20 min", type: "charge" },
            { time: "~13:00", text: "🏨 Chegada em <strong>Moab</strong>!", type: "" },
            { time: "13:30", text: "🍽️ Almoço em Moab", type: "food" },
            { time: "14:30", text: "🥾 <strong>Corona Arch Trail</strong> (~5 km, ~2h) — arco gigante sem multidões!", type: "highlight" },
            { time: "16:30", text: "🚗 <strong>Scenic Byway 128</strong> — rio Colorado", type: "" },
            { time: "17:30", text: "🌅 Pôr do sol em Moab", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        photo: 'img/dia-22.jpg', shortLoc: 'Moab', location: "Canyonlands NP dia cheio 🏜️",
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
            { time: "19:00", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        photo: 'img/dia-21.jpg', shortLoc: 'Moab', location: "Arches NP + Dead Horse Point",
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
            { time: "18:30", text: "🍽️ Jantar de despedida de Moab", type: "food" }
        ]
    },

    // ==================== TRANSIÇÃO → PNW (Dias 19-20) ====================
    {
        photo: 'img/activities/shoshone_falls.jpg', shortLoc: 'Twin Falls',
        chargeStops: [
            { name: 'Green River, UT', leg: 'Moab → Twin Falls', critical: false },
            { name: 'Price, UT', leg: 'Moab → Twin Falls', critical: false },
            { name: 'Twin Falls, ID', leg: 'Moab → Twin Falls', critical: false }
        ],
        location: "Moab → Antelope Island → Twin Falls",
        route: "Bisões + Shoshone Falls! 🦬",
        note: "Dia longo — bisões na Antelope Island + Shoshone Falls!",
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
            { time: "17:15", text: "🌊 <strong>Shoshone Falls</strong> — 'Niágara do Oeste'! 65m de queda!", type: "highlight" },
            { time: "18:00", text: "🏨 Check-in", type: "" },
            { time: "18:30", text: "🍽️ Jantar", type: "food" }
        ],
        tips: ["⚠️ Dois dias longos seguidos (19 + 20): ~770km + ~700km. Dormir cedo!"]
    },
    {
        photo: 'img/activities/columbia_river_gorge.jpg', shortLoc: 'Centralia',
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
            { time: "09:30", text: "⚡ <strong>Supercharger Baker City, OR</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "11:30", text: "⚡🍽️ <strong>Supercharger Pendleton, OR</strong> (~200 km) — ~20 min + almoço", type: "charge" },
            { time: "13:30", text: "⚡ <strong>Supercharger The Dalles, OR</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "14:00", text: "🏞️ <strong>Columbia River Gorge</strong>", type: "" },
            { time: "14:30", text: "🌲 <strong>Multnomah Falls</strong> — cachoeira icônica de 189m!", type: "highlight" },
            { time: "15:00", text: "🚗 I-84 W → I-5 N → Centralia (~240 km, ~2.5h)", type: "drive" },
            { time: "~17:30", text: "🏨 Chegada em <strong>Centralia</strong>!", type: "" },
            { time: "18:00", text: "⚡ <strong>Supercharger Centralia</strong>", type: "charge" },
            { time: "18:30", text: "🍽️ Jantar", type: "food" }
        ]
    },

    // ==================== PNW (Dias 21-24) ====================
    {
        photo: 'img/dia-19.jpg', shortLoc: 'Rainier',
        chargeStops: [{ name: 'Olympia, WA', leg: 'Centralia → Rainier → Forks', critical: true, note: '⚠️ CARREGAR ATÉ 100% — Olympic 265 km sem SC!' }],
        location: "Centralia → Mt. Rainier → Forks",
        route: "Vulcão Rainier + Olympic NP! 🌋",
        note: "Rainier de manhã, Lake Crescent e Sol Duc Falls à tarde!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out", type: "" },
            { time: "07:30", text: "🚗 Rumo a <strong>Mt. Rainier NP</strong> (~130 km, ~1.5h via SR-7 → SR-706)", type: "drive" },
            { time: "09:00", text: "🌋 <strong>Mt. Rainier — Paradise!</strong> Vulcão de 4.392m coberto de neve!", type: "highlight" },
            { time: "09:15", text: "⛄ <strong>Brincar na neve!</strong> Boneco de neve, guerra de bolas, sled (~45 min)", type: "highlight" },
            { time: "10:00", text: "📸 Fotos do vulcão — se o céu estiver limpo, vista espetacular!", type: "" },
            { time: "10:30", text: "🚶 Caminhar pela área de Paradise na neve", type: "" },
            { time: "11:00", text: "🚗 Descida → Olympia (~100 km, ~1.5h)", type: "drive" },
            { time: "12:30", text: "⚡ <strong>Supercharger Olympia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~35 min)", type: "charge" },
            { time: "13:00", text: "🍽️ Almoço em Olympia", type: "food" },
            { time: "13:30", text: "🚗 Rumo a <strong>Forks</strong> (~265 km, ~3.5h via US-101)", type: "drive" },
            { time: "15:30", text: "🏞️ <strong>Lake Crescent</strong> — lago cristalino", type: "" },
            { time: "16:30", text: "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km)", type: "" },
            { time: "17:30", text: "🏨 Check-in em <strong>Forks</strong>", type: "" },
            { time: "18:00", text: "🧛 Tour Crepúsculo! Forks High School + Casa da Bella Swan", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Forks", type: "food" }
        ],
        tips: ["⚠️ Visitor Center fecha no meio da semana no inverno (abre só sex-dom).", "🔄 Se Rainier FECHADO: direto Centralia → Forks (~370 km). Chegada ~12:00!"]
    },
    {
        photo: 'img/dia-17.jpg', shortLoc: 'Olympic', location: "Olympic NP dia cheio 🌲",
        route: "Florestas místicas + praias selvagens!",
        note: "Hoh Rain Forest + Ruby Beach + Twilight!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café", type: "" },
            { time: "07:30", text: "🌲 <strong>Hoh Rain Forest</strong> — floresta tropical temperada!", type: "highlight" },
            { time: "08:00", text: "🥾 <strong>Hall of Mosses Trail</strong> (~1.3 km) — musgos pendurados!", type: "highlight" },
            { time: "09:00", text: "🥾 <strong>Spruce Nature Trail</strong> (~2 km)", type: "" },
            { time: "10:15", text: "🌊 <strong>Ruby Beach</strong> — sea stacks!", type: "highlight" },
            { time: "10:45", text: "🧪 Tidepools — estrelas-do-mar!", type: "" },
            { time: "12:00", text: "🍽️ Almoço em Forks", type: "food" },
            { time: "13:00", text: "🌊 <strong>La Push / First Beach</strong> — praia dos Quileute (Twilight!)", type: "" },
            { time: "14:30", text: "🌊 <strong>Rialto Beach</strong> — sea stacks e troncos", type: "" },
            { time: "16:00", text: "🥾 <strong>Marymere Falls Trail</strong> (~2.5 km)", type: "" },
            { time: "17:30", text: "🌅 Pôr do sol no Pacífico!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar", type: "food" }
        ]
    },
    {
        photo: 'img/dia-16.jpg', shortLoc: 'Cannon',
        chargeStops: [{ name: 'Aberdeen, WA', leg: 'Forks → Cannon Beach', critical: false }],
        location: "Forks → Cannon Beach",
        route: "Astoria + Haystack Rock ao pôr do sol! 🌅",
        note: "Cidade do Goonies + pôr do sol mais bonito da viagem!",
        region: "pnw",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Forks", type: "" },
            { time: "08:30", text: "🚗 Saída rumo ao sul via US-101 S (~380 km)", type: "drive" },
            { time: "11:00", text: "⚡ <strong>Supercharger Aberdeen, WA</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "11:30", text: "🍽️ Almoço em Aberdeen", type: "food" },
            { time: "14:00", text: "🌊 <strong>Astoria</strong> — cenário de <strong>The Goonies</strong>! Astoria Column!", type: "highlight" },
            { time: "15:30", text: "🏨 Check-in em <strong>Cannon Beach</strong>", type: "" },
            { time: "16:00", text: "📸 <strong>Haystack Rock</strong> — ícone de Oregon!", type: "highlight" },
            { time: "16:45", text: "🌊 <strong>Ecola State Park</strong> — mirante espetacular!", type: "" },
            { time: "17:30", text: "🌅 <strong>Pôr do sol em Cannon Beach</strong> — ESPETACULAR!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Cannon Beach", type: "food" }
        ]
    },
    {
        photo: 'img/dia-15.jpg', shortLoc: 'Oregon',
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
            { time: "11:15", text: "🍽️ Almoço em <strong>Newport</strong>", type: "food" },
            { time: "12:15", text: "📸 <strong>Cape Perpetua + Thor's Well</strong>", type: "highlight" },
            { time: "12:45", text: "🏖️ <strong>Heceta Head Lighthouse</strong>", type: "" },
            { time: "14:30", text: "📸 <strong>Shore Acres State Park</strong>", type: "" },
            { time: "15:15", text: "⚡ <strong>Supercharger Coos Bay</strong> — ~25 min", type: "charge" },
            { time: "16:45", text: "📸 <strong>Samuel Boardman Scenic Corridor</strong>!", type: "highlight" },
            { time: "17:15", text: "📸 <strong>Natural Bridges Viewpoint</strong>", type: "highlight" },
            { time: "17:30", text: "🌅 Pôr do sol na costa de Oregon", type: "highlight" },
            { time: "18:00", text: "🏨 Check-in em <strong>Gold Beach</strong>", type: "" },
            { time: "18:30", text: "🍽️ Jantar — frutos do mar!", type: "food" }
        ]
    },

    // ==================== REDWOOD (Dias 25-26) ====================
    {
        photo: 'img/activities/stout_memorial_grove.jpg', shortLoc: 'Redwood', titleSuffix: ' ❤️',
        location: "Redwood NP norte — Valentine's Day! ❤️",
        route: "Jedediah Smith + Crescent City! 🌲",
        note: "Valentine's Day entre as redwoods! Dia tranquilo perto de Crescent City.",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Gold Beach", type: "" },
            { time: "08:30", text: "🚗 US-101 sul (~70 km, ~1h)", type: "drive" },
            { time: "09:30", text: "🌲 <strong>Jedediah Smith Redwoods SP</strong> — <strong>Stout Memorial Grove Trail</strong> (~1 km loop entre gigantes!)", type: "highlight" },
            { time: "10:30", text: "🚗 <strong>Howland Hill Road</strong> — estrada de terra entre redwoods enormes", type: "" },
            { time: "11:15", text: "🥾 <strong>Boy Scout Tree Trail</strong> (~4 km) — trilha tranquila entre old-growth", type: "" },
            { time: "13:00", text: "🏨 Check-in <strong>Crescent City</strong>", type: "" },
            { time: "13:30", text: "🍽️ Almoço", type: "food" },
            { time: "14:30", text: "🏝️ <strong>Battery Point Lighthouse</strong> — ilha acessível na maré baixa!", type: "" },
            { time: "15:30", text: "🌲 <strong>Del Norte Coast Redwoods SP</strong> — <strong>Damnation Creek Trail</strong> (~7 km, ~2.5h)", type: "highlight" },
            { time: "18:00", text: "🌅 Pôr do sol no porto de Crescent City", type: "" },
            { time: "19:00", text: "🍽️ Jantar especial de Valentine's Day ❤️", type: "food" }
        ],
        tips: ["🌊 Battery Point: verificar tábua de marés! Só acessível na maré baixa."]
    },
    {
        photo: 'img/activities/fern_canyon.jpg', shortLoc: 'Redwood',
        chargeStops: [{ name: 'Eureka, CA', leg: 'Crescent City → Eureka', critical: false }],
        location: "Redwood NP sul → Eureka",
        route: "Fern Canyon + Tall Trees + Avenue of Giants! 🌲",
        note: "Tudo descendo ao sul — sem backtrack! Fern Canyon, Tall Trees e Avenue of Giants.",
        region: "ca",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Crescent City", type: "" },
            { time: "07:30", text: "🚗 US-101 sul (~35 km) → <strong>Prairie Creek Redwoods SP</strong>", type: "drive" },
            { time: "08:00", text: "🚗 <strong>Newton B. Drury Scenic Parkway</strong>", type: "" },
            { time: "08:30", text: "📸 <strong>Big Tree Wayside</strong>", type: "" },
            { time: "09:00", text: "🥾 <strong>Fern Canyon</strong> (~1.5 km) — samambaias! <strong>Jurassic Park 2</strong>!", type: "highlight" },
            { time: "10:30", text: "🌊 <strong>Gold Bluffs Beach</strong>", type: "" },
            { time: "11:00", text: "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km)", type: "" },
            { time: "12:00", text: "🌲 <strong>Tall Trees Grove</strong> — árvores mais altas do MUNDO! (~5 km, ~2h)", type: "highlight" },
            { time: "14:00", text: "🍽️ Almoço em <strong>Orick</strong>", type: "food" },
            { time: "14:30", text: "🚗 US-101 sul (~60 km)", type: "drive" },
            { time: "15:30", text: "🌲 <strong>Avenue of the Giants</strong> — 50 km entre redwoods!", type: "highlight" },
            { time: "17:00", text: "🏨 Chegada em <strong>Eureka</strong>! Check-in", type: "" },
            { time: "17:30", text: "🏙️ <strong>Old Town Eureka</strong> — <strong>Carson Mansion</strong>", type: "" },
            { time: "18:00", text: "⚡ <strong>Supercharger Eureka</strong>", type: "charge" },
            { time: "19:00", text: "🍽️ Jantar", type: "food" }
        ],
        tips: ["⚠️ Tall Trees Grove: permit gratuito no Thomas Clarke Info Center (Orick).", "⚠️ Fern Canyon: Davison Road pode fechar no inverno. Verificar em nps.gov/redw."]
    },

    // ==================== SAN FRANCISCO (Dias 27-29) ====================
    {
        photo: 'img/dia-11.jpg', shortLoc: 'SF',
        chargeStops: [{ name: 'Ukiah, CA', leg: 'Eureka → SF', critical: false }],
        location: "Eureka → San Francisco",
        route: "Point Reyes + baleias + SF! 🐋",
        note: "Alces selvagens, baleias cinzentas e Golden Gate!",
        region: "ca",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Eureka", type: "" },
            { time: "08:30", text: "🚗 US-101 S (~440 km, ~5.5h)", type: "drive" },
            { time: "10:30", text: "⚡🍽️ <strong>Supercharger Ukiah</strong> (~250 km) — ~25 min + almoço", type: "charge" },
            { time: "12:30", text: "🐋 <strong>Point Reyes</strong> — Elk Preserve, Lighthouse + <strong>baleias cinzentas!</strong> (migração jan-abr!)", type: "highlight" },
            { time: "~15:00", text: "🏨 Chegada em <strong>SF</strong>! Check-in", type: "" },
            { time: "15:30", text: "🌆 <strong>Embarcadero</strong> — Ferry Building", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no <strong>Crissy Field</strong> — vista da Golden Gate!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em <strong>Fisherman's Wharf</strong> — clam chowder!", type: "food" }
        ]
    },
    {
        photo: 'img/dia-12.jpg', shortLoc: 'SF', location: "San Francisco dia cheio 1",
        route: "Pier 39 + Golden Gate + Nintendo! 🌉",
        note: "Cable Car, Chinatown, Golden Gate Bridge, Nintendo SF!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🏖️ <strong>Pier 39</strong> — leões-marinhos!", type: "highlight" },
            { time: "11:00", text: "🚋 Passeio de <strong>Cable Car</strong>", type: "highlight" },
            { time: "11:30", text: "🌆 <strong>Lombard Street</strong>", type: "" },
            { time: "12:00", text: "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA!", type: "highlight" },
            { time: "13:00", text: "🍽️ Almoço — <strong>La Taqueria</strong> (Mission)", type: "food" },
            { time: "14:30", text: "🌉 <strong>Golden Gate Bridge</strong> — caminhar pela ponte!", type: "highlight" },
            { time: "16:00", text: "🏰 <strong>Fort Point</strong> — cenário de Vertigo!", type: "" },
            { time: "17:00", text: "🎮 <strong>Nintendo San Francisco</strong> (Union Square)", type: "highlight" },
            { time: "18:00", text: "🛍️ <strong>Union Square</strong> — compras", type: "" },
            { time: "19:00", text: "🍽️ Jantar especial", type: "food" }
        ]
    },
    {
        photo: 'img/activities/golden_gate_park.jpg', shortLoc: 'SF', location: "San Francisco dia cheio 2",
        route: "Alcatraz + Golden Gate Park + Mission! 🏝️",
        note: "Alcatraz de manhã, Golden Gate Park e Haight-Ashbury à tarde!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "09:30", text: "🏝️ <strong>Alcatraz</strong> — ferry Pier 33 (~2h na ilha)", type: "highlight" },
            { time: "~11:30", text: "🚢 Ferry de volta", type: "" },
            { time: "12:00", text: "🍽️ Almoço", type: "food" },
            { time: "13:00", text: "🌳 <strong>Golden Gate Park</strong> — Japanese Tea Garden, Conservatory of Flowers", type: "" },
            { time: "15:00", text: "🎨 <strong>Mission District</strong> — murais, <strong>Painted Ladies</strong> (Alamo Square)", type: "" },
            { time: "16:00", text: "🏖️ <strong>Ocean Beach</strong> — praia do Pacífico", type: "" },
            { time: "17:00", text: "🛍️ <strong>Haight-Ashbury</strong> — berço da contracultura, lojas vintage", type: "" },
            { time: "18:00", text: "🍽️ Jantar — <strong>Fog Harbor Fish House</strong> (Pier 39)", type: "food" }
        ],
        tips: ["⚠️ Alcatraz esgota meses antes! Comprar em alcatrazcruises.com (~$45/pessoa)."]
    },

    // ==================== PCH + LA (Dias 30-33) ====================
    {
        photo: 'img/activities/big_sur_coast.jpg', shortLoc: 'PCH',
        chargeStops: [{ name: 'San Luis Obispo, CA', leg: 'SF → PCH → Santa Barbara', critical: false }],
        location: "SF → PCH → Santa Barbara",
        route: "Pacific Coast Highway! 🌊",
        note: "Big Sur, Bixby Bridge, Hearst Castle — o trecho mais bonito da CA!",
        region: "ca",
        items: [
            { time: "07:00", text: "☕ Café + check-out de SF", type: "" },
            { time: "07:30", text: "🚗 Highway 1 sul", type: "drive" },
            { time: "09:00", text: "🏖️ <strong>Half Moon Bay</strong> — parada rápida", type: "" },
            { time: "09:45", text: "🏄 <strong>Santa Cruz</strong> — boardwalk", type: "" },
            { time: "11:00", text: "🚗 <strong>Monterey</strong> — Cannery Row", type: "" },
            { time: "12:00", text: "🍽️ Almoço em <strong>Carmel-by-the-Sea</strong>", type: "food" },
            { time: "13:00", text: "🛣️ <strong>17-Mile Drive</strong> ($11.25) — Lone Cypress", type: "" },
            { time: "14:00", text: "📸 <strong>Bixby Creek Bridge</strong> — a ponte mais fotografada da CA!", type: "highlight" },
            { time: "14:30", text: "🏞️ <strong>Big Sur</strong> — McWay Falls, Pfeiffer Beach!", type: "highlight" },
            { time: "16:00", text: "🚗 Highway 1 sul → <strong>San Simeon</strong>", type: "drive" },
            { time: "16:30", text: "🦭 <strong>Elephant Seal Vista Point</strong> — centenas de elefantes-marinhos! Grátis!", type: "highlight" },
            { time: "17:00", text: "🏰 <strong>Hearst Castle</strong> (vista externa)", type: "" },
            { time: "17:30", text: "🚗 Highway 1 → SLO → US-101 S", type: "drive" },
            { time: "18:00", text: "⚡ <strong>Supercharger San Luis Obispo</strong> — ~25 min", type: "charge" },
            { time: "19:00", text: "🏨 Chegada em <strong>Santa Barbara</strong>! Check-in", type: "" },
            { time: "19:30", text: "🍽️ Jantar na <strong>Stearns Wharf</strong>", type: "food" }
        ],
        tips: ["⚠️ Verificar se Highway 1 está aberta — trechos de Big Sur podem fechar no inverno."]
    },
    {
        photo: 'img/activities/malibu_pch.jpg', shortLoc: 'LA',
        location: "Santa Barbara → PCH Malibu → LA",
        route: "PCH dia 2 + entrada em LA! 🌊",
        note: "Manhã em Santa Barbara + Malibu + Venice Beach!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café com calma", type: "" },
            { time: "09:30", text: "🏖️ <strong>Santa Barbara</strong> — passeio pela <strong>State Street</strong>", type: "" },
            { time: "10:00", text: "📸 <strong>Santa Barbara County Courthouse</strong> — torre com vista 360°, grátis!", type: "" },
            { time: "10:30", text: "🏖️ <strong>East Beach</strong> ou <strong>Butterfly Beach</strong>", type: "" },
            { time: "11:30", text: "🍽️ Almoço — <strong>The Lark</strong> ou tacos no <strong>Lilly's Taqueria</strong>", type: "food" },
            { time: "12:30", text: "🚗 Check-out + US-101 S → <strong>Oxnard</strong> → <strong>PCH / Highway 1</strong>", type: "drive" },
            { time: "13:30", text: "🌊 <strong>Point Mugu</strong> — penhascos no mar!", type: "" },
            { time: "14:00", text: "🏖️ <strong>PCH por Malibu</strong> — praias icônicas", type: "" },
            { time: "14:30", text: "🏝️ <strong>El Matador Beach</strong> — grutas e arcos de rocha!", type: "highlight" },
            { time: "15:30", text: "🏖️ <strong>Santa Monica Pier</strong> — roda-gigante, praia", type: "" },
            { time: "16:30", text: "🏖️ <strong>Venice Beach</strong> — Muscle Beach, murais, Abbot Kinney", type: "" },
            { time: "17:30", text: "🏨 Check-in em <strong>LA</strong>", type: "" },
            { time: "18:00", text: "🍽️ Jantar", type: "food" }
        ]
    },
    {
        photo: 'img/dia-34.jpg', shortLoc: 'LA', location: "LA dia cheio",
        route: "Hollywood + Griffith Observatory! 🎬",
        note: "Último dia completo nos EUA!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "📸 <strong>Hollywood Sign</strong> — vista do Griffith Park", type: "" },
            { time: "11:00", text: "📸 <strong>Hollywood Walk of Fame</strong> + <strong>TCL Chinese Theatre</strong>", type: "" },
            { time: "12:00", text: "🍽️ Almoço", type: "food" },
            { time: "13:00", text: "🛍️ <strong>The Grove + Farmers Market</strong>", type: "" },
            { time: "15:00", text: "🛍️ Compras — <strong>Citadel Outlets</strong> ou <strong>The Americana at Brand</strong>", type: "" },
            { time: "17:00", text: "🏖️ Praia — último mergulho!", type: "" },
            { time: "18:00", text: "🌅 Último pôr do sol nos EUA!", type: "highlight" },
            { time: "19:00", text: "🍽️ Último jantar nos EUA!", type: "food" },
            { time: "20:30", text: "🔭 <strong>Griffith Observatory</strong> — gratuito + telescópios! Vista de LA iluminada. Despedida perfeita!", type: "highlight" },
            { time: "22:00", text: "🧳 Hotel — arrumar malas, dormir cedo (voo amanhã!)", type: "" }
        ]
    },
    {
        photo: 'img/dia-30.jpg', shortLoc: 'LAX', location: "LA → Voo de volta ✈️",
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

// ==================== HOTELS ====================
const hotels = [
    { num: 1, name: "Marriott Marquis, Times Square, NY", checkin: "21/01", checkout: "25/01", nights: 4 },
    { num: 2, name: "Mariposa / El Portal, CA", checkin: "25/01", checkout: "27/01", nights: 2 },
    { num: 3, name: "Three Rivers, CA (Sequoia)", checkin: "27/01", checkout: "29/01", nights: 2 },
    { num: 4, name: "Las Vegas, NV", checkin: "29/01", checkout: "02/02", nights: 4 },
    { num: 5, name: "Springdale, UT (Zion)", checkin: "02/02", checkout: "04/02", nights: 2 },
    { num: 6, name: "Bryce Canyon, UT", checkin: "04/02", checkout: "05/02", nights: 1 },
    { num: 7, name: "Moab, UT (Arches/Canyonlands)", checkin: "05/02", checkout: "08/02", nights: 3 },
    { num: 8, name: "Twin Falls, ID", checkin: "08/02", checkout: "09/02", nights: 1 },
    { num: 9, name: "Centralia, WA", checkin: "09/02", checkout: "10/02", nights: 1 },
    { num: 10, name: "Forks / Port Angeles, WA (Olympic)", checkin: "10/02", checkout: "12/02", nights: 2 },
    { num: 11, name: "Cannon Beach, OR", checkin: "12/02", checkout: "13/02", nights: 1 },
    { num: 12, name: "Gold Beach / Coos Bay, OR", checkin: "13/02", checkout: "14/02", nights: 1 },
    { num: 13, name: "Crescent City / Klamath, CA", checkin: "14/02", checkout: "15/02", nights: 1 },
    { num: 14, name: "Eureka / Arcata, CA", checkin: "15/02", checkout: "16/02", nights: 1 },
    { num: 15, name: "San Francisco, CA", checkin: "16/02", checkout: "19/02", nights: 3 },
    { num: 16, name: "Santa Barbara, CA", checkin: "19/02", checkout: "20/02", nights: 1 },
    { num: 17, name: "Los Angeles, CA", checkin: "20/02", checkout: "22/02", nights: 2 }
];

// ==================== NATIONAL PARKS ====================
const parks = [
    { name: "🏞️ Yosemite National Park", days: "Dias 6–7", highlights: "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Vernal Fall, Badger Pass." },
    { name: "🌲 Sequoia + Kings Canyon NP", days: "Dia 8", highlights: "General Sherman Tree (maior árvore!), Congress Trail, Moro Rock, General Grant Tree." },
    { name: "🏜️ Death Valley National Park", days: "Dia 12", highlights: "Badwater Basin (-86m!), Zabriskie Point, Artist's Palette, Mesquite Sand Dunes." },
    { name: "🏞️ Grand Canyon National Park", days: "Dia 13", highlights: "Mather Point, Rim Trail, Yavapai Geology Museum, Bright Angel, Hopi Point." },
    { name: "🏞️ Zion National Park", days: "Dias 14–15", highlights: "Watchman Trail, Emerald Pools, Canyon Overlook Trail, Riverside Walk." },
    { name: "🏔️ Bryce Canyon National Park", days: "Dias 15–16", highlights: "Navajo Loop, Queen's Garden, hoodoos, Bryce Amphitheater, stargazing!" },
    { name: "🏜️ Canyonlands National Park", days: "Dia 17", highlights: "Mesa Arch sunrise, Grand View Point, Upheaval Dome, Aztec Butte." },
    { name: "🏜️ Arches National Park", days: "Dia 18", highlights: "Delicate Arch, Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace." },
    { name: "🌋 Mt. Rainier National Park", days: "Dia 21", highlights: "Paradise, neve, vulcão de 4.392m." },
    { name: "🌲 Olympic National Park", days: "Dias 21–22", highlights: "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push (Twilight!), Sol Duc Falls." },
    { name: "🌲 Redwood National Park", days: "Dias 25–26", highlights: "Stout Memorial Grove, Fern Canyon (Jurassic Park 2!), Tall Trees, Lady Bird Johnson, Avenue of Giants." }
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
}

// Run on load
initDays();
