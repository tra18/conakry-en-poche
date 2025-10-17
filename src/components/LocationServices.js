import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, Globe, Star, Users } from 'lucide-react';

const LocationServices = ({ business, onLocationSelect }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock business coordinates (replace with actual data)
  const businessCoords = {
    lat: 9.6412,
    lng: -13.5784
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation && businessCoords) {
      calculateDistance();
    }
  }, [userLocation, businessCoords]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par ce navigateur');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError('Impossible d\'obtenir votre position');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const calculateDistance = () => {
    if (!userLocation || !businessCoords) return;

    const R = 6371; // Earth's radius in kilometers
    const dLat = (businessCoords.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (businessCoords.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(businessCoords.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const calculatedDistance = R * c;
    
    setDistance(calculatedDistance);
    
    // Estimate travel time (assuming average speed of 30 km/h in city)
    const estimatedTime = (calculatedDistance / 30) * 60; // in minutes
    setTravelTime(estimatedTime);
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${businessCoords.lat},${businessCoords.lng}`;
    window.open(url, '_blank');
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${businessCoords.lat},${businessCoords.lng}`;
    window.open(url, '_blank');
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: `Découvrez ${business.name} sur Conakry en Poche`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const getDistanceColor = (distance) => {
    if (distance < 1) return 'text-green-400';
    if (distance < 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDistanceText = (distance) => {
    if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
    return `${distance.toFixed(1)} km`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <MapPin className="w-6 h-6 mr-2 text-blue-400" />
        Localisation
      </h3>

      {/* Business Address */}
      <div className="mb-4">
        <p className="text-white/90 text-lg font-medium mb-2">{business.name}</p>
        <p className="text-white/70 flex items-start">
          <MapPin className="w-4 h-4 mr-2 mt-1 text-blue-400" />
          {business.address}
        </p>
      </div>

      {/* Distance and Travel Time */}
      {userLocation && distance && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Navigation className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-white/80 text-sm">Distance</span>
            </div>
            <p className={`text-2xl font-bold ${getDistanceColor(distance)}`}>
              {getDistanceText(distance)}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 mr-2 text-blue-400" />
              <span className="text-white/80 text-sm">Temps estimé</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">
              {travelTime < 60 ? `${Math.round(travelTime)} min` : `${Math.round(travelTime / 60)}h ${Math.round(travelTime % 60)}min`}
            </p>
          </div>
        </div>
      )}

      {/* Location Error */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={getCurrentLocation}
            className="mt-2 text-red-400 text-sm underline hover:text-red-300"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
          <span className="ml-3 text-white/70">Localisation en cours...</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={openInMaps}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-all duration-200"
        >
          <Navigation className="w-5 h-5" />
          <span>Itinéraire</span>
        </button>

        <button
          onClick={openInGoogleMaps}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/30 transition-all duration-200"
        >
          <MapPin className="w-5 h-5" />
          <span>Voir sur Google Maps</span>
        </button>

        <button
          onClick={shareLocation}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-all duration-200"
        >
          <Globe className="w-5 h-5" />
          <span>Partager</span>
        </button>
      </div>

      {/* Business Info */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {business.phone && (
            <div className="flex items-center text-white/70">
              <Phone className="w-4 h-4 mr-2 text-blue-400" />
              <a href={`tel:${business.phone}`} className="hover:text-white transition-colors">
                {business.phone}
              </a>
            </div>
          )}
          
          {business.website && (
            <div className="flex items-center text-white/70">
              <Globe className="w-4 h-4 mr-2 text-green-400" />
              <a 
                href={business.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Site web
              </a>
            </div>
          )}
          
          {business.rating && (
            <div className="flex items-center text-white/70">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span>{business.rating}/5</span>
            </div>
          )}
          
          {business.capacity && (
            <div className="flex items-center text-white/70">
              <Users className="w-4 h-4 mr-2 text-purple-400" />
              <span>Capacité: {business.capacity}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationServices;
