import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, RefreshCw, MapPin, AlertTriangle, Navigation, ZoomIn, ZoomOut, Layers, Loader } from 'lucide-react';
import { usePushNotification } from '../contexts/PushNotificationContext';
import { useRoadReport } from '../contexts/RoadReportContext';
import toast from 'react-hot-toast';

const TrafficMapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [trafficData, setTrafficData] = useState({});
  const [selectedArea, setSelectedArea] = useState(null);
  const [filters, setFilters] = useState({
    fluide: true,
    dense: true,
    sature: true,
    bloque: true
  });
  const [showFilters, setShowFilters] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [mapView, setMapView] = useState('standard'); // standard, satellite, terrain
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polygonsRef = useRef({});
  const routesRef = useRef([]);
  const { notifyTrafficAlert } = usePushNotification();
  const { reports, reportTypes, loading: reportsLoading } = useRoadReport();
  const previousTrafficDataRef = useRef({});
  const previousReportsRef = useRef([]);

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Données de trafic avec zones polygonales et routes
  const trafficAreas = [
    {
      id: 'centre',
      name: 'Centre-ville',
      lat: 9.6412,
      lng: -13.5784,
      status: 'Dense',
      color: '#f59e0b',
      description: 'Trafic dense sur les principales artères',
      incidents: ['Accident mineur Avenue de la République', 'Travaux Boulevard du Commerce'],
      polygon: [
        [9.6350, -13.5850],
        [9.6470, -13.5850],
        [9.6470, -13.5720],
        [9.6350, -13.5720]
      ],
      routes: [
        { name: 'Avenue de la République', status: 'Dense', color: '#f59e0b' },
        { name: 'Boulevard du Commerce', status: 'Saturé', color: '#ef4444' }
      ]
    },
    {
      id: 'ratoma',
      name: 'Ratoma',
      lat: 9.6500,
      lng: -13.5500,
      status: 'Fluide',
      color: '#10b981',
      description: 'Circulation normale',
      incidents: [],
      polygon: [
        [9.6450, -13.5550],
        [9.6550, -13.5550],
        [9.6550, -13.5450],
        [9.6450, -13.5450]
      ],
      routes: [
        { name: 'Route de Ratoma', status: 'Fluide', color: '#10b981' }
      ]
    },
    {
      id: 'matam',
      name: 'Matam',
      lat: 9.6200,
      lng: -13.6000,
      status: 'Saturé',
      color: '#ef4444',
      description: 'Embouteillages importants',
      incidents: ['Panne de signalisation Carrefour Matam', 'Manifestation Avenue de la Paix'],
      polygon: [
        [9.6150, -13.6050],
        [9.6250, -13.6050],
        [9.6250, -13.5950],
        [9.6150, -13.5950]
      ],
      routes: [
        { name: 'Avenue de la Paix', status: 'Bloqué', color: '#dc2626' },
        { name: 'Route Matam-Centre', status: 'Saturé', color: '#ef4444' }
      ]
    },
    {
      id: 'dixinn',
      name: 'Dixinn',
      lat: 9.6800,
      lng: -13.5800,
      status: 'Fluide',
      color: '#10b981',
      description: 'Circulation normale',
      incidents: [],
      polygon: [
        [9.6750, -13.5850],
        [9.6850, -13.5850],
        [9.6850, -13.5750],
        [9.6750, -13.5750]
      ],
      routes: [
        { name: 'Route de Dixinn', status: 'Fluide', color: '#10b981' }
      ]
    },
    {
      id: 'kaloum',
      name: 'Kaloum',
      lat: 9.6300,
      lng: -13.5700,
      status: 'Dense',
      color: '#f59e0b',
      description: 'Trafic dense en centre-ville',
      incidents: ['Travaux Rue du Niger'],
      polygon: [
        [9.6250, -13.5750],
        [9.6350, -13.5750],
        [9.6350, -13.5650],
        [9.6250, -13.5650]
      ],
      routes: [
        { name: 'Rue du Niger', status: 'Dense', color: '#f59e0b' }
      ]
    },
    {
      id: 'matoto',
      name: 'Matoto',
      lat: 9.6000,
      lng: -13.6200,
      status: 'Bloqué',
      color: '#dc2626',
      description: 'Circulation bloquée',
      incidents: ['Accident grave Route de l\'Aéroport', 'Panne de signalisation Carrefour Matoto'],
      polygon: [
        [9.5950, -13.6250],
        [9.6050, -13.6250],
        [9.6050, -13.6150],
        [9.5950, -13.6150]
      ],
      routes: [
        { name: 'Route de l\'Aéroport', status: 'Bloqué', color: '#dc2626' },
        { name: 'Carrefour Matoto', status: 'Bloqué', color: '#dc2626' }
      ]
    }
  ];

  // Géolocalisation automatique en temps réel
  useEffect(() => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      // Obtenir la position initiale
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setLocationLoading(false);
          console.log('Position utilisateur:', location);
        },
        (error) => {
          console.log('Erreur de géolocalisation:', error);
          // Position par défaut (Conakry)
          const defaultLocation = {
            lat: 9.6412,
            lng: -13.5784
          };
          setUserLocation(defaultLocation);
          setLocationLoading(false);
          toast.error('Impossible d\'obtenir votre position. Utilisation de la position par défaut.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );

      // Suivre la position en temps réel
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Mettre à jour le marqueur de position sur la carte
          if (mapInstanceRef.current) {
            const userMarker = markersRef.current['user'];
            if (userMarker) {
              userMarker.setLatLng([location.lat, location.lng]);
            }
          }
        },
        (error) => {
          console.error('Erreur de suivi de position:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000 // Mettre à jour toutes les 30 secondes
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      // Position par défaut si la géolocalisation n'est pas supportée
      setUserLocation({
        lat: 9.6412,
        lng: -13.5784
      });
      setLocationLoading(false);
    }
  }, []);


  // Convertir les signalements routiers en données de trafic
  useEffect(() => {
    if (!reports || reports.length === 0) {
      // Si pas de signalements, considérer le trafic comme fluide
      setTrafficData({});
      return;
    }

    const newTrafficData = {};
    
    // Convertir les types de signalements en statuts de trafic
    const typeToStatus = {
      'roadwork': { status: 'Dense', color: '#f59e0b' },
      'accident': { status: 'Bloqué', color: '#dc2626' },
      'traffic': { status: 'Saturé', color: '#ef4444' }
    };

    // Grouper les signalements par zone (basé sur les coordonnées)
    reports.forEach(report => {
      if (!report.coordinates || !report.coordinates.lat || !report.coordinates.lng) {
        return; // Ignorer les signalements sans coordonnées
      }

      const typeInfo = typeToStatus[report.type] || { status: 'Dense', color: '#f59e0b' };
      const reportId = report.id;
      
      newTrafficData[reportId] = {
        status: typeInfo.status,
        color: typeInfo.color,
        lastUpdate: report.createdAt?.toDate ? report.createdAt.toDate().toLocaleTimeString('fr-FR') : new Date().toLocaleTimeString('fr-FR'),
        report: report // Garder une référence au signalement
      };
    });

    setTrafficData(newTrafficData);
    setLastUpdate(new Date());

    // Vérifier les nouveaux signalements pour les notifications
    const newReports = reports.filter(report => {
      return !previousReportsRef.current.find(prev => prev.id === report.id);
    });

    newReports.forEach(report => {
      if (report.coordinates && report.coordinates.lat && report.coordinates.lng) {
        const typeInfo = typeToStatus[report.type] || { status: 'Dense', color: '#f59e0b' };
        const reportType = reportTypes.find(t => t.id === report.type);
        
        notifyTrafficAlert({
          area: report.location || 'Zone inconnue',
          level: report.type === 'accident' ? 'heavy' : report.type === 'traffic' ? 'heavy' : 'moderate',
          message: `${reportType?.icon || '⚠️'} ${report.title || 'Nouveau signalement'} - ${report.location || ''}`
        });

        toast.success(`Nouveau signalement: ${report.title}`, {
          icon: reportType?.icon || '⚠️',
          duration: 5000
        });
      }
    });

    previousReportsRef.current = [...reports];
  }, [reports, reportTypes, notifyTrafficAlert]);

  // Mettre à jour les marqueurs sur la carte quand les signalements changent
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    // Supprimer les anciens marqueurs de signalements
    Object.keys(markersRef.current).forEach(key => {
      if (key.startsWith('report-')) {
        mapInstanceRef.current.removeLayer(markersRef.current[key]);
        delete markersRef.current[key];
      }
    });

    // Ajouter les nouveaux marqueurs basés sur les signalements réels
    reports.forEach(report => {
      if (!report.coordinates || !report.coordinates.lat || !report.coordinates.lng) {
        return;
      }

      const typeInfo = trafficData[report.id] || { status: 'Dense', color: '#f59e0b' };
      const reportType = reportTypes.find(t => t.id === report.type);
      
      const getStatusIcon = (status) => {
        switch (status) {
          case 'Fluide': return '🟢';
          case 'Dense': return '🟡';
          case 'Saturé': return '🟠';
          case 'Bloqué': return '🔴';
          default: return reportType?.icon || '⚠️';
        }
      };

      const reportIcon = window.L.divIcon({
        className: 'traffic-marker',
        html: `<div style="background-color: ${typeInfo.color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); animation: pulse 2s infinite;">${getStatusIcon(typeInfo.status)}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = window.L.marker(
        [report.coordinates.lat, report.coordinates.lng],
        { icon: reportIcon }
      ).addTo(mapInstanceRef.current);

      const formatDate = (timestamp) => {
        if (!timestamp) return 'Date inconnue';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString('fr-FR');
      };

      marker.bindPopup(`
        <div style="min-width: 250px;">
          <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 16px; font-weight: 600;">${reportType?.icon || '⚠️'} ${report.title || 'Signalement'}</h3>
          <p style="margin: 0 0 8px 0; color: ${typeInfo.color}; font-weight: 600; font-size: 14px;">${typeInfo.status}</p>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;"><strong>📍</strong> ${report.location || 'Localisation non spécifiée'}</p>
          ${report.description ? `<p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">${report.description}</p>` : ''}
          ${report.imageUrl ? `<img src="${report.imageUrl}" style="width: 100%; border-radius: 4px; margin: 8px 0;" alt="Photo du signalement" />` : ''}
          <p style="margin: 4px 0; color: #9ca3af; font-size: 11px;">Signalé le: ${formatDate(report.createdAt)}</p>
        </div>
      `);

      marker.on('click', () => {
        setSelectedArea({
          id: report.id,
          name: report.title,
          lat: report.coordinates.lat,
          lng: report.coordinates.lng,
          status: typeInfo.status,
          color: typeInfo.color,
          description: report.description,
          report: report
        });
        mapInstanceRef.current.setView([report.coordinates.lat, report.coordinates.lng], 15);
      });

      markersRef.current[`report-${report.id}`] = marker;
    });
  }, [reports, trafficData, reportTypes, mapLoaded]);

  // Chargement de la carte OpenStreetMap avec Leaflet
  useEffect(() => {
    if (userLocation && !mapLoaded) {
      const loadLeaflet = () => {
        return new Promise((resolve) => {
          if (window.L) {
            resolve();
            return;
          }

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);

          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      };

      loadLeaflet().then(() => {
        const map = window.L.map('map').setView([userLocation.lat, userLocation.lng], 12);
        mapInstanceRef.current = map;

        // Ajouter les tuiles selon la vue
        const getTileLayer = (view) => {
          switch(view) {
            case 'satellite':
              return window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '© Esri'
              });
            case 'terrain':
              return window.L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenTopoMap'
              });
            default:
              return window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
              });
          }
        };

        getTileLayer(mapView).addTo(map);

        // Ajouter un marqueur pour la position de l'utilisateur
        const userIcon = window.L.divIcon({
          className: 'user-location-marker',
          html: '<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); animation: pulse 2s infinite;"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const userMarker = window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>📍 Votre position</b><br>Vous êtes ici');
        
        markersRef.current['user'] = userMarker;
        
        // Ouvrir le popup seulement si c'est la première fois
        if (locationLoading === false) {
          userMarker.openPopup();
        }

        // Les signalements seront ajoutés par l'effet qui écoute les reports
        setMapLoaded(true);
      });
    }
  }, [userLocation, mapView]);

  // Filtrer les signalements selon les filtres actifs
  const filteredReports = reports.filter(report => {
    if (!report.coordinates || !report.coordinates.lat || !report.coordinates.lng) {
      return false;
    }
    
    const typeInfo = trafficData[report.id];
    if (!typeInfo) return false;
    
    const status = typeInfo.status.toLowerCase();
    return (
      (status === 'fluide' && filters.fluide) ||
      (status === 'dense' && filters.dense) ||
      (status === 'saturé' && filters.sature) ||
      (status === 'bloqué' && filters.bloque)
    );
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Fluide': return '🟢';
      case 'Dense': return '🟡';
      case 'Saturé': return '🟠';
      case 'Bloqué': return '🔴';
      default: return '⚪';
    }
  };

  const handleZoomToReport = (report) => {
    if (mapInstanceRef.current && report.coordinates) {
      mapInstanceRef.current.setView([report.coordinates.lat, report.coordinates.lng], 15);
      const typeInfo = trafficData[report.id] || { status: 'Dense', color: '#f59e0b' };
      setSelectedArea({
        id: report.id,
        name: report.title,
        lat: report.coordinates.lat,
        lng: report.coordinates.lng,
        status: typeInfo.status,
        color: typeInfo.color,
        description: report.description,
        report: report
      });
    }
  };

  const handleRefresh = () => {
    // Recharger les signalements (ils sont déjà en temps réel via Firestore)
    setLastUpdate(new Date());
    toast.success('Carte actualisée');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem 0', borderBottom: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '0.5rem' }}>
                🗺️ Carte du Trafic en Temps Réel
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: autoUpdate ? '#10b981' : '#ef4444',
                    animation: autoUpdate ? 'pulse 2s infinite' : 'none'
                  }}></div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {autoUpdate ? 'Mise à jour automatique' : 'Mise à jour désactivée'}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: showFilters ? '#3b82f6' : '#f3f4f6',
                  color: showFilters ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}
              >
                <Filter size={18} />
                Filtres
              </button>
              <button
                onClick={handleRefresh}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}
              >
                <RefreshCw size={18} />
                Actualiser
              </button>
              <button
                onClick={() => setAutoUpdate(!autoUpdate)}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: autoUpdate ? '#10b981' : '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}
              >
                {autoUpdate ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 120px)', 
        position: 'relative' 
      }}>
        {/* Carte */}
        <div style={{ 
          flex: 1, 
          position: 'relative',
          height: isMobile ? '50vh' : '100%',
          minHeight: isMobile ? '300px' : 'auto'
        }}>
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
                color: '#6b7280',
                zIndex: 1000
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>🗺️</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>Chargement de la carte...</div>
              </div>
            )}
          </div>

          {/* Contrôles de la carte */}
          {mapLoaded && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '0.5rem',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => {
                  const views = ['standard', 'satellite', 'terrain'];
                  const currentIndex = views.indexOf(mapView);
                  const nextIndex = (currentIndex + 1) % views.length;
                  setMapView(views[nextIndex]);
                  // Recharger la carte avec la nouvelle vue
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.eachLayer((layer) => {
                      if (layer instanceof window.L.TileLayer) {
                        mapInstanceRef.current.removeLayer(layer);
                      }
                    });
                    const getTileLayer = (view) => {
                      switch(view) {
                        case 'satellite':
                          return window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                            attribution: '© Esri'
                          });
                        case 'terrain':
                          return window.L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                            attribution: '© OpenTopoMap'
                          });
                        default:
                          return window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '© OpenStreetMap contributors'
                          });
                      }
                    };
                    getTileLayer(views[nextIndex]).addTo(mapInstanceRef.current);
                  }
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Changer de vue"
              >
                <Layers size={20} color="#374151" />
              </button>
              <button
                onClick={() => mapInstanceRef.current?.zoomIn()}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Zoomer"
              >
                <ZoomIn size={20} color="#374151" />
              </button>
              <button
                onClick={() => mapInstanceRef.current?.zoomOut()}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Dézoomer"
              >
                <ZoomOut size={20} color="#374151" />
              </button>
            </div>
          )}
        </div>

        {/* Panneau latéral avec filtres */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ 
                position: isMobile ? 'fixed' : 'absolute',
                top: 0,
                right: 0,
                width: isMobile ? '100%' : '320px', 
                height: isMobile ? '100%' : '100%',
                backgroundColor: 'white', 
                borderLeft: isMobile ? 'none' : '1px solid #e5e7eb',
                overflowY: 'auto',
                boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
                zIndex: 999
              }}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', margin: 0 }}>
                    Filtres
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '0.375rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={20} color="#6b7280" />
                  </button>
                </div>

                {/* Filtres de statut */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                    Statut du Trafic
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { key: 'fluide', label: 'Fluide', color: '#10b981', icon: '🟢' },
                      { key: 'dense', label: 'Dense', color: '#f59e0b', icon: '🟡' },
                      { key: 'sature', label: 'Saturé', color: '#ef4444', icon: '🟠' },
                      { key: 'bloque', label: 'Bloqué', color: '#dc2626', icon: '🔴' }
                    ].map((filter) => (
                      <label
                        key={filter.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          backgroundColor: filters[filter.key] ? `${filter.color}10` : 'white',
                          transition: 'all 0.2s'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters[filter.key]}
                          onChange={(e) => setFilters({ ...filters, [filter.key]: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '1.25rem' }}>{filter.icon}</span>
                        <span style={{ fontWeight: '600', color: '#374151', flex: 1 }}>{filter.label}</span>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: filter.color
                        }}></div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Légende */}
                <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                    Légende
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { status: 'Fluide', color: '#10b981', description: 'Circulation normale' },
                      { status: 'Dense', color: '#f59e0b', description: 'Trafic ralenti' },
                      { status: 'Saturé', color: '#ef4444', description: 'Embouteillages' },
                      { status: 'Bloqué', color: '#dc2626', description: 'Circulation bloquée' }
                    ].map((item) => (
                      <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: item.color
                        }}></div>
                        <span style={{ fontWeight: '600', color: '#374151' }}>{item.status}</span>
                        <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>- {item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signalements routiers */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                    Signalements ({filteredReports.length})
                  </h4>
                  {reportsLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                      <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />
                    </div>
                  ) : filteredReports.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                      <p>Aucun signalement pour le moment</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
                      {filteredReports.map((report) => {
                        const typeInfo = trafficData[report.id] || { status: 'Dense', color: '#f59e0b' };
                        const reportType = reportTypes.find(t => t.id === report.type);
                        const formatDate = (timestamp) => {
                          if (!timestamp) return 'Date inconnue';
                          const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
                          return date.toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
                        };
                        
                        return (
                          <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              padding: '1rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              backgroundColor: selectedArea?.id === report.id ? '#eff6ff' : 'white',
                              borderLeft: `4px solid ${typeInfo.color}`,
                              transition: 'all 0.3s'
                            }}
                            onClick={() => handleZoomToReport(report)}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>{reportType?.icon || '⚠️'}</span>
                                {report.title}
                              </h5>
                              <span style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: typeInfo.color
                              }}>
                                {typeInfo.status}
                              </span>
                            </div>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0, marginBottom: '0.5rem' }}>
                              📍 {report.location || 'Localisation non spécifiée'}
                            </p>
                            {report.description && (
                              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0, marginBottom: '0.5rem' }}>
                                {report.description}
                              </p>
                            )}
                            <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0, marginBottom: '0.5rem' }}>
                              {formatDate(report.createdAt)}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleZoomToReport(report);
                              }}
                              style={{
                                marginTop: '0.5rem',
                                width: '100%',
                                padding: '0.5rem',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                              }}
                            >
                              <Navigation size={16} />
                              Voir sur la carte
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panneau latéral par défaut (quand filtres fermés) */}
        {!showFilters && (
          <div style={{ 
            width: '350px', 
            backgroundColor: 'white', 
            borderLeft: '1px solid #e5e7eb',
            overflowY: 'auto',
            boxShadow: '-2px 0 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ padding: '1.5rem' }}>
              {/* Info utilisateur */}
              <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <MapPin size={20} color="#3b82f6" />
                  <span style={{ fontWeight: '600', color: '#1e40af' }}>
                    {userLocation ? 'Position détectée' : 'Position par défaut'}
                  </span>
                </div>
                {userLocation && (
                  <p style={{ fontSize: '0.875rem', color: '#1e40af', margin: 0 }}>
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                )}
              </div>

              {/* Statistiques */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                  Statistiques
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {[
                    { label: 'Total signalements', value: reports.length, color: '#3b82f6' },
                    { label: 'Travaux', value: reports.filter(r => r.type === 'roadwork').length, color: '#f59e0b' },
                    { label: 'Accidents', value: reports.filter(r => r.type === 'accident').length, color: '#ef4444' },
                    { label: 'Embouteillages', value: reports.filter(r => r.type === 'traffic').length, color: '#dc2626' }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        border: `2px solid ${stat.color}20`,
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: stat.color, marginBottom: '0.25rem' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signalements routiers */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                  Signalements ({filteredReports.length})
                </h3>
                {reportsLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    <p>Aucun signalement pour le moment</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {filteredReports.map((report) => {
                      const typeInfo = trafficData[report.id] || { status: 'Dense', color: '#f59e0b' };
                      const reportType = reportTypes.find(t => t.id === report.type);
                      const formatDate = (timestamp) => {
                        if (!timestamp) return 'Date inconnue';
                        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
                        return date.toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
                      };
                      
                      return (
                        <div
                          key={report.id}
                          style={{
                            padding: '1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            backgroundColor: selectedArea?.id === report.id ? '#f3f4f6' : 'white',
                            borderLeft: `4px solid ${typeInfo.color}`,
                            transition: 'all 0.3s'
                          }}
                          onClick={() => handleZoomToReport(report)}
                          onMouseEnter={(e) => {
                            if (selectedArea?.id !== report.id) {
                              e.currentTarget.style.backgroundColor = '#f9fafb';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedArea?.id !== report.id) {
                              e.currentTarget.style.backgroundColor = 'white';
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>{reportType?.icon || '⚠️'}</span>
                              {report.title}
                            </h4>
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: typeInfo.color
                            }}>
                              {typeInfo.status}
                            </span>
                          </div>
                          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                            📍 {report.location || 'Localisation non spécifiée'}
                          </p>
                          {report.description && (
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                              {report.description}
                            </p>
                          )}
                          <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>
                            {formatDate(report.createdAt)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS pour les animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .traffic-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default TrafficMapPage;
