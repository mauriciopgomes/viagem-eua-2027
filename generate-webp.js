#!/usr/bin/env node
// generate-webp.js — Convert JPG images to WebP format for better compression
// Usage: npm install sharp && node generate-webp.js
// Generates: original.webp and original-400w.webp (thumbnail)

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertImagesToWebP() {
    const imgDir = path.join(__dirname, 'img');
    const activitiesDir = path.join(imgDir, 'activities');
    const diaryDir = imgDir;
    
    let converted = 0;
    let skipped = 0;

    // Function to convert a JPG to WebP
    async function convertImage(inputPath) {
        const ext = path.extname(inputPath).toLowerCase();
        if (ext !== '.jpg') return false;

        const dirname = path.dirname(inputPath);
        const basename = path.basename(inputPath, '.jpg');
        const webpPath = path.join(dirname, `${basename}.webp`);
        const webpThumbPath = path.join(dirname, `${basename}-400w.webp`);

        try {
            // Skip if already exists
            if (fs.existsSync(webpPath) && fs.existsSync(webpThumbPath)) {
                console.log(`⏭️  ${basename}.webp (already exists)`);
                return false;
            }

            // Convert full-size image
            if (!fs.existsSync(webpPath)) {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                console.log(`✅ ${basename}.webp`);
                converted++;
            }

            // Convert thumbnail (400px width, maintain aspect ratio)
            if (!fs.existsSync(webpThumbPath)) {
                await sharp(inputPath)
                    .resize(400, 400, { fit: 'cover' })
                    .webp({ quality: 75 })
                    .toFile(webpThumbPath);
                console.log(`✅ ${basename}-400w.webp`);
                converted++;
            }

            return true;
        } catch (err) {
            console.error(`❌ Error converting ${basename}: ${err.message}`);
            return false;
        }
    }

    // Process day photos (dia-NN.jpg)
    console.log('📸 Processing day photos...');
    for (let i = 1; i <= 33; i++) {
        const dayFile = path.join(diaryDir, `dia-${String(i).padStart(2, '0')}.jpg`);
        if (fs.existsSync(dayFile)) {
            await convertImage(dayFile);
        }
    }

    // Process activity photos
    if (fs.existsSync(activitiesDir)) {
        console.log('\n🎬 Processing activity photos...');
        const files = fs.readdirSync(activitiesDir);
        for (const file of files) {
            if (file.endsWith('.jpg')) {
                const filePath = path.join(activitiesDir, file);
                await convertImage(filePath);
            }
        }
    }

    console.log(`\n📊 Summary: ${converted} WebP files created`);
}

// Check if sharp is installed
try {
    require('sharp');
    convertImagesToWebP().catch(err => {
        console.error('❌ Fatal error:', err.message);
        process.exit(1);
    });
} catch (e) {
    console.error('❌ sharp not installed. Run: npm install sharp');
    process.exit(1);
}
