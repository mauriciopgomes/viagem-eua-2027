# ARCHITECTURE.md

Mapa de dados do repo: quem é fonte de verdade, quem deriva automaticamente, quem precisa sync manual. Existe porque o repo já teve 3+ bugs de desync entre arquivos (histórico abaixo) — isso documenta o formato pra não repetir, e `tests.js` trava regressão automaticamente onde dá.

## Por que não SDD formal

Cogitado documentar tudo retroativo em formato spec-driven (requirements/design/tasks por módulo). Decisão: não vale o esforço aqui — código já existe, projeto solo, ~3000 linhas vanilla JS. Uma spec escrita depois do código só descreve o que já tem (baixo sinal) e desalinha nas próximas mudanças (spec não é testada, código muda, spec mente). O problema real nunca foi falta de spec — é falta de single-source-of-truth + validação automática. Esse arquivo + testes novos resolvem a causa; SDD formal só documentaria o sintoma.

## Fonte de verdade única: `days[]` (data.js)

Tudo sobre o roteiro nasce do array `days[]` em `data.js`. Pra reordenar/adicionar dias: mexe só nesse array. `initDays()` (chamado 1x no load) recalcula automaticamente a partir da posição no array:

| Derivado automaticamente | De onde |
|---|---|
| `d.day` (número do dia) | posição no array (`i + 1`) |
| `d.title` (data + dia da semana) | `TRIP_START` + posição |
| `dayPhotos` | `d.photo` de cada dia |
| `superchargers[]` | `d.chargeStops[]` de cada dia |

Isso é seguro reordenar — nada fica stale.

## Dados que exigem sync manual (risco de desync)

Estes NÃO são recalculados por `initDays()`. Editar `days[]` sem atualizar estes é a causa raiz de quase todo bug já encontrado no repo:

| Dado | Arquivo | O que sincronizar | Testes que travam isso |
|---|---|---|---|
| `hotels[]` | `data.js` | `checkin`/`checkout`/`nights` por hotel — precisa bater com onde cada dia realmente pernoita | `tests.js`: contiguidade checkin/checkout, total de noites = 32 |
| `parks[]` | `data.js` | `days` (string tipo "Dias 19-20") — precisa bater com quais dias visitam o parque | `tests.js`: "parques referenciam dias válidos", "dias dos parques estão alinhados com o roteiro" |
| `dayStats{}` | `app.js` (~L919) | `km`/`drive`/`hotel` por dia — **hotel deve bater com `hotels[]`** (não com achismo) | `tests.js`: "dayStats.hotel bate com hotels[]", "dayStats tem exatamente days.length entradas" |
| `dayCoords{}` | `app.js` (~L855) | coordenada de fly-to no mapa por dia — **deve bater com o hotel do dia**, não do dia anterior | `tests.js`: "dayCoords[N] aponta pro hotel do dia N, não do dia anterior" (novo — achou 12/33 dias errados na 1ª auditoria real) |
| `scCoords{}` | `app.js` (~L1081) | coordenada de cada supercharger — nome deve bater **exatamente** com `chargeStops[].name` em `data.js` | `tests.js`: "scCoords cobre todos os superchargers" (novo) |
| `hotelCoords{}` | `hotel-coords.js` | coordenada aproximada por hotel (substring match no nome) — usado só por `tests.js`, não roda no PWA | `tests.js`: "dayCoords[N] aponta pro hotel do dia N" (usa como fonte de comparação) |
| `dayWaypoints{}` | `tools/generate-routes.js` | waypoints brutos pro OSRM gerar a geometria da rota | `tests.js`: "dayWaypoints cobre os mesmos dias que routeDayOrder" (novo) |
| `activityPhotos{}` | `photos.js` | nome de lugar (substring match, via `findPhoto()`) → caminho de foto | `tests.js`: "activityPhotos referencia arquivos que existem" (existente) |
| `placeInfo{}` | `places.js` | nome de lugar (substring match, via `findPlaceInfo()`) → endereço/coords/detalhe | `tests.js`: "highlights nomeados (`<strong>`) têm placeInfo" (novo — achou 7 highlights sem cobertura) |

`dayStats[N].km` também é validado contra distância real: `tests.js` decodifica a polyline de `route-data.js` e soma segmentos (haversine), compara com tolerância de 20%. Achou vários dias com estimativa manual 20-70% errada (nunca tinha sido comparado antes) — corrigido nessa auditoria.

## Cadeia de geração de rota (a mais frágil)

```
tools/generate-routes.js (dayWaypoints, à mão)
    ↓ roda 1x manualmente: `node tools/generate-routes.js` (chama OSRM real)
route-data.js (encodedRoutes + routeDayOrder — GERADO, não editar à mão)
    ↓ carregado no browser
app.js buildRouteData() IIFE (~L876) — decodifica + concatena em routeCoords (runtime, só no browser)
```

`route-data.js` é a fonte real (já tem geometria OSRM real). `generate-routes.js` só precisa existir pra CASO alguém precise regenerar do zero — se ele ficar sem uma entrada que `route-data.js` tem, ninguém percebe até tentar regenerar (`tests.js`: "dayWaypoints cobre os mesmos dias que routeDayOrder").

## Convenção: o que é "dia de estrada"

Existem 2 listas parecidas mas com propósitos diferentes — não são a mesma coisa por design:

- **`routeDayOrder`** (route-data.js): dias com relocation real de hotel (pra rota contínua no mapa + links de navegação). 20 dias.
- **`driveDays` em `tests.js`** (teste "dias de estrada têm items drive"): inclui também dias de loop >100km que voltam pro mesmo hotel (ex: dia 6/7 Mt.Charleston/Valley of Fire em Vegas, dia 27/28 Yosemite snow tubing) — não entram no `routeDayOrder` porque não mudam hotel, mas são "dia de estrada" pro propósito desse teste.

Se adicionar um dia novo de relocation: atualiza `routeDayOrder` (exige rodar `generate-routes.js` de novo) E a lista em `tests.js` se for >100km.

## Checklist ao adicionar/mover um dia em `days[]`

1. Editar só o array `days[]` — número/data/dayPhotos/superchargers cuidam de si mesmos.
2. Se mudou onde pernoita: atualizar `hotels[]` (checkin/checkout/nights contíguos).
3. Se envolve parque nacional: atualizar `parks[].days`.
4. Atualizar `dayStats[N]` em `app.js` (km/drive/**hotel igual ao hotels[] daquele dia** — km validado por teste contra distância real da polyline, tolerância 20%).
5. Se é dia de relocation (novo hotel): atualizar `dayCoords[N]` em `app.js` — **deve ser a coordenada do hotel de destino (hoje), não do hotel de origem (ontem)**. Bug mais sério achado no repo até agora era exatamente essa inversão, em 12/33 dias.
6. Se tem supercharger novo: nome em `chargeStops[].name` precisa ter entrada idêntica em `scCoords` (app.js).
7. Se mudou rota entre hotéis: rodar `node tools/generate-routes.js` (regenera `route-data.js` via OSRM real) — ou pelo menos atualizar `dayWaypoints` lá pra não ficar stale.
8. Se tem `<strong>Nome do Lugar</strong>` novo com `type:"highlight"`: adicionar chave em `activityPhotos` (photos.js) e `placeInfo` (places.js) — senão card fica sem foto/endereço/link de mapa (degrada, mas silencioso).
9. Rodar `npm test` — a seção "Sync — Fontes de Verdade Duplicadas" pega a maioria dos esquecimentos acima.
10. Bumpar `CACHE_NAME` em `sw.js` (regra do CLAUDE.md — qualquer mudança em data.js/app.js exige isso).

## Débito conhecido, aceito por ora

- `dayStats.drive` (texto descritivo) não tem validação semântica automática — só estrutura (`km`/`drive`/`hotel` presentes) e o número de km contra rota real. Desync de texto (ex: descrição errada mas hotel/km certos) não é pego por teste, só por revisão manual.
- 3 highlights sem foto real no disco (placeholder gradiente no lugar): **Horseshoe Bend**, **Page Sand Cave**, **La Brea Tar Pits & Museum**. Têm `placeInfo` completo (endereço/coords/link de mapa funcionam), só falta imagem — não crítico, mas pendente se quiser tirar/gerar fotos reais.
- Dia 14 e dia 15 (empatados, ~770km cada — Moab→SLC→Twin Falls e Twin Falls→The Dalles) são os dias mais pesados do trip — avaliado dividir em 2 dias via Price/UT ou SLC, rejeitado por exigir +1 dia total (viagem fechada em 33 dias). Ver tips desses dias em `data.js` pro histórico da decisão.
- **Histórico de reordenação (jul/2026)**: rota original era LA→SF (abertura) → [Redwood→Costa Oregon→PNW→Utah] → Vegas (meio) → [Sequoia→Yosemite→Monterey→PCH] → LA. Reorganizada pra LA→Vegas (abertura, 462km) → [bloco central invertido: Page→Utah→PNW→Costa Oregon→Redwood] → SF → [Sequoia→Yosemite→Monterey→PCH, intacto] → LA — economiza ~366km líquidos (troca 2 conexões caras LA-SF + Vegas-Sequoia por LA-Vegas + SF-Sequoia, mais baratas). Mesmo conteúdo 100% preservado, só direção do bloco central invertida dia a dia. Regras fixas (dias 1-4/33 travados, LA sempre 3 noites) mantidas — ver CLAUDE.md.
- **Mt. Rainier: cortado e depois RE-inserido.** Cortado inicialmente porque caía numa segunda-feira (posição antiga) — acesso de inverno a Paradise historicamente só tem plowing garantido fim de semana/feriado. Na reordenação, o trecho Forks→Cannon Beach (hoje dia 18) migrou pra domingo (07/fev/2027), satisfazendo a regra original — Rainier foi reinserido como desvio ida-e-volta via Olympia (SR-7/SR-706, rua sem saída, ~100km cada perna). Dia 18 ficou ~755km (confirmado via OSRM), um dos mais pesados do trip — aceito pelo usuário cientes do trade-off. Tip do dia 18 em `data.js` documenta o desvio e a opção de cortar se o parque estiver fechado/com neve forte.
- Waypoint bug achado durante a reordenação: coordenada de "Head of the Rocks" usada em `tools/generate-routes.js` ficava geograficamente ao norte de Capitol Reef, forçando OSRM a rotear em zigue-zague (chegou a inflar um trecho de 490km estimados pra 622km calculados). Corrigido pra sequência monotônica oeste→leste. Lição: sempre conferir se waypoints novos/reordenados seguem progressão geográfica coerente antes de confiar no km do OSRM — erro não é pego por nenhum teste automático (só por comparação manual texto-vs-OSRM).
- `export-kml.js` foi removido do repo numa limpeza anterior (só gerava KML pro Google My Maps, não fazia parte do PWA) — `hotelCoords` que morava lá virou `hotel-coords.js` standalone porque um teste de regressão ainda depende desse dado.
- Texto de itens individuais (tipo distância/tempo embutido no meio de um `text` de item) pode ter estimativa imprecisa mesmo com `dayStats` e rota corrigidos — esses textos descrevem trechos internos do dia, não validados automaticamente por teste. Já achado múltiplas vezes durante a reordenação de jul/2026 (ex: dia 15 citava ~500km num trecho que o OSRM confirmou ser ~770km) — revisão manual continua necessária pra esse tipo de erro.
