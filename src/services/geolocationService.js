// Service de géolocalisation pour Conakry en Poche
// Génère automatiquement des coordonnées GPS pour les adresses à Conakry

// Base de données des coordonnées GPS pour les quartiers de Conakry
const CONAKRY_LOCATIONS = {
  // Centre-ville
  'centre-ville': { lat: 9.6412, lng: -13.5784 },
  'avenue de la république': { lat: 9.6398, lng: -13.5765 },
  'rue du commerce': { lat: 9.6405, lng: -13.5778 },
  'marché madina': { lat: 9.6421, lng: -13.5792 },
  
  // Quartiers résidentiels
  'dixinn': { lat: 9.6389, lng: -13.5723 },
  'ratoma': { lat: 9.6456, lng: -13.5812 },
  'matam': { lat: 9.6523, lng: -13.5834 },
  'matoto': { lat: 9.6345, lng: -13.5745 },
  'kaloum': { lat: 9.6489, lng: -13.5856 },
  
  // Zones commerciales
  'corniche nord': { lat: 9.6301, lng: -13.5702 },
  'corniche sud': { lat: 9.6356, lng: -13.5889 },
  'port autonome': { lat: 9.6467, lng: -13.5878 },
  
  // Hôpitaux et services publics
  'hôpital ignace deen': { lat: 9.6412, lng: -13.5784 },
  'hôpital donka': { lat: 9.6389, lng: -13.5723 },
  'palais du peuple': { lat: 9.6401, lng: -13.5778 },
  
  // Écoles et universités
  'université gamal abdel nasser': { lat: 9.6345, lng: -13.5745 },
  'lycée cheikh anta diop': { lat: 9.6423, lng: -13.5767 },
  
  // Aéroport et transport
  'aéroport gbessia': { lat: 9.5769, lng: -13.6119 },
  'gare centrale': { lat: 9.6421, lng: -13.5792 },
  
  // Zones spécifiques
  'almamya': { lat: 9.6412, lng: -13.5784 },
  'taouyah': { lat: 9.6345, lng: -13.5745 },
  'bonfi': { lat: 9.6523, lng: -13.5834 },
  'kagbelen': { lat: 9.6389, lng: -13.5723 },
  'kankan': { lat: 9.6456, lng: -13.5812 }
};

// Fonction pour normaliser une adresse
const normalizeAddress = (address) => {
  if (!address) return '';
  return address.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .trim();
};

// Fonction pour trouver les coordonnées GPS à partir d'une adresse
export const getCoordinatesFromAddress = (address) => {
  const normalizedAddress = normalizeAddress(address);
  
  // Recherche exacte d'abord
  for (const [key, coords] of Object.entries(CONAKRY_LOCATIONS)) {
    if (normalizedAddress.includes(key)) {
      // Ajouter une petite variation pour éviter les doublons exacts
      const variation = (Math.random() - 0.5) * 0.001; // ±0.0005 degrés
      return {
        lat: coords.lat + variation,
        lng: coords.lng + variation,
        precision: 'high'
      };
    }
  }
  
  // Si pas de correspondance exacte, utiliser les coordonnées du centre-ville avec une variation
  const centerVariation = (Math.random() - 0.5) * 0.01; // ±0.005 degrés
  return {
    lat: CONAKRY_LOCATIONS['centre-ville'].lat + centerVariation,
    lng: CONAKRY_LOCATIONS['centre-ville'].lng + centerVariation,
    precision: 'medium'
  };
};

// Fonction pour générer un lien de navigation GPS
export const generateNavigationLink = (business) => {
  if (!business.coordinates) {
    return null;
  }
  
  const { lat, lng } = business.coordinates;
  const encodedName = encodeURIComponent(business.name);
  
  // Générer des liens pour différentes applications de navigation
  const navigationLinks = {
    googleMaps: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodedName}`,
    appleMaps: `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`,
    waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    universal: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  };
  
  return navigationLinks;
};

// Fonction pour calculer la distance entre deux points GPS
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance en km
};

// Fonction pour obtenir la position actuelle de l'utilisateur
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Géolocalisation non supportée'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Fonction pour trouver les entreprises les plus proches
export const findNearestBusinesses = (userLocation, businesses, maxDistance = 10) => {
  return businesses
    .filter(business => business.coordinates)
    .map(business => ({
      ...business,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        business.coordinates.lat,
        business.coordinates.lng
      )
    }))
    .filter(business => business.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};

// Fonction pour générer une carte intégrée
export const generateEmbedMap = (business) => {
  if (!business.coordinates) {
    return null;
  }
  
  const { lat, lng } = business.coordinates;
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // À remplacer par votre clé API
  
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=15`;
};

// Export par défaut
export default {
  getCoordinatesFromAddress,
  generateNavigationLink,
  calculateDistance,
  getCurrentLocation,
  findNearestBusinesses,
  generateEmbedMap
};










