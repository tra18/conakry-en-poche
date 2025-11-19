import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdvertisementBanner from '../components/AdvertisementBanner';
import ImageOptimizer from '../components/ImageOptimizer';
import ResponsiveCarousel from '../components/ResponsiveCarousel';
import { useActivity } from '../contexts/ActivityContext';
import { useBusiness } from '../contexts/BusinessContext';

const ResponsiveHomePage = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { getActiveActivities } = useActivity();
  const { categories } = useBusiness();

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
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzRiNTU2MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TcOpcmNow6kgQXJ0aXNhbmFsPC90ZXh0Pjwvc3ZnPg==',
      date: '15 Octobre 2025',
      link: '/news/1'
    },
    {
      id: 2,
      title: 'Festival des arts de Conakry : Un succès retentissant',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzZiNzI4MCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RmVzdGl2YWwgQXJ0czwvdGV4dD48L3N2Zz4=',
      date: '10 Octobre 2025',
      link: '/news/2'
    },
    {
      id: 3,
      title: 'Amélioration du réseau de transport public à Conakry',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzljYTNhZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VHJhbnNwb3J0IFB1YmxpYzwvdGV4dD48L3N2Zz4=',
      date: '05 Octobre 2025',
      link: '/news/3'
    },
  ];

  // Récupérer les activités actives
  const activeActivities = getActiveActivities();
  
  // Combiner les actualités et les activités pour le carrousel
  const combinedItems = [
    ...newsItems,
    ...activeActivities.slice(0, 3).map(activity => ({
      id: `activity-${activity.id}`,
      title: activity.title,
      image: activity.media?.data || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzNiODJmNiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWN0aXZpdMOpPC90ZXh0Pjwvc3ZnPg==',
      date: new Date(activity.date).toLocaleDateString('fr-FR'),
      link: `/activity/${activity.id}`,
      type: 'activity',
      location: activity.location
    }))
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % combinedItems.length);
    }, 5000); // Change news every 5 seconds
    return () => clearInterval(interval);
  }, [combinedItems.length]);

  // Utiliser les catégories du BusinessContext avec descriptions
  const categoriesWithDescriptions = categories.map(category => ({
    ...category,
    slug: category.id,
    description: getCategoryDescription(category.id)
  }));

  // Fonction pour obtenir la description de chaque catégorie
  function getCategoryDescription(categoryId) {
    const descriptions = {
      restaurants: 'Découvrez des saveurs uniques.',
      hotels: 'Trouvez les meilleurs hôtels.',
      pharmacies: 'Pharmacies et médicaments.',
      hopitaux: 'Centres de santé et hôpitaux.',
      banques: 'Services bancaires et financiers.',
      ecoles: 'Établissements scolaires.',
      universites: 'Enseignement supérieur.',
      transport: 'Options de transport en ville.',
      shopping: 'Centres commerciaux et boutiques.',
      loisirs: 'Activités et divertissements.',
      sport: 'Installations sportives et clubs.',
      beaute: 'Salons de beauté et spas.',
      automobile: 'Garages et services automobiles.',
      administration: 'Services publics et bureaux.',
      services: 'Divers services professionnels.',
      autre: 'Autres catégories.'
    };
    return descriptions[categoryId] || 'Découvrez cette catégorie.';
  }

  return (
    <div className="theme-bg-secondary" style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
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
                  to="/traffic"
                  style={{
                    backgroundColor: '#3b82f6',
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
      <AdvertisementBanner />

      {/* News Carousel Section */}
      <section className="theme-bg-primary" style={{ padding: '4rem 0' }}>
        <div className="responsive-container">
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.25rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1f2937', 
            marginBottom: '3rem' 
          }}>
            Dernières Actualités & Activités
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
              {combinedItems.map((item, index) => (
                <div key={item.id} style={{ flex: '0 0 100%', width: '100%', position: 'relative' }}>
                  <ImageOptimizer
                    src={item.image}
                    alt={item.title}
                    fallbackText={`Image de ${item.title}`}
                    containerStyle={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f8fafc'
                    }}
                    imageStyle={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {item.type === 'activity' && <span style={{ fontSize: '1.25rem' }}>📅</span>}
                      <h3 className="news-title" style={{ 
                        fontSize: isMobile ? '1.25rem' : '1.75rem', 
                        fontWeight: 'bold', 
                        margin: 0
                      }}>{item.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '0.5rem' }}>{item.date}</p>
                    {item.location && (
                      <p style={{ fontSize: '0.8rem', color: '#d1d5db', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        📍 {item.location}
                      </p>
                    )}
                    <Link to={item.link} style={{ color: 'white', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      {item.type === 'activity' ? 'Voir l\'activité' : 'Lire la suite'} <span style={{ fontSize: '1.125rem' }}>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
              {combinedItems.map((_, index) => (
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
      <section id="categories" className="theme-bg-secondary" style={{ padding: '4rem 0' }}>
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
            {categoriesWithDescriptions.map((category) => (
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0', color: '#1f2937' }}>
                  {category.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
                  {category.description}
                </p>
                <Link
                  to={`/category/${category.slug}`}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    transition: 'background-color 0.3s',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  Découvrir
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vivre en Guinée Section */}
      <section className="theme-bg-primary" style={{ padding: '4rem 0' }}>
        <div className="responsive-container">
          <h2 style={{ 
            fontSize: isMobile ? '1.75rem' : '2.25rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1f2937', 
            marginBottom: '3rem' 
          }}>
            Vivre en Guinée
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            <Link
              to="/vivre-en-guinee"
              style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '2rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇬🇳</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                Guide Complet
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                Tout savoir pour vivre et s'installer en Guinée
              </p>
            </Link>
            
            <Link
              to="/traffic"
              style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '2rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚦</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                Info Trafic
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                Consultez l'état du trafic en temps réel
              </p>
            </Link>
            
            <Link
              to="/allo"
              style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '2rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚕</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                ALLO Taxi
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                Réservez votre taxi facilement
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveHomePage;