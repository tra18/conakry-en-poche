import React, { useState, useEffect } from 'react';
import { generateNavigationLink, getCurrentLocation, calculateDistance } from '../services/geolocationService';

const GPSNavigation = ({ business, onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (business && business.coordinates) {
      getUserLocation();
    }
  }, [business]);

  const getUserLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      if (business.coordinates) {
        const dist = calculateDistance(
          location.lat,
          location.lng,
          business.coordinates.lat,
          business.coordinates.lng
        );
        setDistance(dist);
      }
    } catch (err) {
      setError('Impossible d\'obtenir votre position. Vérifiez les permissions de géolocalisation.');
      console.error('Erreur de géolocalisation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (app) => {
    const links = generateNavigationLink(business);
    if (links && links[app]) {
      window.open(links[app], '_blank');
    }
  };

  const formatDistance = (dist) => {
    if (dist < 1) {
      return `${Math.round(dist * 1000)} m`;
    }
    return `${dist.toFixed(1)} km`;
  };

  if (!business || !business.coordinates) {
    return (
      <div style={{
        padding: '1rem',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <p>📍 Coordonnées GPS non disponibles</p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🗺️ Navigation GPS
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Business Info */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
            {business.name}
          </h3>
          <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
            📍 {business.address}
          </p>
          {distance && (
            <p style={{ margin: '0', color: '#059669', fontSize: '0.875rem', fontWeight: '600' }}>
              📏 Distance: {formatDistance(distance)}
            </p>
          )}
        </div>

        {/* Location Status */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            color: '#3b82f6'
          }}>
            <p>🔄 Localisation en cours...</p>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: 0, color: '#dc2626', fontSize: '0.875rem' }}>
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Navigation Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Google Maps */}
          <button
            onClick={() => handleNavigation('googleMaps')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3367d6';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#4285f4';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🗺️</span>
            <span>Google Maps</span>
          </button>

          {/* Apple Maps */}
          <button
            onClick={() => handleNavigation('appleMaps')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: '#000000',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#333333';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#000000';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🍎</span>
            <span>Apple Maps</span>
          </button>

          {/* Waze */}
          <button
            onClick={() => handleNavigation('waze')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: '#33ccff',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#29b3e6';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#33ccff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🚗</span>
            <span>Waze</span>
          </button>

          {/* Universal Link */}
          <button
            onClick={() => handleNavigation('universal')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#047857';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🌐</span>
            <span>Navigation Web</span>
          </button>
        </div>

        {/* Coordinates Info */}
        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: '#475569'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>
            📍 Coordonnées GPS:
          </p>
          <p style={{ margin: 0 }}>
            Latitude: {business.coordinates.lat.toFixed(6)}<br/>
            Longitude: {business.coordinates.lng.toFixed(6)}
          </p>
          {business.coordinates.precision && (
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>
              Précision: {business.coordinates.precision === 'high' ? 'Élevée' : 'Moyenne'}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <button
            onClick={getUserLocation}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? '🔄 Localisation...' : '📍 Ma Position'}
          </button>
          
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPSNavigation;










