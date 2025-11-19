// Correctif pour Safari : Force la navigation React Router même si les événements sont interceptés
// Ce correctif doit être importé dans App.js

// Détection de Safari
const isSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1;
};

// Correctif pour les liens React Router sur Safari
export const applySafariNavigationFix = () => {
  // Cette fonction est maintenant appelée depuis App.js avec navigate
  // Elle est gardée pour compatibilité mais ne fait plus rien ici
  return;
};

