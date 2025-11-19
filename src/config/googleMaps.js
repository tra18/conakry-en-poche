// Configuration Google Maps API
export const GOOGLE_MAPS_CONFIG = {
  // Clé API Google Maps
  API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'DEMO_KEY',
  
  // Configuration par défaut
  DEFAULT_CENTER: { lat: 9.6412, lng: -13.5784 }, // Conakry
  DEFAULT_ZOOM: 13,
  
  // Limites et restrictions
  MAX_ZOOM: 18,
  MIN_ZOOM: 8,
  
  // Configuration des bibliothèques
  LIBRARIES: ['places', 'geometry', 'visualization', 'drawing'],
  
  // Configuration du chargement
  LOADING_CONFIG: {
    loading: 'async',
    async: true,
    defer: true
  },
  
  // Styles personnalisés pour la carte
  CUSTOM_STYLES: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#4285F4' }]
    }
  ],
  
  // Configuration des marqueurs
  MARKER_ICONS: {
    restaurants: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
    hotels: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
    pharmacies: 'https://maps.google.com/mapfiles/ms/icons/pharmacy.png',
    hospitals: 'https://maps.google.com/mapfiles/ms/icons/hospital.png',
    banks: 'https://maps.google.com/mapfiles/ms/icons/bank.png',
    schools: 'https://maps.google.com/mapfiles/ms/icons/school.png',
    default: 'https://maps.google.com/mapfiles/ms/icons/blue.png'
  },
  
  // Configuration de la géolocalisation
  GEOLOCATION_OPTIONS: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  },
  
  // Configuration des itinéraires
  DIRECTIONS_OPTIONS: {
    draggable: true,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: '#4285F4',
      strokeWeight: 4,
      strokeOpacity: 0.8
    }
  }
};

// Fonction pour vérifier si la clé API est valide
export const validateApiKey = () => {
  const apiKey = GOOGLE_MAPS_CONFIG.API_KEY;
  
  if (!apiKey || apiKey === 'DEMO_KEY') {
    console.warn('Clé API Google Maps non configurée. Utilisation du mode démo.');
    return false;
  }
  
  // Vérifier le format de la clé API
  if (apiKey.length < 20) {
    console.warn('Format de clé API Google Maps invalide.');
    return false;
  }
  
  return true;
};

// Fonction pour obtenir l'URL du script Google Maps
export const getGoogleMapsScriptUrl = () => {
  const { API_KEY, LIBRARIES } = GOOGLE_MAPS_CONFIG;
  const libraries = LIBRARIES.join(',');
  
  return `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=${libraries}&loading=async`;
};

// Fonction pour obtenir la configuration de la carte
export const getMapConfig = (customOptions = {}) => {
  const { DEFAULT_CENTER, DEFAULT_ZOOM, CUSTOM_STYLES } = GOOGLE_MAPS_CONFIG;
  
  return {
    zoom: DEFAULT_ZOOM,
    center: DEFAULT_CENTER,
    mapTypeId: 'roadmap',
    styles: CUSTOM_STYLES,
    gestureHandling: 'greedy',
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
    clickableIcons: true,
    ...customOptions
  };
};

export default GOOGLE_MAPS_CONFIG;








