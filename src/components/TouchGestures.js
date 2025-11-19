import React, { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TouchGestures = ({ children, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, onDoubleTap }) => {
  const containerRef = useRef(null);
  const { animations } = useTheme();
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let startDistance = 0;
    let startTime = 0;
    let lastTap = 0;
    let touchCount = 0;

    const handleTouchStart = (e) => {
      const touches = e.touches;
      touchCount = touches.length;
      
      if (touchCount === 1) {
        startX = touches[0].clientX;
        startY = touches[0].clientY;
        startTime = Date.now();
      } else if (touchCount === 2) {
        const touch1 = touches[0];
        const touch2 = touches[1];
        startDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      const touches = e.touches;
      const changedTouches = e.changedTouches;
      
      if (touchCount === 1 && changedTouches.length === 1) {
        const endX = changedTouches[0].clientX;
        const endY = changedTouches[0].clientY;
        const endTime = Date.now();
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const deltaTime = endTime - startTime;
        
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        
        // Double tap detection
        if (deltaTime < 300) {
          const currentTime = Date.now();
          if (currentTime - lastTap < 300) {
            onDoubleTap && onDoubleTap(e);
          }
          lastTap = currentTime;
        }
        
        // Swipe detection
        if (deltaTime < maxSwipeTime && Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            onSwipeRight && onSwipeRight(e);
          } else {
            onSwipeLeft && onSwipeLeft(e);
          }
        }
        
        if (deltaTime < maxSwipeTime && Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            onSwipeDown && onSwipeDown(e);
          } else {
            onSwipeUp && onSwipeUp(e);
          }
        }
      } else if (touchCount === 2 && changedTouches.length === 2) {
        const touch1 = changedTouches[0];
        const touch2 = changedTouches[1];
        const endDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const scale = endDistance / startDistance;
        onPinch && onPinch(e, scale);
      }
    };

    // Ajouter les event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, onDoubleTap]);

  return (
    <div
      ref={containerRef}
      style={{
        touchAction: 'pan-x pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {children}
    </div>
  );
};

export default TouchGestures;








