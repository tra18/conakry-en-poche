import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useBusiness } from '../contexts/BusinessContext';
import BusinessCard from '../components/BusinessCard';
import { Search, ArrowLeft, Map, List, Building2, Filter } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'map'
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { validatedBusinesses, categories } = useBusiness();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mettre à jour l'URL quand la recherche change
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    }
  }, [searchQuery, setSearchParams]);

  // Rechercher dans toutes les entreprises de toutes les catégories
  const searchBusinesses = (query) => {
    if (!query || !query.trim()) {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    
    return validatedBusinesses.filter(business => {
      // Recherche dans le nom
      if (business.name?.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Recherche dans l'adresse
      if (business.address?.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Recherche dans la description
      if (business.description?.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Recherche dans les services
      if (business.services && Array.isArray(business.services)) {
        if (business.services.some(service => service.toLowerCase().includes(lowerQuery))) {
          return true;
        }
      }
      
      // Recherche dans le téléphone
      if (business.phone?.includes(lowerQuery)) {
        return true;
      }
      
      // Recherche dans l'email
      if (business.email?.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Recherche dans la catégorie
      const category = categories.find(cat => cat.id === business.category);
      if (category?.name.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      return false;
    });
  };

  const searchResults = searchBusinesses(searchQuery);
  const hasResults = searchResults.length > 0;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault();
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || '📍';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            opacity: 0.8
          }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </Link>
          </div>

          {/* Titre */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '800',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Recherche
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Recherchez dans toutes les entreprises de Conakry
            </p>
          </div>

          {/* Barre de recherche */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '0.75rem 1rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              gap: '0.75rem'
            }}>
              <Search size={24} color="#6b7280" />
              <input
                type="text"
                placeholder="Rechercher une entreprise, un service, une adresse... (Appuyez sur Entrée)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#1f2937',
                  backgroundColor: 'transparent'
                }}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '1.5rem 1rem' : '2rem'
      }}>
        {searchQuery.trim() ? (
          <>
            {/* En-tête des résultats */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {hasResults ? (
                    <>
                      {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} pour "{searchQuery}"
                    </>
                  ) : (
                    <>Aucun résultat pour "{searchQuery}"</>
                  )}
                </h2>
              </div>

              {hasResults && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: viewMode === 'list' ? '#3b82f6' : '#f3f4f6',
                      color: viewMode === 'list' ? 'white' : '#374151',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    <List size={16} />
                    Liste
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: viewMode === 'map' ? '#3b82f6' : '#f3f4f6',
                      color: viewMode === 'map' ? 'white' : '#374151',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    <Map size={16} />
                    Carte
                  </button>
                </div>
              )}
            </div>

            {/* Résultats */}
            {hasResults ? (
              viewMode === 'list' ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {searchResults.map((business) => (
                    <div key={business.id} id={`business-${business.id}`}>
                      <BusinessCard business={business} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  height: '600px',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'white'
                }}>
                  {/* Carte interactive - à implémenter si nécessaire */}
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <Map size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
                      <p>Vue carte en développement</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <Search size={64} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Aucun résultat trouvé
                </h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1.5rem'
                }}>
                  Essayez avec d'autres mots-clés ou explorez les catégories
                </p>
                <Link
                  to="/all-categories"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                  }}
                >
                  <Building2 size={18} />
                  Voir toutes les catégories
                </Link>
              </div>
            )}
          </>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <Search size={64} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Recherchez une entreprise
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem'
            }}>
              Entrez un nom d'entreprise, un service, une adresse ou une catégorie dans le champ de recherche ci-dessus
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    border: '1px solid #e5e7eb'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {category.icon}
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

