import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Navigation, Building, Calendar, BookOpen, Info, Settings, ChevronDown, AlertTriangle } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const ResponsiveHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fermer les menus en cliquant ailleurs
  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (event) => {
      if (!headerRef.current) return;
      if (headerRef.current.contains(event.target)) return;
      setOpenDropdown(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    setOpenDropdown(null);
    if (process.env.NODE_ENV !== 'production') {
      console.log('[ResponsiveHeader] navigation change – closing dropdowns', {
        pathname: location.pathname,
      });
    }
  }, [location.pathname]);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => {
      const nextValue = prev === dropdownName ? null : dropdownName;
      if (process.env.NODE_ENV !== 'production') {
        console.log('[ResponsiveHeader] toggleDropdown', {
          dropdownName,
          previous: prev,
          next: nextValue,
        });
      }
      return nextValue;
    });
  };

  // Gestionnaire de clic pour les liens dans les dropdowns
  const handleLinkClick = () => {
    // Fermer le dropdown immédiatement pour permettre la navigation
    setOpenDropdown(null);
  };

  // Gestionnaire de clic pour les liens dans le menu mobile
  const handleMobileLinkClick = (e) => {
    e.stopPropagation();
    // Fermer le menu mobile après un court délai pour permettre la navigation
    setTimeout(() => setIsMenuOpen(false), 150);
  };

  return (
    <header
      ref={headerRef}
      style={{
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="responsive-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link 
          to="/"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '2rem',
            height: '2rem',
            background: 'linear-gradient(to right, #4b5563, #6b7280)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>🇬🇳</span>
          </div>
          <span className="header-logo" style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            Conakry en Poche
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="header-nav" style={{ 
          display: isMobile ? 'none' : 'flex', 
          gap: '0.5rem',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Accueil */}
          <Link 
            to="/"
            onTouchStart={(e) => {
              // Permettre à React Router de gérer la navigation
            }}
            style={{ 
              color: location.pathname === '/' ? '#3b82f6' : '#6b7280', 
              textDecoration: 'none', 
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontWeight: location.pathname === '/' ? '600' : '400',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              WebkitTouchCallout: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/') {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            <Home size={18} />
            Accueil
          </Link>

          {/* Cartes et Navigation */}
          <div
            data-dropdown-container="maps"
            style={{ position: 'relative' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('maps');
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                toggleDropdown('maps');
              }}
              type="button"
              style={{
                color: ['/traffic-map'].includes(location.pathname) ? '#3b82f6' : '#6b7280',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: ['/traffic-map'].includes(location.pathname) ? '600' : '400',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (!['/traffic-map'].includes(location.pathname)) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (!['/traffic-map'].includes(location.pathname)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <Map size={18} />
              Cartes
              <ChevronDown size={16} />
            </button>
            {openDropdown === 'maps' ? (
              <div 
                data-dropdown-container="maps"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  zIndex: 1000,
                  visibility: 'visible',
                  opacity: 1,
                  display: 'block',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  padding: '0.5rem',
                  minWidth: '200px',
                  pointerEvents: 'auto'
                }}
              >
                <Link
                  to="/traffic-map"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/traffic-map' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/traffic-map' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 1001
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/traffic-map') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/traffic-map') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Map size={16} />
                    Carte Trafic
                  </div>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Entreprises */}
          <div
            data-dropdown-container="businesses"
            style={{ position: 'relative' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('businesses');
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                toggleDropdown('businesses');
              }}
              type="button"
              style={{
                color: location.pathname.startsWith('/category') || location.pathname === '/all-categories' ? '#3b82f6' : '#6b7280',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: location.pathname.startsWith('/category') || location.pathname === '/all-categories' ? '600' : '400',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (!location.pathname.startsWith('/category') && location.pathname !== '/all-categories') {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (!location.pathname.startsWith('/category') && location.pathname !== '/all-categories') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <Building size={18} />
              Entreprises
              <ChevronDown size={16} />
            </button>
            {openDropdown === 'businesses' ? (
              <div 
                data-dropdown-container="businesses"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  zIndex: 1000,
                  visibility: 'visible',
                  opacity: 1,
                  display: 'block',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'white',
                  pointerEvents: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  padding: '0.5rem',
                  minWidth: '220px',
                  zIndex: 1000
                }}
              >
                <Link
                  to="/all-categories"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/all-categories' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/all-categories' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 1001
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/all-categories') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/all-categories') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Building size={16} />
                    Toutes les catégories
                  </div>
                </Link>
                <div style={{
                  height: '1px',
                  backgroundColor: '#e5e7eb',
                  margin: '0.5rem 0'
                }} />
                <Link
                  to="/category/restaurants"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/category/restaurants' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/category/restaurants' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 1001
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/category/restaurants') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/category/restaurants') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  🍽️ Restaurants
                </Link>
                <Link
                  to="/category/hotels"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/category/hotels' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/category/hotels' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 1001
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/category/hotels') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/category/hotels') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  🏨 Hôtels
                </Link>
                <Link
                  to="/category/pharmacies"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/category/pharmacies' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/category/pharmacies' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 1001
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/category/pharmacies') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/category/pharmacies') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  💊 Pharmacies
                </Link>
              </div>
            ) : null}
          </div>

          {/* Services */}
          <div
            data-dropdown-container="services"
            style={{ position: 'relative' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('services');
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                toggleDropdown('services');
              }}
              type="button"
              style={{
                color: ['/events', '/bookings'].includes(location.pathname) ? '#3b82f6' : '#6b7280',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: ['/events', '/bookings'].includes(location.pathname) ? '600' : '400',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (!['/events', '/bookings'].includes(location.pathname)) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (!['/events', '/bookings'].includes(location.pathname)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <Calendar size={18} />
              Services
              <ChevronDown size={16} />
            </button>
            {openDropdown === 'services' ? (
              <div 
                data-dropdown-container="services"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  zIndex: 1000,
                  visibility: 'visible',
                  opacity: 1,
                  display: 'block',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'white',
                  pointerEvents: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  padding: '0.5rem',
                  minWidth: '200px',
                  zIndex: 1000
                }}
              >
                <Link
                  to="/events"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/events' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/events' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/events') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/events') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Calendar size={16} />
                    Événements
                  </div>
                </Link>
                <Link
                  to="/bookings"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/bookings' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/bookings' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/bookings') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/bookings') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Calendar size={16} />
                    Mes Réservations
                  </div>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Informations */}
          <div
            data-dropdown-container="info"
            style={{ position: 'relative' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('info');
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                toggleDropdown('info');
              }}
              type="button"
              style={{
                color: ['/vivre-en-guinee', '/contact', '/news'].includes(location.pathname) ? '#3b82f6' : '#6b7280',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: ['/vivre-en-guinee', '/contact', '/news'].includes(location.pathname) ? '600' : '400',
                transition: 'all 0.2s',
                WebkitTouchCallout: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (!['/vivre-en-guinee', '/contact', '/news'].includes(location.pathname)) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (!['/vivre-en-guinee', '/contact', '/news'].includes(location.pathname)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <Info size={18} />
              Informations
              <ChevronDown size={16} />
            </button>
            {openDropdown === 'info' ? (
              <div 
                data-dropdown-container="info"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  zIndex: 1000,
                  visibility: 'visible',
                  opacity: 1,
                  display: 'block',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'white',
                  pointerEvents: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  padding: '0.5rem',
                  minWidth: '200px',
                  zIndex: 1000
                }}
              >
                <Link
                  to="/vivre-en-guinee"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/vivre-en-guinee' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/vivre-en-guinee' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/vivre-en-guinee') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/vivre-en-guinee') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BookOpen size={16} />
                    Vivre en Guinée
                  </div>
                </Link>
                <Link
                  to="/news"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/news' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/news' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/news') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/news') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Info size={16} />
                    Actualités
                  </div>
                </Link>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/contact' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/contact' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/contact') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/contact') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Info size={16} />
                    Contact
                  </div>
                </Link>
                <div style={{
                  height: '1px',
                  backgroundColor: '#e5e7eb',
                  margin: '0.5rem 0'
                }} />
                <Link
                  to="/road-reports"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/road-reports' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/road-reports' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/road-reports') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/road-reports') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <AlertTriangle size={16} />
                    Signalements routiers
                  </div>
                </Link>
                <Link
                  to="/report-road-issue"
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: location.pathname === '/report-road-issue' ? '#3b82f6' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === '/report-road-issue' ? '#eff6ff' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== '/report-road-issue') {
                      e.currentTarget.style.backgroundColor = '#fef3c7';
                      e.currentTarget.style.color = '#f59e0b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== '/report-road-issue') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <AlertTriangle size={16} />
                    🚧 Signaler un problème routier
                  </div>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Administration */}
          <Link 
            to="/admin" 
            style={{ 
              color: location.pathname === '/admin' ? '#3b82f6' : '#6b7280', 
              textDecoration: 'none', 
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontWeight: location.pathname === '/admin' ? '600' : '400',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/admin') {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/admin') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            <Settings size={18} />
            Admin
          </Link>
          
          {/* Centre de notifications */}
          <NotificationCenter />
        </nav>


        {/* Menu mobile */}
        <button
          className="mobile-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(prev => !prev);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsMenuOpen(prev => !prev);
          }}
          type="button"
          style={{
            display: isMobile ? 'block' : 'none',
            padding: '0.5rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: 'auto',
            position: 'relative',
            zIndex: 1001
          }}
        >
          ☰
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {isMenuOpen && isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 1000,
          pointerEvents: 'auto',
          willChange: 'transform, opacity'
        }}>
          {/* Accueil */}
          <div style={{ marginBottom: '1.5rem' }}>
          <Link 
            to="/" 
              style={{ 
                color: location.pathname === '/' ? '#3b82f6' : '#6b7280', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/' ? '600' : '400',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 1001
              }}
            onClick={handleMobileLinkClick}
          >
              <Home size={18} />
            Accueil
          </Link>
          </div>

          {/* Cartes et Navigation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              color: '#9ca3af', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              padding: '0 0.75rem'
            }}>
              Cartes & Navigation
            </div>
          <Link 
            to="/traffic-map" 
              style={{ 
                color: location.pathname === '/traffic-map' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/traffic-map' ? '#eff6ff' : 'transparent',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 1001
              }}
            onClick={handleMobileLinkClick}
          >
              <Map size={18} />
            Carte Trafic
          </Link>
          </div>

          {/* Entreprises */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              color: '#9ca3af', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              padding: '0 0.75rem'
            }}>
              Entreprises
            </div>
            <Link 
              to="/all-categories" 
              style={{ 
                color: location.pathname === '/all-categories' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/all-categories' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              <Building size={18} />
              Toutes les catégories
            </Link>
            <Link 
              to="/category/restaurants" 
              style={{ 
                color: location.pathname === '/category/restaurants' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/category/restaurants' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              🍽️ Restaurants
            </Link>
            <Link 
              to="/category/hotels" 
              style={{ 
                color: location.pathname === '/category/hotels' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/category/hotels' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              🏨 Hôtels
            </Link>
            <Link 
              to="/category/pharmacies" 
              style={{ 
                color: location.pathname === '/category/pharmacies' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/category/pharmacies' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              💊 Pharmacies
            </Link>
          </div>

          {/* Services */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              color: '#9ca3af', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              padding: '0 0.75rem'
            }}>
              Services
            </div>
          <Link 
              to="/events" 
              style={{ 
                color: location.pathname === '/events' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/events' ? '#eff6ff' : 'transparent'
              }}
            onClick={() => setIsMenuOpen(false)}
          >
              <Calendar size={18} />
              Événements
          </Link>
            <Link 
              to="/bookings" 
              style={{ 
                color: location.pathname === '/bookings' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/bookings' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              <Calendar size={18} />
              Mes Réservations
            </Link>
          </div>

          {/* Informations */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              color: '#9ca3af', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              padding: '0 0.75rem'
            }}>
              Informations
            </div>
          <Link 
            to="/vivre-en-guinee" 
              style={{ 
                color: location.pathname === '/vivre-en-guinee' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/vivre-en-guinee' ? '#eff6ff' : 'transparent'
              }}
            onClick={() => setIsMenuOpen(false)}
          >
              <BookOpen size={18} />
            Vivre en Guinée
          </Link>
            <Link 
              to="/news" 
              style={{ 
                color: location.pathname === '/news' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/news' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              <Info size={18} />
              Actualités
          </Link>
          <Link 
            to="/contact" 
              style={{ 
                color: location.pathname === '/contact' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/contact' ? '#eff6ff' : 'transparent'
              }}
            onClick={() => setIsMenuOpen(false)}
          >
              <Info size={18} />
            Contact
          </Link>
            <Link 
              to="/road-reports" 
              style={{ 
                color: location.pathname === '/road-reports' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/road-reports' ? '#eff6ff' : 'transparent'
              }}
              onClick={handleMobileLinkClick}
            >
              <AlertTriangle size={18} />
              Signalements routiers
            </Link>
            <Link 
              to="/report-road-issue" 
              style={{ 
                color: location.pathname === '/report-road-issue' ? '#f59e0b' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/report-road-issue' ? '#fef3c7' : 'transparent',
                fontWeight: '600'
              }}
              onClick={handleMobileLinkClick}
            >
              <AlertTriangle size={18} />
              🚧 Signaler un problème routier
            </Link>
          </div>

          {/* Administration */}
          <div>
            <Link 
              to="/admin" 
              style={{ 
                color: location.pathname === '/admin' ? '#3b82f6' : '#374151', 
                textDecoration: 'none', 
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/admin' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/admin' ? '600' : '400'
              }}
              onClick={handleMobileLinkClick}
            >
              <Settings size={18} />
              Administration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default ResponsiveHeader;
