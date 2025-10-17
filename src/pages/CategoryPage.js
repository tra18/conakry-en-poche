import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBusiness } from '../contexts/BusinessContext';
import BusinessCard from '../components/BusinessCard';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { getBusinessesByCategory } = useBusiness();

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

  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  const businesses = getBusinessesByCategory(categorySlug);

  if (!currentCategory) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '1rem' }}>Catégorie non trouvée</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Cette catégorie n'existe pas.</p>
          <Link 
            to="/" 
            style={{
              backgroundColor: '#4b5563',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      {/* Header de la catégorie */}
      <div style={{ backgroundColor: 'white', padding: '3rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3rem' }}>{currentCategory.icon}</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                {currentCategory.name}
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', margin: 0 }}>
                {currentCategory.description}
              </p>
            </div>
          </div>
          <Link 
            to="/" 
            style={{
              color: '#4b5563',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {businesses.length > 0 ? (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Entreprises dans cette catégorie ({businesses.length})
                </h2>
                <p style={{ color: '#6b7280' }}>
                  Découvrez les entreprises validées dans la catégorie {currentCategory.name.toLowerCase()}.
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{currentCategory.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Aucune entreprise dans cette catégorie
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Il n'y a pas encore d'entreprises validées dans la catégorie {currentCategory.name.toLowerCase()}.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/register-business"
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  🏢 Inscrire mon entreprise
                </Link>
                <Link
                  to="/"
                  style={{
                    backgroundColor: '#4b5563',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;