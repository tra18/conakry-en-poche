import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Données des actualités pour le carrousel
  const newsItems = [
    {
      id: 1,
      title: "Nouveau marché artisanal ouvre ses portes",
      content: "Un nouveau marché artisanal a été inauguré dans le quartier de Dixinn, offrant une variété d'objets artisanaux locaux.",
      image: "🏪",
      date: "15 Octobre 2024"
    },
    {
      id: 2,
      title: "Festival des arts de Conakry",
      content: "Le festival annuel des arts aura lieu le mois prochain avec des expositions, concerts et spectacles.",
      image: "🎭",
      date: "12 Octobre 2024"
    },
    {
      id: 3,
      title: "Amélioration du réseau de transport",
      content: "De nouvelles lignes de bus ont été mises en service pour faciliter les déplacements dans la capitale.",
      image: "🚌",
      date: "10 Octobre 2024"
    }
  ];

  // Auto-rotation du carrousel d'actualités
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => 
        prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

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
        padding: '5rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '1rem' }}>
                Bienvenue à <span style={{ display: 'block', color: '#d1d5db' }}>Conakry en Poche</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#e5e7eb', lineHeight: '1.6', marginBottom: '2rem' }}>
                Découvrez les meilleures adresses de Conakry : hôtels, restaurants, 
                loisirs, administrations et plus encore. Votre guide complet de la capitale guinéenne.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <button
                  style={{
                    backgroundColor: 'white',
                    color: '#4b5563',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  Explorer maintenant
                </button>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s'
                  }}
                >
                  En savoir plus
                </button>
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
                    marginTop: '1rem'
                  }}
                >
                  <span>🏢 Inscrire mon entreprise</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bannière Publicitaire */}
      <section style={{ padding: '2rem 0', backgroundColor: '#e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '2px dashed #9ca3af'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>
              📢 Espace Publicitaire
                    </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Votre entreprise ici ! Contactez-nous pour promouvoir vos services.
            </p>
            <button style={{
              backgroundColor: '#4b5563',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>
              Publier une annonce
            </button>
                  </div>
        </div>
      </section>

      {/* Carrousel d'Actualités */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '3rem' }}>
            📰 Actualités de Conakry
          </h2>
          
          <div style={{
            position: 'relative',
            backgroundColor: '#f9fafb',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem', marginRight: '1rem' }}>
                  {newsItems[currentNewsIndex].image}
                </span>
                      <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                    {newsItems[currentNewsIndex].title}
                        </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {newsItems[currentNewsIndex].date}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '1.125rem', color: '#4b5563', lineHeight: '1.6' }}>
                {newsItems[currentNewsIndex].content}
                        </p>
                      </div>
            
            {/* Indicateurs du carrousel */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.5rem'
            }}>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '3rem' }}>
            Explorez par Catégorie
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {categories.map((category) => (
              <div
                key={category.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'box-shadow 0.3s',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '4rem', height: '4rem', backgroundColor: '#e0e7ff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '2rem', color: '#4f46e5' }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>{category.name}</h3>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '3rem' }}>
            Nos Services Clés
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'box-shadow 0.3s',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ width: '5rem', height: '5rem', backgroundColor: '#e0e7ff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem', color: '#4f46e5' }}>
                🚕
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>ALLO Taxi</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Trouvez un taxi rapidement et en toute sécurité à Conakry.</p>
              <button style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>En savoir plus</span> <span style={{ fontSize: '1.125rem' }}>→</span>
              </button>
              </div>
            
            <div
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'box-shadow 0.3s',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ width: '5rem', height: '5rem', backgroundColor: '#e0e7ff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem', color: '#4f46e5' }}>
                📰
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Actualités</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Restez informé des dernières nouvelles et événements à Conakry.</p>
              <button style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>En savoir plus</span> <span style={{ fontSize: '1.125rem' }}>→</span>
            </button>
            </div>
            
            {/* Service Trafic */}
            <div
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'box-shadow 0.3s',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ width: '5rem', height: '5rem', backgroundColor: '#e0e7ff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem', color: '#4f46e5' }}>
                🚦
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Trafic en Temps Réel</h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Surveillez le trafic en temps réel à Conakry.</p>
              <Link to="/traffic" style={{ color: '#4b5563', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.3s' }}>
                <span>Voir le trafic</span> <span style={{ fontSize: '1.125rem' }}>→</span>
              </Link>
            </div>
            
            {/* Service Vivre en Guinée */}
            <div
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'box-shadow 0.3s',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ width: '5rem', height: '5rem', backgroundColor: '#e0e7ff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem', color: '#4f46e5' }}>
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
      <section style={{ padding: '4rem 0', background: 'linear-gradient(to right, #4b5563, #6b7280)', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '3rem' }}>
            Conakry en Chiffres
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>500+</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Entreprises Référencées</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>9</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Catégories</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>1000+</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Avis Clients</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2M+</p>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>Utilisateurs Potentiels</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;