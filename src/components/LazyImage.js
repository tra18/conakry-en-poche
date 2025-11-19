import React, { useState } from 'react';
import { useLazyLoading } from '../hooks/useLazyLoading';
import { Image as ImageIcon } from 'lucide-react';

const LazyImage = ({
  src,
  alt,
  placeholder,
  className = '',
  style = {},
  onLoad,
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, isVisible] = useLazyLoading();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    if (isVisible && src && imageSrc !== src) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        setHasError(false);
        if (onLoad) onLoad();
      };
      
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
        if (onError) onError();
      };
      
      img.src = src;
    }
  }, [isVisible, src, imageSrc, onLoad, onError]);

  if (hasError) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          color: '#9ca3af',
          ...style
        }}
        className={className}
        {...props}
      >
        <ImageIcon size={24} />
      </div>
    );
  }

  return (
    <div
      ref={imageRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        ...style
      }}
      className={className}
      {...props}
    >
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease'
        }}
        loading="lazy"
      />
      
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e7eb',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LazyImage;







