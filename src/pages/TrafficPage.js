import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TrafficPage = () => {
  const [trafficData, setTrafficData] = useState({
    lastUpdate: new Date().toLocaleTimeString('fr-FR'),
    conditions: 'Fluide',
    color: '#10b981'
  });

  const [selectedArea, setSelectedArea] = useState('centre');

  // Simulation de données de trafic en temps réel
  useEffect(() => {
    const updateTraffic = () => {
      const conditions = ['Fluide', 'Dense', 'Saturé', 'Bloqué'];
      const colors = ['#10b981', '#f59e0b', '#ef4444', '#dc2626'];
      const randomIndex = Math.floor(Math.random() * conditions.length);
      
      setTrafficData({
        lastUpdate: new Date().toLocaleTimeString('fr-FR'),
        conditions: conditions[randomIndex],
        color: colors[randomIndex]
      });
    };

    // Mise à jour toutes les 30 secondes
    const interval = setInterval(updateTraffic, 30000);
    
    // Mise à jour initiale
    updateTraffic();

    return () => clearInterval(interval);
  }, []);

  const trafficAreas = [
    {
      id: 'centre',
      name: 'Centre-ville',
      status: 'Dense',
      color: '#f59e0b',
      description: 'Trafic dense sur les principales artères',
      incidents: ['Accident mineur Avenue de la République', 'Travaux Boulevard du Commerce']
    },
    {
      id: 'ratoma',
      name: 'Ratoma',
      status: 'Fluide',
      color: '#10b981',
      description: 'Circulation normale',
      incidents: []
    },
    {
      id: 'matam',
      name: 'Matam',
      status: 'Saturé',
      color: '#ef4444',
      description: 'Embouteillages importants',
      incidents: ['Panne de signalisation Carrefour Matam', 'Manifestation Avenue de la Paix']
    },
    {
      id: 'dixinn',
      name: 'Dixinn',
      status: 'Fluide',
      color: '#10b981',
      description: 'Circulation normale',
      incidents: []
    },
    {
      id: 'kaloum',
      name: 'Kaloum',
      status: 'Dense',
      color: '#f59e0b',
      description: 'Trafic dense en centre-ville',
      incidents: ['Travaux Rue du Niger']
    },
    {
      id: 'matoto',
      name: 'Matoto',
      status: 'Bloqué',
      color: '#dc2626',
      description: 'Circulation bloquée',
      incidents: ['Accident grave Route de l\'Aéroport', 'Panne de signalisation Carrefour Matoto']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Fluide': return '🟢';
      case 'Dense': return '🟡';
      case 'Saturé': return '🟠';
      case 'Bloqué': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Fluide': return '#10b981';
      case 'Dense': return '#f59e0b';
      case 'Saturé': return '#ef4444';
      case 'Bloqué': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '2rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '0.5rem' }}>
                🚦 Trafic en Temps Réel
              </h1>
              <p style={{ color: '#6b7280', margin: 0, marginBottom: '1rem' }}>
                Surveillance du trafic à Conakry - Dernière mise à jour: {trafficData.lastUpdate}
              </p>
              <Link
                to="/traffic-map"
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.3s'
                }}
              >
                <span>🗺️ Voir sur la carte</span>
              </Link>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600', color: trafficData.color }}>
                {trafficData.conditions}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Légende */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
              Légende du Trafic
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
                    <div style={{ fontWeight: '600', color: '#374151' }}>{item.status}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zones de trafic */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {trafficAreas.map((area) => (
              <div
                key={area.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: selectedArea === area.id ? '2px solid #4b5563' : '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedArea(area.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', margin: 0 }}>
                    {area.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{getStatusIcon(area.status)}</span>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: getStatusColor(area.status)
                    }}>
                      {area.status}
                    </span>
                  </div>
                </div>
                
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  {area.description}
                </p>

                {area.incidents.length > 0 && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                      ⚠️ Incidents signalés:
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem', color: '#92400e' }}>
                      {area.incidents.map((incident, index) => (
                        <li key={index}>{incident}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conseils de circulation */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
              💡 Conseils de Circulation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #0ea5e9' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0c4a6e', marginBottom: '0.5rem' }}>
                  🕐 Heures de Pointe
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#0c4a6e', margin: 0 }}>
                  7h-9h et 17h-19h: Évitez le centre-ville si possible
                </p>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #22c55e' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#14532d', marginBottom: '0.5rem' }}>
                  🛣️ Itinéraires Alternatifs
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#14532d', margin: 0 }}>
                  Utilisez les routes périphériques pour éviter les embouteillages
                </p>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#fefce8', borderRadius: '0.5rem', border: '1px solid #eab308' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#713f12', marginBottom: '0.5rem' }}>
                  📱 Informations en Temps Réel
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#713f12', margin: 0 }}>
                  Cette page se met à jour automatiquement toutes les 30 secondes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficPage;
