# 🚗 Viagem EUA 2027 — PWA Interativa

Uma Progressive Web App (PWA) interativa para um road trip de **33 dias** pelos EUA em Tesla, com mapa, sincronização com Google Sheets e funcionalidade offline completa.

## ✨ Features

- **📱 Instalável** — Add to Home Screen (iOS/Android)
- **🗺️ Mapa interativo** — Leaflet.js com tiles offline
- **🔄 Sincronização** — Google Apps Script + localStorage
- **📝 Notas pessoais** — Salvas localmente e sincronizadas
- **💾 Offline-first** — Service Worker com precache
- **⚡ Performance** — Lazy loading, code splitting, stale-while-revalidate
- **🌙 Dark theme** — Otimizado para baterias
- **📊 11 National Parks** — Death Valley, Zion, Yosemite, Sequoia, e mais
- **⚙️ 22 Superchargers** — Planejados na rota

## 🚀 Quick Start

### Instalação (Add to Home Screen)

**iOS (Safari):**
1. Abra https://viagem-eua-2027.vercel.app (ou local)
2. Toque **Compartilhar** → **Adicionar à Tela de Início**
3. Pronto! App instalado

**Android (Chrome):**
1. Abra o site
2. Toque o menu (⋮) → **Instalar app**
3. Pronto!

### Local Development

```bash
# Clonar e entrar no diretório
git clone https://github.com/mauriciopgomes/viagem-eua-2027.git
cd viagem/2027

# Executar testes
node tests.js

# Servir localmente (Python 3)
python3 -m http.server 8000

# Abrir http://localhost:8000
```

## 📁 Estrutura do Projeto

```
.
├── index.html           # App shell + PWA meta tags
├── app.js              # Lógica principal (2500+ linhas)
├── pwa.js              # Registro Service Worker + update toast
├── sync.js             # Google Sheets sync + haptic feedback
├── data.js             # 33 dias, 11 parques, 22 superchargers
├── styles.css          # Dark theme + responsive
├── sw.js               # Service Worker (precache + tiles offline)
├── manifest.json       # PWA manifest com shortcuts
├── tests.js            # 174 testes de validação
├── visual-smoke-test.js # Testes E2E (opcional com Playwright)
├── img/                # Fotos dos dias (dia-01.jpg até dia-33.jpg)
├── img/activities/     # ~100 fotos de atividades
├── icons/              # App icons (192, 512, maskable)
├── lib/                # Leaflet.js (mapas)
└── fonts/              # Inter font
```

## 🏗️ Arquitetura

### Modular (3 scripts de entrada)
- **app.js** — Lógica principal, renderização, gestos
- **pwa.js** — Service Worker registration + update notifications
- **sync.js** — Google Sheets sync engine + haptic feedback

### Cache Strategy
- **Precache** (SW install) — Críticos: HTML, CSS, JS, fonts, ícones
- **Runtime Cache** — Tiles de mapa com stale-while-revalidate
- **LocalStorage** — Checks, favorites, notas (sincronizadas)

### Storage
- **localStorage** — State rápido (~5-10MB)
- **IndexedDB** (futuro) — Para datasets maiores
- **Google Sheets** — Source of truth via Google Apps Script

## ➕ Como Adicionar um Novo Dia

### 1. Adicionar ao `data.js`:

```javascript
// Array 'days'
{
    photo: 'img/dia-34.jpg',
    shortLoc: 'Nova Cidade',
    chargeStops: [
        { name: 'Supercharger', leg: 'Anterior → Nova', critical: true }
    ],
    location: "Nova Cidade, ST",
    route: "Descrição da viagem",
    note: "Notas",
    region: "ca",
    items: [
        { time: "08:00", text: "☕ Café", type: "" },
        { time: "09:00", text: "🚗 Dirigindo", type: "drive" },
        // ... mais atividades
    ],
    tips: ["Dica 1", "Dica 2"]
}
```

### 2. Atualizar `manifest.json`:
```json
"description": "Roteiro interativo — 34 dias pelos EUA"
```

### 3. Atualizar `index.html` (hero section):
```html
<span class="hero-badge">🏞️ <b>12</b> Parks</span>
```

### 4. Adicionar foto (`img/dia-XX.jpg`):
- Tamanho sugerido: 960×641px
- Criar também versão WebP (`.webp`)

### 5. Rodar testes:
```bash
node tests.js
```

## 🔄 Sincronização com Google Sheets

### Setup (one-time):

1. Criar Google Apps Script (`google-apps-script.js` — já fornecido)
2. Deploy como Web App
3. Copiar URL no settings do app
4. Cole em "🔗 Sincronizar com Google Sheets"

### Como funciona:
- **Push** — Envia checks, favorites, notas
- **Pull** — Recebe atualizações de outros dispositivos
- **Offline** — Queue local até reconexão
- **Retry** — Backoff exponencial (3s, 6s, 12s... até 30s)

## 🧪 Testes

### Suite Principal (174 testes):
```bash
node tests.js
```

Cobre:
- ✅ Estrutura de dados (33 dias, 11 parques, 22 SC)
- ✅ Service Worker (cache, offline, tiles)
- ✅ PWA (manifest, shortcuts, icons)
- ✅ HTML/CSS (responsive, a11y, performance)
- ✅ Sync engine (track, push, pull, merge)
- ✅ Integração cross-file

### Visual Smoke Test (opcional):
```bash
node visual-smoke-test.js
```

Requer Playwright:
```bash
npm install playwright
```

Testa navegação real da UI.

## ⚡ Performance

### Lighthouse Targets:
- 🟢 Performance: 90+
- 🟢 Accessibility: 95+
- 🟢 Best Practices: 95+
- 🟢 SEO: 100
- 🟢 PWA: 100

### Otimizações:
1. **Lazy loading** — Imagens com `loading="lazy"`
2. **Preload próximos dias** — Renderização ahead-of-time
3. **Code splitting** — pwa.js + sync.js separados
4. **Stale-while-revalidate** — Tiles sempre rápidos
5. **Compression** — WebP com fallback JPG

## 📱 Shortcuts (iOS/Android)

Pressione e mantenha o ícone do app:

- 🗺️ **Mapa** — Abre aba de mapa
- 📍 **Big Bear** — Pula para Dia 31 (day trip)
- ⭐ **Favoritos** — Abre seção de exploração

## 🛠️ Troubleshooting

### "SW não registra"
```bash
# Verificar HTTPS + manifest.json
# Limpar cache do browser: DevTools → Application → Clear storage
```

### "Sync não funciona"
- Verificar URL do Google Apps Script
- Abrir DevTools → Network → procurar por `script.google.com`
- Verificar localStorage: `localStorage.getItem('syncUrl')`

### "Imagens não aparecem"
- Confirmar arquivo existe: `img/activities/xxx.jpg`
- Rodar: `node tests.js | grep "Activity photos"`

## 📊 Dados da Viagem

| Métrica | Valor |
|---------|-------|
| Duração | 33 dias |
| Data | 21/01 - 22/02 (2027) |
| Distância | ~6.500 km |
| National Parks | 11 |
| Superchargers | 22 |
| Hotéis | 17 |
| Atividades | 350+ |
| Fotos | 400+ |

## 🗺️ Roteiro

```
NYC 🚗 → Las Vegas → Valley of Fire
  → Zion → Bryce Canyon → Moab (Canyonlands + Arches)
  → Twin Falls → Mt. Rainier → Olympic NP
  → Redwood NP → San Francisco → Yosemite
  → Sequoia/Kings Canyon → Big Bear → LA 🚗 volta
```

## 📜 Licença

MIT — Livre para usar, modificar e compartilhar

## 👤 Autor

Maurício Gomes — [@mauriciopgomes](https://github.com/mauriciopgomes)

---

**Divirta-se na viagem! 🚗⚡🏞️**
