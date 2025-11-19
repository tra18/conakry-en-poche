import React, { useState } from 'react';

const ImageOptimizer = ({ 
  src, 
  alt = 'Image', 
  style = {}, 
  containerStyle = {},
  fallbackText = 'Image non disponible',
  showFallback = true 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const defaultStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    backgroundColor: '#f8fafc',
    transition: 'opacity 0.3s ease',
    opacity: imageLoaded ? 1 : 0
  };

  const defaultContainerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  if (imageError && showFallback) {
    return (
      <div style={{ ...defaultContainerStyle, ...containerStyle }}>
        <div style={{
          textAlign: 'center',
          color: '#6b7280',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
          <div style={{ fontSize: '1rem', fontWeight: '600' }}>
            {fallbackText}
          </div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Image corrompue ou non trouvée
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...defaultContainerStyle, ...containerStyle }}>
      <img
        src={src}
        alt={alt}
        style={{ ...defaultStyle, ...style }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {!imageLoaded && !imageError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}>
          Chargement...
        </div>
      )}
    </div>
  );
};

export default ImageOptimizer;










