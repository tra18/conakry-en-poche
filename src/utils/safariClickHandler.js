// Utilitaire pour gérer les clics de manière compatible avec Safari
// Utilise useNavigate de React Router au lieu de window.location.href

// Détection de Safari
const isSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1;
};

// Détection de mobile
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
};

// Gestionnaire d'événements pour Safari (mobile et desktop)
export const safariEventHandlers = (callback) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (callback) {
      callback(e);
    }
  };

  const handleTouchStart = (e) => {
    // Pour Safari mobile, gérer l'événement tactile immédiatement
    if (isMobile() || isSafari()) {
      e.preventDefault();
      e.stopPropagation();
      if (callback) {
        callback(e);
      }
    }
  };

  const handleMouseDown = (e) => {
    // Pour Safari desktop
    if (!isMobile() && e.button === 0) {
      e.stopPropagation();
      if (callback) {
        callback(e);
      }
    }
  };

  return {
    onClick: handleClick,
    onTouchStart: handleTouchStart,
    onMouseDown: handleMouseDown,
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (callback) {
          callback(e);
        }
      }
    },
    style: {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation',
      WebkitTouchCallout: 'none',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      cursor: 'pointer',
      WebkitUserDrag: 'none',
      pointerEvents: 'auto'
    }
  };
};

// Gestionnaire pour les liens avec navigation - laisse React Router gérer naturellement
export const safariLinkHandlers = (navigate, path, onClose = null) => {
  const handleClick = (e) => {
    // Ne pas empêcher le comportement par défaut - laisser React Router gérer
    if (onClose) {
      onClose();
    }
    // React Router gère la navigation automatiquement via le composant Link
  };

  const handleTouchStart = (e) => {
    // Pour Safari mobile, déclencher onClose si nécessaire
    if ((isMobile() || isSafari()) && onClose) {
      onClose();
    }
  };

  return {
    onClick: handleClick,
    onTouchStart: handleTouchStart,
    role: 'link',
    tabIndex: 0,
    style: {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation',
      WebkitTouchCallout: 'none',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      cursor: 'pointer',
      WebkitUserDrag: 'none',
      pointerEvents: 'auto'
    }
  };
};

// Hook React pour créer un gestionnaire d'événements compatible Safari
// Note: Ce hook doit être utilisé dans un composant React
// Pour utiliser ce hook, importez-le ainsi:
// import { useSafariClick } from './utils/safariClickHandler';
// Et dans votre composant:
// const handlers = useSafariClick(() => { /* votre callback */ });
// <button {...handlers}>Cliquez</button>

// Version simplifiée sans dépendance React (peut être utilisé partout)
export const createSafariClickHandler = (callback) => {
  let touchHandled = false;
  
  const handleClick = (e) => {
    if (touchHandled) {
      touchHandled = false;
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (callback) {
      callback(e);
    }
  };

  const handleTouchStart = (e) => {
    if (isMobile() || isSafari()) {
      touchHandled = true;
      e.preventDefault();
      e.stopPropagation();
      if (callback) {
        callback(e);
      }
      setTimeout(() => {
        touchHandled = false;
      }, 300);
    }
  };

  return {
    onClick: handleClick,
    onTouchStart: handleTouchStart
  };
};
