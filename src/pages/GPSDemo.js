import React, { useState, useEffect } from 'react';
import { useBusiness } from '../contexts/BusinessContext';
import BusinessCard from '../components/BusinessCard';
import { getCurrentLocation, findNearestBusinesses } from '../services/geolocationService';

const GPSDemo = () => {
  const { pendingBusinesses, approvedBusinesses } = useBusiness();
  const [userLocation, setUserLocation] = useState(null);
  const [nearestBusinesses, setNearestBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allBusinesses = [...pendingBusinesses, ...approvedBusinesses];

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      // Trouver les entreprises les plus proches
      const nearest = findNearestBusinesses(location, allBusinesses, 5);
      setNearestBusinesses(nearest);
    } catch (err) {
      setError('Impossible d\'obtenir votre position. Vérifiez les permissions de géolocalisation.');
      console.error('Erreur de géolocalisation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            🗺️ Démonstration GPS
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Testez la navigation GPS automatique pour chaque entreprise. 
            Cliquez sur le bouton GPS de n'importe quelle entreprise pour voir les options de navigation.
          </p>
        </div>

        {/* Status de géolocalisation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📍 Votre Position
          </h2>
          
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
              <button
                onClick={getUserLocation}
                style={{
                  marginTop: '0.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Réessayer
              </button>
            </div>
          )}

          {userLocation && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <p style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  Latitude
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '1rem',
                  color: '#374151',
                  fontFamily: 'monospace'
                }}>
                  {userLocation.lat.toFixed(6)}
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <p style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  Longitude
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '1rem',
                  color: '#374151',
                  fontFamily: 'monospace'
                }}>
                  {userLocation.lng.toFixed(6)}
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <p style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  Précision
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '1rem',
                  color: '#374151'
                }}>
                  {userLocation.accuracy ? `${Math.round(userLocation.accuracy)}m` : 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Entreprises les plus proches */}
        {nearestBusinesses.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎯 Entreprises les Plus Proches
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {nearestBusinesses.slice(0, 3).map((business, index) => (
                <div key={business.id} style={{
                  border: '2px solid #059669',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    left: '1rem',
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    #{index + 1}
                  </div>
                  
                  <h3 style={{
                    margin: '0.5rem 0 0.5rem 0',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    {business.name}
                  </h3>
                  
                  <p style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    📍 {business.address}
                  </p>
                  
                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    color: '#059669',
                    fontWeight: '600'
                  }}>
                    📏 Distance: {business.distance < 1 ? 
                      `${Math.round(business.distance * 1000)} m` : 
                      `${business.distance.toFixed(1)} km`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toutes les entreprises avec GPS */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🏢 Toutes les Entreprises
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {allBusinesses.map(business => (
              <BusinessCard
                key={business.id}
                business={business}
                showAdminActions={false}
              />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginTop: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💡 Instructions
          </h3>
          
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#92400e',
            lineHeight: '1.6'
          }}>
            <li>Cliquez sur le bouton <strong>🗺️ GPS</strong> de n'importe quelle entreprise</li>
            <li>Choisissez votre application de navigation préférée (Google Maps, Apple Maps, Waze)</li>
            <li>La navigation s'ouvrira automatiquement avec l'itinéraire vers l'entreprise</li>
            <li>Les coordonnées GPS sont générées automatiquement à partir de l'adresse</li>
            <li>La distance est calculée en temps réel si vous autorisez la géolocalisation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GPSDemo;










