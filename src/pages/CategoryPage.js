import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBusiness } from '../contexts/BusinessContext';
import { safariEventHandlers } from '../utils/safariClickHandler';
import BusinessCard from '../components/BusinessCard';
import BusinessAdvancedSearch from '../components/BusinessAdvancedSearch';
import { List, Navigation } from 'lucide-react';

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { getBusinessesByCategory, categories } = useBusiness();
  const [viewMode] = useState('list'); // Mode liste uniquement
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  const currentCategory = categories.find(cat => cat.id === categorySlug);
  const businesses = getBusinessesByCategory(categorySlug);

  React.useEffect(() => {
    setFilteredBusinesses(businesses);
  }, [businesses]);


  if (!currentCategory) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '1rem' }}>Catégorie non trouvée</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Cette catégorie n'existe pas.</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/');
            }}
            style={{
              backgroundColor: '#4b5563',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              position: 'relative',
              zIndex: 100,
              pointerEvents: 'auto',
              transition: 'all 0.2s',
              border: 'none',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#374151';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Retour à l'accueil
          </button>
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
                {currentCategory.description || `Découvrez les ${currentCategory.name.toLowerCase()} de Conakry`}
              </p>
            </div>
          </div>
          
          {/* Recherche avancée */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <BusinessAdvancedSearch
              onBusinessSelect={(business) => {
                setSelectedBusiness(business);
                setViewMode('list');
                // Scroll vers l'entreprise sélectionnée
                setTimeout(() => {
                  const element = document.getElementById(`business-${business.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 100);
              }}
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/');
            }}
            style={{
              color: '#4b5563',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              position: 'relative',
              zIndex: 100,
              pointerEvents: 'auto',
              transition: 'all 0.2s',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#4b5563';
            }}
          >
            ← Retour à l'accueil
          </button>
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
                {filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((business) => (
                    <div key={business.id} id={`business-${business.id}`}>
                      <BusinessCard 
                        business={business}
                        style={{
                          border: selectedBusiness?.id === business.id ? '3px solid #3b82f6' : undefined
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '1rem'
                  }}>
                    <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                      Aucune entreprise trouvée avec ces critères
                    </p>
                  </div>
                )}
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/register-business?category=${categorySlug}`);
                  }}
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    position: 'relative',
                    zIndex: 100,
                    pointerEvents: 'auto',
                    transition: 'all 0.2s',
                    border: 'none',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  🏢 Inscrire mon entreprise
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/');
                  }}
                  style={{
                    backgroundColor: '#4b5563',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    position: 'relative',
                    zIndex: 100,
                    pointerEvents: 'auto',
                    transition: 'all 0.2s',
                    border: 'none',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#374151';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4b5563';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;