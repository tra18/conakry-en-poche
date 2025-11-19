import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBusiness } from '../contexts/BusinessContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import {
  Search,
  Grid,
  List,
  ArrowLeft,
  Star,
  MapPin,
  Building2,
  Sparkles,
  ChefHat,
  Hotel,
  Pill,
  HeartPulse,
  Landmark,
  GraduationCap,
  Building,
  Bus,
  ShoppingBag,
  Gamepad2,
  Dumbbell,
  Car,
  Wrench,
  Layers
} from 'lucide-react';

const AllCategoriesPageModern = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const { categories } = useBusiness();
  const { language } = useLanguage();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getCategoryDescription = (categoryId) => {
    const key = `allCategories.descriptions.${categoryId}`;
    const translated = t(language, key);
    if (translated === key) {
      return t(language, 'allCategories.descriptions.default');
    }
    return translated;
  };

  const categoryIcons = {
    restaurants: ChefHat,
    hotels: Hotel,
    pharmacies: Pill,
    hopitaux: HeartPulse,
    banques: Landmark,
    ecoles: GraduationCap,
    universites: Building,
    transport: Bus,
    shopping: ShoppingBag,
    loisirs: Gamepad2,
    sport: Dumbbell,
    beaute: Sparkles,
    automobile: Car,
    administration: Landmark,
    services: Wrench,
    autre: Layers
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryDescription(category.id).toLowerCase().includes(searchTerm.toLowerCase())
  );
  const quickCategories = categories.slice(0, 8);

  const categoryColors = [
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', accent: '#667eea' },
    { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', accent: '#f5576c' },
    { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', accent: '#4facfe' },
    { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', accent: '#43e97b' },
    { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', accent: '#fa709a' },
    { bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', accent: '#30cfd0' },
    { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', accent: '#a8edea' },
    { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', accent: '#ff9a9e' },
    { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', accent: '#fcb69f' },
    { bg: 'linear-gradient(135deg, #ff8a80 0%, #ea6100 100%)', accent: '#ff8a80' },
    { bg: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', accent: '#84fab0' },
    { bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', accent: '#a1c4fd' },
    { bg: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', accent: '#ff6e7f' },
    { bg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', accent: '#e0c3fc' },
    { bg: 'linear-gradient(135deg, #fad961 0%, #f76b1c 100%)', accent: '#f76b1c' },
    { bg: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', accent: '#5ee7df' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '4rem 1.5rem' : '6rem 1.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%)',
          opacity: 0.5
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              <Sparkles size={16} />
              <span>{t(language, 'allCategories.tagline')}</span>
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '1rem'
            }}>
              {t(language, 'allCategories.title')}
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}>
              {t(language, 'allCategories.subtitle')}
            </p>

            {/* Barre de recherche */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}
            >
              <div style={{
                display: 'flex',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '0.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                gap: '0.5rem'
              }}>
                <Search size={24} color="#6b7280" style={{ margin: '0.75rem' }} />
                <input
                  type="text"
                  placeholder={t(language, 'allCategories.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    padding: '0.75rem 0',
                    color: '#1f2937',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ArrowLeft size={18} />
                {t(language, 'allCategories.back')}
              </button>
              <button
                onClick={() => navigate('/register-business')}
                style={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Building2 size={18} />
                {t(language, 'allCategories.register')}
              </button>
            </motion.div>
          </motion.div>
          {isMobile && (
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem'
            }}>
              {quickCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => navigate(`/category/${category.id}`)}
                  style={{
                    flex: '0 0 auto',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    fontSize: '0.85rem',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contenu Principal */}
      <section style={{
        padding: isMobile ? '3rem 1.5rem' : '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Statistiques et contrôles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
              <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              {t(language, 'allCategories.statisticsTitle', { count: filteredCategories.length })}
            </h2>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0
            }}>
              {searchTerm
                ? t(language, 'allCategories.resultsFor', { term: searchTerm })
                : t(language, 'allCategories.allAvailable')}
            </p>
          </div>

          {/* Boutons de vue */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
            padding: '0.25rem',
            gap: '0.25rem'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: viewMode === 'grid' ? 'white' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: viewMode === 'grid' ? '#667eea' : '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Grid size={18} />
              {t(language, 'allCategories.viewGrid')}
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: viewMode === 'list' ? 'white' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: viewMode === 'list' ? '#667eea' : '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <List size={18} />
              {t(language, 'allCategories.viewList')}
            </button>
          </div>
        </motion.div>

        {/* Grille des catégories */}
        {viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCategories.map((category, index) => {
              const colorScheme = categoryColors[index % categoryColors.length];
              const IconComponent = categoryIcons[category.id] || Building2;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/category/${category.id}`)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      padding: '2rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    >
                      {/* Gradient Top Bar */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: colorScheme.bg
                      }} />

                      {/* Icon Circle */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: colorScheme.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        boxShadow: `0 8px 16px ${colorScheme.accent}40`
                      }}>
                        <IconComponent size={36} color="#fff" />
                      </div>

                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '0.75rem'
                      }}>
                        {category.name}
                      </h3>

                      <p style={{
                        fontSize: '0.95rem',
                        color: '#6b7280',
                        margin: 0,
                        marginBottom: '1.5rem',
                        lineHeight: 1.6,
                        flex: 1
                      }}>
                        {getCategoryDescription(category.id)}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1rem',
                        borderTop: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          fontWeight: '600'
                        }}>
                          <MapPin size={16} />
                          <span>{t(language, 'allCategories.explore')}</span>
                        </div>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: colorScheme.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.125rem',
                          fontWeight: '700'
                        }}>
                          →
                        </div>
                      </div>
                    </button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Vue Liste */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
              {filteredCategories.map((category, index) => {
              const colorScheme = categoryColors[index % categoryColors.length];
              const IconComponent = categoryIcons[category.id] || Building2;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/category/${category.id}`)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                      e.currentTarget.style.borderLeftColor = colorScheme.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderLeftColor = '#e5e7eb';
                    }}
                    >
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: colorScheme.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={28} color="#fff" />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          margin: 0,
                          marginBottom: '0.5rem'
                        }}>
                          {category.name}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          margin: 0,
                          lineHeight: 1.5
                        }}>
                          {getCategoryDescription(category.id)}
                        </p>
                      </div>

                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: colorScheme.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        →
                      </div>
                    </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Message si aucun résultat */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0,
              marginBottom: '0.75rem'
            }}>
              {t(language, 'allCategories.noResultsTitle')}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              margin: 0,
              marginBottom: '2rem'
            }}>
              {t(language, 'allCategories.noResultsDescription')}
            </p>
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t(language, 'allCategories.resetFilters')}
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default AllCategoriesPageModern;

