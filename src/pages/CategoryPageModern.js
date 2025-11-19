import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBusiness } from '../contexts/BusinessContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import BusinessCard from '../components/BusinessCard';
import BusinessAdvancedSearch from '../components/BusinessAdvancedSearch';
import {
  ArrowLeft,
  Building2,
  Star,
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

const CategoryPageModern = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { getBusinessesByCategory, categories } = useBusiness();
  const { language } = useLanguage();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const currentCategory = categories.find(cat => cat.id === categorySlug);
  const businesses = useMemo(
    () => getBusinessesByCategory(categorySlug),
    [categorySlug, getBusinessesByCategory]
  );

  useEffect(() => {
    setFilteredBusinesses(businesses);
  }, [businesses]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleBackHome = (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryColors = {
    restaurants: { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', accent: '#f5576c' },
    hotels: { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', accent: '#4facfe' },
    pharmacies: { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', accent: '#43e97b' },
    hopitaux: { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', accent: '#fa709a' },
    banques: { bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', accent: '#30cfd0' },
    ecoles: { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', accent: '#a8edea' },
    universites: { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', accent: '#ff9a9e' },
    transport: { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', accent: '#fcb69f' },
    shopping: { bg: 'linear-gradient(135deg, #ff8a80 0%, #ea6100 100%)', accent: '#ff8a80' },
    loisirs: { bg: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', accent: '#84fab0' },
    sport: { bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', accent: '#a1c4fd' },
    beaute: { bg: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', accent: '#ff6e7f' },
    automobile: { bg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', accent: '#e0c3fc' },
    administration: { bg: 'linear-gradient(135deg, #fad961 0%, #f76b1c 100%)', accent: '#f76b1c' },
    services: { bg: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', accent: '#5ee7df' },
    autre: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', accent: '#667eea' }
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

  const colorScheme = currentCategory ? (categoryColors[currentCategory.id] || categoryColors.autre) : categoryColors.autre;
  const HeroIcon = currentCategory ? (categoryIcons[currentCategory.id] || Building2) : Building2;

  if (!currentCategory) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            maxWidth: '500px'
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            {t(language, 'categoryPage.notFoundTitle')}
          </h1>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            fontSize: '1rem'
          }}>
            {t(language, 'categoryPage.notFoundDescription')}
          </p>
          <button
            type="button"
            onClick={handleBackHome}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.875rem',
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
            {t(language, 'categoryPage.backHome')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        background: colorScheme.bg,
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
          >
            {/* Breadcrumb */}
            <button
              type="button"
              onClick={handleBackHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                marginBottom: '2rem'
              }}
            >
              <ArrowLeft size={18} />
              {t(language, 'categoryPage.backHome')}
            </button>

            {/* Category Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: isMobile ? '80px' : '120px',
                height: isMobile ? '80px' : '120px',
                borderRadius: '24px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}>
                <HeroIcon size={isMobile ? 40 : 56} color="#fff" />
              </div>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <Sparkles size={16} />
                  <span>{t(language, 'categoryPage.tagline')}</span>
                </div>
                <h1 style={{
                  fontSize: isMobile ? '2.5rem' : '4rem',
                  fontWeight: '800',
                  lineHeight: 1.1,
                  margin: 0,
                  marginBottom: '0.75rem'
                }}>
                  {currentCategory.name}
                </h1>
                <p style={{
                  fontSize: isMobile ? '1.125rem' : '1.5rem',
                  opacity: 0.95,
                  margin: 0,
                  maxWidth: '600px'
                }}>
                  {currentCategory.description || t(language, 'categoryPage.defaultDescription', { category: currentCategory.name.toLowerCase() })}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                <Building2 size={24} />
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    lineHeight: 1
                  }}>
                    {businesses.length}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    opacity: 0.9
                  }}>
                    {t(language, 'categoryPage.stats.businesses')}
                  </div>
                </div>
              </div>
              {businesses.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <Star size={24} />
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      lineHeight: 1
                    }}>
                      {businesses.filter(b => b.rating && b.rating >= 4).length}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      opacity: 0.9
                    }}>
                      {t(language, 'categoryPage.stats.topRated')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section style={{
        padding: '2rem 1.5rem',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <BusinessAdvancedSearch
            onBusinessSelect={(business) => {
              setSelectedBusiness(business);
              setTimeout(() => {
                const element = document.getElementById(`business-${business.id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 100);
            }}
          />
        </div>
      </section>

      {/* Businesses Section */}
      <section style={{
        padding: isMobile ? '3rem 1.5rem' : '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {businesses.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                marginBottom: '3rem'
              }}
            >
              <h2 style={{
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                {t(language, 'categoryPage.businessesTitle', { count: businesses.length })}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                margin: 0
              }}>
                {t(language, 'categoryPage.businessesSubtitle')}
              </p>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '2rem'
            }}>
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business, index) => (
                  <motion.div
                    key={business.id}
                    id={`business-${business.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    style={{
                      border: selectedBusiness?.id === business.id ? `3px solid ${colorScheme.accent}` : 'none',
                      borderRadius: selectedBusiness?.id === business.id ? '20px' : '0',
                      padding: selectedBusiness?.id === business.id ? '0.5rem' : '0',
                      transition: 'all 0.3s'
                    }}
                  >
                    <BusinessCard business={business} />
                  </motion.div>
                ))
              ) : (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    {t(language, 'categoryPage.noFilteredTitle')}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    {t(language, 'categoryPage.noFilteredDescription')}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '2px dashed #e5e7eb'
            }}
          >
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              background: colorScheme.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              boxShadow: `0 8px 32px ${colorScheme.accent}40`
            }}>
              <HeroIcon size={52} color="#fff" />
            </div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              {t(language, 'categoryPage.emptyStateTitle')}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              marginBottom: '2.5rem',
              maxWidth: '500px',
              margin: '0 auto 2.5rem'
            }}>
              {t(language, 'categoryPage.emptyStateDescription', { category: currentCategory.name.toLowerCase() })}
            </p>
          </motion.div>
        )}
      </section>
    </div>
    </>
  );
};

export default CategoryPageModern;

