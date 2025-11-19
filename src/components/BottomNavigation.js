import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Home, 
  Map, 
  Building, 
  User,
  Plus
} from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const navigationItems = [
    {
      id: 'home',
      label: 'Accueil',
      icon: Home,
      path: '/'
    },
    {
      id: 'add',
      label: 'Ajouter',
      icon: Plus,
      path: '/register-business',
      isSpecial: true
    },
    {
      id: 'business',
      label: 'Entreprises',
      icon: Building,
      path: '/all-categories'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: User,
      path: '/admin'
    }
  ];

  return (
    <nav className="nav-mobile" style={{ 
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    }}>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-mobile-item ${isActive ? 'active' : ''}`}
            style={{
              position: 'relative',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              cursor: 'pointer',
              pointerEvents: 'auto',
              zIndex: 100,
              ...(item.isSpecial && {
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                padding: '0.75rem',
                marginTop: '-0.5rem',
                boxShadow: 'var(--shadow-elevated)',
                transform: 'scale(1.1)'
              })
            }}
          >
            <item.icon size={20} />
            <span style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: '500',
              ...(item.isSpecial && {
                color: 'white'
              })
            }}>
              {item.label}
            </span>
            
            {/* Indicateur d'activité */}
            {isActive && !item.isSpecial && (
              <div style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--accent-color)',
                borderRadius: '50%'
              }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;




