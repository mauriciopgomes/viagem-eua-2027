const fs = require('fs');
const vm = require('vm');

// Load all sources
const dataJs = fs.readFileSync('./data.js', 'utf8');
const appJs = fs.readFileSync('./app.js', 'utf8');

// Create safe context
const ctx = vm.createContext({
    Object,
    console,
    String,
    Array
});

// Execute data.js first
vm.runInNewContext(dataJs, ctx);

// Extract and execute placeInfo + helper functions from app.js
const activityPhotosMatch = appJs.match(/const activityPhotos = \{[\s\S]*?\n\};/);
const placeInfoMatch = appJs.match(/const placeInfo = \{[\s\S]*?\n\};/);
const findPhotoMatch = appJs.match(/function findPhoto.*?\n\}/s);
const findPlaceInfoMatch = appJs.match(/function findPlaceInfo.*?\n\}/s);
const typeLabel = appJs.match(/const typeLabel = \{[\s\S]*?\};/)[0];

if (placeInfoMatch && activityPhotosMatch && findPhotoMatch && findPlaceInfoMatch) {
    vm.runInNewContext(activityPhotosMatch[0], ctx);
    vm.runInNewContext(placeInfoMatch[0], ctx);
    vm.runInNewContext(typeLabel, ctx);
    vm.runInNewContext(findPhotoMatch[0], ctx);
    vm.runInNewContext(findPlaceInfoMatch[0], ctx);
    vm.runInNewContext('const _placeKeys = Object.keys(placeInfo).sort((a, b) => b.length - a.length);', ctx);
    
    const days = ctx.days;
    const findPlaceInfo = ctx.findPlaceInfo;
    const findPhoto = ctx.findPhoto;
    
    let missingDetails = 0;
    let missingPhotos = 0;
    const issues = [];
    
    days.forEach(day => {
        day.items?.forEach((item, idx) => {
            const text = item.text.replace(/<[^>]+>/g, '');
            const pi = vm.runInNewContext(`findPlaceInfo('${text.replace(/'/g, "\\'")}')`, ctx);
            const photo = vm.runInNewContext(`findPhoto('${text.replace(/'/g, "\\'")}')`, ctx);
            
            if (pi && !pi.info.detail) {
                missingDetails++;
                issues.push(`${day.day}|${item.time}|${text}|NO_DETAIL`);
            }
            if (!photo) {
                missingPhotos++;
                issues.push(`${day.day}|${item.time}|${text}|NO_PHOTO`);
            }
        });
    });
    
    console.log(`⚠️  Sem descrição (detail): ${missingDetails}`);
    console.log(`⚠️  Sem foto: ${missingPhotos}`);
    console.log(`\n${issues.join('\n')}`);
}
