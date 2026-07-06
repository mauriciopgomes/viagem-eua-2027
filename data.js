// ==================== TRIP DATA ====================
// Roteiro — Viagem EUA 2027
// NYC → LAX → Vegas → Grand Canyon → Page → Zion → Bryce → Capitol Reef → Moab
// → Twin Falls → The Dalles → Forks → Rainier → Cannon Beach → Costa Oregon
// → Crescent City → Redwood → Eureka → SF → Sequoia → Yosemite → Carmel → PCH → LA
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
        "photo": "img/activities/welcome_to_las_vegas.jpg",
        "shortLoc": "Vegas",
        "chargeStops": [
            {
                "name": "Barstow, CA",
                "leg": "LAX → Vegas",
                "critical": false
            }
        ],
        "location": "New York → LAX → Las Vegas",
        "route": "NY → LA → Vegas! ✈️🎰",
        "note": "Check-out do Marriott, voo pro LAX, Tesla e direto pra Las Vegas! ~462 km com FSD pela I-15.",
        "region": "nv",
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
                "text": "🛣️ Saída rumo a <strong>Las Vegas</strong> (~462 km, ~5.3h via I-15 N, FSD)",
                "type": "drive"
            },
            {
                "time": "15:30",
                "text": "🎨 <strong>Elmer's Bottle Tree Ranch</strong> (Oro Grande) — floresta de 'árvores' de garrafas de vidro e metal! Grátis",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "👽 <strong>Alien Fresh Jerky</strong> (Baker) — loja alien + jerky de 100 sabores! + 🌡️ <strong>World's Tallest Thermometer</strong>!",
                "type": ""
            },
            {
                "time": "16:45",
                "text": "⚡ <strong>Supercharger Barstow</strong> (~200 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "~19:30",
                "text": "🎰 Chegada em <strong>Las Vegas</strong>! Check-in",
                "type": ""
            },
            {
                "time": "20:00",
                "text": "📸 <strong>Welcome to Las Vegas Sign</strong> — foto icônica à noite!",
                "type": "highlight"
            },
            {
                "time": "20:30",
                "text": "🍽️ Jantar — <strong>Secret Pizza</strong> (The Cosmopolitan, 3º andar) — pizza NY-style escondida. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚡ Dia longo (~462 km) mas FSD ajuda. I-15 é reta e rápida.",
            "⚡ Fuso horário ajuda (-3h). Chegam cansados — dormir cedo!"
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
                "text": "🚗 Rumo a <strong>Valley of Fire</strong> (~45 min pela I-15 N)",
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
                "text": "🍽️ Jantar — <strong>Fogo de Chão</strong> (3500 Las Vegas Blvd S, Paris Las Vegas) — 🇧🇷 churrascaria brasileira na Strip! Rodízio com picanha, fraldinha, cordeiro e a melhor farofa. ~$45-55/adulto, crianças menor preço",
                "type": "food"
            }
        ],
        "tips": [
            "🏔️ Mt. Charleston: pode estar -5°C com neve! Levar casaco, luvas e botas."
        ],
        "day": 23,
        "title": "Dia 23 — Sex, 12/02"
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
        "route": "Badwater Basin + Zabriskie Point + Artist's Palette! 🏜️",
        "note": "Day trip pra Death Valley! ~450 km total (incluindo desvio até Badwater) — sai e volta pro mesmo hotel em Vegas. Fevereiro é a época ideal (calor extremo no resto do ano).",
        "region": "nv",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café + saída de Vegas (carro carregado 100% na noite anterior)",
                "type": ""
            },
            {
                "time": "07:15",
                "text": "🚗 Saída rumo a Death Valley NP (~200 km, ~2.5h via NV-160 → CA-190, passando por Pahrump)",
                "type": "drive"
            },
            {
                "time": "09:45",
                "text": "📸 <strong>Zabriskie Point</strong> — mirante icônico sobre badlands erodidos!",
                "type": "highlight"
            },
            {
                "time": "10:15",
                "text": "🏜️ <strong>Furnace Creek Visitor Center</strong> — contexto do parque, mapas",
                "type": ""
            },
            {
                "time": "10:45",
                "text": "🎨 <strong>Artist's Palette</strong> — estrada cênica com rochas coloridas (Artist's Drive, ~9 milhas, mão única)",
                "type": "highlight"
            },
            {
                "time": "11:45",
                "text": "🧂 <strong>Badwater Basin</strong> — ponto mais baixo da América do Norte (-86m)! Salt flats infinitos",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço no Furnace Creek (The Ranch ou Last Kind Words Saloon)",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🚗 Volta rumo a Las Vegas (~200 km, ~2.8h via CA-190 → NV-160)",
                "type": "drive"
            },
            {
                "time": "16:45",
                "text": "⚡ Supercharger Pahrump (checar disponibilidade no app antes de sair — ⚠️ não confirmado)",
                "type": "charge"
            },
            {
                "time": "17:30",
                "text": "🏨 Chegada em Vegas — descanso antes do jantar",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Raising Cane's</strong> (3717 Las Vegas Blvd S, na Strip!) — chicken tenders crocantes com o famoso Cane's Sauce. ~$10-14/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌡️ Fevereiro: clima ameno em Death Valley (15-20°C dia), ao contrário do verão extremo. Ainda assim levar água.",
            "⚡ Sem Supercharger dentro do parque — sair de Vegas com carga cheia. Pahrump (rota de ida/volta) tem carregador, mas confirmar no app Tesla antes de depender dele.",
            "🚗 Dante's View (mirante a 1.669m) fica de fora do roteiro — adiciona ~1h de estrada de montanha ida e volta. Pular pra manter o dia dentro do tempo.",
            "🍽️ Sem Strip/show à noite nesse dia — volta de Death Valley já enche o dia. Trade-off aceito: troca dia livre por Death Valley."
        ],
        "day": 24,
        "title": "Dia 24 — Sab, 13/02"
    },
    {
        "photo": "img/activities/grand_canyon.jpg",
        "shortLoc": "Page",
        "chargeStops": [
            {
                "name": "Kingman, AZ",
                "leg": "Vegas → GC",
                "critical": false
            },
            {
                "name": "Flagstaff, AZ",
                "leg": "GC → Page",
                "critical": false
            }
        ],
        "location": "Las Vegas → Grand Canyon → Page",
        "route": "Vegas + Grand Canyon + Horseshoe Bend amanhã! 🏜️🎰",
        "note": "Dia épico invertido! Vegas de manhã, Grand Canyon à tarde, Page à noite (~660 km).",
        "region": "nv",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café + check-out de Las Vegas",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🚗 Saída rumo ao <strong>Grand Canyon South Rim</strong> (~340 km, ~3.5h via US-93 N → I-40 E → AZ-64)",
                "type": "drive"
            },
            {
                "time": "09:45",
                "text": "⚡ <strong>Supercharger Kingman, AZ</strong> (~200 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "11:55",
                "text": "🏞️ <strong>Grand Canyon South Rim</strong> — chegada! Entrada $35/veículo",
                "type": "highlight"
            },
            {
                "time": "12:20",
                "text": "📸 <strong>Mather Point</strong> — primeiro mirante, vista imediata!",
                "type": "highlight"
            },
            {
                "time": "12:50",
                "text": "📸 <strong>Yavapai Point + Geology Museum</strong>",
                "type": ""
            },
            {
                "time": "13:20",
                "text": "🍽️ Almoço no <strong>Grand Canyon Village</strong>",
                "type": "food"
            },
            {
                "time": "14:20",
                "text": "📸 <strong>Rim Trail</strong> — caminhar pela borda (~30 min)",
                "type": ""
            },
            {
                "time": "14:50",
                "text": "📸 <strong>Hopi Point</strong> — um dos melhores mirantes!",
                "type": "highlight"
            },
            {
                "time": "15:35",
                "text": "🚗 Saída rumo a <strong>Page, AZ</strong> (~210 km, ~2.5h via AZ-64 → US-89 N)",
                "type": "drive"
            },
            {
                "time": "17:00",
                "text": "⚡ <strong>Supercharger Flagstaff, AZ</strong> (~150 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "18:05",
                "text": "🏨 Chegada em <strong>Page</strong>! Check-in",
                "type": ""
            },
            {
                "time": "18:35",
                "text": "🍽️ Jantar — <strong>Big John's Texas BBQ</strong> (153 S Lake Powell Blvd, Page) — brisket e pulled pork defumado. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚡ Dia longo (~660 km) mas com FSD é tranquilo. Sair cedo de Vegas!"
        ]
    },
    {
        "photo": "img/activities/canyon_overlook.jpg",
        "shortLoc": "Zion",
        "location": "Page → Zion",
        "route": "Horseshoe Bend + rumo a Zion! 🏜️🏞️",
        "note": "Manhã em Page (Horseshoe Bend + Sand Cave), depois estrada até Zion à tarde!",
        "region": "ut",
        "items": [
            {
                "text": "☕ Café cedo em Page",
                "type": "",
                "time": "06:30"
            },
            {
                "time": "07:00",
                "text": "🏜️ <strong>Horseshoe Bend</strong> — mirante sobre o meandro do Colorado! ~30 min. Gratuito (estacionamento ~$10)",
                "type": "highlight"
            },
            {
                "time": "07:45",
                "text": "🏜️ <strong>Page Sand Cave</strong> — caverna de arenito com luz incrível!",
                "type": "highlight"
            },
            {
                "text": "🚗 Saída rumo a <strong>Zion, UT</strong> (~160 km, ~2h via US-89 N)",
                "type": "drive",
                "time": "08:30"
            },
            {
                "text": "🏨 Chegada em <strong>Springdale</strong>! Check-in",
                "type": "",
                "time": "10:30"
            },
            {
                "text": "🍽️ Almoço em Springdale",
                "type": "food",
                "time": "11:00"
            },
            {
                "text": "🚗 Dirigir pra <strong>Zion Canyon</strong> (sem shuttle no inverno!)",
                "type": "drive",
                "time": "12:00"
            },
            {
                "time": "12:20",
                "text": "🥾 <strong>Emerald Pools Trail</strong> (Lower + Upper, ~4 km)",
                "type": ""
            },
            {
                "time": "13:35",
                "text": "🏔️ <strong>Court of the Patriarchs</strong> + <strong>Big Bend</strong> — mirantes rápidos",
                "type": ""
            },
            {
                "time": "~17:30",
                "text": "🌅 <strong>Pôr do sol no Canyon Junction Bridge</strong>",
                "type": "highlight"
            },
            {
                "text": "🍽️ Jantar — <strong>Oscar's Cafe</strong> (948 Zion Park Blvd, Springdale) — mexicana clássica. ~$12-18/pessoa",
                "type": "food",
                "time": "18:15"
            }
        ],
        "tips": [
            "📸 Horseshoe Bend: melhor luz de manhã cedo (sol ilumina o canyon).",
            "☀️ Tarde livre entre Court of the Patriarchs (~14h) e o pôr do sol (~17:30) — dá pra descansar, explorar Springdale ou repetir alguma trilha com calma."
        ]
    },
    {
        "photo": "img/activities/watchman_trail.jpg",
        "shortLoc": "Zion",
        "location": "Zion NP dia cheio → Bryce",
        "route": "Trilhas, mirantes e rumo a Bryce! 🏞️",
        "note": "Dia cheio em Zion! No inverno pode dirigir no canyon (sem shuttle). À noite, sobe pra Bryce.",
        "region": "ut",
        "items": [
            {
                "text": "☕ Café em Springdale",
                "type": "",
                "time": "07:00"
            },
            {
                "time": "07:30",
                "text": "🚗 Dirigir pra <strong>Zion Canyon</strong> (sem shuttle no inverno — pode entrar de carro!)",
                "type": "drive"
            },
            {
                "time": "07:50",
                "text": "🥾 <strong>Watchman Trail</strong> (~5 km, ~2h) — vista panorâmica!",
                "type": "highlight"
            },
            {
                "time": "09:50",
                "text": "🥾 <strong>Canyon Overlook Trail</strong> (~1.6 km, ~1h) — vista incrível do canyon!",
                "type": "highlight"
            },
            {
                "time": "10:50",
                "text": "🍽️ Almoço em Springdale (rápido)",
                "type": "food"
            },
            {
                "time": "11:35",
                "text": "🥾 <strong>Riverside Walk</strong> (~3.5 km ida e volta) — trilha plana ao longo do rio Virgin!",
                "type": ""
            },
            {
                "time": "12:15",
                "text": "🥾 <strong>Scout Lookout</strong> (~6.4 km ida e volta, ~2.5h) — degraus esculpidos na rocha! ⚠️ Em fevereiro pode ter gelo — levar microspikes.",
                "type": "highlight"
            },
            {
                "time": "14:45",
                "text": "📸 <strong>Watchman Overlook</strong> — última vista de Zion antes de seguir pra Bryce",
                "type": ""
            },
            {
                "text": "🚗 Check-out + saída pra <strong>Bryce Canyon</strong> (~130 km, ~1.5h)",
                "type": "drive",
                "time": "15:15"
            },
            {
                "time": "15:45",
                "text": "🏁 <strong>Checkerboard Mesa</strong> — arenito com padrão xadrez! (perto da saída leste de Zion)",
                "type": ""
            },
            {
                "time": "16:15",
                "text": "🛣️ <strong>Red Canyon</strong> — arcos vermelhos na estrada! (perto da chegada em Bryce)",
                "type": ""
            },
            {
                "time": "16:45",
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
                "text": "🍽️ Jantar — <strong>Cowboy's Smokehouse BBQ</strong> (95 N Main St, Panguitch) — BBQ defumado, ribs e brisket. ~$15-20/pessoa",
                "type": "food"
            },
            {
                "time": "19:30",
                "text": "🌌 <strong>Stargazing em Bryce!</strong> — International Dark Sky Park!",
                "type": "highlight"
            }
        ],
        "tips": [
            "🔭 Bryce é um dos melhores céus escuros do MUNDO!",
            "🌅 Só 1 pôr do sol por dia: mantido o de Bryce Amphitheater (chegada). Watchman Overlook em Zion virou mirante de tarde, sem reivindicar sunset — dá pra ver os dois de verdade só se cortar alguma trilha (ex: Scout Lookout).",
            "⏰ Dia apertado (Zion inteiro + drive + Bryce sunset). Sair de Springdale às 7h e almoçar rápido garante chegar a tempo do pôr do sol em Bryce."
        ]
    },
    {
        "photo": "img/activities/bryce_canyon.jpg",
        "shortLoc": "Bryce",
        "chargeStops": [
            {
                "name": "Salina, UT",
                "leg": "Bryce → Moab",
                "critical": false
            },
            {
                "name": "Green River, UT",
                "leg": "Bryce → Moab",
                "critical": false
            }
        ],
        "location": "Bryce → Capitol Reef → Moab",
        "route": "Hoodoos ao nascer do sol + petroglífos! 🏔️",
        "note": "Nascer do sol em Bryce, depois estrada cênica até Moab passando por Capitol Reef.",
        "region": "ut",
        "items": [
            {
                "text": "☕ Café",
                "type": "",
                "time": "06:30"
            },
            {
                "time": "07:00",
                "text": "🌅 <strong>Nascer do sol no Bryce Amphitheater</strong> — hoodoos dourados!",
                "type": "highlight"
            },
            {
                "time": "07:45",
                "text": "📸 <strong>Fairyland Point</strong> — mirante menos visitado!",
                "type": "highlight"
            },
            {
                "time": "08:15",
                "text": "🥾 <strong>Navajo Loop + Queen's Garden Trail</strong> (~2h)",
                "type": "highlight"
            },
            {
                "time": "10:15",
                "text": "🥾 <strong>Mossy Cave Trail</strong> (~1.5 km, ~30 min) — caverna com musgo + cascata congelada!",
                "type": "highlight"
            },
            {
                "time": "10:50",
                "text": "📸 <strong>Sunrise/Sunset Point</strong>",
                "type": ""
            },
            {
                "time": "11:10",
                "text": "🚗 <strong>Scenic Drive</strong> — Inspiration Point, Natural Bridge, Rainbow Point",
                "type": ""
            },
            {
                "text": "🚗 Check-out + saída rumo leste (~490 km, ~6h)",
                "type": "drive",
                "time": "11:50"
            },
            {
                "time": "12:35",
                "text": "🌄 <strong>Head of the Rocks Overlook</strong> — vista épica de Escalante!",
                "type": ""
            },
            {
                "time": "13:15",
                "text": "🏜️ <strong>Capitol Reef NP</strong> — petroglífos Fremont + Hickman Bridge!",
                "type": "highlight"
            },
            {
                "time": "14:00",
                "text": "🥾 <strong>Hickman Bridge Trail</strong> (~2.8 km, ~1h) — arco natural!",
                "type": "highlight"
            },
            {
                "time": "15:00",
                "text": "🍽️ Almoço (levar lanche)",
                "type": "food"
            },
            {
                "time": "15:45",
                "text": "⚡ <strong>Supercharger Salina, UT</strong> (~130 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "16:10",
                "text": "🏜️ <strong>San Rafael Swell</strong> (I-70) — paredões dramáticos!",
                "type": ""
            },
            {
                "time": "16:40",
                "text": "⚡ <strong>Supercharger Green River, UT</strong> (~100 km) — ~20 min",
                "type": "charge"
            },
            {
                "text": "🚗 Seguindo rumo a <strong>Moab</strong>",
                "type": "drive",
                "time": "17:05"
            },
            {
                "time": "~17:50",
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
            "🔭 Bryce é um dos melhores céus escuros do MUNDO!",
            "🌅 Pôr do sol no Colorado River não cabe aqui (chegada tarde demais em Moab, dia já tem nascer do sol em Bryce) — reagendado pro fim do dia 13 (Arches), última noite em Moab, como passeio noturno ao invés de golden hour."
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
                "text": "🍽️ Jantar — <strong>Pasta Jay's</strong> (4 S 100 W, Moab) — italiano caseiro favorito dos moradores, massas e lasanha. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "day": 17,
        "title": "Dia 17 — Sab, 06/02"
    },
    {
        "photo": "img/activities/delicate_arch.jpg",
        "shortLoc": "Moab",
        "location": "Arches NP + Dead Horse Point",
        "route": "Delicate Arch + Dead Horse sunset! 🏜️",
        "note": "O arco mais famoso do mundo + vista sobre o Colorado!",
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
                "text": "🌅 Pôr do sol em Arches",
                "type": "highlight"
            },
            {
                "time": "18:30",
                "text": "🍽️ Jantar de despedida de Moab — <strong>Spoke on Center</strong> (702 S Main St) — bistrô local favorito de trilheiros, sanduíches artesanais e sopa do dia. ~$12-18/pessoa",
                "type": "food"
            },
            {
                "time": "19:45",
                "text": "🌌 <strong>Passeio noturno no Colorado River</strong> (Scenic Byway 128, ~10 min do centro) — despedida tranquila de Moab, rio + rochas ao luar",
                "type": ""
            }
        ],
        "day": 18,
        "title": "Dia 18 — Dom, 07/02"
    },
    {
        "photo": "img/activities/mesa_arch.jpg",
        "shortLoc": "Twin Falls",
        "chargeStops": [
            {
                "name": "Green River, UT",
                "leg": "Moab → Twin Falls",
                "critical": false
            },
            {
                "name": "Price, UT",
                "leg": "Moab → Twin Falls",
                "critical": false
            },
            {
                "name": "Salt Lake City, UT",
                "leg": "Moab → Twin Falls",
                "critical": false
            },
            {
                "name": "Twin Falls, ID",
                "leg": "Moab → Twin Falls",
                "critical": false
            }
        ],
        "location": "Moab → Salt Lake City → Twin Falls",
        "route": "Longa jornada de volta ao noroeste! 🏜️",
        "note": "Dia longo de transição — Moab até Twin Falls via SLC (~770 km com FSD).",
        "region": "ut",
        "items": [
            {
                "text": "☕ Café + check-out de Moab",
                "type": "",
                "time": "07:00"
            },
            {
                "text": "🚗 Saída rumo norte via US-191 → I-70 → I-15 N (~770 km total)",
                "type": "drive",
                "time": "07:30"
            },
            {
                "time": "09:00",
                "text": "⚡ <strong>Supercharger Green River, UT</strong> (~130 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "09:30",
                "text": "🏜️ <strong>San Rafael Swell</strong> (I-70) — paredões dramáticos de ambos os lados!",
                "type": ""
            },
            {
                "time": "11:15",
                "text": "⚡ <strong>Supercharger Price, UT</strong> (~200 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "13:45",
                "text": "⚡ <strong>Supercharger Salt Lake City area</strong> (~250 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "14:15",
                "text": "🦬 <strong>Antelope Island SP</strong> — bisões selvagens + Great Salt Lake!",
                "type": "highlight"
            },
            {
                "time": "15:00",
                "text": "📸 <strong>Buffalo Point</strong> — mirante 360°",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "🍽️ Almoço rápido (tarde) em SLC",
                "type": "food"
            },
            {
                "text": "🚗 I-15 N rumo a <strong>Twin Falls</strong>",
                "type": "drive",
                "time": "16:15"
            },
            {
                "time": "19:15",
                "text": "🏨 Chegada em <strong>Twin Falls</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:45",
                "text": "🍽️ Jantar — <strong>Cracker Barrel</strong> (1357 Blue Lakes Blvd N, Twin Falls) — comfort food americano clássico. ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Dia mais longo do trip (~770 km, sai 07:30 chega ~19h15). FSD ajuda. Dormir cedo!",
            "🌊 Shoshone Falls/Perrine Bridge/Evel Knievel Jump Site movidos pra manhã do dia seguinte (Twin Falls→The Dalles) — vistos com luz do dia em vez de escuro, e chegada aqui fica bem mais tranquila.",
            "🦬 Antelope Island mantido de propósito — bisão selvagem visto pela 1ª vez na viagem, não é redundante com resto do trip.",
            "🔍 Já avaliado: cortar Buffalo Point (mirante 360°, sem bisão) daria só ~15-20min, não resolve o dia — mantido como está.",
            "🔍 Já avaliado: dividir esse trecho em 2 dias com pernoite em Price/UT ou SLC deixaria a viagem mais tranquila, mas exige +1 dia no total (viagem fechada em 33 dias) — rejeitado por enquanto.",
            "✅ Decisão: dia mais pesado do trip (empatado com o dia seguinte, Twin Falls→The Dalles, também ~770 km) aceito como está. Nenhum corte de conteúdo pendente aqui."
        ]
    },
    {
        "photo": "img/activities/shoshone_falls.jpg",
        "shortLoc": "The Dalles",
        "chargeStops": [
            {
                "name": "Baker City, OR",
                "leg": "Twin Falls → The Dalles",
                "critical": false
            },
            {
                "name": "Pendleton, OR",
                "leg": "Twin Falls → The Dalles",
                "critical": false
            }
        ],
        "location": "Twin Falls → The Dalles",
        "route": "Shoshone Falls + Blue Mountains! 🏔️💧",
        "note": "I-84 oeste até The Dalles — Shoshone Falls de manhã, Columbia Gorge no final!",
        "region": "pnw",
        "items": [
            {
                "text": "☕ Café + check-out de Twin Falls",
                "type": "",
                "time": "06:30"
            },
            {
                "time": "07:00",
                "text": "🌊 <strong>Shoshone Falls</strong> — 'Niágara do Oeste'! 65m de queda! (luz da manhã)",
                "type": "highlight"
            },
            {
                "time": "07:35",
                "text": "📸 <strong>Perrine Bridge</strong> — ponte sobre o Snake River Canyon!",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "📸 <strong>Evel Knievel Jump Site</strong> — local do famoso salto de 1974 sobre o Snake River Canyon!",
                "type": "highlight"
            },
            {
                "text": "🚗 Saída via I-84 W (~770 km, ~8.5h)",
                "type": "drive",
                "time": "08:25"
            },
            {
                "time": "10:55",
                "text": "⚡ <strong>Supercharger Baker City, OR</strong> (~200 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "11:25",
                "text": "🍽️ Almoço em Baker City",
                "type": "food"
            },
            {
                "time": "12:10",
                "text": "📸 <strong>Deadman Pass Overlook</strong> — mirante nas Blue Mountains!",
                "type": "highlight"
            },
            {
                "time": "13:30",
                "text": "⚡ <strong>Supercharger Pendleton, OR</strong> (~200 km) — ~20 min",
                "type": "charge"
            },
            {
                "text": "🚗 Seguindo rumo a <strong>The Dalles</strong>",
                "type": "drive",
                "time": "14:00"
            },
            {
                "time": "15:40",
                "text": "🌲 <strong>Multnomah Falls</strong> — cachoeira icônica de 189m!",
                "type": "highlight"
            },
            {
                "time": "16:05",
                "text": "🏛️ <strong>Vista House at Crown Point</strong> — vista 270° do Gorge!",
                "type": "highlight"
            },
            {
                "time": "16:30",
                "text": "📸 <strong>Rowena Crest Viewpoint</strong> — mirante épico sobre o Columbia River!",
                "type": ""
            },
            {
                "time": "16:50",
                "text": "🏞️ <strong>Columbia River Gorge</strong>",
                "type": ""
            },
            {
                "time": "17:15",
                "text": "🏨 Chegada em <strong>The Dalles / Hood River</strong>! Check-in",
                "type": ""
            },
            {
                "time": "18:15",
                "text": "🍽️ Jantar — <strong>Clock Tower Ales</strong> (311 Union St, The Dalles) — brewpub local com vista pro Columbia River, burgers e fish tacos. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Dia longo (~770 km, ~8.5h) — empata com o dia anterior (Moab→Twin Falls) como os 2 dias mais pesados do trip. FSD ajuda bastante nos trechos retos de I-84.",
            "🌅 Últimos mirantes (Rowena Crest/Columbia River Gorge) já perto do pôr do sol (~17h em fevereiro) — luz baixa mas ainda visível."
        ]
    },
    {
        "photo": "img/activities/lake_crescent.jpg",
        "shortLoc": "Olympic",
        "chargeStops": [
            {
                "name": "Centralia, WA",
                "leg": "The Dalles → Forks",
                "critical": false
            },
            {
                "name": "Aberdeen, WA",
                "leg": "The Dalles → Forks",
                "critical": false
            }
        ],
        "location": "The Dalles → Forks",
        "route": "Columbia Gorge + rumo a Forks! 🌊💧",
        "note": "Dia longo mas incrível — Multnomah Falls, Kurt Cobain, costa e chegada em Forks.",
        "region": "pnw",
        "items": [
            {
                "text": "☕ Café + check-out de The Dalles",
                "type": "",
                "time": "07:00"
            },
            {
                "text": "🚗 Saída rumo norte via I-84 W → I-5 N → US-101 S",
                "type": "drive",
                "time": "07:30"
            },
            {
                "time": "09:30",
                "text": "⚡ <strong>Supercharger Centralia, WA</strong> (~160 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "12:20",
                "text": "⚡ <strong>Supercharger Aberdeen, WA</strong> (~200 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "12:45",
                "text": "🎸 <strong>Kurt Cobain Memorial</strong> — placa 'Come As You Are' + memorial do Nirvana!",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço em Aberdeen",
                "type": "food"
            },
            {
                "time": "13:45",
                "text": "🌳 <strong>Kalaloch Tree of Life</strong> — árvore crescendo sobre caverna com raízes expostas!",
                "type": ""
            },
            {
                "text": "🚗 Seguindo rumo a <strong>Forks</strong>",
                "type": "drive",
                "time": "16:05"
            },
            {
                "time": "17:20",
                "text": "🏞️ <strong>Lake Crescent</strong> — lago cristalino, chegando no fim da tarde!",
                "type": "highlight"
            },
            {
                "time": "17:50",
                "text": "🌊 <strong>Sol Duc Falls Trail</strong> (~2.5 km) — já no fim da luz, atenção ao horário",
                "type": ""
            },
            {
                "time": "18:30",
                "text": "🏨 Check-in em <strong>Forks</strong>",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🧛 Tour Crepúsculo! Forks High School + Casa da Bella Swan",
                "type": "highlight"
            },
            {
                "time": "19:30",
                "text": "🍽️ Jantar — <strong>Pacific Pizza & Pasta</strong> (70 N Forks Ave, Forks) — a opção mais confiável da cidade, favorita dos moradores locais. ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Dia longo (~570 km, sai 07:30 chega ~18:30). Lake Crescent/Sol Duc Falls ficam pro fim da tarde — se atrasar, considerar deixar Sol Duc pro dia seguinte (Olympic NP dia cheio já passa perto)."
        ]
    },
    {
        "photo": "img/activities/hoh_rain_forest.jpg",
        "shortLoc": "Olympic",
        "location": "Olympic NP dia cheio 🌲",
        "route": "Florestas místicas + praias selvagens!",
        "note": "Hoh Rain Forest + Ruby Beach + Twilight!",
        "region": "pnw",
        "items": [
            {
                "time": "07:00",
                "text": "☕ Café",
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
                "time": "10:15",
                "text": "🌊 <strong>Ruby Beach</strong> — sea stacks!",
                "type": "highlight"
            },
            {
                "time": "10:45",
                "text": "🧪 Tidepools — estrelas-do-mar! ⚠️ Inverno: ondas fortes, observar de longe",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço em Forks",
                "type": "food"
            },
            {
                "time": "13:00",
                "text": "🌊 <strong>La Push / First Beach</strong> — praia dos Quileute (Twilight!)",
                "type": ""
            },
            {
                "time": "14:30",
                "text": "🌊 <strong>Rialto Beach</strong> — sea stacks e troncos",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🥾 <strong>Marymere Falls Trail</strong> (~2.5 km)",
                "type": ""
            },
            {
                "time": "17:00",
                "text": "🌅 Pôr do sol no Pacífico!",
                "type": "highlight"
            },
            {
                "time": "18:30",
                "text": "🍽️ Jantar — <strong>Bella Italia</strong> (118 E 1st St, Port Angeles) — italiano autêntico com ingredientes do PNW, mushroom ravioli e linguine alle vongole. ~$20-25/pessoa",
                "type": "food"
            }
        ],
        "day": 13,
        "title": "Dia 13 — Ter, 02/02"
    },
    {
        "photo": "img/activities/mt__rainier.jpg",
        "shortLoc": "Cannon",
        "chargeStops": [
            {
                "name": "Olympia, WA",
                "leg": "Forks → Cannon Beach",
                "critical": true,
                "note": "⚠️ CARREGAR ATÉ 100% — desvio Rainier + 350 km até Cannon Beach sem outro SC!"
            }
        ],
        "location": "Forks → Mt. Rainier → Cannon Beach",
        "route": "Vulcão Rainier + rumo a Cannon Beach! 🌋",
        "note": "Descendo de Forks, desvio ao Mt. Rainier (Paradise) via Olympia, depois direto pra Cannon Beach.",
        "region": "pnw",
        "items": [
            {
                "text": "☕ Café + check-out de Forks",
                "type": "",
                "time": "06:00"
            },
            {
                "text": "🚗 Rumo a <strong>Olympia</strong> (~255 km, ~3.5h via US-101 S)",
                "type": "drive",
                "time": "06:30"
            },
            {
                "time": "09:45",
                "text": "🍽️ Almoço em Olympia",
                "type": "food"
            },
            {
                "time": "10:30",
                "text": "⚡ <strong>Supercharger Olympia</strong> — ⚠️ <strong>CARREGAR ATÉ 100%!</strong> (~35 min)",
                "type": "charge"
            },
            {
                "text": "🚗 Desvio rumo a <strong>Mt. Rainier NP (Paradise)</strong> (~100 km, ~1.5h via SR-7 → SR-706)",
                "type": "drive",
                "time": "11:05"
            },
            {
                "text": "🌋 <strong>Mt. Rainier — Paradise!</strong> Vulcão de 4.392m nevado!",
                "type": "highlight",
                "time": "12:35"
            },
            {
                "text": "🥾 <strong>Nisqually Vista Trail</strong> (~2 km) — trilha com neve, vista do glaciar",
                "type": "",
                "time": "13:20"
            },
            {
                "text": "🚗 Volta a Olympia + seguindo rumo a <strong>Cannon Beach</strong> (~350 km, ~4.5h via SR-706 → I-5 → US-26)",
                "type": "drive",
                "time": "14:05"
            },
            {
                "time": "18:35",
                "text": "🏨 Chegada em <strong>Cannon Beach</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "📸 <strong>Haystack Rock</strong> — ícone de Oregon! (já escuro, mas iluminado — silhueta contra o céu noturno)",
                "type": "highlight"
            },
            {
                "time": "19:20",
                "text": "🌊 <strong>Ecola State Park</strong> — mirante espetacular! (já escuro — portão pode estar fechado, checar horário)",
                "type": ""
            },
            {
                "time": "~17:20",
                "text": "🌅 <em>Opcional, se pular o desvio do Mt. Rainier:</em> <strong>Pôr do sol em Cannon Beach</strong> — ESPETACULAR! (chegando por volta de 17:20 sem o desvio, dá tempo de ver — ver tips)",
                "type": "highlight"
            },
            {
                "time": "19:45",
                "text": "🍽️ Jantar — <strong>Ecola Seafood Restaurant & Market</strong> (208 N Spruce St) — Dungeness crab e fish & chips. ~$20-25/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌋 Mt. Rainier de volta ao roteiro: essa posição cai num domingo (07/fev/2027) — plowing de inverno em Paradise historicamente garantido fim de semana/feriado, diferente da posição antiga (segunda-feira) que motivou o corte original.",
            "⚠️ Dia mais pesado do trip (~705 km) — desvio Rainier é rua sem saída (SR-7/SR-706), ida e volta pela mesma estrada até Olympia. Chegada em Cannon Beach já de noite (~18:35).",
            "🌅⚡ Trade-off real: com Rainier, perde o pôr do sol em Cannon Beach (chega ~1h depois). Pra ver o sunset (~17:20), pule o desvio inteiro do Rainier (economiza ~3h) — Haystack Rock/Ecola State Park também ficam melhores com luz do dia.",
            "🔄 Se Rainier FECHADO ou com neve forte: cortar o desvio (Paradise + Nisqually Vista Trail) e seguir direto Olympia → Cannon Beach — economiza ~200 km e 2.5h, e recupera o sunset.",
            "⚡ Supercharger Olympia obrigatório — carregar até 100% cobre desvio Rainier + trecho até Cannon Beach sem outro charger no caminho.",
            "🌊 Astoria/Peter Iredale/Cape Disappointment movidos pro início do dia seguinte (Cannon Beach→Coos Bay) — vistos de manhã com luz em vez de escuro à noite; ficam ao norte de Cannon Beach, mais perto de lá do que faria sentido chegando atrasado aqui.",
            "🌙 Ecola State Park pode fechar o portão ao anoitecer — checar horário antes."
        ]
    },
    {
        "photo": "img/activities/samuel_boardman.jpg",
        "shortLoc": "Oregon",
        "chargeStops": [
            {
                "name": "Lincoln City, OR",
                "leg": "Cannon Beach → Coos Bay",
                "critical": false
            }
        ],
        "location": "Cannon Beach → Coos Bay",
        "route": "Astoria + faróis + Thor's Well! 🌊",
        "note": "Manhã em Astoria (luz do dia), depois descendo a costa até Coos Bay — paradas espetaculares!",
        "region": "pnw",
        "items": [
            {
                "text": "☕ Café + check-out de Cannon Beach",
                "type": "",
                "time": "06:30"
            },
            {
                "text": "🚗 Backtrack rumo ao norte via US-101 N (~40 km, ~40 min)",
                "type": "drive",
                "time": "07:00"
            },
            {
                "time": "07:45",
                "text": "🏖️ <strong>Cape Disappointment</strong> — farol no encontro do Columbia com o Pacífico!",
                "type": ""
            },
            {
                "time": "08:15",
                "text": "🌊 <strong>Astoria</strong> — cenário de <strong>The Goonies</strong>! Astoria Column!",
                "type": "highlight"
            },
            {
                "time": "08:50",
                "text": "🚢 <strong>Peter Iredale Shipwreck</strong> — naufrágio de 1906 na praia!",
                "type": "highlight"
            },
            {
                "text": "🚗 Voltando rumo sul pela US-101 S (~330 km)",
                "type": "drive",
                "time": "09:15"
            },
            {
                "time": "11:15",
                "text": "⚡ <strong>Supercharger Lincoln City, OR</strong> (~100 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço em <strong>Newport</strong>",
                "type": "food"
            },
            {
                "time": "13:00",
                "text": "📸 <strong>Cape Perpetua + Thor's Well</strong> (Yachats) — gêiser natural nas rochas!",
                "type": "highlight"
            },
            {
                "time": "13:45",
                "text": "🏖️ <strong>Heceta Head Lighthouse</strong> (Florence) — farol icônico!",
                "type": ""
            },
            {
                "time": "14:15",
                "text": "🦌 <strong>Dean Creek Elk Viewing Area</strong> (Reedsport) — manada de Roosevelt elk selvagens!",
                "type": "highlight"
            },
            {
                "text": "🚗 Seguindo rumo a <strong>Coos Bay</strong>",
                "type": "drive",
                "time": "15:00"
            },
            {
                "time": "15:45",
                "text": "📸 <strong>Shore Acres State Park</strong> (Charleston) — jardins sobre penhascos, melhor pôr do sol da região!",
                "type": "highlight"
            },
            {
                "time": "16:30",
                "text": "🏨 Chegada em <strong>Coos Bay / Charleston</strong>! Check-in",
                "type": ""
            },
            {
                "time": "17:15",
                "text": "🌅 Pôr do sol em Shore Acres (volta pro parque pro fim de tarde)",
                "type": "highlight"
            },
            {
                "time": "18:15",
                "text": "🍽️ Jantar em Coos Bay/Charleston — opções de frutos do mar no porto",
                "type": "food"
            }
        ],
        "tips": [
            "🌊 Astoria/Peter Iredale/Cape Disappointment vistos de manhã com luz do dia — pequeno backtrack ao norte (~40 km) antes de virar rumo sul de vez. Cape Disappointment fica em Washington, Astoria/Peter Iredale já em Oregon — ordem geográfica norte→sul."
        ]
    },
    {
        "photo": "img/activities/cape_blanco.jpg",
        "shortLoc": "Oregon",
        "chargeStops": [
            {
                "name": "Coos Bay, OR",
                "leg": "Coos Bay → Crescent City",
                "critical": false
            }
        ],
        "location": "Coos Bay → Crescent City",
        "route": "Mirantes da costa sul do Oregon! 🌊",
        "note": "Descendo de Coos Bay até Crescent City — últimas paradas na costa do Oregon.",
        "region": "pnw",
        "items": [
            {
                "text": "☕ Café + check-out de Coos Bay",
                "type": "",
                "time": "08:00"
            },
            {
                "text": "🚗 Saída rumo sul pela US-101 S (~95 km)",
                "type": "drive",
                "time": "08:30"
            },
            {
                "time": "10:00",
                "text": "⚡ <strong>Supercharger Coos Bay</strong> (~100 km) — ~25 min",
                "type": "charge"
            },
            {
                "time": "10:30",
                "text": "🌊 <strong>Jerry's Rogue Jets</strong> (opcional, passagem por Gold Beach) — passeio de barco pelo Rogue River, se der tempo!",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🏖️ <strong>Cape Sebastian</strong> — mirante épico sobre o Pacífico!",
                "type": "highlight"
            },
            {
                "time": "11:35",
                "text": "📸 <strong>Arch Rock Viewpoint</strong>",
                "type": ""
            },
            {
                "time": "11:55",
                "text": "📸 <strong>Natural Bridges Viewpoint</strong>",
                "type": "highlight"
            },
            {
                "time": "12:20",
                "text": "📸 <strong>Samuel Boardman Scenic Corridor</strong> — mirantes incríveis!",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço em <strong>Brookings, OR</strong>",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "📸 <strong>Thomas H. Kuchel Visitor Center</strong> — último mirante da Redwood NP",
                "type": ""
            },
            {
                "text": "🚗 Seguindo rumo a <strong>Crescent City</strong> (~85 km)",
                "type": "drive",
                "time": "14:20"
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
                "text": "🍽️ Jantar — <strong>Fisherman's Restaurant</strong> (700 US-101 S, Crescent City) — Dungeness crab e halibut. ~$15-22/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/fern_canyon.jpg",
        "shortLoc": "Redwood",
        "location": "Crescent City → Redwood NP → Eureka",
        "route": "Jedediah Smith + Fern Canyon + Tall Trees! 🌲",
        "note": "Dia cheio de Redwood descendo ao sul — Jedediah Smith, Fern Canyon e Tall Trees!",
        "region": "ca",
        "items": [
            {
                "text": "☕ Café + check-out de Crescent City",
                "type": "",
                "time": "07:00"
            },
            {
                "time": "07:30",
                "text": "🌲 <strong>Jedediah Smith Redwoods SP</strong> — <strong>Stout Memorial Grove Trail</strong> (~1 km loop entre gigantes!)",
                "type": "highlight"
            },
            {
                "time": "08:15",
                "text": "🚗 <strong>Howland Hill Road</strong> — estrada de terra entre redwoods enormes",
                "type": "drive"
            },
            {
                "time": "09:00",
                "text": "🥾 <strong>Simpson-Reed Trail</strong> (~1 km loop) — trilha pavimentada entre old-growth redwoods!",
                "type": ""
            },
            {
                "time": "09:30",
                "text": "🌲 <strong>Del Norte Coast Redwoods SP</strong> — <strong>Coastal Trail</strong> (~2 km) — costa selvagem entre redwoods!",
                "type": "highlight"
            },
            {
                "time": "10:15",
                "text": "🍽️ Almoço em <strong>Orick</strong>",
                "type": "food"
            },
            {
                "time": "11:15",
                "text": "🌲 <em>Opcional (checar condições):</em> <strong>Tall Trees Grove</strong> — árvores mais altas do MUNDO! (~5 km, ~2h). ⚠️ Permit no Info Center (Orick)",
                "type": "highlight"
            },
            {
                "time": "12:00",
                "text": "🌲 <strong>Lady Bird Johnson Grove Trail</strong> (~2.5 km)",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🌊 <strong>Gold Bluffs Beach</strong>",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🥾 <strong>Fern Canyon</strong> (~1.5 km) — samambaias! <strong>Jurassic Park 2</strong>!",
                "type": "highlight"
            },
            {
                "time": "13:45",
                "text": "📸 <strong>Big Tree Wayside</strong>",
                "type": ""
            },
            {
                "time": "14:15",
                "text": "🚗 <strong>Newton B. Drury Scenic Parkway</strong>",
                "type": ""
            },
            {
                "time": "14:45",
                "text": "🦌 <strong>Elk Meadow</strong> (Orick) — manada de Roosevelt elk pastando! Pullover grátis",
                "type": ""
            },
            {
                "time": "15:15",
                "text": "🚗 US-101 norte (~35 km) → <strong>Prairie Creek Redwoods SP</strong>",
                "type": "drive"
            },
            {
                "text": "🚗 Seguindo rumo a <strong>Eureka</strong>",
                "type": "drive",
                "time": "16:00"
            },
            {
                "time": "16:45",
                "text": "🏨 Chegada em <strong>Eureka</strong>! Check-in",
                "type": ""
            },
            {
                "time": "17:15",
                "text": "🏙️ <strong>Old Town Eureka</strong> — <strong>Carson Mansion</strong>",
                "type": ""
            },
            {
                "time": "17:45",
                "text": "🍽️ Jantar — <strong>Lost Coast Brewery & Cafe</strong> (617 4th St, Eureka) — cervejaria artesanal, burgers e fish tacos. ~$15-20/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Fern Canyon: Davison Road (terra, 10 km) pode fechar com chuva. Ligar pro Visitors Center: (707) 464-6101.",
            "⚠️ Tall Trees Grove: permit gratuito no Info Center (Orick) — pode estar fechado em dia de semana no inverno."
        ]
    },
    {
        "photo": "img/activities/embarcadero_sf.jpg",
        "shortLoc": "SF",
        "chargeStops": [
            {
                "name": "Leggett, CA",
                "leg": "Eureka → SF",
                "critical": false
            }
        ],
        "location": "Eureka → San Francisco",
        "route": "Avenue of the Giants + rumo a SF! 🌲",
        "note": "Descendo de Eureka até SF via Avenue of the Giants.",
        "region": "ca",
        "items": [
            {
                "text": "☕ Café + check-out de Eureka",
                "type": "",
                "time": "08:00"
            },
            {
                "text": "🚗 Saída rumo sul via US-101 (~400 km, ~4.5h)",
                "type": "drive",
                "time": "08:30"
            },
            {
                "time": "10:00",
                "text": "🌲 <strong>Avenue of the Giants</strong> — 50 km entre redwoods!",
                "type": "highlight"
            },
            {
                "time": "11:00",
                "text": "⚡ <strong>Supercharger Leggett</strong> (~30 min)",
                "type": "charge"
            },
            {
                "text": "🚗 US-101 sul rumo a <strong>San Francisco</strong>",
                "type": "drive",
                "time": "11:30"
            },
            {
                "time": "~14:00",
                "text": "🏨 Chegada em <strong>San Francisco</strong>! Check-in",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Tony's Pizza Napoletana</strong> (1570 Stockton St, North Beach) — campeão mundial de pizza napolitana. ~$20-25/pessoa",
                "type": "food"
            }
        ]
    },
    {
        "photo": "img/activities/pier_39.jpg",
        "shortLoc": "SF",
        "location": "San Francisco — Pier 39 + Embarcadero",
        "route": "Primeiro dia em SF! Cable Car + Chinatown + Pier 39 🐋",
        "note": "Chegamos em SF! Manhã de centro histórico (Cable Car, Chinatown), depois waterfront — Pier 39, Fisherman's Wharf e Point Reyes.",
        "region": "ca",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🚋 Passeio de <strong>Cable Car</strong>. $8/pessoa/viagem",
                "type": "highlight"
            },
            {
                "time": "08:30",
                "text": "🌆 <strong>Lombard Street</strong>",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "🏮 <strong>Chinatown de SF</strong> — a mais antiga dos EUA!",
                "type": "highlight"
            },
            {
                "time": "09:30",
                "text": "🎮 <strong>Nintendo San Francisco</strong> (Union Square) — ~5 min de Chinatown! Entrada livre",
                "type": "highlight"
            },
            {
                "time": "10:00",
                "text": "🌆 <strong>Embarcadero</strong> — Ferry Building, mercado gourmet!",
                "type": ""
            },
            {
                "time": "10:45",
                "text": "🏖️ <strong>Fisherman's Wharf</strong> — Ghirardelli Square, barcos históricos",
                "type": ""
            },
            {
                "time": "11:30",
                "text": "🏖️ <strong>Pier 39</strong> — leões-marinhos!",
                "type": "highlight"
            },
            {
                "time": "12:15",
                "text": "🍽️ Almoço — clam chowder no <strong>Boudin Bakery</strong> (Pier 39)",
                "type": "food"
            },
            {
                "time": "13:30",
                "text": "🌳 <strong>Cypress Tree Tunnel</strong> (Point Reyes, ~1h de SF) — túnel de ciprestes centenários!",
                "type": ""
            },
            {
                "time": "14:00",
                "text": "🐋 <strong>Point Reyes</strong> — Elk Preserve, Lighthouse + <strong>baleias cinzentas!</strong> (migração jan-abr!)",
                "type": "highlight"
            },
            {
                "time": "16:00",
                "text": "🚗 Volta pra SF (~1h)",
                "type": "drive"
            },
            {
                "time": "17:15",
                "text": "🍽️ Jantar — <strong>Fog Harbor Fish House</strong> (Pier 39, Fisherman's Wharf) — frutos do mar com vista pra Baía, menu kids, crianças adoram! ~$20-28/pessoa",
                "type": "food"
            }
        ],
        "day": 6,
        "title": "Dia 6 — Ter, 26/01"
    },
    {
        "photo": "img/activities/golden_gate_bridge.jpg",
        "shortLoc": "SF",
        "location": "San Francisco — Golden Gate + West Side",
        "route": "Battery Spencer + Golden Gate Bridge + Ocean Beach! 🌉",
        "note": "Golden Gate de todos os ângulos! Battery Spencer, ponte, parque e praia.",
        "region": "ca",
        "items": [
            {
                "time": "08:30",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "🏞️ <strong>Battery Spencer</strong> — vista icônica da Golden Gate!",
                "type": "highlight"
            },
            {
                "time": "09:45",
                "text": "📸 <strong>Golden Gate Overlook</strong> (Langdon Ct) — segundo ponto de vista em SF lado, Marin Headlands!",
                "type": "highlight"
            },
            {
                "time": "10:00",
                "text": "🌉 <strong>Golden Gate Bridge</strong> — caminhar pela ponte!",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "🏰 <strong>Fort Point</strong> — cenário de Vertigo!",
                "type": ""
            },
            {
                "time": "12:00",
                "text": "🌅 <strong>Crissy Field</strong> — vista da Golden Gate!",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🍽️ Almoço",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🌳 <strong>Golden Gate Park</strong> — Japanese Tea Garden, Conservatory of Flowers",
                "type": ""
            },
            {
                "time": "16:00",
                "text": "🏖️ <strong>Ocean Beach</strong> — praia do Pacífico",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "🍽️ Jantar — <strong>Burma Superstar</strong> (309 Clement St, Inner Richmond) — birmanês premiado, tea leaf salad e coconut chicken noodles. Único em SF! ~$15-22/pessoa",
                "type": "food"
            }
        ],
        "day": 7,
        "title": "Dia 7 — Qua, 27/01"
    },
    {
        "photo": "img/activities/three_rivers_ca.jpg",
        "shortLoc": "Sequoia",
        "chargeStops": [
            {
                "name": "Fresno, CA",
                "leg": "SF → Three Rivers",
                "critical": false
            }
        ],
        "location": "San Francisco → Three Rivers (Sequoia)",
        "route": "Rumo às sequoias! 🌲",
        "note": "Manhã tranquila em SF (Cable Car/Chinatown/Nintendo já vistos no dia 6), almoço rápido e drive até Three Rivers. Sobe até Sequoia pra ver a General Sherman Tree no fim de tarde.",
        "region": "ca",
        "items": [
            {
                "text": "☕ Café + check-out de SF",
                "type": "",
                "time": "08:00"
            },
            {
                "time": "09:00",
                "text": "🍽️ Almoço cedo — <strong>La Taqueria</strong> (Mission, a caminho da saída)",
                "type": "food"
            },
            {
                "text": "🚗 Saída rumo a <strong>Three Rivers</strong> (~410 km, ~5.2h via CA-152 → CA-99 → CA-198)",
                "type": "drive",
                "time": "09:45"
            },
            {
                "text": "⚡ <strong>Supercharger Fresno, CA</strong> (~200 km) — ~25 min",
                "type": "charge",
                "time": "12:00"
            },
            {
                "text": "🏨 Chegada em <strong>Three Rivers</strong>! Check-in",
                "type": "",
                "time": "14:45"
            },
            {
                "time": "16:00",
                "text": "🚗 Subida até <strong>Sequoia NP</strong> (~30 km, ~45 min via CA-198 — sem shuttle no inverno, entra de carro)",
                "type": "drive"
            },
            {
                "time": "16:45",
                "text": "🌲 <strong>General Sherman Tree</strong> — a MAIOR árvore do mundo! 84m, luz de fim de tarde e bem mais vazio",
                "type": "highlight"
            },
            {
                "time": "17:25",
                "text": "🥾 <strong>Congress Trail</strong> (~3 km loop) — entre sequoias gigantes",
                "type": ""
            },
            {
                "time": "18:05",
                "text": "🚗 Volta pra Three Rivers (~45 min)",
                "type": "drive"
            },
            {
                "time": "18:50",
                "text": "🍽️ Jantar — <strong>Sierra Subs & Salads</strong> (41717 Sierra Dr, Three Rivers) — sanduíches artesanais e saladas frescas, casual e rápido. ~$10-15/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🌲 General Sherman à tarde (não de manhã) libera o dia seguinte, que tem trecho de montanha pesado até Mariposa.",
            "⏰ Chegada em Three Rivers já no fim de tarde (~17:15) — SF→Three Rivers são ~5.2h reais de estrada. Trilha e jantar ficam tarde da noite; se preferir chegar com mais folga, considerar sair de SF mais cedo (pular alguma parada da manhã)."
        ]
    },
    {
        "photo": "img/activities/general_grant.jpg",
        "shortLoc": "Sequoia",
        "location": "Three Rivers → Kings Canyon → Mariposa",
        "route": "Kings Canyon (General Grant) + rumo a Yosemite! 🌲",
        "note": "General Sherman já foi visto ontem à tarde — hoje sobe direto pra Kings Canyon, depois segue pra Mariposa sem voltar. Drive final é mais longo do que parece (~5h, estrada de montanha) mas com a manhã livre, dá pra ir com calma.",
        "region": "ca",
        "items": [
            {
                "time": "08:00",
                "text": "☕ Café + check-out de Three Rivers",
                "type": ""
            },
            {
                "time": "08:30",
                "text": "🚗 Drive Three Rivers → Sequoia NP → <strong>Generals Highway</strong> → Kings Canyon (~65 km, ~1h30, estrada cênica!)",
                "type": "drive"
            },
            {
                "time": "09:15",
                "text": "📸 <strong>Tunnel Log</strong> (parada rápida no caminho) — sequoia caída com túnel pra carro! + <strong>Auto Log</strong>",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🌲 <strong>General Grant Tree</strong> — 2ª maior sequoia do mundo! (Kings Canyon)",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "🌲 <strong>North Grove Loop</strong> (~1 km) — floresta de sequoias gigantes!",
                "type": ""
            },
            {
                "time": "11:00",
                "text": "🍽️ Almoço no Grant Grove Restaurant",
                "type": "food"
            },
            {
                "time": "12:00",
                "text": "🚗 Drive Kings Canyon → Mariposa (~295 km, ~5h via CA-180 W → CA-41 N → CA-49 N — estrada de montanha, mais lenta do que a distância sugere)",
                "type": "drive"
            },
            {
                "time": "17:00",
                "text": "🏨 Chegada em Mariposa! Check-in + tempo livre antes do jantar",
                "type": ""
            },
            {
                "time": "19:30",
                "text": "🍽️ Jantar — <strong>Charles Street Dinner House</strong> (5043 Hwy 140, Mariposa) — steakhouse histórico local. ~$25-35/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "❄️ Em fevereiro pode ter neve nas áreas mais altas.",
            "⚠️ Kings Canyon Scenic Byway (CA-180 leste, pra Cedar Grove) fecha no inverno (nov–abr). Só General Grant Tree é acessível — CA-180 oeste rumo a Fresno segue aberta.",
            "⚠️ Moro Rock: degraus frequentemente fechados no inverno por gelo. Se aberto, vale a subida (~30 min ida e volta, vista 360°) — encaixa na parada da manhã.",
            "🚗 Dia sem volta a Three Rivers — bagagem toda no carro, check-out definitivo pela manhã.",
            "⏰ Drive final é ~5h (não ~2.5h) — estrada de montanha sinuosa de Kings Canyon até Fresno antes de pegar a CA-41. Com General Sherman já visto ontem, sobra ~1h30-2h de folga real em Mariposa antes do jantar."
        ],
        "day": 26,
        "title": "Dia 26 — Seg, 15/02"
    },
    {
        "photo": "img/activities/tunnel_view.jpg",
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
                "text": "🌅 Sunset no <strong>Sentinel Bridge</strong> — Half Dome dourado!",
                "type": "highlight"
            },
            {
                "time": "17:00",
                "text": "🚗 Volta pra Mariposa (~45 min)",
                "type": "drive"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Savoury's</strong> (5034 Hwy 140, Mariposa) — cozinha americana eclética com ingredientes locais da Sierra Nevada. ~$20-25/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "❄️ Yosemite nevado em fevereiro é LINDO! Menos turistas, silêncio, neve nos picos."
        ],
        "day": 27,
        "title": "Dia 27 — Ter, 16/02"
    },
    {
        "photo": "img/activities/half_dome.jpg",
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
                "text": "⛷️ <strong>Yosemite Ski & Snowboard Area</strong> (antigo Badger Pass) — snow tubing! Perfeito pra família! ~$20-30/pessoa",
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
                "time": "14:00",
                "text": "🥾 <strong>Swinging Bridge</strong> + <strong>Sentinel Meadow</strong> — luz da tarde nos picos",
                "type": ""
            },
            {
                "time": "15:30",
                "text": "📸 Revisitar favoritos — luz diferente da tarde!",
                "type": ""
            },
            {
                "time": "16:30",
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
                "text": "🍽️ Jantar de despedida — <strong>Castillo's Mexican Food</strong> (4995 5th St, Mariposa) — mexicano familiar, enchiladas verdes e chile relleno. ~$12-18/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⛷️ Snow tubing em Badger Pass: aberto inverno, ~$20/pessoa, kids adoram!"
        ],
        "day": 28,
        "title": "Dia 28 — Qua, 17/02"
    },
    {
        "photo": "img/activities/monterey_ca.jpg",
        "shortLoc": "Monterey",
        "chargeStops": [
            {
                "name": "Merced, CA",
                "leg": "Yosemite → Monterey",
                "critical": false
            },
            {
                "name": "Gilroy, CA",
                "leg": "Yosemite → Monterey",
                "critical": false
            }
        ],
        "location": "Yosemite → Monterey",
        "route": "Serra Nevada → Aquarium + 17-Mile Drive! 🏔️🌊",
        "note": "Drive de Yosemite até Monterey. Aquarium e 17-Mile Drive à tarde!",
        "region": "ca",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café + check-out de Mariposa",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🚗 Drive Mariposa → CA-140 → CA-99 → US-101 → Monterey (~350 km, ~4.5h)",
                "type": "drive"
            },
            {
                "time": "09:30",
                "text": "⚡ <strong>Supercharger Merced</strong> (~130 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "11:00",
                "text": "⚡ <strong>Supercharger Gilroy</strong> (~150 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "~12:30",
                "text": "🏖️ Chegada em <strong>Monterey</strong>!",
                "type": ""
            },
            {
                "time": "13:00",
                "text": "🦞 <strong>Cannery Row</strong> — almoço!",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🐙 <strong>Monterey Bay Aquarium</strong> — um dos melhores do mundo! (~2h). ~$50/adulto, ~$30/criança",
                "type": "highlight"
            },
            {
                "time": "16:00",
                "text": "🚗 <strong>17-Mile Drive</strong> — Lone Cypress, Pebble Beach! $11.25/veículo",
                "type": "highlight"
            },
            {
                "time": "17:30",
                "text": "🏖️ <strong>Carmel-by-the-Sea</strong> — vila charmosa, galerias, Carmel Beach",
                "type": ""
            },
            {
                "time": "18:00",
                "text": "🏨 Check-in em <strong>Carmel</strong>",
                "type": ""
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>The Forge in the Forest</strong> (5th Ave e Junipero St, Carmel) — americana casual, burgers e ribs. ~$20-28/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "🎟️ Monterey Bay Aquarium: comprar ingressos online! ~$50/adulto, ~$30/criança."
        ],
        "day": 29,
        "title": "Dia 29 — Qui, 18/02"
    },
    {
        "photo": "img/activities/hollywood_sign.jpg",
        "shortLoc": "LA",
        "chargeStops": [
            {
                "name": "San Luis Obispo, CA",
                "leg": "Carmel → LA via PCH",
                "critical": false
            },
            {
                "name": "Santa Barbara, CA",
                "leg": "Carmel → LA via PCH",
                "critical": false
            }
        ],
        "location": "Carmel → PCH → Los Angeles",
        "route": "Big Sur + Elephant Seals + Santa Barbara + LA! 🌊🏖️",
        "note": "PCH descendo pela costa! Bixby, McWay, elefantes-marinhos, Santa Barbara e LA.",
        "region": "ca",
        "items": [
            {
                "time": "07:30",
                "text": "☕ Café + check-out de Carmel",
                "type": ""
            },
            {
                "time": "08:00",
                "text": "🌉 <strong>Bixby Creek Bridge</strong> — foto icônica!",
                "type": "highlight"
            },
            {
                "time": "08:45",
                "text": "🏖️ <strong>Pfeiffer Beach</strong> — arco de pedra (keyhole rock)!",
                "type": "highlight"
            },
            {
                "time": "09:45",
                "text": "🌊 <strong>McWay Falls</strong> — cachoeira de 24m direto na praia!",
                "type": "highlight"
            },
            {
                "time": "10:30",
                "text": "🚗 PCH continuando sul → San Simeon (~1h)",
                "type": "drive"
            },
            {
                "time": "11:30",
                "text": "🦭 <strong>Piedras Blancas Elephant Seal Rookery</strong> — centenas de elefantes-marinhos na praia! Grátis",
                "type": "highlight"
            },
            {
                "time": "12:00",
                "text": "🍽️ Almoço em <strong>Cambria</strong> ou San Simeon",
                "type": "food"
            },
            {
                "time": "13:00",
                "text": "🚗 PCH/US-101 sul rumo LA (~300 km, ~3.5h)",
                "type": "drive"
            },
            {
                "time": "14:30",
                "text": "⚡ <strong>Supercharger San Luis Obispo</strong> (~80 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "16:00",
                "text": "⚡ <strong>Supercharger Santa Barbara</strong> (~160 km) — ~20 min",
                "type": "charge"
            },
            {
                "time": "~18:00",
                "text": "🏨 Chegada em <strong>Los Angeles</strong>! Check-in",
                "type": ""
            },
            {
                "time": "18:30",
                "text": "🏖️ <strong>Santa Monica Pier</strong> — roda-gigante, Route 66 End Sign!",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🌅 Sunset na praia!",
                "type": "highlight"
            },
            {
                "time": "19:30",
                "text": "🍽️ Jantar — <strong>Bubba Gump Shrimp Co.</strong> (Santa Monica Pier) — frutos do mar, temático Forrest Gump. ~$20-30/pessoa",
                "type": "food"
            }
        ],
        "tips": [
            "⚠️ Se Hwy 1 FECHADA ao sul de Bixby: pular Big Sur, sair de Carmel direto pela US-101 S (mesmo tempo, perde as paradas costeiras).",
            "🦭 Piedras Blancas: colônia enorme jan-fev (época de filhotes)!"
        ],
        "day": 30,
        "title": "Dia 30 — Sex, 19/02"
    },
    {
        "photo": "img/activities/griffith_observatory.jpg",
        "shortLoc": "LA",
        "location": "LA dia cheio",
        "route": "Hollywood + Griffith Observatory! 🎬",
        "note": "LA dia cheio! Science Center, Getty, Griffith Observatory.",
        "region": "ca",
        "items": [
            {
                "time": "08:30",
                "text": "☕ Café",
                "type": ""
            },
            {
                "time": "09:00",
                "text": "🚀 <strong>California Science Center</strong> (700 Exposition Park Dr) — Space Shuttle Endeavour real em tamanho natural! Gratuito, imperdível para a família. ~2h",
                "type": "highlight"
            },
            {
                "time": "11:30",
                "text": "🦕 <strong>La Brea Tar Pits & Museum</strong> (5801 Wilshire Blvd) — fossos de asfalto natural com fósseis de mamutes, sabres-dente e preguiças gigantes! Museu incluso ~$25 adulto / $10 criança. ~1.5h",
                "type": "highlight"
            },
            {
                "time": "13:00",
                "text": "🍽️ Almoço no <strong>Fairfax District</strong> (perto do La Brea)",
                "type": "food"
            },
            {
                "time": "14:00",
                "text": "🌴 <strong>Venice Beach</strong> — boardwalk icônico, Muscle Beach, artistas de rua, skatepark. ~15 min de Santa Monica Pier a pé. ~1h",
                "type": ""
            },
            {
                "time": "15:00",
                "text": "🏛️ <strong>Getty Center</strong> (1200 Getty Center Dr) — museu gratuito com jardins e vista panorâmica incrível de LA, arte + fotos!",
                "type": "highlight"
            },
            {
                "time": "17:00",
                "text": "🌆 Pôr do sol com vista de LA no Getty!",
                "type": "highlight"
            },
            {
                "time": "19:00",
                "text": "🍽️ Jantar — <strong>Grand Central Market</strong> (317 S Broadway, DTLA) — mercado gastronômico histórico de 1917, cada um escolhe o que quer (tacos, ramen, pizza, burgers), sem reserva, perfeito para família. ~$10-18/pessoa",
                "type": "food"
            }
        ],
        "day": 31,
        "title": "Dia 31 — Sab, 20/02"
    },
    {
        "photo": "img/activities/venice_beach.jpg",
        "shortLoc": "LA",
        "location": "LA dia livre",
        "route": "Dia livre em Los Angeles! 🌴",
        "note": "Sem programação fixa — compras, praia, descanso ou explorar o que ficou faltando!",
        "region": "ca",
        "items": [
            {
                "time": "09:00",
                "text": "☕ Café com calma",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🌴 Dia livre — sugestões:",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🛍️ <em>Opção:</em> <strong>The Grove + Farmers Market</strong> — shopping ao ar livre + mercado histórico",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🎬 <em>Opção:</em> <strong>Universal CityWalk</strong> — lojas e restaurantes temáticos (sem ingresso do parque)",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🏖️ <em>Opção:</em> <strong>Manhattan Beach</strong> — praia mais tranquila que Venice, perfeita pra família",
                "type": ""
            },
            {
                "time": "10:00",
                "text": "🛒 <em>Opção:</em> Compras — <strong>Target / Walmart / outlets</strong>",
                "type": ""
            },
            {
                "time": "12:30",
                "text": "🍽️ Almoço onde quiser!",
                "type": "food"
            },
            {
                "time": "18:00",
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
        ],
        "day": 32,
        "title": "Dia 32 — Dom, 21/02"
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


// ==================== HOTELS ====================
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
        "name": "Las Vegas, NV",
        "checkin": "25/01",
        "checkout": "28/01",
        "nights": 3
    },
    {
        "num": 3,
        "name": "Page, AZ (Horseshoe Bend)",
        "checkin": "28/01",
        "checkout": "29/01",
        "nights": 1
    },
    {
        "num": 4,
        "name": "Springdale, UT (Zion)",
        "checkin": "29/01",
        "checkout": "30/01",
        "nights": 1
    },
    {
        "num": 5,
        "name": "Bryce Canyon, UT",
        "checkin": "30/01",
        "checkout": "31/01",
        "nights": 1
    },
    {
        "num": 6,
        "name": "Moab, UT (Arches/Canyonlands)",
        "checkin": "31/01",
        "checkout": "03/02",
        "nights": 3
    },
    {
        "num": 7,
        "name": "Twin Falls, ID",
        "checkin": "03/02",
        "checkout": "04/02",
        "nights": 1
    },
    {
        "num": 8,
        "name": "The Dalles / Hood River, OR",
        "checkin": "04/02",
        "checkout": "05/02",
        "nights": 1
    },
    {
        "num": 9,
        "name": "Forks / Port Angeles, WA (Olympic)",
        "checkin": "05/02",
        "checkout": "07/02",
        "nights": 2
    },
    {
        "num": 10,
        "name": "Cannon Beach, OR",
        "checkin": "07/02",
        "checkout": "08/02",
        "nights": 1
    },
    {
        "num": 11,
        "name": "Coos Bay, OR",
        "checkin": "08/02",
        "checkout": "09/02",
        "nights": 1
    },
    {
        "num": 12,
        "name": "Crescent City / Klamath, CA",
        "checkin": "09/02",
        "checkout": "10/02",
        "nights": 1
    },
    {
        "num": 13,
        "name": "Eureka / Arcata, CA",
        "checkin": "10/02",
        "checkout": "11/02",
        "nights": 1
    },
    {
        "num": 14,
        "name": "San Francisco, CA",
        "checkin": "11/02",
        "checkout": "14/02",
        "nights": 3
    },
    {
        "num": 15,
        "name": "Three Rivers, CA (Sequoia)",
        "checkin": "14/02",
        "checkout": "15/02",
        "nights": 1
    },
    {
        "num": 16,
        "name": "Mariposa / El Portal, CA",
        "checkin": "15/02",
        "checkout": "18/02",
        "nights": 3
    },
    {
        "num": 17,
        "name": "Carmel, CA",
        "checkin": "18/02",
        "checkout": "19/02",
        "nights": 1
    },
    {
        "num": 18,
        "name": "Los Angeles, CA",
        "checkin": "19/02",
        "checkout": "22/02",
        "nights": 3
    }
];


// ==================== NATIONAL PARKS ====================
const parks = [
    {
        "name": "🌲 Redwood National Park",
        "days": "Dias 21–22",
        "highlights": "Jedediah Smith, Fern Canyon (Jurassic Park 2!), Tall Trees, Lady Bird Johnson, Avenue of Giants."
    },
    {
        "name": "🏜️ Grand Canyon National Park",
        "days": "Dia 8",
        "highlights": "South Rim, Mather Point, Yavapai Point + Geology Museum, Hopi Point, Rim Trail."
    },
    {
        "name": "🏞️ Zion National Park",
        "days": "Dias 9–10",
        "highlights": "Watchman Trail, Emerald Pools, Canyon Overlook, Riverside Walk, Court of the Patriarchs."
    },
    {
        "name": "🏔️ Bryce Canyon National Park",
        "days": "Dias 10–11",
        "highlights": "Navajo Loop, Queen's Garden, hoodoos, Bryce Amphitheater, stargazing!"
    },
    {
        "name": "🏜️ Capitol Reef National Park",
        "days": "Dia 11",
        "highlights": "Petroglífos Fremont, Hickman Bridge Trail, Fruita Historic District, Scenic Drive."
    },
    {
        "name": "🏜️ Canyonlands National Park",
        "days": "Dia 12",
        "highlights": "Mesa Arch sunrise, Grand View Point, Upheaval Dome, Aztec Butte."
    },
    {
        "name": "🏜️ Arches National Park",
        "days": "Dia 13",
        "highlights": "Delicate Arch, Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace."
    },
    {
        "name": "🌲 Olympic National Park",
        "days": "Dias 16–17",
        "highlights": "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push (Twilight!), Sol Duc Falls."
    },
    {
        "name": "🌋 Mt. Rainier National Park",
        "days": "Dia 18",
        "highlights": "Paradise, neve, vulcão de 4.392m."
    },
    {
        "name": "🏜️ Death Valley National Park",
        "days": "Dia 7",
        "highlights": "Badwater Basin (-86m, ponto mais baixo da América do Norte), Zabriskie Point, Artist's Palette."
    },
    {
        "name": "🌲 Sequoia + Kings Canyon NP",
        "days": "Dias 25–26",
        "highlights": "General Sherman Tree (maior árvore!), Congress Trail, Moro Rock, General Grant Tree."
    },
    {
        "name": "🏞️ Yosemite National Park",
        "days": "Dias 27–28",
        "highlights": "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Snow Tubing, Mirror Lake."
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
