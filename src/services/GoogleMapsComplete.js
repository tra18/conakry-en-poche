// Service Google Maps complet avec toutes les fonctionnalités avancées
class GoogleMapsComplete {
  constructor() {
    this.map = null;
    this.markers = [];
    this.directionsService = null;
    this.directionsRenderer = null;
    this.placesService = null;
    this.geocoder = null;
    this.userLocation = null;
    this.isLoaded = false;
    this.streetViewService = null;
    this.streetViewPanorama = null;
    this.heatmapLayer = null;
    this.trafficLayer = null;
    this.transitLayer = null;
    this.bicyclingLayer = null;
    this.searchBox = null;
    this.autocompleteService = null;
    this.isOfflineMode = false;
    this.offlineData = new Map();
  }

  // Initialiser Google Maps avec toutes les fonctionnalités
  async initializeCompleteMap(containerId, options = {}) {
    try {
      // Vérifier si Google Maps est déjà chargé
      if (window.google && window.google.maps) {
        this.isLoaded = true;
        return this.createCompleteMap(containerId, options);
      }

      // Charger Google Maps avec toutes les bibliothèques
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'DEMO_KEY'}&libraries=places,geometry,visualization,drawing`;
        script.async = true;
        script.defer = true;
        
        return new Promise((resolve, reject) => {
          script.onload = () => {
            this.isLoaded = true;
            resolve(this.createCompleteMap(containerId, options));
          };
          script.onerror = () => {
            console.warn('Google Maps non disponible, utilisation du mode hors-ligne');
            this.isOfflineMode = true;
            resolve(this.createOfflineMap(containerId, options));
          };
          document.head.appendChild(script);
        });
      }
    } catch (error) {
      console.warn('Erreur lors du chargement de Google Maps:', error);
      return this.createOfflineMap(containerId, options);
    }
  }

  // Créer la carte Google Maps complète
  createCompleteMap(containerId, options) {
    const defaultOptions = {
      zoom: 13,
      center: { lat: 9.6412, lng: -13.5784 }, // Conakry
      mapTypeId: 'roadmap',
      styles: this.getCustomMapStyles(),
      gestureHandling: 'greedy',
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
      clickableIcons: true
    };

    const mapOptions = { ...defaultOptions, ...options };
    
    this.map = new window.google.maps.Map(
      document.getElementById(containerId),
      mapOptions
    );

    // Initialiser tous les services
    this.initializeServices();
    
    // Ajouter les événements
    this.addMapEvents();
    
    return this.map;
  }

  // Initialiser tous les services Google Maps
  initializeServices() {
    // Services de base
    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsRenderer = new window.google.maps.DirectionsRenderer({
      draggable: true,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    });
    this.directionsRenderer.setMap(this.map);

    // Services de lieux
    this.placesService = new window.google.maps.places.PlacesService(this.map);
    this.geocoder = new window.google.maps.Geocoder();
    this.autocompleteService = new window.google.maps.places.AutocompleteService();

    // Street View
    this.streetViewService = new window.google.maps.StreetViewService();
    this.streetViewPanorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('street-view-container') || document.createElement('div')
    );

    // Couches de données
    this.trafficLayer = new window.google.maps.TrafficLayer();
    this.transitLayer = new window.google.maps.TransitLayer();
    this.bicyclingLayer = new window.google.maps.BicyclingLayer();
  }

  // Styles personnalisés pour la carte
  getCustomMapStyles() {
    return [
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
    ];
  }

  // Ajouter les événements de la carte
  addMapEvents() {
    // Géolocalisation automatique
    this.map.addListener('tilesloaded', () => {
      this.getUserLocation();
    });

    // Événements de clic
    this.map.addListener('click', (event) => {
      this.handleMapClick(event);
    });

    // Événements de zoom
    this.map.addListener('zoom_changed', () => {
      this.handleZoomChange();
    });

    // Événements de déplacement
    this.map.addListener('center_changed', () => {
      this.handleCenterChange();
    });
  }

  // Obtenir la position de l'utilisateur avec précision
  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Géolocalisation non supportée'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          };

          // Centrer la carte sur la position utilisateur
          this.map.setCenter(this.userLocation);
          this.map.setZoom(15);

          // Ajouter un marqueur de position utilisateur
          this.addUserLocationMarker();
          
          resolve(this.userLocation);
        },
        (error) => {
          console.warn('Erreur de géolocalisation:', error);
          // Position par défaut à Conakry
          this.userLocation = { lat: 9.6412, lng: -13.5784 };
          resolve(this.userLocation);
        },
        options
      );
    });
  }

  // Ajouter un marqueur de position utilisateur
  addUserLocationMarker() {
    if (!this.userLocation) return;

    const userMarker = new window.google.maps.Marker({
      position: this.userLocation,
      map: this.map,
      title: 'Votre position',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(24, 24),
        anchor: new window.google.maps.Point(12, 12)
      },
      animation: window.google.maps.Animation.DROP
    });

    // Cercle de précision
    const accuracyCircle = new window.google.maps.Circle({
      strokeColor: '#4285F4',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4285F4',
      fillOpacity: 0.1,
      map: this.map,
      center: this.userLocation,
      radius: this.userLocation.accuracy || 100
    });

    this.markers.push(userMarker);
  }

  // Recherche de lieux avec autocomplétion
  async searchPlaces(query, options = {}) {
    if (!this.isLoaded) {
      return this.getOfflinePlaces(query);
    }

    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions(
        {
          input: query,
          location: this.map.getCenter(),
          radius: options.radius || 50000,
          types: options.types || ['establishment']
        },
        (predictions, status) => {
          if (status === 'OK') {
            resolve(predictions);
          } else {
            console.warn('Erreur de recherche de lieux:', status);
            resolve([]);
          }
        }
      );
    });
  }

  // Obtenir les détails d'un lieu
  async getPlaceDetails(placeId) {
    if (!this.isLoaded) {
      return this.getOfflinePlaceDetails(placeId);
    }

    return new Promise((resolve, reject) => {
      const request = {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'geometry', 'rating', 'photos', 'reviews', 'opening_hours', 'phone_number', 'website']
      };

      this.placesService.getDetails(request, (place, status) => {
        if (status === 'OK') {
          resolve(place);
        } else {
          console.warn('Erreur de détails de lieu:', status);
          resolve(null);
        }
      });
    });
  }

  // Calcul d'itinéraire avancé
  async calculateAdvancedRoute(origin, destination, options = {}) {
    if (!this.isLoaded) {
      return this.getOfflineRoute(origin, destination);
    }

    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode[options.travelMode || 'DRIVING'],
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: options.avoidHighways || false,
      avoidTolls: options.avoidTolls || false,
      optimizeWaypoints: options.optimizeWaypoints || false,
      provideRouteAlternatives: options.alternatives || false
    };

    // Ajouter des points de passage si fournis
    if (options.waypoints && options.waypoints.length > 0) {
      request.waypoints = options.waypoints.map(waypoint => ({
        location: waypoint,
        stopover: true
      }));
    }

    return new Promise((resolve, reject) => {
      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result);
          resolve(result);
        } else {
          console.warn('Erreur de calcul d\'itinéraire:', status);
          resolve(this.getOfflineRoute(origin, destination));
        }
      });
    });
  }

  // Navigation en temps réel
  startRealTimeNavigation(destination) {
    if (!this.userLocation) {
      console.warn('Position utilisateur non disponible');
      return;
    }

    // Calculer l'itinéraire initial
    this.calculateAdvancedRoute(this.userLocation, destination, {
      travelMode: 'DRIVING',
      alternatives: true
    });

    // Mettre à jour la position en temps réel
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Mettre à jour la position utilisateur
        this.userLocation = newLocation;
        
        // Recalculer l'itinéraire si nécessaire
        this.calculateAdvancedRoute(newLocation, destination);
      },
      (error) => {
        console.warn('Erreur de navigation en temps réel:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000
      }
    );

    return watchId;
  }

  // Street View
  showStreetView(position, containerId) {
    if (!this.isLoaded) {
      return this.showOfflineStreetView(position, containerId);
    }

    this.streetViewService.getPanorama({
      location: position,
      radius: 50
    }, (data, status) => {
      if (status === 'OK') {
        const panorama = new window.google.maps.StreetViewPanorama(
          document.getElementById(containerId),
          {
            position: position,
            pov: {
              heading: 0,
              pitch: 0
            },
            visible: true
          }
        );
        this.streetViewPanorama = panorama;
      }
    });
  }

  // Couches de données
  toggleTrafficLayer() {
    if (this.trafficLayer.getMap()) {
      this.trafficLayer.setMap(null);
    } else {
      this.trafficLayer.setMap(this.map);
    }
  }

  toggleTransitLayer() {
    if (this.transitLayer.getMap()) {
      this.transitLayer.setMap(null);
    } else {
      this.transitLayer.setMap(this.map);
    }
  }

  toggleBicyclingLayer() {
    if (this.bicyclingLayer.getMap()) {
      this.bicyclingLayer.setMap(null);
    } else {
      this.bicyclingLayer.setMap(this.map);
    }
  }

  // Heatmap
  addHeatmap(data) {
    if (!this.isLoaded) return;

    const heatmapData = data.map(point => ({
      location: new window.google.maps.LatLng(point.lat, point.lng),
      weight: point.weight || 1
    }));

    this.heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: this.map,
      radius: 50,
      opacity: 0.6
    });
  }

  // Mode hors-ligne
  createOfflineMap(containerId, options) {
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
          position: relative;
        ">
          <div>
            <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
            <h3 style="margin: 0 0 0.5rem 0;">Carte Hors-Ligne</h3>
            <p style="margin: 0; opacity: 0.8;">Fonctionnalités de base disponibles</p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
              <button onclick="this.parentElement.parentElement.style.display='none'" 
                      style="padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); 
                             border: 1px solid rgba(255,255,255,0.3); color: white; border-radius: 4px; cursor: pointer;">
                Masquer
              </button>
            </div>
          </div>
        </div>
      `;
    }
    return null;
  }

  // Données hors-ligne
  getOfflinePlaces(query) {
    const offlinePlaces = [
      { place_id: 'offline_1', description: 'Restaurant Le Patio, Rue du Commerce, Conakry' },
      { place_id: 'offline_2', description: 'Hôtel Palm Camayenne, Corniche Nord, Conakry' },
      { place_id: 'offline_3', description: 'Pharmacie Centrale, Avenue de la République, Conakry' }
    ];
    
    return offlinePlaces.filter(place => 
      place.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  getOfflinePlaceDetails(placeId) {
    const offlineDetails = {
      'offline_1': {
        name: 'Restaurant Le Patio',
        formatted_address: 'Rue du Commerce, Conakry',
        rating: 4.5,
        phone_number: '+224 620 123 456'
      },
      'offline_2': {
        name: 'Hôtel Palm Camayenne',
        formatted_address: 'Corniche Nord, Conakry',
        rating: 4.8,
        phone_number: '+224 620 987 654'
      }
    };
    
    return offlineDetails[placeId] || null;
  }

  getOfflineRoute(origin, destination) {
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

  // Gestionnaires d'événements
  handleMapClick(event) {
    console.log('Clic sur la carte:', event.latLng);
  }

  handleZoomChange() {
    const zoom = this.map.getZoom();
    console.log('Zoom changé:', zoom);
  }

  handleCenterChange() {
    const center = this.map.getCenter();
    console.log('Centre changé:', center.lat(), center.lng());
  }

  // Nettoyer les marqueurs
  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  // Nettoyer l'itinéraire
  clearRoute() {
    this.directionsRenderer.setDirections({ routes: [] });
  }

  // Obtenir les directions vers une destination
  getDirectionsTo(destination) {
    if (!this.userLocation) {
      console.warn('Position utilisateur non disponible');
      return;
    }

    const url = `https://www.google.com/maps/dir/${this.userLocation.lat},${this.userLocation.lng}/${destination.lat},${destination.lng}`;
    window.open(url, '_blank');
  }
}

export default new GoogleMapsComplete();








