// Service Google Maps pour l'intégration GPS avancée
class GoogleMapsService {
  constructor() {
    this.map = null;
    this.markers = [];
    this.directionsService = null;
    this.directionsRenderer = null;
    this.userLocation = null;
    this.isLoaded = false;
  }

  // Initialiser Google Maps
  async initializeMap(containerId, options = {}) {
    try {
      // Vérifier si Google Maps est déjà chargé
      if (window.google && window.google.maps) {
        this.isLoaded = true;
        return this.createMap(containerId, options);
      }

      // Charger Google Maps dynamiquement
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'DEMO_KEY'}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        
        return new Promise((resolve, reject) => {
          script.onload = () => {
            this.isLoaded = true;
            resolve(this.createMap(containerId, options));
          };
          script.onerror = () => {
            console.warn('Google Maps non disponible, utilisation du mode fallback');
            this.isLoaded = false;
            resolve(this.createFallbackMap(containerId, options));
          };
          document.head.appendChild(script);
        });
      }
    } catch (error) {
      console.warn('Erreur lors du chargement de Google Maps:', error);
      return this.createFallbackMap(containerId, options);
    }
  }

  // Créer la carte Google Maps
  createMap(containerId, options) {
    const defaultOptions = {
      zoom: 13,
      center: { lat: 9.6412, lng: -13.5784 }, // Conakry
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    };

    const mapOptions = { ...defaultOptions, ...options };
    
    this.map = new window.google.maps.Map(
      document.getElementById(containerId),
      mapOptions
    );

    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsRenderer = new window.google.maps.DirectionsRenderer({
      draggable: true,
      suppressMarkers: false
    });

    this.directionsRenderer.setMap(this.map);
    return this.map;
  }

  // Carte de fallback (sans Google Maps)
  createFallbackMap(containerId, options) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div style="
          width: 100%; 
          height: 100%; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
          border-radius: 8px;
        ">
          <div>
            <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
            <h3 style="margin: 0 0 0.5rem 0;">Carte Interactive</h3>
            <p style="margin: 0; opacity: 0.8;">Google Maps sera disponible avec une clé API</p>
            <button onclick="this.parentElement.parentElement.style.display='none'" 
                    style="margin-top: 1rem; padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); 
                           border: 1px solid rgba(255,255,255,0.3); color: white; border-radius: 4px; cursor: pointer;">
              Masquer
            </button>
          </div>
        </div>
      `;
    }
    return null;
  }

  // Obtenir la position de l'utilisateur
  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Géolocalisation non supportée'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          resolve(this.userLocation);
        },
        (error) => {
          console.warn('Erreur de géolocalisation:', error);
          // Position par défaut à Conakry
          this.userLocation = { lat: 9.6412, lng: -13.5784 };
          resolve(this.userLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

  // Ajouter un marqueur
  addMarker(position, options = {}) {
    if (!this.map || !this.isLoaded) return null;

    const markerOptions = {
      position,
      map: this.map,
      title: options.title || 'Marqueur',
      icon: options.icon || null,
      animation: options.animation || null
    };

    const marker = new window.google.maps.Marker(markerOptions);
    this.markers.push(marker);

    // Ajouter un info window si fourni
    if (options.infoWindow) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: options.infoWindow
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }

    return marker;
  }

  // Calculer l'itinéraire
  async calculateRoute(origin, destination, travelMode = 'DRIVING') {
    if (!this.directionsService || !this.isLoaded) {
      return this.getFallbackRoute(origin, destination);
    }

    return new Promise((resolve, reject) => {
      this.directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode[travelMode],
          unitSystem: window.google.maps.UnitSystem.METRIC
        },
        (result, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(result);
            resolve(result);
          } else {
            console.warn('Erreur de calcul d\'itinéraire:', status);
            resolve(this.getFallbackRoute(origin, destination));
          }
        }
      );
    });
  }

  // Itinéraire de fallback
  getFallbackRoute(origin, destination) {
    const distance = this.calculateDistance(origin, destination);
    return {
      routes: [{
        legs: [{
          distance: { text: `${Math.round(distance)} km`, value: distance * 1000 },
          duration: { text: `${Math.round(distance * 2)} min`, value: distance * 2 * 60 },
          start_address: typeof origin === 'string' ? origin : 'Position de départ',
          end_address: typeof destination === 'string' ? destination : 'Destination'
        }]
      }]
    };
  }

  // Calculer la distance entre deux points
  calculateDistance(point1, point2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(point2.lat - point1.lat);
    const dLon = this.toRad(point2.lng - point1.lng);
    const lat1 = this.toRad(point1.lat);
    const lat2 = this.toRad(point2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRad(deg) {
    return deg * (Math.PI/180);
  }

  // Rechercher des lieux à proximité
  async searchNearbyPlaces(location, radius = 1000, type = '') {
    if (!this.isLoaded && window.google && window.google.maps) {
      const service = new window.google.maps.places.PlacesService(this.map);
      
      return new Promise((resolve, reject) => {
        service.nearbySearch(
          {
            location,
            radius,
            type
          },
          (results, status) => {
            if (status === 'OK') {
              resolve(results);
            } else {
              console.warn('Erreur de recherche de lieux:', status);
              resolve([]);
            }
          }
        );
      });
    }
    
    // Fallback: retourner des lieux simulés
    return this.getFallbackPlaces(location, radius);
  }

  // Lieux de fallback
  getFallbackPlaces(location, radius) {
    const places = [
      { name: 'Restaurant Le Patio', rating: 4.5, vicinity: 'Rue du Commerce' },
      { name: 'Hôtel Palm Camayenne', rating: 4.8, vicinity: 'Corniche Nord' },
      { name: 'Pharmacie Centrale', rating: 4.2, vicinity: 'Avenue de la République' }
    ];
    
    return places.map((place, index) => ({
      ...place,
      geometry: {
        location: {
          lat: location.lat + (Math.random() - 0.5) * 0.01,
          lng: location.lng + (Math.random() - 0.5) * 0.01
        }
      },
      place_id: `fallback_${index}`
    }));
  }

  // Centrer la carte sur une position
  centerMap(position) {
    if (this.map) {
      this.map.setCenter(position);
      this.map.setZoom(15);
    }
  }

  // Nettoyer les marqueurs
  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  // Obtenir les directions vers une destination
  getDirectionsTo(destination) {
    if (!this.userLocation) {
      console.warn('Position utilisateur non disponible');
      return;
    }

    const directions = {
      origin: this.userLocation,
      destination,
      travelMode: 'DRIVING'
    };

    // Ouvrir dans l'application de navigation par défaut
    const url = `https://www.google.com/maps/dir/${this.userLocation.lat},${this.userLocation.lng}/${destination.lat},${destination.lng}`;
    window.open(url, '_blank');
  }
}

export default new GoogleMapsService();








