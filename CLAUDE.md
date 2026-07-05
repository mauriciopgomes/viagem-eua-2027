# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repo.

## Project

PWA interativa: road trip 33 dias EUA em Tesla (21 jan – 22 fev 2027). Vanilla HTML/CSS/JS — sem frameworks, sem build tools. Deploy GitHub Pages (opcionalmente Vercel).

## Comandos

```bash
npm run dev          # Servir localmente: python3 -m http.server 8000
npm test             # Suite principal: node tests.js && node test-sync.js
npm run lint         # ESLint com zero warnings permitidos
npm run lint:fix     # ESLint com autocorreção
npm run e2e          # Testes E2E com Puppeteer (requer npm install playwright)
npm run webp         # Gerar versões WebP das imagens (requer sharp)
npm run version:check # Verificar/bumpar versão do cache (auto-version.js)
```

Teste único: funções inline em `tests.js` — adicione `console.log` temporário ou isole seção.

## Arquitetura

### Ordem de carregamento dos scripts (index.html)

```
data.js → storage.js → trails.js → app.js → pwa.js → sync.js
```

Cada arquivo expõe globais; sem módulos ES. `app.js` depende de `data.js` e `storage.js` carregados.

### Módulos principais

| Arquivo | Responsabilidade |
|---------|-----------------|
| `data.js` | Fonte de verdade: array `days` (33 dias), `hotels`, `parks`, `superchargers`, `dayPhotos` |
| `app.js` | Renderização, navegação por abas, mapa Leaflet, gestos, busca, favoritos (~2500 linhas) |
| `storage.js` | `StorageLayer` — abstração localStorage, fallback IndexedDB |
| `sync.js` | `SyncEngine` — sync Google Apps Script (debounce 3s, queue local, retry exponencial) |
| `pwa.js` | Registro Service Worker + toast "Nova versão disponível" |
| `sw.js` | Service Worker: precache assets críticos + cache tiles mapa (stale-while-revalidate) |
| `trails.js` | Dados trilhas parques nacionais |

### Versionamento do cache

Cache Service Worker usa `viagem-eua-2027-vN` (mesmo N do major em `package.json`). **Sempre que modificar** `index.html`, `app.js`, `pwa.js`, `sync.js`, `storage.js`, `styles.css`, `manifest.json` ou `data.js`, incremente em `sw.js`:

```js
const CACHE_NAME = 'viagem-eua-2027-v197'; // ← bumpar aqui
```

`auto-version.js` faz isso automaticamente no CI (GitHub Actions).

### Sync com Google Sheets

`SyncEngine` usa `localStorage` como queue local. Fluxo: `track(key, value)` → debounce 3s → `push()` → POST Google Apps Script URL. URL salvo em `localStorage.syncUrl`. Retry backoff exponencial (3s → 6s → 12s → máx 30s).

### Dados da viagem (`data.js`)

**Adicionar/reordenar dias**: edite array `days` — `initDays()` recalcula número, data e dia da semana. Cada item:
- `type`: `""` | `"drive"` | `"food"` | `"highlight"` — controla ícone/estilo
- `chargeStops`: array de `{ name, leg, critical }` para superchargers do dia
- `region`: código de região para agrupamento no mapa

### Restrições fixas da viagem (não mudar sem confirmar com usuário)

- **Dias 1-4 (NYC) e dia 33 (voo de volta)**: travados — voos e hotel de NY já comprados. Qualquer reorganização de rota (ex: inverter o road trip) só pode mexer do dia 5 ao dia 32.
- **LA no final da viagem**: sempre 3 noites. Hoje já está em 3 (`hotels[]`, último hotel) — não reduzir em nenhuma reorganização futura.
- **33 dias no total**: fixo, sem espaço pra adicionar dia extra (avaliado e rejeitado antes pra resolver dia 14/15 pesados — ver tips desses dias em `data.js`).

## Convenções

- **Tema**: sempre dark — fundo `#191919`, texto `#e3e3e3`. Sem toggle de tema.
- **CSS**: variáveis em `:root` para todas as cores; mobile-first.
- **Conteúdo**: pt-BR. `<strong>` para nomes de lugares em itens de texto.
- **Emojis**: prefixo obrigatório nos itens do itinerário (`{ time: "09:00", text: "🏛️ ..." }`).
- **Segurança**: usar `escapeHtml()` para conteúdo do usuário; nunca `eval`/`new Function`.
- **JS**: ES2021 vanilla, sem TypeScript. Objetos globais (`SyncEngine`, `StorageLayer`) em vez de módulos.

## CI/CD

GitHub Actions (`.github/workflows/deploy.yml`): push `main` → lint + testes → `auto-version.js` → deploy GitHub Pages. Falha se lint ou testes falharem.

## Agentes Copilot disponíveis

Tarefas especializadas — agentes em `.github/agents/`:
- `@pwa-manager` — entrada única, roteia ao especialista
- `@pwa-service-worker`, `@pwa-ui`, `@pwa-performance`, `@pwa-data`, `@pwa-testing-qa`, `@pwa-sync-data`, `@pwa-a11y-seo`, `@pwa-security`, `@pwa-devops-release`