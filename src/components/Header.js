import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
          {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
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
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            Conakry en Poche
          </span>
          </Link>

          {/* Navigation Desktop */}
                <nav style={{ display: 'flex', gap: '1.5rem' }}>
                  <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>
              Accueil
            </Link>
                  <Link to="/traffic-map" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Carte Trafic
            </Link>
                  <Link to="/admin" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Administration
                  </Link>
                  <Link to="/vivre-en-guinee" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Vivre en Guinée
                  </Link>
                  <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Contact
                  </Link>
              </nav>

        {/* Menu mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            padding: '0.5rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;