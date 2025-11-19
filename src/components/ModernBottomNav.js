import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, AlertTriangle, Search, User2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';

const ModernBottomNav = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 780);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) {
    return null;
  }

  const navItems = [
    { path: '/', labelKey: 'bottomNav.home', icon: Home },
    { path: '/all-categories', labelKey: 'bottomNav.explore', icon: Building },
    { path: '/report-road-issue', labelKey: 'bottomNav.report', icon: AlertTriangle, special: true },
    { path: '/search', labelKey: 'bottomNav.search', icon: Search },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e5e7eb',
      padding: '0.5rem 0',
      zIndex: 1000,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
              textDecoration: 'none',
              color: isActive ? '#667eea' : '#6b7280',
              padding: item.special ? '0.85rem' : '0.5rem',
              borderRadius: item.special ? '50%' : '10px',
              backgroundColor: item.special ? '#ef4444' : 'transparent',
              width: item.special ? '58px' : 'auto',
              height: item.special ? '58px' : 'auto',
              marginTop: item.special ? '-28px' : '0',
              boxShadow: item.special ? '0 8px 20px rgba(239, 68, 68, 0.35)' : 'none',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (!item.special) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              } else {
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!item.special) {
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            aria-label={t(language, item.labelKey)}
          >
            <item.icon 
              size={item.special ? 26 : 20} 
              color={item.special ? '#ffffff' : (isActive ? '#667eea' : '#6b7280')}
            />
            {!item.special && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: isActive ? '600' : '500'
              }}>
                {t(language, item.labelKey)}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default ModernBottomNav;

