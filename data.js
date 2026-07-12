// ==================== TRIP DATA ====================
// Roteiro — Viagem EUA 2027
// NYC → LAX → Sequoia → Yosemite → SF → Eureka → Redwood → Costa Oregon
// → Forks → Olympic → Pendleton → Twin Falls → Moab → Arches → Canyonlands
// → Capitol Reef → Bryce → Zion → Page → Grand Canyon → Vegas → Death Valley → LA
//
// Para REORDENAR dias: mova os objetos dentro do array `days`.
// initDays() recalcula automaticamente: número, data, dia da semana, dayPhotos e superchargers.

const days = [
    {
        "photo": "img/dia-01.jpg",
        "shortLoc": "NYC",
        "location": "New York, NY",
        "route": "Chegada + Midtown leve 🗽",
        "note": "Chegada no JFK às 07h. Dia tranquilo pra se adaptar — tudo a pé em Midtown.",
        "region": "ny",
        "items": [
            {
                "time": "07:00",
                "text": "✈️ Chegada no JFK — imigração + bagagem",
                "type": "drive"
            },
            {
                "time": "~09:00",
                "text": "🚕 Transporte JFK → Hotel (AirTrain + Subway E ~$11/pessoa, ~65 min · AirTrain + LIRR ~$14/pessoa, ~45 min · Uber ~$70, ~60 min)",
                "type": "drive"
            },
            {
                "time": "~10:00",
                "text": "🏨 Check-in no <strong>Marriott Marquis</strong> (1535 Broadway, Times Square)",
                "type": ""
            },
            {
                "time": "10:30",
                "text": "☕ Café da manhã perto do hotel",
                "type": "food"
            },
            {
                "time": "11:00",
                "text": "🎮 <strong>Nintendo NY</strong> (10 Rockefeller Plaza) — loja oficial, 2 andares de games! Entrada livre",
                "type": "highlight"
            },
            {
                "time": "12:15",
                "text": "⛪ <strong>St. Patrick's Cathedral</strong> (5th Ave com 50th St) — gratuita, linda por dentro",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🧸 <strong>FAO Schwarz</strong> (30 Rockefeller Plaza) — loja de brinquedos icônica",
                "type": ""
            },
            {
                "time": "12:45",
                "text": "🧱 <strong>LEGO Store</strong> (636 5th Ave) — maquetes gigantes de NY em LEGO",
                "type": ""
            },
            {
                "time": "13:15",
                "text": "🍕 Almoço — <strong>Joe's Pizza</strong> (clássica de NY!)",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🚶 Passeio pela <strong>5th Avenue</strong> — Saks, Tiffany's, Apple Store (cubo de vidro!)",
                "type": ""
            },
            {
                "time": "15:00",
                "text": "📸 <strong>Rockefeller Center Plaza</strong> — pista de patinação, bandeiras",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "🧊 <strong>Bryant Park</strong> — Winter Village no inverno (mercadinho, patinação)",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>John's of Times Square</strong> (260 W 44th St) — pizza em forno de lenha desde 1929, tortas inteiras crocantes. O clássico de NY que todos voltam. ~$15-20/pessoa",
                "type": "food"
            },
            {
                "time": "20:30",
                "text": "🏨 Hotel — descanso (jet lag!)",
                "type": ""
            }
        ],
        "day": 1,
        "title": "Dia 1 — Qui, 21/01"
    },
    {
        "photo": "img/dia-02.jpg",
        "shortLoc": "NYC",
        "location": "New York, NY",
        "route": "Downtown + Brooklyn + Chelsea 🌉",
        "note": "Dia intenso! WTC, Brooklyn Bridge, DUMBO, SoHo, High Line, Hudson Yards.",
        "region": "ny",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café no hotel ou próximo",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "👻 <strong>Ghostbusters Firehouse</strong> (14 North Moore St) — quartel real dos Caça-Fantasmas!",
                "type": ""
            },
            {
                "time": "09:20",
                "text": "🏛️ <strong>Wall Street + Charging Bull + Fearless Girl</strong>",
                "type": ""
            },
            {
                "time": "09:40",
                "text": "⛪ <strong>Oculus</strong> (WTC) — arquitetura de Calatrava impressionante",
                "type": "highlight"
            },
            {
                "time": "10:10",
                "text": "🕊️ <strong>9/11 Memorial</strong> — piscinas nos locais das torres. Gratuito",
                "type": "highlight"
            },
            {
                "time": "10:45",
                "text": "👔 <strong>7 World Trade Center</strong> — escritório Pearson Specter (Suits!)",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🌉 <strong>Brooklyn Bridge</strong> a pé — travessia ~30 min",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "📸 <strong>DUMBO</strong> — foto clássica na Washington St",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🌳 <strong>Brooklyn Bridge Park + Jane's Carousel</strong>",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🍕 Almoço — <strong>Juliana's Pizza</strong> ou <strong>Time Out Market</strong> (rooftop!)",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🛍️ <strong>SoHo</strong> — lojas, arte de rua, cafés",
                "type": ""
            },
            {
                "time": "14:30",
                "text": "🏛️ <strong>Washington Square Park</strong> — arco icônico, Greenwich Village",
                "type": ""
            },
            {
                "time": "15:00",
                "text": "🏙️ <strong>Chelsea Market</strong> + 🌮 <strong>Los Tacos No.1</strong>",
                "type": "food"
            },
            {
                "time": "15:30",
                "text": "🌿 <strong>High Line</strong> — parque elevado num antigo trilho de trem",
                "type": "highlight"
            },
            {
                "time": "16:00",
                "text": "🏢 <strong>Pier 57</strong> (sede Google NY) + 🌴 <strong>Little Island</strong> (parque flutuante)",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🌇 <strong>Hudson Yards + The Vessel</strong>",
                "type": "highlight"
            },
            {
                "time": "17:30",
                "text": "🍽️ Jantar — <strong>Dallas BBQ</strong> (261 8th Ave, Chelsea) — churrasco americano com porções absurdas, ribs e onion rings. Fila garantida mas vale! ~$18-25/pessoa",
                "type": "food"
            },
            {
                "time": "19:00",
                "text": "🏨 Volta ao hotel",
                "type": ""
            }
        ],
        "day": 2,
        "title": "Dia 2 — Sex, 22/01"
    },
    {
        "photo": "img/dia-03.jpg",
        "shortLoc": "NYC",
        "location": "New York, NY",
        "route": "Central Park + Chinatown + Downtown 🌳",
        "note": "Norte → Sul! Central Park, depois desce: Chinatown, Little Italy, Katz's.",
        "region": "ny",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café — <strong>Levain Bakery</strong> (167 W 74th St) — cookies famosos!",
                "type": "food"
            },
            {
                "time": "09:00",
                "text": "🌳 <strong>Central Park</strong> — Strawberry Fields, Bethesda Fountain, Bow Bridge",
                "type": "highlight"
            },
            {
                "time": "11:00",
                "text": "🏨 <strong>The Plaza Hotel</strong> — hotel do Kevin em Esqueceram de Mim 2!",
                "type": ""
            },
            {
                "time": "11:30",
                "text": "🍔 Almoço — <strong>Shake Shack</strong> (Columbus Circle ou Midtown)",
                "type": "food"
            },
            {
                "time": "13:00",
                "text": "🏮 <strong>Chinatown</strong> — Canal St + Mott St, a maior dos EUA!",
                "type": "highlight"
            },
            {
                "time": "16:30",
                "text": "🍝 <strong>Little Italy</strong> — Mulberry St. Cannoli na <strong>Ferrara Bakery</strong> (desde 1892!)",
                "type": ""
            },
            {
                "time": "17:30",
                "text": "🍖 Jantar — <strong>Katz's Deli</strong> (205 E Houston St) — pastrami lendário!",
                "type": "food"
            },
            {
                "time": "19:00",
                "text": "🏨 Volta ao hotel",
                "type": ""
            }
        ],
        "day": 3,
        "title": "Dia 3 — Sab, 23/01"
    },
    {
        "photo": "img/dia-04.jpg",
        "shortLoc": "NYC",
        "location": "New York, NY",
        "route": "Mirante + Flatiron + Despedida 🏙️",
        "note": "Último dia em NY. Roosevelt Island, Summit, Grand Central, Flatiron.",
        "region": "ny",
        "items": [
            {
                "time": "08:30",
                "text": "☕ Café — <strong>Ess-a-Bagel</strong> (831 3rd Ave com 51st St)",
                "type": "food"
            },
            {
                "time": "09:15",
                "text": "🚡 <strong>Roosevelt Island Tramway</strong> (59th St com 2nd Ave) — bondinho aéreo! $2.90",
                "type": "highlight"
            },
            {
                "time": "10:15",
                "text": "🏙️ <strong>Summit One Vanderbilt</strong> (45 E 42nd St) — mirante imersivo de espelhos! ~1.5h. ~$45/adulto, ~$36/criança",
                "type": "highlight"
            },
            {
                "time": "12:00",
                "text": "🚶 <strong>Grand Central Terminal</strong> — teto estrelado, relógio de opala",
                "type": "highlight"
            },
            {
                "time": "12:30",
                "text": "🍝 Almoço — <strong>Eataly</strong> (200 5th Ave) — mercado italiano!",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "🏢 <strong>Flatiron Building</strong> (23rd St) — prédio triangular de 1902!",
                "type": ""
            },
            {
                "time": "14:00",
                "text": "🧙 <strong>Harry Potter Shop</strong> (935 Broadway) — butterbeer bar, varinhas, vassouras! Ao lado do Flatiron. Entrada livre",
                "type": "highlight"
            },
            {
                "time": "15:15",
                "text": "🏰 <strong>Disney Store</strong> (1540 Broadway, Times Square) — flagship de 2 andares! Balões gigantes do Mickey e Minnie, área interativa e produtos exclusivos. Entrada livre",
                "type": "highlight"
            },
            {
                "time": "16:15",
                "text": "🕐 Tempo livre — descansar no hotel ou última exploração",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "🧳 Volta ao hotel — arrumar malas",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Ellen's Stardust Diner</strong> (1650 Broadway, Times Square) — diner temático anos 50 com garçons que cantam ao vivo, clássico para crianças! Burgers, milkshakes e espetáculo. ~$20-25/pessoa",
                "type": "food"
            },
            {
                "time": "21:00",
                "text": "🏨 Hotel — dormir cedo (voo amanhã!)",
                "type": ""
            }
        ],
        "day": 4,
        "title": "Dia 4 — Dom, 24/01"
    },
    {
        "photo": "img/activities/three_rivers_ca.jpg",
        "shortLoc": "Sequoia",
        "chargeStops": [
            {
                "name": "Bakersfield, CA",
                "leg": "LAX → Three Rivers",
                "critical": false
            }
        ],
        "location": "New York → LAX → Three Rivers",
        "route": "NY → LA → Sequoia! ✈️🌲",
        "note": "Check-out do Marriott, voo pro LAX, Tesla e direto pra Three Rivers! ~330 km com FSD pela CA-99.",
        "region": "ca",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café no Marriott Marquis",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🏨 Check-out",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚕 Times Square → JFK",
                "type": "drive"
            },
            {
                "time": "~09:30",
                "text": "🛫 Chegada no JFK — check-in / despachar malas",
                "type": ""
            },
            {
                "time": "10:15",
                "text": "🍽️ Almoço no aeroporto (JFK Terminal)",
                "type": "food"
            },
            {
                "time": "11:00",
                "text": "✈️ Voo AA 3 → Los Angeles (~5.5h)",
                "type": "drive"
            },
            {
                "time": "13:20",
                "text": "✈️ Chegada no LAX (horário local, -3h)",
                "type": "drive"
            },
            {
                "time": "~14:00",
                "text": "🚗 Retirada do <strong>Tesla Model Y</strong>",
                "type": "drive"
            },
            {
                "time": "14:30",
                "text": "🛣️ Saída rumo a <strong>Three Rivers</strong> (~330 km, ~3.5h via CA-99 N → CA-198 E)",
                "type": "drive"
            },
            {
                "time": "16:00",
                "text": "⚡ <strong>Supercharger Bakersfield, CA</strong> (~180 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "~18:00",
                "text": "🏨 Chegada em <strong>Three Rivers</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Sierra Subs & Salads</strong> (41717 Sierra Dr, Three Rivers) — sanduíches artesanais e saladas frescas. ~$10-15/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚡ Dia longo (~330 km) mas FSD ajuda. CA-99 é reta e rápida.",
            "⚡ Fuso horário ajuda (-3h). Chegam cansados — dormir cedo!"
        ]
    },
    {
        "photo": "img/activities/general_sherman_tree.jpg",
        "shortLoc": "Sequoia",
        "location": "Sequoia + Kings Canyon NP",
        "route": "General Sherman + Kings Canyon! 🌲",
        "note": "Dia cheio nos parques! Sequoia de manhã, Kings Canyon à tarde.",
        "region": "ca",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café em Three Rivers",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🚗 Subida até <strong>Sequoia NP</strong> (~30 km, ~45 min via CA-198)",
                "type": "drive"
            },
            {
                "time": "08:45",
                "text": "🌲 <strong>General Sherman Tree</strong> — a MAIOR árvore do mundo! 84m de altura!",
                "type": "highlight"
            },
            {
                "time": "09:30",
                "text": "🥾 <strong>Congress Trail</strong> (~3 km loop) — entre sequoias gigantes",
                "type": ""
            },
            {
                "time": "10:30",
                "text": "📸 <strong>Moro Rock</strong> — vista 360° (se escadas abertas no inverno)",
                "type": "highlight"
            },
            {
                "time": "11:15",
                "text": "📸 <strong>Tunnel Log</strong> (parada rápida no caminho) — sequoia caída com túnel pra carro! + <strong>Auto Log</strong>",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🚗 <strong>Generals Highway</strong> rumo a Kings Canyon (~65 km, ~1h30)",
                "type": "drive"
            },
            {
                "time": "13:30",
                "text": "🍽️ Almoço no Grant Grove Restaurant",
                "type": "food"
            },
            {
                "time": "14:30",
                "text": "🌲 <strong>General Grant Tree</strong> — 2ª maior sequoia do mundo!",
                "type": "highlight"
            },
            {
                "time": "15:00",
                "text": "🌲 <strong>North Grove Loop</strong> (~1 km) — floresta de sequoias gigantes!",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🚗 Volta pra Three Rivers (~1h30)",
                "type": "drive"
            },
            {
                "time": "18:00",
                "text": "🍽️ Jantar — <strong>Gateway Restaurant & Lodge</strong> (45978 Sierra Dr, Three Rivers) — americana casual com vista. ~$15-22/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "❄️ Em janeiro pode ter neve nas áreas mais altas — chains podem ser obrigatórias.",
            "⚠️ Kings Canyon Scenic Byway (CA-180 leste) fecha no inverno. Só General Grant Tree é acessível."
        ]
    },
    {
        "photo": "img/activities/tunnel_view.jpg",
        "shortLoc": "Yosemite",
        "chargeStops": [
            {
                "name": "Fresno, CA",
                "leg": "Three Rivers → Mariposa",
                "critical": false
            }
        ],
        "location": "Three Rivers → Mariposa (Yosemite)",
        "route": "Rumo a Yosemite! 🏞️",
        "note": "Drive de Three Rivers até Mariposa via Fresno. Tarde livre em Mariposa.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café + check-out de Three Rivers",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚗 Drive Three Rivers → Fresno → Mariposa (~295 km, ~4h via CA-180 W → CA-41 N → CA-49 N)",
                "type": "drive"
            },
            {
                "time": "10:30",
                "text": "⚡ <strong>Supercharger Fresno, CA</strong> (~150 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "11:00",
                "text": "🍽️ Almoço em Fresno",
                "type": "food"
            },
            {
                "time": "~13:00",
                "text": "🏨 Chegada em <strong>Mariposa</strong>! Check-in",
                "type": ""
            },
            {
                "time": "14:00",
                "text": "🏛️ <strong>Mariposa Museum & History Center</strong> — história da corrida do ouro!",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "🚶 Passeio pelo centro histórico de Mariposa — galerias e lojas",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Charles Street Dinner House</strong> (5043 Hwy 140, Mariposa) — steakhouse histórico. ~$25-35/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🚗 Estrada de montanha sinuosa — mais lenta do que a distância sugere."
        ]
    },
    {
        "photo": "img/activities/half_dome.jpg",
        "shortLoc": "Yosemite",
        "location": "Yosemite NP dia 1 — Valley",
        "route": "Tunnel View + cachoeiras + neve! 🏞️",
        "note": "Primeiro dia em Yosemite! Valley com neve — lindo!",
        "region": "ca",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café em Mariposa",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Drive Mariposa → Yosemite Valley (~1.5h via CA-140)",
                "type": "drive"
            },
            {
                "time": "09:00",
                "text": "📸 <strong>Tunnel View</strong> — vista icônica: El Capitan + Half Dome + Bridalveil!",
                "type": "highlight"
            },
            {
                "time": "09:30",
                "text": "🌊 <strong>Bridalveil Fall</strong> — trilha curta ~10 min",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🏔️ <strong>El Capitan Meadow</strong> — paredão de 900m!",
                "type": ""
            },
            {
                "time": "10:30",
                "text": "🌊 <strong>Yosemite Falls</strong> — Lower trail ~30 min — pode ter gelo!",
                "type": "highlight"
            },
            {
                "time": "11:15",
                "text": "🪞 <strong>Mirror Lake</strong> — trilha ~3 km, reflexo do Half Dome!",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🍽️ Almoço no Yosemite Valley Lodge",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "🌲 <strong>Cook's Meadow Loop</strong> — trilha fácil, Half Dome + Yosemite Falls com neve",
                "type": ""
            },
            {
                "time": "14:30",
                "text": "📸 <strong>Valley View</strong> — foto clássica do Merced River",
                "type": ""
            },
            {
                "time": "15:00",
                "text": "🎨 <strong>Ansel Adams Gallery</strong> — fotografia icônica de Yosemite",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "⛷️ <strong>Yosemite Ski & Snowboard Area</strong> (Badger Pass) — snow tubing! ~$20-30/pessoa",
                "type": "highlight"
            },
            {
                "time": "17:30",
                "text": "🚗 Volta pra Mariposa (~45 min)",
                "type": "drive"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Savoury's</strong> (5034 Hwy 140, Mariposa) — cozinha americana eclética. ~$20-25/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "❄️ Yosemite nevado em janeiro é LINDO! Menos turistas, silêncio, neve nos picos.",
            "⛷️ Snow tubing em Badger Pass: aberto inverno, ~$20/pessoa, kids adoram!"
        ]
    },
    {
        "photo": "img/activities/badger_pass.jpg",
        "shortLoc": "Yosemite",
        "location": "Yosemite NP dia 2 — Neve!",
        "route": "Snow tubing + snowshoeing + despedida! ⛷️",
        "note": "Snow tubing de manhã, trilhas à tarde. Último dia em Yosemite!",
        "region": "ca",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café em Mariposa",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🚗 Drive → Yosemite",
                "type": "drive"
            },
            {
                "time": "09:00",
                "text": "⛷️ <strong>Yosemite Ski & Snowboard Area</strong> (Badger Pass) — snow tubing! ~$20-30/pessoa",
                "type": "highlight"
            },
            {
                "time": "11:00",
                "text": "🏔️ Snowshoeing guiado pelo ranger (grátis, ~2h)",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço no Yosemite Valley",
                "type": "food"
            },
            {
                "time": "13:45",
                "text": "🪞 <strong>Sentinel Bridge</strong> — reflexo do Half Dome no rio Merced, melhor luz do meio-dia à tarde!",
                "type": "highlight"
            },
            {
                "time": "14:30",
                "text": "🥾 <strong>Swinging Bridge</strong> + <strong>Sentinel Meadow</strong> — luz da tarde nos picos",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "📸 Revisitar favoritos — luz diferente da tarde!",
                "type": ""
            },
            {
                "time": "17:15",
                "text": "🌅 Sunset no <strong>Tunnel View</strong> — luz dourada!",
                "type": "highlight"
            },
            {
                "time": "17:30",
                "text": "🚗 Volta pra Mariposa",
                "type": "drive"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar de despedida — <strong>Castillo's Mexican Food</strong> (4995 5th St, Mariposa) — enchiladas verdes. ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⛷️ Snow tubing em Badger Pass: aberto inverno, ~$20/pessoa, kids adoram!"
        ]
    },
    {
        "photo": "img/activities/embarcadero_sf.jpg",
        "shortLoc": "SF",
        "chargeStops": [
            {
                "name": "Merced, CA",
                "leg": "Mariposa → SF",
                "critical": false
            }
        ],
        "location": "Mariposa → San Francisco",
        "route": "Serra Nevada → SF! 🌉",
        "note": "Drive de Mariposa até SF. Chegada à tarde, explorar North Beach.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café + check-out de Mariposa",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚗 Drive Mariposa → SF (~280 km, ~3.5h via CA-140 → CA-99 → I-580)",
                "type": "drive"
            },
            {
                "time": "10:00",
                "text": "⚡ <strong>Supercharger Merced, CA</strong> (~100 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "~12:00",
                "text": "🏨 Chegada em <strong>San Francisco</strong>! Check-in",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço — <strong>Tony's Pizza Napoletana</strong> (1570 Stockton St, North Beach) — campeão mundial de pizza. ~$20-25/pessoa",
                "type": "food"
            },
            {
                "time": "14:30",
                "text": "🌆 <strong>Lombard Street</strong> — a rua mais sinuosa do mundo!",
                "type": ""
            },
            {
                "time": "15:00",
                "text": "🚋 Passeio de <strong>Cable Car</strong>. $8/pessoa/viagem",
                "type": "highlight"
            },
            {
                "time": "16:00",
                "text": "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA!",
                "type": "highlight"
            },
            {
                "time": "17:00",
                "text": "🎮 <strong>Nintendo San Francisco</strong> (Union Square) — entrada livre!",
                "type": "highlight"
            },
            {
                "time": "18:30",
                "text": "🍽️ Jantar — <strong>Fog Harbor Fish House</strong> (Pier 39) — frutos do mar com vista pra Baía. ~$20-28/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/golden_gate_bridge.jpg",
        "shortLoc": "SF",
        "location": "San Francisco — Golden Gate + Pier 39",
        "route": "Golden Gate + Fisherman's Wharf! 🌉🐋",
        "note": "Golden Gate de todos os ângulos! Battery Spencer, ponte, waterfront e Point Reyes.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🏞️ <strong>Battery Spencer</strong> — vista icônica da Golden Gate!",
                "type": "highlight"
            },
            {
                "time": "08:50",
                "text": "📸 <strong>Golden Gate Overlook</strong> (Langdon Ct) — segundo ponto de vista em SF lado, Marin Headlands!",
                "type": ""
            },
            {
                "time": "09:15",
                "text": "🌉 <strong>Golden Gate Bridge</strong> — caminhar pela ponte!",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "🏰 <strong>Fort Point</strong> — cenário de Vertigo!",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🌅 <strong>Crissy Field</strong> — vista da Golden Gate!",
                "type": ""
            },
            {
                "time": "11:30",
                "text": "🏖️ <strong>Fisherman's Wharf</strong> — Ghirardelli Square, barcos históricos",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🏖️ <strong>Pier 39</strong> — leões-marinhos!",
                "type": "highlight"
            },
            {
                "time": "12:30",
                "text": "🍽️ Almoço — clam chowder no <strong>Boudin Bakery</strong> (Pier 39)",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "🐋 <strong>Point Reyes</strong> — Elk Preserve, Lighthouse, <strong>Cypress Tree Tunnel</strong> + <strong>baleias cinzentas!</strong> (migração jan-abr!)",
                "type": "highlight"
            },
            {
                "time": "17:00",
                "text": "🚗 Volta pra SF (~1h30)",
                "type": "drive"
            },
            {
                "time": "18:45",
                "text": "🍽️ Jantar — <strong>Burma Superstar</strong> (309 Clement St) — birmanês premiado, tea leaf salad. ~$15-22/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/pier_39.jpg",
        "shortLoc": "SF",
        "location": "San Francisco — Embarcadero + Ocean Beach",
        "route": "Ferry Building + Ocean Beach! 🌊",
        "note": "Último dia em SF! Embarcadero, Ocean Beach, Haight-Ashbury e Golden Gate Park.",
        "region": "ca",
        "items": [
            {
                "time": "09:00",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "09:30",
                "text": "🌆 <strong>Embarcadero</strong> — Ferry Building, mercado gourmet!",
                "type": ""
            },
            {
                "time": "10:30",
                "text": "🌸 <strong>Painted Ladies</strong> — casas vitorianas icônicas!",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🎸 <strong>Haight-Ashbury</strong> — berço do Summer of Love!",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço — <strong>La Taqueria</strong> (Mission District)",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "🏖️ <strong>Ocean Beach</strong> — praia do Pacífico",
                "type": ""
            },
            {
                "time": "14:30",
                "text": "🌳 <strong>Golden Gate Park</strong> — Japanese Tea Garden, Conservatory of Flowers",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🚗 Volta pro centro de SF",
                "type": "drive"
            },
            {
                "time": "18:30",
                "text": "🍽️ Jantar de despedida de SF",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/avenue_of_the_giants.jpg",
        "shortLoc": "Eureka",
        "chargeStops": [
            {
                "name": "Leggett, CA",
                "leg": "SF → Eureka",
                "critical": false
            }
        ],
        "location": "San Francisco → Eureka",
        "route": "Avenue of the Giants + rumo ao norte! 🌲",
        "note": "Subindo de SF até Eureka via Avenue of the Giants.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café + check-out de SF",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚗 Saída rumo norte via US-101 (~400 km, ~5h)",
                "type": "drive"
            },
            {
                "time": "11:00",
                "text": "⚡ <strong>Supercharger Leggett, CA</strong> — ~30 min",
                "type": "charge"
            },
            {
                "time": "12:30",
                "text": "🌲 <strong>Avenue of the Giants</strong> — 50 km entre redwoods!",
                "type": "highlight"
            },
            {
                "time": "13:30",
                "text": "🍽️ Almoço em Garberville/Redway",
                "type": "food"
            },
            {
                "time": "~15:30",
                "text": "🏨 Chegada em <strong>Eureka</strong>! Check-in",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🏙️ <strong>Old Town Eureka</strong> — <strong>Carson Mansion</strong>",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "🍽️ Jantar — <strong>Lost Coast Brewery & Cafe</strong> (617 4th St, Eureka) — cervejaria artesanal, burgers e fish tacos. ~$15-20/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/fern_canyon.jpg",
        "shortLoc": "Redwood",
        "location": "Eureka → Redwood NP → Crescent City",
        "route": "Jedediah Smith + Fern Canyon + Tall Trees! 🌲",
        "note": "Dia cheio de Redwood subindo ao norte — Fern Canyon, Tall Trees e Jedediah Smith!",
        "region": "ca",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Eureka",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🦌 <strong>Elk Meadow</strong> (Orick) — manada de Roosevelt elk pastando!",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km)",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚗 <strong>Prairie Creek Redwoods SP</strong> — drive-through entre redwoods gigantes",
                "type": "drive"
            },
            {
                "time": "08:45",
                "text": "🌊 <strong>Gold Bluffs Beach</strong>",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "🥾 <strong>Fern Canyon</strong> (~1.5 km) — samambaias! <strong>Jurassic Park 2</strong>!",
                "type": "highlight"
            },
            {
                "time": "09:45",
                "text": "📸 <strong>Big Tree Wayside</strong>",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🌲 <em>Opcional:</em> <strong>Tall Trees Grove</strong> (~5 km, ~2h). ⚠️ Permit no Info Center",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "🍽️ Almoço em Orick",
                "type": "food"
            },
            {
                "time": "12:30",
                "text": "🚗 <strong>Newton B. Drury Scenic Parkway</strong> — estrada entre redwoods",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🌲 <strong>Del Norte Coast Redwoods SP</strong> — costa selvagem entre redwoods!",
                "type": "highlight"
            },
            {
                "time": "14:00",
                "text": "🌲 <strong>Jedediah Smith Redwoods SP</strong> — <strong>Stout Memorial Grove Trail</strong> (~1 km)",
                "type": "highlight"
            },
            {
                "time": "14:30",
                "text": "🥾 <strong>Simpson-Reed Trail</strong> (~1 km loop) — trilha pavimentada entre old-growth redwoods!",
                "type": ""
            },
            {
                "time": "14:45",
                "text": "🚗 <strong>Howland Hill Road</strong> — estrada de terra entre redwoods enormes",
                "type": ""
            },
            {
                "time": "15:15",
                "text": "📸 <strong>Thomas H. Kuchel Visitor Center</strong> — último mirante da Redwood NP",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "🏨 Chegada em <strong>Crescent City</strong>! Check-in",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🏝️ <strong>Battery Point Lighthouse</strong> — ilha acessível na maré baixa!",
                "type": ""
            },
            {
                "time": "~17:15",
                "text": "🌅 Pôr do sol no porto de Crescent City",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "🍽️ Jantar — <strong>Fisherman's Restaurant</strong> (700 US-101 S) — Dungeness crab e halibut. ~$15-22/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Fern Canyon: Davison Road (terra, 10 km) pode fechar com chuva. Ligar pro Visitors Center: (707) 464-6101."
        ]
    },
    {
        "photo": "img/activities/samuel_boardman.jpg",
        "shortLoc": "Oregon",
        "chargeStops": [
            {
                "name": "Coos Bay, OR",
                "leg": "Crescent City → Coos Bay",
                "critical": false
            }
        ],
        "location": "Crescent City → Coos Bay",
        "route": "Samuel Boardman + Cape Sebastian rumo a Coos Bay! 🌊",
        "note": "Costa sul do Oregon — Brookings, Gold Beach, Port Orford até Coos Bay.",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Crescent City",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Saída rumo norte pela US-101 N",
                "type": "drive"
            },
            {
                "time": "07:45",
                "text": "🌊 <strong>Jerry's Rogue Jets</strong> (opcional, passagem por Gold Beach) — passeio de barco pelo Rogue River, se der tempo!",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "📸 <strong>Samuel Boardman Scenic Corridor</strong> — mirantes incríveis!",
                "type": "highlight"
            },
            {
                "time": "08:15",
                "text": "📸 <strong>Arch Rock Viewpoint</strong>",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "📸 <strong>Natural Bridges Viewpoint</strong>",
                "type": "highlight"
            },
            {
                "time": "09:00",
                "text": "🏖️ <strong>Cape Sebastian</strong> — mirante épico sobre o Pacífico!",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "🍽️ Almoço em <strong>Port Orford/Bandon</strong>",
                "type": "food"
            },
            {
                "time": "12:00",
                "text": "🚗 Rumo a Coos Bay via US-101 N",
                "type": "drive"
            },
            {
                "time": "13:00",
                "text": "⚡ <strong>Supercharger Coos Bay, OR</strong> — ~25 min",
                "type": "charge"
            },
            {
                "time": "13:30",
                "text": "🏨 Chegada em <strong>Coos Bay</strong>! Check-in",
                "type": ""
            },
            {
                "time": "14:30",
                "text": "📸 <strong>Shore Acres State Park</strong> (Charleston) — jardins sobre penhascos!",
                "type": "highlight"
            },
            {
                "time": "16:00",
                "text": "🏖️ <strong>Simpson Reef Overlook</strong> — leões-marinhos nas rochas!",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar em <strong>Coos Bay/Charleston</strong> — frutos do mar locais. ~$18-25/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌊 Crescent City → Coos Bay: costa sul do Oregon, ~280 km com paradas espetaculares.",
            "🐟 Charleston (perto de Coos Bay) tem o melhor frescor de peixe da costa."
        ]
    },
    {
        "photo": "img/activities/thor_s_well.jpg",
        "shortLoc": "Oregon",
        "chargeStops": [
            {
                "name": "Lincoln City, OR",
                "leg": "Coos Bay → Cannon Beach",
                "critical": false
            }
        ],
        "location": "Coos Bay → Cannon Beach",
        "route": "Thor's Well + Heceta Head rumo a Cannon Beach! 🌊",
        "note": "Continuando a costa do Oregon rumo norte — Reedsport, Florence, Yachats até Cannon Beach.",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Coos Bay",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Saída rumo norte pela US-101 N",
                "type": "drive"
            },
            {
                "time": "08:00",
                "text": "🦌 <strong>Dean Creek Elk Viewing Area</strong> (Reedsport) — manada de Roosevelt elk selvagens!",
                "type": "highlight"
            },
            {
                "time": "08:45",
                "text": "🚗 Rumo a Florence",
                "type": "drive"
            },
            {
                "time": "09:15",
                "text": "🏖️ <strong>Heceta Head Lighthouse</strong> — farol icônico!",
                "type": "highlight"
            },
            {
                "time": "10:15",
                "text": "📸 <strong>Cape Perpetua + Thor's Well</strong> (Yachats) — gêiser natural!",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "🍽️ Almoço em <strong>Newport</strong>",
                "type": "food"
            },
            {
                "time": "13:00",
                "text": "⚡ <strong>Supercharger Lincoln City, OR</strong> — ~25 min",
                "type": "charge"
            },
            {
                "time": "13:30",
                "text": "🚗 Rumo norte via US-101 N",
                "type": "drive"
            },
            {
                "time": "17:00",
                "text": "🏨 Chegada em <strong>Cannon Beach</strong>! Check-in",
                "type": ""
            },
            {
                "time": "17:30",
                "text": "📸 <strong>Haystack Rock</strong> — ícone de Oregon!",
                "type": "highlight"
            },
            {
                "time": "18:00",
                "text": "🌅 Pôr do sol em Cannon Beach — ESPETACULAR!",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Ecola Seafood Restaurant</strong> (208 N Spruce St) — Dungeness crab. ~$20-25/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌅 Chegada em Cannon Beach a tempo do pôr do sol!"
        ]
    },
    {
        "photo": "img/activities/astoria.jpg",
        "shortLoc": "Olympic",
        "chargeStops": [
            {
                "name": "Centralia, WA",
                "leg": "Cannon Beach → Forks",
                "critical": false
            },
            {
                "name": "Aberdeen, WA",
                "leg": "Cannon Beach → Forks",
                "critical": false
            }
        ],
        "location": "Cannon Beach → Astoria → Forks",
        "route": "Goonies + Kurt Cobain + rumo a Forks! 🌊🧛",
        "note": "Astoria de manhã, depois subindo até Forks via Aberdeen.",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Cannon Beach",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🌊 <strong>Ecola State Park</strong> — mirante espetacular!",
                "type": "highlight"
            },
            {
                "time": "08:15",
                "text": "🚗 Rumo a <strong>Astoria</strong> (~40 km, ~40 min)",
                "type": "drive"
            },
            {
                "time": "09:00",
                "text": "🌊 <strong>Astoria</strong> — cenário de <strong>The Goonies</strong>! Astoria Column!",
                "type": "highlight"
            },
            {
                "time": "09:30",
                "text": "🚢 <strong>Peter Iredale Shipwreck</strong> — naufrágio de 1906 na praia!",
                "type": "highlight"
            },
            {
                "time": "10:00",
                "text": "🏖️ <strong>Cape Disappointment</strong> — farol no encontro do Columbia com o Pacífico!",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🚗 Rumo norte via US-101 N",
                "type": "drive"
            },
            {
                "time": "12:30",
                "text": "⚡ <strong>Supercharger Centralia, WA</strong> — ~20 min",
                "type": "charge"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço em Centralia/Olympia",
                "type": "food"
            },
            {
                "time": "15:00",
                "text": "⚡ <strong>Supercharger Aberdeen, WA</strong> — ~25 min",
                "type": "charge"
            },
            {
                "time": "15:30",
                "text": "🎸 <strong>Kurt Cobain Memorial</strong> — placa 'Come As You Are' + memorial do Nirvana!",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🌳 <strong>Kalaloch Tree of Life</strong> — árvore com raízes expostas sobre caverna!",
                "type": ""
            },
            {
                "time": "17:30",
                "text": "🏨 Check-in em <strong>Forks</strong>",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "🧛 Tour Crepúsculo! Forks High School + Casa da Bella Swan",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Pacific Pizza & Pasta</strong> (70 N Forks Ave) — favorita dos moradores. ~$12-18/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/hoh_rain_forest.jpg",
        "shortLoc": "Olympic",
        "location": "Olympic NP — Hoh Rain Forest 🌲",
        "route": "Floresta tropical temperada!",
        "note": "Dia dedicado ao interior de Olympic — Hoh Rain Forest e trilhas de floresta.",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café em Forks",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🌲 <strong>Hoh Rain Forest</strong> — floresta tropical temperada!",
                "type": "highlight"
            },
            {
                "time": "08:00",
                "text": "🥾 <strong>Hall of Mosses Trail</strong> (~1.3 km) — musgos pendurados!",
                "type": "highlight"
            },
            {
                "time": "09:00",
                "text": "🥾 <strong>Spruce Nature Trail</strong> (~2 km)",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço em Forks",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "♨️ <strong>Sol Duc Hot Springs</strong> — piscinas termais naturais!",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>The In Place</strong> (320 S Forks Ave, Forks) — diner clássico americano. ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌲 Dia mais tranquilo, dedicado à floresta tropical — bom pra descansar antes do dia de praias."
        ]
    },
    {
        "photo": "img/activities/hoh_rain_forest.jpg",
        "shortLoc": "Olympic",
        "location": "Olympic NP — Costa 🌊",
        "route": "Ruby Beach + La Push + Rialto Beach!",
        "note": "Dia dedicado à costa selvagem de Olympic — sea stacks, praias e pôr do sol.",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café em Forks",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🌊 <strong>Ruby Beach</strong> — sea stacks!",
                "type": "highlight"
            },
            {
                "time": "08:45",
                "text": "🧪 Tidepools — estrelas-do-mar! ⚠️ Inverno: ondas fortes, observar de longe",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço em Forks",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km) — cachoeira linda!",
                "type": "highlight"
            },
            {
                "time": "15:00",
                "text": "🌊 <strong>La Push / First Beach</strong> — praia dos Quileute (Twilight!)",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🌊 <strong>Rialto Beach</strong> — sea stacks e troncos",
                "type": ""
            },
            {
                "time": "17:30",
                "text": "🌅 Pôr do sol em <strong>Second Beach</strong> — último sunset no PNW!",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar em Forks",
                "type": "food"
            }
        ],
        "tips": [
            "🌊 Dia mais cheio de praias — comece cedo pra aproveitar bem La Push e Rialto antes do pôr do sol."
        ]
    },
    {
        "photo": "img/activities/columbia_river_gorge.jpg",
        "shortLoc": "Pendleton",
        "chargeStops": [
            {
                "name": "Olympia, WA",
                "leg": "Forks → Pendleton",
                "critical": true,
                "note": "⚠️ CARREGAR ATÉ 100% — trecho longo até Pendleton sem outro SC!"
            },
            {
                "name": "Pendleton, OR",
                "leg": "Forks → Pendleton",
                "critical": false
            }
        ],
        "location": "Forks → Pendleton",
        "route": "Rumo ao Columbia River Gorge! 🌲",
        "note": "Saindo de Forks, direto pra Pendleton via Olympia e o Columbia River Gorge (parada rápida em The Dalles no meio do caminho).",
        "region": "pnw",
        "items": [
            {
                "time": "06:00",
                "text": "☕ Café + check-out de Forks",
                "type": ""
            },
            {
                "time": "06:30",
                "text": "🚗 Rumo a <strong>Olympia</strong> (~255 km, ~3.5h via US-101 S)",
                "type": "drive"
            },
            {
                "time": "09:45",
                "text": "⚡ <strong>Supercharger Olympia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~35 min)",
                "type": "charge"
            },
            {
                "time": "10:20",
                "text": "🍽️ Almoço rápido em Olympia",
                "type": "food"
            },
            {
                "time": "11:00",
                "text": "🚗 Rumo a <strong>The Dalles</strong> (~250 km, ~3h via I-5 S → I-84 E)",
                "type": "drive"
            },
            {
                "time": "14:15",
                "text": "🌲 <strong>Multnomah Falls</strong> — cachoeira icônica de 189m!",
                "type": "highlight"
            },
            {
                "time": "14:45",
                "text": "🏛️ <strong>Vista House at Crown Point</strong> — vista 270° do Gorge!",
                "type": "highlight"
            },
            {
                "time": "15:30",
                "text": "☕ Parada rápida em <strong>The Dalles</strong> — café antes de seguir viagem",
                "type": "food"
            },
            {
                "time": "16:15",
                "text": "🚗 Rumo a <strong>Pendleton</strong> (~290 km, ~3h via I-84 E)",
                "type": "drive"
            },
            {
                "time": "18:15",
                "text": "⚡ <strong>Supercharger Pendleton, OR</strong> — ~20 min",
                "type": "charge"
            },
            {
                "time": "18:45",
                "text": "🏨 Chegada em <strong>Pendleton</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:30",
                "text": "🍽️ Jantar — <strong>Hamley Steakhouse</strong> (30 SE Court Ave, Pendleton) — steakhouse western clássico. ~$20-30/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌲 Dia mais longo agora (~800 km) — Columbia Gorge de manhã, The Dalles vira parada rápida no meio do caminho.",
            "⚡ Supercharger Olympia obrigatório — carregar até 100%."
        ]
    },
    {
        "photo": "img/activities/shoshone_falls.jpg",
        "shortLoc": "Twin Falls",
        "chargeStops": [
            {
                "name": "Baker City, OR",
                "leg": "Pendleton → Twin Falls",
                "critical": false
            }
        ],
        "location": "Pendleton → Twin Falls",
        "route": "Blue Mountains + Shoshone Falls! 🏔️💧",
        "note": "I-84 leste até Twin Falls — Blue Mountains logo de manhã, Shoshone Falls no final!",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Pendleton",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Saída via I-84 E (~560 km, ~6h)",
                "type": "drive"
            },
            {
                "time": "08:00",
                "text": "📸 <strong>Deadman Pass Overlook</strong> — mirante nas Blue Mountains!",
                "type": "highlight"
            },
            {
                "time": "10:00",
                "text": "⚡ <strong>Supercharger Baker City, OR</strong> (~90 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "10:30",
                "text": "🍽️ Almoço em Baker City",
                "type": "food"
            },
            {
                "time": "15:00",
                "text": "🌊 <strong>Shoshone Falls</strong> — 'Niágara do Oeste'! 65m de queda!",
                "type": "highlight"
            },
            {
                "time": "15:35",
                "text": "📸 <strong>Perrine Bridge</strong> — ponte sobre o Snake River Canyon!",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🏨 Chegada em <strong>Twin Falls</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Cracker Barrel</strong> (1357 Blue Lakes Blvd N) — comfort food americano. ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌲 Dia mais tranquilo (~560 km) — Blue Mountains logo de manhã, chegada cedo em Twin Falls."
        ]
    },
    {
        "photo": "img/activities/antelope_island.jpg",
        "shortLoc": "Moab",
        "chargeStops": [
            {
                "name": "Twin Falls, ID",
                "leg": "Twin Falls → Moab",
                "critical": false
            },
            {
                "name": "Salt Lake City, UT",
                "leg": "Twin Falls → Moab",
                "critical": false
            },
            {
                "name": "Price, UT",
                "leg": "Twin Falls → Moab",
                "critical": false
            },
            {
                "name": "Green River, UT",
                "leg": "Twin Falls → Moab",
                "critical": false
            }
        ],
        "location": "Twin Falls → Salt Lake City → Moab",
        "route": "Longa jornada rumo ao deserto! 🏜️",
        "note": "Dia longo de transição — Twin Falls até Moab via SLC (~770 km com FSD).",
        "region": "ut",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Twin Falls",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Saída rumo sul via I-84 W → I-86 → I-15 S (~770 km total)",
                "type": "drive"
            },
            {
                "time": "10:00",
                "text": "⚡ <strong>Supercharger Salt Lake City area</strong> (~250 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "10:30",
                "text": "🦬 <strong>Antelope Island SP</strong> — bisões selvagens + Great Salt Lake!",
                "type": "highlight"
            },
            {
                "time": "11:15",
                "text": "📸 <strong>Buffalo Point</strong> — mirante 360°",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço em SLC",
                "type": "food"
            },
            {
                "time": "13:00",
                "text": "🚗 I-15 S → US-6 → I-70 E rumo a Moab",
                "type": "drive"
            },
            {
                "time": "14:30",
                "text": "⚡ <strong>Supercharger Price, UT</strong> (~200 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "15:30",
                "text": "🏜️ <strong>San Rafael Swell</strong> (I-70) — paredões dramáticos!",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "⚡ <strong>Supercharger Green River, UT</strong> (~100 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "~17:30",
                "text": "🏨 Chegada em <strong>Moab</strong>! Check-in",
                "type": ""
            },
            {
                "time": "18:15",
                "text": "🍽️ Jantar — <strong>Moab Brewery</strong> (686 S Main St) — cervejaria local, burger e nachos. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Dia mais longo do trip (~770 km, sai 07:00 chega ~17:30). FSD ajuda.",
            "🦬 Antelope Island mantido — bisão selvagem visto pela 1ª vez na viagem."
        ]
    },
    {
        "photo": "img/activities/grand_view_point.jpg",
        "shortLoc": "Moab",
        "location": "Canyonlands NP dia cheio 🏜️",
        "route": "Island in the Sky — cânions infinitos!",
        "note": "Mesa Arch ao nascer do sol — o sol nasce ATRAVÉS do arco!",
        "region": "ut",
        "items": [
            {
                "time": "06:30",
                "text": "☕ Café cedo",
                "type": ""
            },
            {
                "time": "07:00",
                "text": "🚗 Saída pra <strong>Canyonlands — Island in the Sky</strong> (~40 min)",
                "type": "drive"
            },
            {
                "time": "07:30",
                "text": "🌅 <strong>Mesa Arch</strong> ao nascer do sol — o arco mais fotografado de Utah!",
                "type": "highlight"
            },
            {
                "time": "08:30",
                "text": "📸 <strong>Grand View Point</strong> — cânions infinitos!",
                "type": "highlight"
            },
            {
                "time": "09:15",
                "text": "📸 <strong>Green River Overlook</strong>",
                "type": ""
            },
            {
                "time": "09:45",
                "text": "🏞️ <strong>Shafer Canyon Overlook</strong>",
                "type": ""
            },
            {
                "time": "10:15",
                "text": "📸 <strong>Buck Canyon + White Rim Overlook</strong>",
                "type": ""
            },
            {
                "time": "11:30",
                "text": "🥾 <strong>Upheaval Dome Trail</strong> (~2.5 km)",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🍽️ Picnic no parque",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🥾 <strong>Aztec Butte Trail</strong> (~3 km)",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🌅 Pôr do sol no <strong>Grand View Point</strong>",
                "type": "highlight"
            },
            {
                "time": "17:45",
                "text": "📸 <strong>Petroglifos na Potash Road</strong>",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "📸 <strong>Thelma & Louise Point</strong>",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Pasta Jay's</strong> (4 S 100 W, Moab) — italiano caseiro. ~$15-20/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/delicate_arch.jpg",
        "shortLoc": "Moab",
        "location": "Arches NP + Dead Horse Point",
        "route": "Delicate Arch + Dead Horse Point sunset! 🏜️",
        "note": "O arco mais famoso do mundo + pôr do sol na vista sobre o Colorado!",
        "region": "ut",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🏞️ Entrada em <strong>Arches NP</strong>",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🥾 <strong>Delicate Arch Trail</strong> (~5 km, ~2-3h) — o arco mais famoso!",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "📸 <strong>Windows Section</strong> — North/South Window, Turret Arch",
                "type": ""
            },
            {
                "time": "11:30",
                "text": "📸 <strong>Double Arch</strong>",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "📸 <strong>Balanced Rock</strong>",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🍽️ Almoço",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🥾 <strong>Devils Garden Trail → Landscape Arch</strong> (~3 km)",
                "type": "highlight"
            },
            {
                "time": "15:30",
                "text": "🏜️ <strong>Fiery Furnace Viewpoint + Park Avenue</strong>",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🚗 Saída de Arches rumo a <strong>Dead Horse Point State Park</strong> (~30 min)",
                "type": "drive"
            },
            {
                "time": "17:00",
                "text": "🌅 <strong>Pôr do sol em Dead Horse Point</strong> — mirante icônico sobre o Colorado River (~180m acima do rio)",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar de despedida de Moab — <strong>Spoke on Center</strong> (702 S Main St) — bistrô local. ~$12-18/pessoa",
                "type": "food"
            },
            {
                "time": "20:15",
                "text": "🌌 <strong>Passeio noturno no Colorado River</strong> (Scenic Byway 128) — despedida de Moab",
                "type": ""
            }
        ]
    },
    {
        "photo": "img/activities/bryce_canyon.jpg",
        "shortLoc": "Bryce",
        "chargeStops": [
            {
                "name": "Green River, UT",
                "leg": "Moab → Bryce",
                "critical": false
            },
            {
                "name": "Salina, UT",
                "leg": "Moab → Bryce",
                "critical": false
            }
        ],
        "location": "Moab → Capitol Reef → Bryce",
        "route": "Petroglífos + hoodoos ao pôr do sol! 🏔️",
        "note": "Saindo de Moab rumo oeste, passando por Capitol Reef até Bryce Canyon.",
        "region": "ut",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Moab",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Saída rumo oeste via I-70 W (~490 km total)",
                "type": "drive"
            },
            {
                "time": "09:00",
                "text": "⚡ <strong>Supercharger Green River, UT</strong> (~100 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "09:30",
                "text": "🏜️ <strong>San Rafael Swell</strong> (I-70) — paredões dramáticos!",
                "type": ""
            },
            {
                "time": "10:30",
                "text": "⚡ <strong>Supercharger Salina, UT</strong> (~130 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "11:30",
                "text": "🏜️ <strong>Capitol Reef NP</strong> — petroglífos Fremont + Hickman Bridge!",
                "type": "highlight"
            },
            {
                "time": "12:15",
                "text": "🥾 <strong>Hickman Bridge Trail</strong> (~2.8 km, ~1h) — arco natural!",
                "type": "highlight"
            },
            {
                "time": "13:15",
                "text": "🍽️ Almoço (levar lanche)",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🚗 Capitol Reef → Bryce Canyon via UT-12 (~180 km, ~2.5h)",
                "type": "drive"
            },
            {
                "time": "14:45",
                "text": "🌄 <strong>Head of the Rocks Overlook</strong> — vista épica de Escalante!",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🏨 Chegada em <strong>Bryce Canyon</strong>! Check-in",
                "type": ""
            },
            {
                "time": "~17:30",
                "text": "🌅 <strong>Pôr do sol no Bryce Amphitheater</strong>",
                "type": "highlight"
            },
            {
                "time": "18:15",
                "text": "🍽️ Jantar — <strong>Cowboy's Smokehouse BBQ</strong> (95 N Main St, Panguitch) — BBQ defumado. ~$15-20/pessoa",
                "type": "food"
            },
            {
                "time": "19:30",
                "text": "🌌 <strong>Stargazing em Bryce!</strong> — International Dark Sky Park!",
                "type": "highlight"
            }
        ],
        "tips": [
            "🔭 Bryce é um dos melhores céus escuros do MUNDO!"
        ]
    },
    {
        "photo": "img/activities/watchman_trail.jpg",
        "shortLoc": "Zion",
        "location": "Bryce → Zion (Springdale)",
        "route": "Hoodoos ao nascer do sol + rumo a Zion! 🏞️",
        "note": "Nascer do sol em Bryce, trilhas, depois estrada até Zion à tarde!",
        "region": "ut",
        "items": [
            {
                "time": "06:30",
                "text": "☕ Café cedo",
                "type": ""
            },
            {
                "time": "07:00",
                "text": "🌅 <strong>Nascer do sol no Bryce Amphitheater</strong> — hoodoos dourados!",
                "type": "highlight"
            },
            {
                "time": "07:45",
                "text": "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h)",
                "type": "highlight"
            },
            {
                "time": "09:45",
                "text": "🥾 <strong>Mossy Cave Trail</strong> (~1.5 km, ~30 min) — cascata congelada!",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "📸 <strong>Sunrise/Sunset Point + Fairyland Point</strong>",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🚗 <strong>Scenic Drive</strong> — Inspiration Point, Natural Bridge, Rainbow Point",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço rápido",
                "type": "food"
            },
            {
                "time": "12:30",
                "text": "🚗 Check-out + saída pra <strong>Zion</strong> (~130 km, ~1.5h)",
                "type": "drive"
            },
            {
                "time": "13:00",
                "text": "🛣️ <strong>Red Canyon</strong> — arcos vermelhos na estrada!",
                "type": ""
            },
            {
                "time": "14:00",
                "text": "🏨 Chegada em <strong>Springdale</strong>! Check-in",
                "type": ""
            },
            {
                "time": "14:30",
                "text": "🚗 Dirigir pra <strong>Zion Canyon</strong> (sem shuttle no inverno!)",
                "type": "drive"
            },
            {
                "time": "15:00",
                "text": "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km)",
                "type": ""
            },
            {
                "time": "16:30",
                "text": "🏔️ <strong>Court of the Patriarchs</strong> — mirantes rápidos",
                "type": ""
            },
            {
                "time": "~17:30",
                "text": "🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong>",
                "type": "highlight"
            },
            {
                "time": "18:15",
                "text": "🍽️ Jantar — <strong>Oscar's Cafe</strong> (948 Zion Park Blvd, Springdale). ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🔭 Bryce é um dos melhores céus escuros do MUNDO!",
            "☀️ Dia apertado (Bryce inteiro + drive + Zion sunset). Sair de Bryce às 12:30 garante chegar a tempo."
        ]
    },
    {
        "photo": "img/activities/canyon_overlook.jpg",
        "shortLoc": "Zion",
        "location": "Zion NP dia cheio → Page",
        "route": "Trilhas épicas + Horseshoe Bend! 🏞️🏜️",
        "note": "Dia cheio em Zion! Depois estrada até Page para Horseshoe Bend.",
        "region": "ut",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café em Springdale",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🥾 <strong>Watchman Trail</strong> (~5 km, ~2h) — vista panorâmica!",
                "type": "highlight"
            },
            {
                "time": "09:30",
                "text": "🥾 <strong>Canyon Overlook Trail</strong> (~1.6 km, ~1h) — vista incrível!",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "🥾 <strong>Riverside Walk</strong> (~3.5 km) — trilha ao longo do rio Virgin!",
                "type": ""
            },
            {
                "time": "11:30",
                "text": "🍽️ Almoço em Springdale",
                "type": "food"
            },
            {
                "time": "12:30",
                "text": "🏁 <strong>Checkerboard Mesa</strong> — arenito com padrão xadrez!",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🚗 Check-out + saída pra <strong>Page, AZ</strong> (~170 km, ~2h via US-89)",
                "type": "drive"
            },
            {
                "time": "15:00",
                "text": "🏨 Chegada em <strong>Page</strong>! Check-in",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "🏜️ <strong>Horseshoe Bend</strong> — mirante sobre o meandro do Colorado! Gratuito",
                "type": "highlight"
            },
            {
                "time": "16:15",
                "text": "🏜️ <strong>Page Sand Cave</strong> — caverna de arenito com luz incrível!",
                "type": "highlight"
            },
            {
                "time": "~17:15",
                "text": "🌅 Pôr do sol em Horseshoe Bend — ESPETACULAR!",
                "type": "highlight"
            },
            {
                "time": "18:30",
                "text": "🍽️ Jantar — <strong>Big John's Texas BBQ</strong> (153 S Lake Powell Blvd, Page) — brisket e pulled pork. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "📸 Horseshoe Bend: melhor luz de tarde (sol ilumina o canyon).",
            "🌅 Pôr do sol em Horseshoe Bend é um dos melhores do trip!"
        ]
    },
    {
        "photo": "img/activities/grand_canyon.jpg",
        "shortLoc": "Vegas",
        "chargeStops": [
            {
                "name": "Flagstaff, AZ",
                "leg": "Page → Vegas",
                "critical": false
            },
            {
                "name": "Kingman, AZ",
                "leg": "Page → Vegas",
                "critical": false
            }
        ],
        "location": "Page → Grand Canyon → Las Vegas",
        "route": "Grand Canyon + rumo a Vegas! 🏜️🎰",
        "note": "Grand Canyon de manhã, depois longa estrada até Las Vegas (~660 km).",
        "region": "nv",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + check-out de Page",
                "type": ""
            },
            {
                "time": "07:30",
                "text": "🚗 Saída rumo ao <strong>Grand Canyon South Rim</strong> (~210 km, ~2.5h via US-89 S → AZ-64)",
                "type": "drive"
            },
            {
                "time": "09:00",
                "text": "⚡ <strong>Supercharger Flagstaff, AZ</strong> (~150 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "10:30",
                "text": "🏞️ <strong>Grand Canyon South Rim</strong> — chegada!",
                "type": "highlight"
            },
            {
                "time": "11:00",
                "text": "📸 <strong>Mather Point</strong> — primeiro mirante!",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "📸 <strong>Yavapai Point + Geology Museum</strong>",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "📸 <strong>Rim Trail</strong> — caminhar pela borda (~30 min)",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "📸 <strong>Hopi Point</strong> — um dos melhores mirantes!",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço no <strong>Grand Canyon Village</strong>",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🚗 Saída rumo a <strong>Las Vegas</strong> (~340 km, ~3.5h via AZ-64 → I-40 W → US-93 S)",
                "type": "drive"
            },
            {
                "time": "15:30",
                "text": "⚡ <strong>Supercharger Kingman, AZ</strong> (~200 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "~18:00",
                "text": "🎰 Chegada em <strong>Las Vegas</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "📸 <strong>Welcome to Las Vegas Sign</strong> — foto icônica à noite!",
                "type": "highlight"
            },
            {
                "time": "19:30",
                "text": "🍽️ Jantar — <strong>Secret Pizza</strong> (The Cosmopolitan, 3º andar) — pizza escondida. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚡ Dia longo (~660 km) mas com FSD é tranquilo."
        ]
    },
    {
        "photo": "img/activities/mt_charleston.jpg",
        "shortLoc": "Vegas",
        "location": "Mt. Charleston + Valley of Fire",
        "route": "Neve + arenito vermelho! 🏔️🔥",
        "note": "Mt. Charleston de manhã (neve!) + Valley of Fire à tarde (melhor luz).",
        "region": "nv",
        "items": [
            {
                "time": "08:15",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "🚗 Rumo a <strong>Mt. Charleston</strong> (~55 km, ~45 min)",
                "type": "drive"
            },
            {
                "time": "10:15",
                "text": "🏔️ <strong>Kyle Canyon Scenic Drive</strong> — neve nas montanhas!",
                "type": ""
            },
            {
                "time": "10:45",
                "text": "⛄ Parada — <strong>brincar na neve!</strong> Boneco de neve, guerra de bolas!",
                "type": "highlight"
            },
            {
                "time": "12:00",
                "text": "☕ <strong>Mt. Charleston Lodge</strong> — chocolate quente com lareira!",
                "type": "food"
            },
            {
                "time": "12:45",
                "text": "🚗 Volta pra Vegas (~45 min)",
                "type": "drive"
            },
            {
                "time": "13:30",
                "text": "🍔 Almoço rápido",
                "type": "food"
            },
            {
                "time": "14:30",
                "text": "🚗 Rumo a <strong>Valley of Fire</strong> (~45 min)",
                "type": "drive"
            },
            {
                "time": "15:15",
                "text": "🔥 <strong>Valley of Fire</strong> — arenito vermelho surreal!",
                "type": "highlight"
            },
            {
                "time": "15:30",
                "text": "🥾 <strong>Fire Wave Trail</strong> (~2 km) — ondas de rocha listrada!",
                "type": "highlight"
            },
            {
                "time": "16:15",
                "text": "📸 <strong>Elephant Rock</strong>",
                "type": ""
            },
            {
                "time": "16:45",
                "text": "📸 <strong>White Domes Trail</strong> (~1.8 km) — cânion colorido",
                "type": ""
            },
            {
                "time": "17:30",
                "text": "🌅 Pôr do sol em Valley of Fire — ESPETACULAR!",
                "type": "highlight"
            },
            {
                "time": "18:30",
                "text": "🚗 Volta pra Vegas (~45 min)",
                "type": "drive"
            },
            {
                "time": "19:30",
                "text": "🍽️ Jantar — <strong>Fogo de Chão</strong> (3500 Las Vegas Blvd S) — 🇧🇷 churrascaria brasileira na Strip! ~$45-55/adulto",
                "type": "food"
            }
        ],
        "tips": [
            "🏔️ Mt. Charleston: pode estar -5°C com neve! Levar casaco, luvas e botas."
        ]
    },
    {
        "photo": "img/activities/badwater_basin.jpg",
        "shortLoc": "Death Valley",
        "location": "Vegas → Death Valley NP → Vegas",
        "chargeStops": [
            {
                "name": "Pahrump, NV",
                "leg": "Vegas → Death Valley → Vegas",
                "critical": false
            }
        ],
        "route": "Badwater Basin + Zabriskie Point! 🏜️",
        "note": "Day trip pra Death Valley! ~450 km total. Fevereiro é a época ideal.",
        "region": "nv",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + saída de Vegas (carro carregado 100%)",
                "type": ""
            },
            {
                "time": "07:15",
                "text": "🚗 Saída rumo a Death Valley (~200 km, ~2.5h via NV-160 → CA-190)",
                "type": "drive"
            },
            {
                "time": "09:45",
                "text": "📸 <strong>Zabriskie Point</strong> — mirante icônico sobre badlands!",
                "type": "highlight"
            },
            {
                "time": "10:15",
                "text": "🏜️ <strong>Furnace Creek Visitor Center</strong> — contexto do parque",
                "type": ""
            },
            {
                "time": "10:45",
                "text": "🎨 <strong>Artist's Palette</strong> — estrada cênica com rochas coloridas",
                "type": "highlight"
            },
            {
                "time": "11:45",
                "text": "🧂 <strong>Badwater Basin</strong> — ponto mais baixo da América do Norte (-86m)!",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço no Furnace Creek",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🚗 Volta rumo a Las Vegas (~200 km, ~2.8h)",
                "type": "drive"
            },
            {
                "time": "16:45",
                "text": "⚡ Supercharger Pahrump (checar disponibilidade)",
                "type": "charge"
            },
            {
                "time": "17:30",
                "text": "🏨 Chegada em Vegas — descanso",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Raising Cane's</strong> (3717 Las Vegas Blvd S) — chicken tenders. ~$10-14/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌡️ Fevereiro: clima ameno em Death Valley (15-20°C dia).",
            "⚡ Sem Supercharger dentro do parque — sair de Vegas com carga cheia."
        ]
    },
    {
        "photo": "img/activities/hollywood_sign.jpg",
        "shortLoc": "LA",
        "chargeStops": [
            {
                "name": "Barstow, CA",
                "leg": "Vegas → LA",
                "critical": false
            }
        ],
        "location": "Las Vegas → Los Angeles",
        "route": "Vegas → Santa Monica! 🌴🏖️",
        "note": "Última perna! Vegas até LA (~462 km), Santa Monica Pier ao pôr do sol.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café + check-out de Las Vegas",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚗 Saída rumo a <strong>Los Angeles</strong> (~462 km, ~4.5h via I-15 S)",
                "type": "drive"
            },
            {
                "time": "09:30",
                "text": "👽 <strong>Alien Fresh Jerky</strong> (Baker) — loja alien + 🌡️ <strong>World's Tallest Thermometer</strong>!",
                "type": ""
            },
            {
                "time": "10:30",
                "text": "⚡ <strong>Supercharger Barstow, CA</strong> (~200 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "11:00",
                "text": "🎨 <strong>Elmer's Bottle Tree Ranch</strong> (Oro Grande) — 'árvores' de garrafas!",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🏨 Chegada em <strong>Los Angeles</strong>! Check-in",
                "type": ""
            },
            {
                "time": "14:00",
                "text": "🍽️ Almoço — <strong>Grand Central Market</strong> (317 S Broadway, DTLA) — mercado gastronômico. ~$10-18/pessoa",
                "type": "food"
            },
            {
                "time": "15:30",
                "text": "🌴 <strong>Venice Beach</strong> — boardwalk, Muscle Beach, artistas de rua",
                "type": ""
            },
            {
                "time": "17:00",
                "text": "🏖️ <strong>Santa Monica Pier</strong> — roda-gigante, Route 66 End Sign!",
                "type": "highlight"
            },
            {
                "time": "17:30",
                "text": "🌅 Sunset na praia!",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Bubba Gump Shrimp Co.</strong> (Santa Monica Pier) — frutos do mar, temático Forrest Gump. ~$20-30/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/griffith_observatory.jpg",
        "shortLoc": "LA",
        "location": "LA dia cheio",
        "route": "Science Center + Getty + Griffith! 🎬",
        "note": "LA dia cheio! Science Center, La Brea, Getty, Griffith Observatory.",
        "region": "ca",
        "items": [
            {
                "time": "08:30",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "🚀 <strong>California Science Center</strong> — Space Shuttle Endeavour! Gratuito. ~2h",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "🦕 <strong>La Brea Tar Pits & Museum</strong> — fósseis de mamutes! ~$25/adulto",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço no Fairfax District",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🏛️ <strong>Getty Center</strong> — museu gratuito com vista panorâmica de LA!",
                "type": "highlight"
            },
            {
                "time": "16:30",
                "text": "🌆 Pôr do sol no Getty!",
                "type": "highlight"
            },
            {
                "time": "17:30",
                "text": "🛒 Compras de última hora — Target/outlets",
                "type": ""
            },
            {
                "time": "18:30",
                "text": "🧳 Hotel — arrumar malas",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar de despedida — <strong>In-N-Out Burger</strong> — o clássico californiano! ~$10/pessoa",
                "type": "food"
            },
            {
                "time": "20:30",
                "text": "🔭 <strong>Griffith Observatory à noite</strong> — LA iluminada! Última noite da viagem",
                "type": "highlight"
            }
        ]
    },
    {
        "photo": "img/activities/santa_monica_pier.jpg",
        "shortLoc": "LAX",
        "location": "LA → Voo de volta ✈️",
        "route": "Último dia — aeroporto! 🇧🇷",
        "note": "Devolução do Tesla + voo de volta. Chegada no Rio dia 23/02.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café + check-out do hotel",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🛒 Compras de última hora (mercado/Target)",
                "type": ""
            },
            {
                "time": "09:30",
                "text": "🚗 Devolução do <strong>Tesla</strong> no LAX",
                "type": "drive"
            },
            {
                "time": "10:00",
                "text": "🛫 Chegada no LAX — check-in + despachar malas",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🛍️ Duty free + almoço no aeroporto",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "✈️ Voo AA 608 → Miami (conexão)",
                "type": "drive"
            },
            {
                "time": "22:00",
                "text": "🛬 Chegada em Miami",
                "type": ""
            },
            {
                "time": "23:15",
                "text": "✈️ Voo AA 905 → Rio de Janeiro",
                "type": "drive"
            }
        ],
        "tips": [
            "Chegada no Rio: 23/02 (terça) às 09:25 🇧🇷 Bem-vindos de volta!"
        ],
        "day": 33,
        "title": "Dia 33 — Seg, 22/02"
    }
];

const hotels = [
    {
        "num": 1,
        "name": "Marriott Marquis, Times Square, NY",
        "checkin": "21/01",
        "checkout": "25/01",
        "nights": 4
    },
    {
        "num": 2,
        "name": "Three Rivers, CA (Sequoia)",
        "checkin": "25/01",
        "checkout": "27/01",
        "nights": 2
    },
    {
        "num": 3,
        "name": "Mariposa / El Portal, CA (Yosemite)",
        "checkin": "27/01",
        "checkout": "30/01",
        "nights": 3
    },
    {
        "num": 4,
        "name": "San Francisco, CA",
        "checkin": "30/01",
        "checkout": "02/02",
        "nights": 3
    },
    {
        "num": 5,
        "name": "Eureka / Arcata, CA",
        "checkin": "02/02",
        "checkout": "03/02",
        "nights": 1
    },
    {
        "num": 6,
        "name": "Crescent City, CA (Redwood)",
        "checkin": "03/02",
        "checkout": "04/02",
        "nights": 1
    },
    {
        "num": 7,
        "name": "Coos Bay, OR",
        "checkin": "04/02",
        "checkout": "05/02",
        "nights": 1
    },
    {
        "num": 8,
        "name": "Cannon Beach, OR",
        "checkin": "05/02",
        "checkout": "06/02",
        "nights": 1
    },
    {
        "num": 9,
        "name": "Forks / Port Angeles, WA (Olympic)",
        "checkin": "06/02",
        "checkout": "09/02",
        "nights": 3
    },
    {
        "num": 10,
        "name": "Pendleton, OR",
        "checkin": "09/02",
        "checkout": "10/02",
        "nights": 1
    },
    {
        "num": 11,
        "name": "Twin Falls, ID",
        "checkin": "10/02",
        "checkout": "11/02",
        "nights": 1
    },
    {
        "num": 12,
        "name": "Moab, UT (Arches/Canyonlands)",
        "checkin": "11/02",
        "checkout": "14/02",
        "nights": 3
    },
    {
        "num": 13,
        "name": "Bryce Canyon, UT",
        "checkin": "14/02",
        "checkout": "15/02",
        "nights": 1
    },
    {
        "num": 14,
        "name": "Springdale, UT (Zion)",
        "checkin": "15/02",
        "checkout": "16/02",
        "nights": 1
    },
    {
        "num": 15,
        "name": "Page, AZ (Horseshoe Bend)",
        "checkin": "16/02",
        "checkout": "17/02",
        "nights": 1
    },
    {
        "num": 16,
        "name": "Las Vegas, NV",
        "checkin": "17/02",
        "checkout": "20/02",
        "nights": 3
    },
    {
        "num": 17,
        "name": "Los Angeles, CA",
        "checkin": "20/02",
        "checkout": "22/02",
        "nights": 2
    }
];


const parks = [
    {
        "name": "🌲 Sequoia + Kings Canyon NP",
        "days": "Dia 6",
        "highlights": "General Sherman Tree (maior árvore!), Congress Trail, Moro Rock, General Grant Tree, Tunnel Log."
    },
    {
        "name": "🏞️ Yosemite National Park",
        "days": "Dias 8–9",
        "highlights": "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Snow Tubing, Mirror Lake."
    },
    {
        "name": "🌲 Redwood National Park",
        "days": "Dia 14",
        "highlights": "Jedediah Smith, Fern Canyon (Jurassic Park 2!), Tall Trees, Lady Bird Johnson, Avenue of Giants."
    },
    {
        "name": "🌲 Olympic National Park",
        "days": "Dias 18–19",
        "highlights": "Hoh Rain Forest, Hall of Mosses, Ruby Beach, Sol Duc Falls, Rialto Beach."
    },
    {
        "name": "🏜️ Canyonlands National Park",
        "days": "Dia 23",
        "highlights": "Mesa Arch sunrise, Grand View Point, Upheaval Dome, Aztec Butte."
    },
    {
        "name": "🏜️ Arches National Park",
        "days": "Dia 24",
        "highlights": "Delicate Arch, Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace."
    },
    {
        "name": "🏜️ Capitol Reef National Park",
        "days": "Dia 25",
        "highlights": "Petroglífos Fremont, Hickman Bridge Trail, Fruita Historic District, Scenic Drive."
    },
    {
        "name": "🏔️ Bryce Canyon National Park",
        "days": "Dias 25–26",
        "highlights": "Navajo Loop, Queen's Garden, hoodoos, Bryce Amphitheater, stargazing!"
    },
    {
        "name": "🏞️ Zion National Park",
        "days": "Dias 26–27",
        "highlights": "Watchman Trail, Emerald Pools, Canyon Overlook, Riverside Walk, Court of the Patriarchs."
    },
    {
        "name": "🏜️ Grand Canyon National Park",
        "days": "Dia 28",
        "highlights": "South Rim, Mather Point, Yavapai Point + Geology Museum, Hopi Point, Rim Trail."
    },
    {
        "name": "🏜️ Death Valley National Park",
        "days": "Dia 30",
        "highlights": "Badwater Basin (-86m, ponto mais baixo da América do Norte), Zabriskie Point, Artist's Palette."
    }
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

