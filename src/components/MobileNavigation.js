import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Building, 
  User, 
  Menu,
  X,
  ChevronDown,
  Calendar,
  Bell
} from 'lucide-react';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navigationItems = [
    {
      id: 'home',
      label: 'Accueil',
      icon: Home,
      path: '/',
      submenu: null,
      family: 'navigation'
    },
    {
      id: 'maps',
      label: 'Cartes & Navigation',
      icon: Map,
      path: null,
      submenu: [
        { label: 'Carte Trafic', path: '/traffic-map' }
      ],
      family: 'maps'
    },
    {
      id: 'business',
      label: 'Entreprises',
      icon: Building,
      path: null,
      submenu: [
        { label: 'Toutes les catégories', path: '/all-categories' },
        { label: 'Restaurants', path: '/category/restaurants' },
        { label: 'Hôtels', path: '/category/hotels' },
        { label: 'Pharmacies', path: '/category/pharmacies' }
      ],
      family: 'business'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Calendar,
      path: null,
      submenu: [
        { label: 'Événements', path: '/events' },
        { label: 'Mes Réservations', path: '/bookings' }
      ],
      family: 'services'
    },
    {
      id: 'info',
      label: 'Informations',
      icon: Bell,
      path: null,
      submenu: [
        { label: 'Vivre en Guinée', path: '/vivre-en-guinee' },
        { label: 'Actualités', path: '/news' },
        { label: 'Contact', path: '/contact' }
      ],
      family: 'info'
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: User,
      path: '/admin',
      submenu: null,
      family: 'admin'
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      if (process.env.NODE_ENV !== 'production') {
        console.log('[MobileNavigation] menu closed – body overflow reset');
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (process.env.NODE_ENV !== 'production') {
      console.log('[MobileNavigation] menu opened – locking body scroll');
    }

    return () => {
      document.body.style.overflow = previousOverflow || '';
      if (process.env.NODE_ENV !== 'production') {
        console.log('[MobileNavigation] restoring previous body overflow');
      }
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (process.env.NODE_ENV !== 'production') {
        console.log('[MobileNavigation] toggleMenu', { previous: prev, next });
      }
      return next;
    });
  };

  const toggleSubmenu = (itemId) => {
    setActiveSubmenu((prev) => {
      const next = prev === itemId ? null : itemId;
      if (process.env.NODE_ENV !== 'production') {
        console.log('[MobileNavigation] toggleSubmenu', {
          itemId,
          previous: prev,
          next,
        });
      }
      return next;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
    if (process.env.NODE_ENV !== 'production') {
      console.log('[MobileNavigation] closeMenu');
    }
  };

  // Gestionnaire de clic pour les liens - ferme le menu immédiatement
  const handleLinkClick = () => {
    closeMenu();
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Bouton menu hamburger */}
      <button
        onClick={toggleMenu}
        type="button"
        className="mobile-menu-toggle touch-target"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1001,
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-full)',
          padding: '0.75rem',
          boxShadow: 'var(--shadow-elevated)',
          color: 'var(--text-primary)',
          transition: 'all var(--transition-normal)',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          WebkitTouchCallout: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          cursor: 'pointer',
          pointerEvents: 'auto'
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            transition: 'opacity var(--transition-normal)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        />
      )}

      {/* Menu mobile */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          WebkitTransform: isOpen ? 'translateX(0) translateZ(0)' : 'translateX(100%) translateZ(0)',
          transition: 'transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '1rem',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          visibility: 'visible',
          opacity: 1,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {/* Header du menu */}
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 'var(--font-size-lg)',
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}>
            Menu
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
            }}
            type="button"
            className="touch-target"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              WebkitTouchCallout: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation items */}
        <nav style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem 0'
        }}>
          {navigationItems.map((item, index) => {
            // Afficher un séparateur entre les familles
            const prevFamily = index > 0 ? navigationItems[index - 1].family : null;
            const showSeparator = prevFamily && prevFamily !== item.family;
            
            return (
              <React.Fragment key={item.id}>
                {showSeparator && (
                  <div style={{
                    height: '1px',
                    backgroundColor: 'var(--border-primary)',
                    margin: '0.5rem 1rem'
                  }} />
                )}
                <div key={item.id}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    type="button"
                    className="touch-target"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition-normal)',
                      fontSize: 'var(--font-size-base)',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                      WebkitTouchCallout: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      pointerEvents: 'auto'
                    }}
                  >
                    <item.icon size={20} />
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                    <ChevronDown 
                      size={16} 
                      style={{
                        transform: activeSubmenu === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-normal)'
                      }}
                    />
                  </button>
                  
                  {activeSubmenu === item.id ? (
                    <div 
                      style={{
                        backgroundColor: '#f8fafc',
                        paddingLeft: '3rem',
                        visibility: 'visible',
                        opacity: 1,
                        display: 'block'
                      }}>
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.path}
                          onClick={closeMenu}
                          style={{
                            display: 'block',
                            padding: '0.75rem 1rem',
                            color: location.pathname === subItem.path ? 'var(--accent-color)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: 'var(--font-size-sm)',
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation',
                            WebkitTouchCallout: 'none',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            cursor: 'pointer',
                            transition: 'all var(--transition-normal)',
                            borderBottom: index < item.submenu.length - 1 ? '1px solid var(--border-primary)' : 'none',
                            backgroundColor: location.pathname === subItem.path ? 'var(--accent-50)' : 'transparent',
                            pointerEvents: 'auto'
                          }}
                          onMouseEnter={(e) => {
                            if (location.pathname !== subItem.path) {
                              e.target.style.color = 'var(--accent-color)';
                              e.target.style.backgroundColor = 'var(--accent-50)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (location.pathname !== subItem.path) {
                              e.target.style.color = 'var(--text-secondary)';
                              e.target.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className="touch-target"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    color: location.pathname === item.path ? 'var(--accent-color)' : 'var(--text-primary)',
                    backgroundColor: location.pathname === item.path ? 'var(--accent-50)' : 'transparent',
                    textDecoration: 'none',
                    fontSize: 'var(--font-size-base)',
                    transition: 'all var(--transition-normal)',
                    borderLeft: location.pathname === item.path ? '3px solid var(--accent-color)' : '3px solid transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    cursor: 'pointer',
                    pointerEvents: 'auto'
                  }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
            </React.Fragment>
          );
          })}
        </nav>

        {/* Footer du menu */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-secondary)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(to right, #4b5563, #6b7280)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>🇬🇳</span>
            </div>
            <div>
              <div style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                Conakry en Poche
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-tertiary)'
              }}>
                Votre guide de Conakry
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;



