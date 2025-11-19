import React, { useState, useEffect, useRef } from 'react';
import { useAdvertisement } from '../contexts/AdvertisementContext';
import ImageOptimizer from './ImageOptimizer';

const AdvertisementBanner = () => {
  const { getActiveAdvertisements, incrementViews, incrementClicks } = useAdvertisement();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [activeAds, setActiveAds] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const bannerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const ads = getActiveAdvertisements();
    setActiveAds(ads);
    
    // Incrémenter les vues pour la première publicité
    if (ads.length > 0) {
      incrementViews(ads[0].id);
    }
  }, [getActiveAdvertisements, incrementViews]);

  // Fonction pour passer à la publicité suivante
  const goToNext = () => {
    if (activeAds.length <= 1 || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentAdIndex(prev => (prev + 1) % activeAds.length);
      setIsTransitioning(false);
      // Incrémenter les vues pour la nouvelle publicité
      incrementViews(activeAds[(currentAdIndex + 1) % activeAds.length].id);
    }, 300);
  };

  // Fonction pour passer à la publicité précédente
  const goToPrevious = () => {
    if (activeAds.length <= 1 || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentAdIndex(prev => (prev - 1 + activeAds.length) % activeAds.length);
      setIsTransitioning(false);
      // Incrémenter les vues pour la nouvelle publicité
      incrementViews(activeAds[(currentAdIndex - 1 + activeAds.length) % activeAds.length].id);
    }, 300);
  };

  // Fonction pour aller à une publicité spécifique
  const goToSlide = (index) => {
    if (index === currentAdIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentAdIndex(index);
      setIsTransitioning(false);
      incrementViews(activeAds[index].id);
    }, 300);
  };

  // Rotation automatique des publicités toutes les 6 secondes
  useEffect(() => {
    if (activeAds.length <= 1 || isPaused) return;

    intervalRef.current = setInterval(() => {
      goToNext();
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeAds.length, isPaused, currentAdIndex]);

  // Gestionnaire de survol pour pauser le défilement (seulement si plusieurs publicités)
  const handleMouseEnter = () => {
    if (activeAds.length > 1) {
      setIsPaused(true);
    }
  };
  const handleMouseLeave = () => {
    if (activeAds.length > 1) {
      setIsPaused(false);
    }
  };

  if (activeAds.length === 0) {
    return null;
  }

  const currentAd = activeAds[currentAdIndex];

  const handleAdClick = () => {
    incrementClicks(currentAd.id);
    // Ici, vous pourriez rediriger vers la page de l'entreprise
    // window.location.href = `/business/${currentAd.businessId}`;
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      marginBottom: '2rem'
    }}>
      <div 
        ref={bannerRef}
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e5e7eb',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onClick={handleAdClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Badge Publicité */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.75rem',
          fontWeight: '600',
          zIndex: 3
        }}>
          📢 Publicité {currentAdIndex + 1}/{activeAds.length}
        </div>

        {/* Boutons de navigation (si plusieurs publicités) */}
        {activeAds.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              style={{
                position: 'absolute',
                left: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.25rem',
                zIndex: 2,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              }}
            >
              ‹
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.25rem',
                zIndex: 2,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              }}
            >
              ›
            </button>
          </>
        )}

        {/* Média (Image ou Vidéo) avec transition */}
        <div style={{
          width: '100%',
          height: '250px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
            width: '100%',
            height: '100%'
          }}>
            {currentAd.media ? (
              currentAd.media.type?.startsWith('video/') ? (
                <video
                  src={currentAd.media.url || currentAd.media.data}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  muted
                  loop
                  autoPlay
                />
              ) : (
                <ImageOptimizer
                  src={currentAd.media.url || currentAd.media.data || currentAd.imageUrl}
                  alt={currentAd.title}
                  fallbackText={`Image de ${currentAd.title}`}
                  containerStyle={{
                    backgroundColor: 'transparent'
                  }}
                />
              )
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${currentAd.imageUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: '#f8fafc'
              }}></div>
            )}
          </div>
          
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
          }}></div>

          {/* Indicateur de pause - seulement si plusieurs publicités */}
          {isPaused && activeAds.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              zIndex: 4
            }}>
              ⏸️ Pause
            </div>
          )}
        </div>

        {/* Contenu */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            {currentAd.title}
          </h3>
          
          <p style={{
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            color: '#6b7280',
            lineHeight: '1.5'
          }}>
            {currentAd.description}
          </p>

          {/* Informations sur l'entreprise */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              {currentAd.businessName}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              backgroundColor: '#f3f4f6',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem'
            }}>
              {currentAd.category}
            </span>
          </div>

          {/* Statistiques */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#9ca3af'
          }}>
            <span>👁️ {currentAd.views} vues</span>
            <span>👆 {currentAd.clicks} clics</span>
          </div>
        </div>

        {/* Indicateurs de pagination (si plusieurs publicités) */}
        {activeAds.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '0.5rem',
            borderRadius: '1rem'
          }}>
            {activeAds.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: index === currentAdIndex ? '#3b82f6' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentAdIndex) {
                    e.target.style.backgroundColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentAdIndex) {
                    e.target.style.backgroundColor = '#d1d5db';
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementBanner;