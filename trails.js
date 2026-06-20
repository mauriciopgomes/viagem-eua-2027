// trails.js — Curated trail recommendations for trip locations
// Based on AllTrails and Fatmap popular trails

const trailsData = {
    // National Parks & Major Hiking Areas
    'General Sherman': [
        { name: 'Moro Rock Trail', distance: '2.4 km', difficulty: 'Moderado', rating: 4.7, url: 'https://www.alltrails.com/trail/united-states/california/moro-rock' }
    ],
    'Congress Trail': [
        { name: 'Congress Trail Loop', distance: '3.2 km', difficulty: 'Fácil', rating: 4.8, url: 'https://www.alltrails.com/trail/united-states/california/congress-trail' }
    ],
    'Kings Canyon': [
        { name: 'Roaring River Falls', distance: '1.6 km', difficulty: 'Fácil', rating: 4.6, url: 'https://www.alltrails.com' }
    ],
    'Tunnel View': [
        { name: 'Tunnel View Loop', distance: '2.4 km', difficulty: 'Fácil', rating: 4.9, url: 'https://www.alltrails.com' }
    ],
    'El Capitan': [
        { name: 'El Capitan Trail', distance: '14.5 km', difficulty: 'Difícil', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Half Dome': [
        { name: 'Half Dome Trail', distance: '22 km', difficulty: 'Muito Difícil', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Bridalveil Fall': [
        { name: 'Bridalveil Fall Trail', distance: '1.6 km', difficulty: 'Fácil', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Mirror Lake': [
        { name: 'Mirror Lake Loop', distance: '8 km', difficulty: 'Moderado', rating: 4.6, url: 'https://www.alltrails.com' }
    ],
    'Vernal Fall': [
        { name: 'Vernal Fall Bridge', distance: '3.2 km', difficulty: 'Moderado', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Angels Landing': [
        { name: 'Angels Landing Trail', distance: '8 km', difficulty: 'Difícil', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Delicate Arch': [
        { name: 'Delicate Arch Trail', distance: '4.8 km', difficulty: 'Moderado', rating: 4.9, url: 'https://www.alltrails.com' }
    ],
    'Mesa Arch': [
        { name: 'Mesa Arch Trail', distance: '6.4 km', difficulty: 'Moderado', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Upheaval Dome': [
        { name: 'Upheaval Dome Trail', distance: '14 km', difficulty: 'Moderado', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Bryce Canyon': [
        { name: "Queen's Garden Trail", distance: '4 km', difficulty: 'Moderado', rating: 4.9, url: 'https://www.alltrails.com' },
        { name: 'Navajo Loop Trail', distance: '9.6 km', difficulty: 'Difícil', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Grand Canyon': [
        { name: 'Bright Angel Trail', distance: '18 km', difficulty: 'Difícil', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Zion Canyon': [
        { name: 'The Narrows Trail', distance: '16 km', difficulty: 'Moderado', rating: 4.9, url: 'https://www.alltrails.com' }
    ],
    'Valley of Fire': [
        { name: 'Fire Wave Trail', distance: '10 km', difficulty: 'Difícil', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Red Rock Canyon': [
        { name: 'Calico Tanks Trail', distance: '4 km', difficulty: 'Moderado', rating: 4.6, url: 'https://www.alltrails.com' }
    ],
    'Death Valley': [
        { name: 'Badwater Basin to Dante\'s View', distance: '24 km', difficulty: 'Difícil', rating: 4.6, url: 'https://www.alltrails.com' }
    ],
    'Golden Gate Bridge': [
        { name: 'Lands End Trail', distance: '4.8 km', difficulty: 'Fácil', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Muir Woods': [
        { name: 'Redwood Creek Trail', distance: '3.2 km', difficulty: 'Fácil', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Mt. Rainier': [
        { name: 'Skyline Trail', distance: '10 km', difficulty: 'Moderado', rating: 4.9, url: 'https://www.alltrails.com' }
    ],
    'Olympic NP': [
        { name: 'Hoh Rain Forest', distance: '5 km', difficulty: 'Fácil', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Oregon Coast': [
        { name: "Devil's Punchbowl", distance: '2 km', difficulty: 'Fácil', rating: 4.7, url: 'https://www.alltrails.com' }
    ],
    'Redwood NP': [
        { name: 'Tall Trees Grove', distance: '8 km', difficulty: 'Moderado', rating: 4.8, url: 'https://www.alltrails.com' }
    ],
    'Big Sur': [
        { name: 'McWay Falls Trail', distance: '4.8 km', difficulty: 'Fácil', rating: 4.9, url: 'https://www.alltrails.com' }
    ]
};

function getTrailsForLocation(locationName) {
    if (!locationName) return [];
    
    // Try exact match first
    if (trailsData[locationName]) {
        return trailsData[locationName];
    }
    
    // Try partial match (longest first, case-insensitive)
    const keys = Object.keys(trailsData).sort((a, b) => b.length - a.length);
    const locLower = locationName.toLowerCase();
    for (const key of keys) {
        if (locLower.includes(key.toLowerCase())) {
            return trailsData[key];
        }
    }
    
    return [];
}

function renderTrailsCard(trails) {
    if (!trails || trails.length === 0) return '';
    
    let html = '<div class="trails-card">';
    html += '<h4>🥾 Trilhas Recomendadas</h4>';
    html += '<div class="trails-list">';
    
    for (const trail of trails) {
        html += `<div class="trail-item">
            <div class="trail-header">
                <a href="${escapeHtml(trail.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(trail.name)}</a>
                <span class="trail-rating">⭐ ${trail.rating}</span>
            </div>
            <div class="trail-info">
                <span class="trail-distance">📏 ${escapeHtml(trail.distance)}</span>
                <span class="trail-difficulty">📊 ${escapeHtml(trail.difficulty)}</span>
            </div>
        </div>`;
    }
    
    html += '</div>';
    html += '<p class="trails-note">💡 Dica: Abra no AllTrails ou Fatmap para mais detalhes e mapas offline.</p>';
    html += '</div>';
    
    return html;
}
