const fs = require('fs');
const vm = require('vm');

const dataJs = fs.readFileSync('./data.js', 'utf8');
const appJs = fs.readFileSync('./app.js', 'utf8');

// Extract placeInfo from app.js
const placeInfoMatch = appJs.match(/const placeInfo = \{([\s\S]*?)\n\}/);
if (!placeInfoMatch) {
    console.error('Could not find placeInfo');
    process.exit(1);
}

// Parse placeInfo
const ctx = vm.createContext({ days: [], placeInfo: {} });
vm.runInNewContext(dataJs, ctx);
const days = ctx.days;

// Manually extract placeInfo keys
const placeKeys = new Set();
let match;
const regex = /['"]([^'"]+)['"]:\s*\{\s*addr:/g;
const placeInfoStr = appJs.substring(appJs.indexOf('const placeInfo = {'));
while ((match = regex.exec(placeInfoStr)) !== null) {
    placeKeys.add(match[1]);
}

console.log('\n📋 AUDIT DE TILES E DESCRIÇÕES\n');

const missingDesc = [];
const missingPhoto = [];
const noDetailCheck = [];

days.forEach(day => {
    console.log(`\n📅 ${day.title} (Dia ${day.day})`);
    
    day.items?.forEach((item, idx) => {
        const text = item.text.replace(/<[^>]+>/g, '');
        
        // Check if has detail in placeInfo
        let found = false;
        for (const key of placeKeys) {
            if (text.indexOf(key) !== -1) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            const hasBullet = /^[🏖🎭🍽️🗺️☕🚗⛺🏨🎢🛣️🎪🎨🎬📸🏞️🏔️⛰️🚵🧗🎣🏕️♨️🎯🏛️🎨🏰🗽⛪🕌🏰🎪🎡🎢🎠📺🎭🎬🎤🎪🛍️🏬🛒🍽️🍷🍺🍔🍕🍜🍱🥘🌮🍛🍝🥞☕🍰🎂🧁🍪🍩🥐🍞🧈🍯🥛]/.test(item.text[0]);
            console.log(`  ⚠️  ${item.time} - ${text.substring(0, 50)}`);
            missingDesc.push({ day: day.day, time: item.time, text: text.substring(0, 60) });
        }
    });
});

console.log(`\n\n📊 RESUMO`);
console.log(`Total de tiles sem descrição: ${missingDesc.length}`);

if (missingDesc.length > 0) {
    console.log(`\n📝 TILES QUE PRECISAM DE DESCRIÇÃO:\n`);
    missingDesc.forEach(item => {
        console.log(`  • Dia ${item.day} - ${item.time}: "${item.text}"`);
    });
}
