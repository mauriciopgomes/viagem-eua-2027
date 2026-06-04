#!/usr/bin/env python3
"""
Restructure trip: remove buffer Day 11, renumber, insert Big Bear Lake Day 31.
Updates both data.js and roteiro.md.
"""
import re
from datetime import datetime, timedelta

TRIP_START = datetime(2027, 1, 21)
WD = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

def day_info(n):
    """Return (dd/mm, weekday_abbr) for day number n."""
    dt = TRIP_START + timedelta(days=n - 1)
    return f"{dt.day:02d}/{dt.month:02d}", WD[dt.weekday()]

# ============================================================
# DATA.JS
# ============================================================
with open('data.js', 'r', encoding='utf-8') as f:
    dlines = f.readlines()

# --- 1. Remove buffer day object ---
buf_line = next(i for i, l in enumerate(dlines) if 'dia-11b.jpg' in l)
start = buf_line
while start > 0 and dlines[start].rstrip() != '    {':
    start -= 1
end = buf_line
while end < len(dlines) and dlines[end].rstrip() != '    },':
    end += 1
del dlines[start:end + 1]
print(f"  Removed buffer day (lines {start}-{end})")

# --- 2. Insert Big Bear day object before LA dia cheio ---
cheio_line = next(i for i, l in enumerate(dlines) if '"LA dia cheio"' in l)
obj_start = cheio_line
while obj_start > 0 and dlines[obj_start].rstrip() != '    {':
    obj_start -= 1

bb_block = """    {
        photo: 'img/dia-bb.jpg', shortLoc: 'Big Bear',
        chargeStops: [
            { name: 'San Bernardino, CA', leg: 'LA \u2192 Big Bear', critical: false }
        ],
        location: "Big Bear Lake",
        route: "Neve nas montanhas! \u26f7\ufe0f",
        note: "Day trip a Big Bear Lake \u2014 neve a 2h de LA!",
        region: "ca",
        items: [
            { time: "08:00", text: "\u2615 Caf\u00e9", type: "" },
            { time: "08:30", text: "\U0001f697 LA \u2192 <strong>Big Bear Lake</strong> (~160 km, ~2h via CA-330)", type: "drive" },
            { time: "10:00", text: "\u26a1 <strong>Supercharger San Bernardino</strong> (no caminho) \u2014 ~20 min", type: "charge" },
            { time: "10:45", text: "\U0001f3d4\ufe0f Chegada em <strong>Big Bear</strong>!", type: "" },
            { time: "11:00", text: "\u26f7\ufe0f <strong>Snow Summit</strong> \u2014 snow tubing / snow play!", type: "highlight" },
            { time: "12:30", text: "\U0001f37d\ufe0f Almo\u00e7o em <strong>Big Bear Village</strong>", type: "food" },
            { time: "13:30", text: "\U0001f3a2 <strong>Alpine Slide at Magic Mountain</strong> \u2014 tobog\u00e3 alpino!", type: "highlight" },
            { time: "14:30", text: "\U0001f97e <strong>Castle Rock Trail</strong> (~1.5 km) \u2014 vista panor\u00e2mica do lago", type: "" },
            { time: "15:30", text: "\U0001f6cd\ufe0f Passear pelo <strong>Big Bear Village</strong> \u2014 lojas, caf\u00e9s", type: "" },
            { time: "16:00", text: "\u2615 Chocolate quente com vista pro lago!", type: "" },
            { time: "16:30", text: "\U0001f697 Volta pra LA (~2h)", type: "drive" },
            { time: "18:30", text: "\U0001f37d\ufe0f Jantar em LA", type: "food" }
        ],
        tips: ["\u26a1 Round trip ~320 km com subida forte. Carregar 100% antes ou parar em San Bernardino.", "\u2744\ufe0f Big Bear a 2.000m \u2014 pode ter neve! Levar casacos e botas. Chains podem ser obrigat\u00f3rias na CA-330."]
    },
"""
bb_lines = [l + '\n' for l in bb_block.split('\n')[:-1]]
for j, bl in enumerate(bb_lines):
    dlines.insert(obj_start + j, bl)
print(f"  Inserted Big Bear day at line {obj_start}")

# --- 3. Rejoin and update section comments ---
data_text = ''.join(dlines)
section_map = [
    ('UTAH (Dias 9-14)', 'UTAH (Dias 9-13)'),
    ('TRANSIÇÃO → PNW (Dias 15-16)', 'TRANSIÇÃO → PNW (Dias 14-15)'),
    ('PNW (Dias 17-20)', 'PNW (Dias 16-19)'),
    ('REDWOOD (Dias 21-22)', 'REDWOOD (Dias 20-21)'),
    ('SAN FRANCISCO (Dias 23-25)', 'SAN FRANCISCO (Dias 22-24)'),
    ('PCH + YOSEMITE + SEQUOIA (Dias 26-30)', 'PCH + YOSEMITE + SEQUOIA (Dias 25-29)'),
    ('LA (Dias 31-33)', 'LA (Dias 30-33)'),
]
for old, new in section_map:
    data_text = data_text.replace(old, new)
print("  Updated section comments")

# --- 4. Replace hotels array ---
h_start = data_text.index('const hotels = [')
h_end = data_text.index('];', h_start) + 2

new_hotels = """const hotels = [
    { num: 1, name: "Marriott Marquis, Times Square, NY", checkin: "21/01", checkout: "25/01", nights: 4 },
    { num: 2, name: "Las Vegas, NV", checkin: "25/01", checkout: "28/01", nights: 3 },
    { num: 3, name: "Springdale, UT (Zion)", checkin: "28/01", checkout: "30/01", nights: 2 },
    { num: 4, name: "Bryce Canyon, UT", checkin: "30/01", checkout: "31/01", nights: 1 },
    { num: 5, name: "Moab, UT (Arches/Canyonlands)", checkin: "31/01", checkout: "03/02", nights: 3 },
    { num: 6, name: "Twin Falls, ID", checkin: "03/02", checkout: "04/02", nights: 1 },
    { num: 7, name: "Centralia, WA", checkin: "04/02", checkout: "05/02", nights: 1 },
    { num: 8, name: "Forks / Port Angeles, WA (Olympic)", checkin: "05/02", checkout: "07/02", nights: 2 },
    { num: 9, name: "Cannon Beach, OR", checkin: "07/02", checkout: "08/02", nights: 1 },
    { num: 10, name: "Gold Beach / Coos Bay, OR", checkin: "08/02", checkout: "09/02", nights: 1 },
    { num: 11, name: "Crescent City / Klamath, CA", checkin: "09/02", checkout: "10/02", nights: 1 },
    { num: 12, name: "Eureka / Arcata, CA", checkin: "10/02", checkout: "11/02", nights: 1 },
    { num: 13, name: "San Francisco, CA", checkin: "11/02", checkout: "14/02", nights: 3 },
    { num: 14, name: "Carmel, CA", checkin: "14/02", checkout: "15/02", nights: 1 },
    { num: 15, name: "Mariposa / El Portal, CA", checkin: "15/02", checkout: "18/02", nights: 3 },
    { num: 16, name: "Three Rivers, CA (Sequoia)", checkin: "18/02", checkout: "19/02", nights: 1 },
    { num: 17, name: "Los Angeles, CA", checkin: "19/02", checkout: "22/02", nights: 3 }
];"""
data_text = data_text[:h_start] + new_hotels + data_text[h_end:]
print("  Updated hotels array")

# --- 5. Replace parks array ---
p_start = data_text.index('const parks = [')
p_end = data_text.index('];', p_start) + 2

new_parks = (
    'const parks = [\n'
    '    { name: "\U0001f3dc\ufe0f Death Valley National Park", days: "Dia 7", highlights: "Badwater Basin (-86m!), Zabriskie Point, Artist\'s Palette, Devil\'s Golf Course, Mesquite Sand Dunes." },\n'
    '    { name: "\U0001f3de\ufe0f Zion National Park", days: "Dias 8\u201310", highlights: "Watchman Trail, Emerald Pools, Canyon Overlook, Riverside Walk, Court of the Patriarchs." },\n'
    '    { name: "\U0001f3d4\ufe0f Bryce Canyon National Park", days: "Dias 10\u201311", highlights: "Navajo Loop, Queen\'s Garden, hoodoos, Bryce Amphitheater, stargazing!" },\n'
    '    { name: "\U0001f3dc\ufe0f Canyonlands National Park", days: "Dia 12", highlights: "Mesa Arch sunrise, Grand View Point, Upheaval Dome, Aztec Butte." },\n'
    '    { name: "\U0001f3dc\ufe0f Arches National Park", days: "Dia 13", highlights: "Delicate Arch, Windows, Double Arch, Landscape Arch (93m!), Fiery Furnace." },\n'
    '    { name: "\U0001f30b Mt. Rainier National Park", days: "Dia 16", highlights: "Paradise, neve, vulc\u00e3o de 4.392m." },\n'
    '    { name: "\U0001f332 Olympic National Park", days: "Dias 16\u201317", highlights: "Hoh Rain Forest, Hall of Mosses, Ruby Beach, La Push (Twilight!), Sol Duc Falls." },\n'
    '    { name: "\U0001f332 Redwood National Park", days: "Dias 20\u201321", highlights: "Stout Memorial Grove, Fern Canyon (Jurassic Park 2!), Tall Trees, Lady Bird Johnson, Avenue of Giants." },\n'
    '    { name: "\U0001f3de\ufe0f Yosemite National Park", days: "Dias 27\u201328", highlights: "Tunnel View, El Capitan, Half Dome, Yosemite Falls, Badger Pass, Mirror Lake." },\n'
    '    { name: "\U0001f332 Sequoia + Kings Canyon NP", days: "Dia 29", highlights: "General Sherman Tree (maior \u00e1rvore!), Congress Trail, Moro Rock, General Grant Tree." }\n'
    '];'
)
data_text = data_text[:p_start] + new_parks + data_text[p_end:]
print("  Updated parks array")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_text)
print("✅ data.js saved\n")


# ============================================================
# ROTEIRO.MD
# ============================================================
with open('roteiro.md', 'r', encoding='utf-8') as f:
    md = f.read()

# --- 1. Remove Day 11 section ---
# Pattern: ### Dia 11 header + quote + ---
day11_pat = r'\n### Dia 11 [^\n]+\n\n>[^\n]+\n\n---\n'
md = re.sub(day11_pat, '\n', md)
print("  Removed Day 11 section")

# --- 2. Renumber day headers (12-31 → 11-30) ---
def replace_header(m):
    old_num = int(m.group(1))
    if old_num < 12 or old_num > 31:
        return m.group(0)
    new_num = old_num - 1
    date_str, wd = day_info(new_num)
    rest = m.group(2)
    return f"### Dia {new_num} \u2014 {wd}, {date_str} {rest}"

md = re.sub(r'### Dia (\d+) \u2014 \w+, \d+/\d+ (.+)', replace_header, md)
print("  Renumbered day headers")

# --- 3. Insert Big Bear Day 31 section (before ### Dia 32) ---
day32_pos = md.index('### Dia 32')

big_bear_md = (
    "\n### Dia 31 \u2014 S\u00e1b, 20/02 (Day trip Big Bear Lake) \U0001f4cd Los Angeles, CA\n"
    "\n"
    "> Neve nas montanhas a 2h de LA! Snow tubing e vila de montanha.\n"
    "\n"
    "| Hor\u00e1rio | Atividade |\n"
    "|---------|----------|\n"
    "| 08:00 | \u2615 Caf\u00e9 |\n"
    "| 08:30 | \U0001f697 LA \u2192 **Big Bear Lake** (~160 km, ~2h via CA-330) |\n"
    "| 10:00 | \u26a1 **Supercharger San Bernardino** (no caminho) \u2014 ~20 min |\n"
    "| 10:45 | \U0001f3d4\ufe0f Chegada em **Big Bear**! |\n"
    "| 11:00 | \u26f7\ufe0f **Snow Summit** \u2014 snow tubing / snow play! |\n"
    "| 12:30 | \U0001f37d\ufe0f Almo\u00e7o em **Big Bear Village** |\n"
    "| 13:30 | \U0001f3a2 **Alpine Slide at Magic Mountain** \u2014 tobog\u00e3 alpino! |\n"
    "| 14:30 | \U0001f97e **Castle Rock Trail** (~1.5 km) \u2014 vista panor\u00e2mica do lago |\n"
    "| 15:30 | \U0001f6cd\ufe0f Passear pelo **Big Bear Village** \u2014 lojas, caf\u00e9s |\n"
    "| 16:00 | \u2615 Chocolate quente com vista pro lago! |\n"
    "| 16:30 | \U0001f697 Volta pra LA (~2h) |\n"
    "| 18:30 | \U0001f37d\ufe0f Jantar em LA |\n"
    "\n"
    "> \u26a1 Round trip ~320 km com subida forte. Carregar 100% antes ou parar em San Bernardino.\n"
    "> \u2744\ufe0f Big Bear a 2.000m \u2014 pode ter neve! Levar casacos e botas. Chains podem ser obrigat\u00f3rias na CA-330.\n"
    "\n"
    "---\n"
    "\n"
)

md = md[:day32_pos] + big_bear_md + md[day32_pos:]
print("  Inserted Big Bear Day 31 section")

# --- 4. Update section headers ---
for old, new in [
    ('UTAH (Dias 9-14)', 'UTAH (Dias 9-13)'),
    ('TRANSIÇÃO → PNW (Dias 15-16)', 'TRANSIÇÃO → PNW (Dias 14-15)'),
    ('PNW — PACIFIC NORTHWEST (Dias 17-20)', 'PNW — PACIFIC NORTHWEST (Dias 16-19)'),
    ('REDWOOD (Dias 21-22)', 'REDWOOD (Dias 20-21)'),
    ('SAN FRANCISCO (Dias 23-25)', 'SAN FRANCISCO (Dias 22-24)'),
    ('PCH + YOSEMITE + SEQUOIA (Dias 26-30)', 'PCH + YOSEMITE + SEQUOIA (Dias 25-29)'),
    ('LOS ANGELES (Dias 31-33)', 'LOS ANGELES (Dias 30-33)'),
]:
    md = md.replace(old, new)
print("  Updated section headers")

# --- 5. Replace Rota Visual ---
old_rota = (
    "```\n"
    "NYC \u2708\ufe0f LAX \u2192 Las Vegas \u2192 Hoover Dam \u2192 Route 66 \u2192 Grand Canyon\n"
    "\u2192 Zion \u2192 Bryce Canyon \u2192 Moab (Canyonlands + Arches)\n"
    "\u2192 Antelope Island \u2192 Twin Falls \u2192 Multnomah Falls \u2192 Centralia\n"
    "\u2192 Mt. Rainier \u2192 Olympic NP \u2192 Cannon Beach \u2192 Costa Oregon \u2193\n"
    "\u2192 Redwood NP \u2192 Eureka \u2192 SF \u2192 PCH (Monterey \u2192 Big Sur)\n"
    "\u2192 Yosemite \u2192 Sequoia/KC \u2192 LA \u2708\ufe0f volta\n"
    "```"
)
new_rota = (
    "```\n"
    "NYC \u2708\ufe0f LAX \u2192 Las Vegas \u2192 Valley of Fire\n"
    "\u2192 Zion \u2192 Bryce Canyon \u2192 Moab (Canyonlands + Arches)\n"
    "\u2192 Antelope Island \u2192 Twin Falls \u2192 Multnomah Falls \u2192 Centralia\n"
    "\u2192 Mt. Rainier \u2192 Olympic NP \u2192 Cannon Beach \u2192 Costa Oregon \u2193\n"
    "\u2192 Redwood NP \u2192 Eureka \u2192 SF \u2192 PCH (Monterey \u2192 Big Sur)\n"
    "\u2192 Yosemite \u2192 Sequoia/KC \u2192 Big Bear \u2192 LA \u2708\ufe0f volta\n"
    "```"
)
md = md.replace(old_rota, new_rota)
print("  Updated Rota Visual")

# --- 6. Replace Ordem das Cidades table ---
oc_start = md.index('| # | Cidade/Regi\u00e3o')
oc_end_marker = '> **Total:'
oc_end = md.index(oc_end_marker)
oc_end = md.index('\n', oc_end) + 1

new_oc = (
    "| # | Cidade/Regi\u00e3o | Check-in | Check-out | Noites | Dias |\n"
    "|---|---------------|----------|-----------|--------|------|\n"
    "| 1 | **New York, NY** (Marriott Marquis) | 21/01 (Qui) | 25/01 (Seg) | 4 | 1-4 |\n"
    "| 2 | **Las Vegas, NV** | 25/01 (Seg) | 28/01 (Qui) | 3 | 5-7 |\n"
    "| 3 | **Springdale, UT** (Zion) | 28/01 (Qui) | 30/01 (S\u00e1b) | 2 | 8-9 |\n"
    "| 4 | **Bryce Canyon, UT** | 30/01 (S\u00e1b) | 31/01 (Dom) | 1 | 10 |\n"
    "| 5 | **Moab, UT** (Arches/Canyonlands) | 31/01 (Dom) | 03/02 (Qua) | 3 | 11-13 |\n"
    "| 6 | **Twin Falls, ID** | 03/02 (Qua) | 04/02 (Qui) | 1 | 14 |\n"
    "| 7 | **Centralia, WA** | 04/02 (Qui) | 05/02 (Sex) | 1 | 15 |\n"
    "| 8 | **Forks / Port Angeles, WA** (Olympic) | 05/02 (Sex) | 07/02 (Dom) | 2 | 16-17 |\n"
    "| 9 | **Cannon Beach, OR** | 07/02 (Dom) | 08/02 (Seg) | 1 | 18 |\n"
    "| 10 | **Gold Beach / Coos Bay, OR** | 08/02 (Seg) | 09/02 (Ter) | 1 | 19 |\n"
    "| 11 | **Crescent City / Klamath, CA** (Redwood) | 09/02 (Ter) | 10/02 (Qua) | 1 | 20 |\n"
    "| 12 | **Eureka / Arcata, CA** | 10/02 (Qua) | 11/02 (Qui) | 1 | 21 |\n"
    "| 13 | **San Francisco, CA** | 11/02 (Qui) | 14/02 (Dom) | 3 | 22-24 |\n"
    "| 14 | **Carmel, CA** | 14/02 (Dom) | 15/02 (Seg) | 1 | 25 |\n"
    "| 15 | **Mariposa / El Portal, CA** | 15/02 (Seg) | 18/02 (Qui) | 3 | 26-28 |\n"
    "| 16 | **Three Rivers, CA** (Sequoia) | 18/02 (Qui) | 19/02 (Sex) | 1 | 29 |\n"
    "| 17 | **Los Angeles, CA** | 19/02 (Sex) | 22/02 (Seg) | 3 | 30-33 |\n"
    "\n"
    "> **Total: 32 noites de hospedagem** (noite de 20\u219221/01 no avi\u00e3o GRU\u2192JFK, noite de 22/02 no avi\u00e3o LAX\u2192MIA\u2192GIG)\n"
)
md = md[:oc_start] + new_oc + md[oc_end:]
print("  Updated Ordem das Cidades")

# --- 7. Replace National Parks table ---
np_start = md.index('## \U0001f4ca National Parks')
np_end = md.index('---\n\n## \U0001f4c5 Roteiro Dia a Dia')

new_np = (
    "## \U0001f4ca National Parks no Roteiro (10)\n"
    "\n"
    "| # | National Park | Dia(s) |\n"
    "|---|--------------|--------|\n"
    "| 1 | Death Valley | 7 |\n"
    "| 2 | Zion | 8\u201310 |\n"
    "| 3 | Bryce Canyon | 10\u201311 |\n"
    "| 4 | Canyonlands | 12 |\n"
    "| 5 | Arches | 13 |\n"
    "| 6 | Mt. Rainier | 16 |\n"
    "| 7 | Olympic | 16\u201317 |\n"
    "| 8 | Redwood | 20\u201321 |\n"
    "| 9 | Yosemite | 27\u201328 |\n"
    "| 10 | Sequoia + Kings Canyon | 29 |\n"
    "\n"
)
md = md[:np_start] + new_np + md[np_end:]
print("  Updated National Parks table")

# --- 8. Replace Roteiro Dia a Dia table ---
rdd_start = md.index('| Arquivo | Dias | Regi\u00e3o |')
rdd_end = md.index('| [roteiro-dias-31-33.md]')
rdd_end = md.index('\n', rdd_end) + 1

new_rdd = (
    "| Arquivo | Dias | Regi\u00e3o |\n"
    "|---------|------|--------|\n"
    "| [roteiro-dias-01-05.md](roteiro-dias-01-05.md) | 1-5 | NYC + Voo para Vegas |\n"
    "| [roteiro-dias-06-10.md](roteiro-dias-06-10.md) | 6-10 | Vegas + Death Valley + Zion |\n"
    "| [roteiro-dias-11-15.md](roteiro-dias-11-15.md) | 11-15 | Bryce + Moab + Twin Falls |\n"
    "| [roteiro-dias-16-20.md](roteiro-dias-16-20.md) | 16-20 | PNW: Rainier + Olympic + Oregon |\n"
    "| [roteiro-dias-21-25.md](roteiro-dias-21-25.md) | 21-25 | Redwood + San Francisco |\n"
    "| [roteiro-dias-26-30.md](roteiro-dias-26-30.md) | 26-30 | PCH + Yosemite + Sequoia |\n"
    "| [roteiro-dias-31-33.md](roteiro-dias-31-33.md) | 31-33 | Big Bear + LA + Volta |\n"
)
md = md[:rdd_start] + new_rdd + md[rdd_end:]
print("  Updated Roteiro Dia a Dia table")

# --- 9. Replace Superchargers section ---
sc_start = md.index('## \u26a1 Superchargers')

new_sc = (
    "## \u26a1 Superchargers no Caminho (por dia)\n"
    "\n"
    "| Dia | Rota | Superchargers |\n"
    "|-----|------|---------------|\n"
    "| 5 | LAX \u2192 Vegas | Barstow |\n"
    "| 11 | Bryce \u2192 Moab | Salina, Green River |\n"
    "| 14 | Moab \u2192 Twin Falls | Green River, Price, Twin Falls |\n"
    "| 15 | Twin Falls \u2192 Centralia | Baker City, Pendleton, The Dalles, Centralia |\n"
    "| 16 | Centralia \u2192 Rainier \u2192 Forks | Olympia (100%!) |\n"
    "| 18 | Forks \u2192 Cannon Beach | Aberdeen |\n"
    "| 19 | Cannon Beach \u2192 Gold Beach | Lincoln City, Coos Bay |\n"
    "| 21 | Crescent City \u2192 Eureka | Eureka |\n"
    "| 22 | Eureka \u2192 SF | Ukiah |\n"
    "| 26 | SF \u2192 PCH \u2192 Yosemite | Gilroy, Merced |\n"
    "| 29 | Mariposa \u2192 Sequoia | Fresno |\n"
    "| 30 | Three Rivers \u2192 LA | Bakersfield |\n"
    "| 31 | LA \u2192 Big Bear \u2192 LA | San Bernardino |\n"
)
md = md[:sc_start] + new_sc
print("  Updated Superchargers table")

with open('roteiro.md', 'w', encoding='utf-8') as f:
    f.write(md)
print("✅ roteiro.md saved\n")

# ============================================================
# VERIFICATION
# ============================================================
# Count days in data.js
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Count day objects by counting 'shortLoc:' occurrences (each day has one)
day_count = content.count("shortLoc:")
print(f"Verification:")
print(f"  Days in data.js: {day_count} (expected: 33)")

# Verify Big Bear is present
assert 'Big Bear Lake' in content, "Big Bear Lake not found in data.js!"
assert 'dia-11b.jpg' not in content, "Buffer day still in data.js!"
print(f"  Big Bear present: ✓")
print(f"  Buffer removed: ✓")

# Check roteiro.md
with open('roteiro.md', 'r', encoding='utf-8') as f:
    rmd = f.read()
day_headers = re.findall(r'### Dia (\d+) \u2014', rmd)
day_nums = sorted(int(d) for d in day_headers)
print(f"  Days in roteiro.md: {day_nums}")
expected = list(range(2, 34))  # 2-33 (Day 1 not in roteiro.md)
if day_nums == expected:
    print(f"  Day numbering: ✓ (2-33)")
else:
    missing = set(expected) - set(day_nums)
    extra = set(day_nums) - set(expected)
    if missing:
        print(f"  Missing days: {sorted(missing)}")
    if extra:
        print(f"  Extra days: {sorted(extra)}")

print("\n🎉 Restructuring complete!")
