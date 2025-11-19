import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Composant Link personnalisé pour Safari qui force la navigation si nécessaire
const SafariLink = ({ to, children, onClick, ...props }) => {
  const navigate = useNavigate();
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const handleClick = (e) => {
    // Appeler le onClick personnalisé s'il existe
    if (onClick) {
      onClick(e);
    }

    // Pour Safari uniquement, s'assurer que la navigation se produit
    if (isSafari && to) {
      const currentPath = window.location.pathname;
      const targetPath = typeof to === 'string' ? to : to.pathname || '/';
      
      // Si le clic n'a pas été empêché et que c'est un chemin différent
      if (!e.defaultPrevented && targetPath !== currentPath) {
        // Attendre un peu pour laisser React Router essayer d'abord
        setTimeout(() => {
          if (window.location.pathname === currentPath) {
            // Navigation n'a pas eu lieu, forcer
            navigate(targetPath);
          }
        }, 100);
      }
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SafariLink;


