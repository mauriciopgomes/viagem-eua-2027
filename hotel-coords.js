// Coordenadas aproximadas de cada hotel (lat, lng).
// Extraído de export-kml.js quando o script foi removido (só gerava KML pro
// Google My Maps, não fazia parte do PWA — ver ARCHITECTURE.md).
// Usado por tests.js pra validar dayCoords[N] contra a localização real do
// hotel do dia (regressão do bug de fly-to encontrado em auditoria).
// Match por substring: hotels[].name.includes(chave).
const hotelCoords = {
    'Marriott Marquis': [40.7580, -73.9855],
    'Las Vegas': [36.1699, -115.1398],
    'Springdale': [37.1890, -112.9988],
    'Bryce Canyon': [37.6283, -112.1677],
    'Moab': [38.5733, -109.5498],
    'Twin Falls': [42.5558, -114.4701],
    'Forks': [47.9504, -124.3855],
    'Cannon Beach': [45.8918, -123.9615],
    'Coos Bay': [43.3665, -124.2179],
    'Crescent City': [41.7558, -124.2026],
    'Eureka': [40.8021, -124.1637],
    'San Francisco': [37.7749, -122.4194],
    'Mariposa': [37.4849, -119.9663],
    'Three Rivers': [36.4519, -118.9054],
    'Los Angeles': [34.0522, -118.2437],
    'Pendleton': [45.6721, -118.7886],
    'Page': [36.9147, -111.4558],
    'Carmel': [36.5552, -121.9233],
};
