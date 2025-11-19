import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, CloudSun, CloudLightning } from 'lucide-react';

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=9.6412&longitude=-13.5784&current=temperature_2m,apparent_temperature,is_day,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto';

const WeatherWidget = ({ compact = false }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(OPEN_METEO_URL);
        if (!response.ok) {
          throw new Error('Impossible de récupérer la météo');
        }

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        setWeather({
          city: 'Conakry',
          temp: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          icon: mapWeatherCodeToIcon(current.weather_code),
          description: mapWeatherCodeToDescription(current.weather_code),
          minTemp: Math.round(daily.temperature_2m_min?.[0]),
          maxTemp: Math.round(daily.temperature_2m_max?.[0]),
          updatedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        });
        setLoading(false);
      } catch (err) {
        console.error('Erreur météo:', err);
        setError(err.message);
        setWeather({
          city: 'Conakry',
          temp: 29,
          feelsLike: 32,
          humidity: 78,
          windSpeed: 14,
          icon: 'sunny',
          description: 'Ensoleillé',
          minTemp: 26,
          maxTemp: 31,
          updatedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        });
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // refresh every 30 min
    return () => clearInterval(interval);
  }, []);

  const mapWeatherCodeToIcon = (code) => {
    if ([0].includes(code)) return 'sunny';
    if ([1, 2, 3].includes(code)) return 'partly';
    if ([45, 48].includes(code)) return 'cloudy';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'rain';
    if ([95, 96, 99].includes(code)) return 'storm';
    return 'cloudy';
  };

  const mapWeatherCodeToDescription = (code) => {
    const descriptions = {
      0: 'Ciel dégagé',
      1: 'Faiblement nuageux',
      2: 'Partiellement nuageux',
      3: 'Couvert',
      45: 'Brume',
      48: 'Brouillard givrant',
      51: 'Pluie faible',
      53: 'Pluie modérée',
      55: 'Pluie dense',
      61: 'Averses faibles',
      63: 'Averses modérées',
      65: 'Averses fortes',
      80: 'Pluies locales',
      81: 'Pluies généralisées',
      82: 'Pluies intenses',
      95: 'Orages',
      96: 'Orages avec grêle',
      99: 'Orages violents'
    };
    return descriptions[code] || 'Conditions variables';
  };

  const renderIcon = (iconType, size = 32) => {
    switch (iconType) {
      case 'sunny':
        return <Sun size={size} color="#FCD34D" fill="#FCD34D" />;
      case 'partly':
        return <CloudSun size={size} color="#FBBF24" />;
      case 'rain':
        return <CloudRain size={size} color="#3B82F6" />;
      case 'storm':
        return <CloudLightning size={size} color="#F87171" />;
      default:
        return <Cloud size={size} color="#9CA3AF" />;
    }
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: compact ? '12px' : '16px',
        padding: compact ? '0.75rem' : '1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        minWidth: compact ? 'auto' : '280px',
        maxWidth: compact ? '140px' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: compact ? '24px' : '40px',
            height: compact ? '24px' : '40px',
            border: '3px solid #e5e7eb',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          {!compact && <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Chargement...</span>}
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return null; // Ne rien afficher en cas d'erreur
  }

  // Version compacte pour mobile
  if (compact) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '0.85rem',
        boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)',
        border: '1px solid rgba(255,255,255,0.35)',
        maxWidth: '150px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            borderRadius: '12px'
          }}>
            {renderIcon(weather?.icon || 'sunny', 24)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#1f2937',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {weather?.city || 'Conakry'}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#1f2937',
              lineHeight: 1
            }}>
              {weather?.temp || 28}°
            </div>
          </div>
        </div>
        <div style={{
          fontSize: '0.65rem',
          color: '#6b7280',
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {weather?.description || 'Ensoleillé'}
        </div>
      </div>
    );
  }

  // Version complète pour desktop
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #0f172a 100%)',
      borderRadius: '24px',
      padding: '1.75rem',
      boxShadow: '0 30px 60px rgba(15,23,42,0.35)',
      minWidth: '300px',
      border: '1px solid rgba(255,255,255,0.05)',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
          color: 'white',
            marginBottom: '0.25rem'
          }}>
            {weather?.city || 'Conakry'}
          </h3>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.8)',
            textTransform: 'capitalize'
          }}>
            {weather?.description || 'Ensoleillé'}
          </p>
        </div>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {renderIcon(weather?.icon || 'sunny', 40)}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <span style={{
          fontSize: '3rem',
          fontWeight: '800',
          color: 'white',
          lineHeight: 1
        }}>
          {weather?.temp || 28}°
        </span>
        <span style={{
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: '500'
        }}>
          C
        </span>
      </div>

      {weather?.minTemp && weather?.maxTemp && (
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '1.25rem'
        }}>
          <span>Min {weather.minTemp}°</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>Max {weather.maxTemp}°</span>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '0.25rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            <Thermometer size={16} />
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'white'
          }}>
            {weather?.feelsLike || 32}°
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            Ressenti
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '0.25rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            <Droplets size={16} />
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'white'
          }}>
            {weather?.humidity || 75}%
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            Humidité
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '0.25rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            <Wind size={16} />
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'white'
          }}>
            {weather?.windSpeed || 12} km/h
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            Vent
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '1.25rem',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'right'
      }}>
        Mise à jour à {weather?.updatedAt}
      </div>
    </div>
  );
};

export default WeatherWidget;

