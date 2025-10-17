import React, { useState, useEffect, useRef } from 'react';

const TrafficMapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [trafficData, setTrafficData] = useState({});
  const [selectedArea, setSelectedArea] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Données de trafic simulées avec coordonnées GPS
  const trafficAreas = [
    {
      id: 'centre',
      name: 'Centre-ville',
      lat: 9.6412,
      lng: -13.5784,
      status: 'Dense',
      color: '#f59e0b',
      description: 'Trafic dense sur les principales artères',
      incidents: ['Accident mineur Avenue de la République', 'Travaux Boulevard du Commerce']
    },
    {
      id: 'ratoma',
      name: 'Ratoma',
      lat: 9.6500,
      lng: -13.5500,
      status: 'Fluide',
      color: '#10b981',
      description: 'Circulation normale',
      incidents: []
    },
    {
      id: 'matam',
      name: 'Matam',
      lat: 9.6200,
      lng: -13.6000,
      status: 'Saturé',
      color: '#ef4444',
      description: 'Embouteillages importants',
      incidents: ['Panne de signalisation Carrefour Matam', 'Manifestation Avenue de la Paix']
    },
    {
      id: 'dixinn',
      name: 'Dixinn',
      lat: 9.6800,
      lng: -13.5800,
      status: 'Fluide',
      color: '#10b981',
      description: 'Circulation normale',
      incidents: []
    },
    {
      id: 'kaloum',
      name: 'Kaloum',
      lat: 9.6300,
      lng: -13.5700,
      status: 'Dense',
      color: '#f59e0b',
      description: 'Trafic dense en centre-ville',
      incidents: ['Travaux Rue du Niger']
    },
    {
      id: 'matoto',
      name: 'Matoto',
      lat: 9.6000,
      lng: -13.6200,
      status: 'Bloqué',
      color: '#dc2626',
      description: 'Circulation bloquée',
      incidents: ['Accident grave Route de l\'Aéroport', 'Panne de signalisation Carrefour Matoto']
    }
  ];

  // Géolocalisation automatique
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Erreur de géolocalisation:', error);
          // Position par défaut à Conakry
          setUserLocation({
            lat: 9.6412,
            lng: -13.5784
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      // Position par défaut à Conakry
      setUserLocation({
        lat: 9.6412,
        lng: -13.5784
      });
    }
  }, []);

  // Chargement de la carte OpenStreetMap avec Leaflet
  useEffect(() => {
    if (userLocation && !mapLoaded) {
      // Charger les scripts Leaflet
      const loadLeaflet = () => {
        return new Promise((resolve) => {
          if (window.L) {
            resolve();
            return;
          }

          // Charger CSS
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);

          // Charger JS
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      };

      loadLeaflet().then(() => {
        // Initialiser la carte
        const map = window.L.map('map').setView([userLocation.lat, userLocation.lng], 12);
        mapInstanceRef.current = map;

        // Ajouter les tuiles OpenStreetMap
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Ajouter un marqueur pour la position de l'utilisateur
        const userIcon = window.L.divIcon({
          className: 'user-location-marker',
          html: '<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>Votre position</b><br>Vous êtes ici')
          .openPopup();

        // Ajouter les marqueurs de trafic
        trafficAreas.forEach(area => {
          const getStatusIcon = (status) => {
            switch (status) {
              case 'Fluide': return '🟢';
              case 'Dense': return '🟡';
              case 'Saturé': return '🟠';
              case 'Bloqué': return '🔴';
              default: return '⚪';
            }
          };

          const trafficIcon = window.L.divIcon({
            className: 'traffic-marker',
            html: `<div style="background-color: ${area.color}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${getStatusIcon(area.status)}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = window.L.marker([area.lat, area.lng], { icon: trafficIcon })
            .addTo(map)
            .bindPopup(`
              <div style="min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #374151;">${area.name}</h3>
                <p style="margin: 0 0 8px 0; color: ${area.color}; font-weight: 600;">${getStatusIcon(area.status)} ${area.status}</p>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${area.description}</p>
                ${area.incidents.length > 0 ? `
                  <div style="background-color: #fef3c7; padding: 8px; border-radius: 4px; margin-top: 8px;">
                    <strong style="color: #92400e; font-size: 12px;">⚠️ Incidents:</strong>
                    <ul style="margin: 4px 0 0 0; padding-left: 16px; color: #92400e; font-size: 12px;">
                      ${area.incidents.map(incident => `<li>${incident}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `);

          marker.on('click', () => {
            setSelectedArea(area);
          });
        });

        setMapLoaded(true);
      });
    }
  }, [userLocation, mapLoaded]);

  // Mise à jour du trafic en temps réel
  useEffect(() => {
    const updateTraffic = () => {
      const conditions = ['Fluide', 'Dense', 'Saturé', 'Bloqué'];
      const colors = ['#10b981', '#f59e0b', '#ef4444', '#dc2626'];
      
      const newTrafficData = {};
      trafficAreas.forEach(area => {
        const randomIndex = Math.floor(Math.random() * conditions.length);
        newTrafficData[area.id] = {
          status: conditions[randomIndex],
          color: colors[randomIndex],
          lastUpdate: new Date().toLocaleTimeString('fr-FR')
        };
      });
      
      setTrafficData(newTrafficData);
    };

    // Mise à jour initiale
    updateTraffic();
    
    // Mise à jour toutes les 30 secondes
    const interval = setInterval(updateTraffic, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Fluide': return '🟢';
      case 'Dense': return '🟡';
      case 'Saturé': return '🟠';
      case 'Bloqué': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '0.5rem' }}>
                🗺️ Carte du Trafic en Temps Réel
              </h1>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Géolocalisation automatique - Dernière mise à jour: {Object.keys(trafficData).length > 0 ? trafficData[Object.keys(trafficData)[0]]?.lastUpdate : 'Chargement...'}
              </p>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {userLocation ? 'Position détectée' : 'Position par défaut'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
        {/* Carte */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div 
            id="map" 
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: '#e5e7eb'
            }}
          >
            {!mapLoaded && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🗺️</div>
                <div>Chargement de la carte...</div>
              </div>
            )}
          </div>
        </div>

        {/* Panneau latéral */}
        <div style={{ 
          width: '350px', 
          backgroundColor: 'white', 
          borderLeft: '1px solid #e5e7eb',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '1.5rem' }}>
            {/* Légende */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                Légende du Trafic
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { status: 'Fluide', color: '#10b981', description: 'Circulation normale' },
                  { status: 'Dense', color: '#f59e0b', description: 'Trafic ralenti' },
                  { status: 'Saturé', color: '#ef4444', description: 'Embouteillages' },
                  { status: 'Bloqué', color: '#dc2626', description: 'Circulation bloquée' }
                ].map((item) => (
                  <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: item.color
                    }}></div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>{item.status}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zones de trafic */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                Zones de Trafic
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {trafficAreas.map((area) => {
                  const currentData = trafficData[area.id] || { status: area.status, color: area.color };
                  return (
                    <div
                      key={area.id}
                      style={{
                        padding: '1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: selectedArea?.id === area.id ? '#f3f4f6' : 'white',
                        transition: 'background-color 0.3s'
                      }}
                      onClick={() => setSelectedArea(area)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', margin: 0 }}>
                          {area.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.25rem' }}>{getStatusIcon(currentData.status)}</span>
                          <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: currentData.color
                          }}>
                            {currentData.status}
                          </span>
                        </div>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                        {area.description}
                      </p>
                      {area.incidents.length > 0 && (
                        <div style={{
                          backgroundColor: '#fef3c7',
                          border: '1px solid #f59e0b',
                          borderRadius: '0.375rem',
                          padding: '0.75rem',
                          marginTop: '0.75rem'
                        }}>
                          <h5 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                            ⚠️ Incidents:
                          </h5>
                          <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.75rem', color: '#92400e' }}>
                            {area.incidents.map((incident, index) => (
                              <li key={index}>{incident}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conseils */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #0ea5e9' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0c4a6e', marginBottom: '0.5rem' }}>
                💡 Conseils
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem', color: '#0c4a6e' }}>
                <li>Cliquez sur les marqueurs pour plus d'infos</li>
                <li>La carte se met à jour automatiquement</li>
                <li>Votre position est détectée automatiquement</li>
                <li>Évitez les zones rouges si possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMapPage;
