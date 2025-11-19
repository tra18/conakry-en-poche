import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useBusiness } from '../contexts/BusinessContext';
import { Search, Grid, List, ArrowLeft, Star, MapPin } from 'lucide-react';
import { safariEventHandlers } from '../utils/safariClickHandler';

const AllCategoriesPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const { categories } = useBusiness();

  // Mettre à jour le terme de recherche quand l'URL change
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fonction pour obtenir la description de chaque catégorie
  function getCategoryDescription(categoryId) {
    const descriptions = {
      restaurants: 'Découvrez des saveurs uniques et des restaurants authentiques.',
      hotels: 'Trouvez les meilleurs hôtels et hébergements.',
      pharmacies: 'Pharmacies et médicaments disponibles 24h/24.',
      hopitaux: 'Centres de santé, hôpitaux et services médicaux.',
      banques: 'Services bancaires et financiers modernes.',
      ecoles: 'Établissements scolaires et éducatifs.',
      universites: 'Enseignement supérieur et universités.',
      transport: 'Services de transport public et privé.',
      shopping: 'Boutiques, centres commerciaux et shopping.',
      loisirs: 'Divertissement, loisirs et activités récréatives.',
      sport: 'Activités sportives et centres de fitness.',
      beaute: 'Salons de beauté et centres de bien-être.',
      automobile: 'Services automobiles et garages.',
      administration: 'Services administratifs et gouvernementaux.',
      services: 'Services divers et professionnels.',
      autre: 'Autres catégories et services variés.'
    };
    return descriptions[categoryId] || 'Explorez cette catégorie pour découvrir ce qui vous attend.';
  }

  // Filtrer les catégories selon le terme de recherche
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryDescription(category.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          zIndex: 1,
          pointerEvents: 'none'
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
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <button
              {...safariEventHandlers(() => navigate('/'))}
              style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.875rem',
                opacity: 0.8,
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                transition: 'all 0.2s',
                position: 'relative',
                zIndex: 100,
                pointerEvents: 'auto',
                border: 'none',
                background: 'transparent',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </button>
            
            <button
              {...safariEventHandlers(() => navigate('/register-business'))}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.2s',
                position: 'relative',
                zIndex: 100,
                pointerEvents: 'auto',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🏢 Inscrire mon entreprise
            </button>
          </div>

          {/* Titre */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '800',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Toutes les Catégories
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Explorez toutes les catégories d'entreprises disponibles à Conakry
            </p>
          </div>

          {/* Barre de recherche et contrôles */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* Barre de recherche */}
            <div style={{
              position: 'relative',
              flex: '1',
              minWidth: '250px'
            }}>
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              />
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Boutons de vue */}
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              padding: '0.25rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.75rem',
                  backgroundColor: viewMode === 'grid' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                <Grid size={16} />
                Grille
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.75rem',
                  backgroundColor: viewMode === 'list' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                <List size={16} />
                Liste
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div style={{
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Statistiques */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              {filteredCategories.length} Catégories
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0
            }}>
              {searchTerm ? `Résultats pour "${searchTerm}"` : 'Toutes les catégories disponibles'}
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <Star size={16} />
            <span>Explorez Conakry</span>
          </div>
        </div>

        {/* Grille des catégories */}
        {viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
                >
                  {/* Background Gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'][index % 8]} 0%, ${['#1d4ed8', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2', '#65a30d', '#ea580c'][index % 8]} 100%)`
                  }} />

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      lineHeight: 1
                    }}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0,
                    marginBottom: '1.5rem',
                    lineHeight: 1.5
                  }}>
                    {getCategoryDescription(category.id)}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <MapPin size={14} />
                      <span>Découvrir</span>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Vue Liste */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {filteredCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
                >
                  {/* Icône */}
                  <div style={{
                    fontSize: '2rem',
                    lineHeight: 1,
                    minWidth: '3rem',
                    textAlign: 'center'
                  }}>
                    {category.icon}
                  </div>

                  {/* Contenu */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {category.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: 1.4
                    }}>
                      {getCategoryDescription(category.id)}
                    </p>
                  </div>

                  {/* Flèche */}
                  <div style={{
                    color: '#6b7280',
                    fontSize: '1.25rem'
                  }}>
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Message si aucun résultat */}
        {filteredCategories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              Aucune catégorie trouvée
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Essayez de modifier votre recherche ou explorez toutes les catégories
            </p>
            <button
              onClick={() => setSearchTerm('')}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              Voir toutes les catégories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategoriesPage;




