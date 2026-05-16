// ==================== TRIP DATA ====================
// Shared data for the PWA

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
    33: 'img/dia-33.jpg'
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
            { time: "15:00", text: "📸 <strong>Rockefeller Center Plaza</strong> — pista de patinação, bandeiras, Channel Gardens", type: "" },
            { time: "15:30", text: "📚 <strong>Biblioteca Pública de NY</strong> (476 5th Ave) — Sala Rose de Leitura!", type: "" },
            { time: "16:50", text: "🧊 <strong>Bryant Park</strong> — atrás da Biblioteca! Pista de patinação no inverno", type: "" },
            { time: "19:00", text: "🍔 Jantar em <strong>Hell's Kitchen</strong> (9th Ave) — Shake Shack, burger joints", type: "food" },
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
            { time: "09:20", text: "🏛️ <strong>Wall Street + Charging Bull + Fearless Girl</strong> — foto rápida", type: "" },
            { time: "09:40", text: "⛪ <strong>Trinity Church</strong> (Broadway com Wall St) — túmulo do Alexander Hamilton", type: "" },
            { time: "09:50", text: "⛪ <strong>Oculus</strong> (WTC) — arquitetura de Calatrava impressionante", type: "highlight" },
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
            { time: "17:30", text: "🍝 Jantar em <strong>Chelsea / West Village</strong>", type: "food" },
            { time: "19:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        day: 3, title: "Dia 3 — Sab, 23/01", location: "New York, NY",
        route: "Central Park + Chinatown + Downtown 🌳",
        note: "Norte → Sul! Central Park, MET (opcional), depois desce: Macy's, Chinatown, Katz's.",
        region: "ny",
        items: [
            { time: "08:00", text: "☕ Café — <strong>Levain Bakery</strong> (167 W 74th St) — cookies famosos!", type: "food" },
            { time: "09:00", text: "🌳 <strong>Central Park</strong> — Strawberry Fields (John Lennon), Bethesda Fountain, Bow Bridge", type: "highlight" },
            { time: "10:30", text: "🏛️ <strong>MET</strong> (opcional ~2h) — já está ali na 82nd com 5th! Ou pular e descer", type: "" },
            { time: "10:30", text: "🏛️ <strong>Met Cloisters</strong> (opcional, alternativa ao MET) — museu de arte medieval com claustros europeus reais em Fort Tryon Park. Vista do Rio Hudson. Ingresso do MET inclui entrada (~$30)", type: "" },
            { time: "12:30", text: "🏨 <strong>The Plaza Hotel</strong> — hotel do Kevin em Esqueceram de Mim 2!", type: "" },
            { time: "13:00", text: "🍔 Almoço — <strong>Shake Shack</strong> (Columbus Circle ou Midtown)", type: "food" },
            { time: "14:00", text: "🛍️ <strong>Macy's Herald Square</strong> (34th St) — maior loja de departamento do mundo!", type: "" },
            { time: "14:45", text: "🚇 Metrô → Canal St", type: "drive" },
            { time: "15:00", text: "🏮 <strong>Chinatown</strong> — Canal St + Mott St, explorar com calma! Lojas, templos, chá", type: "highlight" },
            { time: "16:30", text: "🍝 <strong>Little Italy</strong> — Mulberry St. Cannoli na <strong>Ferrara Bakery</strong> (desde 1892!)", type: "" },
            { time: "17:30", text: "🍖 Jantar — <strong>Katz's Deli</strong> (205 E Houston St) — pastrami lendário! Cena de Harry & Sally", type: "food" },
            { time: "19:00", text: "🏨 Volta ao hotel", type: "" }
        ]
    },
    {
        day: 4, title: "Dia 4 — Dom, 24/01", location: "New York, NY",
        route: "Mirante + Flatiron + Despedida 🏙️",
        note: "Último dia em NY. Norte primeiro (E Corp, Roosevelt Island), depois desce (Summit, Flatiron).",
        region: "ny",
        items: [
            { time: "08:30", text: "☕ Café — <strong>Bagels de NY</strong> (Ess-a-Bagel, 831 3rd Ave)", type: "food" },
            { time: "09:15", text: "🏢 <strong>E Corp HQ — Mr. Robot</strong> (135 E 57th St) — fachada da Evil Corp!", type: "" },
            { time: "09:30", text: "🚡 <strong>Roosevelt Island Tramway</strong> (59th St com 2nd Ave) — bondinho aéreo! $2.90", type: "highlight" },
            { time: "10:15", text: "🏙️ <strong>Summit One Vanderbilt</strong> (45 E 42nd St) — mirante imersivo com espelhos! ~1.5h", type: "highlight" },
            { time: "12:00", text: "🚶 <strong>Grand Central Terminal</strong> — teto estrelado, relógio de opala", type: "highlight" },
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
        day: 5, title: "Dia 5 — Seg, 25/01", location: "New York → LAX → Three Rivers",
        route: "NY → LA → Início da roadtrip! ✈️🚗",
        note: "Check-out do Marriott, voo pro LAX, retirada do Tesla, subida pra Sequoia!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café no Marriott Marquis", type: "" },
            { time: "08:00", text: "🏨 Check-out", type: "" },
            { time: "08:30", text: "🚕 Uber Times Square → JFK (~60 min, ~$70)", type: "drive" },
            { time: "~09:30", text: "Chegada no JFK — check-in / despachar malas", type: "" },
            { time: "11:00", text: "✈️ Voo AA 3 → Los Angeles (11:00 → 14:20)", type: "drive" },
            { time: "14:20", text: "✈️ Chegada no LAX", type: "drive" },
            { time: "~15:30", text: "🚗 Retirada do <strong>Tesla Model Y</strong>", type: "drive" },
            { time: "16:00", text: "🛣️ Saída rumo a <strong>Three Rivers</strong> (~300 km, ~3.5h via CA-99 N)", type: "drive" },
            { time: "17:30", text: "⚡ <strong>Supercharger Tejon/Lebec, CA</strong> (~150 km) — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) — Sequoia não tem carregadores!", type: "charge" },
            { time: "18:15", text: "🚗 Continuação até Three Rivers (~150 km, ~2h)", type: "drive" },
            { time: "~20:00", text: "🏨 Chegada em <strong>Three Rivers</strong>! Check-in", type: "" },
            { time: "20:30", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["⚠️ CARREGAR ATÉ 100% em Tejon — Sequoia tem ~190 km de subida/descida e não há carregadores!"]
    },
    {
        day: 6, title: "Dia 6 — Ter, 26/01", location: "Sequoia National Park",
        route: "Dia inteiro em Sequoia! 🌲",
        note: "A MAIOR ÁRVORE DO MUNDO em volume!",
        region: "ca",
        items: [
            { time: "07:30", text: "☕ Café em Three Rivers", type: "" },
            { time: "08:00", text: "🚗 Subida pro parque pela Generals Highway (~45 min)", type: "drive" },
            { time: "08:45", text: "🌲 <strong>General Sherman Tree</strong> — a MAIOR ÁRVORE DO MUNDO em volume! Trilha ~0.8 km", type: "highlight" },
            { time: "09:30", text: "🌲 <strong>Congress Trail</strong> (~3 km loop) — dezenas de sequóias gigantes", type: "" },
            { time: "11:00", text: "🌲 <strong>General Grant Tree Trail</strong> (~1 km) — a 'Árvore de Natal da Nação'", type: "highlight" },
            { time: "11:30", text: "🏛️ <strong>Giant Forest Museum</strong> — história das sequoias gigantes", type: "" },
            { time: "12:00", text: "🌲 <strong>Big Trees Trail</strong> (~2 km) — passarela entre um prado de sequoias", type: "" },
            { time: "12:30", text: "🍽️ Almoço — picnic ou Grant Grove", type: "food" },
            { time: "14:00", text: "🌅 <strong>Moro Rock</strong> — 350 degraus, vista 360°!", type: "highlight" },
            { time: "15:00", text: "🌲 <strong>Crescent Meadow / Tharp's Log</strong> — cabana dentro de um tronco oco!", type: "" },
            { time: "16:30", text: "🚗 Descida pra Three Rivers", type: "drive" },
            { time: "17:00", text: "🍽️ Jantar em Three Rivers", type: "food" }
        ],
        tips: ["❄️ Em janeiro pode ter neve nas áreas mais altas — verifiquem condições no site do NPS."]
    },
    {
        day: 7, title: "Dia 7 — Qua, 27/01", location: "Three Rivers → Yosemite",
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
        day: 8, title: "Dia 8 — Qui, 28/01", location: "Yosemite dia cheio",
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
            { time: "14:00", text: "🎿 <strong>Badger Pass Ski Area</strong> — brincar na neve! (área de neve gratuita)", type: "highlight" },
            { time: "16:00", text: "📸 <strong>Cook's Meadow Loop</strong>", type: "" },
            { time: "17:00", text: "🌅 Pôr do sol no parque", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar — <strong>Majestic Yosemite Hotel Dining Room</strong> (reservar!)", type: "food" }
        ]
    },
    {
        day: 9, title: "Dia 9 — Sex, 29/01", location: "Yosemite → San Francisco",
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
        day: 10, title: "Dia 10 — Sab, 30/01", location: "San Francisco dia cheio",
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
            { time: "16:30", text: "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA! Dragon's Gate, dim sum", type: "highlight" },
            { time: "18:00", text: "🍽️ Jantar em <strong>North Beach</strong> (Little Italy de SF)", type: "food" }
        ]
    },
    {
        day: 11, title: "Dia 11 — Dom, 31/01", location: "SF — Mission + Golden Gate Park + Ocean Beach",
        route: "Mission, parques e despedida de SF! 🌉",
        note: "Murais, Golden Gate Park, Ocean Beach e despedida!",
        region: "ca",
        items: [
            { time: "09:00", text: "☕ Café", type: "" },
            { time: "10:00", text: "🎨 <strong>Murais do Mission District</strong> — Balmy Alley e Clarion Alley", type: "" },
            { time: "12:00", text: "🍽️ Almoço no Mission — burritos na <strong>La Taqueria</strong>!", type: "food" },
            { time: "13:30", text: "🌳 <strong>Golden Gate Park</strong> — jardins, museus, lagos", type: "" },
            { time: "15:00", text: "🌊 <strong>Ocean Beach</strong> — praia selvagem do Pacífico!", type: "" },
            { time: "16:30", text: "🛍️ <strong>Union Square</strong> — compras", type: "" },
            { time: "18:00", text: "🍽️ Último jantar em SF", type: "food" }
        ]
    },
    {
        day: 12, title: "Dia 12 — Seg, 01/02", location: "SF → Point Reyes → Eureka",
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
        day: 13, title: "Dia 13 — Ter, 02/02", location: "Redwood NP dia cheio 🌲",
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
        tips: ["🦕 Fern Canyon é IMPERDÍVEL — parece outro mundo!", "⚠️ Inverno: A Davison Road até Fern Canyon pode estar fechada/lamaçenta em fevereiro. Se inacessível, substitua por Simpson-Reed Trail (~1.6 km) — trilha tranquila entre redwoods gigantes."]
    },
    {
        day: 14, title: "Dia 14 — Qua, 03/02", location: "Costa Oregon Sul 🌊",
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
        day: 15, title: "Dia 15 — Qui, 04/02", location: "Costa Oregon → Cannon Beach 🌅",
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
        day: 16, title: "Dia 16 — Sex, 05/02", location: "Cannon Beach → Forks 🧛",
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
        tips: ["⚠️ CARREGAR ATÉ 100% em Aberdeen — Olympic tem 265 km internos + sem SC até Olympia (260 km)!", "⚡ Aberdeen → Forks é trecho longo sem Supercharger. Dirijam devagar e evitem aquecimento forte pra preservar autonomia."]
    },
    {
        day: 17, title: "Dia 17 — Sab, 06/02", location: "Olympic NP dia cheio 🌲",
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
        day: 18, title: "Dia 18 — Dom, 07/02", location: "Forks → Mt. Rainier → Portland",
        route: "Vulcão Rainier + Portland sem backtrack! 🌋",
        note: "Visita ao Rainier no caminho — se fechado, chegam em Portland às 13h!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Forks", type: "" },
            { time: "07:30", text: "🚗 Saída rumo ao sul via US-101 S", type: "drive" },
            { time: "10:30", text: "⚡ <strong>Supercharger Olympia/Centralia</strong> (~260 km) — ⚠️ CARREGAR ATÉ 90-100%! Trecho inclui subida ao Rainier + 200 km até Portland", type: "charge" },
            { time: "11:00", text: "🚗 Desvio rumo a <strong>Mt. Rainier NP</strong> (~100 km, ~1.5h via SR-7 → SR-706)", type: "drive" },
            { time: "12:30", text: "🌋 <strong>Mt. Rainier — Paradise!</strong> Vulcão de 4.392m nevado!", type: "highlight" },
            { time: "12:45", text: "🏔️ <strong>Henry M. Jackson Visitor Center</strong> — vista panorâmica", type: "" },
            { time: "13:15", text: "🥾 <strong>Nisqually Vista Trail</strong> (~2 km) — trilha com neve, vista do glaciar", type: "" },
            { time: "14:30", text: "🍽️ Almoço na região (Ashford ou Elbe)", type: "food" },
            { time: "15:00", text: "🚗 Descida rumo a <strong>Portland</strong> (~200 km, ~2.5h via SR-7 S → I-5 S)", type: "drive" },
            { time: "~17:30", text: "🏨 Chegada em <strong>Portland</strong>! Check-in", type: "" },
            { time: "18:00", text: "🍩 <strong>Voodoo Doughnut</strong> ou 📚 <strong>Powell's Books</strong> (maior livraria independente do mundo!)", type: "highlight" },
            { time: "19:00", text: "🍽️ Jantar em Portland — food trucks ou cervejaria artesanal", type: "food" }
        ],
        tips: ["⚠️ Inverno em Mt. Rainier: A SR-706 até Paradise costuma estar aberta. Verifiquem condições no NPS na manhã.", "🔄 Se Rainier FECHADO: sigam direto Olympia → I-5 S → Portland (~410 km, chegada ~13:00). Tarde livre: Pittock Mansion, Rose Garden, Powell's Books, Voodoo Doughnut, cervejarias!"]
    },
    {
        day: 19, title: "Dia 19 — Seg, 08/02", location: "Portland → Boise",
        route: "Multnomah Falls + Columbia Gorge! 💧",
        note: "Multnomah Falls a 50 km da saída + Columbia Gorge o dia todo!",
        region: "pnw",
        items: [
            { time: "07:00", text: "☕ Café em Portland + check-out", type: "" },
            { time: "07:30", text: "🚗 Saída rumo a <strong>Boise, ID</strong> (~530 km, ~6.5h via I-84 E)", type: "drive" },
            { time: "08:00", text: "🌲 <strong>Multnomah Falls</strong> (~50 km) — cachoeira icônica de 189m!", type: "highlight" },
            { time: "08:30", text: "🏞️ <strong>Columbia River Gorge</strong> — paredões espetaculares", type: "" },
            { time: "09:00", text: "⚡ <strong>Supercharger The Dalles</strong> (~130 km) — ~25 min", type: "charge" },
            { time: "11:00", text: "⚡🍽️ <strong>Supercharger Pendleton</strong> (~200 km) — ~20 min + almoço", type: "charge" },
            { time: "13:30", text: "⚡ <strong>Supercharger Baker City</strong> (~200 km) — ~25 min", type: "charge" },
            { time: "~16:00", text: "🏨 Chegada em <strong>Boise</strong>!", type: "" },
            { time: "16:30", text: "🏙️ <strong>Boise River Greenbelt + Idaho State Capitol</strong>", type: "" },
            { time: "18:00", text: "🍽️ Jantar no <strong>Basque Block</strong> — Bar Gernika!", type: "food" }
        ]
    },
    {
        day: 20, title: "Dia 20 — Ter, 09/02", location: "Boise → Salt Lake City",
        route: "Shoshone Falls + Antelope Island! 🦬",
        note: "Dia tranquilo de estrada. Shoshone Falls + Antelope Island!",
        region: "ut",
        items: [
            { time: "07:00", text: "☕ Café + check-out de Boise", type: "" },
            { time: "07:30", text: "🚗 Saída rumo a <strong>Salt Lake City</strong> (~5h com paradas, via I-84 E → I-86 → I-15 S)", type: "drive" },
            { time: "09:30", text: "⚡ <strong>Supercharger Twin Falls, ID</strong> (~210 km) — ~25 min", type: "charge" },
            { time: "10:00", text: "🌊 <strong>Shoshone Falls</strong> (~5 min do SC) — a 'Niágara do Oeste'! 65m de altura!", type: "highlight" },
            { time: "10:30", text: "🚗 Continuação I-86 → I-15 sul (~280 km, ~3h)", type: "drive" },
            { time: "13:30", text: "⚡ <strong>Supercharger Salt Lake City</strong> — ~25 min", type: "charge" },
            { time: "14:00", text: "🦬 <strong>Antelope Island State Park</strong> (~45 min de SLC) — ~700 bisões selvagens no Great Salt Lake!", type: "highlight" },
            { time: "15:00", text: "📸 <strong>Buffalo Point</strong> — mirante 360° do Great Salt Lake", type: "" },
            { time: "16:00", text: "🏨 Check-in em <strong>Salt Lake City</strong>", type: "" },
            { time: "16:30", text: "🏙️ Passeio pelo centro — <strong>Temple Square</strong>, <strong>State Capitol</strong>", type: "" },
            { time: "18:00", text: "🍽️ Jantar em SLC", type: "food" }
        ]
    },
    {
        day: 21, title: "Dia 21 — Qua, 10/02", location: "Salt Lake City → Moab",
        route: "Manhã em SLC, tarde em Moab! 🏜️",
        note: "Preparação pros parques de Utah!",
        region: "ut",
        items: [
            { time: "08:00", text: "☕ Café + check-out de SLC", type: "" },
            { time: "08:30", text: "🚗 Saída rumo a <strong>Moab</strong> (~370 km, ~4h via I-15 S → US-6 → I-70 E → US-191 S)", type: "drive" },
            { time: "10:00", text: "⚡ <strong>Supercharger Price, UT</strong> (~190 km) — ~20 min", type: "charge" },
            { time: "11:00", text: "⚡ <strong>Supercharger Green River, UT</strong> (~100 km) — ~20 min", type: "charge" },
            { time: "12:30", text: "🏨 Chegada em <strong>Moab</strong>! Check-in", type: "" },
            { time: "13:00", text: "🍽️ Almoço em Moab", type: "food" },
            { time: "14:00", text: "🚗 <strong>Scenic Byway 128</strong> ao longo do rio Colorado — estrada cênica com paredões vermelhos", type: "" },
            { time: "15:30", text: "🥾 <strong>Corona Arch Trail</strong> (~5 km, ~2h) — arco gigante sem multidões!", type: "highlight" },
            { time: "17:30", text: "🌅 Pôr do sol em Moab — paredões avermelhados!", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Moab", type: "food" }
        ]
    },
    {
        day: 22, title: "Dia 22 — Qui, 11/02", location: "Canyonlands NP dia cheio 🏜️",
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
        day: 23, title: "Dia 23 — Sex, 12/02", location: "Arches NP + Dead Horse Point",
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
        day: 24, title: "Dia 24 — Sab, 13/02", location: "Moab → Bryce Canyon",
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
        day: 25, title: "Dia 25 — Dom, 14/02 ❤️", location: "Bryce AM → Zion PM",
        route: "Nascer do sol nos hoodoos + chegada em Zion! Valentine's Day! 🏞️",
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
            { time: "18:30", text: "🍽️ Jantar em Springdale — Valentine's Day! ❤️", type: "food" }
        ]
    },
    {
        day: 26, title: "Dia 26 — Seg, 15/02", location: "Zion NP dia cheio",
        route: "Watchman Trail + Emerald Pools! 🏞️",
        note: "Dia cheio em Zion! Trilhas, mirantes e pôr do sol!",
        region: "ut",
        items: [
            { time: "07:30", text: "☕ Café em Springdale", type: "" },
            { time: "08:00", text: "🚌 Shuttle pra Zion Canyon", type: "" },
            { time: "08:30", text: "🥾 <strong>Watchman Trail</strong> (~5 km, ~2h) — vista panorâmica do cânion e de Springdale!", type: "highlight" },
            { time: "10:30", text: "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km) — piscinas naturais com cachoeiras", type: "" },
            { time: "12:30", text: "🍽️ Almoço em Springdale ou Zion Lodge", type: "food" },
            { time: "13:30", text: "🥾 <strong>Pa'rus Trail</strong> (~6 km) — trilha plana ao longo do rio Virgin", type: "" },
            { time: "15:00", text: "📸 <strong>Court of the Patriarchs</strong> — três picos imponentes", type: "" },
            { time: "15:30", text: "📸 <strong>Big Bend</strong> — vista do Angels Landing e Great White Throne", type: "" },
            { time: "16:00", text: "🌄 <strong>Canyon Overlook Trail</strong> (~1.6 km, ~1h) — se não fizeram ontem, mirante espetacular!", type: "highlight" },
            { time: "17:00", text: "🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong> — vista panorâmica do cânion", type: "highlight" },
            { time: "18:30", text: "🍽️ Jantar em Springdale", type: "food" }
        ],
        tips: ["🥾 Dia mais tranquilo, mas igualmente lindo! Watchman Trail tem vista privilegiada e é acessível no inverno."]
    },
    {
        day: 27, title: "Dia 27 — Ter, 16/02", location: "Zion → Grand Canyon → Vegas!",
        route: "GC à tarde + pôr do sol → Vegas à noite! 🏜️🎰",
        note: "Dia longo mas épico — vocês já conhecem o GC, a tarde é suficiente!",
        region: "nv",
        items: [
            { time: "08:00", text: "☕ Café + check-out de Springdale", type: "" },
            { time: "08:30", text: "🚗 Saída rumo ao <strong>Grand Canyon South Rim</strong> (~270 km, ~3.5h)", type: "drive" },
            { time: "09:30", text: "⚡🍽️ <strong>Kanab, UT</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~40 min) + café. GC 130 km internos + Kingman a 260 km!", type: "charge" },
            { time: "~12:30", text: "🏜️ Chegada no <strong>Grand Canyon South Rim</strong>!", type: "highlight" },
            { time: "12:45", text: "📸 <strong>Mather Point</strong> — vista absurda do cânion!", type: "highlight" },
            { time: "13:15", text: "🍽️ Almoço no parque (Market Plaza ou El Tovar)", type: "food" },
            { time: "14:00", text: "🥾 <strong>Rim Trail</strong> (Mather Point → Yavapai Point, ~1.5 km)", type: "" },
            { time: "14:45", text: "🏛️ <strong>Yavapai Geology Museum</strong> — painéis de vidro sobre o abismo", type: "" },
            { time: "15:30", text: "📸 <strong>Bright Angel Trailhead</strong> — vista da trilha mais famosa", type: "" },
            { time: "16:00", text: "📸 <strong>Hopi Point</strong> — vista mais ampla do cânion", type: "" },
            { time: "17:00", text: "🌅 <strong>Pôr do sol no Grand Canyon</strong> — Hopi Point. ESPETACULAR!", type: "highlight" },
            { time: "17:30", text: "🚗 Saída rumo a <strong>Las Vegas</strong> (~430 km, ~4.5h via I-40 → US-93)", type: "drive" },
            { time: "19:15", text: "⚡ <strong>Supercharger Kingman, AZ</strong> (~260 km) — ~25 min. Route 66!", type: "charge" },
            { time: "~21:45", text: "🎰 Chegada em <strong>Las Vegas</strong>! Check-in no <strong>Sahara</strong>", type: "highlight" },
            { time: "22:00", text: "🍽️ Jantar tardio (hotel ou Strip)", type: "food" }
        ],
        tips: ["🚗 Dia longo (~10h com paradas). Se estiverem cansados, pulem o pôr do sol e saiam ~15:30 — chegam em Vegas ~20h.", "⚡ Carregar 100% em Kanab é ESSENCIAL — próximo SC é Kingman a ~390 km!"]
    },
    {
        day: 28, title: "Dia 28 — Qua, 17/02", location: "Las Vegas livre! 🎰",
        route: "Dia pra curtir Vegas com calma!",
        note: "Descansem do dia longo de ontem — Strip, compras e diversão!",
        region: "nv",
        items: [
            { time: "09:00", text: "☕ Café com calma (merecido!)", type: "" },
            { time: "10:00", text: "🎨 <strong>Seven Magic Mountains</strong> (~20 min ao sul da Strip) — torres neon no deserto!", type: "" },
            { time: "10:30", text: "📸 <strong>Welcome to Las Vegas Sign</strong>!", type: "" },
            { time: "11:00", text: "🍽️ Brunch — <strong>In-N-Out Burger</strong> ou café na Strip", type: "food" },
            { time: "12:00", text: "🏨 Hotéis temáticos — Venetian, Bellagio (jardim + fontes), Caesars Palace", type: "highlight" },
            { time: "14:00", text: "🛍️ Compras — Fashion Show Mall ou Las Vegas North Premium Outlets", type: "" },
            { time: "17:00", text: "🏊 Piscina no Sahara (ou descanso)", type: "" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" },
            { time: "21:00", text: "🌃 <strong>Strip à noite</strong> — Bellagio Fountains, cassinos, neon!", type: "highlight" }
        ],
        tips: ["🎰 Dia perfeito pra explorar a Strip sem pressa!"]
    },
    {
        day: 29, title: "Dia 29 — Qui, 18/02", location: "Valley of Fire + Strip",
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
            { time: "14:00", text: "� <strong>Area 15</strong> (~15 min da Strip) — <strong>Meow Wolf's Omega Mart</strong> (supermercado alienígena surreal!), instalações imersivas. ~1.5h. Ingresso ~$45/pessoa", type: "highlight" },
            { time: "16:30", text: "🛍️ Compras — Fashion Show Mall ou Outlets", type: "" },
            { time: "17:30", text: "🎲 Passeio pela Strip — Bellagio Fountains", type: "" },
            { time: "19:00", text: "🍽️ Jantar na Strip", type: "food" }
        ]
    },
    {
        day: 30, title: "Dia 30 — Sex, 19/02", location: "Day trip Death Valley 🏜️",
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
        day: 31, title: "Dia 31 — Sab, 20/02", location: "Vegas → Los Angeles",
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
        day: 32, title: "Dia 32 — Dom, 21/02", location: "LA — Malibu + Venice + Griffith",
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
    { num: 12, name: "Salt Lake City, UT", checkin: "09/02", checkout: "10/02", nights: 1 },
    { num: 13, name: "Moab, UT", checkin: "10/02", checkout: "13/02", nights: 3 },
    { num: 14, name: "Bryce Canyon, UT", checkin: "13/02", checkout: "14/02", nights: 1 },
    { num: 15, name: "Springdale, UT (Zion)", checkin: "14/02", checkout: "16/02", nights: 2 },
    { num: 16, name: "Las Vegas, NV (Sahara)", checkin: "16/02", checkout: "20/02", nights: 4 },
    { num: 17, name: "Los Angeles, CA", checkin: "20/02", checkout: "22/02", nights: 2 }
];

const parks = [
    { name: "🌲 Sequoia National Park", days: "Dia 6", highlights: "General Sherman Tree (maior árvore do mundo em volume!), Congress Trail, Moro Rock (350 degraus, vista 360°), Giant Forest Museum, Big Trees Trail." },
    { name: "🏞️ Yosemite National Park", days: "Dias 7–9", highlights: "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Vernal Fall, Mirror Lake, Badger Pass." },
    { name: "🌲 Redwood National Park", days: "Dia 13", highlights: "Fern Canyon (Jurassic Park 2!), Lady Bird Johnson Grove, Prairie Creek, Stout Grove, Gold Bluffs Beach." },
    { name: "🌲 Olympic National Park", days: "Dias 16–17", highlights: "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push Beach (Twilight!), Rialto Beach, Sol Duc Falls." },
    { name: "🌋 Mt. Rainier National Park", days: "Dia 18", highlights: "Paradise, Nisqually Vista Trail, vulcão de 4.392m coberto de neve, Henry M. Jackson Visitor Center." },
    { name: "🏜️ Canyonlands National Park", days: "Dia 22", highlights: "Mesa Arch ao nascer do sol, Grand View Point, Green River Overlook, Upheaval Dome, Aztec Butte." },
    { name: "🏜️ Arches National Park", days: "Dia 23", highlights: "Delicate Arch (o arco mais famoso do mundo!), Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace." },
    { name: "🏔️ Bryce Canyon National Park", days: "Dias 24–25", highlights: "Navajo Loop, Queen's Garden Trail, hoodoos, Bryce Amphitheater, stargazing (International Dark Sky Park!)." },
    { name: "🏞️ Zion National Park", days: "Dias 25–26", highlights: "Watchman Trail, Canyon Overlook Trail, Emerald Pools, Riverside Walk, Pa'rus Trail, Court of the Patriarchs." },
    { name: "🏞️ Grand Canyon National Park", days: "Dia 27", highlights: "Mather Point, Rim Trail, Yavapai Geology Museum, Hopi Point, pôr do sol ÉPICO." },
    { name: "🏜️ Death Valley National Park", days: "Dia 30", highlights: "Badwater Basin (-86m!), Zabriskie Point, Artist's Palette, Mesquite Sand Dunes, Dante's View." }
];

const superchargers = [
    { day: 5, name: "Tejon / Lebec, CA", leg: "LAX → Three Rivers", critical: true, note: "⚠️ CARREGAR ATÉ 100% — Sequoia sem carregadores!" },
    { day: 9, name: "Manteca / Oakdale, CA", leg: "Yosemite → SF", critical: false },
    { day: 12, name: "Ukiah, CA", leg: "SF → Eureka", critical: false },
    { day: 14, name: "Coos Bay, OR", leg: "Crescent City → Coos Bay", critical: false },
    { day: 15, name: "Lincoln City, OR", leg: "Coos Bay → Cannon Beach", critical: false },
    { day: 16, name: "Aberdeen, WA", leg: "Cannon Beach → Forks", critical: true, note: "⚠️ CARREGAR ATÉ 100% — Olympic 265 km internos + sem SC até Olympia!" },
    { day: 18, name: "Olympia / Centralia, WA", leg: "Forks → Portland", critical: true, note: "⚠️ CARREGAR ATÉ 90-100%! Subida ao Rainier + 200 km até Portland sem SC!" },
    { day: 19, name: "The Dalles, OR", leg: "Portland → Boise", critical: false },
    { day: 19, name: "Pendleton, OR", leg: "Portland → Boise", critical: false },
    { day: 19, name: "Baker City, OR", leg: "Portland → Boise", critical: false },
    { day: 20, name: "Twin Falls, ID", leg: "Boise → SLC", critical: false },
    { day: 20, name: "Salt Lake City, UT", leg: "Boise → SLC", critical: false },
    { day: 21, name: "Price, UT", leg: "SLC → Moab", critical: false },
    { day: 21, name: "Green River, UT", leg: "SLC → Moab", critical: false },
    { day: 24, name: "Green River, UT", leg: "Moab → Bryce", critical: false },
    { day: 24, name: "Salina, UT", leg: "Moab → Bryce", critical: false },
    { day: 27, name: "Kanab, UT", leg: "Zion → GC → Vegas", critical: true, note: "⚠️ CARREGAR ATÉ 100% — GC 130 km internos + 260 km até Kingman!" },
    { day: 27, name: "Kingman, AZ", leg: "Zion → GC → Vegas", critical: false },
    { day: 31, name: "Barstow, CA", leg: "Vegas → LA", critical: false, note: "Maior Supercharger do mundo! 120 stalls" }
];
