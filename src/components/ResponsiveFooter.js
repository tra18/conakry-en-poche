import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResponsiveFooter = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <footer style={{ backgroundColor: '#374151', color: 'white', padding: '3rem 0' }}>
      <div className="responsive-container">
        <div className="footer-grid responsive-grid" style={{ 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: isMobile ? '2rem' : '2rem',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          {/* Section Logo et Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(to right, #4b5563, #6b7280)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>🇬🇳</span>
              </div>
              <h5 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Conakry en Poche</h5>
            </div>
            <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Votre guide complet pour découvrir Conakry : hôtels, restaurants, loisirs, administrations et plus encore.</p>
          </div>

          {/* Section Découvrir */}
          <div>
            <h6 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '1rem', color: 'white' }}>Découvrir</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/category/hotels" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Hôtels</Link></li>
              <li><Link to="/category/restaurants" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Restaurants</Link></li>
              <li><Link to="/category/loisirs" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Loisirs</Link></li>
              <li><Link to="/category/administrations" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Administrations</Link></li>
              <li><Link to="/category/hopitaux" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Hôpitaux</Link></li>
              <li><Link to="/category/pharmacies" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Pharmacies</Link></li>
              <li><Link to="/category/entreprises" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Entreprises</Link></li>
              <li><Link to="/category/aires-jeux" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Aires de Jeux</Link></li>
            </ul>
          </div>

          {/* Section Services */}
          <div>
            <h6 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '1rem', color: 'white' }}>Services</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/allo" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>ALLO Taxi</Link></li>
              <li><Link to="/news" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Actualités</Link></li>
              <li><Link to="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.3s' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Section Contact */}
          <div>
            <h6 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '1rem', color: 'white' }}>Contact</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <span style={{ color: '#9ca3af' }}>📧</span>
                <span>contact@conakryenpoche.gn</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <span style={{ color: '#9ca3af' }}>📞</span>
                <span>+224 620 00 00 00</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <span style={{ color: '#9ca3af' }}>📍</span>
                <span>Conakry, Guinée</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Droits d'auteur */}
        <div style={{ 
          borderTop: '1px solid #4b5563', 
          marginTop: '2rem', 
          paddingTop: '2rem', 
          textAlign: 'center', 
          color: '#9ca3af', 
          fontSize: '0.875rem' 
        }}>
          <p>&copy; 2024 Conakry en Poche. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
