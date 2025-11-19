import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import TouchGestures from './TouchGestures';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

const ResponsiveCarousel = ({ 
  items = [], 
  autoPlay = true, 
  interval = 5000,
  showDots = true,
  showArrows = true,
  height = 'auto',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const intervalRef = useRef(null);
  const { animations } = useTheme();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, interval, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setIsAutoPlaying(false);
  };

  const handleSwipeLeft = () => {
    goToNext();
  };

  const handleSwipeRight = () => {
    goToPrevious();
  };

  const handleDoubleTap = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (items.length === 0) return null;

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <TouchGestures
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      onDoubleTap={handleDoubleTap}
    >
      <div
        className={`responsive-carousel ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          height: height,
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--surface-primary)'
        }}
      >
        {/* Contenu du carrousel */}
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="carousel-arrow carousel-arrow-left"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                transition: 'all var(--transition-normal)',
                opacity: isMobile ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              className="carousel-arrow carousel-arrow-right"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                transition: 'all var(--transition-normal)',
                opacity: isMobile ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicateurs de pagination */}
        {showDots && items.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.5rem',
              zIndex: 2
            }}
          >
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Indicateur de lecture automatique */}
        {isAutoPlaying && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'white',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}
            />
            Auto
          </div>
        )}
      </div>
    </TouchGestures>
  );
};

export default ResponsiveCarousel;








