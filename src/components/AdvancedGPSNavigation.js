import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import GoogleMapsOptimized from '../services/GoogleMapsOptimized';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Navigation2, 
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Car,
  User,
  Bike,
  Train,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdvancedGPSNavigation = ({ 
  origin, 
  destination, 
  onRouteChange,
  className = '' 
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [voiceNavigation, setVoiceNavigation] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [navigationInstructions, setNavigationInstructions] = useState([]);
  const [trafficInfo, setTrafficInfo] = useState(null);
  const [estimatedArrival, setEstimatedArrival] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const { theme } = useTheme();
  const navigationIntervalRef = useRef(null);
  const voiceSynthesisRef = useRef(null);

  // Modes de transport disponibles
  const travelModes = [
    { id: 'DRIVING', label: 'Voiture', icon: Car, color: '#4285F4' },
    { id: 'WALKING', label: 'Marche', icon: User, color: '#34A853' },
    { id: 'BICYCLING', label: 'Vélo', icon: Bike, color: '#FBBC04' },
    { id: 'TRANSIT', label: 'Transport public', icon: Train, color: '#EA4335' }
  ];

  // Calculer l'itinéraire
  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination, travelMode]);

  const calculateRoute = async () => {
    try {
      const result = await GoogleMapsOptimized.calculateAdvancedRoute(origin, destination, {
        travelMode: travelMode,
        alternatives: true,
        avoidHighways: false,
        avoidTolls: false
      });

      if (result && result.routes) {
        setCurrentRoute(result.routes[0]);
        setAlternativeRoutes(result.routes.slice(1));
        setSelectedRouteIndex(0);
        
        // Extraire les instructions de navigation
        extractNavigationInstructions(result.routes[0]);
        
        if (onRouteChange) {
          onRouteChange(result.routes[0]);
        }
      }
    } catch (error) {
      console.error('Erreur de calcul d\'itinéraire:', error);
      toast.error('Erreur lors du calcul de l\'itinéraire');
    }
  };

  const extractNavigationInstructions = (route) => {
    if (!route.legs || route.legs.length === 0) return;

    const instructions = [];
    route.legs.forEach((leg, legIndex) => {
      if (leg.steps) {
        leg.steps.forEach((step, stepIndex) => {
          instructions.push({
            id: `${legIndex}-${stepIndex}`,
            instruction: step.instructions,
            distance: step.distance,
            duration: step.duration,
            maneuver: step.maneuver || 'straight',
            startLocation: step.start_location,
            endLocation: step.end_location
          });
        });
      }
    });

    setNavigationInstructions(instructions);
  };

  // Démarrer la navigation
  const startNavigation = () => {
    if (!currentRoute) return;

    setIsNavigating(true);
    setCurrentStep(0);
    
    // Démarrer les mises à jour en temps réel
    if (realTimeUpdates) {
      startRealTimeUpdates();
    }

    // Activer la navigation vocale
    if (voiceNavigation) {
      startVoiceNavigation();
    }

    toast.success('Navigation démarrée');
  };

  // Arrêter la navigation
  const stopNavigation = () => {
    setIsNavigating(false);
    setIsPaused(false);
    
    // Arrêter les mises à jour en temps réel
    if (navigationIntervalRef.current) {
      clearInterval(navigationIntervalRef.current);
    }

    // Arrêter la synthèse vocale
    if (voiceSynthesisRef.current) {
      voiceSynthesisRef.current.cancel();
    }

    toast.info('Navigation arrêtée');
  };

  // Mettre en pause/reprendre
  const togglePause = () => {
    setIsPaused(!isPaused);
    
    if (isPaused) {
      // Reprendre la navigation
      if (realTimeUpdates) {
        startRealTimeUpdates();
      }
      if (voiceNavigation) {
        startVoiceNavigation();
      }
    } else {
      // Mettre en pause
      if (navigationIntervalRef.current) {
        clearInterval(navigationIntervalRef.current);
      }
      if (voiceSynthesisRef.current) {
        voiceSynthesisRef.current.cancel();
      }
    }
  };

  // Mises à jour en temps réel
  const startRealTimeUpdates = () => {
    navigationIntervalRef.current = setInterval(() => {
      updateNavigation();
    }, 5000); // Mise à jour toutes les 5 secondes
  };

  const updateNavigation = async () => {
    try {
      // Obtenir la position actuelle
      const currentPosition = await GoogleMapsOptimized.getUserLocation();
      
      // Recalculer l'itinéraire depuis la position actuelle
      const newRoute = await GoogleMapsOptimized.calculateAdvancedRoute(
        currentPosition,
        destination,
        {
          travelMode: travelMode,
          alternatives: false
        }
      );

      if (newRoute && newRoute.routes && newRoute.routes[0]) {
        setCurrentRoute(newRoute.routes[0]);
        extractNavigationInstructions(newRoute.routes[0]);
      }
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
    }
  };

  // Navigation vocale
  const startVoiceNavigation = () => {
    if (!('speechSynthesis' in window)) {
      console.warn('Synthèse vocale non supportée');
      return;
    }

    // Annoncer la prochaine instruction
    if (navigationInstructions.length > currentStep) {
      const instruction = navigationInstructions[currentStep];
      announceInstruction(instruction.instruction);
    }
  };

  const announceInstruction = (text) => {
    if (voiceSynthesisRef.current) {
      voiceSynthesisRef.current.cancel();
    }

    voiceSynthesisRef.current = new SpeechSynthesisUtterance(text);
    voiceSynthesisRef.current.lang = 'fr-FR';
    voiceSynthesisRef.current.rate = 0.9;
    voiceSynthesisRef.current.pitch = 1;
    voiceSynthesisRef.current.volume = 0.8;

    voiceSynthesisRef.current.onend = () => {
      // Passer à l'instruction suivante
      setCurrentStep(prev => prev + 1);
    };

    window.speechSynthesis.speak(voiceSynthesisRef.current);
  };

  // Sélectionner un itinéraire alternatif
  const selectAlternativeRoute = (routeIndex) => {
    setSelectedRouteIndex(routeIndex);
    setCurrentRoute(alternativeRoutes[routeIndex - 1]);
    extractNavigationInstructions(alternativeRoutes[routeIndex - 1]);
  };

  // Changer le mode de transport
  const changeTravelMode = (mode) => {
    setTravelMode(mode);
    setCurrentStep(0);
  };

  // Formater la durée
  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    return duration.text || `${Math.round(duration.value / 60)} min`;
  };

  // Formater la distance
  const formatDistance = (distance) => {
    if (!distance) return 'N/A';
    return distance.text || `${Math.round(distance.value / 1000)} km`;
  };

  // Obtenir l'icône de manœuvre
  const getManeuverIcon = (maneuver) => {
    const icons = {
      'turn-left': '↰',
      'turn-right': '↱',
      'turn-sharp-left': '↰',
      'turn-sharp-right': '↱',
      'turn-slight-left': '↖',
      'turn-slight-right': '↗',
      'straight': '↑',
      'uturn-left': '↶',
      'uturn-right': '↷',
      'merge': '⇄',
      'fork-left': '↰',
      'fork-right': '↱',
      'ramp-left': '↰',
      'ramp-right': '↱'
    };
    return icons[maneuver] || '↑';
  };

  if (!origin || !destination) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)'
      }}>
        <MapPin size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <p>Sélectionnez une destination pour commencer la navigation</p>
      </div>
    );
  }

  return (
    <div className={`advanced-gps-navigation ${className}`} style={{
      backgroundColor: 'var(--surface-primary)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-elevated)',
      overflow: 'hidden'
    }}>
      {/* En-tête de navigation */}
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--accent-color)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Navigation size={20} />
          </div>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: 'var(--font-size-lg)',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Navigation GPS
            </h3>
            <p style={{
              margin: 0,
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)'
            }}>
              {formatDistance(distance)} • {formatDuration(duration)}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isNavigating ? (
            <>
              <button
                onClick={togglePause}
                style={{
                  padding: '0.5rem',
                  backgroundColor: isPaused ? 'var(--accent-color)' : 'var(--surface-primary)',
                  color: isPaused ? 'white' : 'var(--accent-color)',
                  border: '1px solid var(--accent-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
              <button
                onClick={stopNavigation}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'var(--surface-primary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={startNavigation}
              style={{
                padding: '0.5rem 1rem',
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
                fontWeight: '500'
              }}
            >
              <Play size={16} />
              Démarrer
            </button>
          )}
        </div>
      </div>

      {/* Modes de transport */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid var(--border-primary)'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {travelModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => changeTravelMode(mode.id)}
              style={{
                flex: '0 0 auto',
                padding: '0.75rem 1rem',
                backgroundColor: travelMode === mode.id ? mode.color : 'var(--surface-secondary)',
                color: travelMode === mode.id ? 'white' : 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                transition: 'all var(--transition-normal)',
                whiteSpace: 'nowrap'
              }}
            >
              <mode.icon size={16} />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Itinéraires alternatifs */}
      {alternativeRoutes.length > 0 && (
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid var(--border-primary)'
        }}>
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500'
            }}
          >
            <span>Itinéraires alternatifs ({alternativeRoutes.length})</span>
            <ChevronRight 
              size={16} 
              style={{
                transform: showAlternatives ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform var(--transition-normal)'
              }}
            />
          </button>

          {showAlternatives && (
            <div style={{
              marginTop: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {alternativeRoutes.map((route, index) => (
                <button
                  key={index}
                  onClick={() => selectAlternativeRoute(index + 1)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: selectedRouteIndex === index + 1 ? 'var(--accent-100)' : 'var(--surface-primary)',
                    color: selectedRouteIndex === index + 1 ? 'var(--accent-700)' : 'var(--text-primary)',
                    border: `1px solid ${selectedRouteIndex === index + 1 ? 'var(--accent-300)' : 'var(--border-primary)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Navigation2 size={16} />
                    <span>Itinéraire {index + 2}</span>
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                    {formatDistance(route.legs[0]?.distance)} • {formatDuration(route.legs[0]?.duration)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructions de navigation */}
      {navigationInstructions.length > 0 && (
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {navigationInstructions.map((instruction, index) => (
            <div
              key={instruction.id}
              style={{
                padding: '1rem',
                borderBottom: index < navigationInstructions.length - 1 ? '1px solid var(--border-primary)' : 'none',
                backgroundColor: index === currentStep ? 'var(--accent-50)' : 'transparent',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                transition: 'all var(--transition-normal)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: index === currentStep ? 'var(--accent-color)' : 'var(--surface-secondary)',
                color: index === currentStep ? 'white' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                flexShrink: 0
              }}>
                {index + 1}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                  lineHeight: 1.4
                }}>
                  {instruction.instruction}
                </div>
                <div style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>{formatDistance(instruction.distance)}</span>
                  <span>•</span>
                  <span>{formatDuration(instruction.duration)}</span>
                </div>
              </div>

              {index === currentStep && isNavigating && (
                <div style={{
                  color: 'var(--accent-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: '500'
                }}>
                  <CheckCircle size={16} />
                  En cours
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Contrôles de navigation */}
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setVoiceNavigation(!voiceNavigation)}
            style={{
              padding: '0.5rem',
              backgroundColor: voiceNavigation ? 'var(--accent-color)' : 'var(--surface-primary)',
              color: voiceNavigation ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {voiceNavigation ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
            style={{
              padding: '0.5rem',
              backgroundColor: realTimeUpdates ? 'var(--accent-color)' : 'var(--surface-primary)',
              color: realTimeUpdates ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Settings size={16} />
          </button>
        </div>

        <div style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-secondary)',
          textAlign: 'right'
        }}>
          {estimatedArrival && (
            <div>
              Arrivée estimée: {new Date(estimatedArrival).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedGPSNavigation;
