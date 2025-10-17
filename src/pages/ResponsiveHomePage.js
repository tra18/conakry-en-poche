import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResponsiveHomePage = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Données des actualités pour le carrousel
  const newsItems = [
    {
      id: 1,
      title: 'Nouveau marché artisanal ouvre ses portes à Conakry',
      image: 'https://via.placeholder.com/400x250/4b5563/ffffff?text=Marché+Artisanal',
      date: '15 Octobre 2025',
      link: '/news/1'
    },
    {
      id: 2,
      title: 'Festival des arts de Conakry : Un succès retentissant',
      image: 'https://via.placeholder.com/400x250/6b7280/ffffff?text=Festival+Arts',
      date: '10 Octobre 2025',
      link: '/news/2'
    },
    {
      id: 3,
      title: 'Amélioration du réseau de transport public à Conakry',
      image: 'https://via.placeholder.com/400x250/9ca3af/ffffff?text=Transport+Public',
      date: '05 Octobre 2025',
      link: '/news/3'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000); // Change news every 5 seconds
    return () => clearInterval(interval);
  }, [newsItems.length]);

  const categories = [
    { id: 1, name: 'Hôtels', icon: '🏨', description: 'Trouvez les meilleurs hôtels.', slug: 'hotels' },
    { id: 2, name: 'Restaurants', icon: '🍽️', description: 'Découvrez des saveurs uniques.', slug: 'restaurants' },
    { id: 3, name: 'Loisirs', icon: '🎭', description: 'Activités et divertissements.', slug: 'loisirs' },
    { id: 4, name: 'Administrations', icon: '🏛️', description: 'Services publics et bureaux.', slug: 'administrations' },
    { id: 5, name: 'Hôpitaux', icon: '🏥', description: 'Centres de santé et hôpitaux.', slug: 'hopitaux' },
    { id: 6, name: 'Pharmacies', icon: '💊', description: 'Pharmacies et médicaments.', slug: 'pharmacies' },
    { id: 7, name: 'Entreprises', icon: '🏢', description: 'Entreprises et services.', slug: 'entreprises' },
    { id: 8, name: 'Aires de Jeux', icon: '🎠', description: 'Espaces de jeux pour enfants.', slug: 'aires-jeux' },
    { id: 9, name: 'Écoles', icon: '🎓', description: 'Établissements scolaires.', slug: 'ecoles' },
    { id: 10, name: 'Universités', icon: '🏫', description: 'Enseignement supérieur.', slug: 'universites' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(to right, #4b5563, #6b7280)',
        color: 'white',
        padding: isMobile ? '3rem 0' : '5rem 0'
      }}>
        <div className="responsive-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 className="hero-title" style={{ 
                fontSize: isMobile ? '2rem' : '3rem', 
                fontWeight: 'bold', 
                lineHeight: '1.2', 
                marginBottom: '1rem' 
              }}>
                Bienvenue à <span style={{ display: 'block', color: '#d1d5db' }}>Conakry en Poche</span>
              </h1>
              <p className="hero-subtitle" style={{ 
                fontSize: isMobile ? '1rem' : '1.25rem', 
                color: '#e5e7eb', 
                lineHeight: '1.6', 
                marginBottom: '2rem' 
              }}>
                Découvrez les meilleures adresses de Conakry : hôtels, restaurants,
                loisirs, administrations et plus encore. Votre guide complet de la capitale guinéenne.
              </p>
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center', 
                gap: '1rem',
                justifyContent: 'center'
              }}>
                <Link
                  to="/news"
                  className="responsive-btn"
                  style={{
                    backgroundColor: 'white',
                    color: '#4b5563',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.3s',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  <span>Actualités</span>
                </Link>
                <Link
                  to="/allo"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.3s, color 0.3s',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  <span>ALLO Taxi</span>
                </Link>
                <Link
                  to="/register-business"
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.3s',
                    marginTop: '1rem',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  <span>🏢 Inscrire mon entreprise</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publicité Banner */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f9fafb', textAlign: 'center' }}>
        <div className="responsive-container">
          <div style={{ 
            border: '2px dashed #d1d5db', 
            borderRadius: '0.75rem', 
            padding: isMobile ? '1rem' : '2rem' 
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '1.5rem' : '1.8rem', 
              fontWeight: 'bold', 
              color: '#374151', 
              marginBottom: '1rem' 
            }}>
              Votre Publicité Ici !
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Atteignez des milliers d'utilisateurs à Conakry. Contactez-nous pour vos annonces.
            </p>
            <Link
              to="/contact"
              className="responsive-btn"
              style={{
                backgroundColor: '#4b5563',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'background-color 0.3s',
                display: 'inline-block'
              }}
            >
              Publier une annonce
            </Link>
          </div>
        </div>
      </section>

      {/* News Carousel Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="responsive-container">
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.25rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1f2937', 
            marginBottom: '3rem' 
          }}>
            Dernières Actualités
          </h2>
          <div className="news-carousel" style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: '0.75rem', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            height: isMobile ? '250px' : '400px'
          }}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.5s ease-in-out',
              transform: `translateX(-${currentNewsIndex * 100}%)`
            }}>
              {newsItems.map((news, index) => (
                <div key={news.id} style={{ flex: '0 0 100%', width: '100%', position: 'relative' }}>
                  <img
                    src={news.image}
                    alt={news.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="news-content" style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    background: 'rgba(0,0,0,0.6)', 
                    color: 'white', 
                    padding: isMobile ? '1rem' : '1.5rem' 
                  }}>
                    <h3 className="news-title" style={{ 
                      fontSize: isMobile ? '1.25rem' : '1.75rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem' 
                    }}>{news.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '1rem' }}>{news.date}</p>
                    <Link to={news.link} style={{ color: 'white', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      Lire la suite <span style={{ fontSize: '1.125rem' }}>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentNewsIndex ? '#4b5563' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catégories d'entreprises */}
      <section id="categories" style={{ padding: '4rem 0', backgroundColor: '#f3f4f6' }}>
        <div className="responsive-container">
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.25rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1f2937', 
            marginBottom: '3rem' 
          }}>
            Explorez par Catégorie
          </h2>
          <div className="categories-grid responsive-grid" style={{ 
            gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(200px, 1fr))' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '1rem' : '2rem'
          }}>
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card responsive-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'box-shadow 0.3s',
                  border: '1px solid #e5e7eb',
                  padding: isMobile ? '1rem' : '1.5rem'
                }}
              >
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: '#e0e7ff', 
                  borderRadius: '9999px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '1rem', 
                  fontSize: '2rem', 
                  color: '#4f46e5' 
                }}>
                  {category.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '0.5rem' 
                }}>{category.name}</h3>
                <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{category.description}</p>
                <Link
                  to={`/category/${category.slug}`}
                  style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s' }}
                >
                  <span>Découvrir</span> <span style={{ fontSize: '1.125rem' }}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Principaux */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="responsive-container">
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.25rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1f2937', 
            marginBottom: '3rem' 
          }}>
            Nos Services Clés
          </h2>
          <div className="services-grid responsive-grid" style={{ 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '1rem' : '2rem'
          }}>
            {/* Service ALLO Taxi */}
            <div className="responsive-card" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '5rem', 
                height: '5rem', 
                backgroundColor: '#e0e7ff', 
                borderRadius: '9999px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem', 
                fontSize: '2.5rem', 
                color: '#4f46e5' 
              }}>
                🚕
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>ALLO Taxi</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Trouvez un taxi rapidement et en toute sécurité à Conakry.</p>
              <Link to="/allo" style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s' }}>
                <span>En savoir plus</span> <span style={{ fontSize: '1.125rem' }}>→</span>
              </Link>
            </div>
            
            {/* Service Actualités */}
            <div className="responsive-card" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '5rem', 
                height: '5rem', 
                backgroundColor: '#e0e7ff', 
                borderRadius: '9999px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem', 
                fontSize: '2.5rem', 
                color: '#4f46e5' 
              }}>
                📰
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Actualités</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Restez informé des dernières nouvelles et événements à Conakry.</p>
              <Link to="/news" style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s' }}>
                <span>En savoir plus</span> <span style={{ fontSize: '1.125rem' }}>→</span>
              </Link>
            </div>
            
            {/* Service Trafic */}
            <div className="responsive-card" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '5rem', 
                height: '5rem', 
                backgroundColor: '#e0e7ff', 
                borderRadius: '9999px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem', 
                fontSize: '2.5rem', 
                color: '#4f46e5' 
              }}>
                🚦
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Trafic en Temps Réel</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Surveillez le trafic en temps réel à Conakry.</p>
              <Link to="/traffic" style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s' }}>
                <span>Voir le trafic</span> <span style={{ fontSize: '1.125rem' }}>→</span>
              </Link>
            </div>
            
            {/* Service Vivre en Guinée */}
            <div className="responsive-card" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '5rem', 
                height: '5rem', 
                backgroundColor: '#e0e7ff', 
                borderRadius: '9999px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem', 
                fontSize: '2.5rem', 
                color: '#4f46e5' 
              }}>
                🇬🇳
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Vivre en Guinée</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Guide complet pour vivre, travailler et s'épanouir en Guinée.</p>
              <Link to="/vivre-en-guinee" style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s' }}>
                <span>Découvrir</span> <span style={{ fontSize: '1.125rem' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(to right, #4b5563, #6b7280)', 
        color: 'white' 
      }}>
        <div className="responsive-container" style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.25rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem' 
          }}>
            Conakry en Chiffres
          </h2>
          <div className="stats-grid responsive-grid" style={{ 
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '1rem' : '2rem'
          }}>
            <div className="stat-item" style={{ 
              padding: isMobile ? '1rem' : '1.5rem', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '0.75rem', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
            }}>
              <p style={{ 
                fontSize: isMobile ? '2rem' : '3rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem' 
              }}>500+</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Entreprises Référencées</p>
            </div>
            <div className="stat-item" style={{ 
              padding: isMobile ? '1rem' : '1.5rem', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '0.75rem', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
            }}>
              <p style={{ 
                fontSize: isMobile ? '2rem' : '3rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem' 
              }}>10</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Catégories</p>
            </div>
            <div className="stat-item" style={{ 
              padding: isMobile ? '1rem' : '1.5rem', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '0.75rem', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
            }}>
              <p style={{ 
                fontSize: isMobile ? '2rem' : '3rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem' 
              }}>1000+</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Avis Clients</p>
            </div>
            <div className="stat-item" style={{ 
              padding: isMobile ? '1rem' : '1.5rem', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '0.75rem', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
            }}>
              <p style={{ 
                fontSize: isMobile ? '2rem' : '3rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem' 
              }}>2M+</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Utilisateurs Potentiels</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveHomePage;
