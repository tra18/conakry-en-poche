import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building, Calendar, Info, Settings, Map, AlertTriangle, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import LanguageSelector from './LanguageSelector';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', labelKey: 'header.home', icon: Home },
    { path: '/all-categories', labelKey: 'header.businesses', icon: Building },
    { path: '/traffic-map', labelKey: 'header.trafficMap', icon: Map },
    { path: '/events', labelKey: 'header.events', icon: Calendar },
    { path: '/vivre-en-guinee', labelKey: 'header.livingInGuinea', icon: Info },
  ];

  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0.75rem 1.5rem' : '0 1.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        height: isMobile ? 'auto' : '70px',
        gap: isMobile ? '0.75rem' : 0
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: '#1f2937',
            fontWeight: '700',
            fontSize: '1.25rem'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🇬🇳
          </div>
          <span>{t(language, 'common.appName')}</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: location.pathname === item.path ? '#667eea' : '#6b7280',
                  textDecoration: 'none',
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  fontSize: '0.95rem',
                  padding: '0.5rem 0',
                  borderBottom: location.pathname === item.path ? '2px solid #667eea' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.color = '#667eea';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <item.icon size={18} />
                {t(language, item.labelKey)}
              </Link>
            ))}
            <LanguageSelector />
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div style={{ marginLeft: 'auto' }}>
            <button
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1f2937'
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {isMobile && (
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '0 1.5rem 0.75rem',
          width: '100%'
        }}>
          <Link
            to="/report-road-issue"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              background: '#fef3c7',
              color: '#b45309',
              padding: '0.65rem',
              borderRadius: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            <AlertTriangle size={18} />
            {t(language, 'header.report')}
          </Link>
          <Link
            to="/register-business"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              background: '#667eea',
              color: '#fff',
              padding: '0.65rem',
              borderRadius: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            <Plus size={18} />
            {t(language, 'header.register')}
          </Link>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          zIndex: 999,
          overflowY: 'auto',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                style={{
                  color: location.pathname === item.path ? '#667eea' : '#1f2937',
                  textDecoration: 'none',
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  fontSize: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: location.pathname === item.path ? '#f0f4ff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon size={20} />
                {t(language, item.labelKey)}
              </Link>
            ))}
            <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '1rem 0' }} />
            <div style={{ padding: '0.5rem 0' }}>
              <LanguageSelector />
            </div>
            <Link
              to="/admin"
              onClick={closeMenu}
              style={{
                color: '#1f2937',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Settings size={20} />
              {t(language, 'header.administration')}
            </Link>
          </nav>
        </div>
      )}

      {/* Overlay pour mobile */}
      {isMobile && isMenuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 998
          }}
        />
      )}
    </header>
  );
};

export default ModernHeader;

