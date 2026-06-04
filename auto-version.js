#!/usr/bin/env node
// auto-version.js - Automatically bump cache version in sw.js based on file changes
// Usage: node auto-version.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of files to monitor for changes
const CRITICAL_FILES = [
    'index.html',
    'app.js',
    'pwa.js',
    'sync.js',
    'storage.js',
    'styles.css',
    'manifest.json',
    'data.js'
];

// Read current version from sw.js
function getCurrentVersion() {
    const swPath = path.join(__dirname, 'sw.js');
    const content = fs.readFileSync(swPath, 'utf8');
    const match = content.match(/const CACHE_NAME = 'viagem-eua-2027-v(\d+)'/);
    return match ? parseInt(match[1]) : 1;
}

// Check if files have changed since last commit
function haveFilesChanged() {
    try {
        const output = execSync('git status --porcelain', { encoding: 'utf8' });
        return output.trim().length > 0;
    } catch (e) {
        return false;
    }
}

// Get files changed in last commit
function getChangedFiles() {
    try {
        const output = execSync('git diff --name-only HEAD~1', { encoding: 'utf8' });
        return output.trim().split('\n').filter(f => f.length > 0);
    } catch (e) {
        return [];
    }
}

// Check if any critical files changed
function shouldBumpVersion() {
    const changedFiles = getChangedFiles();
    return CRITICAL_FILES.some(cf => 
        changedFiles.some(changed => changed.includes(cf))
    );
}

// Bump version in sw.js
function bumpVersion() {
    const swPath = path.join(__dirname, 'sw.js');
    let content = fs.readFileSync(swPath, 'utf8');
    const currentVersion = getCurrentVersion();
    const newVersion = currentVersion + 1;
    
    content = content.replace(
        /const CACHE_NAME = 'viagem-eua-2027-v\d+'/,
        `const CACHE_NAME = 'viagem-eua-2027-v${newVersion}'`
    );
    
    fs.writeFileSync(swPath, content, 'utf8');
    console.log(`✅ Cache version bumped: v${currentVersion} → v${newVersion}`);
    return newVersion;
}

// Main
if (process.env.CI) {
    // In GitHub Actions: check if critical files were modified
    if (shouldBumpVersion()) {
        const newVersion = bumpVersion();
        console.log(`[CI] Auto-bumped cache to v${newVersion}`);
        process.exit(0);
    } else {
        console.log('[CI] No critical file changes - skipping version bump');
        process.exit(0);
    }
} else {
    // Local: always bump if files changed
    if (haveFilesChanged() || process.argv.includes('--force')) {
        bumpVersion();
    } else {
        console.log('No changes detected - skipping version bump');
    }
}
