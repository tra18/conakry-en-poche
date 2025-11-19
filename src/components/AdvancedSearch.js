import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import GoogleMapsOptimized from '../services/GoogleMapsOptimized';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Clock, 
  Star,
  Phone,
  Globe,
  ChevronDown,
  X,
  Filter,
  Navigation2
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdvancedSearch = ({ onPlaceSelect, onRouteCalculate, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    type: 'all',
    radius: 5000,
    rating: 0,
    openNow: false
  });
  const [searchHistory, setSearchHistory] = useState([]);
  const { theme } = useTheme();
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Charger l'historique de recherche depuis localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('conakry-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sauvegarder l'historique de recherche
  const saveSearchHistory = (query) => {
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('conakry-search-history', JSON.stringify(newHistory));
  };

  // Recherche avec délai
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchFilters]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const results = await GoogleMapsOptimized.searchPlaces(query, {
        radius: searchFilters.radius,
        types: searchFilters.type === 'all' ? undefined : [searchFilters.type]
      });
      
      setSearchResults(results || []);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      toast.error('Erreur lors de la recherche');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlaceSelect = async (place) => {
    setSelectedPlace(place);
    setSearchQuery(place.description);
    setSearchResults([]);
    saveSearchHistory(place.description);

    // Obtenir les détails du lieu
    try {
      const details = await GoogleMapsOptimized.getPlaceDetails(place.place_id);
      setPlaceDetails(details);
      
      if (onPlaceSelect) {
        onPlaceSelect(details || place);
      }
    } catch (error) {
      console.error('Erreur de détails:', error);
    }
  };

  const handleRouteCalculate = () => {
    if (selectedPlace && onRouteCalculate) {
      onRouteCalculate(selectedPlace);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedPlace(null);
    setPlaceDetails(null);
  };

  const handleFilterChange = (filterName, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const getPlaceTypeIcon = (type) => {
    const icons = {
      restaurant: '🍽️',
      lodging: '🏨',
      pharmacy: '💊',
      hospital: '🏥',
      bank: '🏦',
      school: '🎓',
      university: '🏛️',
      transit_station: '🚌',
      shopping_mall: '🛍️',
      amusement_park: '🎮',
      gym: '⚽',
      beauty_salon: '💄',
      car_dealer: '🚗',
      establishment: '🏢'
    };
    return icons[type] || '📍';
  };

  const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${Math.round(distance)} m`;
    }
    return `${(distance / 1000).toFixed(1)} km`;
  };

  return (
    <div className={`advanced-search ${className}`} style={{ position: 'relative' }}>
      {/* Barre de recherche principale */}
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem',
          boxShadow: 'var(--shadow-primary)',
          transition: 'all var(--transition-normal)'
        }}>
          <Search size={20} style={{ color: 'var(--text-tertiary)', marginRight: '0.75rem' }} />
          
          <input
            ref={searchRef}
            type="text"
            placeholder="Rechercher un lieu, une adresse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-base)',
              fontFamily: 'inherit'
            }}
          />

          {/* Boutons d'action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {searchQuery && (
              <button
                onClick={clearSearch}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                background: showFilters ? 'var(--accent-100)' : 'none',
                border: 'none',
                color: showFilters ? 'var(--accent-700)' : 'var(--text-tertiary)',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-normal)'
              }}
            >
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            boxShadow: 'var(--shadow-elevated)',
            zIndex: 1000
          }}>
            <h4 style={{
              margin: '0 0 1rem 0',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Filtres de recherche
            </h4>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Type de lieu */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)'
                }}>
                  Type de lieu
                </label>
                <select
                  value={searchFilters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-primary)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  <option value="all">Tous les types</option>
                  <option value="restaurant">Restaurants</option>
                  <option value="lodging">Hôtels</option>
                  <option value="pharmacy">Pharmacies</option>
                  <option value="hospital">Hôpitaux</option>
                  <option value="bank">Banques</option>
                  <option value="school">Écoles</option>
                  <option value="transit_station">Transport</option>
                  <option value="shopping_mall">Shopping</option>
                </select>
              </div>

              {/* Rayon de recherche */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)'
                }}>
                  Rayon de recherche: {formatDistance(searchFilters.radius)}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={searchFilters.radius}
                  onChange={(e) => handleFilterChange('radius', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'var(--border-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Note minimum */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)'
                }}>
                  Note minimum: {searchFilters.rating} ⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={searchFilters.rating}
                  onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'var(--border-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Résultats de recherche */}
      {(searchResults.length > 0 || isSearching) && (
        <div
          ref={resultsRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-elevated)',
            zIndex: 1000,
            maxHeight: '400px',
            overflowY: 'auto'
          }}
        >
          {isSearching ? (
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--accent-color)',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Recherche en cours...
              </div>
            </div>
          ) : (
            <div>
              {searchResults.map((result, index) => (
                <button
                  key={result.place_id || index}
                  onClick={() => handlePlaceSelect(result)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: index < searchResults.length - 1 ? '1px solid var(--border-primary)' : 'none',
                    transition: 'all var(--transition-normal)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--bg-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>
                    {getPlaceTypeIcon(result.types?.[0])}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      marginBottom: '0.25rem'
                    }}>
                      {result.structured_formatting?.main_text || result.description}
                    </div>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--text-tertiary)'
                    }}>
                      {result.structured_formatting?.secondary_text}
                    </div>
                  </div>
                  <MapPin size={16} style={{ color: 'var(--text-tertiary)' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Historique de recherche */}
      {searchQuery === '' && searchHistory.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-elevated)',
          zIndex: 1000
        }}>
          <div style={{
            padding: '0.75rem',
            borderBottom: '1px solid var(--border-primary)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-tertiary)',
            fontWeight: '500'
          }}>
            Recherches récentes
          </div>
          {searchHistory.slice(0, 5).map((item, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(item)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: index < searchHistory.length - 1 ? '1px solid var(--border-primary)' : 'none',
                transition: 'all var(--transition-normal)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'var(--font-size-sm)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <Clock size={14} style={{ color: 'var(--text-tertiary)' }} />
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Détails du lieu sélectionné */}
      {placeDetails && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--surface-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-primary)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>
              {getPlaceTypeIcon(placeDetails.types?.[0])}
            </span>
            <div style={{ flex: 1 }}>
              <h3 style={{
                margin: 0,
                fontSize: 'var(--font-size-lg)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                {placeDetails.name}
              </h3>
              <p style={{
                margin: 0,
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                {placeDetails.formatted_address}
              </p>
            </div>
          </div>

          {/* Informations du lieu */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            {placeDetails.rating && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                <Star size={14} style={{ color: '#fbbf24' }} />
                {placeDetails.rating} ({placeDetails.user_ratings_total} avis)
              </div>
            )}

            {placeDetails.phone_number && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                <Phone size={14} />
                {placeDetails.phone_number}
              </div>
            )}

            {placeDetails.website && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                <Globe size={14} />
                <a
                  href={placeDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent-color)',
                    textDecoration: 'none'
                  }}
                >
                  Site web
                </a>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleRouteCalculate}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                transition: 'all var(--transition-normal)'
              }}
            >
              <Navigation2 size={16} />
              Itinéraire
            </button>

            <button
              onClick={() => GoogleMapsOptimized.getDirectionsTo(placeDetails.geometry?.location)}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: 'var(--surface-primary)',
                color: 'var(--accent-color)',
                border: '1px solid var(--accent-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                transition: 'all var(--transition-normal)'
              }}
            >
              <Navigation size={16} />
              Ouvrir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
