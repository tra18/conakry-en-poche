import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#374151',
      color: 'white',
      padding: '3rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(to right, #4b5563, #6b7280)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>🇬🇳</span>
              </div>
              <h5 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Conakry en Poche</h5>
            </div>
            <p style={{ color: '#9ca3af' }}>Votre guide complet pour découvrir Conakry</p>
          </div>
          <div>
            <h6 style={{ fontWeight: '600', marginBottom: '1rem' }}>Découvrir</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Hôtels</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Restaurants</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Loisirs</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Administrations</a>
              </li>
            </ul>
          </div>
          <div>
            <h6 style={{ fontWeight: '600', marginBottom: '1rem' }}>Services</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>ALLO Taxi</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Assistant IA</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Actualités</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h6 style={{ fontWeight: '600', marginBottom: '1rem' }}>Contact</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>📧 contact@conakryenpoche.gn</li>
              <li style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>📞 +224 123 456 789</li>
              <li style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>📍 Conakry, Guinée</li>
            </ul>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #4b5563',
          marginTop: '2rem',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <p>&copy; 2024 Conakry en Poche. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;